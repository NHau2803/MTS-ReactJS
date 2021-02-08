import axios from 'axios';

import { useEffect, useState } from 'react';

export default function FacultyListAPI(){

    const [faculyList, setFacultyList] = useState([]);

    const fetchData = async () => {
     
        await axios.get('http://localhost:8090/faculty/all')
        .then(res=>{
            setFacultyList(res.data);
        })
        .catch(error=>{
            setFacultyList([]);
        });
    };

    useEffect(() => { fetchData(); }, []);

    return faculyList ;
    
}

