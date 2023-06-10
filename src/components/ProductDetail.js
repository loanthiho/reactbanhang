import React from 'react';

const ProductDetail = ({ product }) => {
  // Kiểm tra nếu sản phẩm không tồn tại
  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="container">
      <h3 className="colection">Chi tiết sản phẩm</h3>
      <div className="card">
        <img src={product.avatar} alt={product.name} className="card-img-top" />
        <div className="card-body">
          <h4 className="card-title">{product.name}</h4>
          <p className="card-text">{product.description}</p>
          <p className="card_price"> {product.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
