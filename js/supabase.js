const SUPABASE_URL = 'https://tstbbalphdxtilvldnsr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rHTcX_Y10AYxb5Vc9r0hqg_nR77Bjle';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

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

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

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
