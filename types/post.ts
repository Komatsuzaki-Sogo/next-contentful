import { Entry, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// カテゴリ用スケルトン定義
export interface IPostCategoryFields {
  title: string;
  slug: string;
}
export type PostCategorySkeleton = EntrySkeletonType<IPostCategoryFields, 'postCategory'>;

// 記事用スケルトン定義
export interface IPostFields {
  title: string;
  slug: string;
  content: Document;
  publishedDate: string;
  postCategory: Entry<PostCategorySkeleton>; // ←ここで Entry<> に正しいスケルトンを渡す
}
export type PostSkeleton = EntrySkeletonType<IPostFields, 'post'>;
