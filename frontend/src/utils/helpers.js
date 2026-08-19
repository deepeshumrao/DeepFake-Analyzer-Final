import { AppState } from '../store/state.js';

export function fmtFileSize(b) {
  if (b == null) return '—';
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(1) + ' MB';
}

export function resultBadgeHTML(result) {
  if (result === 'authentic') return '<span class="px-3 py-1 rounded-full badge-authentic text-xs font-bold">Authentic</span>';
  if (result === 'deepfake')  return '<span class="px-3 py-1 rounded-full badge-manipulated text-xs font-bold">Deepfake</span>';
  if (result === 'uncertain') return '<span class="px-3 py-1 rounded-full badge-processing text-xs font-bold">Uncertain</span>';
  return '<span class="px-3 py-1 rounded-full badge-processing text-xs font-bold">' + (result || '—') + '</span>';
}

export function computeScore() {
  const name = AppState.upload.fileName || 'file'; let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xFFFFFF;
  return 55 + (h % 40);
}
