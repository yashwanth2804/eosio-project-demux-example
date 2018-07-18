import React, { Component } from 'react';

import Display from './Display';

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
    tag: ''
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPost = e => {
    e.preventDefault();
    this.props.createPost({ ...this.state, likes: 0 });
    this.setState({
      title: '',
      content: '',
      tag: ''
    });
  };

  render() {
    return (
      <Display handleOnChange={this.handleOnChange} formSubmit={this.formSubmit} />
    );
  }
}

export default CreatePost;
