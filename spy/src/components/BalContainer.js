import PropTypes from "prop-types";
import { BsLock, BsUnlock } from "react-icons/bs";

function BalContainer({ amount, frozen, available, currency }) {
  return (
    <div className="balance">
      {currency}
      {amount}
      <div className="frozen-in-balance">
        <BsLock />
        {frozen}
      </div>
      <div className="frozen-in-balance">
        <BsUnlock />
        {available}
      </div>
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
