let counter1=0
let counter2=1
let bool = true

const sections = document.querySelectorAll('section')
const progress = document.querySelector(".progress h2")
const circles = document.querySelectorAll(".circle")
const menu = document.querySelector(".menu")
const section1Wrapper = document.querySelector(".section-1-wrapper")
const section2Wrapper = document.querySelector(".section-2-wrapper")
const section3Wrapper = document.querySelector(".section-3-wrapper")
const section4Wrapper = document.querySelector(".section-4-wrapper")

section1Wrapper.style.transform = 'scale(1)'

window.onload = () => {

    section2Wrapper.style.visibility = 'visible'
    section3Wrapper.style.visibility = 'visible'
    section4Wrapper.style.visibility = 'visible'

}

const navList = document.querySelector('.nav-list');
Array.from(navList.children).forEach((link, index) => {
    link.setAttribute('data-index', `${index}`);
});

navList.addEventListener('click', (event) => {
    
    const selectedIndex = Number(event.target['dataset']['index']);
 
    if (isNaN(selectedIndex)) return;
 
    if (selectedIndex > counter1) {
        for (let i = counter1; i < selectedIndex; i++) {
            counter1++;
            counter2++;
            document.querySelector(`.section-${counter1}`).style.left = '-100vw';
            document.querySelector(`.section-${counter1}-wrapper`).style.transform = 'scale(1.5)';
        }
        document.querySelector(`.section-${selectedIndex + 1}-wrapper`).style.transform = 'scale(1)';
        progressCounter();
    }
 
    if (selectedIndex < counter1) {
        const temp = counter1;
        for (let i = temp; i > selectedIndex; i--) {
            counter1--;
            counter2--;
            document.querySelector(`.section-${counter2}`).style.left = '0';
            document.querySelector(`.section-${counter2 + 1}-wrapper`).style.transform = 'scale(1.5)';
        }
        document.querySelector(`.section-${selectedIndex + 1}-wrapper`).style.transform = 'scale(1)';
        progressCounter();
    }
    document.querySelector('.navbar').classList.toggle('change')
});

const progressCounter = () => {
    progress.textContent = `${counter2}/${sections.length}`

    Array.from(circles).forEach(circle=>{
        circle.style.backgroundColor = 'transparent'
        document.querySelector(`.circle-${counter2}`).style.backgroundColor = "#ddd"
    })
}

const pageController = () => {
    bool=true

    if (counter1 === 4){
        Array.from(sections).forEach(section=> {
            section.style.left = '0'
        })
        counter1=0
        counter2=1
        section1Wrapper.style.transform = 'scale(1)'
        section4Wrapper.style.transform = 'scale(1.5)'
        progressCounter()
        bool=false
    }

    if (counter1 === -1){
        Array.from(sections).forEach(section=> {
            if (section.classList[0] === 'section-4') {
                return
            }
            section.style.left = '-100vw'
        })
        counter1=3
        counter2=4
        section1Wrapper.style.transform = 'scale(1.5)'
        section4Wrapper.style.transform = 'scale(1)'
        progressCounter()    
        bool=false
    }
    progressCounter()

    return bool
}

window.addEventListener('wheel', (e)=>{
    
    
    const deltaY = e.deltaY > 0
    
    if (deltaY){
        counter1++
        counter2++
    } else {
        counter1--
        counter2--
    }

    
    pageController()
    progressCounter()

    if (bool){
        document.querySelector(`.section-${deltaY ? counter1 : counter2}`).style.left = `${deltaY ? "-100vw" : "0"}`
        document.querySelector(`.section-${deltaY ? counter1 : counter2}-wrapper`).style.transform = `scale(${deltaY ? "1.5" : "1"})`
        document.querySelector(`.section-${deltaY ? counter1 + 1 : counter2 + 1}-wrapper`).style.transform = `scale(${deltaY ? "1" : "1.5"})`
    } 
    
})

document.querySelector('.left-btn').addEventListener('click', ()=>{
    
    counter1--;
    counter2--;
    pageController() &&
      (document.querySelector(`.section-${counter2}`).style.left = "0");
  
    if (bool) {
      document.querySelector(`.section-${counter2}-wrapper`).style.transform =
        "scale(1)";
      document.querySelector(`.section-${counter2 + 1}-wrapper`).style.transform =
        "scale(1.5)";
    }
})

document.querySelector('.right-btn').addEventListener('click', ()=>{
    
    counter1++;
  counter2++;
  pageController() &&
    (document.querySelector(`.section-${counter1}`).style.left = "-100vw");

  if (bool) {
    document.querySelector(`.section-${counter2}-wrapper`).style.transform =
      "scale(1)";
    document.querySelector(`.section-${counter1}-wrapper`).style.transform =
      "scale(1.5)";
  }
})

document.querySelector('.footer-img').addEventListener('mouseover', () => {
    document.querySelector('.section-4-wrapper').style.opacity = '.5'
})
document.querySelector('.footer-img').addEventListener('mouseout', () => {
    document.querySelector('.section-4-wrapper').style.opacity = '1'
})

menu.addEventListener('click', () => {
    
    document.querySelector('.navbar').classList.toggle('change')
})
