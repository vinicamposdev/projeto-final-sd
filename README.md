<h1 align="center">Uso de RabbitMQ no Monitoramento Climático</h1>
<p align="center">
    <strong>Projeto Final COM242.1 - Sistemas Distribuído, UNIFEI 2º Semestre 2020, Profº RAFAEL DE MAGALHAES DIAS FRINHANI</strong>
</p>
<ul>
<col>
    <img alt="Docker" src="https://img.shields.io/badge/-Docker-46a2f1?style=flat-square&logo=docker&logoColor=white" />
</col>
<col>
    <img alt="MongoDB"
src="https://img.shields.io/badge/-MongoDB-13aa52?style=flat-square&logo=mongodb&logoColor=white" />
</col>
<col>
    <img alt="Nodejs"
src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white" />
</col>
<col>
    <img alt="LicenseMIT" src="https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square" />
</col>

</ul>


## Uso do Docker:

### Inicialização

docker-compose up --build

docker exec -ti <container-namo or container-id> bash

## Execução dos producers na máquina local

```shell
 $ curl http://localhost:3001/temperature 
 > {"message":"Hello World!"}
```

E o restante dos outros vão ser as portas 3001, 3002, 3003, 3004. 
