import React from 'react';

const RemoveBgInstantly = () => {
  return (
    <section className="remove-bg-instantly">
      <div className="container w-1240">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="remove-bg-instantly-items">
              <h2>Remove background instantly with one click</h2>
              <p>Get images in a white, customized, or transparent background in 3 seconds or less.</p>
              <ul>
                <li>Automatically detect subjects on photos.</li>
                <li>Neat, clear & smooth cutout edges.</li>
                <li>Can process hair or any furry edges.</li>
                <li>Processes over 1,000 images in a single upload.</li>
              </ul>
              <a href="#">Try our free background remover <img src="img/chevron-double-right.png" alt="image" /></a>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="remove-bg-instantly-img">
              <img src="img/integration-for-speedy.png" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemoveBgInstantly;
