$(function () {
    var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0,
        slideCount = $('.slide').length;

    $('html').live('mousedown touchstart', slideStart);
    $('html').live('mouseup touchend', slideEnd);
    $('html').live('mousemove touchmove', slide);

    function slideStart(event) {
        if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
        if (sliding == 0) {
            sliding = 1;
            startClientX = event.clientX;
        }
    }

    function slide(event) {
        event.preventDefault();
        if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
        var deltaSlide = event.clientX - startClientX;

        if (sliding == 1 && deltaSlide != 0) {
            sliding = 2;
            startPixelOffset = pixelOffset;
        }

        if (sliding == 2) {
            var touchPixelRatio = 1;
            if ((currentSlide == 0 && event.clientX > startClientX) ||
                (currentSlide == slideCount - 1 && event.clientX < startClientX))
                touchPixelRatio = 3;
            pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
            $('#slides').css('transform', 'translate3d(' + pixelOffset + 'px,0,0)').removeClass();
        }
    }

    function slideEnd(event) {
        if (sliding == 2) {
            sliding = 0;
            currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
            currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
            pixelOffset = currentSlide * -$('body').width();
            $('#temp').remove();
            $('<style id="temp">#slides.animate{transform:translate3d(' + pixelOffset + 'px,0,0)}</style>').appendTo('head');
            $('#slides').addClass('animate').css('transform', '');
        }
    }
});