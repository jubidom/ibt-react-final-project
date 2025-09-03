import { useState } from "react";
import { useBlog } from "../../context/BlogContext";
import Blog from "../../components/Blog/Blog";
import styles from "./BlogPage.module.css";

const BlogPage = () => {
  const { posts, addPost } = useBlog();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addPost(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <div className={styles.blogPage}>
      <h1 className={styles.heading}>Blog Posts</h1>

      {/* Add Post Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Write your post..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Add Post</button>
      </form>

      {/* Posts */}
      <div className={styles.posts}>
        {posts.map((post) => (
          <Blog key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
