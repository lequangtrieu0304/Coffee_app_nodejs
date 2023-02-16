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
        const {value} = request;
        const products = await getProductByKey({searchKeyword: value});
        return `
            <div class="products">
                <ul>
                    ${products.map(product => `
                        <li>
                            <div class="product">
                                <div class="product-img">
                                    <a href="/#/product/${product._id}">
                                        <img src="${product.image}" alt="${product.name}" />
                                    </a>
                                </div>
                                
                                <div class="product-detail">
                                    <div class="details">
                                        <div class="product-name">
                                            <a href="/#/product/${product._id}"><h4>${product.name}</h4></a>
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