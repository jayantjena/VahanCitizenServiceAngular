/*---------------------------------------------------------------------*/
;(function($){

	/*================= Global Variable Start =================*/		   
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	var IEbellow9 = !$.support.leadingWhitespace;
	var iPhoneAndiPad = /iPhone|iPod/i.test(navigator.userAgent);
	var isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
	function isIEver () {
	  var myNav = navigator.userAgent.toLowerCase();
	  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}
	//if (isIEver () == 8) {}
			   
	var jsFolder = "js/";
	var cssFolder = "css/";	
	var ww = document.body.clientWidth, wh = document.body.clientHeight;
	var mobilePort = 1024, ipadView = 1024, wideScreen = 1600;
	
	/*================= Global Variable End =================*/	
	
	//css3 style calling 
	//document.write('<link rel="stylesheet" type="text/css" href="' + cssFolder +'animate.css">');	
	/*================= On Document Load Start =================*/	

	$(document).ready( function(){
		$('.skipContent').on('click',function (e) {
				e.preventDefault();			
				var target = this.hash;
				var $target = $(target);
				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 1000, 'swing', function () {
					window.location.hash = target;
				});
			});
		 
	
		$('body').removeClass('noJS').addClass("hasJS");
		$(this).scrollTop(0);
			getWidth();	
		if( $(".searchBtn").length ){				
				$(".searchBtn").click( function(){
				event.stopPropagation();
				$(".searchBox").slideToggle();
				$(".searchBtn").toggleClass(active);
				});
			}
		$(document).mouseup(function(e){
		    var container = $(" .searchContainer");		    
		    if (!container.is(e.target) && container.has(e.target).length === 0){
		    	$(".searchBox").hide();
		    	}
			});
		// Back to Top function
		if( $("#backtotop").length){
				$(window).scroll(function(){
					if ($(window).scrollTop()>120){
					$('#backtotop').fadeIn('250').css('display','block');}
					else {
					$('#backtotop').fadeOut('250');}
				});
				$('#backtotop').click(function(){
					$('html, body').animate({scrollTop:0}, '200');
					return false;
				});
			};
	
		// Get Focus Inputbox
		if( $(".getFocus").length){
				$(".getFocus").each(function(){
				$(this).on("focus", function(){
				if ($(this).val() == $(this)[0].defaultValue) { $(this).val("");};
			  }).on("blur", function(){
				  if ($(this).val() == "") {$(this).val($(this)[0].defaultValue);};
			  });								  
			});
		};
		 
		 
		 
 
		// Responsive Tabing Script
		if( $(".resTab").length) {
			$('.resTab').responsiveTabs({
				 rotate: false
				,startCollapsed: 'tab' //accordion
				,collapsible: 'accordion' //accordion
				,scrollToAccordion: true
				,scrollToAccordionOnLoad:false
			});
		};
		 
		// magnificPopup js
		$(document).ready(function(){
		    setTimeout(function() {
		        $('.galleryItem').magnificPopup({
		            delegate: 'a',
		            type: 'image',
		            tLoading: 'Loading image #%curr%...',
		            mainClass: 'mfp-img-mobile',
		            gallery: {
		                enabled: true,
		                navigateByImgClick: true,
		                preload: [0, 1]
		            },
		            image: {
		                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		                titleSrc: function (item) {
		                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
		                }
		            }
		        });
		    }, 100); // Change 2000 to the delay time you want in milliseconds
		});
		 

		$('#slide').click(function(){
		    var hidden = $('.menuMobileRight');
		    if (hidden.hasClass('visible')){
		        hidden.animate({"right":"-1000px"}, "slow").removeClass('visible');
		    } else {
		        hidden.animate({"right":"0px"}, "slow").addClass('visible');
		    }
		});
		$(".btn-close").click(function(){
			$('.menuMobileRight').animate({"right":"-1000px"}, "slow").removeClass('visible');
		});
 

		//if ($(".mobileNav").length) {
	        var navigation = $('#nav').clone();
	        $(navigation).prependTo(".offcanvas-body").wrap("<div class='mobileNav'></div>");
	        //if ($(".mobileNav #navMob").length) {
	            $(".mobileNav #nav").attr("id", "navMob");
	       // }
	        $("#navMob").show();
			$(".menuIcon").click(function(){
				$(this).prev().slideToggle();
			});
	   // }

	   //register 
	   $('.register ul.bulletText li').on('click', function(){
		$('.register ul.bulletText li.active').removeClass('active');
		$(this).addClass('active');
		});
		
		
});
	

	/*================= On Window Resize Start =================*/	
	$(window).bind('resize orientationchange', function() {
		getWidth();												
		adjustMenu();
		$('.vCenter').each(function () {$(this).verticalAlign();});
	});
		
	function getWidth(){
		ww = document.body.clientWidth;
		if(ww>wideScreen){$('body').removeClass('device').addClass('desktop widerDesktop');}
		if(ww>mobilePort && ww<=wideScreen){	$('body').removeClass('device widerDesktop').addClass('desktop');}
		if(ww<=mobilePort) {$('body').removeClass('desktop widerDesktop').addClass('device');}
		if(ww > 767 && ww < 1025){$('body').addClass('ipad');}
		else {$('body').removeClass('ipad');}	
	}
	})(jQuery);





	

