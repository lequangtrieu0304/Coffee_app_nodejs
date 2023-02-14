
export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
    return cartItems;
}

export const clearCart = () => {
    localStorage.removeItem('cartItems');
}

export const setShipping = ({
    name = '',
    phone = '',
    address = '',
    city = '',
    note = '',
}) => {
    localStorage.setItem('shipping', JSON.stringify({name, phone, address, city, note}));
}   

export const getShipping = () => {
    const shipping = localStorage.getItem('shipping')
        ? JSON.parse(localStorage.getItem('shipping'))
        : {name: '', phone: '', address: '', city: '', note: ''};
    return shipping;
}

export const setPayment = (payment) => {
    localStorage.setItem('payment', JSON.stringify(payment))
}

export const getPayment = () => {
    const payment = localStorage.getItem('payment')
        ? JSON.parse(localStorage.getItem('payment'))
        : '';
    return payment;
}

export const clearPayment = () => {
    localStorage.removeItem('payment');
}

export const setAdminInfo = (data) => {
    localStorage.setItem('admin', JSON.stringify(data))
}


export const getAdminInfo = () => {
    const info = localStorage.getItem('admin') 
        ? JSON.parse(localStorage.getItem('admin'))
        : '';
    return info;
}
