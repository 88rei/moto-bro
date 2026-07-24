import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import reel4 from "@/assets/reel-4.jpg";

export type Reel = {
  id: string;
  poster: string;
  videoSrc?: string;
  author: string;
  caption: string;
  tag: string;
};

// videoSrc is optional; when present the ReelPlayer will autoplay it in view.
// Drop MP4 URLs in as they become available.
export const reels: Reel[] = [
  {
    id: "r1",
    poster: reel1,
    author: "@UPCOMING",
    caption: "Upcoming drop // stay tuned",
    tag: "UPCOMING_01",
  },
  {
    id: "r2",
    poster: reel2,
    author: "@UPCOMING",
    caption: "Next cut in production",
    tag: "UPCOMING_02",
  },
  {
    id: "r3",
    poster: reel3,
    author: "@UPCOMING",
    caption: "New run highlights loading",
    tag: "UPCOMING_03",
  },
  {
    id: "r4",
    poster: reel4,
    author: "@UPCOMING",
    caption: "Archive update incoming",
    tag: "UPCOMING_04",
  },
];
