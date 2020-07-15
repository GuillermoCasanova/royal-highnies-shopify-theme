
/**
 * Collection Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly coupled code to the Collection template.
 *
   * @namespace collection
 */

theme.collection = (function() {

  var selectors = {
    collection: '[data-collection]',
    addToCartForms: '[data-thumb-add-to-cart-form]',
    addToCartButtons: '[data-thumb-add-to-cart-btn]',
    addToCartText: '[data-add-to-cart-text]',
    thumbnails: '[data-thumbnail]',
    optionSelector: '[data-option-selector]',
    productJson: '[data-product-json]',
    originalSelectorId: '[data-product-select]',
    singleOptionSelector: '[data-single-option-selector]'
  };


 var $collection = $(selectors.collection);

  if (!$collection.length) {
    return;
  }


  var productThumbnails = {
    init: function() {
      this.initOptionSelectors(selectors.thumbnails)
    },
    checkIfVariantSelected: function(pSelectors, pThumbnail) {
      
      var $optionSelectors = $(pSelectors);
      var $thumbnail = pThumbnail;
      var isSelected = false; 


        $optionSelectors.each(
          function() {

            if($(this).prop('checked')) {
              $thumbnail.find(selectors.addToCartButtons).removeClass('is-disabled'); 
              $thumbnail.find(selectors.addToCartText).text('Add to Cart');
              isSelected =  true 
            }
          }
        );

        if(!isSelected) {
          $thumbnail.find(selectors.addToCartText).text('Please Choose Size');
        }

       return isSelected
    },
    initOptionSelectors: function(pThumbnails) {
      var that = this; 

      var $thumbnails = $(pThumbnails); 

      $thumbnails.each(function() {
         var $optionSelector = $(this).find(selectors.optionSelector);
         var $thumbnail = $(this); 

          this.productSingleObject = JSON.parse($(selectors.productJson, $thumbnail).html());

          var options = {
            $container: $thumbnail,
            enableHistoryState: false,
            singleOptionSelector: selectors.singleOptionSelector,
            originalSelectorId: selectors.originalSelectorId,
            product: this.productSingleObject
          };

          this.variants = new slate.Variants(options);


          if($optionSelector.length > 0) {
            $optionSelector.change(function() {

              var optionValue = $(this).val();
              
              $(this)
                .closest('form')
                .find(selectors.singleOptionSelector)
                .val(optionValue)
                .attr('value', optionValue)
                .trigger('change');

                that.checkIfVariantSelected($thumbnail.find(selectors.optionSelector), $thumbnail);

            });

            that.checkIfVariantSelected($thumbnail.find(selectors.optionSelector), $thumbnail);
          } else {
            $thumbnail.find(selectors.addToCartButtons).removeClass('is-disabled'); 
            $thumbnail.find(selectors.addToCartText).text('Add to Cart');
          }
        
      });


    }
  }

  productThumbnails.init();

})();
