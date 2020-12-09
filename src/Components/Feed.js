import React, {Component} from 'react';
import Axios from 'axios';

import {useState,useEffect} from 'react';

import Sidebar from './Sidebar';
import Listfeed from './Listfeed';


const Feed = (props)=>{

    const [feeds,setFeeds] = useState([]);
    const [tag_id,setTagId] = useState(null);
    const [tagList,setTagList] = useState([]); 
    
    useEffect(() => {
        var api = `http://localhost:3444/tag`;
        const FetchTagList= async ()=>{
            const {data} = await Axios.get(api);

            setTagList(data);
        }
        FetchTagList();
        
    }, [])
    useEffect(() => {
        var api = tag_id ?`http://localhost:3444/feed/tag/${tag_id}` :'http://localhost:3444/feed';
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const datafetching= async()=>{
            const {data} = await Axios.get(api,{
                headers:{
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });

            
            for(var i=0;i<data.posts.length;i++){
                data.posts[i].tags=data.tags[data.posts[i].post_id];
            }
            console.log(data.posts);
            setFeeds(data.posts);
            
            
        }
        datafetching();
        
    }, [tag_id])

    const changeTagId= (id)=>{
        setTagId(id);
    }

    return (
            <div className=''>
                <div className='row'>
                <div className='col-3 red sidebar'>
                    <Sidebar changeTagId={changeTagId} tagList={tagList}/>
                </div>

                <div className="col-9 main-page" >
                    <div className="row">
                        <Listfeed feeds= {feeds} />
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Feed;
