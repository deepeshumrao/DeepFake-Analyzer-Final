const fs = require('fs');

const content = `export const uploadTemplate = \`<!-- ===== UPLOAD PAGE ===== -->
<div id="page-upload" class="page active flex-col p-8 md:p-12 lg:p-16">
<div class="max-w-4xl mx-auto w-full">
<!-- Upload Header -->
<div class="text-center mb-10">
<h1 class="text-4xl font-bold text-on-surface mb-4">Upload Media</h1>
<p class="text-on-surface-variant text-lg max-w-xl mx-auto">Select a video, image, or audio file to verify authenticity and detect manipulation.</p>
</div>
<!-- Upload Options -->
<div class="space-y-4 mb-12">
<!-- Upload Video -->
<div id="video-row" class="upload-row group bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer" onclick="triggerFileInput('video')" ondragover="handleDragOver(event,'video')" ondragleave="handleDragLeave(event,'video')" ondrop="handleDrop(event,'video')">
<input type="file" id="file-input-video" accept="video/*" style="display:none;" onchange="handleFileSelect(event,'video')" />
<div class="flex items-center gap-6">
<div class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
<i class="fa-solid fa-video text-xl"></i>
</div>
<div>
<h3 class="text-lg font-semibold text-on-surface">Upload Video</h3>
<p class="text-on-surface-variant text-sm mt-0.5">MP4, AVI, MOV up to 500MB</p>
<div id="video-file-badge" class="hidden mt-2 flex items-center gap-1.5 text-xs text-secondary" style="font-family:'JetBrains Mono',monospace;">
<i class="fa-solid fa-circle-check text-sm"></i>
<span id="video-file-name" class="truncate max-w-[280px]"></span>
</div>
</div>
</div>
<button class="px-5 py-2.5 border border-outline-variant/30 rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container transition-colors" onclick="event.stopPropagation();triggerFileInput('video')">
  Browse Files
</button>
</div>
<!-- Upload Image -->
<div id="image-row" class="upload-row group bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer" onclick="triggerFileInput('image')" ondragover="handleDragOver(event,'image')" ondragleave="handleDragLeave(event,'image')" ondrop="handleDrop(event,'image')">
<input type="file" id="file-input-image" accept="image/*" style="display:none;" onchange="handleFileSelect(event,'image')" />
<div class="flex items-center gap-6">
<div class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
<i class="fa-regular fa-image text-xl"></i>
</div>
<div>
<h3 class="text-lg font-semibold text-on-surface">Upload Image</h3>
<p class="text-on-surface-variant text-sm mt-0.5">JPG, PNG, WEBP up to 50MB</p>
<div id="image-file-badge" class="hidden mt-2 flex items-center gap-1.5 text-xs text-secondary" style="font-family:'JetBrains Mono',monospace;">
<i class="fa-solid fa-circle-check text-sm"></i>
<span id="image-file-name" class="truncate max-w-[280px]"></span>
</div>
</div>
</div>
<button class="px-5 py-2.5 border border-outline-variant/30 rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container transition-colors" onclick="event.stopPropagation();triggerFileInput('image')">
  Browse Files
</button>
</div>
<!-- Upload Audio -->
<div id="audio-row" class="upload-row group bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer" onclick="triggerFileInput('audio')" ondragover="handleDragOver(event,'audio')" ondragleave="handleDragLeave(event,'audio')" ondrop="handleDrop(event,'audio')">
<input type="file" id="file-input-audio" accept="audio/*" style="display:none;" onchange="handleFileSelect(event,'audio')" />
<div class="flex items-center gap-6">
<div class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
<i class="fa-solid fa-chart-simple text-xl"></i>
</div>
<div>
<h3 class="text-lg font-semibold text-on-surface">Upload Audio</h3>
<p class="text-on-surface-variant text-sm mt-0.5">WAV, MP3, FLAC up to 100MB</p>
<div id="audio-file-badge" class="hidden mt-2 flex items-center gap-1.5 text-xs text-secondary" style="font-family:'JetBrains Mono',monospace;">
<i class="fa-solid fa-circle-check text-sm"></i>
<span id="audio-file-name" class="truncate max-w-[280px]"></span>
</div>
</div>
</div>
<button class="px-5 py-2.5 border border-outline-variant/30 rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container transition-colors" onclick="event.stopPropagation();triggerFileInput('audio')">
  Browse Files
</button>
</div>
</div>

<!-- Analyze CTA -->
<div id="analyze-cta" class="hidden mb-12">
  <div class="bg-surface border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm" style="background:linear-gradient(135deg,color-mix(in srgb, var(--color-primary) 5%, transparent),color-mix(in srgb, var(--color-secondary) 5%, transparent));">
    <div class="flex items-center gap-4">
      <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        <i class="fa-solid fa-cloud-arrow-up text-xl pulse-soft"></i>
      </div>
      <div>
        <p class="font-semibold text-on-surface text-sm" id="cta-file-name">file_selected</p>
        <p class="text-xs text-on-surface-variant mt-0.5" id="cta-file-meta">Ready for analysis</p>
      </div>
    </div>
    <button onclick="startAnalysis()" class="bg-primary text-on-primary font-semibold text-sm px-7 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-sm hover:shadow-md active:scale-[0.98] flex items-center gap-2 flex-shrink-0">
      <i class="fa-solid fa-radar text-base"></i>Analyze Now
    </button>
  </div>
</div>

<!-- Bottom Grid: Recent Analysis & Tips -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
<!-- Recent Analysis Table -->
<div class="lg:col-span-2 bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 flex flex-col">
<div class="flex items-center justify-between mb-6">
<h2 class="text-xl font-bold text-on-surface">Recent Analysis</h2>
<button class="text-primary text-sm font-medium hover:underline" onclick="navigate('history')">View All</button>
</div>
<div class="overflow-x-auto flex-1">
<table class="w-full text-left border-collapse">
<thead>
<tr class="text-on-surface-variant text-sm border-b border-outline-variant/30">
<th class="pb-3 font-medium">File Name</th>
<th class="pb-3 font-medium">Type</th>
<th class="pb-3 font-medium">Date</th>
<th class="pb-3 font-medium">Status</th>
</tr>
</thead>
<tbody id="recent-analysis-tbody" class="text-sm text-on-surface">
<tr><td colspan="4" class="py-6 text-center text-on-surface-variant text-sm" style="font-family:'JetBrains Mono',monospace;">Loading recent scans…</td></tr>
</tbody>
</table>
</div>
</div>
<!-- Analysis Tips Card -->
<div class="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6">
<div class="flex items-center gap-3 mb-6">
<i class="fa-regular fa-lightbulb text-primary text-xl"></i>
<h2 class="text-xl font-bold text-on-surface">Upload&nbsp;<span class="" style="font-size: 1.25rem;">Tips</span></h2>
</div>
<div class="space-y-6">
<div class="flex gap-3">
<i class="fa-regular fa-circle-check text-primary mt-1"></i>
<div>
<h4 class="text-sm font-semibold text-on-surface mb-1">High Resolution</h4>
<p class="text-sm text-on-surface-variant leading-relaxed">Use source files with at least 480p resolution for better artifact detection.</p>
</div>
</div>
<div class="flex gap-3">
<i class="fa-regular fa-circle-check text-primary mt-1"></i>
<div>
<h4 class="text-sm font-semibold text-on-surface mb-1">Raw Formats</h4>
<p class="text-sm text-on-surface-variant leading-relaxed">Avoid heavy social media compression; upload original files when possible.</p>
</div>
</div>
</div>
</div>
</div>

<section class="mt-12 mb-10">
<div class="text-center mb-8">
<h2 class="text-2xl font-bold text-on-surface mb-2">How Deepfake AI Works</h2>
<p class="text-on-surface-variant max-w-2xl mx-auto">Protecting digital integrity through advanced AI detection across all media formats.</p>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Image Detection Card -->
<div class="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
<div class="w-10 h-10 bg-primary-container/30 rounded-lg flex items-center justify-center text-primary mb-4">
<i class="fa-regular fa-image text-lg"></i>
</div>
<h3 class="text-lg font-semibold text-on-surface mb-2">Image Detection</h3>
<p class="text-sm text-on-surface-variant leading-relaxed">We perform rigorous frame-by-frame analysis to identify pixel inconsistencies, metadata anomalies, and synthetic artifacts within static images with high precision.</p>
</div>
<!-- Video Detection Card -->
<div class="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
<div class="w-10 h-10 bg-primary-container/30 rounded-lg flex items-center justify-center text-primary mb-4">
<i class="fa-solid fa-video text-lg"></i>
</div>
<h3 class="text-lg font-semibold text-on-surface mb-2">Video Detection</h3>
<p class="text-sm text-on-surface-variant leading-relaxed">Our frame-by-frame deepfake analysis and temporal consistency checks detect facial manipulations and synthetic inserts in real-time.</p>
</div>
<!-- Audio Detection Card -->
<div class="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
<div class="w-10 h-10 bg-primary-container/30 rounded-lg flex items-center justify-center text-primary mb-4">
<i class="fa-solid fa-chart-simple text-lg"></i>
</div>
<h3 class="text-lg font-semibold text-on-surface mb-2">Audio Detection</h3>
<p class="text-sm text-on-surface-variant leading-relaxed">We verify vocal biometrics and spectrogram signatures to detect voice cloning, synthesized speech, and unauthorized audio alterations.</p>
</div>
</div>
</section>

<footer class="mt-12 p-8 bg-surface-container rounded-2xl text-on-surface shadow-sm border border-outline-variant/10">
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- About Column -->
<div>
<h3 class="text-lg font-bold mb-4 flex items-center gap-2">
<i class="fa-solid fa-shield-halved text-primary"></i>
        About Deepfake AI
      </h3>
<a href="#" class="text-on-surface-variant text-sm hover:text-on-surface hover:underline transition-colors">About Deepfake AI (PDF)</a>
</div>
<!-- Privacy Column -->
<div>
<h3 class="text-lg font-bold mb-4 flex items-center gap-2">
<i class="fa-solid fa-lock text-primary"></i>
        Privacy Policy
      </h3>
<a href="#" class="text-on-surface-variant text-sm hover:text-on-surface hover:underline transition-colors">Privacy Policy (PDF)</a>
</div>
<!-- Contact Column -->
<div>
<h3 class="text-lg font-bold mb-4 flex items-center gap-2">
<i class="fa-solid fa-circle-question text-primary"></i>
        Contact Info
      </h3>
<ul class="space-y-2 text-sm text-on-surface-variant">
<li class="flex items-center gap-2">
<i class="fa-solid fa-envelope"></i>
          support.deepfakeai@gmail.com
        </li>
<li class="flex items-center gap-2">
<i class="fa-solid fa-phone"></i>
          +91 7004975244&nbsp;</li>
</ul>
</div>
</div>
<div class="mt-8 pt-6 border-t border-outline-variant/10 text-center text-xs text-on-surface-variant">
    © 2026 Deepfake AI. All rights reserved.
  </div>
</footer>
</div>
</div>
\`;`;

fs.writeFileSync('src/templates/uploadTemplate.js', content);
