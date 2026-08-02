/* ========================================
   EngLink · 应用逻辑
   ======================================== */

// ===== Toast 提示组件 =====
const Toast = {
  show(msg, type = 'default') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  },
};

// ===== SVG 图标 =====
const Icons = {
  like: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
};

// ===== 帖子分类 =====
const CATEGORIES = [
  { key: 'all', label: '全部', icon: '📋' },
  { key: 'study', label: '学习方法', icon: '📚' },
  { key: 'exam', label: '考试备考', icon: '📝' },
  { key: 'career', label: '职场英语', icon: '💼' },
  { key: 'culture', label: '文化交流', icon: '🌍' },
  { key: 'resources', label: '资源分享', icon: '📂' },
  { key: 'free', label: '自由讨论', icon: '🗣️' },
];

const CATEGORY_LABELS = {};
CATEGORIES.forEach(c => { CATEGORY_LABELS[c.key] = { label: c.label, icon: c.icon }; });

// ===== 路由 =====
const Router = {
  currentRoute: 'home',
  currentParam: null,
  currentCategory: 'all',

  routes: {
    home: 'renderHome',
    learn: 'renderLearn',
    community: 'renderCommunity',
    post: 'renderPostDetail',
    checkin: 'renderCheckin',
    leaderboard: 'renderLeaderboard',
    profile: 'renderProfile',
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash.slice(2) || 'home';
    const parts = hash.split('/');
    const route = parts[0] || 'home';
    this.currentParam = parts[1] || null;

    if (this.routes[route]) {
      this.currentRoute = route;
      // 更新导航高亮
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.route === route);
      });
      // 关闭移动端菜单
      document.getElementById('navMenu').classList.remove('open');
      // 滚动到顶部
      window.scrollTo(0, 0);
      // 渲染页面
      Pages[this.routes[route]]();
    } else {
      this.currentRoute = 'home';
      Pages.renderHome();
    }
  },

  go(route) {
    window.location.hash = `#/${route}`;
  },
};

