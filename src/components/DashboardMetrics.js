// Student Dashboard analytics metrics component
export function renderDashboardMetrics(user) {
  return `
    <div class="metrics-row">
      <div class="metric-card">
        <div class="metric-icon-wrapper" style="background: #E0F2FE; color: #0284C7;"><i class="fa-solid fa-clock"></i></div>
        <div>
          <div class="metric-val">${user.completedHours} hrs</div>
          <div class="metric-lbl">Weekly Watch & Learn Time</div>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon-wrapper" style="background: #FEF3C7; color: #D97706;"><i class="fa-solid fa-fire"></i></div>
        <div>
          <div class="metric-val">${user.streakDays} Days</div>
          <div class="metric-lbl">Active Daily Learning Streak</div>
        </div>
      </div>
    </div>
  `;
}
