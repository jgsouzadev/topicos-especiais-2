## Retorna todos os usuários principais.

$ curl http://localhost:3000/principals

## Cria um novo usuário.

curl -X POST -H "Content-Type: application/json" -d '{"name":"Joaozinho", "email":"user@gmail.com"}' http://localhost:3000/principal

## Altera o nome do usuário
curl -X PUT -H "Content-Type: application/json" -d '{ "name":"Joaozinho" }' http://localhost:3000/principal/1

## Deleta um su usuario por id.
curl -X DELETE http://localhost:3000/principal/1


## ---------------------------------------------------------------------------

## Retorna todos os sub users.

$ curl http://localhost:3000/subs

## Retorna um sub user pelo id.

$ curl http://localhost:3000/sub/1


## Cria um novo sub usuario
curl -X POST -H "Content-Type: application/json" -d '{"title":"Filho do joão", "principalEmail":"user@gmail.com"}' http://localhost:3000/sub

## Deixa o usuário como released(ativo) por id
curl -X PUT http://localhost:3000/sub/release/2

## Deleta um sub usuario por id.
curl -X DELETE http://localhost:3000/sub/1
