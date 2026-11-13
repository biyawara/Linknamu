export type LinkItem = {
  /** 클릭수 집계 키. 변경하면 기존 집계와 분리된다. */
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로 또는 절대 URL */
  avatar: string;
};

export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  avatar: "https://placehold.co/150x150/orange/white",
};

export const links: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    url: "https://github.com",
    description: "코드와 프로젝트",
  },
  {
    id: "blog",
    title: "블로그",
    url: "https://velog.io",
    description: "개발 기록과 생각",
  },
  {
    id: "instagram",
    title: "Instagram",
    url: "https://instagram.com",
    description: "일상과 작업 사진",
  },
];
