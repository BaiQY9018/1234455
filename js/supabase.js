// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://tstbbalphdxtilvldnsr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rHtCX_Y10AYxbSVC9R0nhaqNR77B7jle';

// 只创建这一次实例！！
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabase = supabase;

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
  if (!navLinks) return; // 页面没有#nav-links就直接退出，不会报错

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
  updateNav();
  location.href = 'index.html';
}

function showAlert(msg) {
  alert(msg);
}

document.addEventListener('DOMContentLoaded', updateNav);
