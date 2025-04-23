import json
import requests
import time
import os

CLIENT_ID = os.getenv("IGDB_CLIENT_ID")
ACCESS_TOKEN = os.getenv("IGDB_ACCESS_TOKEN")

headers = {
    "Client-ID": CLIENT_ID,
    "Authorization": f"Bearer {ACCESS_TOKEN}"
}

def buscar_imagem_igdb(nome):
    url = "https://api.igdb.com/v4/games"
    query = f'search "{nome}"; fields name, cover.image_id; limit 1;'
    resp = requests.post(url, data=query, headers=headers)
    if resp.status_code == 200:
        data = resp.json()
        if data and "cover" in data[0]:
            return data[0]["cover"]["image_id"]
    return None

with open("games.json", "r", encoding="utf-8") as f:
    jogos = json.load(f)

for jogo in jogos:
    nome = jogo.get("Name")
    if nome:
        print(f"Buscando capa para: {nome}")
        image_id = buscar_imagem_igdb(nome)
        if image_id:
            jogo["CoverImage"] = f"https://images.igdb.com/igdb/image/upload/t_cover_big/{image_id}.jpg"
        else:
            jogo["CoverImage"] = None
        time.sleep(0.3)

with open("games_atualizado_com_capas.json", "w", encoding="utf-8") as f:
    json.dump(jogos, f, ensure_ascii=False, indent=2)

print("✅ Capas atualizadas.")

