import React from 'react';

import CreatePost from '../CreatePost';
import Posts from '../Posts/Posts';
import './assets/styles/core.css';

const Display = ({createPost, deletePost, updatePost, likePost, state}) => (
  <div className="layoutStandard">
    <div className="logo">
      <a href="">
        Eos.io
      </a>
    </div>
    <div className="search">
      <input type="text" placeholder="Search cards" />
    </div>
    <div className="">
      <CreatePost createPost={createPost} />
    </div>
    <div className="main">
      <div className="cards">
        <Posts
          posts={state.posts}
          deletePost={deletePost}
          updatePost={updatePost}
          likePost={likePost}
        />
      </div>
    </div>
  </div>
)
export default Display;
