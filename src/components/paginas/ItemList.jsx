import React from 'react';
import ItemDetail from './ItemDetail';

function ItemList({ products  }) {
  return (
    <>
      {products.map(product => (
        <div className="col-md-3 mb-3" key={product.id}>
          <ItemDetail product={product} />
        </div>
      ))}
    </>
  );
}

export default ItemList;
