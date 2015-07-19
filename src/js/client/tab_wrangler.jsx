var CurrentTabList = require('./current_tab_list/current_tab_list.jsx')

module.exports = React.createClass({
  getInitialState: function() {
    return {currentTabs: []};
  },

  unStoredTab: function(tabId, tabRepository) {
    return tabRepository.getItem(tabId);
  },

  componentDidMount: function() {
   var self = this;
   chrome.tabs.getAllInWindow(function(tabs) {
     var tabRepository = localStorage;
     tabs.map(function(tab) {
       if(self.unStoredTab(tab.id, tabRepository)) {
         var tabKey = "tab_" + tab.id;
         var defaultData = JSON.stringify({ createdAt: new Date()})
         tabRepository.setItem(tabKey, defaultData);
       }
     });
     self.setState({currentTabs: tabs});
   });
  },

  render: function() {
    return (
      <div>
        <CurrentTabList tabs={this.state.currentTabs} />
      </div>
    );
  }

});
