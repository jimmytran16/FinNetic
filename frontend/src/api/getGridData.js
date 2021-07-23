import React from 'react'
import axios from 'axios'

export function getGridData() {
    return axios.post('http://localhost:4000/test'); 
}  