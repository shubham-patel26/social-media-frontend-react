import React , {Component} from 'react';
import Axios from 'axios';
import { Collapse, Button, CardBody,Card,Form,  FormGroup, Input  } from 'reactstrap';


import DisplayComment from './DisplayComment';
class DisplayPost extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            post:'',
            comments: [],
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
            const post=resp[0].data;
            const comments=resp[1].data;
            console.log(post);
            this.setState({
                post : post,
                comments:comments
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
            // console.log(resp);
            this.setState({
                comments: resp.data
            })
        })
        .catch(err=>console.log(err));
        alert("comment: " + this.comment.value );
        event.preventDefault();

    }

    render(){
        console.log(this.state.post);
        return (
            <div className="container">
                {/* <div className='row'>
                    <div className='col-md-2'>
                    <button>Like</button>
                    </div>

                    <div className='col-md'> */}
                        {/* <h3>{this.state.post.heading}</h3>
                        <p>
                            {this.state.post.body}
                        </p> */}
                        
                        <div className="row  ">
                            <div className="col-12 col-md-8 col-xl-9 ">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title tt">{this.state.post.heading}</h5>
                                <p className="writing-time">- {this.state.post.postedOn}</p>
                                    <p className="card-text tt1">{this.state.post.body} </p>
                                </div>
                                </div>
                                
                            </div>
                            <div className="col-12 col-md-4 col-xl-3 side">
                                <div className="card mb-5">
                                <div className="card-body">
                                    <h5>Author</h5>
                                    <hr></hr>
                                    <h4 className="author-name">Vikash Kumar</h4>
                                    <p className="about">Best Novel 2018 award holder. Generous , sophomore , with a glimse of calm attitude</p>
                                    <a href="#" className="btn btn-primary btn-sm">More from him</a>
                                </div>
                                </div>
                                <div className="card likes_comments">
                                    <i className="fa fa-heart ">&nbsp;{this.state.post.upvotes}</i><hr></hr>
                                    <i className="fa fa-comment">&nbsp;{this.state.comments.length}</i>
                                </div>
                            </div>
                        </div>
                    

                <div className="row">
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
                    <Collapse isOpen={this.state.isOpen}>
                        <Card>
                        <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        
                                        <Input type="text" id="comment" name="comment" placeholder="post your comment"
                                            innerRef={(input) => this.comment = input} />
                                    </FormGroup>
                                    
                                    <Button type="submit" value="submit" color="primary">post</Button>
                                </Form>
                        </CardBody>
                        </Card>
                    </Collapse>
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

