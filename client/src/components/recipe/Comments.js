import React from 'react';

import CommentItem from './CommentItem';

import './Comments.css';

const Comments = ({ comments }) => {
  console.log('[Comments.js]: rendering');
  return (
    <div className="comments">
      {comments.map(comment => {
        return (
          <CommentItem key={comment._id} comment={comment} />
        );
      })}
    </div>
  )
}

export default Comments;