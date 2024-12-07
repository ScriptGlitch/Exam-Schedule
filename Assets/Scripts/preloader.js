window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content-preload");
    const loadTime = performance.now();  
    const minDelay = 1000;
    const delay = Math.max(minDelay, loadTime);

    setTimeout(() => {
      preloader.style.display = "none";
      content.style.display = "block";
    }, delay);
  });