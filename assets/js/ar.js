/**
* Template Name: Dewi
* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
* 
* RTL Support: This file is compatible with RTL (Right-to-Left) layouts.
* All DOM operations work correctly with RTL direction automatically.
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      // Don't close nav if clicking on dropdown toggle link
      if (this.classList.contains('toggle-dropdown')) {
        return;
      }
      // Don't close nav if clicking on a link inside dropdown menu
      if (this.closest('.dropdown ul')) {
        // Close nav after navigation
        setTimeout(() => {
          if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
          }
        }, 100);
        return;
      }
      // Close nav for regular links
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      // Only prevent default and toggle dropdown on mobile
      if (window.innerWidth < 1200) {
        e.preventDefault();
        const parentLi = this.parentNode;
        const dropdownUl = parentLi.querySelector('ul');
        if (dropdownUl) {
          parentLi.classList.toggle('active');
          dropdownUl.classList.toggle('dropdown-active');
        }
        e.stopImmediatePropagation();
      }
      // On desktop, allow normal link behavior (hover will show dropdown)
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Path after /en or /ar (e.g. "/", "/about", "/companies/foo") for clean URLs.
   */
  function navPathSuffix(pathname) {
    const m = pathname.match(/\/(en|ar)(\/.*)?$/i);
    if (!m) return null;
    const rest = m[2];
    if (!rest || rest === '/') return '/';
    return rest.replace(/\/+$/, '') || '/';
  }

  function isNavHomePath(pathname) {
    return navPathSuffix(pathname) === '/';
  }

  /**
   * Set active nav link based on current page
   */
  function setActiveNavLink() {
    const currentSuffix = navPathSuffix(window.location.pathname);
    if (currentSuffix === null) return;

    const navmenulinks = document.querySelectorAll('.navmenu a');
    let matched = null;

    navmenulinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (!linkHref || linkHref.startsWith('http') || linkHref.startsWith('../en') || linkHref.startsWith('../../en')) {
        return;
      }
      const cleanHref = linkHref.split('#')[0];
      let absPath;
      try {
        absPath = new URL(cleanHref, window.location.href).pathname;
      } catch (e) {
        return;
      }
      const linkSuffix = navPathSuffix(absPath);
      if (linkSuffix === null) return;
      if (linkSuffix === currentSuffix && !matched) {
        matched = link;
      }
    });

    document.querySelectorAll('.navmenu a.active').forEach(activeLink => activeLink.classList.remove('active'));
    if (matched) {
      matched.classList.add('active');
    }
  }

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    // Only apply scrollspy if we're on index page with hash links
    if (!isNavHomePath(window.location.pathname)) {
      return;
    }

    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      }
    })
  }
  
  // Set active link on page load
  window.addEventListener('load', function() {
    setActiveNavLink();
    navmenuScrollspy();
  });
  
  // Only run scrollspy on scroll for index page
  document.addEventListener('scroll', function() {
    if (isNavHomePath(window.location.pathname)) {
      navmenuScrollspy();
    }
  });

})();