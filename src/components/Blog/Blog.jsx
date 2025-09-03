import styles from "./Blog.module.css";

const Blog = ({ post }) => {
  return (
    <div className={styles.postCard}>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.body}>{post.body}</p>
    </div>
  );
};

export default Blog;
