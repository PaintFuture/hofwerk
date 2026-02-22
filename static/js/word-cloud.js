// Interactive word cloud — clickable terms with descriptions
// Uses d3-cloud layout, click to reveal info panel

(function() {
  const container = document.getElementById('word-cloud');
  if (!container) return;

  const width = container.clientWidth;
  const height = 450;

  const words = [
    { text: 'Transformation', size: 50, group: 'transformation',
      desc: 'The binding philosophy — seeing oneself as part of economic, social, cultural, and ecological change. Not reform, but creating new structures alongside the old.',
      related: ['Economic', 'Social', 'Cultural', 'Ecological'] },
    { text: 'Community', size: 46, group: 'pillars',
      desc: 'Diverse, democratic, intergenerational communities. Inclusive of gender, disability, age, culture. The social fabric that modern life has dissolved.',
      related: ['Belonging', 'Intergenerational', 'Mutual Aid'] },
    { text: 'Learning', size: 42, group: 'pillars',
      desc: 'Self-directed, community-oriented learning as alternative to institutional schooling. Compulsory schooling transformed into self-designed compulsory education.',
      related: ['Wanderjahre', 'Experiential', 'Self-Directed'] },
    { text: 'Belonging', size: 38, group: 'philosophy',
      desc: 'John O\'Donohue: belonging as social and emotional connectedness. The appreciation of the inner richness each person brings. Anam Cara — the soul friend.',
      related: ['Community', 'Thresholds', 'Resonance'] },
    { text: 'Communitarianism', size: 36, group: 'philosophy',
      desc: 'Taylor, Sandel, Walzer, MacIntyre. Social embedding without collectivist coercion. Preserving individual freedom while emphasizing the importance of community.',
      related: ['Community', 'Civil Society', 'Belonging'] },
    { text: 'Civil Society', size: 34, group: 'pillars',
      desc: 'Citizens taking social, economic, and educational responsibility — not waiting for the state. The post-institutional era. "We are doing it from our own resources."',
      related: ['Communitarianism', 'Entrepreneurship', 'Basic Income'] },
    { text: 'Sustainability', size: 34, group: 'farm',
      desc: 'Not ideology but practice. Ecological building materials, heat pump over fireplace, fallow pastures for biodiversity. Orientation toward the UN 2030 Agenda.',
      related: ['Ecological', 'Agriculture', 'Biodiversity'] },
    { text: 'Craftsmanship', size: 32, group: 'farm',
      desc: 'Sennett: the desire to do a job well for its own sake. Manual skill as a form of thinking. The workshop with its anvil and workbench.',
      related: ['Meaningful Labor', 'Social Sculpture', 'Making'] },
    { text: 'Basic Income', size: 30, group: 'pillars',
      desc: 'Not redistribution from middle to bottom — incentive for entrepreneurial activity and social responsibility. Dismantles welfare bureaucracy. Frees resources for projects.',
      related: ['Civil Society', 'Entrepreneurship', 'Meaningful Labor'] },
    { text: 'Wanderjahre', size: 30, group: 'pillars',
      desc: 'Self-determined years of journeying between projects — farm to mill to urban workshop. Reimagined apprenticeship. Documented in the De Gruyter volume as "Wanderjahre als Zeit des Lernens."',
      related: ['Learning', 'Experiential', 'Entrepreneurship'] },
    { text: 'Commons', size: 28, group: 'pillars',
      desc: 'Shared resources, jointly managed. From medieval pastures to modern commons projects. Tension with GDR socialism memory — must be addressed openly.',
      related: ['Economic', 'Entrepreneurship', 'Mutual Aid'] },
    { text: 'Thresholds', size: 26, group: 'philosophy',
      desc: 'O\'Donohue: consciously entering and exiting from something. Biographical and spiritual transitions. The barn door that creates an almost magical atmosphere depending on the sunlight.',
      related: ['Belonging', 'Transformation'] },
    { text: 'Farmstead', size: 26, group: 'farm',
      desc: 'Three-sided farmstead (Dreiseitenhof) from 1884. Wilhelmine origins, GDR additions. Acquired November 2020. One hour southwest of Berlin.',
      related: ['Heritage', 'Renovation', 'Anhalt'] },
    { text: 'Self-Directed', size: 26, group: 'pillars',
      desc: 'Compulsory school attendance transformed into self-designed mandatory education. Grades and certificates replaced by university entrance examinations.',
      related: ['Learning', 'Wanderjahre', 'Experiential'] },
    { text: 'Ecological', size: 24, group: 'transformation',
      desc: 'Ecological building materials, organic farming, reduced mobility, biodiversity, climate-positive living. The decision for a heat pump — ecological honesty over sentiment.',
      related: ['Sustainability', 'Agriculture', 'Biodiversity'] },
    { text: 'Heritage', size: 24, group: 'farm',
      desc: 'Preserving Wilhelmine and GDR-era cultural heritage. 1884 coffered doors, historical windows found behind beams. Timber-frame techniques alongside modern insulation.',
      related: ['Farmstead', 'Cultural', 'Renovation'] },
    { text: 'Intergenerational', size: 22, group: 'pillars',
      desc: 'Elders, adults, youth living together. More adult caregivers per child. Male role models present. Reduces expensive care facilities through community integration.',
      related: ['Community', 'Learning', 'Social'] },
    { text: 'Deceleration', size: 22, group: 'pillars',
      desc: 'Reduced mobility, more time for each other, healthier pace. Action and contemplation in balance. Watching the clouds from the wooden deck.',
      related: ['Meaningful Labor', 'Sustainability', 'Resonance'] },
    { text: 'Anhalt', size: 22, group: 'farm',
      desc: 'Region in Saxony-Anhalt, Eastern Germany. Shaped by Wilhelmine ambition and GDR collectivism. Small villages, abandoned estates, open fields. Near Dessau and the Bauhaus.',
      related: ['Farmstead', 'Rural Revival', 'Heritage'] },
    { text: 'Renovation', size: 20, group: 'farm',
      desc: 'Ongoing since November 2020. Roofing, guttering, stable reconstruction, debris removal. Heritage preservation alongside ecological modernization.',
      related: ['Heritage', 'Craftsmanship', 'Sustainability'] },
    { text: 'Agriculture', size: 20, group: 'farm',
      desc: 'Cherry, plum, apple, pear, peach trees. Ecological jam, juice, fruit cake. Surplus shared with neighbors. Horticultural experiments.',
      related: ['Sustainability', 'Ecological', 'Farmstead'] },
    { text: 'Meaningful Labor', size: 20, group: 'pillars',
      desc: 'Roofers and philosophers, carpenters and educators working side by side. Manual and intellectual work equally valued. Craftsmanship rediscovered.',
      related: ['Craftsmanship', 'Basic Income', 'Deceleration'] },
    { text: 'Social Sculpture', size: 20, group: 'philosophy',
      desc: 'Joseph Beuys: society itself as an artwork shaped by everyone. Soziale Plastik. The farm as a collective creative act — not just renovation, but social creation.',
      related: ['Craftsmanship', 'Cultural', 'Community'] },
    { text: 'Experiential', size: 18, group: 'pillars',
      desc: 'Dewey, Hahn, Weikart. Learning by doing — action-oriented, nature-embedded. The HighScope Summer Camp in Michigan as direct precedent.',
      related: ['Learning', 'Wanderjahre', 'Self-Directed'] },
    { text: 'Resonance', size: 18, group: 'philosophy',
      desc: 'Hartmut Rosa: resonance as the opposite of alienation. Meaningful connection with the world — through work, nature, relationships. Not acceleration, but attunement.',
      related: ['Belonging', 'Deceleration', 'Alienation'] },
    { text: 'Mutual Aid', size: 18, group: 'pillars',
      desc: 'Neighborly structures: tractor help for field access, firewood for services, fresh vegetables in season. Old patterns renewed. Not charity — reciprocity.',
      related: ['Community', 'Commons', 'Farmstead'] },
    { text: 'Think Tank', size: 18, group: 'farm',
      desc: 'The barn as seminar space. Informal discussions about biographies, generations, communities of the future. University classes streamed during Covid.',
      related: ['Learning', 'Community', 'Farmstead'] },
    { text: 'Dreiseitenhof', size: 18, group: 'farm',
      desc: 'Three-sided farmstead — the traditional building form. Farmhouse, barn, and stable arranged around a central courtyard. A spatial metaphor for the project itself.',
      related: ['Farmstead', 'Heritage', 'Anhalt'] },
    { text: 'Polish-German', size: 16, group: 'farm',
      desc: 'Rooted in Jaczewski\'s educational exchange legacy. Polish literature central: Tokarczuk, Huelle, Gombrowicz, Reymont. Language learning. Krakow connections.',
      related: ['Cultural', 'Heritage', 'Learning'] },
    { text: 'Biodiversity', size: 16, group: 'farm',
      desc: 'Fallow pastures supporting insects, birds, small creatures. Benjes hedges as wildlife habitat. The walnut tree as long-term ecological care.',
      related: ['Ecological', 'Sustainability', 'Agriculture'] },
    { text: 'Entrepreneurship', size: 16, group: 'pillars',
      desc: 'Community-based enterprise in structurally weak areas. Abandoned properties turned into living projects. Start-ups founded on basic income stability.',
      related: ['Commons', 'Rural Revival', 'Civil Society'] },
    { text: 'Rural Revival', size: 16, group: 'pillars',
      desc: 'Thousands of abandoned farms, train stations, chateaux across East Germany. Each one an opportunity for a new community project.',
      related: ['Entrepreneurship', 'Anhalt', 'Farmstead'] },
    { text: 'Contemplation', size: 14, group: 'pillars',
      desc: 'Space for reflection alongside action. Reading on the wooden deck. Watching clouds. The balance between doing and being.',
      related: ['Deceleration', 'Resonance', 'Meaningful Labor'] },
    { text: 'Walnut Tree', size: 14, group: 'farm',
      desc: 'Planted by Philipp. Gnawed to a stub by a hare. Nursed back with balsam and a protective cage. A meditative, long-term act of care — documented across a dozen photographs.',
      related: ['Biodiversity', 'Agriculture', 'Deceleration'] },
    { text: 'Literature', size: 14, group: 'farm',
      desc: 'Polish novels read aloud in the evenings. Tokarczuk opens perspectives. Huelle tells of postwar Gdańsk. Gombrowicz of migration. Reymont of peasant life.',
      related: ['Polish-German', 'Cultural', 'Think Tank'] },
    { text: 'Music', size: 14, group: 'farm',
      desc: 'From Chopin to heroic film scores. Ludwik — the character prototype — is a gifted pianist. Music as cultural foundation and emotional sustenance.',
      related: ['Cultural', 'Literature', 'Community'] },
    { text: 'Making', size: 14, group: 'farm',
      desc: 'Furniture restoration, jam labels, design objects. The line between craft and art deliberately blurred. Making as meaning.',
      related: ['Craftsmanship', 'Social Sculpture', 'Agriculture'] },
  ];

  const colorScale = {
    transformation: '#b8860b',
    pillars: '#5a6e4a',
    philosophy: '#7a6e9b',
    farm: '#6b8e7b',
    diagnosis: '#a85454'
  };

  // Info panel
  const panel = d3.select(container)
    .append('div')
    .attr('id', 'wc-panel')
    .style('background', '#faf7f0')
    .style('border', '1px solid #d4cbb8')
    .style('padding', '16px 20px')
    .style('margin-top', '1rem')
    .style('font-size', '14px')
    .style('line-height', '1.7')
    .style('font-family', '"Source Serif 4", Georgia, serif')
    .style('display', 'none');

  const layout = d3.layout.cloud()
    .size([width, height])
    .words(words.map(d => ({ ...d })))
    .padding(5)
    .rotate(() => (~~(Math.random() * 3) - 1) * 25)
    .font('"Source Serif 4", Georgia, serif')
    .fontSize(d => d.size)
    .on('end', draw);

  layout.start();

  function draw(placedWords) {
    const svg = d3.select(container)
      .insert('svg', '#wc-panel')
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; cursor: pointer;')
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    let selected = null;

    svg.selectAll('text')
      .data(placedWords)
      .join('text')
      .style('font-size', d => d.size + 'px')
      .style('font-family', '"Source Serif 4", Georgia, serif')
      .style('fill', d => colorScale[d.group] || '#6b6358')
      .style('opacity', 0.8)
      .style('cursor', 'pointer')
      .style('transition', 'opacity 0.2s, font-weight 0.2s')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text)
      .on('mouseover', function(event, d) {
        if (selected && selected !== d.text) return;
        d3.select(this).style('opacity', 1).style('font-weight', '600');
      })
      .on('mouseout', function(event, d) {
        if (selected === d.text) return;
        d3.select(this).style('opacity', 0.8).style('font-weight', '400');
      })
      .on('click', function(event, d) {
        const allText = svg.selectAll('text');

        if (selected === d.text) {
          // Deselect
          selected = null;
          allText.style('opacity', 0.8).style('font-weight', '400');
          panel.style('display', 'none');
          return;
        }

        selected = d.text;

        // Highlight selected and related
        const relatedSet = new Set(d.related || []);
        relatedSet.add(d.text);

        allText
          .style('opacity', w => relatedSet.has(w.text) ? 1 : 0.15)
          .style('font-weight', w => w.text === d.text ? '600' : relatedSet.has(w.text) ? '400' : '300');

        // Show panel
        const relatedLinks = (d.related || []).map(r => `<span style="color: ${colorScale[d.group]}; cursor: pointer;" class="wc-related">${r}</span>`).join(' · ');
        panel
          .style('display', 'block')
          .html(`<strong style="font-size: 1.1em;">${d.text}</strong><br><br>${d.desc}${relatedLinks ? '<br><br><span style="font-size: 0.85em; color: #6b6358;">Related: ' + relatedLinks + '</span>' : ''}`);

        // Make related terms clickable
        panel.selectAll('.wc-related').on('click', function() {
          const relatedText = this.textContent;
          const relatedWord = placedWords.find(w => w.text === relatedText);
          if (relatedWord) {
            const relatedEl = allText.filter(w => w.text === relatedText);
            relatedEl.dispatch('click');
          }
        });
      });
  }
})();
