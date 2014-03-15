//This is the main computation part 
//For each part of the coreModel, compute the formulas by giving it

var mergeNode = function(template,companyGraph) { 
   Object.getOwnPropertyNames(template).forEach(val,idx,array) {
       companyGraph[val] = template[val];
   }
}

var mergePath = function(template,companyGraph) {
    Object.getOwnPropertyName(template).forEach(val,idx,array) {
        var myNode = template[val]; 
        if(myNode.hasOwnProperty("_parentNode")) {
            var parent = find(myNode,companyGraph);
            parent._formula = current(myNode._parentNode);
        }
    }
}

var mergeGraphs = function(template,companyGraph) { 
    mergeNode(template.nodes,companyGraph.nodes); 
    mergePath(template.graph,companyGraph.graph); 
    return companyGraph;
}


var computeGraph = function(nodes,edges,state,engine) {
    Object.getOwnProperty(edges.data).forEach(val,idx,array) {
        var edge  = edge.data[val]; 
        if(state.find(val)) {

        }else {
            if(edge.hasOwnProperty("_formula")) {
                var result = engine.compute(edge._formula); 
                state.add(result,val); 
            }
        }
    }
}


