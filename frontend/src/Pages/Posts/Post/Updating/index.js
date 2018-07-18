import React, { Component } from 'react';

import Display from './Display';

class Updating extends Component {
  state = {
    post: {
      title: this.props.post.title,
      content: this.props.post.content,
      tag: this.props.post.tag
    }
  };

  handleOnChange = e => {
    let post = Object.assign({}, this.state.post);
    post[e.target.name] = e.target.value;
    this.setState({ post });
  };

  render(toggleUpdatingPost) {
    return (
      <Display toggleUpdatingPost={this.props.toggleUpdatingPost} handleOnChange={this.handleOnChange} props={this.props} state={this.state} />
    );
  }
}

export default Updating;
