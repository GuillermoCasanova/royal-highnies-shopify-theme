/**
 * Header Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Header template.
 *
   * @namespace header
 */

theme.Header = (function() {

  var selectors = {
    offCanvasMenu: '[data-off-canvas-menu]',
    offCanvasCart: '[data-off-canvas-cart]',
    closeOffCanvasCart: '[data-close-off-canvas-cart]',
    menuToggle: '[data-menu-toggle]',
    dropDownToggle: '[data-drop-down-toggle]',
    menuContainer: '[data-menu]',
    navigation: '[data-navigation]',
    cartToggle: '[data-cart-toggle]',
    cartItemAddedSuccessModal: '[data-cart-item-added-success-modal]',
    dropdownOverlay: '[data-dropdown-overlay]',
    navigationLink: '[data-navigation-link]'
  };

   var offCanvasMenu = $(selectors.offCanvasMenu);
   var $offCanvasCart = $(selectors.offCanvasCart); 
   var $dropdownOverlay = $(selectors.dropdownOverlay); 
   var $navigation = $(selectors.navigation); 
   var $navigationLinks =  $(selectors.navigationLink); 

  var menuToggle = $(selectors.menuToggle); 
  var menuContainer = $(selectors.menuContainer);
  var menuIsOpen = false; 
  var offCanvasCartOpen = false; 
  var openSection = false; 
  



  var Header = function(container) {

    var that = this; 
    this.$container = $(container); 
    var $container = (this.$container = $(container));

    this.template = $container.attr('data-template');
    var loadingSection = false; 

    var toggleMenuIcon = function() {
      if(menuToggle.hasClass('is-menu-open')) {
        menuToggle.removeClass('is-menu-open');
        menuToggle.addClass('is-menu-closed');
      } else {
        menuToggle.removeClass('is-menu-closed');
        menuToggle.addClass('is-menu-open');
      }
    }

    this.toggleNavigation = function()   {

      if(offCanvasMenu.hasClass('is-open')) {
        offCanvasMenu.removeClass('is-open');
        offCanvasMenu.addClass('is-closed');
        menuToggle.removeClass('is-open');
        menuToggle.addClass('is-closed');
        menuIsOpen = false;    
      } else{
        offCanvasMenu.addClass('is-open');
        offCanvasMenu.removeClass('is-closed');
        menuToggle.addClass('is-open');
        menuToggle.removeClass('is-closed');
        menuIsOpen = true;    
      }
    }

    //** Toggles the cart, loads it with AJAXCART.JS **//
    this.toggleCart = function() {
      if($offCanvasCart.hasClass('is-open')) {
        $offCanvasCart.removeClass('is-open');
        $offCanvasCart.addClass('is-closed');
        offCanvasCartOpen = false;    
      } else{
        $offCanvasCart.addClass('is-open');
        $offCanvasCart.removeClass('is-closed');
        ajaxCart.load(); 
        offCanvasCartOpen = true;    
      }
    }

    this.closeCart = function() {
      $offCanvasCart.removeClass('is-open');
      $offCanvasCart.addClass('is-closed');
      offCanvasCartOpen = false;    
    }

    this.showOverlay = function() {
      $dropdownOverlay.removeClass('is-hidden');
      $dropdownOverlay.addClass('is-showing');
    }

    this.hideOverlay = function() {
      $dropdownOverlay.removeClass('is-showing');
      $dropdownOverlay.addClass('is-hidden');
    }


    $navigation.mouseover(function() {
      that.showOverlay(); 
    });

    $navigation.mouseout(function() {
      that.hideOverlay(); 
    });

    $navigationLinks.mouseover(function() {
      var handle = $(event.target).data('navigation-handle');
      console.log(handle); 
      event.preventDefault(); 


      $('[data-navigation-link]').each(function() {
        if(!$(this).hasClass('is-opaqued') && $(this).data('navigation-handle') !== handle) {
          $(this).addClass('is-opaqued');
        }
      });

      // if($('[data-navigation-handle=' + handle + ']').hasClass('is-opaqued')) {
      //   $('[data-navigation-handle=' + handle + ']').removeClass('is-opaqued');
      // } else {
      //   $('[data-navigation-handle=' + handle + ']').addClass('is-opaqued');
      // }
    });

    $navigationLinks.mouseout(function() {
      event.preventDefault(); 
      $('[data-navigation-link]').removeClass('is-opaqued');
    });


    var closeMenuIcon = function() {
      menuToggle.removeClass('is-menu-open');
      menuToggle.addClass('is-menu-closed');
    };

    $(selectors.menuToggle).on('click', function(event) {
      that.toggleNavigation(); 
    }); 

    $(selectors.cartToggle).on('click', function(event) {
      that.toggleCart(); 
    }); 

    $(selectors.closeOffCanvasCart).on('click', function(event) {
      that.closeCart(); 
    }); 


    //
    // Code the dropdown menu on small devices 
    //
    $(selectors.dropDownToggle).on('click', function(event, target) {
      var id = $(event.target).data('toggle-id');
      event.preventDefault(); 


      $('[data-dropdown-id]').each(function() {
        if($(this).hasClass('is-open') && $(this).data('dropdown-id') !== id) {
          $(this).removeClass('is-open');
          $(this).addClass('is-closed');
        }
      });

      if($('[data-dropdown-id=' + id + ']').hasClass('is-open')) {
        $('[data-dropdown-id=' + id + ']').removeClass('is-open');
        $('[data-dropdown-id=' + id + ']').addClass('is-closed');
      } else {
        $('[data-dropdown-id=' + id + ']').removeClass('is-closed');
        $('[data-dropdown-id=' + id + ']').addClass('is-open');
      }

    }); 


    //
    // Sets up transtion-delay on all links for stagger animation effect
    //
    var menuItems = $('.mainNav-animElem');  

    for(var i = 0; i < menuItems.length; i++) {
      var item = menuItems[i]; 
      $(item).css('transition-delay', (.02 * i) + 's');
    }

  };


  //
  // Open cart global method  
  //
  Header.openCart = function() {
    $offCanvasCart.removeClass('is-closed');
    $offCanvasCart.addClass('is-open');
    offCanvasCartOpen = true; 
  }; 

  return Header;

})();




