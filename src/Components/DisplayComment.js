import React from 'react';
import {Media} from 'reactstrap';

const DisplayComment=(props)=>{
    console.log(props)
    return (
        
        <div>
            {props.comments.map(comment=>{
                return (
                    <Media>
                  
                        <Media body>
                            <Media heading>
                            {comment.author}
                            </Media>
                            {comment.comment}
                        </Media>
                    </Media>
                )
                

            })}
        </div>
    )
}
export default DisplayComment;