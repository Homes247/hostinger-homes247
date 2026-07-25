// zone-flags.ts

// Disable patching of requestAnimationFrame to avoid unnecessary overhead for animations
(window as any).__Zone_disable_requestAnimationFrame = true;

// Disable patching of 'on' event handlers (e.g., onclick, onchange)
(window as any).__Zone_disable_on_property = true;

// Prevent patching of scroll and mousemove events
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];

// Enable cross-context checks for IE/Edge to prevent issues with addEventListener
(window as any).__Zone_enable_cross_context_check = true;