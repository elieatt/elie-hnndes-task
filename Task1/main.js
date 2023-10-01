const Graph = require('./graph2');
//H1 , H2 ...Hi and so on  also represent the person who lives in the House i
//I am using a weighted undirected graph to represent the map of the town

//The core idea of my solution is to select the aproprite person/people to drive the unwell person/people home by calculating the additional distance 
//which the driver needs to drive in order to get the unwell person home (compared to the distance that the driver must drive in order to get to his own home).
//By doing that we can determine the aproprite driver based on minimun additonal distance among all possible drivers.
//so we can minimize the total distance driven by the well people (drivers) while ensuring that all unwell people are brought home.
//I am using Dijkstra algorithm to calculate shortest path (distance) between two nodes in the grap.


let graph = new Graph();
//initializing  the graph by adding vertices and edges , I have determined the values below manually , please consider to see map.png file

//add vertices
// 'HC' is the Health club, 'T1' to 'T4' are the town's intersections, and 'H1' to 'H5' are the houses.
graph.addVertex('HC');
graph.addVertex('T1');
graph.addVertex('H1');
graph.addVertex('H2');
graph.addVertex('T2');
graph.addVertex('T3');
graph.addVertex('H3');
graph.addVertex('T4');
graph.addVertex('H4');
graph.addVertex('T4');
graph.addVertex('H5')
// Adding edges to the graph, each edge represents a road in the town.
// The third parameter to addEdge is the weight of the edge, which is uesed to represent the distance between two locations. 
graph.addEdge('HC', 'T1', 1);
graph.addEdge('T1', 'H1', 0.5);
graph.addEdge('T1', 'T2', 0.2);
graph.addEdge('T2', 'H2', 1);
graph.addEdge('T2', 'T3', 1);
graph.addEdge('T3', 'H3', 0.75);
graph.addEdge('T3', 'T4', 0.2);
graph.addEdge('T4', 'H4', 0.75);
graph.addEdge('T4', 'H5', 1);

// This function finds the best driver for each unwell person.
function findDriver(houses, unwellPeople) {
    // These arrays will store the best driver and their additional distance for each unwell person.
    let minAdditoinalDistances = [];
    let drivers = [];
    for (let unwellPerson of unwellPeople) {
        let minAdditoinalDistance = Infinity;
        let driver = null;

        for (let house of houses) {
            //each house can represent the resident who live in it 
            if (!unwellPeople.includes(house)) {
                // Calculate the additional distance that this driver would have to drive to bring the unwell person home.
                additionalDistance = graph.getDistance('HC', unwellPerson).value + graph.getDistance(unwellPerson, house).value - graph.getDistance('HC', house).value;

                if (additionalDistance < minAdditoinalDistance) {
                    minAdditoinalDistance = additionalDistance;
                    driver = house;
                }
            }
        }
        drivers.push(driver);
        minAdditoinalDistances.push(minAdditoinalDistance);
    }
    // return an object containing the arrays of best drivers and their additional distances for each unwell person.
    return {
        drivers: drivers,
        minAdditoinalDistances: minAdditoinalDistances
    };
}

// Define an array of houses and an array of unwell people.
let houses = ['H1', 'H2', 'H3', 'H4', 'H5'];
let unwellPeople = ['H4', 'H5'];
let result = findDriver(houses, unwellPeople);

// If there are two unwell people and they have the same best driver..
if (result.drivers.length == 2 && result.drivers[0] === result.drivers[1]) {
    console.log(`Unwell people ${unwellPeople[0]} ${unwellPeople[1]} will be brought to their homes together by ${result.drivers[0]}`);
} else {
    for (let i = 0; i < result.drivers.length; i++) {
        console.log(`Unwell person ${unwellPeople[i]}  will be brought to his home  by ${result.drivers[i]}`);

    }
}


