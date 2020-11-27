import React from 'react';
import {Media } from 'reactstrap';
import {Link} from 'react-router-dom';

const Listfeed=( {feeds})=>{
    return (
        feeds.map(feed=>{
            return(
                <Media>
                <Link to={`/feeds/id/${feed.post_id}`} >
                    <Media body>
                    <Media heading>
                        {feed.heading}
                    </Media>
                    {feed.body}
                    </Media>
                </Link>
                
              </Media>
            ) 
        })
    )
    
    
}
export default Listfeed;