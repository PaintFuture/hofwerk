// Interactive concept map using D3.js force-directed graph
// Reads from the knowledge graph JSON and renders an explorable visualization

(function() {
  const container = document.getElementById('concept-map');
  if (!container) return;

  const width = container.clientWidth;
  const height = 600;

  // Simplified knowledge graph for visualization
  const graphData = {
    nodes: [
      // Root
      { id: 'root', label: 'Transformative\nCommunity Project', group: 'root', r: 28 },

      // Diagnosis
      { id: 'diagnosis', label: 'Diagnosis', group: 'diagnosis', r: 18 },
      { id: 'alienation', label: 'Alienation', group: 'diagnosis', r: 12 },
      { id: 'school_crisis', label: 'School Crisis', group: 'diagnosis', r: 12 },
      { id: 'fragmentation', label: 'Social\nFragmentation', group: 'diagnosis', r: 12 },
      { id: 'control', label: 'Society of\nControl', group: 'diagnosis', r: 12 },

      // Philosophy
      { id: 'philosophy', label: 'Philosophy', group: 'philosophy', r: 18 },
      { id: 'communitarianism', label: 'Communitarianism', group: 'philosophy', r: 13 },
      { id: 'odonohue', label: "O'Donohue\nBelonging", group: 'philosophy', r: 11 },
      { id: 'fromm', label: 'Fromm\nBeing vs Having', group: 'philosophy', r: 11 },
      { id: 'beuys', label: 'Beuys\nSocial Sculpture', group: 'philosophy', r: 11 },
      { id: 'deleuze', label: 'Deleuze', group: 'philosophy', r: 10 },

      // Pillars
      { id: 'pillars', label: 'Five Pillars', group: 'pillars', r: 18 },
      { id: 'civil_society', label: 'Active\nCivil Society', group: 'pillars', r: 14 },
      { id: 'work_income', label: 'Work &\nIncome', group: 'pillars', r: 14 },
      { id: 'ubi', label: 'Basic Income', group: 'pillars', r: 11 },
      { id: 'learning', label: 'Self-Directed\nLearning', group: 'pillars', r: 14 },
      { id: 'wanderjahre', label: 'Wanderjahre', group: 'pillars', r: 11 },
      { id: 'entrepreneurship', label: 'Entrepreneurship', group: 'pillars', r: 14 },
      { id: 'commons', label: 'The Commons', group: 'pillars', r: 11 },
      { id: 'community', label: 'Community\nBuilding', group: 'pillars', r: 14 },

      // Transformation
      { id: 'transformation', label: 'Transformation', group: 'transformation', r: 18 },
      { id: 'economic', label: 'Economic', group: 'transformation', r: 10 },
      { id: 'social', label: 'Social', group: 'transformation', r: 10 },
      { id: 'cultural', label: 'Cultural', group: 'transformation', r: 10 },
      { id: 'ecological', label: 'Ecological', group: 'transformation', r: 10 },

      // The Farm
      { id: 'farm', label: 'The Farm', group: 'farm', r: 16 },
      { id: 'buildings', label: 'Buildings', group: 'farm', r: 11 },
      { id: 'land', label: 'Land', group: 'farm', r: 11 },
      { id: 'crafts', label: 'Crafts &\nMaking', group: 'farm', r: 12 },
      { id: 'agriculture', label: 'Agriculture', group: 'farm', r: 11 },
      { id: 'sustainability', label: 'Sustainability', group: 'farm', r: 12 },
    ],
    links: [
      // Root connections
      { source: 'root', target: 'diagnosis' },
      { source: 'root', target: 'philosophy' },
      { source: 'root', target: 'pillars' },
      { source: 'root', target: 'transformation' },
      { source: 'root', target: 'farm' },

      // Diagnosis
      { source: 'diagnosis', target: 'alienation' },
      { source: 'diagnosis', target: 'school_crisis' },
      { source: 'diagnosis', target: 'fragmentation' },
      { source: 'diagnosis', target: 'control' },

      // Philosophy
      { source: 'philosophy', target: 'communitarianism' },
      { source: 'philosophy', target: 'odonohue' },
      { source: 'philosophy', target: 'fromm' },
      { source: 'philosophy', target: 'beuys' },
      { source: 'philosophy', target: 'deleuze' },

      // Pillars
      { source: 'pillars', target: 'civil_society' },
      { source: 'pillars', target: 'work_income' },
      { source: 'pillars', target: 'learning' },
      { source: 'pillars', target: 'entrepreneurship' },
      { source: 'pillars', target: 'community' },
      { source: 'work_income', target: 'ubi' },
      { source: 'learning', target: 'wanderjahre' },
      { source: 'entrepreneurship', target: 'commons' },

      // Transformation
      { source: 'transformation', target: 'economic' },
      { source: 'transformation', target: 'social' },
      { source: 'transformation', target: 'cultural' },
      { source: 'transformation', target: 'ecological' },

      // Farm
      { source: 'farm', target: 'buildings' },
      { source: 'farm', target: 'land' },
      { source: 'farm', target: 'crafts' },
      { source: 'farm', target: 'agriculture' },
      { source: 'farm', target: 'sustainability' },

      // Cross-links (dashed)
      { source: 'alienation', target: 'work_income', cross: true },
      { source: 'control', target: 'civil_society', cross: true },
      { source: 'deleuze', target: 'control', cross: true },
      { source: 'communitarianism', target: 'community', cross: true },
      { source: 'commons', target: 'economic', cross: true },
      { source: 'ecological', target: 'sustainability', cross: true },
      { source: 'beuys', target: 'crafts', cross: true },
      { source: 'school_crisis', target: 'learning', cross: true },
      { source: 'odonohue', target: 'social', cross: true },
      { source: 'fromm', target: 'economic', cross: true },
    ]
  };

  const colors = {
    root: '#2c2c2c',
    diagnosis: '#a85454',
    philosophy: '#7a6e9b',
    pillars: '#5a6e4a',
    transformation: '#b8860b',
    farm: '#6b8e7b'
  };

  const svg = d3.select(container)
    .append('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; font-family: "Source Serif 4", Georgia, serif;');

  // Arrowhead marker
  svg.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -3 6 6')
    .attr('refX', 12)
    .attr('refY', 0)
    .attr('markerWidth', 4)
    .attr('markerHeight', 4)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-3L6,0L0,3')
    .attr('fill', '#d4cbb8');

  const simulation = d3.forceSimulation(graphData.nodes)
    .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(d => d.cross ? 120 : 70))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => d.r + 8));

  const link = svg.append('g')
    .selectAll('line')
    .data(graphData.links)
    .join('line')
    .attr('stroke', d => d.cross ? '#d4cbb8' : '#b0a898')
    .attr('stroke-width', d => d.cross ? 0.8 : 1.5)
    .attr('stroke-dasharray', d => d.cross ? '4,4' : 'none')
    .attr('stroke-opacity', d => d.cross ? 0.5 : 0.7);

  const node = svg.append('g')
    .selectAll('g')
    .data(graphData.nodes)
    .join('g')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))
    .style('cursor', 'grab');

  node.append('circle')
    .attr('r', d => d.r)
    .attr('fill', d => colors[d.group])
    .attr('fill-opacity', 0.15)
    .attr('stroke', d => colors[d.group])
    .attr('stroke-width', d => d.group === 'root' ? 2.5 : 1.5);

  // Multi-line labels
  node.each(function(d) {
    const lines = d.label.split('\n');
    const g = d3.select(this);
    lines.forEach((line, i) => {
      g.append('text')
        .text(line)
        .attr('text-anchor', 'middle')
        .attr('dy', `${(i - (lines.length - 1) / 2) * 1.1 + 0.35}em`)
        .attr('font-size', d.r < 12 ? '8px' : d.r < 16 ? '9px' : d.r < 20 ? '10px' : '11px')
        .attr('fill', '#2c2c2c')
        .attr('pointer-events', 'none');
    });
  });

  // Tooltip
  const tooltip = d3.select(container)
    .append('div')
    .style('position', 'absolute')
    .style('background', '#f5f0e8')
    .style('border', '1px solid #d4cbb8')
    .style('padding', '8px 12px')
    .style('font-size', '13px')
    .style('line-height', '1.5')
    .style('max-width', '250px')
    .style('pointer-events', 'none')
    .style('opacity', 0)
    .style('transition', 'opacity 0.2s');

  const descriptions = {
    root: 'An integrated model for sustainable forms of learning, working, and living.',
    diagnosis: 'What\'s wrong — alienation, fragmentation, control.',
    alienation: 'Functionalized work lacking self-realization.',
    school_crisis: 'Growing numbers of youth not fitting into schools.',
    fragmentation: 'Loss of social cohesion, meaning, and belonging.',
    control: 'Deleuze: control systems diminish individual freedom.',
    philosophy: 'The intellectual traditions informing the project.',
    communitarianism: 'Social embedding without collectivist coercion.',
    odonohue: 'Belonging, thresholds, the inner richness of each person.',
    fromm: 'Being makes you happier than having.',
    beuys: 'Society itself as an artwork shaped by everyone.',
    deleuze: 'From control society to active civil society.',
    pillars: 'The five interconnected elements of the model.',
    civil_society: 'Citizens taking responsibility — the post-institutional era.',
    work_income: 'Manual and intellectual work equally valued.',
    ubi: 'Incentive for entrepreneurial activity and social responsibility.',
    learning: 'Compulsory schooling → self-designed compulsory education.',
    wanderjahre: 'Self-determined years of journeying between projects.',
    entrepreneurship: 'Reviving abandoned properties into living projects.',
    commons: 'Shared resources, jointly managed.',
    community: 'Diverse, democratic, intergenerational communities.',
    transformation: 'Seeing oneself as part of systemic change.',
    economic: 'From accumulation toward commons-based economies.',
    social: 'Rebuilding cohesion, belonging, identity.',
    cultural: 'Heritage, literature, music, crafts as renewal.',
    ecological: 'Sustainable building, farming, reduced mobility.',
    farm: 'The physical anchor — 1884 farmstead in Anhalt.',
    buildings: 'Farmhouse, barn, workshop, stables.',
    land: 'Fields, gardens, pastures, fruit trees.',
    crafts: 'Furniture, jam, textiles — making as meaning.',
    agriculture: 'Organic farming, fruit growing, seasonal rhythms.',
    sustainability: 'Ecological materials, biodiversity, climate-positive living.'
  };

  node.on('mouseover', function(event, d) {
    tooltip
      .html(`<strong>${d.label.replace(/\n/g, ' ')}</strong><br>${descriptions[d.id] || ''}`)
      .style('left', (event.offsetX + 15) + 'px')
      .style('top', (event.offsetY - 10) + 'px')
      .style('opacity', 1);

    // Highlight connected
    const connected = new Set();
    graphData.links.forEach(l => {
      if (l.source.id === d.id) connected.add(l.target.id);
      if (l.target.id === d.id) connected.add(l.source.id);
    });
    connected.add(d.id);

    node.select('circle')
      .attr('fill-opacity', n => connected.has(n.id) ? 0.3 : 0.05)
      .attr('stroke-opacity', n => connected.has(n.id) ? 1 : 0.2);
    node.selectAll('text')
      .attr('opacity', n => connected.has(n.id) ? 1 : 0.2);
    link
      .attr('stroke-opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 0.9 : 0.1);
  })
  .on('mouseout', function() {
    tooltip.style('opacity', 0);
    node.select('circle').attr('fill-opacity', 0.15).attr('stroke-opacity', 1);
    node.selectAll('text').attr('opacity', 1);
    link.attr('stroke-opacity', l => l.cross ? 0.5 : 0.7);
  });

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
})();
