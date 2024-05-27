import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ItemList from './ItemList';

import  imgclear from "../img/clear.png";

function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga
  const { idCategory } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore();
        const itemsCollection = collection(db, 'Products');
        const snapshot = await getDocs(itemsCollection);
        const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log('Productos obtenidos de Firestore:', productsList);

        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.log('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <>  
      <div className="col-md-10 p-lg-2 mx-auto py-2 my-3 my-xl-3 text-bg-dark text-center">
        <h1 className="fw-bold">{greeting}</h1>
      </div>

      <div className="d-flex justify-content-center align-items-center col-md-10 p-lg-3 mx-auto  my-2 my-xl-3 py-2 text-bg-dark text-center">
        <ul className="list-inline text-bg-dark text-center ulCategory">
          <li className="list-inline-item mr-3 mx-3 nav-item px-1 iconoTransicion">
            <Link to={"/category/munecos"} className="nav-link text-white">Muñecos</Link>
          </li>
          <li className="list-inline-item mx-3 mr-3 nav-item px-1 iconoTransicion">
            <Link to={"/category/soportes"} className="nav-link text-white">Soportes</Link>
          </li>
          <li className="list-inline-item mr-3 mx-3 nav-item px-1 iconoTransicion">
            <Link to={"/category/mates"} className="nav-link text-white">Mates</Link>
          </li>
        </ul>
            <div className='d-flex iconoTransicion mx-5 '>
            <Link to={"/itemsProductos"} className="nav-link text-white px-2">Limpiar
                <img src={imgclear} className=" px-3" alt={imgclear} />
            </Link>
             </div>
      </div>
      
      <div className='container'>
        <div className='row'>   
          <ItemList products={idCategory ? products.filter(product => product.category === idCategory) : products} /> 
        </div>
      </div>
    </>
  );
}

export default ItemListContainer;






