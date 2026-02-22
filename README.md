# Hofwerk

A website and knowledge base for the Transformative Community Project — a farmstead in Anhalt, Eastern Germany, exploring sustainable forms of learning, working, and living.

**Live site:** https://paintfuture.github.io/hofwerk/

## What This Is

An 1884 three-sided farmstead acquired in 2020 is being renovated and reimagined as a think tank and living laboratory. The project integrates:

- Communitarianism and active civil society
- Unconditional basic income as enabler
- Self-directed education as alternative to institutional schooling
- Community-based entrepreneurship in rural East Germany
- Ecological and cultural transformation

The intellectual framework is published in [Frontiers in Sociology](https://doi.org/10.3389/fsoc.2023.1164293) and documented across three book volumes and a De Gruyter academic publication.

## Repository Structure

```
hofwerk/
├── content/           # Hugo site content (Markdown)
│   ├── _index.md      # Home page
│   ├── about/         # About section
│   └── journal/       # Chronological entries
├── data/              # Knowledge graphs and research data
│   ├── knowledge-graph.json          # Conceptual/thematic graph
│   ├── knowledge-graph-project.json  # Project-specific graph (places, people, timeline)
│   └── similar-projects-research.json # Regional projects (draft, not published)
├── static/
│   ├── css/           # Stylesheets
│   └── images/        # Optimized images
│       ├── covers/    # Book covers
│       └── supplementary/ # Article supplementary photos
├── themes/hofwerk/    # Custom Hugo theme (field journal aesthetic)
├── .github/workflows/ # GitHub Actions for deployment
└── hugo.toml          # Site configuration
```

## Tech Stack

- **Hugo** — static site generator (v0.123.7+)
- **GitHub Pages** — hosting (via GitHub Actions)
- **No JavaScript** — pure HTML/CSS at launch

## Local Development

```bash
hugo server --buildDrafts
```

## Knowledge Graphs

The project maintains two JSON knowledge graphs in `data/`:

### `knowledge-graph.json` — Conceptual Graph
Thematic and theoretical structure. Reusable across similar projects. Contains:
- Diagnosis (alienation, school crisis, control society)
- Philosophy (communitarianism, O'Donohue, Fromm, Beuys)
- Pillars (civil society, UBI, learning, entrepreneurship, community)
- Transformation (economic, social, cultural, ecological)
- Safeguards (democratic oversight, critique engagement)

### `knowledge-graph-project.json` — Project Graph
Specific to the Anhalt farmstead. Contains:
- People (real and character prototypes: Tomasz, Ludwik, Ragnar)
- Buildings (farmhouse, barn, workshop, stables)
- Land (fields, gardens, fruit trees, walnut tree)
- Infrastructure (water, heating, sewage, future energy)
- Activities (renovation, agriculture, cultural life, seminars)
- Timeline (2020–2024 milestones)
- Publications (article, books, YouTube)

### Using the Knowledge Graphs

Each node has: `id`, `label`, `type`, `description`, `parent`, and optional `children`, `tags`, `references`, `quotes`, `links`, `source`.

To traverse: start at `root`, follow `children` arrays. Cross-references use `links` (array of other node IDs). Quotes include `text` and `source` (which book/article).

Example query patterns:
- All nodes tagged `"education"` → learning-related concepts
- All nodes with `source: "ludwik"` → content from Vol. 2
- Follow `links` from `"ubi"` → connected concepts (civil_society, entrepreneurship)

## Publications

| Title | Year | Format | Link |
|---|---|---|---|
| Frontiers in Sociology article | 2023 | Open access | [DOI](https://doi.org/10.3389/fsoc.2023.1164293) |
| Tomasz — Vol. 1 | 2023 | Print/e-book (EN, DE, IT, PL) | [BoD](https://buchshop.bod.de/tomasz-oder-ueber-das-lernen-arbeiten-und-leben-der-zukunft-joachim-broecher-9783754347911) |
| Ludwik — Vol. 2 | 2023 | Print/e-book (EN, DE, PL) | [BoD](https://buchshop.bod.de/ludwik-notes-on-future-ways-of-learning-working-and-living-joachim-broecher-9783757808129) |
| Ragnar — Vol. 3 | 2024 | E-paper (ResearchGate) | — |
| De Gruyter volume | 2025 | Academic publication | [DOI](https://doi.org/10.1515/9783839448618) |

## License

Content and images are copyright Broecher family. Code (theme, config) is MIT.
