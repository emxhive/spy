import PropTypes from "prop-types";
import { ImEyeBlocked, ImEye } from "react-icons/im";

function BalContainer({ amount, frozen, available, currency }) {
  return (
    <div className="balance">
      {currency}
      {amount}
      <div className="frozen-in-balance"><ImEyeBlocked style={{color: 'grey'}}/>{frozen}</div> 
      <div className="frozen-in-balance"><ImEye/>{available}</div>
    </div>
  );
}

BalContainer.defaultProps = {
  amount: "0"
};

BalContainer.propTypes = {
  amount: PropTypes.string,
  currency: PropTypes.string
};

export default BalContainer;
