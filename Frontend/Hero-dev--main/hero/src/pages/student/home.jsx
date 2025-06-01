// Home.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import myimage from "../../assests/images/welcome.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FilterIcon from "@mui/icons-material/Filter1";
import profile from "../../assests/images/profile.jpg";
import studentService from "../../services/student.service";

function Home() {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [commentsInput, setCommentsInput] = useState({});
  const [category, setCategory] = useState("Education");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchPosts = await studentService.getAllPosts();
        const transformedPosts = fetchPosts.map((post) => ({
          id: post._id,
          username: post.userId?.username || "Unknown",
          date: new Date(post.createdAt).toDateString(),
          content: post.content,
          image: post.media[0] || null,
          showCommentBox: false,
          showShareBox: false,
          comments: post.comments || [],
          category: post.category === 1 ? "Education" : "General",
          likes: post.likes?.length || 0, // Add this
          liked: post.likes?.some((like) => like.userId === "CURRENT_USER_ID"),
        }));
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error loading posts:", error.message);
      }
    };
    fetchPosts();
  }, []);

  const handleContentChange = (e) => {
    setPostContent(e.currentTarget.innerHTML);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages([...selectedImages, ...imageUrls]);

    const editor = document.getElementById("postEditor");
    imageUrls.forEach((url) => {
      const imgTag = `<img src="${url}" class="img-thumbnail me-2 mb-2" style="width: 70px; height: 70px; object-fit: cover;" />`;
      editor.innerHTML += imgTag;
    });

    setPostContent(editor.innerHTML);
  };

  const handlePost = async () => {
    if (!postContent.trim()) return;

    try {
      const formData = new FormData();
      formData.append("content", postContent);
      formData.append("category", category === "Education" ? 1 : 2);

      const fileInput = document.getElementById("imageUpload");
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append("media", fileInput.files[i]);
      }

      const response = await studentService.createPost(formData);
      console.log("Post created", response);

      const newPost = {
        id: response._id,
        username: "", // Ideally get current user
        date: new Date().toDateString(),
        content: postContent,
        image: selectedImages[0] || null,
        showCommentBox: false,
        showShareBox: false,
        comments: [],
        category,
      };

      setPosts([newPost, ...posts]);
      setPostContent("");
      setSelectedImages([]);
      document.getElementById("postEditor").innerHTML = "";
      fileInput.value = "";
    } catch (error) {
      console.error("Error creating post", error.message);
      alert(error.message);
    }
  };

const handleLike = async (postId) => {
  try {
    await studentService.likeAndUnlike(postId);

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const isLiked = post.liked;
        return {
          ...post,
          liked: !isLiked,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  } catch (error) {
    alert(error.message);
  }
};


  const handleComment = async (index) => {
    const commentText = commentsInput[index];
    if (!commentText || !commentText.trim()) {
      alert("Comment cannot be empty!!");
      return;
    }

    const postId = posts[index].id;
    try {
      await studentService.addComment(postId, commentText.trim());

      const updatedPosts = [...posts];
      updatedPosts[index].comments.push({
        user: "You",
        text: commentText,
      });
      setPosts(updatedPosts);
      setCommentsInput({ ...commentsInput, [index]: "" });
    } catch (error) {
      console.error("Error details:", error);
      alert(error.message);
    }
  };

  const toggleCommentBox = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].showCommentBox = !updatedPosts[index].showCommentBox;
    setPosts(updatedPosts);
  };

  const toggleShareBox = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].showShareBox = !updatedPosts[index].showShareBox;
    setPosts(updatedPosts);
  };

  const handleCommentChange = (index, value) => {
    setCommentsInput({ ...commentsInput, [index]: value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 leftcontainer p-3 mt-4">
          <h1 className="home">Home</h1>

          <div className="stories-container d-flex">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card ms-2 pt-2" style={{ width: "7rem", height: "9rem" }}>
                <img src={myimage} className="card-img-top" alt="story" />
              </div>
            ))}
          </div>

          <div className="card p-4 shadow-sm mt-4">
            <label htmlFor="postEditor" className="form-label fw-semibold">Share something...</label>
            <div
              id="postEditor"
              className="form-control mb-2"
              contentEditable="true"
              onInput={handleContentChange}
              style={{ minHeight: "100px" }}
            ></div>

            <div className="mt-2">
              <label className="form-label fw-semibold me-2">Category:</label>
              <div className="d-flex gap-2 flex-wrap category-btns">
                <button
                  type="button"
                  className={`btn ${category === "Education" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setCategory("Education")}
                >
                  🎓 Education
                </button>
                <button
                  type="button"
                  className={`btn ${category === "Non-Education" ? "btn-success" : "btn-outline-success"}`}
                  onClick={() => setCategory("Non-Education")}
                >
                  🧹 Non-Education
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <label htmlFor="imageUpload" className="btn btn-outline-secondary btn-sm upload-btn">
                <AddAPhotoIcon />
              </label>
              <input
                type="file"
                id="imageUpload"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn btn-sm"
                style={{ backgroundColor: "#7E0AA1", color: "white" }}
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-between align-items-center mb-2">
            <p style={{ color: "#787878" }}>All</p>
            <FilterIcon />
          </div>
          <hr />

          {posts.map((post, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <img
                    src={profile}
                    className="me-2"
                    alt="profile"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  />
                  <div>
                    <p className="pname mb-0 fw-bold">{post.username}</p>
                    <small className="text-muted">{post.date}</small>
                  </div>
                </div>

                <span className={`badge ${post.category === "Education" ? "bg-primary" : "bg-success"} mt-2`}>
                  {post.category}
                </span>

                <div className="mt-2" dangerouslySetInnerHTML={{ __html: post.content }} />
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="img-fluid rounded mt-2"
                    style={{ maxHeight: "300px" }}
                  />
                )}

                       <div className="d-flex justify-content-around text-muted">
                  <button className="btn btn-light btn-sm w-100 me-1"  onClick={() => handleLike(post.id)}>
                    👍 Like ({post.likes} {post.likes === 1 ? 'like' : 'likes'})
                  </button>
                  
                  <button
                    className="btn btn-light btn-sm w-100 me-1"
                    onClick={() => toggleCommentBox(index)}
                  >
                    💬 Comment
                  </button>
                  <button
                    className="btn btn-light btn-sm w-100"
                    onClick={() => toggleShareBox(index)}
                  >
                    ↗️ Share
                  </button>
                </div>

                {post.showCommentBox && (
                  <div className="mt-2">
                    <input
                      type="text"
                      className="form-control mb-1"
                      placeholder="Write a comment..."
                      value={commentsInput[index] || ""}
                      onChange={(e) => handleCommentChange(index, e.target.value)}
                    />
                    <button className="btn btn-sm btn-success" onClick={() => handleComment(index)}>Post Comment</button>
                  </div>
                )}

                {post.comments && post.comments.length > 0 && (
                  <div className="mt-2">
                    <p className="fw-bold">Comments:</p>
                    {post.comments.map((c, idx) => (
                      <div key={idx} className="border-bottom pb-1 mb-1">
                        <strong>{c.user}</strong>: {c.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
