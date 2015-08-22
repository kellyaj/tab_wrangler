var TabRepository = require('./tab_repository.jsx');
var Presenter     = require('./tab_data_presenter.jsx');
var Utils         = require('./utils.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {tabData: {}};
  },

  componentDidMount: function() {
    var tabKey = Utils.tabKeyFor(this.props.id)
    var tabData = TabRepository.get(tabKey);
    if(tabData) {
      var age = Presenter.calculateTabAge(tabData.createdAt);
      this.setState({
        createdAt: tabData.createdAt,
        age: age
      });
    }
  },

  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <h3>created {this.state.age}, active for 24 seconds</h3>
      </div>
    );
  }

});
