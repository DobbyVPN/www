(() => {
  const header = document.querySelector(".site-header");
  const rows = document.querySelectorAll(".protocol-list li");

  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (!header) return;
    if (y > 80 && y > lastY) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }
    lastY = y;
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  if ("IntersectionObserver" in window && rows.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    rows.forEach((row, i) => {
      row.style.transitionDelay = `${i * 70}ms`;
      io.observe(row);
    });
  } else {
    rows.forEach((row) => row.classList.add("is-in"));
  }
})();
