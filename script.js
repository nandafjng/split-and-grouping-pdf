// ========== PDF.js Configuration ==========
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// ========== SKU Database ==========
const SKU_DB = {
    // A
    'ACCGS01': 1.5,    // Lume Guasha Massage Tool
    'ACSRS01': 4,      // Scalp Massager
    'ACSRS02': 1,      // Detangler Brush
    'ACN01': 1.5,      // Acne Spot Treatment
    'AMD001': 10,      // Amande Perfume 60mL
    
    // B
    'BAHB03': 12,      // Bundling Amande Body Serum Kecil
    'BBLUME': 3,       // Beauty Blender
    'BDAMUN': 14,      // Body Amande Bundle (large)
    'BDFBKL': 5,       // Flawless Base Duo Bundle - Kuning Langsat
    'BDFBSM': 5,       // Flawless Base Duo Bundle - Shea Butter
    'BDPBKL': 6,       // Body Perfect Bundle - Kuning Langsat
    'BDPBLT': 6,       // Body Perfect Bundle - Lavender Tea
    'BDPBPO': 6,       // Body Perfect Bundle - Papaya Oat
    'BDSGSM': 5,       // LUMECOLORS BUNDLING SMOOTH
    'BDSGPO': 5,       // LUMECOLORS BUNDLING SMOOTH - Putih Oriental
    'BDYOIL01': 4,     // Body Oil 150ml
    'BDYOIL02': 6,     // Body Oil 300ml
    'BDYSR01': 4,      // Body Serum 150ml
    'BDYSR02': 6,      // Body Serum 300ml
    'BRM001': 1.5,     // Browmate 4-in-1
    
    // C
    'CSHN001': 3,      // Cushion Light
    'CSHN002': 3,      // Cushion Neutral
    'CSHN003': 3,      // Cushion Sand
    'CWD000': 1.5,     // Compact Powder Fair
    'CWD001': 1.5,     // Compact Powder Light
    'CWD002': 1.5,     // Compact Powder Neutral
    'CWD003': 1.5,     // Compact Powder Sand
    
    // E
    'ECLUME2': 4,      // Eyeconic Duo Pencil
    'EDLP03': 4,       // PAKET LOOSE POWDER + EYECONIC G.TAN+ASPHALTGREY
    
    // F
    'FCRP01': 3.3,     // Face Cream Palette 1
    'FCRP02': 3.3,     // Face Cream Palette 2
    'FCRP03': 3.3,     // Face Cream Palette 3
    'FCRP05': 6,       // Face Cream Palette 1+3
    'FCRP06': 6,       // Face Cream Palette 2+3
    'FCRP07': 9,       // Face Cream Pallete 1+2+3
    'FOND01': 3,       // Foundation Sand 30ml
    'FOND02': 3,       // Foundation Light 30ml
    'FOND03': 3,       // Foundation Neutral 30ml
    
    // H
    'HAIRMSK01': 4,    // Hair Mask 150ml
    'HAIRMSK02': 6,    // Hair Mask 320ml
    'HAIRSO01': 4,     // Hair Therapy Shampoo 150ml
    'HAIRSO02': 6,     // Hair Therapy Shampoo 320ml

    // K
    'K31EC0B9': 1,     // Lipcoat Bare With Me
    'K31EF089': 1,     // Lipcoat Pumpkin Pie
    
    // L
    'LOOSE00': 3,      // Loose Powder Light
    'LOOSE01': 3,      // Loose Powder Light Neutral
    'LOOSE02': 3,      // Loose Powder Medium Neutral
    'LOOSE03': 3,      // Loose Powder Golden Tan
    'LS0001': 1,       // Velvet Creme Lipstick Nude01
    'LS0002': 1,       // Velvet Creme Lipstick Nude02
    'LTINT01': 1,      // Ultralight Liptint Stormy
    'LTINT02': 1,      // Ultralight Liptint Innocent
    'LTINT03': 1,      // Ultralight Liptint Lovely
    'LTINT04': 1,      // Ultralight Liptint All Variant
    
    // P
    'PAL000': 5,       // Palette (various)
    'PRF01': 12,       // Perfume 3-Set Eau de Parfum
    
    // S
    'SRFC01': 3,       // Nourishing Facial Cleanser 30ml
    'SRFC02': 6,       // Nourishing Facial Cleanser 100ml
    'SRET01': 2,       // Hydro Boost Essence 33.5ml
    'SRET02': 3,       // Hydro Boost Essence 80ml
    'SRBR01': 2,       // LUME Brightening Serum Concentrate 10ml
    'SRBR02': 3,       // LUME Brightening Serum Concentrate 35ml
    
    // U
    'UNIX003': 8,      // Unisex Perfume Set ONE AQUA BLUE
};

// ========== Global Variables ==========
let selectedFile = null;
let processedOrders = [];

// ========== DOM Elements ==========
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const processBtn = document.getElementById('processBtn');

// ========== Helper Functions ==========
function formatScore(num) {
    // Remove trailing zeros after decimal
    return Number(num.toFixed(2)).toString();
}

function getVolumeScore(sku) {
    return SKU_DB[sku] || 2;
}

