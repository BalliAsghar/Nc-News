# NCNews

**Api Built with ExpressJS & PSQL**

**_[Interact with api](https://nc-news-200.herokuapp.com/)_**

### Front-End

**_[Front-End Repo ](https://github.com/BalliAsghar/NC-News-FrontEnd)_**

## Summary

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

## Tech Stack

**Back-End:** Node, ExpressJS, PSQL

**Development:** Nodemon, Supertest, Jest, Jest-Sorted

## Installation

Install Nc-News

##### Make sure you have **git** Installed

```bash
 $ git clone https://github.com/BalliAsghar/Nc-News
```

#### Project Requirements

```
$ node -v
>= v16.6.1
$ postgres -V
>= 14.0
```

#### Create two .env files in Project Root directory

1:

```
$ touch .env.development
```

2:

```
$ touch .env.test
```

#### Add database config to envs

1: .env.test

```
PGDATABASE=nc_news_test
```

2: .env.development

```
PGDATABASE=nc_news
```

#### Install dependencies

```
$ npm install
```

#### Seed database

```
$ npm run setup-dbs
$ npm run seed
```

### To Run Server

```bash
  npm run start
```

### To Run Tests

```bash
  npm run test
```

# Endpoints

All the available Endpoints

## Index Route

`GET / `

## Response

```bash
{"message":"Hello"}
```

## Api Route

`GET /api`

**_Serves up a json representation of all the available endpoints of the api_**

### Get Topics

`/api/topics`

## Response

```json
{
    "topics": [
    {
      "slug": "coding",
      "description": "Code is love, code is life"
    },
    ....
]
}
```

## Get Articles

`GET /api/articles`

accept queries:

- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `topic`, which filters the articles by the topic value specified in the query
- `limit`, which limits the number of responses (defaults to 10)
- `p`, stands for page which specifies the page at which to start (calculated using limit)

## Response

```json
{
  "Articles": [
    {
      "article_id": 34,
      "title": "The Notorious MSG’s Unlikely Formula For Success",
      "author": "grumpy19",
      "topic": "cooking",
      "created_at": "2020-11-22T00:00:00.000Z",
      "votes": 0,
      "comment_count": 11
    },
    ....
  ]
}
```

### GET Article By Id

`GET /api/articles/:articles_id`

## Response

```json
// /api/articles/1
{
  "Article": {
    "article_id": 1,
    "title": "Running a Node App",
    "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
    "votes": 0,
    "topic": "coding",
    "author": "jessjelly",
    "created_at": "2020-11-07T00:00:00.000Z",
    "comment_count": 8
  }
}
```

## Update Article vote

`PATCH /api/articles/:article_id`

**Request body accepts:** `{ inc_votes: newVote }`

**Note:** newVote should be **Number**

## Response

```json
// PATCH /api/articles/1
// example request body { inc_votes: 1 }
{
  "Article": {
    "article_id": 1,
    "title": "Running a Node App",
    "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
    "votes": 1,
    "topic": "coding",
    "author": "jessjelly",
    "created_at": "2020-11-07T00:00:00.000Z"
  }
}
```

## Get Comments for corresponding Articles

`GET /api/articles/:article_id/comments`

## Response

```json
// GET /api/articles/1/comments
{
  "comments": [
    {
      "comment_id": 31,
      "author": "weegembump",
      "article_id": 1,
      "votes": 11,
      "created_at": "2020-09-26T00:00:00.000Z",
      "body": "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore."
    },
    ....
  ]
}
```

## Post a comment on article

`POST /api/articles/:article_id/comments`

**Request body accepts:** `{username: username, body: comment }`

_Example request body_
`{ "username": "tickle122", "body": "This is a Comment" }`

## Response

```json
// POST /api/articles/1/comments

// Response
{
  "comment": {
    "comment_id": 301,
    "author": "tickle122",
    "article_id": 1,
    "votes": 0,
    "created_at": "2021-11-05T00:00:00.000Z",
    "body": "Comment"
  }
}
```

## Delete comment By ID

`DELETE /api/comments/:comment_id`

**NOTE:** \*This endpoint sends back **204** Status code on successful request , NO **body**

# Users

## Get Users

`GET /api/users`

## Response

```json
{
  "users": [
    {
      "username": "tickle122"
    },
    {
      "username": "grumpy19"
    },
    ....
  ]
}
```

## Get User By Id

`GET /api/users/:username`

## Response

```json
{
// GET - /api/users/tickle122
{
  "user": {
    "username": "tickle122",
    "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
    "name": "Tom Tickle"
  }
}
```

# Update Comment Vote

`PATCH /api/comments/:comment_id`

## Response

**Request body accepts:** `{ inc_votes: newVote }`

```json
//PATCH /api/comments/4/comments
// example request body { inc_votes: 1 }
{
  "comment": {
    "comment_id": 2,
    "author": "grumpy19",
    "article_id": 4,
    "votes": 8,
    "created_at": "2020-01-01T00:00:00.000Z",
    "body": "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam."
  }
}
```
