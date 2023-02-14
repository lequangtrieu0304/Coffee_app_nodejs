import axios from 'axios';

export const getAllOrder = async () => {
    try{
        const response = await axios({
            url: `http://localhost:3001/api/orders/`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response.data.message || err.message,
        }
    }
}

export const getOrderById = async (id) => {
    try{
        const response = await axios({
            url: `http://localhost:3001/api/orders/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(response.statusText !== 'OK'){
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

export const createOrder = async (order) => {
    try {
        const response = await axios({
            url: `http://localhost:3001/api/orders/`,
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