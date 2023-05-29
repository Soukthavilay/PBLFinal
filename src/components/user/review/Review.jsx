import StarRatings from "react-star-ratings"
import { GlobalState } from "../../../GlobalState";
import { useParams, useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../utils/Loading/Loading";
import axios from "axios";
const Review = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [pd] = state.productsAPI.products;
    const param = useParams();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState(false);
    const [score, setScore] = useState(0);
    const [productID, setProductID] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (param.id) {
            pd.forEach((item) => {
                if (item._id === param.id) {
                    setProductID(item._id);
                }
            });
        }
    }, [param.id, pd]);
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
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
            });
            setLoading(false);
            console.log(res.data);
            setImages(res.data);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const styleUpload = {
        display: images ? 'block' : 'none',
    };
    const handleDestroy = async () => {
        try {
            setLoading(true);
            await axios.post(
                'http://localhost:5000/api/destroy',
                { public_id: images.public_id },
            );
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    const changeRating = (newRating) => {
        setScore(Math.round(newRating));
    }
    const handleChangeInput = (e) => {
        const { value } = e.target;
        setContent(value);
    };
    const handleFeedback = async (e) => {
        const result = {
            content: content,
            image_url: images.url,
            product_id: productID,
            rating: score,
        };
        console.log(result);
        await axios.post(
            'http://localhost:5000/api/feedback/create',
            { ...result },
            {
                headers: { Authorization: token },
            }
        );
        console.log(result);
        alert('Thank you for your feedback !');
        history.push(`/order-detail/${productID}`);
    };
    return (
        <>
            <h3>Write a product review</h3>

            <div className="comment-form">
                <input type="text" placeholder="Name" />
                <StarRatings
                    name="rating"
                    rating={score}
                    changeRating={changeRating}
                    starHoverColor="#fadb14"
                    starRatedColor="#fadb14"
                    starDimension="16px"
                    starSpacing="2px"
                />
                <textarea
                    name="content"
                    id="contentUser"
                    cols="30"
                    rows="5"
                    placeholder="Write comment about product..."
                    onChange={handleChangeInput}
                // value={content}
                ></textarea>
                {/* <div className="uploadImg">
                <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload} />
                    {loading ? (
                    <div id="file_img">
                        <Loading />
                    </div>
                    ) : (
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                    )}
                </div>
                </div> */}
                <button type="button" onClick={handleFeedback} className="btn btn--animated btn--primary--blue btn--border--blue">
                    Submit a review
                </button>
            </div>
        </>
    )
}

export default Review