import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addComment } from '../../redux/actions/recipe';
import './CommentForm.css';

const CommentForm = ({ addComment, recipeId, auth: { isAuthenticated } }) => {
  console.log('[CommentForm.js]: rendering');

  const [text, setText] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();
    addComment(recipeId, { text });
    setText('');
  }

  return isAuthenticated && (
    <form className="add-comment-form" onSubmit={onSubmitHandler}>
      <textarea
        cols="30"
        rows="5"
        placeholder="Add new comment"
        value={text}
        onChange={e => setText(e.target.value)}
      ></textarea>
      <button className="btn">send</button>
    </form>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm);