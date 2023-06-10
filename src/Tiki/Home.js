import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import "../Tiki/tiki.css";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:8000/api/get-Tiki').
          then((res) => { setData(res.data) }).
          catch((err) => { console.log("ERRORS: " + err) });
  }, []);
  return (
    <div className="item" >
      
      {data.map((e) => (
        <div className="col-md-4 my-5" key={e.id}>
          <div className="card" style={{ width: '18rem' }}>
          <img src={e.image} alt="Hình ảnh" />
            <div className="card-body">
              <h5 className="card-title">{e.name}</h5>
              <p className="card-text">$ {e.price}</p>
              <p className="card-text">{e.description}</p>
              <p className="card-text"> ~ {e.rate}%</p>
            </div>
          </div>
        </div>
      ))}
  </div>
  )
}

export default Home