function chooseBoxSize(totalScore) {
    if (totalScore <= 3) return { type: 'SMALL', capacity: 3, color: '#4CAF50' };
    if (totalScore <= 8) return { type: 'MEDIUM', capacity: 8, color: '#2196F3' };
    if (totalScore <= 20) return { type: 'LARGE', capacity: 20, color: '#FF9800' };
    return { type: 'OVERSIZE', capacity: 100, color: '#F44336' };
}

function getSkuPrefix(sku) {
    return sku.replace(/\d+$/, '');
}

// ========== Event Listeners ==========
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelect(files[0]);
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
});

processBtn.addEventListener('click', async () => {
    if (!selectedFile) return;
    await processPDF(selectedFile);
});

// ========== File Handling ==========
function handleFileSelect(file) {
    if (file.type !== 'application/pdf') {
        showError('Hanya file PDF yang diperbolehkan!');
        return;
    }
    selectedFile = file;
    uploadArea.querySelector('.upload-text').textContent = `✓ ${file.name}`;
    processBtn.disabled = false;
    hideError();
}

// ========== PDF Processing ==========
async function processPDF(file) {
    showProgress();
    updateProgress(10, 'Membaca PDF...');

    try {
        const arrayBuffer = await file.arrayBuffer();
        
        updateProgress(30, 'Menganalisis orders dari TikTok & Shopee...');
        const orders = await splitPDFByOrders(arrayBuffer);
        
        if (orders.length === 0) {
            throw new Error('Tidak ada order yang ditemukan dalam PDF');
        }

        updateProgress(60, 'Mengelompokkan per kardus...');
        const boxGroups = groupOrdersByBox(orders);
        
        updateProgress(90, 'Menyiapkan download...');
        processedOrders = boxGroups;
        
        updateProgress(100, 'Selesai!');
        showResults(boxGroups, orders);
        
    } catch (error) {
        console.error('Error:', error);
        showError('Error memproses PDF: ' + error.message);
        hideProgress();
    }
}

async function splitPDFByOrders(arrayBuffer) {
    const { PDFDocument } = PDFLib;
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const numPages = pdfDoc.getPageCount();
    
    const orders = [];
    let currentOrder = null;
    let currentPages = [];

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(' ');

        // Detect platform & order ID
        let platform = null;
        let orderMatch = null;

        // Try TikTok/Tokopedia pattern first
        orderMatch = text.match(/Order ID[:\s]*(\d+)/i);
        if (orderMatch) {
            platform = 'TIKTOK';
        } else {
            // Try Shopee pattern
            orderMatch = text.match(/No\.Pesanan[:\s]*([A-Z0-9]+)/i);
            if (orderMatch) {
                platform = 'SHOPEE';
            }
        }
        
        if (orderMatch && platform) {
            if (currentOrder && currentPages.length > 0) {
                const orderPdf = await PDFDocument.create();
                for (const pageNum of currentPages) {
                    const [copiedPage] = await orderPdf.copyPages(pdfDoc, [pageNum]);
                    orderPdf.addPage(copiedPage);
                }
                
                orders.push({
                    orderId: currentOrder.orderId,
                    platform: currentOrder.platform,
                    items: currentOrder.items,
                    totalScore: currentOrder.totalScore,
                    pdf: orderPdf,
                    pdfBytes: await orderPdf.save()
                });
            }

            // Extract SKU & Qty
            const items = [];
            let totalScore = 0;
            
            const allWords = text.split(/\s+/);
            const foundSkus = [];
            
            for (let j = 0; j < allWords.length; j++) {
                const word = allWords[j];
                
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

            currentOrder = {
                orderId: orderMatch[1],
                platform: platform,
                items: items,
                totalScore: parseFloat(totalScore.toFixed(2))
            };
            currentPages = [i - 1];
        } else if (currentOrder) {
            currentPages.push(i - 1);
        }
    }

    if (currentOrder && currentPages.length > 0) {
        const orderPdf = await PDFDocument.create();
        for (const pageNum of currentPages) {
            const [copiedPage] = await orderPdf.copyPages(pdfDoc, [pageNum]);
            orderPdf.addPage(copiedPage);
        }
        
        orders.push({
            orderId: currentOrder.orderId,
            platform: currentOrder.platform,
            items: currentOrder.items,
            totalScore: currentOrder.totalScore,
            pdf: orderPdf,
            pdfBytes: await orderPdf.save()
        });
    }

    return orders;
}

// ========== Grouping Functions ==========
function groupOrdersByBox(orders) {
    const boxes = {};

    orders.forEach(order => {
        const totalScore = order.totalScore;
        const boxInfo = chooseBoxSize(totalScore);
        const boxType = boxInfo.type;

        if (!boxes[boxType]) {
            boxes[boxType] = {
                type: boxType,
                capacity: boxInfo.capacity,
                color: boxInfo.color,
                orders: []
            };
        }

        boxes[boxType].orders.push(order);
    });

    // Sort by SKU family (cross-platform)
    for (const boxType in boxes) {
        boxes[boxType].orders.sort((a, b) => {
            const skuA = a.items[0].sku;
            const skuB = b.items[0].sku;
            
            const prefixA = getSkuPrefix(skuA);
            const prefixB = getSkuPrefix(skuB);
            
            if (prefixA !== prefixB) {
                return prefixA.localeCompare(prefixB);
            }
            
            return skuA.localeCompare(skuB);
        });
    }

    return boxes;
}

