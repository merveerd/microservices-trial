const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => { //client postliste data gonderiyor
  res.send(posts);
});

app.post('/events', (req, res) => { // event bustan post request aliyor
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  };
  if(type === 'CommentUpdated'){
    const { id, content, postId, status } = data;

    const post = posts[postId];

    const comment = post.find(comment => {
      return comment.id === id;
});
comment.status = status;
comment.content = content; //in case of any change in content as we gonna use this for other type(commentblabla) of requests
}
  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
