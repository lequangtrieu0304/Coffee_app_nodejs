import { getOrderById } from "../apis/orderAPI";
import { parseRequestUrl } from "../ultis";

const OrderScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const { shipping, 
                orderItems, 
                itemsPrice, 
                totalPrice, 
                shipPrice, 
                createdAt } = await getOrderById(request.id);
                
        return `
            <div class="place-order">
                <div class="order-detail">
                    <div class="order-shipping">
                        <h3>Địa chỉ nhận hàng</h3>
                        <div>
                            <ul>
                                <li><div>Người nhận:</div> <div>${shipping.name}</div></li>
                                <li><div>Điện thoại:</div> <div>${shipping.phone}</div></li>
                                <li><div>Địa chỉ:</div> <div>${shipping.address}, ${shipping.city}</div></li>
                                <li><div>Ngày đặt:</div> <div>${createdAt.substring(0, 10)}</div></li>
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
                    <div><h2>Thank You Very Much</h2></div>
                </div>
            </div>
        `;
    }
}

export default OrderScreen;