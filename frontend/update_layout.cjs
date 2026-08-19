const fs = require('fs');

const content = `export const layoutTemplate = \`<!-- ===================== APP SHELL ===================== -->
<div id="app-shell" class="hidden flex h-screen overflow-hidden text-on-surface bg-background">
<!-- BEGIN: Sidebar -->
<aside class="w-64 bg-surface border-r border-outline-variant/30 flex flex-col justify-between" data-purpose="sidebar">
<div>
<!-- Logo Area -->
<div class="h-20 flex items-center px-6 mb-4">
<div class="flex items-center gap-3 text-xl font-bold text-on-surface">
  <div class="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center text-primary">
    <i class="fa-solid fa-shield-halved"></i>
  </div>
  Deepfake AI
</div>
</div>
<!-- New Analysis Button -->
<div class="px-6 mb-6">
<button onclick="startNewAnalysis()" class="w-full bg-on-surface text-surface py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:opacity-85 transition-colors">
<i class="fa-solid fa-plus text-xs"></i> New Analysis
</button>
</div>
<!-- Navigation Links -->
<nav class="px-3 space-y-1">
<button id="nav-home" class="flex items-center gap-3 px-3 py-2.5 bg-primary-container/20 text-primary w-full rounded-lg text-sm font-medium text-left" onclick="navigate('upload')">
<i class="fa-solid fa-border-all w-5 text-center"></i> Home
</button>
<button id="nav-analysis" class="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-on-surface/5 w-full rounded-lg text-sm font-medium transition-colors text-left" onclick="navigate('results')">
<i class="fa-solid fa-shield w-5 text-center"></i> Analysis
</button>
<button id="nav-history" class="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-on-surface/5 w-full rounded-lg text-sm font-medium transition-colors text-left" onclick="navigate('history')">
<i class="fa-solid fa-clock-rotate-left w-5 text-center"></i> History
</button>
<button id="nav-profile" class="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-on-surface/5 w-full rounded-lg text-sm font-medium transition-colors text-left" onclick="navigate('profile')">
<i class="fa-regular fa-user w-5 text-center"></i> User Profile
</button>
</nav>
</div>
<!-- Logout -->
<div class="p-6 border-t border-outline-variant/30">
<button onclick="handleLogout()" class="flex items-center gap-3 text-on-surface-variant hover:text-error w-full text-sm font-medium transition-colors text-left">
<i class="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i> Logout
</button>
</div>
</aside>
<!-- END: Sidebar -->

<!-- BEGIN: Main Content Area -->
<main class="flex-1 flex flex-col h-full overflow-hidden" data-purpose="main-content">
<!-- BEGIN: Top Header -->
<header class="h-20 bg-background flex items-center justify-between px-8 border-b border-outline-variant/10" data-purpose="top-header">
<div></div>
<!-- Right Header Actions -->
<div class="flex items-center gap-6">
<button class="text-on-surface-variant hover:text-on-surface relative">
<i class="fa-regular fa-bell text-xl"></i>
<span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span>
</button>
<button onclick="navigate('profile')" class="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-sm font-bold text-white hover:opacity-80 transition-all" id="topbar-avatar-btn" style="background:linear-gradient(135deg,var(--color-primary),var(--color-tertiary));">
<span id="topbar-avatar-initial">U</span>
</button>
</div>
</header>
<!-- END: Top Header -->

<!-- Main Scrollable Content -->
<div class="flex-1 overflow-y-auto relative" data-purpose="scrollable-content">
  <div class="content-area w-full">
\`;`;

fs.writeFileSync('src/templates/layoutTemplate.js', content);
