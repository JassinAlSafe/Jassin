import { useSelector } from "react-redux";
import "./css/Top.scss";
const Top = () => {
  const cards = useSelector((state) => state.cards);
  
  return (
    <div className="TopContainer">
      <h1>E-WALLET</h1>
      <p className="username">{cards && cards[0] && cards[0].cardholder}</p>    </div>
  );
};

export default Top;
