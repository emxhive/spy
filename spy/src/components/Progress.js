import PropTypes from "prop-types";

function Progress({ pmcolor, percent, pmicon }) {
  const styles = {
    outerC: {
      width: "70px",
      aspectRatio: 1,
      borderRadius: "50%",
      display: "inline-grid",
      placeContent: "center",
      backgroundColor: pmcolor,
    },
    innerC: {
      width: "50px",
      aspectRatio: 1,
      borderRadius: "50%",
      display: "inline-grid",
      placeContent: "center",
      backgroundColor: 'white'
    },

    icon: {
      aspectRatio: 1,
      width: '30px'
    },
  };

  return (
    <div style={styles.outerC}>
      <div style={styles.innerC}>
        <img src={pmicon} style={styles.icon} alt={percent+ '%'} />
      </div>
    </div>
  );
}

Progress.defaultProps = {};

Progress.propTypes = {
  amount: PropTypes.string,
};

export default Progress;
