function resolveLink(target) {
  const inPartials = location.pathname.includes("/partials/");
  if (inPartials) {
    if (target === "index.html") return "../index.html";
    return target;
  }

  if (target === "index.html") return "index.html";
  return `partials/${target}`;
}

function markActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  const key = path.startsWith("tin-") ? "tin-tuc.html" : path;

  const map = {
    "index.html": ".nav-item-home",
    "gioi-thieu.html": ".nav-item-about",
    "co-cau-to-chuc.html": ".nav-item-org",
    "dat-lich-kham.html": ".nav-item-book",
    "doi-ngu-bac-si.html": ".nav-item-doctors",
    "tin-tuc.html": ".nav-item-news",
    "ket-qua-xet-nghiem.html": ".nav-item-results",
  };

  const selector = map[key];
  if (!selector) return;

  document.querySelectorAll(".main-nav li").forEach((li) => {
    li.classList.remove("active");
  });

  const activeLi = document.querySelector(selector);
  if (activeLi) activeLi.classList.add("active");
}

function wireNavLinks() {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    const target = el.getAttribute("data-nav");
    if (!target) return;
    el.setAttribute("href", resolveLink(target));
  });

  const searchForm = document.querySelector("[data-search-form]");
  if (searchForm) {
    searchForm.setAttribute("action", resolveLink("search.html"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll("[data-include]");

  containers.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    if (!file) return;

    try {
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;

      if (file.includes("header.html")) {
        wireNavLinks();
        markActiveNav();
      }

      if (file.includes("footer.html")) {
        wireNavLinks();
      }

      if (file.includes("chat.html") && typeof initChatWidget === "function") {
        initChatWidget();
      }
    } catch (err) {
      console.error("Khong load duoc", file, err);
    }
  });
});
