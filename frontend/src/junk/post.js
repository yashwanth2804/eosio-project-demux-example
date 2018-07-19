import React from 'react';

import Post from './Post';

const Display = ({ toggleUpdatingPost, savePost, posts, deletePost, update, likePost, state }) => (

  posts.map((post, index) => (
      <Post
        toggleUpdatingPost={toggleUpdatingPost}
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


import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const Display = (props) => {
  return (
    <div className="wrapperCard">
      {props.postList.map(({ id, title, body, dateCreated }) => (
        <NavLink to={`/posts/${id}`} key={id}>
        <div className="card">
          <h4>{title}</h4>
          <small>{body}</small><br />
          <small>{moment(dateCreated).fromNow()}</small>
        </div>
        </NavLink>
      ))}
    </div>
  );
}

export default Display;









// Display Index

// import React from 'react';
//
// import Updating from './Updating';
// import { NavLink } from 'react-router-dom';
//
// const Display = ({toggleUpdatingPost, savePost, deletePost, likePost, props, state, post}) => {]  const updating = state.updating;
//
//   if (!updating) return (
//     <div className='card-item'>
//       <div className="padding-30">
//         <NavLink to={`/stories/${props.post.index}`}>Details</NavLink>
//         <h3>{state.post.title}</h3>
//         <h5>By {props.post.author}</h5>
//         <p>Likes {state.post.likes} | Tags {'#' + state.post.tag}</p>
//         <hr />
//         <p>{state.post.content}</p>
//       </div>
//       <div className="padding-30 card-footer text-align-center">
//         <span onClick={deletePost}>Delete | </span>
//         <span onClick={toggleUpdatingPost}>Update | </span>
//         <span onClick={likePost}>Like </span>
//       </div>
//     </div>
//   )
//   return (
//     <div className='card-item'>
//       <Updating savePost={savePost} toggleUpdatingPost={toggleUpdatingPost} post={props.post} />
//     </div>
//   );
// }
// export default Display;


import React from 'react';
import { NavLink } from 'react-router-dom';

const Display = ({ state }) => (
  {state.post.map(({ index, author, title, content, likes }) => (
    <div className='card-item' key={index}>
      <div className="padding-30">
        <NavLink to={`/posts/${index}`}>Details</NavLink>
        <h3>{title}</h3>
        <h5>By {author}</h5>
        <p>Likes {likes} | Tags {'#' + tag}</p>
        <hr />
        <p>{content}</p>
      </div>
    </div>
  ))}
)
export default Display;
//
// <div className="padding-30 card-footer text-align-center">
//   <span onClick={deletePost}>Delete | </span>
//   <span onClick={toggleUpdatingPost}>Update | </span>
//   <span onClick={likePost}>Like </span>
// </div>





//Index display:

import React from 'react';

import Post from './Post';

const Display = ({ toggleUpdatingPost, savePost, posts, deletePost, update, likePost, state }) => (

  posts.map((post, index) => (
      <Post
        toggleUpdatingPost={toggleUpdatingPost}
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


import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const Display = (props) => {
  return (
    <div className="wrapperCard">
      {props.postList.map(({ id, title, body, dateCreated }) => (
        <NavLink to={`/posts/${id}`} key={id}>
        <div className="card">
          <h4>{title}</h4>
          <small>{body}</small><br />
          <small>{moment(dateCreated).fromNow()}</small>
        </div>
        </NavLink>
      ))}
    </div>
  );
}

export default Display;





// index

import React, { Component } from 'react';
import Fuse from "fuse.js"

import EOSClient from '../../Utils/eos-client';
import CreatePost from './CreatePost';
import Display from './Display';
import Logo from '../../assets/img/logo-inverted.svg';

import fuseConfig from "./fuseConfig";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      createOpen: false,
      posts: [],
      updating: false,
      liked: false,
      post: {
        title: '',
        content: '',
        tag: '',
        likes: '',
      },
      postsFiltered: [],
      onEnter: false,
      filters: [],
      returnedAmount: 25,
    };

    const contractAccount = process.env.REACT_APP_EOS_ENV === 'local' ? process.env.REACT_APP_EOS_LOCAL_CONTRACT_ACCOUNT : process.env.REACT_APP_EOS_TEST_CONTRACT_ACCOUNT;
    this.eos = new EOSClient(contractAccount, contractAccount);
  }

  componentDidMount() {
    this.eos
      .getTableRows('post')
      .then(data => {
        console.log(data);
        this.setState({ posts: data.rows });
        this.setState({
          postsFiltered: this.state.posts,
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleKeyPress = (event) => {
    if (event.target.value !== "" ) {
      const enter = () => {
        if(event.key === "Enter"){
          keyUp()
        }
      }
      const keyUp = () => {
        var fuse = new Fuse(this.state.posts, fuseConfig)
        this.setState({
          filters: event.target.value,
          postsFiltered: fuse.search(event.target.value).slice(0,this.state.returnedAmount),
        })
      }
  this.state.onEnter ? enter() : keyUp()
    } else {
      this.setState({
        postsFiltered: this.state.posts,
      })
    }
  }

  toggleCreate = () => {
    this.setState({
      createOpen: !this.state.createOpen
    });
  }

  toggleUpdatingPost = (post, e) => {
    this.setState(prevState => ({
      updating: !prevState.updating
    }));
  };

  createPost = post => {
    this.setState({ loading: true, posts: [...this.state.posts, post] });

    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'createpost', {
        author: process.env.REACT_APP_EOS_CONTRACT_ACCOUNT,
        ...post
      })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  deletePost = (pkey, e) => {
    this.setState(prevState => ({
      posts: prevState.posts.filter((post, index) => post.pkey !== pkey)
    }));

    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'deletepost',
        {
          pkey
        })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  updatePost = (post, e) => {
    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'editpost',
        {
          ...post
        })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  likePost = (pkey, post, e) => {
    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'likepost', {
          pkey
        })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        this.setState(prevState => ({
          liked: !prevState.liked,
          post: Object.assign(prevState.post, {
            likes: prevState.liked ? prevState.post.likes : prevState.post.likes + 1
          })
        }));
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  // likePost = (post, e) => {
  //   this.setState(prevState => ({
  //     liked: !prevState.liked,
  //     post: Object.assign(prevState.post, {
  //       likes: prevState.liked ? prevState.post.likes : prevState.post.likes + 1
  //     })
  //   }));
  //   this.props.likePost(this.props.post.pkey, e);
  // };

  savePost = (post, e) => {
    const updatePost = Object.assign(this.props.post, post);
    this.props.editPost(updatePost, e);
    this.setState(prevState => ({
      updating: !prevState.updating,
      post
    }));
  };

  render() {
    return (
      <div className={"layoutStandard " + (this.state.createOpen ? 'createOpen' : '')}>
        <div
          className="toggleCreate"
          onClick={this.toggleCreate}
        >
          <span></span>
          <span></span>
        </div>
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="Eos.io"/>
          </a>
        </div>
        <div className="search">
          <input
            placeholder="Search"
            onKeyUp={this.handleKeyPress}
          />
        </div>
        <div className="main">
          <CreatePost createPost={this.createPost} />
          <div className="cards">
            <Post
              toggleUpdatingPost={toggleUpdatingPost}
              state={state}
              post={post}
              deletePost={deletePost}
              update={update}
              likePost={likePost}
              key={index}
            />

            <Display
              toggleUpdatingPost={this.toggleUpdatingPost}
              savePost={this.savePost}
              createPost={this.createPost}
              deletePost={this.deletePost}
              updatePost={this.updatePost}
              likePost={this.likePost}
              state={this.state}
              posts={this.state.postsFiltered}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
