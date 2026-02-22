---
title: "Concept Map"
layout: "interactive"
scripts:
  - "https://d3js.org/d3.v7.min.js"
  - "js/concept-map.js"
---

An interactive map of the project's conceptual landscape. Drag nodes to rearrange. Hover to explore connections. Dashed lines show cross-domain relationships.

<div id="concept-map" style="position: relative; width: 100%; min-height: 600px; margin: 2rem 0; border: 1px solid var(--border); background: #faf7f0;"></div>

<p class="text-muted" style="font-size: 0.8rem;">The concept map is derived from the project's <a href="https://github.com/PaintFuture/hofwerk/tree/main/data">knowledge graph</a> — a structured JSON representation of the theoretical framework and its connections.</p>

### Reading the Map

**Five domains** radiate from the center:

- <span style="color: #a85454;">■</span> **Diagnosis** — what's wrong with modern society (alienation, school crisis, fragmentation, control)
- <span style="color: #7a6e9b;">■</span> **Philosophy** — the thinkers who inform the response (communitarianism, O'Donohue, Fromm, Beuys, Deleuze)
- <span style="color: #5a6e4a;">■</span> **Five Pillars** — the model's core elements (civil society, work & income, learning, entrepreneurship, community)
- <span style="color: #b8860b;">■</span> **Transformation** — the four dimensions of change (economic, social, cultural, ecological)
- <span style="color: #6b8e7b;">■</span> **The Farm** — where theory meets practice (buildings, land, crafts, agriculture, sustainability)

The **dashed lines** reveal how ideas cross boundaries: Deleuze's control society connects to the diagnosis *and* to the civil society pillar. Beuys' social sculpture links philosophy to craftsmanship. The commons concept bridges entrepreneurship and economic transformation.
