module.exports = React.createClass({
  getInitialState: function() {
    return {tabData: {}};
  },

  componentDidMount: function() {
    tabData = {}//chrome.storage.local.get(this.props.id);
    this.setState({tabData: tabData});
  },

  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
      </div>
    );
  }

});
