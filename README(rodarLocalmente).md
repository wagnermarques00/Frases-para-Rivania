# Como rodar o projeto localmente

Este é um guia para rodar localmente o projeto "Frases para Rivania" e fazer alterações.

## Alterando os scripts

No arquivo `index.html`, comente os scripts do Netlify e descomente os scripts locais, como no exemplo abaixo:

```
htmlCopy code<!-- Comente essas linhas -->
<!-- <script src="https://frases-para-rivania.netlify.app/main.js" type="module" defer></script> -->
<!-- <script src="https://frases-para-rivania.netlify.app/src/js/spotify/spotifyApi.js" type="module" defer></script> -->

<!-- Descomente essas linhas -->
<script src="./main.js" type="module" defer></script>
<script src="./src/js/spotify/spotifyApi.js" type="module" defer></script>
```

## Configurando a autenticação no Spotify

Antes de rodar o projeto localmente, é necessário configurar a autenticação no Spotify. Para isso, siga as instruções [deste README](./src/js/spotify/README(spotify).md)

### Rodando localmente sem o Netlify

1. Abra o arquivo `spotifyAuthorization.js`.
2. Troque a constante `REDIRECT_URI` para a URL do servidor local que você estiver usando (ex: `http://localhost:3000`).
3. Troque as variáveis `clientId` e `clientSecret` para as chaves da API do Spotify que você obteve anteriormente.
4. Comente o método `initAuthorization()`.

### Rodando localmente com o Netlify

Para acessar as instruções, por favor, acesse o [README sobre o Netlify](./src/js/netlify/README(Netlify).md).

**Lembre-se de alterar a configuração da autenticação no Spotify antes de rodar o projeto.**