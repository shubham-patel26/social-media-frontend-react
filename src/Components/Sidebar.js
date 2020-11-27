import React,{Component} from 'react'

import {Link} from 'react-router-dom';

function ShowSidebar(props){

        console.log(props.tagList);
        return(
            <div className='sidebar'>
                <ul>{
                        props.tagList.map(tag=>
                            <li className='list-unstyled' key={tag}><Link to={`/feeds/tag/${tag}`}>{tag}</Link></li>

                        )
                    }
                
                </ul>
                
            </div>
        )
 }
 const Sidebar=(props) =>{
     console.log(props.tagList);
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
                <ShowSidebar tagList={props.tagList}/>
            </div>
    )
 }


export default Sidebar;