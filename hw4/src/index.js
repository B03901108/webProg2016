/* eslint max-len: 'warn', react/react-in-jsx-scope: 'warn'*/
/* b03901108 webPro hw4 ver 2.0 */
const { Component } = React;

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      todoState: [],
    };
    this.todos = [];
    this.arrTI = [];
    this.updateText = this.updateText.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.updateClass = this.updateClass.bind(this);
  }
  updateText(e) {
    this.setState({ inputText: e.target.value });
  }
  updateTodo(e) {
    const tmpMsg = this.state.inputText;
    if ((e.key === 'Enter') && (tmpMsg !== '')) {
      this.todos.push(tmpMsg);
      this.state.todoState.push(0);
      e.target.value = '';
      this.updateText(e);
    }
  }
  updateClass(index, nameState) {
    this.state.todoState[index] = nameState;
    this.setState({ todoState: this.state.todoState.slice() });
  }
  render() {
    let j = 0;
    this.arrTI = [];
    const arrS = this.state.todoState;
    const x = arrS.length;
    for (let i = 0; i < x; i += 1) {
      if (arrS[i] === 0) {
        j += 1;
        this.arrTI.push(
          <TodoItem rank={i} classTag="todo" msgIn={this.todos[i]} fdbk={this.updateClass} />
        );
      } else if (arrS[i] === 1) {
        this.arrTI.push(
          <TodoItem rank={i} classTag="done" msgIn={this.todos[i]} fdbk={this.updateClass} />
        );
      }
    }

    return (
      <div>
        <CountDisplay displayNum={j} />
        <input type="text" placeholder="create your own todo list" onChange={this.updateText} onKeyPress={this.updateTodo} />
        {this.arrTI}
      </div>
    );
  }
}

const CountDisplay = ({ displayNum }) => (
  <div className="todoLeft">
    <p><span className="todoCount">{displayNum}</span><br />left</p>
  </div>
);
CountDisplay.propTypes = {
  displayNum: React.PropTypes.number,
};

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.buttonPressed = false;
    this.doneTodo = this.doneTodo.bind(this);
    this.killTodo = this.killTodo.bind(this);
  }
  doneTodo() {
    if (this.buttonPressed) {
      this.buttonPressed = false;
      this.props.fdbk(this.props.rank, 2);
    } else if (this.props.classTag === 'todo') {
      this.props.fdbk(this.props.rank, 1);
    }
  }
  killTodo() {
    this.buttonPressed = true;
  }
  render() {
    return (
      <div onClick={this.doneTodo} className={this.props.classTag} >
        {this.props.msgIn}
        <input type="button" value="X" className="delete" onClick={this.killTodo} />
      </div>
    );
  }
}
TodoItem.propTypes = {
  rank: React.PropTypes.number,
  classTag: React.PropTypes.string,
  msgIn: React.PropTypes.string,
  fdbk: React.PropTypes.func,
};

/* 10/26, 2016, 06:30 */
ReactDOM.render(<TodoApp />, document.getElementById('mainFrame'));
