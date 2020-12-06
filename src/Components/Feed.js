import React, {Component} from 'react';
import Axios from 'axios';

import Sidebar from './Sidebar';
import Listfeed from './Listfeed';

class Feed extends Component{
    constructor(props){
        super(props);

        this.state={
            feeds:[]
        }
    }

    async componentDidMount(){
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let feeds = await Axios.get('http://localhost:3444/feed',{
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(feeds.data);
        this.setState({
            feeds: feeds.data
        })
    }

    render(){
        // console.log(this.props.tagList);
        
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

export default Feed;
