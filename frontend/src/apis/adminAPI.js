import axios from "axios";

export const loginAccount = async (data) => {
    try{
        const response = await axios({
            url: `http://localhost:5000/api/users/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        })
        console.log(response);
        if(response.status !== 200){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response ? err.response.data.message : err.message
        }
    }
}