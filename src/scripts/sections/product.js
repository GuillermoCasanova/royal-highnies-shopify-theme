/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
   * @namespace product
 */

theme.Product = (function() {

  var selectors = {
    addToCart: '[data-add-to-cart]',
    addToCartText: '[data-add-to-cart-text]',
    backBtn: '[data-back-btn]',
    comparePrice: '[data-compare-price]',
    comparePriceText: '[data-compare-text]',
    optionSelector: '[data-option-selector]',
    originalSelectorId: '[data-product-select]',
    priceWrapper: '[data-price-wrapper]',
    productAnimElem: '[data-product-anim-elem]', 
    productFeaturedImage: '[data-product-featured-image]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    productThumbs: '[data-product-single-thumbnail]',
    productImageSlideshow: '[data-product-images-slideshow]',
    productImages: '[data-product-images]',
    productImagesList: '[data-product-images] ul',
    product: '[data-product]', 
    singleOptionSelector: '[data-single-option-selector]'
  };
  


  /**
   * Product section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function Product(container) {
    this.$container = $(container);

    var $container = (this.$container = $(container));
    var sectionId = $container.attr('data-section-id');
    var slideshow = $container.find('[data-ui-component="product-photo-slideshow"]'); 
    var that = this; 


    //
    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    //
    if (!$(selectors.productJson, this.$container).html()) {
      return;
    }

    var sectionId = this.$container.attr('data-section-id');
    this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());

    var options = {
      $container: this.$container,
      enableHistoryState: this.$container.data('enable-history-state') || false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: this.productSingleObject
    };

    this.settings = {};
    this.namespace = '.product';
    this.variants = new slate.Variants(options);
    this.$featuredImage = $(selectors.productFeaturedImage, this.$container);

    this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
    this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));

    if (this.$featuredImage.length > 0) {
      this.settings.imageSize = slate.Image.imageSize(this.$featuredImage.attr('src'));
      slate.Image.preload(this.productSingleObject.images, this.settings.imageSize);

      this.$container.on('variantImageChange' + this.namespace, this.updateProductImage.bind(this));
    }

    this.initAjaxCart(); 
    this.initOptionSelector(); 

    if(window.innerWidth < 768) {
      this.initImageSlideshow(selectors.productImageSlideshow);
    } else {
      this.destroyImageSlideshow(); 
      this.initScrollSlideshow(); 
    }
  }

  Product.prototype = $.extend({}, Product.prototype, {

    /**
     * Updates the DOM state of the add to cart button
     *
     * @param {boolean} enabled - Decides whether cart is enabled or disabled
     * @param {string} text - Updates the text notification content of the cart
     */
    updateAddToCartState: function(evt) {
      var variant = evt.variant;

      if (variant) {
        $(selectors.priceWrapper, this.$container).removeClass('hide');
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
        $(selectors.priceWrapper, this.$container).addClass('hide');
        return;
      }

      if (variant.available) {
        $(selectors.addToCart, this.$container).prop('disabled', false);
        $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
      }
    },

    /**
     * Updates the DOM with specified prices
     *
     * @param {string} productPrice - The current price of the product
     * @param {string} comparePrice - The original price of the product
     */
    updateProductPrices: function(evt) {
      var variant = evt.variant;
      var $comparePrice = $(selectors.comparePrice, this.$container);
      var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);

      $(selectors.productPrice, this.$container)
        .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

      if (variant.compare_at_price > variant.price) {
        $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
        $compareEls.removeClass('hide');
      } else {
        $comparePrice.html('');
        $compareEls.addClass('hide');
      }
    },

    /**
     * Updates the DOM with the specified image URL
     *
     * @param {string} src - Image src URL
     */
    updateProductImage: function(evt) {
      var variant = evt.variant;
      var sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);

      this.$featuredImage.attr('src', sizedImgUrl);
    },

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload: function() {
      this.$container.off(this.namespace);
    },
    /**
     * Initializes radio buttons to change current option in the single-option-selector <select>  
     */
    checkIfVariantSelected: function(pSelectors) {
      var $optionSelectors = $(pSelectors);
      var isSelected = false; 

        $optionSelectors.each(
          function() {

            if($(this).prop('checked')) {
              $(selectors.addToCart).removeClass('is-disabled'); 
              $(selectors.addToCart).find(selectors.addToCartText).text('Add to Cart');
              isSelected =  true 
            }
          }
        );

        if(!isSelected) {
          $(selectors.addToCart).find(selectors.addToCartText).text('Please Choose Size');
        }

        return isSelected
    },
    initOptionSelector: function() {
      var that = this; 

      if($(selectors.optionSelector).length > 0) {
        this.$optionSelector = $(selectors.optionSelector);

        this.$optionSelector.change(function() {
          var optionValue = $(this).val();
          $(this)
            .closest('form')
            .find('[data-single-option-selector]')
            .val(optionValue)
            .trigger('change');
            that.checkIfVariantSelected(selectors.optionSelector);

        });

        this.checkIfVariantSelected(selectors.optionSelector);
      
      } else {
        $(selectors.addToCart).removeClass('is-disabled'); 
        $(selectors.addToCart).find(selectors.addToCartText).text('Add to Cart');
      }
    },
    /**
     * Initializes the AJAX cart with product template properties  
     */
    initAjaxCart: function() {
       ajaxCart.init({
            formSelector: '#AddToCartForm--' + this.$container.attr('data-section-id'),
            cartContainer: '#CartContainer',
            addToCartSelector: '#AddToCart--' + this.$container.attr('data-section-id'),
            enableQtySelectors: true,
            moneyFormat: theme.strings.moneyFormat
      });
    },
    /**
    * Initializes the produc image slideshow 
    **/
    initImageSlideshow: function(slideshowContainer) {

      const $slideshowContainer = $(slideshowContainer); 

      $slideshowContainer.addClass('swiper-container');
      $slideshowContainer.find('ul').addClass("swiper-wrapper"); 
      $slideshowContainer.find('li').addClass("swiper-slide"); 
      $slideshowContainer.append('<div class="swiper-pagination"></div>');
      $slideshowContainer.append(' <div class="swiper-button-prev"></div><div class="swiper-button-next"></div>');

      this.productImageSlideshow = new Swiper(slideshowContainer, {
        effect: 'fade',
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      }); 

    },
    destroyImageSlideshow: function() {
      if(this.productImageSlideshow) {
        this.productImageSlideshow(true, true); 
      }
    },
    initScrollSlideshow: function(slideshowContainer) {


      var controller = new ScrollMagic.Controller();

      var scene = new ScrollMagic.Scene(
        {triggerElement: 'body', 
         triggerHook: 0,
          duration: $(selectors.productImages).height()})
          .setPin(selectors.product)
          .addTo(controller); 

      // console.log($(selectors.productImages).height());
      // console.log($('[data-product-image]').length); 
      // console.log($(selectors.productImages).height() / $('[data-product-image]').length);


      var imageNumber = $('[data-product-image]').length;
      var imagesHeight = $(selectors.productImages).height();
      var imageHeight = $(selectors.productImages).height() / $('[data-product-image]').length - 100;


      console.log(imageHeight); 
      console.log(imagesHeight); 

      var slideshowAnimTween = new TweenMax.fromTo(
       selectors.productImagesList, 2, 
        {
          css: {transform: 'translateY(0)', ease: Power3.easeOut}
        },
        {
          css: {transform: 'translateY('+ (-1 * (imagesHeight - imageHeight)) + 'px)', ease: Power3.easeOut}
        });

      var slideshowAnimationScene = new ScrollMagic.Scene(
        {triggerElement: selectors.product, 
         triggerHook: 0,
          duration:  $(selectors.productImages).height()})
          .setTween(slideshowAnimTween)
          .addTo(controller); 


       console.log(slideshowAnimTween); 


    }

  });


  return Product;
})();
