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

export interface UpdateCheckResult {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  release?: ReleaseInfo;
  message: string;
}

export const CURRENT_APP_VERSION = "0.1.6";

const GITHUB_REPO = "abhijeet-mishra34/BerryMaster";

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
      message:
        error instanceof Error
          ? error.message
          : "Unable to connect to GitHub releases.",
    };
  }
}
