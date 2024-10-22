const a = document.getElementById("a").value;
const b = document.getElementById("b").value;
const c = document.getElementById("c").value;

const heronFormula = (a,b,c) => {
    const sa = a*a
    const sb = b*b
    const sc = c*c
    const abc = sa + sb - sc
    const response = (sqrt((4 * sa * sb) - (abc * abc)))/4

    return response
}

console.log(heronFormula(a,b,c))