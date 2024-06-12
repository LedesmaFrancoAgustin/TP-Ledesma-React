import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../paginas/cartContext';
import imgBuy from "../img/buy.png";

const ItemDetail = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [currentStock, setCurrentStock] = useState(product.stock);

  const handleAddToCart = (id) => {
    if (currentStock > 0) {
      addToCart(id);
      setCurrentStock(currentStock - 1);
    } else {
      alert('Stock no disponible');
    }
  };

  const clickNavigatePag = (id) => {
    handleAddToCart(id);
    navigate('/BuyProduct');
  };

  const clickNavigatePagDetail = (id) => {
    navigate('/detail/' + id);
  };

  return (
    <>
      <div className="card w-100" style={{ height: '520px' }}>
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
          <div className="">
            <p className="">Stock: {currentStock}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <i className="fa fa-star-o rating-star"></i>
              <p className="rating-number p-1">{product.description}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link to={"/product/" + product.id} className="nav-link text-black">Más detalle</Link>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="voutchers w-100">
          <div className="voutcher-divider">
            <div className="voutcher-left">
              <button className="btnAddBuy iconoTransicionLow" onClick={() => handleAddToCart(product.id)}>
                Agregar Carrito
              </button>
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
