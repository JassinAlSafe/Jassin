import { useSelector, useDispatch } from "react-redux";
import { removeCard } from "../redux/cardSlice.jsx";
import Cards from "react-credit-cards-2";
import "./css/Card.scss";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const Card = () => {
  const dispatch = useDispatch();
  const activeCard = useSelector((state) => state.cards.activeCard);
  console.log("activeCard", activeCard);

  if (!activeCard) {
    // Render a default card or a placeholder
    return (
      <div className="cardContainer">
        <p>No active card</p>
      </div>
    );
  }

  return (
    <div className="cardContainer">
      <p>ACTIVE CARD</p>
      <div className="activeCard">
        <Cards
          name={activeCard.cardholder}
          number={activeCard.cardnumber}
          expiry={activeCard.expiry}
          cvc={activeCard.cvc}
          issuer={activeCard.issuer}
          preview={true}
        />
      </div>
      {activeCard.id !== 1 && (
        <button
          className="deleteBtn"
          onClick={() => dispatch(removeCard(activeCard.id))}
        >
          Remove card
        </button>
      )}
    </div>
  );
};

export default Card;
