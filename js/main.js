const worker = new Worker('./worker.js');
const button = document.getElementById("playpause");
const player = document.getElementById("player");

button.onclick = function () {
    player.play();
    if (audioContext.state !== 'running') {
        audioContext.resume();
    }
    restartAnimation();
};

const canvas = document.querySelector('canvas');
// const canvasContext = canvas.getContext("2d");

const cHeight = canvas.height;
const cWidth = canvas.width;

var audioContext = new AudioContext();
var analyser = audioContext.createAnalyser();
var source = audioContext.createMediaElementSource(player);
source.connect(analyser).connect(audioContext.destination);
analyser.fftSize = 1024;
var bufferLenght = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLenght);
// canvasContext.clearRect(0, 0, cWidth, cHeight);
const offscreenCanvas = canvas.transferControlToOffscreen();
worker.postMessage({offscreenCanvas:offscreenCanvas, dataArray: dataArray}, [offscreenCanvas])

function draw() {
    var drawVisual = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    // canvasContext.fillStyle = '#f2f2f2';
    // canvasContext.fillRect(0, 0, cWidth, cHeight);

    worker.postMessage({dataArray: dataArray, bufferLenght: bufferLenght, cWidth: cWidth, cHeight:cHeight});

    // for (var i = 0; i < bufferLenght; i++) {
    //     barHeight = dataArray[i];


    //     canvasContext.fillStyle = 'rgb(0,27,' + (barHeight + 45) + ')';
    //     canvasContext.fillRect(x, cHeight - barHeight / 2, barWidth, barHeight);

    //     x += barWidth + 1;
    // }

};

draw();

import anime from 'animejs/lib/anime.es';
// import { worker } from 'cluster';

var playpause_anime = anime({
  targets: '#playpause',
  rotate:'1turn',
  duration:600
});

export function restartAnimation(){
    playpause_anime.restart();
}