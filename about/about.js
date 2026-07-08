// ===== 章节滚动入场动画 =====
const chapters = document.querySelectorAll(".chapter");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in-view");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
chapters.forEach(c => io.observe(c));

// ===== 滚动进度条 =====
const progress = document.getElementById("scrollProgress");
function updateProgress() {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const total = h.scrollHeight - h.clientHeight;
  progress.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
