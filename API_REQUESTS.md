# Documentação de Requisições - BicoJá API

## 1. Cadastrar / Listar Vaga de Emprego

Rota utilizada para gerenciar as vagas disponíveis na aplicação mobile.

> A aplicação atualmente consome `GET /jobs`. O cadastro via `POST /jobs` está documentado como contrato esperado, mas ainda não está implementado no cliente mobile.

### 📥 Request (Requisição - POST / JSON enviado)

```http
POST /jobs
Content-Type: application/json
Accept: application/json
```

O corpo deve seguir a estrutura `Job` definida em `src/types.ts`. O exemplo abaixo completa os campos obrigatórios que não estavam presentes no JSON inicial da vaga:

```json
{
  "id": "1",
  "title": "Instalação de tomadas e disjuntor",
  "category": "Eletricista",
  "contractor": "João Silva",
  "location": "Portal do Sol, João Pessoa - PB",
  "distance": "2.5 km",
  "description": "Necessário eletricista para trocar o quadro de disjuntores e instalar tomadas na cozinha.",
  "postedAt": "Há 2 horas",
  "imageUrl": ""
}
```

`requirements` e `tools` são opcionais. `id`, `distance`, `schedule`, `benefits`, `postedAt` e `imageUrl` são obrigatórios no tipo `Job` usado atualmente pelo app. Se a API gerar o identificador, o contrato do backend e o tipo do cliente devem ser ajustados para refletir isso.

### 📤 Response (Resposta - 200 OK / Retorno da API)

Exemplo de resposta retornada pela API após salvar a vaga:

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "success": true,
  "message": "Vaga salva com sucesso",
  "data": {
    "id": "1",
    "title": "Instalação de tomadas e disjuntor",
    "category": "Eletricista",
    "contractor": "João Silva",
    "location": "Portal do Sol, João Pessoa - PB",
    "distance": "2.5 km",
    "description": "Necessário eletricista para trocar o quadro de disjuntores e instalar tomadas na cozinha.",
    "postedAt": "Há 2 horas"
  }
}
```

O objeto `data` dessa resposta não contém todos os campos obrigatórios do tipo `Job` (`schedule`, `benefits` e `imageUrl`, por exemplo). Para usar essa resposta diretamente no app, o contrato do endpoint deve incluir esses campos ou o cliente deve tratar o objeto parcial separadamente.

### 📥 Request (Requisição - GET / listar vagas)

```http
GET /jobs
Accept: application/json
```

### 📤 Response (Resposta - GET / listar vagas)

A aplicação aceita a lista diretamente ou dentro de uma propriedade `jobs`. Os itens precisam seguir a estrutura `Job`.

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "jobs": [
    {
      "id": "1",
      "title": "Instalação de tomadas e disjuntor",
      "category": "Eletricista",
      "contractor": "João Silva",
      "location": "Portal do Sol, João Pessoa - PB",
      "distance": "2.5 km",
      "description": "Necessário eletricista para trocar o quadro de disjuntores e instalar tomadas na cozinha.",
      "postedAt": "Há 2 horas",
      "imageUrl": ""
    }
  ]
}
```

### Campos de `Job`

| Campo | Tipo | Obrigatório | Observação |
|---|---|---:|---|
| `id` | `string` | Sim | Identificador da vaga. |
| `title` | `string` | Sim | Título do serviço ou da vaga. |
| `category` | `string` | Sim | `Pedreiro`, `Encanador`, `Eletricista`, `Gesseiro`, `Ajudante` ou `Pintor`. |
| `contractor` | `string` | Sim | Nome do contratante. |
| `location` | `string` | Sim | Localização da obra. |
| `distance` | `string` | Sim | Distância apresentada no app. |
| `schedule` | `string` | Sim | Horário ou disponibilidade. |
| `description` | `string` | Sim | Descrição do serviço. |
| `benefits` | `string[]` | Sim | Benefícios reais oferecidos; pode ser uma lista vazia. |
| `requirements` | `string[]` | Não | Requisitos da vaga. |
| `tools` | `string[]` | Não | Informação sobre ferramentas ou materiais. |
| `postedAt` | `string` | Sim | Texto de data/hora de publicação. |

O valor do serviço não é informado como preço fixo: deve ser definido pelo profissional após visita técnica e orçamento presencial.
