$(function() {
   
// Create the dropdown base
$("<select />").appendTo("header nav");

// Create default option "Go to..."
$("<option />", {
 "selected": "selected",
 "value"   : "",
 "text"    : "Go to..."
}).appendTo("nav select");

// Populate dropdown with menu items
$("nav ul li a").each(function() {
var el = $(this);
$("<option />", {
   "value"   : el.attr("href"),
   "text"    : el.text()
}).appendTo("nav select");
});

   // To make dropdown actually work
   // To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
$("nav select").change(function() {
window.location = $(this).find("option:selected").val();
});
 
 });

	// Function to slabtext the H1 headings
function slabTextHeadlines() {
$("#info h2").slabText({
  // Don't slabtext the headers if the viewport is under 380px
  "viewportBreakpoint":100
});
}

// Called one second after the onload event for the demo (as I'm hacking the fontface load event a bit here)
// you should really use google WebFont loader events (or something similar) for better control
$(window).load(function() {
setTimeout(slabTextHeadlines, 1000);
});

$('.scroll').localScroll();
