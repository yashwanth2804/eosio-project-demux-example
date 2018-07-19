import React, { Component } from 'react';
import { shape } from 'prop-types';

import EOSClient from '../../Utils/eos-client';
import Logo from '../../assets/img/logo-inverted.svg';

class Posts extends Component {
  state = {
    posts: [],
    post: [],
  };

  componentDidMount() {
    const contractAccount = process.env.REACT_APP_EOS_ENV === 'local' ? process.env.REACT_APP_EOS_LOCAL_CONTRACT_ACCOUNT : process.env.REACT_APP_EOS_TEST_CONTRACT_ACCOUNT;
    this.eos = new EOSClient(contractAccount, contractAccount);

    const { location } = this.props
    const splitOnject = location.pathname.lastIndexOf('/');
    const pageId = location.pathname.substring(splitOnject + 1);
    console.log(location.pathname);

    this.eos
      .getTableRows('post')
      .then(data => {
        console.log(data);
        this.setState({ posts: data.rows });
        this.setState({ post: this.state.posts.filter((post, index) => post.pkey !== this.pageId) });

      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    return (
      <div className="layoutStandard">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="Eos.io"/>
          </a>
        </div>
        <div className="search">
          <a href="/">Back</a>
        </div>
        <div className="main">
          <div className="cards">
            <div className="card-item">
              <p>Test</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  location: shape({}),
};

export default Posts;
