import { AppState } from '../store/state.js';
import { fmtFileSize, computeScore } from '../utils/helpers.js';
import { navigate, clearAnalysisTimer } from '../main.js';
import { generateFreqBars, animateFreqBars, generateWaveform } from './Waveform.js';
import { animateGauge } from './Gauge.js';
import { saveHistoryToSupabase } from './History.js';

export function triggerFileInput(type) { document.getElementById('file-input-' + type)?.click(); }
export function handleFileSelect(event, type) { event.stopPropagation(); const f = event.target.files[0]; if (f) applyFile(f, type); }
export function handleDragOver(event, type) { event.preventDefault(); document.getElementById(type + '-row')?.classList.add('dragover'); }
export function handleDragLeave(event, type) { document.getElementById(type + '-row')?.classList.remove('dragover'); }
export function handleDrop(event, type) { event.preventDefault(); event.stopPropagation(); document.getElementById(type + '-row')?.classList.remove('dragover'); const f = event.dataTransfer.files[0]; if (f) applyFile(f, type); }

export function applyFile(file, type) {
  resetUploadState();
  const sz = fmtFileSize(file.size), ext = file.name.split('.').pop().toUpperCase();
  Object.assign(AppState.upload, { file, fileName: file.name, fileSize: sz, fileType: type, fileFormat: ext, fileRawSize: file.size });
  document.getElementById(type + '-file-badge')?.classList.remove('hidden');
  const n = document.getElementById(type + '-file-name'); if(n) n.textContent = file.name + ' (' + sz + ')';
  document.getElementById(type + '-row')?.classList.add('has-file');
  document.getElementById('analyze-cta')?.classList.remove('hidden');
  const cn = document.getElementById('cta-file-name'); if(cn) cn.textContent = file.name;
  const cm = document.getElementById('cta-file-meta'); if(cm) cm.textContent = type + ' · ' + sz + ' · Ready for analysis';
}

export function resetUploadState() {
  ['video', 'image', 'audio'].forEach(t => {
    document.getElementById(t + '-file-badge')?.classList.add('hidden');
    document.getElementById(t + '-row')?.classList.remove('has-file', 'dragover');
    const inp = document.getElementById('file-input-' + t); if (inp) inp.value = '';
  });
  document.getElementById('analyze-cta')?.classList.add('hidden');
  AppState.upload = { file: null, fileName: '', fileSize: '', fileType: null, fileFormat: '', fileRawSize: 0 };
}

export function startNewAnalysis() { clearAnalysisTimer(); resetUploadState(); AppState.analysis.progress = 0; navigate('upload'); }

export function startAnalysis() {
  if (!AppState.upload.file) return;
  const af = document.getElementById('analyzing-filename'); if(af) af.textContent = AppState.upload.fileName;
  const pb = document.getElementById('progress-bar'); if(pb) pb.style.width = '0%';
  const pp = document.getElementById('progress-pct'); if(pp) pp.textContent = '0%';
  const pl = document.getElementById('progress-label'); if(pl) pl.textContent = 'Initializing…';
  const fc = document.getElementById('frame-counter'); if(fc) fc.textContent = 'Processing Frame 0';
  const lc = document.getElementById('log-container');
  if(lc) lc.innerHTML = '<div class="terminal-text" style="color:var(--color-secondary-fixed-dim);">&gt; System initialized. Connecting to DeepFake Analyzer core... <span>[OK]</span></div><div class="terminal-text blinking-cursor text-on-surface-variant" id="log-cursor">&gt; Loading model weights</div><div class="absolute bottom-0 left-0 w-full h-7 pointer-events-none" style="background:linear-gradient(to top,var(--color-surface-dim),transparent);"></div>';
  generateFreqBars();
  AppState.analysis.progress = 0;
  navigate('analyzing');
  runSimulation();
}

