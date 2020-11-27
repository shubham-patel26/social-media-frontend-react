import React, {Component} from 'react';
import Axios from 'axios';

import Sidebar from './Sidebar';
import Listfeed from './Listfeed';

class DisplayFeedWithTag extends Component{
    constructor(props){
        super(props);

        this.state={
            feeds:[{post_id:1,
                    heading: 'test1',
                body: 'test body1' }
            ]
        }
    }

    // async componentDidMount(){
    //     let feeds = await Axios.get(`http://localhost:3444/feed/tag/${this.props.tag}`);
        
    //     console.log(feeds);
    //     this.setState({
    //         feeds: feeds
    //     })
    // }

    render(){
        console.log('here');
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

export default DisplayFeedWithTag ;