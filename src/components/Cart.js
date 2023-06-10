import React from 'react';
const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="cart">
      <h3>Giỏ hàng</h3>
      {cartItems.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tiêu đề</th>
              <th>Hình ảnh</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <img src={item.avatar} alt={item.name} />
                </td>
                <td>{item.quatity}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => removeFromCart(item.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Giỏ hàng trống</p>
      )}
    </div>
  );
};

export default Cart;

