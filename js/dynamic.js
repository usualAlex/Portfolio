// <!-- SCRIPTS -->



  // <!-- NAV TABS -->
  	//	This is the home tab - show by default
  	//	Get the element with id="showActive" and click on it
  	document.addEventListener("DOMContentLoaded", function() { document.getElementById("showActive").click();});

  	//	Switch tabs and highlight active tab link
  	function openProject(evt, projectName) {
    // 	Declare all variables
    var i, tabcontent, tablinks;

    // 	Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // 	Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // 	Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(projectName).style.display = "block";
    evt.currentTarget.className += " active";

    // JUST IN CASE - Load images in the current tab
    // const images = document.getElementById(projectName).querySelectorAll('img');
    // images.forEach((image) => {
    //   if (image.src === '') {
    //     image.src = image.dataset.src;
    //   }
    // });
    //for html: <img data-src="image1.jpg" src="" alt="Image 1">

    if (evt.currentTarget.classList.contains('logoButton')) {
      document.querySelector('.content-container').style.backgroundColor = 'black';
    }
    else if (evt.currentTarget.classList.contains('sweeper') || evt.currentTarget.classList.contains('rebounce')){
    	document.querySelector('.content-container').style.backgroundColor = 'black';
    } 
    else {
      document.querySelector('.content-container').style.backgroundColor = '#070707';
    }


    // After switching tabs, simulate hamburger button click to close menu if open
    const hamburgerBtn = document.querySelector('.hamburger-button');
    const menuContainer = document.querySelector('.menu-container');

    // Only simulate click if menu is visible
    if (menuContainer.classList.contains('visible')) {
      hamburgerBtn.click();
    }
    
  } 





  // <!-- FEATURED PROJECTS -->
document.addEventListener("DOMContentLoaded", function () {
  // Featured project tiles (in #Featured tab)
  const featuredTab = document.querySelector('#Featured');
  const project1 = featuredTab.querySelector('.project1');
  const project2 = featuredTab.querySelector('.project2');
  const project3 = featuredTab.querySelector('.project3');

  // Menu highlight elements
  const project1Highlight = document.querySelector('.project1-highlight');
  const project2Highlight = document.querySelector('.project2-highlight');
  const project3Highlight = document.querySelector('.project3-highlight');

  // Add event listeners to the featured project elements
  project1.addEventListener('mouseover', () => {
    project1Highlight.classList.add('highlight');
    project1Highlight.parentNode.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  });
  project1.addEventListener('mouseout', () => {
    project1Highlight.classList.remove('highlight');
    project1Highlight.parentNode.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
  });

  project2.addEventListener('mouseover', () => {
    project2Highlight.classList.add('highlight');
    project2Highlight.parentNode.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  });
  project2.addEventListener('mouseout', () => {
    project2Highlight.classList.remove('highlight');
    project2Highlight.parentNode.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
  });

  project3.addEventListener('mouseover', () => {
    project3Highlight.classList.add('highlight');
    project3Highlight.parentNode.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  });
  project3.addEventListener('mouseout', () => {
    project3Highlight.classList.remove('highlight');
    project3Highlight.parentNode.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
  });

  // Click behavior: clicking the featured tile triggers the menu link
  project1.addEventListener('click', () => project1Highlight.parentNode.click());
  project2.addEventListener('click', () => project2Highlight.parentNode.click());
  project3.addEventListener('click', () => project3Highlight.parentNode.click());
});



document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('.balloon-button');

  buttons.forEach(button => {
    const balloonText = button.getAttribute('balloon');

    const balloon = document.createElement('span');
    balloon.classList.add('balloon');
    balloon.style.position = 'absolute';
    balloon.style.display = 'none';
    balloon.textContent = balloonText;

    button.parentNode.appendChild(balloon);

    button.addEventListener('mouseover', () => {
      if (window.innerWidth > 1000) { // Only show on screens wider than 1000px
        balloon.style.display = 'block';
        const buttonRect = button.getBoundingClientRect();
        balloon.style.top = `${buttonRect.top - 3}px`;
        balloon.style.left = `${buttonRect.left - balloon.offsetWidth - 10}px`;
      }
    });

    button.addEventListener('mouseout', () => {
      balloon.style.display = 'none';
    });
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.querySelector('.hamburger-button');
  const menuContainer = document.querySelector('.menu-container');

  hamburgerBtn.addEventListener('click', () => {
    // Toggle visible class
    menuContainer.classList.toggle('visible');
    hamburgerBtn.classList.toggle('active');
  });
});