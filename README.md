# Test Backend

## Run the server

```
npm i
npm run start
```

## Run the server use docker

```
docker-compose up
```

### End point for save data

```
curl --location 'http://localhost:5000/api/memory/save' \
--header 'Content-Type: application/json' \
--data '{
    "userID":"dacec889-1863-4fc0-a76c-af5c4492bd07",
    "gameDate": "2025-04-21",
    "failed": 0,
    "difficulty": "Easy",
    "completed": 1,
    "timeTaken": 7
}'
```


### End point for get data

```
curl --location 'http://localhost:5000/api/memory/list'
```