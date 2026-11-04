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
    "Agroestologico e Alimentao Animal": "Agroecológico e Alimentação Animal",
    "Setor Algodo": "Setor Algodão",
    "Setor Algodão": "Setor Algodão",
    "Setor Pisicultura": "Setor Piscicultura",
    "Purun": "Gado Purunã",
    "Purunã": "Gado Purunã",
    "Inscrio": "Inscrição",
    "Inscrição": "Inscrição",
    "gua": "Ponto de Água",
    "Água": "Ponto de Água",
    "Maquinario agricola": "Maquinário Agrícola",
}

# Categories definition
categories = {
    "Agricultura": {
        "icon": "sprout",
        "color": "#16a34a",
        "bg": "#dcfce7",
        "badge": "🌱 AGRICULTURA"
    },
    "Produção Animal": {
        "icon": "cow",
        "color": "#b45309",
        "bg": "#fef3c7",
        "badge": "🐄 PRODUÇÃO ANIMAL"
    },
    "Infraestrutura & Máquinas": {
        "icon": "cog",
        "color": "#2563eb",
        "bg": "#dbeafe",
        "badge": "⚙️ INFRAESTRUTURA"
    },
    "Serviços": {
        "icon": "info",
        "color": "#0891b2",
        "bg": "#cffafe",
        "badge": "ℹ️ SERVIÇOS"
    },
    "Estacionamento": {
        "icon": "parking",
        "color": "#7c3aed",
        "bg": "#ede9fe",
        "badge": "🚗 ESTACIONAMENTO"
    }
}

def get_category(name):
    low = name.lower()
    if any(k in low for k in ["café", "irrigação", "morango", "soja", "milho", "trigo", "algodão", "erva mate"]):
        return "Agricultura"
    if any(k in low for k in ["ovinocultura", "bovinocultura", "inseminação", "agroindústria", "cunicultura", "agroecológico", "suinocultura", "piscicultura", "galinha", "purunã", "meliponicultura", "frango"]):
        return "Produção Animal"
    if any(k in low for k in ["drone", "maquinário", "biodigestor"]):
        return "Infraestrutura & Máquinas"
    if any(k in low for k in ["inscrição", "água"]):
        return "Serviços"
    if "estacionamento" in low:
        return "Estacionamento"
    return "Outros"

locations = []
parking_polygons = []

for pm in root.findall(".//kml:Placemark", ns):
    name_el = pm.find("kml:name", ns)
    raw_name = name_el.text.strip() if name_el is not None and name_el.text else ""
    
    if not raw_name or "sem t" in raw_name.lower():
        continue
        
    name = name_corrections.get(raw_name, raw_name)
    coords_el = pm.find(".//kml:coordinates", ns)
    poly_el = pm.find(".//kml:Polygon", ns)
    coords_raw = coords_el.text.strip() if coords_el is not None and coords_el.text else ""
    
    cat = get_category(name)
    cat_info = categories.get(cat, categories["Serviços"])
    
    if poly_el is not None:
        ring = []
        for pt in coords_raw.split():
            parts = pt.split(",")
            if len(parts) >= 2:
                lng = float(parts[0])
                lat = float(parts[1])
                ring.append([lat, lng])
        parking_polygons.append({
            "name": name,
            "coordinates": ring,
            "color": cat_info["color"],
            "category": cat
        })
    else:
        parts = coords_raw.split(",")
        if len(parts) >= 2:
            lng = float(parts[0])
            lat = float(parts[1])
            elev = float(parts[2]) if len(parts) > 2 else 0
            
            locations.append({
                "id": f"loc-{len(locations)+1}",
                "name": name,
                "category": cat,
                "badge": cat_info["badge"],
                "icon": cat_info["icon"],
                "color": cat_info["color"],
                "lat": lat,
                "lng": lng,
                "elevation": elev,
                "gpsText": f"GPS: {lat:.6f}, {lng:.6f}"
            })

data = {
    "title": "Mostra Técnica CAET - Mapa do Evento",
    "center": [-24.7878, -53.7265],
    "defaultZoom": 17,
    "categories": list(categories.keys()),
    "locations": locations,
    "polygons": parking_polygons
}

with open(r"C:/Lucas/mostra-tecnica-mapa/data/locations.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Generated {len(locations)} locations and {len(parking_polygons)} polygon(s).")
