const issuesCard = document.getElementById("issues-card-list");

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
    console.log();
    const card = document.createElement("div");
    card.className =
      "card bg-white border border-slate-200 hover:shadow-md transition-shadow rounded-xl cursor-pointer";
    // card.onclick = "issue_modal.showModal()";
    card.innerHTML = `
      <div class="h-1  rounded-t-xl ${item.status === "open" ? "bg-emerald-400" : "bg-purple-600"}"></div>
      <div class="p-4 space-y-3">
        <div class="flex justify-between items-start">
          <img
            src="${item.status === "open" ? "./assets/open-status.png" : "./assets/closed-status.png"}"
            alt="${item.status}-status"
            class="w-6 h-6"
          />
          <span class="badge bg-red-50 text-red-400 border-none font-bold py-2 px-3 text-sm">
            ${item.priority}
          </span>
        </div>

        <h3 class="text-slate-800 font-bold leading-snug">
          ${item.title}
        </h3>
        <p class="text-xs text-slate-500 line-clamp-2">
          ${item.description}
        </p>

        <div class="flex gap-2">
          <span class="badge badge-outline border-red-200 text-red-400 text-[10px] font-bold">
            🐞 BUG
          </span>
          <span class="badge badge-outline border-orange-200 text-orange-400 text-[10px] font-bold">
            ⚙️ HELP WANTED
          </span>
        </div>

        <div class="border-t pt-2 mt-2 text-[11px] text-slate-400 space-y-1">
          <p>#1 by ${item.author}</p>
          <p>${item.createdAt.split("T")[0]}</p>
        </div>
      </div>
    `;

    issuesCard.append(card);
  });
};

fetchIssues();
