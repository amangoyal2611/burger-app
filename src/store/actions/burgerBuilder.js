import * as actionTypes from './actionTypes';
import instance from '../../axios';

export const addIngredient = (igName) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: igName
    }
}

export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: igName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const fetchInititalIngredients = () => {
    return dispatch => {
         instance.get('https://burger-79093.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(e => {
                dispatch(fetchIngredientsFailed());
            })
    }
}