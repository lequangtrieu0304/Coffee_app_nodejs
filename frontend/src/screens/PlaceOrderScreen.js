import { createOrder, createOrderLogin } from "../apis/orderAPI";
import { clearCart, clearPayment, clearShipping, getCartItems, getPayment, getShipping, getUserInfo, setPayment } from "../localStroge";
import { rerender, showMessage } from "../ultis";

const convertToCart = () =>  {
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    const { username } = getUserInfo();
    if(!shipping.name || !shipping.phone || !shipping.address || !shipping.city){
        if(!username){
            document.location.hash = '/shipping';
        }
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
        const {username} = getUserInfo();
        document.getElementById('order-button').addEventListener('click', async () => {
            if(username){
                const data = await createOrderLogin(order);
                if(data.error){
                    showMessage(data.error);
                }
                else {
                    showMessage(data.message);
                    clearCart();
                    clearPayment();
                }
                document.location.hash = `/order/${data.order._id}`;
            }
            else {
                const data = await createOrder(order);
                if(data.error){
                    showMessage(data.error);
                }
                else {
                    showMessage(data.message);
                    clearCart();
                    clearPayment();
                    clearShipping();
                }
                document.location.hash = `/order/${data.order._id}`;
            }
        })
    },

    render: () => {
        const {orderItems, shipping, itemsPrice, shipPrice, totalPrice} = convertToCart();
        const { address, username, phone} = getUserInfo();
        const payment = getPayment();
        return `
            <div class="place-order">
                <div class="order-detail">
                    <div class="order-shipping">
                        <h3>?????a ch??? nh???n h??ng</h3>
                        <div>
                            <ul>
                                <li><div>Ng?????i nh???n:</div> <div>${username ? username : shipping.name}</div></li>
                                <li><div>??i???n tho???i:</div> <div>${phone ? phone : shipping.phone}</div></li>
                                <li><div>?????a ch???:</div> <div>${address ? address : shipping.address}</div></li>
                            </ul>
                        </div>
                    </div>

                    <div class="order-cart-list">
                        <div class="cart-list">
                            <ul class="cart-list-container">
                                <li>
                                    <h3>M???t h??ng</h3>
                                    <h3>Gi??</h3>
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
                                                    S??? l?????ng: <span>${item.qty}</span>
                                                </div>
                                            </div>

                                            <div class="cart-price">${item.price}?? </div>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                <div class="order-action">
                    <div class="action-details">
                        <ul>
                            <li>????n ?????t h??ng</li>
                            <li><div>Gi?? ????n h??ng:</div> <div>${itemsPrice}??</div></li>
                            <li><div>Ph?? v???n chuy???n:</div> <div>${shipPrice}??</div></li>
                            <li><div>T???ng thanh to??n:</div> <div>${totalPrice}??</div></li>
                        </ul>
                    </div>
                    <div class="order-method">
                        <select name="shipping-method" id="shipping-method">
                            ${
                                ['Ph????ng th???c thanh to??n', 'Momo', 'Paypal', 'Credit Card', 'Ti???n m???t'].map( x => x === payment  
                                    ? `<option selected value="${payment}">${payment}</option>`
                                    : `<option value="${x}">${x}</option>`
                                )
                            }  
                        </select>
                    </div>

                    <button type="button" id="order-button">?????t h??ng</button>
                </div>
            </div>
        `;
    }
}

export default PlaceOrderScreen;