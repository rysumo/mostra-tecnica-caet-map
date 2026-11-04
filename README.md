# 🌾 Mostra Técnica CAET — Mapa Interativo do Evento

Aplicação web interativa desenvolvida sob medida para a **Mostra Técnica do Colégio Agrícola Estadual de Toledo (CAET)** na Linha Mandarina, Toledo/PR.

Permite que visitantes, estudantes e professores naveguem pelos **28 pontos de interesse** (setores agrícolas, zootécnicos, infraestrutura e apoio) e visualizem o campus com geolocalização GPS em tempo real sobre imagens de satélite em alta definição.

---

## 📸 Telas Reconstruídas

- **Interface Mobile-First:** Header temático verde (`#0e3d26`), barra de busca com autocompletar em tempo real e filtros horizontais em pills por categoria.
- **Camada Cartográfica:** Leaflet com imagens de satélite Google Hybrid (estradas + satélite de alta resolução) e alternância rápida para mapa de vetores.
- **Marcadores Customizados em Vetor (SVG):**
  - 🌱 **Agricultura (8 locais):** Café, Irrigação, Morango Semi-hidropônico, Soja, Milho, Trigo, Algodão e Erva-mate.
  - 🐄 **Produção Animal (13 locais):** Ovinocultura, Bovino Leite, Inseminação Artificial, Agroindústria Animal, Cunicultura, Alimentação Animal, Suinocultura, Piscicultura, Galinhas de Postura (Gaiolas e Soltas), Gado Purunã, Meliponicultura e Frango de Corte.
  - ⚙️ **Infraestrutura & Máquinas (3 locais):** Setor Drone, Maquinário Agrícola e Biodigestor.
  - ℹ️ **Serviços & Apoio (3 locais):** Inscrição/Recepção e 2 Pontos Centrais de Água.
  - 🚗 **Estacionamento (1 ponto + 1 polígono de área):** Área demarcada para visitantes e ônibus escolares.
- **Card Pop-up com Ação Direta:** Categoria destacada, coordenadas GPS exatas com botão de cópia, botão **"🎯 Aproximar local"** com zoom dinâmico e link direto para rota no Google Maps.
- **GPS em Tempo Real:** Botão de mira no header para rastrear a posição do visitante no campus via radar pulsante com precisão métrica.

---

## 🚀 Como Executar

### Opção 1: Abrir Diretamente no Navegador
Basta dar dois cliques no arquivo `index.html` ou arrastá-lo para qualquer navegador (Chrome, Edge, Opera, Firefox). Funciona instantaneamente sem necessidade de instalação.

### Opção 2: Servidor Local Leve (Recomendado para testar no Celular)
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

### Opção 3: Compartilhar com Qualquer Pessoa via LocalTunnel (Como no print original)
Para gerar uma URL pública temporária (como a `silent-carpets-pay.loca.lt` do seu print):

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
├── index.html              # Aplicação completa e autocontida
├── build_data.py           # Script extrator do KML para JSON
├── data/
│   └── locations.json      # Base estruturada dos 28 pontos e polígonos
├── kml/
│   └── Mostra_Tecnica.kml  # Arquivo KML original com todos os dados brutos
└── README.md               # Documentação técnica
```

---

## 📡 Deploy Gratuito em 1 Minuto

- **GitHub Pages:** Suba o repositório no GitHub e ative o Pages nas configurações (`Branch: main, /root`).
- **Vercel:** Execute `npx vercel` nesta pasta para obter uma URL definitiva `https://mapa-caet.vercel.app`.
