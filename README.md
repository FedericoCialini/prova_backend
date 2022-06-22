# ENV

nella cartella /backend bisogna completare un file .env cosi strutturato:

DB_NAME=

DB_PASS=

DB_USER=

DB_PORT=

DB_PORT_TEST=3306

DB_HOST=

DB_HOST_TEST=localhost

dove bisogna inserire le informazioni del server mysql.

# AVVIO SERVER

Per far partire il server bisogna inserire le seguenti istruzioni da terminale:

cd ./backend

npm install

docker build -t prova_node .

docker run -p 5000:5000 prova_node

# ESEGUIRE I TEST

dalla cartella provabackend:

docker-compose up

su un altro terminale:

cd backend/

npm run test


# ENDPOINTS

alcuni esempi:

api/projects GET => ritorna lista di jobs associati al project

api/projects POST => aggiunge progetto e job associati

api/projects/:pid GET => ritorna il project con la sua lista di jobs

api/jobs GET => ritorna l'elenco dei jobs

api/jobs?status=<status>  GET=> ritorna l'elenco dei jobs con lo status passato 
  
api/jobs?order=<ASC|DESC> GET=> ritorna la lista di jobs con l'ordine passato per creationDate.

api/jobs?status=<status>&order=<ASC|DESC> => ritorna la lista di jobs filtrata per status e con l'ordinamento passato per creationDate
  
api/jobs/:pid POST => aggiunge il job al project
  
api/jobs:id PATCH => aggiorna dei campi del job

