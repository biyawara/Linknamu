"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  /** 현재 클릭수. 데이터를 받기 전에는 0이 들어온다. */
  count: number;
  onClick: (id: string) => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <li>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onClick(link.id)}
        className="relative block w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:translate-y-0 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-emerald-500"
      >
        <span className="block pr-12 pl-12 text-base font-semibold">
          {link.title}
        </span>
        {link.description && (
          <span className="mt-0.5 block pr-12 pl-12 text-xs text-zinc-500 dark:text-zinc-400">
            {link.description}
          </span>
        )}
        <span
          className="absolute top-1/2 right-4 -translate-y-1/2 text-xs tabular-nums text-zinc-400 dark:text-zinc-500"
          aria-label={`클릭 ${count}회`}
        >
          {count.toLocaleString("ko-KR")}회
        </span>
      </a>
    </li>
  );
}
