const issuesCard = document.getElementById("issues-card-list");
const modal = document.getElementById("issue_modal");

const fetchIssues = async () => {
  // api ke fetch diye json korlam..
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data);
  renderIssues(data.data);
};

const renderIssues = (items) => {
  // console.log(items);

  issuesCard.innerHTML = "";

  items.forEach((item) => {
    console.log(item);
    // console.log(item.labels);
    const card = document.createElement("div");

    card.className =
      "card bg-white border border-slate-200 rounded-xl cursor-pointer shadow-sm transition-transform duration-150 hover:scale-105 hover:shadow-lg";

    card.innerHTML = `
      <div class="h-1  rounded-t-xl ${item.status === "open" ? "bg-emerald-400" : "bg-purple-600"}"></div>

      <div class="p-4 space-y-3">
        <div class="flex justify-between items-start">
          <img
            src="${item.status === "open" ? "./assets/open-status.png" : "./assets/closed-status.png"}"
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
  });
};

fetchIssues();
