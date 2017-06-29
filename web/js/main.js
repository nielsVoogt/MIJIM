
/// ----------------------------------------------------------------------------------------------- SMOOTH SCROLLING

$(document).on('click', '._smooth-scrolling', function(event){
    event.preventDefault();
    $('._smooth-scrolling').removeClass('active');
    $(this).addClass('active');

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

$(document).on('click', '._mavo-controls', function(event){
    event.preventDefault();
    $('._smooth-scrolling').removeClass('active');
});