This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## contentfulで取得するpostのデータ構造

```
{
  "metadata": {
    "tags": [],
    "concepts": []
  },
  "sys": {
    "space": {
      "sys": {
        "type": "Link",
        "linkType": "Space",
        "id": "rgbhrr3vtg9d"
      }
    },
    "id": "5irAt14VbWrkcwD3VMlp6v",
    "type": "Entry",
    "createdAt": "2025-06-02T05:27:32.464Z",
    "updatedAt": "2025-06-02T05:27:32.464Z",
    "environment": {
      "sys": {
        "id": "master",
        "type": "Link",
        "linkType": "Environment"
      }
    },
    "publishedVersion": 6,
    "revision": 1,
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "post"
      }
    },
    "locale": "en-US"
  },
  "fields": {
    "title": "テスト1",
    "slug": "test1",
    "content": {
      "nodeType": "document",
      "data": {},
      "content": [
        {
          "nodeType": "paragraph",
          "data": {},
          "content": [
            {
              "nodeType": "text",
              "value": "コンテンツ",
              "marks": [],
              "data": {}
            }
          ]
        }
      ]
    },
    "publishedDate": "2025-06-14T00:00+09:00"
  }
}
```
