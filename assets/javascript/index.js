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


// *********** BACKGROUND ANIMATION IN SECTION SELECTED*******

