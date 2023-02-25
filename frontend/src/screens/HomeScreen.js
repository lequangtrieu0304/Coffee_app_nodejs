import { sellingProducts } from "../apis/orderAPI.js";
import { getProductById, getProductByKey } from "../apis/productAPI.js";
import { getCartItems, setCartItems } from "../localStroge.js";
import { parseRequestUrl, showMessage } from "../ultis.js";

const addToCart = (item) => {
    let cartItems = getCartItems();
    const itemExist = cartItems.find(x => x.product === item.product);
    if(!itemExist){
        cartItems = [...cartItems, item];
        setCartItems(cartItems);
    }
    else {
        document.location.hash = '/cart';
    }
}

const HomeScreen = {
    after_render: () => {
        const addCartButtons = document.getElementsByClassName('add-cart');
        Array.from(addCartButtons).forEach(addCartButton => {
            addCartButton.addEventListener('click', async () => {
                const data = await getProductById(addCartButton.id);
                if(data.error){
                    showMessage(data.error)
                }
                else{
                    addToCart({
                        product: data._id,
                        name: data.name,
                        image: data.image,
                        price: data.price,
                        qty: 1,
                    });
                    document.location.hash = '/cart';
                }  
            })  
        });
    },
    
    render: async () => {
        const request = parseRequestUrl();
        const { value } = request;
        const products = await getProductByKey({searchKeyword: value});
        console.log(products);
        const productSelling = await sellingProducts();
        console.log(productSelling);
        return `
            <div class="products">
                <div class="selling-products">
                    <h2>Sản phẩm bán chạy</h2>
                    <ul>
                        ${  productSelling.length === 0 ? `<div>Chưa có sản phẩm bán chạy</div>`:
                            productSelling.map((selling, index) => `
                                <li>
                                    <div class="product">
                                        <div class="product-img">
                                            <a href="/#/productcontent/${selling.sell[0]._id}">
                                                <img src="${selling.sell[0].image}" alt="${selling.sell[0].name}" />
                                            </a>
                                        </div>
                                        
                                        <div class="product-detail">
                                            <div class="details">
                                                <div class="product-name">
                                                    <a href="/#/productcontent/${selling.sell[0]._id}"><h4>${selling.sell[0].name}</h4></a>
                                                </div>
                                                <div class="product-price">
                                                    <div>Giá:</div> <div class="price">${selling.sell[0].price}đ</div>
                                                </div>
                                                <div class="qty">
                                                    <div><span>Đã bán: ${selling.totalQty}</span></div>
                                                </div>
                                            </div>                           
                                        </div>                                       
                                    </div>
                                </li>
                            `).join('')
                        }
                    </ul>
                </div>
                <ul>
                    ${products.map(product => `
                        <li>
                            <div class="product">
                                <div class="product-img">
                                    <a href="/#/productcontent/${product._id}">
                                        <img src="${product.image}" alt="${product.name}" />
                                    </a>
                                </div>
                                
                                <div class="product-detail">
                                    <div class="details">
                                        <div class="product-name">
                                            <a href="/#/productcontent/${product._id}"><h4>${product.name}</h4></a>
                                        </div>
                                        <div class="product-price">
                                            <div>Giá:</div> <div class="price">${product.price}đ</div>
                                        </div>
                                    </div>

                                    <div class="actions">
                                        <button type="button" id="${product._id}" class="add-cart">Thêm vào giỏ</button>
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

export default HomeScreen;