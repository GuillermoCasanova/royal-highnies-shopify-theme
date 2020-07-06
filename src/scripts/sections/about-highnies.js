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

        if(this.scrollMagicCtrl) {
          this.scrollMagicCtrl.destroy(true);
          this.scene.destroy(true);
        }

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



       var timerId = null;

        var  throttle  =  function (func, delay) {
          // If setTimeout is already scheduled, no need to do anything
          if (timerId) {
            return
          }

          // Schedule a setTimeout after delay seconds
          timerId  =  setTimeout(function () {
            func()
            
            // Once setTimeout function execution is finished, timerId = undefined so that in <br>
            // the next scroll event function execution can be scheduled by the setTimeout
            timerId  =  undefined;
          }, delay)
        }


         $(window).on('resize', function() {
            throttle(function() {
                that.init(); 
            }, 1000)
         });
      }
    };

    if($('.about-us-narrative__string').length > 0)  {
      aboutPageAnimations.init(); 
    }

 })(); 