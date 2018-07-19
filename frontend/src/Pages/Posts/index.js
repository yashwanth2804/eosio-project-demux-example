import React, { Component } from 'react';

import CreatePost from './CreatePost';
import Display from './Display';
import Logo from '../../assets/img/logo-inverted.svg';

class Posts extends Component {

  render() {
    return (
      <div className={"layoutStandard " + (this.state.createOpen ? 'createOpen' : '')}>
        <div
          className="toggleCreate"
          onClick={this.toggleCreate}
        >
          <span></span>
          <span></span>
        </div>
        <div>
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="Eos.io"/>
          </a>
        </div>
        <div className="search">
          <input
            placeholder="Search"
            onKeyUp={this.handleKeyPress}
          />
        </div>
        </div>
        <div className="main">
          <CreatePost createPost={this.createPost} />
          <div className="cards">
            <Display
              createPost={this.createPost}
              deletePost={this.deletePost}
              updatePost={this.updatePost}
              likePost={this.likePost}
              state={this.state}
              posts={this.state.postsFiltered}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
