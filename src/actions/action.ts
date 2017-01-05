import api from '../api'
function postUrl(obj) {
    return {
        type: obj.type,
        payload: {
            promise: api.post(obj.url)
        }
    }
};
function postData(obj) {
    return {
        type: obj.type,
        payload: {
            promise: api.post(obj.url,{
            	data:obj.data
            })
        }
    }
};
function putUrl(obj) {
    return {
        type: obj.type,
        payload: {
            promise: api.post(obj.url)
        }
    }
};
function putData(obj) {
    return {
        type: obj.type,
        payload: {
            promise: api.put(obj.url,{
            	data:obj.data
            })
        }
    }
};
function deleteUrl(obj) {
    return {
        type: obj.type,
        payload: {
            promise: api.del(obj.url)
        }
    }
};
function deleteData(obj) {
    return {
        type: obj.type,
        payload: {
            promise: api.del(obj.url,{
                data:obj.data
            })
        }
    }
};
function initial(obj){
    return {
        type: obj.type
    }
}
let action = {
    postUrl:postUrl,
    postData:postData,
    putUrl:putUrl,
    putData:putData,
    deleteUrl:deleteUrl,
    deleteData:deleteData
}
export default action;