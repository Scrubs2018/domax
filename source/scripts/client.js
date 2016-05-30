$('.b-slider').owlCarousel({
   items: 1,
   loop: true,
   dots: true
});

$('.b-header__menu-mobile').click(function(){
   $('.b-header__menu-mobile').toggleClass('active');
   $('.b-menu-mobile').toggleClass('active');
   return false;
});

$('.b-button.tab').click(function(){
   $('.b-button.tab').toggleClass('active')
   $('.b-fasteners__text.tabs').toggleClass('active');
});

$('.b-button.tabs').click(function(){
   $('.b-button.tabs').toggleClass('active')
   $('.b-decor__text.tab').toggleClass('active');
});

$('#click').click(function(){
   $('#close').toggleClass('active');
   return false;
});

$(function(){
  $(document).click(function(event) {
    if ($(event.target).closest("#close").length) return;
    $("#close").removeClass("active");
    event.stopPropagation();
  });
});

$('.b-tabs__item').click(function() {
    var index = $('.b-tabs__item').index(this);

    $('.b-tabs__item').removeClass('active');
    $(this).addClass('active');

    $('.b-order__tab').removeClass('active');
    $('.b-order__tab:eq(' + index + ')').addClass('active');

    return false;
});

$('#avatar').change( function() {
  var file = $(this).val().split("\\").pop();
  var ext = file.split('.').pop();
  var arr = [ 'txt' , 'docx' , ' xls ' , 'doc' ];
  if(jQuery.inArray( ext, arr ) == -1) {
  $(this).val('')
    alert('Недопустимое расширение файла');
  } else {
    $('#filename').html(file);
  }
});

$('.b-item__about').click(function(){
  console.log($(this).siblings('.b-description.mobile'));
   $(this).children('.b-description.mobile').toggleClass('active');
   return false;
});

$('.b-slider-mobile').owlCarousel({
   items: 3,
   dots: false
});

$('select').each(function() {
    $(this).imSbox();
});

$('.b-main__col').each(function() {
    var fullHeight = $(this).innerHeight();
    var count = $(this).find(".b-main__item").length;
    var itemHeigth = fullHeight / count;
    $(this).find('.b-main__item').outerHeight(itemHeigth).end().find('.b-main__item:last').height(itemHeigth - 3);
});

$(".various").fancybox({
  margin: [70, 0, 0, 0],
  padding: 0,
  fitToView : false,
  autoSize  : true,
  closeClick  : false,
  openEffect  : 'none',
  closeEffect : 'none'
});

$('.b-slider-fancy').owlCarousel({
   items: 7,
   nav: true,
   navText: [' ',' '],
   dots: false,

});

$('.b-slider-fancy__img-slide').click(function() {
    var index = $(this).data('id');
    $('.b-slider-fancy__img-slide').removeClass('choose');
    $(this).addClass('choose');
    $('.b-product-popup__img').removeClass('active');
    $('#' + index).addClass('active');

    return false;
});

var animated = false;
    var detailsElement = null;

    $('.domek [data-details]').click(animateToDetails);
    $('.domek').on('click', '.prev-button, .active_space .mainimg_slide', animateToMain);
    $('#maparea area').hover(
            function () {
                var pointerId = $(this).attr('data-element');
                $('.p' + pointerId + ' .text').trigger('mouseenter');
                $('.p' + pointerId + ' .miniature').addClass('hovered');

            },
            function () {
                var pointerId = $(this).attr('data-element');
                $('.p' + pointerId + ' .text').trigger('mouseleave');
                $('.p' + pointerId + ' .miniature').removeClass('hovered');
            });

    $('.domek .element, .domek .element .icon, .domek .element .miniature').hover(
            function () {
                if (!animated) {
                    var pointerId = $(this).parent().attr('data-element');
                    $(this).parent().css('opacity', '1');
                    $('.mainimg .main').css('opacity', '0.75');
                    $('.overlay').find('[data-element="' + pointerId + '"]').show();
                }
            }, function () {
                    var pointerId = $(this).parent().attr('data-element');
                    $('.element.p' + pointerId).css('opacity', '0.75');
                    $('.mainimg .main').css('opacity', '1');
                    $('.overlay').find('[data-element="' + pointerId + '"]').hide();
            }
    );

    function animateToDetails(ev) {
        $('.active_space>div').removeClass('active_space_slide');
        $('.active_space').css("visibility", "visible").animate({opacity: 1}, 1000);
        $('.inner>div:not(.mainimg)').hide();
        if ($(this).parent().hasClass('active_space')) {

            detailsElement = $(this).attr('data-details');
            $('.mainimg').hide();
            $(detailsElement).show();
            $(this).addClass('active_space_slide');
        } else if (!animated) {
            animated = true;
            detailsElement = $(this).attr('data-details');
            $('.mainimg .element').hide();
            $('.domek .mainimg .element .text').trigger('mouseleave');
            $('.active_space').find("[data-details='" + detailsElement + "']").addClass('active_space_slide');
            $('.mainimg').fadeOut(500);
            $(detailsElement).delay(510).fadeIn(1000);
            animated = false;
        }
    }

    function animateToMain() {
        if (!animated) {
            animated = true;
            $(detailsElement).fadeOut(500);
            detailsElement = null;
            $('.active_space>div').removeClass('active_space_slide');
            $('.active_space').css("visibility", "hidden").animate({opacity: 0}, 1000);
            $('.prev-button').fadeOut(500);
            $('.mainimg').delay(510).fadeIn(1000);
            $('.mainimg .main').animate({transform: "scale(1)"},
            750,
                    function () {
                        animated = false;
                        $('.mainimg .element').show();
                    });
            $('#content .inner>div:not(.mainimg)').hide();
        }
    }