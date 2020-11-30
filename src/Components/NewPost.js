import React,{Component} from 'react';
import Footer from './Footer';
import { Button, Form, FormGroup, Label, Input, Col , FormFeedback,Table,thead,tr} from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class NewPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            heading: '',
            tag: '',
            tagList:[],
            body: '',
            touched:{
                heading: false,
                tag: false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
        this.refreshPage=this.refreshPage.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    addTag(){
        var tagList=this.state.tagList;
        tagList.push(this.state.tag);
        this.setState({
            tag:'',
            tagList:tagList
        })
    }

    refreshPage() {
		window.location.reload(false);
  }
    handleSubmit(event) {
        // console.log('Current State is: ' + JSON.stringify(this.state));
        // alert('Current State is: ' + JSON.stringify(this.state));
        
        const data={
            heading:this.state.heading,
            body: this.state.body,
            tags: this.state.tagList
        }
        const bearer = 'Bearer ' + localStorage.getItem('token');
        // console.log(data);
        // console.log(bearer);
        Axios.post('http://localhost:3444/newpost',data,{
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>{
            console.log(resp.data);
            if(resp.data.success){
                this.setState({
                    heading:'',
                    body: '',
                    tagList:[],
                    tag:'',
                    touched:{heading:false,tag:false},
                })
                this.props.changeState();
                alert(resp.data.message);
                this.refreshPage();
            }
        })
        .catch(err=>console.log(err));
        event.preventDefault();
        
    }

    handleBlur = (field)=> (evt)=> {
        this.setState({
            touched: {...this.state.touched, [field] : true }
        });
    }
    
    validate(heading,tag){
        const errors ={
            heading: '',
            tag: ''
        };
        if (this.state.touched.heading && heading.length<3)
            errors.heading = 'title should be >=3 characters';
        else if(this.state.touched.heading && heading.length>50)
            errors.heading = 'title should be <=50 characters';

        
        if( this.state.touched.tag&&tag==''&&this.state.tagList.length==0)
            errors.tag = 'this field can not be empty';
        
            return errors;
            
    }
    
    render(){
        const errors= this.validate(this.state.heading,this.state.tag);

        return (
            <div>
                
                <div className="row row-content">
                <div className="col-12">
                   <h3>Post a new Feed</h3>
                </div>
                 <div className="col-12 col-md-9">
                     <Form onSubmit={this.handleSubmit}>
                     <FormGroup row>
                             <Label htmlFor="heading" md={2}>Title</Label>
                             <Col md={10}>
                                 <Input type="text" id="heading" name="heading"
                                     placeholder="title"
                                     value={this.state.heading}
                                     valid={errors.heading === ''}
                                     invalid={errors.heading !== ''}
                                     onBlur={this.handleBlur('heading')}
                                     onChange={this.handleInputChange} />
                                 <FormFeedback>{errors.heading}</FormFeedback>
                             </Col>
                         </FormGroup>
                         
                         
                        <FormGroup row>
                             <Label htmlFor='tags' md={2}>Tags</Label>
                             <Col md={6}>
                                 <Input type="text" id="tag" name="tag"
                                     placeholder="put a tag"
                                     value={this.state.tag}
                                     valid={errors.tag === ''}
                                     invalid={errors.tag !== ''}
                                     onBlur={this.handleBlur('tag')}
                                     onChange={this.handleInputChange} />
                                 <FormFeedback>{errors.tag}</FormFeedback>
                             </Col>
                             <Col><span><Button color="primary" onClick= {this.addTag}>Add</Button> </span></Col>
                             <Col>{this.state.tagList.map(tag=>
                                    <Table striped>
                                    <thead>
                                    <tr>
                                        <th>{tag}</th>
                                        
                                    </tr>
                                    </thead>
                                    </Table>)}
                             </Col>
                         </FormGroup>

                         <FormGroup row>
                             <Label htmlFor="body" md={2}>Your body</Label>
                             <Col md={10}>
                                 <Input type="textarea" id="body" name="body"
                                     rows="20"
                                     value={this.state.body}
                                     onChange={this.handleInputChange}></Input>
                             </Col>
                         </FormGroup>
                         <FormGroup row>
                             {
                                 this.props.isLoggedin?<Col md={{size: 10, offset: 2}}>
                                                            <Button type="submit" color="primary">
                                                            Submit
                                                            </Button>
                                                        </Col>
                                                        :<Col md={{size: 10, offset: 2}}>
                                                                <button color='primary' style={{color : "black"}}
                                                                    disabled={!this.props.isLoggedin}
                                                                    
                                                                    >
                                                                        Login First
                                                                </button>
                                                            </Col>
                             }
                             
                         </FormGroup>
                     </Form>
                 </div>
            </div>
                <Footer/>
            </div>
            

        )
    }
}

export default NewPost;