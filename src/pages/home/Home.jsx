import React, { useEffect, useState } from "react";
import './home-page.css';
import HomeBanner from '../../home-page-components/HomeBanner.jsx';
import WhyChooseUs from '../../home-page-components/WhyChooseUs.jsx';
import RemoveBgInstantly from '../../home-page-components/RemoveBgInstantly .jsx';
import CoolDesignsAsYouWish from '../../home-page-components/CoolDesignsAsYouWish .jsx';
import EasyAPIIntegrationForSpeedy from '../../home-page-components/EasyAPIIntegrationForSpeedy .jsx';
import WhyChooseUsSecond from '../../home-page-components/WhyChooseUsSecond.jsx';
import Testimonials from '../../home-page-components/Testimonials.jsx';
import LatestNews from '../../home-page-components/LatestNews.jsx';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulating loading time

    let $slides = $('.slide');
    let $active = $('.slide.active');

    $slides.on('mouseover', function () {
        $active.removeClass('active');
        $active = $(this);
        $active.addClass('active');
    });

    $(document).ready(function () {
        const $slider = $('#banner-after-before-wrapper');
        const $before = $('#banner-before');
        const $beforeImage = $before.find('img');
        const $resizer = $('#resizer');
        let active = false;

        function updateImageWidth() {
            let width = $slider.width();
            $beforeImage.css('width', width + 'px');
        }

        updateImageWidth();
        $(window).resize(updateImageWidth);

        $resizer.on('mousedown', function () {
            active = true;
            $resizer.addClass('resize');
        });

        $(document).on('mouseup mouseleave', function () {
            active = false;
            $resizer.removeClass('resize');
        });

        $(document).on('mousemove', function (e) {
            if (!active) return;
            let x = e.pageX - $slider.offset().left;
            slideIt(x);
            pauseEvent(e);
        });

        $resizer.on('touchstart', function () {
            active = true;
            $resizer.addClass('resize');
        });

        $(document).on('touchend touchcancel', function () {
            active = false;
            $resizer.removeClass('resize');
        });

        $(document).on('touchmove', function (e) {
            if (!active) return;
            let x = e.originalEvent.touches[0].pageX - $slider.offset().left;
            slideIt(x);
            pauseEvent(e);
        });

        function slideIt(x) {
            let transform = Math.max(0, Math.min(x, $slider.width()));
            $before.css('width', transform + 'px');
            $resizer.css('left', transform + 'px');
        }

        function pauseEvent(e) {
            e.stopPropagation();
            e.preventDefault();
        }
    });
   }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <HomeBanner />
      <WhyChooseUs />
      <RemoveBgInstantly />
      <CoolDesignsAsYouWish />
      <EasyAPIIntegrationForSpeedy />
      <WhyChooseUsSecond />
      <Testimonials />
      <LatestNews />
    </>
  );
};

export default Home;