const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // is been used as function to prevent error on reuquest sending to different domains

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || []; //is it more effective to define this variable every time or global defining

  comments.push({ id: commentId, content, status : 'pending'});

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', { // event bus
    type: 'CommentCreated', 
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status : 'pending',
    }
  });

  res.status(201).send(comments);
});

app.post('/events', async(req, res) => { //comes from event bus 4005
  console.log('Event Received:', req.body.type);

  if(type === 'CommentModerated'){

    const {id, postId, status, comment} = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status // ilgili commentin statusunu event bustan guncellenip gelmis datadaki statusle guncelledik. Update olunca CommentUpdated eventini event bus a gonderiyoruz.

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        content,
        status
      }
    })
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
