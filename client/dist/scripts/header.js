// public/scripts/header.js
const header = document.querySelector("header");

// Add logo
const logoImg = document.createElement("img");
logoImg.src = "/logo.png";
logoImg.alt = "Unearthed Logo";
logoImg.width = 120;

const title = document.createElement("h1");
title.textContent = "Unearthed Gifts";

header.appendChild(logoImg);
header.appendChild(title);
