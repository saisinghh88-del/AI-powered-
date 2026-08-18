// Core Application Logic: Router, Reels Snap-Scroll Player, Learn Panel updates, Auth, Interest Profile, Dashboard

let currentUser = { ...INITIAL_USER };
let currentReels = [...REELS_DATA];
let activeReelIndex = 0;
let activeCategoryFilter = "All";

document.addEventListener("DOMContentLoaded", () => {
  // Enforce mandatory login before seeing content
  if (!currentUser.isLoggedIn) {
    switchTab('auth-page');
    showToast("Please sign in to access TechReel AI features!");
  } else {
    initApp();
  }
});

function initApp() {
  renderReelsFeed();
  renderMiniReelsCarousel();
  renderInterestProfile();
  renderRecommendations();
  renderAiBotConversions();
  renderDashboard();
  renderAnalysisPage(currentReels[0]);
}

// Navigation Router Function with Strict Login Guard
function switchTab(pageId) {
  // MUST LOGIN BEFORE ANYTHING TO USE THIS SITE
  if (!currentUser.isLoggedIn && pageId !== 'auth-page') {
    showToast("Must login before accessing website features!");
    pageId = 'auth-page';
  }

  const pages = document.querySelectorAll(".page-container");
  const navBtns = document.querySelectorAll(".nav-btn");

  pages.forEach(p => p.classList.remove("active"));
  navBtns.forEach(b => b.classList.remove("active"));

  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.classList.add("active");

  const btnMap = {
    "feed-page": "btn-feed",
    "analysis-page": "btn-analysis",
    "recs-page": "btn-recs",
    "compiler-page": "btn-compiler",
    "interests-page": "btn-interests",
    "dashboard-page": "btn-dashboard"
  };

  if (btnMap[pageId]) {
    const btn = document.getElementById(btnMap[pageId]);
    if (btn) btn.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----------------------------------------------------
// LIVE CODE COMPILER LOGIC
// ----------------------------------------------------
let activeCompilerLang = "javascript";

const COMPILER_TEMPLATES = {
  javascript: `// JavaScript Code Playground
function calculateNeuralWeight(inputs, weights) {
  let sum = 0;
  for (let i = 0; i < inputs.length; i++) {
    sum += inputs[i] * weights[i];
  }
  const activation = 1 / (1 + Math.exp(-sum)); // Sigmoid
  console.log("Input Dot Product:", sum);
  console.log("Neuron Output Probability:", activation.toFixed(4));
  return activation;
}

calculateNeuralWeight([0.5, 0.8, 0.2], [0.9, -0.4, 0.6]);`,

  python: `# Python Simulated Interpreter
def guard_clause_example(user_role, is_authenticated):
    if not is_authenticated:
        print("[Security Warning] User not authenticated!")
        return "401 Unauthorized"
        
    if user_role != "admin":
        print("[Security Warning] Requires admin role!")
        return "403 Forbidden"
        
    print("[Success] Welcome to Student Admin Portal!")
    return "200 OK"

status = guard_clause_example("admin", True)
print("Execution Result:", status)`,

  html: `<!-- HTML / CSS Live Visual Preview -->
<div style="font-family: sans-serif; background: #0066FF; color: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,102,255,0.4);">
  <h2 style="margin: 0 0 10px 0;">⚡ TechReel Live Web Sandbox</h2>
  <p style="margin: 0; opacity: 0.9;">Edit code on the left to see instant visual changes here!</p>
  <button style="margin-top: 15px; background: white; color: #0066FF; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer;">
    Interactive Button
  </button>
</div>`,

  cpp: `// C++ Simulated Algorithm
#include <iostream>
#include <vector>
#include <cmath>

int main() {
    float normalX = 0.707, normalY = 0.707;
    float lightX = 0.0, lightY = 1.0;
    
    // Dot Product calculation
    float NdotL = (normalX * lightX) + (normalY * lightY);
    std::cout << "Fragment Normal Dot Light: " << NdotL << std::endl;
    std::cout << "Diffuse Brightness: " << (NdotL * 100.0) << "%" << std::endl;
    return 0;
}`
};

function selectCompilerLanguage(lang) {
  activeCompilerLang = lang;
  
  // Highlight language button
  const btns = ["js", "py", "html", "cpp"];
  btns.forEach(b => {
    const btnEl = document.getElementById(`lang-btn-${b}`);
    if (btnEl) btnEl.classList.remove("active");
  });

  const langMap = { javascript: "js", python: "py", html: "html", cpp: "cpp" };
  const activeBtn = document.getElementById(`lang-btn-${langMap[lang]}`);
  if (activeBtn) activeBtn.classList.add("active");

  const label = document.getElementById("current-lang-label");
  if (label) label.innerText = lang.toUpperCase();

  const editor = document.getElementById("compiler-editor");
  if (editor && COMPILER_TEMPLATES[lang]) {
    editor.value = COMPILER_TEMPLATES[lang];
  }
  
  clearCompilerConsole();
}

function resetCompilerTemplate() {
  selectCompilerLanguage(activeCompilerLang);
  showToast(`Reset ${activeCompilerLang.toUpperCase()} code editor.`);
}

function clearCompilerConsole() {
  const consoleOut = document.getElementById("compiler-console-output");
  if (consoleOut) consoleOut.innerHTML = `// Console cleared. Ready to execute ${activeCompilerLang.toUpperCase()}...`;
}

function openCurrentReelInCompiler() {
  const codeBox = document.getElementById("learn-code-box");
  const codeText = codeBox ? codeBox.innerText : "";

  selectCompilerLanguage("javascript");
  const editor = document.getElementById("compiler-editor");
  if (editor) editor.value = codeText;

  switchTab("compiler-page");
  showToast("Loaded reel code into Live Compiler!");
}

function runCodeInCompiler() {
  const editor = document.getElementById("compiler-editor");
  const consoleOut = document.getElementById("compiler-console-output");
  if (!editor || !consoleOut) return;

  const code = editor.value.trim();
  consoleOut.innerHTML = "";

  if (activeCompilerLang === "html") {
    consoleOut.innerHTML = `<div style="background: white; border-radius: 8px; padding: 10px; color: black;">${code}</div>`;
    showToast("HTML rendered live below!");
    return;
  }

  if (activeCompilerLang === "javascript") {
    let logs = [];
    const originalLog = console.log;
    console.log = function(...args) {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
      originalLog.apply(console, args);
    };

    try {
      const startTime = performance.now();
      const result = eval(code);
      const endTime = performance.now();
      
      console.log = originalLog;

      let outputHTML = `<span style="color: var(--success); font-weight: 700;">[Process Executed Successfully in ${(endTime - startTime).toFixed(2)}ms]</span>\n\n`;
      if (logs.length > 0) {
        outputHTML += `<strong>Standard Output (console.log):</strong>\n` + logs.map(l => `> ${l}`).join('\n') + `\n\n`;
      }
      if (result !== undefined) {
        outputHTML += `<strong>Return Value:</strong> ${typeof result === 'object' ? JSON.stringify(result) : result}`;
      }
      consoleOut.innerHTML = outputHTML;
      
      currentUser.points += 20;
      renderDashboard();
      showToast("Code executed successfully! +20 XP");
    } catch (err) {
      console.log = originalLog;
      consoleOut.innerHTML = `<span style="color: var(--danger); font-weight: 700;">[Runtime Error]</span>\n<span style="color: #F87171;">${err.name}: ${err.message}</span>\n\nCheck line syntax and variables.`;
    }
  } else if (activeCompilerLang === "python") {
    // Simulated Python execution output
    const lines = code.split('\n');
    let simulatedLogs = [];
    lines.forEach(line => {
      if (line.includes("print(")) {
        const content = line.substring(line.indexOf("print(") + 6, line.lastIndexOf(")"));
        simulatedLogs.push(content.replace(/["']/g, ''));
      }
    });
    let outputHTML = `<span style="color: #38BDF8; font-weight: 700;">[Python 3.11 Interpreter - Executed]</span>\n\n`;
    outputHTML += `<strong>Console Output:</strong>\n` + (simulatedLogs.length > 0 ? simulatedLogs.map(l => `> ${l}`).join('\n') : `> Script finished with exit code 0`);
    consoleOut.innerHTML = outputHTML;
    showToast("Python script executed!");
  } else if (activeCompilerLang === "cpp") {
    // Simulated C++ compilation & execution
    let outputHTML = `<span style="color: #A7F3D0; font-weight: 700;">[g++ main.cpp -o main && ./main]</span>\n\n`;
    outputHTML += `<strong>stdout:</strong>\n> Fragment Normal Dot Light: 0.707\n> Diffuse Brightness: 70.7%\n\n<span style="color: #94A3B8;">Process terminated with status 0 (0x0)</span>`;
    consoleOut.innerHTML = outputHTML;
    showToast("C++ binary executed successfully!");
  }
}

// Render Vertical Snap-Scrolling Reels Feed
function renderReelsFeed() {
  const container = document.getElementById("reels-container");
  if (!container) return;

  container.innerHTML = "";

  const filtered = activeCategoryFilter === "All"
    ? currentReels
    : currentReels.filter(r => r.category.toLowerCase() === activeCategoryFilter.toLowerCase() || r.tags.includes(activeCategoryFilter.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="color: white; padding: 3rem; text-align: center;">
        <i class="fa-solid fa-film" style="font-size: 3rem; color: var(--secondary); margin-bottom: 1rem;"></i>
        <h3>No Reels found for ${activeCategoryFilter}</h3>
        <p style="color: #94A3B8; font-size: 0.9rem;">Select another category or reset filters.</p>
      </div>`;
    return;
  }

  filtered.forEach((reel, idx) => {
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

      <!-- Live Floating Concept Pill on Reel Scroll -->
      <div style="position: absolute; top: 4.5rem; left: 1rem; right: 1rem; z-index: 10; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); border: 1px solid rgba(56, 189, 248, 0.4); padding: 0.6rem 0.9rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.3); animation: fadeIn 0.4s ease;">
        <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.82rem;">
          <i class="fa-solid fa-lightbulb" style="color: var(--warning); font-size: 1rem;"></i>
          <div>
            <div style="font-weight: 800; color: #7DD3FC; font-size: 0.75rem;">WHILE SCROLLING CONCEPT</div>
            <div style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">${reel.keyTakeaways[0]}</div>
          </div>
        </div>
        <button onclick="openCurrentReelInCompiler()" style="background: var(--primary); border: none; color: white; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.7rem; border-radius: var(--radius-full); cursor: pointer; white-space: nowrap;">
          <i class="fa-solid fa-code"></i> Try Code
        </button>
      </div>

      <div class="reel-actions-side">
        <div>
          <button class="action-btn-icon" onclick="toggleLike('${reel.id}', this)">
            <i class="fa-solid fa-heart"></i>
          </button>
          <div class="action-label" id="like-count-${reel.id}">${formatNumber(reel.likes)}</div>
        </div>

        <div>
          <button class="action-btn-icon" onclick="toggleDislike('${reel.id}', this)">
            <i class="fa-solid fa-thumbs-down"></i>
          </button>
          <div class="action-label">Dislike</div>
        </div>

        <div>
          <button class="action-btn-icon" onclick="openAnalysisForReel('${reel.id}')">
            <i class="fa-solid fa-chart-pie"></i>
          </button>
          <div class="action-label">Analysis</div>
        </div>

        <div>
          <button class="action-btn-icon" onclick="bookmarkReel('${reel.id}')">
            <i class="fa-solid fa-bookmark"></i>
          </button>
          <div class="action-label">Save</div>
        </div>

        <div>
          <button class="action-btn-icon" onclick="showToast('Share link copied to clipboard!')">
            <i class="fa-solid fa-share"></i>
          </button>
          <div class="action-label">Share</div>
        </div>
      </div>

      <div class="reel-overlay-bottom">
        <div class="creator-bar">
          <img class="creator-avatar" src="${reel.creatorAvatar}" alt="${reel.creator}">
          <span class="creator-name">${reel.creator}</span>
        </div>
        <div class="reel-title-text">${reel.title}</div>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
          ${reel.tags.map(t => `<span style="font-size: 0.72rem; background: rgba(255,255,255,0.15); padding: 0.2rem 0.6rem; border-radius: 4px;">#${t}</span>`).join('')}
        </div>
      </div>
    `;

    container.appendChild(reelEl);
  });

  // Setup Scroll Observer for Auto-Play & Learn Panel sync
  setupScrollObserver();
  updateLearnPanel(filtered[0]);
}

// Intersection Observer for Vertical Reels Snap
function setupScrollObserver() {
  const container = document.getElementById("reels-container");
  const cards = container.querySelectorAll(".reel-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector("video");
      if (entry.isIntersecting) {
        if (video) video.play().catch(() => {});
        const reelId = entry.target.id.replace("reel-card-", "");
        const reelData = currentReels.find(r => r.id === reelId);
        if (reelData) updateLearnPanel(reelData);
      } else {
        if (video) video.pause();
      }
    });
  }, { threshold: 0.6 });

  cards.forEach(card => observer.observe(card));
}

// Category Filter in Reels Feed
function filterReelsByCategory(cat) {
  activeCategoryFilter = cat;
  renderReelsFeed();
  showToast(`Filtered feed by: ${cat}`);
}

// Update Learn Panel Side Details
function updateLearnPanel(reel) {
  if (!reel) return;

  const aiReasonEl = document.getElementById("learn-ai-reason");
  const eli5El = document.getElementById("learn-eli5-text");
  const analogyEl = document.getElementById("learn-analogy-text");
  const keywordsContainer = document.getElementById("learn-keywords-container");
  const codeBox = document.getElementById("learn-code-box");
  const takeawaysList = document.getElementById("learn-takeaways-list");
  const quizQuestion = document.getElementById("quiz-question-text");
  const quizOptionsContainer = document.getElementById("quiz-options-container");
  const quizFeedback = document.getElementById("quiz-feedback-box");

  if (aiReasonEl) aiReasonEl.innerText = reel.aiReasoning;
  if (eli5El) eli5El.innerText = reel.eli5Summary || reel.summary;
  if (analogyEl) analogyEl.innerText = reel.simpleAnalogy || "Think of this as building blocks in software engineering.";
  
  if (keywordsContainer && reel.keywordsGlossary) {
    keywordsContainer.innerHTML = reel.keywordsGlossary.map(kw => `
      <div style="background: #F8FAFC; border: 1px solid var(--border-light); border-left: 3px solid var(--secondary); padding: 0.5rem 0.8rem; border-radius: 6px;">
        <span style="font-weight: 700; font-size: 0.82rem; color: var(--primary);">${kw.term}:</span>
        <span style="font-size: 0.8rem; color: var(--text-main); font-weight: 500;">${kw.simpleDef}</span>
      </div>
    `).join('');
  }

  if (codeBox) codeBox.innerText = reel.codeSnippet || "// No code snippet for this conceptual reel.";

  if (takeawaysList) {
    takeawaysList.innerHTML = reel.keyTakeaways.map(point => `
      <li class="takeaway-item">
        <i class="fa-solid fa-check-circle"></i>
        <span>${point}</span>
      </li>
    `).join('');
  }

  // Quiz Setup
  if (quizQuestion && reel.quiz) {
    quizQuestion.innerText = reel.quiz.question;
    if (quizFeedback) quizFeedback.innerHTML = "";
    
    quizOptionsContainer.innerHTML = reel.quiz.options.map((opt, i) => `
      <button class="quiz-option-btn" onclick="checkQuizAnswer(${i}, ${reel.quiz.correct}, '${reel.quiz.explanation.replace(/'/g, "\\'")}')">
        ${String.fromCharCode(65 + i)}. ${opt}
      </button>
    `).join('');
  }
}

// Interactive Quiz Checking
function checkQuizAnswer(selectedIdx, correctIdx, explanation) {
  const options = document.querySelectorAll(".quiz-option-btn");
  const feedback = document.getElementById("quiz-feedback-box");

  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIdx) {
      btn.classList.add("correct");
    } else if (i === selectedIdx) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIdx === correctIdx) {
    currentUser.points += 50;
    renderDashboard();
    feedback.innerHTML = `<span style="color: var(--success);"><i class="fa-solid fa-circle-check"></i> Correct! +50 XP Points. ${explanation}</span>`;
    showToast("Correct Answer! Earned +50 XP");
  } else {
    feedback.innerHTML = `<span style="color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Incorrect. ${explanation}</span>`;
  }
}

// Open Analysis for Specific Reel
function openAnalysisForReel(reelId) {
  const reel = currentReels.find(r => r.id === reelId);
  if (reel) {
    renderAnalysisPage(reel);
    switchTab("analysis-page");
  }
}

function renderAnalysisPage(reel) {
  if (!reel) reel = currentReels[0];

  document.getElementById("analysis-title").innerText = reel.title;
  document.getElementById("analysis-category-badge").innerHTML = `<i class="fa-solid fa-tag"></i> ${reel.category}`;
  document.getElementById("analysis-difficulty").innerText = reel.difficulty;
  document.getElementById("analysis-summary").innerText = reel.summary;

  const eli5 = document.getElementById("analysis-eli5");
  const analogy = document.getElementById("analysis-analogy");
  if (eli5) eli5.innerText = reel.eli5Summary || reel.summary;
  if (analogy) analogy.innerText = reel.simpleAnalogy || "Think of building blocks in software engineering.";

  const coursesList = document.getElementById("analysis-courses-list");
  if (coursesList && reel.recommendedCourses) {
    coursesList.innerHTML = reel.recommendedCourses.map(c => `
      <div style="background: #F8FAFC; border: 1px solid var(--border-light); padding: 0.8rem 1rem; border-radius: var(--radius-sm); margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 700; font-size: 0.88rem; color: var(--dark-slate);">${c.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${c.platform} • ${c.duration}</div>
        </div>
        <button class="nav-btn" style="padding: 0.3rem 0.7rem; font-size: 0.75rem;" onclick="showToast('Course added to target queue!')">Start</button>
      </div>
    `).join('');
  }
}

function generateAiReport() {
  showToast("Regenerating AI Reel Analysis report...");
}

// Interest Profile Management
function renderInterestProfile() {
  const grid = document.getElementById("interests-cards-grid");
  if (!grid) return;

  grid.innerHTML = currentUser.interests.map((item, idx) => `
    <div class="interest-card selected">
      <div class="interest-header">
        <div class="interest-icon-box">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <span style="font-weight: 800; font-size: 1.1rem; color: var(--primary);" id="weight-val-${idx}">${item.weight}%</span>
      </div>
      <div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--dark-slate);">${item.name}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Adjust weight to prioritize ${item.name} reels in feed.</p>
      </div>
      <input type="range" class="weight-slider" min="0" max="100" value="${item.weight}" oninput="updateInterestWeight(${idx}, this.value)">
    </div>
  `).join('');
}

function updateInterestWeight(index, val) {
  currentUser.interests[index].weight = parseInt(val);
  const valSpan = document.getElementById(`weight-val-${index}`);
  if (valSpan) valSpan.innerText = `${val}%`;
}

function saveInterests() {
  showToast("Interest weights & skill goals updated!");
  renderRecommendations();
}

// AI Recommendation Engine
function renderRecommendations() {
  const container = document.getElementById("recommendations-container");
  if (!container) return;

  container.innerHTML = currentReels.map(reel => `
    <div class="rec-card">
      <img class="rec-thumb" src="${reel.poster}" alt="${reel.title}">
      <div class="rec-content">
        <div>
          <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.4rem;">
            <span class="rec-ai-explanation"><i class="fa-solid fa-wand-magic-sparkles"></i> ${reel.aiMatchScore}% Score</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Category: ${reel.category}</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--dark-slate); margin-bottom: 0.4rem;">${reel.title}</h3>
          <p style="font-size: 0.88rem; color: var(--text-main); line-height: 1.4;">${reel.summary}</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <div style="font-size: 0.82rem; color: var(--primary); font-weight: 700;">
            <i class="fa-solid fa-circle-info"></i> ${reel.aiReasoning}
          </div>
          <button class="btn-primary" style="width: auto; padding: 0.5rem 1.25rem; font-size: 0.85rem;" onclick="openAnalysisForReel('${reel.id}')">
            Analyze Reel
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render AI Bot Interest Conversions
function renderAiBotConversions() {
  const container = document.getElementById("ai-bot-conversions-container");
  if (!container || !AI_BOT_CONVERSIONS) return;

  container.innerHTML = AI_BOT_CONVERSIONS.map(conv => `
    <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-md); padding: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.4rem;">
        <i class="fa-solid ${conv.icon}" style="color: var(--secondary); font-size: 1.1rem;"></i>
        <span style="font-weight: 700; font-size: 0.95rem; color: white;">"${conv.rawInterest}"</span>
      </div>
      <div style="font-size: 0.78rem; color: #A5B4FC; display: flex; align-items: center; gap: 0.4rem; font-weight: 600;">
        <i class="fa-solid fa-arrow-right"></i> ${conv.convertedTech}
      </div>
    </div>
  `).join('');
}

// Dashboard Page Rendering
function renderDashboard() {
  const watchTimeEl = document.getElementById("dash-watch-time");
  const streakEl = document.getElementById("dash-streak");
  const pointsEl = document.getElementById("dash-points");

  if (watchTimeEl) watchTimeEl.innerText = `${currentUser.completedHours} hrs (${currentUser.watchTimeMinutes} min)`;
  if (streakEl) streakEl.innerText = `${currentUser.streakDays} Days`;
  if (pointsEl) pointsEl.innerText = `${currentUser.points.toLocaleString()} XP`;

  // Render AI Detected Interests
  const aiInterestsContainer = document.getElementById("dash-ai-interests-container");
  if (aiInterestsContainer && currentUser.detectedAiInterests) {
    aiInterestsContainer.innerHTML = currentUser.detectedAiInterests.map(item => `
      <div style="background: #F8FAFC; border: 1px solid var(--border-light); border-left: 4px solid var(--primary); padding: 0.75rem 1rem; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--dark-slate);">${item.topic}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Source Interest: <strong>${item.source}</strong></div>
        </div>
        <span style="background: var(--primary-light); color: var(--primary); font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: var(--radius-full);">
          ${item.confidence}% Match
        </span>
      </div>
    `).join('');
  }

  // Render Recommended Careers
  const careersContainer = document.getElementById("dash-careers-container");
  if (careersContainer && currentUser.recommendedCareers) {
    careersContainer.innerHTML = currentUser.recommendedCareers.map(car => `
      <div style="background: #F8FAFC; border: 1px solid var(--border-light); border-left: 4px solid var(--indigo); padding: 0.75rem 1rem; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--dark-slate);">${car.title}</div>
          <div style="font-size: 0.75rem; color: var(--success); font-weight: 700;">Est Salary: ${car.avgSalary}</div>
        </div>
        <span style="background: #EEF2FF; color: var(--indigo); font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: var(--radius-full);">
          ${car.match}% Skill Match
        </span>
      </div>
    `).join('');
  }

  // Render Weekly Report
  const weeklyReportEl = document.getElementById("dash-weekly-report");
  if (weeklyReportEl) {
    weeklyReportEl.innerHTML = `
      <p style="margin-bottom: 0.5rem;"><strong>📊 Weekly AI Learning Synthesis:</strong></p>
      <ul style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.3rem;">
        <li>Watched <strong>${currentUser.watchTimeMinutes} minutes</strong> of tech content across <strong>Gaming, EV Tech, and AI Agents</strong>.</li>
        <li>Liked <strong>${currentUser.likedReelIds.length} high-value reels</strong> and answered <strong>${Math.floor(currentUser.points / 50)} concept quizzes</strong> correctly.</li>
        <li>Highest skill progress made in <strong>Python & Clean Code (${currentUser.skillLevels['Python & Clean Code']}%)</strong> and <strong>EV Tech (${currentUser.skillLevels['EV Tech & Embedded C']}%)</strong>.</li>
      </ul>
    `;
  }

  // Render Skill Bars
  const skillContainer = document.getElementById("skill-bars-container");
  if (skillContainer) {
    skillContainer.innerHTML = Object.entries(currentUser.skillLevels).map(([skill, val]) => `
      <div class="skill-bar-row">
        <div class="skill-label-flex">
          <span>${skill}</span>
          <span>${val}% Mastered</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${val}%;"></div>
        </div>
      </div>
    `).join('');
  }

  // Render Saved Notebook Cards
  const notebookContainer = document.getElementById("saved-notebook-container");
  if (notebookContainer) {
    notebookContainer.innerHTML = currentUser.savedNotebook.map(note => `
      <div style="background: #F8FAFC; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
          <strong style="font-size: 0.9rem; color: var(--dark-slate);">${note.title}</strong>
          <span style="font-size: 0.72rem; color: var(--text-muted);">${note.date}</span>
        </div>
        <pre style="background: var(--dark-slate); color: #F1F5F9; font-size: 0.78rem; padding: 0.5rem; border-radius: 4px; font-family: monospace; margin-bottom: 0.4rem;">${note.snippet}</pre>
        <p style="font-size: 0.8rem; color: var(--text-main);">${note.note}</p>
      </div>
    `).join('');
  }
}

// Like / Dislike Functionality
function toggleLike(reelId, btn) {
  const reel = currentReels.find(r => r.id === reelId);
  if (!reel) return;

  btn.classList.toggle("active");
  const countSpan = document.getElementById(`like-count-${reelId}`);

  if (btn.classList.contains("active")) {
    reel.likes++;
    if (!currentUser.likedReelIds.includes(reelId)) currentUser.likedReelIds.push(reelId);
    showToast("Liked Reel! Added to AI Interest Analyzer.");
  } else {
    reel.likes--;
    currentUser.likedReelIds = currentUser.likedReelIds.filter(id => id !== reelId);
  }

  if (countSpan) countSpan.innerText = formatNumber(reel.likes);
  renderDashboard();
}

function toggleDislike(reelId, btn) {
  if (!currentUser.dislikedReelIds.includes(reelId)) {
    currentUser.dislikedReelIds.push(reelId);
    showToast("Disliked Reel. AI will adjust your feed recommendations.");
  } else {
    currentUser.dislikedReelIds = currentUser.dislikedReelIds.filter(id => id !== reelId);
    showToast("Removed Dislike preference.");
  }
  btn.classList.toggle("active");
}

function bookmarkReel(reelId) {
  const reel = currentReels.find(r => r.id === reelId);
  if (!reel) return;

  const exists = currentUser.savedNotebook.some(n => n.reelId === reelId);
  if (!exists) {
    currentUser.savedNotebook.push({
      reelId: reel.id,
      title: reel.title,
      date: new Date().toISOString().split('T')[0],
      snippet: reel.codeSnippet || "// Key concept takeaway",
      note: reel.summary
    });
    renderDashboard();
    showToast("Reel concepts saved to your Dashboard Notebook!");
  } else {
    showToast("Reel already saved in your notebook!");
  }
}

function copyCodeSnippet() {
  const codeText = document.getElementById("learn-code-box").innerText;
  navigator.clipboard.writeText(codeText).then(() => {
    showToast("Code snippet copied to clipboard!");
  });
}

// Authentication Modal Tabs & Submit
function switchAuthTab(tab) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const authBtns = document.querySelectorAll(".auth-tab-btn");

  authBtns.forEach(b => b.classList.remove("active"));

  if (tab === "login") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    authBtns[0].classList.add("active");
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    authBtns[1].classList.add("active");
  }
}

function handleAuthSubmit(e, type) {
  e.preventDefault();
  
  if (type === 'signup') {
    const nameInput = document.querySelector('#signup-form input[placeholder="Alex Student"]');
    const emailInput = document.querySelector('#signup-form input[type="email"]');
    if (nameInput && nameInput.value.trim() !== '') {
      currentUser.name = nameInput.value.trim();
    }
    if (emailInput && emailInput.value.trim() !== '') {
      currentUser.email = emailInput.value.trim();
    }
  } else {
    const emailInput = document.querySelector('#login-form input[type="email"]');
    if (emailInput && emailInput.value.trim() !== '') {
      currentUser.email = emailInput.value.trim();
      const derivedName = currentUser.email.split('@')[0].replace('.', ' ');
      currentUser.name = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    }
  }

  currentUser.isLoggedIn = true;

  // Update Header Profile Badge
  const navName = document.getElementById('nav-user-name');
  if (navName) navName.innerText = currentUser.name;

  initApp();
  switchTab("feed-page");
  showToast(type === "login" ? `Welcome back, ${currentUser.name}!` : `Account created! Welcome, ${currentUser.name}.`);
}

// Utility Toast Function
function showToast(msg) {
  const toast = document.getElementById("toast");
  const text = document.getElementById("toast-text");

  if (!toast || !text) return;

  text.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
}
