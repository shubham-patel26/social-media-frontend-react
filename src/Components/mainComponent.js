import React, { Component } from "react";
import { navbar, Navbar, NavbarBrand, Card } from "reactstrap";
import "../App.css";
import Axios from 'axios';

import Header from './Header';
import Home from './Home';
import Feed from './Feed';
import DisplayPost from './DisplayPost';
import Chatbox from './ChatBox/chatbox';
import NewPost from './NewPost';
import UserDetail from './UserDetails/UserDetails';
import UserProfile from './UserDetails/UserProfile';
import UserChat from './ChatBox/UserChat';

import { Switch, Route, Redirect } from "react-router-dom";


class Main extends Component {
  constructor(props) {
    super(props);

    this.setLogin = this.setLogin.bind(this);
    this.setUser = this.setUser.bind(this);
    this.state={
      isLoggedin: false,
      user: '',
      mount: false
      
    }
  }

    async componentDidMount(){
      
      if(localStorage.getItem('token'))
      {
          
          const bearer = 'Bearer ' + localStorage.getItem('token');
          let user = await Axios.get(`http://localhost:3444/users/getuser/`,{
            headers:{
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
            
        })
        console.log(user.data[0]);
        if(user.data[0]){
          
            this.setState({
              user:user.data[0],
              isLoggedin: true
            })
        }
        
      }  
      
  }

  
  
  setLogin(success){
    this.setState({
      isLoggedin: success
      
    })
  }
  setUser(user){
    this.setState({
      
      user : user
    })
  }
  
  render() {
    
    const PostWithId= ({match})=>{
        return (
            <DisplayPost postId={match.params.postId}/>
        )
    }

    console.log('here');
    console.log(this.state.user.reg_no);
    return (
      <div className=''>
          <Header setLogin={this.setLogin} setUser={this.setUser} isLoggedin={this.state.isLoggedin} user={this.state.user}/>

          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/feeds' component={Feed}/>
            
            <Route path='/feeds/id/:postId' component={PostWithId}/>
            <Route path='/newpost' component={()=><NewPost isLoggedin={this.state.isLoggedin}/>}/>
            <Route path='/userchat' component={UserChat}/>
            <Route exact path='/chatbox/:userId' component={({match})=> <Chatbox receiverId={match.params.userId} sender={this.state.user.reg_no}/>} />
            <Route path='/users' component={()=><UserDetail user={this.state.user} />}/>
            <Route path='/userprofile/:userId' component={({match})=> <UserProfile userId={match.params.userId} user={this.state.user}/>}/>
            <Redirect to ='/home'/>
          </Switch>
      </div>
        
      
    );
  }
}

export default Main;