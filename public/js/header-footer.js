$(document).ready(function(){
	/* menu js start*/
	$("#h-toggle-btn, .m-overlay-bg").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
		$(".h-toggle-btn").toggleClass("open");
		$("#h-sidebar-wrapper").toggleClass("h-menu-active");
		$(".m-overlay-bg").toggleClass('h-bg-active');
		$('body').toggleClass('open-nav');
	});


	$('.menu-close-icon').click(function(){
		$("#h-sidebar-wrapper").removeClass("h-menu-active");
		$(".m-overlay-bg").removeClass('h-bg-active');
		$(".h-toggle-btn").removeClass("open");
		$('body').removeClass('open-nav');
	})
	 /* menu js end*/



})