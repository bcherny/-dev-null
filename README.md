# ack.mo (aka. the working title)

## Global deps

```
brew install couchdb node
npm install -g babel gulp nodemon react-tools
```

## building the frontend

```
cd www
bower i
gulp
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