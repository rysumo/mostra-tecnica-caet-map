import xml.etree.ElementTree as ET
import json

kml_path = r"C:/Lucas/mostra-tecnica-mapa/kml/Mostra_Tecnica.kml"
tree = ET.parse(kml_path)
root = tree.getroot()
ns = {"kml": "http://www.opengis.net/kml/2.2"}

# Clean name normalizations
name_corrections = {
    "Inseminao Artificial": "Inseminação Artificial",
    "Inseminação Artificial": "Inseminação Artificial",
    "Inseminacao Artificial": "Inseminação Artificial",
    "Agroindustria Animal": "Agroindústria Animal",
    "Setor Caf": "Setor Café",
    "Setor Café": "Setor Café",
    "Setor Tecnologias de Irrigao": "Setor Tecnologias de Irrigação",
    "Setor Tecnologias de Irrigação": "Setor Tecnologias de Irrigação",
    "Morango Semihidroponico": "Morango Semi-hidropônico",
    "Agroestologico e Alimentao Animal": "Agrostológico e Alimentação Animal",
    "Agroestologico e Alimentação Animal": "Agrostológico e Alimentação Animal",
    "Setor Algodo": "Setor Algodão",
    "Setor Algodão": "Setor Algodão",
    "Setor Erva mate": "Setor Erva-mate",
    "Setor Pisicultura": "Setor Piscicultura",
    "Purun": "Gado Purunã",
    "Purunã": "Gado Purunã",
    "Inscrio": "Inscrição & Recepção",
    "Inscrição": "Inscrição & Recepção",
    "Maquinario agricola": "Maquinário Agrícola",
    "Horta Mandala": "Horta Mandala",
    "Horta Medicinal": "Horta Medicinal",
    "Horta SPDH": "Horta SPDH",
    "PUCPR": "PUCPR",
}

# Descriptions per normalized location name
descriptions = {
    "Ovinocultura": "Setor de criação e manejo de ovinos, reprodução, melhoramento genético e sanidade do rebanho.",
    "Setor Drone": "Demonstração técnica de drones agrícolas para pulverização de precisão, mapeamento multiespectral e telemetria.",
    "Maquinário Agrícola": "Exposição de tratores didáticos, plantadeiras, implementos de solo e dinâmicas de calibração de máquinas.",
    "Bovinocultura de leite": "Sala de ordenha mecânica canalizada, resfriador a granel, manejo nutricional e rigorosa trava de carência sanitária.",
    "Inseminação Artificial": "Laboratório de biotecnologia reprodutiva animal, botijões de nitrogênio, descongelamento de sêmen e protocolo IATF.",
    "Agroindústria Animal": "Processamento e agregação de valor: queijos, iogurtes, doce de leite, embutidos e boas práticas higiênico-sanitárias.",
    "Setor Café": "Cultivo de cafeeiros, arquitetura de plantas, manejo de poda, colheita seletiva e métodos de secagem em terreiro suspenso.",
    "Setor Tecnologias de Irrigação": "Sistemas de gotejamento por pressão positiva, microaspersão para hortaliças e automação de fertirrigação.",
    "Morango Semi-hidropônico": "Produção em bancadas suspensas com slabs e casca de arroz carbonizada, livre de contato com o solo e com alta doçura.",
    "Cunicultura": "Criação didática de coelhos das raças Nova Zelândia e Califórnia, manejo de ninhos e conversão alimentar.",
    "Agrostológico e Alimentação Animal": "Bancos forrageiros orgânicos, capim elefante, leguminosas e integração agroecológica para nutrição sustentável.",
    "Setor Soja": "Parcelas de avaliação de cultivares comerciais de soja, plantio direto, inoculação biológica e manejo integrado de pragas.",
    "Setor Milho": "Cultivo de híbridos de milho para silagem da bovinocultura de leite e produção de grãos para a fábrica de ração do CAET.",
    "Setor Trigo": "Cultura de inverno essencial no sistema de rotação com cobertura de solo e sustentabilidade do plantio direto.",
    "Setor Algodão": "Parcelas demonstrativas do algodoeiro, estágios fenológicos, controle do bicudo e amostragem de rendimento de pluma.",
    "Setor Erva-mate": "Sistema agroflorestal de erva-mate nativa, podas de conformação e resgate da tradição ervateira paranaense.",
    "Suinocultura": "Galpões de matrizes, maternidade com escamoteadores, creche, terminação e manejo técnico de dejetos.",
    "Setor Biodigestor": "Reator anaeróbio que converte dejetos da suinocultura em biogás energético e biofertilizante líquido para as lavouras.",
    "Setor Piscicultura": "Viveiros escavados de tilápias, controle de oxigênio dissolvido, biometrias e arraçoamento balanceado.",
    "Galinha de postura": "Galpão de postura comercial, coleta de ovos, manejo nutricional por fase e controle diário de produtividade.",
    "Horta Mandala": "Sistema agroecológico circular inspirado na permacultura, otimizando irrigação, consórcio de espécies e ciclagem de nutrientes.",
    "Gado Purunã": "Raça bovina paranaense (IAPAR): rusticidade e marmoreio através do cruzamento Charolês, Angus, Caracu e Canchim.",
    "Meliponicultura": "Meliponário didático com abelhas nativas sem ferrão (Jataí, Mandaçaia, Mirim) fundamentais para a polinização da fazenda.",
    "Frango de corte": "Aviário didático de engorda, ventilação em pressão negativa, nebulização, pesagens e ganho de peso diário.",
    "Inscrição & Recepção": "Portaria principal de recepção, credenciamento de caravanas, entrega de crachás e mapas informativos.",
    "Ponto de Água 1": "Estação de hidratação e bebedouros de água filtrada e gelada para visitantes na entrada principal.",
    "Água": "Ponto central de água potável no entroncamento principal das Unidades Didático-Produtivas.",
    "Estacionamento Visitantes": "Vagas reservadas para veículos leves, vans e ônibus de colégios da região oeste do Paraná.",
    "Horta Medicinal": "Cultivo didático de plantas bioativas e fitoterápicas, identificação botânica, princípios ativos e secagem.",
    "Horta SPDH": "Sistema de Plantio Direto de Hortaliças com cobertura permanente do solo, redução de revolvimento e equilíbrio biológico.",
    "PUCPR": "Estande institucional da Pontifícia Universidade Católica do Paraná (Campus Toledo) com mostra de cursos e parcerias acadêmicas.",
}

