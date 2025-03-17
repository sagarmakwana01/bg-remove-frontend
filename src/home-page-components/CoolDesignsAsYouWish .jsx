import React from 'react';

const CoolDesignsAsYouWish = () => {
  return (
    <section className="remove-bg-instantly cool-designs-as-you-wish">
      <div className="container w-1240">
        <div className="row">
          <div className="col-lg-7 col-md-6">
            <div className="remove-bg-instantly-img">
              <img src="img/cool-designs-as-you-wish.png" alt="Image" />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="remove-bg-instantly-items">
              <h2>Cool designs as you wish</h2>
              <p>
                No need to make designs somewhere else. Freely edit and create graphics using our online
                photo editor after the background is removed from your image.
              </p>
              <ul>
                <li>Quickly remove and change the background.</li>
                <li>Add texts and effects.</li>
                <li>Edit the foreground manually using the background eraser tool.</li>
                <li>Available presets and templates for marketplaces.</li>
              </ul>
              <a href="#">
                Try our free background remover <img src="img/chevron-double-right.png" alt="image" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoolDesignsAsYouWish;
