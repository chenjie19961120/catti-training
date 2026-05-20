const modules = [
  {
    name: "翻译实务主线",
    exercise: "句子、段落、整篇翻译",
    weight: 30,
    output: "完整译文",
    scoring: ["信息完整度", "逻辑正确", "语言自然"],
  },
  {
    name: "审定稿专项",
    exercise: "修改错误译文 + 标注错误类型",
    weight: 30,
    output: "修订译文 + 错误标签",
    scoring: ["错误修正率", "改进度", "审校理由"],
  },
  {
    name: "逻辑拆分",
    exercise: "拆句 + 标注逻辑",
    weight: 10,
    output: "逻辑表格/句子树",
    scoring: ["核心判断正确率", "逻辑完整度"],
  },
  {
    name: "信息提炼与重组",
    exercise: "提炼核心信息并重组",
    weight: 7,
    output: "精简段落",
    scoring: ["信息覆盖率", "逻辑通顺"],
  },
  {
    name: "术语管理",
    exercise: "术语库比对与使用",
    weight: 7,
    output: "术语表/标注",
    scoring: ["术语一致率", "上下文适配"],
  },
  {
    name: "文体/语域适应",
    exercise: "指定文体翻译",
    weight: 6,
    output: "文体匹配译文",
    scoring: ["文体匹配度"],
  },
  {
    name: "句式多样化",
    exercise: "同义句翻译 + 句式转换",
    weight: 4,
    output: "多版本句子",
    scoring: ["句式多样性", "表达自然度"],
  },
  {
    name: "时态/语态与衔接",
    exercise: "翻译 + 衔接修订",
    weight: 3,
    output: "译文提交",
    scoring: ["时态语态正确率", "衔接评分"],
  },
  {
    name: "文化理解与语境",
    exercise: "翻译含文化内容文本",
    weight: 3,
    output: "译文 + 解释",
    scoring: ["文化匹配评分"],
  },
];

const dailySchedule = [
  {
    day: "周一",
    module: "逻辑拆分",
    exercise: "拆句 + 标注逻辑",
    quantity: "5 句 + 1 段",
    checklist: ["划出主干判断", "标注因果、转折、递进、让步", "写出一句目标语骨架"],
  },
  {
    day: "周二",
    module: "术语管理",
    exercise: "术语库比对 + 关键词造句",
    quantity: "10 词 + 6 句",
    checklist: ["建立双语术语卡", "写出搭配和禁用译法", "用术语完成短句翻译"],
  },
  {
    day: "周三",
    module: "翻译实务主线",
    exercise: "英汉/汉英句段翻译",
    quantity: "5 句 + 1 段",
    checklist: ["先写信息结构", "再完成译文", "最后检查漏译和逻辑关系"],
  },
  {
    day: "周四",
    module: "审定稿专项",
    exercise: "修改错误译文",
    quantity: "1 段",
    checklist: ["定位错误类型", "改出可交付译文", "写一句修改理由"],
  },
  {
    day: "周五",
    module: "信息提炼与重组",
    exercise: "段落整合",
    quantity: "1 段",
    checklist: ["提取核心信息", "删去重复表达", "重排逻辑顺序"],
  },
  {
    day: "周六",
    module: "文体/语域适应",
    exercise: "政策/科技/新闻/法律文体翻译",
    quantity: "1 段",
    checklist: ["识别文本类型", "匹配术语和语气", "检查句式是否符合文体"],
  },
  {
    day: "周日",
    module: "综合模拟",
    exercise: "整篇翻译 + 审校",
    quantity: "1 篇",
    checklist: ["按时间完成初译", "保留 20% 时间审校", "登记 3 个最高频错误"],
  },
];

const phases = [
  {
    title: "第 1-2 周：诊断与框架",
    text: "建立术语库和错误分类，重点练逻辑拆分、核心判断、句段结构。",
  },
  {
    title: "第 3-6 周：翻译产能",
    text: "每周至少 3 次限时翻译，覆盖政策、科技、新闻、法律语域。",
  },
  {
    title: "第 7-9 周：审定稿拉分",
    text: "每周至少 4 次审定稿专项，按漏译、误译、术语、逻辑、文体逐项修。",
  },
  {
    title: "第 10-12 周：全真模拟",
    text: "每周 1-2 套 180 分钟模拟，训练稳定速度和交卷质量。",
  },
];

