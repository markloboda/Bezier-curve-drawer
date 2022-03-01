export class Vector {
    constructor(coordinates) {
        this.coordinates = coordinates;
    }

    toArray() {
        return this.coordinates;
    }

    length() {
        let sum = 0;
        for (let i = 0; i < this.coordinates.length; i++) {
            sum += this.coordinates[i] * this.coordinates[i];
        }
        return Math.sqrt(sum);
    }

    add(v) {
        if (this.coordinates.length == v.toArray().length) {
            let newVectorArray = [];
            for (let i = 0; i < this.coordinates.length; i++) {
                newVectorArray[i] = this.coordinates[i] + v.toArray()[i];
            }
            return new Vector(newVectorArray);
        } else {
            console.log("Vektorja imata razlicno stevilo koordinat.");
        }
    }

    sub(v) {
        if (this.coordinates.length == v.toArray().length) {
            let newVectorArray = [];
            for (let i = 0; i < this.coordinates.length; i++) {
                newVectorArray[i] = this.coordinates[i] - v.toArray()[i];
            }
            return new Vector(newVectorArray);
        } else {
            console.log("Vektorja imata razlicno stevilo koordinat.");
        }
    }

    mul(v) {
        if (this.coordinates.length == v.toArray().length) {
            let newVectorArray = [];
            for (let i = 0; i < this.coordinates.length; i++) {
                newVectorArray[i] = this.coordinates[i] * v.toArray()[i];
            }
            return new Vector(newVectorArray);
        } else {
            console.log("Vektorja imata razlicno stevilo koordinat.");
        }
    }

    div(v) {
        if (this.coordinates.length == v.toArray().length) {
            let newVectorArray = [];
            for (let i = 0; i < this.coordinates.length; i++) {
                newVectorArray[i] = this.coordinates[i] / v.toArray()[i];
            }
            return new Vector(newVectorArray);
        } else {
            console.log("Vektorja imata razlicno stevilo koordinat.");
        }
    }

    mulScalar(s) {
        let newVectorArray = [];
        for (let i = 0; i < this.coordinates.length; i++) {
            newVectorArray[i] = this.coordinates[i] * s;
        }
        return new Vector(newVectorArray);
    }

    divScalar(s) {
        let newVectorArray = [];
        for (let i = 0; i < this.coordinates.length; i++) {
            newVectorArray[i] = this.coordinates[i] / s;
        }
        return new Vector(newVectorArray);
    }
}
