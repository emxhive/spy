function functions(pmState, setpmState) {
  const objs = {
    getTimeId(date) {
      return `t${new Date(date).valueOf()}`;
    },
    getDayId(date) {
      return `d${date.getYear() + 1900},${
        date.getMonth() + 1
      },${date.getDate()}`;
    },

    idtoDate(id) {
      return new Date(Number(id.replace("t", "")));
    },
    isObj(obj) {
      return typeof obj === "object";
    },

    p(str) {
      console.log(str);
    },
    fromLocalStorage(str) {
      const result = JSON.parse(localStorage.getItem(str));
      if (result) {
        return result;
      }
      return null;
    },
    toLocalStorage(str, obj) {
      localStorage.setItem(str, JSON.stringify(obj));
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
