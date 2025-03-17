import React, { useState } from 'react';

// Sample data (replace this with your dynamic data or API fetch)
const articles = [
  {
    id: 1,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 2,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 3,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 4,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 5,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 6,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 7,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 8,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 9,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 10,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 11,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  {
    id: 12,
    imageUrl: 'img/GP-166-Temporary-cover.png',
    adminImageUrl: 'img/speakers5-1.png',
    date: '28 Jan',
    title: "What’s New In Removal.AI?",
    description: "The arrival of a new year always encourages a time for fresh starts, renewed goals, and bold aspirations.…",
    commentCount: 0
  },
  // Add more articles as needed
];

const LatestNewsCard = () => {
  return (
    <section className="latest-news">
      <div className="container w-1240">
        <div className="articles-press-portfoliobtn">
          <ul>
            <li><a id="all" data-filter="all" className="active-1">All</a></li>
            <li><a id="Technology" data-filter="Technology">Announcement</a></li>
            <li><a id="Development" data-filter="Development">Design Resources</a></li>
            <li><a id="Marketing" data-filter="Marketing">E-Commerce</a></li>
            <li><a id="Start-up" data-filter="Start-up">Free Design Resources</a></li>
          </ul>
        </div>

        <div className="articles-press-grid">
          {articles.map((article) => (
            <div key={article.id} className="articles-press-grid-item filter all">
              <div className="latest-news-items">
                <div className="latest-news-items-img">
                  <img src={article.imageUrl} alt="image" />
                </div>
                <div className="latest-news-items-center">
                  <div className="latest-news-center-left">
                    <div className="latest-news-center-admin">
                      <img src={article.adminImageUrl} alt="image" />
                      <h4><a href="#">Admin</a></h4>
                    </div>
                    <div className="latest-news-center-comment">
                      <img src="img/comment.png" alt="comment" />
                      <p>{article.commentCount} Comments</p>
                    </div>
                  </div>
                  <div className="latest-news-center-right">
                    <div className="latest-news-center-right-card">
                      <span>{article.date.split(' ')[0]}</span>
                      <span>{article.date.split(' ')[1]}</span>
                    </div>
                  </div>
                </div>
                <div className="latest-news-items-bottom">
                  <h4><a href="#">{article.title}</a></h4>
                  <p>{article.description}</p>
                  <a href="#">Read More <img src="img/chevron-double-right.png" alt="" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="latest-news-btn">
          <a id="loadMore" href="#">Load More</a>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsCard;
