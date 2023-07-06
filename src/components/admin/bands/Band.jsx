import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

import '../scss/band.scss'
import Loading from '../../utils/Loading/Loading'

const Band = () => {
    const state = useContext(GlobalState);
    const [bands] = state.BandAPI.bands;
    const [callback, setCallback] = state.BandAPI.callback
    const [loading,setLoading] = useState(false)
    const [images, setImages] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [band, setBand] = useState('');
    const [id, setID] = useState('')

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return alert('File does not exist.');
            if (file.size > 1024 * 1024)
                return alert('Image size is too big. Try to change another photo');
            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                // 1mb
                return alert('The file is incorrect. Please check back');
            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const res = await axios.post('https://pbl-technology-988327da4050.herokuapp.com/api/upload', formData, {
            });
            setLoading(false);
            setImages(res.data);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const styleUpload = {
        display: images ? 'block' : 'none',
    };
    const xStyle = {
        color: 'red',
        left: '69px',
        top: '-20px',
        cursor: 'pointer'
    }
    const handleDestroy = async () => {
        try {
            setLoading(true);
            await axios.post(
                'https://pbl-technology-988327da4050.herokuapp.com/api/destroy',
                { public_id: images.public_id },
            );
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const createBand = async e =>{
        e.preventDefault();
        try {
            let result;
            if(onEdit){
                result = {
                    name: band,
                    logo: images,
                    bandId: id
                }
                await axios.put('https://pbl-technology-988327da4050.herokuapp.com/api/band', {...result})
                alert("Success")
            }else{
                result = {
                    name: band,
                    logo: images,
                }
                await axios.post('https://pbl-technology-988327da4050.herokuapp.com/api/band', {...result})
                alert("Success")
            }
            setOnEdit(false)
            setBand('')
            setCallback(!callback)
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    const editCategory = async (id, name,img) =>{
        setID(id)
        setBand(name)
        setOnEdit(true)
        setImages(img)
    }
    const label = {
        cursor: 'pointer',
    }
  return (
    <>
        <div className='create-band'>
            <div className="band-field">
                <input className='' type="text" name="category" value={band} required
                    onChange={e => setBand(e.target.value)} />
                {onEdit ? <>
                    <div className="upload">
                    <input hidden type="file" name="file" id="file_up" onChange={handleUpload} />
                    <label style={label} htmlFor="file_up" className="app-content-headerButton button upload-img-btn">Upload files</label>
                    {loading ? (
                    <div id="file_img">
                        <Loading />
                    </div>
                    ) : (
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt="image" />
                        <span style={xStyle} onClick={handleDestroy}>X</span>
                    </div>
                    )}
                </div>
                </> : <>
                <div className="upload">
                    <input hidden type="file" name="file" id="file_up" onChange={handleUpload} />
                    <label htmlFor="file_up" className="app-content-headerButton button upload-img-btn">Upload files</label>
                    {loading ? (
                    <div id="file_img">
                        <Loading />
                    </div>
                    ) : (
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt="image" />
                        <span style={xStyle} onClick={handleDestroy}>X</span>
                    </div>
                    )}
                </div>
                </>}
                <button className='app-content-headerButton button' type="submit" onClick={createBand}>{onEdit? "Edit" : "Create"}</button>
            </div>
            <div className="band-list">
                {bands.map((band) =>(
                    <div key={band._id} className="band-item">
                        <div className="band-name">
                            <h3>{band.name}</h3>
                        </div>
                        <div className="band-logo">
                            <img src={band.logo.url} alt="band-logo" width={60} />    
                        </div>
                        <div className='btn-up-de'>
                            <button className='app-content-headerButton button' onClick={() => editCategory(band._id, band.name, band.logo)}>Edit</button>
                            <button className='app-content-headerButton button'>Delete</button>
                        </div>                       
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Band