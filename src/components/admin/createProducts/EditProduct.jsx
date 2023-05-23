import { useParams } from "react-router-dom"
import { GlobalState } from "../../../GlobalState"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
const initialState = {
    _id: '',
    title: '',
    description: "",
    band: '',
    category: '',
    price: 0,
    amount: 0,
}
const initialFeature = {
    color: '',
    typeOf: '',
    SSDStorage: '',
    processor: '',
    graphicSeries: '',
    operatingSystem: '',
    keyboardLanguage: '',
    hardDiscType: '',
    ram: '',
    inches: '',
    storage: '',
    batteries: '',
    connectivities: '',
    sim: ''
}
const EditProduct = () => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const [product, setProduct] = useState(initialState);
    const [feature, setFeature] = useState(initialFeature);
    const [images, setImages] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;
    const [productShow] = state.productsAPI.products;
    const [category] = state.categoriesAPI.categories;
    const history = useHistory();
    const param = useParams();
    useEffect(()=>{
        if(param.id){
            productShow.forEach(productItem => {
                if(productItem._id === param.id){
                    setProduct(productItem);
                    setFeature(productItem.feature);
                    setImages(productItem.images);
                    console.log(productItem)
                }
            });
        }
    },[param.id,productShow]);
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert('You are not admin');
            const file = e.target.files[0];
            if (!file) return alert('The file is not correct.');
            if (file.size > 1024 * 1024) return alert('Image is large. Please try again');
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('The file is not correct.Please check again ');
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
            await axios.post(`http://localhost:5000/api/products/${product._id}`, { ...result, images });
            setCallback(!callback);
            alert("edited " + result);
            window.location.href = '/admin/createProduct';
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
  return (
    <>
        <div className="edit_product">
            <div className="header"> Create Product </div>
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
                <input
                    type="text"
                    name="band"
                    id="band"
                    required
                    value={product.band}
                    onChange={handleChangeInput}
                    placeholder="Band"
                />
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
        </div>
    </>
  )
}

export default EditProduct