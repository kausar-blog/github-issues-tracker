const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");

const loaderSpinner = document.getElementById("loader-spinner");
const issuesCard = document.getElementById("issues-card-list");
const btnNewIssue = document.getElementById("btnNewIssue");
const searchInput = document.getElementById("searchInput");

let currentStatus = "all";

const issuesOpenClosed = document.getElementById("issues-open-closed");
const totalCard = document.getElementById("total-card");
const modal = document.getElementById("issue_modal");

// active button kora lagbe.. tai amake DRY kora jabe na.. ekta idea ache.. all button ke ekta array te niye kaj kora.. taile khub ease...

// all button array te niyechi
const buttons = [btnAll, btnOpen, btnClosed];

// active button function
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

// spinner
const showLoader = () => loaderSpinner.classList.remove("hidden");
const hideLoader = () => loaderSpinner.classList.add("hidden");

// date years convert
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// total card count
const updateTotalCard = () => {
  const visibleCards = document.querySelectorAll("#issues-card-list .card");
  let count = 0;
  visibleCards.forEach((card) => {
    if (card.style.display !== "none") count++;
  });
  totalCard.innerText = count;
};

// filter cards ..
const filterCards = (status) => {
  const cards = document.querySelectorAll("#issues-card-list .card");

  cards.forEach((card) => {
    // card.style.display='block'

    if (status === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.dataset.status === status ? "block" : "none";
    }
  });

  updateTotalCard();
};

// all button addEventListener diye call korsi filter korsi
btnAll.addEventListener("click", () => {
  setActiveButton(btnAll);
  currentStatus = "all";
  filterCards("all");
});
btnOpen.addEventListener("click", () => {
  setActiveButton(btnOpen);
  currentStatus = "open";
  filterCards("open");
});
btnClosed.addEventListener("click", () => {
  setActiveButton(btnClosed);
  currentStatus = "closed";
  filterCards("closed");
});

// label style for object
const labelStyles = {
  bug: {
    style: "bg-red-50 text-red-600 border-red-400",
    icon: "fa-solid fa-bug",
    text: "BUG",
  },

  "help wanted": {
    style: "bg-yellow-50 text-yellow-600 border-yellow-400",
    icon: "fa-solid fa-earth-americas",
    text: "HELP WANTED",
  },

  enhancement: {
    style: "bg-blue-50 text-blue-600 border-blue-400",
    icon: "fa-solid fa-wand-magic-sparkles",
    text: "ENHANCEMENT",
  },

  "good first issue": {
    style: "bg-green-50 text-green-600 border-green-400",
    icon: "fa-solid fa-seedling",
    text: "GOOD FIRST ISSUE",
  },

  documentation: {
    style: "bg-purple-50 text-purple-600 border-purple-400",
    icon: "fa-solid fa-book",
    text: "DOCUMENTATION",
  },

  default: {
    style: "bg-gray-100 text-gray-700 border-gray-400",
    icon: "fa-solid fa-tag",
  },
};

// label function
const labelsGenerates = (labels, size = "normal") => {
  return labels
    .map((label) => {
      const infoLabel = labelStyles[label] || labelStyles.default;
      return `<span class=" badge badge-outline font-bold flex items-center gap-1 ${size === "small" ? "text-[10px]" : ""}${infoLabel.style}">
      <i class="${infoLabel.icon}"></i>
      ${infoLabel.text || label}
    </span>`;
    })
    .join("");
};

// fetch issues for all
const fetchIssues = async () => {
  // api ke fetch diye json korlam..
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  try {
    showLoader();
    issuesCard.innerHTML = "";

    const res = await fetch(url);

    if (!res.ok) throw new Error("Could not fetch resource ok!");

    const data = await res.json();
    // console.log(data.data);
    // allIssues = data.data;
    renderIssues(data.data);
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    issuesCard.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">Failed to load issues</p>`;
  }
  hideLoader();
};

