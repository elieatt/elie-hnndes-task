class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    // Add a vertex to the graph
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, new Map());
        }
    }

    // Add an edge between two vertices with a given weight
    addEdge(vertex1, vertex2, weight) {
        if (!this.adjacencyList.has(vertex1) || !this.adjacencyList.has(vertex2)) {
            throw new Error('One or both vertices do not exist in the graph.');
        }

        // Undirected graph: Add the edge in both directions
        this.adjacencyList.get(vertex1).set(vertex2, weight);
        this.adjacencyList.get(vertex2).set(vertex1, weight);
    }

    // Get all vertices in the graph
    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }

    // Get all edges connected to a specific vertex
    getEdges(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            throw new Error('Vertex does not exist in the graph.');
        }

        return Array.from(this.adjacencyList.get(vertex).keys());
    }

    // Get the weight of an edge between two vertices
    getWeight(vertex1, vertex2) {
        if (!this.adjacencyList.has(vertex1) || !this.adjacencyList.has(vertex2)) {
            throw new Error('One or both vertices do not exist in the graph.');
        }

        return this.adjacencyList.get(vertex1).get(vertex2);
    }

    // Calculate the shortest distance and path between two vertices using Dijkstra algorithm
    getDistance(startVertex, endVertex) {
        const distances = new Map();  // Stores the minimum distances from startVertex to each vertex
        const previous = new Map();  // Stores the previous vertex in the shortest path to each vertex
        const visited = new Map();   // Keeps track of visited vertices

        // Initialize distances, previous vertices, and visited maps for all vertices
        this.getVertices().forEach((vertex) => {
            distances.set(vertex, Infinity);
            previous.set(vertex, null);
            visited.set(vertex, false);
        });

        distances.set(startVertex, 0);  // Distance from startVertex to itself is 0

        while (!visited.get(endVertex)) {
            let minDistance = Infinity;
            let currentVertex = null;

            // Find the vertex with the smallest distance among unvisited vertices
            this.getVertices().forEach((vertex) => {
                if (!visited.get(vertex) && distances.get(vertex) < minDistance) {
                    minDistance = distances.get(vertex);
                    currentVertex = vertex;
                }
            });

            if (currentVertex === null) {
                break; // No more reachable vertices
            }

            visited.set(currentVertex, true);

            // Update distances and previous vertices for neighboring vertices
            this.getEdges(currentVertex).forEach((neighbor) => {
                const weight = this.getWeight(currentVertex, neighbor);
                const totalDistance = distances.get(currentVertex) + weight;

                if (totalDistance < distances.get(neighbor)) {
                    distances.set(neighbor, totalDistance);
                    previous.set(neighbor, currentVertex);
                }
            });
        }

        if (distances.get(endVertex) === Infinity) {
            return null; // No path exists between startVertex and endVertex
        }

        // Build the shortest path from startVertex to endVertex
        const path = [];
        let currentVertex = endVertex;

        while (currentVertex !== null) {
            path.unshift(currentVertex);
            currentVertex = previous.get(currentVertex);
        }

        return {
            value: distances.get(endVertex),
            path: path,
        };
    }
}

module.exports = Graph;