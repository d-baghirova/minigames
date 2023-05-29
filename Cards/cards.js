let cvs = document.querySelector('canvas');
let ctx = cvs.getContext('2d');

let x = cvs.width/2-60;
let y = cvs.height/2-70;
let p = false;

let fail = new Image();
let victory = new Image();
let cont = new Image();
let card1 = new Image();
let card2 = new Image();
let card3 = new Image();
let card4 = new Image();
let card5 = new Image();
let card6 = new Image();  
let card7 = new Image();
let card8 = new Image();

const vegies = new Audio('./music/vegies.mp3');

fail.src = './images/fail.png';
victory.src = './images/victory.png';
cont.src = './images/continue.png';
card1.src = './images/card1.jpg';
card2.src = './images/card2.jpg';
card3.src = './images/card3.jpg';
card4.src = './images/card4.jpg';
card5.src = './images/card5.jpg';
card6.src = './images/card6.jpg';
card7.src = './images/card7.jpg';
card8.src = './images/card8.jpg';

let card = [card1, card2, card3, card4, card5, card6, card7, card8, card1, card2, card3, card4, card5, card6, card7, card8];
let cards = shuffle(card);
let corcards = [[0,0], [1,0], [2,0], [3,0], [0,1], [1,1], [2,1], [3,1], [0,2], [1,2], [2,2], [3,2], [0,3], [1,3], [2,3], [3,3]];

function oppa() {
    cards = shuffle(cards);
    pasyans(x, y,cards);
    ctx.fillStyle='white';
    ctx.fillRect(cvs.width/2-30, cvs.height/2-11, 60, 15);
    ctx.fillStyle = 'black';
    ctx.fillText('Play', cvs.width/2-10, cvs.height/2);
}

function shuffle(lst){
    for (let i = lst.length-1; i >= 0; i--){
        let randomInt = Math.floor(Math.random()*(i+1));
        [lst[i], lst[randomInt]] = [lst[randomInt], lst[i]];
    }
    return lst
}

function pasyans(x, y, lst) {
    lst.forEach(el=>{
        ctx.drawImage(el, x, y, 30, 35);
        x += 30;
        if(x >= cvs.width/2+60){
            y+=35;
            x = cvs.width/2-60;
        }
    })
}

function shuffle(lst){
    for (let i = lst.length-1; i >= 0; i--){
        let randomInt = Math.floor(Math.random()*(i+1));
        [lst[i], lst[randomInt]] = [lst[randomInt], lst[i]];
    }
    return lst
}

function hideCards(x, y,lst) {
    lst.forEach(()=>{
        ctx.fillStyle='#c9a1e7';
        ctx.strokeStyle='white';
        ctx.fillRect(x, y, 30, 35);
        ctx.strokeRect(x, y, 30, 35);
        x += 30;
        if(x >= cvs.width/2+60){
            y+=35;
            x = cvs.width/2-60;
        }
    })
}

function coorabs(cvs,event) {
    let xc = event.pageX - cvs.offsetLeft;
    let yc = event.pageY - cvs.offsetTop;
    let xy = [xc, yc];
    return xy;
}

function coorrel(lst, xx, yy){
    let c = [0, 0];
    for (let i=0; i<4; i++){
        if(lst[0]>=xx+100*i+5 && lst[0]<=xx+100*(i+1)){
            c[0]=i;
        } 
        if(lst[1]<=yy+5+135*i && lst[1]>=yy+135*(i-1)+10){
            c[1]=i;
        }
    }
    return c;
}

function place(rel){
    let arr = corcards.flat(Infinity);
    let xy = [cvs.width/2-60,cvs.height/2-70];
    for (let i=0; i<2*corcards.length; i++){
        if (i%2===0){
            if (rel[0]===arr[i] && rel[1]===arr[i+1]){
                for (let j=0;j<4;j++){
                    if ((i/2)%4===j){
                        xy[0] = cvs.width/2-60+30*j;
                    } 
                    if ((i/2)>=4*j){
                        xy[1] = cvs.height/2-70+35*j;
                    }
                }
            }
        }
    }
    return xy;
}

function pick(rel){
    let arr = corcards.flat(Infinity);
    let ar = place(rel);
    for (let i=0; i<2*corcards.length; i++){
        if (i%2===0){
            if (rel[0]===arr[i] && rel[1]===arr[i+1]){
                ar.push(cards[i/2]);
                ctx.drawImage(cards[i/2],ar[0],ar[1],30,35);
            }
        }
    }
    return ar;
}

function compare(c){
    if (c[0][2] !== c[1][2]){
        close(c[0][0], c[0][1]);
        close(c[1][0], c[1][1]);
    } else {
        return true;
    }
}

function close(x,y){
    ctx.fillStyle='#c9a1e7';
    ctx.strokeStyle='white';
    ctx.fillRect(x, y, 30, 35);
    ctx.strokeRect(x, y, 30, 35);
}

let count = 0;
let clickCount = 0;
let couple = [];
let yeah = 0;

function handle(e){
    pick(coorrel(coorabs(cvs,e), cvs.width, cvs.height));
    count +=1;
    clickCount += 1;
    couple.push(pick(coorrel(coorabs(cvs,e), cvs.width, cvs.height)));
    if (count == 3){
        count = 1;
        compare(couple);
        if (compare(couple)==true){
            yeah +=1;
        }
        couple.splice(0,2);
        if (yeah >= 8 && clickCount <= 20){
            oppa();
            removeEventListener('click',handle);
            couple = [];
            count = 0;
            clickCount = 0;
            yeah = 0;
            go();
            return false;
        } else if (yeah < 8 && clickCount>20){
            oppa();
            couple = [];
            count = 0;
            clickCount = 0;
            yeah = 0;
            removeEventListener('click',handle);
            count = 0;
            clickCount = 0; 
            go();
            return false;
        }
    }
}

function picker(){
    window.addEventListener('click', handle);
}

function hide(){
    hideCards(x,y,cards);
    window.removeEventListener('click',hide);
    picker();
    return true;
}

function go(){
    window.addEventListener('click',hide);
}


function draw() {
    oppa(); 
    go();
    picker();
}



function run(){
    vegies.play();
    card8.onload = draw;
}

run();