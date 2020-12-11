import React , {Component} from 'react';
import Axios from 'axios';
import { Collapse, Button, CardBody,Card,Form,  FormGroup, Input  } from 'reactstrap';
import {Link } from 'react-router-dom'

import DisplayComment from './DisplayComment';
class DisplayPost extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVoting = this.handleVoting.bind(this);
        this.state={
            post:'',
            comments: [],
            author: {},
            isOpen: false
        }
    }

    componentDidMount(){
        alert(this.props.postId);
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let one=`http://localhost:3444/showpost/${this.props.postId}`;
        let two=`http://localhost:3444/comment/${this.props.postId}`;
        let auth = {
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        };
        const requestOne = Axios.get(one,auth);
        const requestTwo =Axios.get(two,auth);
        Axios.all([requestOne,requestTwo])
        .then(Axios.spread((...resp)=>{
            const post=resp[0].data.post;
            const author = resp[0].data.authorDetails;
            const comments=resp[1].data;
            console.log(author[0]);
            this.setState({
                post : post,
                comments:comments,
                author: author[0]
            })

        }))
        .catch(err=>console.log(err));
        

    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    handleSubmit(event) {
        this.toggle();

        const bearer = 'Bearer ' + localStorage.getItem('token');
        let data={newComment: this.comment.value};
        Axios.post(`http://localhost:3444/addcomment/${this.props.postId}`,data,{
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>{
            console.log(resp);
            this.setState({
                comments: resp.data
            })
        })
        .catch(err=>console.log(err));
        alert("comment: " + this.comment.value );
        event.preventDefault();
        event.target.reset();

    }

    handleVoting(type){
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let api = type==1?`http://localhost:3444/upvote/${this.state.post.postId}`:`http://localhost:3444/downvote/${this.state.post.postId}`;
        Axios.get(api,{
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>{
            // console.log(resp);
            this.setState({
                post: resp.data
            })
        })
        .catch(err=>console.log(err));
    }

    render(){
        // console.log(this.state.author);
        return (
            <div className="container">
                
                        <div className="row  ">
                            <div className="col-12 col-md-8 col-xl-9 ">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title tt">{this.state.post.heading}</h5>
                                <p className="writing-time">- {this.state.post.postedOn}</p>
                                    <p className="card-text tt1">{this.state.post.body} </p>
                                </div>
                               
                                </div>
                                <div className="row">
                
                <div className='col-1'>
                    <Link>
                    {this.state.post.hasUserUpvoted?
                    <i onClick={()=>this.handleVoting(2)} className="fa fa-heart" style={{fontSize:'41px',color:'red'}}/>:
                    <i onClick={()=>this.handleVoting(1)} className="fa fa-heart-o" style={{fontSize:'41px',color:'red'}}/>
                    }
                    </Link>
                    
                        
                        
                    </div>
                    <div className='col-11'>
                        
                        <Form className='row' onSubmit={this.handleSubmit}>
                        <div className='col-1'><Button type="submit" value="submit" color="primary" >post</Button></div>
                        <div className='col-11'>
                        <FormGroup >
                            
                            <Input  type="text" id="comment" name="comment" placeholder="post your comment"
                                innerRef={(input) => this.comment = input} />
                        </FormGroup>
                        </div>
                        
                            

                            
                        </Form>
                        
                    
                    </div>
                        
                
            
            </div>
                            </div>
                            <div className="col-12 col-md-4 col-xl-3 side">
                                <div className="card mb-5">
                                <div className="card-body">
                                    <h5>Author</h5>
                                    <hr></hr>
                                    <h4 className="author-name">{this.state.author.name}</h4>
                                    <p className="about">{this.state.author.intro}</p>
                                    <a href="#" className="btn btn-primary btn-sm">More from him</a>
                                </div>
                                </div>
                                <div className="card likes_comments">
                                    <i className="fa fa-heart ">&nbsp;{this.state.post.upvotes}</i><hr></hr>
                                    <i className="fa fa-comment">&nbsp;{this.state.comments.length}</i>
                                </div>
                            </div>
                        </div>
                    

                       


                <div className='row'>
                    <DisplayComment comments={this.state.comments}  />
                </div>
                    </div>
                // </div>


                
            // </div>
        )
    }
}

export default DisplayPost;

