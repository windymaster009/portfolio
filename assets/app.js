(() => {
  const menu = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  if (menu && links) {
    menu.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      links.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        links.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      }
    });
  }

  const filters = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll(".project[data-category]");
  const empty = document.getElementById("filter-empty");
  filters.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      let visible = 0;
      filters.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      projects.forEach(project => {
        const categories = project.dataset.category.split(" ");
        const show = category === "all" || categories.includes(category);
        project.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const elements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.06, rootMargin: "0px 0px 40px 0px"});
    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => element.classList.add("in-view"));
  }
})();