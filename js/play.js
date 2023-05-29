let c1 = document.getElementById('c1');

let keys = ['c1', 'c1#', 'd1', 'd1#', 'e1', 'f1', 'f1#', 'g1', 'g1#', 'a1', 'a1#', 'b1', 'c2', 'c2#', 'd2', 'd2#', 'e2', 'f2', 'f2#', 'g2', 'g2#', 'a2', 'a2#', 'b2'];
let keyboard = ['q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u', 'z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm']
let notes = [];

keys.forEach(function(key) {
    notes.push(document.getElementById(key))
});

function changeColor(event) {
    event.target.style.backgroundColor = "#A9A29D";
};

function returnColor(event) {
    event.target.style = '';
};

const play = (note) => {
    note.addEventListener('mousedown',changeColor);
    note.addEventListener('mouseup',returnColor);
    
    document.addEventListener('keydown', (event) => {
        let name = event.key;
        if (name===keyboard[notes.indexOf(note)]){
        note.style.backgroundColor = "#A9A29D";}
      });
    
    document.addEventListener('keyup', (event) => {
      let name = event.key;
      if (name==keyboard[notes.indexOf(note)]){
        note.style = '';}
    });
};

notes.forEach(play);



