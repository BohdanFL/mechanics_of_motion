let slidersIndex = [0, 1, 2, 3, 4, 5, 6];

$('.shop__head-slider').slick({
	prevArrow: $('.shop__head .slider-head__prev-btn'),
	nextArrow: $('.shop__head .slider-head__next-btn'),
	speed: 0
})

$('.shop__slider-content').slick({
	prevArrow: $('.shop__slider-prev'),
	nextArrow: $('.shop__slider-next'),
	speed: 0
})

$(".shop__head-slider").on("beforeChange", (event, slick, currentSlide, nextSlide) => {
  $(".shop__slider-content").slick("slickGoTo", slidersIndex[nextSlide]);
});

$(".shop__slider-content").on("beforeChange", (event, slick, currentSlide, nextSlide) => {
  let currentGroup = $(".shop__head-slider").slick("slickCurrentSlide");

  let indexes = slidersIndex.findIndex(
    (s, i) => nextSlide > (s[i - 1] || -1) && nextSlide <= s
  );
  if (currentGroup !== indexes) {
    $(".shop__head-slider").slick("slickGoTo", indexes);
  }
});
