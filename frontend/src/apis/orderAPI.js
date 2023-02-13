import axios from 'axios';

export const createOrder = async (order) => {
    try {
        const response = await axios({
            url: `http://localhost:3000/api/orders/`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: order
        })
        if(response.statusText !== 'Created'){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message,
        }
    }
}