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

const practiceTypes = [
  { id: "translation", label: "翻译" },
  { id: "revision", label: "审定稿" },
  { id: "logic", label: "逻辑拆分" },
  { id: "terms", label: "术语" },
];

const exercises = [
  {
    id: "translation-1",
    type: "translation",
    title: "政策文本英译汉",
    module: "翻译实务主线",
    level: "段落",
    prompt:
      "Public services should be made more accessible, especially in communities where older residents and migrant workers often face difficulties in obtaining timely information.",
    instruction: "请译成自然、准确的中文，注意 especially 引出的补充重点。",
    reference:
      "应提高公共服务的可及性，尤其是在老年居民和外来务工人员往往难以及时获取信息的社区。",
    rubric: ["信息完整，不漏译 older residents 和 migrant workers", "逻辑关系清楚，especially 不要处理成并列", "中文表达自然，避免“被使得更加可获得”"],
  },
  {
    id: "translation-2",
    type: "translation",
    title: "科技文本汉译英",
    module: "翻译实务主线",
    level: "句段",
    prompt:
      "随着人工智能技术在医疗、教育和城市治理等领域的应用不断深入，数据安全和算法透明度也成为公众关注的重点。",
    instruction: "请译成英文，注意“不断深入”和“公众关注的重点”的表达。",
    reference:
      "As artificial intelligence is applied more extensively in healthcare, education and urban governance, data security and algorithmic transparency have also become major public concerns.",
    rubric: ["领域名称准确", "主句结构清楚", "data security 和 algorithmic transparency 表达统一"],
  },
  {
    id: "revision-1",
    type: "revision",
    title: "审定稿：漏译与直译",
    module: "审定稿专项",
    level: "段落",
    prompt:
      "原文：地方政府应在推进基础设施建设的同时，充分评估项目的长期运营成本，避免重建设、轻管理。\n错误译文：Local governments should promote infrastructure construction and fully assess the long-term cost of projects.",
    instruction: "请修改错误译文，并标注主要错误类型。",
    reference:
      "Local governments should fully assess the long-term operating costs of projects while advancing infrastructure development, so as to avoid prioritizing construction over management.\n主要错误：漏译“在……的同时”“避免重建设、轻管理”；long-term cost 应明确为 operating costs。",
    rubric: ["补足漏译信息", "while / so as to 等逻辑衔接自然", "指出错误类型而不只是改句子"],
  },
  {
    id: "revision-2",
    type: "revision",
    title: "审定稿：术语与语域",
    module: "审定稿专项",
    level: "句子",
    prompt:
      "原文：有关部门将进一步完善监管机制，保障平台经济规范健康发展。\n错误译文：Relevant departments will further perfect the supervision mechanism to guarantee the platform economy develops normally and healthily.",
    instruction: "请修订译文，使其符合政策文本语域。",
    reference:
      "Relevant authorities will further improve the regulatory mechanism to ensure the sound and well-regulated development of the platform economy.\n主要错误：perfect 生硬；supervision mechanism 不如 regulatory mechanism；normally and healthily 不符合政策语域。",
    rubric: ["术语更贴近政策文本", "避免中式搭配", "保留“规范健康发展”的双重含义"],
  },
  {
    id: "logic-1",
    type: "logic",
    title: "逻辑拆分：让步关系",
    module: "逻辑拆分",
    level: "复合句",
    prompt:
      "Although the policy has helped reduce administrative costs, its effectiveness depends largely on whether local agencies can coordinate their data systems and share information in a timely manner.",
    instruction: "请拆出主干、让步关系、条件/依赖关系，并写一句中文翻译骨架。",
    reference:
      "主干：its effectiveness depends largely on whether...\n让步：Although the policy has helped reduce administrative costs\n依赖条件：whether local agencies can coordinate their data systems and share information in a timely manner\n翻译骨架：尽管该政策有助于降低行政成本，但其成效在很大程度上取决于地方机构能否协调数据系统并及时共享信息。",
    rubric: ["主干判断准确", "Although 让步关系明确", "whether 引导的依赖内容完整"],
  },
  {
    id: "terms-1",
    type: "terms",
    title: "术语选择：治理类",
    module: "术语管理",
    level: "高频词",
    prompt:
      "请为以下词组选出或写出更合适的英文表达，并各造一个短句：基层治理、监管机制、高质量发展、公共服务均等化。",
    instruction: "请给出术语译法，并用其中两个术语各写一个英文句子。",
    reference:
      "基层治理：community-level governance / primary-level governance\n监管机制：regulatory mechanism\n高质量发展：high-quality development\n公共服务均等化：equal access to public services / equalization of public services\n例句：A more effective regulatory mechanism is needed to protect consumer rights.",
    rubric: ["术语准确且前后一致", "例句搭配自然", "能区分 governance、regulation、public services 的使用场景"],
  },
];

const reviewIntervals = [1, 3, 7, 14, 30];
const storageKey = "level-one-translation-training";

const state = loadState();
let timerSeconds = 45 * 60;
let timerHandle = null;
let currentPracticeType = "translation";
let currentExercise = null;

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

function pickExercise(type = currentPracticeType) {
  const pool = exercises.filter((exercise) => exercise.type === type);
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

function renderPracticeTabs() {
  const tabs = document.querySelector("#practiceTabs");
  tabs.innerHTML = practiceTypes
    .map(
      (type) => `
        <button class="${type.id === currentPracticeType ? "active" : ""}" data-type="${type.id}" type="button">${type.label}</button>
      `,
    )
    .join("");

  tabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      currentPracticeType = button.dataset.type;
      loadPractice();
    });
  });
}

function loadPractice() {
  currentExercise = pickExercise();
  document.querySelector("#practiceTitle").textContent = currentExercise.title;
  document.querySelector("#practiceMeta").textContent = currentExercise.level;
  document.querySelector("#practicePrompt").textContent = currentExercise.prompt;
  document.querySelector("#practiceInstruction").textContent = currentExercise.instruction;
  document.querySelector("#answerInput").value = "";
  document.querySelector("#feedbackPanel").hidden = true;
  renderPracticeTabs();
}

function submitPractice() {
  const answer = document.querySelector("#answerInput").value.trim();
  if (!answer) {
    alert("先写下你的答案，再提交。");
    return;
  }

  const createdAt = todayKey();
  const session = {
    id: makeId(),
    createdAt,
    module: currentExercise.module,
    title: currentExercise.title,
    score: 75,
    errorType: "待复盘",
    note: `题目：${currentExercise.prompt}\n我的答案：${answer}\n参考：${currentExercise.reference}`,
    answer,
    exerciseId: currentExercise.id,
    reviews: reviewIntervals.map((interval) => ({
      interval,
      date: addDays(createdAt, interval),
      done: false,
    })),
  };

  state.sessions.unshift(session);
  saveState();

  document.querySelector("#referenceAnswer").textContent = currentExercise.reference;
  document.querySelector("#rubricList").innerHTML = currentExercise.rubric.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#feedbackPanel").hidden = false;
  renderReviews();
  renderStats();
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
document.querySelector("#newPracticeBtn").addEventListener("click", loadPractice);
document.querySelector("#submitPracticeBtn").addEventListener("click", submitPractice);
document.querySelector("#exportBtn").addEventListener("click", exportData);
document.querySelector("#resetBtn").addEventListener("click", resetData);
setupTimer();
loadPractice();
renderAll();
