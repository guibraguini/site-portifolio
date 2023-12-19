import './anime.js';
const svg = document.getElementById("draw");

const a = anime({
    targets: '.css-prop-demo .el',
    left: '240px',
    backgroundColor: '#FFF',
    borderRadius: ['0%', '50%'],
    easing: 'easeInOutQuad'
  });
function changedraw(a){
    //document.getElementById("draw").viewBox.baseVal.width = a.boxW;
    //document.getElementById("draw").viewBox.baseVal.widthheight = a.boxH;
    timeline.add({targets: ".path1", d: [{ value: a.path1 }]});
    timeline.add({targets: ".path2", d: [{ value: a.path2 }]});
    timeline.add({targets: ".path3", d: [{ value: a.path3 }]});
    timeline.add({targets: ".path4", d: [{ value: a.path4 }]});
    timeline.add({targets: ".path5", d: [{ value: a.path5 }]});
    timeline.add({targets: ".path6", d: [{ value: a.path6 }]});
    timeline.add({targets: ".path7", d: [{ value: a.path7 }]});
    timeline.add({targets: ".path8", d: [{ value: a.path8 }]});
    time2.add({targets: ".path9", strokeWidth: 10});
}

//window.addEventListener("load", () => {changedraw(t1)});
window.addEventListener("load", () => {
   time2.add({targets: ".write", strokeWidth: 5});
});