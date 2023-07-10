
function functions(pmState, setpmState) {

    const objs = {
        isObj(obj) {
            return typeof obj === 'object';
        },
        tidyFig(s) {
            //short for tidy figures
            s = this.twodp(s);
            
           ;
            return s.toLocaleString();
        },

        twodp(n) {
            n = Number(n);
            if (isNaN(n)) {
                return n;
            } else {
                return Number(Number.parseFloat(n).toFixed(2));
            }
        },
        pmFunc: {
            updateRate(newState) {
                setpmState(...pmState, ...newState);
            }
        }


    }

    return objs;
}

export default functions;