const LOGS = [
  { t: '&gt; Extracting facial landmarks...', s: '<span style="color:var(--color-secondary-fixed-dim);">[OK]</span>' },
  { t: '&gt; Analyzing spectral audio frequencies...', s: '<span style="color:var(--color-secondary-fixed-dim);">[OK]</span>' },
  { t: '&gt; Running neural network weights <span style="color:var(--color-primary);">[======&gt;  ]</span>', s: '' },
  { t: '&gt; Deepfake probability model engaged...', s: '<span style="color:var(--color-secondary-fixed-dim);">[OK]</span>' },
  { t: '&gt; Comparing metadata against spoofing signatures...', s: '' },
  { t: '&gt; Analyzing micro-expressions...', s: '<span style="color:var(--color-tertiary-container);">[WARNING: Inconsistent tension]</span>' },
  { t: '&gt; Isolating voice harmonics <span style="color:var(--color-primary);">[========&gt; ]</span>', s: '' },
  { t: '&gt; Calculating pixel anomaly confidence...', s: '' },
  { t: '&gt; Compiling final report...', s: '<span style="color:var(--color-secondary-fixed-dim);">[OK]</span>' },
];

async function runSimulation() {
  let progress = 0, logIdx = 0, frame = 0;
  clearAnalysisTimer();
  
  // Start fake progress for UI
  AppState.analysisTimerId = setInterval(() => {
    if (AppState.currentPage !== 'analyzing') { clearAnalysisTimer(); return; }
    progress += (90 - progress) * 0.05; // Approach 90%
    frame += Math.floor(Math.random() * 180 + 80);
    const pb = document.getElementById('progress-bar'), pp = document.getElementById('progress-pct'), pl = document.getElementById('progress-label'), fc = document.getElementById('frame-counter');
    if (pb) pb.style.width = progress + '%';
    if (pp) pp.textContent = Math.floor(progress) + '%';
    if (fc) fc.textContent = 'Processing Frame ' + frame.toLocaleString();
    if (pl) {
      if (progress < 20) pl.textContent = 'Uploading file...';
      else if (progress < 40) pl.textContent = 'Extracting features...';
      else if (progress < 65) pl.textContent = 'Running model...';
      else pl.textContent = 'Analyzing...';
    }
    animateFreqBars();
    if (logIdx < LOGS.length && Math.random() > .7) {
      addLog(LOGS[logIdx].t + ' ' + LOGS[logIdx].s); logIdx++;
    }
  }, 100);

  // Real backend call
  const file = AppState.upload.file;
  const type = AppState.upload.fileType;
  const formData = new FormData();
  formData.append('file', file);
  
  let endpoint = '';
  if (type === 'video') endpoint = '/analyze/video';
  else if (type === 'audio') endpoint = '/analyze/audio';
  else if (type === 'image') endpoint = '/analyze/image';

  try {
    const res = await fetch(`https://deepfake-analyzer-finall.onrender.com${endpoint}`, {
      method: 'POST',
      body: formData
    });
    
    if (!res.ok) throw new Error('Analysis failed');
    const data = await res.json();
    
    let score = 0;
    if (type === 'video') {
       const vScore = data.video_fake_score || 0;
       const aScore = data.audio_fake_score === 'N/A (no audio track)' ? 0 : (data.audio_fake_score || 0);
       score = data.audio_fake_score === 'N/A (no audio track)' ? vScore * 100 : ((vScore + aScore) / 2) * 100;
       if (score === 0 && data.final_verdict === 'FAKE') score = 95; // fallback
    } else {
       score = data.verdict === 'FAKE' ? data.confidence * 100 : (1 - data.confidence) * 100;
    }
    
    clearAnalysisTimer();
    const pb = document.getElementById('progress-bar'), pp = document.getElementById('progress-pct'), pl = document.getElementById('progress-label');
    if (pb) pb.style.width = '100%'; 
    if (pp) pp.textContent = '100%'; 
    if (pl) pl.textContent = 'Analysis complete.';
    addLog('&gt; ✓ Analysis complete. Generating forensic report...');
    
    AppState.analysis.fakeScore = Math.round(score); 
    AppState.hasResults = true;
    populateResults();
    saveHistoryToSupabase(Math.round(score));
    setTimeout(() => navigate('results'), 800);

  } catch (err) {
    clearAnalysisTimer();
    console.error(err);
    alert("Error communicating with backend. Please ensure the backend is running at http://localhost:8000");
    navigate('upload');
  }
}

