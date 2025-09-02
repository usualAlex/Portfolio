// <!-- SCRIPTS -->

// <!----------- NAV TABS ----------->
//	This is the home tab - show by default
//	Get the element with id="showActive" and click on it
document.addEventListener("DOMContentLoaded", function() { document.getElementById("showActive").click();});

  //	Switch tabs and highlight active tab link
  function openProject(evt, projectName) {
  var i, tabcontent, tablinks;

  // Hide all tabs
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove active class from links
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show current tab
  document.getElementById(projectName).style.display = "block";
  evt.currentTarget.className += " active";

  // Close hamburger if open
  const hamburgerBtn = document.querySelector('.hamburger-button');
  const menuContainer = document.querySelector('.menu-container');
  if (menuContainer.classList.contains('visible')) {
    hamburgerBtn.click();
  }

  // Background switch
  const bgDiv = document.querySelector('.background-image');
  bgDiv.className = "background-image";
  bgDiv.classList.add(`bg-${projectName.toLowerCase()}`);

  // Switch menu color theme
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("menu-"))
  );
  document.body.classList.add(`menu-${projectName.toLowerCase()}`);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}






// <!------------------ FEATURED PROJECTS -------------------------->
document.addEventListener("DOMContentLoaded", function () {
  const featuredTab = document.querySelector('#Featured');
  const project1 = featuredTab.querySelector('.project1');
  const project2 = featuredTab.querySelector('.project2');
  const project3 = featuredTab.querySelector('.project3');

  const project1Highlight = document.querySelector('.project1-highlight');
  const project2Highlight = document.querySelector('.project2-highlight');
  const project3Highlight = document.querySelector('.project3-highlight');

  const tablinks = document.querySelectorAll('.tablink');

  function clearActiveTablinks() {
    tablinks.forEach(el => el.classList.remove('active'));
  }

  function simulateTabClick(highlightElement) {
    clearActiveTablinks();
    highlightElement.classList.add('active');
    highlightElement.click(); // this will trigger openProject(...)
  }

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

  // Click → trigger tab
  project1.addEventListener('click', () => simulateTabClick(project1Highlight));
  project2.addEventListener('click', () => simulateTabClick(project2Highlight));
  project3.addEventListener('click', () => simulateTabClick(project3Highlight));
  
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

    menu.appendChild(balloon); // append to menu instead

    button.addEventListener('mouseover', () => {
      if (window.innerWidth > 1600) {
        balloon.style.display = 'block';
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



// <!------------------ HAMBURGER MENU -------------------------->
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.querySelector('.hamburger-button');
  const menuContainer = document.querySelector('.menu-container');

  hamburgerBtn.addEventListener('click', () => {
    // Toggle visible class
    menuContainer.classList.toggle('visible');
    hamburgerBtn.classList.toggle('active');
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

