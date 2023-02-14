import Order from "../models/orderModel";

const getAllOrder = async (req, res) => {
    try{
        const orders = await Order.find({});
        res.status(200).send(orders);
    }
    catch(err){
        console.log(err);
    }
}

const getOrderById = async (req, res) => {
    const id = req.params.id;
    try{
        const order = await Order.findById(id);
        if(order){
            res.status(200).send(order);
        }
        else {
            res.status(400).send({
                message: "Get Error",
            })
        }
    }
    catch(err) {
        console.log(err);
    }
}

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
                order: order,
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
    getOrderById,
    getAllOrder
}