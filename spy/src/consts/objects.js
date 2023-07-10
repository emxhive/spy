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
        binance: {
          rate: 770,
          isUsd: true,
          balance: 1000
        },
        wise: {
          get rate() {
            return this.parent.binance.rate - 4;
          },
          isUsd: true,
          balance: 1000
        },
        airtm: {
          get rate() {
            return this.parent.binance.rate - 20;
          },
          isUsd: true,
          balance: 1000
        },

        opay: {
          get rate() {
            return this.parent.airtm.rate;
          },
          balance: 500000,
          isUsd: false
        },
        palmpay: {
          get rate() {
            return this.parent.airtm.rate;
          },
          balance: 500000,
          isUsd: false
        },

        init() {
          this.opay.parent = this;
          this.palmpay.parent = this;
          this.wise.parent = this;
          this.airtm.parent = this;
          this.binance.parent = this;

          delete this.init;
          return this;
        }
      }.init();

      return stateObj;
    },
    after(pmState) {
      const objs = {
        symbols: {
          usd: "$",
          ngn: "₦"
        },
        pmIcons: {
          palmpay: palm,
          opay: opayImg,
          wise: wiseImg,
          binance: bin,
          airtm: air
        },
        pmAmount: {
          init() {
            // for ngn
            for (const key in this.ngn) {
              if (this.ngn.hasOwnProperty(key)) {
                const pm = this.ngn[key];
                pm.frozen = 0;
                pm.frozenEq = pm.frozen / pm.rate;
              }
            }
            // for usd
            for (const key in this.usd) {
              if (this.usd.hasOwnProperty(key)) {
                const pm = this.usd[key];
                pm.frozen = 0;
                pm.frozenEq = pm.frozen * pm.rate;
              }
            }
            return this;
          },
          get rate() {
            return pmState.rate;
          },
          get netUsd() {
            let net = 0;
            let netF = 0;
            for (const key in pmState) {
              if (pmState.hasOwnProperty(key)) {
                const pm = pmState[key];
                if (pm.isUsd) {
                  net += pm.balance;
                  netF += pm.frozen;
                }
              }
            }
            this.netUsdF = netF;
            return net;
          },
          get netNgn() {
            let net = 0;
            let netF = 0;
            for (const key in pmState) {
              if (pmState.hasOwnProperty(key)) {
                const pm = pmState[key];
                if (!pm.isUsd) {
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
            let netF = 0;

            for (const key in this.ngn) {
              if (this.ngn.hasOwnProperty(key)) {
                const pm = this.ngn[key];
                net += pm.equivalent;
                netF += pm.frozenEq;
              }
            }

            this.netInUsdF = netF;
            return net;
          },
          get netInNgn() {
            let net = this.netNgn;
            let netF = 0;
            for (const key in this.usd) {
              if (this.usd.hasOwnProperty(key)) {
      
                const pm = this.usd[key];
          
                net += pm.equivalent;
                netF += pm.frozenEq;
              }
            }
            this.netInNgnF = netF;

            return net;
          },
          ngn: {
            palmpay: {
              get balance() {
                return pmState.palmpay.balance;
              },
              get rate() {
                return pmState.palmpay.rate;
              },
              get equivalent() {
                return this.balance / this.rate;
              },
              limit: 5000000,
              spend: 1000000,
              get leftover() {
                return this.limit - this.spend;
              },
              get leftoverStr() {
                return this.leftover.toLocaleString();
              },

              get percentSpend() {
                return (this.spend / this.limit) * 100;
              }
            },
            opay: {
              get balance() {
                return pmState.opay.balance;
              },
              get rate() {
                return pmState.opay.rate;
              },
              get equivalent() {
                return this.balance / this.rate;
              },
              limit: 5000000,
              spend: 2000000,
              get leftover() {
                return this.limit - this.spend;
              },
              get leftoverStr() {
                return this.leftover.toLocaleString();
              },
              get percentSpend() {
                return (this.spend / this.limit) * 100;
              }
            }
          },
          usd: {
            airtm: {
              get balance() {
                return pmState.airtm.balance;
              },
              get rate() {
                return pmState.airtm.rate;
              },
              get equivalent() {
                return this.balance * this.rate;
              }
            },
            binance: {
              get balance() {
                return pmState.binance.balance;
              },
              get rate() {
                return pmState.binance.rate;
              },
              get equivalent() {
                return this.balance * this.rate;
              }
            },
            wise: {
              get balance() {
                return pmState.wise.balance;
              },
              get rate() {
                return pmState.wise.rate;
              },
              get equivalent() {
                return this.balance * this.rate;
              }
            }
          }
        }.init(),

        pmProgress: {
          palmpay: {
            pmcolor: "rgb(144, 0, 255)",
            get percent() {
              return this.parent.parent.pmAmount.ngn.palmpay.percentSpend;
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

            delete this.init;
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

          delete this.init;
          return this;
        }
      };
      return objs.init();
    }
  };
}

export default objects;
