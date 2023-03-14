# Testes para o projeto "Frases para Rivania" (Pycharm)

Este projeto é um conjunto de testes automatizados para a página web "Frases para Rivania". Ele usa o Selenium em Python e permite testar o relógio, a imagem, o texto e o tema da página.



## Como executar os testes

Para executar os testes, você precisará ter o PyCharm instalado em sua máquina. Em seguida, siga as instruções abaixo:

1. Baixe ou clone o repositório para sua máquina.
2. Abra o PyCharm e abra o projeto a partir da pasta "tests".
3. Instale as dependências do seu projeto com o comando `pip install -r requirements.txt`. Este comando irá instalar todas as dependências listadas no arquivo requirements.txt.
4. Clique com o botão direito do mouse no arquivo main.py e selecione "Run" ou "Debug" no menu que aparece. Alternativamente, você pode executar o arquivo main.py através do terminal, usando o comando "python main.py".
5. O PyCharm irá executar o arquivo main.py e iniciar o Selenium, que irá abrir o navegador Chrome e navegar para a página do site especificado no código (https://frases-para-rivania.netlify.app/)
6. O Selenium irá executar automaticamente os testes automatizados definidos nos arquivos test_clock.py, test_image.py, test_text.py e test_theme.py. Os resultados dos testes serão exibidos no console do PyCharm.
7. Após a conclusão dos testes, o navegador Chrome será fechado automaticamente pelo Selenium.

Caso ocorra algum erro durante a execução dos testes, o PyCharm exibirá uma mensagem de erro no console e interromperá a execução do arquivo main.py. Neste caso, você deve corrigir o erro e executar novamente o arquivo main.py para rodar todos os testes automatizados novamente.



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