import {applyMiddleware,combineReducers,createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'
import { productListReducer,productDetailsReducer } from './reducers/productReducer'
import {userLoginReducer} from './reducers/userReducer.js'

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
})

const cartItemFromStorage = localStorage.getItem('cartItems')
?JSON.parse(localStorage.getItem('cartItems'))
:[];

const userInfoFromStorage = localStorage.getItem('userInfo')
 ?JSON.parse(localStorage.getItem('userinfo'))
 :{};
const initialState = {
cart : {cartItems : cartItemFromStorage},
userLogin  : {userInfo : userInfoFromStorage},
}

const middlewares = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))

)

export default store
