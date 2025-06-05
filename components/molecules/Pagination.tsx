import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export const Pagination = ({ currentPage, totalPages, basePath = '' }: Props) => {
  if (totalPages <= 1) return null;

  const getPageHref = (page: number) => {
    return basePath ? `${basePath}/page/${page}` : `/page/${page}`;
  };

  return (
    <ul className="pagination flex gap-2 mt-16 justify-center">
      {currentPage > 1 && (
        <li>
          <Link href={getPageHref(currentPage - 1)} className="inline-block text-sm font-bold border border-black px-3 py-1 rounded-md transition bg-white text-black hover:bg-black hover:text-white">
            <span>前へ</span>
          </Link>
        </li>
      )}

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        return (
          <li key={page}>
            <Link href={getPageHref(page)}
              className={`inline-block text-sm font-bold border border-black px-3 py-1 rounded-md transition hover:bg-black hover:text-white ${
                isActive ? 'bg-black text-white pointer-events-none' : 'bg-white text-black'
              }`}
              >
              <span>
                {page}
              </span>
            </Link>
          </li>
        );
      })}

      {currentPage < totalPages && (
        <li>
          <Link href={getPageHref(currentPage + 1)} className="inline-block text-sm font-bold border border-black px-3 py-1 rounded-md transition bg-white text-black hover:bg-black hover:text-white">
            <span>次へ</span>
          </Link>
        </li>
      )}
    </ul>
  );
};
