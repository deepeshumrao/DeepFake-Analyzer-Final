import { _supa } from '../api/supabase.js';
import { AppState } from '../store/state.js';
import { fmtFileSize, resultBadgeHTML } from '../utils/helpers.js';

export async function saveHistoryToSupabase(score) {
  if (!AppState.isAuthenticated || !AppState.currentUser) return;
  const u = AppState.upload;
  let resultStr = 'authentic';
  if (score >= 60) resultStr = 'deepfake';
  else if (score >= 40) resultStr = 'uncertain';
  
  const { error } = await _supa.from('verification_history').insert({
    user_id: AppState.currentUser.id,
    file_name: u.fileName || 'unknown',
    file_size: u.fileRawSize || 0,
    media_type: u.fileType || 'video',
    result: resultStr,
    confidence: score / 100
  });
  if (error) {
    alert('Database Error (History Insert): ' + error.message + '\nDetails: ' + JSON.stringify(error));
  } else {
    // Refresh history page in background so it's ready when user clicks it
    AppState.historyPage = 0;
    loadHistoryPage();
  }
}

async function fetchVerificationHistory(userId, page = 0, limit = 10) {
  const from = page * limit, to = from + limit - 1;
  return await _supa
    .from('verification_history')
    .select('id, created_at, file_name, file_size, media_type, result, confidence', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to);
}

export async function loadHistoryPage() {
  const uid = AppState.currentUser?.id;
  const icon = document.getElementById('history-refresh-icon');
  const tbody = document.getElementById('history-tbody');
  const subtitle = document.getElementById('history-subtitle');
  if (!tbody) return;

  if (!uid) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-10 text-center text-error text-sm" style="font-family:JetBrains Mono,monospace;">Not signed in — please sign out and sign back in.</td></tr>`;
    return;
  }

  if (icon) icon.style.animation = 'spin-slow 1s linear infinite';
  tbody.innerHTML = `<tr><td colspan="6" class="py-10 text-center text-on-surface-variant" style="font-family:JetBrains Mono,monospace;">Loading…</td></tr>`;

  const { data, error, count } = await fetchVerificationHistory(uid, AppState.historyPage, 10);
  if (icon) icon.style.animation = '';

  if (error) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-10 text-center text-error text-sm" style="font-family:JetBrains Mono,monospace;">Error: ${error.message}</td></tr>`;
    return;
  }

  if (!data || data.length === 0) {
    const { data: peek, count: total } = await _supa.from('verification_history').select('id, user_id', { count: 'exact' }).limit(5);
    let hint = '';
    if (total > 0) {
      hint = `Found <b>${total}</b> row(s) in the table, but none have <code>user_id = ${uid}</code>.<br><br>
        Row user_ids found: <code style="font-size:10px;">${(peek||[]).map(r=>r.user_id||'null').join('<br>')}</code><br><br>
        <b>Fix:</b> In Supabase Table Editor, set the <code>user_id</code> column on your rows to <code style="font-size:10px;">${uid}</code>`;
    } else {
      hint = 'The table is empty. No rows exist yet.';
    }
    tbody.innerHTML = `<tr><td colspan="6" class="py-12 text-center"><div style="display:flex;flex-direction:column;align-items:center;gap:14px;max-width:560px;margin:0 auto;text-align:center;">
      <span class="material-symbols-outlined text-outline" style="font-size:48px;">manage_search</span>
      <p class="text-on-surface-variant text-sm" style="line-height:1.75;">${hint}</p>
    </div></td></tr>`;
    if (subtitle) subtitle.textContent = '0 scans on record';
    document.getElementById('history-pagination')?.classList.add('hidden');
    return;
  }

  const totalPages = Math.ceil((count || 0) / 10);
  if (subtitle) subtitle.textContent = `${count} scan${count !== 1 ? 's' : ''} on record`;
  tbody.innerHTML = data.map(r => {
    const date = r.created_at ? new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
    const conf = r.confidence != null ? Math.round(r.confidence * 100) + '%' : '—';
    const barColor = r.result === 'deepfake' ? 'var(--color-error)' : r.result === 'authentic' ? 'var(--color-secondary)' : 'var(--color-outline)';
    const confBar = r.confidence != null
      ? `<div style="display:flex;align-items:center;gap:6px;"><div style="flex:1;height:4px;background:var(--color-surface-variant);border-radius:999px;min-width:50px;"><div style="height:100%;width:${Math.round(r.confidence*100)}%;background:${barColor};border-radius:999px;"></div></div><span style="font-size:11px;font-family:JetBrains Mono,monospace;color:var(--color-outline);">${conf}</span></div>`
      : '—';
    return `<tr class="hover:bg-surface-container/30 transition-colors">
      <td class="px-6 py-4 text-on-surface font-medium" style="max-width:200px;">
        <span class="block truncate" title="${r.file_name || ''}"><span class="material-symbols-outlined text-outline align-middle mr-1" style="font-size:14px;">${r.media_type === 'video' ? 'videocam' : r.media_type === 'image' ? 'image' : 'graphic_eq'}</span>${r.file_name || '—'}</span>
      </td>
      <td class="px-4 py-4 text-on-surface-variant text-xs" style="font-family:JetBrains Mono,monospace;">${fmtFileSize(r.file_size)}</td>
      <td class="px-4 py-4"><span class="px-2 py-0.5 rounded text-xs uppercase" style="font-family:JetBrains Mono,monospace;background:color-mix(in srgb, var(--color-primary) 8%, transparent);color:var(--color-primary);border:1px solid color-mix(in srgb, var(--color-primary) 18%, transparent);">${r.media_type || '—'}</span></td>
      <td class="px-4 py-4">${resultBadgeHTML(r.result)}</td>
      <td class="px-4 py-4" style="min-width:140px;">${confBar}</td>
      <td class="px-4 py-4 text-on-surface-variant text-xs" style="font-family:JetBrains Mono,monospace;white-space:nowrap;">${date}</td>
    </tr>`;
  }).join('');
  const pg = document.getElementById('history-pagination');
  if (totalPages > 1) {
    pg?.classList.remove('hidden');
    document.getElementById('history-page-info').textContent = `Page ${AppState.historyPage + 1} of ${totalPages}`;
    const prev = document.getElementById('history-prev'), next = document.getElementById('history-next');
    if (prev) prev.disabled = AppState.historyPage === 0;
    if (next) next.disabled = AppState.historyPage >= totalPages - 1;
  } else { pg?.classList.add('hidden'); }
}