# Categories definition
categories = {
    "Agricultura": {
        "icon": "sprout",
        "color": "#16a34a",
        "bg": "#dcfce7",
        "badge": "🌱 AGRICULTURA",
    },
    "Produção Animal": {
        "icon": "cow",
        "color": "#b45309",
        "bg": "#fef3c7",
        "badge": "🐄 PRODUÇÃO ANIMAL",
    },
    "Infraestrutura & Máquinas": {
        "icon": "cog",
        "color": "#2563eb",
        "bg": "#dbeafe",
        "badge": "⚙️ INFRAESTRUTURA",
    },
    "Serviços": {
        "icon": "info",
        "color": "#0891b2",
        "bg": "#cffafe",
        "badge": "ℹ️ SERVIÇOS",
    },
    "Estacionamento": {
        "icon": "parking",
        "color": "#7c3aed",
        "bg": "#ede9fe",
        "badge": "🚗 ESTACIONAMENTO",
    },
    "Parceiros": {
        "icon": "university",
        "color": "#881337",
        "bg": "#ffe4e6",
        "badge": "🎓 PARCEIROS",
    },
}


def get_category(name):
    low = name.lower()
    if any(k in low for k in ["café", "irrigação", "morango", "soja", "milho", "trigo", "algodão", "erva-mate", "erva mate", "horta"]):
        return "Agricultura"
    if any(k in low for k in ["ovinocultura", "bovinocultura", "inseminação", "agroindústria", "cunicultura", "agrostológico", "agroecológico", "suinocultura", "piscicultura", "galinha", "purunã", "meliponicultura", "frango"]):
        return "Produção Animal"
    if any(k in low for k in ["drone", "maquinário", "biodigestor"]):
        return "Infraestrutura & Máquinas"
    if any(k in low for k in ["inscrição", "água"]):
        return "Serviços"
    if "estacionamento" in low:
        return "Estacionamento"
    if "pucpr" in low:
        return "Parceiros"
    return "Outros"


locations = []
parking_polygons = []
water_count = 0

for pm in root.findall(".//kml:Placemark", ns):
    name_el = pm.find("kml:name", ns)
    raw_name = name_el.text.strip() if name_el is not None and name_el.text else ""

    if not raw_name or "sem t" in raw_name.lower():
        continue

    coords_el = pm.find(".//kml:coordinates", ns)
    poly_el = pm.find(".//kml:Polygon", ns)
    coords_raw = coords_el.text.strip() if coords_el is not None and coords_el.text else ""

    if poly_el is not None:
        name = "Área do Estacionamento"
        cat = get_category(raw_name)
        cat_info = categories[cat]
        ring = []
        for pt in coords_raw.split():
            parts = pt.split(",")
            if len(parts) >= 2:
                lng = float(parts[0])
                lat = float(parts[1])
                ring.append([lat, lng])
        parking_polygons.append({
            "name": name,
            "category": cat,
            "color": cat_info["color"],
            "coordinates": ring,
        })
    else:
        parts = coords_raw.split(",")
        if len(parts) >= 2:
            lng = float(parts[0])
            lat = float(parts[1])
            elev = float(parts[2]) if len(parts) > 2 else 0.0

            if raw_name in ("Água", "gua"):
                water_count += 1
                name = "Ponto de Água 1" if water_count == 1 else "Água"
                icon = "droplet"
            elif raw_name == "Estacionamento":
                name = "Estacionamento Visitantes"
                icon = None
            else:
                name = name_corrections.get(raw_name, raw_name)
                icon = None

            cat = get_category(name)
            cat_info = categories.get(cat, categories["Serviços"])

            locations.append({
                "id": f"loc-{len(locations)+1}",
                "name": name,
                "category": cat,
                "badge": cat_info["badge"],
                "icon": icon or cat_info["icon"],
                "color": cat_info["color"],
                "lat": lat,
                "lng": lng,
                "elevation": round(elev, 1),
                "description": descriptions.get(name, f"Setor {name} na Mostra Técnica do CAET."),
            })

data = {
    "title": "Mostra Técnica CAET - Mapa do Evento",
    "center": [-24.787750, -53.726500],
    "defaultZoom": 17,
    "categories": list(categories.keys()),
    "locations": locations,
    "polygons": parking_polygons,
}

with open(r"C:/Lucas/mostra-tecnica-mapa/data/locations.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Generated {len(locations)} locations and {len(parking_polygons)} polygon(s).")
