import palm from '../img/palmpay.png'
import opayImg from '../img/opay.png'
import mthdss from './functions';


function objects(pmState) {
  const mthds = mthdss();

  const objs = {


    symbols: {
      usd: "$",
      ngn: "₦"
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
      rate: pmState.rate,
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
        console.log(netF);
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
          balance: pmState.palmpay.balance,
          rate: pmState.palmpay.rate,
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
          balance: pmState.opay.balance,
          rate: pmState.opay.rate,
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
          balance: pmState.airtm.balance,
          rate: pmState.airtm.rate,
          get equivalent() {
            return this.balance * this.rate;
          }
        },
        binance: {
          balance: pmState.binance.balance,
          rate: pmState.binance.rate,
          get equivalent() {
            return this.balance * this.rate;
          }
        },
        wise: {
          balance: pmState.wise.balance,
          rate: pmState.wise.rate,
          get equivalent() {
            return this.balance * this.rate;
          }
        }
      }
    }.init(),

    pmProgress: {
      palmpay: {
        pmcolor: "rgb(144, 0, 255)",
        get percent() { return this.parent.parent.pmAmount.ngn.palmpay.percentSpend },
        pmicon: palm
      },

      opay: {
        pmcolor: "rgba(29,207,159,255)",
        get percent() { return this.parent.parent.pmAmount.ngn.opay.percentSpend },
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
  }
  return objs.init();
}

export default objects;