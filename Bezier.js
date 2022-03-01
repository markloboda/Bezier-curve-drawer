import { Bernstein } from "./Bernstein.js";
import { Vector } from "./Vector.js";

export class Bezier {
    constructor(points) {
        this.points = points;
        this.n = points.length - 1;
    }

    toArray() {
        return this.points;
    }

    value(t) {
        let bez = new Vector(Array(this.points[0].toArray().length).fill(0));
        for (let i = 0; i <= this.n; i++) {
            bez = bez.add(this.points[i].mulScalar(new Bernstein(this.n, i).value(t)));
        }
        return bez;
    }

    derivative(t) {
        let bez = new Vector(Array(this.points[0].toArray().length).fill(0));
        for (let i = 0; i < this.n; i++) {
            bez = bez.add((this.points[i + 1].sub(this.points[i])).mulScalar(new Bernstein(this.n - 1, i).value(t)));
        }
        return bez.mulScalar(this.n);
    }
}