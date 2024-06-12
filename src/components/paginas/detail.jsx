import React from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../paginas/cartContext';

import  imgBuy from "../img/buy.png";


function detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const { addToCart } = useCart();
    const navigate = useNavigate();

  const handleAddToCart = (id) => {
    navigate('/itemsProductos');
  };

  const clickNavigatePag = (id) => {
    addToCart(id);
    navigate('/BuyProduct');
       
      };

  useEffect(() => {
    const fetchProduct = async () => {
      const db = getFirestore();
      const docRef = doc(db, "Products", id);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchProduct();

    return () => {
      // Clean up function if needed
    };
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center container mt-5">
    <div className="row justify-content-center">
      <div className="col-12 mb-3 d-flex justify-content-center">
        <div className="col-4">
          <div className="d-flex justify-content-center">
            <div className="card cardBuyProduct w-100">
              <div className="image-container">
                <div className="first">
                  <div className="d-flex justify-content-between align-items-center">
                  </div>
                </div>
                <img src={product.Image} className="img-fluid rounded thumbnail-image imgCardProductosBuyProduct" alt={product.name} />
              </div>
              <div className="product-detail-container p-2">
                <div className="d-flex justify-content-between align-items-center border-bottom border-black">
                  <h5 className="dress-name">{product.name}</h5>
                  <div className="d-flex flex-column mb-2">
                    <span className="new-price">Precio: ${product.price}</span>
                    
                  </div>
                </div>
                
                <div className="d-flex justify-content-center align-items-center">
                  <div>
                    <i className="fa fa-star-o rating-star"></i>
                    <p className="rating-number p-1">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 mt-3 d-flex justify-content-center">
        <div className="col-4  ">
          <div className="voutchers w-100">
            <div className="voutcher-divider">
              <div className="voutcher-left">
                <button className="btnAddBuy iconoTransicionLow" onClick={() => handleAddToCart(id)}>Volver</button>
              </div>
              <div className="voutcher-right text-center border-left py-2 iconoZoomCarritoHover">
                <div onClick={() => clickNavigatePag(id)} className="voutcher-code" style={{ cursor: 'pointer' }}>
                  <img className="" src={imgBuy} alt="buy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
  
}

export default detail
