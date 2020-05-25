window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
// =require slate/a11y.js
// =require slate/cart.js
// =require slate/utils.js
// =require slate/rte.js
// =require slate/sections.js
// =require slate/currency.js
// =require slate/images.js
// =require slate/variants.js

/*================ Sections ================*/
// =require sections/product.js
// =require sections/ajaxCart.js
// =require sections/header.js


/*================ Templates ================*/
// =require templates/customers-addresses.js
// =require templates/customers-login.js
// =require templates/collection.js


$(document).ready(function() {
  var sections = new slate.Sections();
  sections.register('product', theme.Product);
  sections.register('header', theme.Header);

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  // Target tables to make them scrollable
  var tableSelectors = '.rte table';

  slate.rte.wrapTable({
    $tables: $(tableSelectors),
    tableWrapperClass: 'rte__table-wrapper',
  });

  // Target iframes to make them responsive
  var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"]';

  slate.rte.wrapIframe({
    $iframes: $(iframeSelectors),
    iframeWrapperClass: 'rte__video-wrapper'
  });

  // Apply a specific class to the html element for browser support of cookies.
  if (slate.cart.cookiesEnabled()) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }



  //
  // Global Theme Behaviors 
  //
  theme.initCache = function() {
    theme.cache = {
      $window                 : $(window),
      $html                   : $('html'),
      $body                   : $('body')
    };
  };

  theme.afterCartLoad = function() {
    theme.cache.$body.on('ajaxCart.afterCartLoad', function(evt, cart) {
      theme.Header.openCart(); 
    });

  };

  theme.cartInit = function() {
    if (!slate.cart.cookiesEnabled()) {
      theme.cache.$body.addClass('cart--no-cookies');
    }

     ajaxCart.init({
        cartContainer: '#CartContainer',
        addToCartSelector: '[data-thumb-add-to-cart-btn]',
        enableQtySelectors: true,
        moneyFormat: theme.strings.moneyFormat
    });
     
  };

  theme.initPlugins = function() {
    //Configuration for lazySizes plugin to lazyload images 
    window.lazySizesConfig = window.lazySizesConfig || {}; 
    window.lazySizesConfig.throttleDelay = 200; 
    window.lazySizesConfig.init = true;
    window.lazySizesConfig.addClasses = true;
    window.lazySizesConfig.loadMode = 1; 
  }; 


  theme.setUpInputWrappers = function() {
      
    setTimeout(function(){ 
    if( $('[data-input-wrapper]').length > 0) {
      $('[data-input-wrapper]').each(function(index) {
        var that = this; 
          $(this).find('input').on('change', function() {
            console.log('hello');
             if($(this).val().length > 0) {
                $(that).addClass('is-filled'); 
              } else {
                $(that).removeClass('is-filled'); 
              }
          }); 
          
          $(this).find('input').trigger('change');


          $(this).find('input').on('focus', function() {
              $(that).addClass('is-active'); 
              console.log('hello');
          }); 

          $(this).find('input').on('blur', function() {
            $(that).removeClass('is-active'); 

            if($(this).val().length > 0) {
              $(that).addClass('is-filled'); 
            } else {
              $(that).removeClass('is-filled'); 
            }

          if($(this).val().length > 0) {
            $(that).addClass('is-filled'); 
          } else {
            $(that).removeClass('is-filled'); 
          }


        }); 
      }); 

      $('[data-textarea-wrapper]').each(function(index) {
        var that = this; 
        $(this).find('textarea').on('focus', function() {
            $(that).addClass('is-active'); 
        }); 
          $(this).find('textarea').on('blur', function() {
            $(that).removeClass('is-active'); 
        }); 
      }); 
    }

    }, 0); 
     
  }

  theme.init = function() {
    theme.initCache();
    theme.cartInit();
    theme.afterCartLoad(); 
    theme.setUpInputWrappers(); 
    //theme.initPlugins(); 

  $('.retailers li a').click(function(event) {

    $('.retailers li a').removeClass('active');
    $(this).addClass('active');
    var retailers_content = '.' + $(this).attr('data-target');
    
    if($(retailers_content).hasClass('hidden')) {
      if($('.retailers-content:not(.hidden)').length > 0) {
        $('.retailers-content:not(.hidden)').fadeOut('fast', function() {
          $(retailers_content).fadeIn('fast').removeClass('hidden');
        }).addClass('hidden');
      } else {
        $(retailers_content).fadeIn('fast').removeClass('hidden');
      }
    }
    return false;
  });


  };

  theme.init(); 

});
