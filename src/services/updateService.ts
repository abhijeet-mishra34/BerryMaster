export interface ReleaseInfo {
  tag: string;
  name: string;
  body: string;
  htmlUrl: string;
  publishedAt: string;
  assets: Array<{
    name: string;
    downloadUrl: string;
    size: number;
  }>;
}

export interface DownloadStats {
  total: number;
  windows: number;
  android: number;
  latestVersionDownloads: number;
  latestTag: string;
  releasesCount: number;
  updatedAt: string;
}

export interface UpdateCheckResult {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  release?: ReleaseInfo;
  message: string;
  error?: string;
}

export const CURRENT_APP_VERSION = "1.0.4";

export const DOWNLOAD_LINKS = {
  repo: "https://github.com/abhijeet-mishra34/BerryMaster",
  pcSetup: `https://github.com/abhijeet-mishra34/BerryMaster/releases/download/pc-v${CURRENT_APP_VERSION}/BerryMaster-Windows-Setup.exe`,
  androidApk: `https://github.com/abhijeet-mishra34/BerryMaster/releases/download/v${CURRENT_APP_VERSION}/BerryMaster-universal.apk`,
  allReleases: "https://github.com/abhijeet-mishra34/BerryMaster/releases",
};

const GITHUB_REPO = "abhijeet-mishra34/BerryMaster";
const STATS_STORAGE_KEY = "berrymaster_download_stats";
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache

export const FALLBACK_DOWNLOAD_STATS: DownloadStats = {
  total: 311,
  windows: 118,
  android: 193,
  latestVersionDownloads: 149,
  latestTag: `v${CURRENT_APP_VERSION}`,
  releasesCount: 14,
  updatedAt: new Date().toISOString(),
};

export async function fetchDownloadStats(): Promise<DownloadStats> {
  try {
    const cached = localStorage.getItem(STATS_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as DownloadStats;
      const isFresh =
        Date.now() - new Date(parsed.updatedAt).getTime() < CACHE_DURATION_MS;
      if (isFresh && parsed.total > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore cache read errors
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const releases = await response.json();
    if (!Array.isArray(releases) || releases.length === 0) {
      throw new Error("No releases received from GitHub");
    }

    let total = 0;
    let windows = 0;
    let android = 0;
    let latestVersionDownloads = 0;
    const latestTag = releases[0]?.tag_name || `v${CURRENT_APP_VERSION}`;

    releases.forEach((rel, index) => {
      const assets = rel.assets || [];
      assets.forEach((asset: { name: string; download_count: number }) => {
        const count = asset.download_count || 0;
        total += count;
        const nameLower = (asset.name || "").toLowerCase();
        if (nameLower.endsWith(".exe") || nameLower.endsWith(".msi")) {
          windows += count;
        } else if (nameLower.endsWith(".apk")) {
          android += count;
        }

        if (index === 0) {
          latestVersionDownloads += count;
        }
      });
    });

    const stats: DownloadStats = {
      total: Math.max(total, FALLBACK_DOWNLOAD_STATS.total),
      windows: Math.max(windows, FALLBACK_DOWNLOAD_STATS.windows),
      android: Math.max(android, FALLBACK_DOWNLOAD_STATS.android),
      latestVersionDownloads:
        latestVersionDownloads || FALLBACK_DOWNLOAD_STATS.latestVersionDownloads,
      latestTag,
      releasesCount: releases.length,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignore cache write errors
    }

    return stats;
  } catch (error) {
    console.warn("[BerryMaster] Could not fetch live GitHub download stats:", error);
    try {
      const cached = localStorage.getItem(STATS_STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached) as DownloadStats;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_DOWNLOAD_STATS;
  }
}


export async function checkForAppUpdates(): Promise<UpdateCheckResult> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (response.status === 404) {
      return {
        hasUpdate: false,
        currentVersion: CURRENT_APP_VERSION,
        latestVersion: CURRENT_APP_VERSION,
        message: "No releases found on GitHub yet. You are running the latest developer build.",
      };
    }

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data = await response.json();
    const latestTag = data.tag_name || data.name || CURRENT_APP_VERSION;

    const cleanCurrent = CURRENT_APP_VERSION.replace(/^v/, "");
    const cleanLatest = latestTag.replace(/^v/, "");

    const isNewer = cleanLatest.localeCompare(cleanCurrent, undefined, {
      numeric: true,
      sensitivity: "base",
    }) > 0;

    const release: ReleaseInfo = {
      tag: latestTag,
      name: data.name || latestTag,
      body: data.body || "",
      htmlUrl: data.html_url || `https://github.com/${GITHUB_REPO}/releases`,
      publishedAt: data.published_at || "",
      assets: (data.assets || []).map((asset: { name: string; browser_download_url: string; size: number }) => ({
        name: asset.name,
        downloadUrl: asset.browser_download_url,
        size: asset.size,
      })),
    };

    return {
      hasUpdate: isNewer,
      currentVersion: CURRENT_APP_VERSION,
      latestVersion: latestTag,
      release,
      message: isNewer
        ? `A newer version (${latestTag}) is available for download!`
        : `You are on the latest version (${CURRENT_APP_VERSION}).`,
    };
  } catch (error) {
    return {
      hasUpdate: false,
      currentVersion: CURRENT_APP_VERSION,
      latestVersion: CURRENT_APP_VERSION,
      error:
        error instanceof Error
          ? error.message
          : "Unable to connect to GitHub releases.",
      message:
        error instanceof Error
          ? error.message
          : "Unable to connect to GitHub releases.",
    };
  }
}
