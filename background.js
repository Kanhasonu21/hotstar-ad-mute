const durationRegexes = [
  /(\d{1,3})s(?:Eng(?:lish)?|Hin(?:di)?)/i,      // "20sEng", "15sHindi", "10sHin"
  /(?:HIN|ENG|HINDI|ENGLISH)[^\d]*(\d{1,3})/i    // "HIN_10", "ENG_15"
];

console.log("Hotstar Ad Controller extension loaded");

async function executeVolumeControl(tabId, volume) {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: (vol) => {
      const videos = document.getElementsByTagName('video');
      if (videos.length > 0) {
        const videoElement = videos[0];
        videoElement.volume = vol;
      }
    },
    args: [volume]
  });
}

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    // Check if extension is enabled and get settings
    const result = await chrome.storage.sync.get(['enabled', 'controlMode', 'adVolume']);
    if (result.enabled === false) {
      return;
    }

    const url = new URL(details.url);
    const adName = url.searchParams.get("adName");
    console.log(`Ad detected: ${adName}`);

    if (adName) {
      let durationSec = 10; // default duration
      for (const regex of durationRegexes) {
        const match = adName.match(regex);
        if (match) {
          durationSec = parseInt(match[1], 10);
          break;
        }
      }

      const mode = result.controlMode || 'mute';
      const volume = mode === 'mute' ? 0 : (result.adVolume || 20) / 100;
      
      console.log(`Setting ad ${mode === 'mute' ? 'to mute' : 'volume to ' + (volume * 100) + '%'} for ${durationSec} seconds`);

      const tabs = await chrome.tabs.query({ url: "*://*.hotstar.com/*" });

      for (const tab of tabs) {
        // Apply volume change
        await executeVolumeControl(tab.id, volume);

        setTimeout(async () => {
          // Reset volume to 100% after ad
          await executeVolumeControl(tab.id, 1.0);
        }, (durationSec * 1000) - 100);
      }
    }
  },
  {
    urls: ["*://bifrost-api.hotstar.com/v1/events/track/ct_impression*"]
  }
);
