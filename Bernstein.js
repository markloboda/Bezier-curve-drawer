import {
    Vector
} from "./Vector.js";

export class Bernstein {
    constructor(n, k) {
        this.n = n;
        this.k = k;
    }

    static factorial(x) {
        let z = 1;
        for (let i = 1; i <= x; i++) {
            z *= i;
        }
        return z;
    }

    static binomial(x, y) {
        return (
            Bernstein.factorial(x) /
            (Bernstein.factorial(y) * Bernstein.factorial(x - y))
        );
    }

    value(x) {
        let b;
        if (this.k < 0 || this.k > this.n) {
            b = 0;
        } else {
            b =
                Bernstein.binomial(this.n, this.k) *
                x ** this.k *
                (1 - x) ** (this.n - this.k);
        }
        return b;
    }

    derivative(x) {
        const bLower1 = new Bernstein(this.n - 1, this.k - 1).value(x);
        const bLower2 = new Bernstein(this.n - 1, this.k).value(x);
        return this.n * (bLower1 - bLower2);
    }
}