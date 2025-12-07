function chooseBoxSize(totalScore) {
            if (totalScore <= 3) return { type: 'SMALL', capacity: 3, color: '#4CAF50' };
            if (totalScore <= 8) return { type: 'MEDIUM', capacity: 8, color: '#2196F3' };
            if (totalScore <= 20) return { type: 'LARGE', capacity: 20, color: '#FF9800' };
            return { type: 'OVERSIZE', capacity: 100, color: '#F44336' };
        }