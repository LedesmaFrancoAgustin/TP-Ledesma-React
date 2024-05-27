import React from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';


function detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

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
      <div className="row w-100 d-flex justify-content-center  ">

        <div className=' col-md-4 '>  
          <div  className="d-flex justify-content-center mb-3">
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
          </div>
        

        </div>

      </div>
    </div>
  );
  
}

export default detail
