let pics = ['css/img/chloe.jpg', 'css/img/taco.jpg', 'css/img/oasis.jpg', 'css/img/vgalaxy.jpg']
let count = 0
let previous = document.getElementById('back');
let next = document.getElementById('next');

previous.addEventListener("click", function(){
  count --
  if(count<0){
    count = pics.length -1
  }
  document.getElementById('mainimage').setAttribute('src',pics[count]);

});

next.addEventListener("click", function(){
  count ++
  if(count == pics.length){
    count= 0
  }
  document.getElementById('mainimage').setAttribute('src',pics[count]);

});
