import { createSlice } from "@reduxjs/toolkit";

const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
const defaultCard = {
  id: 1,
  cardholder: "",
  cardnumber: "3556 3556 3556 3556",
  expiry: "1167",
  cvc: "141",
  issuer: "visa",
  active: true,
};

const initialState = {
  cards: storedCards,
  activeCard: storedCards.length > 0 ? storedCards[0] : defaultCard,
  latestId: storedCards.length > 0 ? storedCards[storedCards.length - 1].id : 1,
};

// localStorage.clear();
console.log("initialState", initialState);

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.latestId += 1;
      const newCard = { ...action.payload, id: state.latestId };

      // Check if a card with the same details already exists in the state
      const existingCardIndex = state.cards.findIndex(
        (card) =>
          card.cardholder === newCard.cardholder &&
          card.cardnumber === newCard.cardnumber &&
          card.expiry === newCard.expiry &&
          card.cvc === newCard.cvc &&
          card.issuer === newCard.issuer
      );

      // If the card doesn't exist, add it to the state and set it as the active card
      if (existingCardIndex === -1) {
        state.cards.push(newCard);
        state.activeCard = newCard;
      }

      // Update local storage
    },
    setActiveCard: (state, action) => {
      const cardId = action.payload;
      const cardIndex = state.cards.findIndex((card) => card.id === cardId);

      if (cardIndex !== -1) {
        // Set the activeCard to the selected card
        state.activeCard = state.cards[cardIndex];
      }
    },
    removeCard: (state, action) => {
      const cardId = action.payload;
      const cardIndex = state.cards.findIndex((card) => card.id === cardId);

      if (cardIndex !== -1) {
        state.cards.splice(cardIndex, 1);

        if(state.activeCard.id === cardId) {
          state.activeCard = state.cards[0] || null; 
        }
        localStorage.setItem("cards", JSON.stringify([...state.cards]));

      }
    },
  },
});

export const { addCard, setActiveCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
