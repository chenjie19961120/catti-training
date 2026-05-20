const storageKey = "catti-practice-history";
const endpointKey = "catti-ai-endpoint";

const modules = [
  { id: "translation", name: "翻译练习", tag: "翻译", description: "英译汉、汉译英，重点看信息完整、逻辑和自然度。" },
  { id: "revision", name: "审定稿练习", tag: "审定稿", description: "修改错误译文，训练漏译、误译、术语和语域判断。" },
  { id: "logic", name: "逻辑拆分", tag: "逻辑", description: "拆主干、标关系，先把原文看明白再翻。" },
  { id: "terms", name: "术语练习", tag: "术语", description: "积累高频术语、搭配和可替换表达。" },
];

const exercises = [
  {
    id: "translation-1",
    module: "translation",
    title: "政策文本英译汉",
    tag: "段落",
    prompt:
      "Public services should be made more accessible, especially in communities where older residents and migrant workers often face difficulties in obtaining timely information.",
    task: "请译成自然、准确的中文，注意 especially 引出的补充重点。",
    references: [
      "应提高公共服务的可及性，尤其是在老年居民和外来务工人员往往难以及时获取信息的社区。",
      "公共服务应更加便捷可及，特别是在老年居民和外来务工人员经常难以及时获得信息的社区。",
    ],
    analysis:
      "本句核心判断是 public services should be made more accessible。especially 后面不是另起一个并列事实，而是强调最需要改善的社区场景。older residents 和 migrant workers 都要保留，obtaining timely information 可译为“及时获取信息”。",
  },
  {
    id: "translation-2",
    module: "translation",
    title: "科技文本汉译英",
    tag: "句段",
    prompt:
      "随着人工智能技术在医疗、教育和城市治理等领域的应用不断深入，数据安全和算法透明度也成为公众关注的重点。",
    task: "请译成英文，注意“不断深入”和“公众关注的重点”的表达。",
    references: [
      "As artificial intelligence is applied more extensively in healthcare, education and urban governance, data security and algorithmic transparency have also become major public concerns.",
      "With the wider use of AI in healthcare, education and urban governance, data security and algorithmic transparency have come under growing public scrutiny.",
    ],
    analysis:
      "“应用不断深入”不宜机械译成 deeply applied，可处理为 is applied more extensively 或 wider use。“公众关注的重点”可以译为 major public concerns，也可根据语境译成 come under growing public scrutiny。",
  },
  {
    id: "revision-1",
    module: "revision",
    title: "审定稿：漏译与直译",
    tag: "段落",
    prompt:
      "原文：地方政府应在推进基础设施建设的同时，充分评估项目的长期运营成本，避免重建设、轻管理。\n错误译文：Local governments should promote infrastructure construction and fully assess the long-term cost of projects.",
    task: "请修改错误译文，并标注主要错误类型。",
    references: [
      "Local governments should fully assess the long-term operating costs of projects while advancing infrastructure development, so as to avoid prioritizing construction over management.",
      "While promoting infrastructure development, local governments should give full consideration to projects' long-term operating costs and avoid emphasizing construction at the expense of management.",
    ],
    analysis:
      "错误译文漏掉“在……的同时”和“避免重建设、轻管理”，且 long-term cost 太泛，应明确为 operating costs。审定稿题要改出可交付译文，也要能说明错误类型。",
  },
  {
    id: "revision-2",
    module: "revision",
    title: "审定稿：术语与语域",
    tag: "句子",
    prompt:
      "原文：有关部门将进一步完善监管机制，保障平台经济规范健康发展。\n错误译文：Relevant departments will further perfect the supervision mechanism to guarantee the platform economy develops normally and healthily.",
    task: "请修订译文，使其符合政策文本语域。",
    references: [
      "Relevant authorities will further improve the regulatory mechanism to ensure the sound and well-regulated development of the platform economy.",
      "The competent authorities will further strengthen the regulatory framework to support the healthy and orderly development of the platform economy.",
    ],
    analysis:
      "perfect the supervision mechanism 和 normally and healthily 都有直译腔。政策文本里“监管机制”更常处理为 regulatory mechanism/framework，“规范健康发展”可译为 sound and well-regulated development 或 healthy and orderly development。",
  },
  {
    id: "logic-1",
    module: "logic",
    title: "逻辑拆分：让步关系",
    tag: "复合句",
    prompt:
      "Although the policy has helped reduce administrative costs, its effectiveness depends largely on whether local agencies can coordinate their data systems and share information in a timely manner.",
    task: "请拆出主干、让步关系、条件/依赖关系，并写一句中文翻译骨架。",
    references: [
      "主干：its effectiveness depends largely on whether...\n让步：Although the policy has helped reduce administrative costs\n依赖条件：whether local agencies can coordinate their data systems and share information in a timely manner\n翻译骨架：尽管该政策有助于降低行政成本，但其成效在很大程度上取决于地方机构能否协调数据系统并及时共享信息。",
    ],
    analysis:
      "Although 引出让步背景，主句落在 its effectiveness depends largely on...。whether 后面的 coordinate 和 share 是并列动作，翻译时不要漏掉 share information in a timely manner。",
  },
  {
    id: "terms-1",
    module: "terms",
    title: "术语选择：治理类",
    tag: "高频词",
    prompt:
      "请为以下词组选出或写出更合适的英文表达，并各造一个短句：基层治理、监管机制、高质量发展、公共服务均等化。",
    task: "请给出术语译法，并用其中两个术语各写一个英文句子。",
    references: [
      "基层治理：community-level governance / primary-level governance\n监管机制：regulatory mechanism / regulatory framework\n高质量发展：high-quality development\n公共服务均等化：equal access to public services / equalization of public services",
    ],
    analysis:
      "术语练习的重点不是背唯一答案，而是知道不同译法的适用范围。regulatory mechanism 更偏具体机制，regulatory framework 更偏制度框架；public services 前后要保持一致。",
  },
];

