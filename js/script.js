const SECTIONS = ["skills","CSSoch","DoorStepSchool","Gurushiksha","Hackathons"];
let completedAnimating = [];

$(document).ready(() => {
});

$(window).scroll(function() {
  let windowBottom = $(this).scrollTop() + $(this).innerHeight();
  for (let i = 0; i < SECTIONS.length; i ++) {
    if (completedAnimating.includes(SECTIONS[i])) continue;
    let element = $("#"+SECTIONS[i])
    let objectBottom = element.offset().top + element.outerHeight();
    if (objectBottom < windowBottom + 40/100*$(window).innerHeight()) {
      element.addClass("animate");
      completedAnimating.push(SECTIONS[i])
    }
  }
}).scroll();