const reviewIntervals = [1, 3, 7, 14, 30];
const storageKey = "level-one-translation-training";

const state = loadState();
let timerSeconds = 45 * 60;
let timerHandle = null;

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return { sessions: [], checklist: {} };
  try {
    return JSON.parse(raw);
  } catch {
    return { sessions: [], checklist: {} };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayKey() {
  return formatDate(new Date());
}

function addDays(date, days) {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + days);
  return formatDate(next);
}

function makeId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getTodaySchedule() {
  const dayIndex = new Date().getDay();
  const mondayFirstIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  return dailySchedule[mondayFirstIndex];
}

function renderToday() {
  const schedule = getTodaySchedule();
  document.querySelector("#todayTitle").textContent = `${schedule.day}：${schedule.module}`;
  document.querySelector("#todayQuantity").textContent = schedule.quantity;
  document.querySelector("#todayExercise").textContent = schedule.exercise;

  const key = `${todayKey()}-${schedule.module}`;
  const completed = state.checklist[key] || [];
  const container = document.querySelector("#todayChecklist");
  container.innerHTML = "";

  schedule.checklist.forEach((item, index) => {
    const label = document.createElement("label");
    label.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed.includes(index);
    checkbox.addEventListener("change", () => {
      const current = new Set(state.checklist[key] || []);
      checkbox.checked ? current.add(index) : current.delete(index);
      state.checklist[key] = [...current];
      saveState();
    });

    const text = document.createElement("div");
    text.innerHTML = `<strong>${item}</strong><span>${schedule.exercise}</span>`;

    label.append(checkbox, text);
    container.append(label);
  });
}

