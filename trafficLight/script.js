function trafficLight(){
    const red = document.getElementById("red");
    const yellow = document.getElementById("yellow");
    const green = document.getElementById("green");

    red.classList.remove("on");
    yellow.classList.remove("on");
    green.classList.remove("on");

    red.classList.add("on");

    setTimeout(()=>{
     red.classList.remove("on");
     yellow.classList.add("on");
    },1000)

    setTimeout(()=>{
   yellow.classList.remove("on");
   green.classList.add("on")
    },2000)

setTimeout(()=>{
 green.classList.remove("on");
 trafficLight();
},3000)

}


trafficLight();