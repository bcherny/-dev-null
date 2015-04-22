[![Circle CI](https://circleci.com/gh/pathikrit/-dev-null/tree/master.svg?style=svg)](https://circleci.com/gh/pathikrit/-dev-null/tree/master)

# ack.mo (aka. the working title)

## Global deps

```
brew install couchdb nodejs
npm install -g gulp nodemon
```

## building the frontend

```
cd www
npm i
gulp # or, "gulp watch" for developing
```

## start the db
```
couchdb -b
curl http://127.0.0.1:5984/
```

## starting the server

```
cd server
npm i
npm start
```
