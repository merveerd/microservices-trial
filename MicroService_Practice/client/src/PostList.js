import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState({}); // in our server side posts variable is an object so the initial value should be an object (given in useState)

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts'); //query servisinden hazir datayi cekiyor

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []); //empty array means that only run this function one time.

  const renderedPosts = Object.values(posts).map(post => {  //object.values returns an array all the values inside of the posts
    return ( // postId props olarak gonderildi.
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} /> 
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
