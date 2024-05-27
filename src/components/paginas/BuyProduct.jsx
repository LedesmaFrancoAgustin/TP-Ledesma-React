import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { updatecartItems } from '../Navbar';
import { clearCartCount } from "../Navbar";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import imgclearBuy from "../img/clear.png";

function BuyProduct() {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItemIds, setCartItemIds] = useState(updatecartItems());
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  console.log("BuyProduct : ", cartItemIds);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore();
        
        // Contar la cantidad de cada producto
        const itemCountMap = cartItemIds.reduce((acc, itemId) => {
          acc[itemId] = (acc[itemId] || 0) + 1;
          return acc;
        }, {});
        
        const uniqueItemIds = Object.keys(itemCountMap);

        const productsPromises = uniqueItemIds.map(async (itemId) => {
          const prodRef = doc(db, "Products", itemId);
          const snapshot = await getDoc(prodRef);
          if (snapshot.exists()) {
            return { ...snapshot.data(), id: itemId, quantity: itemCountMap[itemId] };
          } else {
            console.log(`No such product with ID: ${itemId}`);
            return null;
          }
        });
        
        const productsData = await Promise.all(productsPromises);
        const validProducts = productsData.filter(product => product !== null); // Filtra productos que no existen
        setProducts(validProducts);

        // Calcular el monto total considerando la cantidad de cada producto
        const total = validProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setTotalAmount(total);

        // Si el carrito está vacío, redirige a la página de productos
        if (validProducts.length === 0) {
          navigate('/itemsProductos');
        }
      } catch (error) {
        console.error('Error getting products:', error);
      }
    };

    fetchProducts();
  }, [cartItemIds, navigate]);

  const handleRemoveProduct = (productId) => {
    const itemCountMap = cartItemIds.reduce((acc, itemId) => {
      acc[itemId] = (acc[itemId] || 0) + 1;
      return acc;
    }, {});
    
    const updatedCartItems = cartItemIds.filter(itemId => itemId !== productId);
    setCartItemIds(updatedCartItems);

    // Enviar la cantidad de productos que se eliminan a clearCartCount
    clearCartCount(itemCountMap[productId], productId);
  };

  const handleReduceQuantity = (productId) => {
    const updatedCartItems = [...cartItemIds];
    const productIndex = updatedCartItems.indexOf(productId);

    if (productIndex !== -1) {
      updatedCartItems.splice(productIndex, 1);
      setCartItemIds(updatedCartItems);
      clearCartCount(1, productId); // Restar una unidad del contador del carrito
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCartItems = [...cartItemIds];
    updatedCartItems.push(productId);
    setCartItemIds(updatedCartItems);
    clearCartCount(-1, productId); // Sumar una unidad al contador del carrito
  };

  return (
    <div className="d-flex justify-content-center align-items-center container mt-5">
      <div className="row w-100 d-flex justify-content-center  ">

        <div className=' col-md-4 '>  
        {products.map((product, index) => (
          <div key={index} className="d-flex justify-content-center mb-3">
            <div className="card cardBuyProduct w-100">
              <div className="image-container">
                <div className="first">
                  <div className="d-flex justify-content-between align-items-center">
                    <button onClick={() => handleRemoveProduct(product.id)} className="btnClearBuy">
                        <img src={imgclearBuy} className="img-circle iconoTransicionLow" alt="imgclearBuy" />
                    </button>
                  </div>
                </div>
                <img src={product.Image} className="img-fluid rounded thumbnail-image imgCardProductosBuyProduct" alt={product.name} />
              </div>
              <div className="product-detail-container p-2">
                <div className="d-flex justify-content-between align-items-center border-bottom border-black">
                  <h5 className="dress-name">{product.name}</h5>
                  <div className="d-flex flex-column mb-2">
                    <span className="new-price">Precio: ${product.price}</span>
                    <small className="old-price text-right"></small>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center pt-1">
                  <div>
                    <i className="fa fa-star-o rating-star"></i>
                    <h5 className="dress-name w-100">
                      Cantidad: {product.quantity}
                      <button onClick={() => handleReduceQuantity(product.id)} className="btnLess ms-4">-</button>
                      <button onClick={() => handleIncreaseQuantity(product.id)} className="btnMore ms-2">+</button>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>

        <div className="  col-md-6 d-flex justify-content-center mb-3">
          <div className="">
            <div className=" sticky-form bg-light p-4 rounded">
              <h2 className="mb-4 text-center">Formulario de Pago</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">Nombre del Titular</label>
                  <input type="text" className="form-control" id="cardName" placeholder="Nombre del Titular de la Tarjeta" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Número de la Tarjeta</label>
                  <input type="text" className="form-control" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cardExpiry" className="form-label">Fecha de Vencimiento</label>
                    <input type="text" className="form-control" id="cardExpiry" placeholder="MM/AA" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cardCVV" className="form-label">CVV</label>
                    <input type="text" className="form-control" id="cardCVV" placeholder="CVV" required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="amountToPay" className="form-label">Monto a Pagar</label>
                  <input type="text" className="form-control" id="amountToPay" value={`$${totalAmount}`} readOnly />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="saveCard" />
                  <label className="form-check-label" htmlFor="saveCard">Guardar esta tarjeta para futuras compras</label>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btnPay">Realizar Pago</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default BuyProduct;
