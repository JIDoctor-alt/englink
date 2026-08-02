/* ========================================
   EngLink · 数据层
   ======================================== */

// ===== 工具函数 =====
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const formatDate = (ts) => {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  const hour = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);
  if (min < 1) return '刚刚';
  if (min < 60) return `${min} 分钟前`;
  if (hour < 24) return `${hour} 小时前`;
  if (day < 30) return `${day} 天前`;
  const d = new Date(ts);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
};

const avatarColors = [
  ['#4F46E5', '#7C3AED'], ['#10B981', '#059669'], ['#F59E0B', '#F97316'],
  ['#EF4444', '#DC2626'], ['#3B82F6', '#2563EB'], ['#8B5CF6', '#7C3AED'],
  ['#EC4899', '#DB2777'], ['#14B8A6', '#0D9488'], ['#F97316', '#EA580C'],
];

const getAvatarStyle = (name) => {
  const idx = name.charCodeAt(0) % avatarColors.length;
  const [c1, c2] = avatarColors[idx];
  return `background: linear-gradient(135deg, ${c1}, ${c2})`;
};

const getInitial = (name) => name.charAt(0).toUpperCase();

// ===== 初始种子数据 =====
const SEED_DATA = {
  users: [
    { id: 'u1', name: 'Alice', bio: '雅思7.5冲刺中 | 每天背50个单词', points: 3280, joinedAt: Date.now() - 86400000 * 120, avatarColor: 0 },
    { id: 'u2', name: 'Bob', bio: '外企打工人，提升商务英语', points: 2150, joinedAt: Date.now() - 86400000 * 90, avatarColor: 1 },
    { id: 'u3', name: 'Cathy', bio: '考研英语一 80分目标', points: 4120, joinedAt: Date.now() - 86400000 * 200, avatarColor: 2 },
    { id: 'u4', name: 'David', bio: '英语口语爱好者 | Toastmasters', points: 3680, joinedAt: Date.now() - 86400000 * 150, avatarColor: 3 },
    { id: 'u5', name: 'Emma', bio: '四六级已过，准备托福', points: 1890, joinedAt: Date.now() - 86400000 * 60, avatarColor: 4 },
    { id: 'u6', name: 'Frank', bio: '每天坚持晨读30分钟', points: 2890, joinedAt: Date.now() - 86400000 * 100, avatarColor: 5 },
    { id: 'u7', name: 'Grace', bio: '英语专业 | TEM-8备考', points: 4520, joinedAt: Date.now() - 86400000 * 300, avatarColor: 6 },
    { id: 'u8', name: 'Henry', bio: '程序员，看英文文档无障碍', points: 1560, joinedAt: Date.now() - 86400000 * 45, avatarColor: 7 },
    { id: 'u9', name: 'Ivy', bio: '留学准备中，目标美研Top30', points: 3980, joinedAt: Date.now() - 86400000 * 180, avatarColor: 8 },
    { id: 'u10', name: 'Jack', bio: '初中英语老师，与学生共成长', points: 2340, joinedAt: Date.now() - 86400000 * 80, avatarColor: 0 },
  ],

  posts: [
    {
      id: 'p1', authorId: 'u3', category: 'exam', title: '考研英语阅读满分经验分享：如何精读真题',
      content: '大家好！考研英语一阅读拿了满分，分享一下我的精读方法：\n\n1. 第一遍限时做题，不查单词\n2. 第二遍逐句翻译，标注生词和长难句\n3. 第三遍分析题目选项，找出每个错误选项为什么错\n4. 第四遍整理同义替换词组\n\n精读一篇可能要2-3小时，但坚持精读30篇真题，阅读能力会有质的飞跃。关键在于"精"而不在于"多"。\n\n大家有什么问题欢迎评论区交流！',
      tags: ['考研', '阅读', '经验分享'], likes: 156, views: 2340, comments: 23,
      createdAt: Date.now() - 3600000 * 5,
    },
    {
      id: 'p2', authorId: 'u1', category: 'study', title: '坚持了100天背单词，从4000词汇量到8000+',
      content: '今天是我背单词的第100天！分享一些心得：\n\n工具：用的是艾宾浩斯记忆法 + Anki\n方法：每天50个新词 + 复习旧词\n关键：不要追求每天背很多，而是每天坚持复习\n\n前30天最难熬，经常想放弃。但到了第40天左右，发现阅读英文文章明显顺畅了，这种正反馈真的很有动力。\n\n现在词汇量测试8200，目标10000！一起加油！',
      tags: ['词汇', '坚持', 'Anki'], likes: 203, views: 3120, comments: 35,
      createdAt: Date.now() - 3600000 * 12,
    },
    {
      id: 'p3', authorId: 'u4', category: 'career', title: '外企面试全英文如何准备？干货分享',
      content: '最近帮几个朋友mock interview，总结一些高频问题和准备思路：\n\n1. Tell me about yourself — 用Present-Past-Future结构\n2. Why this company? — 一定要做公司调研\n3. Strengths & Weaknesses — 弱点要真实+改进计划\n4. Behavioral questions — 用STAR方法回答\n\n最大的建议：不要背稿子！准备key points，用自己的话表达。面试官一眼就能看出谁在背稿。\n\n评论区可以帮你mock，留下你的问题！',
      tags: ['面试', '职场', '外企'], likes: 178, views: 2890, comments: 28,
      createdAt: Date.now() - 3600000 * 24,
    },
    {
      id: 'p4', authorId: 'u7', category: 'study', title: '英语专业学姐：如何高效使用英英词典',
      content: '很多同学问我该不该用英英词典，我的建议是：越早切换越好。\n\n推荐顺序：\n1. 初级：Oxford Learner\'s Dictionary（释义简单易懂）\n2. 中级：Cambridge Dictionary（例句丰富）\n3. 高级：Oxford English Dictionary（最权威）\n\n用英英词典的好处：\n- 理解词汇的精确含义（很多词中文翻译有偏差）\n- 培养英语思维\n- 顺便学习释义中的其他词汇\n\n一开始会不习惯，坚持一个月就回不去了。',
      tags: ['词典', '学习方法', '英语思维'], likes: 142, views: 1980, comments: 19,
      createdAt: Date.now() - 3600000 * 36,
    },
    {
      id: 'p5', authorId: 'u9', category: 'resources', title: '托福备考资源大全（2026更新版）',
      content: '整理了我觉得最好用的托福备考资源，全部免费或低价：\n\n听力：\n- TED Talks（练泛听）\n- BBC 6 Minute English（适合入门）\n- CrashCourse（学科词汇）\n\n口语：\n- Speechling（免费发音纠正）\n- 自己录音回放（最有效但最痛苦）\n\n阅读：\n- The Economist（难度高但优质）\n- National Geographic（科普类文章）\n\n写作：\n- Write & Improve（免费AI评分）\n- Grammarly（语法检查）\n\n祝大家备考顺利！',
      tags: ['托福', '资源', '免费'], likes: 231, views: 4120, comments: 42,
      createdAt: Date.now() - 3600000 * 48,
    },
    {
      id: 'p6', authorId: 'u2', category: 'career', title: '用英语写邮件总是不地道？分享几个实用模板',
      content: '在外企工作3年，总结一些高频邮件场景的地道表达：\n\n开头：\n- I hope this email finds you well.（经典但好用）\n- Just following up on...（跟进邮件）\n\n请求：\n- Could you please...（礼貌请求）\n- I was wondering if you could...（更委婉）\n\n结尾：\n- Looking forward to hearing from you.\n- Please let me know if you have any questions.\n\n避免中式英语：\n- 别说 "Please see the attachment" → 说 "I\'ve attached..."\n- 别说 "Reply me" → 说 "Get back to me"\n\n大家还有什么邮件场景需要帮忙的？',
      tags: ['邮件', '职场英语', '模板'], likes: 167, views: 2560, comments: 22,
      createdAt: Date.now() - 3600000 * 60,
    },
    {
      id: 'p7', authorId: 'u5', category: 'culture', title: '看美剧学英语的正确打开方式',
      content: '很多同学说看美剧学不到英语，其实是你打开方式不对：\n\n错误方式：开着中文字幕看，眼睛只看字幕\n正确方式：\n1. 第一遍：英文字幕，记录生词和好句\n2. 第二遍：无字幕，练听力\n3. 第三遍：跟读模仿，练口语\n\n推荐入门美剧：\n- Friends（经典入门，日常用语多）\n- Modern Family（家庭场景，词汇实用）\n- The Big Bang Theory（进阶，语速快+专业词汇）\n\n关键是选自己感兴趣的内容，不然坚持不下去。',
      tags: ['美剧', '听力', '口语'], likes: 189, views: 3010, comments: 31,
      createdAt: Date.now() - 3600000 * 72,
    },
    {
      id: 'p8', authorId: 'u6', category: 'free', title: '晨读打卡第60天！分享我每天的晨读流程',
      content: '坚持晨读60天了，分享我的每日流程：\n\n6:30 起床\n6:40 大声朗读新闻3遍（BBC News或VOA）\n7:00 精读一篇短文，查生词\n7:20 用刚学的词造3个句子\n7:30 录音对比原声，纠正发音\n\n最大的变化：\n- 口语流利度明显提升\n- 晨读后一整天精神状态好\n- 形成了生物钟，不用闹钟也能醒\n\n有人想一起组晨读打卡群吗？',
      tags: ['晨读', '打卡', '口语'], likes: 145, views: 1980, comments: 26,
      createdAt: Date.now() - 3600000 * 84,
    },
  ],

  comments: [
    { id: 'c1', postId: 'p1', authorId: 'u1', content: '太实用了！请问精读的时候要不要翻译成中文？', createdAt: Date.now() - 3600000 * 4 },
    { id: 'c2', postId: 'p1', authorId: 'u3', content: '建议第一遍不翻译，第二遍可以对照中文翻译检查理解是否正确。重点是理解句子结构。', createdAt: Date.now() - 3600000 * 3 },
    { id: 'c3', postId: 'p1', authorId: 'u5', content: '马住！正在备考，刚好用上这个方法', createdAt: Date.now() - 3600000 * 2 },
    { id: 'c4', postId: 'p2', authorId: 'u7', content: '100天太厉害了！我最多坚持了20天就放弃了…', createdAt: Date.now() - 3600000 * 10 },
    { id: 'c5', postId: 'p2', authorId: 'u1', content: '前面确实最难，过了30天就有惯性了。找个学习伙伴互相监督会好很多！', createdAt: Date.now() - 3600000 * 8 },
    { id: 'c6', postId: 'p3', authorId: 'u8', content: 'STAR方法能详细说说吗？马上要面试了有点慌', createdAt: Date.now() - 3600000 * 20 },
    { id: 'c7', postId: 'p3', authorId: 'u4', content: 'Situation-Task-Action-Result，先说背景，再说任务，然后是你的行动，最后是结果。重点放在Action上！', createdAt: Date.now() - 3600000 * 18 },
    { id: 'c8', postId: 'p5', authorId: 'u10', content: '收藏了！资源太全了，感谢分享', createdAt: Date.now() - 3600000 * 40 },
    { id: 'c9', postId: 'p5', authorId: 'u2', content: 'Write & Improve 真的好用，用了半年写作提了5分', createdAt: Date.now() - 3600000 * 35 },
    { id: 'c10', postId: 'p8', authorId: 'u1', content: '想加入晨读群！每天几点开始？', createdAt: Date.now() - 3600000 * 70 },
    { id: 'c11', postId: 'p8', authorId: 'u6', content: '6:40开始，可以来！我在评论区建了个群链接', createdAt: Date.now() - 3600000 * 65 },
  ],

  vocabulary: [
    { word: 'resilient', phonetic: '/rɪˈzɪliənt/', meaning: 'adj. 有韧性的；能快速恢复的', example: 'Children are often more resilient than adults when facing setbacks.' },
    { word: 'meticulous', phonetic: '/məˈtɪkjələs/', meaning: 'adj. 一丝不苟的；极其谨慎的', example: 'She is meticulous about every detail in her research.' },
    { word: 'eloquent', phonetic: '/ˈeləkwənt/', meaning: 'adj. 雄辩的；有口才的', example: 'His eloquent speech moved the entire audience.' },
    { word: 'pragmatic', phonetic: '/præɡˈmætɪk/', meaning: 'adj. 务实的；实用主义的', example: 'We need a pragmatic approach to solve this problem.' },
    { word: 'ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', meaning: 'adj. 无处不在的；普遍存在的', example: 'Smartphones have become ubiquitous in modern life.' },
    { word: 'serendipity', phonetic: '/ˌserənˈdɪpəti/', meaning: 'n. 意外发现；机缘巧合', example: 'Finding this book was pure serendipity.' },
    { word: 'paradigm', phonetic: '/ˈpærədaɪm/', meaning: 'n. 范例；思维模式', example: 'This technology represents a new paradigm in computing.' },
    { word: 'ephemeral', phonetic: '/ɪˈfemərəl/', meaning: 'adj. 短暂的；转瞬即逝的', example: 'Fame on social media is often ephemeral.' },
    { word: 'candid', phonetic: '/ˈkændɪd/', meaning: 'adj. 坦率的；直言不讳的', example: 'I appreciate your candid feedback on my work.' },
    { word: 'profound', phonetic: '/prəˈfaʊnd/', meaning: 'adj. 深刻的；意义深远的', example: 'The book had a profound impact on my worldview.' },
    { word: 'diligent', phonetic: '/ˈdɪlɪdʒənt/', meaning: 'adj. 勤奋的；用功的', example: 'She is a diligent student who never misses a deadline.' },
    { word: 'ambivalent', phonetic: '/æmˈbɪvələnt/', meaning: 'adj. 矛盾的；摇摆不定的', example: 'I feel ambivalent about moving to a new city.' },
    { word: 'innovative', phonetic: '/ˈɪnəveɪtɪv/', meaning: 'adj. 创新的；革新的', example: 'The company is known for its innovative products.' },
    { word: 'tenacious', phonetic: '/təˈneɪʃəs/', meaning: 'adj. 坚韧不拔的；顽强的', example: 'Her tenacious effort finally paid off.' },
    { word: 'lucid', phonetic: '/ˈluːsɪd/', meaning: 'adj. 清晰的；明白易懂的', example: 'The professor gave a lucid explanation of the theory.' },
  ],

  grammar: [
    {
      title: 'Present Perfect vs Past Simple',
      level: 'intermediate',
      body: '现在完成时（have/has + 过去分词）强调过去的动作对现在的影响，或经历。一般过去时强调动作发生在过去的某个具体时间。\n\n<strong>关键区别：</strong>如果有明确的时间状语（yesterday, last week, in 2020），用一般过去时；如果没有具体时间，且强调与现在的联系，用现在完成时。',
      example: 'I have lost my keys. (钥匙现在还没找到)\nI lost my keys yesterday. (只是陈述过去发生的事)',
    },
    {
      title: 'Used to vs Be used to',
      level: 'intermediate',
      body: '<strong>used to + 动词原形</strong>：表示过去经常做但现在不再做的事。\n<strong>be used to + 动名词</strong>：表示习惯于做某事。\n\n这两个结构看起来相似但含义完全不同，是考试和口语中的高频考点。',
      example: 'I used to play basketball every weekend. (以前常打，现在不打了)\nI am used to getting up early. (已经习惯早起)',
    },
    {
      title: 'Subjunctive Mood in Conditionals',
      level: 'advanced',
      body: '虚拟语气用于表达与事实相反的假设。\n\n<strong>与现在事实相反：</strong>If + 过去式, would + 动词原形\n<strong>与过去事实相反：</strong>If + had + 过去分词, would have + 过去分词\n<strong>与将来事实相反：</strong>If + were to/would, would + 动词原形',
      example: 'If I were you, I would accept the offer.\nIf I had studied harder, I would have passed the exam.',
    },
    {
      title: 'Gerund vs Infinitive',
      level: 'beginner',
      body: '有些动词后面接动名词（doing），有些接不定式（to do），有些两者都可以但含义不同。\n\n<strong>接doing的常见动词：</strong>enjoy, avoid, mind, finish, practice\n<strong>接to do的常见动词：</strong>want, decide, hope, promise, agree\n<strong>含义不同的：</strong>stop doing (停止正在做的事) / stop to do (停下来去做另一件事)',
      example: 'I enjoy reading novels. (不能用 to read)\nI stopped smoking. (戒烟了)\nI stopped to smoke. (停下来抽根烟)',
    },
    {
      title: 'Inversion for Emphasis',
      level: 'advanced',
      body: '倒装句用于强调，常用于正式文体和文学作品中。当否定词或含有否定意义的词置于句首时，主谓要倒装。\n\n<strong>常见倒装词：</strong>Never, Rarely, Seldom, Hardly, No sooner, Not only',
      example: 'Never have I seen such a beautiful sunset.\nNot only did she win the competition, but she also broke the record.',
    },
    {
      title: 'Articles: A/An/The/Zero',
      level: 'beginner',
      body: '冠词是英语学习者的痛点。基本原则：\n\n<strong>a/an：</strong>泛指单数可数名词（首次提及）\n<strong>the：</strong>特指（双方都知道的，或前文提过的）\n<strong>零冠词：</strong>泛指复数/不可数名词、专有名词、抽象概念',
      example: 'I saw a dog. The dog was running. (首次用a，再次提及用the)\nDogs are loyal animals. (泛指复数，不用冠词)',
    },
  ],

  challenges: [
    {
      question: 'Choose the correct sentence:',
      options: [
        'I have been to Paris last year.',
        'I went to Paris last year.',
        'I have gone to Paris last year.',
        'I was going to Paris last year.',
      ],
      answer: 1,
      explanation: '有明确过去时间状语 last year 时，使用一般过去时 went。',
    },
    {
      question: 'Fill in the blank: "She is used to ___ early."',
      options: ['wake up', 'waking up', 'woke up', 'wakes up'],
      answer: 1,
      explanation: 'be used to + 动名词，表示"习惯于做某事"。',
    },
    {
      question: 'Which word is a synonym for "resilient"?',
      options: ['fragile', 'tough', 'confused', 'distant'],
      answer: 1,
      explanation: 'resilient 意为"有韧性的"，tough 也有"坚韧的"之意。',
    },
    {
      question: 'Choose the correct article: "___ sun rises in ___ east."',
      options: ['A / an', 'The / the', 'A / the', 'The / an'],
      answer: 1,
      explanation: '世界上独一无二的事物前加 the（the sun），方位前也加 the（the east）。',
    },
    {
      question: 'What does "ubiquitous" mean?',
      options: ['Very rare', 'Everywhere at once', 'Extremely beautiful', 'Difficult to understand'],
      answer: 1,
      explanation: 'ubiquitous 意为"无处不在的；普遍存在的"。',
    },
  ],

  achievements: [
    { id: 'a1', name: '初出茅庐', desc: '完成首次登录', icon: '🌱', condition: 'login' },
    { id: 'a2', name: '社区新星', desc: '发布第一个帖子', icon: '⭐', condition: 'firstPost' },
    { id: 'a3', name: '热议达人', desc: '帖子获得50+赞', icon: '🔥', condition: 'hotPost' },
    { id: 'a4', name: '词汇先锋', desc: '学习50个单词', icon: '📚', condition: 'vocab50' },
    { id: 'a5', name: '坚持7天', desc: '连续打卡7天', icon: '📅', condition: 'streak7' },
    { id: 'a6', name: '坚持30天', desc: '连续打卡30天', icon: '🏆', condition: 'streak30' },
    { id: 'a7', name: '语法大师', desc: '完成全部语法课程', icon: '🎓', condition: 'grammarAll' },
    { id: 'a8', name: '挑战王者', desc: '答对10道每日挑战', icon: '👑', condition: 'quiz10' },
    { id: 'a9', name: '热心助人', desc: '发表20条评论', icon: '💬', condition: 'comments20' },
    { id: 'a10', name: '社区栋梁', desc: '累计获得100积分', icon: '💎', condition: 'points100' },
  ],
};

