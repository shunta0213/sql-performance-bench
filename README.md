# SQL Performance Check

Based on this [article](https://qiita.com/mmm_qiita/items/0f67a4122876ce468360), benchmark using SQLite

## Tables

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  authorId  Int
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

## SELECT \* VS SELECT id

- users table
- record count: 100000

| SELECT \* | SELECT id |
| :-------: | :-------: |
| 0.062844s | 0.029033s |

## order of WHERE clause

posts table
record count: 1000000

- Query1: `SELECT * FROM posts WHERE published=true AND authorId = 1;`
- Query2: `SELECT * FROM posts WHERE authorId = 1 AND published=true;`

NOTE: `SELECT COUNT(*) FROM posts WHERE published=true;` 500925 and `SELECT COUNT(*) FROM posts WHERE authorId=1;` returns 8.

|  Query1   |  Query2   |
| :-------: | :-------: |
| 0.085583s | 0.064326s |

## ORDER BY clause

- Query1: `SELECT * FROM users ORDER BY 3;`
- Query2: `SELECT * FROM users ORDER BY name;`

|  Query1   |  Query2   |
| :-------: | :-------: |
| 0.114003s | 0.111163s |

## Table aliases

- Query1: `SELECT * FROM posts JOIN users ON posts.authorId = users.id WHERE authorId = 1;`
- Query2: `SELECT * FROM posts AS p JOIN users AS u ON p.authorId = u.id WHERE p.authorId = 1;`

|  Query1   |  Query2   |
| :-------: | :-------: |
| 0.065425s | 0.060042s |
