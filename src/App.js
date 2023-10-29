
import './App.css';
import React, { createContext, useContext, useReducer, useState } from 'react';

const productCtx = createContext(null)
const store = {
  price: 7000,
  prodName: "Sketchers",
  buyCount: 0,
  available: 25
}

function reducer(state, action) {
  switch (action.type) {
    case "add-to-cart":
      return { ...state, buyCount: state.buyCount + 1, available: state.available - 1 };
    case "remove-cart":
      return { ...state, buyCount: state.buyCount - 1, available: state.available + 1 };
    case "buy-now":
      return { ...state, buyCount: 0 };
    case "restore-product":
      return { ...state, available: state.available + +action.payload }

    default:
      return state

  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, store)

  console.log(state);
  return (
    <div className="App">
      <productCtx.Provider value={{ state, dispatch }}>

        <h1>Context-with-Reducers</h1>

        <Admin />

        <div className='product-division'>
          <Product />
          <Cart />
        </div>

        <Billing />

      </productCtx.Provider>
    </div >
  );
}


function Admin() {
  const [restore, setRestore] = useState(0);
  const { dispatch } = useContext(productCtx)

  return (
    <div className='admin-component'>

      <h2>Admin</h2>
      <input placeholder='="Enter restore value' type="number" value={restore} onChange={(e) => setRestore(e.target.value)} />
      <button onClick={() => dispatch({ type: "restore-product", payload: restore })} >Restore</button>
    </div>
  )
}

function Product() {
  const { state, dispatch } = useContext(productCtx)
  return (
    <div className='product-component'>
      <h2>Product-Info</h2>
      <img src="https://unsplash.com/photos/unpaired-red-nike-sneaker-164_6wVEHfI" alt="product-name"

      />
      <h3>{state.prodName}</h3>
      <h3>{state.price}</h3>
      <p>Remaining items:{state.available}</p>
      <button onClick={() => dispatch({ type: "add-to-cart" })} >Add to cart</button>
    </div>
  )
}

function Cart() {
  const { state, dispatch } = useContext(productCtx)
  return (
    <div className='product-compnent'>
      <h2>Cart Info</h2>

      <img
        src="https://unsplash.com/photos/unpaired-red-nike-sneaker-164_6wVEHfI"
        alt="product-name"
      />

      <h3>{state.prodName}</h3>
      <h3>No of items: {state.buyCount}</h3>
      <button onClick={() => dispatch({ type: "add-to-cart" })}>+</button>
      <button onClick={() => dispatch({ type: "remove-cart" })}>-</button>
      <button onClick={() => dispatch({ type: "buy-now" })}>Buy Now</button>

    </div>
  )
}

function Billing() {
  const { state } = useContext(productCtx)
  const Totalcost = state.price * state.buyCount;

  return (
    <div className='billing'>

      <h2>Total Cost : {Totalcost}</h2>
    </div>
  )

}

export default App;
