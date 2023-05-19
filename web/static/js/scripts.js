// Navigation
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

if(navToggle && header) {
  navToggle.addEventListener("click", function(e) {
    document.body.classList.toggle("nav-overlay");

    // Hide the nav
    if(header.classList.contains("nav-ready")) {
      
      header.classList.toggle("nav-visible");
      
      setTimeout(function() {
        header.classList.toggle("nav-ready");
      }, 300);
      
    // Show the nav
    } else {

      header.classList.toggle("nav-ready");
  
      setTimeout(function() {
        header.classList.toggle("nav-visible");
      }, 1);
    }

    e.preventDefault();
  });
}

// Slider
const slider = document.querySelector(".slider");
const slider_prev = document.querySelector(".slider__prev");
const slider_next = document.querySelector(".slider__next");
const slider_reel = document.querySelector(".slider__reel");
const slides = document.querySelectorAll(".slider__image");

if(slider && slider_prev && slider_next && slider_reel && slides) {

  let current_slide = 1;

  // Set reel width
  slider_reel.style.width = `${slides.length * 100}%`;
  
  // Set slide width
  slides.forEach(function(slide) {
    slide.style.width = `${100 / slides.length}%`;
  });

  // Hide the nav if there's only one slide
  if(slides.length < 2) {
    slider_prev.style.display = "none";
    slider_next.style.display = "none";
  }

  slider_prev.addEventListener("click", function() {
    let prev_slide = current_slide - 1;
    current_slide = prev_slide > 0 ? prev_slide : slides.length;
    changeSlide(current_slide);
  });

  slider_next.addEventListener("click", function() {
    let next_slide = current_slide + 1;
    current_slide = next_slide <= slides.length ? next_slide : 1;
    changeSlide(current_slide);
  });
  
  function changeSlide(slide) {
    slider_reel.style.transform = `translate3d(-${(slide - 1) * (100 / slides.length)}%, 0, 0)`;
  }
}


$(document).ready(function(){
  if ($('.slick-slider').length){
    $('.slick-slider').slick({
      dots: true,
      lazyLoad: 'ondemand',
      speed: 1000,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000
    });
  }

  //Accordion Block
  if ( $('.accordion-block').length ){
    $('.accordion-block-header').on('click', function (){
      $(this).toggleClass('active-header');
      const accordion_content =  $(this).next('.accordion-block-content');
      accordion_content.slideToggle();
    })
  }

  $('.no-product-found').hide();

  //Isotope
  if ($('.grid-iso').length){

    var $grid =  $('.grid-iso').isotope({
      // options
      itemSelector: '.grid-iso .product-item',
      layoutMode: 'fitRows'
    });

    $('.filters').on('change', function() {
      var filters = [];
      // get checked checkboxes values
      $('.filters:checked').each(function() {
        filters.push('.'+$(this).val());
      });
      // join values into a string
      filters = filters.join('');
      // filter items with the selected values

      console.log(filters);

      $grid.isotope({ filter: filters });

      setTimeout(function (e){

        console.log($('.product-item:visible').length)

        if($('.product-item:visible').length == 0)
          $('.no-product-found').show();
        else
          $('.no-product-found').hide();
      },800)


    });

  }
});
