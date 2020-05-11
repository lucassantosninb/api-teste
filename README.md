# api-teste
API simples feita em NodeJS + Mongo + Express. Recursos de infraestrutura para log e monitoramento. 

<br>

## Pré-requisitos:

- [docker](https://docs.docker.com/engine/install/) instalado.
- [docker-compose](https://docs.docker.com/compose/install/) instalado.
- [jq](https://github.com/stedolan/jq/wiki/Installation) instalado.

<br>

## Infraestrutura:

- Gateway: na borda Nginx com "auth basic" para autenticação da API;

- API: aplicação construída em NodeJS, framework Express + Mongoose (lib de comunicação com o MongoDB);

- Banco de dados: persistência grava em banco não relacional MongoDB serviando a API e o Graylog;

- Prometheus: scraping de métricas para monitoramento;

- Node-exporter: expor métricas de hardware e SO;

- cAdivisor: análise de recurso, uso e performance dos containers;

- Grafana: painel de visualização das métricas;

- Elasticsearch: mecanismo de busca e análise de dados;

- Graylog: gerenciador e agregador de logs;

- Logspout: roteador de logs de containers baseado em GELF;

<br>

## Subir infraestrutura:

Para iniciar as aplicações execute o docker-compose:
```
$ docker-compose up --detach --build
```
Os logs de inicialização podem ser acompanhados pelo comando:
```
$ docker-compose logs --follow
```
Agora é necessário habilitar o "input" no Graylog para que o mesmo passe realizar a coleta dos logs. <br>
Para isso foi criado um script que consome a API do Graylog automatizando esse processo. Certifique-se de que o Graylog subiu e está saudável:
```
$ docker-compose logs graylog | grep -q 'Graylog server up and running' || echo "Graylog server subindo..."
```
Dê permissão de execução para o script e passe como parâmetro a senha de admin do Graylog (**mygraylog**):
```
$ chmod +x api-graylog-udp-input.sh
$ ./api-graylog-udp-input mygraylog
```

<br>

## Consumir a API:

A API está disponível através do endereço: <br>

API Carros: http://localhost/api/carros <br>
User: *user1* <br>
Password: *myapi* <br>

<br>

**Implementações:**

A validação dos endpoints faz-se necessário user/password e estão descritas abaixo utilizando o _cURL_: <br>
_(PS.: Substitua os devidos valores "X")_ 

<br>

// POST: cadastra carro
```
$ curl -sS -X POST -u 'user1:myapi' 'http://localhost/api/carros' \
-H 'content-type: application/json' \
-d '{ 
  "Cor": "XXX",
	"Placa": "XXXX-XXXX",
	"Ano": "XXXX",
	"Modelo": "XXXX"
}' | jq
```
// GET: busca todos os registros
```
$ curl -sS -X GET -u 'user1:myapi' 'http://localhost/api/carros' | jq
```
// GET: busca p/ id
```
$ curl -sS -X GET -u 'user1:myapi' 'http://localhost/api/carros/{id}' | jq
```
// PUT: altera um registro
```
$ curl -sS -X PUT -u 'user1:myapi' 'http://localhost/api/carros/{id}' \
-H 'content-type: application/json' \
-d '{ 
  "Cor": "XXX",
	"Placa": "XXXX-XXXX",
	"Ano": "XXXX",
	"Modelo": "XXXX"
}' | jq
```
// DELETE: remove um registro
```
$ curl -sS -X DELETE -u 'user1:myapi' 'http://localhost/api/carros/{id}' -H 'content-type: application/json' | jq
```

<br>

## Graylog:

Graylog: http://localhost:9000 <br>
User: *admin* <br>
Password: *mygraylog* <br>

Após login na console é possível vizualisar os logs já coletados clicando no menú _"Search"_.

<br>

## Grafana:

Grafana: http://localhost:3000 <br>
User: *admin* <br>
Password: *mygrafana* <br>

Foi pré-configurado um dashboard de monitoramento baseado em nossa stack de infraestrutura e containers.



