import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardSlice.jsx";
import "./css/pages.scss";
import Top from "../component/Top.jsx";
import Card from "../component/Card.jsx";
import CardStack from "../component/CardStack.jsx";

const Home = () => {
    const { cards, activeCard } = useSelector((state) => state.cards);
    console.log("yo", cards);
return (
    <div className="Page">
        <Top />
        <div className="Body">
            <div className="card">
            <Card activeCard={activeCard} />
            </div>
            <div className="cardStack">
            <CardStack />
            </div>
            <div className="homeAddBtnContainer">
                <Link to={"/addcard"}>
                    <button className="homeAddBtn">New Card</button>
                </Link>
            </div>
        </div>
    </div>
);
}

export default Home;
