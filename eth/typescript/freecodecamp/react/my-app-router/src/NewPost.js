import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/posts";

import { useNavigate } from "react-router-dom";

const NewPost = ({}) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      setPosts([...posts, response.data]);
      setPostTitle("");
      setPostBody("");
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title: </label>
        <input
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
          required
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          name=""
          id="postBody"
          required
          value={postBody}
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
