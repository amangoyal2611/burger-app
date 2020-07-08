import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 20
}

const INGREDIENTS_PRICE = {
    salad: 10,
    cheese: 20,
    meat: 30,
    bacon: 15,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] ? state.ingredients[action.ingredientName] - 1 : 0
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]

            }
        default:
            return state;
    }

};

export default reducer;