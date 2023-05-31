import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

function SideBar() {
  const state = useContext(GlobalState);
  const [bands] = state.BandAPI.bands;
  const [selectedBand, setSelectedBand] = useState('');
  const [id,setId] = useState('');

  const handleClick = (bandName) => {
    setSelectedBand(bandName);
  };

  useEffect(()=>{
    bands.forEach((band)=>{
      if(selectedBand === band.name){
        setId(band._id)
      }
    })
  },[selectedBand,bands,id])

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <h3 className="sidebar-item-title">Laptop</h3>
        <ul className="sidebar-item-list">
          <li onClick={() => handleClick("Lenovo")}><Link to={`/product-list/${id}`}>Lenovo</Link></li>
          <li onClick={() => handleClick("Macbook")}><Link to={`/product-list/${id}`}>Macbook</Link></li>
          <li onClick={() => handleClick("Asus")}><Link to={`/product-list/${id}`}>Asus</Link></li>
          <li onClick={() => handleClick("HP")}><Link to={`/product-list/${id}`}>HP</Link></li>
        </ul>
      </div>
      <div className="sidebar-item">
        <h3 className="sidebar-item-title">Phone</h3>
        <ul className="sidebar-item-list">
          <li>iPhone</li>
          <li>Samsung</li>
          <li>Xiaomi</li>
          <li>Opppo</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar