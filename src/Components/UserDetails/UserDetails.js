import React from 'react';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Input} from 'reactstrap';


const UserDetail =(props)=>{
    const [userList,setUserList] = useState([]);
    const [term,setTerm] = useState(null);
    
    // useEffect(() => {
    //     const fetchUserList = async()=>{
    //         let api = `http://localhost:3444/`
    //         const {data} = Axios.get()
    //     }

    //     const setTimeoutId= setTimeout(() => {
    //         fetchUserList();
    //     }, 500);
    //     return () => {
    //         clearTimeout(setTimeoutId);
    //     }
    // }, [term]);

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
            <div className='row'>
            <div className="media" style={{backgroundColor:'white'}}>
                
                <div className="media-body">
                    <h5 className="mt-0">Media heading</h5>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
                <div className='btn-primary'> <Link to={'/home'}>message</Link></div>
                </div>

            </div>


        </div>
        
    )
}
export default UserDetail;