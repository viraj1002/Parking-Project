from flask import Flask, render_template
from bs4 import BeautifulSoup

app = Flask(__name__)

def get_message():
    with open('worker.html', 'r') as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    input_tag = soup.find('input', {'id': 'vehicle-number'})


    with open('worker.html', 'w') as file:
        file.write(str(soup))

@app.route('/')
def home():
    return render_template('worker.html', message=get_message())

if __name__ == '__main__':
    app.run(debug=True)