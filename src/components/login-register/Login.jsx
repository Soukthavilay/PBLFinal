import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

import axios from 'axios';

const Login = () => {
    const state = useContext(GlobalState);
    // console.log(state)
    const [formData,setFormData] = useState({
        email:'',
        password:''
    });

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post('http://localhost:5000/user/login', formData);
        localStorage.setItem('firstLogin', true);
        window.location.href = '/client';
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={handleChange} value={formData.email} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={handleChange} value={formData.password} />
            </div>
            <button type="submit">Login</button>
            <button><Link target="_parent" to="/client/register">Login</Link></button>
        </form>
    )
}

export default Login