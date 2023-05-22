const Orders = require('../../models/order/orderModel');
const OrderItems = require('../../models/order/orderItemModel');
const Products = require('../../models/productModel');
const typeCtrl = require('../typeCtrl');
const Type = require('../../models/typeModel');
const authMe = require('../../middleware/authMe');
const productCtrl = require('../productCtrl');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const paypalCtrl = require('./paypalCtrl');
const axios = require('axios');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

const orderCtrl = {
    createOrder: async (req, res) => {
        try {
            const { orderItems, address, phone } = req.body;
            const user_id = await authMe(req);
            const order = Orders({
                user_id: user_id,
                status: 'Pending',
                address: address,
                phone: phone,
            });
            await order.save();
            let price = 0;
            let listOrderItems = [];
            for (let item = 0; item < orderItems.length; item++) {
                const productItem = await Products.findOne({ _id: orderItems[item].product_id });
                if (productItem) {
                    const type = productItem.types;
                    type.forEach((i) => {
                        if (i._id == orderItems[item].type_id) {
                            amount = i.amount - orderItems[item].amount;
                            if (orderItems[item].amount < 0) {
                                res.status(400).json({ msg: "Amount is invalid" });
                                return;
                            }
                            listOrderItems.push({
                                product_id: orderItems[item].product_id,
                                type_id: orderItems[item].type_id,
                                amount: orderItems[item].amount,
                                image: productItem.images.url,
                                product_name: productItem.title,
                                price: i.price,
                                type_name: i.name,
                            })
                            if (amount < 0) {
                                throw new RangeError("Not enought amount");
                            }
                            else {
                                price += orderItems[item].amount * i.price;
                                i.amount = amount;
                            }
                        }
                    });
                    await Products.findByIdAndUpdate(productItem._id, { types: type });
                }
                else {
                    throw new Error("Product not found");
                }
            }
            order.listOrderItems = listOrderItems;
            order.total = price;
            await order.save();
            res.send({ message: "Order created successfully", order: order });
        }
        catch (err) {
            console.log("Error: ", err.message)
            if (err instanceof RangeError) {
                res.status(400).send({ message: err.message });
            }
            else
                return res.status(500).json({ message: err.message });
        }
    },
    CreateOrderKoh: async (req, res) => {
        try {
            const { phone, address ,user_id} = req.body;
            const user = await User.findById(user_id);
            if (!user) {
                return res.status(400).json({ msg: 'User does not exist.' });
            }
        
        const cart = user.cart;
        let total = 0;
        for (let i = 0; i < cart.length; i++){
            const product = await Products.findById(cart[i]._id);
            if (!product) {
                return res.status(400).json({ msg: 'Product not found.' });
            }
            const purchasedPrice = cart[i].price;
            total += purchasedPrice * cart[i].quantity;
            cart[i].price = purchasedPrice;
            if(product.amount === 0){
                return res.status(400).json({ msg: 'The product is out of stock.' });
            }
            if(product.amount < cart[i].quantity){
                return res.status(400).json({ msg: 'Not enough products. please reduce.' });
            }
            product.amount -= cart[i].quantity;
            product.sold += cart[i].quantity;
            await product.save();
        }
        const order = new Orders({
            user_id: user_id,
            email: user.email,
            name: user.name,
            address: address,
            phone: phone,
            listOrderItems: cart,
            total: total,
            status: 'Pending'
        });
        await order.save();
        user.cart = [];
        await user.save();
        return res.json({ msg: 'Order placed successfully.', order: order });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },      
    updateOrderStatusAdmin: async (req,res) => {
        const orderId  = req.params.id;
        const {status} = req.body;
        console.log(orderId);
        try {
            const order = await Orders.findByIdAndUpdate(orderId, { status }, { new: true });
            if (!order) {
                return res.status(404).json({ msg: 'Order not found.' });
            }
            // order.status = status;
            // await order.save();
            if(order.status === 'Delivered'){
                await order.save();
                const user = await User.findById(order.user_id);
                if (!user) {
                    return res.status(404).json({ msg: 'User not found.' });
                }
                const email = user.email;
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'koke1150199@gmail.com',
                        pass: 'nanozlpbkistsqrp'
                    }
                });
                const mailOptions = {
                    from: 'koke1150199@gmail.com',
                    to: email,
                    subject: 'Notice of successful delivery',
                    text: 'Your order has been delivered successfully. Thank you for your purchase!'
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    console
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });
            }
            res.json({ msg: 'Order status updated successfully.', order });
            } catch (error) {
                res.status(500).json({ msg: error.message });
            }
    },
    userCancelOrder : async (req, res) => {

    },
    addTypeToOrder: async (req, res) => {
        try {
            const { product_id, type_id, amount } = req.body;
            const userID = await authMe(req);
            const user = User.findById(userID);
            var order = await Orders.findOne({ user_id: userID, status: 'Pending' });
            if (!order) {
                order = Orders({
                    user_id: userID,
                    status: 'Pending',
                    address: user.address ?? "Address",
                    phone: user.phone ?? "0123456789"
                });
            }
            if (order.status == 'Pending') {
                var product;
                try {
                    product = await Products.findById(product_id);
                }
                catch (err) {
                    res.send({ message: "Product not found" });
                }
                if (product) {
                    for (var i = 0; i < product.types.length; i++) {
                        if (type_id == product.types[i]._id) {

                            if (amount > product.types[i].amount) {
                                res.status(400).json({ message: "Not enough amount" });
                                return;
                            }
                            else if (amount <= 0) {
                                res.status(400).send({ message: "Amount must be greater than 0" });
                                return;
                            }
                            else {
                                for (var j = 0; j < order.listOrderItems.length; j++) {
                                    if (order.listOrderItems[j].type_id == type_id && order.listOrderItems[j].product_id == product_id) {

                                        //amount
                                        if (order.listOrderItems[j].amount + amount > product.types[i].amount) {
                                            res.status(400).send({ message: "Not enough amount" });
                                            return;
                                        }
                                        order.listOrderItems[j].amount += amount;
                                        product.types[i].amount = product.types[i].amount - amount;
                                        await Products.findByIdAndUpdate(product_id, { types: product.types });

                                        //price
                                        let price = 0;
                                        order.listOrderItems.forEach((item) => {
                                            price += item.amount * item.price;
                                        });
                                        order.total = price;

                                        //save
                                        await Orders.findByIdAndUpdate(order._id, { listOrderItems: order.listOrderItems, total: order.total });
                                        res.send(JSON.stringify(order));
                                        return;
                                    }
                                }


                                //types
                                var itemType = {
                                    product_id: product_id,
                                    type_id: type_id,
                                    amount: amount,
                                    image: product.images.url,
                                    product_name: product.title,
                                    price: product.types[i].price,
                                    type_name: product.types[i].name
                                }
                                listType = order.listOrderItems;
                                listType.push(itemType);
                                order.listOrderItems = listType;

                                //amount
                                if (product.types[i].amount < amount) {
                                    res.status(400).send({ message: "Not enough amount" });
                                    return;
                                }
                                product.types[i].amount = product.types[i].amount - amount;

                                //price
                                let price = 0;
                                order.listOrderItems.forEach((item) => {
                                    price += item.amount * item.price;
                                });
                                order.total = price;

                                //save
                                order.save();
                                await Products.findByIdAndUpdate(product_id, { types: product.types });
                                // await Orders.findByIdAndUpdate(order._id, { listOrderItems: order.listOrderItems, total: order.total });
                                res.send(JSON.stringify(order));
                            }
                            return;
                        }
                    }
                    res.send({ message: "Wrong type id" });
                }
                else {
                    return;
                }
            }
            else {
                res.status(400).send({ message: "Order is not pending" });
                return;
            }
        } catch (err) {
            console.log(err)
            console.log("Error: ", err.message)
        }
    },
    getCart: async (req, res) => {
        try {
            const userID = await authMe(req);
            const order = await Orders.findOne({ user_id: userID, status: 'Pending' });
            res.send(JSON.stringify(order));
        }
        catch (err) {
            res.status(400).json({ message: "Internal Server Error" })
        }
    },
    getOrdersbyID: async (req, res) => {
        try {
            const id = await authMe(req);
            if (!id) {
                return res.status(401).json({ msg: 'Unauthorized' });
            }
            const orders = await Orders.find({ user_id: id });
            res.json(orders);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // getOrders: async (req, res) => {
    //     try {
    //         const user_id = await authMe(req);
    //         const orders = await Orders.find({ user_id: user_id });
    //         res.send(orders)
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json({ msg: err.message })
    //     }
    // },
    getAllOrders: async (req, res) => {
        try {
            const orders = await Orders.find(
                { "listOrderItems.0": { $exists: true } },
                {
                    listOrderItems: 1,
                    _id: 1,
                    user_id: 1,
                    status: 1,
                    total: 1,
                    createdAt: 1,
                    address: 1,
                    phone: 1,
                }
            );
            res.send(orders)
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message })
        }
    },
    updateOrder: async (req, res) => {
        try {
            const { user_id, orderItems, address, phone } = req.body;
            await Orders.findOneAndUpdate({ _id: req.params.id }, {
                user_id, orderItems, address, phone
            })
            let price = 0;
            for (let item = 0; item < orderItems.length; item++) {
                const productItem = await Products.findOne({ product_id: orderItems[item].product_id });
                if (productItem) {

                    const orderItem = OrderItems({
                        order_id: req.params.id,
                        product_id: orderItems[item].product_id,
                        amount: orderItems[item].amount,
                        type_id: orderItems[item].type_id,
                    });
                    const itemPrice = await typeCtrl.getPricebyId(orderItems[item].type_id);
                    if (itemPrice === 0) {
                        res.send({ msg: "Wrong type id" });
                        return;
                    }
                    const itemAmount = await typeCtrl.getAmountbyId(orderItems[item].type_id);
                    if (itemAmount === 0) {
                        res.send({ msg: "Number of products available is zero" });
                        return;
                    }
                    price += itemPrice * orderItems[item].amount;
                    await orderItem.save();
                }
            }

            await Orders.findOneAndUpdate({ _id: req.params.id }, {
                user_id, orderItems, address, phone, total: price
            })
            res.send({ message: "Order update successfully" });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    checkoutOrder: async (req, res) => {
        const { order_id } = req.body;
        const order = await Orders.findOne({ _id: order_id });
        if (!order) {
            return res.status(400).send({ message: "Order not found" });
        }
        else {
            const amount = order.total;
            const address = order.address;
            await paypalCtrl.payment(res, amount, address, order_id);
        }
    },
    checkoutOrderSuccess: async (req, res) => {
        const order_id = req.params.id;
        await Orders.findOneAndUpdate({ _id: order_id }, {
            status: "Success"
        }, (err, doc) => {
            if (err) {
                res.send({ message: "Something went wrong" })
            }
            else {
                res.send({ message: "Order update successfully" });
            }
        })
    },
    checkoutOrderFail: async (req, res) => {
        const { order_id } = req.body;
        await Orders
            .findOneAndUpdate({ _id: order_id }, {
                status: "Fail"
            })
        res.send({ message: "Order update not successfully" });
    },
    getOrdersByTime: async (req, res) => {
        try {
            const { start, end } = req.body;
            const userID = await authMe(req);
            var endDate, startDate;
            try {
                endDate = new Date(end);
                startDate = new Date(start);
            }
            catch (err) {
                res.send({ message: "Wrong date format" });
                return;
            }
            const orders = await Orders.find({
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                user_id: userID,
                status: "Paid"
            }, {
                createdAt: 1,
                total: 1,
                status: 1,
                listOrderItems: 1
            });
            res.send(orders);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getMyOrder: async (req, res) => {
        try {
            const userID = await authMe(req);
            const orders = await Orders.find({
                user_id: userID,
                status: "Paid"
            }, {
                createdAt: 1,
                total: 1,
                status: 1,
                listOrderItems: 1,
                updatedAt: 1,
                phone: 1,
                address: 1,
                name: 1
            }).sort({ updatedAt: -1 });
            res.send(orders);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server" });
        }
    },
    getDelivery: async (req, res) => {
        const GHNToken = process.env.GHNToken ?? "GHNToken";
        const delivery_id = req.query.delivery_id;
        if (!delivery_id) {
            res.status(400).json({ message: "delivery_id is required" })
            return;
        }
        axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
            {
                order_code: `${delivery_id}`
            },
            {
                headers: {
                    'Token': `${GHNToken}`
                }
            },
        ).catch(err => {
            if (err.response.data.code === 400 || err.response.data.code === 401) {
                res.status(err.response.data.code).json({ message: err.response.data.message })
            }
            else {
                res.status(500).json({ message: "Internal Server" })
            }
        }).then(data => {
            try {
                res.send(JSON.stringify(data.data))
            }
            catch (err) { }
        });
    },
    updateOrderDetail: async (req, res) => {
        const { phone, name, address, order_id } = req.body;
        if (!phone || !name || !address || !order_id) {
            res.status(400).json({ message: "phone, name, address and order_id are required" })
            return;
        }
        try {
            const userId = await authMe(req);
            const order = await Orders.findOne({ _id: order_id, user_id: userId });
            if (!order) {
                res.status(400).json({ message: "Order not found" })
                return;
            }
            else {
                await Orders.findOneAndUpdate({
                    _id: order._id
                }, {
                    phone, name, address
                })
            }
            res.send({ message: "Order update successfully" });
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    removeOrderItem: async (req, res) => {
        const { order_id, product_id } = req.body;
        if (!order_id || !product_id) {
            res.status(400).json({ message: "order_id and product_id are required" })
            return;
        }
        try {
            const userId = await authMe(req);
            const order = await Orders.findOne({ _id: order_id, user_id: userId });
            if (!order) {
                res.status(400).json({ message: "Order not found" })
                return;
            }
            else {
                const listOrderItems = order.listOrderItems;
                const index = listOrderItems.findIndex(item => item.product_id === product_id);
                if (index === -1) {
                    res.status(400).json({ message: "Product not found" })
                    return;
                }
                else {
                    listOrderItems.splice(index, 1);
                    let price = 0;
                    for (let i = 0; i < listOrderItems.length; i++) {
                        price += listOrderItems[i].price * listOrderItems[i].amount;
                    }
                    order.total = price;
                    order.listOrderItems = listOrderItems;
                    await order.save();
                }
                res.send({ message: "Order update successfully" });
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    updateDelivery: async (req, res) => {
        const { delivery_id, order_id } = req.body;
        if (!delivery_id || !order_id) {
            res.status(400).json({ message: "delivery_id and order_id are required" })
            return;
        }
        try {
            await Orders.findOneAndUpdate({ _id: order_id }, { delivery: delivery_id });
        }
        catch (err) {
            console.log(err)
            res.send({ message: err.message });
        }
    }


}

module.exports = orderCtrl