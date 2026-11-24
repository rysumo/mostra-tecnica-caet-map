// Mostra Técnica CAET — Mapa Interativo do Evento
(function () {
  'use strict';

  // --- 1. EMBEDDED MAP DATA (Single Source of Truth mirrored from data/locations.json) ---
  const MAP_DATA = {
    "center": [-24.787750, -53.726500],
    "defaultZoom": 17,
    "locations": [
      {
        "id": "loc-1",
        "name": "Ovinocultura",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78798980937658,
        "lng": -53.72641289231206,
        "elevation": 511.0,
        "description": "Setor de criação e manejo de ovinos, reprodução, melhoramento genético e sanidade do rebanho."
      },
      {
        "id": "loc-2",
        "name": "Setor Drone",
        "category": "Infraestrutura & Máquinas",
        "badge": "INFRAESTRUTURA",
        "icon": "cog",
        "color": "#2563eb",
        "lat": -24.78878852142427,
        "lng": -53.72500748890486,
        "elevation": 511.7,
        "description": "Demonstração técnica de drones agrícolas para pulverização de precisão, mapeamento multiespectral e telemetria."
      },
      {
        "id": "loc-3",
        "name": "Maquinário Agrícola",
        "category": "Infraestrutura & Máquinas",
        "badge": "INFRAESTRUTURA",
        "icon": "cog",
        "color": "#2563eb",
        "lat": -24.78932814055537,
        "lng": -53.72540943752063,
        "elevation": 514.5,
        "description": "Exposição de tratores didáticos, plantadeiras, implementos de solo e dinâmicas de calibração de máquinas."
      },
      {
        "id": "loc-4",
        "name": "Bovinocultura de leite",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78710399343263,
        "lng": -53.72677592982301,
        "elevation": 503.5,
        "description": "Sala de ordenha mecânica canalizada, resfriador a granel, manejo nutricional e rigorosa trava de carência sanitária."
      },
      {
        "id": "loc-5",
        "name": "Inseminação Artificial",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78699075185239,
        "lng": -53.72690893295326,
        "elevation": 504.0,
        "description": "Laboratório de biotecnologia reprodutiva animal, botijões de nitrogênio, descongelamento de sêmen e protocolo IATF."
      },
      {
        "id": "loc-6",
        "name": "Agroindústria Animal",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.7870755938292,
        "lng": -53.72700124010368,
        "elevation": 504.2,
        "description": "Processamento e agregação de valor: queijos, iogurtes, doce de leite, embutidos e boas práticas higiênico-sanitárias."
      },
      {
        "id": "loc-7",
        "name": "Setor Café",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78742340222299,
        "lng": -53.72545199696982,
        "elevation": 505.7,
        "description": "Cultivo de cafeeiros, arquitetura de plantas, manejo de poda, colheita seletiva e métodos de secagem em terreiro suspenso."
      },
      {
        "id": "loc-8",
        "name": "Setor Tecnologias de Irrigação",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78762432832632,
        "lng": -53.72596913804244,
        "elevation": 506.7,
        "description": "Sistemas de gotejamento por pressão positiva, microaspersão para hortaliças e automação de fertirrigação."
      },
      {
        "id": "loc-9",
        "name": "Morango Semi-hidropônico",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78757488530688,
        "lng": -53.72587069724506,
        "elevation": 506.6,
        "description": "Produção em bancadas suspensas com slabs e casca de arroz carbonizada, livre de contato com o solo e com alta doçura."
      },
      {
        "id": "loc-10",
        "name": "Agrostológico e Alimentação Animal",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78690934918984,
        "lng": -53.72771790045543,
        "elevation": 503.5,
        "description": "Bancos forrageiros orgânicos, capim elefante, leguminosas e integração agroecológica para nutrição sustentável."
      },
      {
        "id": "loc-11",
        "name": "Setor Soja",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78712456305666,
        "lng": -53.72871552343855,
        "elevation": 502.1,
        "description": "Parcelas de avaliação de cultivares comerciais de soja, plantio direto, inoculação biológica e manejo integrado de pragas."
      },
      {
        "id": "loc-12",
        "name": "Setor Milho",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78700062615964,
        "lng": -53.72851322651821,
        "elevation": 500.1,
        "description": "Cultivo de híbridos de milho para silagem da bovinocultura de leite e produção de grãos para a fábrica de ração do CAET."
      },
      {
        "id": "loc-13",
        "name": "Setor Trigo",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78696693431159,
        "lng": -53.72816218971664,
        "elevation": 501.5,
        "description": "Cultura de inverno essencial no sistema de rotação com cobertura de solo e sustentabilidade do plantio direto."
      },
      {
        "id": "loc-14",
        "name": "Setor Algodão",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78737967473064,
        "lng": -53.72623571830974,
        "elevation": 505.9,
        "description": "Parcelas demonstrativas do algodoeiro, estágios fenológicos, controle do bicudo e amostragem de rendimento de pluma."
      },
      {
        "id": "loc-15",
        "name": "Setor Erva-mate",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78818994136726,
        "lng": -53.72682797694148,
        "elevation": 512.7,
        "description": "Sistema agroflorestal de erva-mate nativa, podas de conformação e resgate da tradição ervateira paranaense."
      },
      {
        "id": "loc-16",
        "name": "Suinocultura",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78799960953331,
        "lng": -53.72864671708163,
        "elevation": 506.9,
        "description": "Galpões de matrizes, maternidade com escamoteadores, creche, terminação e manejo técnico de dejetos."
      },
      {
        "id": "loc-17",
        "name": "Setor Biodigestor",
        "category": "Infraestrutura & Máquinas",
        "badge": "INFRAESTRUTURA",
        "icon": "cog",
        "color": "#2563eb",
        "lat": -24.78754122376148,
        "lng": -53.72896259977192,
        "elevation": 508.2,
        "description": "Reator anaeróbio que converte dejetos da suinocultura em biogás energético e biofertilizante líquido para as lavouras."
      },
      {
        "id": "loc-18",
        "name": "Setor Piscicultura",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78713309855705,
        "lng": -53.72608662514739,
        "elevation": 503.4,
        "description": "Viveiros escavados de tilápias, controle de oxigênio dissolvido, biometrias e arraçoamento balanceado."
      },
      {
        "id": "loc-19",
        "name": "Galinha de postura",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78765591381664,
        "lng": -53.72584049891429,
        "elevation": 507.8,
        "description": "Galpão de postura comercial, coleta de ovos, manejo nutricional por fase e controle diário de produtividade."
      },
      {
        "id": "loc-20",
        "name": "Horta Mandala",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78711353197451,
        "lng": -53.7255478827626,
        "elevation": 503.0,
        "description": "Sistema agroecológico circular inspirado na permacultura, otimizando irrigação, consórcio de espécies e ciclagem de nutrientes."
      },
      {
        "id": "loc-21",
        "name": "Gado Purunã",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78784696633938,
        "lng": -53.72801369054265,
        "elevation": 505.7,
        "description": "Raça bovina paranaense (IAPAR): rusticidade e marmoreio através do cruzamento Charolês, Angus, Caracu e Canchim."
      },
      {
        "id": "loc-22",
        "name": "Meliponicultura",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78787610123514,
        "lng": -53.72559350004751,
        "elevation": 504.8,
        "description": "Meliponário didático com abelhas nativas sem ferrão (Jataí, Mandaçaia, Mirim) fundamentais para a polinização da fazenda."
      },
      {
        "id": "loc-23",
        "name": "Frango de corte",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78767199983093,
        "lng": -53.72573957945043,
        "elevation": 507.6,
        "description": "Aviário didático de engorda, ventilação em pressão negativa, nebulização, pesagens e ganho de peso diário."
      },
      {
        "id": "loc-24",
        "name": "Inscrição & Recepção",
        "category": "Serviços",
        "badge": "SERVIÇOS",
        "icon": "info",
        "color": "#0891b2",
        "lat": -24.78976355970232,
        "lng": -53.72492954280644,
        "elevation": 512.6,
        "description": "Portaria principal de recepção, credenciamento de caravanas, entrega de crachás e mapas informativos."
      },
      {
        "id": "loc-25",
        "name": "Ponto de Água 1",
        "category": "Serviços",
        "badge": "SERVIÇOS",
        "icon": "droplet",
        "color": "#0891b2",
        "lat": -24.78974826267669,
        "lng": -53.72498593754265,
        "elevation": 512.8,
        "description": "Estação de hidratação e bebedouros de água filtrada e gelada para visitantes na entrada principal."
      },
      {
        "id": "loc-26",
        "name": "Água",
        "category": "Serviços",
        "badge": "SERVIÇOS",
        "icon": "droplet",
        "color": "#0891b2",
        "lat": -24.78820125258162,
        "lng": -53.72673481923785,
        "elevation": 512.9,
        "description": "Ponto central de água potável no entroncamento principal das Unidades Didático-Produtivas."
      },
      {
        "id": "loc-27",
        "name": "Estacionamento Visitantes",
        "category": "Estacionamento",
        "badge": "ESTACIONAMENTO",
        "icon": "parking",
        "color": "#7c3aed",
        "lat": -24.78905296927759,
        "lng": -53.72469770408365,
        "elevation": 511.6,
        "description": "Vagas reservadas para veículos leves, vans e ônibus de colégios da região oeste do Paraná."
      },
      {
        "id": "loc-28",
        "name": "Cunicultura",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "cow",
        "color": "#b45309",
        "lat": -24.78766459877772,
        "lng": -53.72593710969055,
        "elevation": 507.4,
        "description": "Criação didática de coelhos das raças Nova Zelândia e Califórnia, manejo de ninhos e conversão alimentar."
      },
      {
        "id": "loc-29",
        "name": "Horta Medicinal",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78739842282352,
        "lng": -53.72517359131065,
        "elevation": 505.2,
        "description": "Cultivo didático de plantas bioativas e fitoterápicas, identificação botânica, princípios ativos e secagem."
      },
      {
        "id": "loc-30",
        "name": "Horta SPDH",
        "category": "Agricultura",
        "badge": "AGRICULTURA",
        "icon": "sprout",
        "color": "#16a34a",
        "lat": -24.78721928399838,
        "lng": -53.72506099846109,
        "elevation": 503.8,
        "description": "Sistema de Plantio Direto de Hortaliças com cobertura permanente do solo, redução de revolvimento e equilíbrio biológico."
      },
      {
        "id": "loc-31",
        "name": "PUCPR",
        "category": "Parceiros",
        "badge": "PARCEIROS",
        "icon": "university",
        "color": "#881337",
        "lat": -24.78733055794036,
        "lng": -53.7250257187744,
        "elevation": 504.6,
        "description": "Estande institucional da Pontifícia Universidade Católica do Paraná (Campus Toledo) com mostra de cursos e parcerias acadêmicas."
      }
    ],
    "polygons": [
      {
        "name": "Área do Estacionamento",
        "category": "Estacionamento",
        "color": "#7c3aed",
        "coordinates": [
          [-24.78871070398583, -53.72484546814176],
          [-24.78963061669574, -53.72474013603524],
          [-24.78943810055625, -53.72463343855619],
          [-24.78932557387809, -53.72461264842496],
          [-24.78871657317404, -53.72463555711046],
          [-24.78871070398583, -53.72484546814176]
        ]
      }
    ]
  };

  // --- 2. UNIFIED VECTOR SVG ICONS (No Unicode Emoji Icons) ---
  function getGlyphPaths(iconType, color) {
    if (iconType === 'all') {
      return `
        <circle cx="12" cy="12" r="9" fill="none" stroke="${color}" stroke-width="2"/>
        <circle cx="12" cy="12" r="5" fill="none" stroke="${color}" stroke-width="2"/>
        <circle cx="12" cy="12" r="2" fill="${color}"/>
      `;
    }
    if (iconType === 'sprout') {
      return `
        <path d="M12 10a6 6 0 0 0-6-6H3v2a6 6 0 0 0 6 6h3V10z" fill="${color}"/>
        <path d="M12 14a6 6 0 0 1 6-6h3v2a6 6 0 0 1-6 6h-3v-2z" fill="${color}"/>
        <path d="M12 21V8" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      `;
    }
    if (iconType === 'cow') {
      return `
        <path d="M4 7c0-2 1.5-3 3-3s2 1.5 2 3M20 7c0-2-1.5-3-3-3s-2 1.5-2 3" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <path d="M5 8h14a2 2 0 0 1 2 2v4a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-4a2 2 0 0 1 2-2z" fill="${color}"/>
        <circle cx="8.5" cy="11.5" r="1.5" fill="#ffffff"/>
        <circle cx="15.5" cy="11.5" r="1.5" fill="#ffffff"/>
        <path d="M9 16c1.5 1 4.5 1 6 0" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
      `;
    }
    if (iconType === 'cog') {
      return `
        <circle cx="12" cy="12" r="3" fill="${color}"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="${color}" stroke-width="2" fill="none"/>
      `;
    }
    if (iconType === 'droplet') {
      return `
        <path d="M12 2.7C9.3 6.1 5 12 5 15.5A7 7 0 0 0 12 22.5a7 7 0 0 0 7-7c0-3.5-4.3-9.4-7-12.8z" fill="${color}"/>
        <path d="M14.5 13.5a3 3 0 0 1-3 3" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
      `;
    }
    if (iconType === 'parking') {
      return `
        <rect x="3" y="3" width="18" height="18" rx="4" fill="${color}"/>
        <path d="M9 16V8h4.5a3 3 0 0 1 0 6H9" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    }
    if (iconType === 'university') {
      return `
        <path d="M12 4L2 9l10 5 10-5-10-5z" fill="${color}"/>
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 10v5" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      `;
    }
    return `
      <circle cx="12" cy="12" r="9.5" fill="${color}"/>
      <circle cx="12" cy="8" r="1.25" fill="#ffffff"/>
      <path d="M12 11v5m-1.5 0h3" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    `;
  }

  function renderInlineSvg(iconType, color = 'currentColor') {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${getGlyphPaths(iconType, color)}</svg>`;
  }

  function getCategoryIconType(cat) {
    if (cat === 'Agricultura') return 'sprout';
    if (cat === 'Produção Animal') return 'cow';
    if (cat === 'Infraestrutura & Máquinas') return 'cog';
    if (cat === 'Estacionamento') return 'parking';
    if (cat === 'Parceiros') return 'university';
    if (cat === 'all') return 'all';
    return 'info';
  }

  function getPinHtml(loc, isVisited) {
    const iconInner = getGlyphPaths(loc.icon, loc.color);
    const visitedBadge = isVisited
      ? `<circle cx="32" cy="8" r="7" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
         <path d="M29 8l2 2 4-4" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
      : '';

    return `
      <div class="pin-inner">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="54" viewBox="0 0 40 54" style="filter: drop-shadow(0 6px 10px rgba(0,0,0,0.38));">
          <path d="M20 0C9 0 0 9 0 20c0 15.5 17.5 32 18.8 33.2a1.8 1.8 0 0 0 2.4 0C22.5 52 40 35.5 40 20 40 9 31 0 20 0z" fill="${loc.color}"/>
          <circle cx="20" cy="20" r="15" fill="#ffffff"/>
          <circle cx="20" cy="20" r="13.5" fill="none" stroke="${loc.color}25" stroke-width="1"/>
          <g transform="translate(8, 8)">${iconInner}</g>
          ${visitedBadge}
        </svg>
        <span class="pin-label">${escapeHtml(loc.name)}</span>
      </div>
    `;
  }

  // --- 3. NORMALIZATION & HIGHLIGHTING (Accent-insensitive search) ---
  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightMatch(text, rawQuery) {
    const normQuery = normalizeText(rawQuery).trim();
    if (!normQuery) return escapeHtml(text);

    // Map each character index in normalized string back to original string index
    let normStr = '';
    const normToOrig = [];
    for (let i = 0; i < text.length; i++) {
      const stripped = text[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      for (let k = 0; k < stripped.length; k++) {
        normStr += stripped[k];
        normToOrig.push(i);
      }
    }

    const idx = normStr.indexOf(normQuery);
    if (idx === -1) return escapeHtml(text);

    const origStart = normToOrig[idx];
    const origEnd = normToOrig[idx + normQuery.length - 1] + 1;

    return (
      escapeHtml(text.slice(0, origStart)) +
      `<mark class="search-highlight">${escapeHtml(text.slice(origStart, origEnd))}</mark>` +
      escapeHtml(text.slice(origEnd))
    );
  }

  // --- 4. VISITED CHECKLIST STORAGE ---
  const VISITED_KEY = 'caet-map-visited-v1';

  function loadVisitedSet() {
    try {
      const raw = localStorage.getItem(VISITED_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_err) {
      return new Set();
    }
  }

  function saveVisitedSet(set) {
    try {
      localStorage.setItem(VISITED_KEY, JSON.stringify(Array.from(set)));
    } catch (_err) {
      // Ignore quota / private mode restrictions
    }
  }

  // --- 5. GEOMETRY & DISTANCE ---
  function getDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const dPhi = (lat2 - lat1) * Math.PI / 180;
    const dLam = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(dLam / 2) * Math.sin(dLam / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  function formatDistance(meters) {
    if (!meters && meters !== 0) return '';
    const mins = Math.max(1, Math.round(meters / 75));
    const dist = meters < 1000 ? `${meters} m` : `${(meters / 1000).toFixed(1)} km`;
    return `${dist} · ~${mins} min a pé`;
  }

  // --- 6. STATE & LAYERS ---
  let map;
  let clusterGroup;
  let polygonLayer = L.layerGroup();
  let guideLine = null;
  let userLocationMarker = null;
  let userAccuracyCircle = null;
  let userCoords = null;
  let activeCategory = 'all';
  let catalogFilter = 'all'; // 'all' | 'pending' | 'visited'
  let selectedLocationId = null;
  let markersMap = new Map();
  let visitedIds = loadVisitedSet();
  let watchId = null;
  let currentLayerKey = 'googleHybrid';
  let googleErrorCount = 0;

  const tileLayers = {
    googleHybrid: L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 21,
      attribution: 'Leaflet | © Google Maps'
    }),
    esriImagery: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Leaflet | © Esri World Imagery'
    }),
    googleRoads: L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 21,
      attribution: 'Leaflet | © Google Maps'
    })
  };

  const layerLabels = {
    googleHybrid: 'Satélite (Google Hybrid)',
    esriImagery: 'Satélite Alternativo (Esri)',
    googleRoads: 'Mapa de Ruas'
  };

  // Automatic Fallback from Google Hybrid -> Esri World Imagery on rate-limit/errors
  tileLayers.googleHybrid.on('tileerror', () => {
    if (!navigator.onLine || currentLayerKey !== 'googleHybrid') return;
    googleErrorCount++;
    if (googleErrorCount >= 4) {
      switchBaseLayer('esriImagery');
      showToast('Satélite alternativo (Esri) ativado automaticamente.', true);
    }
  });

  function switchBaseLayer(nextKey) {
    if (currentLayerKey === nextKey) return;
    if (map.hasLayer(tileLayers[currentLayerKey])) {
      map.removeLayer(tileLayers[currentLayerKey]);
    }
    currentLayerKey = nextKey;
    map.addLayer(tileLayers[currentLayerKey]);
  }

  // --- 7. DOM REFS ---
  const mapEl = document.getElementById('map');
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const searchResults = document.getElementById('search-results');
  const sectorCard = document.getElementById('sector-card');
  const quickCatalogWrap = document.getElementById('quick-catalog-wrap');
  const quickCatalogLabel = document.getElementById('btn-quick-catalog-label');
  const catalogDialog = document.getElementById('catalog-dialog');
  const catalogSearch = document.getElementById('catalog-search-input');
  const catalogList = document.getElementById('catalog-list');
  const progressText = document.getElementById('catalog-progress-text');
  const progressFill = document.getElementById('catalog-progress-fill');
  const offlineStatusPill = document.getElementById('offline-cache-status');
  const gpsActiveBadge = document.getElementById('gps-active-badge');
  const btnLocate = document.getElementById('btn-locate-me');

  // --- 8. INITIALIZATION ---
  function hydratePillIcons() {
    document.querySelectorAll('.cat-pill').forEach((pill) => {
      const iconSlot = pill.querySelector('.pill-icon');
      const cat = pill.dataset.cat;
      if (iconSlot) {
        iconSlot.innerHTML = renderInlineSvg(getCategoryIconType(cat), pill.dataset.color || 'currentColor');
      }
    });
  }

  function syncCounts() {
    const counts = MAP_DATA.locations.reduce((acc, loc) => {
      acc[loc.category] = (acc[loc.category] || 0) + 1;
      return acc;
    }, {});
    const total = MAP_DATA.locations.length;

    document.querySelectorAll('.cat-pill').forEach((pill) => {
      const cat = pill.dataset.cat;
      const badge = pill.querySelector('.pill-count');
      if (badge) {
        badge.textContent = cat === 'all' ? total : (counts[cat] || 0);
      }
    });

    if (quickCatalogLabel) {
      quickCatalogLabel.textContent = `Setores (${total})`;
    }
    updateVisitedProgressUI();
  }

  function initMap() {
    hydratePillIcons();
    syncCounts();

    map = L.map('map', {
      center: MAP_DATA.center,
      zoom: MAP_DATA.defaultZoom,
      zoomControl: false,
      layers: [tileLayers.googleHybrid]
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    polygonLayer.addTo(map);

    clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 34,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      spiderfyDistanceMultiplier: 1.45,
      disableClusteringAtZoom: 19,
      iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `<div class="caet-cluster">${count}</div>`,
          className: 'caet-cluster-wrap',
          iconSize: L.point(42, 42),
          iconAnchor: [21, 21]
        });
      }
    });
    map.addLayer(clusterGroup);

    map.on('zoomend', () => {
      if (map.getZoom() >= 19) {
        mapEl.classList.add('map-show-labels');
      } else {
        mapEl.classList.remove('map-show-labels');
      }
    });

    map.on('click', () => {
      closeSearch();
      closeSectorCard();
    });

    drawPolygons();
    renderMarkers();
    fitVisibleBounds(false);
    buildCatalogList();
  }

  // --- 9. POLYGONS & MARKERS ---
  function drawPolygons() {
    polygonLayer.clearLayers();
    MAP_DATA.polygons.forEach((p) => {
      const poly = L.polygon(p.coordinates, {
        color: p.color,
        weight: 2.5,
        opacity: 0.95,
        dashArray: '6, 6',
        fillColor: p.color,
        fillOpacity: 0.2
      });

      poly.bindTooltip(p.name, {
        sticky: true,
        className: 'caet-poly-tooltip'
      });

      poly.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        const parkingLoc = MAP_DATA.locations.find((l) => l.category === 'Estacionamento');
        if (parkingLoc) openSectorCard(parkingLoc);
      });

      polygonLayer.addLayer(poly);
    });
  }

  function renderMarkers() {
    clusterGroup.clearLayers();
    markersMap.clear();

    MAP_DATA.locations.forEach((loc) => {
      if (activeCategory !== 'all' && loc.category !== activeCategory) {
        return;
      }

      const isVisited = visitedIds.has(loc.id);
      const customIcon = L.divIcon({
        className: `custom-map-pin${selectedLocationId === loc.id ? ' is-selected' : ''}`,
        html: getPinHtml(loc, isVisited),
        iconSize: [40, 54],
        iconAnchor: [20, 52]
      });

      const marker = L.marker([loc.lat, loc.lng], {
        icon: customIcon,
        title: loc.name
      });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        closeSearch();
        openSectorCard(loc);
      });

      clusterGroup.addLayer(marker);
      markersMap.set(loc.id, marker);
    });
  }

  function refreshMarkerIcon(locId) {
    const marker = markersMap.get(locId);
    const loc = MAP_DATA.locations.find((l) => l.id === locId);
    if (!marker || !loc) return;

    const isVisited = visitedIds.has(loc.id);
    marker.setIcon(L.divIcon({
      className: `custom-map-pin${selectedLocationId === loc.id ? ' is-selected' : ''}`,
      html: getPinHtml(loc, isVisited),
      iconSize: [40, 54],
      iconAnchor: [20, 52]
    }));
  }

  function fitVisibleBounds(animate = true) {
    const visibleLocs = MAP_DATA.locations.filter(
      (l) => activeCategory === 'all' || l.category === activeCategory
    );
    if (visibleLocs.length === 0) return;

    if (visibleLocs.length === 1) {
      map.flyTo([visibleLocs[0].lat, visibleLocs[0].lng], 18.5, { animate, duration: 0.9 });
      return;
    }

    const bounds = L.latLngBounds(visibleLocs.map((l) => [l.lat, l.lng]));
    if (activeCategory === 'all' || activeCategory === 'Estacionamento') {
      MAP_DATA.polygons.forEach((p) => p.coordinates.forEach((c) => bounds.extend(c)));
    }

    map.fitBounds(bounds, {
      paddingTopLeft: [24, 175],
      paddingBottomRight: [24, 95],
      maxZoom: 18.5,
      animate
    });
  }

  // --- 10. BOTTOM SECTOR CARD & GPS GUIDE LINE ---
  function updateGuideLine(loc) {
    if (guideLine) {
      map.removeLayer(guideLine);
      guideLine = null;
    }
    if (!userCoords || !loc) return;

    guideLine = L.polyline(
      [
        [userCoords.lat, userCoords.lng],
        [loc.lat, loc.lng]
      ],
      {
        color: '#0284c7',
        weight: 3.5,
        dashArray: '6, 8',
        opacity: 0.92
      }
    ).addTo(map);
  }

  function openSectorCard(loc) {
    const prevId = selectedLocationId;
    selectedLocationId = loc.id;
    if (prevId && prevId !== loc.id) refreshMarkerIcon(prevId);
    refreshMarkerIcon(loc.id);

    updateGuideLine(loc);

    const isVisited = visitedIds.has(loc.id);
    let distanceHtml = '';
    if (userCoords) {
      const meters = getDistanceMeters(userCoords.lat, userCoords.lng, loc.lat, loc.lng);
      distanceHtml = `
        <span class="distance-pill">
          ${renderInlineSvg('all', '#0369a1')}
          <span>${formatDistance(meters)}</span>
        </span>
      `;
    }

    sectorCard.innerHTML = `
      <div class="sector-card-top">
        <div class="sector-badges">
          <span class="sector-badge" style="background-color: ${loc.color}18; color: ${loc.color}; border: 1px solid ${loc.color}40;">
            ${renderInlineSvg(loc.icon, loc.color)}
            <span>${escapeHtml(loc.badge)}</span>
          </span>
          ${distanceHtml}
        </div>
        <button type="button" id="btn-close-card" class="card-close" aria-label="Fechar detalhes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <h2 class="sector-title">${escapeHtml(loc.name)}</h2>

      <div class="gps-row">
        <span>GPS: ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}</span>
        <button type="button" id="btn-copy-gps" class="copy-gps-btn">Copiar</button>
      </div>

      <p class="sector-desc">${escapeHtml(loc.description)}</p>

      <div class="card-actions">
        <div class="card-primary-row">
          <button type="button" id="btn-toggle-visited" class="btn-visited${isVisited ? ' is-visited' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <span>${isVisited ? 'Visitado' : 'Marcar visita'}</span>
          </button>

          <button type="button" id="btn-zoom-sector" class="btn-primary">
            ${renderInlineSvg('all', '#ffffff')}
            <span>Aproximar</span>
          </button>
        </div>

        <div class="card-secondary-row">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
            <span>Rotas externas</span>
          </a>

          <button type="button" id="btn-share-sector" class="btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
            </svg>
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    `;

    sectorCard.hidden = false;
    quickCatalogWrap.hidden = true;

    document.getElementById('btn-close-card').addEventListener('click', closeSectorCard);
    document.getElementById('btn-copy-gps').addEventListener('click', () => {
      const coordsText = `${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(coordsText).then(() => showToast('Coordenadas GPS copiadas!'));
      }
    });
    document.getElementById('btn-zoom-sector').addEventListener('click', () => {
      map.flyTo([loc.lat, loc.lng], 19, { animate: true, duration: 1.0 });
    });
    document.getElementById('btn-share-sector').addEventListener('click', () => {
      const url = `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`;
      if (navigator.share) {
        navigator.share({
          title: `Mostra Técnica CAET — ${loc.name}`,
          text: `Confira o setor "${loc.name}" no mapa da Mostra Técnica do CAET:`,
          url
        }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(`${loc.name}: ${url}`).then(() => showToast('Link do local copiado!'));
      }
    });
    document.getElementById('btn-toggle-visited').addEventListener('click', () => {
      toggleVisited(loc.id);
    });
  }

  function closeSectorCard() {
    if (sectorCard.hidden) return;
    sectorCard.hidden = true;
    quickCatalogWrap.hidden = false;

    const prevId = selectedLocationId;
    selectedLocationId = null;
    if (prevId) refreshMarkerIcon(prevId);

    if (guideLine) {
      map.removeLayer(guideLine);
      guideLine = null;
    }
  }

  function toggleVisited(locId) {
    if (visitedIds.has(locId)) {
      visitedIds.delete(locId);
    } else {
      visitedIds.add(locId);
    }
    saveVisitedSet(visitedIds);
    refreshMarkerIcon(locId);
    updateVisitedProgressUI();
    buildCatalogList(catalogSearch.value);

    if (selectedLocationId === locId && !sectorCard.hidden) {
      const loc = MAP_DATA.locations.find((l) => l.id === locId);
      if (loc) openSectorCard(loc);
    }
  }

  function updateVisitedProgressUI() {
    const total = MAP_DATA.locations.length;
    const count = MAP_DATA.locations.filter((l) => visitedIds.has(l.id)).length;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;

    if (progressText) {
      progressText.textContent = `${count}/${total} setores visitados`;
    }
    if (progressFill) {
      progressFill.style.width = `${pct}%`;
    }
  }

  // --- 11. FOCUS & CATEGORY FILTERING ---
  function focusOnPlace(locId) {
    const loc = MAP_DATA.locations.find((l) => l.id === locId);
    if (!loc) return;

    if (activeCategory !== 'all' && loc.category !== activeCategory) {
      setCategory('all', false);
    }

    const marker = markersMap.get(loc.id);
    if (marker && typeof clusterGroup.zoomToShowLayer === 'function') {
      clusterGroup.zoomToShowLayer(marker, () => {
        map.flyTo([loc.lat, loc.lng], Math.max(map.getZoom(), 18.5), { duration: 0.9 });
        openSectorCard(loc);
      });
    } else {
      map.flyTo([loc.lat, loc.lng], 18.5, { duration: 0.9 });
      openSectorCard(loc);
    }
  }

  function setCategory(cat, shouldFit = true) {
    activeCategory = cat;

    document.querySelectorAll('.cat-pill').forEach((pill) => {
      if (pill.dataset.cat === cat) {
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-pressed', 'false');
      }
    });

    closeSectorCard();
    renderMarkers();

    if (cat === 'all' || cat === 'Estacionamento') {
      if (!map.hasLayer(polygonLayer)) map.addLayer(polygonLayer);
    } else {
      if (map.hasLayer(polygonLayer)) map.removeLayer(polygonLayer);
    }

    if (shouldFit) {
      fitVisibleBounds(true);
    }
  }

  document.querySelectorAll('.cat-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      setCategory(btn.dataset.cat, true);
    });
  });

  // --- 12. ACCENT-INSENSITIVE LIVE SEARCH ---
  let currentSearchMatches = [];

  function renderSearchDropdown(rawQuery) {
    const normQuery = normalizeText(rawQuery).trim();
    if (!normQuery) {
      searchClear.hidden = true;
      searchResults.hidden = true;
      searchResults.innerHTML = '';
      currentSearchMatches = [];
      return;
    }

    searchClear.hidden = false;

    const matches = MAP_DATA.locations.filter((l) =>
      normalizeText(l.name).includes(normQuery) ||
      normalizeText(l.category).includes(normQuery) ||
      normalizeText(l.description).includes(normQuery)
    );
    currentSearchMatches = matches;

    if (matches.length === 0) {
      searchResults.innerHTML = `<div class="search-empty">Nenhum setor encontrado para <strong>${escapeHtml(rawQuery.trim())}</strong>.</div>`;
      searchResults.hidden = false;
      return;
    }

    searchResults.innerHTML = matches.map((l) => {
      let distHtml = '';
      if (userCoords) {
        const d = getDistanceMeters(userCoords.lat, userCoords.lng, l.lat, l.lng);
        distHtml = `<span>· ${formatDistance(d)}</span>`;
      }
      const visitedTag = visitedIds.has(l.id) ? `<span class="visited-tag">✓ Visitado</span>` : '';

      return `
        <button type="button" class="search-item" data-loc-id="${l.id}">
          <div>
            <div class="search-item-title">${highlightMatch(l.name, rawQuery)}</div>
            <div class="search-item-meta">
              <span class="search-dot" style="background-color: ${l.color}"></span>
              <span>${escapeHtml(l.category)}</span>
              ${distHtml}
              ${visitedTag}
            </div>
          </div>
          <span class="catalog-item-go">Ver →</span>
        </button>
      `;
    }).join('');

    searchResults.querySelectorAll('.search-item').forEach((item) => {
      item.addEventListener('click', () => {
        focusOnPlace(item.dataset.locId);
        closeSearch();
      });
    });

    searchResults.hidden = false;
  }

  function closeSearch() {
    searchResults.hidden = true;
    searchInput.blur();
  }

  searchInput.addEventListener('input', (e) => {
    renderSearchDropdown(e.target.value);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'Enter' && currentSearchMatches.length > 0) {
      e.preventDefault();
      focusOnPlace(currentSearchMatches[0].id);
      closeSearch();
    }
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    renderSearchDropdown('');
    searchInput.focus();
  });

  // --- 13. HEADER ACTIONS ---
  document.getElementById('btn-toggle-layer').addEventListener('click', () => {
    const order = ['googleHybrid', 'esriImagery', 'googleRoads'];
    const nextIdx = (order.indexOf(currentLayerKey) + 1) % order.length;
    const nextKey = order[nextIdx];
    switchBaseLayer(nextKey);
    showToast(`Camada: ${layerLabels[nextKey]}`);
  });

  document.getElementById('btn-fit-bounds').addEventListener('click', () => {
    fitVisibleBounds(true);
  });

  btnLocate.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('Seu aparelho não suporta geolocalização GPS.', true);
      return;
    }

    showToast('Buscando sua posição no campus do CAET...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onGpsUpdate(pos, true);
        if (!watchId) {
          watchId = navigator.geolocation.watchPosition(
            (p) => onGpsUpdate(p, false),
            (err) => console.warn('GPS watch warning:', err),
            { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
          );
        }
      },
      () => {
        showToast('Acesso ao GPS negado ou sem sinal disponível.', true);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

  function onGpsUpdate(pos, centerMap) {
    userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    updateUserLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
    gpsActiveBadge.hidden = false;
    btnLocate.classList.add('is-active');

    if (centerMap) {
      map.flyTo([pos.coords.latitude, pos.coords.longitude], 18, { duration: 1.0 });
      showToast(`Localizado (precisão ±${Math.round(pos.coords.accuracy)} m)`);
    }

    if (selectedLocationId && !sectorCard.hidden) {
      const loc = MAP_DATA.locations.find((l) => l.id === selectedLocationId);
      if (loc) openSectorCard(loc);
    }
    buildCatalogList(catalogSearch.value);
  }

  function updateUserLocation(lat, lng, accuracy) {
    if (!userLocationMarker) {
      const userIcon = L.divIcon({
        className: 'gps-marker',
        html: `
          <div style="position: relative;">
            <div class="gps-pulse-outer"></div>
            <div class="gps-pulse-inner"></div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      userLocationMarker = L.marker([lat, lng], { icon: userIcon, zIndexOffset: 2000 }).addTo(map);
      userLocationMarker.bindTooltip('Você está aqui', { direction: 'top' });

      userAccuracyCircle = L.circle([lat, lng], {
        radius: accuracy,
        color: '#0284c7',
        weight: 1,
        opacity: 0.5,
        fillColor: '#38bdf8',
        fillOpacity: 0.14
      }).addTo(map);
    } else {
      userLocationMarker.setLatLng([lat, lng]);
      userAccuracyCircle.setLatLng([lat, lng]);
      userAccuracyCircle.setRadius(accuracy);
    }
  }

  // --- 14. NATIVE <dialog> CATALOG & SAFARI closedby FALLBACK ---
  function openCatalog() {
    closeSearch();
    closeSectorCard();
    buildCatalogList(catalogSearch.value);
    if (typeof catalogDialog.showModal === 'function') {
      catalogDialog.showModal();
    } else {
      catalogDialog.setAttribute('open', '');
    }
  }

  function closeCatalog() {
    if (typeof catalogDialog.close === 'function') {
      catalogDialog.close();
    } else {
      catalogDialog.removeAttribute('open');
    }
  }

  // Fallback for Safari where <dialog closedby="any"> is not yet supported
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const outside = (e, dialog) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOutside = false;
    catalogDialog.addEventListener('pointerdown', (e) => {
      pressedOutside = outside(e, catalogDialog);
    });
    catalogDialog.addEventListener('pointerup', (e) => {
      if (pressedOutside && outside(e, catalogDialog)) {
        closeCatalog();
      }
      pressedOutside = false;
    });
  }

  catalogDialog.addEventListener('close', () => {
    catalogDialog.returnValue = '';
  });

  document.getElementById('btn-open-list').addEventListener('click', openCatalog);
  document.getElementById('btn-quick-catalog').addEventListener('click', openCatalog);
  document.getElementById('btn-close-catalog').addEventListener('click', closeCatalog);

  catalogSearch.addEventListener('input', (e) => {
    buildCatalogList(e.target.value);
  });

  document.querySelectorAll('.segment-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      catalogFilter = btn.dataset.filter;
      document.querySelectorAll('.segment-btn').forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
      buildCatalogList(catalogSearch.value);
    });
  });

  function buildCatalogList(filterText = '') {
    const q = normalizeText(filterText).trim();
    let list = MAP_DATA.locations.slice();

    if (catalogFilter === 'pending') {
      list = list.filter((l) => !visitedIds.has(l.id));
    } else if (catalogFilter === 'visited') {
      list = list.filter((l) => visitedIds.has(l.id));
    }

    if (q) {
      list = list.filter((l) =>
        normalizeText(l.name).includes(q) ||
        normalizeText(l.category).includes(q) ||
        normalizeText(l.description).includes(q)
      );
    }

    if (userCoords) {
      list.sort((a, b) => {
        const dA = getDistanceMeters(userCoords.lat, userCoords.lng, a.lat, a.lng);
        const dB = getDistanceMeters(userCoords.lat, userCoords.lng, b.lat, b.lng);
        return dA - dB;
      });
    }

    if (list.length === 0) {
      catalogList.innerHTML = `<div class="search-empty">Nenhum setor corresponde a este filtro.</div>`;
      return;
    }

    catalogList.innerHTML = list.map((l) => {
      const isVisited = visitedIds.has(l.id);
      const distText = userCoords
        ? `<span>· ${formatDistance(getDistanceMeters(userCoords.lat, userCoords.lng, l.lat, l.lng))}</span>`
        : '';
      const visitedTag = isVisited ? `<span class="visited-tag">✓ Visitado</span>` : '';

      return `
        <button type="button" class="catalog-item" data-loc-id="${l.id}">
          <div class="catalog-item-left">
            <span class="catalog-item-icon" style="background-color: ${l.color}18; color: ${l.color};">
              ${renderInlineSvg(l.icon, l.color)}
            </span>
            <div>
              <div class="catalog-item-title-row">
                <span class="catalog-item-name">${escapeHtml(l.name)}</span>
                ${visitedTag}
              </div>
              <p class="catalog-item-desc">${escapeHtml(l.description)}</p>
              <div class="catalog-item-meta">
                <span>${escapeHtml(l.category)}</span>
                ${distText}
              </div>
            </div>
          </div>
          <span class="catalog-item-go">Ver →</span>
        </button>
      `;
    }).join('');

    catalogList.querySelectorAll('.catalog-item').forEach((item) => {
      item.addEventListener('click', () => {
        const id = item.dataset.locId;
        closeCatalog();
        focusOnPlace(id);
      });
    });
  }

  // --- 15. STATUS TOAST ---
  function showToast(text, isAlert = false) {
    const toast = document.getElementById('status-toast');
    const toastText = document.getElementById('status-toast-text');
    const toastDot = document.getElementById('status-toast-dot');

    toastText.textContent = text;
    toastDot.className = isAlert ? 'toast-dot is-alert' : 'toast-dot';
    toast.hidden = false;

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.hidden = true;
    }, 3500);
  }

  window.addEventListener('offline', () => {
    showToast('Sem conexão: usando mapa e setores salvos offline.', true);
    updateOfflineBadge('Modo offline ativo', false);
  });

  window.addEventListener('online', () => {
    showToast('Conexão restabelecida.');
    triggerCampusTilePrecache();
  });

  // --- 16. ACTIVE CAMPUS TILE PRECACHING ---
  function deg2num(latDeg, lonDeg, zoom) {
    const latRad = latDeg * Math.PI / 180;
    const n = Math.pow(2, zoom);
    const x = Math.floor((lonDeg + 180) / 360 * n);
    const y = Math.floor((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * n);
    return { x, y };
  }

  function buildCampusTileUrls() {
    const lats = MAP_DATA.locations.map((l) => l.lat);
    const lngs = MAP_DATA.locations.map((l) => l.lng);
    MAP_DATA.polygons.forEach((p) => p.coordinates.forEach(([la, ln]) => {
      lats.push(la);
      lngs.push(ln);
    }));

    const pad = 0.0005;
    const minLat = Math.min(...lats) - pad;
    const maxLat = Math.max(...lats) + pad;
    const minLng = Math.min(...lngs) - pad;
    const maxLng = Math.max(...lngs) + pad;

    const urls = [];
    const zooms = [16, 17, 18, 19];
    zooms.forEach((z) => {
      const topLeft = deg2num(maxLat, minLng, z);
      const bottomRight = deg2num(minLat, maxLng, z);
      for (let x = topLeft.x; x <= bottomRight.x; x++) {
        for (let y = topLeft.y; y <= bottomRight.y; y++) {
          const s = (x + y) % 4;
          urls.push(`https://mt${s}.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}`);
        }
      }
    });
    return urls;
  }

  function updateOfflineBadge(text, isBusy) {
    if (!offlineStatusPill) return;
    offlineStatusPill.classList.toggle('is-busy', Boolean(isBusy));
    const span = offlineStatusPill.querySelector('span');
    if (span) span.textContent = text;
  }

  function triggerCampusTilePrecache() {
    if (!('serviceWorker' in navigator) || !navigator.onLine) return;
    navigator.serviceWorker.ready.then((reg) => {
      if (reg.active) {
        const urls = buildCampusTileUrls();
        reg.active.postMessage({ type: 'PRECACHE_CAMPUS_TILES', urls });
      }
    }).catch(() => {});
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      const data = event.data;
      if (!data) return;
      if (data.type === 'PRECACHE_PROGRESS') {
        const pct = Math.round((data.done / data.total) * 100);
        updateOfflineBadge(`Salvando mapa offline (${pct}%)`, true);
      } else if (data.type === 'PRECACHE_DONE') {
        updateOfflineBadge('Mapa offline pronto ✓', false);
      }
    });

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(() => {
          triggerCampusTilePrecache();
        })
        .catch((err) => {
          console.warn('Service Worker indisponível:', err);
        });
    });
  }

  // --- 17. BOOTSTRAP ---
  window.addEventListener('DOMContentLoaded', () => {
    initMap();
  });

  // Expose pure helpers for verification scripts when needed
  window.__CAET_MAP__ = {
    normalizeText,
    highlightMatch,
    MAP_DATA,
    buildCampusTileUrls
  };
})();
