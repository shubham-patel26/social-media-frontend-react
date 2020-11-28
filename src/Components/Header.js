import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';

import Axios from 'axios';

import '../App.css';
import { NavLink } from 'react-router-dom';
import React,{Component} from 'react';
class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false
          
        };
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
     handleLogin(event) {
        this.toggleModal();
        
        const user={
            email_id:this.email_id.value,
            password:this.password.value
        }
         Axios({
            method: 'post',
            url: 'http://localhost:3444/users/login',
            data: user,
            headers: {
                'Content-Type': 'application/json'
                }
          })
          .then(resp=>{
            // console.log(resp);
            const {token,success,name}=resp.data;
            localStorage.setItem('token',token);
            this.props.setLogin(success);
            this.props.setName(name);
            
          })
          .catch(err=>{
              console.log(err);
          })
        
        event.preventDefault();

    }

    handleLogout(){
            this.props.setLogin(false);
            this.props.setName('');
            alert('you are logged out');
    }
    render() {
        
        return(
            <React.Fragment>
                 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="email_id">Email id</Label>
                                <Input type="text" id="email_id" name="email_id"
                                    innerRef={(input) => this.email_id = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='beingSocial' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                             </NavItem>
                            {
                                this.props.isLoggedin
                                ?  <NavItem>
                                     <NavLink className="nav-link"  to='/feeds'><span className="fa fa-list fa-lg"></span> posts</NavLink>
                                   </NavItem>
                                : null
                            } 
                            
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                        <Nav className="ml-auto" navbar>
                            {
                                this.props.isLoggedin ? 
                                    
                                <NavItem>
                                    <span style={{color:'white',padding:'2px'}} >{this.props.username}</span>
                                    <Button outline onClick={this.handleLogout}><span className="fa fa-sign-out fa-lg"></span> Logout</Button>
                                </NavItem>
                                
                                
                                
                                :
                                
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>
                            }
                                
                            </Nav>
                    </div>
                </Navbar>
               
            </React.Fragment>
        );
    }
}
export default Header;