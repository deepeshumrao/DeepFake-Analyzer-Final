import { _supa } from '../api/supabase.js';

export async function loadProfilePage() {
  const { data: { user } } = await _supa.auth.getUser();
  if (!user) return;
  const meta = user.user_metadata || {};
  const fullName = meta.full_name || meta.name || user.email?.split('@')[0] || 'User';
  const initial = fullName.charAt(0).toUpperCase();
  const age = meta.age != null ? String(meta.age) : null;
  const gender = meta.gender ? meta.gender.replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase()) : null;
  const shortId = user.id ? user.id.slice(0,8) + '…' + user.id.slice(-4) : '—';
  const since = user.created_at ? new Date(user.created_at).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}) : '—';
  const verified = user.email_confirmed_at ? '✓ Confirmed' : '✗ Not confirmed';

  // Avatar & topbar
  const av = document.getElementById('profile-avatar-circle');
  if (av) av.textContent = initial;
  const tb = document.getElementById('topbar-avatar-initial');
  if (tb) tb.textContent = initial;

  // Name & email
  const pn = document.getElementById('profile-name'); if (pn) pn.textContent = fullName;
  const pe = document.getElementById('profile-email'); if (pe) pe.textContent = user.email;
  const pie = document.getElementById('profile-email-input'); if (pie) pie.value = user.email;

  // Age badge
  const ab = document.getElementById('profile-age-badge');
  if (ab) { if (age) { ab.textContent = 'Age: ' + age; ab.classList.remove('hidden'); } else ab.classList.add('hidden'); }

  // Gender badge
  const gb = document.getElementById('profile-gender-badge');
  if (gb) { if (gender) { gb.textContent = gender; gb.classList.remove('hidden'); } else gb.classList.add('hidden'); }

  // Info rows
  const uid = document.getElementById('profile-uid'); if (uid) uid.textContent = shortId;
  const ps = document.getElementById('profile-since'); if (ps) ps.textContent = since;
  const pv = document.getElementById('profile-verified');
  if (pv) { pv.textContent = verified; pv.style.color = user.email_confirmed_at ? 'var(--color-secondary)' : 'var(--color-error)'; }

  // Dark mode toggle
  const dmToggle = document.getElementById('dark-mode-toggle');
  if (dmToggle) {
    // Check saved preference or system preference
    const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      dmToggle.checked = true;
    } else {
      document.documentElement.classList.remove('dark');
      dmToggle.checked = false;
    }
    // Listen for changes
    dmToggle.onchange = (e) => {
      if (e.target.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
  }
}
