import ProductHeader from '../headerAdmin/ProductHeader';
import Popup from 'reactjs-popup';
import ProductRow from './ProductRow';
import { GlobalState } from '../../../GlobalState';
import '../scss/createProduct.scss'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SuccessPopup from '../../utils/NotFound/SuccessPopup';
const initialState = {
    _id: '',
    title: '',
    description: "",
    band: '',
    category: '',
    price: 20,
    amount: 30,
}
const initialFeature = {
    color: 'Red',
    typeOf: '',
    SSDStorage: '',
    processor: '',
    graphicSeries: '',
    operatingSystem: 'iOS',
    keyboardLanguage: '',
    hardDiscType: '',
    ram: '6 GB',
    inches: '6.5-6.9',
    storage: '256 GB',
    batteries: '4001-5000 mAh',
    connectivities: 'Bluetooth, NFC, WIFI, 4G',
    sim: 'Dual'
}


const Products = () => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const [product, setProduct] = useState(initialState);
    const [feature, setFeature] = useState(initialFeature);
    const [images, setImages] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;
    const [category] = state.categoriesAPI.categories;
    const [bands] = state.BandAPI.bands;
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [productShow] = state.productsAPI.products;
    const [error, setError] = useState("");
    const [alert,setAlert] = useState("");

    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/search?key=${searchKeyword}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return setError('You are not admin');
            const file = e.target.files[0];
            if (!file) return setError('The file is not correct.');
            if (file.size > 1024 * 1024) return setError('Image is large. Please try again');
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') return setError('The file is not correct.Please check again ');
            let formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    //   Authorization: token,
                },
            });

            setImages(res.data);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        setFeature({ ...feature, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if(product.category === '' || product.band === ''){
            setError('Please select a category and band');
          } else {
            const result = {
              title: product.title,
              description: product.description,
              band: product.band,
              category: product.category,
              price: product.price,
              amount: product.amount,
              feature: {
                  color: feature.color,
                  typeOf: feature.typeOf,
                  SSDStorage: feature.SSDStorage,
                  processor: feature.processor,
                  graphicSeries: feature.graphicSeries,
                  operatingSystem: feature.operatingSystem,
                  keyboardLanguage: feature.keyboardLanguage,
                  hardDiscType: feature.hardDiscType,
                  ram: feature.ram,
                  inches: feature.inches,
                  storage: feature.storage,
                  batteries: feature.batteries,
                  connectivities: feature.connectivities,
                  sim: feature.sim
              },
          }
          await axios.post("http://localhost:5000/api/products", { ...result, images });
          setCallback(!callback);
          setError("");
          setAlert("Created Product Success");
          window.location.href = '/admin/createProduct';
          }
        } catch (error) {
            setError(error.response.data.msg);
        }
    }
    const handleSuccessPopupClose = () => {
      setError("");
      setAlert("");
      // window.location.reload();
    };
    return (
      <>
      {error && (<SuccessPopup successMessage={error} onClose={handleSuccessPopupClose} />)}
      {alert && (<SuccessPopup successMessage={alert} onClose={handleSuccessPopupClose} />)}
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Products</h1>
            <button className="mode-switch" title="SwitchTheme">
              <svg
                className="moon"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            <Popup
              trigger={
                <button className="app-content-headerButton button">
                  Add Product
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header"> Create Product </div>
                  <div className="content">
                    {" "}
                    <div className="uploadImg">
                      <input
                        type="file"
                        name="file"
                        id="file_up"
                        onChange={handleUpload}
                      />
                      <label htmlFor="file_up" className="upload-img-btn">
                        Upload files
                      </label>
                      <div id="" className="no-line"></div>
                      <div id="file_img">
                        <img src={images ? images.url : ""} alt="" />
                        <span>X</span>
                      </div>
                    </div>
                    <form className="createProduct" onSubmit={handleSubmit}>
                      <div className="row">
                        {/* <label htmlFor="title">Title</label> */}
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          value={product.title}
                          onChange={handleChangeInput}
                          placeholder="Title"
                        />
                      </div>
                      <div className="row">
                        {/* <label htmlFor="description">Description</label> */}
                        <textarea
                          type="text"
                          name="description"
                          id="description"
                          required
                          value={product.description}
                          rows="10"
                          onChange={handleChangeInput}
                          placeholder="Description"
                        />
                      </div>
                      <div className="row">
                        {/* <label htmlFor="band">Band</label> */}
                        {/* <input
                          type="text"
                          name="band"
                          id="band"
                          required
                          value={product.band}
                          onChange={handleChangeInput}
                          placeholder="Band"
                        /> */}
                        <select name="band" value={product.band} onChange={handleChangeInput}>
                          <option>Band</option>
                          {bands.map((band)=>{
                            return <option value={band._id} key={band._id}>{band.name}</option>
                          })}
                        </select>
                      </div>
                      <div className="row">
                        {/* <label htmlFor="category">Categories</label> */}
                        <select
                          name="category"
                          value={product.category}
                          onChange={handleChangeInput}
                        >
                          <option>Categories</option>
                          {category.map((item) => {
                            return (
                              <option value={item._id} key={item._id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="row">
                        {/* <label htmlFor="price">Price</label> */}
                        <input
                          type="text"
                          name="price"
                          id="price"
                          required
                          value={product.price}
                          onChange={handleChangeInput}
                          placeholder="Price"
                        />
                      </div>
                      <div className="row">
                        {/* <label htmlFor="amount">Amount</label> */}
                        <input
                          type="text"
                          name="amount"
                          id="amount"
                          required
                          value={product.amount}
                          onChange={handleChangeInput}
                          placeholder="Amount"
                        />
                      </div>
                      <div className="feature-product">
                        <label htmlFor="feature">Feature</label>
                        <div className="row">
                          {/* <label htmlFor="color">Color</label> */}
                          <input
                            type="text"
                            name="color"
                            id="color"
                            value={feature.color}
                            onChange={handleChangeInput}
                            placeholder="Color"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="typeOf">typeOf</label> */}
                          <input
                            type="text"
                            name="typeOf"
                            id="typeOf"
                            value={feature.typeOf}
                            onChange={handleChangeInput}
                            placeholder="typeOf"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="SSDStorage">SSD Storage</label> */}
                          <input
                            type="text"
                            name="SSDStorage"
                            id="SSDStorage"
                            value={feature.typeSSDStorageOf}
                            onChange={handleChangeInput}
                            placeholder="SSD Storage"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="processor">Processor</label> */}
                          <input
                            type="text"
                            name="processor"
                            id="processor"
                            value={feature.processor}
                            onChange={handleChangeInput}
                            placeholder="Processor"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="graphicSeries">Graphic Series</label> */}
                          <input
                            type="text"
                            name="graphicSeries"
                            id="graphicSeries"
                            value={feature.graphicSeries}
                            onChange={handleChangeInput}
                            placeholder="Graphic Series"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="operatingSystem">operatingSystem</label> */}
                          <input
                            type="text"
                            name="operatingSystem"
                            id="operatingSystem"
                            value={feature.operatingSystem}
                            onChange={handleChangeInput}
                            placeholder="Operating System"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="keyboardLanguage">keyboardLanguage</label> */}
                          <input
                            type="text"
                            name="keyboardLanguage"
                            id="keyboardLanguage"
                            value={feature.keyboardLanguage}
                            onChange={handleChangeInput}
                            placeholder="Keyboard Language"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="hardDiscType">hardDiscType</label> */}
                          <input
                            type="text"
                            name="hardDiscType"
                            id="hardDiscType"
                            value={feature.hardDiscType}
                            onChange={handleChangeInput}
                            placeholder="Hard Disc Type"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="ram">ram</label> */}
                          <input
                            type="text"
                            name="ram"
                            id="ram"
                            value={feature.ram}
                            onChange={handleChangeInput}
                            placeholder="Ram"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="ram">inches</label> */}
                          <input
                            type="text"
                            name="inches"
                            id="inches"
                            value={feature.inches}
                            onChange={handleChangeInput}
                            placeholder="Inches"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="storage">storage</label> */}
                          <input
                            type="text"
                            name="storage"
                            id="storage"
                            value={feature.storage}
                            onChange={handleChangeInput}
                            placeholder="Storage"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="batteries">batteries</label> */}
                          <input
                            type="text"
                            name="batteries"
                            id="batteries"
                            value={feature.batteries}
                            onChange={handleChangeInput}
                            placeholder="Batteries"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="connectivities">connectivities</label> */}
                          <input
                            type="text"
                            name="connectivities"
                            id="connectivities"
                            value={feature.connectivities}
                            onChange={handleChangeInput}
                            placeholder="Connectivities"
                          />
                        </div>
                        <div className="row">
                          {/* <label htmlFor="sim">sim</label> */}
                          <input
                            type="text"
                            name="sim"
                            id="sim"
                            value={feature.sim}
                            onChange={handleChangeInput}
                            placeholder="Sim"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn--animated btn--primary--blue btn--border--blue"
                      >
                        Create
                      </button>
                    </form>
                    <div className="actions">
                      {/* <Popup
                        trigger={
                          <button className="button btn btn--animated btn--primary--blue btn--border--blue">
                            {" "}
                            Create{" "}
                          </button>
                        }
                        nested
                      >
                        <span>Success</span>
                      </Popup> */}
                      <button
                        className="button btn btn--animated btn--primary--white btn--border--blue"
                        onClick={() => {
                          close();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
          <div className="app-content-actions">
            <input type="text" 
            className="search-bar"
            placeholder="SEARCH HERE"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }} />
            {searchResults.length > 0 && (
            <div className='product-area-wrapper tableView'>
              {searchResults.map((productShow) => (
                <ProductRow key={productShow._id} productShow={productShow}/>
              ))}
            </div>
          )}
            <div className="app-content-actions-wrapper">
              <div className="filter-button-wrapper">
                {/* <button className="action-button filterJsFilter">
                  <span>Filter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-filter"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button> */}
                {/* <div className="filter-menu">
                  <label htmlFor="Category">Category</label>
                  <select name="" id="">
                    <option>All Categories</option>
                    <option>Furniture</option>
                    <option>Decoration</option>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                  </select>
                  <label htmlFor="Status">Status</label>
                  <select name="" id="">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                  <div className="filter-menu-buttons">
                    <button className="filter-button-reset">Reset</button>
                    <button className="filter-button-apply">Apply</button>
                  </div>
                </div> */}
              </div>
              {/* <button className="active-button list active" title="List View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-list"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button> */}
              {/* <button className="action-button grid" title="Grid View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button> */}
            </div>
          </div>
          <div className="product-area-wrapper tableView">
            <ProductHeader />
            {productShow.map((product) => {
              return <ProductRow key={product._id} productShow={product} />;
            })}
          </div>
        </div>
      </>
    );
}

export default Products