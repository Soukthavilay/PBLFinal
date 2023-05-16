import { GlobalState } from "../../../GlobalState"
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const Cart = () => {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    console.log(cart)
    const [token] = state.token;
    const [total, setTotal] = useState(0);
    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])
    const addToCart = async (cart) => {
        await axios.patch(
            'http://localhost:5000/user/addcart',
            { cart },
            {
                headers: { Authorization: token },
            }
        );
    };

    const increment = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity += 1;
            } 
        });
        setCart([...cart]);
        addToCart(cart);
    };

    const decrement = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
            }
        });
    
        setCart([...cart]);
        addToCart(cart);
    };
    return (
        <div>Cart</div>
    )
}

export default Cart