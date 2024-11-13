import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  onLoadMore: () => void;
  targetId: string;
}

export const useInfiniteScroll = ({ hasMore, onLoadMore, targetId }: UseInfiniteScrollOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const { loading } = useSelector((state: RootState) => state.chatbot);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (hasMore && entries[0].isIntersecting && !loading) {
        onLoadMore();
      }
    };

    observer.current = new IntersectionObserver(callback);
    const currentObserver = observer.current;

    const target = document.querySelector(`#${targetId}`);
    if (target) currentObserver.observe(target);

    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, [loading, hasMore, onLoadMore, targetId]);
};
