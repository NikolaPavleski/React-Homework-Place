import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

const Home = () => {
  const posts = useBlog();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}><strong>{post.title}</strong></Link> — {post.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;