let context = null;
let cWidth = null;
let cHeight = null;
let bufferLenght = null;

self.addEventListener('message',(args)=>{

    if(args.data.payload)
    {
        if(args.data.type === "registration")
        {
            context = args.data.payload.offscreenCanvas.getContext('2d');

            bufferLenght = args.data.payload.bufferLenght;
            cWidth = args.data.payload.cWidth;
            cHeight = args.data.payload.cHeight;

        }
        else if(args.data.type === "data")
        {
            if(context)
            {
                const dataArray = args.data.payload.dataArray;
                let barWidth = (cWidth / bufferLenght) * 2.5;
                let barHeight;
                let x = 0;
            
                context.fillStyle = '#aaaaaa';
                context.fillRect(0, 0, cWidth, cHeight);

                for (let i = 0; i < bufferLenght; i++)
                {
                    barHeight = dataArray[i];
                    context.fillStyle = 'rgb(0,27,' + (barHeight + 45) + ')';
                    context.fillRect(x, cHeight - barHeight / 2, barWidth, barHeight);
                    x += barWidth + 1;
                }
            }            
        }
    }
});