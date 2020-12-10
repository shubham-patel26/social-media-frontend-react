import React from 'react';
import {Link} from 'react-router-dom'

const ListUsers = (props)=>{


    return (
        props.users.map(user=>{
            return (
                user.reg_no==props.user.reg_no?null:(<div className='row ' style={{borderColor:'burlywood',marginTop:'8px', }}>
                <div className="media" style={{backgroundColor:'white',width:'100%',border:'1px' , paddingLeft:'5px',borderRadius:'4px'}}>
                            
                <div className="media-body">
                    <h5 className="mt-0">{user.name}</h5>
                    {user.intro}
                </div>
                <div > <Link to={`/chatbox/${user.reg_no}`} className='btn btn-info' style={{marginRight:'2px'}}>message</Link></div>
                <div>
                    <Link to = {`/userprofile/${user.reg_no}`} className='btn btn-info'>View Profile</Link>
                </div>
                </div>
                
            </div>)
                
                
            )
            
        })
    )
}

export default ListUsers;