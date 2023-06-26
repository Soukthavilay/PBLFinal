import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get('https://pbl-technology-988327da4050.herokuapp.com/api/category')
            setCategories(res.data)
        }
        getCategories()
    },[callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI