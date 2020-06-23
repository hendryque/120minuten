/* global screenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 *
 * @version 1.0
 */

( function( $ ) {
	var $body, $window, $sidebar, adminbarOffset, top = false,
	    bottom = false, windowWidth, windowHeight, lastWindowPos = 0,
	    topOffset = 0, bodyHeight, sidebarHeight, resizeTimer,
		secondary, button;

	// Mobile Main Menu.
    $('#menu-main-wrap').hide();
    $('#menu-main-close').hide();
	$('#menu-main-toggle').on( 'click', function () {
		$('#menu-main-wrap').slideToggle('fast');
		$('#menu-main-toggle').addClass('hide');
		$('#menu-main-close').addClass('show');
    });

    $('#menu-main-close').on( 'click', function () {
		$('#menu-main-wrap').slideToggle('fast');
		$('#menu-main-toggle').removeClass('hide');
		$('#menu-main-close').removeClass('show');
    });

    $('#menu-main-close-bottom').on( 'click', function () {
		$('#menu-main-wrap').slideToggle('fast');
		$('#menu-main-toggle').removeClass('hide');
		$('#menu-main-close').removeClass('show');
    });

    // Subscribe Widget Area
    $('.lightbox-btn').on( 'click', function () {
		$('.lightbox').fadeIn('slow');
    });
    $('.lightbox-close').on( 'click', function () {
		$('.lightbox').fadeOut('slow');
    });

     // Responsive Videos.
	$('#primary').fitVids();


	// Initialize Featured Content slider for the slider widget.
	$(window).load(function() {
	    jQuery('.flexslider').flexslider({
	    animation: "fade", //String: Select your animation type, "fade" or "slide"
	    slideshow: true, //Boolean: Animate slider automatically
	    animationLoop: true,
	    prevText: "<span>Previous</span>", //String: Set the text for the "previous" directionNav item
		nextText: "<span>Next</span>",
	    touch: true //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
	  });
	});

	//Smooth Scroll to top Button
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 500,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible');
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

	// Add dropdown toggle that display child menu items.
	$( '.menu-item-has-children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">' + screenReaderText.expand + '</button>' );

	// Toggle buttons and submenu items with active children menu items.
	$( '.current-menu-ancestor > button' ).addClass( 'toggle-on' );
	$( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );

	$( '.dropdown-toggle' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		_this.toggleClass( 'toggle-on' );
		_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );
		_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
		_this.html( _this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );
	} );

	secondary = $( '#secondary' );
	button = $( '.site-branding' ).find( '.secondary-toggle' );

	// Enable menu toggle for small screens.
	( function() {
		var menu, widgets, social;
		if ( ! secondary || ! button ) {
			return;
		}

		// Hide button if there are no widgets and the menus are missing or empty.
		menu    = secondary.find( '.nav-menu' );
		widgets = secondary.find( '#widget-area' );
		social  = secondary.find( '#social-navigation' );
		if ( ! widgets.length && ! social.length && ( ! menu || ! menu.children().length ) ) {
			button.hide();
			return;
		}

		button.on( 'click.weta', function() {
			secondary.toggleClass( 'toggled-on' );
			secondary.trigger( 'resize' );
			$( this ).toggleClass( 'toggled-on' );
			if ( $( this, secondary ).hasClass( 'toggled-on' ) ) {
				$( this ).attr( 'aria-expanded', 'true' );
				secondary.attr( 'aria-expanded', 'true' );
			} else {
				$( this ).attr( 'aria-expanded', 'false' );
				secondary.attr( 'aria-expanded', 'false' );
			}
		} );
	} )();

	/**
	 * @summary Add or remove ARIA attributes.
	 * Uses jQuery's width() function to determine the size of the window and add
	 * the default ARIA attributes for the menu toggle if it's visible.
	 * @since Twenty Fifteen 1.1
	 */
	function onResizeARIA() {
		if ( 1022 > $window.width() ) {
			button.attr( 'aria-expanded', 'false' );
			secondary.attr( 'aria-expanded', 'false' );
			button.attr( 'aria-controls', 'secondary' );
		} else {
			button.removeAttr( 'aria-expanded' );
			secondary.removeAttr( 'aria-expanded' );
			button.removeAttr( 'aria-controls' );
		}
	}


	// Scroll Top + Fix-position Main Menu.
	var StickyElement = function(node){
	var doc = $(document),
      fixed = false,
      anchor = node.find('.sticky-anchor'),
      content = node.find('.sticky-content');

	var onScroll = function(e){
    var docTop = doc.scrollTop(),
        anchorTop = anchor.offset().top;

    if(docTop > anchorTop){
      if(!fixed){
        anchor.height(content.outerHeight());
        content.addClass('fixed');
        $('body').addClass('nav-is-fixed');
        fixed = true;
      }
    }  else   {
      if(fixed){
        anchor.height(0);
        content.removeClass('fixed');
        $('body').removeClass('nav-is-fixed');
        fixed = false;
      }
    }
  	};
  	$(window).on('scroll', onScroll);
	};

	var demo = new StickyElement($('#menu-main-wrap'));

} )( jQuery );
