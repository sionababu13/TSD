
/* =========================
   PROJECT DATA
========================= */

/*
  Replace the sample project titles and descriptions
  with your actual six practicals.

  Replace each url with the LIVE website link after
  deploying that practical.

  Example:
  url: "https://your-project.vercel.app"
*/

const projects = [
    {
        id: 1,
        name: "Practical 01",
        tag: "HTML / CSS",
        description: "Add the title and description of your first practical here.",
        tech: "HTML · CSS",
        symbol: "01",
        color: "visual-one",
        url: "./1/in.html"
    },
    {
        id: 2,
        name: "Practical 02",
        tag: "JavaScript",
        description: "Add the title and description of your second practical here.",
        tech: "HTML · CSS · JavaScript",
        symbol: "02",
        color: "visual-two",
        url: "./2/index.html"
    },
    {
        id: 3,
        name: "Practical 03",
        tag: "React",
        description: "Add the title and description of your third practical here.",
        tech: "React · JavaScript",
        symbol: "03",
        color: "visual-three",
        url: "./3/index.html"
    },
    {
        id: 4,
        name: "Practical 04",
        tag: "Node.js",
        description: "Add the title and description of your fourth practical here.",
        tech: "Node.js · HTML · CSS",
        symbol: "04",
        color: "visual-four",
        url: "./4/index.html"
    },
    {
        id: 5,
        name: "Practical 05",
        tag: "Web Development",
        description: "Add the title and description of your fifth practical here.",
        tech: "HTML · CSS · JavaScript",
        symbol: "05",
        color: "visual-five",
        url: "./5/index.html"
    },
    {
        id: 6,
        name: "Practical 06",
        tag: "React / Vite",
        description: "Add the title and description of your sixth practical here.",
        tech: "React · Vite",
        symbol: "06",
        color: "visual-six",
        ./6/student-profile/dist/index.html
    }
];


/* =========================
   ELEMENTS
========================= */

const projectGrid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const chips = document.getElementById("chips");
const count = document.getElementById("count");
const emptyMessage = document.getElementById("emptyMessage");

const sortBtn = document.getElementById("sortBtn");
const viewBtn = document.getElementById("viewBtn");
const resetBtn = document.getElementById("resetBtn");

const themeBtn = document.getElementById("themeBtn");
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");

const modal = document.getElementById("modal");
const mTitle = document.getElementById("mTitle");
const mMeta = document.getElementById("mMeta");
const mContent = document.getElementById("mContent");
const mClose = document.getElementById("mClose");
const mPrev = document.getElementById("mPrev");
const mNext = document.getElementById("mNext");
const mOpen = document.getElementById("mOpen");


/* =========================
   STATE
========================= */

let activeFilter = "All";
let sortAscending = true;
let listView = false;
let activeProjectIndex = 0;


/* =========================
   CREATE PROJECT CARDS
========================= */

function createCard(project) {
    const card = document.createElement("article");

    card.className = "project-card";
    card.dataset.name = project.name;
    card.dataset.tag = project.tag;

    card.innerHTML = `
        <div class="card-visual ${project.color}">
            <span class="card-number">
                PRACTICAL / ${String(project.id).padStart(2, "0")}
            </span>
            <span class="visual-symbol">${project.symbol}</span>
        </div>

        <div class="card-body">

            <div class="card-tag">${project.tag}</div>

            <h3>${project.name}</h3>

            <p>${project.description}</p>

            <div class="card-bottom">

                <span class="card-tech">${project.tech}</span>

                <div class="card-actions">

                    <button class="preview-btn" data-id="${project.id}">
                        Details ↗
                    </button>

                    <button class="open-btn" data-id="${project.id}">
                        Open ↗
                    </button>

                </div>

            </div>

        </div>
    `;

    return card;
}


/* =========================
   FILTER CHIPS
========================= */

function createFilters() {
    const tags = [
        "All",
        ...new Set(projects.map(project => project.tag))
    ];

    chips.innerHTML = "";

    tags.forEach(tag => {
        const button = document.createElement("button");

        button.className = "chip";
        button.textContent = tag;

        if (tag === activeFilter) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            activeFilter = tag;
            createFilters();
            renderProjects();
        });

        chips.appendChild(button);
    });
}


/* =========================
   RENDER PROJECTS
========================= */

function renderProjects() {
    const searchText = searchInput.value.toLowerCase().trim();

    let filteredProjects = projects.filter(project => {
        const matchesSearch =
            project.name.toLowerCase().includes(searchText) ||
            project.description.toLowerCase().includes(searchText) ||
            project.tech.toLowerCase().includes(searchText) ||
            project.tag.toLowerCase().includes(searchText);

        const matchesFilter =
            activeFilter === "All" ||
            project.tag === activeFilter;

        return matchesSearch && matchesFilter;
    });

    if (!sortAscending) {
        filteredProjects.reverse();
    }

    projectGrid.innerHTML = "";

    filteredProjects.forEach(project => {
        projectGrid.appendChild(createCard(project));
    });

    projectGrid.classList.toggle("list-view", listView);

    count.textContent = String(filteredProjects.length).padStart(2, "0");

    emptyMessage.hidden = filteredProjects.length !== 0;

    clearBtn.hidden = searchInput.value.length === 0;
}


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", renderProjects);

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    renderProjects();
    searchInput.focus();
});

