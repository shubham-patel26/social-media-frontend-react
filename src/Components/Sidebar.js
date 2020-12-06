import React,{Component} from 'react'

import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';

function ShowSidebar(props){

        console.log(props);
        return(
            <div  >
                <ul style={{paddingLeft:'0',marginLeft:'0'}}>{
                        props.tagList.map(tag=>
                           <li  onClick={()=>props.changeTagId(tag.tag_id)} key={tag.tag_id}><Button className='btn-primary' style={{width:'100%'}} >{tag.tag_name}</Button></li>

                        )
                    }
                
                </ul>
                
            </div>
        )
 }
 const Sidebar=(props) =>{
    //  console.log(props.tagList);
     console.log('sh');

    return (
        <React.Fragment>
              <div className="tags">
                    <h1 >Tags</h1>
                </div>
             <ShowSidebar changeTagId={props.changeTagId} tagList={props.tagList} path={props.path}/>
        </React.Fragment>
         
    )
 }


export default Sidebar;