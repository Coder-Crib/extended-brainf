// Showcasing custom buffers (using Proxy arrays)
const colorBricks = (gridC = 12, indexFactor, colorSpace = 100) => {
  indexFactor = indexFactor || ((v) => v);

  const brickGrid = document.createElement("div");
  brickGrid.classList.add("brick-grid");

  const hiddenBrick = document.createElement("div");
  hiddenBrick.classList.add("brick");
  // hiddenBrick.style.display = 'none';
  brickGrid.append(hiddenBrick);

  brickGrid.style.setProperty("--columns", gridC);
  brickGrid.style.setProperty("--colorSpace", colorSpace);

  document.querySelector("main").append(brickGrid);

  return new Proxy([], {
    get(target, index) {
      const brick = brickGrid.querySelectorAll(".brick")[index];

      brick.style.setProperty("--level", `${target[index]}`);
      brick.innerText = `${target[index]}`;
      return target[index];
    },

    set(target, index, value) {
      if (target[index] === undefined) {
        const nBrick = document.createElement("div");
        nBrick.classList.add("brick");
        brickGrid.append(nBrick);
      }

      let prev = target[index];
      target[index] = Math.round(indexFactor(value));

      console.log(
        `Setting value...\n%c${index}: %c${prev}%c -> %c${target[index]}`,
        "color: teal",
        "color: darkred;",
        "",
        "color: blue"
      );

      return true;
    },
  });
};

let query = `
  | Anything inside pipe is considered a comment |
  | Create a gradient across a grid of cells     |
  
  | ; -> go to next buffer(array)        |
  | { .... } -> create function          |
  | & -> copy previous cell(index) value |
  | ' -> invoke function                 |

  ;{ &+++++.>&.>&.> } |Function to copy previous cell, +5, copy new value to next 2 cells, move cursor 3 steps ahead|
  ++++++++++.>&.>&.>'''''''''''''''''''
`;

ExtendedBrainfk([colorBricks()], query);
