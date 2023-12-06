/*

--- Day 5: If You Give A Seed A Fertilizer ---
https://adventofcode.com/2023/day/5


Input: seeds (a series of ints)
Output: number (the lowest location number that corresponds with any of the initial seed number)


create an object for each map and populate it according to input data

    for each map

    the first int is the starting value
    the second int is the starting key
    the third int is the range where the key and value align

*/

import { seeds, seedtoSoilMap, soiltoFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humiditytoLocationMap } from "./day5_data";

const adventOfCodeDay5 = (s, toSoil, toFertilizer, toWater, toLight, toTemperature, toHumidity, toLocation) => {

    // create an array to store the locations for all seeds
    const locations = [];

    // helper function : find if target is between low and high
    const findBounds = (low, high, target) => {
        let lowerBound = low <= target;
        let upperBound = target <= high;
        return lowerBound && upperBound;
    }

    for (let seed of s) {

        // find if there's a pair of values in the map where the seed number we are given is between the second and the second value plus the third value
        let seedToSoil = toSoil.find(m => findBounds(m[1], m[1] + m[2], seed));

        // if pair is found key into the first and second value
        let seedToSoilValueStart = seedToSoil !== undefined ? seedToSoil[0] : false, seedToSoilKeyStart = seedToSoil !== undefined ? seedToSoil[1] : false;

        // if there is a pair that matches our next number should equal the first value minus the diffrence between our given number and the second value
        let soil = seedToSoilValueStart !== false ? seedToSoilValueStart + (seed - seedToSoilKeyStart) : seed;

        // repeat last three steps for every map until we get our location

        let soiltoFertilizer = toFertilizer.find(m => findBounds(m[1], m[1] + m[2], soil));

        let soiltoFertilizerValueStart = soiltoFertilizer !== undefined ? soiltoFertilizer[0] : false, soiltoFertilizerKeyStart = soiltoFertilizer !== undefined ? soiltoFertilizer[1] : false;

        let fertilizer = soiltoFertilizerValueStart !== false ? soiltoFertilizerValueStart + (soil - soiltoFertilizerKeyStart) : soil;

        let fertilizerToWater = toWater.find(m => findBounds(m[1], m[1] + m[2], fertilizer));
       
        let fertilizerToWaterValueStart = fertilizerToWater !== undefined ? fertilizerToWater[0] : false, fertilizerToWaterKeyStart = fertilizerToWater !== undefined ? fertilizerToWater[1] : false;

        let water = fertilizerToWaterValueStart !== false ? fertilizerToWaterValueStart + (fertilizer - fertilizerToWaterKeyStart) : fertilizer;

        let waterToLight = toLight.find(m => findBounds(m[1], m[1] + m[2], water));

        let waterToLightValueStart = waterToLight !== undefined ? waterToLight[0] : false, waterToLightKeyStart = waterToLight !== undefined ? waterToLight[1] : false;

        let light = waterToLightValueStart !== false ? waterToLightValueStart + (water - waterToLightKeyStart) : water;

        let lightToTemperature = toTemperature.find(m => findBounds(m[1], m[1] + m[2], light));

        let lightToTemperatureValueStart = lightToTemperature !== undefined ? lightToTemperature[0] : false, lightToTemperatureKeyStart = lightToTemperature !== undefined ? lightToTemperature[1] : false;

        let temperature = lightToTemperatureValueStart !== false ? lightToTemperatureValueStart + (light - lightToTemperatureKeyStart) : light;

        let temperatureToHumidity = toHumidity.find(m => findBounds(m[1], m[1] + m[2], temperature));

        let temperatureToHumidityValueStart = temperatureToHumidity !== undefined ? temperatureToHumidity[0] : false, temperatureToHumidityKeyStart = temperatureToHumidity !== undefined ? temperatureToHumidity[1] : false;

        let humidity = temperatureToHumidityValueStart !== false ? temperatureToHumidityValueStart + (temperature - temperatureToHumidityKeyStart) : temperature;

        let humiditytoLocation = toLocation.find(m => findBounds(m[1], m[1] + m[2], humidity));

        let humiditytoLocationValueStart = humiditytoLocation !== undefined ? humiditytoLocation[0] : false, humiditytoLocationKeyStart = humiditytoLocation !== undefined ? humiditytoLocation[1] : false;

        let location = humiditytoLocationValueStart !== false ? humiditytoLocationValueStart + (humidity - humiditytoLocationKeyStart) : humidity;
    
        // add our final location to the locations array
        locations.push(location);

    }

    // find the smallest number in the locations array and return it as the answer
    return Math.min(...locations);

}


console.log(adventOfCodeDay5(seeds, seedtoSoilMap, soiltoFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humiditytoLocationMap));