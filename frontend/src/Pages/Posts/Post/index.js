import React, { Component } from 'react';

import Display from './Display';

class Post extends Component {
  state = {
    updating: false,
    liked: false,
    post: {
      title: this.props.post.title,
      content: this.props.post.content,
      tag: this.props.post.tag,
      likes: this.props.post.likes
    }
  };

  toggleUpdatingPost = (post, e) => {
    this.setState(prevState => ({
      updating: !prevState.updating
    }));
  };

  savePost = (post, e) => {
    const updatePost = Object.assign(this.props.post, post);
    this.props.editPost(updatePost, e);
    this.setState(prevState => ({
      updating: !prevState.updating,
      post
    }));
  };

  deletePost = (post, e) => {
    this.props.deletePost(this.props.post.pkey, e);
  };

  likePost = (post, e) => {
    this.setState(prevState => ({
      liked: !prevState.liked,
      post: Object.assign(prevState.post, {
        likes: prevState.liked ? prevState.post.likes : prevState.post.likes + 1
      })
    }));
    this.props.likePost(this.props.post.pkey, e);
  };

  render() {
    return (
      <Display
        toggleUpdatingPost={this.toggleUpdatingPost}
        savePost={this.savePost}
        deletePost={this.deletePost}
        likePost={this.likePost}
        props={this.props}
        state={this.state}
      />
    );
  }
}

export default Post;
