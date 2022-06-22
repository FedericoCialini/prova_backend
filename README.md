# test_backend

start test:

docker-composer up 
cd ./backend
npm run test

start server:

cd ./backend
docker build -t prova_node .
docker build -t prova_node .
docker run -p 5000:5000 prova_node

