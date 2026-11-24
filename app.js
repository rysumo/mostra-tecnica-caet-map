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
        "icon": "sheep",
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
        "icon": "quadcopter",
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
        "icon": "tractor-variant",
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
        "icon": "needle",
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
        "icon": "cheese",
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
        "icon": "coffee",
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
        "icon": "sprinkler-variant",
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
        "icon": "fruit-cherries",
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
        "icon": "grass",
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
        "icon": "seed",
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
        "icon": "corn",
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
        "icon": "barley",
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
        "icon": "flower-poppy",
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
        "icon": "leaf",
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
        "icon": "pig-variant",
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
        "icon": "fire",
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
        "icon": "fish",
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
        "icon": "egg",
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
        "icon": "flower",
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
        "icon": "barn",
        "color": "#b45309",
        "lat": -24.78780222891677,
        "lng": -53.72846716612426,
        "elevation": 505.7,
        "description": "Raça bovina paranaense (IAPAR): rusticidade e marmoreio através do cruzamento Charolês, Angus, Caracu e Canchim."
      },
      {
        "id": "loc-22",
        "name": "Meliponicultura",
        "category": "Produção Animal",
        "badge": "PRODUÇÃO ANIMAL",
        "icon": "bee",
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
        "icon": "turkey",
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
        "icon": "clipboard-check",
        "color": "#0891b2",
        "lat": -24.78976355970232,
        "lng": -53.72492954280644,
        "elevation": 512.6,
        "description": "Portaria principal de recepção, credenciamento de caravanas, entrega de crachás e mapas informativos."
      },
      {
        "id": "loc-25",
        "name": "Ponto de Água — Entrada",
        "category": "Serviços",
        "badge": "SERVIÇOS",
        "icon": "water",
        "color": "#0891b2",
        "lat": -24.78974826267669,
        "lng": -53.72498593754265,
        "elevation": 512.8,
        "description": "Estação de hidratação e bebedouros de água filtrada e gelada para visitantes na entrada principal."
      },
      {
        "id": "loc-26",
        "name": "Ponto de Água — Central",
        "category": "Serviços",
        "badge": "SERVIÇOS",
        "icon": "water",
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
        "icon": "rabbit-variant",
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
        "icon": "mortar-pestle-plus",
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
        "icon": "carrot",
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
        "icon": "school",
        "color": "#881337",
        "lat": -24.78733055794036,
        "lng": -53.7250257187744,
        "elevation": 504.6,
        "description": "Estande institucional da Pontifícia Universidade Católica do Paraná (Campus Toledo) com mostra de cursos e parcerias acadêmicas."
      },
      {
        "id": "loc-32",
        "name": "Ponto de Água — Suinocultura",
        "category": "Serviços",
        "badge": "SERVIÇOS",
        "icon": "water",
        "color": "#0891b2",
        "lat": -24.78778719357144,
        "lng": -53.72873851258329,
        "elevation": 508.1,
        "description": "Bebedouro e ponto de hidratação próximo à Suinocultura, Biodigestor e lavouras."
      },
      {
        "id": "loc-33",
        "name": "Ponto de Água — Bovino/Piscicultura",
        "category": "Serviços",
        "badge": "SERVIÇOS",
        "icon": "water",
        "color": "#0891b2",
        "lat": -24.78714736177722,
        "lng": -53.72651091490376,
        "elevation": 504.3,
        "description": "Ponto de hidratação entre os setores de Bovinocultura de leite e Piscicultura."
      },
      {
        "id": "loc-34",
        "name": "Lanchonete",
        "category": "Serviços",
        "badge": "SERVIÇOS",
        "icon": "food",
        "color": "#0891b2",
        "lat": -24.78763938205157,
        "lng": -53.7262405902043,
        "elevation": 508.0,
        "description": "Praça de alimentação e lanchonete da Mostra Técnica com lanches, salgados e bebidas para visitantes."
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

  // --- 2. MATERIAL DESIGN ICONS (@mdi/svg 24x24, embedded offline) ---
  const MDI_ICONS = {
    "compass": '<path fill="currentColor" d="M14.19 14.19L6 18l3.81-8.19L18 6m-6-4A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 8.9a1.1 1.1 0 0 0-1.1 1.1a1.1 1.1 0 0 0 1.1 1.1a1.1 1.1 0 0 0 1.1-1.1a1.1 1.1 0 0 0-1.1-1.1"/>',
    "sprout": '<path fill="currentColor" d="M2 22v-2s5-2 10-2s10 2 10 2v2zm9.3-12.9c-1.2-3.9-7.3-3-7.3-3s.2 7.8 5.9 6.6C9.5 9.8 8 9 8 9c2.8 0 3 3.4 3 3.4V17h2v-4.2s0-3.9 3-4.9c0 0-2 3-2 5c7 .7 7-8.9 7-8.9s-8.9-1-9.7 5.1"/>',
    "cow": '<path fill="currentColor" d="M10.5 18a.5.5 0 0 1 .5.5a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .5-.5m3 0a.5.5 0 0 1 .5.5a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .5-.5M10 11a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m4 7c0 2.21-2.69 4-6 4s-6-1.79-6-4c0-.9.45-1.73 1.2-2.4c-.75-1-1.2-2.25-1.2-3.6l.12-1.22c-.54.15-1.19.15-1.72 0c-1.02-.28-2.56-1.43-2.33-2.23s2.14-.95 3.16-.65c.59.17 1.22.6 1.59 1.06l.57-.81C6.79 7.05 7 4 10 3l-.09.14c-.28.44-1 1.83-.24 3.33a6.02 6.02 0 0 1 4.66 0c.76-1.5.04-2.89-.24-3.33L14 3c3 1 3.21 4.05 2.61 5.15l.57.81c.37-.46 1-.89 1.59-1.06c1.02-.3 2.93-.15 3.16.65s-1.31 1.95-2.33 2.23c-.53.15-1.18.15-1.72 0L18 12c0 1.35-.45 2.6-1.2 3.6c.75.67 1.2 1.5 1.2 2.4m-6-2c-2.21 0-4 .9-4 2s1.79 2 4 2s4-.9 4-2s-1.79-2-4-2m0-2c1.12 0 2.17.21 3.07.56c.58-.69.93-1.56.93-2.56a4 4 0 0 0-4-4a4 4 0 0 0-4 4c0 1 .35 1.87.93 2.56c.9-.35 1.95-.56 3.07-.56m2.09-10.86"/>',
    "cog": '<path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/>',
    "information": '<path fill="currentColor" d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/>',
    "parking": '<path fill="currentColor" d="M13.2 11H10V7h3.2a2 2 0 0 1 2 2a2 2 0 0 1-2 2M13 3H6v18h4v-6h3a6 6 0 0 0 6-6c0-3.32-2.69-6-6-6"/>',
    "school": '<path fill="currentColor" d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17z"/>',
    "sheep": '<path fill="currentColor" d="M20 8.5a2.5 2.5 0 0 1-2.5 2.5c-1.08 0-2-.69-2.34-1.64c-.44.39-1.02.64-1.66.64c-.56 0-1.08-.19-1.5-.5c-.42.31-.93.5-1.5.5c-.64 0-1.22-.25-1.66-.64C8.5 10.31 7.58 11 6.5 11A2.5 2.5 0 0 1 4 8.5c0-1.24.91-2.27 2.1-2.46c-.06-.17-.1-.35-.1-.54A1.5 1.5 0 0 1 7.5 4c.2 0 .39.04.56.11C8.23 3.47 8.81 3 9.5 3c.25 0 .5.07.68.17C10.5 2.5 11.19 2 12 2s1.5.5 1.82 1.17c.18-.1.43-.17.68-.17c.69 0 1.27.47 1.44 1.11c.17-.07.36-.11.56-.11A1.5 1.5 0 0 1 18 5.5c0 .19-.04.37-.1.54c1.19.19 2.1 1.22 2.1 2.46M10 12a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m4 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m6.23-1.34c-.64.81-1.62 1.34-2.73 1.34c-.45 0-.88-.1-1.29-.27c-.01 2.55-.38 5.63-1.76 7.22c-.52.59-1.15.91-1.95 1.01V18h-1v1.96c-.8-.1-1.43-.41-1.95-1.01c-1.39-1.6-1.76-4.66-1.77-7.21c-.4.16-.83.26-1.28.26c-1.11 0-2.09-.53-2.73-1.34C2.88 11.55 2 12 2 12s1 2 3 2c.36 0 .64-.04.88-.09C6.22 17.73 7.58 22 12 22s5.78-4.27 6.12-8.09c.24.05.52.09.88.09c2 0 3-2 3-2s-.88-.45-1.77-1.34"/>',
    "needle": '<path fill="currentColor" d="m11.15 15.18l-1.42-1.41l1.42-1.42l1.41 1.42l1.41-1.42l-1.41-1.41l1.41-1.41l1.42 1.41l1.41-1.41l-2.83-2.83l-7.07 7.07l2.83 2.83zM3.08 19l3.12-3.11l-2.12-2.12l9.89-9.9L16.1 6l1.4-1.42l-1.4-1.42l1.4-1.41L21.75 6l-1.41 1.4L18.92 6L17.5 7.4l2.13 2.13l-9.9 9.89l-2.12-2.12l-4.53 4.54z"/>',
    "cheese": '<path fill="currentColor" d="M11 17.5c0-.83.67-1.5 1.5-1.5c.29 0 .56.09.79.23l7.46-4.3c-.4-.71-.85-1.38-1.34-2.03a.9.9 0 0 1-.41.1c-.55 0-1-.45-1-1c0-.2.08-.38.18-.54A17.7 17.7 0 0 0 12 4.25C11.85 5.24 11 6 10 6a2 2 0 0 1-2-2c0-.28.06-.55.16-.79C7.3 3.08 6.41 3 5.5 3c-.17 0-.33 0-.5.03v6.02a2.5 2.5 0 0 1 0 4.9V21l6-3.46zM14 9a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2m-5 7c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m0-6c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"/>',
    "grass": '<path fill="currentColor" d="M12 20H2v-2h5.75C7 15.19 4.81 13 2 12.26c.64-.16 1.31-.26 2-.26c4.42 0 8 3.58 8 8m10-7.74c-.64-.16-1.31-.26-2-.26c-2.93 0-5.5 1.58-6.88 3.93c.29.66.53 1.35.67 2.07c.13.65.21 1.32.21 2h8v-2h-5.76c.76-2.81 2.95-5 5.76-5.74M15.64 11c.78-2.07 2.23-3.82 4.09-5c-4.29.16-7.73 3.67-7.73 8c.95-1.25 2.2-2.28 3.64-3m-4.22-2.15A8.53 8.53 0 0 0 6.7 4C8.14 5.86 9 8.18 9 10.71c0 .21-.03.41-.04.61c.43.24.83.52 1.22.82a9.9 9.9 0 0 1 1.24-3.29"/>',
    "pig-variant": '<path fill="currentColor" d="m19.83 7.5l-2.27-2.27c.07-.42.18-.81.32-1.15A1.498 1.498 0 0 0 16.5 2c-1.64 0-3.09.79-4 2h-5C4.46 4 2 6.46 2 9.5S4.5 21 4.5 21H10v-2h2v2h5.5l1.68-5.59l2.82-.94V7.5zM16 11c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"/>',
    "fish": '<path fill="currentColor" d="m12 20l.76-3c-3.26-.21-6.17-1.6-7.01-3.42c-.09.48-.22.92-.42 1.25C4.67 16 3.33 16 2 16c1.1 0 1.5-1.57 1.5-3.5S3.1 9 2 9c1.33 0 2.67 0 3.33 1.17c.2.33.33.77.42 1.25c.65-1.42 2.57-2.57 4.91-3.1L9 5c2 0 4 0 5.33.67c1.13.56 1.78 1.6 2.36 2.71c2.92.7 5.31 2.28 5.31 4.12c0 1.88-2.5 3.5-5.5 4.16c-.83 1.1-1.64 2.12-2.33 2.67c-.84.67-1.5.67-2.17.67m5-9a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1"/>',
    "egg": '<path fill="currentColor" d="M19.5 14.5A7.5 7.5 0 0 1 12 22a7.5 7.5 0 0 1-7.5-7.5C4.5 10.36 7.86 2 12 2s7.5 8.36 7.5 12.5"/>',
    "barn": '<path fill="currentColor" d="M12 3L3 8.2V21h6l2.9-3l3.1 3h6V8.2zM7.9 20v-6l3 3zm1-7h6l-3 3zm7 7l-3-3l3-3zm-.9-9H8.8V9H15z"/>',
    "bee": '<path fill="currentColor" d="M17.4 9C17 7.8 16.2 7 15 6.5V5h-1v1.4h-.4c-1.1 0-2 .4-2.8 1.2l-.4.4L9 7.5c-.3-.1-.6-.2-1-.2c-.6 0-1.2.2-1.7.6c-.6.4-.9.9-1.1 1.4c-.2.7-.2 1.3 0 2c.3.7.6 1.2 1.1 1.5c-.4 1.5-.1 2.8 1 3.9c.8.8 1.7 1.2 2.8 1.2c.5 0 .8 0 1.1-.1c.6.8 1.4 1.3 2.4 1.3c.3 0 .7 0 1-.1c.6-.2 1-.6 1.4-1.1c.4-.6.6-1.1.6-1.7c0-.4 0-.7-.1-1l-.5-1.6l.6-.4c.8-.8 1.2-1.9 1.1-3.1H19V9zm-9.7 2.3c-.6-.3-.8-.7-.6-1.3q.3-.9 1.2-.6l3.2 1.2c-1.6.8-2.8 1-3.8.7m6.3 5.6c-.6.2-1 0-1.3-.6c-.3-1-.1-2.2.7-3.8l1.2 3.1c.2.7 0 1.1-.6 1.3m1.2-5.3l-.6-1.6v-.1l-.3-.3h-.1L12.6 9c.4-.3.8-.5 1.3-.5s1 .2 1.4.6s.6.8.6 1.3c-.2.3-.4.8-.7 1.2"/>',
    "turkey": '<path fill="currentColor" d="M10.5 19.44c-.75.36-1.6.56-2.5.56c-3.31 0-6-2.69-6-6V9c0-3.31 2.69-6 6-6l2.5 4.58c-2.4 1.23-4 3.42-4 5.92s1.61 4.7 4 5.94m5.5-.5V20h1c.55 0 1 .45 1 1s-.45 1-1 1h-3c-.55 0-1-.45-1-1s.45-1 1-1v-1.06c-3.39-.38-6-2.67-6-5.44C8 10.46 11.13 8 15 8h.56C14.84 6.63 14 5.23 14 4c0-1.1.9-2 2-2c2.21 0 4 1.79 4 4h-2s4 3 4 7.5c0 2.77-2.61 5.06-6 5.44M16 4c0 .55.45 1 1 1s1-.45 1-1s-.45-1-1-1s-1 .45-1 1m1 8a2 2 0 0 0-2-2c-2.21 0-4 1.79-4 4h4c1.11 0 2-.89 2-2"/>',
    "rabbit-variant": '<path fill="currentColor" d="M16.84 14.5c-.26-.17-.62-.61-.79-.82C17.24 12 19 8.87 19 5c0-1.95-.74-3-2-3c-1.54 0-3.96 2.06-5 5.97C10.96 4.06 8.54 2 7 2C5.74 2 5 3.05 5 5c0 3.87 1.76 7 2.95 8.68c-.17.21-.53.65-.79.82c-.5.43-1.66 1.39-1.66 3c0 2.21 1.79 4 4 4c1.55 0 2.5-.56 2.5-.56s.95.56 2.5.56c2.21 0 4-1.79 4-4c0-1.61-1.16-2.57-1.66-3m-7.49-2.3C8.34 10.7 7 8.12 7 5c0-.5.06-.8.12-.97c.94.31 3.24 2.71 3.38 7.64c-.47.12-.84.3-1.15.53m1.15 4.55c-.28 0-.5-.34-.5-.75s.22-.75.5-.75s.5.34.5.75s-.22.75-.5.75M12 19.5c-.55 0-1-.72-1-1s.45-.5 1-.5s1 .22 1 .5s-.45 1-1 1m1.5-2.75c-.28 0-.5-.34-.5-.75s.22-.75.5-.75s.5.34.5.75s-.22.75-.5.75m0-5.08c.14-4.93 2.44-7.33 3.38-7.64c.06.17.12.47.12.97c0 3.12-1.34 5.7-2.35 7.2c-.31-.23-.68-.41-1.15-.53"/>',
    "coffee": '<path fill="currentColor" d="M2 21h18v-2H2M20 8h-2V5h2m0-2H4v10a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/>',
    "sprinkler-variant": '<path fill="currentColor" d="M10 10h4v12h-4zM7 9h2V7H7zM4 8h2V6H4zm0 3h2V9H4zm-3 2h2v-2H1zm0-6h2V5H1zm0 3h2V8H1zm17 1h2V9h-2zm3-1h2V8h-2zm0-5v2h2V5zm0 8h2v-2h-2zm-6-4h2V7h-2zm3-1h2V6h-2zm-8-1h.33L11 9h2l.67-2H14V6h-4z"/>',
    "fruit-cherries": '<path fill="currentColor" d="M16 13h-.5c-.7-1.3-1.2-3-1.7-4.7l.9.9c2.7 2.1 5.1 1.7 5.1 1.7s.7-3.8-2-5.8c-2.3-1.8-4.4-1.8-5-1.7c-.1-.6-.1-1.1-.2-1.5l-1.4.1c0 3.2-2.7 9.1-3.6 11c-2 .2-3.6 1.9-3.6 4c0 2.2 1.8 4 4 4c1.1 0 2-.4 2.7-1.1c-.4-.9-.7-1.9-.7-2.9s.3-2 .7-2.9c-.4-.4-1-.7-1.5-.9c.7-1.5 1.9-4.2 2.7-6.8c.4 2.3 1.2 5 2.2 7.1c-1.2.7-2.1 2-2.1 3.5c0 2.2 1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m-8 2.5c-.8 0-1.5.7-1.5 1.5h-1c0-1.4 1.1-2.5 2.5-2.5zm8 0c-.8 0-1.5.7-1.5 1.5h-1c0-1.4 1.1-2.5 2.5-2.5z"/>',
    "seed": '<path fill="currentColor" d="M20.7 3.3S19.3 3 17.2 3c-5.5 0-15.6 2.1-14 17.8c1.1.1 2.2.2 3.2.2C24.3 21 20.7 3.3 20.7 3.3M7 17S7 7 17 7c0 0-6 2-10 10"/>',
    "corn": '<path fill="currentColor" d="M11 12H8.82c.8.5 1.53 1.07 2.18 1.68zm-4-1c.27-5.12 2.37-9 5-9c2.66 0 4.77 3.94 5 9.12c1.5-.69 3.17-1.12 5-1.12c-5.75 2.57-3.75 12-10 12c-6 0-4.07-9.43-10-12c1.82 0 3.5.4 5 1m4 0V9H8.24l-.21 2zm0-3V6H9.05c-.25.6-.45 1.27-.62 2zm0-3V3.3c-.55.33-1.05.92-1.5 1.7zm1-2v2h1v1h-1v2h2v1h-2v2h3v1h-3v2h2v1h-1.77c1.19 1.45 1.92 3 2.09 4.23c.99-1.67 1.64-4.39 1.68-7.47C15.94 7 14.13 3 12 3"/>',
    "barley": '<path fill="currentColor" d="M7.33 18.33c-.83-1.16-.83-2.5-.83-3.83c1.67 1 3.33 2 4.17 3.17l.33.56v-2.28c-1.5-.9-2.92-1.82-3.67-2.87c-.83-1.16-.83-2.5-.83-3.83c1.67 1 3.33 2 4.17 3.17L11 13v-2.3c-1.5-.9-2.92-1.82-3.67-2.87C6.5 6.67 6.5 5.33 6.5 4c1.67 1 3.33 2 4.17 3.17q.15.21.27.45c-.17-.62-.28-1.2-.29-1.8c-.01-1.51.65-3.06 1.31-4.61c.69 1.48 1.38 2.97 1.39 4.48c.01.63-.1 1.27-.28 1.9c.08-.14.16-.28.26-.42C14.17 6 15.83 5 17.5 4c0 1.33 0 2.67-.83 3.83C15.92 8.88 14.5 9.8 13 10.7V13l.33-.58c.84-1.17 2.5-2.17 4.17-3.17c0 1.33 0 2.67-.83 3.83c-.75 1.05-2.17 1.97-3.67 2.87v2.28l.33-.56c.84-1.17 2.5-2.17 4.17-3.17c0 1.33 0 2.67-.83 3.83c-.75 1.05-2.17 1.97-3.67 2.87V23h-2v-1.8c-1.5-.9-2.92-1.82-3.67-2.87"/>',
    "flower-poppy": '<path fill="currentColor" d="M18.5 12A3.5 3.5 0 0 0 22 8.5A6.5 6.5 0 0 0 15.5 2A3.5 3.5 0 0 0 12 5.5A3.5 3.5 0 0 0 8.5 2A6.5 6.5 0 0 0 2 8.5A3.5 3.5 0 0 0 5.5 12A3.5 3.5 0 0 0 2 15.5A6.5 6.5 0 0 0 8.5 22a3.5 3.5 0 0 0 3.5-3.5a3.5 3.5 0 0 0 3.5 3.5a6.5 6.5 0 0 0 6.5-6.5a3.5 3.5 0 0 0-3.5-3.5M12 16a4 4 0 0 1-4-4a4 4 0 0 1 4-4a4 4 0 0 1 4 4a4 4 0 0 1-4 4m2.5-4a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 12A2.5 2.5 0 0 1 12 9.5a2.5 2.5 0 0 1 2.5 2.5"/>',
    "leaf": '<path fill="currentColor" d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8"/>',
    "flower": '<path fill="currentColor" d="M3 13a9 9 0 0 0 9 9c0-5-4.03-9-9-9m9-7.5A2.5 2.5 0 0 1 14.5 8a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 8A2.5 2.5 0 0 1 12 5.5m-6.4 4.75a2.5 2.5 0 0 0 2.5 2.5c.53 0 1.02-.17 1.4-.44v.19A2.5 2.5 0 0 0 12 15a2.5 2.5 0 0 0 2.5-2.5v-.19c.38.27.87.44 1.4.44a2.5 2.5 0 0 0 2.5-2.5c0-1-.59-1.85-1.43-2.25c.84-.4 1.43-1.26 1.43-2.25a2.5 2.5 0 0 0-2.5-2.5c-.53 0-1.02.16-1.4.44V3.5A2.5 2.5 0 0 0 12 1a2.5 2.5 0 0 0-2.5 2.5v.19c-.38-.28-.87-.44-1.4-.44a2.5 2.5 0 0 0-2.5 2.5c0 .99.59 1.85 1.43 2.25c-.84.4-1.43 1.25-1.43 2.25M12 22a9 9 0 0 0 9-9c-5 0-9 4-9 9"/>',
    "mortar-pestle-plus": '<path fill="currentColor" d="M16 14h-3v3h-2v-3H8v-2h3V9h2v3h3m5-7h-2.65l1.15-3.15L17.15 1l-1.46 4H3v2l2 6l-2 6v2h18v-2l-2-6l2-6z"/>',
    "carrot": '<path fill="currentColor" d="m16 10l-.2 1h-2.3a.5.5 0 0 0-.5.5a.5.5 0 0 0 .5.5h2.1l-1 5h-2.1a.5.5 0 0 0-.5.5a.5.5 0 0 0 .5.5h1.9l-.4 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2l-1-5h1.5a.5.5 0 0 0 .5-.5a.5.5 0 0 0-.5-.5H8.8L8 10c0-1.2.93-2.23 2.29-2.71L8.9 5.28a.997.997 0 0 1 .26-1.39a1 1 0 0 1 1.39.25l.45.66V3a1 1 0 0 1 1-1a1 1 0 0 1 1 1v2.28l1.5-1.74c.33-.42.97-.47 1.39-.11c.42.35.47.98.11 1.41l-2.13 2.51C15.14 7.85 16 8.85 16 10"/>',
    "quadcopter": '<path fill="currentColor" d="M5.5 1C8 1 10 3 10 5.5c0 .88-.25 1.7-.69 2.4l.1.1h5.18l.1-.1c-.44-.7-.69-1.52-.69-2.4C14 3 16 1 18.5 1S23 3 23 5.5S21 10 18.5 10c-.88 0-1.7-.25-2.4-.69l-1.1 1.1v3.18l1.1 1.1c.7-.44 1.52-.69 2.4-.69c2.5 0 4.5 2 4.5 4.5S21 23 18.5 23S14 21 14 18.5c0-.88.25-1.7.69-2.4l-.1-.1H9.41l-.1.1c.44.7.69 1.52.69 2.4C10 21 8 23 5.5 23S1 21 1 18.5S3 14 5.5 14c.88 0 1.7.25 2.4.69l1.1-1.1v-3.18l-1.1-1.1c-.7.44-1.52.69-2.4.69C3 10 1 8 1 5.5S3 1 5.5 1m0 2A2.5 2.5 0 0 0 3 5.5A2.5 2.5 0 0 0 5.5 8A2.5 2.5 0 0 0 8 5.5A2.5 2.5 0 0 0 5.5 3m0 13A2.5 2.5 0 0 0 3 18.5A2.5 2.5 0 0 0 5.5 21A2.5 2.5 0 0 0 8 18.5A2.5 2.5 0 0 0 5.5 16m13-13A2.5 2.5 0 0 0 16 5.5A2.5 2.5 0 0 0 18.5 8A2.5 2.5 0 0 0 21 5.5A2.5 2.5 0 0 0 18.5 3m0 13a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5M3.91 17.25l1.13.66c.13-.1.29-.16.46-.16a.75.75 0 0 1 .75.75l-.01.1l1.13.65l-.28.5l-1.13-.66c-.13.1-.29.16-.46.16a.75.75 0 0 1-.75-.75l.01-.1l-1.13-.65zm-.28-11l1.13-.65l-.01-.1a.75.75 0 0 1 .75-.75c.17 0 .33.06.46.16l1.13-.66l.28.5l-1.13.65l.01.1a.75.75 0 0 1-.75.75c-.17 0-.33-.06-.46-.16l-1.13.66zm13.28-2l1.13.66c.13-.1.29-.16.46-.16a.75.75 0 0 1 .75.75l-.01.1l1.13.65l-.28.5l-1.13-.66c-.13.1-.29.16-.46.16a.75.75 0 0 1-.75-.75l.01-.1l-1.13-.65zm-.28 15l1.12-.75a.75.75 0 0 1 .75-.75c.17 0 .33.06.46.16l1.13-.66l.28.5l-1.12.75a.75.75 0 0 1-.75.75c-.17 0-.33-.06-.46-.16l-1.13.66z"/>',
    "tractor-variant": '<path fill="currentColor" d="m13.3 2.79l-3.5 3.5l.7.71l1.4-1.39l1.1 1.1V9c0 1.11-.89 2-2 2h-.54A6 6 0 0 1 12 15a6 6 0 0 1-.09 1h3.12a4.5 4.5 0 0 1 4.47-4a4.5 4.5 0 0 1 2.5.76V8c0-1.11-.89-2-2-2h-6.29l-1.1-1.1L14 3.5zM4 7c-.55 0-1 .45-1 1s.45 1 1 1h5a2 2 0 0 0-2-2zm2 3a5 5 0 0 0-1.56.25l.36.93l-.47.18l-.33-.93a5 5 0 0 0-2.46 2.31l.91.41l-.21.45l-.9-.4A5 5 0 0 0 1 15a5 5 0 0 0 .25 1.56l.93-.36l.18.47l-.93.33a5 5 0 0 0 2.31 2.46l.4-.91l.46.21l-.4.9A5 5 0 0 0 6 20a5 5 0 0 0 1.56-.25l-.36-.93l.47-.18l.33.93a5 5 0 0 0 2.46-2.31l-.91-.4l.21-.46l.9.4A5 5 0 0 0 11 15a5 5 0 0 0-.25-1.56l-.93.36l-.18-.47l.93-.33a5 5 0 0 0-2.31-2.46l-.4.91l-.46-.21l.4-.9A5 5 0 0 0 6 10m0 2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m13.5 1a3.5 3.5 0 0 0-3.5 3.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5a3.5 3.5 0 0 0-3.5-3.5m0 2a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5"/>',
    "fire": '<path fill="currentColor" d="M17.66 11.2c-.23-.3-.51-.56-.77-.82c-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32c-2.59 2.08-3.61 5.75-2.39 8.9c.04.1.08.2.08.33c0 .22-.15.42-.35.5c-.23.1-.47.04-.66-.12a.6.6 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5c.14.6.41 1.2.71 1.73c1.08 1.73 2.95 2.97 4.96 3.22c2.14.27 4.43-.12 6.07-1.6c1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6c-1.12.4-2.24-.16-2.9-.82c1.19-.28 1.9-1.16 2.11-2.05c.17-.8-.15-1.46-.28-2.23c-.12-.74-.1-1.37.17-2.06c.19.38.39.76.63 1.06c.77 1 1.98 1.44 2.24 2.8c.04.14.06.28.06.43c.03.82-.33 1.72-.93 2.27"/>',
    "clipboard-check": '<path fill="currentColor" d="m10 17l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9m-6-6a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m7 0h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"/>',
    "water": '<path fill="currentColor" d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6"/>',
    "food": '<path fill="currentColor" d="M18.06 23h1.66c.84 0 1.53-.65 1.63-1.47L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26c1.44 1.42 2.43 2.89 2.43 5.29zM1 22v-1h15.03v1c0 .54-.45 1-1.03 1H2c-.55 0-1-.46-1-1m15.03-7C16.03 7 1 7 1 15zM1 17h15v2H1z"/>'
  };

  function getGlyphPaths(iconType) {
    return MDI_ICONS[iconType] || MDI_ICONS.information;
  }

  function renderInlineSvg(iconType, color = 'currentColor') {
    return `<svg viewBox="0 0 24 24" style="color: ${color};" aria-hidden="true">${getGlyphPaths(iconType)}</svg>`;
  }

  function getCategoryIconType(cat) {
    if (cat === 'Agricultura') return 'sprout';
    if (cat === 'Produção Animal') return 'cow';
    if (cat === 'Infraestrutura & Máquinas') return 'cog';
    if (cat === 'Estacionamento') return 'parking';
    if (cat === 'Parceiros') return 'school';
    if (cat === 'all') return 'compass';
    return 'information';
  }

  function getPinHtml(loc, isVisited) {
    const iconInner = getGlyphPaths(loc.icon);
    const visitedBadge = isVisited
      ? `<circle cx="33" cy="8" r="7" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
         <path d="M30 8l2 2 4-4" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
      : '';

    return `
      <div class="pin-inner">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="54" viewBox="0 0 42 54" style="filter: drop-shadow(0 6px 10px rgba(0,0,0,0.38));">
          <path d="M21 0C9.4 0 0 9.4 0 21c0 16.2 18.4 31.8 19.8 32.9a1.9 1.9 0 0 0 2.4 0C23.6 52.8 42 37.2 42 21 42 9.4 32.6 0 21 0z" fill="${loc.color}"/>
          <circle cx="21" cy="21" r="15.5" fill="#ffffff"/>
          <circle cx="21" cy="21" r="14" fill="none" stroke="${loc.color}30" stroke-width="1"/>
          <g transform="translate(11, 11) scale(0.833)" color="${loc.color}">${iconInner}</g>
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
        iconSize: [42, 54],
        iconAnchor: [21, 52]
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
      iconSize: [42, 54],
      iconAnchor: [21, 52]
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
          ${renderInlineSvg('compass', '#0369a1')}
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
            ${renderInlineSvg('compass', '#ffffff')}
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
