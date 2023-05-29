let sounds1 = new Audio('../mp3/c1.mp3')
let c1 = document.getElementById('c1');

let keys = ['c1', 'c1#', 'd1', 'd1#', 'e1', 'f1', 'f1#', 'g1', 'g1#', 'a1', 'a1#', 'b1', 'c2', 'c2#', 'd2', 'd2#', 'e2', 'f2', 'f2#', 'g2', 'g2#', 'a2', 'a2#', 'b2', 'c3'];
let keyboard = ['q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u', 'z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', ',']
let notes = [];
let sounds = [new Audio('../mp3/c1.mp3'), new Audio('../mp3/c1d.mp3'), new Audio('../mp3/d1.mp3'), 
new Audio('../mp3/d1d.mp3'), new Audio('../mp3/e1.mp3'), new Audio('../mp3/f1.mp3'), new Audio('../mp3/f1d.mp3'),
new Audio('../mp3/g1.mp3'), new Audio('../mp3/g1d.mp3'), new Audio('../mp3/a1.mp3'), new Audio('../mp3/a1d.mp3'),
new Audio('../mp3/b1.mp3'), new Audio('../mp3/c2.mp3'), new Audio('../mp3/c2d.mp3'), new Audio('../mp3/d2.mp3'), 
new Audio('../mp3/d2d.mp3'), new Audio('../mp3/e2.mp3'), new Audio('../mp3/f2.mp3'), new Audio('../mp3/f2d.mp3'),
new Audio('../mp3/g2.mp3'), new Audio('../mp3/g2d.mp3'), new Audio('../mp3/a2.mp3'), new Audio('../mp3/a2d.mp3'),
new Audio('../mp3/b2.mp3'), new Audio('../mp3/c3.mp3')];

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
    // note.addEventListener('mousedown',changeColor);
    // note.addEventListener('mouseup',returnColor);

    

    document.addEventListener('mousedown', (event) => {
      let name = event.target.id;
      if (name===keys[notes.indexOf(note)]){ 
      note.style.backgroundColor = "#A9A29D";
      sounds[notes.indexOf(note)].currentTime = 1;
      sounds[notes.indexOf(note)].play();}
    });
  
  document.addEventListener('mouseup', (event) => {
    let name = event.target.id;
    if (name==keys[notes.indexOf(note)]){
      note.style = '';}
    sounds[notes.indexOf(note)].stop();
  }); 
    
    document.addEventListener('keydown', (event) => {
        let name = event.key;
        if (name===keyboard[notes.indexOf(note)]){ 
        note.style.backgroundColor = "#A9A29D";
        sounds[notes.indexOf(note)].currentTime = 1;
        sounds[notes.indexOf(note)].play();}
      });
    
    document.addEventListener('keyup', (event) => {
      let name = event.key;
      if (name==keyboard[notes.indexOf(note)]){
        note.style = '';}
      sounds[notes.indexOf(note)].stop();
    }); 
};

notes.forEach(play);
