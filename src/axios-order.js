import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-80f7e.firebaseio.com/'
})

export default instance