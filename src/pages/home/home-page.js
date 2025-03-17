$(document).ready(function () {
   

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

        // Sort overflow out for Overlay Image
        function updateImageWidth() {
            let width = $slider.width();
            console.log(width);
            $beforeImage.css('width', width + 'px');
        }

        updateImageWidth(); // Initial setup
        $(window).resize(updateImageWidth); // Adjust width on resize

        // Mouse events
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

        // Touch events
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




    $('.why-choose-tab-a').click(function(){  
		$(".why-choose-tab").removeClass('why-choose-tab-active');
		$(".why-choose-tab[data-id='"+$(this).attr('data-id')+"']").addClass("why-choose-tab-active");
		$(".why-choose-tab-a").removeClass('why-choose-active-a');
		$(this).parent().find(".why-choose-tab-a").addClass('why-choose-active-a');
	});




        // Expand gallery
    
    




    $('.owl-testimonials').owlCarousel({
        loop: true,
        margin: 30,
        center: true,
        nav: true,
        navText: [
                 '<img src="img/testimonials-right.png" alt="Next">',
                '<img src="img/testimonials-left.png" alt="Previous">'
        ],
        responsive: {
            0: { items: 1 },
            600: { items: 2  },
            1000: { items: 3 }
        }
    });
    

})