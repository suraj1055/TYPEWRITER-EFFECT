const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
    //current index of word
    const current = this.wordIndex % this.words.length;
    
    //Get full text of current word
    const fullTxt = this.words[current];

    //check if deleting
    if(this.isDeleting) {
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else {
        //Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Insert txt to element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial type speed
    let typeSpeed = 100;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        
        //Make pause at end
        typeSpeed = this.wait;

        //Set delete to true
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.txt === '')
    {
        this.isDeleting = false;

        //Move to Next word
        this.wordIndex++;

        //Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);

}