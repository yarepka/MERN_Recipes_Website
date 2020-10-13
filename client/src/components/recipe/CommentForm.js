import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './CommentForm.css';

const CommentForm = ({ addComment, recipeId }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(recipeId, { text }));
    setText('');
  };

  return (
    userInfo && (
      <form className='add-comment-form' onSubmit={onSubmitHandler}>
        <textarea
          cols='30'
          rows='5'
          placeholder='Add new comment'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className='btn'>send</button>
      </form>
    )
  );
};

export default CommentForm;
