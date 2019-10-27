import { range } from '@juan-utils/functions'

export const createEngine = (w,max,width,height,p) => {
    return {
        get max(){ return max },
        get(){
            const h = (w * height) / width;
            const xmin = -w/2;
            const xmax = xmin + w
            const ymin = -h/2;
            const ymax = ymin + h
            const dx = (xmax-xmin)/(width)
            const dy = (ymax-ymin)/(height)

            const data = []

            let y = ymin;
            range(0,height).map( j => {
                let x = xmin;
                range(0,width).map( i => {
                    let [a,b]  = [x,y];
                    let n = 0;
                    while(n < max){
                        const aaa = a * a * a;
                        const aa = a * a;
                        const bbb = b * b * b;
                        const bb = b * b;
                        a = aaa - 3*a*bb + x;
                        b = 3*aa*b - bbb + y;
                        if(p.dist(a*a,b*b,0,0) > 16){
                            break;
                        }
                        n++;
                    }
                    data.push([i,j,n,max]);
                    x += dx;
                })
                y += dy;
            })
            return data;
        }
    }
}