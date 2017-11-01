function addNumber(_idx){
var str = '';
for(var i = 0; i < _idx; i += 1){
str += Math.floor(Math.random() * 10);
}
return str;
}
 module.exports = {    
      addNumber: addNumber    
    }  