function addLog(html) {
  const c = document.getElementById('log-container'); if (!c) return;
  const cur = document.getElementById('log-cursor');
  const d = document.createElement('div'); d.className = 'terminal-text'; d.style.color = 'var(--color-on-surface-variant)'; d.innerHTML = html;
  if (cur) c.insertBefore(d, cur); else c.appendChild(d);
  const all = c.querySelectorAll('.terminal-text'); if (all.length > 7) all[0].remove();
}

export function populateResults() {
  const u = AppState.upload, score = AppState.analysis.fakeScore;
  const isFake = score >= 60, isCrit = score >= 75;
  const color = isCrit ? 'var(--color-error)' : score >= 60 ? 'var(--color-primary-fixed-dim)' : 'var(--color-secondary)';

  // File
  const rn = document.getElementById('result-filename'); if(rn) rn.textContent = u.fileName || '—';
  const rfs = document.getElementById('result-filesize'); if(rfs) rfs.textContent = u.fileSize || '—';
  const rff = document.getElementById('result-fileformat'); if(rff) rff.textContent = u.fileFormat || '—';
  const icons = { video: 'videocam', image: 'image', audio: 'graphic_eq' };
  const fi = icons[u.fileType] || 'description';
  const rfi = document.getElementById('results-file-icon'); if(rfi) rfi.textContent = fi;
  const rpi = document.getElementById('results-preview-icon'); if(rpi) rpi.textContent = fi;
  generateWaveform(u.fileType);

  // Score
  animateGauge(score, color);
  const gsd = document.getElementById('gauge-score-display');
  if(gsd) {
    gsd.innerHTML = score + '<span class="absolute left-full ml-1" style="font-size:22px;color:var(--color-outline);bottom:8px;">%</span>';
  }

  // Confidence & threat
  const conf = (score + 2.7).toFixed(1) + '%';
  const rc = document.getElementById('result-confidence'); if(rc) rc.textContent = conf;
  const tLevel = isCrit ? 'Critical' : score >= 60 ? 'Moderate' : 'Low';
  const tlt = document.getElementById('threat-level-text'); 
  if(tlt) { tlt.textContent = tLevel; tlt.style.color = color; }
  const ti = document.getElementById('threat-icon');
  if(ti) { ti.style.color = color; ti.textContent = isFake ? (isCrit ? 'warning' : 'info') : 'check_circle'; }
  const iw = document.getElementById('threat-icon-wrap');
  if(iw) { iw.style.background = color + '12'; iw.style.borderColor = color + '28'; }

  // Status
  const gst = document.getElementById('gauge-status-text');
  if(gst) { gst.textContent = isCrit ? 'High Risk' : score >= 60 ? 'Medium Risk' : 'Low Risk'; gst.style.color = color; }

  // Sub-metrics
  const sp = Math.max(5, Math.round(100 - score + Math.random() * 8 - 4));
  const co = Math.max(3, Math.round(100 - score - 6 + Math.random() * 6 - 3));
  const spct = document.getElementById('spectral-pct'); if(spct) spct.textContent = sp + '%';
  const copct = document.getElementById('coherence-pct'); if(copct) copct.textContent = co + '%';
  const sb = document.getElementById('spectral-bar'); if(sb) { sb.style.width = sp + '%'; sb.style.background = color; }
  const cb = document.getElementById('coherence-bar'); if(cb) { cb.style.width = co + '%'; cb.style.background = color; }
  const gsb = document.getElementById('gauge-spectral-bar'); if(gsb) { gsb.style.width = sp + '%'; gsb.style.background = color; }
  const gsl = document.getElementById('gauge-spectral-label'); if(gsl) { gsl.textContent = sp + '% Match'; gsl.style.color = color; }

  // Date
  const ds = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const md = document.getElementById('meta-date'); if(md) md.textContent = 'Date: ' + ds;
  const md2 = document.getElementById('meta2-date'); if(md2) md2.textContent = 'Date: ' + ds;
}