// ===== 数据管理器 =====
const DB = {
  _data: null,

  init() {
    const saved = localStorage.getItem('englink_data');
    if (saved) {
      try {
        this._data = JSON.parse(saved);
        // 确保种子数据存在
        if (!this._data.users || this._data.users.length === 0) {
          this._data = JSON.parse(JSON.stringify(SEED_DATA));
          this._data.currentUser = null;
          this._data.checkIns = {};
          this._data.learnedWords = [];
          this._data.likedPosts = [];
          this._data.completedChallenges = [];
          this._data.unlockedAchievements = [];
        }
      } catch (e) {
        this._data = this._freshData();
      }
    } else {
      this._data = this._freshData();
    }
    this.save();
  },

  _freshData() {
    const d = JSON.parse(JSON.stringify(SEED_DATA));
    d.currentUser = null;
    d.checkIns = {};
    d.learnedWords = [];
    d.likedPosts = [];
    d.completedChallenges = [];
    d.unlockedAchievements = [];
    return d;
  },

  save() {
    localStorage.setItem('englink_data', JSON.stringify(this._data));
  },

  // 用户
  getUsers() { return this._data.users; },
  getUser(id) { return this._data.users.find(u => u.id === id); },
  getCurrentUser() {
    if (!this._data.currentUser) return null;
    return this._data.users.find(u => u.id === this._data.currentUser) || null;
  },
  login(name, bio) {
    let user = this._data.users.find(u => u.name === name);
    if (!user) {
      user = {
        id: uid(),
        name,
        bio: bio || '英语学习爱好者',
        points: 0,
        joinedAt: Date.now(),
        avatarColor: name.charCodeAt(0) % avatarColors.length,
      };
      this._data.users.push(user);
    } else {
      if (bio) user.bio = bio;
    }
    this._data.currentUser = user.id;
    this.unlockAchievement('a1');
    this.save();
    return user;
  },
  logout() {
    this._data.currentUser = null;
    this.save();
  },
  addPoints(pts) {
    const u = this.getCurrentUser();
    if (u) {
      u.points += pts;
      if (u.points >= 100) this.unlockAchievement('a10');
      this.save();
    }
  },

  // 帖子
  getPosts(category) {
    if (category && category !== 'all') {
      return this._data.posts.filter(p => p.category === category);
    }
    return this._data.posts;
  },
  getPost(id) { return this._data.posts.find(p => p.id === id); },
  createPost(category, title, content, tags) {
    const u = this.getCurrentUser();
    if (!u) return null;
    const post = {
      id: uid(),
      authorId: u.id,
      category,
      title,
      content,
      tags: tags ? tags.split(/\s+/).filter(Boolean) : [],
      likes: 0,
      views: 0,
      comments: 0,
      createdAt: Date.now(),
    };
    this._data.posts.unshift(post);
    this.addPoints(10);
    // 检查是否首次发帖
    const userPosts = this._data.posts.filter(p => p.authorId === u.id);
    if (userPosts.length === 1) this.unlockAchievement('a2');
    this.save();
    return post;
  },
  likePost(id) {
    const post = this.getPost(id);
    if (!post) return;
    const liked = this._data.likedPosts.includes(id);
    if (liked) {
      post.likes--;
      this._data.likedPosts = this._data.likedPosts.filter(pid => pid !== id);
    } else {
      post.likes++;
      this._data.likedPosts.push(id);
      if (post.likes >= 50) this.unlockAchievement('a3');
      this.addPoints(2);
    }
    this.save();
    return !liked;
  },
  isLiked(id) { return this._data.likedPosts.includes(id); },
  addView(id) {
    const post = this.getPost(id);
    if (post) { post.views++; this.save(); }
  },

  // 评论
  getComments(postId) {
    return this._data.comments.filter(c => c.postId === postId).sort((a, b) => a.createdAt - b.createdAt);
  },
  addComment(postId, content) {
    const u = this.getCurrentUser();
    if (!u) return null;
    const comment = {
      id: uid(),
      postId,
      authorId: u.id,
      content,
      createdAt: Date.now(),
    };
    this._data.comments.push(comment);
    const post = this.getPost(postId);
    if (post) post.comments++;
    this.addPoints(5);
    // 检查评论成就
    const userComments = this._data.comments.filter(c => c.authorId === u.id);
    if (userComments.length >= 20) this.unlockAchievement('a9');
    this.save();
    return comment;
  },

  // 词汇
  getVocabulary() { return this._data.vocabulary; },
  getLearnedWords() { return this._data.learnedWords; },
  learnWord(word) {
    if (!this._data.learnedWords.includes(word)) {
      this._data.learnedWords.push(word);
      this.addPoints(3);
      if (this._data.learnedWords.length >= 50) this.unlockAchievement('a4');
      this.save();
    }
  },

  // 打卡
  getCheckIns() { return this._data.checkIns; },
  isCheckedIn(date) {
    const u = this.getCurrentUser();
    if (!u) return false;
    return this._data.checkIns[date] && this._data.checkIns[date].includes(u.id);
  },
  checkIn(date, note) {
    const u = this.getCurrentUser();
    if (!u) return false;
    if (!this._data.checkIns[date]) this._data.checkIns[date] = [];
    if (this._data.checkIns[date].includes(u.id)) return false;
    this._data.checkIns[date].push(u.id);
    this.addPoints(15);
    // 检查连续打卡
    const streak = this.getStreak();
    if (streak >= 7) this.unlockAchievement('a5');
    if (streak >= 30) this.unlockAchievement('a6');
    this.save();
    return true;
  },
  getStreak() {
    const u = this.getCurrentUser();
    if (!u) return 0;
    let streak = 0;
    let d = new Date();
    // 如果今天还没打卡，从昨天开始算
    if (!this.isCheckedIn(todayStr())) {
      d.setDate(d.getDate() - 1);
    }
    while (true) {
      const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (this._data.checkIns[ds] && this._data.checkIns[ds].includes(u.id)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  },
  getTotalCheckIns() {
    const u = this.getCurrentUser();
    if (!u) return 0;
    let count = 0;
    Object.values(this._data.checkIns).forEach(arr => {
      if (arr.includes(u.id)) count++;
    });
    return count;
  },

  // 挑战
  getChallenges() { return this._data.challenges; },
  getCompletedChallenges() { return this._data.completedChallenges; },
  completeChallenge(idx, correct) {
    const key = `challenge_${idx}`;
    if (!this._data.completedChallenges.includes(key)) {
      this._data.completedChallenges.push(key);
      if (correct) this.addPoints(8);
    }
    // 检查成就
    const correctCount = this._data.completedChallenges.length;
    if (correctCount >= 10) this.unlockAchievement('a8');
    this.save();
  },

  // 语法
  getGrammar() { return this._data.grammar; },

  // 成就
  getAchievements() { return this._data.achievements; },
  getUnlockedAchievements() { return this._data.unlockedAchievements; },
  unlockAchievement(id) {
    if (!this._data.unlockedAchievements.includes(id)) {
      this._data.unlockedAchievements.push(id);
      this.addPoints(20);
      const a = this._data.achievements.find(x => x.id === id);
      if (a) Toast.show(`🏆 解锁成就：${a.name}！`, 'success');
      this.save();
    }
  },
  isAchievementUnlocked(id) { return this._data.unlockedAchievements.includes(id); },

  // 排行榜
  getLeaderboard() {
    return [...this._data.users].sort((a, b) => b.points - a.points);
  },

  // 每日一词（根据日期选择）
  getDailyWord() {
    const d = new Date();
    const dayIndex = Math.floor(d.getTime() / 86400000);
    return this._data.vocabulary[dayIndex % this._data.vocabulary.length];
  },
};
