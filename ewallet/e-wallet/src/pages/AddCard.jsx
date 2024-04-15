import "./css/pages.scss"
import Cards from "react-credit-cards-2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCard } from "../redux/cardSlice.jsx";
import Top from "../component/Top.jsx";
import "./css/pages.scss";
import "../creditcardstyles/styles-compiled.css";

export default function AddCard() {
      const [name, setName] = useState("");
      const [number, setNumber] = useState("");
      const [expiry, setExpiry] = useState("");
      const [cvc,setCvc] = useState("");
      const [focus, setFocus] = useState("");
      const [issuer, setIssuer] = useState("");

      const myCards = useSelector((state) => state.cards.cards);
      const { latestId } = useSelector((state) => state.cards);

      useEffect(() => {
          myCards.forEach((card) => {
                if(card.active && card.cardholder) {
                     setName(card.cardholder);
                }
          })
      }, [myCards])

      const navigate = useNavigate();
      const dispatch = useDispatch();

      const redirectPage = () => {
          navigate("/");
      }

      const handleAddCard = () => {
          let month = expiry.slice(0, 2);
          month = +month;
     
          if(month > 12) {
             alert("Invalid expiry date");
          } else {
            console.log("latestId", latestId)
             const newCard = {
                cardholder: name,
                cardnumber: number,
                expiry: expiry,
                cvc: cvc,
                issuer: issuer,
                active: false,
                id: latestId + 1
             };
     
             // Dispatching the addCard action to update redux store. 
             dispatch(addCard(newCard));

             // retreiving existing card from local storage or i fail empty array
             const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
             // creating an updated card data arry but adding new card to it.
             const updatedCards = [...storedCards, newCard];
             // storing the updated card data array in local
             localStorage.setItem('cards', JSON.stringify(updatedCards));
             redirectPage();
          }
        }

      const handleInputFocus = ({ target }) => {
          setFocus(target.name);
      }

      const handleChangeState = (e, myState) => {
          myState(e.target.value);
      }

      const handleOnInput = (e, num) => {
          e.target.value = e.target.value.slice(0, num)
      }

      const handleIssuerState = (event) => {
          setIssuer(event.target.value);
      }


      return (
          
          <div className="Page">
                <Top />
                <div className="Body">
                     <h2 className="addCardTitle">NEW CARD</h2>
                     <div className="addCardContainer">
                          <Cards name={name} number={number} expiry={expiry} cvc={cvc} focused={focus} issuer={issuer} preview={true}/>
                     </div>
                     <form className="cardForm">
                          <label htmlFor="cardholderName">Cardholders Name</label>
                          <input type="text" name="name" onFocus={handleInputFocus} onChange={(e) => handleChangeState(e, setName)} id="cardholderName" value={name} placeholder="Cardholders name" required />                    <label htmlFor="cardNumber">Card Number</label>
                          <input type="number" name="number" id="cardNumber" onFocus={handleInputFocus} onChange={(e) => handleChangeState(e, setNumber)} onInput={(e) => handleOnInput(e, 16)} placeholder="" required />
                          <label htmlFor="expiry">Valid Through</label>
                          <input type="number" name="expiry" id="expiry" onFocus={handleInputFocus} onChange={(e) => handleChangeState(e, setExpiry)} onInput={(e) => handleOnInput(e,4)} placeholder="MM/YY" required />
                          <input type="number" name="cvc" onFocus={handleInputFocus} onChange={(e) => handleChangeState(e, setCvc)} onInput={(e) => handleOnInput(e,3)} placeholder="CVC" required />
                          <label htmlFor="cardType">Card Type</label>
                          <select name="cardType" onChange={handleIssuerState} required>
                                <option value="visa">Visa</option>
                                <option value="mastercard">Mastercard</option>
                                <option value="ninjabank">Ninja Bank</option>
                                <option value="bitcoin">Bitcoin</option>
                                <option value="blockchain">BLOCK CHAIN INC</option>
                                <option value="evilcorp">EVIL CORP</option>
                          </select>
                     </form>
                     <button className="addCardBtn" onClick={handleAddCard} disabled={(number.length === 16 && expiry.length === 4 && cvc.length === 3 ? false : true)}>Add Card</button>
                </div>
          </div>
      );
}