let mode = "module";
let selectedModule = "translation";
let currentExercise = null;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local history is best-effort in embedded browsers.
  }
}

function getHistory() {
  return readJson(storageKey, []);
}

function saveHistoryItem(item) {
  const history = getHistory();
  history.unshift(item);
  writeJson(storageKey, history.slice(0, 200));
}

function formatTime(date = new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function pickExercise() {
  const pool = mode === "module" ? exercises.filter((item) => item.module === selectedModule) : exercises;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

function renderModes() {
  document.querySelector("#moduleModeBtn").classList.toggle("active", mode === "module");
  document.querySelector("#normalModeBtn").classList.toggle("active", mode === "normal");
  document.querySelector("#modulePanel").hidden = mode !== "module";
}

function renderModules() {
  const grid = document.querySelector("#moduleGrid");
  grid.innerHTML = modules
    .map(
      (item) => `
        <button class="module-card ${item.id === selectedModule ? "active" : ""}" data-module="${item.id}" type="button">
          <strong>${item.name}</strong>
          <span>${item.description}</span>
        </button>
      `,
    )
    .join("");

  grid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedModule = button.dataset.module;
      renderModules();
      loadExercise();
    });
  });
}

function loadExercise() {
  currentExercise = pickExercise();
  const moduleInfo = modules.find((item) => item.id === currentExercise.module);
  document.querySelector("#practiceType").textContent = mode === "module" ? moduleInfo.name : "普通练习";
  document.querySelector("#practiceTitle").textContent = currentExercise.title;
  document.querySelector("#practiceTag").textContent = currentExercise.tag;
  document.querySelector("#practicePrompt").textContent = currentExercise.prompt;
  document.querySelector("#practiceTask").textContent = currentExercise.task;
  document.querySelector("#answerInput").value = "";
  document.querySelector("#answerPanel").hidden = true;
  renderHistory();
}

