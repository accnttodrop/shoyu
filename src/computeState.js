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


//The node is an important construct.All relationships in real world
//are between accounts i.e. Asset = Long Term Asset + Short Term
//Asset.But within the system at computation there are 6 dimensions
//that uniquely define an account.
ComputeState.prototype.createNode = 
function( mname,mdate,mmodel,mscenario,mcompany,mbalance ) { return { Name : mname,  ReportDate : mdate, Model : mmodel,Scenario : mscenario, Company : mcompany, Balance : mbalance } }

//exports.StateManager = ComputeState;

var test = function() {
    var state  = new ComputeState("Company1"); 
    print( state.createNode("oe","03/31/2013","General","Actual",state.Name,4.0));
    var datapt =
    [
         state.createNode("oe","03/31/2013","General","Actual",state.Name,4.0)
        , state.createNode("liability","03/31/2013","General","Actual",state.Name,21.0)
        , state.createNode("asset","03/31/2013","General","Actual",state.Name,25.0)
        , state.createNode("oe","12/31/2013","General","Actual",state.Name,10.5)
        , state.createNode("liability","12/31/2013","General","Actual",state.Name,20.5)
        , state.createNode("asset","12/31/2013","General","Actual",state.Name,31.0)
    ];
    state.add(datapt[0]);
    state.add(datapt[1]);
    state.add(datapt[2]);
    
    var result = state.find({Name:"liability"});
    return  { State : state, Result : result }; 
}
