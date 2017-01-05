const initialState = {
    user: null,
    loggingIn: false,
    loggingOut: false,
    loginErrors: null
};
export default function user(state:any, action:any = {}){
    if(!state)
        state = initialState
    switch(action.type){
        case 'USER_LOGIN_PENDING':
            return Object.assign({}, initialState, {loggingIn: true});        
        case 'USER_LOGIN_SUCCESS':
            return Object.assign({}, state, {user: action.payload.user, loggingIn: false, loginErrors: null});
        case 'USER_LOGIN_ERROR':
            return {...state,loggingIn: false,user: null,loginErrors: action.payload.message};
        case "USER_LOGOUT_SUCCESS":
            return {...state,loggingOut: false,user: null,loginErrors: null};                      
        default:
            return state
    }
}