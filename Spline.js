import { Bezier } from "./Bezier.js";
import { Vector } from "./Vector.js";

export class Spline {
    constructor(curves) {
        this.curves = curves;
    }

    toArray() {
        return this.curves;
    }

    value(t) {
        let curveNum = t == this.curves.length ? t - 1 : Math.floor(t);
        let curveT = t - curveNum;

        return this.curves[curveNum].value(curveT);
    }

    derivative(t) {
        let curveNum = Math.floor(t);
        let curveT = t - curveNum;

        return this.curves[curveNum].derivative(curveT);
    }

    makeContinuous() {   // C0 continuity
        let arithmeticMean;
        for (let curveNum = 0; curveNum < this.curves.length - 1; curveNum++) {
            let curve1 = this.curves[curveNum];
            let curve2 = this.curves[curveNum + 1];
            let curve1Arr = curve1.toArray();
            let curve2Arr = curve2.toArray();
            if (curve1Arr[curve1Arr.length - 1] != curve2Arr[0]) {
                arithmeticMean = Spline.arithmeticMean(curve1Arr[curve1Arr.length - 1], curve2Arr[0]);
                curve1Arr[curve1Arr.length - 1] = arithmeticMean;
                curve2Arr[0] = arithmeticMean;

                this.curves[curveNum] = new Bezier(curve1Arr);
                this.curves[curveNum + 1] = new Bezier(curve2Arr);
            }
        }
    }

    makeSmooth() {
        this.makeContinuous();

        for (let curveNum = 0; curveNum < this.curves.length - 1; curveNum++) {
            let curve1 = this.curves[curveNum];
            let curve2 = this.curves[curveNum + 1];
            let curve1Arr = curve1.toArray();
            let curve2Arr = curve2.toArray();
            let avg = this.curves[curveNum].derivative(1).add(this.curves[curveNum + 1].derivative(0)).divScalar(2);

            curve1Arr[curve1Arr.length - 2] = ((curve1Arr[curve1Arr.length - 1].mulScalar(curve1Arr.length - 1)).sub(avg)).divScalar(curve1Arr.length - 1);
            curve2Arr[1] = (avg.add((curve2Arr[0]).mulScalar(curve2Arr.length - 1))).divScalar(curve2Arr.length - 1);

            this.curves[curveNum] = new Bezier(curve1Arr);
            this.curves[curveNum + 1] = new Bezier(curve2Arr);
        }
    }

    addCurve(b) {
        this.curves[this.curves.length] = b;
    }

    static arithmeticMean(p1, p2) {
        p1 = p1.toArray();
        p2 = p2.toArray();

        return new Vector([(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]);
    }

    static distance(p1, p2) {
        p1 = p1.toArray();
        p2 = p2.toArray();

        return new Vector([p1[0] - p2[0], p1[1] - p2[1]]);
    }

    getLastPoints() {
        return [
            this.curves[this.curves.length - 1].toArray()[this.curves[this.curves.length - 1].toArray().length - 2],
            this.curves[this.curves.length - 1].toArray()[this.curves[this.curves.length - 1].toArray().length - 1]
        ];
    }
}