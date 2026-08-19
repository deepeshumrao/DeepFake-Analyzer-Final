export const resultsTemplate = `<!-- ===== RESULTS PAGE ===== -->
        <div id="page-results" class="page flex-col p-6 md:p-10">
          <div class="max-w-7xl mx-auto w-full mb-5">
            <button onclick="startNewAnalysis()"
              class="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium group">
              <span
                class="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>Back
              to Upload
            </button>
          </div>
          <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
            <!-- Left col -->
            <div class="lg:col-span-4 flex flex-col gap-5">
              <!-- Source file card -->
              <div class="glass-card p-6 relative overflow-hidden">
                <div class="absolute -top-6 -right-6 w-24 h-24 bg-primary/4 rounded-full blur-3xl"></div>
                <p class="text-[11px] text-outline uppercase tracking-wider mb-4 flex items-center gap-1.5"
                  style="font-family:'JetBrains Mono',monospace;">
                  <span class="material-symbols-outlined text-[16px]" id="results-file-icon">description</span>Source
                  File Profile
                </p>
                <div
                  class="w-full h-24 rounded-xl bg-surface-container-low border border-outline-variant/25 mb-5 relative overflow-hidden flex items-center justify-center">
                  <svg id="waveform-svg" class="absolute inset-0 w-full h-full" viewBox="0 0 400 96"
                    preserveAspectRatio="none"></svg>
                  <span class="material-symbols-outlined text-primary/25 text-4xl relative z-10"
                    id="results-preview-icon">graphic_eq</span>
                </div>
                <div class="space-y-3">
                  <div>
                    <p class="text-[10px] text-outline-variant uppercase mb-1"
                      style="font-family:'JetBrains Mono',monospace;">Filename</p>
                    <p class="font-semibold text-on-surface truncate text-sm" id="result-filename">—</p>
                  </div>
                  <div class="flex justify-between border-t border-outline-variant/20 pt-3">
                    <div>
                      <p class="text-[10px] text-outline-variant uppercase mb-1"
                        style="font-family:'JetBrains Mono',monospace;">Size</p>
                      <p class="text-sm text-on-surface" id="result-filesize">—</p>
                    </div>
                    <div class="text-right">
                      <p class="text-[10px] text-outline-variant uppercase mb-1"
                        style="font-family:'JetBrains Mono',monospace;">Format</p>
                      <p class="text-sm text-on-surface" id="result-fileformat">—</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Threat level -->
              <div class="glass-card p-5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center border" id="threat-icon-wrap">
                    <span class="material-symbols-outlined icon-filled" id="threat-icon">warning</span>
                  </div>
                  <div>
                    <p class="text-[10px] text-outline-variant uppercase mb-0.5"
                      style="font-family:'JetBrains Mono',monospace;">Threat Level</p>
                    <p class="font-semibold text-sm" id="threat-level-text">Critical</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-outline-variant uppercase mb-0.5"
                    style="font-family:'JetBrains Mono',monospace;">Confidence</p>
                  <p class="font-semibold text-sm text-on-surface" id="result-confidence">—</p>
                </div>
              </div>
              <!-- Sub-metrics -->
              <div class="glass-card p-5">
                <p class="text-[11px] text-outline uppercase tracking-wider mb-4"
                  style="font-family:'JetBrains Mono',monospace;">Sub-Metrics</p>
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between text-xs mb-1"><span class="text-outline-variant uppercase"
                        style="font-family:'JetBrains Mono',monospace;font-size:10px;">Spectral Consistency</span><span
                        id="spectral-pct" class="text-on-surface-variant">12%</span></div>
                    <div class="h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                      <div id="spectral-bar" class="h-full rounded-full transition-all"
                        style="width:12%;background:var(--color-error);"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-xs mb-1"><span class="text-outline-variant uppercase"
                        style="font-family:'JetBrains Mono',monospace;font-size:10px;">Visual Coherence</span><span
                        id="coherence-pct" class="text-on-surface-variant">8%</span></div>
                    <div class="h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                      <div id="coherence-bar" class="h-full rounded-full transition-all"
                        style="width:8%;background:var(--color-error);"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1.5"><span class="text-outline-variant uppercase"
                        style="font-family:'JetBrains Mono',monospace;font-size:10px;">Metadata</span><span
                        class="text-error text-[10px]" style="font-family:'JetBrains Mono',monospace;">Anomalous</span>
                    </div>
                    <p class="text-[10px] text-on-surface-variant" id="meta-date"
                      style="font-family:'JetBrains Mono',monospace;">Date: —</p>
                    <p class="text-[10px] text-on-surface-variant" style="font-family:'JetBrains Mono',monospace;">
                      Device: Unknown / Loc: N/A</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Right col -->
            <div class="lg:col-span-8 flex flex-col gap-5">
              <!-- Gauge card -->
              <div class="glass-card p-8 flex flex-col flex-1 relative overflow-hidden">
                <div
                  class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-44 rounded-full blur-[80px] pointer-events-none"
                  id="gauge-glow" style="background:rgba(186,26,26,.04);"></div>
                <div class="flex justify-between items-start mb-5 relative z-10">
                  <div>
                    <h2 class="text-[11px] text-outline uppercase tracking-widest mb-1"
                      style="font-family:'JetBrains Mono',monospace;">Authenticity Index</h2>
                    <p class="text-xs text-outline-variant">Forensic Probability Analysis</p>
                  </div>
                  <div class="text-right">
                    <p class="text-[11px] text-outline-variant uppercase mb-1"
                      style="font-family:'JetBrains Mono',monospace;">Status</p>
                    <p class="font-bold text-sm" id="gauge-status-text" style="color:var(--color-error);">High Risk</p>
                  </div>
                </div>
                <div class="flex-1 flex flex-col items-center justify-center relative">
                  <div class="relative w-full max-w-[400px] mx-auto" style="aspect-ratio:2/1;">
                    <svg class="w-full h-full overflow-visible drop-shadow-xl" viewBox="0 0 200 100">
                      <defs>
                        <linearGradient id="gaugeGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                          <stop offset="0%" stop-color="var(--color-error)" />
                          <stop offset="50%" stop-color="var(--color-primary-fixed-dim)" />
                          <stop offset="100%" stop-color="var(--color-secondary)" />
                        </linearGradient>
                        <filter id="needle-shadow">
                          <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-opacity="0.15" />
                        </filter>
                      </defs>
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--color-surface-variant)" stroke-linecap="round"
                        stroke-width="14" />
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#gaugeGrad)"
                        stroke-dasharray="251.2" stroke-dashoffset="0" stroke-linecap="round" stroke-width="14" />
                      <text fill="var(--color-error)" font-size="8.5" font-weight="700" x="13" y="115">FAKE</text>
                      <text fill="var(--color-secondary)" font-size="8.5" font-weight="700" text-anchor="end" x="187"
                        y="115">ORIGINAL</text>
                      <g id="gauge-needle" class="gauge-needle"
                        style="transform:rotate(-90deg);filter:url(#needle-shadow);">
                        <path d="M 98.8 100 L 100 24 L 101.2 100 Z" fill="var(--color-on-surface)" />
                        <circle cx="100" cy="100" r="6.5" fill="var(--color-on-surface)" />
                        <circle cx="100" cy="100" r="3" fill="var(--color-surface)" />
                      </g>
                    </svg>
                    <div
                      class="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
                      <p id="gauge-score-display" class="font-bold leading-none relative inline-flex items-baseline"
                        style="font-size:52px;letter-spacing:-.02em;color:var(--color-error);">88<span class="absolute left-full ml-1"
                          style="font-size:22px;color:var(--color-outline);bottom:8px;">%</span></p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4 w-full mt-14 pt-6 border-t border-outline-variant/22">
                    <div>
                      <p class="text-[10px] text-outline-variant uppercase mb-2"
                        style="font-family:'JetBrains Mono',monospace;">Spectral</p>
                      <div class="h-1.5 bg-surface-container-low rounded-full overflow-hidden mb-1">
                        <div class="h-full rounded-full" id="gauge-spectral-bar" style="width:12%;background:var(--color-error);">
                        </div>
                      </div>
                      <p class="text-[10px] text-outline" id="gauge-spectral-label"
                        style="font-family:'JetBrains Mono',monospace;">12% Match</p>
                    </div>
                    <div class="border-l border-outline-variant/22 pl-4">
                      <p class="text-[10px] text-outline-variant uppercase mb-2"
                        style="font-family:'JetBrains Mono',monospace;">Noise Profile</p>
                      <div class="h-5 flex items-end gap-0.5" id="noise-bars">
                        <div class="flex-1 rounded-t-sm" style="height:40%;background:rgba(186,26,26,.4);"></div>
                        <div class="flex-1 rounded-t-sm" style="height:70%;background:rgba(186,26,26,.4);"></div>
                        <div class="flex-1 rounded-t-sm" style="height:55%;background:rgba(186,26,26,.4);"></div>
                        <div class="flex-1 rounded-t-sm" style="height:90%;background:rgba(186,26,26,.4);"></div>
                        <div class="flex-1 rounded-t-sm" style="height:30%;background:rgba(186,26,26,.4);"></div>
                      </div>
                      <p class="text-[10px] text-outline mt-1" style="font-family:'JetBrains Mono',monospace;">Anomalous
                      </p>
                    </div>
                    <div class="border-l border-outline-variant/22 pl-4">
                      <p class="text-[10px] text-outline-variant uppercase mb-2"
                        style="font-family:'JetBrains Mono',monospace;">Metadata</p>
                      <p class="text-[10px] text-on-surface-variant" id="meta2-date"
                        style="font-family:'JetBrains Mono',monospace;">Date: —</p>
                      <p class="text-[10px] text-on-surface-variant" style="font-family:'JetBrains Mono',monospace;">
                        Device: Unknown</p>
                      <p class="text-[10px] text-on-surface-variant" style="font-family:'JetBrains Mono',monospace;">
                        Loc: N/A</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Verdict card -->
              <div
                class="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden"
                id="verdict-card" style="background:rgba(186,26,26,.04);border:1px solid rgba(186,26,26,.15);">
                <div class="absolute inset-0 opacity-[0.022]"
                  style="background-image:repeating-linear-gradient(45deg,transparent,transparent 10px,var(--color-error) 10px,var(--color-error) 20px);">
                </div>
                <div class="flex-1 relative z-10">
                  <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-xs border uppercase tracking-wider font-medium"
                    id="verdict-badge"
                    style="background:rgba(186,26,26,.08);border-color:rgba(186,26,26,.25);color:var(--color-error);">
                    <span class="material-symbols-outlined text-[14px]" id="verdict-badge-icon">crisis_alert</span>
                    <span id="verdict-badge-text">Manipulation Detected</span>
                  </div>
                  <p class="font-semibold text-on-surface text-base" id="verdict-full-text">
                    Final Verdict: <span id="verdict-score-text" class="font-bold" style="color:var(--color-error);">88%
                      probability</span> of AI manipulation detected.
                  </p>
                </div>
                <button
                  class="relative z-10 shrink-0 bg-surface border border-outline-variant hover:border-primary text-primary text-sm font-medium px-6 py-3 rounded-xl transition-all flex items-center gap-2 group hover:bg-primary/5">
                  View Detailed Analysis<span
                    class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        `;