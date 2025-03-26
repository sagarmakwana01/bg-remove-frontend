import React, { useEffect, useState } from "react";
import "./temp.css";
const apiUrl = import.meta.env.VITE_API_URL;
import LeaveAComment from "./LeaveAComment";
import { Link } from "react-router-dom";
const Childcomment = ({ 
   comment,
   setReplyingTo, 
   replyingTo, 
   newComment, 
   setNewComment, 
   handleSubmit,
   userData, 
   handleInputChange,
   errors,
   setSaveInfo,
  }) => {
    return (
      <>
      <div key={comment.id}  className="blog-details-comments-items">
          <div className="blog-details-comments-items-img">
                  <img src="/img/comment-img.png" alt="comment-img" />
          </div>
        <div className="blog-details-comments-content left-side">
          <div className="blog-details-comments-content-top">
                    <div className="blog-details-comments-content-top-title">
                      <h5><Link to="/">{comment.name}</Link></h5>
                      <p>{new Date(comment.created_at).toDateString()}</p>
                    </div>
                    <div onClick={() => setReplyingTo(comment.id)} className="blog-details-comments-content-top-right">
                      <img src="/img/comment-icon.png" alt="comment" />
                      <span>Reply</span>
                    </div>
            </div>
       
        <p dangerouslySetInnerHTML={{__html:comment.message}}></p>
  
        {/* Reply Form */}
        {replyingTo === comment.id && (
         <section className="leave-a-comment">
         <div className="container w-1240">
           <div className="leave-a-comment-title">
             <h3>Leave A Comment</h3>
           </div>
           <div className="row">
             <div className="col-lg-4">
               <div className="leave-a-comment-input">
                 <input type="text" name="name" placeholder="Name *" value={userData?.name} onChange={handleInputChange} />
                 {errors.name && <span className="error-message">{errors.name}</span>}
               </div>
             </div>
             <div className="col-lg-4">
               <div className="leave-a-comment-input">
                 <input type="email" name="email" placeholder="Email *" value={userData?.email} onChange={handleInputChange} />
                 {errors.email && <span className="error-message">{errors.email}</span>}
               </div>
             </div>
             <div className="col-lg-4">
               <div className="leave-a-comment-input">
                 <input type="text" name="website" value={userData?.website} onChange={handleInputChange} placeholder="Website *" />
                 {errors.website && <span className="error-message">{errors.website}</span>}
               </div>
             </div>
             <div className="col-lg-12">
               <div className="leave-a-comment-textarea">
                 <textarea placeholder="Message" value={newComment} onChange={(e) => setNewComment(e.target.value)} rows="4"></textarea>
               </div>
             </div>
             <div className="col-lg-12">
               <div className="leave-a-comment-checkbox">
                 <input type="checkbox" id="saveInfo" onChange={(e) => setSaveInfo(e.target.checked)} />
                 <label htmlFor="saveInfo">
                   Save my name and email in this browser for the next time I comment.
                 </label>
               </div>
             </div>
          
             <div className="col-lg-12">
               <div className="leave-a-comment-btn">
               <button onClick={() => handleSubmit(comment.id, comment.name)}>Send</button>
               </div>
             </div>
           </div>
         </div>
       </section>
        
        )}
  
        {/* Recursively Render Nested Replies */}
        
        </div>
      </div>
        {comment?.replies?.map((reply) => (
          <Childcomment
            key={reply.id}
            comment={reply}
            setReplyingTo={setReplyingTo}
            replyingTo={replyingTo}
            newComment={newComment}
            setNewComment={setNewComment}
            handleSubmit={handleSubmit}
            userData = {userData}
            handleInputChange={handleInputChange}
            errors={errors}
            setSaveInfo={setSaveInfo}

          />
        ))}
        </>
    );
  };
  