export function historyChangePage(dir) {
  AppState.historyPage = Math.max(0, AppState.historyPage + dir);
  loadHistoryPage();
}

export async function loadRecentAnalysis() {
  const uid = AppState.currentUser?.id; if (!uid) return;
  const tbody = document.getElementById('recent-analysis-tbody'); if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="4" class="py-6 text-center text-on-surface-variant text-sm" style="font-family:JetBrains Mono,monospace;">Loading…</td></tr>';
  // fetchVerificationHistory is not exported, but it's in the same file
  const { data, error } = await fetchVerificationHistory(uid, 0, 5);
  if (error || !data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="py-6 text-center text-on-surface-variant text-sm" style="font-family:JetBrains Mono,monospace;">' + (error ? 'Error: ' + error.message : 'No scans yet.') + '</td></tr>';
    return;
  }
  tbody.innerHTML = data.map((r, i) => {
    const date = r.created_at ? new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
    const border = i < data.length - 1 ? 'border-b border-outline-variant/10' : '';
    return `<tr class="${border} hover:bg-surface-container/30 transition-colors">
      <td class="py-4 text-on-surface font-medium truncate max-w-[180px]">${r.file_name || '—'}</td>
      <td class="py-4 text-on-surface-variant capitalize">${r.media_type || '—'}</td>
      <td class="py-4 text-on-surface-variant">${date}</td>
      <td class="py-4">${resultBadgeHTML(r.result)}</td>
    </tr>`;
  }).join('');
}
