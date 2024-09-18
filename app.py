from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'

def generate_response(message, language='en'):
    # Customize the prompt based on the language
    if language == 'es':
        prompt = f"Respond in Spanish: {message}"
    elif language == 'fr':
        prompt = f"Respond in French: {message}"
    else:
        prompt = message
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )
    return response.choices[0].text.strip()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    language = data.get('language', 'en')
    
    response = generate_response(message, language)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
