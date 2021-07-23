import React, { useState, useEffect } from 'react'
import { getHomeContent } from '../../api/home'

export default function Home(props) {
    const [content,setContent] = useState(null);

    useEffect(() => {
        getHomeContent()
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
    },[])

    return (
        <div>
            <h3>Home Page</h3>
        </div>
    )
}