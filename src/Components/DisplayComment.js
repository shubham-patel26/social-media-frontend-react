import React from 'react';
import {Media} from 'reactstrap';

const DisplayComment=(props)=>{
    console.log(props)
    return (
        
        <div style={{backgroundColor:'white' ,width:'70%', marginLeft:'15px', paddingLeft:'10px',paddingTop:'5px'}}>
            {props.comments.map(comment=>{
                return (
                    <Media >
                  
                        <Media body>
                            <p>{comment.reg_no}</p>
                            {comment.comment}
                        </Media>
                    </Media>
                )
                

            })}
        </div>
    )
}
export default DisplayComment;