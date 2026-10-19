// ===== 加载界面 =====
(function() {
  const loader = document.getElementById("loader");
  let ok = 0;
  function one() { if (++ok === 2) done(); }
  function done() {
    loader.classList.add("hide");
    setTimeout(() => loader.remove(), 500);
  }
  const bg = document.getElementById("bgVideo");
  bg.addEventListener("canplay", one);
  bg.addEventListener("error", one);
  const avatar = new Image();
  avatar.addEventListener("load", one);
  avatar.addEventListener("error", one);
  avatar.src = "img/头像.jpg";
  setTimeout(done, 4000);
})();

// ===== 文章数据来自 posts.js，这里只做分页 =====
const PER_PAGE = 4;
const totalPages = Math.ceil(articles.length / PER_PAGE);
let currentPage = 0;

const $posts = document.getElementById("posts");
const $pageInfo = document.getElementById("pageInfo");
const $prev = document.getElementById("prevPage");
const $next = document.getElementById("nextPage");

function renderPage() {
  const start = currentPage * PER_PAGE;
  const slice = articles.slice(start, start + PER_PAGE);
  $posts.innerHTML = slice.map((a, i) => `
    <article class="post" data-post="${start + i}"${a.color ? ` style="color:${a.color}"` : ""}>
      <div class="post-body">
        <div class="post-text">
          <div class="date">${a.date}</div>
          <h3>${a.title}</h3>
          <p>${a.excerpt}</p>
        </div>
        ${a.img ? `<img class="post-img" src="${a.img}" alt="" />` : ""}
      </div>
    </article>
  `).join("");
  $pageInfo.textContent = "PAGE " + (currentPage + 1) + " / " + totalPages;
  $prev.disabled = currentPage === 0;
  $next.disabled = currentPage === totalPages - 1;

  $posts.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { duration: 300, easing: "ease", fill: "both" }
  );

  $posts.querySelectorAll(".post").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("hover-main"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("hover-main"));
    el.addEventListener("click", () => {
      const i = Number(el.dataset.post);
      showModal(articles[i]);
    });
  });
}
$prev.addEventListener("click", () => {
  if (currentPage > 0) { currentPage--; renderPage(); }
});
$next.addEventListener("click", () => {
  if (currentPage < totalPages - 1) { currentPage++; renderPage(); }
});
renderPage();

// ===== 文章弹出窗口 =====
function showModal(a) {
  let $modal = document.getElementById("postModal");
  if (!$modal) {
    $modal = document.createElement("div");
    $modal.id = "postModal";
    $modal.className = "modal";
    $modal.innerHTML = `
      <div class="modal-bg"></div>
      <div class="modal-win">
        <div class="modal-inner">
          <h2 class="modal-title"></h2>
          <div class="modal-date"></div>
          <div class="modal-body"></div>
          <img class="modal-img" src="" alt="" style="display:none" />
        </div>
      </div>`;
    document.body.appendChild($modal);
    $modal.querySelector(".modal-bg").addEventListener("click", () => $modal.classList.remove("show"));
  }
  $modal.querySelector(".modal-title").textContent = a.title;
  $modal.querySelector(".modal-date").textContent = a.date;
  const body = a.content ? marked.parse(a.content) : a.excerpt.replace(/\n/g, "<br>");
  $modal.querySelector(".modal-body").innerHTML = body;
  const $img = $modal.querySelector(".modal-img");
  if (a.img) { $img.src = a.img; $img.style.display = ""; }
  else { $img.style.display = "none"; }
  $modal.style.color = a.color || "#fff";
  $modal.classList.toggle("show");
}

// ===== 头像点击重播动画 =====
document.querySelector(".intro-avatar-wrap").addEventListener("click", () => {
  const mask = document.querySelector("#am");
  const old = mask.querySelector("polyline");
  if (!old) return;
  const clone = old.cloneNode(true);
  mask.replaceChild(clone, old);
});
