import React, { Component } from "react";
import { navbar, Navbar, NavbarBrand, Card } from "reactstrap";
import "../App.css";
import Axios from 'axios';

import Header from './Header';
import Home from './Home';
import Feed from './Feed';
import DisplayPost from './DisplayPost';
import DisplayFeedWithTag from './DisplayFeedWithTag';
import NewPost from './NewPost';

import { Switch, Route, Redirect } from "react-router-dom";


class Main extends Component {
  constructor(props) {
    super(props);

    this.setLogin = this.setLogin.bind(this);
    this.setName = this.setName.bind(this);
    this.changeState = this.changeState.bind(this);
    this.state={
      tags:[],
      isLoggedin: false,
      username: '',
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
          let tags= await Axios.get(`http://localhost:3444/tag`)
          console.log(user.data[0].name);
            this.setState({
              tags:tags.data,
              username:user.data[0].name,
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
  setName(username){
    this.setState({
      
      username : username
    })
  }
  changeState(){
    console.log(this.state.mount)
    this.setState({
      mount: !this.state.mount
    })
  }
  render() {
    
    const PostWithId= ({match})=>{
        return (
            <DisplayPost postId={match.params.postId}/>
        )
    }

    const FeedWithTag=({match})=>{
      console.log(this.state.mount);
      return (
        <DisplayFeedWithTag changeState={this.changeState} tag_id={match.params.tag_id} tagList={this.state.tags } path={match.path}/>
      )
    }
    
    return (
      <div className=''>
          <Header setLogin={this.setLogin} setName={this.setName} isLoggedin={this.state.isLoggedin} username={this.state.username}/>

          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/feeds' component={()=><Feed  tagList={this.state.tags}/>}/>
            <Route exact path='/feeds/tag/:tag_id' component={FeedWithTag}/>
            <Route path='/feeds/id/:postId' component={PostWithId}/>
            <Route path='/newpost' component={()=><NewPost isLoggedin={this.state.isLoggedin} changeState={this.changeState}/>}/>
            <Redirect to ='/home'/>
          </Switch>
      </div>
        
      
    );
  }
}

export default Main;