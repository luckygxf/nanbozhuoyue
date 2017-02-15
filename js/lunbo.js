$(document).ready(function(){

    startTimer();

    /** Main Slider **/
    var timer;
    var slideCount = $('.thumbs li').length;
    //var currSlide = $('.thumbs li').filter('.curr').index();
	var currSlide = slideCount - 1;
    var nextSlide = currSlide - 1;
    var fadeSpeed = 1000;
	
    //Start slides timer functions
    function startTimer() {
        timer = setInterval(function () {
            $('.slide-item').eq(slideCount - currSlide - 1).fadeOut(fadeSpeed);
            $('.slide-item, .thumbs li').removeClass('curr');

            $('.slide-item').eq(slideCount - nextSlide - 1).addClass('curr').fadeIn(fadeSpeed);
            $('.thumbs li').eq(nextSlide).addClass('curr');

            currSlide = nextSlide;
            //nextSlide = currSlide + 1 < slideCount ? currSlide + 1 : 0;
			nextSlide = currSlide - 1 >= 0 ? currSlide - 1 : slideCount - 1;

        }, 6000);
    }

    $('.thumbs li').click(function () {
        clearInterval(timer);
        startTimer();
        currSlide = $(this).index();
        //nextSlide = currSlide + 1 < slideCount ? currSlide + 1 : 0;
		nextSlide = currSlide - 1 >= 0 ? currSlide - 1 : slideCount - 1;
        $('.slide-item').fadeOut(fadeSpeed);
        $('.slide-item, .thumbs li').removeClass('curr');

        $('.slide-item').eq(slideCount - $(this).index() - 1).addClass('curr').fadeIn(fadeSpeed);
        $(this).addClass('curr');
    });

});