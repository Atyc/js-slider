//Config Variables
var slidePause			= 9000;		// Pause between transitions 1000 = 1 sec
var transitionDuration	= 1000; 	// Animation duration 1000 = 1 sec
var autoPlay			= "yes"; 	// yes no
//end config

//$(document).ready(function(){
$(window).load(function() {


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
$("#JSliderNavigation").append("<span onClick='navigatePrev()' class='navItem' id='navprev'>&#10094;</span>");
for (var i = 1; i<=totalSlides; i++) {
		$(slides[i-1]).attr("id","JS"+i);
		$("#JS"+i).css({"float":"left", "width":JSwidth, "overflow":"hidden"});

		$("#JSliderNavigation").append("<span onClick='navigateTo("+i+","+JSwidth+")' class='navItem' id='nav"+i+"'>"+i+"</span>");
		if (i==1) $("#nav1").addClass("current");
};
$("#JSliderNavigation").append("<span onClick='navigateNext()' class='navItem' id='navnext'>&#10095;</span>");

//create and position overlay arrows
JSparent.append("<div onClick='navigatePrev()' class='navItem JSoverlayPrev' id='navprevBig'><div id='JSarrowLeft'>&#10094;</div></div>");
JSparent.append("<div onClick='navigateNext()' class='navItem JSoverlayNext' id='navnextBig'><div id='JSarrowRight'>&#10095;</div></div>");
var offsetSlider = JSparent.offset().top;
var offsetSlider2 = ($(window).width() - (JSparent.offset().left + JSparent.outerWidth())); //NOT OK
console.log(offsetSlider2);
$(".JSoverlayPrev").css({"width":JSwidth/3, "height":JSheight, "top":offsetSlider, "padding-left":10, "vertical-align":"center"});
$(".JSoverlayNext").css({"width":JSwidth/3, "height":JSheight, "top":offsetSlider, "padding-right":10, "right":offsetSlider2});

$(".JSoverlayNext").mouseenter(function(){$("#JSarrowRight").animate({"opacity":"0.5", "filter":"alpha(opacity=50)"});});
$(".JSoverlayNext").mouseleave(function(){$("#JSarrowRight").css({"opacity":"0", "filter":"alpha(opacity=0)"});});

$(".JSoverlayPrev").mouseenter(function(){$("#JSarrowLeft").animate({"opacity":"0.5", "filter":"alpha(opacity=50)"});});
$(".JSoverlayPrev").mouseleave(function(){$("#JSarrowLeft").css({"opacity":"0", "filter":"alpha(opacity=0)"});});




var JSarrowHeight=$("#JSarrowLeft").height();
var marginTopOffset = (JSheight/2)-(JSarrowHeight/2);

$("#JSarrowLeft").css({"margin-top":(JSheight-JSarrowHeight)/2});
$("#JSarrowRight").css({"margin-top":(JSheight-JSarrowHeight)/2, "float":"right"});

//stop autoplay when navigation is used
$(".navItem").click(function(){
	window.clearInterval(auto);
});


});

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
	navigateTo(nextSlide, JSwidth);
}

function navigatePrev() {		
	var currentSlide = $('.current').attr('id');
	currentSlide=currentSlide.substring(3);
	var prevSlide=(Number(currentSlide)-1);
	var JSwidth=$("#JSlider").parent().width();
	if (prevSlide==0) prevSlide=6;
	navigateTo(prevSlide, JSwidth);
}


function autoStart() {
	return window.setInterval( function() {
		navigateNext();
	}, slidePause);
}
if (autoPlay=="yes") var auto = autoStart();