import React from 'react'
import { AiOutlineLaptop } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { RiMacbookLine } from "react-icons/ri";

function NewProducts() {
  return (
    <div className='new-products'>
      <h2>SHOP BY CATEGORY</h2>

      <div className="new-product-category">
        <div className="product-category-item">
          <AiOutlineLaptop />
          <p>Laptops</p>
        </div>
        <div className="product-category-item">
          <BsPhone />
          <p>Phones</p>
        </div>
        <div className="product-category-item">
          <RiMacbookLine />
          <p>Macbook</p>
        </div>
      </div>
    </div>
  )
}

export default NewProducts