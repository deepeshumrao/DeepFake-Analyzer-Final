export const historyTemplate = `<!-- ===== HISTORY PAGE ===== -->
        <div id="page-history" class="page flex-col p-8 md:p-12">
          <div class="max-w-5xl mx-auto w-full">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-3xl font-bold text-on-surface tracking-tight">Verification History</h2>
                <p class="text-on-surface-variant mt-1 text-sm" id="history-subtitle">Your past deepfake detection scans</p>
              </div>
              <button onclick="loadHistoryPage()" id="history-refresh-btn"
                class="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-xl text-on-surface-variant text-sm hover:border-primary hover:text-primary transition-all">
                <span class="material-symbols-outlined text-[18px]" id="history-refresh-icon">refresh</span>Refresh
              </button>
            </div>
            <!-- Table card -->
            <div class="bg-surface rounded-2xl border border-outline-variant/25 shadow-sm overflow-hidden">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-outline-variant/20 bg-surface-container-low">
                    <th class="px-6 py-3.5 text-xs text-on-surface-variant font-semibold uppercase tracking-wider" style="font-family:'JetBrains Mono',monospace;">File</th>
                    <th class="px-4 py-3.5 text-xs text-on-surface-variant font-semibold uppercase tracking-wider" style="font-family:'JetBrains Mono',monospace;">Size</th>
                    <th class="px-4 py-3.5 text-xs text-on-surface-variant font-semibold uppercase tracking-wider" style="font-family:'JetBrains Mono',monospace;">Type</th>
                    <th class="px-4 py-3.5 text-xs text-on-surface-variant font-semibold uppercase tracking-wider" style="font-family:'JetBrains Mono',monospace;">Result</th>
                    <th class="px-4 py-3.5 text-xs text-on-surface-variant font-semibold uppercase tracking-wider" style="font-family:'JetBrains Mono',monospace;">Confidence</th>
                    <th class="px-4 py-3.5 text-xs text-on-surface-variant font-semibold uppercase tracking-wider" style="font-family:'JetBrains Mono',monospace;">Date</th>
                  </tr>
                </thead>
                <tbody id="history-tbody" class="text-sm divide-y divide-outline-variant/10">
                  <tr><td colspan="6" class="py-10 text-center text-on-surface-variant" style="font-family:'JetBrains Mono',monospace;">Loading…</td></tr>
                </tbody>
              </table>
              <!-- Pagination -->
              <div id="history-pagination" class="hidden flex items-center justify-between px-6 py-4 border-t border-outline-variant/20">
                <span class="text-xs text-on-surface-variant" id="history-page-info" style="font-family:'JetBrains Mono',monospace;"></span>
                <div class="flex gap-2">
                  <button id="history-prev" onclick="historyChangePage(-1)" class="px-4 py-1.5 text-sm border border-outline-variant rounded-lg text-on-surface hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none">← Prev</button>
                  <button id="history-next" onclick="historyChangePage(1)" class="px-4 py-1.5 text-sm border border-outline-variant rounded-lg text-on-surface hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none">Next →</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      `;