// http://localhost:5000/api/update-status/646c9161025b277a5c8af88a
const OrderHeader = (order) => {
    const orderData = order.order;

    const handleConfirm = () => {
    };
    
    const handleCancel = () => {
    };
  return (
    <>
        <div className="products-header">
            <div className="product-cell image">
                Order of User : {orderData.name}
            </div>
            <div className="product-cell image">
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    </>
  )
}

export default OrderHeader