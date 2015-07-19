var defaultData = function() {
  return {
    createdAt: new Date()
  }
}

chrome.storage.local.set({
  defaultData: defaultData
});

var storeTab = function(tab) {
  var tabKey = "" + tab.id;

  chrome.storage.local.set({
    tabKey: chrome.storage.local.get("defaultData");
  });
}

chrome.tabs.onCreated.addListener(function(tab) {
  storeTab(tab)
});
