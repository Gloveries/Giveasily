export const donationsReducer = function(state={}, action) {
    switch(action.type) {
        case 'donations':
        return state

        case 'addDonation':
        return state.concat(action.payload)
        

        default:
        return state;
    }
    
}


