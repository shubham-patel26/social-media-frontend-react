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

    // async componentDidMount(){
    //     let feeds = await Axios.get('http://localhost:3444/feed');
        
    //     console.log(feeds);
    //     this.setState({
    //         feeds: feeds
    //     })
    // }

    render(){
        // console.log(this.props.tagList);
        
        return(
            <div className='row'>
                <div className='col-md-3'>
                    <Sidebar tagList={this.props.tagList} />
                </div>
                <div className="col-md" >
                    <Listfeed feeds= {this.state.feeds}/>
                </div>
            </div>
        )
        
    }
}

export default Feed;
