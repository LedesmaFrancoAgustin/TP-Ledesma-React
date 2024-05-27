import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import ItemDetail from './ItemDetail';


function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore();
        const productRef = doc(db, 'Products', productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      {product ? (
        <div className="container">
          <div className="row">
            <ItemDetail product={product} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ItemDetailContainer;
