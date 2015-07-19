module.exports = React.createClass({
  getInitialState: function() {
    return {tabData: {}};
  },

  componentDidMount: function() {
    var tabRepository = localStorage;
    var tabKey = "tab_" + this.props.id;
    var tabData = JSON.parse(tabRepository.getItem(tabKey));
    this.setState({tabData: tabData});
  },

  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <h3>{this.state.tabData.createdAt}</h3>
      </div>
    );
  }

});
