export const analyzingTemplate = `<!-- ===== ANALYZING PAGE ===== -->
        <div id="page-analyzing" class="page flex-col items-center justify-center p-8 md:p-12"
          style="min-height:calc(100vh - 68px);position:relative;">
          <div class="absolute inset-0 overflow-hidden pointer-events-none" style="z-index:0;">
            <div
              class="absolute top-1/3 left-1/4 w-72 h-72 bg-primary-container rounded-full mix-blend-multiply filter blur-[90px] opacity-18 pulse-soft">
            </div>
            <div
              class="absolute bottom-1/3 right-1/4 w-72 h-72 bg-secondary-container rounded-full mix-blend-multiply filter blur-[90px] opacity-12">
            </div>
          </div>
          <div class="w-full max-w-3xl flex flex-col gap-8" style="position:relative;z-index:1;">
            <div class="text-center space-y-3">
              <h2 class="text-5xl font-bold text-primary flex items-center justify-center gap-4">
                <span class="material-symbols-outlined text-[48px] spin-slow">radar</span>Analyzing Media
              </h2>
              <p class="text-lg text-on-surface-variant max-w-lg mx-auto">Applying deep neural networks to extract
                anomalies and spectral signatures.</p>
              <p class="text-sm text-on-surface-variant/70" id="analyzing-filename"
                style="font-family:'JetBrains Mono',monospace;">—</p>
            </div>
            <!-- Visualization -->
            <div class="relative w-full bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden"
              style="height:300px;">
              <div class="absolute inset-0 opacity-30"
                style="background:repeating-linear-gradient(0deg,rgba(0,88,190,.04) 0,rgba(0,88,190,.04) 1px,transparent 1px,transparent 36px),repeating-linear-gradient(90deg,rgba(0,88,190,.04) 0,rgba(0,88,190,.04) 1px,transparent 1px,transparent 36px);">
              </div>
              <div class="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-primary/45"></div>
              <div class="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-primary/45"></div>
              <div class="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-primary/45"></div>
              <div class="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-primary/45"></div>
              <div class="absolute left-0 right-0 h-[3px] bg-primary scan-line"
                style="box-shadow:0 0 16px rgba(0,88,190,.75);"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex items-end gap-1" id="freq-bars">
                </div>
              </div>
              <div class="absolute bottom-4 left-6 text-xs text-on-surface-variant/60 flex items-center gap-1.5"
                style="font-family:'JetBrains Mono',monospace;">
                <span class="material-symbols-outlined text-sm text-primary pulse-soft">memory</span>
                <span id="frame-counter">Processing Frame 0</span>
              </div>
            </div>
            <!-- Progress -->
            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm" style="font-family:'JetBrains Mono',monospace;">
                <span class="flex items-center gap-1.5 text-on-surface">
                  <span class="material-symbols-outlined text-sm text-primary pulse-soft">memory</span>
                  <span id="progress-label">Initializing…</span>
                </span>
                <span class="text-primary font-bold" id="progress-pct">0%</span>
              </div>
              <div class="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div id="progress-bar" class="h-full bg-primary rounded-full relative"
                  style="width:0%;transition:width .15s ease;">
                  <div class="absolute inset-0 progress-stripe rounded-full"></div>
                </div>
              </div>
            </div>
            <!-- Terminal log -->
            <div class="w-full bg-surface-dim rounded-xl border border-outline-variant overflow-hidden">
              <div class="flex items-center gap-2 px-4 py-3 border-b border-outline-variant bg-surface-container-low">
                <div class="w-3 h-3 rounded-full" style="background:#da3437;"></div>
                <div class="w-3 h-3 rounded-full" style="background:#005ac2;"></div>
                <div class="w-3 h-3 rounded-full" style="background:#6cf8bb;"></div>
                <span class="ml-3 text-xs text-outline uppercase tracking-wider"
                  style="font-family:'JetBrains Mono',monospace;">Analysis Logs</span>
              </div>
              <div class="p-4 space-y-1.5 overflow-hidden relative" style="height:128px;" id="log-container">
                <div class="terminal-text text-secondary-fixed-dim">&gt; System initialized. Connecting to DeepFake Analyzer
                core... <span style="color:var(--color-secondary-fixed-dim);">[OK]</span></div>
                <div class="terminal-text blinking-cursor text-on-surface-variant" id="log-cursor">&gt; Loading model
                  weights</div>
                <div class="absolute bottom-0 left-0 w-full h-7 pointer-events-none"
                  style="background:linear-gradient(to top,#dadad9,transparent);"></div>
              </div>
            </div>
          </div>
        </div>

        `;