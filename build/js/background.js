var tabRepository;

var initializeStorage = function() {
  tabRepository = localStorage;
}

var defaultData = function() {
  return {
    createdAt: new Date()
  }
}

var createTabKey = function(tabId) {
  return "tab_" + tabId;
}

var createDefaultData = function() {
  var defaultData = {
    createdAt: new Date()
  }
  return JSON.stringify(defaultData);
}

var storeTab = function(tab) {
  var tabKey = createTabKey(tab.id);
  var defaultData = createDefaultData();

  tabRepository.setItem(tabKey, defaultData);
}

initializeStorage();

chrome.tabs.onCreated.addListener(function(tab) {
  storeTab(tab)
});
