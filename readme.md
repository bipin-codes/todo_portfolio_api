### How to run the api

- install docker desktop if not installed
- run the mongo instance in docker (or install mongodb locally if you want ;) )
  - `docker run --name mongo-instance -d mongo:latest`
- Interact with mongodb running inside the container
  - `docker exec -it mongo-instance mongosh`
- run the program
  - `npm run start:dev`
