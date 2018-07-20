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




// import React from 'react';
//
// import { object } from 'prop-types';
//
// const Post = ({ context }, index) => (
//   <div className='card-item' key={index}>
//     <div className="padding-30">
//       <p>{context.store.activePost.pkey}</p>
//       <p>Title {context.store.activePost.title}</p>
//       <p>By {context.store.activePost.author}</p>
//       <p>Content {context.store.activePost.content}</p>
//       <p>Likes {context.store.activePost.likes}</p>
//       <p>Tag {context.store.activePost.tag}</p>
//     </div>
//   </div>
// )
//
// Post.contextTypes = {
//   store: object,
// };
//
// export default Post;

// const Post = ({ pkey, title, author, content, likes, tag }, index) => (
//   <div className='card-item' key={index}>
//     <div className="padding-30">
//       <p>{pkey}</p>
//       <p>Title {title}</p>
//       <p>By {author}</p>
//       <p>Content {content}</p>
//       <p>Likes {likes}</p>
//       <p>Tag {tag}</p>
//     </div>
//   </div>
// )
