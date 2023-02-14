import { getAllOrder } from "../apis/orderAPI";
import ListDashboard from "../components/ListDashboard";

const AdminScreen = {
    render: async () => {
        let orders = await getAllOrder();
        orders.reverse();
        
        return `
            ${ListDashboard.render({selected : 'orders'})}
            <div class="orders-admin">
                <h3>Danh sách đơn hàng</h3>
                <div class="order-list">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Người đặt</th>
                                <th>Số ĐT</th>
                                <th>Địa chỉ</th>
                                <th>Vật phẩm</th>
                                <th>Thanh toán</th>
                                <th>Note</th>
                                <th>Ngày đặt</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${
                                orders.map(order => `
                                    <tr>
                                        <td>${order._id}</td>
                                        <td>${order.shipping.name}</td>
                                        <td>${order.shipping.phone}</td>
                                        <td>${order.shipping.address}</td>
                                        <td>
                                            ${order.orderItems.map((item, index) => `
                                                <ul class="list-item-order">
                                                    <li><div>${item.name}:</div><div>${item.qty}</div> </li>
                                                </ul>
                                            `).join('')}
                                        </td>
                                        <td>${order.totalPrice}</td>
                                        <td>${order.shipping.note}</td>
                                        <td>${order.createdAt.substring(0, 10)}</td>
                                    </tr>
                                `).join('')
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

export default AdminScreen;