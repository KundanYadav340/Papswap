const homeReducer =(state, action)=>{
    if(action.type==="SET_POST_DATA"){
        const post = action.payload;

        return {
            ...state,
            postData:post,
            filterPost:post,
            isLoadingPostData:false,
        }
    }
    if(action.type==="SET_CATEGORY"){
        const post = action.payload;
        return {
            ...state,
            filterCategory:post,
            isFilterDataEmpty:false
        }
    }
    if(action.type==="SET_MORE_DATA"){
        return {
            ...state,
            postData:action.payload,
            filterPost:action.payload,
            getMoreData:false
        }
    }
    if(action.type==="SET_MORE_FILTER_DATA"){
        return {
            ...state,
            filterPost:action.payload,
            getMoreData:false
        }
    }
    if(action.type==="SET_FILTER_LOADER"){
        return {
            ...state,
            isLoadingFilterData:true
        }
    }
    if(action.type==="SET_MORE_DATA_LOADER"){
        return {
            ...state,
            getMoreData:true
        }
    }
    if(action.type==="SET_EMPTY_DATA"){
        return {
            ...state,
            isDataEmpty:true,
            isFilterDataEmpty:true
        }
    }
    if(action.type==="SET_EMPTY_FILTER_DATA"){
        return {
            ...state,
            isFilterDataEmpty:true
        }
    }
    if(action.type==="SET_LAST_DOC"){
        return {
            ...state,
            lastDoc:action.payload
        }
    }
    if(action.type==="SET_LAST_FILTER_DOC"){
        return {
            ...state,
            lastFilterDoc:action.payload
        }
    }


    if(action.type==="FILTER_DATA"){
        const post = action.payload;
        return {
            ...state,
            filterPost:post,
            isLoadingFilterData:false
        }
    }
    if(action.type==="FLAME_FUNCTION"){
        const post = action.payload;
        return {
            ...state,
            filterPost:post,
        }
    }
    if(action.type==="FLAME_FUNCTION_IN_ALL"){
        const post = action.payload;
        return {
            ...state,
            postData:post,
        }
    }
    return state;
};

export default homeReducer;