import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore, updateDoc, setDoc, collection, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import imgclearBuy from "../img/clear.png";
import { useCart } from '../paginas/cartContext';


function BuyProduct() {
  const { cartItems, removeFromCart, removeAllItemsById, addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [showVoucher, setShowVoucher] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(true);

  

  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [voucherId, setVoucherId] = useState(null);

  const handleContinueShopping = () => {
    clearCart();
    navigate('/itemsProductos');
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore();
        const itemCountMap = cartItems.reduce((acc, itemId) => {
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
        const validProducts = productsData.filter(product => product !== null);
        setProducts(validProducts);

        const total = validProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setTotalAmount(total);

        if (validProducts.length === 0) {
          navigate('/itemsProductos');
        }
      } catch (error) {
        console.error('Error getting products:', error);
      }
    };

    fetchProducts();
  }, [cartItems, navigate]);

  const handleRemoveProduct = (productId) => {
    const updatedCartItems = cartItems.filter(item => item !== productId);
   
    removeAllItemsById(productId);
   
    setProducts(products.filter(product => product.id !== productId));
    setTotalAmount(totalAmount - products.find(product => product.id === productId).price);
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    
    const db = getFirestore();
    const batch = writeBatch(db);

    try {
      const voucherRef = doc(collection(db, "Vouchers"));
      const voucherData = {
        items: products.map(product => ({
          productId: product.id,
          quantity: product.quantity,
          price: product.price
        })),
        totalAmount,
        createdAt: serverTimestamp(),
      };

      batch.set(voucherRef, voucherData);

      products.forEach(product => {
        const productRef = doc(db, "Products", product.id);
        const newStock = product.stock - product.quantity;

        batch.update(productRef, { stock: newStock });
      });

      
      await batch.commit();

      const voucherDoc = await getDoc(voucherRef);
      const voucherId = voucherDoc.id;

      setShowPaymentForm(false);
      setShowVoucher(true);
      setVoucherId(voucherId);
     // navigate('/Voucher');

    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div className="">   
      <div className="d-flex justify-content-center align-items-center container mt-5">
      <div className="row w-100 d-flex justify-content-center">
        <div className='col-md-4'>  
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
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-6 d-flex justify-content-center mb-3">
        {showPaymentForm && (
          <div>
            <div className="sticky-form bg-light p-4 rounded">
              <h2 className="mb-4 text-center">Formulario de Pago</h2>
              <form onSubmit={handlePayment}>
                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">Nombre del Titular</label>
                  <input type="text" className="form-control" id="cardName" placeholder="Nombre del Titular de la Tarjeta"  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Número de la Tarjeta</label>
                  <input type="text" className="form-control" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX"  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cardExpiry" className="form-label">Fecha de Vencimiento</label>
                    <input type="text" className="form-control" id="cardExpiry" placeholder="MM/AA"  />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cardCVV" className="form-label">CVV</label>
                    <input type="text" className="form-control" id="cardCVV" placeholder="CVV"  />
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
        )}
        </div>
      </div>
      
    </div>
{showVoucher && (  
<div className="">
<div className="row w-100 d-flex justify-content-center">
  <div className="col-md-6">
    <div className="sticky-form bg-light p-4 rounded">
      <h2 className="mb-4 text-center">Comprobante de Compra</h2>
      <div className="mb-3">
        <h4>¡Gracias por tu compra!</h4>
        <p>Los siguientes productos se han comprado con éxito:</p>
         <p>Orden de compra : {voucherId}</p> {/* Aquí mostramos el ID del voucher */}
        
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.name} - Cantidad: {product.quantity}</li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <p>Total pagado: ${totalAmount}</p>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btnPay" onClick={handleContinueShopping}>Continuar Comprando</button>
      </div>
    </div>
  </div>
</div>
</div>
)}
</div>
  );
}

export default BuyProduct;

