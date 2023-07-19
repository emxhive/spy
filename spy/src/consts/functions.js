function functions(pmState, setpmState) {
  const objs = {
    isObj(obj) {
      return typeof obj === "object";
    },

    p(str) {
      console.log(str);
    },
    toDigits(s) {
      return Number(s.replaceAll(/,/g, ""));
    },
    tidyFig(s) {
      //short for tidy figures
      s = this.twodp(s);

      return s.toLocaleString();
    },

    twodp(n) {
      n = Number(n);
      if (isNaN(n)) {
        return 0;
      } else {
        return Number(Number.parseFloat(n).toFixed(2));
      }
    },
    pmFunc: {
      updateRate(newState) {
        setpmState(...pmState, ...newState);
      }
    }
  };

  return objs;
}

export default functions;
