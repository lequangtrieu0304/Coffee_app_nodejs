import ListCategory from "../components/listCategory.js";
import { getCartItems, setCartItems } from "../localStroge.js";

const addToCart = (item) => {
    let cartItems = getCartItems();
    const itemExist = cartItems.find(x => x.product === item.product);
    if(!itemExist){
        cartItems = [...cartItems, item];
        setCartItems(cartItems);
    }
    else {
        alert('item da ton tai trong gio');
    }
}

const HomeScreen = {
    after_render: () => {
        const addCartButtons = document.getElementsByClassName('add-cart');
        Array.from(addCartButtons).forEach(addCartButton => {
            addCartButton.addEventListener('click', async () => {
                const response = await fetch(`http://localhost:3000/api/products/${addCartButton.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                
                if(!response || !response.ok) {
                    return `<div>Error getting data</div>`
                }

                const product = await response.json();
                if(product){
                    addToCart({
                        product: product._id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        qty: 1,
                    });
                }

                document.location.hash = '/cart';
            })  
        });


    },
    
    render: async () => {
        const response = await fetch("http://localhost:3000/api/products", {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response || !response.ok) {
            return `<div>Error getting data</div>`
        }

        const products = await response.json();
        return `
            ${ListCategory.render({selected: 'coffee'})}
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
                                            <a href="/#/product/${product._id}">Bánh chuối</a>
                                        </div>
                                        <div class="product-price">
                                            ${product.price}đ
                                        </div>
                                    </div>

                                    <div class="actions">
                                        <button type="button" id="${product._id}" class="add-cart"><i class="fa-solid fa-plus"></i></button>
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