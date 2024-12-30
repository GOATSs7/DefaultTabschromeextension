chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get({ sites: [] }, (data) => {
    const sites = data.sites;
    if (sites.length > 0) {
      sites.forEach((url) => {
        chrome.tabs.create({ url });
      });
    }
  });
});
