

/**
 * Retailers Page Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly coupled code to the retailers page template.
 *
   * @namespace retailers
 */

theme.retailers = (function() {

  var selectors = {
  };


  var $collection = $('.retailers');
  var scrollOffset = $('header').height(); 

  if (!$collection.length) {
    return;
  }

  $('.retailers-content').addClass('is-hidden');

  $('.retailers li a').click(function(event) {

    $('.retailers li a').removeClass('active');
    $(this).addClass('active');
    var retailers_content = '.' + $(this).attr('data-target');
    
    if($(retailers_content).hasClass('is-hidden')) {
      if($('.retailers-content:not(.is-hidden)').length > 0) {
        $('.retailers-content:not(.is-hidden)').removeClass('is-visible').addClass('is-hidden');
      
        $(retailers_content).addClass('is-visible').removeClass('is-hidden');
         
         $('html, body').animate({
          scrollTop: $('#retailers-anchor').offset().top  - scrollOffset
        }, 800);

      } else {
        $(retailers_content).addClass('is-visible').removeClass('is-hidden');

         $('html, body').animate({
          scrollTop: $('#retailers-anchor').offset().top - scrollOffset
        }, 800);
      }
    }
    return false;
  });

})(); 
