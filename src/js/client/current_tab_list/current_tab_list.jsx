var CurrentTabListHeader = require('./header.jsx');
var CurrentTabCard = require('./card.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {tabs: []};
  },

  render: function() {
    var tabCards = this.props.tabs.map(function(tab) {
      return <CurrentTabCard id={tab.id} title={tab.title} createdAt = {tab.createdAt}/>
    });
    return (
      <div>
        <CurrentTabListHeader />
        {tabCards}
      </div>
    );
  }

});
