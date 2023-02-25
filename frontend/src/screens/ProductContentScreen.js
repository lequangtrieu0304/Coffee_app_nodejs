import { getProductById } from "../apis/productAPI";
import { parseRequestUrl } from "../ultis";

const ProductContentScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProductById(request.id);
        return `
            <div class="product-content"></div>
        `;
       
    }
}

export default ProductContentScreen;