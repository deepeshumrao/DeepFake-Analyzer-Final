export const profileTemplate = `<!-- ===== PROFILE PAGE ===== -->
        <div id="page-profile" class="page flex-col p-8 md:p-12">
          <div class="max-w-5xl mx-auto w-full">
            <!-- ── Live profile card ── -->
            <section class="bg-surface rounded-2xl shadow-sm border border-outline-variant p-8 mb-7 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-56 h-56 bg-primary/4 rounded-bl-full pointer-events-none"></div>
              <div class="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                <!-- Avatar -->
                <div class="relative flex-shrink-0">
                  <div id="profile-avatar-circle"
                    class="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-white text-3xl font-bold"
                    style="background:linear-gradient(135deg,var(--color-primary),var(--color-tertiary));">U</div>
                </div>
                <!-- Info -->
                <div class="text-center md:text-left flex-grow">
                  <h2 class="text-2xl font-bold text-on-surface mb-1" id="profile-name">—</h2>
                  <p class="text-on-surface-variant text-base mb-1" id="profile-email">—</p>
                  <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    <span id="profile-age-badge" class="hidden px-3 py-1 rounded bg-secondary/10 text-secondary text-xs uppercase" style="font-family:'JetBrains Mono',monospace;"></span>
                    <span id="profile-gender-badge" class="hidden px-3 py-1 rounded bg-primary/10 text-primary text-xs uppercase" style="font-family:'JetBrains Mono',monospace;"></span>
                  </div>
                </div>
                <button onclick="handleLogout()"
                  class="bg-error/8 text-error border border-error/20 text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-error/15 transition-colors">Sign Out</button>
              </div>
              <!-- Info rows -->
              <div class="mt-6 pt-5 border-t border-outline-variant/25 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p class="text-xs text-outline uppercase tracking-wider mb-1" style="font-family:'JetBrains Mono',monospace;">User ID</p>
                  <p class="text-sm text-on-surface font-mono" id="profile-uid">—</p>
                </div>
                <div>
                  <p class="text-xs text-outline uppercase tracking-wider mb-1" style="font-family:'JetBrains Mono',monospace;">Member Since</p>
                  <p class="text-sm text-on-surface" id="profile-since">—</p>
                </div>
                <div>
                  <p class="text-xs text-outline uppercase tracking-wider mb-1" style="font-family:'JetBrains Mono',monospace;">Email Status</p>
                  <p class="text-sm" id="profile-verified">—</p>
                </div>
              </div>
            </section>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="flex flex-col gap-6">
                <section class="bg-surface rounded-2xl shadow-sm border border-outline-variant p-6">
                  <div class="flex items-center gap-3 mb-5 pb-4 border-b border-outline-variant/35">
                    <span class="material-symbols-outlined text-primary">palette</span>
                    <h3 class="font-semibold text-on-surface">Appearance</h3>
                  </div>
                  <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="text-sm font-medium text-on-surface">Dark Mode</h4>
                        <p class="text-xs text-on-surface-variant mt-0.5">Toggle visual themes.</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" id="dark-mode-toggle" />
                        <div
                          class="w-11 h-6 bg-surface-container-high rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-outline-variant after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-outline-variant/30">
                        </div>
                      </label>
                    </div>
                    <div class="pt-4 border-t border-outline-variant/25">
                      <h4 class="text-sm font-medium text-on-surface mb-3">Data Density</h4>
                      <div class="flex gap-2">
                        <button
                          class="flex-1 py-2 rounded-lg border border-outline-variant text-on-surface-variant text-xs hover:bg-surface-container-low transition-colors"
                          style="font-family:'JetBrains Mono',monospace;">Compact</button>
                        <button
                          class="flex-1 py-2 rounded-lg border-2 border-primary bg-primary/5 text-primary font-bold text-xs"
                          style="font-family:'JetBrains Mono',monospace;">Standard</button>
                      </div>
                    </div>
                  </div>
                </section>
                <section class="bg-surface rounded-2xl shadow-sm border border-outline-variant p-6">
                  <div class="flex items-center gap-3 mb-5 pb-4 border-b border-outline-variant/35">
                    <span class="material-symbols-outlined text-primary">lock</span>
                    <h3 class="font-semibold text-on-surface">Security</h3>
                  </div>
                  <div class="flex items-center justify-between mb-5">
                    <div>
                      <h4 class="text-sm font-medium text-on-surface">Two-Factor Auth</h4>
                      <p class="text-xs text-on-surface-variant mt-0.5">Requires app authenticator.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked class="sr-only peer" />
                      <div
                        class="w-11 h-6 bg-surface-container-high rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-outline-variant after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-outline-variant/30">
                      </div>
                    </label>
                  </div>
                  <button
                    class="w-full py-2.5 rounded-xl border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-low transition-colors">Review
                    Activity Logs</button>
                </section>
              </div>
              <div class="lg:col-span-2">
                <section class="bg-surface rounded-2xl shadow-sm border border-outline-variant p-7 h-full">
                  <div class="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/35">
                    <span class="material-symbols-outlined text-primary">manage_accounts</span>
                    <h3 class="font-semibold text-on-surface">Account Settings</h3>
                  </div>
                  <form class="flex flex-col gap-5">
                    <div>
                      <label class="block text-sm font-medium text-on-surface mb-1.5">Email Address</label>
                      <div class="relative"><span
                          class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
                        <input id="profile-email-input" type="email" disabled
                          class="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface-variant text-sm cursor-not-allowed" />
                      </div>
                      <p class="text-xs text-on-surface-variant mt-1.5 flex items-center gap-1"><span
                          class="material-symbols-outlined text-[13px]">info</span>Contact IT admin to change primary
                        email.</p>
                    </div>
                    <hr class="border-outline-variant/25" />
                    <div>
                      <h4 class="text-sm font-medium text-on-surface mb-4">Change Password</h4>
                      <div class="flex flex-col gap-3">
                        <div><label class="block text-xs text-on-surface-variant mb-1">Current Password</label><input
                            type="password" placeholder="••••••••"
                            class="w-full h-10 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm text-on-surface outline-none" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div><label class="block text-xs text-on-surface-variant mb-1">New Password</label><input
                              type="password" placeholder="New Password"
                              class="w-full h-10 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm text-on-surface outline-none" />
                          </div>
                          <div><label class="block text-xs text-on-surface-variant mb-1">Confirm New
                              Password</label><input type="password" placeholder="Confirm Password"
                              class="w-full h-10 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm text-on-surface outline-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-end gap-3 pt-4 border-t border-outline-variant/25">
                      <button type="button"
                        class="px-6 py-2 rounded-xl border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-low transition-colors">Cancel</button>
                      <button type="button"
                        class="bg-primary text-on-primary text-sm font-medium px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-sm">Save
                        Changes</button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>

        `;