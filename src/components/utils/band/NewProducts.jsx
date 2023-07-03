import React from 'react'
import { AiOutlineLaptop } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { RiMacbookLine } from "react-icons/ri";
import '../scss/new-product.scss';
import { AiOutlineShoppingCart } from "react-icons/ai";

function NewProducts() {
  return (
    <div className='new-product'>
      <h2>SHOP BY CATEGORY</h2>

      <div className="new-product-category">
        <div className="product-category-item active">
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
 
      <div className="new-product-list">
        <div className="new-product-item">
          <div className="product-img">
            <img src="https://res.cloudinary.com/dkiofoako/image/upload/v1687458610/test/gohtowr9yxmbix5rgnee.jpg" alt="" />
            <div className="product-overlay">
              <AiOutlineShoppingCart />
            </div>
          </div>
          <div className="product-detail">
            <h2>iPhone 14 Pro Max</h2>
            <span>$200</span>
          </div>
        </div>
        <div className="new-product-item">
          <div className="product-img">
            <img src="https://res.cloudinary.com/dkiofoako/image/upload/v1687458610/test/gohtowr9yxmbix5rgnee.jpg" alt="" />
            <div className="product-overlay">
              <AiOutlineShoppingCart />
            </div>
          </div>
          <div className="product-detail">
            <h2>iPhone 14 Pro Max</h2>
            <span>$200</span>
          </div>
        </div>
        <div className="new-product-item">
          <div className="product-img">
            <img src="https://res.cloudinary.com/dkiofoako/image/upload/v1687458610/test/gohtowr9yxmbix5rgnee.jpg" alt="" />
            <div className="product-overlay">
              <AiOutlineShoppingCart />
            </div>
          </div>
          <div className="product-detail">
            <h2>iPhone 14 Pro Max</h2>
            <span>$200</span>
          </div>
        </div>
        <div className="new-product-item">
          <div className="product-img">
            <img src="https://res.cloudinary.com/dkiofoako/image/upload/v1687458610/test/gohtowr9yxmbix5rgnee.jpg" alt="" />
            <div className="product-overlay">
              <AiOutlineShoppingCart />
            </div>
          </div>
          <div className="product-detail">
            <h2>iPhone 14 Pro Max</h2>
            <span>$200</span>
          </div>
        </div>
        <div className="new-product-item">
          <div className="product-img">
            <img src="https://res.cloudinary.com/dkiofoako/image/upload/v1687458610/test/gohtowr9yxmbix5rgnee.jpg" alt="" />
            <div className="product-overlay">
              <AiOutlineShoppingCart />
            </div>
          </div>
          <div className="product-detail">
            <h2>iPhone 14 Pro Max</h2>
            <span>$200</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProducts