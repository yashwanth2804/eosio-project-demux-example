import React from 'react';

import Post from './Post';

const Display = ({ posts, deletePost, update, likePost, state }) => (

  posts.map((post, index) => (
    <Post
      state={state}
      post={post}
      deletePost={deletePost}
      update={update}
      likePost={likePost}
      key={index}
    />
  ))
  
)

export default Display;
