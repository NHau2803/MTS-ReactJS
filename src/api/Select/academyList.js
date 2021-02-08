import axios from 'axios';

import { useEffect, useState } from 'react';

export default function AcademyListAPI(){

    const [academyList, setAcademyList] = useState([]);

    const fetchData = async () => {
     
        await axios.get('http://localhost:8090/academy/all')
        .then(res=>{
            setAcademyList(res.data);
        })
        .catch(error=>{
            setAcademyList([]);
        });
    };

    useEffect(() => { fetchData(); }, []);

    return academyList ;
    
}

