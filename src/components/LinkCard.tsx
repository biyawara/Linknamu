"use client";

import type { LinkItem } from "@/data/profile";

function trackClick(id: string) {
  const body = JSON.stringify({ id });
  // 페이지 이동 중에도 요청이 끊기지 않도록 sendBeacon / keepalive 사용
  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/clicks", blob);
    return;
  }
  fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <li>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick(link.id)}
        className="block w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:translate-y-0 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-emerald-500"
      >
        <span className="block text-base font-semibold">{link.title}</span>
        {link.description && (
          <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
            {link.description}
          </span>
        )}
      </a>
    </li>
  );
}
