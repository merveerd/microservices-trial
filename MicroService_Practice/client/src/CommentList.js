import React from 'react';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let content;

    switch(comment.status){
      case 'approved':
        content = content.comment;
        break;
      case 'pending':
        content = 'waiting for moderation'
        break;
      case 'rejected':
        content = 'your comment is rejected'
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
