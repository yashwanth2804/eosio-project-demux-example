import React, { Component } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom'
// import { renderRoutes } from 'react-router-config'
// import Fuse from "fuse.js"

// import fuseConfig from "./fuseConfig";

import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes' // Add routing config

import EOSClient from './Utils/eos-client';
import './assets/styles/core.css' // Add SCSS Styling

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createOpen: false,
      loading: false,
      posts: [],
      draftPost: {
        id: '',
        title: '',
        content: '',
        tag: '',
      }
    };

    const contractAccount = process.env.REACT_APP_EOS_ENV === 'local' ? process.env.REACT_APP_EOS_LOCAL_CONTRACT_ACCOUNT : process.env.REACT_APP_EOS_TEST_CONTRACT_ACCOUNT;
    this.eos = new EOSClient(contractAccount, contractAccount);
  }

  // Load all posts
  componentDidMount() {
    this.eos
      .getTableRows('post')
      .then(data => {
        console.log(data);
        this.setState({ posts: data.rows });
        console.log(this.state.posts);
      })
      .catch(e => {
        console.error(e);
      });
  }

  // Create / Edit Post
  handlePostChange = e => {
    this.setState({
      draftPost: {
        ...this.state.draftPost,
        [e.target.name]: e.target.value
      }
    });
  };

  // Create a new post
  createPost = post => {
    this.setState({ loading: true, posts: [...this.state.posts, post] });

    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'createpost', {
        author: process.env.REACT_APP_EOS_CONTRACT_ACCOUNT,
        ...post
      })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  // Submit Post
  handlePostSubmit = e => {
    console.log('sub');
    e.preventDefault();
    this.createPost({ ...this.state.draftPost, likes: 0, id: Date.now() });
    this.setState({
      draftPost: {
        id: '',
        title: '',
        content: '',
        tag: '',
      }
    });
  };

  // Toggle if create window is open or not
  toggleCreate = () => {
    this.setState({
      createOpen: !this.state.createOpen
    });
  }

  render() {
    return (
      <Router
        {...this.state}
        handlePostChange={this.handlePostChange}
        createPost={this.createPost}
        handlePostSubmit={this.handlePostSubmit}
        toggleCreate={this.toggleCreate}
      >
        {renderRoutes(routes) }
      </Router>
    );
  }
}
export default App;
