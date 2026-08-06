const grid = document.getElementById("projects-grid");
const filtersEl = document.getElementById("filters");
const overlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalDiagram = document.getElementById("modal-diagram");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalStack = document.getElementById("modal-stack");
const modalLinks = document.getElementById("modal-links");

function linksHTML(project, primaryClass, secondaryClass) {
  const codeHref = project.code || "#";
  const demoHref = project.demo || "#";
  return `
    <a href="${codeHref}" class="btn ${primaryClass}" target="${project.code ? "_blank" : "_self"}" rel="noopener" onclick="${project.code ? "" : "return false;"}">&#128193; Ver Codigo</a>
    <a href="${demoHref}" class="btn ${secondaryClass}" target="${project.demo ? "_blank" : "_self"}" rel="noopener" onclick="${project.demo ? "" : "return false;"}">&#8599;&#65039; Ver Demo</a>
  `;
}

function cardHTML(project, index) {
  return `
    <article class="card" data-index="${index}">
      <div class="card__diagram">${project.diagram}</div>
      <div class="card__body">
        <span class="card__tag">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.shortDescription}</p>
        <div class="card__links">${linksHTML(project, "btn--blue", "btn--outline")}</div>
      </div>
    </article>
  `;
}

function render(filter) {
  const items = PROJECTS.map((p, i) => ({ p, i })).filter(
    ({ p }) => filter === "Todos" || p.category === filter
  );
  grid.innerHTML = items.map(({ p, i }) => cardHTML(p, i)).join("");

  grid.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; // los botones internos no abren el modal
      openModal(PROJECTS[Number(el.dataset.index)]);
    });
  });
}

function buildFilters() {
  const cats = ["Todos", ...new Set(PROJECTS.map((p) => p.category))];
  filtersEl.innerHTML = cats
    .map(
      (cat, i) =>
        `<button class="filter${i === 0 ? " active" : ""}" data-filter="${cat}">${cat}</button>`
    )
    .join("");

  filtersEl.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      filtersEl.querySelector(".active").classList.remove("active");
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });
}

function openModal(project) {
  modalDiagram.innerHTML = project.diagram;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.fullDescription;
  modalStack.innerHTML = project.stack.map((s) => `<span>${s}</span>`).join("");
  modalLinks.innerHTML = linksHTML(project, "btn--green", "btn--orange");
  overlay.classList.add("open");
}

function closeModal() {
  overlay.classList.remove("open");
}

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

buildFilters();
render("Todos");
