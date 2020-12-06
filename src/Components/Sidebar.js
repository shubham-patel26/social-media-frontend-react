import React,{Component} from 'react'

import {Link} from 'react-router-dom';

function ShowSidebar(props){

        console.log(props);
        return(
            <div  >
                <ul style={{paddingLeft:'0',marginLeft:'0'}}>{
                        props.tagList.map(tag=>
                            <li onClick={props.changeState} key={tag.tag_id}><Link to={`/feeds/tag/${tag.tag_id}`} >{tag.tag_name}</Link></li>

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
             <ShowSidebar changeState={props.changeState} tagList={props.tagList} path={props.path}/>
        </React.Fragment>
         
    )
 }


export default Sidebar;