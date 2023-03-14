# Conexão com Spotify API

Este repositório contém um exemplo de como se conectar à API do Spotify e como utilizar algumas funções básicas do serviço. O código aqui engloba a autenticação com a API do Spotify, persistência dos tokens obtidos após autenticação através de local storage, identificação de dispositivos ativos, visualização da música tocando atualmente, play/pause das músicas, e a seleção da próxima música ou música anterior.

## Autenticação com a API do Spotify

Para conseguir autenticar na API do Spotify, é necessário seguir alguns passos. Primeiramente, é necessário cadastrar uma nova API dentro do site do Spotify e obter o CLIENT_ID e o CLIENT_SECRET. Após isso, é necessário verificar quais escopos seu software irá utilizar e registrar no Spotify quais links de redirecionamento são permitidos. Com isso, é possível seguir os passos de autenticação de acordo com a referência do Spotify.

## Funcionalidades

- Autenticação com a API do Spotify
- Persistência dos tokens obtidos após autenticação através de local storage
- Identificação de dispositivos ativos
- Visualização da música tocando atualmente
- Play/Pause das músicas
- Seleção da próxima música ou música anterior

## Referências

- Página inicial da API do Spotify: https://developer.spotify.com/documentation/web-api/
- Console pra testar os endpoints direto do site: https://developer.spotify.com/console/
- Fluxo para conseguir uma autorização: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/