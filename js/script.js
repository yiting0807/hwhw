
   // function fadeIn(content,speed){
   //    if(content.style.opacity !=1){
   //        var speed = speed || 30 ;
   //        var num = 0;
   //        var st = setInterval(function(){
   //        num++;
   //        content.style.opacity = num/10;
   //        if(num>=10)  {  clearInterval(st);  }
   //        },speed);
   //    }
   // }
   
   // function fadeOut(element){
   //    if(element.style.opacity !=0){
   //        var speed = speed || 30 ;
   //        var num = 10;
   //        var st = setInterval(function(){
   //        num--;
   //        element.style.opacity = num / 10 ;
   //        if(num<=0)  {   clearInterval(st);  }
   //        },speed);
   //    }
   
   // }
   
   // function btnIn(){
   //    fadeIn(div1,100);
   // }
   
   // function btnOut(){
   //    fadeOut(div2,100);
   // }
  
  $(document).ready(function(){
    $(".btn1").click(function(){
     $(".content").fadeToggle('slow');
   });

   $(".btn2").click(function(){
      $(".content2").fadeToggle('slow');
    });
 

});





const model = {
  images: [
      "img/seoulfood.jpg",
      "img/seoulsite.jpg",
      "img/seoulclothingstore.jpg",
  ],
  
  timerID: null,
  
  _index: 0,
  get imageAmount() {
      
      return this.images.length
  },
  set index(value) {
      if (value < 0) {
          this._index = this.imageAmount - 1
      } else if (value >= this.imageAmount) {
          this._index = 0
      } else {
          this._index = value
      }

      view.render()
  },
  get index() {
      return this._index
  },
}

function resetWrapper(func) {
  
  return function (...args) {
      if (model.timerID) {
          clearInterval(model.timerID)
      }
      model.timerID = controller.run()

      return func(...args)
  }
}
const controller = {
  init() {
      
      model.timerID = this.run()

      document.querySelector(".carousel .left").onclick = this.leftShift
      document.querySelector(".carousel .right").onclick = this.rightShift
  },
  leftShift: resetWrapper(() => {
      model.index -= 1
  }),
  rightShift: resetWrapper(() => {
      model.index += 1
  }),
  setIndex: resetWrapper((idx) => {
      model.index = idx
  }),
  run() {
      return setInterval(() => {
          model.index++
      }, 3000)
  },
}

const view = {
  init() {
      
      const container = document.querySelector(".carousel .container")
      for (let url of model.images) {
          const image = document.createElement("img")
          image.src = url

          container.append(image)
      }

      this.render()
  },
  render: function () {
      carousel = document.querySelector(".carousel")

      carousel.querySelector(".container").style.left = `${
          model.index * carousel.clientWidth * -1
      }px`

      const bottom = carousel.querySelector(".bottom")

      
      bottom.innerHTML = ""
      for (let i = 0; i < model.imageAmount; i++) {
          
          const indicator = document.createElement("div")
          indicator.classList.add("indicator")

          if (i === model.index) {
              
              indicator.classList.add("activate")
          }

          indicator.onclick = () => controller.setIndex(i)

          bottom.append(indicator)
      }
  },
}

controller.init()
view.init()