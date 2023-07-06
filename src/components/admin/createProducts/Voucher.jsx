import React, { useContext, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

import SuccessPopup from '../../utils/NotFound/SuccessPopup';

function Voucher({ category }) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const categories = category;
  const [data, setData] = useState({
    code: '',
    discountPercentage: 0,
    applicableCategory: '',
    expirationDate: '',
    description: '',
    conditions: '',
    priceConditions: 0,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://pbl-technology-988327da4050.herokuapp.com/api/voucher',
        { ...data },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setShowSuccessModal(true);
    } catch (error) {
      alert('Failed to create');
      console.error(error);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  return (
    <>
      <h3>Write a product review</h3>

      <div className="comment-form">
        <input
          type="text"
          placeholder="Code Voucher"
          name="code"
          value={data.code}
          onChange={handleChangeInput}
        />
        <input
          type="text"
          placeholder="Discount Percentage"
          name="discountPercentage"
          value={data.discountPercentage}
          onChange={handleChangeInput}
        />
        <ReactDatePicker
          selected={data.expirationDate ? new Date(data.expirationDate) : null}
          onChange={(date) => setData({ ...data, expirationDate: date })}
          placeholderText="Discount Expiration"
          className="datepicker-input"
        />

        <input
          type="text"
          placeholder="Descriptions for Voucher"
          name="description"
          value={data.description}
          onChange={handleChangeInput}
        />
        <input
          type="text"
          placeholder="Conditions Voucher"
          name="conditions"
          value={data.conditions}
          onChange={handleChangeInput}
        />
        <select
          name="applicableCategory"
          value={data.applicableCategory}
          onChange={handleChangeInput}
        >
          <option>Categories</option>
          {categories.map((item) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Price Conditions"
          name="priceConditions"
          value={data.priceConditions}
          onChange={handleChangeInput}
        />
        <button
          type="button"
          onClick={handleCreate}
          className="btn btn--animated btn--primary--blue btn--border--blue"
        >
          Submit a review
        </button>
      </div>

      {showSuccessModal && (
        <SuccessPopup
            onClose={handleSuccessClose}
          successMessage="Voucher created successfully!"
        />
      )}
    </>
  );
}

export default Voucher;
