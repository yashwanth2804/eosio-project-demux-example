import React from 'react';
import { func } from 'prop-types';

const Create = (context) => (
  <div className="createContainer padding-30 border-bottom">
    <div className="card-item padding-30">
      <input
        className="margin-bottom-15"
        name="title"
        onChange={context.handlePostChange}
        placeholder="Title"
      />
      <textarea
        className="margin-bottom-15"
        name="content"
        onChange={context.handlePostChange}
        rows={4}
        placeholder="Content"
      />
      <input
        className="margin-bottom-15"
        name="tag"
        onChange={context.handlePostChange}
        placeholder="Tag"
      />
      <button
        onClick={context.handlePostSubmit}
        type="submit"
        className="login-form-button"
      >
        Create Post
      </button>
    </div>
  </div>
)

Create.contextTypes = {
  handlePostChange: func,
  handlePostSubmit: func,
};

export default Create;
