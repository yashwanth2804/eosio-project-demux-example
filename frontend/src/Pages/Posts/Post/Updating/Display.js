import React from 'react';

const Display = ({ toggleUpdatingPost, handleOnChange, props, state }) => (
  <div>
    <div className="EditPost padding-30">
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
        className="margin-right-15"
      >
        Update
      </button>
      <button
        onClick={toggleUpdatingPost}
        type="submit"
        className="secondary"
      >
        Cancel
      </button>
    </div>
  </div>
)
export default Display;
