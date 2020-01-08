import React, {Component, Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Search from './components/users/Search';


class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }

/*   async componentDidMount() {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading: false})
  } */

  //search users
  searchUsers = async text => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading: false})
  };

  //get single Github user
  getUser = async (username) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user: res.data, loading: false})
  };

  // get users repo
  getUserRepos = async (username) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos: res.data, loading: false})
  };


  // clear users
  clearUsers = () => {
    this.setState({ users: [], loading: false})
  }

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: {msg, type}})

    setTimeout(() => {
      this.setState({alert: null})
    }, 1000);
  }

  render() {
    const { users, loading, alert, user, repos} = this.state;
    return (
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true : false}
                  setAlert={this.setAlert}
                />
                <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path ='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User 
                {...props} 
                getUser={this.getUser} 
                getUserRepos={this.getUserRepos}
                repos={repos}
                user={user} 
                loading={loading}
                />
            )}/>
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;