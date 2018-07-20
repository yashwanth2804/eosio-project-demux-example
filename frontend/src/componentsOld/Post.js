import React from 'react';

const Post = ({ pkey, title, author, content, likes, tag }, index) => (
  <div className='card-item' key={index}>
    <div className="padding-30">
      <p>{pkey}</p>
      <p>Title {title}</p>
      <p>By {author}</p>
      <p>Content {content}</p>
      <p>Likes {likes}</p>
      <p>Tag {tag}</p>
    </div>
  </div>
)
export default Post;
