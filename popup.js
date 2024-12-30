const siteInput = document.getElementById("siteInput");
const addSiteButton = document.getElementById("addSite");
const siteList = document.getElementById("siteList");

const loadSites = () => {
  chrome.storage.sync.get({ sites: [] }, (data) => {
    siteList.innerHTML = "";
    data.sites.forEach((site, index) => {
      const li = document.createElement("li");
      li.textContent = site;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = () => {
        removeSite(index);
      };

      li.appendChild(removeButton);
      siteList.appendChild(li);
    });
  });
};

const addSite = () => {
  const url = siteInput.value.trim();
  if (url) {
    chrome.storage.sync.get({ sites: [] }, (data) => {
      const sites = data.sites;
      sites.push(url);
      chrome.storage.sync.set({ sites }, () => {
        siteInput.value = "";
        loadSites();
      });
    });
  }
};

const removeSite = (index) => {
  chrome.storage.sync.get({ sites: [] }, (data) => {
    const sites = data.sites;
    sites.splice(index, 1);
    chrome.storage.sync.set({ sites }, () => {
      loadSites();
    });
  });
};

addSiteButton.addEventListener("click", addSite);
document.addEventListener("DOMContentLoaded", loadSites);
