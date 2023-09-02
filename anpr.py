from bs4 import BeautifulSoup

def values(self):
    with open('worker.html', 'r') as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    input_tag = soup.find('input', {'id': 'vehicle-number'})


    with open('worker.html', 'w') as file:
        file.write(str(soup))