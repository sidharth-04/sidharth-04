const SECTIONS = {
  skills: 4,
  CSSoch: 1,
  DoorStepSchool: 1,
  Gurushiksha: 1,
  Hackathons: 1,
  CSSochGames: 14,
  GamesCreative: 1,
  GamesEducational: 1,
  GamesBlockBased: 1,
  BottomContainer: 1,
  GeneticAlgorithm: 6
};
let completedAnimating = [];

$(document).ready(() => {
  $('a[href*=\\#]:not([href=\\#])').on('click', function() {
    let target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
    if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top
        }, 1000);
        return false;
    }
  });
});

$(window).scroll(function() {
  let windowBottom = $(this).scrollTop() + $(this).innerHeight();
  for (let section in SECTIONS) {
    if (!SECTIONS.hasOwnProperty(section)) continue;
    if (completedAnimating.includes(section)) continue;

    let element = $("#"+section)
    let objectBottom = element.offset().top + element.outerHeight();
    if (objectBottom < windowBottom + SECTIONS[section] * 10/100 * $(window).innerHeight()) {
      element.addClass("animate");
      completedAnimating.push(section);
    }

  }
}).scroll();
