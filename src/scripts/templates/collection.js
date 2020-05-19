
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
    singleOptionSelector: '[data-single-option-selector]'
  };


 var $collection = $(selectors.collection);

  if (!$collection.length) {
    return;
  }


   ajaxCart.init({
      cartContainer: '#CartContainer',
      addToCartSelector: selectors.addToCartButtons,
      enableQtySelectors: true,
      moneyFormat: theme.strings.moneyFormat
  });

  var productThumbnails = {
    init: function() {
      this.initOptionSelectors(selectors.thumbnails)
    },
    checkIfVariantSelected: function(pSelectors, pThumbnail) {
      
      //console.log(pSelectors); 
      console.log(pThumbnail); 
      var $optionSelectors = $(pSelectors);
      var $thumbnail = pThumbnail;
      var isSelected = false; 


        $optionSelectors.each(
          function() {

            console.log($(this));
            if($(this).prop('checked')) {
              console.log('checked!!');
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
      console.log($thumbnails); 

      $thumbnails.each(function() {

          this.$optionSelectors = $(this).find(selectors.optionSelector);
          var $thumbnail = $(this); 

          this.$optionSelectors.change(function() {

            var optionValue = $(this).val();
            $(this)
              .closest('form')
              .find($(this).find(selectors.singleOptionSelector))
              .val(optionValue)
              .trigger('change');
              that.checkIfVariantSelected($thumbnail.find(selectors.optionSelector), $thumbnail);

          });

          that.checkIfVariantSelected($thumbnail.find(selectors.optionSelector), $thumbnail);
        
      });


    }
  }

  productThumbnails.init();

})();
