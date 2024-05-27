import React from 'react';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { updateCartCount } from '../Navbar';
import  imgBuy from "../img/buy.png";

const ItemDetail = ({ product   }) => {

    const navigate = useNavigate();

    const handleAddToCart = (id) => {
        console.log("Entró handleAddToCart", id);
        // Llama a la función updateCartCount para actualizar el contador del carrito
        updateCartCount(id); // Puedes pasar cualquier valor según sea necesario

       
      };

      const clickNavigatePag = (id) => {

        handleAddToCart(id)

        navigate('/BuyProduct');
       
      };
  return (
    <>
      <div className="card w-100" style={{ height: '520px' }}> {/* Establecer un ancho fijo para todas las tarjetas */}
        <div className="image-container">
          <div className="first">
            <div className="d-flex justify-content-between align-items-center">
              <span className=""></span>
            </div>
          </div>
          <img src={product.Image} className="img-fluid rounded thumbnail-image" />
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
              <p className="rating-number p-1">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="voutchers w-100">
            
                <div className="voutcher-divider">
                    <div className=" voutcher-left ">
                                              
                    <button className=" btnAddBuy iconoTransicionLow " onClick={() => handleAddToCart(product.id)}> Agregar Carrito</button>

                    </div>
                     <div className="voutcher-right text-center border-left py-2 iconoZoomCarritoHover">
                        <div onClick={() => clickNavigatePag(product.id)} className="voutcher-code" style={{ cursor: 'pointer' }}>
                             <img className="" src={imgBuy} alt="buy" />
                        </div>
                    </div>
                    
                </div>
          
        </div>
        
        
      </div>
    </>
  );
}

export default ItemDetail;
