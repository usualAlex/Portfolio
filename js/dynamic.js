// <!-- SCRIPTS -->








// <!------------------ FEATURED PROJECTS -------------------------->
document.addEventListener("DOMContentLoaded", function () {
  const featuredTab = document.querySelector('#Featured');
  const project1 = featuredTab.querySelector('.project1');
  const project2 = featuredTab.querySelector('.project2');
  const project3 = featuredTab.querySelector('.project3');

  const project1Highlight = document.querySelector('.project1-highlight');
  const project2Highlight = document.querySelector('.project2-highlight');
  const project3Highlight = document.querySelector('.project3-highlight');

  // Hover highlight + balloon trigger
  function setupHover(projectEl, highlightEl) {
    projectEl.addEventListener('mouseover', () => {
      highlightEl.classList.add('highlight');
      highlightEl.dispatchEvent(new Event('mouseover', { bubbles: true }));
    });

    projectEl.addEventListener('mouseout', () => {
      highlightEl.classList.remove('highlight');
      highlightEl.dispatchEvent(new Event('mouseout', { bubbles: true }));
    });
  }

  setupHover(project1, project1Highlight);
  setupHover(project2, project2Highlight);
  setupHover(project3, project3Highlight);
});


// <!------------------ HOVER BALLOON -------------------------->
document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll('.balloon-button');
  const menu = document.querySelector('.menu-container');

  buttons.forEach(button => {
    const balloonText = button.getAttribute('balloon');

    const balloon = document.createElement('span');
    balloon.classList.add('balloon');
    balloon.style.position = 'absolute';
    balloon.style.display = 'none';
    balloon.textContent = balloonText;

    //menu.appendChild(balloon); // append to menu instead

    // instead of menu.appendChild(balloon):
    const parentMenu = button.closest('.menu');
    parentMenu.appendChild(balloon);

    button.addEventListener('mouseover', () => {
      if (window.innerWidth > 1600) {
        balloon.style.display = 'inline-flex';
        const buttonRect = button.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();

        balloon.style.top = `${buttonRect.top - menuRect.top - 3}px`;
        balloon.style.left = `${buttonRect.left - menuRect.left - balloon.offsetWidth - 10}px`;
      }
      else {
        balloon.style.display = 'none';
      }
    });

    button.addEventListener('mouseout', () => {
      balloon.style.display = 'none';
    });
  });
  // Also hide balloons if window shrinks while one is visible
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1650) {
        hideBalloon();
      }
    });
});






// <!------------------ COLLAPSIBLE ABOUT SECTIONS -------------------------->
document.querySelectorAll(".collapsible").forEach(section => {
  section.addEventListener("click", () => {
    section.classList.toggle("active");
    let content = section.nextElementSibling;
    content.classList.toggle("show");

    const arrow = section.querySelector(".arrow");

    // Animate rotation first
    arrow.style.transition = "transform 0.2s ease";
    arrow.style.transform = "rotate(90deg)";

    // After rotation completes, change text
    setTimeout(() => {
      if (section.classList.contains("active")) {
        arrow.textContent = "-";
        arrow.style.marginRight = "2px"; // add margin for "-"
      } else {
        arrow.textContent = "+";
        arrow.style.marginRight = "0"; // reset for "+"
      }

      // Reset rotation
      arrow.style.transition = "none";
      arrow.style.transform = "rotate(0deg)";
    }, 100);
  });
});

