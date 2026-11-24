# 🌾 Mostra Técnica CAET — Mapa Interativo do Evento

Aplicação web progressiva (PWA) desenvolvida para a **Mostra Técnica do Colégio Agrícola Estadual de Toledo (CAET)** na Linha Mandarina, Toledo/PR.

Permite navegar pelos **34 pontos de interesse** (setores agrícolas, zootécnicos, infraestrutura, apoio e parceiros) sem depender de CDNs externas, com suporte offline completo, busca tolerante a acentos, clusters com *spiderfy*, guia de distância GPS interna e checklist de visitação.

---

## 📸 Recursos e Arquitetura

- **100% Local e Sem CDN:** `styles.css` próprio (substituindo Tailwind CDN) e bibliotecas `Leaflet 1.9.4` + `Leaflet.markercluster 1.5.3` versionadas localmente em `vendor/`.
- **Header Compacto e Mobile-First:** Alvos de toque ≥ 44px, tipografia fluida (`clamp()`), unidade dinâmica `100dvh` e ícones vetoriais SVG unificados em toda a interface.
- **Busca Normalizada (Sem Acentos):** Digitar `"agua"`, `"cafe"`, `"irrigacao"`, `"algodao"` ou `"inscricao"` encontra os setores normalmente com destaque do trecho encontrado.
- **Clusters + Spiderfy + Rótulos por Zoom:** Agrupa pinos próximos em zooms distantes, abre em leque ao tocar (`spiderfy`) e exibe rótulos discretos abaixo dos pinos quando `zoom >= 19`.
- **Bottom Card Mobile:** Ao tocar em qualquer setor, abre um painel fixo na base (nunca cortado pelo header) com descrição, GPS copiável, tempo estimado a pé, marcação de **Visitado**, zoom rápido, rota externa e compartilhamento nativo.
- **Linha Guia Interna via GPS:** Com o GPS ativo, desenha uma linha tracejada direta da posição atual do visitante até o setor selecionado.
- **Pré-cache Completo & Fallback de Satélite:**
  - Service Worker (`caet-map-v6`) faz pré-download em segundo plano dos tiles de satélite do retângulo completo do campus (zooms `16–19`).
  - Fallback automático de **Google Hybrid** para **Esri World Imagery** se houver falha/rate limit de tiles, além de modo **Mapa de Ruas**.
- **Checklist de Visitação:** Progresso salvo localmente (`localStorage`) com barra `X/34 visitados`, selo nos pinos visitados e filtro (`Todos` / `Faltam` / `Visitados`) no catálogo modal nativo (`<dialog>`).

---

## 🗂️ Setores Mapeados (34 Pontos + 1 Polígono)

- **Agricultura (11):** Setor Café, Setor Tecnologias de Irrigação, Morango Semi-hidropônico, Setor Soja, Setor Milho, Setor Trigo, Setor Algodão, Setor Erva-mate, Horta Mandala, Horta Medicinal e Horta SPDH.
- **Produção Animal (12):** Ovinocultura, Bovinocultura de leite, Inseminação Artificial, Agroindústria Animal, Agrostológico e Alimentação Animal, Suinocultura, Setor Piscicultura, Galinha de postura, Gado Purunã, Meliponicultura, Frango de corte e Cunicultura.
- **Infraestrutura & Máquinas (3):** Setor Drone, Maquinário Agrícola e Setor Biodigestor.
- **Serviços (6):** Inscrição & Recepção, Lanchonete e 4 Pontos de Água (Entrada, Central, Suinocultura e Bovino/Piscicultura).
- **Estacionamento (1 ponto + 1 polígono):** Estacionamento Visitantes e Área do Estacionamento.
- **Parceiros (1):** PUCPR.

---

## 🚀 Como Executar

### Opção 1: Servidor Local Leve (Recomendado para PWA e GPS)
```bash
python -m http.server 8080
# ou
npx serve .
```
Acesse `http://localhost:8080` (ou `http://SEU_IP_LOCAL:8080` no celular).

### Opção 2: Abrir Direto (`file://`)
Dê dois cliques em `index.html`. Os dados embutidos e bibliotecas locais funcionam mesmo sem servidor (o Service Worker requer HTTP/HTTPS).

---

## 📁 Estrutura de Arquivos

```text
mostra-tecnica-mapa/
├── index.html              # Markup semântico e PWA shell
├── styles.css              # Design System próprio (tokens, Bottom Card, <dialog>)
├── app.js                  # Lógica de mapa, busca, clusters, GPS, checklist e pré-cache
├── sw.js                   # Service Worker (caet-map-v4 + caet-tiles-v2)
├── manifest.json           # Manifesto PWA
├── build_data.py           # Extrator KML → JSON
├── vendor/                 # Leaflet e MarkerCluster locais (zero CDN)
├── data/
│   └── locations.json      # Base estruturada dos 31 pontos e 1 polígono
├── kml/
│   └── Mostra_Tecnica.kml  # Arquivo KML oficial
└── README.md               # Documentação técnica
```
