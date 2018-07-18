import React from 'react';

import Update from '../Update';

const Display = ({toggleUpdatingPost, savePost, deletePost, likePost, props, state}) => (
  <div className='item'>
    {!state.updating ? (
      <div>
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
    ) : (
      <Update savePost={savePost} post={props.post} />
    )}
  </div>
)
export default Display;
