import Order from "../models/orderModel";

const createOrder = async (req, res) => {
    const {orderItems, shipping, shipPrice, itemsPrice, totalPrice, payment} = req.body;
    try{
        const newOrder = {
            orderItems,
            shipping,
            shipPrice,
            itemsPrice,
            totalPrice,
            payment,
        }

        const order = await Order.create(newOrder);
        if(order){
            res.status(201).send({
                message: "Đặt hàng thành công",
                data: order,
            })
        }
        else {
            res.status(400).send({
                message: "Đặt hàng thất bại",
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

export default {
    createOrder,
}