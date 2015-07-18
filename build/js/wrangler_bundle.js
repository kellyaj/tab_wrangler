(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CurrentTabCard = require('./card.jsx');

module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return {title: ""};
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, this.props.title)
      )
    );
  }

});

},{"./card.jsx":1}],2:[function(require,module,exports){
var CurrentTabListHeader = require('./header.jsx');
var CurrentTabCard = require('./card.jsx');

module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return {tabs: []};
  },

  render: function() {
    var tabCards = this.props.tabs.map(function(tab) {
      return React.createElement(CurrentTabCard, {title: tab.title})
    });
    return (
      React.createElement("div", null, 
        React.createElement(CurrentTabListHeader, null), 
        tabCards
      )
    );
  }

});

},{"./card.jsx":1,"./header.jsx":3}],3:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Open Tabs")
      )
    );
  }

});

},{}],4:[function(require,module,exports){
var CurrentTabList = require('./current_tab_list/current_tab_list.jsx')

module.exports = React.createClass({displayName: "exports",
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
      React.createElement("div", null, 
        React.createElement(CurrentTabList, {tabs: this.state.currentTabs})
      )
    );
  }

});

},{"./current_tab_list/current_tab_list.jsx":2}],5:[function(require,module,exports){
var TabWrangler = require('./client/tab_wrangler.jsx');

/* jshint ignore:start */
React.render(React.createElement(TabWrangler), document.getElementById('wrangler'));
/* jshint ignore:end */

},{"./client/tab_wrangler.jsx":4}]},{},[5]);
