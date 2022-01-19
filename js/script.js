/** Adjust main padding top **/
const main = document.querySelector('main');
const header = document.querySelector('header');

function resetPaddingMain(){
    let headerHeight = header.getBoundingClientRect().height;
    main.style.paddingTop = `${headerHeight}px`;
}
window.addEventListener('load', resetPaddingMain);
window.addEventListener('resise', resetPaddingMain);

/********* Change between game ********/
const gamesCategory = document.querySelectorAll('.games_category');
let gameOneCat = document.querySelector('#game_one');
let gameTwoCat = document.querySelector('#game_two');
let gameThreeCat = document.querySelector('#game_three');

gamesCategory.forEach((cat)=>{
    cat.addEventListener('click', ()=>{
        console.log(cat)
        if(cat.classList.contains('gameone'))
        {
            console.log('gameone')
            gameOneCat.style.display = 'flex';
            gameTwoCat.style.display = 'none';
            gameThreeCat.style.display = 'none';
            removeActive();
            cat.classList.add('active');
        }
        if(cat.classList.contains('gametwo'))
        {
            console.log('gametwo')
            gameOneCat.style.display = 'none';
            gameTwoCat.style.display = 'grid';
            gameThreeCat.style.display = 'none';
            removeActive();
            cat.classList.add('active');
        }
        if(cat.classList.contains('gamethree'))
        {
            console.log('gameone')
            gameOneCat.style.display = 'none';
            gameTwoCat.style.display = 'none';
            gameThreeCat.style.display = 'none';
            removeActive();
            cat.classList.add('active');
        }
    });
});

function removeActive(){
    gamesCategory.forEach((cat)=>{
        cat.classList.remove('active');
    })
}

/********* Game one *********/
const gameOne = document.querySelector('#game_one');

for(let i = 0; i < images_array.length; i ++)
{
    let newImgBox = document.createElement('div');
    newImgBox.setAttribute('class', 'gameone_imgbox');
    let newImg = new Image();
    newImg.src = images_array[i];
    newImgBox.appendChild(newImg)
    gameOne.appendChild(newImgBox);
}


/********* Game Two **********/
const gameTwo = document.querySelector('#game_two');
for(let i = 0; i < 16 ; i ++){
    let newEmptyBox = document.createElement('div');
    newEmptyBox.setAttribute('class', 'empty_box');
    gameTwo.appendChild(newEmptyBox)
}

//  ----------random number --------- //
let randomNumCheck = [];
let randomNumCheckTwo = []
let min = 0;
let max = 8;
function randomNum(){
    for (let i = 0; i < max; i++) {
        do {
            n = Math.floor(Math.random() * (max - min)) + min;
            p = randomNumCheck.includes(n);
            if (!p) {
                randomNumCheck.push(n);
            }
        }
        while (p);
    };
};

function randomNumTwo(){
    for (let i = 0; i < max; i++) {
        do {
            m = Math.floor(Math.random() * (max - min)) + min;
            q = randomNumCheckTwo.includes(m);
            if(!q){
                randomNumCheckTwo.push(m);
            }
        }
        while (q);
    };
};
randomNum();
randomNumTwo();

let newImageArray = [];
for(let i = 0; i < 8; i++){
    newImageArray.push(images_array[randomNumCheck[i]]);
}
for(let i = 0; i < 8; i++){
    newImageArray.push(images_array[randomNumCheckTwo[i]]);
}
for(let i = 0; i < 16 ; i ++){
    let newImg = new Image();
    newImg.src = newImageArray[i];
    let emptyBox = document.querySelectorAll('.empty_box');
    emptyBox[i].appendChild(newImg)
}

/** Check if it's the same image **/
let emptyBox = document.querySelectorAll('.empty_box');
let firstBox, firstBoxImg, firstId;
let currentBox, currentBoxImg, currentId;
let match = false;
let clickCount = 0;
emptyBox.forEach((box, id)=>{
    box.addEventListener('click', ()=>{

        currentBox = box;
        currentBoxImg = box.children[0].src;
        currentId = id;
        box.style.transition = '.3s cubic-bezier(.2,.56,.25,.99)';
        box.style.boxShadow = 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px';
        box.style.border = '2px solid var(--blue-color)';

        clickCount++

        if(typeof firstBoxImg != 'undefined')
        {
            /** get match **/
            if(currentBoxImg == firstBoxImg && firstId != currentId)
            {
                currentBox.style.opacity = '.3';
                currentBox.style.pointerEvents = 'none';
                firstBox.style.opacity = '.3';
                firstBox.style.pointerEvents = 'none';
                firstBoxImg = undefined;
            }
            /** same same **/
            if(currentBoxImg == firstBoxImg && firstId == currentId)
            {
                clickCount = 1;
            }
            /** wrong **/
            if(currentBoxImg != firstBoxImg)
            {
                if(clickCount > 1)
                {
                    clickCount = 0;
                    resetBox();
                    firstBoxImg = null;
                }
            }
        }

        firstBox = currentBox;
        firstBoxImg = box.children[0].src;
        firstId = currentId;
    })
})

function resetBox(){
    emptyBox.forEach((box)=>{
        box.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px';
        box.style.border = 'none';
    })
}