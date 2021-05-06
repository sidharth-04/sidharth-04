const SECTIONS = {
  skills: 2,
  CSSoch: 2,
  DoorStepSchool: 2,
  Gurushiksha: 2,
  Hackathons: 2,
  CSSochGames: 10,
  GamesCreative: 1,
  GamesEducational: 1,
  GamesBlockBased: 1,
  BottomContainer: 1,
  GeneticAlgorithm: 3
};
let completedAnimating = [];

$(document).ready(() => {
  // Smooth Scrolling
  $('a[href*=\\#]:not([href=\\#])').on('click', function() {
    let target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
    if (target.length) {
      $('html,body').animate({scrollTop: target.offset().top},1000);
      return false;
    }
  });
});

// Scroll Animations
$(window).scroll(function() {
  let windowBottom = $(this).scrollTop() + $(this).innerHeight();
  for (let section in SECTIONS) {
    if (!SECTIONS.hasOwnProperty(section)) continue;
    if (completedAnimating.includes(section)) continue;

    let element = $("#"+section)
    let objectBottom = element.offset().top + element.outerHeight();
    if (objectBottom < windowBottom + SECTIONS[section] * 10/100 * 1000) {
      element.addClass("animate");
      completedAnimating.push(section);
    }
  }
}).scroll();
