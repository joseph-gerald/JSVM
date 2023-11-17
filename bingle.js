let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
//const hash = _ => _.split("").map((x) => x.charCodeAt()).reduce(((e,a)=>(a^e/a|a&a|e<<(e.length|e<<a|1E-5)<<(e.length|41*e.length)<<(e*e))+""+e)).split("").slice(6,26).join("");
const hash = _ => _.split("").map((_=>_.charCodeAt())).reduce(((_,$)=>($^_/$|$&$|_<<(_.length|_<<$|1e-5)<<(_.length|41*_.length)<<_*_)+""+_)).split("").slice(6,26).join("");
const inputs = [];
const digests = [];

for(let i = 0; i < 1000; i++){
    const text = btoa(Math.random());
    const digest = hash(text)
    //let evaled = eval(digest.replaceAll("-","+")).toString().split("e+").join(digest.length).replaceAll(".","");

    inputs.push(text)
    digests.push(digest);
}

console.log(digests)

console.log(findDuplicates(inputs))
console.log(findDuplicates(digests))