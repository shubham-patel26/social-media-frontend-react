import React from 'react';
import {Media } from 'reactstrap';
import {Link} from 'react-router-dom';

const Listfeed=( {feeds})=>{
  
    return (
        feeds.map(feed=>{
            return(
              
               
               
               <div className="col-sm-4  mb-3">
                 <div className="card">
                   <div className="card-body">
                     <h5 className="card-title">{feed.heading}</h5>
                    <i className="author"><a href="" className="author">~{feed.reg_no}</a></i>

                     
                    <p className="card-text module last-line">{feed.body}</p>

                    <p>
                      tags: {
                        feed.tags
                      }</p>
                     <Link to={`/feeds/id/${feed.post_id}`} className="btn btn-primary btn-sm ">Read more</Link>
                     
                     <div className="offset-7  col-sm-9 col-md-6 mb-3">
                    <i className="fa fa-heart  ">{feed.upvotes}  </i>
                    <i> </i>
                       <i className="fa fa-comment">{feed.comment_count}</i>
                     </div>
                     <div className="time">
                       {feed.posted_on}
                     </div>
                   </div>
                 </div>
               </div>
               
              
          
            ) 
        })
    )
    
    
}
export default Listfeed;