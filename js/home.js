const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");

const issuesCard = document.getElementById("issues-card-list");
const totalCard = document.getElementById("total-card");
const modal = document.getElementById("issue_modal");

// active button kora lagbe.. tai amake DRY kora jabe na.. ekta idea ache.. all button ke ekta array te niye kaj kora.. taile khub ease...

// all button array te niyechi
const buttons = [btnAll, btnOpen, btnClosed];

// active button
const setActiveButton = (activeBtn) => {
  buttons.forEach((btn) => {
    if (btn === activeBtn) {
      btn.classList.add("btn-primary", "text-white");
      btn.classList.remove("bg-white", "border-slate-200", "text-slate-500");
    } else {
      btn.classList.remove("btn-primary", "text-white");
      btn.classList.add("bg-white", "border-slate-200", "text-slate-500");
    }
  });
};

const updateTotalCard = () => {
  const visibleCards = document.querySelectorAll("#issues-card-list .card");
  let count = 0;
  visibleCards.forEach((card) => {
    if (card.style.display !== "none") count++;
  });
  totalCard.innerHTML = count;
};

// filter cards kora lagbe ekhn ....
const filterCards = (status) => {
  const cards = document.querySelectorAll("#issues-card-list .card");
  cards.forEach((card) => {
    if (status === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.dataset.status === status ? "block" : "none";
    }
  });

  updateTotalCard();
};

// all button addEventListener diye call korsi
btnAll.addEventListener("click", () => {
  setActiveButton(btnAll);
  filterCards("all");
});
btnOpen.addEventListener("click", () => {
  setActiveButton(btnOpen);
  filterCards("open");
});
btnClosed.addEventListener("click", () => {
  setActiveButton(btnClosed);
  filterCards("closed");
});

const fetchIssues = async () => {
  // api ke fetch diye json korlam..
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    renderIssues(data.data);
  } catch (error) {
    console.error("Failed to fetch issues:", error);
  }
};

const renderIssues = (items) => {
  // console.log(items);
  issuesCard.innerHTML = "";
  // totalCard e items er length dilam
  totalCard.innerHTML = items.length;

  items.forEach((item) => {
    // console.log(item);
    // console.log(item.labels);
    const card = document.createElement("div");
    card.dataset.status = item.status;

    card.className =
      "card bg-white border border-slate-200 rounded-xl cursor-pointer shadow-sm transition-transform duration-150 hover:scale-105 hover:shadow-lg";

    // card.innerHTML e onk somoy lagbe... if else color change etc te... but alhamdulillah
    card.innerHTML = `
      <div class="h-1  rounded-t-xl ${item.status === "open" ? "bg-emerald-400" : "bg-purple-600"}"></div>

      <div class="p-4 space-y-3">
        <div class="flex justify-between items-start">
          <img
            src="${item.status === "open" ? "./assets/open-status.png" : "./assets/closed-status.png"}"
            alt="${item.status}-status"
            onclick="fetchIssueDetails(${item.id})"
            class="w-6 h-6"
          />
          <span class="badge  border-none font-bold py-2 px-3 text-sm ${item.priority === "high" ? "bg-red-50 text-red-500" : item.priority === "medium" ? "bg-yellow-50 text-yellow-500" : "bg-gray-50 text-gray-500"} ">
            ${item.priority.toUpperCase()}
          </span>
        </div>

        <h3 class="text-slate-800 font-bold leading-snug line-clamp-1">
          ${item.title}
        </h3>
        <p class="text-xs text-slate-500 line-clamp-2">
          ${item.description}
        </p>

        <div class="flex gap-2 flex-wrap">
          ${item.labels
            .map(
              (label) => `
          <span class="badge badge-outline  text-[10px] font-bold  ${label === "bug" ? "bg-red-50 text-red-500 border-red-400" : label === "help wanted" ? "bg-orange-50 text-yellow-500 border-yellow-400" : "bg-purple-100 text-purple-600 border-purple-400"}">
             ${label === "bug" ? "🐞 BUG" : label === "help wanted" ? "⚙️ HELP WANTED" : label}
          </span>
        `,
            )
            .join("")}

        </div>

        <div class=" border-t pt-2 mt-2  text-slate-400 space-y-1">
          <div class="flex justify-between flex-wrap gap-1">
            <p>#1 by ${item.author}</p>
            <p>${item.createdAt.split("T")[0]}</p>
          </div>
          <div class="flex justify-between flex-wrap gap-1">
            <p>Assignee ${item.assignee}</p>
            <p>UpdatedAt: ${item.updatedAt.split("T")[0]}</p>
          </div>
        </div>
      </div>
    `;

    issuesCard.append(card);

    // console.log(item.status);
    if (item.status === "open") {
      // console.log("k");
    }
    if (item.status === "open") {
      // console.log("blog");
    }
  });
};

