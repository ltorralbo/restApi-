const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '',
  database: 'postsapi',
});

const getPosts = async (req, res) => {
  const response = await pool.query('SELECT * FROM posts');
  res.status(200).json(response.rows);
};

const createPost = async (req, res) => {
  const { name, description } = req.body;
  const response = await pool.query(
    'INSERT INTO posts (name, description) VALUES ($1, $2)',
    [name, description]
  );
  const posts = await pool.query('SELECT * FROM posts ORDER BY id desc');
  console.log(posts.rows[0]);

  res.json({
    message: 'Post created succesfully',
    body: {
      post: { name, description },
    },
  });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

  const response = await pool.query('DELETE FROM posts WHERE id = $1', [id]);

  res.json({
    message: `Post ${id} deleted succesfully`,
    body: {
      post: post.rows,
    },
  });
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
};
