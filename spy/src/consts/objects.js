import palm from "../img/palmpay.png";
import opayImg from "../img/opay.png";
import wiseImg from "../img/wise.png";
import bin from "../img/binance.png";
import air from "../img/airtm.jpeg";
import mthdss from "./functions";

function objects() {
  function p(str) {
    console.log(str);
  }
  const mthds = mthdss();
  return {
    before() {
      const stateObj = {
        generalProps: {
          rate: 920,
          ispm: false
        },
        binance: {
          rateDiff: 0,
          ispm: true,
          isUsd: true,
          balance: 1000
        },
        wise: {
          rateDiff: -4,
          ispm: true,
          isUsd: true,
          balance: 1000
        },
        airtm: {
          rateDiff: -20,
          ispm: true,
          isUsd: true,
          balance: 1000
        },

        opay: {
          rateDiff: 0,
          ispm: true,
          balance: 500000,
          isUsd: false
        },
        palmpay1: {
          rateDiff: 0,
          ispm: true,
          balance: 500000,
          isUsd: false
        },
        palmpay2: {
          rateDiff: 0,
          ispm: true,
          balance: 500000,
          isUsd: false
        },

        init() {
          for (const key in this) {
            if (this.hasOwnProperty(key)) {
              const pm = this[key];
              if (pm?.ispm) {
                pm.frozen = 0;
                pm.spend = 0;
                pm.percentFee = 0;
                if (pm.isUsd) {
                  pm.symbol = "$";
                } else {
                  pm.symbol = "₦";
                }
              }
            }
          }

          delete this.init;
          return this;
        }
      }.init();

      return stateObj;
    },
    after(pmState, pmIcons) {
      const objs = {
        symbols: {
          usd: "$",
          ngn: "₦"
        },

        pmAmount: {
          init() {
            //containing all pms in ngn and usd
            const all = {};
            // for ngn
            for (const key in pmState) {
              if (pmState[key].ispm && !pmState[key].isUsd) {
                const source = pmState[key];
                this.ngn[key] = {};
                Object.assign(this.ngn[key], source);
                const pm = this.ngn[key];
                all[key] = pm;
                pm.id = key;
                pm.icon = pmIcons[key];
                pm.limit = 5000000;
                pm.rate = pmState.generalProps.rate + source.rateDiff;
                pm.payFee = (pm.percentFee * pm.balance) / 100;
                pm.equivalent = pm.balance / pm.rate;
                pm.frozenEq = pm.frozen / pm.rate;
                pm.leftover = pm.limit - pm.spend;
                pm.percentSpend = (pm.spend / pm.limit) * 100;
              }
            }
            // for usd
            for (const key in pmState) {
              if (pmState[key].ispm && pmState[key].isUsd) {
                const source = pmState[key];
                this.usd[key] = {};
                Object.assign(this.usd[key], source);
                const pm = this.usd[key];

                all[key] = pm;
                pm.id = key;
                pm.icon = pmIcons[key];
                pm.rate = pmState.generalProps.rate + source.rateDiff;
                pm.limit = 10000;
                pm.payFee = (pm.percentFee * pm.balance) / 100;
                pm.equivalent = pm.balance * pm.rate;
                pm.frozenEq = pm.frozen / pm.rate;
                pm.percentSpend = (pm.spend / pm.limit) * 100;
              }
            }
            this.all = all;

            return this;
          },
          get netUsd() {
            let net = 0;
            let netF = 0;
            for (const key in this.usd) {
              if (this.usd.hasOwnProperty(key)) {
                const pm = this.usd[key];
                if (mthds.isObj(pm)) {
                  net += pm.balance;
                  netF += pm.frozen;
                }
              }
            }
            this.netUsdF = netF;

            return net;
          },

          get netUsdFee() {
            let net = 0;

            for (const key in this.usd) {
              if (this.usd.hasOwnProperty(key)) {
                const pm = this.usd[key];
                if (mthds.isObj(pm)) {
                  net += pm.payFee;
                }
              }
            }

            return net;
          },
          get netNgn() {
            let net = 0;
            let netF = 0;
            for (const key in this.ngn) {
              if (this.ngn.hasOwnProperty(key)) {
                const pm = this.ngn[key];
                if (mthds.isObj(pm)) {
                  net += pm.balance;
                  netF += pm.frozen;
                }
              }
            }
            this.netNgnF = netF;

            return net;
          },

          get netInUsd() {
            let net = this.netUsd;
            let netF = this.netUsdF;

            for (const key in this.ngn) {
              if (this.ngn.hasOwnProperty(key)) {
                const pm = this.ngn[key];
                if (mthds.isObj(pm)) {
                  net += pm.equivalent;
                  netF += pm.frozenEq;
                }
              }
            }

            this.netInUsdF = netF;
            return net;
          },
          get netInNgn() {
            let net = this.netNgn;
            let netF = this.netNgnF;

            for (const key in this.usd) {
              if (this.usd.hasOwnProperty(key)) {
                const pm = this.usd[key];
                if (mthds.isObj(pm)) {
                  net += pm.equivalent;
                  netF += pm.frozenEq;
                }
              }
            }
            this.netInNgnF = netF;

            return net;
          },
          ngn: {},
          usd: {}
        }.init(),

        pmProgress: {
          palmpay: {
            pmcolor: "rgb(144, 0, 255)",
            get percent() {
              return (
                this.parent.parent.pmAmount.ngn.palmpay1.percentSpend +
                this.parent.parent.pmAmount.ngn.palmpay2.percentSpend
              );
            },
            pmicon: palm
          },

          opay: {
            pmcolor: "rgba(29,207,159,255)",
            get percent() {
              return this.parent.parent.pmAmount.ngn.opay.percentSpend;
            },
            pmicon: opayImg
          },
          init() {
            for (const key in this) {
              if (this.hasOwnProperty(key, mthds.isObj(this[key]))) {
                const obj = this[key];
                obj.parent = this;
              }
            }

            return this;
          }
        }.init(),
        init() {
          for (const key in this) {
            if (this.hasOwnProperty(key, mthds.isObj(this[key]))) {
              const obj = this[key];
              obj.parent = this;
            }
          }

          return this;
        }
      };
      return objs.init();
    },

    //This is the object thingy used in ENTRY component in the MAIN screen in the middle
    theEnd(objs, isUsd) {
      return {
        balanceState: {
          get info() {
            if (isUsd) {
              return {
                a: mthds.tidyFig(objs.pmAmount.netUsd - objs.pmAmount.netUsdF),
                b: mthds.tidyFig(
                  objs.pmAmount.netInUsd - objs.pmAmount.netInUsdF
                )
              };
            } else {
              return {
                a: mthds.tidyFig(objs.pmAmount.netNgn - objs.pmAmount.netNgnF),
                b: mthds.tidyFig(
                  objs.pmAmount.netInNgn - objs.pmAmount.netInNgnF
                )
              };
            }
          }
        },
        toogleState: {
          label: "ALL",
          get info() {
            if (isUsd) {
              return {
                a: mthds.tidyFig(objs.pmAmount.netUsd - objs.pmAmount.netUsdF),
                b: mthds.tidyFig(objs.pmAmount.netUsdF),
                c: mthds.tidyFig(objs.pmAmount.netUsd)
              };
            } else {
              return {
                a: mthds.tidyFig(objs.pmAmount.netNgn - objs.pmAmount.netNgnF),
                b: mthds.tidyFig(objs.pmAmount.netNgnF),
                c: mthds.tidyFig(objs.pmAmount.netNgn)
              };
            }
          }
        }
      };
    },
    pmIcons: {
      palmpay1: palm,
      palmpay2: palm,
      opay: opayImg,
      wise: wiseImg,
      binance: bin,
      airtm: air
    }
  };
}

export default objects;
