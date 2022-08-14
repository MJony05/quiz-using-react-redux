import {useEffect, useState} from 'react';
import axios from "axios";
axios.defaults.baseURL = "https://opentdb.com/"

const UseAxios = ({ url }) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(()=>{
  const fetchData = () => {
    axios.get(url).then(res=>setResponse(res.data)).catch(err=>setError(err)).finally(()=>setLoading(false))
  }
  fetchData()
  }, [url])
  return {response,error,loading};
};

export default UseAxios;