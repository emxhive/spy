function functions(pmState, setpmState) {
  const objs = {
    getTimeId(date) {
      return `t${new Date(date).valueOf()}`;
    },
    getDayId(date) {
      return `d${date.getYear()}${date.getMonth()}${date.getDay()}`;
    },
    isObj(obj) {
      return typeof obj === "object";
    },

    p(str) {
      console.log(str);
    },

    toDigits(s) {
      const result = s.match(/[\d.]+/g);
      if (result) {
        return Number(result.join(""));
      } else return 0;
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

    getMonthName(date) {
      return new Intl.DateTimeFormat(undefined, { month: "long" }).format(date);
    },
    pmFunc: {
      updateRate(newState) {
        setpmState(...pmState, ...newState);
      },
    },
  };

  return objs;
}

export default functions;
