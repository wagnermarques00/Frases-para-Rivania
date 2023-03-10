## Lembrete: Como fiz uma variável de ambiente funcionar pelo Netlify com Vanilla JS

Este readme irá te guiar em como configurar uma variável de ambiente para sua aplicação usando o Netlify e Vanilla JS. Lembrando que esta é minha experiência do caso, e que podem haver diversas outras formas de o fazer.

### Passo 1:  Deploy inicial na Netlify

O primeiro passo é fazer o deploy inicial do seu projeto na Netlify. Para isso, você pode seguir a documentação oficial da Netlify sobre [como fazer o deploy do seu site](https://docs.netlify.com/site-deploys/create-deploys/) e [como fazer o deploy de funções Netlify](https://docs.netlify.com/functions/build-with-javascript/).

### Passo 2:  Instalar as dependências

Você precisará instalar as  que se encontram no  `package.json` . Abaixo consta o exemplo do meu:

```
{
	"devDependencies": {
		"concurrently": "^7.6.0",
		"http-server": "^14.1.1",
		"netlify-cli": "^13.0.1"
	},
	"scripts": {
		"dev": "http-server src -p 8080",
		"netlify": "./node_modules/.bin/netlify"
	}
}
```

Para instalar as dependências, basta rodar o comando `npm install` ou `yarn` no terminal dentro do diretório do seu projeto.

### Passo 3:  Criar o arquivo netlify.toml

Crie um arquivo `netlify.toml` na raiz do seu projeto e adicione o seguinte conteúdo:

```
[build]
  functions = "./src/js/netlify/functions"
  publish = "./"

[[headers]]
  for = "/"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Origin, X-Requested-With, Content-Type, Accept, Authorization"
```

Este arquivo é onde você define as configurações específicas do deploy do Netlify. No exemplo acima, estamos definindo onde ficam as funções Netlify e quais são as configurações de headers para o site.

### Passo 4:  Criar as variáveis de ambiente

Crie as variáveis de ambiente que você deseja usar no seu projeto. Você pode fazer isso diretamente no site da Netlify, sem precisar usar o Netlify CLI. Basta ir na seção "Build & Deploy" do seu site na Netlify, e depois em "Environment".

### Passo 5:  Criar um método em JavaScript que acesse as variáveis de ambiente

Crie um método em JavaScript que acesse as variáveis de ambiente que você criou no passo anterior. Aqui está um exemplo de como você pode fazer isso usando a biblioteca `process.env`:

```
const handler = async () => {
	const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
	const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
	const auth = {
		id: SPOTIFY_CLIENT_ID,
		secret: SPOTIFY_CLIENT_SECRET,
	};

	return {
		statusCode: 200,
		body: JSON.stringify(auth),
	};
};

module.exports = { handler };
```

No exemplo acima, estamos acessando as variáveis de ambiente `SPOTIFY_CLIENT_ID` e `SPOTIFY_CLIENT_SECRET` e retornando um objeto com esses valores.

### Passo 6:  Teste local

Para testar localmente, você pode usar o comando `yarn netlify dev`. Mas lembre-se que para que as variáveis de ambiente funcionem, você precisa ter definido elas na Netlify, conforme explicado no passo 4.

### Passo 7:  Deploy

Agora que as variáveis de ambiente estão definidas, você pode fazer o deploy do seu site ou aplicativo para o Netlify. Para fazer isso, vá para a página do seu projeto no Netlify e clique no botão "New site from Git". Selecione o repositório Git que contém o código que você deseja implantar e siga as etapas para configurar a implantação.

### Passo 8:  Usando as variáveis de ambiente em seu código

Agora que as variáveis de ambiente estão definidas e acessíveis no código, basta usá-las da maneira que você precisa. No exemplo do `fetch-spotify.js`, a autenticação do cliente do Spotify é definida usando as variáveis de ambiente `SPOTIFY_CLIENT_ID` e `SPOTIFY_CLIENT_SECRET`.

### Passo 9:  Fazendo o deploy do seu site ou aplicativo

Quando estiver satisfeito com as alterações em seu código, basta fazer o commit e o push para o seu repositório Git. O Netlify irá detectar as alterações e iniciar o processo de implantação. As variáveis de ambiente que você definiu serão usadas durante o processo de implantação.

### Passo 10:  Verificando se as variáveis de ambiente estão funcionando

Depois que a implantação estiver concluída, você pode acessar o site publicado na Netlify e verificar se as variáveis de ambiente estão funcionando conforme o esperado.

Espero que este guia tenha ajudado a entender como definir e usar variáveis de ambiente no Netlify usando Vanilla JS. Se você tiver alguma dúvida ou precisar de mais ajuda, consulte a documentação oficial do Netlify ou deixe um comentário abaixo.