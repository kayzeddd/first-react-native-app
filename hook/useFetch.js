import { useState, useEffect } from 'react';
import axios from 'axios';

// import { JSEARCH_API_KEY } from '@env' //not working
// const jsearchApiKey = JSEARCH_API_KEY;
// require("dotenv").config();
// const { JSEARCH_API_KEY } = process.env;

const dontStealPls = "a74bf264f1msh5a71a8e64ba0f42p1848e5jsn04ffb7a367ec"

const useFetch = (endpoint, query) =>{
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'X-RapidAPI-Key': dontStealPls,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query }
      };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options)
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error);
            alert("There is an error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch}
}

export default useFetch