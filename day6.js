/*

--- Day 6: Wait For It ---
https://adventofcode.com/2023/day/6

Input: time (3 numbers) distance (3 numbers)
Output: int (all the possible ways to win multipled together)

*/

// ############ PART 1 ############

const adventOfCodeDay6Part1 = (times, distances) => {

    // declare variables
    let races = [], n = times.length, res = 1;

    // for loop in order to make data easier to work with
    for (let i = 0; i < n; i++) {
        races.push([times[i], distances[i]]);
    }

    // for each pair of time and distance
    for (let race of races) {

        const [t, d] = race;
        let waysToWin = 0;

        // for every second of the race
        for (let j = 0; j < t; j++) {

            // calculate the total distance the boat can travel at current speed with remaining time
            let calDist = j * (t - j);

            // if calDist is greater than d, increment waysToWin
            if (calDist > d) waysToWin++

        }

        // multiple current ways to win to res
        res *= waysToWin;

    }

    return res;

};


// ############ PART 2 ############

// do two binary searches, one for shortest time we can hold the button and win and one for the longest time we can hold the button and win

const adventOfCodeDay6Part2 = (time, distance) => {

    let left = 0, right = time, lo, high;

    while (left < right) {

        let mid = Math.floor((left + right) / 2), currDist = mid * (time - mid);

        if (currDist > distance) {
            right = mid; 
        } else if (currDist < distance) {
            left = mid;
        } else if (currDist === distance) {
            while (currDist === distance) {
                currDist = mid * (time - mid);
                mid++;
            }
        }

        if (!lo || mid < lo) lo = mid;

    }

    left = 0, right = time;

    while (left < right) {

        let mid = Math.floor((left + right) / 2), currDist = mid * (time - mid);

        if (currDist > distance) {
            left = mid; 
        } else if (currDist < distance) {
            right = mid;
        } else if (currDist === distance) {
            while (currDist === distance) {
                currDist = mid * (time - mid);
                mid--;
            }
        }

        if (!high || mid < high) high = mid;

    }

    return high - lo;

};
