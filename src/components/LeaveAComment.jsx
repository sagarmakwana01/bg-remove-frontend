// LeaveAComment.jsx
import React from 'react';

const LeaveAComment = () => {
  return (
    <section className="leave-a-comment">
      <div className="container w-1240">
        <div className="leave-a-comment-title">
          <h3>Leave A Comment</h3>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="leave-a-comment-input">
              <input type="text" placeholder="Name *" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="leave-a-comment-input">
              <input type="email" placeholder="Email *" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="leave-a-comment-input">
              <input type="text" placeholder="Website *" />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="leave-a-comment-textarea">
              <textarea placeholder="Message" rows="4"></textarea>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="leave-a-comment-checkbox">
              <input type="checkbox" id="saveInfo" />
              <label htmlFor="saveInfo">
                Save my name and email in this browser for the next time I comment.
              </label>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="leave-a-comment-btn">
              <a href="#">Send</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaveAComment;
