import React, {Component} from 'react';
import Axios from 'axios';

import {useState,useEffect} from 'react';

import Sidebar from './Sidebar';
import Listfeed from './Listfeed';

// class Feed extends Component{
//     constructor(props){
//         super(props);

//         this.state={
//             feeds:[]
//         }
//     }

//     async componentDidMount(){
//         const bearer = 'Bearer ' + localStorage.getItem('token');
//         let feeds = await Axios.get('http://localhost:3444/feed',{
//             headers:{
//                 'authorization': bearer,
//                 'Content-Type': 'application/json'
//             }
//         });
        
//         console.log(feeds.data);
//         this.setState({
//             feeds: feeds.data
//         })
//     }

//     render(){
//         // console.log(this.props.tagList);
        
//         return(
//             <div className=''>
//                 <div className='row'>
//                 <div className='col-3 red sidebar'>
//                     <Sidebar changeState={this.props.changeState} tagList={this.props.tagList}/>
//                 </div>
//                 <div className="col-9 main-page" >
//                     <div className="row">
//                          <Listfeed feeds= {this.state.feeds}/>
//                      </div>
//                 </div>
//             </div>
//             </div>
//         )
        
//     }
// }

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

            setFeeds(data);
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
                        <Listfeed feeds= {feeds}/>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Feed;
