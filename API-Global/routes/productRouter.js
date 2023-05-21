const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.createProduct)
router.route('/products/top-sold').get(productCtrl.getTopSoldProduct);
router.route('/products/search')
    .get(productCtrl.searchProduct)


router.route('/products/:id')
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .put(auth, authAdmin, productCtrl.updateProduct)
    .get(productCtrl.getDetailProduct)

router.route('/products/category/:id')
    .get(productCtrl.getProductsByCategory)


module.exports = router