function renderModules() {
  const select = document.querySelector("#moduleInput");
  select.innerHTML = "";

  modules.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    select.append(option);
  });

  document.querySelector("#moduleList").innerHTML = modules
    .map(
      (item) => `
        <article class="module-card">
          <strong>${item.name}</strong>
          <span>${item.exercise}。输出：${item.output}。</span>
          <div class="module-meta">
            <em>权重 ${item.weight}%</em>
            <em>${item.scoring[0]}</em>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderPhases() {
  document.querySelector("#phaseList").innerHTML = phases
    .map(
      (phase) => `
        <article class="phase-card">
          <strong>${phase.title}</strong>
          <span>${phase.text}</span>
        </article>
      `,
    )
    .join("");
}

function renderReviews() {
  const today = todayKey();
  const dueItems = [];

  state.sessions.forEach((session) => {
    session.reviews.forEach((review, reviewIndex) => {
      if (!review.done && review.date <= today) {
        dueItems.push({ session, review, reviewIndex });
      }
    });
  });

  document.querySelector("#dueCount").textContent = `${dueItems.length} 项`;
  const list = document.querySelector("#reviewList");

  if (dueItems.length === 0) {
    list.innerHTML = `<div class="empty-state">今天没有到期复习。完成一次训练后，系统会按 1、3、7、14、30 天生成复习点。</div>`;
    return;
  }

  list.innerHTML = "";
  dueItems.forEach(({ session, review, reviewIndex }) => {
    const item = document.createElement("article");
    item.className = "review-item";
    item.innerHTML = `
      <strong>${session.title}</strong>
      <span>${session.module} · ${session.errorType} · 第 ${review.interval} 天复习</span>
      <footer>
        <span>${session.note || "复查原译文、错误原因和修订版。"}</span>
      </footer>
    `;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "标记完成";
    button.addEventListener("click", () => {
      const target = state.sessions.find((entry) => entry.id === session.id);
      target.reviews[reviewIndex].done = true;
      saveState();
      renderAll();
    });
    item.querySelector("footer").append(button);
    list.append(item);
  });
}

function averageScore(moduleName) {
  const sessions = state.sessions.filter((session) => session.module === moduleName);
  if (sessions.length === 0) return 0;
  const total = sessions.reduce((sum, session) => sum + Number(session.score), 0);
  return Math.round(total / sessions.length);
}

function renderStats() {
  const total = state.sessions.length;
  const avg = total
    ? Math.round(state.sessions.reduce((sum, session) => sum + Number(session.score), 0) / total)
    : 0;

  const errorCounts = state.sessions.reduce((acc, session) => {
    acc[session.errorType] = (acc[session.errorType] || 0) + 1;
    return acc;
  }, {});

  const mostCommonError = Object.entries(errorCounts)
    .filter(([name]) => name !== "无")
    .sort((a, b) => b[1] - a[1])[0];

  const weakest = [...modules]
    .map((item) => ({ name: item.name, score: averageScore(item.name) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => a.score - b.score)[0];

  const items = [
    { title: "训练次数", value: `${total} 次`, percent: Math.min(total * 10, 100) },
    { title: "平均得分", value: `${avg || 0} 分`, percent: avg || 0 },
    {
      title: "最高频错误",
      value: mostCommonError ? `${mostCommonError[0]} · ${mostCommonError[1]} 次` : "暂无",
      percent: mostCommonError ? Math.min(mostCommonError[1] * 20, 100) : 0,
    },
    {
      title: "优先补强",
      value: weakest ? `${weakest.name} · ${weakest.score} 分` : "先提交练习",
      percent: weakest ? weakest.score : 0,
    },
  ];

  document.querySelector("#stats").innerHTML = items
    .map(
      (item) => `
        <article class="stat-item">
          <strong>${item.title}</strong>
          <span>${item.value}</span>
          <div class="stat-meter" style="--value: ${item.percent}%"><i></i></div>
        </article>
      `,
    )
    .join("");
}

function saveSession(event) {
  event.preventDefault();

  const createdAt = todayKey();
  const session = {
    id: makeId(),
    createdAt,
    module: document.querySelector("#moduleInput").value,
    title: document.querySelector("#titleInput").value.trim(),
    score: Number(document.querySelector("#scoreInput").value),
    errorType: document.querySelector("#errorInput").value,
    note: document.querySelector("#noteInput").value.trim(),
    reviews: reviewIntervals.map((interval) => ({
      interval,
      date: addDays(createdAt, interval),
      done: false,
    })),
  };

  state.sessions.unshift(session);
  saveState();
  event.target.reset();
  document.querySelector("#scoreInput").value = 75;
  renderAll();
}

function formatTimer() {
  const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const seconds = String(timerSeconds % 60).padStart(2, "0");
  document.querySelector("#timerDisplay").textContent = `${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(timerHandle);
  timerHandle = null;
  document.querySelector("#timerToggle").textContent = "开始";
}

function toggleTimer() {
  if (timerHandle) {
    stopTimer();
    return;
  }

  document.querySelector("#timerToggle").textContent = "暂停";
  timerHandle = setInterval(() => {
    timerSeconds -= 1;
    if (timerSeconds <= 0) {
      timerSeconds = 0;
      stopTimer();
    }
    formatTimer();
  }, 1000);
}

function setupTimer() {
  document.querySelectorAll("[data-minutes]").forEach((button) => {
    button.addEventListener("click", () => {
      stopTimer();
      timerSeconds = Number(button.dataset.minutes) * 60;
      formatTimer();
    });
  });

  document.querySelector("#timerToggle").addEventListener("click", toggleTimer);
  formatTimer();
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    examModel: {
      subject: "笔译实务",
      durationMinutes: 180,
      translationScore: 60,
      revisionScore: 40,
    },
    modules,
    dailySchedule,
    sessions: state.sessions,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `一级笔译训练记录-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetData() {
  const ok = confirm("确定清空本地训练记录吗？这个操作只影响当前浏览器。");
  if (!ok) return;
  localStorage.removeItem(storageKey);
  state.sessions = [];
  state.checklist = {};
  renderAll();
}

function renderAll() {
  renderToday();
  renderModules();
  renderPhases();
  renderReviews();
  renderStats();
}

document.querySelector("#sessionForm").addEventListener("submit", saveSession);
document.querySelector("#exportBtn").addEventListener("click", exportData);
document.querySelector("#resetBtn").addEventListener("click", resetData);
setupTimer();
renderAll();
