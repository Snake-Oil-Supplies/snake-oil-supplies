import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS';

//INITIAL STATE
const defaultProducts = [];

//ACTION CREATORS
const getProducts = products => ({ type: GET_PRODUCTS, products });

//THUNKS
export const fetchProducts = () => async (dispatch) => {
  try {
    const products = await axios.get('/api/products');
    dispatch(getProducts(products.data));
    return products
  }
  catch (err) {
    console.log(err)
  }
}

//REDUCER
export default function (prevState = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return prevState;
  }
}
