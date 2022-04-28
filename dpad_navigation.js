'use strict';

(function() {
  // There we specify a list of focusable elements.
  var focusable = document.querySelectorAll('ul > li, :not(li) a, :not(li) button');

  // And we create a embedded style so you don't need to import a style.
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    .navigation-focus-outer {
      position: fixed;
      box-shadow: 0 0 0 5px var(--accent-color, #0061e0);
      animation: navFocus 1.5s ease infinite;
      border-radius: 0.4rem;
      transition: left 0.3s cubic-bezier(0.2, 0.9, 0.1, 1), top 0.3s cubic-bezier(0.2, 0.9, 0.1, 1);
    }

    .navigation-focus-outer.moving {
      animation: none;
    }

    @keyframes navFocus {
      0% {
        box-shadow: 0 0 0 5px var(--accent-color, #0061e0);
      }
      26% {
        box-shadow: 0 0 0 5px var(--accent-color, #0061e0);
      }
      50% {
        box-shadow: 0 0 0 8px transparent;
      }
      50.1% {
        box-shadow: 0 0 0 2px transparent;
      }
      75% {
        box-shadow: 0 0 0 5px var(--accent-color, #0061e0);
      }
      100% {
        box-shadow: 0 0 0 5px var(--accent-color, #0061e0);
      }
    }
  `;
  document.body.appendChild(style);

  // We create the focus outer and append it to our document's body.
  var focusOuter = document.createElement('div');
  focusOuter.classList.add('navigation-focus-outer');
  document.body.appendChild(focusOuter);

  // And we add a keydown event for tab, up, down and enter buttons.
  document.addEventListener('keydown', function(evt) {
    var focused = document.querySelector('.navigation-focus');
    switch(evt.keyCode) {
      case 9:
      case 38:
        focusOuter.style.display = 'block';
        evt.preventDefault();

        if (focused) {
          if (focused.previousElementSibling !== null) {
            focused.classList.remove('navigation-focus');
            focused.previousElementSibling.classList.add('navigation-focus');
            focused = focused.previousElementSibling;

            focused.scrollIntoView({});

            focusOuter.classList.add('moving');
            focusOuter.ontransitionend = function() {
              focusOuter.classList.remove('moving');
            }
            focusOuter.style.left = focused.getBoundingClientRect().left + 'px';
            focusOuter.style.top = focused.getBoundingClientRect().top + 'px';
            focusOuter.style.width = focused.getBoundingClientRect().width + 'px';
            focusOuter.style.height = focused.getBoundingClientRect().height + 'px';
            focusOuter.style.borderRadius = focused.style.borderRadius;
          }
        } else {
          focusable[0].classList.add('navigation-focus');
          focused = focusable[0];

          var x = focused.getBoundingClientRect().left + focused.getBoundingClientRect().width;
          var x2 = focused.parentElement.getBoundingClientRect().width;
          if (x2 >= window.innerWidth) {
            x2 = window.innerWidth;
          }

          focused.scrollIntoView({});

          focusOuter.classList.add('moving');
          focusOuter.ontransitionend = function() {
            focusOuter.classList.remove('moving');
          }
          focusOuter.style.left = focused.getBoundingClientRect().left + 'px';
          focusOuter.style.top = focused.getBoundingClientRect().top + 'px';
          focusOuter.style.width = focused.getBoundingClientRect().width + 'px';
          focusOuter.style.height = focused.getBoundingClientRect().height + 'px';
          focusOuter.style.borderRadius = focused.style.borderRadius;
        }
        break;
      case 40:
        focusOuter.style.display = 'block';
        evt.preventDefault();

        if (focused) {
          if (focused.nextElementSibling !== null) {
            focused.classList.remove('navigation-focus');
            focused.nextElementSibling.classList.add('navigation-focus');
            focused = focused.nextElementSibling;

            focused.scrollIntoView({});

            focusOuter.classList.add('moving');
            focusOuter.ontransitionend = function() {
              focusOuter.classList.remove('moving');
            }
            focusOuter.style.left = focused.getBoundingClientRect().left + 'px';
            focusOuter.style.top = focused.getBoundingClientRect().top + 'px';
            focusOuter.style.width = focused.getBoundingClientRect().width + 'px';
            focusOuter.style.height = focused.getBoundingClientRect().height + 'px';
            focusOuter.style.borderRadius = focused.style.borderRadius;
          }
        } else {
          focusable[0].classList.add('navigation-focus');
          focused = focusable[0];

          focused.scrollIntoView({});

          focusOuter.classList.add('moving');
          focusOuter.ontransitionend = function() {
            focusOuter.classList.remove('moving');
          }
          focusOuter.style.left = focused.getBoundingClientRect().left + 'px';
          focusOuter.style.top = focused.getBoundingClientRect().top + 'px';
          focusOuter.style.width = focused.getBoundingClientRect().width + 'px';
          focusOuter.style.height = focused.getBoundingClientRect().height + 'px';
          focusOuter.style.borderRadius = focused.style.borderRadius;
        }
        break;
      case 13:
        focusOuter.style.display = 'block';
        evt.preventDefault();

        focused.click();
        break;
    }
  });

  // And we add pointer down events to hide the focus.
  document.addEventListener('mousedown', function() {
    focusOuter.style.display = 'none';
  });
  document.addEventListener('touchstart', function() {
    focusOuter.style.display = 'none';
  });
})();
