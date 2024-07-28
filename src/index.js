import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
//4state を初期化
//9Square がクリックされると、Board から渡された onClick 関数がコールされる

    render() {
      return (
        <button 
        className="square" onClick={() => this.setState({value: 'X'})}>
          {this.state.value}
        </button>
        //2渡された値を表示
        //3クリックされた場合に “X” と表示
        //5クリックされた時に state の現在値を表示
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
      };
    }
    //6初期 state として 9 個のマス目に対応する 9 個の null 値をセット

    handleClick(i) {
      const squares = this.state.squares.slice();
      squares[i] = 'X';
      this.setState({squares: squares});
    }
　　//10マス目をクリックすると値が書き込まれるように
    
    renderSquare(i) {
      return 
      <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
      />;
      //1valueという値をSquareに渡す
      //7個別の Square に現在の値（'X'、'O' または null）を伝えるようにする
      //8マス目がクリックされた時に Square にその関数を呼んでもらう
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  