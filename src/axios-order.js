import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-2e2bb.firebaseio.com/'
})

export default instance