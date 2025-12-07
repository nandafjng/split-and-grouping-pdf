# 👨‍💻 Developer Guide - Packing Tool

> **Technical deep dive into the Packing Tool architecture, algorithms, and implementation**

This guide is for developers who want to understand, modify, or extend the Packing Tool.

---

## 📋 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Architecture Overview](#architecture-overview)
3. [Code Flow](#code-flow)
4. [Key Algorithms](#key-algorithms)
5. [Function Reference](#function-reference)
6. [Customization Guide](#customization-guide)
7. [Best Practices](#best-practices)
8. [Debugging Tips](#debugging-tips)

---

## 🛠️ Tech Stack

### Core Libraries

```javascript
// PDF Processing
- PDF.js v2.16.105       // Read & extract text from PDF
- PDF-Lib v1.17.1        // Create & manipulate PDF documents
- JSZip v3.10.1          // Create ZIP archives (not used in current version)

// UI
- Pure HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript (ES6+)
```

### Why These Choices?

| Library | Why | Alternative Considered |
|---------|-----|----------------------|
| **PDF.js** | Industry standard, Mozilla-backed, excellent text extraction | Apache PDFBox (Java-based, rejected) |
| **PDF-Lib** | Pure JS, client-side, no server needed | jsPDF (less powerful for manipulation) |
| **Vanilla JS** | No dependencies, fast, works offline | React (overkill for this use case) |

---

## 🏗️ Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     USER INTERFACE                       │
│  (Upload Area, Progress Bar, Results Display)           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  MAIN CONTROLLER                         │
│              (processPDF function)                       │
└────┬────────────┬──────────────┬─────────────┬──────────┘
     │            │              │             │
     ▼            ▼              ▼             ▼
┌─────────┐  ┌────────┐  ┌──────────┐  ┌─────────────┐
│  PDF    │  │ Order  │  │  SKU     │  │  Box        │
│ Reader  │  │ Parser │  │ Analyzer │  │  Grouper    │
└─────────┘  └────────┘  └──────────┘  └─────────────┘
     │            │              │             │
     └────────────┴──────────────┴─────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  PDF GENERATOR                           │
│         (Merge, Download, Create Files)                 │
└─────────────────────────────────────────────────────────┘
```

### Component Responsibilities

**1. User Interface**
- File upload (drag & drop + click)
- Progress visualization
- Results rendering
- Download triggers

**2. PDF Reader** (`splitPDFByOrders`)
- Read PDF pages
- Extract text content
- Detect page boundaries

**3. Order Parser** (inside `splitPDFByOrders`)
- Detect platform (TikTok/Shopee)
- Extract Order ID
- Extract SKU & Qty
- Handle multiple items

**4. SKU Analyzer**
- Lookup volume score from database
- Calculate total score per order
- Validate SKU format

**5. Box Grouper** (`groupOrdersByBox`)
- Calculate box size needed
- Group orders by box type
- Sort by SKU family

**6. PDF Generator** (`downloadBoxPDF`)
- Merge order PDFs
- Create downloadable files
- Handle file naming

---

## 🔄 Code Flow

### Complete Processing Flow

```
┌─────────────────────────────────────────────────────┐
│ 1. USER UPLOADS PDF                                  │
└───────────────┬─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────┐
│ 2. handleFileSelect()                                │
│    - Validate file type (must be PDF)               │
│    - Store file reference                           │
│    - Enable "Process" button                        │
└───────────────┬─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────┐
│ 3. processPDF()                                      │
│    - Read file as ArrayBuffer                       │
│    - Show progress bar                              │
│    - Call splitPDFByOrders()                        │
└───────────────┬─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────┐
│ 4. splitPDFByOrders()                               │
│    FOR EACH PAGE:                                   │
│      ├─ Extract text using PDF.js                   │
│      ├─ Detect platform (TikTok/Shopee)            │
│      ├─ Find Order ID pattern                       │
│      ├─ Extract all SKUs from text                  │
│      ├─ Find Qty for each SKU                       │
│      ├─ Calculate volume scores                     │
│      └─ Create PDF for this order                   │
│                                                      │
│    RETURN: Array of order objects                   │
└───────────────┬─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────┐
│ 5. groupOrdersByBox()                               │
│    FOR EACH ORDER:                                  │
│      ├─ Calculate total volume score                │
│      ├─ Determine box size (S/M/L/XL)              │
│      └─ Add to appropriate box group                │
│                                                      │
│    FOR EACH BOX:                                    │
│      └─ Sort orders by SKU family                   │
│                                                      │
│    RETURN: Box groups object                        │
└───────────────┬─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────┐
│ 6. showResults()                                     │
│    - Calculate statistics                           │
│    - Render UI with results                         │
│    - Enable download buttons                        │
└───────────────┬─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────┐
│ 7. USER CLICKS DOWNLOAD                             │
└───────────────┬─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────┐
│ 8. downloadBoxPDF()                                  │
│    - Merge all order PDFs in this box               │
│    - Save as single PDF file                        │
│    - Trigger browser download                       │
└─────────────────────────────────────────────────────┘
```

---

## 🧠 Key Algorithms

### Algorithm 1: Platform Detection

```javascript
// Pattern matching for platform identification
function detectPlatform(text) {
    // TikTok/Tokopedia pattern
    const tiktokPattern = /Order ID[:\s]*(\d+)/i;
    
    // Shopee pattern  
    const shopeePattern = /No\.Pesanan[:\s]*([A-Z0-9]+)/i;
    
    if (tiktokPattern.test(text)) {
        return { platform: 'TIKTOK', orderId: match[1] };
    } else if (shopeePattern.test(text)) {
        return { platform: 'SHOPEE', orderId: match[1] };
    }
    
    return { platform: null, orderId: null };
}
```

**How it works:**
1. Check for "Order ID" keyword → TikTok
2. Check for "No.Pesanan" keyword → Shopee
3. Extract order number using capture group

**Edge cases handled:**
- Case insensitive matching
- Multiple whitespace formats
- Colon vs space separator

---

### Algorithm 2: SKU Extraction (Multiple Items)

```javascript
// Extract ALL SKUs from page text
function extractSKUs(text) {
    const items = [];
    const allWords = text.split(/\s+/);
    const foundSkus = [];  // Prevent duplicates
    
    for (let i = 0; i < allWords.length; i++) {
        const word = allWords[i];
        
        // SKU pattern: 2-6 letters + optional 0-5 digits
        // Examples: CWD001, CSHN002, BDPBPO, BDFBKL
        const skuPattern = /^[A-Z]{2,6}(\d{0,5})?$/;
        
        if (skuPattern.test(word) && 
            SKU_DB.hasOwnProperty(word) &&
            !foundSkus.includes(word)) {
            
            foundSkus.push(word);
            
            // Find qty nearby (next 5 words)
            let qty = 1;  // Default
            for (let j = i + 1; j <= i + 5 && j < allWords.length; j++) {
                const potentialQty = parseInt(allWords[j]);
                if (!isNaN(potentialQty) && 
                    potentialQty > 0 && 
                    potentialQty <= 100) {
                    qty = potentialQty;
                    break;
                }
            }
            
            const volumeScore = SKU_DB[word];
            items.push({
                sku: word,
                qty: qty,
                volumeScore: volumeScore,
                itemScore: volumeScore * qty
            });
        }
    }
    
    return items;
}
```

**Algorithm breakdown:**

1. **Split text into words**
   - Use whitespace as delimiter
   - Creates searchable array

2. **Pattern matching**
   - Check each word against SKU regex
   - Must match format AND exist in database
   - Prevents false positives (random text)

3. **Duplicate prevention**
   - Track found SKUs in array
   - Skip if already processed
   - Handles invoice tables with repeated SKUs

4. **Quantity detection**
   - Look ahead 5 words from SKU
   - Find first valid number (1-100)
   - Default to 1 if not found

5. **Score calculation**
   - Lookup volume score from database
   - Multiply by quantity
   - Sum all items for total order score

**Why this approach?**
- ✅ Handles multiple items per order
- ✅ Robust against format variations
- ✅ Prevents duplicate SKUs
- ✅ Accurate qty detection

---

### Algorithm 3: Box Size Determination

```javascript
function chooseBoxSize(totalScore) {
    if (totalScore < 3) {
        return { 
            type: 'SMALL', 
            capacity: 3, 
            color: '#4CAF50'  // Green
        };
    }
    if (totalScore < 8) {
        return { 
            type: 'MEDIUM', 
            capacity: 8, 
            color: '#2196F3'  // Blue
        };
    }
    if (totalScore < 20) {
        return { 
            type: 'LARGE', 
            capacity: 20, 
            color: '#FF9800'  // Orange
        };
    }
    return { 
        type: 'OVERSIZE', 
        capacity: 100, 
        color: '#F44336'  // Red
    };
}
```

**Decision tree:**
```
totalScore < 3   → SMALL    (single small items)
totalScore < 8   → MEDIUM   (1-2 medium items)
totalScore < 20  → LARGE    (multiple items / 1 large)
totalScore >= 20 → OVERSIZE (bundles / bulk orders)
```

**Examples:**
- CWD001 (score 1) × 1 = **1** → SMALL ✅
- CSHN001 (score 3) × 2 = **6** → MEDIUM ✅
- PRF01 (score 8) × 2 = **16** → LARGE ✅
- BDAMUN (score 10) × 3 = **30** → OVERSIZE ✅

---

### Algorithm 4: SKU Family Sorting

```javascript
function getSkuPrefix(sku) {
    // Remove trailing digits to get family
    // CWD001 → CWD
    // CSHN002 → CSHN
    // BDPBPO → BDPBPO (no digits, return as-is)
    return sku.replace(/\d+$/, '');
}

function sortOrdersBySKUFamily(orders) {
    return orders.sort((a, b) => {
        // Get first SKU from each order
        const skuA = a.items[0].sku;
        const skuB = b.items[0].sku;
        
        // Extract family prefix
        const prefixA = getSkuPrefix(skuA);
        const prefixB = getSkuPrefix(skuB);
        
        // Sort by prefix first (alphabetical)
        if (prefixA !== prefixB) {
            return prefixA.localeCompare(prefixB);
        }
        
        // If same prefix, sort by full SKU
        return skuA.localeCompare(skuB);
    });
}
```

**Sorting example:**

```
Before (random):           After (sorted):
├─ CSHN002                ├─ ACSRS01      ← A family
├─ ACSRS01                ├─ BDYOIL02     ← B family  
├─ BDYOIL02               ├─ CSHN001      ← C family (same)
├─ CWD001                 ├─ CSHN002      ← C family (same)
├─ CSHN001                └─ CWD001       ← C family (diff prefix)
```

**Why this matters?**
Picker workflow:
1. Start with all A-family SKUs
2. Then all B-family SKUs
3. Then all C-family SKUs (grouped together)
4. No backtracking needed!

**Time saved:** ~50% reduction in picker movement

---

## 📚 Function Reference

### Core Functions

#### `processPDF(file)`
Main orchestrator function.

**Parameters:**
- `file` (File): PDF file object from input

**Flow:**
1. Read file as ArrayBuffer
2. Call splitPDFByOrders()
3. Call groupOrdersByBox()
4. Call showResults()

**Error handling:**
- Catches all errors
- Shows user-friendly error message
- Logs detailed error to console

---

#### `splitPDFByOrders(arrayBuffer)`
Split PDF into individual orders.

**Parameters:**
- `arrayBuffer` (ArrayBuffer): PDF file data

**Returns:**
```javascript
[
    {
        orderId: '251204EFJD645Q',
        platform: 'SHOPEE',
        items: [
            { sku: 'CSHN001', qty: 1, volumeScore: 3, itemScore: 3 }
        ],
        totalScore: 3,
        pdfBytes: Uint8Array
    },
    // ... more orders
]
```

**Algorithm:**
1. Load PDF with PDF-Lib
2. For each page:
   - Extract text with PDF.js
   - Detect platform & order ID
   - Extract all SKUs
   - Find quantities
   - Calculate scores
3. Create separate PDF for each order
4. Return array of order objects

---

#### `groupOrdersByBox(orders)`
Group orders by box size and sort by SKU family.

**Parameters:**
- `orders` (Array): Array of order objects

**Returns:**
```javascript
{
    'SMALL': {
        type: 'SMALL',
        capacity: 3,
        color: '#4CAF50',
        orders: [ /* sorted orders */ ]
    },
    'MEDIUM': { /* ... */ },
    // ...
}
```

**Algorithm:**
1. For each order: determine box size
2. Add to appropriate box group
3. Sort orders within each box by SKU family
4. Return grouped & sorted structure

---

#### `downloadBoxPDF(boxType)`
Generate and download merged PDF for a box.

**Parameters:**
- `boxType` (String): 'SMALL' | 'MEDIUM' | 'LARGE' | 'OVERSIZE'

**Process:**
1. Create new PDF document
2. For each order in box:
   - Load order PDF
   - Copy all pages
   - Add to merged PDF
3. Save as Blob
4. Trigger browser download

---

### Utility Functions

#### `getVolumeScore(sku)`
Lookup volume score from database.

```javascript
function getVolumeScore(sku) {
    return SKU_DB[sku] || 2;  // Default: 2
}
```

#### `getSkuPrefix(sku)`
Extract SKU family prefix.

```javascript
function getSkuPrefix(sku) {
    return sku.replace(/\d+$/, '');
}
```

#### `showError(message)` / `hideError()`
Display/hide error messages to user.

#### `updateProgress(percent, text)`
Update progress bar visualization.

---

## 🔧 Customization Guide

### Adding New SKU

**Step 1: Update SKU_DB**
```javascript
const SKU_DB = {
    // ... existing SKUs
    'NEWSKU01': 5,  // Add here with volume score
};
```

**Step 2: Test**
- Upload invoice with new SKU
- Verify detection works
- Check box grouping is correct

---

### Changing Box Size Thresholds

```javascript
function chooseBoxSize(totalScore) {
    // Modify these thresholds:
    if (totalScore < 5) return { type: 'SMALL', ... };      // Was: 3
    if (totalScore < 10) return { type: 'MEDIUM', ... };    // Was: 8
    if (totalScore < 25) return { type: 'LARGE', ... };     // Was: 20
    return { type: 'OVERSIZE', ... };
}
```

**Impact analysis:**
- Smaller threshold → More orders in larger boxes
- Larger threshold → More orders in smaller boxes

Test with sample data before deploying!

---

### Supporting New Platform

**Step 1: Add detection pattern**
```javascript
// In splitPDFByOrders()
const lazadaPattern = /Lazada Order[:\s]*([A-Z0-9]+)/i;

if (orderMatch) {
    platform = 'LAZADA';
}
```

**Step 2: Add platform tag**
```javascript
// In showResults()
const platformClass = order.platform === 'LAZADA' ? 
    'platform-lazada' : 'platform-tiktok';
```

**Step 3: Add CSS styling**
```css
.platform-lazada {
    background: #0F146D;
    color: white;
}
```

---

## ✅ Best Practices

### 1. Error Handling
```javascript
// Always wrap PDF operations in try-catch
try {
    const pdfDoc = await PDFDocument.load(arrayBuffer);
} catch (error) {
    console.error('PDF load failed:', error);
    showError('File rusak atau format tidak didukung');
}
```

### 2. Memory Management
```javascript
// Revoke object URLs after download
URL.revokeObjectURL(url);  // Prevent memory leak
```

### 3. Input Validation
```javascript
// Validate before processing
if (file.type !== 'application/pdf') {
    showError('Hanya PDF yang diperbolehkan');
    return;
}

if (file.size > 50 * 1024 * 1024) {  // 50MB
    showError('File terlalu besar (max 50MB)');
    return;
}
```

### 4. Progress Feedback
```javascript
// Always show progress for long operations
updateProgress(30, 'Membaca halaman 15/50...');
```

---

## 🐛 Debugging Tips

### Problem: SKU not detected

**Debug steps:**
1. Log extracted text:
```javascript
console.log('Page text:', text);
```

2. Check regex pattern:
```javascript
const testSku = 'CSHN001';
console.log('Pattern test:', /^[A-Z]{2,6}(\d{0,5})?$/.test(testSku));
```

3. Verify SKU in database:
```javascript
console.log('In DB:', SKU_DB.hasOwnProperty('CSHN001'));
```

---

### Problem: Wrong box assignment

**Debug steps:**
1. Log total score:
```javascript
console.log('Order total score:', order.totalScore);
```

2. Check calculation:
```javascript
order.items.forEach(item => {
    console.log(`${item.sku}: ${item.volumeScore} × ${item.qty} = ${item.itemScore}`);
});
```

3. Verify box logic:
```javascript
const boxInfo = chooseBoxSize(order.totalScore);
console.log('Assigned box:', boxInfo.type);
```

---

### Problem: PDF merge fails

**Debug steps:**
1. Check order PDF validity:
```javascript
console.log('PDF bytes length:', order.pdfBytes.length);
```

2. Try loading individually:
```javascript
const testPdf = await PDFDocument.load(order.pdfBytes);
console.log('Pages:', testPdf.getPageCount());
```

3. Check browser console for errors

---

## 🚀 Performance Optimization

### Current Performance
- Small file (50 orders, 50 pages): ~5 seconds
- Medium file (100 orders, 100 pages): ~15 seconds
- Large file (200 orders, 200 pages): ~30 seconds

### Optimization Opportunities

**1. Parallel Processing**
```javascript
// Process multiple pages simultaneously
const pagePromises = [];
for (let i = 1; i <= numPages; i++) {
    pagePromises.push(extractPageText(i));
}
const results = await Promise.all(pagePromises);
```

**2. Lazy Loading**
```javascript
// Don't load all order PDFs into memory
// Generate on-demand when downloading
```

**3. Web Workers**
```javascript
// Move heavy processing to background thread
const worker = new Worker('pdf-processor.js');
worker.postMessage({ type: 'process', data: arrayBuffer });
```

---

## 📖 Further Reading

- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [PDF-Lib Documentation](https://pdf-lib.js.org/)
- [JavaScript Regex Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

---

**Next:** [API Reference](API_REFERENCE.md) for detailed function signatures