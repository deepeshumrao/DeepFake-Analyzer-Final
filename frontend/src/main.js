import { _supa } from './api/supabase.js';
import { AppState } from './store/state.js';
import { generateWaveform } from './components/Waveform.js';
import { handleLogin, handleDemoLogin, handleLogout, switchAuthTab, handleSignUp, togglePassword } from './components/Auth.js';
import { triggerFileInput, handleFileSelect, handleDragOver, handleDragLeave, handleDrop, startNewAnalysis, startAnalysis } from './components/FileUpload.js';
import { loadHistoryPage, historyChangePage, loadRecentAnalysis } from './components/History.js';
import { loadProfilePage } from './components/Profile.js';
import { animateGauge } from './components/Gauge.js';

import { authTemplate } from './templates/authTemplate.js';
import { layoutTemplate } from './templates/layoutTemplate.js';
import { uploadTemplate } from './templates/uploadTemplate.js';
import { analyzingTemplate } from './templates/analyzingTemplate.js';
import { resultsTemplate } from './templates/resultsTemplate.js';
import { historyTemplate } from './templates/historyTemplate.js';
import { profileTemplate } from './templates/profileTemplate.js';

// Initialize Dark Mode based on preference
const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
if (isDark) document.documentElement.classList.add('dark');
else document.documentElement.classList.remove('dark');

// Inject HTML
const app = document.getElementById('app');
app.innerHTML = authTemplate + layoutTemplate;
const contentArea = document.querySelector('.content-area');
if (contentArea) {
  contentArea.innerHTML = uploadTemplate + analyzingTemplate + resultsTemplate + historyTemplate + profileTemplate;
}

// Navigation
export function navigate(page) {
  if (!AppState.isAuthenticated && page !== 'login') return;
  if (page === 'results' && !AppState.hasResults) { navigate('upload'); return; }
  document.querySelectorAll('#app-shell .page').forEach(el => el.classList.remove('active'));
  if (page === 'login') {
    document.getElementById('page-login').classList.add('active');
    document.getElementById('app-shell').classList.add('hidden');
  } else {
    document.getElementById('page-login').classList.remove('active');
    document.getElementById('app-shell').classList.remove('hidden');
    const t = document.getElementById('page-' + page);
    if (t) t.classList.add('active');
  }
  AppState.currentPage = page;
  updateNavActive(page);
  if (page === 'results') setTimeout(() => animateGauge(AppState.analysis.fakeScore, getGaugeColor(AppState.analysis.fakeScore)), 120);
  if (page === 'history') { AppState.historyPage = 0; loadHistoryPage(); }
  if (page === 'profile') loadProfilePage();
}

function getGaugeColor(score) {
  const isCrit = score >= 75;
  return isCrit ? '#ba1a1a' : score >= 60 ? '#b17e00' : '#006c49';
}

function updateNavActive(page) {
  ['home', 'analysis', 'history', 'profile'].forEach(id => {
    document.getElementById('nav-' + id)?.classList.remove('active');
    document.getElementById('bn-' + id)?.classList.remove('active');
  });
  const map = { upload: 'home', results: 'analysis', analyzing: 'analysis', profile: 'profile', history: 'history' };
  if (map[page]) {
    document.getElementById('nav-' + map[page])?.classList.add('active');
    document.getElementById('bn-' + map[page])?.classList.add('active');
  }
}

export function clearAnalysisTimer() {
  if (AppState.analysisTimerId) { clearInterval(AppState.analysisTimerId); AppState.analysisTimerId = null; }
}

// Bind to window for inline onclick handlers
window.navigate = navigate;
window.handleLogin = handleLogin;
window.handleDemoLogin = handleDemoLogin;
window.handleLogout = handleLogout;
window.switchAuthTab = switchAuthTab;
window.handleSignUp = handleSignUp;
window.togglePassword = togglePassword;
window.triggerFileInput = triggerFileInput;
window.handleFileSelect = handleFileSelect;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;
window.startNewAnalysis = startNewAnalysis;
window.startAnalysis = startAnalysis;
window.historyChangePage = historyChangePage;
window.loadHistoryPage = loadHistoryPage;

// Init
document.addEventListener('DOMContentLoaded', async () => {
  generateWaveform('audio');
  const { data: { session } } = await _supa.auth.getSession();
  if (session?.user) {
    AppState.isAuthenticated = true;
    AppState.currentUser = session.user;
    AppState.user.email = session.user.email;
    document.getElementById('page-login').classList.remove('active');
    document.getElementById('app-shell').classList.remove('hidden');
    navigate('upload');
    loadRecentAnalysis();
    loadProfilePage();
  } else {
    document.getElementById('page-login').classList.add('active');
    document.getElementById('app-shell').classList.add('hidden');
  }
});
