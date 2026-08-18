// Component for rendering vertical scrolling video reels with Learn Overlay
export function renderReelComponent(reel, isLiked, onLike, onSave, onAnalyze, onTryCode) {
  const reelEl = document.createElement("div");
  reelEl.className = "reel-card";
  reelEl.id = `reel-card-${reel.id}`;

  reelEl.innerHTML = `
    <video class="reel-video-element" poster="${reel.poster}" playsinline loop muted>
      <source src="${reel.videoUrl}" type="video/mp4">
    </video>

    <div class="reel-overlay-top">
      <span class="category-tag"><i class="fa-solid fa-tag"></i> ${reel.category}</span>
      <span class="ai-match-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> ${reel.aiMatchScore}% AI Match</span>
    </div>

    <div style="position: absolute; top: 4.5rem; left: 1rem; right: 1rem; z-index: 10; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); border: 1px solid rgba(56, 189, 248, 0.4); padding: 0.6rem 0.9rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; color: white;">
      <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.82rem;">
        <i class="fa-solid fa-lightbulb" style="color: var(--warning);"></i>
        <div>
          <div style="font-weight: 800; color: #7DD3FC; font-size: 0.75rem;">WHILE SCROLLING CONCEPT</div>
          <div style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">${reel.keyTakeaways[0]}</div>
        </div>
      </div>
      <button class="try-code-btn" style="background: var(--primary); border: none; color: white; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.7rem; border-radius: var(--radius-full); cursor: pointer;">
        <i class="fa-solid fa-code"></i> Try Code
      </button>
    </div>

    <div class="reel-actions-side">
      <button class="action-btn-icon ${isLiked ? 'active' : ''}">
        <i class="fa-solid fa-heart"></i>
      </button>
      <button class="action-btn-icon btn-analyze"><i class="fa-solid fa-chart-pie"></i></button>
      <button class="action-btn-icon btn-save"><i class="fa-solid fa-bookmark"></i></button>
    </div>

    <div class="reel-overlay-bottom">
      <div class="creator-bar">
        <img class="creator-avatar" src="${reel.creatorAvatar}" alt="${reel.creator}">
        <span class="creator-name">${reel.creator}</span>
      </div>
      <div class="reel-title-text">${reel.title}</div>
    </div>
  `;

  const tryCodeBtn = reelEl.querySelector(".try-code-btn");
  if (tryCodeBtn && onTryCode) tryCodeBtn.onclick = () => onTryCode(reel);

  return reelEl;
}
