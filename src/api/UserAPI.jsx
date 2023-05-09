import { useState, useEffect } from 'react';
import axios from 'axios';
function UserAPI(token){
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [detail,setDetail] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                const res = await axios.get('http://localhost:5000/user/infor', {
                    headers: { Authorization: token },
                });
                setDetail(res.data)
                setIsLogged(true);
                res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                setCart(res.data.cart)
                } catch (err) {
                alert(err.response.data.msg);
                }
            };
            getUser();
        }
    }, [token]);

    

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        history: [history, setHistory],
        detail:[detail,setDetail], 
    };
}

export default UserAPI