const fetchIssueDetails = async (issueId) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}
`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    renderIssueModal(data.data);
  } catch (error) {
    console.error("Failed to fetch issues:", error);
  }
};

const renderIssueModal = (details) => {
  // console.log(details);
  modal.innerHTML = `
    <div
        class="modal-box max-w-3xl p-8 md:p-10 bg-white rounded-3xl shadow-2xl"
      >
        <!-- modal header  close button -->
        <div class="flex justify-between items-start mb-6">
          <h3
            class="text-2xl md:text-3xl font-bold text-green-700 tracking-tight"
            id="modalTitle"
          >
            issues tracker details
          </h3>
          <button
            class="btn btn-sm btn-circle btn-ghost hover:bg-gray-200 transition-colors duration-200"
            onclick="document.getElementById('issue_modal').close()"
          >
            ✕
          </button>
        </div>

        <!-- issue  details -->
        <div class="space-y-3">
          <h3
            class="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-snug"
          >
            ${details.title}
          </h3>

          <div
            class="flex flex-wrap items-center gap-3 text-slate-500 font-medium text-sm md:text-base"
          >
            <span
              class="badge badge-success gap-2 px-4 py-2 text-white border-none"
            >
              Opened
            </span>
            <span
              >• Opened by
              <span class="text-slate-700 font-semibold"
                >Md Kausar Ali</span
              ></span
            >
            <span>• 22/02/2026</span>
          </div>
        </div>

        <!-- issue tags -->
        <div class="flex flex-wrap gap-3 mt-6">
          <div
            class="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-500 border border-red-100 rounded-md text-xs font-bold"
          >
            <span>🐞</span> BUG
          </div>
          <div
            class="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-500 border border-orange-100 rounded-md text-xs font-bold"
          >
            <span>⚙️</span> HELP WANTED
          </div>
        </div>

        <!-- description -->
        <div class="mt-8">
          <p class="text-slate-500 text-base md:text-lg leading-relaxed">
            The navigation menu doesn't collapse properly on mobile devices.
            Need to fix the responsive behavior.
          </p>
        </div>

        <!-- priority details -->
        <div
          class="mt-10 bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-slate-100 gap-4 md:gap-0"
        >
          <div class="space-y-1">
            <p class="text-slate-400 text-sm font-medium">Assignee:</p>
            <p class="text-slate-800 text-lg md:text-xl font-bold">
              Md Kausar Ali
            </p>
          </div>

          <div class="space-y-1 text-left md:text-right">
            <p class="text-slate-400 text-sm font-medium">Priority:</p>
            <span
              class="badge bg-red-500 border-none text-white font-bold px-6 py-3 md:py-4 text-sm md:text-base"
            >
              HIGH
            </span>
          </div>
          <div></div>
        </div>

        <!-- close button -->
        <div class="modal-action mt-8">
          <form method="dialog">
            <button
              class="btn btn-primary px-12 md:px-16 normal-case text-lg shadow-lg"
            >
              Close
            </button>
          </form>
        </div>
      </div>

      <!-- modal-backdrop -->
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
  `;
  modal.showModal();
};

fetchIssues();

/* 
assignee: "jane_smith";
author: "john_doe";
createdAt: "2024-01-15T10:30:00Z";
description: "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.";
id: 1;
labels: (2)[("bug", "help wanted")];
priority: "high";
status: "open";
title: "Fix navigation menu on mobile devices";
updatedAt: "2024-01-15T10:30:00Z";
 */
