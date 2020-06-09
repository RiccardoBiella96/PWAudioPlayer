let context = null;

self.addEventListener('message',(args)=>{

    if(args.data.offscreenCanvas) context = args.data.offscreenCanvas.getContext('2d');
    const dataArray = args.data.dataArray;
    const bufferLenght = args.data.bufferLenght;
    const cWidth = args.data.cWidth;
    const cHeight = args.data.cHeight;
    // const imageData = context.createImageData(cWidth, cHeight);
    var barWidth = (cWidth / bufferLenght) * 2.5;
    var barHeight;
    var x = 0;

    for (var i = 0; i < bufferLenght; i++) {
        barHeight = dataArray[i];

        context.fillStyle = 'rgb(0,27,' + (barHeight + 45) + ')';
        context.fillRect(x, cHeight - barHeight / 2, barWidth, barHeight);
    
        x += barWidth + 1;
    }

    // for(let i = 0; i < imageData.data.length; i++){
    //     imageData.data[i] = data[i];
    // }
    // context.putImageData(imageData, 0, 0);
});


// for (var i = 0; i < bufferLenght; i++) {
//     barHeight = dataArray[i];


//     canvasContext.fillStyle = 'rgb(0,27,' + (barHeight + 45) + ')';
//     canvasContext.fillRect(x, cHeight - barHeight / 2, barWidth, barHeight);

//     x += barWidth + 1;
// }