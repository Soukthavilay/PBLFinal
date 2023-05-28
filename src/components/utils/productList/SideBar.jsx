import React from 'react'

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <h3 className="sidebar-item-title">Laptop</h3>
        <ul className="sidebar-item-list">
          <li>Apple</li>
          <li>Sony</li>
          <li>Asus</li>
          <li>Acer</li>
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