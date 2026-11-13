"use client";

import { useCallback, useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Counts = Record<string, number>;

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

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 비어 있고, 카드에서는 0회로 표시된다.
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Counts } | null) => {
        if (data?.counts) setCounts(data.counts);
      })
      .catch(() => {
        // 조회 실패 시 0회 표시를 유지한다.
      });
    return () => controller.abort();
  }, []);

  const handleClick = useCallback((id: string) => {
    // 화면은 즉시 1 증가시키고, 서버 집계는 백그라운드로 보낸다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    trackClick(id);
  }, []);

  if (links.length === 0) {
    return (
      <p className="mt-10 text-center text-sm text-zinc-500">
        아직 등록된 링크가 없습니다.
      </p>
    );
  }
  return (
    <ul className="mt-10 flex w-full flex-col gap-3">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          count={counts[link.id] ?? 0}
          onClick={handleClick}
        />
      ))}
    </ul>
  );
}
