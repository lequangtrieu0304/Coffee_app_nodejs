import { dailyOrders } from "../apis/orderAPI";

const SummaryScreen = {
    render: async () => {
        const getOrdersDaily = await dailyOrders();
    }
}

export default SummaryScreen;