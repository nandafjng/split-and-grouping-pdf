if (/^[A-Z]{2,7}(\d{0,6})?$/.test(word) && 
    SKU_DB.hasOwnProperty(word) && 
    !foundSkus.includes(word)) {
                            
    foundSkus.push(word);
                            
    let qty = 1;
    for (let k = j + 1; k <= j + 5 && k < allWords.length; k++) {
        const potentialQty = parseInt(allWords[k]);
        if (!isNaN(potentialQty) && potentialQty > 0 && potentialQty <= 100) {
            qty = potentialQty;
            break;
        }
    }
                            
    const volumeScore = getVolumeScore(word);
    const itemScore = parseFloat((volumeScore * qty).toFixed(2));
                            
    items.push({
        sku: word,
        qty: qty,
        volumeScore: volumeScore,
        itemScore: itemScore
    });
                            
    totalScore += itemScore;
    }
}
                    
    if (items.length === 0) {
        items.push({
            sku: 'UNKNOWN',
            qty: 1,
            volumeScore: 2,
            itemScore: 2
        });
        totalScore = 2;
    }