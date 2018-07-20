import React from 'react';
import { object } from 'prop-types';

const Posts = (props, context) => {
  console.log("Posts props:");
  console.log(props);
  console.log("Posts context:");
  console.log(context.store);
  return (
  <div className="cards">
    {context.store.posts.map(({ pkey, title, author, content, likes, tag }, index) => (
      <div className='card-item' key={index}>
        <div className="padding-30">
          <p>Title {title}</p>
          <p>By {author}</p>
          <p>Content {content}</p>
          <p>Likes {likes}</p>
          <p>Tag {tag}</p>
        </div>
      </div>
    ))}
  </div>
)}

Posts.contextTypes = {
  store: object
};

export default Posts;
