import { EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface IPostFields {
  title: string;
  slug: string;
  content: Document;
}

export type PostSkeleton = EntrySkeletonType<IPostFields, 'post'>;

// データ
// {
//   "metadata": {
//     "tags": [],
//     "concepts": []
//   },
//   "sys": {
//     "space": {
//       "sys": {
//         "type": "Link",
//         "linkType": "Space",
//         "id": "rgbhrr3vtg9d"
//       }
//     },
//     "id": "5irAt14VbWrkcwD3VMlp6v",
//     "type": "Entry",
//     "createdAt": "2025-06-02T05:27:32.464Z",
//     "updatedAt": "2025-06-02T05:27:32.464Z",
//     "environment": {
//       "sys": {
//         "id": "master",
//         "type": "Link",
//         "linkType": "Environment"
//       }
//     },
//     "publishedVersion": 6,
//     "revision": 1,
//     "contentType": {
//       "sys": {
//         "type": "Link",
//         "linkType": "ContentType",
//         "id": "post"
//       }
//     },
//     "locale": "en-US"
//   },
//   "fields": {
//     "title": "テスト1",
//     "slug": "test1",
//     "content": {
//       "nodeType": "document",
//       "data": {},
//       "content": [
//         {
//           "nodeType": "paragraph",
//           "data": {},
//           "content": [
//             {
//               "nodeType": "text",
//               "value": "コンテンツ",
//               "marks": [],
//               "data": {}
//             }
//           ]
//         }
//       ]
//     },
//     "publishedDate": "2025-06-14T00:00+09:00"
//   }
// }