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
          ispm: true,
          isUsd: true,
          balance: 1000
        },
        wise: {
          get rate() {
            return this.parent.binance.rate - 4;
          },
          ispm: true,
          isUsd: true,
          balance: 1000
        },
        airtm: {
          get rate() {
            return this.parent.binance.rate - 20;
          },
          ispm: true,
          isUsd: true,
          balance: 1000
        },

        opay: {
          get rate() {
            return this.parent.airtm.rate;
          },
          ispm: true,
          balance: 500000,
          isUsd: false
        },
        palmpay1: {
          get rate() {
            return this.parent.airtm.rate;
          },
          ispm: true,
          balance: 500000,
          isUsd: false
        },
        palmpay2: {
          get rate() {
            return this.parent.airtm.rate;
          },
          ispm: true,
          balance: 500000,
          isUsd: false
        },

        init() {
          for (const key in this) {
            if (this.hasOwnProperty(key)) {
              const pm = this[key];
              if (pm?.ispm) {
                pm.parent = this;
                pm.frozen = 100;
              }
            }
          }

          // delete this.init;
          return this;
        }
      }.init();

      return stateObj;
    },
    after(pmState) {
      const objs = {
        midEntryPm: {},

        symbols: {
          usd: "$",
          ngn: "₦"
        },

        pmIcons: {
          palmpay1: palm,
          palmpay2: palm,
          opay: opayImg,
          wise: wiseImg,
          binance: bin,
          airtm: air
        },
        pmAmount: {
          init() {
            //containing all pms in ngn and usd
            const all = {};
            // for ngn
            for (const key in this.ngn) {
              if (this.ngn.hasOwnProperty(key) && this.ngn[key].ispm) {
                const pm = this.ngn[key];
                all[key] = pm;

                pm.frozen = pmState[key].frozen;
                pm.frozenEq = pm.frozen / pm.rate;
              }
            }
            // for usd
            for (const key in this.usd) {
              if (this.usd.hasOwnProperty(key) && this.usd[key].ispm) {
                const pm = this.usd[key];
                all[key] = pm;

                pm.frozen = pmState[key].frozen;
                pm.frozenEq = pm.frozen * pm.rate;
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
          ngn: {
            palmpay1: {
              get balance() {
                return pmState.palmpay1.balance;
              },
              get rate() {
                return pmState.palmpay1.rate;
              },
              get equivalent() {
                return this.balance / this.rate;
              },
              ispm: true,
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

            palmpay2: {
              get balance() {
                return pmState.palmpay2.balance;
              },
              get rate() {
                return pmState.palmpay2.rate;
              },
              get equivalent() {
                return this.balance / this.rate;
              },
              ispm: true,
              limit: 5000000,
              spend: 1000000,
              get leftover() {
                return this.parent.palmpay1.leftover - this.spend;
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
              ispm: true,
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
              ispm: true,

              get equivalent() {
                return this.balance * this.rate;
              }
            },
            binance: {
              get balance() {
                return pmState.binance.balance;
              },
              ispm: true,

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
              ispm: true,

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
          const properties = ["balance", "frozen", "ispm", "isUsd", "spend"];
          for (const key in pmState) {
            if (pmState[key]?.ispm) {
              const parent = pmState[key];
              const pm = (this.midEntryPm[key] = {});
              pm.id = key;
              pm.icon = this.pmIcons[key];
              properties.forEach((property) => {
                pm[property] = parent[property];
                pm.equivalent = this.pmAmount.all[key].equivalent;
              });
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
