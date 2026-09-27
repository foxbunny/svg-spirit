---
name: trace-spritesheet-flow
description: Trace SVG Spirit behavior across its public UI features, shared application state, transformation helpers, persistence, preview, and download output. Use when mapping a capability or investigating how an SVG change reaches an observable result.
---

# Trace spritesheet flow

Trace one concrete path from a supported user interaction to its state changes and observable output.

1. Start at the relevant element or browser event in `index.html` or a module in `features/`.
2. Follow named functions and events through the application context, `howto/` helpers, and `data/` state.
3. Continue to the applicable preview, download, local-storage, or service-worker boundary.
4. Cite repository-relative paths and named functions or events for every link.
5. Separate behavior documented in `README.md` from conclusions established through source inspection.
6. Report uncertain or unverified links instead of guessing.

Return `Entry`, `State`, `Output`, and `Limitations` sections. Do not change files unless the caller explicitly requests an implementation.
