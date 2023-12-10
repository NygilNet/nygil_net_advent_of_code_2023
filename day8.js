/*

--- Day 8: Haunted Wasteland ---
https://adventofcode.com/2023/day/8

*/


// ############ PART 1 ############

// make this recursive, it takes the directions and the map, and by default the function will start from 'AAA' with 0 steps taken
const adventOfCodeDay8p1 = (d, m, node = 'AAA', steps = 0) => {

    // for each direction we have to take
    for (let dir of d) {

        // base case: if node ever equals 'ZZZ' we have reached the end and can return out of the function
        if (node === "ZZZ") return steps;

        // deconstruct the array pair in the map instead of keying into multiple objects
        let [left, right] = m[node];

        // if we need to go left, set node to the left value, if we need to go right, set node to the right value
        node = dir === "L" ? left : right;

        // increment steps
        steps++;

    }

    // if we reach the end of the directions without finding 'ZZZ' we need to repeat the directions until we find it and return the result from the future call that finds 'ZZZ'
    return adventOfCodeDay8p1(d, m, node, steps);

}


// ############ PART 2 ############

const adventOfCodeDay8p2 = (d, m, nodes = Object.keys(m).filter(n => n.endsWith('A')), steps = 0) => {

    let n = nodes.length;
    
    for (let dir of d) {
        
        nodes = nodes.map(node => {
            let [left, right] = m[node];
            return dir === "L" ? left : right;
        });

        steps++;

        if (nodes[0].at(-1) === 'Z' && nodes.filter(n => n.endsWith('Z')).length === n) return steps;

    }

    return adventOfCodeDay8p2(d, m, nodes, steps);

}
