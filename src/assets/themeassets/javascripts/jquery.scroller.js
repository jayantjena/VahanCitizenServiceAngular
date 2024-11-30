// JavaScript Document
(function($){
			$(window).load(function(){
				
				$(".smoothScroll").mCustomScrollbar();
				$(".smoothScrollX").mCustomScrollbar({
                        axis: "x",
                        //scrollInertia: 500,
                        //theme:"dark-thin",
                        //autoExpandScrollbar: true,
                        //advanced: { autoExpandHorizontalScroll: true },
                       // callbacks: {
                       //     onInit: function () {
                       //         $(".mCustomScrollBox").css({ 'max-height': 'none' });
                       //     }
                       // }
                    });
				
				/*$(".disable-destroy a").click(function(e){
					e.preventDefault();
					var $this=$(this),
						rel=$this.attr("rel"),
						el=$(".sidebar-scroll"),
						output=$("#info > p code");
					switch(rel){
						case "toggle-disable":
						case "toggle-disable-no-reset":
							if(el.hasClass("mCS_disabled")){
								el.mCustomScrollbar("update");
								output.text("$(\".sidebar-scroll\").mCustomScrollbar(\"update\");");
							}else{
								var reset=rel==="toggle-disable-no-reset" ? false : true;
								el.mCustomScrollbar("disable",reset);
								if(reset){
									output.text("$(\".sidebar-scroll\").mCustomScrollbar(\"disable\",true);");
								}else{
									output.text("$(\".sidebar-scroll\").mCustomScrollbar(\"disable\");");
								}
							}
							break;
						case "toggle-destroy":
							if(el.hasClass("mCS_destroyed")){
								el.mCustomScrollbar();
								output.text("$(\".sidebar-scroll\").mCustomScrollbar();");
							}else{
								el.mCustomScrollbar("destroy");
								output.text("$(\".sidebar-scroll\").mCustomScrollbar(\"destroy\");");
							}
							break;
					}
				});*/
				
			});
		})(jQuery);