import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { useCart } from './paginas/cartContext'; // Reemplaza 'path-to-your-cart-context' con la ruta correcta a tu archivo de contexto de carrito

import logo from '../assets/logo.png';
import './bootstrap.min.css';
import './navbar.css';
import '../components/estilo.css';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary colorFondoNav sticky-NavBar">
        <div className="w-100 text-bg-dark">
          <div className="container d-lg-flex">
            <div className="d-lg-flex align-items-center">
              <div className="d-flex justify-content-center">
                <a href="/" className="navbar-brand align-items-center my-2 my-lg-0 me-lg-auto text-decoration-none text-white">
                  <img className="bi me-2 iconoZoom" width="32" height="32" src={logo} alt="Logo" />
                  LedesmaPrints 3D
                </a>
              </div>
              <div className="d-flex justify-content-center pb-4">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></button>
              </div>
            </div>
            <div className="collapse navbar-collapse px-3 py-2" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end px-4 align-items-center">
                <li className="nav-item px-1 iconoTransicion">
                  <Link to={"/"} className="nav-link text-white" > Inicio </Link>
                </li>
                <li className="nav-item px-1 iconoTransicion">
                  <Link to={"/itemsProductos"} className="nav-link text-white" > Productos </Link>
                </li>
                <li className="nav-item px-1 iconoTransicion">
                  <Link to={"/"} className="nav-link text-white" > Galeria </Link>
                </li>
                <li className="nav-item px-1 iconoTransicion">
                  <Link to={""} className="nav-link text-white" > Nosotros </Link>
                </li>
                <li className="nav-item px-1 iconoTransicion">
                  <Link to={""} className="nav-link text-white" > Contacto </Link>
                </li>
              </ul>
              <div className="carrito iconoTransicion">
                <Link to={`/BuyProduct`}>
                  <BsCart2 size="30px"/>
                  <span className='badge'>{cartCount}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
