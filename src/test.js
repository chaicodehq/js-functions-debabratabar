let arr1 = [1,2,3]
let arr2 = [...arr1] 


arr1.push(4)

console.log(arr2.slice(4));


function add(...data){
  console.log(data);
  
}



add(1,2,3,4,5)


console.log(arr1.slice(1));
