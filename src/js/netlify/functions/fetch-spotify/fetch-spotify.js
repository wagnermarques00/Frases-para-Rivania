// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

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
