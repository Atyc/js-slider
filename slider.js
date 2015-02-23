$(document).ready(function(){



var visibleSlide;
if (visibleSlide=="") visibleSilde=1;
var JSparent=$("#JSlider").parent();

var JSwidth=JSparent.width();
var JSheight=JSparent.height();

var slides=$("#JSlider").children();
var totalSlides = slides.length;

var divWidth=JSwidth*totalSlides;
$("#JSlider").css("width",divWidth);

//create nav div
JSparent.after(function(){
	return "<div id='JSliderNavigation'></div>";
})


//create DIV and components
for (var i = 1; i<=totalSlides; i++) {
		$(slides[i-1]).attr("id","JS"+i);
		$("#JS"+i).css({"float":"left"});

		$("#JSliderNavigation").append("<span onClick='navigateTo("+i+","+JSwidth+")' class='navItem' id='nav"+i+"'>"+i+"</span>");


};



});

function navigateTo(slideNo, divWidth) {
	var duration=1000;
	$("#JSlider").animate({'margin-left':-slideNo*divWidth+divWidth}, duration);
}


