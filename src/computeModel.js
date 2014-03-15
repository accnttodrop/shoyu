//Design overview 
//There are two enitites
//Core calc process
//Accounts
//Core calc process are like Sum,Mean etc
//Accounts are what a are created as a part of the model which is been
//There is a core convertor part which joins these two parts to create
//the computing trees


var timeSeries = {
    LTM : {
        _function : new function(node) {
            return function() {
                sum(filter( range(node,"time"), " { time : > 12 } "));
            }
        }
    }
}



//This is a truly a acyclic directed graph and should be considered as such 
//Will store this as an adjaceny list because of the sparseness of the
//graph . 
//Notes to self : In a graph 
//Nodes : are accounts and maybe called vertices 
//Edges : are directed from owner to ownee 
//How the graph is structred
//Model
//  |-Basic graph
//    |--Company Specific
template = {
    nodes : {
        balanceSheet : { },
        incomeStatement : { },
        cashFlow : { },
        asset : {},
        liability : {},
        ownerEquity : { },
    },
    
    graph: {
        actual : {
            info : {
                
            },
            data : {
                balanceSheet : {
                    _formula : sum(asset,liability,ownerEquity),
                    _neighbour : [asset,liability,ownerEquity]
                },
                asset : {
                    _formula : null,
                    _neighbour : null; 
                }
                
            }
        },
        financial : {
            
        }
    }
}


companyGraph =  {
    name : "my company",
    parentGraph : template.graph.actual,
    nodes : {
        myAsset : {},
        myLongTermAsset : {},
        myShortTermAsset : {}
    },
    graph : {
        myAsset : {
            _formula : sum(myLongTermAsset,myShortTermAsset)
            _neighbour : [myShortTermAsset,myLongTermAsset],
            _parentNode : asset,//This is special case since the
            //predecessor will be updated at the runtime so this needs
            //to have an information about it             
        },
        myLongTermAsset : {
         _formula : function() { return 100;} 
         _neighbour : []
        }
        myShortTermAsset : {
            _formula : function() { return 20;}
            _neighbour : []
        }
     }
 
   }

