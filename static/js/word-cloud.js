// Word cloud visualization for the project's key concepts
// Uses d3-cloud layout

(function() {
  const container = document.getElementById('word-cloud');
  if (!container) return;

  const width = container.clientWidth;
  const height = 400;

  const words = [
    { text: 'Transformation', size: 48 },
    { text: 'Community', size: 44 },
    { text: 'Learning', size: 40 },
    { text: 'Belonging', size: 36 },
    { text: 'Communitarianism', size: 34 },
    { text: 'Civil Society', size: 32 },
    { text: 'Sustainability', size: 32 },
    { text: 'Craftsmanship', size: 30 },
    { text: 'Basic Income', size: 28 },
    { text: 'Wanderjahre', size: 28 },
    { text: 'Commons', size: 26 },
    { text: 'Thresholds', size: 24 },
    { text: 'Farmstead', size: 24 },
    { text: 'Self-Directed', size: 24 },
    { text: 'Ecological', size: 22 },
    { text: 'Heritage', size: 22 },
    { text: 'Intergenerational', size: 20 },
    { text: 'Deceleration', size: 20 },
    { text: 'Anhalt', size: 20 },
    { text: 'Renovation', size: 18 },
    { text: 'Agriculture', size: 18 },
    { text: 'Meaningful Labor', size: 18 },
    { text: 'Social Sculpture', size: 18 },
    { text: 'Experiential', size: 16 },
    { text: 'Resonance', size: 16 },
    { text: 'Mutual Aid', size: 16 },
    { text: 'Think Tank', size: 16 },
    { text: 'Dreiseitenhof', size: 16 },
    { text: 'Polish-German', size: 14 },
    { text: 'Biodiversity', size: 14 },
    { text: 'Entrepreneurship', size: 14 },
    { text: 'Inclusion', size: 14 },
    { text: 'Contemplation', size: 12 },
    { text: 'Walnut Tree', size: 12 },
    { text: 'Literature', size: 12 },
    { text: 'Music', size: 12 },
  ];

  const colorScale = d3.scaleOrdinal()
    .range(['#5a6e4a', '#7a6e9b', '#a85454', '#b8860b', '#6b8e7b', '#8b7355', '#6b6358']);

  const layout = d3.layout.cloud()
    .size([width, height])
    .words(words.map(d => ({ text: d.text, size: d.size })))
    .padding(4)
    .rotate(() => (~~(Math.random() * 3) - 1) * 30)
    .font('"Source Serif 4", Georgia, serif')
    .fontSize(d => d.size)
    .on('end', draw);

  layout.start();

  function draw(words) {
    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;')
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    svg.selectAll('text')
      .data(words)
      .join('text')
      .style('font-size', d => d.size + 'px')
      .style('font-family', '"Source Serif 4", Georgia, serif')
      .style('fill', (d, i) => colorScale(i))
      .style('opacity', 0.85)
      .style('cursor', 'default')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text)
      .on('mouseover', function() {
        d3.select(this).style('opacity', 1).style('font-weight', '600');
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.85).style('font-weight', '400');
      });
  }
})();
