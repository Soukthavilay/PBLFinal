import React from 'react'
import { useLocation } from 'react-router-dom';

const OrderDetail = () => {
    const location = useLocation();
    const orderItem = location.state.orderItem;
    console.log(orderItem)
  return (
    <>
        <div className='orderDetail-admin'>
            {/* làm trang này giúp em vs  */}
            {/* làm trang này giúp em vs  */}
            {/* làm trang này giúp em vs  */}
            {/* làm trang này giúp em vs  */}
            {/* em get data xong hết rồi  */}
            {
                // "total": 20,
                // "listOrderItems": [
                //     {
                //         "feature": {
                //             "color": "Red",
                //             "typeOf": "",
                //             "SSDStorage": "",
                //             "processor": "",
                //             "graphicSeries": "",
                //             "operatingSystem": "iOS",
                //             "keyboardLanguage": "",
                //             "hardDiscType": "",
                //             "ram": "6 GB",
                //             "inches": "6.5-6.9",
                //             "storage": "256 GB",
                //             "batteries": "4001-5000 mAh",
                //             "connectivities": "Bluetooth",
                //             "sim": "Dual"
                //         },
                //         "types": [],
                //         "checked": false,
                //         "sold": 31,
                //         "_id": "646c8d3d2a00916c70708f97",
                //         "title": "Nitho Adonis BT PS4 Wireless Controller new",
                //         "description": "Experience console gaming like never before with NITHO Adonis BT PS4 Wireless Controller Camo! The ultimate gaming accessory for every playstation enthusiast, this controller offers seamless wireless connectivity and precision controls to improve your gaming experience. Its sleek and ergonomic design provides a comfortable grip, allowing you to play for hours without experiencing any discomfort. The camo design adds an exciting touch to your gaming console and sets you apart from the rest. So, for the ultimate gaming experience, grab your NITHO Adonis BT PS4 Wireless Controller Camo now and take your gaming to the next level!\n\nDo you want to know which other related electronics and computers products Nitho has? At techinn, you can buy all the necessary Playstation items so that you can benefit from your activities without complications. Nitho Adonis BT PS4 Wireless Controller is at best price and in stock! Make us of our secure online payment system and benefit from our high qualified salesteam",
                //         "images": {
                //             "public_id": "test/acvuvhse7xgzon89nhhw",
                //             "url": "https://res.cloudinary.com/dkiofoako/image/upload/v1685288859/test/acvuvhse7xgzon89nhhw.jpg"
                //         },
                //         "category": "6459f014aff6f728c08833f4",
                //         "price": 20,
                //         "amount": 25,
                //         "band": "Nitho",
                //         "createdAt": "2023-05-23T09:54:05.026Z",
                //         "updatedAt": "2023-05-29T15:58:23.125Z",
                //         "__v": 0,
                //         "quantity": 1
                //     }
                // ],
                // "status": "Cancel Requested",
                // "_id": "6475a8fbb832975c7c81059e",
                // "user_id": "64756d217fff2b52e89551d1",
                // "email": "koke115019@gmail.com",
                // "name": "kone",
                // "address": "bach khoa",
                // "phone": "10393722922",
                // "paymentMethod": "COD",
                // "createdAt": "2023-05-30T07:42:51.432Z",
                // "updatedAt": "2023-05-30T08:00:05.366Z",
                // "__v": 0
            }
            {/* data mẫu */}
        </div>
    </>
  )
}

export default OrderDetail