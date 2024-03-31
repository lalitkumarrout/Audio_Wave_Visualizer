const input = document.querySelector("input");
const audio = document.querySelector("audio");
const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

input.addEventListener("change", () => {
  const file = input.files[0];

  if (!file) return;

  audio.src = URL.createObjectURL(file);
  audio.play();

  //Audio context processing graph or simple modular route
  const audioContext = new AudioContext();
  //source Node
  const audioSource = audioContext.createMediaElementSource(audio);
  //Analyzer Node
  const analyser = audioContext.createAnalyser();

  audioSource.connect(analyser);

  //destination node

  analyser.connect(audioContext.destination); //Hardware spaker

  analyser.fftSize = 512; //determines count of sound bars
  const bufferDatalength = analyser.frequencyBinCount; //how many actual sound bars

  const bufferDataArr = new Uint8Array(bufferDatalength);

  const barwidth = canvas.width / bufferDatalength;
  let x = 0;

  function drawandanimateSoundBars() {
    x = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(bufferDataArr);

    bufferDataArr.forEach((datavalue) => {
      const barheight = datavalue;

      const red = (barheight * 2) % 150;
      const green = (barheight * 5) % 200;
      const blue = (barheight * 7) % 120;

      context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      context.fillRect(x, canvas.height - barheight, barwidth, barheight);
      x += barwidth;
    });
    if (!audio.ended)requestAnimationFrame(drawandanimateSoundBars);
  }

  drawandanimateSoundBars();
});
