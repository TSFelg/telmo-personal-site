/** The small shared shape used by the talk list and its content tests. */
export type Talk = {
  id: string;
  data: {
    title: string;
    event: string;
    date: Date;
    draft?: boolean;
    slides?: string;
    video?: string;
    post?: string;
  };
};

export function sortTalks<T extends Talk>(talks: T[]): T[] {
  return talks
    .filter(talk => !talk.data.draft)
    .sort(
      (a, b) =>
        b.data.date.getTime() - a.data.date.getTime() ||
        a.id.localeCompare(b.id)
    );
}

export function talkLinks(data: Talk["data"]) {
  return [
    { label: "Slides", href: data.slides },
    { label: "Video", href: data.video },
    { label: "Write-up", href: data.post },
  ].filter((link): link is { label: string; href: string } =>
    Boolean(link.href)
  );
}
