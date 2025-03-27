import React, { useState,useEffect } from 'react';
import './home-banner.css'; // Ensure to create and include this CSS file
import { Link } from 'react-router-dom';
const sampleImages = [
  'img/animal_thumb.png',
  'img/human_thumb.png',
  'img/car1_thumb.png',
  'img/product_thumb.png'
];
const HomeBanner = () => {
  const [_, setFile] = useState(null);
  const [originalImage, setOriginalImage] = useState('img/30701b7169d5ba0b1f01dad0eb18bc2e.jpg'); // Default Original Image
  const [removedBgImage, setRemovedBgImage] = useState('img/man-removebg.png'); // Default Removed BG Image
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const $slider = $('#banner-after-before-wrapper');
    const $before = $('#banner-before');
    const $beforeImage = $before.find('img');
    const $resizer = $('#resizer');

    let active = false;

    const updateImageWidth = () => {
        let width = $slider.width();
        $beforeImage.css('width', width + 'px');
    };

    updateImageWidth(); // Initial setup
    $(window).on('resize', updateImageWidth);

    const startResize = () => {
        active = true;
        $resizer.addClass('resize');
    };

    const stopResize = () => {
        active = false;
        $resizer.removeClass('resize');
    };

    const resize = (e) => {
        if (!active) return;
        let x = e.pageX - $slider.offset().left;
        slideIt(x);
        e.preventDefault();
    };

    const touchResize = (e) => {
        if (!active) return;
        let x = e.originalEvent.touches[0].pageX - $slider.offset().left;
        slideIt(x);
        e.preventDefault();
    };

    const slideIt = (x) => {
        let transform = Math.max(0, Math.min(x, $slider.width()));
        $before.css('width', transform + 'px');
        $resizer.css('left', transform + 'px');
    };

    $resizer.on('mousedown', startResize);
    $(document).on('mouseup mouseleave', stopResize);
    $(document).on('mousemove', resize);

    $resizer.on('touchstart', startResize);
    $(document).on('touchend touchcancel', stopResize);
    $(document).on('touchmove', touchResize);

    return () => {
        $(window).off('resize', updateImageWidth);
        $resizer.off('mousedown', startResize);
        $(document).off('mouseup mouseleave', stopResize);
        $(document).off('mousemove', resize);
        $resizer.off('touchstart', startResize);
        $(document).off('touchend touchcancel', stopResize);
        $(document).off('touchmove', touchResize);
    };
}, []);


  const removeBg = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('http://44.203.147.97/api/v1/remove-bg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to remove background');

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setRemovedBgImage(imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImage = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
      setRemovedBgImage(e.target.result);
    };
    reader.readAsDataURL(selectedFile);

    setFile(selectedFile);

    const formData = new FormData();
    formData.append('image', selectedFile);
    removeBg(formData);
  };

  const handleSampleClick = async (imageUrl) => {
    setOriginalImage(imageUrl);
    setRemovedBgImage(imageUrl);

    // Convert Image URL to Blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], "sample.png", { type: blob.type });
         console.log(file)
    // Create FormData
    const formData = new FormData();
    formData.append('image', file);

    removeBg(formData);
  };

  return (
    <section className="banner-us">
      <div className="container w-1240">
        <div className="row">
          <div className="col-lg-6">
            <div className="banner-us-left">
              <div className="banner-us-heading">
                <h1>AI Background Remover</h1>
                <p>
                  Remove background from image instantly, fully automated and&nbsp;
                  <span>FREE</span>
                </p>
              </div>

              <div className="banner-us-center">
                <div className="banner-us-center-items">
                  <div className="banner-us-validation-file-upload">
                    <input type="file" onChange={handleImage} />
                    <span>Choose File</span>
                    <img src="img/file-upload-icon.png" alt="file upload icon" />
                  </div>

                  <div className="banner-us-validation-file-text">
                    <p>
                      Or Drop an image, paste image with <b>Ctrl + V</b>
                    </p>
                  </div>
                </div>
              </div>

              <div className="banner-us-bottom">
                <div className="banner-us-bottom-text-image">
                  <div className="banner-us-bottom-text">
                    <p>No image? Try one of these</p>
                  </div>

                  <div className="banner-us-bottom-image">
                  {sampleImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="sample"
                        className="sample-thumbnail"
                        onClick={() => handleSampleClick(image)}
                      />
                    ))}
                  </div>
                </div>

                <p>
                  By uploading an image or URL you agree to our
                  <Link to="/terms-and-conditions"> Terms of Service </Link>. This site is protected by reCaptcha and its
                  <Link to="/terms-and-conditions"> Privacy Policy </Link> and
                  <Link to="/terms-and-conditions"> Terms of Service </Link> apply.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div id="banner-after-before-wrapper">
              <div id="banner-before">
                <img className="content-image" src={originalImage} draggable="false" alt="before" />
              </div>
              <div id="banner-after" className='removed-bg-container'>
                {loading && <div className="loading-spinner"></div>}
                <img
                  className={`content-image ${loading ? 'blurred' : ''}`}
                  src={removedBgImage}
                  draggable="false"
                  alt="after"
                />
              </div>

              <div id="resizer">
                <div className="banner-scroller">
                  <div className="banner-scroller-img">{/* Add scroll handler or image here if needed */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
