#STAGE 1: ZIP SOURCE CODE
FROM --platform=amd64 node:18-alpine AS src

WORKDIR /usr/src/

COPY . .

RUN tar -czvf appRehabilyTec.tar.gz ./


#STAGE 2: BUILD AND RUN PROJECT
FROM --platform=amd64 node:18-alpine

WORKDIR /usr/app/

COPY --from=src /usr/src/appRehabilyTec.tar.gz /usr/app/

EXPOSE 80

RUN tar -xzvf appRehabilyTec.tar.gz

CMD ["sh","entry-point.sh"]