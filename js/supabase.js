// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@3/+esm'

const SUPABASE_URL = "https://tstbbalphdxtilvldnsr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_rHTcX_Y10AYxb5Vc9r0hqg_nR77Bjle";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
window.supabase = supabase;

function formatTime(isoStr) {
  const date = new Date(isoStr);
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
  const navBox = document.getElementById('nav-links');
  if (!navBox) return;
  if(user){
    navBox.innerHTML = `
      <a href="index.html">首页</a>
      <a href="collections.html">诗集</a>
      <a href="notes.html">感言墙</a>
      <a href="publish.html">发布</a>
      <a href="admin.html">我的</a>
      <a href="#" onclick="logout()">退出</a>
    `
  }else{
    navBox.innerHTML = `
      <a href="index.html">首页</a>
      <a href="collections.html">诗集</a>
      <a href="notes.html">感言墙</a>
      <a href="auth.html">登录</a>
    `
  }
}

async function logout() {
  await supabase.auth.signOut();
  updateNav();
  location.href = 'auth.html';
}

document.addEventListener('DOMContentLoaded', updateNav);

