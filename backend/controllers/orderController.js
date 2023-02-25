import Order from "../models/orderModel";
import User from "../models/userModel";

const summaryOrder = async (req, res) => {
    try{
        const orderOfDay = await Order.aggregate([
            {   
                $group: {
                    _id: {$dateToString: {format: '%Y-%m-%d', date: '$createdAt'}},
                    orders: { $sum: 1},
                    sales: { $sum: '$totalPrice'},
                    ordersOfDay: { $addToSet: '$orderItems'}
                }
            }
        ]);

        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1},
                }
            }
        ]);

        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice"},
                    numOrders: { $sum: 1 },
                }
            }
        ])

        res.send({
            orderOfDay, 
            users,
            orders: orders.length === 0 ? [{totalSales: 0, numOrders: 0}] : orders,
        });
    }
    catch (err){
        console.log(err);
    }
}

const sellingProducts = async (req, res) => {
    try {
        const sellingProducts = await Order.aggregate([
            {
                $unwind: "$orderItems",
            },
            {
                $group: {
                    _id: "$orderItems.product",
                    totalQty: {
                        $sum: {
                            $toInt: "$orderItems.qty"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "sell"
                }
            },
            {
                $sort: {
                    "totalQty": -1,
                }
            },
            {
                $limit: 5
            }
        ]);
        res.send(sellingProducts);
    }
    catch (err){
        console.log(err);
    }
}


const getAllOrder = async (req, res) => {
    try{
        const orders = await Order.find({}).populate('user');
        res.status(200).send(orders);
    }
    catch(err){
        console.log(err);
    }
}

const getOrderById = async (req, res) => {
    const id = req.params.id;
    try{
        const order = await Order.findById(id).populate('user', '-_id -image -password -sex -isAdmin -birthday');
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

const createOrderLogin = async (req, res) => {
    const {orderItems, shipPrice, itemsPrice, totalPrice, payment} = req.body;
    try{
        const newOrder = {
            orderItems,
            user: req.user.id,
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
    getAllOrder,
    createOrderLogin,
    summaryOrder,
    sellingProducts
}