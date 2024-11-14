const Student = {
    name: "kvp",
    age: 19,
    eng: 98,
    IT: 99,
    calAvg() {
        console.log("hi");
    }
    
};
function calAvg() {
    let avg = (this.eng + this.IT) / 2;
    console.log(avg);
    console.log(this);
}

