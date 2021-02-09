import axios from 'axios';

import { useEffect, useState } from 'react';

export default function TypeTopicListAPI(){

    const [typeTopicList, setTypeTopicList] = useState([]);

    const fetchData = async () => {
     
        await axios.get('http://localhost:8090/typeTopic/all')
        .then(res=>{
            setTypeTopicList(res.data);
        })
        .catch(error=>{
            setTypeTopicList([]);
        });
    };

    useEffect(() => { fetchData(); }, []);

    return typeTopicList ;
    
}