// ========== Download Functions ==========
async function downloadBoxPDF(boxType) {
    const { PDFDocument } = PDFLib;
    const boxData = processedOrders[boxType];
    
    const mergedPdf = await PDFDocument.create();
    
    for (const order of boxData.orders) {
        const orderPdf = await PDFDocument.load(order.pdfBytes);
        const copiedPages = await mergedPdf.copyPages(orderPdf, orderPdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HYBRID_KARDUS_${boxType}_${boxData.orders.length}orders_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function downloadAllPDF() {
    for (const [boxType, boxData] of Object.entries(processedOrders)) {
        await downloadBoxPDF(boxType);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

async function downloadSingleOrder(boxType, orderIndex) {
    const order = processedOrders[boxType].orders[orderIndex];
    const blob = new Blob([order.pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${order.platform}_ORDER_${order.orderId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ========== UI Functions ==========
function showResults(boxGroups, orders) {
    const resultsSection = document.getElementById('resultsSection');
    const boxGroupsDiv = document.getElementById('boxGroups');
    
    // Count platforms
    let tiktokCount = 0;
    let shopeeCount = 0;
    orders.forEach(order => {
        if (order.platform === 'TIKTOK') tiktokCount++;
        else if (order.platform === 'SHOPEE') shopeeCount++;
    });

    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalBoxes').textContent = Object.keys(boxGroups).length;
    document.getElementById('tiktokOrders').textContent = tiktokCount;
    document.getElementById('shopeeOrders').textContent = shopeeCount;
    
    let totalItems = 0;
    Object.values(boxGroups).forEach(box => {
        box.orders.forEach(order => {
            order.items.forEach(item => totalItems += item.qty);
        });
    });
    document.getElementById('totalItems').textContent = totalItems;

    boxGroupsDiv.innerHTML = '';

    for (const [boxType, boxData] of Object.entries(boxGroups)) {
        const boxDiv = document.createElement('div');
        boxDiv.className = 'box-group';
        boxDiv.style.borderLeftColor = boxData.color;

        // Count platform breakdown in this box
        let boxTiktok = 0;
        let boxShopee = 0;
        boxData.orders.forEach(order => {
            if (order.platform === 'TIKTOK') boxTiktok++;
            else if (order.platform === 'SHOPEE') boxShopee++;
        });

        let boxHtml = `
            <div class="box-header">
                <span>📦 KARDUS ${boxType}</span>
                <span class="box-badge" style="background: ${boxData.color}">${boxData.orders.length} orders</span>
            </div>
            <div class="box-stats">
                🔵 TikTok: ${boxTiktok} orders | 🟠 Shopee: ${boxShopee} orders
            </div>
            <div class="box-actions">
                <button class="download-box-btn" onclick="downloadBoxPDF('${boxType}')">
                    📄 Download PDF Kardus Ini (${boxData.orders.length} orders)
                </button>
            </div>
        `;

        boxData.orders.forEach((order, index) => {
            const itemsDisplay = order.items.map(item => 
                `${item.sku} (${item.qty}x)`
            ).join(', ');
            
            const itemsDetail = order.items.map(item =>
                `${item.sku}: ${formatScore(item.volumeScore)} × ${item.qty} = ${formatScore(item.itemScore)}`
            ).join(' | ');
            
            const skuFamily = getSkuPrefix(order.items[0].sku);
            const platformClass = order.platform === 'TIKTOK' ? 'platform-tiktok' : 'platform-shopee';
            const platformIcon = order.platform === 'TIKTOK' ? '🔵' : '🟠';
            
            boxHtml += `
                <div class="result-item">
                    <div class="order-info">
                        <div class="order-id">
                            ${platformIcon} Order #${order.orderId}
                            <span class="platform-tag ${platformClass}">${order.platform}</span>
                            <span style="background: #e3f2fd; color: #1976d2; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-left: 8px;">${skuFamily}</span>
                        </div>
                        <div class="order-details">${itemsDisplay} • Total Score: ${formatScore(order.totalScore)}</div>
                        <div class="order-details" style="font-size: 11px; color: #999;">${itemsDetail}</div>
                    </div>
                    <button class="download-btn" onclick="downloadSingleOrder('${boxType}', ${index})">
                        📥 Download
                    </button>
                </div>
            `;
        });

        boxDiv.innerHTML = boxHtml;
        boxGroupsDiv.appendChild(boxDiv);
    }

    resultsSection.style.display = 'block';
    hideProgress();
}

function showProgress() {
    document.getElementById('progressSection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    processBtn.disabled = true;
}

function hideProgress() {
    document.getElementById('progressSection').style.display = 'none';
    processBtn.disabled = false;
}

function updateProgress(percent, text) {
    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressFill').textContent = percent + '%';
    document.getElementById('statusText').textContent = text;
}

function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorMessage').style.display = 'block';
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}