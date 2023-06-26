import { useState, useEffect } from 'react';
import axios from 'axios';
function UserAPI(token){
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [detail,setDetail] = useState([]);
    const [order,setOrder] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                const res = await axios.get('https://pbl-technology-988327da4050.herokuapp.com/user/infor', {
                    headers: { Authorization: token },
                });
                setDetail(res.data);
                setIsLogged(true);
                if(res.data.role === 1){
                    setIsAdmin(true)
                } else if(res.data.role === 0) {
                    setIsAdmin(false)
                }
                setCart(res.data.cart)
                } catch (err) {
                alert(err.response.data.msg);
                }
            };
            getUser();
        }
    }, [token]);

    useEffect(()=>{
        if(token){
            try {
                const getMyorder = async ()=>{
                    const res = await axios.get("https://pbl-technology-988327da4050.herokuapp.com/api/orders",{
                    headers: {
                        Authorization: token,
                    },
                    });
                    if(Array.isArray(res.data)){
                        setOrder(res.data);
                    } else {
                        throw new Error('Invalid order data');
                    }
                };
                getMyorder();
                } catch (error) {
                console.log("error.message");
                }
        }
    },[token]);

    const addCart = async (product,count) => {
        if (!isLogged) return alert('Please login to continue buying');
        if(product.amount === 0) return alert('This type not have in stock');
        const check = cart.every(item =>{
            return item._id !== product._id
        });
        if(check){
            setCart([...cart, {...product, quantity:count}]);
            await axios.patch('https://pbl-technology-988327da4050.herokuapp.com/user/addcart',{cart:[...cart, {...product, quantity: count}]},{
                headers:{
                    Authorization: token
                }
            })
        } else {
            alert("This product has been added to cart.");
        }
    }

    

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        detail:[detail,setDetail], 
        order:[order,setOrder],
    };
}

export default UserAPI