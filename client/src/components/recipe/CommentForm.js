import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../../redux/actions/recipeActions';

import './CommentForm.css';

const CommentForm = ({ recipeId }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(recipeId, { text }));
    setText('');
  };

  return (
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
  );
};

export default CommentForm;
