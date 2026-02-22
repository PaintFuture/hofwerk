// UN Sustainable Development Goals relevance visualization
// Shows which SDGs the project addresses and how

(function() {
  const container = document.getElementById('sdg-wheel');
  if (!container) return;

  const width = container.clientWidth;
  const height = 520;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 60;

  // SDGs with relevance to the project (0 = not relevant, 1-3 = relevance level)
  const sdgs = [
    { num: 1, name: 'No Poverty', color: '#E5243B', relevance: 2, note: 'Basic income as foundation' },
    { num: 2, name: 'Zero Hunger', color: '#DDA63A', relevance: 2, note: 'Organic farming, local food production' },
    { num: 3, name: 'Good Health', color: '#4C9F38', relevance: 2, note: 'Work-life balance, deceleration, nature' },
    { num: 4, name: 'Quality Education', color: '#C5192D', relevance: 3, note: 'Self-directed learning, experiential education' },
    { num: 5, name: 'Gender Equality', color: '#FF3A21', relevance: 1, note: 'Inclusive community design' },
    { num: 6, name: 'Clean Water', color: '#26BDE2', relevance: 1, note: 'Rainwater collection, well management' },
    { num: 7, name: 'Clean Energy', color: '#FCC30B', relevance: 2, note: 'Heat pump, solar, wind turbine planned' },
    { num: 8, name: 'Decent Work', color: '#A21942', relevance: 3, note: 'Meaningful labor, craftsmanship, UBI' },
    { num: 9, name: 'Industry & Innovation', color: '#FD6925', relevance: 1, note: 'Smart tech meets traditional craft' },
    { num: 10, name: 'Reduced Inequalities', color: '#DD1367', relevance: 2, note: 'Inclusion, intergenerational living' },
    { num: 11, name: 'Sustainable Cities', color: '#FD9D24', relevance: 3, note: 'Rural revitalization, community building' },
    { num: 12, name: 'Responsible Consumption', color: '#BF8B2E', relevance: 2, note: 'Commons, recycling, local economy' },
    { num: 13, name: 'Climate Action', color: '#3F7E44', relevance: 2, note: 'Ecological building, reduced mobility' },
    { num: 14, name: 'Life Below Water', color: '#0A97D9', relevance: 0, note: '' },
    { num: 15, name: 'Life on Land', color: '#56C02B', relevance: 2, note: 'Biodiversity, fallow pastures, Benjes hedge' },
    { num: 16, name: 'Peace & Justice', color: '#00689D', relevance: 2, note: 'Democratic oversight, civil society' },
    { num: 17, name: 'Partnerships', color: '#19486A', relevance: 1, note: 'Neighborly cooperation, Polish-German exchange' },
  ];

  const svg = d3.select(container)
    .append('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;');

  const tooltip = d3.select(container)
    .append('div')
    .style('position', 'absolute')
    .style('background', '#f5f0e8')
    .style('border', '1px solid #d4cbb8')
    .style('padding', '8px 12px')
    .style('font-size', '13px')
    .style('line-height', '1.5')
    .style('max-width', '220px')
    .style('pointer-events', 'none')
    .style('opacity', 0)
    .style('font-family', '"Source Serif 4", Georgia, serif')
    .style('transition', 'opacity 0.2s');

  const angleStep = (2 * Math.PI) / sdgs.length;

  sdgs.forEach((sdg, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const innerR = radius * 0.35;
    const outerR = sdg.relevance > 0 ? innerR + (radius - innerR) * (sdg.relevance / 3) : innerR + 5;

    const arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(i * angleStep - angleStep / 2 + 0.02)
      .endAngle(i * angleStep + angleStep / 2 - 0.02);

    const g = svg.append('g')
      .attr('transform', `translate(${centerX},${centerY})`);

    g.append('path')
      .attr('d', arc)
      .attr('fill', sdg.color)
      .attr('fill-opacity', sdg.relevance > 0 ? 0.2 + sdg.relevance * 0.2 : 0.08)
      .attr('stroke', sdg.color)
      .attr('stroke-width', sdg.relevance > 0 ? 1.5 : 0.5)
      .attr('stroke-opacity', sdg.relevance > 0 ? 0.8 : 0.3)
      .style('cursor', sdg.relevance > 0 ? 'pointer' : 'default')
      .on('mouseover', function(event) {
        if (sdg.relevance === 0) return;
        d3.select(this).attr('fill-opacity', 0.6);
        tooltip
          .html(`<strong>SDG ${sdg.num}: ${sdg.name}</strong><br>${sdg.note}`)
          .style('left', (event.offsetX + 15) + 'px')
          .style('top', (event.offsetY - 10) + 'px')
          .style('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill-opacity', sdg.relevance > 0 ? 0.2 + sdg.relevance * 0.2 : 0.08);
        tooltip.style('opacity', 0);
      });

    // Number label
    const labelR = innerR - 14;
    const lx = Math.cos(angle) * labelR;
    const ly = Math.sin(angle) * labelR;

    g.append('text')
      .attr('x', lx)
      .attr('y', ly)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', '10px')
      .attr('fill', sdg.relevance > 0 ? sdg.color : '#ccc')
      .attr('font-weight', sdg.relevance >= 2 ? '600' : '400')
      .text(sdg.num);
  });

  // Center label
  svg.append('text')
    .attr('x', centerX)
    .attr('y', centerY - 8)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('fill', '#6b6358')
    .attr('font-family', '"Source Serif 4", Georgia, serif')
    .text('UN SDGs');

  svg.append('text')
    .attr('x', centerX)
    .attr('y', centerY + 10)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10px')
    .attr('fill', '#6b6358')
    .attr('font-family', '"Source Serif 4", Georgia, serif')
    .text('Relevance');

  // Legend
  const legend = svg.append('g').attr('transform', `translate(${width - 140}, ${height - 60})`);
  [1, 2, 3].forEach((level, i) => {
    legend.append('rect')
      .attr('x', 0).attr('y', i * 16)
      .attr('width', 12).attr('height', 12)
      .attr('fill', '#5a6e4a')
      .attr('fill-opacity', 0.2 + level * 0.2);
    legend.append('text')
      .attr('x', 18).attr('y', i * 16 + 10)
      .attr('font-size', '10px')
      .attr('fill', '#6b6358')
      .text(level === 1 ? 'Tangential' : level === 2 ? 'Relevant' : 'Central');
  });
})();
