const levelColors = {
  high: "bg-red-500",
  medium: "bg-purple-500",
  low: "bg-yellow-500",
};

const tagsStyling = {
  documentation: { icon: "fa fa-facebook", style: "bg-purple-500" },
  "good first issue": { icon: "fa fa-book", style: "bg-green-500" },
  bug: { icon: "fa fa-bug", style: "bg-yellow-500" },
};

const apiData = {
  priority: "low",
  tags: ["documentation", "bug"],
};

const html = `
        <p class="${levelColors[apiData.priority]}"></p>
        ${apiData.tags.map((tag) => {
          return `
                        <button class="${tagsStyling[tag].style} ">${tagsStyling[tag].icon} ${tag}</button>
                `;
        })}
`;
console.log(html);
