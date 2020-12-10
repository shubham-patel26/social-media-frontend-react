import React from 'react';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Input} from 'reactstrap';
import Axios from 'axios';

import ListUsers from './ListUsers';

const UserDetail =(props)=>{
    const [userList,setUserList] = useState([]);
    const [term,setTerm] = useState('');
    
    useEffect(() => {
        const fetchUserList = async()=>{
            let api = `http://localhost:3444/users/search/${term}`;
            const bearer = 'Bearer ' + localStorage.getItem('token');
            const {data} = await Axios.get(api,{
                headers:{
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                },
                
            })
            console.log(data);
            setUserList(data);
            
        }

        const setTimeoutId= setTimeout(() => {
            fetchUserList();
        }, 500);
        return () => {
            clearTimeout(setTimeoutId);
        }
    }, [term]);

    const handleInputChange = (event )=>{
        console.log(event.target.value);
        setTerm(event.target.value);
    }
    return (
        <div className='container'>
            <div className='row'>
                <Input type="text" id='term' name="term"
                placeholder="search by username"
                value={term}
                
                onChange={(event)=>handleInputChange(event)} />
            </div>
            
            
            <ListUsers users={userList}/>
            


        </div>
        
    )
}
export default UserDetail;