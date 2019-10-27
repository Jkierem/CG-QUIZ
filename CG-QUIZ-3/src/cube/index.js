import { Vector } from '@juan-utils/structures'
import { entries } from '@juan-utils/functions'

const ORIGIN = Vector(0,0,0);

export const Directions = {
    DOWN: Vector(0,-1,0),
    UP: Vector(0,1,0),
    RIGHT: Vector(1,0,0),
    LEFT: Vector(-1,0,0),
    FAR: Vector(0,0,-1),
    NEAR: Vector(0,0,1),
}

export const Diagonals = {
    UP_LEFT_FAR: Vector(-1,-1,-1),
    UP_LEFT_NEAR: Vector(-1,-1,1),
    UP_RIGHT_FAR: Vector(1,-1,-1),
    UP_RIGHT_NEAR: Vector(1,-1,1),
    DOWN_LEFT_FAR: Vector(-1,1,-1),
    DOWN_LEFT_NEAR: Vector(-1,1,1),
    DOWN_RIGHT_FAR: Vector(1,1,-1),
    DOWN_RIGHT_NEAR: Vector(1,1,1),
}

export const Cube = (center,length) => ({
    center, length
})

export const split = (c) => {
    const nl = c.length/3;
    const nl2 = nl*nl
    const diagonal = Math.sqrt(2*nl2);
    return entries(Diagonals)
    .map( ([,dir]) => dir.scale(diagonal).add(c.center))
    .map( center => Cube(center,nl));
}

export const generate = cubs => cubs.flatMap(split);

export const multiGenerate = n => {
    let cubs = [Cube(ORIGIN,3)]
    for( let i = 0 ; i < n ; i++ ){
        cubs = generate(cubs);
    }
    return cubs
}