import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white shadow-md sm:h-32 sm:w-32 dark:ring-zinc-800">
        <Image
          src={profile.avatar}
          alt={`${profile.name} 프로필 사진`}
          fill
          sizes="128px"
          priority
          unoptimized
          className="object-cover"
        />
      </div>
      <h1 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">
        {profile.name}
      </h1>
      <p className="mt-1 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
        {profile.bio}
      </p>
    </header>
  );
}
