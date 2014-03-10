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

function Node(name,time,model,scenario,company) {
    this.name = name;
    this.time = time;
    this.model = model;
    this.scenario = scenario;
    this.company = company;
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
var template = {
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
                incomeStatement : {
                    
                },
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
        myLongTermAsset : {},
        myShortTermAsset : {}
    },
    graph : {
        myLongTermAsset : {
         _formula : getTemplate("",worksheet,row,column),
         _parentNode : asset,//This is special case since the
            //predecessor will be updated at the runtime so this needs
            //to have an information about it 
         _neighbour : []
     }
    }
}
