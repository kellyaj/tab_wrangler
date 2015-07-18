var CurrentTabList = require('./current_tab_list/current_tab_list.jsx')

module.exports = React.createClass({
  getInitialState: function() {
    return {currentTabs: []};
  },

  componentDidMount: function() {
   var self = this;
   chrome.tabs.getAllInWindow(function(tabs) {
     console.log(tabs);
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
