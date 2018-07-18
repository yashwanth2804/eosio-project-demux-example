import React, { Component } from 'react';

import Display from './Display';

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: this.props.post.title,
        content: this.props.post.content,
        tag: this.props.post.tag
      }
    };
  }

  handleOnChange = e => {
    let post = Object.assign({}, this.state.post);
    post[e.target.name] = e.target.value;
    this.setState({ post });
  };

  render() {
    return (
      <Display handleOnChange={this.handleOnChange} props={this.props} state={this.state} />
    );
  }
}

export default Update;
