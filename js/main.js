import anime from 'animejs/lib/anime.es';
import '../scss/main.scss'
import ic_pause from '../icons/ic_pause.svg'
import ic_play from '../icons/ic_play.svg'


const worker = new Worker('./worker.js');
const button = document.getElementById("playpause");
const player = document.getElementById("player");
const canvas = document.querySelector('canvas');
const cHeight = canvas.height;
const cWidth = canvas.width;
const rotation = anime({
  targets: '#playpause',
  rotate:'1turn',
  duration:1000
});


let isPlaying = false;
button.onclick = function () {
    if(isPlaying)
    {
        button.src = ic_play;
        player.pause();
        isPlaying = false;
    }
    else
    {
        button.src = ic_pause;
        player.play();
        isPlaying = true;
        if (audioContext.state !== 'running') {
            audioContext.resume();
        }
    }

    rotation.restart();
};

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(player);
source.connect(analyser).connect(audioContext.destination);
analyser.fftSize = 1024;
const bufferLenght = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLenght);

const offscreenCanvas = canvas.transferControlToOffscreen();
const payload = {offscreenCanvas, cWidth, cHeight, bufferLenght};
worker.postMessage({type:"registration", payload:payload }, [offscreenCanvas])

function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    worker.postMessage({type:"data", payload:{dataArray}});
};

draw();