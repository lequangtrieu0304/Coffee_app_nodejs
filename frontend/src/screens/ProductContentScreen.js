import { getProductById } from "../apis/productAPI";
import { parseRequestUrl } from "../ultis";

const ProductContentScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProductById(request.id);
        return `
            <div class="product-content">
                <div class="product-content-img">
                    quang trieu
                </div>
                <div class="product-content-details"></div>
            </div>

            <div class="product-comment">

            </div>
        `;
       
    }
}

export default ProductContentScreen;