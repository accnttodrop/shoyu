//The core engine does all the computation and is responsible for
//loading the data in a way.A JSON structure respresenting the tree
//needs to be passed to the Core Engine.This should have a single
//methods called get. Which takes a JSON filter similar to Mongo's Get
//query where a JSON object represents the query 

function ComputeCore(computeState) { 
    this.Data = computeState;
    this.CurrentDimension = null; 
}



ComputeCore.prototype.current = function(node) {
    var query = this.CurrentDimension; 
    query.Name = node;
   
    return this.Data.find(query)[0].Balance; 
 }
    

ComputeCore.prototype.getVal = function(val)  { 
   
    if(isNaN(val)) {
        return this.current(val); 
     }else {
         return val; 
     }
}

ComputeCore.prototype.range = function(node) { return this.Data.find(range);}

ComputeCore.prototype.filter  = function(range,fn) {return _.Where(range,fn);};


ComputeCore.prototype.setCurrent = function(dimension) { 
    this.CurrentDimension = dimension; 
    }

ComputeCore.prototype.sum = function(range) {var that = this;  return _.reduce(Array.prototype.slice.call(arguments),function(memo,num) { return memo + that.getVal(num) },0);}

ComputeCore.prototype.subtract = function(range) {var that = this;  return _.reduce(Array.prototype.slice.call(arguments),function(memo,num) { return  that.getVal(num) - memo },0);}
    

ComputeCore.prototype.multiply = function(range) {var that = this;  return _.reduce(Array.prototype.slice.call(arguments),function(memo,num) { return memo * that.getVal(num) },1);}

ComputeCore.prototype.divide = function(range) {var that = this;  return _.reduce(Array.prototype.slice.call(arguments),function(memo,num) { return  that.getVal(num) / memo },1);}



//exports.ComputeEngine = ComputeCore; 

//The load process works are follows. There will be two parallel
//thread of computation that will works . One which will find ou≈Xt all
//the entries to close. The other will be the core computation. //caluclation.Thus in Core Computation object what will be send will a
//tree. It is usefull to think in terms of mutually recursive
//relations between two core process where the shared state is the
//data object . Where Core Compute seeks from and while Core Model
//populates from. The Core Model ask to find a data failing which it
//will trigger a computation. ? Need to think should the computation
//should happen in Core Engine or Core Model . I think it should still
//be in Core Model since that is where the definitions are usually
//held 
