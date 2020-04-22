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
    menuToggle: '[data-menu-toggle]',
    dropDownToggle: '[data-drop-down-toggle]',
    menuContainer: '[data-menu]',
    cartContainer: '[data-cart]',
    cartItemAddedSuccessModal: '[data-cart-item-added-success-modal]'
  };

   var offCanvasMenu = $(selectors.offCanvasMenu);
  var menuToggle = $(selectors.menuToggle); 
  var cartContainer = $(selectors.cartContainer);
  var menuContainer = $(selectors.menuContainer);
  var menuIsOpen = false; 
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
        menuIsOpen = false;    
      } else{
        offCanvasMenu.addClass('is-open');
        offCanvasMenu.removeClass('is-closed');
        menuIsOpen = true;    
      }
    }

    var closeMenuIcon = function() {
      menuToggle.removeClass('is-menu-open');
      menuToggle.addClass('is-menu-closed');
    };

    $(selectors.menuToggle).on('click', function(event) {
      that.toggleNavigation(); 
    }); 


    //
    // Code the dropdown menu on small devices 
    //
    $(selectors.dropDownToggle).on('click', function(event, target) {
      var id = $(event.target).data('toggle-id'); 

      $('[data-dropdown-id]').each(function() {
        if($(this).hasClass('is-open') && $(this).data('dropdown-id') !== id) {
          $(this).removeClass('is-open');
        }
      });

      if($('[data-dropdown-id=' + id + ']').hasClass('is-open')) {
        $('[data-dropdown-id=' + id + ']').removeClass('is-open');
      } else {
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
    offCanvasMenu.removeClass('is-closed');
    offCanvasMenu.addClass('is-open');
    cartContainer.addClass('is-showing');   
    openSection = 'cart';
    menuIsOpen = true;  
  }; 

  //
  //Show display success cart modal global method 
  //
  Header.displaySuccessCartModal = function(cart) {
    var $successModal = $(selectors.cartItemAddedSuccessModal); 
    $successModal.find('[data-cart-total]').text(cart.item_count); 
    $successModal.addClass('is-showing'); 
  }; 

  return Header;

})();




