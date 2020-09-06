import axios from 'axios';

const urlBaseWebAPI = 'http://localhost:3000/';

export default {
    getAllEstados: (limit, callback) => {
        const urlEstados = urlBaseWebAPI + '/estado';
        axios.get(urlEstados).then((estados) => {
            if (callback) {
                callback(estados);
            }
        })
    }