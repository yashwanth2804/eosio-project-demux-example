import React from 'react';

import Updating from './Updating';

const Display = ({toggleUpdatingPost, savePost, deletePost, likePost, props, state}) => {
  const updating = state.updating;

  if (!updating) return (
    <div className='card-item'>
      <span onClick={deletePost}>Delete | </span>
      <span onClick={toggleUpdatingPost}>Update | </span>
      <span onClick={likePost}>Like </span>
      <hr />
      <h3>{state.post.title}</h3>
      <h5>By {props.post.author}</h5>
      <p>Likes {state.post.likes} | Tags {'#' + state.post.tag}</p>
      <hr />
      <p>{state.post.content}</p>
    </div>
  )
  return (
    <div className='card-item'>
      <Updating savePost={savePost} toggleUpdatingPost={toggleUpdatingPost} post={props.post} />
    </div>
  );
}
export default Display;
