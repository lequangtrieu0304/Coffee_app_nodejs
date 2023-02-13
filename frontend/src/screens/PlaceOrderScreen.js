import { createOrder } from "../apis/orderAPI";
import { clearCart, getCartItems, getPayment, getShipping, setPayment } from "../localStroge";
import { rerender, showMessage } from "../ultis";

const convertToCart = () =>  {
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if(!shipping.name || !shipping.phone || !shipping.address || !shipping.city){
        document.location.hash = '/shipping';
    }

    const itemsPrice = orderItems.reduce((a, c) => a + c.price*c.qty, 0);
    const shipPrice = itemsPrice > 150000 ? 0 : 20000;
    const totalPrice = itemsPrice + shipPrice;

    return {
        orderItems,
        shipping,
        itemsPrice,
        shipPrice,
        totalPrice,
    }
}

const PlaceOrderScreen = {
    after_render: () => {
        let order = {...convertToCart()};
        const methodPayment = document.getElementById('shipping-method');
        methodPayment.addEventListener('change', (e) => {
            let payment = e.target.value;
            setPayment(payment);
            rerender(PlaceOrderScreen);
        });
        
        const payment = getPayment();
        order = {...convertToCart(), payment};
        console.log(order);
        document.getElementById('order-button').addEventListener('click', async () => {
            const data = await createOrder(order);
            if(data.error){
                showMessage(data.error);
            }
            else {
                showMessage(data.message);
                clearCart();
            }
            document.location.hash = '/order/order._id';
        })
    },

    render: () => {
        const {orderItems, shipping, itemsPrice, shipPrice, totalPrice} = convertToCart();
        const payment = getPayment();
        return `
            <div class="place-order">
                <div class="order-detail">
                    <div class="order-shipping">
                        <h3>Địa chỉ nhận hàng</h3>
                        <div>
                            <ul>
                                <li>Người nhận: ${shipping.name}</li>
                                <li>Điện thoại: ${shipping.phone}</li>
                                <li>Địa chỉ: ${shipping.address}, ${shipping.city}</li>
                            </ul>
                        </div>
                    </div>

                    <div class="order-cart-list">
                        <div class="cart-list">
                            <ul class="cart-list-container">
                                <li>
                                    <h3>Mặt hàng</h3>
                                    <h3>Giá</h3>
                                </li>
                                ${
                                    orderItems.map(item => `
                                        <li>
                                            <div class="cart-img">
                                                <img src="${item.image}" alt="${item.name}"/>
                                            </div>

                                            <div class="cart-name">
                                                <div><h3>${item.name}</h3></div>
                                                <div>
                                                    Số lượng: <span>${item.qty}</span>
                                                </div>
                                            </div>

                                            <div class="cart-price">${item.price}đ </div>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                <div class="order-action">
                    <div class="action-details">
                        <ul>
                            <li>Đơn đặt hàng</li>
                            <li><div>Giá đơn hàng:</div> <div>${itemsPrice}đ</div></li>
                            <li><div>Phí vận chuyển:</div> <div>${shipPrice}đ</div></li>
                            <li><div>Tổng thanh toán:</div> <div>${totalPrice}đ</div></li>
                        </ul>
                    </div>
                    <div class="order-method">
                        <select name="shipping-method" id="shipping-method">
                            ${
                                ['Phương thức thanh toán', 'Momo', 'Paypal', 'Credit Card', 'Tiền mặt'].map( x => x === payment  
                                    ? `<option selected value="${payment}">${payment}</option>`
                                    : `<option value="${x}">${x}</option>`
                                )
                            }  
                        </select>
                    </div>

                    <button type="button" id="order-button">Đặt hàng</button>
                </div>
            </div>
        `;
    }
}

export default PlaceOrderScreen;