import PropTypes from 'prop-types'


function BalContainer({amount, currency}) {
    return (
        <div className="balance">
            {amount}   {currency}
        </div>
    );
}



BalContainer.defaultProps = {
    amount: '0',
}

BalContainer.propTypes ={
    amount : PropTypes.string,
    currency: PropTypes.string,
}

export default BalContainer;
