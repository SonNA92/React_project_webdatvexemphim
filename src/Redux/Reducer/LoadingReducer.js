const stateDefault = {
    isLoading: false
}



export const LoadingReducer = (state = stateDefault,acttion) => {
    switch (acttion.type){
        case 'DISPLAY_LOADING':{
            state.isLoading = true;
            return {...state};
        }
        case 'HIDE_LOADING':{
            state.isLoading = false;
            return {...state};
        }
        default : return {...state};
    }
}