resetBtn.addEventListener("click", () => {
    activeFilter = "All";
    searchInput.value = "";

    createFilters();
    renderProjects();
});

document.addEventListener("keydown", event => {
    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {
        event.preventDefault();
        searchInput.focus();
    }

    if (event.key === "Escape") {
        closeModal();
    }
});


/* =========================
   SORT
========================= */

sortBtn.addEventListener("click", () => {
    sortAscending = !sortAscending;

    sortBtn.textContent = sortAscending
        ? "Sort: 1 → 6"
        : "Sort: 6 → 1";

    renderProjects();
});


/* =========================
   GRID / LIST VIEW
========================= */

viewBtn.addEventListener("click", () => {
    listView = !listView;

    viewBtn.textContent = listView
        ? "Grid view"
        : "List view";

    projectGrid.classList.toggle("list-view", listView);
});


/* =========================
   PROJECT DETAILS MODAL
========================= */

function openModal(projectId) {
    activeProjectIndex = projects.findIndex(
        project => project.id === projectId
    );

    if (activeProjectIndex === -1) return;

    updateModal();

    modal.hidden = false;
    document.body.style.overflow = "hidden";
}

function updateModal() {
    const project = projects[activeProjectIndex];

    mMeta.textContent =
        `PRACTICAL / ${String(project.id).padStart(2, "0")} · ${project.tag}`;

    mTitle.textContent = project.name;

    mContent.textContent =
        `${project.description} Technologies used: ${project.tech}.`;

    if (project.url) {
        mOpen.href = project.url;
        mOpen.style.display = "inline-flex";
    } else {
        mOpen.href = "#";
        mOpen.style.display = "none";
    }
}

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
}

mClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

mPrev.addEventListener("click", () => {
    activeProjectIndex =
        (activeProjectIndex - 1 + projects.length) % projects.length;

    updateModal();
});

mNext.addEventListener("click", () => {
    activeProjectIndex =
        (activeProjectIndex + 1) % projects.length;

    updateModal();
});


/* =========================
   CARD BUTTONS
========================= */
/* =========================
   INTERACTIVE CARD ACTIONS
========================= */

projectGrid.addEventListener("click", event => {

    const card = event.target.closest(".project-card");

    if (!card) return;

    const previewButton = event.target.closest(".preview-btn");
    const openButton = event.target.closest(".open-btn");

    const projectId = Number(
        previewButton?.dataset.id ||
        openButton?.dataset.id ||
        card.querySelector(".preview-btn").dataset.id
    );

    const project = projects.find(
        item => item.id === projectId
    );

    if (!project) return;

    // Details button or clicking the card
    if (previewButton || (!openButton && !previewButton)) {
        openModal(projectId);
    }

    // Open live website
    if (openButton) {
        if (project.url) {
            window.open(
                project.url,
                "_blank",
                "noopener"
            );
        } else {
            alert(
                "Add the deployed website URL in script.js first."
            );
        }
    }

});


/* =========================
   CARD LIGHT EFFECT
========================= */

projectGrid.addEventListener("pointermove", event => {

    const card = event.target.closest(".project-card");

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

});

projectGrid.addEventListener("pointerleave", () => {

    projectGrid.querySelectorAll(".project-card").forEach(card => {
        card.style.setProperty("--mouse-x", "50%");
        card.style.setProperty("--mouse-y", "50%");
    });

});

/* =========================
   DARK MODE
========================= */

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark")
            ? "☀"
            : "◐";
});


/* =========================
   SCROLL PROGRESS / TOP
========================= */

window.addEventListener("scroll", () => {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const percentage =
        scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

    progress.style.width = `${percentage}%`;

    toTop.hidden = window.scrollY < 400;
});

toTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================
   TECHNOLOGY ORBIT
   Labels move around circles
   but stay upright.
========================= */

const orbitSettings = [
    { radius: 95, speed: 0.45, angle: 0 },
    { radius: 95, speed: -0.45, angle: 180 },
    { radius: 145, speed: 0.30, angle: 60 },
    { radius: 145, speed: -0.30, angle: 240 },
    { radius: 185, speed: 0.22, angle: 120 },
    { radius: 185, speed: -0.22, angle: 300 }
];

const orbitPaths = document.querySelectorAll(".orbit-path");

let orbitPaused = false;
let lastTime = 0;

orbitPaths.forEach(path => {
    path.addEventListener("mouseenter", () => {
        orbitPaused = true;
    });

    path.addEventListener("mouseleave", () => {
        orbitPaused = false;
    });
});

function animateOrbit(time) {
    if (!lastTime) lastTime = time;

    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;

    if (!orbitPaused) {
        orbitPaths.forEach((path, index) => {
            const settings = orbitSettings[index];

            settings.angle += settings.speed * delta * 60;

            const radians = settings.angle * Math.PI / 180;

            const x = Math.cos(radians) * settings.radius;
            const y = Math.sin(radians) * settings.radius;

            const item = path.querySelector(".orbit-item");

            item.style.left = `calc(50% + ${x}px)`;
            item.style.top = `calc(50% + ${y}px)`;
        });
    }

    requestAnimationFrame(animateOrbit);
}

requestAnimationFrame(animateOrbit);


/* =========================
   INITIALIZE
========================= */

createFilters();
renderProjects();
