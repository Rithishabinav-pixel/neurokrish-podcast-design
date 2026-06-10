import { useEffect, useState } from "react";
import { PodcastList } from "./components/app/PodcastList";
import { PodcastDetail } from "./components/app/PodcastDetail";

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [openId]);

  return openId ? (
    <PodcastDetail
      id={openId}
      onBack={() => setOpenId(null)}
      onOpen={(id) => setOpenId(id)}
    />
  ) : (
    <PodcastList onOpen={(id) => setOpenId(id)} />
  );
}
