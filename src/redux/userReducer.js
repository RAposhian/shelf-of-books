const initialState = {
   user: {}
}

const USER_INFO = 'USER_INFO';

export const userInfo = (userObj) => {
   return {
      type: USER_INFO,
      payload: userObj
   }
}

export default function userReducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case USER_INFO:
         return {...state, user: payload}
      default:
         return state;
   }
}