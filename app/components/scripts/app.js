/* ==================================================
	Digital Flash Base JavaScript
================================================== */
$(document).ready(function(){

	// Call Functions
	toggleClass('header .drawer p i.fa', 'nav', 100);
	toggleClass('header .drawer p i.fa', '.app-wrapper', 100);
	toggleClass('nav ul li a', 'nav', 100);
	toggleClass('nav ul li a', '.app-wrapper', 100);

	// Functions
	function toggleClass(toggle, target, speed){
		$(toggle).on({
			click: function(){
				$(target).toggleClass('clicked', speed);
			}
		});
	}

});
