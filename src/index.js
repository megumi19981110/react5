import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
//4state を初期化
//9Square がクリックされると、Board から渡された onClick 関数がコールされる
//11シンプルに書くために、React.Component を継承するクラスを定義する代わりに、props を入力として受け取り表示すべき内容を返す関数を定義

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
  
  class Board extends React.Component {
    //6初期 state として 9 個のマス目に対応する 9 個の null 値をセット
    //12先手を “X” にする

    handleClick(i) {
       const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
    });
    }
   //10マス目をクリックすると値が書き込まれるようにする
   //13X” 側と “O” 側が交互に着手できるようにする
   //17ゲームの決着が既についている場合やクリックされたマス目が既に埋まっている場合に早期に return する
　　//19新しい履歴エントリを history に追加
    
    renderSquare(i) {
      return 
      <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />;
      //1valueという値をSquareに渡す
      //7個別の Square に現在の値（'X'、'O' または null）を伝えるようにする
      //8マス目がクリックされた時に Square にその関数を呼んでもらう
      //18Board コンポーネントが squares と onClick プロパティを Game コンポーネントから受け取るようにする
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      //14どちらのプレーヤの手番なのかを表示
      //16いずれかのプレーヤが勝利したかどうか判定
      
      render() {
        return (
          <div>
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
  //ステータステキストに対応するコードは Board 内の render メソッドからは削除
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      };
    }
    //17コンストラクタ内でセット
    render() {
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          </div>
          <div className="game-info">
          <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  //ゲームのステータステキストの決定や表示の際に最新の履歴が使われるようにする
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  //15ゲームが決着して次の手番がなくなった時にそれを表示する