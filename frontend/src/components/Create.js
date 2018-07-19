import React from 'react';

const Create = ({ handlePostChange, handlePostSubmit }) => (
  <div className="createContainer padding-30 border-bottom">
    <div className="card-item padding-30">
      <input
        className="margin-bottom-15"
        name="title"
        onChange={handlePostChange}
        placeholder="Title"
      />
      <textarea
        className="margin-bottom-15"
        name="content"
        onChange={handlePostChange}
        rows={4}
        placeholder="Content"
      />
      <input
        className="margin-bottom-15"
        name="tag"
        onChange={handlePostChange}
        placeholder="Tag"
      />
      <button
        onClick={handlePostSubmit}
        type="submit"
        className="login-form-button"
      >
        Create Post
      </button>
    </div>
  </div>
)
export default Create;
