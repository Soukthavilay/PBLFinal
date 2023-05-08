import { useContext, useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from "../../GlobalState";
const Register = () => {
    const state  = useContext(GlobalState);
    console.log(state);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: 0,
    });

    const  handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post('http://localhost:5000/user/register', formData);
            localStorage.setItem('firstLogin', true);
            window.location.href = '/client';
        }catch(err){
            console.error(err);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" onChange={handleChange} value={formData.name} />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" onChange={handleChange} value={formData.email} />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" onChange={handleChange} value={formData.password} />
        </div>
        <div>
            <label htmlFor="phone">Phone:</label>
            <input type="text" name="phone" onChange={handleChange} value={formData.phone} />
        </div>
        <button type="submit">Register</button>
        <button><Link target="_parent" to="/client/login">Login</Link></button>
    </form>
    )
}

export default Register