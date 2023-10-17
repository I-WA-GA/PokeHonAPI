from flask import Flask, render_template, request, make_response
from flask_cors import CORS

from googletrans import Translator
import pyttsx3
import requests
import random
import os

app = Flask(__name__)
CORS(app)

engine = pyttsx3.init()

# ポケモンAPIのベースURL
base_url = 'https://pokeapi.co/api/v2/pokemon/'

translator = Translator()

# ランダムなポケモンの取得
def get_random_pokemon():
    pokemon_id = random.randint(1, 151)
    response = requests.get(f'{base_url}{pokemon_id}')
    if response.status_code == 200:
        pokemon_data = response.json()
        return pokemon_data
    else:
        return None

# 履歴を格納するリスト
translation_history = []

# ルートパスへのリクエストを処理する
@app.route("/")
def index():
    pokemon_data = get_random_pokemon()
    translation_history = request.cookies.get('translation_history')
    if translation_history:
        translation_history = eval(translation_history)
    else:
        translation_history = []
    return render_template('index.html', pokemon_data=pokemon_data, translation_history=translation_history)

# /translate ルートを追加し、翻訳を実行
@app.route("/translate", methods=["POST"])
def translate():
    if request.method == "POST":
        text = request.form["text"]
        target_lang = request.form["target_lang"]
        
        # 翻訳
        translated_text = call_google_translate(text, target_lang)
        
        translation_history = request.cookies.get('translation_history')
        if translation_history:
            translation_history = eval(translation_history)
        else:
            translation_history = []
        translation_history.append((text, translated_text))
        
        response = make_response(render_template('index.html', text=text, translated_text=translated_text, pokemon_data=get_random_pokemon(), translation_history=translation_history))
        response.set_cookie('translation_history', str(translation_history))

        read_text_aloud(translated_text)

        return response

def call_google_translate(text, target_lang):
    # googletransを使用して翻訳
    translated_text = translator.translate(text, dest=target_lang).text
    return translated_text

def read_text_aloud(text):
    engine.say(text)
    engine.runAndWait()

# if __name__ == "__main__":
#     app.debug = False
#     app.run(debug=False, host='172.16.0.124', port=5000)


if __name__ == "__main__":
    app.run(debug=True)
    

