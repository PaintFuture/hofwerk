# Contributing to Hofwerk

## For Humans

This is a family project. Contributions are welcome but should align with the project's values: thoughtfulness over speed, substance over polish.

### Content
- Write in a calm, reflective tone — this is a field journal, not a marketing site
- Images should be JPG, optimized for web (max 1200px wide, <500KB)
- Quotes from the books should include source attribution

### Code
- Hugo templates use the custom `hofwerk` theme
- CSS follows the existing palette (see `--bg`, `--accent`, etc. in `style.css`)
- No JavaScript unless strictly necessary and client-side only (GitHub Pages constraint)

## For AI Agents

This section describes how to work with the repository programmatically.

### Knowledge Graph Operations

The knowledge graphs live in `data/`. They are the project's structured memory.

**Adding a node:**
```json
{
  "id": "unique_snake_case_id",
  "label": "Human-Readable Label",
  "type": "concept|place|person|activity|milestone|publication",
  "description": "One to three sentences.",
  "parent": "parent_node_id",
  "children": ["child_id_1", "child_id_2"],
  "tags": ["tag1", "tag2"],
  "references": ["Author Year"],
  "quotes": [{"text": "...", "source": "tomasz|ludwik|ragnar|article"}],
  "links": ["cross_reference_node_id"],
  "source": "which book/document"
}
```

**Rules:**
- `id` must be unique across both graph files
- `parent` must reference an existing node
- When adding children, also update the parent's `children` array
- `links` are bidirectional in intent but stored one-way — add to both sides
- Quotes must be verbatim from source material
- `similar-projects-research.json` is DRAFT — never publish to the website without explicit approval

**Conceptual graph** (`knowledge-graph.json`): theory, philosophy, diagnosis, pillars, transformation. Reusable.
**Project graph** (`knowledge-graph-project.json`): places, people, timeline, publications. Specific to this farm.

### Website Content

- Content is in `content/` as Markdown with YAML front matter
- Images go in `static/images/` with descriptive names
- The home page is `content/_index.md`
- Section pages are `content/<section>/_index.md`
- Individual pages are `content/<section>/<slug>.md`

### Deployment

Push to `main` triggers GitHub Actions → Hugo build → GitHub Pages deploy. Takes ~60 seconds.

### Style Guide

- Serif typography (Source Serif 4), warm parchment palette
- Tone: unhurried, reflective, layered
- No marketing language, no superlatives
- Academic references welcome but not required for narrative content
- German and Polish terms can appear naturally (the project is multilingual)

### Source Material

PDFs in `consume/` are the primary sources. Extract text with `pdftotext`. Images can be extracted with `pdfimages -j`. Always attribute to the correct volume.

### Future Dimensions (tracked in GitHub Issues)

- Guest hosting / booking page
- Farm store / produce sales
- Epub/other formats for Vol. 3
- Interactive knowledge graph visualization
- Multilingual content (DE, PL)
- Email journal entries (renovation chronology)
