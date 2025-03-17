// BlogDetails.jsx
import React from 'react';

const BlogContent = () => {
  return (
    <section className="blog-details">
      <div className="container w-1240">
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-details-left">
              <div className="blog-details-top">
                <span>Graphic Design</span>
                <h1>What Colors Go Best With Green?</h1>
                <ul>
                  <li>
                    <img src="img/user.png" alt="user" />
                    <span className="active">Admin</span>
                  </li>
                  <li>
                    <img src="img/calender.png" alt="calendar" />
                    <span>May 6, 2024</span>
                  </li>
                  <li>
                    <img src="img/comment.png" alt="comment" />
                    <span>No comment</span>
                  </li>
                </ul>
              </div>
              <div className="blog-details-bottom">
                <div className="blog-details-bottom-img">
                  <img src="img/blog3-1 1.png" alt="blog" />
                </div>
                <div className="blog-details-bottom-text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ultricies metus.
                    Donec ac ex porta libero venenatis sodales. Sed efficitur eget risus sed molestie. Nulla
                    blandit bibendum metus ut sagittis. Etiam quis semper justo. Sed tristique facilisis felis
                    ut tincidunt. Phasellus auctor convallis nisl ut accumsan. Suspendisse ullamcorper fermentum
                    lectus, vel tincidunt ligula mollis sit amet.
                  </p>
                  <fieldset>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                      invidunt ut labore et dolore magna aliquyam erat, sed diam.
                    </p>
                  </fieldset>
                  <p>
                    Lorem ipsum dolor sit amet, elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ultricies metus. Donec ac ex
                    porta libero venenatis sodales. Sed efficitur eget risus sed molestie. Nulla blandit bibendum
                    metus ut sagittis. Etiam quis semper justo. Sed tristique facilisis felis ut tincidunt. Phasellus
                    auctor convallis nisl ut accumsan. Suspendisse ullamcorper fermentum lectus, vel tincidunt ligula
                    mollis sit amet.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ultricies metus. Donec ac ex
                    porta libero venenatis sodales. Sed efficitur eget risus sed molestie. Nulla blandit bibendum
                    metus ut sagittis. Etiam quis semper justo. Sed tristique facilisis felis ut tincidunt. Phasellus
                    auctor convallis nisl ut accumsan. Suspendisse ullamcorper fermentum lectus, vel tincidunt ligula
                    mollis sit amet.
                  </p>
                </div>
              </div>
              <div className="blog-details-share">
                <h4>Share</h4>
                <ul>
                  <li><a href="#"><img src="img/bg-facebook.png" alt="Facebook" /></a></li>
                  <li><a href="#"><img src="img/bg-twiter.png" alt="Twitter" /></a></li>
                  <li><a href="#"><img src="img/bg-instgram.png" alt="Instagram" /></a></li>
                  <li><a href="#"><img src="img/bg-youtube.png" alt="YouTube" /></a></li>
                  <li><a href="#"><img src="img/bg-email.png" alt="Email" /></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="blog-details-right">
              <div className="blog-details-latest-title">
                <h2>LATEST POSTS</h2>
              </div>
              <div className="blog-details-latest-card">
                <div className="blog-details-latest-card-col">
                  <div className="blog-details-latest-card-left">
                    <img src="img/blog3-1 1.png" alt="blog" />
                  </div>
                  <div className="blog-details-latest-card-right">
                    <h3><a href="#">5 Important Tips for Batch Background Removal</a></h3>
                    <ul>
                      <li>
                        <img src="img/calender.png" alt="calendar" />
                        <span>15 October</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="blog-details-latest-card-col">
                  <div className="blog-details-latest-card-left">
                    <img src="img/blog3-1 1.png" alt="blog" />
                  </div>
                  <div className="blog-details-latest-card-right">
                    <h3><a href="#">Creative Instagram Story Ideas</a></h3>
                    <ul>
                      <li>
                        <img src="img/calender.png" alt="calendar" />
                        <span>15 October</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="blog-details-latest-card-col">
                  <div className="blog-details-latest-card-left">
                    <img src="img/blog3-1 1.png" alt="blog" />
                  </div>
                  <div className="blog-details-latest-card-right">
                    <h3><a href="#">What Colors Go Best With Green?</a></h3>
                    <ul>
                      <li>
                        <img src="img/calender.png" alt="calendar" />
                        <span>15 October</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogContent;
