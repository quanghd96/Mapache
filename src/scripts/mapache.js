// Impornt
import mapacheShare from './app/app.share';

(function ($) {
  // Varibles
  const $win = $(window);
  const $body = $('body');
  // const $header = $('.header');
  const intersectSels = ['.kg-width-full', '.kg-width-wide'];
  const $shareBox = $('.share-inner')

  let observe = [];
  let didScroll = false;
  let lastScrollTop = 0;
  // let lastScroll = 0;
  let delta = 5;

  $(intersectSels.join(',')).map(function () {
    observe.push(this);
  });

  /**
   * Dpcument Ready
   */
  $( document ).ready(function() {
    /* Menu open and close for mobile */
    $('.menu--toggle').on('click', (e) => {
      e.preventDefault();
      $body.toggleClass('is-showNavMob').removeClass('is-search');
    });

    /* Share article in Social media */
    $('.mapache-share').bind('click', function (e) {
      e.preventDefault();
      const share = new mapacheShare($(this));
      share.share();
    });

    /* Toggle show more social media */
    $('.follow-toggle').on('click', (e) => {
      e.preventDefault();
      $body.toggleClass('is-showFollowMore');
    });

    /* Modal Open for susbscribe */
    $('.modal-toggle').on('click', e => {
      e.preventDefault();
      $body.toggleClass('has-modal');
    });

    /* scroll link width click (ID)*/
    $('.scrolltop').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 60 }, 500, 'linear');
    });

    /* Toggle card for search Search */
    $('.search-toggle').on('click', (e) => {
      e.preventDefault();
      $('body').toggleClass('is-search').removeClass('is-showNavMob');
    });

    // Open Post Comments
    $('.toggle-comments').on('click', function (e) {
      e.preventDefault();
      $('body').toggleClass('has-comments').removeClass('is-showNavMob')
    });

  });

  /* Intersect share and image */
  const intersects = (el1, el2) => {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right);
  }

  /* the floating fade sharing */
  function shareFadeHiden () {
    if( $win.width() < 1000 ){ return false }

    const ele = $shareBox.get(0);
    let isHidden = false;

    for( let i in observe) {
      if( intersects( ele, observe[i]) ) {
        isHidden = true;
        break;
      }
    }

    (isHidden ? $shareBox.addClass('is-hidden') : $shareBox.removeClass('is-hidden'));
  }

  // functions that are activated when scrolling
  function hasScrolled() {
    const st = $win.scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    // Scroll down and Scroll up -> show and hide header
    // if (lastScroll <= st) {
    //   // Scroll Down
    //   $body.addClass('has-header-up');
    //   lastScroll = st;
    // } else {
    //   // Scroll UP
    //   $body.removeClass('has-header-up');
    //   lastScroll = st;
    // }

    // show background and transparency
    if ($body.hasClass('has-cover')) {
      if (st >= 100) {
        $body.removeClass('is-transparency');
      } else {
        $body.addClass('is-transparency');
      }
    }

    // Share Fade
    if ($body.hasClass('is-article-single')) {
      if (observe.length) { shareFadeHiden() }
    }

    lastScrollTop = st;
  }

  // Active Scroll
  $win.on('scroll', () => didScroll = true );

  // Windowns on load
  $win.on('load', function() {
    setInterval(() => {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);
  });

})(jQuery);
