import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./teacherHome.css";
import myimage from "../../assests/images/welcome.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FilterIcon from "@mui/icons-material/Filter1";
import profile from "../../assests/images/profile.jpg";
import testimage from "../../assests/images/classroomtest.jpg";
import studentService from "../../services/student.service";

function THome() {
    const [postContent, setPostContent] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [comment, setNewComment] = useState({});
    const [category, setCategory] = useState("Education");
    const [posts, setPosts] = useState([]);

 useEffect(() =>{
    //Fetch Posts
    const fetchPosts = async () =>{
    try {
      const fetchPosts = await studentService.getAllPosts();

      const transformedPosts = fetchPosts.map((post) => ({
        id: post._id,
        username: post.userId?.username || "Teacher",
        date: new Date(post.createdAt).toDateString(),
        content: post.content,
        image: post.media[0] || null,
        showCommentBox: false,
        showShareBox: false,
        comment: post.comment || [],
        category: post.category === 1 ? "Education" : "General",
      }));
      setPosts(transformedPosts);
    } catch (error) {
      console.error("Error loading posts:", error.message);
    }
  }
    fetchPosts();
  },[])
  const handleContentChange = (e) => {
    setPostContent(e.currentTarget.innerHTML);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setSelectedImages([...selectedImages, ...imageUrls]);

    const editor = document.getElementById("postEditor");
    imageUrls.forEach((url) => {
      const imgTag = `<img src="${url}" class="img-thumbnail me-2" style="width: 70px; height: 70px;" />`;
      editor.innerHTML += imgTag;
    });

    setPostContent(editor.innerHTML);
  };

  const handlePost = async () => {
    if(!postContent.trim()) return;

    try {
     const formData = new FormData();

     formData.append("content",postContent);
     formData.append("category",category === "Education" ? 1: 2);

     const fileInput = document.getElementById("imageUpload");
     for(let i = 0; i < fileInput.files.length; i++){
        formData.append("media",fileInput.files[i]);
     }

     const response =  await studentService.createPost(formData);
     console.log("Post created", response);
        const newPost = {
          username: "",
          date: new Date().toDateString(),
          content: postContent,
          image: selectedImages[0] || null,
          showCommentBox: false,
          showShareBox: false,
          comment: [],
          category: category,
        };
        setPosts([newPost, ...posts]);
        setPostContent("");
        setSelectedImages([]);
        document.getElementById("postEditor").innerHTML = "";
        fileInput.value = "";
      
    } catch (error) {
      console.error("Error creating post", error.message);
      alert(error.message)
    }

  };

  const handleLike = async(postId) =>{
    try {
      await studentService.likeAndUnlike(postId);
      alert('liked successfully');
    } catch (error) {
      alert(error.message);
    }
  }

const handleComment = async (index) => {
    const commentText = comment[index];
    console.log("Comment text to send:", commentText);
    
    if (!commentText || !commentText.trim()) {
        alert("Comment cannot be empty!!");
        return;
    }

    const postId = posts[index].id;
    try {
        console.log("Sending:", commentText.trim());
        await studentService.addComment(postId, commentText.trim());

        const updatedPosts = [...posts];
        updatedPosts[index].comment.push({
            user: "You",
            text: commentText,
        });
        setPosts(updatedPosts);
        setNewComment({ ...comment, [index]: "" });
    } catch (error) {
        console.error("Error details:", error);
        alert(error.message);
    }
}


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
    setNewComment({ ...comment, [index]: value });
  };

  const handleCommentSubmit = (index) => {
    if (!comment[index]) return;

    const updatedPosts = [...posts];
    updatedPosts[index].comments.push({
      user: "You",
      text: comment[index],
    });
    setPosts(updatedPosts);
    setNewComment({ ...comment, [index]: "" });
  };

  return (
    <div className="container">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-8 leftcontainer p-3 mt-4">
          <h1 className="home">Home</h1>

          {/* Stories */}
          <div className="stories-container d-flex">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="card ms-2 pt-2"
                style={{ width: "7rem", height: "9rem" }}
              >
                <img src={myimage} className="card-img-top" alt="..." />
              </div>
            ))}
          </div>

          {/* Post Editor */}
          <div className="post mt-4">
            <div className="mb-3 ms-3">
              <label htmlFor="postEditor" className="form-label">
                Share something...
              </label>
              <div
                id="postEditor"
                className="form-control"
                contentEditable="true"
                onInput={handleContentChange}
                style={{
                  minHeight: "100px",
                  border: "1px solid #ccc",
                  padding: "8px",
                  width: "95%",
                }}
              ></div>

              <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                <label
                  htmlFor="imageUpload"
                  className="btn btn-outline-secondary btn-sm"
                >
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
                  className="btn btn-sm me-4"
                  style={{ backgroundColor: "#7E0AA1", color: "white" }}
                  onClick={handlePost}
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="mt-2 d-flex justify-content-between align-items-center mb-2">
            <p style={{ color: "#787878" }}>All</p>
            <FilterIcon />
          </div>
          <hr />

          {/* Posts */}
          {posts.map((post, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <img
                    src={profile}
                    className="profilep me-2"
                    alt="profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <p className="pname mb-0">{post.username}</p>
                    <small className="text-muted">{post.date}</small>
                  </div>
                </div>

                <div className="mt-2" dangerouslySetInnerHTML={{ __html: post.content }} />
                {post.image && (
                  <img
                    src={post.image}
                    alt="post"
                    className="img-fluid rounded mt-2"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                )}

                <hr />
                <div className="d-flex justify-content-around text-muted">
                  <button className="btn btn-light btn-sm w-100 me-1">
                    👍 Like
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

                {/* Comment Box */}
                {post.showCommentBox && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="form-control form-control-sm mb-2"
                      value={comment[index] || ""}
                      onChange={(e) => handleCommentChange(index, e.target.value)}
                    />
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleCommentSubmit(index)}
                    >
                      Post Comment
                    </button>
                    <ul className="list-unstyled mt-2">
                      {post.comments.map((c, i) => (
                        <li key={i}>
                          <strong>{c.user}: </strong> {c.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Share Box */}
                {post.showShareBox && (
                  <div className="mt-3 border p-2 bg-light rounded">
                    <p className="mb-1 fw-bold">Share this post</p>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      placeholder="Say something about this..."
                    />
                    <button className="btn btn-success btn-sm">Share Now</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="col-md-4 rightcontainer p-3 bg-light mt-4">
          <div className="input-group input-group-sm mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search input"
            />
          </div>

          <div className="mt-2 d-flex justify-content-between align-items-center mb-2">
            <label>Suggestions</label>
            <label>See all</label>
          </div>

          <div>
            <img src={testimage} className="card-img-top" alt="..." />
          </div>
        </div>
      </div>
    </div>
  );

}

export default THome;
