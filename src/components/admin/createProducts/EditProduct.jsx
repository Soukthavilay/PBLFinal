import { useParams } from "react-router-dom"
import { GlobalState } from "../../../GlobalState"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import "../scss/edit-product.scss"
import Loading from "../../utils/Loading/Loading"
import DatePicker from 'react-datepicker';

const EditProduct = () => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token
    const [images, setImages] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;
    const [productShow] = state.productsAPI.products;
    const [category] = state.categoriesAPI.categories;
    const [bands] = state.BandAPI.bands;
    const [loading,setLoading] = useState(false);
    const [edit,setEdit] = useState({
        _id: '',
        title: '',
        description: "",
        band: '',
        category: '',
        price: 0,
        amount: 0,
        discountPercentage: 0,
        discountExpiration: null,
        feature: {
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
    })
    const param = useParams();
    useEffect(()=>{
        if(param.id){
            productShow && productShow?.forEach(productItem => {
                if(productItem._id === param.id){
                    setEdit(productItem);
                    setImages(productItem.images);
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
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setImages(res.data);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`http://localhost:5000/api/products/${edit._id}`, { ...edit, images },{
                headers: { Authorization: token },
            });
            setCallback(!callback);
            setLoading(false);
            window.location.href = '/admin/createProduct';
        } catch (error) {
            console.log(error);
        }
    }
    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert('you not admin');
            setLoading(true);
            await axios.post(
                'http://localhost:5000/api/destroy',
                { public_id: images.public_id },
                {
                    headers: { Authorization: token },
                }
            );
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const styleUpload = {
        display: images ? 'block' : 'none',
      };
  return (
    <>
        <div className="edit_product">
            <div className="header"> Update Product </div>
            <label htmlFor="file_up" className="upload-img-btn">
                Upload files
            </label>
            <div className="uploadImg">
                <input
                type="file"
                name="file"
                id="file_up"
                onChange={handleUpload}
                />
                {loading ? 
                <div id="file_img" className="no-line">
                    <Loading />
                </div> : 
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ""} alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
            </div>
            <form className="createProduct" onSubmit={handleSubmit}>
                <div className="row">
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={edit.title ? edit.title : "no have"}
                    onChange={handleChangeInput}
                    placeholder="Title"
                />
                </div>
                <div className="row">
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    required
                    value={edit.description ? edit.description : "no have"}
                    rows="10"
                    onChange={handleChangeInput}
                    placeholder="Description"
                />
                </div>
                <div className="row">
                <input
                    type="text"
                    name="discountPercentage"
                    id="discountPercentage"
                    value={edit.discountPercentage || ''}
                    onChange={handleChangeInput}
                    placeholder="discountPercentage"
                    />
                </div>
                <div className="row">
                    <DatePicker
                        selected={edit.discountExpiration ? new Date(edit.discountExpiration) : null}
                        onChange={date => setEdit({ ...edit, discountExpiration: date })}
                        placeholderText="Discount Expiration"
                        className="datepicker-input"
                    />
                </div>
                <div className="row">
                {/* <input
                    type="text"
                    name="band"
                    id="band"
                    required
                    value={edit.band}
                    onChange={handleChangeInput}
                    placeholder="Band"
                /> */}
                <select name="band" value={edit.band ? edit.band : "no have"} onChange={handleChangeInput}>
                    <option>Band</option>
                    {bands.map((band)=>{
                    return <option value={band._id} key={band._id}>{band.name}</option>
                    })}
                </select>
                </div>
                <div className="row">
                <select
                    name="category"
                    value={edit.category ? edit.category : "no have"}
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
                <input
                    type="text"
                    name="price"
                    id="price"
                    required
                    value={edit.price}
                    onChange={handleChangeInput}
                    placeholder="Price"
                />
                </div>
                <div className="row">
                <input
                    type="text"
                    name="amount"
                    id="amount"
                    required
                    value={edit.amount}
                    onChange={handleChangeInput}
                    placeholder="Amount"
                />
                </div>
                <div className="feature-product">
                <label htmlFor="feature">Feature</label>
                <div className="row">
                    <input
                    type="text"
                    name="color"
                    id="color"
                    value={edit.feature.color ? edit.feature.color : "null"}
                    onChange={handleChangeInput}
                    placeholder="Color"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="typeOf"
                    id="typeOf"
                    value={edit.feature.typeOf ? edit.feature.typeOf : "null"}
                    onChange={handleChangeInput}
                    placeholder="typeOf"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="SSDStorage"
                    id="SSDStorage"
                    value={edit.feature.SSDStorage ? edit.feature.SSDStorage : "null"}
                    onChange={handleChangeInput}
                    placeholder="SSD Storage"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="processor"
                    id="processor"
                    value={edit.feature.processor ? edit.feature.processor : "null"}
                    onChange={handleChangeInput}
                    placeholder="Processor"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="graphicSeries"
                    id="graphicSeries"
                    value={edit.feature.graphicSeries ? edit.feature.graphicSeries : "null"}
                    onChange={handleChangeInput}
                    placeholder="Graphic Series"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="operatingSystem"
                    id="operatingSystem"
                    value={edit.feature.operatingSystem ? edit.feature.operatingSystem : "null"}
                    onChange={handleChangeInput}
                    placeholder="Operating System"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="keyboardLanguage"
                    id="keyboardLanguage"
                    value={edit.feature.keyboardLanguage ? edit.feature.keyboardLanguage : "null"}
                    onChange={handleChangeInput}
                    placeholder="Keyboard Language"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="hardDiscType"
                    id="hardDiscType"
                    value={edit.feature.hardDiscType ? edit.feature.hardDiscType : "null"}
                    onChange={handleChangeInput}
                    placeholder="Hard Disc Type"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="ram"
                    id="ram"
                    value={edit.feature.ram ? edit.feature.ram : "null"}
                    onChange={handleChangeInput}
                    placeholder="Ram"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="inches"
                    id="inches"
                    value={edit.feature.inches ? edit.feature.inches : "null"}
                    onChange={handleChangeInput}
                    placeholder="Inches"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="storage"
                    id="storage"
                    value={edit.feature.storage ? edit.feature.storage : "null"}
                    onChange={handleChangeInput}
                    placeholder="Storage"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="batteries"
                    id="batteries"
                    value={edit.feature.batteries ? edit.feature.batteries : "null"}
                    onChange={handleChangeInput}
                    placeholder="Batteries"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="connectivities"
                    id="connectivities"
                    value={edit.feature.connectivities ? edit.feature.connectivities : "null"}
                    onChange={handleChangeInput}
                    placeholder="Connectivities"
                    />
                </div>
                <div className="row">
                    <input
                    type="text"
                    name="sim"
                    id="sim"
                    value={edit.feature.sim ? edit.feature.sim : "null"}
                    onChange={handleChangeInput}
                    placeholder="Sim"
                    />
                </div>
                </div>
                <button
                type="submit"
                className="btn btn--animated btn--primary--blue btn--border--blue"
                >
                Update
                </button>
            </form>
        </div>
    </>
  )
}

export default EditProduct