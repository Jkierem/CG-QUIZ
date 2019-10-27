import * as P5 from 'p5';
import { createCore } from './core'
import { createEngine } from './engine'
import { createPlotter } from './plotter'

let main = (p) => {
    const core = createCore(p);
    const engine = createEngine(4,100,700,500,p);
    const plotter = createPlotter(core,engine);
    
    p.setup = () => {
        p.createCanvas(700,500);
        p.pixelDensity(1);
        p.noLoop(); 
    }

    
    p.draw = () => {
        p.background(0);
        p.resetMatrix();
        plotter.draw();
    }
}

let p5 = new P5(main)