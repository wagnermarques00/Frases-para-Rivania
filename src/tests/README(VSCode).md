# Testes para o projeto "Frases para Rivania" (VS Code)

Este projeto é um conjunto de testes automatizados para a página web "Frases para Rivania". Ele usa o Selenium em Python e permite testar o relógio, a imagem, o texto e o tema da página.



## Como executar os testes

Para executar os testes, siga as instruções abaixo:

1. Baixe ou clone o repositório para sua máquina.
2. Abra o VS Code e abra a pasta do projeto "tests".
3. Abra um terminal no VS Code na pasta do projeto "tests".
4. Instale as dependências do seu projeto com o comando `pip install -r requirements.txt`. Este comando irá instalar todas as dependências listadas no arquivo requirements.txt.
5. Abra o arquivo main.py dentro do VS Code e clique no botão "Run Python File", que aparece no canto superior direito do editor. Alternativamente, você pode executar o arquivo main.py através do terminal, usando o comando "python main.py".
6. O Selenium irá abrir o navegador Chrome e navegar para a página do site especificado no código (https://frases-para-rivania.netlify.app/)
7. O Selenium irá executar automaticamente os testes automatizados definidos nos arquivos test_clock.py, test_image.py, test_text.py e test_theme.py. Os resultados dos testes serão exibidos no terminal do VS Code.
8. Após a conclusão dos testes, o navegador Chrome será fechado automaticamente pelo Selenium.

Caso ocorra algum erro durante a execução dos testes, o terminal do VS Code exibirá uma mensagem de erro e interromperá a execução do arquivo main.py. Neste caso, você deve corrigir o erro e executar novamente o comando `python main.py` para rodar todos os testes automatizados novamente.



## Arquivos no projeto

- main.py: arquivo principal que chama todos os testes.
- test_clock.py: arquivo com o teste automatizado para verificar se o relógio da página está correto.
- test_image.py: arquivo com o teste automatizado para verificar se a imagem da página mudou.
- test_text.py: arquivo com o teste automatizado para verificar se o texto da página mudou.
- test_theme.py: arquivo com o teste automatizado para verificar se o tema da página mudou.
- utils.py: arquivo com funções utilitárias usadas nos testes automatizados.



## Observações

- O ChromeDriver deve estar instalado em sua máquina. Você pode fazer o download do ChromeDriver [aqui](https://sites.google.com/chromium.org/driver/downloads?authuser=0).
- Certifique-se de abrir o terminal na pasta do projeto "tests" antes de executar o comando `python main.py`.