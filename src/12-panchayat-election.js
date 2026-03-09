/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Your code here
  candidates.forEach((ele) => ele.votes =0 )
  const candidateList = new Set(candidates)
  const voterList = {}
  const voteCastes = []


  function registerVoter(voter) {
    
    if (  voter == null || Object.keys(voter).length==0 || voter.age <18 || Object.keys(voterList).includes(voter.id)){
      return false
    }
    voterList[voter.id] = {...voter , voted :''}
    // console.log(Object.entries(voterList).length)
    // console.log(voterList)
    // console.log(candidateList)

    return true    
    
  } 


  function castVote(voterId, candidateId, onSuccess, onError) {
    // console.log(voterList)
    if ( !Array.from(candidateList).find((ele) => ele.id == candidateId )){
      return onError("Candidate not present") 
    }

    if ( !voterList[voterId] ){
      return onError("Voter not registered") 
    }

    if ( voterList[voterId]['voted'] !='' ){
      return onError("Voting Done") 
    }
    // console.log(voterList[voterId]['voted']);
    
    voterList[voterId]['voted'] =candidateId

    Array.from(candidateList).forEach((ele) => { 
      if ( ele.id == candidateId){        
        ele.votes+=1
      }
      
    })
    voteCastes.push({voterId , candidateId})

    // console.log(voterList);
    return onSuccess({voterId , candidateId})

  }


  function getResults(sortFn){

    if ( sortFn !=null){
      return Array.from(candidateList).sort(sortFn)
    }
  
      return Array.from(candidateList).sort((a,b) => ( b.votes - a.votes ))

  }


  function getWinner(){

    if ( voteCastes.length==0){
          return null 
    }
    
    let candidateListArr = Array.from(candidateList).sort((a,b) => ( b.votes - a.votes ))

    // console.log(candidateListArr);
    

   return {id : candidateListArr[0].id , name : candidateListArr[0].name ,party :  candidateListArr[0].party   }


  }


  return {
    registerVoter , castVote , getResults , getWinner 
  }
   
  

}

export function createVoteValidator(rules) {
  // Your code here

  const validator = (voter)=> { 
      let valid = true 
      let reason = ''

      if ( !voter.id || !voter.age || !voter.name ){
        valid = false 
        reason = 'requiredFields not present'
      }
      else if ( voter.age < rules.minAge){
        valid = false 
        reason = 'Not Eligible to vote '
      }
      else{

        valid = true 
        reason = 'All good'

      }

      return {valid , reason}
  }

  return validator
}

export function countVotesInRegions(regionTree) {
  // Your code here

  if ( regionTree == null  || regionTree == undefined  ){ 
    return 0 
  }

  return regionTree.votes + regionTree.subRegions.reduce((acc , curVal) => ( acc + countVotesInRegions(curVal)) , 0 )
}

export function tallyPure(currentTally, candidateId) {
  // Your code here
  const currentTallyResult = {...currentTally} 

  if(!currentTallyResult[candidateId]){
    currentTallyResult[candidateId] = 1
  }
  else{
    currentTallyResult[candidateId] += 1
  }

  return currentTallyResult

  
}



// const candidates = [
//     { id: 'C1', name: 'Sarpanch Ram', party: 'Janata' },
//     { id: 'C2', name: 'Pradhan Sita', party: 'Lok' },
//     { id: 'C3', name: 'Mukhiya Gita', party: 'Samaj' },
//   ];


// let election = createElection(candidates)




// console.log(election.registerVoter({ id: 'V2', name: 'Mohan', age: 25 }))
// console.log("-----------------------------");
// console.log(election.registerVoter({ id: 'V1', name: 'Mohan', age: 25 }))


// console.log(election.castVote('V1' , 'C1' , (data )=>{console.log(data)} , (data)=>{console.log(data)}))
// console.log(election.castVote('V2' , 'C1' , (data )=>{console.log(data)} , (data)=>{console.log(data)}))


// console.log(election.getResults());


// console.log(election.candidateList)


// console.log("======================================");


// console.log(election.getWinner())