// ===== 页面渲染器 =====
const Pages = {
  // ===== 首页 =====
  renderHome() {
    const user = DB.getCurrentUser();
    const dailyWord = DB.getDailyWord();
    const posts = DB.getPosts().slice(0, 4);
    const leaderboard = DB.getLeaderboard().slice(0, 5);

    document.getElementById('mainContent').innerHTML = `
      <!-- Hero -->
      <section class="hero fade-in">
        <div class="hero-content">
          <div class="hero-badge">🌐 ${user ? `欢迎回来，${user.name}！` : '加入 2,000+ 英语学习者'}</div>
          <h1>Connect. Learn. Grow.<br>你的英语学习社区</h1>
          <p>在这里，找到志同道合的学习伙伴，分享经验，互相督促，一起突破英语瓶颈。</p>
          <div class="hero-actions">
            ${user
              ? `<button class="btn btn-primary btn-lg" onclick="Router.go('learn')">开始今日学习</button>
                 <button class="btn btn-ghost btn-lg" onclick="Router.go('community')">逛逛社区</button>`
              : `<button class="btn btn-primary btn-lg" onclick="openLoginModal()">立即加入</button>
                 <button class="btn btn-ghost btn-lg" onclick="Router.go('community')">浏览社区</button>`
            }
          </div>
        </div>
      </section>

      <!-- 统计 -->
      <div class="stats-row fade-in">
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--primary-bg)">👥</div>
          <div class="stat-value">${DB.getUsers().length * 200}+</div>
          <div class="stat-label">活跃学习者</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--secondary-bg)">📖</div>
          <div class="stat-value">${DB.getPosts().length * 80}+</div>
          <div class="stat-label">优质帖子</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--accent-bg)">📚</div>
          <div class="stat-value">${DB.getVocabulary().length * 30}+</div>
          <div class="stat-label">学习词汇</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#FCE7F3">🔥</div>
          <div class="stat-value">${Object.keys(DB.getCheckIns()).length * 15}+</div>
          <div class="stat-label">今日打卡</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px;" class="home-two-col">
        <!-- 每日一词 -->
        <div class="daily-word-card fade-in">
          <div class="daily-word-label">📖 今日词汇</div>
          <div class="daily-word">${dailyWord.word}</div>
          <div class="daily-word-phonetic">${dailyWord.phonetic}</div>
          <div class="daily-word-meaning">${dailyWord.meaning}</div>
          <div class="daily-word-example">"${dailyWord.example}"</div>
        </div>

        <!-- 排行榜预览 -->
        <div class="card fade-in">
          <div class="card-body">
            <div class="section-title">🏆 学习榜单</div>
            <div class="leaderboard-list" style="box-shadow:none; border:none;">
              ${leaderboard.map((u, i) => `
                <div class="leaderboard-item ${i < 3 ? 'top-' + (i + 1) : ''}" style="padding:10px 0; border-bottom: 1px solid var(--border-light);">
                  <div class="leaderboard-rank ${i < 3 ? 'rank-' + (i + 1) : 'rank-other'}">${i + 1}</div>
                  <div class="leaderboard-info">
                    <div class="post-avatar" style="width:32px; height:32px; font-size:13px; ${getAvatarStyle(u.name)}">${getInitial(u.name)}</div>
                    <div>
                      <div class="leaderboard-name">${u.name}</div>
                      <div class="leaderboard-bio">${u.bio}</div>
                    </div>
                  </div>
                  <div class="leaderboard-score">
                    <div class="leaderboard-score-value">${u.points}</div>
                    <div class="leaderboard-score-label">积分</div>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="btn btn-outline btn-block" style="margin-top:12px;" onclick="Router.go('leaderboard')">查看完整榜单</button>
          </div>
        </div>
      </div>

      <!-- 精选帖子 -->
      <div class="section-title">⭐ 社区精选</div>
      <div id="homePosts">
        ${posts.map(p => this._postCardHTML(p)).join('')}
      </div>
      <div style="text-align:center; margin-top:16px;">
        <button class="btn btn-outline btn-lg" onclick="Router.go('community')">查看更多帖子 →</button>
      </div>
    `;
  },

  // ===== 学习中心 =====
  renderLearn() {
    const vocab = DB.getVocabulary();
    const learned = DB.getLearnedWords();
    const grammar = DB.getGrammar();
    const challenges = DB.getChallenges();
    const completed = DB.getCompletedChallenges();

    document.getElementById('mainContent').innerHTML = `
      <div class="page-header fade-in">
        <h1 class="page-title">📖 学习中心</h1>
        <p class="page-subtitle">词汇卡片 · 语法课堂 · 每日挑战，全面提升你的英语能力</p>
      </div>

      <!-- 学习进度 -->
      <div class="stats-row fade-in">
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--primary-bg)">📚</div>
          <div class="stat-value">${learned.length}/${vocab.length}</div>
          <div class="stat-label">已学词汇</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--secondary-bg)">📝</div>
          <div class="stat-value">${grammar.length}</div>
          <div class="stat-label">语法课程</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--accent-bg)">🎯</div>
          <div class="stat-value">${completed.length}/${challenges.length}</div>
          <div class="stat-label">挑战完成</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#FCE7F3">🔥</div>
          <div class="stat-value">${DB.getStreak()}</div>
          <div class="stat-label">连续打卡</div>
        </div>
      </div>

      <!-- 词汇卡片 -->
      <div class="section-title">📇 词汇卡片 — 点击翻面</div>
      <div class="card fade-in" style="margin-bottom: 32px;">
        <div class="card-body" style="padding: 32px;">
          <div class="flashcard" id="flashcard" onclick="Flashcard.flip()">
            <div class="flashcard-inner" id="flashcardInner">
              <div class="flashcard-front">
                <div class="flashcard-word" id="fcWord">${vocab[0].word}</div>
                <div class="flashcard-phonetic" id="fcPhonetic">${vocab[0].phonetic}</div>
                <div class="flashcard-hint">👆 点击卡片查看释义</div>
              </div>
              <div class="flashcard-back">
                <div class="flashcard-meaning" id="fcMeaning">${vocab[0].meaning}</div>
                <div class="flashcard-example" id="fcExample">"${vocab[0].example}"</div>
                <div class="flashcard-hint">👆 点击返回</div>
              </div>
            </div>
          </div>
          <div class="flashcard-controls">
            <button class="btn btn-ghost" onclick="Flashcard.prev()">← 上一个</button>
            <button class="btn btn-secondary" id="learnWordBtn" onclick="Flashcard.markLearned()">✓ 已掌握</button>
            <button class="btn btn-ghost" onclick="Flashcard.next()">下一个 →</button>
          </div>
          <div style="text-align:center; margin-top:12px; font-size:13px; color:var(--text-tertiary);">
            卡片 <span id="fcIndex">1</span> / ${vocab.length}
          </div>
        </div>
      </div>

      <!-- 语法课堂 -->
      <div class="section-title">📐 语法课堂</div>
      <div style="margin-bottom: 32px;">
        ${grammar.map(g => `
          <div class="grammar-card fade-in">
            <div class="grammar-header">
              <span class="grammar-level level-${g.level}">${g.level === 'beginner' ? '初级' : g.level === 'intermediate' ? '中级' : '高级'}</span>
              <span class="grammar-title">${g.title}</span>
            </div>
            <div class="grammar-body">${g.body}</div>
            <div class="grammar-example">${g.example}</div>
          </div>
        `).join('')}
      </div>

      <!-- 每日挑战 -->
      <div class="section-title">🎯 每日挑战</div>
      <div id="challengeContainer">
        ${this._renderChallenge(0)}
      </div>
    `;
  },

  _renderChallenge(idx) {
    const challenges = DB.getChallenges();
    if (idx >= challenges.length) {
      return `<div class="card"><div class="card-body" style="text-align:center; padding:40px;">
        <div style="font-size:48px; margin-bottom:12px;">🎉</div>
        <div style="font-size:18px; font-weight:700; margin-bottom:8px;">全部挑战完成！</div>
        <div style="color:var(--text-secondary);">你已掌握所有知识点，太棒了！</div>
      </div></div>`;
    }
    const ch = challenges[idx];
    return `
      <div class="challenge-card fade-in" id="challengeCard">
        <div style="font-size:13px; opacity:0.8; margin-bottom:8px;">第 ${idx + 1} / ${challenges.length} 题</div>
        <div class="challenge-question">${ch.question}</div>
        <div class="challenge-options">
          ${ch.options.map((opt, i) => `
            <div class="challenge-option" onclick="Pages.answerChallenge(${idx}, ${i})">${String.fromCharCode(65 + i)}. ${opt}</div>
          `).join('')}
        </div>
        <div id="challengeExplain" style="display:none; margin-top:12px; padding:12px; background:rgba(255,255,255,0.15); border-radius:8px; font-size:14px;"></div>
        <div id="challengeNext" style="display:none; margin-top:12px; text-align:right;">
          <button class="btn" style="background:white; color:var(--secondary);" onclick="Pages.nextChallenge(${idx + 1})">下一题 →</button>
        </div>
      </div>
    `;
  },

  answerChallenge(idx, optionIdx) {
    const challenges = DB.getChallenges();
    const ch = challenges[idx];
    const options = document.querySelectorAll('#challengeCard .challenge-option');
    const correct = optionIdx === ch.answer;

    options.forEach((opt, i) => {
      opt.style.pointerEvents = 'none';
      if (i === ch.answer) opt.classList.add('correct');
      if (i === optionIdx && !correct) opt.classList.add('wrong');
    });

    const explain = document.getElementById('challengeExplain');
    explain.innerHTML = `<strong>${correct ? '✅ 回答正确！' : '❌ 回答错误'}</strong><br>${ch.explanation}`;
    explain.style.display = 'block';
    document.getElementById('challengeNext').style.display = 'block';

    DB.completeChallenge(idx, correct);
    if (correct) Toast.show('回答正确！+8 积分', 'success');
    else Toast.show('答错了，看看解析吧', 'warning');
  },

  nextChallenge(idx) {
    document.getElementById('challengeContainer').innerHTML = this._renderChallenge(idx);
  },

  // ===== 社区论坛 =====
  renderCommunity() {
    const posts = DB.getPosts(Router.currentCategory);

    document.getElementById('mainContent').innerHTML = `
      <div class="page-header fade-in" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
        <div>
          <h1 class="page-title">💬 社区论坛</h1>
          <p class="page-subtitle">与数千名学习者一起交流，分享经验，共同进步</p>
        </div>
        <button class="btn btn-primary btn-lg" onclick="openPostModal()">✏️ 发帖</button>
      </div>

      <div class="community-layout">
        <!-- 侧边栏 -->
        <aside class="community-sidebar fade-in">
          <div class="sidebar-card">
            <div class="sidebar-title">板块</div>
            ${CATEGORIES.map(c => `
              <div class="sidebar-item ${Router.currentCategory === c.key ? 'active' : ''}" onclick="Router.currentCategory='${c.key}'; Pages.renderCommunity()">
                <span>${c.icon}</span>
                <span>${c.label}</span>
                <span class="count">${c.key === 'all' ? DB.getPosts().length : DB.getPosts(c.key).length}</span>
              </div>
            `).join('')}
          </div>
        </aside>

        <!-- 帖子列表 -->
        <div>
          ${posts.length > 0
            ? posts.map(p => this._postCardHTML(p)).join('')
            : `<div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <div class="empty-state-text">这个板块还没有帖子</div>
                <div class="empty-state-sub">来发第一个帖子吧！</div>
              </div>`
          }
        </div>
      </div>
    `;
  },

  // ===== 帖子详情 =====
  renderPostDetail() {
    const postId = Router.currentParam;
    const post = DB.getPost(postId);
    if (!post) {
      document.getElementById('mainContent').innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-text">帖子不存在</div>
          <button class="btn btn-primary" style="margin-top:16px;" onclick="Router.go('community')">返回社区</button>
        </div>
      `;
      return;
    }

    DB.addView(postId);
    const author = DB.getUser(post.authorId);
    const comments = DB.getComments(postId);
    const liked = DB.isLiked(postId);
    const user = DB.getCurrentUser();
    const catInfo = CATEGORY_LABELS[post.category] || { label: '其他', icon: '📝' };

    document.getElementById('mainContent').innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn btn-ghost btn-sm" onclick="Router.go('community')">← 返回社区</button>
      </div>

      <div class="post-detail fade-in">
        <div class="post-meta">
          <div class="post-avatar" style="${getAvatarStyle(author.name)}">${getInitial(author.name)}</div>
          <div class="post-author-info">
            <div class="post-author">${author.name}</div>
            <div class="post-time">${formatDate(post.createdAt)} · ${post.views} 次浏览</div>
          </div>
          <span class="post-category-tag cat-${post.category}">${catInfo.icon} ${catInfo.label}</span>
        </div>

        <h1 class="post-detail-title">${post.title}</h1>

        <div class="post-tags" style="margin-bottom:16px;">
          ${post.tags.map(t => `<span class="post-tag">#${t}</span>`).join('')}
        </div>

        <div class="post-detail-content">${post.content}</div>

        <div class="post-actions">
          <div class="post-action ${liked ? 'liked' : ''}" onclick="Pages.toggleLike('${post.id}')">
            ${Icons.like}
            <span>${post.likes}</span>
          </div>
          <div class="post-action">
            ${Icons.comment}
            <span>${post.comments}</span>
          </div>
          <div class="post-action">
            ${Icons.eye}
            <span>${post.views}</span>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="card fade-in">
        <div class="card-body">
          <div class="section-title">💬 评论 (${comments.length})</div>

          ${user ? `
            <div class="comment-input-area">
              <div class="post-avatar" style="width:36px; height:36px; font-size:14px; ${getAvatarStyle(user.name)}">${getInitial(user.name)}</div>
              <div style="flex:1;">
                <textarea class="comment-input" id="commentInput" placeholder="说点什么..." rows="2"></textarea>
                <button class="btn btn-primary btn-sm" style="margin-top:8px;" onclick="Pages.submitComment('${post.id}')">发表评论</button>
              </div>
            </div>
          ` : `
            <div style="text-align:center; padding:20px; color:var(--text-tertiary);">
              <button class="btn btn-outline" onclick="openLoginModal()">登录后评论</button>
            </div>
          `}

          <div class="comment-section">
            ${comments.length > 0 ? comments.map(c => {
              const ca = DB.getUser(c.authorId);
              return `
                <div class="comment-item">
                  <div class="comment-avatar" style="${getAvatarStyle(ca.name)}">${getInitial(ca.name)}</div>
                  <div class="comment-body">
                    <div class="comment-header">
                      <span class="comment-author">${ca.name}</span>
                      <span class="comment-time">${formatDate(c.createdAt)}</span>
                    </div>
                    <div class="comment-text">${c.content}</div>
                  </div>
                </div>
              `;
            }).join('') : `
              <div style="text-align:center; padding:24px; color:var(--text-tertiary);">
                还没有评论，来抢沙发吧！
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  },

  submitComment(postId) {
    const input = document.getElementById('commentInput');
    const content = input.value.trim();
    if (!content) { Toast.show('请输入评论内容', 'warning'); return; }
    if (!DB.getCurrentUser()) { Toast.show('请先登录', 'warning'); openLoginModal(); return; }
    DB.addComment(postId, content);
    Toast.show('评论成功！+5 积分', 'success');
    this.renderPostDetail();
  },

  toggleLike(postId) {
    if (!DB.getCurrentUser()) { Toast.show('请先登录', 'warning'); openLoginModal(); return; }
    const liked = DB.likePost(postId);
    Toast.show(liked ? '已点赞！+2 积分' : '已取消点赞', liked ? 'success' : 'default');
    // 重新渲染当前页面
    if (Router.currentRoute === 'post') this.renderPostDetail();
    else this.renderCommunity();
  },

  // ===== 打卡 =====
  renderCheckin() {
    const user = DB.getCurrentUser();
    const today = todayStr();
    const isChecked = DB.isCheckedIn(today);
    const streak = DB.getStreak();
    const total = DB.getTotalCheckIns();

    document.getElementById('mainContent').innerHTML = `
      <div class="page-header fade-in">
        <h1 class="page-title">✅ 学习打卡</h1>
        <p class="page-subtitle">坚持就是胜利，每一次打卡都是进步</p>
      </div>

      ${user ? `
        <!-- 打卡统计 -->
        <div class="checkin-stats fade-in">
          <div class="checkin-stat">
            <div class="streak-fire">🔥</div>
            <div class="checkin-stat-value">${streak}</div>
            <div class="checkin-stat-label">连续打卡（天）</div>
          </div>
          <div class="checkin-stat">
            <div class="streak-fire">📅</div>
            <div class="checkin-stat-value">${total}</div>
            <div class="checkin-stat-label">累计打卡（天）</div>
          </div>
          <div class="checkin-stat">
            <div class="streak-fire">⭐</div>
            <div class="checkin-stat-value">${user.points}</div>
            <div class="checkin-stat-label">学习积分</div>
          </div>
        </div>

        <!-- 今日打卡 -->
        <div class="card fade-in" style="margin-bottom:24px; text-align:center; padding: 32px;">
          ${isChecked
            ? `<div style="font-size:56px; margin-bottom:12px;">✅</div>
               <div style="font-size:20px; font-weight:700; margin-bottom:8px;">今日已打卡！</div>
               <div style="color:var(--text-secondary);">坚持就是胜利，明天继续加油 💪</div>`
            : `<div style="font-size:56px; margin-bottom:12px;">🎯</div>
               <div style="font-size:20px; font-weight:700; margin-bottom:8px;">今日还未打卡</div>
               <div style="color:var(--text-secondary); margin-bottom:20px;">完成今日打卡，获得 15 积分</div>
               <button class="btn btn-primary btn-lg" onclick="Pages.doCheckIn()">立即打卡</button>`
          }
        </div>

        <!-- 打卡日历 -->
        <div class="checkin-calendar fade-in" id="checkinCalendar">
          ${this._renderCalendar()}
        </div>
      ` : `
        <div class="card fade-in" style="text-align:center; padding:48px;">
          <div style="font-size:56px; margin-bottom:16px;">🔐</div>
          <div style="font-size:20px; font-weight:700; margin-bottom:8px;">登录后开始打卡</div>
          <div style="color:var(--text-secondary); margin-bottom:20px;">记录你的每一天学习，养成好习惯</div>
          <button class="btn btn-primary btn-lg" onclick="openLoginModal()">立即登录</button>
        </div>
      `}
    `;
  },

  _renderCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = now.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    let html = `
      <div class="calendar-header">
        <div class="calendar-month">${year}年${month + 1}月</div>
      </div>
      <div class="calendar-grid">
        ${weekdays.map(w => `<div class="calendar-weekday">${w}</div>`).join('')}
    `;

    for (let i = 0; i < firstDay; i++) {
      html += '<div class="calendar-day empty"></div>';
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const checked = DB.isCheckedIn(dateStr);
      const isToday = d === today;
      html += `<div class="calendar-day ${checked ? 'checked' : ''} ${isToday ? 'today' : ''}">${d}</div>`;
    }

    html += '</div>';

    // 图例
    html += `
      <div style="display:flex; gap:20px; margin-top:16px; font-size:13px; color:var(--text-tertiary);">
        <span style="display:flex; align-items:center; gap:6px;">
          <span style="width:16px; height:16px; background:var(--secondary); border-radius:4px;"></span> 已打卡
        </span>
        <span style="display:flex; align-items:center; gap:6px;">
          <span style="width:16px; height:16px; border:2px solid var(--primary); border-radius:4px;"></span> 今天
        </span>
      </div>
    `;

    return html;
  },

  doCheckIn() {
    if (!DB.getCurrentUser()) { openLoginModal(); return; }
    const result = DB.checkIn(todayStr());
    if (result) {
      Toast.show('打卡成功！+15 积分 🔥', 'success');
      this.renderCheckin();
    } else {
      Toast.show('今日已打卡', 'warning');
    }
  },

  // ===== 排行榜 =====
  renderLeaderboard() {
    const users = DB.getLeaderboard();
    const currentUser = DB.getCurrentUser();

    document.getElementById('mainContent').innerHTML = `
      <div class="page-header fade-in">
        <h1 class="page-title">🏆 学习排行榜</h1>
        <p class="page-subtitle">看看谁是最努力的学习者，向他们看齐！</p>
      </div>

      <!-- Top 3 展示 -->
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:32px;" class="podium">
        ${this._renderPodium(users)}
      </div>

      <!-- 完整榜单 -->
      <div class="leaderboard-list fade-in">
        ${users.map((u, i) => `
          <div class="leaderboard-item ${i < 3 ? 'top-' + (i + 1) : ''}" ${currentUser && u.id === currentUser.id ? 'style="background:var(--primary-bg);"' : ''}>
            <div class="leaderboard-rank ${i < 3 ? 'rank-' + (i + 1) : 'rank-other'}">${i + 1}</div>
            <div class="leaderboard-info">
              <div class="post-avatar" style="${getAvatarStyle(u.name)}">${getInitial(u.name)}</div>
              <div>
                <div class="leaderboard-name">${u.name} ${currentUser && u.id === currentUser.id ? '(我)' : ''}</div>
                <div class="leaderboard-bio">${u.bio}</div>
              </div>
            </div>
            <div class="leaderboard-score">
              <div class="leaderboard-score-value">${u.points}</div>
              <div class="leaderboard-score-label">积分</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  _renderPodium(users) {
    const top3 = users.slice(0, 3);
    const order = [1, 0, 2]; // 第2名、第1名、第3名
    const heights = ['120px', '160px', '100px'];
    const medals = ['🥈', '🥇', '🥉'];
    const colors = ['var(--text-tertiary)', 'var(--accent)', '#D97706'];

    return order.map((idx, i) => {
      const u = top3[idx];
      if (!u) return '<div></div>';
      return `
        <div style="text-align:center;">
          <div style="font-size:40px; margin-bottom:8px;">${medals[idx]}</div>
          <div class="post-avatar" style="width:60px; height:60px; font-size:24px; margin:0 auto 8px; ${getAvatarStyle(u.name)}">${getInitial(u.name)}</div>
          <div style="font-weight:700; font-size:16px;">${u.name}</div>
          <div style="font-size:12px; color:var(--text-tertiary); margin-bottom:8px;">${u.bio}</div>
          <div style="background:${colors[idx]}; color:white; height:${heights[i]}; border-radius:12px 12px 0 0; display:flex; align-items:center; justify-content:center; font-size:28px; font-weight:800;">
            ${u.points}
          </div>
        </div>
      `;
    }).join('');
  },

  // ===== 个人中心 =====
  renderProfile() {
    const user = DB.getCurrentUser();
    if (!user) {
      document.getElementById('mainContent').innerHTML = `
        <div class="card fade-in" style="text-align:center; padding:48px;">
          <div style="font-size:56px; margin-bottom:16px;">👋</div>
          <div style="font-size:20px; font-weight:700; margin-bottom:8px;">欢迎来到 EngLink</div>
          <div style="color:var(--text-secondary); margin-bottom:20px;">登录后开启你的英语学习之旅</div>
          <button class="btn btn-primary btn-lg" onclick="openLoginModal()">立即加入</button>
        </div>
      `;
      this._updateNavUser();
      return;
    }

    const achievements = DB.getAchievements();
    const unlocked = DB.getUnlockedAchievements();
    const myPosts = DB.getPosts().filter(p => p.authorId === user.id);
    const totalLikes = myPosts.reduce((sum, p) => sum + p.likes, 0);
    const streak = DB.getStreak();
    const totalCheckIns = DB.getTotalCheckIns();
    const rank = DB.getLeaderboard().findIndex(u => u.id === user.id) + 1;

    document.getElementById('mainContent').innerHTML = `
      <!-- 个人信息 -->
      <div class="profile-header fade-in">
        <div class="profile-header-content">
          <div class="profile-avatar">${getInitial(user.name)}</div>
          <div style="flex:1;">
            <div class="profile-name">${user.name}</div>
            <div class="profile-bio">${user.bio}</div>
            <div class="profile-badges">
              <span class="profile-badge">🏆 排名 #${rank}</span>
              <span class="profile-badge">⭐ ${user.points} 积分</span>
              <span class="profile-badge">🔥 连续 ${streak} 天</span>
              <span class="profile-badge">📅 累计 ${totalCheckIns} 天</span>
            </div>
          </div>
          <button class="btn btn-ghost" style="color:white; border-color:rgba(255,255,255,0.3);" onclick="Pages.logout()">退出登录</button>
        </div>
      </div>

      <!-- 数据统计 -->
      <div class="stats-row fade-in">
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--primary-bg)">📝</div>
          <div class="stat-value">${myPosts.length}</div>
          <div class="stat-label">发布帖子</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--danger-bg)">❤️</div>
          <div class="stat-value">${totalLikes}</div>
          <div class="stat-label">获得点赞</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--secondary-bg)">📚</div>
          <div class="stat-value">${DB.getLearnedWords().length}</div>
          <div class="stat-label">已学词汇</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:var(--accent-bg)">🏅</div>
          <div class="stat-value">${unlocked.length}/${achievements.length}</div>
          <div class="stat-label">解锁成就</div>
        </div>
      </div>

      <!-- 成就墙 -->
      <div class="section-title">🏅 成就墙</div>
      <div class="achievement-grid" style="margin-bottom:32px;">
        ${achievements.map(a => {
          const isUnlocked = unlocked.includes(a.id);
          return `
            <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
              <div class="achievement-icon">${a.icon}</div>
              <div class="achievement-name">${a.name}</div>
              <div class="achievement-desc">${a.desc}</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 我的帖子 -->
      <div class="section-title">📝 我的帖子</div>
      <div>
        ${myPosts.length > 0
          ? myPosts.map(p => this._postCardHTML(p)).join('')
          : `<div class="empty-state">
              <div class="empty-state-icon">✍️</div>
              <div class="empty-state-text">还没有发过帖子</div>
              <div class="empty-state-sub">分享你的学习经验，帮助更多人</div>
            </div>`
        }
      </div>
    `;
  },

  logout() {
    DB.logout();
    Toast.show('已退出登录', 'default');
    this._updateNavUser();
    Router.go('home');
  },

  // ===== 帖子卡片 HTML =====
  _postCardHTML(post) {
    const author = DB.getUser(post.authorId);
    const liked = DB.isLiked(post.id);
    const catInfo = CATEGORY_LABELS[post.category] || { label: '其他', icon: '📝' };

    return `
      <div class="post-card fade-in">
        <div class="post-meta">
          <div class="post-avatar" style="${getAvatarStyle(author.name)}">${getInitial(author.name)}</div>
          <div class="post-author-info">
            <div class="post-author">${author.name}</div>
            <div class="post-time">${formatDate(post.createdAt)}</div>
          </div>
          <span class="post-category-tag cat-${post.category}">${catInfo.icon} ${catInfo.label}</span>
        </div>
        <div class="post-title" onclick="Router.go('post/${post.id}')">${post.title}</div>
        <div class="post-content">${post.content}</div>
        ${post.tags.length > 0 ? `<div class="post-tags">${post.tags.map(t => `<span class="post-tag">#${t}</span>`).join('')}</div>` : ''}
        <div class="post-actions">
          <div class="post-action ${liked ? 'liked' : ''}" onclick="Pages.toggleLike('${post.id}')">
            ${Icons.like}
            <span>${post.likes}</span>
          </div>
          <div class="post-action" onclick="Router.go('post/${post.id}')">
            ${Icons.comment}
            <span>${post.comments}</span>
          </div>
          <div class="post-action">
            ${Icons.eye}
            <span>${post.views}</span>
          </div>
        </div>
      </div>
    `;
  },

  _updateNavUser() {
    const user = DB.getCurrentUser();
    const avatarEl = document.getElementById('navAvatar');
    const nameEl = document.getElementById('navUsername');
    if (user) {
      avatarEl.textContent = getInitial(user.name);
      avatarEl.setAttribute('style', getAvatarStyle(user.name));
      nameEl.textContent = user.name;
    } else {
      avatarEl.textContent = '游';
      avatarEl.setAttribute('style', 'background: linear-gradient(135deg, #F59E0B, #F97316)');
      nameEl.textContent = '游客';
    }
  },
};

// ===== 词汇卡片控制 =====
const Flashcard = {
  index: 0,
  flipped: false,

  flip() {
    this.flipped = !this.flipped;
    document.getElementById('flashcard').classList.toggle('flipped');
  },

  show(idx) {
    const vocab = DB.getVocabulary();
    this.index = ((idx % vocab.length) + vocab.length) % vocab.length;
    this.flipped = false;
    const card = document.getElementById('flashcard');
    card.classList.remove('flipped');
    const w = vocab[this.index];
    document.getElementById('fcWord').textContent = w.word;
    document.getElementById('fcPhonetic').textContent = w.phonetic;
    document.getElementById('fcMeaning').textContent = w.meaning;
    document.getElementById('fcExample').textContent = `"${w.example}"`;
    document.getElementById('fcIndex').textContent = this.index + 1;
    // 更新"已掌握"按钮状态
    const learned = DB.getLearnedWords();
    const btn = document.getElementById('learnWordBtn');
    if (learned.includes(w.word)) {
      btn.textContent = '✓ 已掌握';
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-ghost');
    } else {
      btn.textContent = '✓ 标记已掌握';
      btn.classList.add('btn-secondary');
      btn.classList.remove('btn-ghost');
    }
  },

  next() { this.show(this.index + 1); },
  prev() { this.show(this.index - 1); },

  markLearned() {
    const vocab = DB.getVocabulary();
    const word = vocab[this.index].word;
    const learned = DB.getLearnedWords();
    if (learned.includes(word)) {
      Toast.show('这个单词已经标记过了', 'default');
    } else {
      DB.learnWord(word);
      Toast.show(`已掌握 "${word}"！+3 积分`, 'success');
      this.show(this.index);
    }
  },
};

// ===== 模态框 =====
function openPostModal() {
  if (!DB.getCurrentUser()) {
    Toast.show('请先登录', 'warning');
    openLoginModal();
    return;
  }
  document.getElementById('postModal').classList.add('active');
}

function closePostModal() {
  document.getElementById('postModal').classList.remove('active');
  document.getElementById('postTitle').value = '';
  document.getElementById('postContent').value = '';
  document.getElementById('postTags').value = '';
}

function openLoginModal() {
  document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('active');
}

// ===== 打赏模态框 =====
function openTipModal() {
  document.getElementById('tipModal').classList.add('active');
}

function closeTipModal() {
  document.getElementById('tipModal').classList.remove('active');
}

function submitPost() {
  const category = document.getElementById('postCategory').value;
  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();
  const tags = document.getElementById('postTags').value.trim();

  if (!title) { Toast.show('请输入标题', 'warning'); return; }
  if (!content) { Toast.show('请输入内容', 'warning'); return; }

  const post = DB.createPost(category, title, content, tags);
  if (post) {
    Toast.show('发帖成功！+10 积分 🎉', 'success');
    closePostModal();
    Router.go('post/' + post.id);
  }
}

function submitLogin() {
  const name = document.getElementById('loginName').value.trim();
  const bio = document.getElementById('loginBio').value.trim();
  if (!name) { Toast.show('请输入昵称', 'warning'); return; }
  DB.login(name, bio);
  Toast.show(`欢迎加入 EngLink，${name}！`, 'success');
  closeLoginModal();
  Pages._updateNavUser();
  // 重新渲染当前页面
  Router.handleRoute();
}

// ===== 初始化 =====
function initApp() {
  DB.init();

  // 导航用户信息
  Pages._updateNavUser();

  // 绑定事件
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
  });

  document.getElementById('navUser').addEventListener('click', () => {
    Router.go('profile');
  });

  // 模态框事件
  document.getElementById('postModalClose').addEventListener('click', closePostModal);
  document.getElementById('postCancel').addEventListener('click', closePostModal);
  document.getElementById('postSubmit').addEventListener('click', submitPost);
  document.getElementById('postModal').addEventListener('click', (e) => {
    if (e.target.id === 'postModal') closePostModal();
  });

  document.getElementById('loginModalClose').addEventListener('click', closeLoginModal);
  document.getElementById('loginCancel').addEventListener('click', closeLoginModal);
  document.getElementById('loginSubmit').addEventListener('click', submitLogin);
  document.getElementById('loginModal').addEventListener('click', (e) => {
    if (e.target.id === 'loginModal') closeLoginModal();
  });

  // 打赏模态框事件
  document.getElementById('tipModalClose').addEventListener('click', closeTipModal);
  document.getElementById('tipCancel').addEventListener('click', closeTipModal);
  document.getElementById('tipModal').addEventListener('click', (e) => {
    if (e.target.id === 'tipModal') closeTipModal();
  });

  // ESC 关闭模态框
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePostModal();
      closeLoginModal();
      closeTipModal();
    }
  });

  // 启动路由
  Router.init();
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
