/**
 * 🚂 Dabbawala Delivery Tracker - Closures
 *
 * Mumbai ke famous dabbawala system ka tracker bana! Yahan closure ka
 * use hoga — ek function ke andar private state rakhna hai jo bahar se
 * directly access nahi ho sakta. Sirf returned methods se access hoga.
 *
 * Function: createDabbawala(name, area)
 *
 * Returns an object with these methods (sab ek hi private state share karte hain):
 *
 *   - addDelivery(from, to)
 *     Adds a new delivery. Returns auto-incremented id (starting from 1).
 *     Each delivery: { id, from, to, status: "pending" }
 *     Agar from ya to empty/missing, return -1
 *
 *   - completeDelivery(id)
 *     Marks delivery as "completed". Returns true if found and was pending.
 *     Returns false if not found or already completed.
 *
 *   - getActiveDeliveries()
 *     Returns array of deliveries with status "pending" (copies, not references)
 *
 *   - getStats()
 *     Returns: { name, area, total, completed, pending, successRate }
 *     successRate = completed/total as percentage string "85.00%" (toFixed(2) + "%")
 *     Agar total is 0, successRate = "0.00%"
 *
 *   - reset()
 *     Clears all deliveries, resets id counter to 0. Returns true.
 *
 * IMPORTANT: Private state (deliveries array, nextId counter) should NOT
 *   be accessible as properties on the returned object.
 *   Two instances created with createDabbawala should be completely independent.
 *
 * Hint: Use closure to keep variables private. The returned object's methods
 *   form a closure over those variables.
 *
 * @param {string} name - Dabbawala's name
 * @param {string} area - Delivery area
 * @returns {object} Object with delivery management methods
 *
 * @example
 *   const ram = createDabbawala("Ram", "Dadar");
 *   ram.addDelivery("Andheri", "Churchgate"); // => 1
 *   ram.addDelivery("Bandra", "CST");         // => 2
 *   ram.completeDelivery(1);                   // => true
 *   ram.getStats();
 *   // => { name: "Ram", area: "Dadar", total: 2, completed: 1, pending: 1, successRate: "50.00%" }
 */
export function createDabbawala(name, area) {
  // Your code here
  let id = 1 
  let delivery =[]

  const addDelivery = function addDelivery(from , to) { 

    const idMain = id 
    id+=1

    delivery.push({ id:idMain , from: from , to: to , status : 'pending'})

     return ( from == null || to ==null || from == undefined || to == undefined || from == '' || to =='' ) ? -1 :  idMain
    //  

  }

  const completeDelivery = function completeDelivery(id) { 

    for (let ele of delivery ){ 
          if( ele.id == id && ele.status == 'pending'){
            ele.status= 'completed'
            return true
          }
          
    }

    return false

  }

  const getActiveDeliveries = function getActiveDeliveries() { 

    let res = []

    return  delivery.filter( (ele) =>  ele.status == 'pending') 


  }

  const getStats  = function getStats(){ 

    let completed =  delivery.filter( (e) => e.status == 'completed').reduce((sum , e)=> ( sum+1) , 0 )
    let pending = delivery.length - completed 
    let successRate =  (100.00*completed/delivery.length) 

    // console.log(completed)
    // console.log(delivery.length)


    return { name:name , area :area , total: delivery.length ,  completed : completed , pending : pending , successRate : (isNaN(successRate)) ? '0.00%' : `${successRate.toFixed(2)}%`}
  }

  const reset = function reset() { 

    delivery = []
    id = 1
    return true

  }

  const res = { addDelivery, completeDelivery  , getActiveDeliveries , getStats , reset}

  return  res 
}




const ram = createDabbawala("Ram", "Dadar");
// console.log(ram.addDelivery("Andheri", "Churchgate") ) ; // => 1
// console.log(ram.addDelivery("Bandra", "CST") ) ;         // => 2
// console.log(ram.addDelivery("Bandra", "CST") ) ;         // => 2
// ram.completeDelivery(1);                   // => true
console.log(ram.getStats() ); 
// => { name: "Ram", area: "Dadar", total: 2, completed: 1, pending: 1, successRate: "50.00%" }