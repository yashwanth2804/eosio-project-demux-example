import React from 'react';

const Display = ({ toggleUpdatingPost, handleOnChange, props, state }) => (
  <div>
    <form className="EditPost">
      <input
        className="margin-bottom-15"
        name="title"
        onChange={handleOnChange}
        value={state.post.title}
        placeholder="Title"
      />
      <textarea
        className="margin-bottom-15"
        name="content"
        onChange={handleOnChange}
        value={state.post.content}
        rows={4}
        placeholder="Content"
      />
      <input
        className="margin-bottom-15"
        name="tag"
        onChange={handleOnChange}
        value={state.post.tag}
        placeholder="Tag"
      />
      <button
        onClick={e => {
          props.savePost(state.post, e);
        }}
        type="submit"
        className="login-form-button"
      >
        Update
      </button>
      <button
        onClick={toggleUpdatingPost}
        type="submit"
        className="login-form-button"
      >
        Cancel
      </button>
    </form>
  </div>
)
export default Display;
