# Frases para Rivania

Este é o meu primeiro projeto solo, criado com o objetivo de surpreender minha namorada com frases românticas ou inspiradoras e fotos de momentos especiais. Além disso, decidi utilizar tecnologias atuais para desenvolver e implementar a aplicação.

## Tecnologias Utilizadas

- HTML5
- SASS
- JavaScript (Vanilla)
- Node.js (para o deploy no Netlify)
- Selenium Python

## Funcionalidades

- Integração com a API do Spotify para:
  - Autenticação com a API do Spotify
  - Persistência dos tokens obtidos após autenticação através do armazenamento local
  - Identificar dispositivos ativos
  - Mostrar música tocando atualmente
  - Controle de play/pause das músicas
  - Selecionar a próxima música / música anterior
- Deploy no Netlify com:
  - Criação de variáveis de ambiente
  - Utilização de funções do Netlify para ocultar essas variáveis ao inspecionar a página
- Troca de temas:
  - A partir de botão
  - De acordo com a hora do dia
- Exibição de frases aleatórias:
  - Ao abrir a página
  - Atualização automática a cada 5 minutos
- Exibição de fotos aleatórias:
  - Ao abrir a página
  - Atualização automática a cada 5 minutos
- Relógio e calendário
- Responsividade em três tamanhos de tela:
  - Telas menores que 768px
  - Telas entre 769px e 1024px
  - Telas maiores que 1024px
- Estilização:
  - Utilização de SASS
  - Importação de fontes através do Google Fonts
  - Reset CSS através do reset CDN
- Testes automatizados pelo Selenium Python

## Como Executar

A aplicação está disponível através deste link: https://frases-para-rivania.netlify.app/.

*Observação: Por proteção da API do Spotify, infelizmente a autenticação não funcionará para usuários externos, pois o aplicativo possui apenas a permissão de desenvolvedor, não de ser público. Portanto, algumas funcionalidades que dependem da autenticação do Spotify podem não funcionar corretamente.*
Caso queira testar em sua máquina, favor acessar [este README](./README(rodarLocalmente).md)

## Como Testar

Para garantir a qualidade da aplicação, foram realizados testes automatizados pelo Selenium Python. Esses testes verificam se algumas funcionalidades principais da aplicação estão funcionando corretamente.

Para obter mais detalhes sobre como executar os testes automatizados, consulte os arquivos README específicos de testes disponíveis em nosso repositório. Você pode acessar o README específico do [Pycharm](./src/tests/README(Pycharm).md) ou do [VS Code](./src/tests/README(VSCode).md), de acordo com a ferramenta que você estiver utilizando.

------

Com este projeto, pude desenvolver minhas habilidades em diversas tecnologias, além de criar algo significativo para minha namorada. Espero que este projeto possa inspirar outros desenvolvedores e possa ajudar a melhorar suas habilidades!