import React, { Component } from "react";
import { navbar, Navbar, NavbarBrand, Card } from "reactstrap";
import "../App.css";
import Axios from 'axios';

import Header from './Header';
import Home from './Home';
import Feed from './Feed';
import DisplayPost from './DisplayPost';
import DisplayFeedWithTag from './DisplayFeedWithTag';

import { Switch, Route, Redirect } from "react-router-dom";


class Main extends Component {
  constructor(props) {
    super(props);

    this.setLogin = this.setLogin.bind(this);
    this.setName = this.setName.bind(this);
    this.state={
      tags:['a','b','c'],
      isLoggedin: false,
      username: ''
      
    }
  }

  // async componentDidMount(){
  //     let tagList = Axios.get(``);
  //     console.log(tagList);

  //     this.setState({
  //       tags: tagList
  //     })
  // }

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
  render() {
    
    const PostWithId= ({match})=>{
        return (
            <DisplayPost postId={match.params.postId}/>
        )
    }

    const FeedWithTag=({match})=>{
      return (
        <DisplayFeedWithTag tag={match.params.tag} tagList={this.state.tags}/>
      )
    }
    return (
      <div className='container'>
          <Header setLogin={this.setLogin} setName={this.setName} isLoggedin={this.state.isLoggedin} username={this.state.username}/>

          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/feeds' component={()=><Feed  tagList={this.state.tags}/>}/>
            <Route exact path='/feeds/tag/:tag' component={FeedWithTag}/>
            <Route path='/feeds/id/:postId' component={PostWithId}/>
            <Redirect to ='/home'/>
          </Switch>
      </div>
        
      
    );
  }
}

export default Main;