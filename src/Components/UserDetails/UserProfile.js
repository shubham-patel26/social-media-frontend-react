import React, { Component } from 'react';
// import {useState,useEffect} from 'react';
import Axios from 'axios';
import {Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { render } from '@testing-library/react';
class  UserProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            user:{},
            activeTab:'1',
            posts: []
            
        }
        this.toggle=this.toggle.bind(this);
    }
    
    toggle = tab => {
        if(this.state.activeTab !== tab) 
        this.setState({
            activeTab: tab
        })
    }

    // console.log(props);
    componentDidMount(){

        const bearer = 'Bearer ' + localStorage.getItem('token');
        let one=`http://localhost:3444/users/getuserdetails/${this.props.userId}`;
        let two=`http://localhost:3444/feed/user/${this.props.userId}`;
        let auth = {
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        };
        
        
        const fetchUserData = async ()=>{
            
            Axios.get(one,auth)
            .then(resp=>{
                console.log(resp.data);
                Axios.get(two,auth)
                .then(data=>{
                    console.log(data.data);
                    this.setState({
                        user:resp.data,
                        posts: data.data
                    })
                })
                
                .catch(err=>console.log(err));

            })
            .catch(err=>console.log(err));
        }
        fetchUserData();
        
        
    }
    
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.userId!=this.props.userId) {
            const bearer = 'Bearer ' + localStorage.getItem('token');
            let one=`http://localhost:3444/users/getuserdetails/${nextProps.userId}`;
            let two=`http://localhost:3444/feed/user/${nextProps.userId}`;
            let auth = {
                headers:{
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            };
            
            
            const fetchUserData = async ()=>{
                
                Axios.get(one,auth)
                .then(resp=>{
                    console.log(resp.data);
                    Axios.get(two,auth)
                    .then(data=>{
                        
                        console.log(data.data);
                        this.setState({
                            user:resp.data,
                            posts: data.data
                        })
                    })
                    
                    .catch(err=>console.log(err));
    
                })
                .catch(err=>console.log(err));
            }
            fetchUserData();
        }
      }
    
    render(){
        // console.log('here'+this.props.userId);
        
        // console.log(this.state.user.reg_no)
        return (
            
            <div className="container bootstrap snippets bootdeys">
                <div className="row" id="user-profile">
                    <div className="col-lg-3 col-md-4 col-sm-4">
                        <div className="main-box clearfix">
                        <h2>{this.state.user.name}</h2>
                            
                            {this.state.user.reg_no=='2018UGCS026'? <div className="profile-label">
                                <span className="label label-danger">Admin</span>
                            </div>:null}
                           

                            

                            <div className="profile-since">
                                
                            </div>

                            <div className="profile-details">
                                <ul className="fa-ul">
                                    
                                    <li><i className="fa-li fa fa-comment"></i>Posts: <span>{this.state.posts.length}</span></li>
                                    
                                </ul>
                            </div>
                            {this.props.user.reg_no!=this.state.user.reg_no?
                            <div className="profile-message-btn center-block text-center">
                            <Link className="btn btn-success" to={`/chatbox/${this.state.user.reg_no}`}><i className="fa fa-envelope"></i> Send message</Link> 
                                    
                                
                            </div>:
                            null}
                            
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-8 col-sm-8">
                        <div className="main-box clearfix">
                            <div className="profile-header">
                                <h3><span>User info</span></h3>
                                <a href="#" className="btn btn-primary edit-profile">
                                    <i className="fa fa-pencil-square fa-lg"></i> Edit profile
                                </a>
                            </div>

                            <div className="row profile-user-info">
                                <div className="col-sm-8">
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">
                                            Name
                                        </div>
                                        <div className="profile-user-details-value">
                                            {this.state.user.name}
                                        </div>
                                    </div>
                                    
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">
                                            Registration Number
                                        </div>
                                        <div className="profile-user-details-value">
                                            {this.state.user.reg_no}
                                        </div>
                                        
                                    </div>
                                    <div className="profile-user-details clearfix">
                                         

                                    </div>
                                    <div className="profile-user-details clearfix">
                                         
                                         
                                    </div>
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">
                                            Email
                                        </div>
                                        <div className="profile-user-details-value">
                                            {this.state.user.email_id}
                                        </div>
                                    </div>
                                    <div className="profile-user-details clearfix">
                                        <div className="profile-user-details-label">
                                            intro
                                        </div>
                                        <div className="profile-user-details-value">
                                            {this.state.user.intro}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 profile-social">
                                    <ul className="fa-ul">
                                       {this.state.user.linkedin_link?<li><i className="fa-li fa fa-linkedin-square"></i><a href={this.state.user.linkedin_link} target="_blank">{this.state.user.name} </a></li>:null} 
                                        {this.state.user.facebook_link?<li><i className="fa-li fa fa-facebook-square"></i><a href={this.state.user.facebook_link} target="_blank">{this.state.user.name} </a></li>:null}
                                        
                                        
                                    </ul>
                                </div>
                            </div>


                            <div>
                            <Nav tabs>
                                <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Activity
                                </NavLink>
                                </NavItem>
                                {this.props.user.reg_no==this.state.user.reg_no?<NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Chats
                                </NavLink>
                                </NavItem>
                                :
                                null
                                }
                                
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                            <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                {this.state.posts.map(post=>{
                                                return (
                                                    <tr key={post.post_id}>
                                                        <td className="text-center">
                                                            <i className="fa fa-check"></i>
                                                        </td>
                                                        <td>
                                                            {this.state.user.name}  posted a feed <Link to={`../feeds/id/${post.post_id}`}>{post.heading}</Link> .
                                                        </td>
                                                        <td>
                                                            {post.posted_on}
                                                        </td>
                                                    </tr>
                                                    
                                                )
                                            })}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    
                                    
                                </TabPane>
                                <TabPane tabId="2">
                                <Row>
                                <div className="conversation-wrapper">
                                            <div className="conversation-content">
                                                <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '340px'}}>
                                                    <div className="conversation-inner" style={{overflow: 'hidden', width: 'auto', height: '340px'}}>

                                                        <div className="conversation-item item-left clearfix">
                                                            <div className="conversation-user">
                                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="img-responsive"  alt=""/>
                                                            </div>
                                                            <div className="conversation-body">
                                                                <div className="name">
                                                                    Ryan Gossling
                                                                </div>
                                                                <div className="time hidden-xs">
                                                                    September 21, 2013 18:28
                                                                </div>
                                                                <div className="text">
                                                                    I don't think they tried to market it to the billionaire, spelunking, base-jumping crowd.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="conversation-item item-right clearfix">
                                                            <div className="conversation-user">
                                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="img-responsive"  alt=""/>
                                                            </div>
                                                            <div className="conversation-body">
                                                                <div className="name">
                                                                    Mila Kunis
                                                                </div>
                                                                <div className="time hidden-xs">
                                                                    September 21, 2013 12:45
                                                                </div>
                                                                <div className="text">
                                                                    Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        

                                                    </div>
                                                    <div className="slimScrollBar" style={{width: '7px', position: 'absolute', top: '0px', opacity: '0.4', display: 'block', borderRadius : '7px', zIndex: '99', right: '1px', background: 'rgb(0, 0, 0)'}}></div>
                                                    <div className="slimScrollRail" style={{width: '7px', height: '100%', position: 'absolute', top: '0px', display: 'none', borderRadius: '7px', opacity: '0.2', zIndex: '90', right: '1px', background: 'rgb(51, 51, 51)'}}></div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    
                                </Row>
                                </TabPane>
                            </TabContent>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )}
    
}

export default UserProfile;