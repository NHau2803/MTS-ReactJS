import axios from 'axios';

import { useEffect, useState } from 'react';

export default function PositionListAPI(){

    const [positionList, setPositionList] = useState([]);

    const fetchData = async () => {
     
        await axios.get('http://localhost:8090/position/all')
        .then(res=>{
            setPositionList(res.data);
        })
        .catch(error=>{
            setPositionList([]);
        });
    };

    useEffect(() => { fetchData(); }, []);

    return positionList ;
    
}

