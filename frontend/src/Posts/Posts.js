import React from 'react';

import Post from './Post/Post';

const Posts = ({ posts, deletePost, update, likePost }) => {
  return posts.map((post, index) => {
    return (
      <Post
        post={post}
        deletePost={deletePost}
        update={update}
        likePost={likePost}
        key={index}
      />
    );
  });
};

export default Posts;
