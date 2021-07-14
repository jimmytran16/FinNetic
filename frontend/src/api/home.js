import axios from 'axios'

export function getHomeContent() {
    return axios.get('http://localhost:4000/'); 
}