/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 }={} ) {
  // Your code here

     if ( arguments.length==0){
      return null 
     }
    let rateChart = { "veg" : 80 , "nonveg" : 120 , "jain" : 90 }
    return ( name == undefined ||  mealType == null || name == null || name=='' || (!(mealType in rateChart) )) ? null : { "name" : name , "mealType" : mealType , "days" : days , "dailyRate" : rateChart[mealType] ,  "totalCost" : rateChart[mealType] * days  }

}

export function combinePlans(...plans) {
  // Your code here
        if ( plans == undefined || plans.length==0) {
          return null 
        } 

        const result = { totalCustomers : 0, totalRevenue:0, mealBreakdown:{} }

        plans.forEach((ele) => { 
          result.totalCustomers +=1 
          result.totalRevenue += (ele.dailyRate*ele.days) 
          if ( !result.mealBreakdown[ele.mealType]){
            result.mealBreakdown[ele.mealType]=1
          }
          else{
            result.mealBreakdown[ele.mealType]+=1
          }
        })

            return result
   


  // return ( plans == null || plans.length==0) ? null : { "totalCustomers" : plans[0].length , "totalRevenue" : plans[0].reduce( (accumulater , currentvalue) => (accumulater+ currentvalue.totalCost) , 0 ) ,
  //   "mealBreakdown" : getmeals(plans[0])
  //   }
}

export function applyAddons(plan, ...addons) {
  // Your code here

  if ( plan == null) {
    return null 
  }

  let planWithAddon = {...plan}


  addons.forEach((ele) => { 
      planWithAddon.dailyRate+=ele.price
  } )

  planWithAddon.totalCost = (planWithAddon.dailyRate*planWithAddon.days)

  console.log(addons);
  

  return {...planWithAddon , addonNames : addons.map((ele) => ele.name)}

}


console.log(createTiffinPlan())