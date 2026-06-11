const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // 1. If at the very top, reset classes so navbar shows normally
  if (currentScroll <= 0) {
    body.classList.remove("scroll-up", "scroll-down");
    return;
  }

  // 2. If scrolling down and passed the topbar height, hide it
  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  } 
  // 3. If scrolling up, show it
  else if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }

  // Track scroll position for the next movement
  lastScroll = currentScroll;
});