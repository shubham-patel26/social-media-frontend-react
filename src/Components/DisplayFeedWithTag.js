import React, {Component} from 'react';
import Axios from 'axios';

import Sidebar from './Sidebar';
import Listfeed from './Listfeed';

class DisplayFeedWithTag extends Component{
    constructor(props){
        super(props);

        this.state={
            
            feeds:[]
        }
    }

    componentDidMount(){
        console.log(this.props.tag_id);
        const bearer = 'Bearer ' + localStorage.getItem('token');
        Axios.get(`http://localhost:3444/feed/tag/${this.props.tag_id}`,{
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        .then(feeds=>{
            console.log(feeds.data);
            this.setState({
                feeds: feeds.data
            })
        })
        .catch(err=>console.log(err));
        
    }

    render(){
        console.log(this.props);
        console.log(this.props.tag_id);
        return(
            <div className=''>
                <div className='row'>
                <div className='col-3 red sidebar'>
                    <Sidebar changeState={this.props.changeState} tagList={this.props.tagList}/>
                </div>
                <div className="col-9 main-page" >
                    <div className="row">
                         <Listfeed feeds= {this.state.feeds}/>
                     </div>
                </div>
            </div>
            </div>
            
        )
        
    }
}

export default DisplayFeedWithTag ;