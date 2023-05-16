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
                setDetail(res.data);
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

    const addCart = async (product) => {
        // console.log(product);
        if (!isLogged) return alert('Please login to continue buying');
        if(product.amount === 0) return alert('This type not have in stock');
        const check = cart.every(item =>{
            return item._id !== product._id
        });
        if(check){
            setCart([...cart, {...product, quantity:1}]);
            await axios.patch('http://localhost:5000/user/addcart',{cart:[...cart, {...product, quantity: 1}]},{
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
    };
}

export default UserAPI