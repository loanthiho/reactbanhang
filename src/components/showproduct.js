import React from 'react';
import data from './db.json';

class Show extends React.Component {
  render() {
    return (//phương thức map(), phương thức render() mấy cái này được gọi chung là phương thức 
        <div className='body'>
            <div className='container'>
                <h3 className='bodyh3'>Thông tin sản phẩm</h3>
                <div className='row'>
                    {data.map((card) => (
                        <div key={card.id} className="col-md-3 col-xl-3"style={{ color: 'black'}}>
                            <div  className='item'>
                                <img src={card.image} alt={card.title} className='image' />
                                <h4 className='informationproductp1'>{card.name}</h4>
                                <h4 className='informationproductp2'>{card.class}</h4>
                                <p className='informationproductp1'>{card.age}</p>
                                <p className='informationproductp1'>{card.gender}</p>
                                <button className='btn btn-primary '  typeof='supmit' >Xem chi tiết thông tin </button>
                            </div>
                            <br></br>
                        </div>
                    ))}
                    </div>
                </div>
          </div>
        );
    }
}

export default Show;