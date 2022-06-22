FROM mysql:5.7
WORKDIR /usr
COPY createTables.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
