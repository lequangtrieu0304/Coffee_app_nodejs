import Order from "../models/orderModel";
import User from "../models/userModel";
import Product from "../models/productModel";

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

        res.status(200).json({
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
        return res.json(sellingProducts);
    }
    catch (err){
        console.log(err);
    }
}


const getAllOrder = async (req, res) => {
    try{
        const orders = await Order.find({}).populate('user');
        return res.status(200).json(orders);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Đã xảy ra lỗi khi lấy thông tin đơn hàng",
            error: err.message,
        })
    }
}

const getOrderById = async (req, res) => {
    const id = req.params.id;
    try{
        const order = await Order.findById(id).populate('user', '-_id -image -password -sex -isAdmin -birthday');
        if(order){
            return res.status(200).json(order);
        }
        return res.status(400).json({
            message: "Get Error",
        })
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Đã xảy ra lỗi khi lấy thông tin đơn hàng",
            error: err.message,
        })
    }
}

const createOrderLogin = async (req, res) => {
    const {orderItems, shipPrice, itemsPrice, totalPrice, payment} = req.body;
    try{
        const newOrder = new Order({
            orderItems,
            user: req.user.id,
            shipPrice,
            itemsPrice,
            totalPrice,
            payment,
        })

        const createOrder = await newOrder.save();
        const updateOperations = orderItems.forEach((item) => {
            return Product.updateOne(
                { 
                    _id: item.product 
                },
                {
                    $inc: {
                    countInStock: -item.qty,
                    sold: item.qty
                }},
                (err, data) => {
                    if(err){
                        res.status(400).json(err);
                    }
                }
            )   
        });
        await Promise.all(updateOperations);
        return res.status(201).json({
            message: "Đặt hàng thành công",
            order: createOrder,
        });
    }
    catch(err){
        console.log(err);
    }
}

const createOrder = async (req, res) => {
    const {orderItems, shipping, shipPrice, itemsPrice, totalPrice, payment} = req.body;
    try{
        const newOrder = new Order({
            orderItems,
            shipping,
            shipPrice,
            itemsPrice,
            totalPrice,
            payment,
        })

        const createOrder = await newOrder.save();
        const updateOperations = orderItems.forEach(item => {
            Product.updateOne(
                { 
                    _id: item.product
                },
                {
                    $inc: {
                    countInStock: -item.qty,
                    sold: item.qty,
                }},
                (err, data) => {
                    if(err){
                        res.status(400).json(err)
                    }
                }
            )
        });
        await Promise.all(updateOperations);
        return res.status(201).json({
            message: "Đặt hàng thành công",
            order: createOrder,
        })
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
    sellingProducts,
}

// doanh số theo tháng cho từng sản phẩm
// db.orders.aggregate([
//     {
//         $unwind: "$orderItems"
//     }, 
//     {
//         $lookup: {
//             from: "products", 
//             localField: "orderItems.product", 
//             foreignField: "_id", 
//             as: "product"
//         }
//     }, 
//     {
//         $project: {
//             year: {$year: "$createdAt"}, 
//             month: {$month: "$createdAt"}, 
//             total: {$multiply: [{$toInt: "$orderItems.qty"}, {$toInt: "$orderItems.price"}]}, 
//             totalQty: {$sum: {$toInt: "$orderItems.qty"}}, 
//             name: "$orderItems.name"
//         }
//     }, 
//     {
//         $group: {
//             _id: {year: "$year", month: "$month", name: "$name"}, 
//             total: {$sum: "$total"},
//             totalQty: {$sum: "$totalQty"}
//         }
//     },
//     {
//         $group: {
//             _id: {
//                 year: "$_id.year", 
//                 month: "$_id.month"
//             }, 
//             products: {
//                 $push: {
//                     name: "$_id.name", 
//                     total: "$total", 
//                     totalQty: "$totalQty"
//                 }
//             }
//         }
//     }
// ])