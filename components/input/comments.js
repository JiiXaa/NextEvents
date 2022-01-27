import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  // eventId comes from [eventId].js
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (showComments) {
      // dont need to specify method, GET is default
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          // data comes from api/comments/[eventId].js
          setComments(data.comments);
          setIsLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const getAllComments = () => {
    fetch('/api/comments/' + eventId)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      });
  };

  function addCommentHandler(commentData) {
    // send data to API
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // This updates comments right after adding one. Delay just for better visual effect
        setTimeout(() => {
          getAllComments();
        }, 100);
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} isLoading={isLoading} />}
    </section>
  );
}

export default Comments;