function submitAnswer() {
  const answer = document.querySelector("#answerInput").value.trim();
  if (!answer) {
    alert("先写下你的答案，再看解析。");
    return;
  }

  saveHistoryItem({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    exerciseId: currentExercise.id,
    title: currentExercise.title,
    module: currentExercise.module,
    answer,
    prompt: currentExercise.prompt,
    createdAt: formatTime(),
  });

  document.querySelector("#referenceList").innerHTML = currentExercise.references
    .map((text, index) => `<article><strong>参考 ${index + 1}</strong><p>${text}</p></article>`)
    .join("");
  document.querySelector("#analysisText").textContent = currentExercise.analysis;
  document.querySelector("#answerPanel").hidden = false;
  renderHistory();
}

function renderHistory() {
  const history = getHistory();
  const count = document.querySelector("#historyCount");
  const list = document.querySelector("#historyList");
  if (!count || !list) return;

  count.textContent = `${history.length} 条`;
  if (history.length === 0) {
    list.innerHTML = `<p class="empty">还没有练习记录。提交答案后，这里会保存题目和你的答案。</p>`;
    return;
  }

  list.innerHTML = history
    .slice(0, 8)
    .map(
      (item) => `
        <article class="history-item">
          <strong>${item.title}</strong>
          <span>${item.createdAt}</span>
          <p>${item.answer}</p>
        </article>
      `,
    )
    .join("");
}

function buildAiPrompt() {
  const answer = document.querySelector("#answerInput").value.trim();
  const question = document.querySelector("#aiQuestionInput").value.trim() || "请评价我的答案，并指出可以改进的地方。";
  return [
    "你是一名 CATTI 一级笔译训练教练。请根据题目、我的答案和参考解析回答问题。",
    `题目：${currentExercise.prompt}`,
    `任务：${currentExercise.task}`,
    `我的答案：${answer || "我还没有填写答案"}`,
    `参考答案：${currentExercise.references.join("\n")}`,
    `解析：${currentExercise.analysis}`,
    `我的问题：${question}`,
  ].join("\n\n");
}

async function copyAiPrompt() {
  const prompt = buildAiPrompt();
  await navigator.clipboard.writeText(prompt);
  showAiAnswer("已复制。你可以把这段内容发给任意 AI，让它针对本题和你的答案讲解。");
}

async function askAi() {
  const endpoint = document.querySelector("#aiEndpointInput").value.trim();
  if (!endpoint) {
    showAiAnswer("还没有配置 AI 后端接口。前端网页不能直接放 API Key，否则会泄露。你可以先用“复制问题”，后面再接一个安全的后端接口。");
    return;
  }

  showAiAnswer("正在请求 AI...");
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: buildAiPrompt(), exercise: currentExercise }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    showAiAnswer(data.answer || data.text || "接口已返回，但没有找到 answer 字段。");
  } catch (error) {
    showAiAnswer(`AI 请求失败：${error.message}`);
  }
}

function showAiAnswer(text) {
  const panel = document.querySelector("#aiAnswer");
  panel.hidden = false;
  panel.textContent = text;
}

function saveEndpoint() {
  const endpoint = document.querySelector("#aiEndpointInput").value.trim();
  writeJson(endpointKey, endpoint);
  showAiAnswer("接口地址已保存到本机浏览器。");
}

function setup() {
  document.querySelector("#moduleModeBtn").addEventListener("click", () => {
    mode = "module";
    renderModes();
    loadExercise();
  });
  document.querySelector("#normalModeBtn").addEventListener("click", () => {
    mode = "normal";
    renderModes();
    loadExercise();
  });
  document.querySelector("#nextExerciseBtn").addEventListener("click", loadExercise);
  document.querySelector("#submitAnswerBtn").addEventListener("click", submitAnswer);
  document.querySelector("#copyAiPromptBtn").addEventListener("click", copyAiPrompt);
  document.querySelector("#askAiBtn").addEventListener("click", askAi);
  document.querySelector("#saveEndpointBtn").addEventListener("click", saveEndpoint);

  document.querySelector("#aiEndpointInput").value = readJson(endpointKey, "");
  renderModes();
  renderModules();
  loadExercise();
}

setup();
