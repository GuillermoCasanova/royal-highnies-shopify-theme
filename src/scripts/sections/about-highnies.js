/**
 * About Highnies Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the About Highnies Section.
 *
   * @namespace About Highnies
 */

theme.AboutHighnies = (function() {


	   var aboutPageAnimations = {
      selectors: {
        animationContainer: "[data-animation-container]",
        stringPath: "[data-string-path]",
        stringContainer: "[data-string-container]"
      },
      init: function() {

        var that = this; 

        var $string = $(this.selectors.stringPath); 

        var lineLength = $string[0].getTotalLength(); 
        
        $string.css("stroke-dasharray", lineLength);
        $string.css("stroke-dashoffset",  lineLength);

        this.scrollMagicCtrl = new ScrollMagic.Controller(); 

        this.stringTween = new TimelineMax()
                    .add(TweenMax.to(that.selectors.stringPath, 1, {strokeDashoffset: lineLength * 2 + 'px', ease:Linear.easeNone}));


        this.scene = new ScrollMagic.Scene({
          triggerElement: that.selectors.animationContainer, 
          duration: $('.about-us-narrative').height() - ($('.narrative-section--experience').height()/2),
          triggerHook: .05
        }).setTween(this.stringTween)
          .addTo(this.scrollMagicCtrl); 

      }

    };

    aboutPageAnimations.init(); 

 })(); 