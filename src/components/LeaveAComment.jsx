import React, { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const LeaveAComment = ({ blogId, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "", website: "" });
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_info"));
    if (storedUser) {
      setUserData(storedUser);
    }
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${apiUrl}/blog/comment/${blogId}`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!userData.name.trim()) tempErrors.name = "Name is required";
    if (!userData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userData.email)) tempErrors.email = "Invalid email format";
    if (!userData.website.trim()) tempErrors.website = "Website is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (parentId = null) => {
    if (!validateForm()) return;
    
    if (checked) {
      localStorage.setItem("user_info", JSON.stringify(userData));
    }
    
    try {
      const res = await fetch(`${apiUrl}/blog/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          content: newComment,
          name: userData.name,
          email: userData.email,
          website: userData.website,
          parentCommentId: parentId,
        }),
      });

      if (res.ok) {
        setNewComment("");
        setErrors({});
        fetchComments();
        setSuccess(true)
        setTimeout(()=>{
          setSuccess(false)
        },4000)
      }
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <section className="leave-a-comment">
      <div className="container w-1240">
        <div className="leave-a-comment-title">
          <h3>Leave A Comment</h3>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="leave-a-comment-input">
              <input type="text" name="name" placeholder="Name *" value={userData.name} onChange={handleInputChange} />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="leave-a-comment-input">
              <input type="email" name="email" placeholder="Email *" value={userData.email} onChange={handleInputChange} />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="leave-a-comment-input">
              <input type="text" name="website" value={userData.website} onChange={handleInputChange} placeholder="Website" />
              {errors.website && <p className="error-message">{errors.website}</p>}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="leave-a-comment-textarea">
              <textarea placeholder="Message" value={newComment} onChange={(e) => setNewComment(e.target.value)} rows="4"></textarea>
              
            </div>
          </div>
          <div className="col-lg-12">
            <div className="leave-a-comment-checkbox">
              <input type="checkbox" id="saveInfo" onChange={(e) => setChecked(e.target.checked)} />
              <label htmlFor="saveInfo">Save my name and email in this browser for the next time I comment.</label>
            </div>
          </div>
          <div className="col-lg-12">
             {
              success && <span className="success-message">Sent Successfully</span>
             }
          </div>
          <div className="col-lg-12">
            <div className="leave-a-comment-btn">
              <button onClick={() => handleSubmit()}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaveAComment;
