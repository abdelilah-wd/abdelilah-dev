class TypingAnimation {
    constructor(element, texts, textscolors, options = {}) {
        this.element = element;
        this.texts = texts;
        this.textscolors = textscolors;
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        this.start();
    }
    
    start() {
        this.type(Math.floor(Math.random() * 2 + 0));
    }
    
    type(colorIndex) {
        document.querySelector(".hero-content h4").style.color = this.textscolors[colorIndex];
        this.element.style.color = this.textscolors[colorIndex];
        const currentText = this.texts[this.currentTextIndex];
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.element.textContent = "."
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                setTimeout(() => this.type(Math.floor(Math.random() * 2 + 0)), 500);
                return;
            }
            
            setTimeout(() => this.type(undefined), this.deleteSpeed);
        } else {
            // Typing characters
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(undefined), this.pauseTime);
                return;
            }
            
            setTimeout(() => this.type(undefined), this.typeSpeed);
        }
    }
}

export function startTyping(){
    const typingElement = document.querySelector('.typing-text');
    const texts = ['Front-End Developer', 'IT Student'];
    const textscolors = [ '#f9f900', '#00f0f2','#8e00c8']
    
    new TypingAnimation(typingElement, texts, textscolors, {
        typeSpeed: 120,
        deleteSpeed: 60,
        pauseTime: 2000
    });
}
