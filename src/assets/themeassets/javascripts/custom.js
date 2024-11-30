$(document).ready(function(){
	$("#myCarousel").carousel({interval: 25000});
	$('.login-via-list > li > a').click(function(loginlist){
		loginlist.preventDefault();
		var var_li_index = $(this).parent('li').index();
		$('.login-via-list > li > a').removeClass('active');
		$(this).addClass('active');
		var scope_width = $('.scanner-scope').width();
		$('.scanner-scope > .slideitem').animate({			
			left: scope_width + "px",
		  }, 150, function() {
			$('.scanner-scope > .slideitem').eq(var_li_index).animate({			
				left: "0",
			  }, 200, function() {
				// Animation complete.
			  });
		  });
	});
  });