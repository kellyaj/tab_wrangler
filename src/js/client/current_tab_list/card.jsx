var CurrentTabCard = require('./card.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {title: ""};
  },

  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
      </div>
    );
  }

});
