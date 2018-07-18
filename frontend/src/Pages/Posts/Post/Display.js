import React from 'react';

import Updating from './Updating';

const Display = ({toggleUpdatingPost, savePost, deletePost, likePost, props, state}) => {
  const updating = state.updating;

  if (!updating) return (
    <div className='card-item'>
      <div className="padding-30">
        <h3>{state.post.title}</h3>
        <h5>By {props.post.author}</h5>
        <p>Likes {state.post.likes} | Tags {'#' + state.post.tag}</p>
        <hr />
        <p>{state.post.content}</p>
      </div>
      <div className="padding-30 card-footer text-align-center">
        <span onClick={deletePost}>Delete | </span>
        <span onClick={toggleUpdatingPost}>Update | </span>
        <span onClick={likePost}>Like </span>
      </div>
    </div>
  )
  return (
    <div className='card-item'>
      <Updating savePost={savePost} toggleUpdatingPost={toggleUpdatingPost} post={props.post} />
    </div>
  );
}
export default Display;
