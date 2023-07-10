import PropTypes from "prop-types";

function BalContainer({ amount, frozen, currency }) {
  return (
    <div className="balance">
      {currency}
      {amount}
      <div className="frozen-in-balance">{frozen}</div>
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
