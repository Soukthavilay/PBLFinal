const paypal = require('paypal-rest-sdk')
const Orders = require('../../models/order/orderModel');
const voucherModel = require('../../models/voucherModel');
const ejs = require('ejs');

const paypalCtrl = {

    payment: async (req, res) => {
        try {
          const {order_id} = req.body;
          const Order = await Orders.findById(order_id);
          const voucher = await voucherModel.find({code: Order.voucherCode})
          let payment;
          if(Order.voucherCode){
            payment = {
              intent: "sale",
              payer: {
                payment_method: "paypal",
              },
              redirect_urls: {
                return_url: "https://pbl-technology-988327da4050.herokuapp.com/api/paypal/success",
                cancel_url: "https://pbl-technology-988327da4050.herokuapp.com/api/paypal/cancel",
              },
              transactions: [
                {
                  order_id:order_id,
                  item_list: {
                    items: Order.listOrderItems.map((item) => ({
                      name: order_id,
                      sku: "001",
                      price: item.price - item.price * voucher[0].discountPercentage / 100,
                      currency: "USD",
                      quantity: item.quantity,
                    })),
                  },
                  amount: {
                    currency: "USD",
                    total: Order.total,
                  },
                  description: "This is the payment description.",
                },
              ],
            };
          } else {
            payment = {
              intent: "sale",
              payer: {
                payment_method: "paypal",
              },
              redirect_urls: {
                return_url: "https://pbl-technology-988327da4050.herokuapp.com/api/paypal/success",
                cancel_url: "https://pbl-technology-988327da4050.herokuapp.com/api/paypal/cancel",
              },
              transactions: [
                {
                  order_id:order_id,
                  item_list: {
                    items: Order.listOrderItems.map((item) => ({
                      name: order_id,
                      sku: "001",
                      price: item.price,
                      currency: "USD",
                      quantity: item.quantity,
                    })),
                  },
                  amount: {
                    currency: "USD",
                    total: Order.total,
                  },
                  description: "This is the payment description.",
                },
              ],
            };
          }
    
          paypal.payment.create(payment, function (error, payment) {
            if (error) {
              console.log(error.response.details);  
              throw error;
            } else {
              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                  res.json({ url: payment.links[i].href });
                  return; // Return after sending the response
                }
              }
            }
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: err.message });
        }
      },      
      success: async (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            "payer_id": payerId
        };
        await paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                console.log(error.response);
                res.status(401).send("Error");
                throw error;
            } else {
                try {
                    const order_id = payment.transactions[0].item_list.items[0].name;
                    await Orders.findByIdAndUpdate(order_id, { status: "Paid", paymentMethod: "PayPal" }, { new: true });
                    const Order = await Orders.findById(order_id);
    
                    // Render the HTML template
                    const renderedHtml = await ejs.renderFile('E:\\Bot\\PBLFinal\\API-Global\\controllers\\order\\templates\\success.ejs', { order_id: order_id ,order: Order});
    
                    res.send(renderedHtml);
                } catch (err) {
                    console.log(err);
                    res.status(401).send("Something went wrong, can't complete your order");
                }
            }
        });
    },    

    cancel: async (req, res) => {
        res.status(406).send('Cancelled');
    }

}

module.exports = paypalCtrl