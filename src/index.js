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
//4 stateを初期化
//9 Squareがクリックされると、Boardから渡されたonClick関数がコールされる
//11 シンプルに書くために、React.Componentを継承するクラスを定義する代わりに、propsを入力として受け取り表示すべき内容を返す関数を定義

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

//2 渡された値を表示するように、{/* TODO */} を {this.props.value} に書き換え
//3 コンソールに ‘click’ と表示されるようにする
//5 クリックされた時にstateの現在値を表示
//22 ステータステキストに対応するコードはBoard内のrenderメソッドからは削除

  
  class Board extends React.Component {
    //6 初期stateとして9個のマス目に対応する9個のnull値をセット
    //12 先手を “X” にする

    handleClick(i) {
      renderSquare(i) {
        return (
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
          />
        );
      }
   //10 マス目をクリックすると値が書き込まれるようにする
   //13 X” 側と “O” 側が交互に着手できるようにする
   //18 ゲームの決着が既についている場合やクリックされたマス目が既に埋まっている場合に早期にreturnする
   //20 BoardコンポーネントがsquaresとonClickプロパティをGameコンポーネントから受け取るようにする

      //1 valueという値をSquareに渡す
      //7 個別の Square に現在の値（'X'、'O' または null）を伝えるようにする
      //8 マス目がクリックされた時にSquareにその関数を呼んでもらう
    }
  
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
  
      //15 どちらのプレーヤの手番なのかを表示
      //16 いずれかのプレーヤが勝利したかどうか判定
      
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }
    //19 Gameコンポーネントの初期stateをコンストラクタ内でセット
    //27 いま何手目の状態を見ているのかを表す
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
    //17 ゲームの決着が既についている場合やクリックされたマス目が既に埋まっている場合に早期にreturnするようにする
    //21 ゲームのステータステキストの決定や表示の際に最新の履歴が使われるようにする
    //29「時間の巻き戻し」をしてからその時点で新しい着手を起こした場合に、そこから見て「将来」にある履歴（もはや正しくなくなったもの）を確実に捨て去ることができる

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
    //28 Game内にjumpToメソッドを定義してそのstepNumberが更新されるようにする

     render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
     //23 handleClickメソッドをBoardコンポーネントからGameコンポーネントに移動する
     //24 Game内の handleClickメソッドで、新しい履歴エントリをhistoryに追加
     //25 Gameのrenderメソッド内でhistoryにmapを作用させる
     //26 Reactのkeyに関する警告は表示されなくなる
     //30 常に最後の着手後の状態をレンダーするのではなく stepNumber によって現在選択されている着手をレンダーするようにする

      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }

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
          <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  //14 どちらのプレーヤの手番なのかを表示
  
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
  
  //16 ゲームが決着して次の手番がなくなった時にそれを表示する