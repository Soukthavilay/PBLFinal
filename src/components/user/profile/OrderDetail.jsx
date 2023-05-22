import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { GlobalState } from "../../../GlobalState";

const OrderDetail = () => {
    const state = useContext(GlobalState);
    const [myOrder] = state.userAPI.order;
    const param = useParams();
    const [data,setData] = useState();

    useEffect(()=>{
        const foundOrder = myOrder.find((order) => order._id === param.id);
        if (foundOrder) {
            setData(foundOrder);
        } else {
            console.log('No match found');
        }
    },[myOrder,param.id])
    console.log(data)
  return (
    <>
        
    </>
  )
}

export default OrderDetail