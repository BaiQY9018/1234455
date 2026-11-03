// Supabase 配置
const SUPABASE_URL = 'https://tstbbalphdxtilvldnsr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rHTcX_Y10AYxb5Vc9r0hqg_nR77Bjle';

// 初始化 Supabase 客户端
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 工具函数：格式化时间
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 工具函数：获取当前登录用户
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// 工具函数：检查登录状态，更新导航
async function updateNav() {
  const user = await getCurrentUser();
  const navLinks = document.getElementById('nav-links');
  
  if (user) {
    navLinks.innerHTML = `
      <a href="index.html">首页</a>
      <a href="collections.html">诗集</a>
      <a href="notes.html">感言墙</a>
      <a href="publish.html">发布</a>
      <a href="admin.html">我的</a>
      <a href="#" onclick="logout()">退出</a>
    `;
  } else {
    navLinks.innerHTML = `
      <a href="index.html">首页</a>
      <a href="collections.html">诗集</a>
      <a href="notes.html">感言墙</a>
      <a href="auth.html">登录</a>
    `;
  }
}

// 退出登录
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

// 显示提示信息
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  
  const container = document.querySelector('.container');
  container.insertBefore(alertDiv, container.firstChild);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}
