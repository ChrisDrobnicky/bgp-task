/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }
  // Your custom JavaScript goes here

  $(document).ready(function() {
    $(document).on('click', 'a[href^="#about"]', function(event) {
      event.preventDefault();

      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 700);
    });
    function enableSliderFunctionality() {
      var isNextSlideClicked = false;
      var $triangleRight = $('#slider-right-triangle');
      var $triangleLeft = $('#slider-left-triangle');
      var $slides = $('.slide');
      var $lastSlide = $('.slide:last-child');
      var $firstSlide = $('.slide:first-child');
      $triangleRight.click(function() {
        if (!isNextSlideClicked) {
          $slides.animate({left: '-=398px'}, 0);
          $lastSlide.css('opacity', '1');
          $firstSlide.css('opacity', '0');
          isNextSlideClicked = true;
        }
      });
      $triangleLeft.click(function() {
        if (isNextSlideClicked) {
          $slides.animate({left: '+=398px'}, 0);
          $lastSlide.css('opacity', '0');
          $firstSlide.css('opacity', '1');
          isNextSlideClicked = false;
        }
      });
    }
    function enableFlagFunctionality() {
      var $flagList = $('#flag-list');
      var $flags = $(' #flag-list .language__flag');
      var $arrow = $('#flag-arrow');
      function toggleFlagList() {
        if ($flagList.hasClass('language--active')) {
          $arrow.removeClass('nav1-list__arrow--active');
          return $flagList.removeClass('language--active');
        }
        $arrow.addClass('nav1-list__arrow--active');
        return $flagList.addClass('language--active');
      }

      $flags.click(function() {
        $flags.css('order', 'unset');
        $(this).css('order', '-2');
      });
      $arrow.click(toggleFlagList);
    }
    function enableHiddenNavFunctionality() {
      var $nav2List = $('#nav2-list');
      var $nav2Icon = $('#nav2-icon');
      $nav2Icon.click(function() {
        $(this).toggleClass('nav2-icon--active');
        $($nav2List).toggleClass('nav2-list--hidden-on-small-screen nav2-list--visible-on-small-screen');
      });
    }
    var $siteHeader = $('.site-header');
    var mns = 'main-nav-scrolled';
    $(window).scroll(function() {
      if ($(this).scrollTop() > 300) {
        $siteHeader.addClass(mns);
      } else {
        $siteHeader.removeClass(mns);
      }
    });
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var $siteHeaderHeight = $siteHeader.outerHeight();

    $(window).scroll(function() {
      didScroll = true;
    });

    setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(this).scrollTop();
      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta) {
        return;
      }
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > $siteHeaderHeight) {
        // Scroll Down
        $('.site-header').removeClass('site-header-down').addClass('site-header-up');
      } else if (st + $(window).height() < $(document).height()) {
        // Scroll Up
        $('.site-header').removeClass('site-header-up').addClass('site-header-down');
      }
      lastScrollTop = st;
    }
    enableFlagFunctionality();
    enableSliderFunctionality();
    enableHiddenNavFunctionality();
  });
})();