// render issues
const renderIssues = (items) => {
  // console.log(items);
  issuesCard.innerHTML = "";
  // totalCard e items er length dilam
  // totalCard.innerHTML = items.length;

  items.forEach((item) => {
    // console.log(item);
    // console.log(item.labels);
    const card = document.createElement("div");

    // filter er jnro dataset diye .. all  card niye gesi...
    card.dataset.status = item.status;

    card.className =
      "card bg-white border border-slate-200 rounded-xl cursor-pointer shadow-sm transition-transform duration-150 hover:scale-105 hover:shadow-lg";

    // console.log(item.status);

    // card.innerHTML e onk somoy lagbe... if else color change etc te... tai ternary operator used korsi.. onk jaigai

    card.innerHTML = `
      <div class="h-1  rounded-t-xl ${item.status === "open" ? "bg-emerald-400" : "bg-purple-600"}"></div>

      <div class="p-4 space-y-3">
        <div class="flex justify-between items-start">
          <img
            src="${item.status === "open" ? "./assets/Open-Status.png" : "./assets/closed-status.png"}"
            alt="${item.status}-status"
            
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
          ${labelsGenerates(item.labels, "small")}
        </div>

        <div class=" border-t pt-2 mt-2  text-slate-400 space-y-1">
          <div class="flex justify-between flex-wrap gap-1">
            <p>#${item.id} by ${item.author}</p>
            <p>${formatDate(item.createdAt)}</p>
          </div>
          <div class="flex justify-between flex-wrap gap-1">
            <p>Assignee ${item.assignee}</p>
            <p>UpdatedAt: ${formatDate(item.updatedAt)}</p>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      fetchIssueDetails(item.id);
    });

    issuesCard.append(card);
  });

  filterCards(currentStatus);
  // updateTotalCard();
};

// fetch issues details
const fetchIssueDetails = async (issueId) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}
`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Could not fetch resource ok!");
    }

    const data = await res.json();
    // console.log(data.data);
    renderIssueModal(data.data);
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    modal.innerHTML = `<p class="text-center text-gray-500 py-10">Failed to load details</p>`;
  }
};

// render modal
const renderIssueModal = (details) => {
  // console.log(details.title);

  modal.innerHTML = `
    <div class="modal-box p-0 md:p-0 max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

      <div class="h-1.5   ${details.status === "open" ? "bg-emerald-400" : "bg-purple-600"}"></div>

      <div class="p-8 md:p-10">

        <!-- modal header  close button -->
        <div class="flex justify-between items-start mb-6">
          <h3
            class="text-2xl md:text-3xl font-bold  tracking-tight ${details.status === "open" ? "text-emerald-400" : "text-purple-600"}""
            id="modalTitle"
          >
            Issues Tracker Details
          </h3>
          <button class="btn btn-sm btn-circle btn-ghost transition-colors duration-200 ${details.status === "open" ? "text-emerald-600 hover:bg-emerald-100" : "text-purple-600 hover:bg-purple-100"}"  onclick="document.getElementById('issue_modal').close()"> 
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
              class="badge gap-2 px-4 py-2  text-white border-none ${details.status === "open" ? "bg-emerald-700" : "bg-purple-700"}"
            >
             ${details.status === "open" ? "opened" : details.status}
            </span>
            <span
              >• Opened by
              <span class="text-slate-700 font-semibold"
                >${details.assignee.toUpperCase()}</span
              ></span
            >
            <span>• ${formatDate(details.createdAt)}</span>
          </div>
        </div>

        <!-- issue tags -->
        <div class="flex flex-wrap gap-3 mt-6">
            ${labelsGenerates(details.labels)}
        </div>

        <!-- description -->
        <div class="mt-8">
          <p class="text-slate-500 text-base md:text-lg leading-relaxed">
            ${details.description}
          </p>
        </div>

        <!-- priority details -->
        <div
          class="mt-10 bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-slate-100 gap-4 md:gap-0"
        >
          <div class="space-y-1">
            <p class="text-slate-400 text-sm font-medium">Assignee:</p>
            <p class="text-slate-800 text-lg md:text-xl font-bold">
             ${details.assignee.toUpperCase()}
            </p>
          </div>

          <div class="space-y-1 text-left md:text-right">
            <p class="text-slate-400 text-sm font-medium">Priority:</p>
            
            <span class="badge  border-none font-bold py-3 px-6 md:py-4 text-sm md:text-base ${details.priority === "high" ? "bg-red-50 text-red-500" : details.priority === "medium" ? "bg-yellow-50 text-yellow-500" : "bg-gray-300 text-gray-700"} ">
            ${details.priority.toUpperCase()}
          </span>
          </div>
          <div></div>
        </div>

        <!-- close button -->
        <div class="modal-action mt-8">
          <form method="dialog">
            <button class="btn px-12 md:px-16 normal-case text-lg shadow-lg ${details.status === "open" ? "bg-green-500 hover:bg-green-600" : "bg-purple-500 hover:bg-purple-600"}" >
              Close
            </button>
          </form>
        </div>
         
      </div>
    </div>

      <!-- modal-backdrop -->
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
  `;
  modal.showModal();
};

// fetch issues search api
const fetchIssuesBySearch = async (title) => {
  // console.log(title);
  // issuesCard.innerHTML = "";

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${title}`;

  try {
    showLoader();

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Could not fetch resource ok!");
    }

    const data = await res.json();
    // console.log(data.data);

    renderIssues(data.data);
    // filterCards(currentStatus);
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    issuesCard.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No results found</p>`;
  }
  hideLoader();
};

// search events for keyboard enter click
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btnNewIssue.click();
  }
});

btnNewIssue.addEventListener("click", () => {
  const input = searchInput.value.trim().toLowerCase();

  setActiveButton(btnAll);
  currentStatus = "all";

  if (!input) {
    alert("Please enter search text");
    fetchIssues();
    return;
  }

  fetchIssuesBySearch(input);
});

fetchIssues();
