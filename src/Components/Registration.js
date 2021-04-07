
import React,{Component} from 'react';
import {  Collapse,Button, Modal, ModalHeader, ModalBody,Col,
    Form, FormGroup, Input, Label,FormFeedback } from 'reactstrap';

import Axios from 'axios';

class Registration  extends Component{
    constructor(props){
        super(props);

        this.state = {
            Registration_no: '',
            username: '',
            email:'',
            password: '',
            intro : '',
            Linkedin_id: '',
            facebook_id:'',
            touched:{
                Registration_no: false,
                username: false,
                email:false,
                intro:false

            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.refreshPage=this.refreshPage.bind(this);
        this.handleBlur= this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    refreshPage() {
		window.location.reload(false);
  }
    handleRegistration(event) {
        // alert('done');
        const data={
            reg_no: this.state.Registration_no,
            email_id: this.state.email,
            password: this.state.password,
            name:this.state.username,
            intro: this.state.intro,
            facebook: this.state.facebook_id,
            linkedin: this.state.Linkedin_id
        }
        // console.log(data);
        
        Axios.post('https://being-social26.herokuapp.com/users/signup',data)
        .then(resp=>{
            console.log(resp.data);
            if(resp.data.success){
                this.setState({
                    Registration_no: '',
                    email: '',
                    password: '',
                    username:'',
                    intro: '',
                    facebook_id: '',
                    Linkedin_id: '',
                    touched:{Registration_no:false,username:false},
                })
                // this.props.changeState();
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
    
    validate(Registration_no,username){
        const errors ={
            Registration_no: '',
            username: ''
        };
        if (this.state.touched.Registration_no && Registration_no.length<11)
            errors.Registration_no = 'title should be >=11 characters';
        else if(this.state.touched.Registration_no && Registration_no.length>12)
            errors.Registration_no = 'title should be <=12 characters';

        if (this.state.touched.username && username.length<3)
            errors.username = 'title should be >=3 characters';
        else if(this.state.touched.username && username.length>20)
            errors.username = 'title should be <=20 characters';


            return errors;
            
    }
    render(){
        const errors= this.validate(this.state.Registration_no,this.state.username);
        return (
            
            <React.Fragment>
                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                        <ModalBody>
                        <Form onSubmit={this.handleRegistration}>
                     <FormGroup row>
                             <Label htmlFor="Registration_no" md={2}>Registration Number:</Label>
                             <Col md={10}>
                                 <Input type="text" id="Registration_no" name="Registration_no"
                                     placeholder="enter your college registration number"
                                     value={this.state.Registration_no}
                                     valid={errors.Registration_no === ''}
                                     invalid={errors.Registration_no !== ''}
                                     onBlur={this.handleBlur('Registration_no')}
                                     onChange={this.handleInputChange} />
                                 <FormFeedback>{errors.Registration_no}</FormFeedback>
                             </Col>
                         </FormGroup>
                         <FormGroup row>
                             <Label htmlFor="username" md={2}>Name:</Label>
                             <Col md={10}>
                                 <Input type="text" id="username" name="username"
                                     placeholder="enter your name"
                                     value={this.state.username}
                                     valid={errors.username === ''}
                                     invalid={errors.username !== ''}
                                     onBlur={this.handleBlur('username')}
                                     onChange={this.handleInputChange} />
                                 <FormFeedback>{errors.username}</FormFeedback>
                             </Col>
                         </FormGroup>
                         
                         <FormGroup row>
                             <Label htmlFor="email" md={2}>Email:</Label>
                             <Col md={10}>
                                 <Input type="text" id="email" name="email"
                                     placeholder="enter your email"
                                     value={this.state.email}
                                    
                                     onBlur={this.handleBlur('email')}
                                     onChange={this.handleInputChange} />
                                 
                             </Col>
                         </FormGroup>
                         <FormGroup row>
                             <Label htmlFor="password" md={2}>password:</Label>
                             <Col md={10}>
                                 <Input type="password" id="password" name="password"
                                     placeholder="enter a strong password"
                                     value={this.state.password}
                                     
                                     onChange={this.handleInputChange} />
                                 
                             </Col>
                         </FormGroup>

                         <FormGroup row>
                             <Label htmlFor="intro" md={2}>Your intro:</Label>
                             <Col md={10}>
                                 <Input type="textarea" id="intro" name="intro"
                                     rows="7"
                                     value={this.state.intro}
                                     onBlur={this.handleBlur('intro')}
                                     onChange={this.handleInputChange}></Input>
                             </Col>
                         </FormGroup>
                         <FormGroup row>
                             <Label htmlFor="Linkedin_id" md={2}>Linkedin id:</Label>
                             <Col md={10}>
                                 <Input type="text" id="Linkedin_id" name="Linkedin_id"
                                     placeholder="linkedin"
                                     value={this.state.Linkedin_id}
                                     onChange={this.handleInputChange}
                                     />
                             </Col>
                         </FormGroup>

                         <FormGroup row>
                             <Label htmlFor="facebook_id" md={2}>Facebook id:</Label>
                             <Col md={10}>
                                 <Input type="text" id="facebook_id" name="facebook_id"
                                     placeholder="facebook"
                                     value={this.state.facebook_id}
                                     onChange={this.handleInputChange}
                                     />
                             </Col>
                         </FormGroup>
                         <FormGroup row>
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Col>                     
                             
                         </FormGroup>
                     </Form>
                        </ModalBody>
                    </Modal>
            </React.Fragment>
        )
    }
}

export default Registration;