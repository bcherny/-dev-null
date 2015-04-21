# ack.mo (aka. the working title)

## Global deps

```
brew install couchdb node
npm install -g nodemon
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
