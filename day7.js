/*

--- Day 7: Camel Cards ---
https://adventofcode.com/2023/day/7


*/

// ############ PART 1 ############

const adventOfCodeDay7p1 = (hands) => {

    // create an object to more easily access data
    const handTypes = {
        typesInObj: []
    };

    // HELPER FUNCTION: will each hand from data and sorted into correct hand type in object
    const sortIntoHands = (hand) => {

        // desconstruct cards and bid the hand parameter (array)
        let [cards, bid] = hand;
        // create an object to track what cards are in the hand and their quantity
        let obj = {};

        // iterate over character in the string cards
        for (let card of cards) {
            // if the key doesn't already exist in the object, assign it to 0
            obj[card] ||= 0;
            // increment the number of that card in the object
            obj[card]++;
        }

        // gives us an array of how many of each card in the object and the length of the array, so we don't have key into the properity multiple times
        let values = Object.values(obj), n = values.length;
        
        // assign the handType variable the correct type of hand
            // if there is only one value in the values array, hand type is a five of kind
            // if there are fives values in the values array, hand type is a high card
            // if the values array includes the number 4, hand type is a four of a kind
            // if the values array includes the number 3 and there are two values in the values array, hand type is a full house
            // if the values array includes the number 3 and there are three values in the values array, hand type is a three of a kind
            // if the values array includes the number 2 and there are three values in the values array, hand type is a two pair 
            // if no other cases, one pair is the only other possibility  
        let handType = n === 1 ? "five_of_a_kind" : n === 5 ? "high_card" : values.includes(4) ? "four_of_a_kind" : values.includes(3) && n === 2 ? "full_house" : values.includes(3) && n === 3 ? "three_of_a_kind" : values.includes(2) & n === 3 ? "two_pair" : "one_pair";

        // based on the handType varaible, create a key in the object if doesn't already exisit and give it a value of an empty array and add the hand and bid array to the correct hand the handTypes object
        handTypes[handType] ||= [];
        handTypes[handType].push(hand);
        // if the array that's keeping track of all the hand types in the object doesn't include the hand type add it to the array
        if (!handTypes.typesInObj.includes(handType)) handTypes.typesInObj.push(handType);

    };

    // HELPER FUNCTION: pass this into the .sort() method in order to sort each pair from the weakest hand to the strongest
    const sortByPower = (hand1, hand2) => {

        // converting each card into a number so stronger card is assigned to bigger number
        let cardStrength = {
            "A": 13,
            "K": 12,
            "Q": 11,
            "J": 10,
            "T": 9,
            "9": 8,
            "8": 7,
            "7": 6,
            "6": 5,
            "5": 4,
            "4": 3,
            "3": 2,
            "2": 1
        }
        
        for (let i = 0; i < 5; i++) {
            // for each card in hand we will check which card is stronger or move on to the next card if both cards are the same
            let card1 = cardStrength[hand1[i]], card2 = cardStrength[hand2[i]];
            if (card1 < card2) {
                return -1;
            } else if (card1 > card2) {
                return 1;
            }
        }

        // if function has not return in the loop, hands must be identical
        return 0;

    }

    // HELPER FUNCTION: sort hand types in object based on their strength
    const sortByHandTypeStr = (type1, type2) => {
        let typeStrength = {
            'five_of_a_kind': 7,
            'four_of_a_kind': 6,
            'full_house': 5,
            'three_of_a_kind': 4,
            'two_pair': 3,
            'one_pair': 2,
            'high_card': 1
        }
        return typeStrength[type1] < typeStrength[type2] ? -1 : 1; 
    }

    // HELPER FUNCTION: do final arithmetic to calculate winnings
    const calculateWinnings = (arr) => {

        for (let [hand, bid] of arr) {
            // for each bid in given array add the product between the bid and current rank to winnings and increment rank after calucalation
            winnings += (bid * rank++);
        }

    }

    // sort hands based on types
    hands.forEach(hand => sortIntoHands(hand));

    // sort every hand type from weakest hand to strongest hand
    for (let hand in handTypes) {
        handTypes[hand].sort((a, b) => sortByPower(a[0], b[0]));
    }
    // sort the array with each card type in the object from weakest to strongest
    handTypes.typesInObj.sort((a, b) => sortByHandTypeStr(a, b));

    // declare rank at 1 and winnings at 0
    let rank = 1, winnings = 0;

    // starting from the weakest hand type and ending with the strongest hand type, calucate how much winnings you earn
    handTypes.typesInObj.forEach(type => calculateWinnings(handTypes[type]));

    // return total winnings
    return winnings;

}


