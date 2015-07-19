var CurrentTabList = require('./current_tab_list/current_tab_list.jsx')

module.exports = React.createClass({
  getInitialState: function() {
    return {currentTabs: []};
  },

  componentDidMount: function() {
   var self = this;
   chrome.tabs.getAllInWindow(function(tabs) {
     tabs.map(function(tab) {
       var tabKey = "tab_" + tab.id;
       chrome.storage.local.set({
         tabKey: { createdAt: new Date()}
       });
       console.log(tabKey);
       console.log(chrome.storage.local.get(tabKey));
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
