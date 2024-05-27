import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (id) => {
    setCartItems(prevItems => [...prevItems, id]);
    setCartCount(prevCount => prevCount + 1);
  };

  const removeFromCart = (id) => {
    const indexToRemove = cartItems.findIndex(item => item === id);
    if (indexToRemove !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(indexToRemove, 1);
      setCartItems(updatedCartItems);
      setCartCount(prevCount => prevCount - 1);
    }
  };
  

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };
  const removeAllItemsById = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item !== id));
    const removedItemsCount = cartItems.filter(item => item === id).length;
    setCartCount(prevCount => prevCount - removedItemsCount);
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, removeFromCart, clearCart ,removeAllItemsById}}>
      {children}
    </CartContext.Provider>
  );
};
