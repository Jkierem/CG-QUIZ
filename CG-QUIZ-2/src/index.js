import * as p5 from 'p5';
import { createLSystem } from './lsystem'
import { createPlotter } from './plotter';
import { createCore, createLagrangeInterpolator } from './utils';
import { Colors } from './data';

let main = (p) => {
    const sys = createLSystem();
    const plotter = createPlotter(p);
    const core  = createCore(p);
    const initial = "F"
    let bushy = sys.multi(initial,3);

    const interpol = createLagrangeInterpolator([
        { x:700 , y:0 },
        { x:600 , y:200 },
        { x:500 , y:400 },
        { x:300 , y:300 },
        { x:100 , y:200 },
        { x:0 , y:400 },
        { x:900 , y:400 },
    ])

    p.setup = () => {
        p.createCanvas(900,700)
    };

    p.draw = () => {
        p.background(Colors.blue);
        p.resetMatrix();
        p.stroke(250,100)
        core
        .safe((p) => {
            p.translate(p.width/2+100,p.height-50);
            plotter.drawTree(bushy);
        })
    };
}

const P5 = new p5(main);