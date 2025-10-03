import { getBosses, getBossBySlug } from "./fetchData.js";

async function displayBosses() {
  const bosses = await getBosses();
  const container = document.getElementById("bosses-container");
  if (!container) return;
  container.innerHTML = bosses.map(b => `
    <article class="boss-card">
      <img src="${b.image_url}" alt="${b.title}" />
      <h2>${b.title}</h2>
      <p>${b.description.substring(0, 100)}...</p>
      <span class="difficulty ${b.difficulty.toLowerCase()}">${b.difficulty}</span>
      <a href="#/boss/${b.slug}">View Details</a>
    </article>
  `).join("");
}

async function displayBossDetail(slug) {
  const boss = await getBossBySlug(slug);
  const detailView = document.getElementById("detail-view");
  const listView = document.getElementById("list-view");
  const detailContainer = document.getElementById("boss-detail");
  if (!boss) {
    detailContainer.innerHTML = "<p>Boss not found!</p>";
  } else {
    detailContainer.innerHTML = `
      <article class="boss-detail">
        <img src="${boss.image_url}" alt="${boss.title}" />
        <h1>${boss.title}</h1>
        <span class="difficulty ${boss.difficulty.toLowerCase()}">${boss.difficulty}</span>
        <p>${boss.description}</p>
        <details>
          <summary>Lore (Spoiler)</summary>
          <p>${boss.lore}</p>
        </details>
      </article>
    `;
  }
  listView.style.display = "none";
  detailView.style.display = "block";
}

function handleRouting() {
  const hash = window.location.hash;
  if (hash.startsWith("#/boss/")) {
    const slug = hash.split("/")[2];
    displayBossDetail(slug);
  } else {
    displayBosses();
    document.getElementById("detail-view").style.display = "none";
    document.getElementById("list-view").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  handleRouting();
  window.addEventListener("hashchange", handleRouting);
  const backBtn = document.getElementById("back-to-list");
  if (backBtn) backBtn.addEventListener("click", () => window.location.hash = "");
});

displayBosses();  // Initial list load