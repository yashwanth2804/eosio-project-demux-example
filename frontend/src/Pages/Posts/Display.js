import React from 'react';
import { NavLink } from 'react-router-dom';

import Post from './Post';

const Display = ({ posts, deletePost, update, likePost, state }) => (

  posts.map((post, index) => (
    <NavLink to={`/stories/${index}`} key={index}>
      <Post
        state={state}
        post={post}
        deletePost={deletePost}
        update={update}
        likePost={likePost}
      />
    </NavLink>
  ))

)

export default Display;
