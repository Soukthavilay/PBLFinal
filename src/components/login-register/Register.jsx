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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const  handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post('http://localhost:5000/user/register', {...formData});
            localStorage.setItem("accessToken", true);
            window.location.href = '/';
        }catch(err){
            console.error(err);
        }
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
        <button><Link to="/login">Login</Link></button>
    </form>
    )
}

export default Register