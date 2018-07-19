import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Fuse from "fuse.js"

import fuseConfig from "./fuseConfig";
import EOSClient from './Utils/eos-client';
import routes from './routes' // Add routing config
import './assets/styles/core.css' // Add SCSS Styling

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      posts: [],
      postsFiltered: [],
      filters: [],
      returnedAmount: 25,
      createOpen: false,
    };

    const contractAccount = process.env.REACT_APP_EOS_ENV === 'local' ? process.env.REACT_APP_EOS_LOCAL_CONTRACT_ACCOUNT : process.env.REACT_APP_EOS_TEST_CONTRACT_ACCOUNT;
    this.eos = new EOSClient(contractAccount, contractAccount);
  }

  componentDidMount() {
    this.eos
      .getTableRows('post')
      .then(data => {
        console.log(data);
        this.setState({ posts: data.rows });
        this.setState({
          postsFiltered: this.state.posts,
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleKeyPress = (event) => {
    if (event.target.value !== "" ) {
      const enter = () => {
        if(event.key === "Enter"){
          keyUp()
        }
      }
      const keyUp = () => {
        var fuse = new Fuse(this.state.posts, fuseConfig)
        this.setState({
          filters: event.target.value,
          postsFiltered: fuse.search(event.target.value).slice(0,this.state.returnedAmount),
        })
      }
  this.state.onEnter ? enter() : keyUp()
    } else {
      this.setState({
        postsFiltered: this.state.posts,
      })
    }
  }

  toggleCreate = () => {
    this.setState({
      createOpen: !this.state.createOpen
    });
  }

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

  deletePost = (pkey, e) => {
    this.setState(prevState => ({
      posts: prevState.posts.filter((post, index) => post.pkey !== pkey)
    }));

    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'deletepost',
        {
          pkey
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


  updatePost = (post, e) => {
    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'editpost',
        {
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

  likePost = (pkey, e) => {
    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'likepost', {
          pkey
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

  render() {
    return (
      <Router {...this.state}>
        {renderRoutes(routes)}
      </Router>
    );
  }
}
export default App;
