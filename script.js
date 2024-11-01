document.addEventListener('DOMContentLoaded', function () {
    const heronForm = document.getElementById('heron');
    const heronResult = document.getElementById("heron-result");

    const ambigForm = document.getElementById('ambig');
    const ambigResult = document.getElementById("ambig-result");

    const polyForm = document.getElementById('poly');
    const polyResult = document.getElementById("poly-result");

    const newtonForm = document.getElementById('newt');
    const newtonResult = document.getElementById("newt-result");

    function calculateHeron(a, b, c) {
        return 0.25 * Math.sqrt(4 * a * a * b * b - Math.pow(a * a + b * b - c * c, 2));
    }

    function calculateAmbiguousCase(A, a, b) {
        const h = b * Math.sin(A * (Math.PI / 180));
        if (A === 90) {
            return (a > b) ? "Right Triangle" : "No Triangle";
        } else if (A < 90) {
            if (a < h) return "No Triangle";
            if (a === h) return "Right Triangle";
            return (a >= b) ? "One Triangle" : "Two Triangles (ambiguous)";
        } else {
            return (a <= b) ? "No Triangle" : "One Triangle";
        }
    }

    function evaluatePolynomial(coeff, exp, x) {
        let expression = ["f(x) = ", 0];

        coeff.forEach((c, i) => {

            expression[0] += (i > 0 ? (c >= 0 ? " + " : " - ") : "") + (Math.abs(c) === 1 && exp[i] !== 0 ? "" : Math.abs(c));
            expression[0] += exp[i] === 0 ? "" : exp[i] === 1 ? "x" : `x^${exp[i]}`;
            expression[1] += c * (x ** exp[i]);
        });

        return `${expression[0]}\nf(${x}) = ${expression[1].toFixed(2)}`;
    }

    function newtonMethod(initialGuess) {
        let currentGuess = parseFloat(initialGuess);
        const func = [6, -13, -18, 7, 6];
        const dFunc = [24, -39, -36, 7];
        const tolerance = 1e-8;
        const maxIterations = 100;

        for (let i = 0; i < maxIterations; i++) {
            let funcValue = 0, dFuncValue = 0;

            func.forEach((coef, x) => {
                funcValue += coef * (currentGuess ** (func.length - x - 1));
                if (x < dFunc.length) dFuncValue += dFunc[x] * (currentGuess ** (dFunc.length - x - 1));
            });

            if (Math.abs(funcValue) < tolerance) break;

            currentGuess -= funcValue / dFuncValue;
        }

        return currentGuess.toFixed(2);
    }

    heronForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const a = parseFloat(heronForm.elements["heron-a"].value);
        const b = parseFloat(heronForm.elements["heron-b"].value);
        const c = parseFloat(heronForm.elements["heron-c"].value);
        heronResult.value = calculateHeron(a, b, c).toFixed(2);
    });

    ambigForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const A = parseFloat(ambigForm.elements["ambig-angle-A"].value);
        const a = parseFloat(ambigForm.elements["ambig-side-a"].value);
        const b = parseFloat(ambigForm.elements["ambig-side-b"].value);
        ambigResult.value = calculateAmbiguousCase(A, a, b);
    });

    polyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const coeff = polyForm.elements["poly-coeff"].value.split(' ').map(Number);
        const exp = polyForm.elements["poly-exp"].value.split(' ').map(Number);
        const x = parseFloat(polyForm.elements["poly-x"].value);
        polyResult.value = evaluatePolynomial(coeff, exp, x);
    });

    newtonForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const initialGuess = newtonForm.elements["newt-g"].value;
        newtonResult.value = newtonMethod(initialGuess);
    });
});
