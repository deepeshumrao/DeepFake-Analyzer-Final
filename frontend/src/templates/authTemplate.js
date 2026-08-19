export const authTemplate = `<!-- ===================== LOGIN PAGE ===================== -->
  <div id="page-login" class="page active" style="flex-direction:column;position:relative;">
    <div
      class="absolute inset-0 bg-gradient-to-br from-background via-surface-container-low to-primary-fixed opacity-60 pointer-events-none"
      style="z-index:0;"></div>
    <div class="absolute inset-0 bg-dot-pattern pointer-events-none" style="z-index:0;"></div>
    <main class="flex-grow flex items-center justify-center p-6" style="position:relative;z-index:1;">
      <div style="width:100%;max-width:440px;">
        <div class="glass-card p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-[20px]"></div>
          <div class="flex flex-col items-center mb-8">
            <div
              class="w-16 h-16 mb-5 rounded-2xl bg-primary/8 flex items-center justify-center border border-primary/18 relative float">
              <img src="/logo.png" alt="DeepFake Analyzer Logo" class="w-10 h-10 object-contain" />
            </div>
            <h1 class="text-2xl font-bold text-on-surface mb-2 tracking-tight">Sign in to DeepFake Analyzer</h1>
            <p class="text-sm text-on-surface-variant text-center leading-relaxed">Enter your credentials to access
              the<br>secure forensic platform.</p>
          </div>
          <!-- Auth mode tabs -->
          <div style="display:flex;gap:4px;background:#f1f0ef;border-radius:10px;padding:4px;margin-bottom:24px;">
            <button id="tab-signin" type="button" onclick="switchAuthTab('signin')"
              style="flex:1;padding:8px;border-radius:7px;border:none;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;background:#fff;color:#0058be;box-shadow:0 1px 3px rgba(0,0,0,.1);transition:all .2s;">Sign In</button>
            <button id="tab-signup" type="button" onclick="switchAuthTab('signup')"
              style="flex:1;padding:8px;border-radius:7px;border:none;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;background:transparent;color:#74777f;transition:all .2s;">Sign Up</button>
          </div>

          <!-- Login error -->
          <div id="login-error" class="hidden mb-4 px-4 py-3 rounded-xl bg-error-container/60 border border-error/20 text-error text-sm flex items-center gap-2">
            <span class="material-symbols-outlined text-base">error</span>
            <span id="login-error-msg">Invalid credentials.</span>
          </div>
          <!-- Signup success -->
          <div id="signup-success" class="hidden mb-4 px-4 py-3 rounded-xl border text-sm flex items-center gap-2" style="background:rgba(0,108,73,.07);border-color:rgba(0,108,73,.2);color:#006c49;">
            <span class="material-symbols-outlined text-base">check_circle</span>
            <span>Account created! Check your email to confirm before signing in.</span>
          </div>

          <!-- ── SIGN IN FORM ── -->
          <form id="login-form" class="space-y-5" onsubmit="handleLogin(event)">
            <div>
              <label class="block text-sm font-medium text-on-surface mb-1.5" for="login-email">Work Email</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">mail</span>
                <input id="login-email" name="email" type="email" placeholder="name@company.com" required
                  class="w-full pl-10 pr-4 py-3 bg-surface border-[1.5px] border-outline-variant rounded-xl text-on-surface placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm" />
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5">
                <label class="text-sm font-medium text-on-surface" for="login-password">Password</label>
                <a href="#" class="text-xs text-primary hover:underline font-medium">Forgot Password?</a>
              </div>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">lock</span>
                <input id="login-password" name="password" type="password" placeholder="••••••••" required
                  class="w-full pl-10 pr-12 py-3 bg-surface border-[1.5px] border-outline-variant rounded-xl text-on-surface placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm" />
                <button type="button" onclick="togglePassword()" class="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors">
                  <span class="material-symbols-outlined text-[20px]" id="pw-eye-icon">visibility_off</span>
                </button>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input id="remember-me" type="checkbox" class="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" />
              <label for="remember-me" class="text-sm text-on-surface-variant cursor-pointer">Remember me for 30 days</label>
            </div>
            <button type="submit" id="login-btn"
              class="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-semibold text-sm shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <span id="login-btn-text">Sign In to Platform</span>
              <span id="login-spinner" class="hidden material-symbols-outlined text-base spin-slow">progress_activity</span>
            </button>
          </form>

          <!-- ── SIGN UP FORM ── -->
          <form id="signup-form" class="space-y-4 hidden" onsubmit="handleSignUp(event)">
            <div>
              <label class="block text-sm font-medium text-on-surface mb-1.5" for="su-name">Full Name</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">person</span>
                <input id="su-name" type="text" placeholder="Alex Sterling" required
                  class="w-full pl-10 pr-4 py-3 bg-surface border-[1.5px] border-outline-variant rounded-xl text-on-surface placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm" />
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="block text-sm font-medium text-on-surface mb-1.5" for="su-age">Age</label>
                <input id="su-age" type="number" placeholder="25" min="13" max="120"
                  class="w-full px-4 py-3 bg-surface border-[1.5px] border-outline-variant rounded-xl text-on-surface placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-on-surface mb-1.5" for="su-gender">Gender</label>
                <select id="su-gender"
                  class="w-full px-4 py-3 bg-surface border-[1.5px] border-outline-variant rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm" style="appearance:none;">
                  <option value="">Select…</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface mb-1.5" for="su-email">Email</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">mail</span>
                <input id="su-email" type="email" placeholder="you@example.com" required
                  class="w-full pl-10 pr-4 py-3 bg-surface border-[1.5px] border-outline-variant rounded-xl text-on-surface placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface mb-1.5" for="su-password">Password <span class="text-outline font-normal">(min 6 chars)</span></label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">lock</span>
                <input id="su-password" type="password" placeholder="Min. 6 characters" required minlength="6"
                  class="w-full pl-10 pr-4 py-3 bg-surface border-[1.5px] border-outline-variant rounded-xl text-on-surface placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm" />
              </div>
            </div>
            <button type="submit" id="signup-btn"
              class="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-semibold text-sm shadow-sm hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <span id="signup-btn-text">Create Account</span>
              <span id="signup-spinner" class="hidden material-symbols-outlined text-base spin-slow">progress_activity</span>
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-on-surface-variant">
            <span id="auth-footer-text">Don't have an account?</span>{' '}
            <button id="auth-footer-link" onclick="switchAuthTab('signup')" type="button"
              class="text-primary font-medium hover:underline bg-transparent border-none cursor-pointer text-sm">Sign Up Free</button>
          </p>
        </div>
      </div>
    </main>
    <footer
      class="relative z-10 py-5 px-8 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-outline-variant/25 bg-surface/55 backdrop-blur">
      <div class="flex items-center gap-2">
        <img src="/logo.png" alt="DeepFake Analyzer Logo" class="h-6 w-6 object-contain" />
        <span class="font-bold text-primary text-sm">DeepFake Analyzer</span>
      </div>
      <nav class="flex flex-wrap justify-center gap-5">
        <a href="#" class="text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" class="text-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
        <a href="#" class="text-xs text-on-surface-variant hover:text-primary transition-colors">Security Disclosure</a>
        <a href="#" class="text-xs text-on-surface-variant hover:text-primary transition-colors">Help Center</a>
      </nav>
      <span class="text-xs text-on-surface-variant">© 2024 DeepFake Analyzer. Clinical Precision in Deepfake
        Detection.</span>
    </footer>
  </div>

  `;