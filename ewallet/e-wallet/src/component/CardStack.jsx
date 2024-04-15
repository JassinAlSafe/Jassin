import { useSelector, useDispatch } from "react-redux";
import Cards from "react-credit-cards-2";
import { setActiveCard } from "../redux/cardSlice.jsx";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./css/cardStack.scss";

const CardStack = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const activeCard = useSelector((state) => state.cards.activeCard);
  console.log("activeCard in stack", activeCard);

  const handleCardClick = (id) => {
    console.log("card clicked", id);
    dispatch(setActiveCard(id));
  };

  return (
    <div className="card-wallet">
      {cards.length > 0 &&
        cards.map(
          (card, i) =>
            card.id !== activeCard.id && (
              <div
                key={i}
                className="cardListContainer"
                onClick={() => handleCardClick(card.id)}
              >
                <Cards
                  name={card.cardholder}
                  number={card.cardnumber}
                  expiry={card.expiry}
                  cvc={card.cvc}
                  issuer={card.issuer}
                  preview={true}
                />
              </div>
            )
        )}
    </div>
  );
};

export default CardStack;
