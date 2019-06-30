# Language Game (boardgame-server)
A simple language game where you try to translate words using images as hints.

# How to test...

To test the game you'll need a `api-key` for the translations and images,
currently only [yandex](https://tech.yandex.com/translate/) and [pixabay](https://pixabay.com/api/docs/) are suported, both a free.

Create a file `.env` at the root folder with the content:
```
YANDEX_KEY=<your api key>
PIXABAY_KEY=<your api key>
```

After tha, you'll just need to install the dependencies and run:
```
npm install
npm start
```