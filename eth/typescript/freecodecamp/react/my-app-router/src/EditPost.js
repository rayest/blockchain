import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import { useNavigate } from "react-router-dom";
import api from "./api/posts";
import { format } from "date-fns";

const EditPost = ({}) => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();

  const [editTitle, setEditTitle] = React.useState("");
  const [editBody, setEditBody] = React.useState("");
  const navigate = useNavigate();

  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate(`/post/${id}`); // Redirect to the post page
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title: </label>
            <input
              type="text"
              id="postTitle"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
              required
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              name=""
              id="postBody"
              required
              value={editBody}
              onChange={(e) => {
                setEditBody(e.target.value);
              }}
            ></textarea>
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
