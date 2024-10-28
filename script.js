document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('heron').addEventListener('submit', function (event) {
        event.preventDefault();

        const a = parseFloat(document.getElementById("heron-a").value);
        const b = parseFloat(document.getElementById("heron-b").value);
        const c = parseFloat(document.getElementById("heron-c").value);

        const sa = a * a
        const sb = b * b
        const sc = c * c
        const abc = sa + sb - sc
        const response = (Math.sqrt((4 * sa * sb) - (abc * abc))) / 4

        document.getElementById("heron-result").value = response.toFixed(2);
    });

    document.getElementById('ambig').addEventListener('submit', function (event) {
        event.preventDefault();

        const A = parseFloat(document.getElementById("ambig-angle-A").value);
        const a = parseFloat(document.getElementById("ambig-side-a").value);
        const b = parseFloat(document.getElementById("ambig-side-b").value);

        const radA = A * (Math.PI / 180);
        const h = b * Math.sin(radA);

        let response = "";

        if (A < 90) {
            if (a < h) {
                response = "No Triangle";
            } else if (a === h) {
                response = "Right Triangle";
            } else if (a > b) {
                response = "One Triangle";
            } else if (h < a && a < b) {
                response = "Two Triangles (ambiguous)";
            }
        } else {
            if (a <= h) {
                response = "No Triangle";
            } else if (a > b) {
                response = "One Triangle";
            }
        }

        document.getElementById("ambig-result").value = response;
    });

    document.getElementById('poly').addEventListener('submit', function (event) {
        event.preventDefault();

        const coeff = document.getElementById("poly-coeff").value.split(' ').map(Number);
        const exp = document.getElementById("poly-exp").value.split(' ').map(Number);
        const x = parseFloat(document.getElementById("poly-x").value);

        let poly = 0;

        for (let i = 0; i < coeff.length; i++) {
            poly += coeff[i] * Math.pow(x, exp[i]);
        }

        document.getElementById("poly-result").value = poly.toFixed(2);
    });

    document.getElementById('newt').addEventListener('submit', function (event) {
        event.preventDefault();

        const zeroX = parseFloat(document.getElementById("newt-g").value);

        let func = [6, -13, -18, 7, 6];
        let dFunc = [24, -39, -36, 7];

        let funcValue = 0;
        let dFuncValue = 0;

        for (let i = 0; i < func.length; i++) {
            funcValue += func[i] * Math.pow(x, (func.length-i));
            if (i < dFunc.length){
                dFuncValue += dFunc[i] * Math.pow(x, (func.length-i));
            }
        }

        document.getElementById("poly-result").value = poly.toFixed(2);
    });
});