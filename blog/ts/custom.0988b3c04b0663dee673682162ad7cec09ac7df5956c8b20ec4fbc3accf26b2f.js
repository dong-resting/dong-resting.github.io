(() => {
  // <stdin>
  function siteIsDark() {
    return document.documentElement.dataset.scheme === "dark";
  }
  function initCodeTheme() {
    const blocks = document.querySelectorAll(".article-content .highlight");
    blocks.forEach((block) => {
      if (block.querySelector(".codeThemeButton")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "codeThemeButton";
      btn.textContent = siteIsDark() ? "\u6D45\u8272" : "\u6DF1\u8272";
      btn.title = "\u5207\u6362\u8FD9\u4E2A\u4EE3\u7801\u5757\u7684\u914D\u8272";
      block.appendChild(btn);
      btn.addEventListener("click", () => {
        const explicitLight = block.classList.contains("code-light");
        const explicitDark = block.classList.contains("code-dark");
        const effectiveLight = explicitLight || !explicitDark && !siteIsDark();
        block.classList.toggle("code-light", !effectiveLight);
        block.classList.toggle("code-dark", effectiveLight);
        btn.textContent = effectiveLight ? "\u6DF1\u8272" : "\u6D45\u8272";
      });
    });
  }
  window.addEventListener("load", () => {
    setTimeout(initCodeTheme, 60);
  });
})();
