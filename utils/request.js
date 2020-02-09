const axios = require("axios"); 

const apiBase = process.env.BASE_URL || "http://localhost"; 

axios.defaults.baseURL = apiBase;
const token = process.env.GRAPHQL_TOKEN; 

if(token){
   axios.defaults.headers.common['Authorization'] =`bearer ${token}`;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = axios; 

