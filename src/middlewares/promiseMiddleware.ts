import {isPromise} from '../utils/index';
const objectAssign = require('object-assign');
const defaultTypes = ['PENDING', 'SUCCESS', 'ERROR'];

export default function promiseMiddleware({ dispatch }) {
    const promiseTypeSuffixes = defaultTypes;
    
    return next => action => {
        if (!isPromise(action.payload)) {
            return next(action);
        }
        const { type, payload, meta } = action;
        const { promise, data } = payload;
        const [ PENDING, FULFILLED, REJECTED ] = (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;;
        /**
        * Dispatch the pending action
        */
        dispatch( objectAssign({},
            { type: `${type}_${PENDING}` },
            data ? { payload: data } : {},
            meta ? { meta } : {}
        ));

        /**
         * If successful, dispatch the fulfilled action, otherwise dispatch
         * rejected action.
         */
        return promise.then(
            result => {
                dispatch({
                    type: `${type}_${FULFILLED}`,
                    payload: result,
                    meta,
                });
            },
            error => {
                dispatch({
                    type: `${type}_${REJECTED}`,
                    payload: error,
                    meta,
                });
            }
        );
    };
}
