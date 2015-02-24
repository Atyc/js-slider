
var slidePause	= 2000;
var transitionDuration	= 1000;

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
$("#JSliderNavigation").css({"width":JSwidth});

//create DIV and components for Nav
$("#JSliderNavigation").append("<span onClick='navigatePrev()' class='navItem' id='navprev'><</span>");
for (var i = 1; i<=totalSlides; i++) {
		$(slides[i-1]).attr("id","JS"+i);
		$("#JS"+i).css({"float":"left"});

		$("#JSliderNavigation").append("<span onClick='navigateTo("+i+","+JSwidth+")' class='navItem' id='nav"+i+"'>"+i+"</span>");
		if (i==1) $("#nav1").addClass("current");
};
$("#JSliderNavigation").append("<span onClick='navigateNext()' class='navItem' id='navnext'>></span>");

$("span.navItem").click(function(){
	clearInterval(thisInterval);
});


});
var thisInterval = setInterval(function() {navigateNext();}, slidePause);

function navigateTo(slideNo, divWidth) {
	var duration=1000;
	$("#JSlider").animate({'margin-left':-slideNo*divWidth+divWidth}, duration);
	$(".navItem").removeClass("current");
	$("#nav"+slideNo).addClass("current");
}

function navigateNext() {	
	var currentSlide = $('.current').attr('id');
	if (!currentSlide) currentSlide="nav1";
	currentSlide=currentSlide.substring(3);
	var nextSlide=(Number(currentSlide)+1);
	var JSwidth=$("#JSlider").parent().width();
	if (nextSlide==7) nextSlide=1;
	navigateTo(nextSlide, JSwidth) 
}

function navigatePrev() {		
	var currentSlide = $('.current').attr('id');
	currentSlide=currentSlide.substring(3);
	var prevSlide=(Number(currentSlide)-1);
	var JSwidth=$("#JSlider").parent().width();
	if (prevSlide==0) prevSlide=6;
	navigateTo(prevSlide, JSwidth) 
}
