// Interactive concept map — expanded version
// D3.js force-directed graph with tooltips and highlight behavior

(function() {
  const container = document.getElementById('concept-map');
  if (!container) return;

  const width = container.clientWidth;
  const height = 700;

  const graphData = {
    nodes: [
      // Root
      { id: 'root', label: 'Transformative\nCommunity Project', group: 'root', r: 30, desc: 'An integrated model for sustainable forms of learning, working, and living — anchored in a farmstead in Anhalt, Eastern Germany.' },

      // --- DIAGNOSIS ---
      { id: 'diagnosis', label: 'Diagnosis', group: 'diagnosis', r: 20, desc: 'What is wrong with modern society? The structural problems that motivate the project.' },
      { id: 'alienation', label: 'Work\nAlienation', group: 'diagnosis', r: 13, desc: 'Functionalized work lacking self-realization. Competition, indifference, and alienation frame the work-life experience.' },
      { id: 'school_crisis', label: 'School\nCrisis', group: 'diagnosis', r: 13, desc: 'Growing numbers of youth not fitting into schools. Male adolescents at particular risk. Declining attractiveness of the teaching profession.' },
      { id: 'fragmentation', label: 'Social\nFragmentation', group: 'diagnosis', r: 13, desc: 'Loss of social cohesion, meaning, and belonging. No narrative holds society together. Escapist virtual worlds as substitute.' },
      { id: 'control', label: 'Society of\nControl', group: 'diagnosis', r: 12, desc: 'Deleuze: control systems play a dominant role, individual freedom diminishes. Manifests in educational institutions and work life.' },
      { id: 'welfare_limits', label: 'Welfare\nState Limits', group: 'diagnosis', r: 11, desc: 'The welfare state absorbs consequences but cannot address causes. Ever-expanding diagnostic and intervention systems.' },
      { id: 'skilled_shortage', label: 'Skilled Worker\nShortage', group: 'diagnosis', r: 10, desc: 'Shortage in geriatric care, teaching, trades. Lateral entrants without preparation. An unsustainable cycle.' },

      // --- PHILOSOPHY ---
      { id: 'philosophy', label: 'Philosophy', group: 'philosophy', r: 20, desc: 'The intellectual traditions and thinkers informing the project.' },
      { id: 'communitarianism', label: 'Communi-\ntarianism', group: 'philosophy', r: 14, desc: 'Taylor, Sandel, Walzer, MacIntyre. Social embedding without collectivist coercion. Preserving individual freedom while emphasizing community.' },
      { id: 'odonohue', label: "O'Donohue\nBelonging", group: 'philosophy', r: 12, desc: 'Irish philosopher. Belonging as social and emotional connectedness. Thresholds as conscious transitions. Anam Cara — the soul friend.' },
      { id: 'fromm', label: 'Fromm\nBeing vs Having', group: 'philosophy', r: 12, desc: 'To Have or To Be? Being makes you happier than having. Questioning the fixation on material accumulation under capitalism.' },
      { id: 'beuys', label: 'Beuys\nSocial Sculpture', group: 'philosophy', r: 12, desc: 'Society itself as an artwork shaped by everyone. Soziale Plastik — the farm as a collective creative act.' },
      { id: 'deleuze', label: 'Deleuze', group: 'philosophy', r: 11, desc: 'From the society of control to active civil society. A central framing across all three documentation volumes.' },
      { id: 'dewey', label: 'Dewey\nLearning by Doing', group: 'philosophy', r: 11, desc: 'Experiential education. Learning through action, not instruction. The philosophical ancestor of the project\'s pedagogy.' },
      { id: 'sennett', label: 'Sennett\nThe Craftsman', group: 'philosophy', r: 11, desc: 'Craftsmanship as a basic human impulse — the desire to do a job well for its own sake. Manual skill as a form of thinking.' },
      { id: 'thoreau', label: 'Thoreau\nSimplicity', group: 'philosophy', r: 10, desc: 'Walden — simplicity, self-reliance, deliberate living. The philosophical precedent for rural retreat as social experiment.' },
      { id: 'rosa', label: 'Rosa\nResonance', group: 'philosophy', r: 10, desc: 'Resonance as the opposite of alienation. Meaningful connection with the world — through work, nature, relationships.' },
      { id: 'illich', label: 'Illich\nDeschooling', group: 'philosophy', r: 10, desc: 'Deschooling Society. The radical critique of institutional education. Learning webs instead of schools.' },
      { id: 'polanyi', label: 'Polanyi\nGreat Transform.', group: 'philosophy', r: 10, desc: 'The Great Transformation. How markets became disembedded from society — and the counter-movement to re-embed them.' },

      // --- PILLARS ---
      { id: 'pillars', label: 'Five Pillars', group: 'pillars', r: 20, desc: 'The five interconnected elements of the transformative community project model.' },
      { id: 'civil_society', label: 'Active\nCivil Society', group: 'pillars', r: 15, desc: 'Citizens taking social, economic, and educational responsibility. Not waiting for the state. The post-institutional era.' },
      { id: 'work_income', label: 'Work &\nIncome', group: 'pillars', r: 15, desc: 'Rethinking labor. Manual and intellectual work equally valued. Deceleration. Self-determination.' },
      { id: 'ubi', label: 'Basic\nIncome', group: 'pillars', r: 12, desc: 'Not redistribution — incentive for entrepreneurial activity and social responsibility. Dismantles welfare bureaucracy.' },
      { id: 'meaningful_labor', label: 'Meaningful\nLabor', group: 'pillars', r: 11, desc: 'Roofers and philosophers, carpenters and educators working side by side. Craftsmanship rediscovered as dignified work.' },
      { id: 'learning', label: 'Self-Directed\nLearning', group: 'pillars', r: 15, desc: 'Compulsory schooling transformed into self-designed compulsory education. Learners choose their path.' },
      { id: 'wanderjahre', label: 'Wanderjahre', group: 'pillars', r: 12, desc: 'Self-determined years of journeying between projects — farm to mill to urban workshop. Reimagined apprenticeship.' },
      { id: 'highscope', label: 'HighScope\nModel', group: 'pillars', r: 10, desc: 'Weikart\'s HighScope Summer Camp in Michigan. Activity-oriented, creativity-driven, holistic education. The direct experiential precedent.' },
      { id: 'entrepreneurship', label: 'Entrepre-\nneurship', group: 'pillars', r: 15, desc: 'Community-based enterprise. Reviving abandoned properties. Commons-based resource sharing.' },
      { id: 'commons', label: 'The\nCommons', group: 'pillars', r: 12, desc: 'Shared resources, jointly managed. From medieval pastures to modern commons projects. Commoning as practice.' },
      { id: 'rural_revival', label: 'Rural\nRevival', group: 'pillars', r: 11, desc: 'Abandoned farms, train stations, chateaux in East Germany as opportunities. Thousands of vacant properties waiting.' },
      { id: 'community', label: 'Community\nBuilding', group: 'pillars', r: 15, desc: 'Diverse, democratic, intergenerational communities. Inclusive of gender, disability, age, culture, tradition.' },
      { id: 'intergenerational', label: 'Inter-\ngenerational', group: 'pillars', r: 11, desc: 'Elders, adults, youth living together. More adult caregivers per child. Male role models present.' },
      { id: 'mutual_aid', label: 'Mutual\nAid', group: 'pillars', r: 10, desc: 'Neighborly structures: tractor help for field access, firewood for services. Old patterns renewed.' },

      // --- TRANSFORMATION ---
      { id: 'transformation', label: 'Transformation', group: 'transformation', r: 20, desc: 'The binding philosophy — seeing oneself as part of economic, social, cultural, and ecological transformation.' },
      { id: 'economic', label: 'Economic', group: 'transformation', r: 12, desc: 'From capitalist accumulation toward commons-based, community-embedded economies.' },
      { id: 'social', label: 'Social', group: 'transformation', r: 12, desc: 'Rebuilding cohesion, belonging, identity-promoting narratives. Creative disorder rather than top-down planning.' },
      { id: 'cultural', label: 'Cultural', group: 'transformation', r: 12, desc: 'Heritage preservation, Polish-German exchange, literature, music, crafts as cultural renewal.' },
      { id: 'ecological', label: 'Ecological', group: 'transformation', r: 12, desc: 'Ecological building materials, organic farming, reduced mobility, biodiversity, climate-positive living.' },
      { id: 'sdgs', label: 'UN SDGs', group: 'transformation', r: 10, desc: 'Orientation toward the 2030 Agenda — sustainable development for people, nature, wildlife, and the planet.' },

      // --- THE FARM ---
      { id: 'farm', label: 'The Farm\nin Anhalt', group: 'farm', r: 18, desc: 'Three-sided farmstead (Dreiseitenhof) from 1884. 1h SW of Berlin. Where theory meets practice.' },
      { id: 'buildings', label: 'Buildings', group: 'farm', r: 12, desc: 'Farmhouse, barn, workshop, stables — each being restored and reimagined for new purposes.' },
      { id: 'land', label: 'Land &\nNature', group: 'farm', r: 12, desc: 'Fields, gardens, pastures, fruit trees, walnut tree. Biodiversity through fallow land. Wolf habitat.' },
      { id: 'crafts', label: 'Crafts &\nMaking', group: 'farm', r: 13, desc: 'Furniture restoration, jam production, design objects. Making as meaning. The workshop as creative space.' },
      { id: 'agriculture', label: 'Agriculture', group: 'farm', r: 12, desc: 'Organic farming, fruit growing, seasonal rhythms. Surplus shared with neighbors.' },
      { id: 'sustainability', label: 'Sustainability', group: 'farm', r: 13, desc: 'Heat pump, ecological materials, recycling, reduced mobility. Ecological honesty over sentiment.' },
      { id: 'polish_german', label: 'Polish-German\nExchange', group: 'farm', r: 12, desc: 'Rooted in Jaczewski\'s legacy. Polish literature, language learning, Krakow connections. International scouting ideals.' },
      { id: 'seminars', label: 'Think Tank\n& Seminars', group: 'farm', r: 11, desc: 'Informal seminars in the barn. Biographies, generations, communities of the future. University classes streamed during Covid.' },

      // --- SAFEGUARDS ---
      { id: 'safeguards', label: 'Safeguards', group: 'safeguards', r: 14, desc: 'Honest engagement with risks, criticisms, and necessary protections.' },
      { id: 'democratic', label: 'Democratic\nOversight', group: 'safeguards', r: 10, desc: 'Government agencies must oversee projects. Human rights guaranteed. Transparency and financial disclosure.' },
      { id: 'gdr_memory', label: 'GDR\nMemory', group: 'safeguards', r: 10, desc: 'Mistrust of commons concepts recalls GDR socialism. Must be addressed openly and honestly.' },
      { id: 'exploitation', label: 'Against\nExploitation', group: 'safeguards', r: 10, desc: 'Projects must prohibit conditioning, indoctrination, manipulation, subjugation. No cults, no coercion.' },
    ],
    links: [
      // Root connections
      { source: 'root', target: 'diagnosis' },
      { source: 'root', target: 'philosophy' },
      { source: 'root', target: 'pillars' },
      { source: 'root', target: 'transformation' },
      { source: 'root', target: 'farm' },
      { source: 'root', target: 'safeguards' },

      // Diagnosis
      { source: 'diagnosis', target: 'alienation' },
      { source: 'diagnosis', target: 'school_crisis' },
      { source: 'diagnosis', target: 'fragmentation' },
      { source: 'diagnosis', target: 'control' },
      { source: 'diagnosis', target: 'welfare_limits' },
      { source: 'diagnosis', target: 'skilled_shortage' },

      // Philosophy
      { source: 'philosophy', target: 'communitarianism' },
      { source: 'philosophy', target: 'odonohue' },
      { source: 'philosophy', target: 'fromm' },
      { source: 'philosophy', target: 'beuys' },
      { source: 'philosophy', target: 'deleuze' },
      { source: 'philosophy', target: 'dewey' },
      { source: 'philosophy', target: 'sennett' },
      { source: 'philosophy', target: 'thoreau' },
      { source: 'philosophy', target: 'rosa' },
      { source: 'philosophy', target: 'illich' },
      { source: 'philosophy', target: 'polanyi' },

      // Pillars
      { source: 'pillars', target: 'civil_society' },
      { source: 'pillars', target: 'work_income' },
      { source: 'pillars', target: 'learning' },
      { source: 'pillars', target: 'entrepreneurship' },
      { source: 'pillars', target: 'community' },
      { source: 'work_income', target: 'ubi' },
      { source: 'work_income', target: 'meaningful_labor' },
      { source: 'learning', target: 'wanderjahre' },
      { source: 'learning', target: 'highscope' },
      { source: 'entrepreneurship', target: 'commons' },
      { source: 'entrepreneurship', target: 'rural_revival' },
      { source: 'community', target: 'intergenerational' },
      { source: 'community', target: 'mutual_aid' },

      // Transformation
      { source: 'transformation', target: 'economic' },
      { source: 'transformation', target: 'social' },
      { source: 'transformation', target: 'cultural' },
      { source: 'transformation', target: 'ecological' },
      { source: 'transformation', target: 'sdgs' },

      // Farm
      { source: 'farm', target: 'buildings' },
      { source: 'farm', target: 'land' },
      { source: 'farm', target: 'crafts' },
      { source: 'farm', target: 'agriculture' },
      { source: 'farm', target: 'sustainability' },
      { source: 'farm', target: 'polish_german' },
      { source: 'farm', target: 'seminars' },

      // Safeguards
      { source: 'safeguards', target: 'democratic' },
      { source: 'safeguards', target: 'gdr_memory' },
      { source: 'safeguards', target: 'exploitation' },

      // Cross-links
      { source: 'alienation', target: 'work_income', cross: true },
      { source: 'alienation', target: 'rosa', cross: true },
      { source: 'control', target: 'civil_society', cross: true },
      { source: 'control', target: 'deleuze', cross: true },
      { source: 'school_crisis', target: 'learning', cross: true },
      { source: 'school_crisis', target: 'illich', cross: true },
      { source: 'welfare_limits', target: 'ubi', cross: true },
      { source: 'communitarianism', target: 'community', cross: true },
      { source: 'odonohue', target: 'social', cross: true },
      { source: 'fromm', target: 'economic', cross: true },
      { source: 'beuys', target: 'crafts', cross: true },
      { source: 'sennett', target: 'meaningful_labor', cross: true },
      { source: 'sennett', target: 'crafts', cross: true },
      { source: 'dewey', target: 'highscope', cross: true },
      { source: 'thoreau', target: 'farm', cross: true },
      { source: 'polanyi', target: 'economic', cross: true },
      { source: 'commons', target: 'economic', cross: true },
      { source: 'commons', target: 'gdr_memory', cross: true },
      { source: 'ecological', target: 'sustainability', cross: true },
      { source: 'ecological', target: 'sdgs', cross: true },
      { source: 'cultural', target: 'polish_german', cross: true },
      { source: 'rural_revival', target: 'farm', cross: true },
      { source: 'wanderjahre', target: 'rural_revival', cross: true },
      { source: 'intergenerational', target: 'social', cross: true },
      { source: 'mutual_aid', target: 'farm', cross: true },
      { source: 'fragmentation', target: 'odonohue', cross: true },
      { source: 'skilled_shortage', target: 'meaningful_labor', cross: true },
    ]
  };

  const colors = {
    root: '#2c2c2c',
    diagnosis: '#a85454',
    philosophy: '#7a6e9b',
    pillars: '#5a6e4a',
    transformation: '#b8860b',
    farm: '#6b8e7b',
    safeguards: '#8b7355'
  };

  const svg = d3.select(container)
    .append('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; font-family: "Source Serif 4", Georgia, serif;');

  const simulation = d3.forceSimulation(graphData.nodes)
    .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(d => d.cross ? 140 : 65))
    .force('charge', d3.forceManyBody().strength(-180))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => d.r + 6))
    .force('x', d3.forceX(width / 2).strength(0.03))
    .force('y', d3.forceY(height / 2).strength(0.03));

  const link = svg.append('g')
    .selectAll('line')
    .data(graphData.links)
    .join('line')
    .attr('stroke', d => d.cross ? '#d4cbb8' : '#b0a898')
    .attr('stroke-width', d => d.cross ? 0.7 : 1.4)
    .attr('stroke-dasharray', d => d.cross ? '3,4' : 'none')
    .attr('stroke-opacity', d => d.cross ? 0.4 : 0.6);

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
    .attr('fill-opacity', 0.12)
    .attr('stroke', d => colors[d.group])
    .attr('stroke-width', d => d.group === 'root' ? 2.5 : 1.5);

  node.each(function(d) {
    const lines = d.label.split('\n');
    const g = d3.select(this);
    lines.forEach((line, i) => {
      g.append('text')
        .text(line)
        .attr('text-anchor', 'middle')
        .attr('dy', `${(i - (lines.length - 1) / 2) * 1.1 + 0.35}em`)
        .attr('font-size', d.r < 11 ? '7px' : d.r < 13 ? '8px' : d.r < 16 ? '9px' : d.r < 21 ? '10px' : '11px')
        .attr('fill', '#2c2c2c')
        .attr('pointer-events', 'none');
    });
  });

  // Info panel (replaces tooltip for better readability)
  const panel = d3.select(container)
    .append('div')
    .attr('id', 'concept-panel')
    .style('position', 'absolute')
    .style('top', '12px')
    .style('right', '12px')
    .style('background', '#faf7f0')
    .style('border', '1px solid #d4cbb8')
    .style('padding', '12px 16px')
    .style('font-size', '13px')
    .style('line-height', '1.6')
    .style('max-width', '260px')
    .style('font-family', '"Source Serif 4", Georgia, serif')
    .style('opacity', 0)
    .style('transition', 'opacity 0.25s')
    .style('pointer-events', 'none');

  node.on('mouseover', function(event, d) {
    panel
      .html(`<strong style="color: ${colors[d.group]}">${d.label.replace(/\n/g, ' ')}</strong><br><span style="color: #6b6358">${d.desc}</span>`)
      .style('opacity', 1);

    const connected = new Set();
    graphData.links.forEach(l => {
      const sid = typeof l.source === 'object' ? l.source.id : l.source;
      const tid = typeof l.target === 'object' ? l.target.id : l.target;
      if (sid === d.id) connected.add(tid);
      if (tid === d.id) connected.add(sid);
    });
    connected.add(d.id);

    node.select('circle')
      .attr('fill-opacity', n => connected.has(n.id) ? 0.25 : 0.04)
      .attr('stroke-opacity', n => connected.has(n.id) ? 1 : 0.15);
    node.selectAll('text')
      .attr('opacity', n => connected.has(n.id) ? 1 : 0.15);
    link
      .attr('stroke-opacity', l => {
        const sid = typeof l.source === 'object' ? l.source.id : l.source;
        const tid = typeof l.target === 'object' ? l.target.id : l.target;
        return (sid === d.id || tid === d.id) ? 0.8 : 0.05;
      });
  })
  .on('mouseout', function() {
    panel.style('opacity', 0);
    node.select('circle').attr('fill-opacity', 0.12).attr('stroke-opacity', 1);
    node.selectAll('text').attr('opacity', 1);
    link.attr('stroke-opacity', l => l.cross ? 0.4 : 0.6);
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
