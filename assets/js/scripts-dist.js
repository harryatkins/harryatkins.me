window.onload = function() {
  document.querySelector('body').classList.remove('preload');
};

function scrollIt(destination, duration, easing, callback) {

  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

var reduced = false;
var animated = false;
var logo = document.querySelector('.site-logo');
var hideThings = document.querySelectorAll('.hide-on-scroll');
for (var i = 0, len = hideThings.length; i < len; i++) {
    var thing = hideThings[i];
    var width = thing.offsetWidth;
    thing.setAttribute('style', 'width: ' + width + 'px;');
}
window.onscroll = function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if(scrollTop > 100 && reduced == false) {
    reduced = true;
    logo.classList.add('reduced');
    setTimeout(function(){ logo.classList.add('reduced-full'); logo.focus(); }, 150);
  }
  else if (scrollTop < 100 && reduced == true) {
    reduced = false;
    logo.classList.remove('reduced-full');
    setTimeout(function(){ logo.classList.remove('reduced'); logo.focus(); }, 150);
  }
  if(scrollTop > 250 && animated == false) {
    animated = true;
    var morphing = anime({
      targets: '#morphing #page_transition_start',
      d: 'M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z',
      easing: 'easeOutQuad',
      duration: 2000
    });
  }
  else if(scrollTop < 250 && animated == true) {
    animated = false;
    var morphing = anime({
      targets: '#morphing #page_transition_start',
      d: 'M -44,-50 C -52.71,28.52 15.86,8.186 184,14.69 383.3,22.39 462.5,12.58 638,14 835.5,15.6 987,6.4 1194,13.86 1661,30.68 1652,-36.74 1582,-140.1 1512,-243.5 15.88,-589.5 -44,-50 Z',
      easing: 'easeOutQuad',
      duration: 1000
    });
  }

};

var scrollArrow = document.querySelector('.scroll-arrow');
if(scrollArrow) {
  scrollArrow.onclick = function(e) {
    e.preventDefault();
    var scrollDist = document.querySelector('main').offsetTop;
    var morphing = anime({
      targets: '#morphing #page_transition_start',
      d: 'M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z',
      easing: 'easeOutQuad',
      duration: 200
    });
    scrollIt(document.querySelector('main'), 800, 'easeInOutCubic');
  };
}


var mobileNav = document.querySelector('.mobile-nav-link');
var nav = document.querySelector('nav ul');
if(mobileNav) {
  mobileNav.onclick = function(e) {
    e.preventDefault();
    if(mobileNav.classList.contains('open')) {
      nav.classList.remove('show');
      mobileNav.classList.remove('open');
    }
    else {
      nav.classList.add('show');
      mobileNav.classList.add('open');
    }

  };
}

