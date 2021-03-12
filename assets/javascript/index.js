// ======================== SHOW BACKGROUND NAV ======================== 

window.addEventListener('scroll', event =>{
    let nav = document.querySelector('.navbar');
    
    (window.scrollY >= 20) ? nav.classList.add('sticky') : nav.classList.remove('sticky')
    
})


// =====================  MENU  ======================


let menuBtn = document.querySelector('.menu-btn');
let icon = document.querySelector('.menu-btn i');
let  navUl = document.querySelector('.nav-ul');
let navLinks = document.querySelectorAll('.nav-link')

const tagsActive = [navUl, icon]

// SHOW MENU-BURGUER ON CLICK
menuBtn.addEventListener('click', event =>{


    tagsActive.forEach(tag => tag.classList.toggle('active'))

})

// REMOVE MENU-BURGUER ON CLICK IN NAV-LINK
navLinks.forEach(link => link.addEventListener('click', () => tagsActive.forEach(tag => tag.classList.remove('active'))  ))



//   ================================ ABOUT =============================

//  ************Typing words*********


class TypeWriter{
    constructor(txtElement, words,wait = 3000){
        this.txtElement = txtElement;
        this.words = words;
        this.wait = parseInt(wait,10)
        this.txt= '';
        this.wordIndex = 0;
        this.type();
        this.isDeleting = false; 
    }

    type(){
        // current index of word

    const current = this.wordIndex % this.words.length;

    // get full text of current word

    const fullTxt= this.words[current]

    // check if deleting
    if(this.isDeleting){
        // remove char
        this.txt = fullTxt.substring(0,this.txt.length - 1)
    }else{
    // add char
    this.txt = fullTxt.substring(0,this.txt.length + 1)
    }

    // insert txt into a element
    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`


    // Initial type speed
    let typeSpeed = 100;

    if(this.isDeleting){
        typeSpeed /= 2
    }

    // check if word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        // make pause at end
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt===''){
        this.isDeleting = false;

        // move to next word
        this.wordIndex++

        // pause beforte start typing
        typeSpeed = 500
    }

    setTimeout(()=> this.type(), typeSpeed);
    }
}


// Init on DOM load
document.addEventListener('DOMContentLoaded', init)

// Init app
function init(){
    const txtElement = document.querySelector('.txt-type')
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait')

    new TypeWriter(txtElement,words,wait)
}


// ============================== PORTFOLIO ======================

// **************** slide
document.addEventListener('DOMContentLoaded', ()=>{
    changeBackground()
})

let numberImgs = 4
let indexValue= 1;
let indexLoop = 1
const namesProjects = [
    'Landing page Easybank',
    'Landing page for Christmas',
    'Landing page portfolio not-real',
    'Formulary challange FreeCodeCamp'
]

const linksProjects = [
    'https://dedecanton.github.io/easybank-landing-page/',
    'http://dedecanton.github.io/christmas-landing-page/',
    'https://dedecanton.github.io/portfolio-landing-page1/',
    'https://codepen.io/dedecanton/full/XWNPMGW'
]

const sectionPortfolio = document.querySelector('#portfolio')




changeBackground = () =>{

    if(indexValue > numberImgs) indexValue=1 
    if(indexValue <= 0) indexValue = 1

    setBackground(indexValue)
    btnSlideStyle(indexValue)
    showProjectDatas(indexValue)

}

function setBackground(index){
    sectionPortfolio.style.backgroundImage = `linear-gradient(rgba(17, 17, 19,85%), rgba(17, 17, 19,95%) ),url('./images/project${index}.png')`   
}

function btnSlideStyle(index){
    const btnSlides = document.querySelectorAll('.btn-slider span')
    btnSlides.forEach(element => element.classList.remove('current'))
    btnSlides[index - 1].classList.add('current')
}

function showProjectDatas(index){
    const h3ProjectName = document.querySelector('.project-name a')
    h3ProjectName.innerText = namesProjects[index - 1]
    h3ProjectName.setAttribute('href', linksProjects[index - 1])

}

function loopSlider(){
    indexValue++
    if(indexValue > numberImgs) indexValue = 1
    changeBackground()
}


//altern slide by click on btn-circle 
btn_slide = index=> changeBackground(indexValue = index) 

// altern slide by click on arrows 
side_slide = index => changeBackground(indexValue += index)



setInterval(loopSlider, 5000)