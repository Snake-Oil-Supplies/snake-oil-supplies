import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS';

//INITIAL STATE
const defaultProducts = [];

//ACTION CREATORS
const getProducts = products => ({type: GET_PRODUCTS, products});

//THUNKS

export const fetchProducts = () => async(dispatch) => {
  const products = await axios.get('/api/products');
  dispatch(getProducts(products.data));

}

//REDUCER

export default function (prevState = defaultProducts, action){
  switch (action.type){
    case GET_PRODUCTS:
      return action.products;
    default:
      return prevState;
  }
}
