# 🌾 Mostra Técnica CAET — Mapa Interativo do Evento

Aplicação web interativa desenvolvida sob medida para a **Mostra Técnica do Colégio Agrícola Estadual de Toledo (CAET)** na Linha Mandarina, Toledo/PR.

Permite que visitantes, estudantes e professores naveguem pelos **31 pontos de interesse** (setores agrícolas, zootécnicos, infraestrutura, apoio e parceiros) e visualizem o campus com geolocalização GPS em tempo real sobre imagens de satélite em alta definição.

---

## 📸 Funcionalidades

- **Interface Mobile-First:** Header temático verde (`#0e3d26`), barra de busca com autocompletar em tempo real e filtros horizontais em pills por categoria.
- **Camada Cartográfica:** Leaflet com imagens de satélite Google Hybrid (estradas + satélite de alta resolução) e alternância rápida para mapa de ruas.
- **Marcadores Customizados em Vetor (SVG):**
  - 🌱 **Agricultura (11 locais):** Café, Irrigação, Morango Semi-hidropônico, Soja, Milho, Trigo, Algodão, Erva-mate, Horta Mandala, Horta Medicinal e Horta SPDH.
  - 🐄 **Produção Animal (12 locais):** Ovinocultura, Bovinocultura de leite, Inseminação Artificial, Agroindústria Animal, Cunicultura, Agrostológico e Alimentação Animal, Suinocultura, Piscicultura, Galinha de postura, Gado Purunã, Meliponicultura e Frango de corte.
  - ⚙️ **Infraestrutura & Máquinas (3 locais):** Setor Drone, Maquinário Agrícola e Biodigestor.
  - ℹ️ **Serviços (3 locais):** Inscrição & Recepção e 2 Pontos de Água (Entrada e Central).
  - 🚗 **Estacionamento (1 ponto + 1 polígono de área):** Área demarcada para visitantes e ônibus escolares.
  - 🎓 **Parceiros (1 local):** PUCPR.
- **Card Pop-up com Ação Direta:** Categoria destacada, coordenadas GPS exatas com botão de cópia, botão **"🎯 Aproximar local"** com zoom dinâmico, rota externa no Google Maps e compartilhamento nativo.
- **GPS em Tempo Real:** Botão de mira no header para rastrear a posição do visitante no campus via radar pulsante com precisão métrica e distância em tempo real até cada setor.
- **Modo Offline (PWA):** Service Worker (`caet-map-v3`) com pré-cache do App Shell e cache dinâmico dos blocos de satélite visualizados.

---

## 🚀 Como Executar

### Opção 1: Abrir Diretamente no Navegador
Basta dar dois cliques no arquivo `index.html` ou arrastá-lo para qualquer navegador (Chrome, Edge, Opera, Firefox). Funciona instantaneamente sem necessidade de instalação.

### Opção 2: Servidor Local Leve (Recomendado para testar no Celular e PWA)
Abra o terminal nesta pasta e execute:

```bash
# Com Python nativo:
python -m http.server 8080

# Ou com Node.js:
npx serve .
```

Acesse no navegador:
- No computador: `http://localhost:8080`
- No celular (mesmo Wi-Fi): `http://SEU_IP_LOCAL:8080` (ex: `http://192.168.1.104:8080`)

### Opção 3: Compartilhar com Qualquer Pessoa via LocalTunnel
Para gerar uma URL pública temporária:

```bash
# 1. Inicie o servidor local na porta 8080:
python -m http.server 8080

# 2. Em outro terminal, abra o túnel:
npx localtunnel --port 8080
```

---

## 📁 Estrutura de Arquivos

```text
mostra-tecnica-mapa/
├── index.html              # Aplicação completa e autocontida (PWA + Leaflet)
├── sw.js                   # Service Worker para funcionamento offline
├── manifest.json           # Manifesto Web App (instalação em Android/iOS)
├── build_data.py           # Script extrator do KML para JSON
├── data/
│   └── locations.json      # Base estruturada dos 31 pontos e 1 polígono
├── kml/
│   └── Mostra_Tecnica.kml  # Arquivo KML oficial atualizado
└── README.md               # Documentação técnica
```

---

## 📡 Deploy Gratuito em 1 Minuto

- **GitHub Pages:** Suba o repositório no GitHub e ative o Pages nas configurações (`Branch: main, / (root)`).
- **Vercel:** Execute `npx vercel` nesta pasta para obter uma URL definitiva.