const Commentsection = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [userData, setUserData] = useState({ name: "", email: "", website: "",  });
    const [errors, setErrors] = useState({});
    const [saveInfo, setSaveInfo] = useState(false);

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
    const handleInputChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (parentId = null, parentUser = "") => {
      if (!validateForm()) return;

      if (saveInfo) {
        localStorage.setItem("user_info", JSON.stringify(userData));
      }
  
  
      try {
        const res = await fetch(`${apiUrl}/blog/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blogId,
            content: parentUser ? `@<strong>${parentUser}</strong>: ${newComment}` : newComment,
            name: userData.name,
            email: userData.email,
            website: userData.website,
            parentCommentId: parentId,
          }),
        });
  
        if (res.ok) {
          setNewComment("");
          setReplyingTo(null);
          fetchComments();
        }
      } catch (error) {
        console.error("Failed to submit comment", error);
      }
    };
  
    return (

        <>
        <section className="blog-details-comments">
        <div className="container w-1240">
          {comments.length > 0 ? (
            comments
              .filter((comment) => !comment.parentCommentId)
              .map((comment) => (
              <div key={comment.id}  className="blog-details-comments-items">
                <div className="blog-details-comments-items-img">
                  <img src="/img/comment-img.png" alt="comment-img" />
                </div>
                <div className="blog-details-comments-content">
                  <div className="blog-details-comments-content-top">
                    <div className="blog-details-comments-content-top-title">
                      <h5><Link to="#">{comment.name}</Link></h5>
                      <p>{new Date(comment.created_at).toDateString()}</p>
                    </div>
                    <div onClick={() => setReplyingTo(comment.id)} className="blog-details-comments-content-top-right">
                      <img src="/img/comment-icon.png" alt="comment" />
                      <span>Reply</span>
                    </div>
                  </div>
                  <p dangerouslySetInnerHTML={{__html:comment.message}}></p>
                    {replyingTo === comment.id && (
                   <section className="leave-a-comment">
                   <div className="container w-1240">
                     <div className="leave-a-comment-title">
                       <h3>Leave A Comment</h3>
                     </div>
                     <div className="row">
                       <div className="col-lg-4">
                         <div className="leave-a-comment-input">
                           <input type="text" name="name" placeholder="Name *" value={userData.name} onChange={handleInputChange} />
                           {errors.name && <span className="error-message">{errors.name}</span>}
                         </div>
                       </div>
                       <div className="col-lg-4">
                         <div className="leave-a-comment-input">
                           <input type="email" name="email" placeholder="Email *" value={userData.email} onChange={handleInputChange} />
                           {errors.email && <span className="error-message">{errors.email}</span>}
                         </div>
                       </div>
                       <div className="col-lg-4">
                         <div className="leave-a-comment-input">
                           <input type="text" name="website" value={userData.website} onChange={handleInputChange} placeholder="Website *" />
                           {errors.website && <span className="error-message">{errors.website}</span>}
                         </div>
                       </div>
                       <div className="col-lg-12">
                         <div className="leave-a-comment-textarea">
                           <textarea placeholder="Message" value={newComment} onChange={(e) => setNewComment(e.target.value)} rows="4"></textarea>
                         </div>
                       </div>
                       <div className="col-lg-12">
                         <div className="leave-a-comment-checkbox">
                           <input type="checkbox" id="saveInfo" onChange={(e) => setSaveInfo(e.target.checked)} />
                           <label htmlFor="saveInfo">
                             Save my name and email in this browser for the next time I comment.
                           </label>
                         </div>
                       </div>
              
                       <div className="col-lg-12">
                         <div className="leave-a-comment-btn">
                         <button onClick={() => handleSubmit(comment.id, comment.name)}>Send</button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </section>
                  )}
                    {
                  comment.replies.map((reply)=>{
                    return    <Childcomment
                    key={reply.id}
                    comment={reply}
                    setReplyingTo={setReplyingTo}
                    replyingTo={replyingTo}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleSubmit={handleSubmit}
                    userData = {userData}
                    handleInputChange={handleInputChange}
                    errors={errors}
                    setSaveInfo={setSaveInfo}
         
                  />
                  })
                }
                </div>
              </div>
              ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
          </div>
        </section>
        <LeaveAComment blogId={blogId} setComments={setComments} />
        </>

    );
  };
  
  export default Commentsection;
  