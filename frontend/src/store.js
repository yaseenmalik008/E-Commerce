import {applyMiddleware,combineReducers,createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'
import { productListReducer,productDetailsReducer } from './reducers/productReducer'


const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
})

const cartItemFromStorage = localStorage.getItem('cartItems')
?JSON.parse(localStorage.getItem('cartItems'))
:[];

const initialState = {
cart : {cartItems : cartItemFromStorage}
}

const middlewares = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))

)

export default store
