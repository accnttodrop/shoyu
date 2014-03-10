//The core engine does all the computation and is responsible for
//loading the data in a way.A JSON structure respresenting the tree
//needs to be passed to the Core Engine.This should have a single
//methods called get. Which takes a JSON filter similar to Mongo's Get
//query where a JSON object represents the query 
function ComputeCore(dataLayer) { 
    this.Data = dataLayer;
}

ComputeCore.prototype.sum = function(range) {return _.reduce(range,function(memo,num) { memo + num },0);}
    
ComputeCore.prototype.subtract = function(range) {return _.reduce(range, function(memo, num) { memo - num },0);}

ComputeCore.prototype.divide = function(range) {return _.reduce(range,function(memo,num) { memo - num } ,1 ); }

ComputeCore.prototype.current = function(node) { return null; }
    
ComputeCore.prototype.range = function(node,type) { return null;}

ComputeCore.prototype.filter  = function(range,fn) {return _.Where(range,fn);};

//The node is an important construct.All relationships in real world
//are between accounts i.e. Asset = Long Term Asset + Short Term
//Asset.But within the system at computation there are 6 dimensions
//that uniquely define an account.
function Node(name,time,model,scenario,company,valueType) {
    this.name = name;
    this.time = time;
    this.model = model;
    this.scenario = scenario;
    this.company = company;
}
//The load process works are follows. There will be two parallel
//thread of computation that will works . One which will find out all
//the entries to close. The other will be the core computation. The
//core computation will works simply loading the base (from company
//template) as parts of tree, the rest will be done using a graph
//caluclation.Thus in Core Computation object what will be send will a
//tree. It is usefull to think in terms of mutually recursive
//relations between two core process where the shared state is the
//data object . Where Core Compute seeks from and while Core Model
//populates from. The Core Model ask to find a data failing which it
//will trigger a computation. ? Need to think should the computation
//should happen in Core Engine or Core Model . I think it should still
//be in Core Model since that is where the definitions are usually
//held 
