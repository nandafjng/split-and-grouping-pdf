// ========== PDF.js Configuration ==========
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// ========== SKU Database ==========
const SKU_DB = {

    // Angka
    '3IN1BHF': 10,           //Lume face Hair bodyset
    '3IN1SHB': 10,           //LUME PAKET 3 IN 1 SHAMPOO HAIR MASK SHOWER OIL LUMECOLORS
    '5IN1CHB': 16,           //LUME COMPLETE HAIR BODY SET
    '5IN1EO': 12,           //Perfect Complexion - Exotis
    '5IN1KL': 12,           //Perfect Complexion - Kuning Langsat
    '5IN1LT': 12,           //Perfect Complexion - Langsat Terang
    '5IN1PO': 12,           //Perfect Complexion - Putih Oriental
    '5IN1SM': 12,           //Warna Kulit Sawo Matang
    '5IN1SW': 12,           //Perfect Complexion - Sawo Matang


    // A
    'ACEFC01': 8,           //ACNE FACIAL REGULER
    'ACEFC02': 5,           //Acne + Facial Cleanser Travel
    'ACEM01': 6,           //ACNE + MOISTURIZER 30 GR
    'ACEM02': 4,           //ACNE + MOISTURIZER 8,5 GR
    'ACESR01': 4,           //ACNE + SERUM 35 ML
    'ACESR02': 4,           //ACNE + SERUM 10 ML
    'ACETR01': 4,           //ACNE + ESSENCE 80 ML
    'ACETR02': 4,           //ACNE + ESSENCE 33,5 ML
    'ACN01': 1,           //Acne Spot 10 gr
    'ACSRS01': 6,           //Scalp Massager Gold
    'ACSRS02': 6,           //Untangled Brush Pink
    'ACSRS03': 1,           //Facial Brush Pink


    
    // B
    'BACFB01': 8,           //FACIAL CLEANSER REGULAR + BRUSH PINK
    'BACFB02': 5,           //Facial Clanser Travel + Facial Brush Pink
    'BACMB01': 8,           //HAIR MASK 300 GR + UNTANGLED BRUSH
    'BACMB02': 6,           //HAIR MASK 150 GR + UNTANGLED BRUSH
    'BACSS01': 10,           //SHAMPOO 320 ML + SCALP MASSAGER GOLD
    'BACSS02': 8,           //SHAMPOO 150 ML + SCALP MASSAGER GOLD
    'BACTG01': 6,           //ESSENCE TONER 80 ML + GUASHA
    'BACTG02': 5,           //ESSENCE TONER 33,5 ML + GUASHA
    'BAHB00': 14,           //Bundling Amande Hair and Body
    'BAHB01': 14,           //Lume Bundling 2in1 Amande + Shampoo 150ml
    'BAHB02': 14,           //Lume Bundling 2in1 Amande + Body Wash 150ml
    'BAHB03': 14,           //Lume Bundling 2in1 Amande + Body Serum 150gr
    'BAHB04': 14,           //Lume Bundling 2in1 Amande + Hair Mask 150gr
    'BAHB05': 18,           //Lume Bundling 3in1 Amande + Shampoo 150ml + Hair Mask 150gr
    'BBLUME': 3,           //Beauty Blender
    'BDAMUN': 20,           //AMANDE + UNISEX
    'BDFBEXO': 7,           //FLAWLESS BASE DUO EXOTIC
    'BDFBKL': 7,           //FLAWLESS BASE DUO KUNING LANGSAT
    'BDFBLT': 7,           //FLAWLESS BASE DUO LANGSAT TERANG
    'BDFBPO': 7,           //FLAWLESS BASE DUO PUTIH ORIENTAL
    'BDFBSM': 7,           //FLAWLESS BASE DUO SAWO MATANG
    'BDPBEXO': 8,           //PERFECT BASE EXOTIC
    'BDPBKL': 8,           //PERFECT BASE KUNING LANGSAT
    'BDPBLT': 8,           //PERFECT BASE LANGSAT TERANG
    'BDPBPO': 8,           //PERFECT BASE PUTIH ORIENTAL
    'BDPBSM': 8,           //PERFECT BASE SAWO MATANG
    'BDPCEXO': 8,           //PERFECT COMPLEXION DUO EXOTIC
    'BDPCKL': 8,           //PERFECT COMPLEXION DUO KUNING LANGSAT NEW
    'BDPCLT': 8,           //PERFECT COMPLEXION DUO LANGSAT TERANG NEW
    'BDPCPO': 8,           //PERFECT COMPLEXION DUO PUTIH ORIENTAL NEW
    'BDPCSM': 8,           //PERFECT COMPLEXION DUO SAWO MATANG NEW
    'BDSGDE': 8,           //SMOOTH GLOW KIT DUO EXOTIC
    'BDSGKL': 8,           //SMOOTH GLOW KIT DUO KUNING LANGSAT
    'BDSGLT': 8,           //SMOOTH GLOW KIT DUO LANGSAT TERANG
    'BDSGPO': 8,           //SMOOTH GLOW KIT DUO PUTIH ORIENTAL
    'BDSGSM': 8,           //SMOOTH GLOW KIT DUO SAWO MATANG
    'BDYOIL01': 4,           //Body Wash 150 mL
    'BDYOIL02': 6,           //Body Wash 320 mL
    'BDYSR01': 4,           //Body Serum 150 mL
    'BDYSR02': 6,           //Body Serum 300 gr
    'BLCM23': 4,           //Bundling lipcoat dan lipmouse - isi 4
    'BPBEO': 8,           //Perpect base Exotis
    'BPBKL': 8,           //Perpect base Kuning Langsat
    'BPBLT': 8,           //Perpect base Langsat terang
    'BPBPO': 8,           //Perpect base Putih Oriental
    'BPBSW': 8,           //Perpect base Sawo matang
    'BRB1SET': 8,           //LUME Basic repair barrier set
    'BRM001': 3,           //BROWMATE
    'BUNDPALE2': 8,           //PAKET PALETTE+EYECONIC 02
    'BUNDPALE3': 8,           //PAKET PALETTE+EYECONIC 03


    
    // C
    'CDLIGHT': 7,           //Charming Duo Light
    'CDNEUTRAL': 7,           //Charming Duo Neutral
    'CDSAND': 7,           //Charming Duo Sand
    'CSHN001': 3,           //LUMECOLORS Perfect Blur Cushion - LIGHT
    'CSHN002': 3,           //LUMECOLORS Perfect Blur Cushion - NEUTRAL
    'CSHN003': 3,           //LUMECOLORS Perfect Blur Cushion - SAND
    'CWD000': 1.5,           //CP - Fair
    'CWD001': 1.5,           //CP - Light
    'CWD002': 1.5,           //CP - Neutral
    'CWD003': 1.5,           //CP - Sand


    // D
    'DNPL01': 8,           //Day & Night Pallete

    // E
    'ECLUME1': 2,           //Eyeconic - Ashbrown
    'ECLUME2': 2,           //Eyeconic - Asphaltgrey
    'ECLUME3': 2,           //Eyeconic - Espresso
    'EDCW00': 6,           //PAKET COMPACT+EYECONIC 00
    'EDCW01': 6,           //PAKET COMPACT+EYECONIC 01
    'EDCW02': 6,           //PAKET COMPACT+EYECONIC 02
    'EDCW03': 6,           //PAKET COMPACT+EYECONIC 03
    'EDFD01': 6,           //PAKET FD BOTOL+EYECONIC 01
    'EDFD02': 6,           //PAKET FD BOTOL+EYECONIC 02
    'EDFD03': 6,           //PAKET FD BOTOL+EYECONIC 03
    'EDFS01': 4,           //PAKET FD SACHET+EYECONIC 01
    'EDFS02': 4,           //PAKET FD SACHET+EYECONIC 02
    'EDFS03': 4,           //PAKET FD SACHET+EYECONIC 03
    'EDLP00': 5,           //PAKET LOSPOW+EYECONIC 00
    'EDLP01': 5,           //PAKET LOSPOW+EYECONIC 01
    'EDLP02': 5,           //PAKET LOSPOW+EYECONIC 02
    'EDLP03': 5,           //PAKET LOSPOW+EYECONIC 03


    
    // F
    'FALS001': 10,           //Falscara Starter Kit
    'FALS002': 5,           //Falscara OVERNIGHTER
    'FALS003': 5,           //Falscara BOND & SEAL
    'FALS004': 5,           //Falscara REMOVER
    'FALSW01': 5,           //Falscara Lengthening
    'FALSW02': 5,           //Falscara Natural Wispy
    'FALSW03': 5,           //Falscara Bambi Wisps
    'FALSW04': 5,           //Falscara D-LASH LIFTING EFFECT
    'FALSW05': 5,           //Falscara L - Curl Type
    'FCRP01': 3.3,           //Face Cream Pallete 01
    'FCRP02': 3.3,           //Face Cream Pallete 02
    'FCRP03': 3.3,           //Face Cream Pallete 03
    'FCRP04': 6.5,           //Bundling FCP01 + FCP02
    'FCRP05': 6.5,           //Bundling FCP01 + FCP03
    'FCRP06': 6.5,           //Bundling FCP02 + FCP03
    'FCRP07': 10,           //Bundling FCP01 + FCP02 + FCP03
    'FEMI002': 10,           //LUME FEMININE SCENTS DUET - SET 2
    'FOND01': 3,           //FD - Sand
    'FOND02': 3,           //FD - Light
    'FOND03': 3,           //FD - Neutral
    'FONDSC01': 1.5,           //FD Sachet - Sand
    'FONDSC02': 1.5,           //FD Sachet - Light
    'FONDSC03': 1.5,           //FD Sachet - Neutral
    'FREST10': 10,           //FRESTIO
    'FREST11': 20,           //BUNDLING FRESTIO 2 BOX
    'FRSTL01': 10,           //Parfum Frestilo
    'FSUP01': 20,           //BUNDLING PARFUM 5 SETS

    // H
    'HAIRMSK01': 4,           //Hair Mask 150 mL
    'HAIRMSK02': 6,           //Hair Mask 300 gr
    'HAIRSO01': 4,           //Shampoo 150 mL
    'HAIRSO02': 6,           //Shampoo 320 mL
    'HAIRSR01': 4,           //Hair Serum 150 mL

    // K
    'K31EC0B7': 1,           //LC - Kiss of fire
    'K31EC0B8': 1,           //LC - Chocolate Trip
    'K31EC0B9': 1,           //LC - Bare With Me
    'K31EC0BA': 1,           //LC - Sunset Chic
    'K31EC0BB': 1,           //LC - Arm Candy
    'K31EF084': 1,           //LM - Sugar Babe
    'K31EF085': 1,           //LM - Be My Boo
    'K31EF086': 1,           //LM - Vixen Glam
    'K31EF087': 1,           //LM - Crimson Red
    'K31EF088': 1,           //LM - Spicy Coral
    'K31EF089': 1,           //LM - Pumkin Pie
    'K31EF08A': 1,           //LM - Sunset Kiss
    'K31EF08B': 1,           //LM - Peach Me
    'K31EF08C': 1,           //LM - My Bae
    'K31EF08D': 1,           //LM - Marshmellow
    'K3203B86': 1,           //LC - Coralline
    'K3203B87': 1,           //LC - Deviouse Queen
    'K3203B88': 1,           //LC - Memory Of You
    'K3203B89': 1,           //LC - Summer Potion
    'K3203B8A': 1,           //LC - Sunday Bliss
        
    // L
    'LIPSET01': 10,           //BUNDLING BROWLIPSET NUDE 1
    'LIPSET02': 10,           //BUNDLING BROWLIPSET NUDE 2
    'LIPSET03': 10,           //BUNDLING BROWLIPSET NUDE 3
    'LOOSE00': 3,           //LP - Light
    'LOOSE01': 3,           //LP - Light Neutral
    'LOOSE02': 3,           //LP - Medium Neutral
    'LOOSE03': 3,           //LP Golden Tan
    'LS0001': 1,           //VELVET CREME LIPSTICK NUDE 01
    'LS0002': 1,           //VELVET CREME LIPSTICK NUDE 02
    'LS0003': 1,           //VELVET CREME LIPSTICK NUDE 03
    'LS0004': 3,           //BUNDLING LIPSTIK NUDE ALL SHADE
    'LTINT01': 1,           //ULTRALIGHT LIPTINT STORMY
    'LTINT02': 1,           //ULTRALIGHT LIPTINT INNOCENT
    'LTINT03': 1,           //ULTRALIGHT LIPTINT LOVELY
    'LTINT04': 3,           //3 LIPTINT ALL VARIAN


    
    // P
    'PAL000': 8,           //Day & Night Pallete (Tanpa Brush)
    'PDAEO': 6,           //Double action Exotis
    'PDAKL': 6,           //Paket Double - kuning langsat
    'PDALT': 6,           //Double action Langsat terang
    'PDAPO': 6,           //Paket Double - Putih Oriental
    'PDASW': 6,           //Double action sawo matang
    'PRF01': 12,           //LUME PARFUM 3 SET 30 ml
    'PSBKL': 6,           //Simple base Kuning langsat
    'PSBLT': 6,           //Paket Simple Base - Langsat Terang
    'PSBPO': 6,           //Paket Simple Base - Putih Oriental
    'PSBSW': 6,           //Simple base sawo matang

    // R
    'RSS3T': 10,           //RADIANT STARTERB SET
    
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

    // W
    'WASH001': 4,           //Lume wash assistant

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
