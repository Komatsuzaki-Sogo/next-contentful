import { EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface IPostFields {
  title: string;
  slug: string;
  content: Document;
}

export type PostSkeleton = EntrySkeletonType<IPostFields, 'post'>;