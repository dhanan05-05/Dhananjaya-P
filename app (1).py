from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3"

def generate_mindmap(topic):
    prompt = f"""
Create a simple mind map outline for the topic below.

Rules:
- Do NOT use bullets
- Do NOT use numbers
- Each point must be on a new line
- Keep points short

Topic: {topic}
"""


    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)

    result = response.json()["response"]
    return result


@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    topic = data.get("topic")

    if not topic:
        return jsonify({"error": "Topic is required"}), 400

    outline = generate_mindmap(topic)

    return jsonify({
        "topic": topic,
        "outline": outline
    })


if __name__ == "__main__":
    app.run(debug=True)


