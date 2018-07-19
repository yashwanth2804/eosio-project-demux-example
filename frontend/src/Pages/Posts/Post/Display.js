import React from 'react';
import { NavLink } from 'react-router-dom';

import Updating from './Updating';
import user from './assets/img/user.svg';
import heart from './assets/img/heart.svg';
//import calendar from './assets/img/calendar.svg';
import pencil from './assets/img/pencil.svg';
import trash from './assets/img/trash.svg';

const Display = ({toggleUpdatingPost, savePost, deletePost, likePost, props, state}) => {
  const updating = state.updating;

  if (!updating) return (
    <div className='card-item'>
      <div className="padding-30">
        <NavLink to={`/posts/${state.post.index}`} key={state.post.index}>Details</NavLink>
        <h3>{state.post.title}</h3>
        <h5><img src={user} alt="User"/> {props.post.author}</h5>
        <p>Likes {state.post.likes} | Tags {'#' + state.post.tag}</p>
        <hr />
        <p>{state.post.content}</p>
      </div>
      <div className="padding-30 card-footer">
        <div onClick={deletePost}><img className="float-left margin-right-15" src={trash} alt="Delete"/></div>
        <div onClick={toggleUpdatingPost}><img className="float-left margin-right-15" src={pencil} alt="Update"/></div>
        <div onClick={likePost}><img className="float-left" src={heart} alt="Heart"/></div>
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
