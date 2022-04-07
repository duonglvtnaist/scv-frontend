import axios from 'axios';

const axiosClient = axios.create({
  baseUrl: 'http://localhost:9001/job-matching/v1',
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  timeout: 1000
})

axiosClient.defaults.baseURL = 'http://localhost:9001/job-matching/v1';
// add an interceptor
axiosClient.interceptors.response.use(
function (response){

    return response;

}, function (error) {
  console.log(error);
    if (error.response) {
      let response = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
        
      }
      return response
    } else if (error.request){
      return error.request
    } else {
      return {status: 501, statusText: "unknown_error", "message": error.message}
    }

    // return Promise.reject(error);
})

export { axiosClient };

