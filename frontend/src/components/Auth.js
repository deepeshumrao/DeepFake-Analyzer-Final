import { _supa } from '../api/supabase.js';
import { AppState } from '../store/state.js';
import { navigate, clearAnalysisTimer } from '../main.js';
import { loadRecentAnalysis } from './History.js';
import { loadProfilePage } from './Profile.js';
import { resetUploadState } from './FileUpload.js';

export async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pw = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');
  const spinner = document.getElementById('login-spinner');
  const btnText = document.getElementById('login-btn-text');
  errEl.classList.add('hidden');
  btn.disabled = true; spinner.classList.remove('hidden'); btnText.textContent = 'Signing in…';
  const { data, error } = await _supa.auth.signInWithPassword({ email, password: pw });
  btn.disabled = false; spinner.classList.add('hidden'); btnText.textContent = 'Sign In to Platform';
  if (error) {
    errEl.classList.remove('hidden');
    document.getElementById('login-error-msg').textContent = error.message;
  } else {
    AppState.isAuthenticated = true;
    AppState.currentUser = data.user;
    AppState.user.email = data.user.email;
    navigate('upload');
    loadRecentAnalysis();
    loadProfilePage();
  }
}

export function handleDemoLogin() {
  alert('Please enter your real Supabase email and password to sign in.');
}

export async function handleLogout() {
  await _supa.auth.signOut();
  AppState.isAuthenticated = false; AppState.currentUser = null; AppState.hasResults = false;
  clearAnalysisTimer(); resetUploadState();
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('page-login').classList.add('active');
  document.getElementById('login-email').value = ''; document.getElementById('login-password').value = '';
  AppState.currentPage = 'login';
}

export function switchAuthTab(tab) {
  const isSignup = tab === 'signup';
  document.getElementById('login-form').classList.toggle('hidden', isSignup);
  document.getElementById('signup-form').classList.toggle('hidden', !isSignup);
  document.getElementById('login-error').classList.add('hidden');
  document.getElementById('signup-success').classList.add('hidden');
  const si = document.getElementById('tab-signin'), su = document.getElementById('tab-signup');
  if (si && su) {
    si.style.background = isSignup ? 'transparent' : 'var(--color-surface)';
    si.style.color = isSignup ? 'var(--color-outline)' : 'var(--color-primary)';
    si.style.boxShadow = isSignup ? 'none' : '0 1px 3px rgba(0,0,0,.1)';
    su.style.background = isSignup ? 'var(--color-surface)' : 'transparent';
    su.style.color = isSignup ? 'var(--color-primary)' : 'var(--color-outline)';
    su.style.boxShadow = isSignup ? '0 1px 3px rgba(0,0,0,.1)' : 'none';
  }
  const fl = document.getElementById('auth-footer-link'), ft = document.getElementById('auth-footer-text');
  if (fl && ft) {
    if (isSignup) { fl.textContent = 'Sign In'; fl.onclick = () => switchAuthTab('signin'); ft.textContent = 'Already have an account?'; }
    else { fl.textContent = 'Sign Up Free'; fl.onclick = () => switchAuthTab('signup'); ft.textContent = "Don't have an account?"; }
  }
}

export async function handleSignUp(e) {
  e.preventDefault();
  const name = document.getElementById('su-name').value.trim();
  const age = parseInt(document.getElementById('su-age').value, 10);
  const gender = document.getElementById('su-gender').value;
  const email = document.getElementById('su-email').value.trim();
  const pw = document.getElementById('su-password').value;
  const errEl = document.getElementById('login-error');
  const sucEl = document.getElementById('signup-success');
  const btn = document.getElementById('signup-btn');
  const spinner = document.getElementById('signup-spinner');
  const btnText = document.getElementById('signup-btn-text');
  errEl.classList.add('hidden'); sucEl.classList.add('hidden');
  if (!name) { errEl.classList.remove('hidden'); document.getElementById('login-error-msg').textContent = 'Full name is required.'; return; }
  if (!age || age < 13 || age > 120) { errEl.classList.remove('hidden'); document.getElementById('login-error-msg').textContent = 'Please enter a valid age (13–120).'; return; }
  if (!gender) { errEl.classList.remove('hidden'); document.getElementById('login-error-msg').textContent = 'Please select a gender.'; return; }
  if (pw.length < 6) { errEl.classList.remove('hidden'); document.getElementById('login-error-msg').textContent = 'Password must be at least 6 characters.'; return; }
  btn.disabled = true; spinner.classList.remove('hidden'); btnText.textContent = 'Creating account…';
  const { error } = await _supa.auth.signUp({
    email, password: pw,
    options: { data: { full_name: name, age, gender } }
  });
  btn.disabled = false; spinner.classList.add('hidden'); btnText.textContent = 'Create Account';
  if (error) {
    errEl.classList.remove('hidden');
    document.getElementById('login-error-msg').textContent = error.message;
  } else {
    sucEl.classList.remove('hidden');
    document.getElementById('su-name').value = '';
    document.getElementById('su-age').value = '';
    document.getElementById('su-gender').value = '';
    document.getElementById('su-email').value = '';
    document.getElementById('su-password').value = '';
  }
}

export function togglePassword() {
  const i = document.getElementById('login-password'), ic = document.getElementById('pw-eye-icon');
  if (i.type === 'password') { i.type = 'text'; ic.textContent = 'visibility'; }
  else { i.type = 'password'; ic.textContent = 'visibility_off'; }
}
