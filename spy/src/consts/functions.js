
function functions(pmState, setpmState) {

    const objs = {
        isObj(obj) {
            return typeof obj === 'object';
        },
        tidyFig(x) {
            //short for tidy figures
            return x.toLocaleString();
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