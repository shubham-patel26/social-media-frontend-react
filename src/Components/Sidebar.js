import React,{Component} from 'react'

import {Link} from 'react-router-dom';

function ShowSidebar(props){

        console.log(props);
        return(
            <div className='sidebar'>
                <ul>{
                        props.tagList.map(tag=>
                            <li className='list-unstyled' onClick={props.changeState} key={tag.tag_id}><Link to={`/feeds/tag/${tag.tag_id}`}>{tag.tag_name}</Link></li>

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
        
            <div className="col-md-3 ">
                <div className=''>
                    <ul className='list-unstyled'>
                        <li><Link to = '/home'> Home </Link></li>
                        <li><Link to = '/postfeed'> Post a Feed </Link></li>
                    </ul>
                </div>
                <h4>categories</h4>
                <ShowSidebar changeState={props.changeState} tagList={props.tagList} path={props.path}/>
            </div>
    )
 }


export default Sidebar;