'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint max-len: 'warn', react/react-in-jsx-scope: 'warn'*/
/* b03901108 webPro hw4 ver 2.0 */
var _React = React;
var Component = _React.Component;

var TodoApp = function (_Component) {
  _inherits(TodoApp, _Component);

  function TodoApp(props) {
    _classCallCheck(this, TodoApp);

    var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

    _this.state = {
      inputText: '',
      todoState: []
    };
    _this.todos = [];
    _this.arrTI = [];
    _this.updateText = _this.updateText.bind(_this);
    _this.updateTodo = _this.updateTodo.bind(_this);
    _this.updateClass = _this.updateClass.bind(_this);
    return _this;
  }

  _createClass(TodoApp, [{
    key: 'updateText',
    value: function updateText(e) {
      this.setState({ inputText: e.target.value });
    }
  }, {
    key: 'updateTodo',
    value: function updateTodo(e) {
      var tmpMsg = this.state.inputText;
      if (e.key === 'Enter' && tmpMsg !== '') {
        this.todos.push(tmpMsg);
        this.state.todoState.push(0);
        e.target.value = '';
        this.updateText(e);
      }
    }
  }, {
    key: 'updateClass',
    value: function updateClass(index, nameState) {
      this.state.todoState[index] = nameState;
      this.setState({ todoState: this.state.todoState.slice() });
    }
  }, {
    key: 'render',
    value: function render() {
      var j = 0;
      this.arrTI = [];
      var arrS = this.state.todoState;
      var x = arrS.length;
      for (var i = 0; i < x; i += 1) {
        if (arrS[i] === 0) {
          j += 1;
          this.arrTI.push(React.createElement(TodoItem, { rank: i, classTag: 'todo', msgIn: this.todos[i], fdbk: this.updateClass }));
        } else if (arrS[i] === 1) {
          this.arrTI.push(React.createElement(TodoItem, { rank: i, classTag: 'done', msgIn: this.todos[i], fdbk: this.updateClass }));
        }
      }

      return React.createElement(
        'div',
        null,
        React.createElement(CountDisplay, { displayNum: j }),
        React.createElement('input', { type: 'text', placeholder: 'create your own todo list', onChange: this.updateText, onKeyPress: this.updateTodo }),
        this.arrTI
      );
    }
  }]);

  return TodoApp;
}(Component);

var CountDisplay = function CountDisplay(_ref) {
  var displayNum = _ref.displayNum;
  return React.createElement(
    'div',
    { className: 'todoLeft' },
    React.createElement(
      'p',
      null,
      React.createElement(
        'span',
        { className: 'todoCount' },
        displayNum
      ),
      React.createElement('br', null),
      'left'
    )
  );
};
CountDisplay.propTypes = {
  displayNum: React.PropTypes.number
};

var TodoItem = function (_Component2) {
  _inherits(TodoItem, _Component2);

  function TodoItem(props) {
    _classCallCheck(this, TodoItem);

    var _this2 = _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).call(this, props));

    _this2.buttonPressed = false;
    _this2.doneTodo = _this2.doneTodo.bind(_this2);
    _this2.killTodo = _this2.killTodo.bind(_this2);
    return _this2;
  }

  _createClass(TodoItem, [{
    key: 'doneTodo',
    value: function doneTodo() {
      if (this.buttonPressed) {
        this.buttonPressed = false;
        this.props.fdbk(this.props.rank, 2);
      } else if (this.props.classTag === 'todo') {
        this.props.fdbk(this.props.rank, 1);
      }
    }
  }, {
    key: 'killTodo',
    value: function killTodo() {
      this.buttonPressed = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { onClick: this.doneTodo, className: this.props.classTag },
        this.props.msgIn,
        React.createElement('input', { type: 'button', value: 'X', className: 'delete', onClick: this.killTodo })
      );
    }
  }]);

  return TodoItem;
}(Component);

TodoItem.propTypes = {
  rank: React.PropTypes.number,
  classTag: React.PropTypes.string,
  msgIn: React.PropTypes.string,
  fdbk: React.PropTypes.func
};

/* 10/26, 2016, 06:30 */
ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('mainFrame'));