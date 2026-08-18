// Student Interest Profile preference component
export function renderInterestCardComponent(interest, index, onWeightChange) {
  return `
    <div class="interest-card selected">
      <div class="interest-header">
        <div class="interest-icon-box">
          <i class="fa-solid ${interest.icon}"></i>
        </div>
        <span style="font-weight: 800; font-size: 1.1rem; color: var(--primary);">${interest.weight}%</span>
      </div>
      <div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--dark-slate);">${interest.name}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Adjust weight to prioritize ${interest.name} reels in feed.</p>
      </div>
      <input type="range" class="weight-slider" min="0" max="100" value="${interest.weight}">
    </div>
  `;
}
