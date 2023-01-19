const AppReducer =(state, action)=>{
    if(action.type==="SET_USER_DATA"){
        const user = action.payload;

        return {
            ...state,
            userData:user
        }
    }
    return state;
};

export default AppReducer;