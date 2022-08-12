import { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Post from './Post';

import './Posts.scss';
import Search from '../UI/Search';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get(
      'https://rustam-social-media-rails-app.herokuapp.com/api/v1/posts',
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      }
    ).then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);

  return (
    <div className='posts'>
      <Search />
      <h1>Posts</h1>
      <div className='posts-list'>
        {posts &&
          posts.map((post, i) => {
            return (
              <Post
                key={post.id}
                url={post.image.url}
                content={post.content}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
