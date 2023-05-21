const paypal = require('paypal-rest-sdk')
const Orders = require('../../models/order/orderModel')

const paypalCtrl = {

    payment: async (req, res) => {
        try {
          const { amount, order_id ,price, total} = req.body;
          const payment = {
            intent: "sale",
            payer: {
              payment_method: "paypal",
            },
            redirect_urls: {
              return_url: "http://localhost:5000/api/paypal/success",
              cancel_url: "http://localhost:5000/api/paypal/cancel",
            },
            transactions: [
              {
                item_list: {
                  items: [
                    {
                      name: order_id,
                      sku: "001",
                      price: price,
                      currency: "USD",
                      quantity: 1,
                    },
                  ],
                },
                amount: {
                  currency: "USD",
                  total: total,
                },
                description: "This is the payment description.",
              },
            ],
          };
      
          paypal.payment.create(payment, function (error, payment) {
            if (error) {
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
                    await Orders.findByIdAndUpdate({ _id: order_id }, { status: "Paid" });
                    res.send('Success');
                }
                catch (err) {
                    console.log(err);
                    res.status(401).send("Something went wrong, cant complete your order");
                }
            }
        });
    },

    cancel: async (req, res) => {
        res.status(406).send('Cancelled');
    }

}

module.exports = paypalCtrl