import axios from 'axios';
import { SERVER } from '../pages/config'
export const doPayment = (amount, tokenId, accessToken) => {
    const body = {
        amount: amount,
        tokenId: tokenId,
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    return axios
        .post(`${SERVER}/api/doPayment`, body, { headers })
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return Promise.reject('Error in making payment', error);
        });
};