import { useRouter } from 'next/router';
import { Entry } from 'contentful';
import Link from 'next/link';
import type { PostCategorySkeleton } from '@/types/post';

type Props = {
  categories: Entry<PostCategorySkeleton>[];
}

export const CategoryList = ({ categories }: Props) => {
  const router = useRouter();
  const isRootMatch = router.pathname.startsWith('/page');

  return (
    <div className='mt-8 flex gap-4 flex-col md:flex-row'>
      <b className='text-xl'>Category</b>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href='/'
            className={`inline-block text-sm border border-black px-3 py-1 rounded-md transition ${
              isRootMatch
                ? 'bg-black text-white pointer-events-none'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
            >全ての記事</Link>
        </li>

        {categories.map((category) => {
          const slug = category.fields.slug;
          const href = `/category/${slug}`;
          const isCategoryPagination = router.asPath.startsWith(`${href}/page`);

          return (
            <li key={category.sys.id}>
              <Link
                href={href}
                className={`inline-block text-sm border border-black px-3 py-1 rounded-md transition ${
                  isCategoryPagination
                    ? 'bg-black text-white pointer-events-none'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {category.fields.title.toString()}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
