import React from 'react';

const Display = ({handleOnChange, props, state}) => (
  <form className="EditPost">
    <input
      name="title"
      onChange={handleOnChange}
      value={state.post.title}
      placeholder="Title"
    />
    <textarea
      name="content"
      onChange={handleOnChange}
      value={state.post.content}
      rows={4}
      placeholder="Content"
    />
    <input
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
  </form>
)
export default Display;
