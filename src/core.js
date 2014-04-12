//This is the main computation part 
//For each part of the coreModel, compute the formulas by giving it

var CoreCalculation = function(name) {
    this.Name = name;
}

CoreCalculation.prototype.mergeNode = function(template,companyGraph) { 
   Object.getOwnPropertyNames(template).forEach(val,idx,array) {
       companyGraph[val] = template[val];
   }
}

CoreCalculation.prototype.mergePath = function(template,companyGraph) {
    Object.getOwnPropertyName(template).forEach(val,idx,array) {
        var myNode = template[val]; 
        if(myNode.hasOwnProperty("_parentNode")) {
            var parent = find(myNode._parentNode,companyGraph);
            parent._formula = function() { return this.current(myNode._parentNode) };
        }
    }
}

 CoreCalculation.prototype.mergeGraphs = function(template,companyGraph,model) { 
    this.mergeNode(template.nodes,companyGraph.nodes); 
    this.mergePath(template.graph[model],companyGraph.graph[model]); 
    return companyGraph;
}


var computeGraph = function(fn,state,engine) {
    var result = fn(); 
    state.add(result,val); 
}

var computeAllGraph = function(nodes,edges,state,engine) {
    Object.getOwnProperty(edges.data).forEach(val,idx,array) {
        var edge  = edge.data[val]; 
        if(state.find(val)) {

        }else {
            if(edge.hasOwnProperty("_formula")) {
                computeGraph(edge._formula); 
            }
        }
    }
}




