//This is the shared state between the Core and Model . 

function ComputeState(name) {
   this.Data = [];  
   this.Name = name;
   this.find = function(query) { 
       var result = []; 
       this.Data.forEach(
           function(datum) {
               for(var key in query) {
                   if(query.hasOwnProperty(key)) {
                       if(datum[key] === query[key]) {
                           continue;
                       }else {
                           return; 
                       }
                   }
               }
               print("adding"); 
               result.push(datum); 
           });
           return result; 
       }
    
       this.add = function(row) { this.Data.push(row); }
   }


//exports.StateManager = ComputeState;

var testComputeState = function() {
    var state  = new ComputeState("Company1"); 
    var o4 = create("oe",-4,"03/31/2013","General");
    var o3 = create("oe",-3.33,"12/31/2013","General");
    var o2 = create("liability",20.0,"12/31/2013","General"); 
    var o1 = create("asset",23.33,"12/31/2013","General");  
    state.add(o4);
    state.add(o3);
    state.add(o2);
    state.add(o1); 
     var result = state.find({name:"liability"});
    return  { State : state, Result : result }; 
}
