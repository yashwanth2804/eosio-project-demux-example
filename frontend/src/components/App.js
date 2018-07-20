import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { object, shape, func } from 'prop-types';

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
      temporaryPost: {
        id: '',
        title: '',
        content: '',
        tag: '',
      },
      activePost: {
        pkey: '',
        title: '',
        author: '',
        content: '',
        likes: '',
        tag: '',
      },
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
      temporaryPost: {
        ...this.state.temporaryPost,
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
    this.createPost({ ...this.state.temporaryPost, likes: 0, id: Date.now() });
    this.setState({
      temporaryPost: {
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



  // Create / Edit Post
  handlePostRouting = (pkey, title, author, content, likes, tag) => {
    console.log(pkey, title, author, content, likes, tag);
    this.setState({
      activePost: {
        pkey: pkey,
        title: title,
        author: author,
        content: content,
        likes: likes,
        tag: tag,
      }
    });
    // this.setState({
    //   temporaryPost: {
    //     ...this.state.temporaryPost,
    //     [e.target.name]: e.target.value
    //   }
    // });
  };

  // Set Child Context So We Don't Have To Pass State As Props
  getChildContext() {
    return {
      store: this.state,
      handlePostChange: this.handlePostChange,
      createPost: this.createPost,
      handlePostSubmit: this.handlePostSubmit,
      toggleCreate: this.toggleCreate,
      handlePostRouting: this.handlePostRouting,
    }
  }

  render() {
    return (
      <Router>
        {renderRoutes(routes)}
      </Router>
    );
  }
}

// Initializing Child Context So We Don't Have To Pass State As Props
App.childContextTypes = {
  store: object,
  location: shape({}),
  handlePostChange: func,
  createPost: func,
  handlePostSubmit: func,
  toggleCreate: func,
  handlePostRouting: func,
}

export default App;
