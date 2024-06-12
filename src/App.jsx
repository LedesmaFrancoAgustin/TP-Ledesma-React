import { useState } from 'react'

import {BrowserRouter,Route,Routes} from "react-router-dom"

import Index from "./components/paginas/Index"
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/paginas/ItemListContainer";
import ItemDetailContainer from "./components/paginas/ItemDetail";

import BuyProduct from './components/paginas/BuyProduct';

import Product from './components/paginas/detail';


import PageNotFound from "./components/paginas/PageNotFound"

import { CartContextProvider } from './components/paginas/cartContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <CartContextProvider>

      
      <Navbar/>
        <Routes>

          <Route exact path="/" element={<Index/>} /> 
          <Route exact path="/itemsProductos" element={<ItemListContainer greeting={"Productos"}/> }/>
          <Route path="/category/:idCategory" element={<ItemListContainer greeting={"Productos"}/> }/>
          <Route path="/detail/:idProduct" element={<ItemDetailContainer/>}/>
          <Route path="/BuyProduct" element={<BuyProduct />} />
          <Route path="/product/:id" element={<Product/>} />
    
          <Route path="*" element={<PageNotFound/>} />
  

      </Routes>
      </CartContextProvider>
      </BrowserRouter>
      
        
    </>
  )
}

export default App
