export const createPlotter = (core,engine) => {
    return { 
        draw(){
            const data = engine.get();
            core.safe( p => {
                p.loadPixels();
                data.forEach( ([i,j,n,max]) => {
                    const pixel = (i+j*p.width)*4;
                    const norm = p.map(n, 0, max, 0, 1);
                    let brightness = p.map(p.sqrt(norm), 0, 1, 0, 255);
                    if( n === max ){
                        brightness = 0;
                    } 
                    p.pixels[ pixel + 0 ] = brightness
                    p.pixels[ pixel + 1 ] = brightness
                    p.pixels[ pixel + 2 ] = brightness
                    p.pixels[ pixel + 3 ] = 255
                });
                p.updatePixels();
            })
        } 
    }
}