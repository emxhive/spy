import PropTypes from "prop-types";

function BalContainer({ amount, currency }) {
  return (
    <div className="balance">
      {currency}
      {amount}
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
