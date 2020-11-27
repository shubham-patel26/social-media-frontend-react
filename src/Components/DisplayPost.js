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
            post:{heading: 'test1',
                    body: 'test body 1',
                userRegno:'2018ugcs026'},
            comments: [],
            isOpen: false
        }
    }

    async componentDidMount(){
        let post= await Axios.get(`http://localhost/3444/showpost/${this.props.postId}`);
        console.log(post);
        this.setState({
            post : post
        })

        let comments = await Axios.get(``);
        console.log(comments);
        this.setState({
            comments: comments
        })
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    handleSubmit(event) {
        this.toggle();
        this.state.comments.push(this.comment.value);
        alert("comment: " + this.comment.value );
        event.preventDefault();

    }

    render(){
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-4'>
                    <button>Like</button>
                    </div>

                    <div className='col-md-8'>
                        <h3>{this.state.post.heading}</h3>
                        <p>
                            {this.state.post.body}
                        </p>

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
                    {()=> <DisplayComment comments={this.state.comments} reg_no={this.state.post.userRegno} />}
                </div>
            </div>
        )
    }
}

export default DisplayPost;

