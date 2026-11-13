import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
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
        <LinkCard key={link.id} link={link} />
      ))}
    </ul>
  );
}
