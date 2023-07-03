import PropTypes from "prop-types";
import styledComp from 'styled-components'

function Progress({ pmcolor, percent, pmicon }) {

  const Div = styledComp.div`
  background: conic-gradient(${pmcolor} ${(percent+'%')}, white 0);
  `
  const styles = {
    outerC: {
  
      width: "48px",
      aspectRatio: 1,
      borderRadius: "50%",
      display: "inline-grid",
      placeContent: "center",
     
    },
    innerC: {
      width: "31px",
      aspectRatio: 1,
      borderRadius: "50%",
      display: "inline-grid",
      placeContent: "center",
      backgroundColor: "white",
    },

    icon: {
      aspectRatio: 1,
      width: "29px",
      borderRadius: '50%',
    },
  };

  return (
    <Div style={styles.outerC}>
      <div style={styles.innerC}>
        <img src={pmicon} style={styles.icon} alt={percent + "%"} />{" "}
      </div>{" "}
    </Div>
  );
}

Progress.defaultProps = {};

Progress.propTypes = {
  amount: PropTypes.string,
};

export default Progress;
