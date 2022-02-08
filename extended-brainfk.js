const Util = {
  checkInputType: function (inputStr, ...values) {
    let input;
    if (inputStr instanceof Array) {
      const strungTogether =
        inputStr[0] + values.map((v, i) => `${v}${inputStr[i + 1]}`).join("");
      input = strungTogether;
    } else {
      input = inputStr;
    }
    return input;
  },

  toBinary: function (inputStr, ...values) {
    const input = this.checkInputType(inputStr, ...values);

    var result = "";
    for (var i = 0; i < input.length; i++) {
      var bin = input[i].charCodeAt().toString(2);
      result += Array(8 - bin.length + 1).join("0") + bin;
    }
    return result;
  },

  toAscii: function (inputStr, ...values) {
    const input = this.checkInputType(inputStr, ...values);

    var result = "";
    var arr = input.match(/.{1,8}/g);
    for (var i = 0; i < arr.length; i++) {
      result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
    }
    return result;
  }
};

function brainy(str, exBFs = []) {

  // buffer count (array currentIndex)
  let bfc = 0;
  // buffer number (index of buffer in buffers)
  let bfN = 0;
  let bfs = [[], ...exBFs];
  let fna = Array(10000).fill(() => {});
  const prtbf = () => console.log(bfs[bfN][bfc]);
  const prtunicode = () => console.log(String.fromCharCode(bfs[bfN][bfc]));
  const getInput = () => (bfs[bfN][bfc] = Number(prompt("Input a number:")));
  const copyP = () => (bfs[bfN][bfc] = Number(bfs[bfN][bfc - 1]));

  // Function names
  const curlyBraces = `e_${Math.random().toString().split(".")[1]}`;
  const curvedBraces = `f_${Math.random().toString().split(".")[1]}`;

  // +, -, >, <, ., ^, [, ], {, }, $
  let commentC = 0;
  let evaluate = str
    .replace(/\;/g, Util.toBinary`bfN += 1;\n`)
    .replace(/\:/g, Util.toBinary`bfN -= 1;\n`)
    .replace(/\{/g, Util.toBinary`function ${curlyBraces}(){\n`)
    .replace(/\(/g, Util.toBinary`function ${curvedBraces}(){\n`)
    .replace(/[\])}]/g, Util.toBinary`}\n`)
    .replace(/\[/g, Util.toBinary`while(bfs[bfN][bfc]){\n`)
    .replace(/\++/g, (matched) => {
      return Util.toBinary`bfs[bfN][bfc] = (bfs[bfN][bfc] || 0) + ${matched.length};\n`;
    })
    .replace(/\-+/g, (matched) => {
      return Util.toBinary`bfs[bfN][bfc] = (bfs[bfN][bfc] || 0) - ${matched.length};\n`;
    })
    .replace(/\>/g, (matched) => {
      return Util.toBinary`bfc += ${matched.length};\n`;
    })
    .replace(/\</g, (matched) => {
      return Util.toBinary`bfc -= ${matched.length};\n`;
    })
    .replace(/\./g, Util.toBinary`prtbf();\n`)
    .replace(/\^/g, Util.toBinary`bfc = bfs[bfN][bfc];\n`)
    .replace(/\'/g, Util.toBinary`${curlyBraces}();\n`)
    .replace(/\"/g, Util.toBinary`${curvedBraces}();\n`)
    .replace(/\$/g, Util.toBinary`prtunicode();\n`)
    .replace(/\,/g, Util.toBinary`getInput();\n`)
    .replace(/\&/g, Util.toBinary`copyP();\n`)
    .replace(/\|.+?\|/g, "")
    .replace(/[\n\t ]/g, "");

  evaluate = Util.toBinary`(() => {` + evaluate + Util.toBinary`})()`;
  
  eval(Util.toAscii(evaluate));
  
  const r = {
    transpiled: Util.toAscii(evaluate),
    binaryTranspiled: evaluate,
    bufferNo: bfN,
    bufferPos: bfc,
    buffers: bfs
  };
  
  return r;
}

Object.assign(window, {
  ExtendedBrainfk: brainy
});
