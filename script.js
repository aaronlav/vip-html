document.getElementById("pairForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const inputArray = document.getElementById("arrayInput").value.split(',').map(Number);
    const sumValue = parseInt(document.getElementById("sumInput").value);

    const result = findPairs(inputArray, sumValue);

    // Convert array of pairs to a more readable string format
    document.getElementById("allPairs").textContent = formatPairs(result.allPairs);
    document.getElementById("uniquePairs").textContent = formatPairs(result.uniquePairsArray);
    document.getElementById("comboPairs").textContent = formatPairs(result.seenPairsArray);
});

function findPairs(arr, sum) {
    let allPairs = [];
    let uniquePairs = new Set();
    let seenPairs = new Set();

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j && arr[i] + arr[j] === sum) {
                allPairs.push([arr[i], arr[j]]); // All pairs including duplicates

                let pair = [arr[i], arr[j]];
                let reversedPair = [arr[j], arr[i]];
                
                // Add unique pairs including reversed
                uniquePairs.add(JSON.stringify(pair));

                // Add the pair if not seen in any order
                if (!seenPairs.has(JSON.stringify(pair)) && !seenPairs.has(JSON.stringify(reversedPair))) {
                    seenPairs.add(JSON.stringify(pair));
                }
            }
        }
    }

    // Convert unique pairs Set back to array format
    let uniquePairsArray = Array.from(uniquePairs).map(JSON.parse);

    // Convert seen pairs Set back to array format
    let seenPairsArray = Array.from(seenPairs).map(JSON.parse);

    return {
        allPairs,
        uniquePairsArray,
        seenPairsArray
    };
}

// Helper function to format pairs for output
function formatPairs(pairs) {
    return pairs.map(pair => `[${pair[0]},${pair[1]}]`).join(', ');
}