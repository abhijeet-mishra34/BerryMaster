import { useState, useEffect } from "react";
import {
  fetchDownloadStats,
  FALLBACK_DOWNLOAD_STATS,
  type DownloadStats,
} from "../services/updateService";


export function useDownloadStats() {
  const [stats, setStats] = useState<DownloadStats>(FALLBACK_DOWNLOAD_STATS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchDownloadStats()
      .then((data) => {
        if (isMounted) {
          setStats(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, isLoading };
}
