import React from "react";
import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button onClick={(post) => handleDelete(post.id)}>Delete</button>
          </>
        )}
        {!post && (
          <>
            <h2>Post not found</h2>
            <p>
              <Link to="/">Visit Homepage</Link>
            </p>
          </>
        )}
      </article>
      <h1>PostPage</h1>
    </main>
  );
};

export default PostPage;
