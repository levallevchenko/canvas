window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas2");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(ctx);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeStyle = "green";
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // const text = 'Hello World!!!';
  // const textX = canvas.width/2;
  // const textY = canvas.height/2;
  ctx.fillStyle = "green";
  ctx.strokeStyle = "blue";
  ctx.font = "80px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // ctx.letterSpacing = '10px';
  // ctx.fillText(text, textX, textY);
  // ctx.strokeText(text, textX, textY);

  const maxTextWidth = canvas.width * 0.8;
  const lineHeight = 80;

  const wrapText = (text) => {
    let linesArray = [];
    let lineCounter = 0;
    let line = "";
    let words = text.split(" ");

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      let metrics = ctx.measureText(testLine);

      if (metrics.width > maxTextWidth) {
        line = words[i] + " ";
        lineCounter++;
      } else {
        line = testLine;
      }

      linesArray[lineCounter] = line;

      //   ctx.fillText(testLine, canvas.width / 2, canvas.height / 2 + i * 70);
    }
    let textHeight = lineCounter * lineHeight;
    let textY = canvas.height / 2 - textHeight / 2;
    linesArray.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, textY + (index * lineHeight));
    });
  };

  wrapText("Hello, how are you");
});
