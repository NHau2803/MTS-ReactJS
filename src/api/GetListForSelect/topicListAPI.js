import axios from 'axios';

import { useEffect, useState } from 'react';

export default function TopicListAPI(){

    const [topicList, setTopicList] = useState([]);

    const fetchData = async () => {
     
        await axios.get('http://localhost:8090/topic/all')
        .then(res=>{
            setTopicList(res.data.result);
        })
        .catch(error=>{
            setTopicList([]);
        });
    };

    useEffect(() => { fetchData(); }, []);

    return topicList ;
    
}

