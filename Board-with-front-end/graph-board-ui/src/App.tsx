// @ts-nocheck
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import "./assets/styles.css";
import { useState, useRef, useEffect } from "react";
import { useContractReads } from "wagmi";
import boardABI from "../src/board.json";

export function App() {
  const { isConnected } = useAccount();
  const xInputField = useRef(null);
  const yInputField = useRef(null);
  const [coord, setCoord] = useState({ x: 1, y: 1 });
  // const updateCoordinates = (e) => {
  //   // const { name, value } = e.target;
  //   // setCoord({ ...coord, [name]: value });
  //   setCoord({x: });
  // };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        // address: "0x86DD44E882304e20834d9c3DcE27Fed5b1830040",
        address: "0x2Fdf5FE2099D81218FE1d78e66699e486669563F",
        abi: boardABI,
        functionName: "getColor",
        args: [coord.x - 1, coord.y - 1],
      },
    ],
  });

  let cellColor = "white";
  let cellTextColor = "black";
  let boardResult = data ? data[0]?.result : 1;
  useEffect(() => {
    console.log(boardResult);
    // console.log(data[0]?.status);
    // cellColor = "white";
    // console.log(boardResult);
    // console.log(Number(boardResult));
    /*
    if (Number(boardResult) === 2) {
      cellColor = "black";
      cellTextColor = "white";
    } else if (Number(boardResult) === 3) {
      cellColor = "red";
      cellTextColor = "white";
    } else {
      cellColor = "white";
      cellTextColor = "black";
    }
    if (document.getElementById(coord.x + "" + coord.y) != undefined) {
      document.getElementById(coord.x + "" + coord.y).style.backgroundColor =
        cellColor;
      document.getElementById(coord.x + "" + coord.y).style.color =
        cellTextColor;
      document.getElementById(coord.x + "" + coord.y).style.fontWeight = "bold";
    }
    */
    if (boardResult === "black") {
      cellTextColor = "white";
    } else if (boardResult === "red") {
      cellTextColor = "white";
    }
    console.log(cellColor);

    if (document.getElementById(coord.x + "" + coord.y) != undefined) {
      document.getElementById(coord.x + "" + coord.y).style.backgroundColor =
        boardResult;
      document.getElementById(coord.x + "" + coord.y).style.color =
        cellTextColor;
      document.getElementById(coord.x + "" + coord.y).style.fontWeight = "bold";
    }
  }, [coord.x, coord.y]);

  const getColor = (rowValue, colValue) => {
    console.log(rowValue, colValue);
  };

  const inputCellValue = (rowValue, colValue) => {
    // event.target.style.backgroundColor = cellColor;
    event.target.style.backgroundColor = boardResult;
    xInputField.current.value = rowValue;
    yInputField.current.value = colValue;
    // console.log(cellColor);
    // event.target.style.backgroundColor = "green";
    // alert(rowValue + "" + colValue);
    setCoord({ x: xInputField.current.value, y: yInputField.current.value });
  };

  const Board = ({ disable }) => {
    // const inputCellValue = (rowValue, colValue) => {
    //   xInputField.current = rowValue;
    // };
    // console.log(cellColor);
    return (
      <div className={"board"}>
        {[1, 2, 3, 4, 5, 6, 7].map((colElem) => {
          return (
            <div className="row">
              {[5, 4, 3, 2, 1].map((rowElem) => {
                return (
                  <button
                    type="button"
                    id={rowElem + "" + colElem}
                    className={"cell"}
                    onClick={(e) => {
                      event.target.style.backgroundColor = "white";
                      inputCellValue(rowElem, colElem);
                    }}
                    disabled={disable}
                  >
                    {rowElem}, {colElem}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className={"container"}>
      <nav>
        The Graph
        <div className={"nav-connect-button"}>
          {isConnected && <ConnectButton />}
        </div>
      </nav>
      <section className={"main-container"}>
        {isLoading ? <div className={"loading-alert"}>Loading</div> : null}
        {isError ? <div className={"error-alert"}>Error occured</div> : null}

        {!isConnected ? (
          <div className={"ask-login-message"}>
            Please connect wallet to use app
          </div>
        ) : null}
        <div className={"board-container"}>
          {isConnected ? <Board disable={false} /> : <Board disable={true} />}
        </div>

        <section className={"input-container"}>
          <div>
            {isConnected && <label htmlFor="x-axis">X axis value:</label>}
            <input
              id="x-axis"
              type="number"
              defaultValue={1}
              min={1}
              max={5}
              step={1}
              pattern="[1-5]"
              ref={xInputField}
              disabled={!isConnected}
            />
          </div>

          <div>
            {isConnected && <label htmlFor="y-axis">Y axis value:</label>}
            <input
              id="y-axis"
              type="number"
              defaultValue={1}
              min={1}
              max={7}
              step={1}
              pattern="[1-7]"
              ref={yInputField}
              disabled={!isConnected}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              inputCellValue(
                xInputField.current.value,
                yInputField.current.value
              )
            }
            disabled={!isConnected || isLoading}
          >
            Proceed
          </button>
        </section>

        <div className={"connect-button-container"}>
          {!isConnected && <ConnectButton />}
        </div>

        {/*
        {isConnected && (
          <>
            <hr />
            <h2>Network</h2>
            <NetworkSwitcher />
            <br />
            <hr />
            <h2>Account</h2>
            <Account />
            <br />
            <hr />
            <h2>Balance</h2>
            <Balance />
            <br />
            <hr />
            <h2>Block Number</h2>
            <BlockNumber />
            <br />
            <hr />
            <h2>Read Contract</h2>
            <ReadContract />
            <br />
            <hr />
            <h2>Read Contracts</h2>
            <ReadContracts />
            <br />
            <hr />
            <h2>Read Contracts Infinite</h2>
            <ReadContractsInfinite />
            <br />
            <hr />
            <h2>Send Transaction</h2>
            <SendTransaction />
            <br />
            <hr />
            <h2>Send Transaction (Prepared)</h2>
            <SendTransactionPrepared />
            <br />
            <hr />
            <h2>Sign Message</h2>
            <SignMessage />
            <br />
            <hr />
            <h2>Sign Typed Data</h2>
            <SignTypedData />
            <br />
            <hr />
            <h2>Token</h2>
            <Token />
            <br />
            <hr />
            <h2>Watch Contract Events</h2>
            <WatchContractEvents />
            <br />
            <hr />
            <h2>Watch Pending Transactions</h2>
            <WatchPendingTransactions />
            <br />
            <hr />
            <h2>Write Contract</h2>
            <WriteContract />
            <br />
            <hr />
            <h2>Write Contract (Prepared)</h2>
            <WriteContractPrepared />
          </>
        )}
        */}
      </section>

      <footer>
        <h4>wagmi + RainbowKit + Vite</h4>
      </footer>
    </section>
  );
}
