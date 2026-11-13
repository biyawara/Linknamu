import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
      <section className="w-full max-w-md rounded-3xl bg-white/70 px-6 py-10 shadow-sm ring-1 ring-zinc-200 backdrop-blur sm:px-10 dark:bg-zinc-900/60 dark:ring-zinc-800">
        <ProfileHeader profile={profile} />
        <LinkList links={links} />
      </section>
    </main>
  );
}
