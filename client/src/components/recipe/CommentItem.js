import React from 'react';
import Moment from 'react-moment';

import './CommentItem.css';

const CommentItem = ({ comment }) => {
  console.log('[CommentItem.js]: rendering');

  return (
    <div className="comment">
      <div className="comment-top">
        <div className="comment-author">
          <div className="comment-author-image"
            style={{
              backgroundImage: `url(/uploads/${comment.imagePath})`
            }}>
          </div>

          <div className="name-and-date">
            <span className="comment-author-name">
              {comment.name}
            </span>

            <span className="comment-date">
              <Moment format="DD/MM/YYYY">
                {comment.date}
              </Moment>
            </span>
          </div>

        </div>
      </div>
      <div className="comment-content">
        <p>{comment.text}</p>
      </div>
    </div>
  );
}

export default CommentItem;