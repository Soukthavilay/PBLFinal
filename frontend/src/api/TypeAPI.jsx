import { useState, useEffect } from 'react';
import axios from 'axios';

function TypeApi() {
  const [types, setTypes] = useState([]);

  const getTypes = async () => {
    const res = await axios.get('https://pbl-final1.onrender.com/api/type');
    setTypes(res.data);
  };
  useEffect(() => {
    getTypes();
  }, []);
  return {
    type: [types, setTypes],
  };
}

export default TypeApi;
