# 🏷️ SKU Database Documentation

> **Complete guide to managing SKU volume scores**

This document explains the SKU database, volume scoring system, and how to add/modify SKUs.

---

## 📋 Table of Contents

1. [Understanding Volume Scores](#understanding-volume-scores)
2. [Current SKU Database](#current-sku-database)
3. [SKU Family Groups](#sku-family-groups)
4. [Adding New SKUs](#adding-new-skus)
5. [Modifying Existing SKUs](#modifying-existing-skus)
6. [Best Practices](#best-practices)

---

## 📏 Understanding Volume Scores

### What is Volume Score?

Volume score adalah angka yang merepresentasikan **ukuran fisik** produk relatif terhadap produk lain.

**Bukan:** Berat, harga, atau nilai
**Adalah:** Volume relatif untuk keperluan packing

### Scoring Scale

| Score | Meaning | Physical Size | Example Products |
|-------|---------|---------------|------------------|
| **1** | Extra Small | Lipstick-sized | Compact powder, liptint, loose powder |
| **2** | Small | Foundation bottle | Small bottles, single makeup items |
| **3** | Small-Medium | Cushion box | Cushions, small palettes |
| **4** | Medium | Serum/Oil bottle | Body oil, hair serum, foundation |
| **5** | Medium-Large | Bundle starter pack | Small bundles, 2-3 item sets |
| **6** | Large | Gift set box | Medium bundles, 3-4 items |
| **8** | Extra Large | Perfume set | Perfume bottles, large gift sets |
| **10** | Jumbo | Full bundle | Complete makeup bundles |
| **20+** | Special | Custom/rare | Very large special orders |

### How Scoring Works

**Formula:**
```
Total Order Score = Σ (SKU Volume Score × Quantity)
```

**Example 1:**
```
Order contains:
- CWD001 (score 1) × 2 = 2
- CSHN001 (score 3) × 1 = 3
--------------------------
Total Score = 5 → MEDIUM box
```

**Example 2:**
```
Order contains:
- PRF01 (score 8) × 2 = 16
--------------------------
Total Score = 16 → LARGE box
```

---

## 📦 Current SKU Database

### Complete SKU List (Alphabetical)

```javascript
const SKU_DB = {
    // A
    'ACCGS01': 1,    // Lume Guasha Massage Tool
    'ACSRS01': 1,    // Scalp Massager
    'ACSRS02': 1,    // Detangler Brush
    'ACN01': 4,      // Acne Spot Treatment
    'AMD001': 8,     // Amande Perfume 60mL
    
    // B
    'BBLUME': 1,     // Beauty Sponge Blender
    'BDAMUN': 10,    // Body Amande Bundle (large)
    'BDFBKL': 5,     // Flawless Base Duo Bundle - Kuning Langsat
    'BDFBSM': 5,     // Flawless Base Duo Bundle - Shea Butter
    'BDPBKL': 6,     // Body Perfect Bundle - Kuning Langsat
    'BDPBLT': 6,     // Body Perfect Bundle - Lavender Tea
    'BDPBPO': 6,     // Body Perfect Bundle - Papaya Oat
    'BDSGSM': 5,     // Body Serum Bundle - Shea Butter
    'BDYOIL02': 4,   // Body Oil 300ml
    'BDYSR02': 4,    // Body Serum 300ml
    'BRM001': 1,     // Browmate 4-in-1
    
    // C
    'CSHN001': 3,    // Cushion Light
    'CSHN002': 3,    // Cushion Neutral
    'CWD000': 1,     // Compact Powder Fair
    'CWD001': 1,     // Compact Powder Light
    'CWD002': 1,     // Compact Powder Neutral
    'CWD003': 1,     // Compact Powder (other shades)
    
    // E
    'ECLUME2': 1,    // Eyeconic Duo Pencil
    
    // F
    'FCRP01': 3,     // Face Cream Palette 1
    'FCRP02': 3,     // Face Cream Palette 2
    'FCRP03': 3,     // Face Cream Palette 3
    'FCRP06': 3,     // Face Cream Palette 2+3
    'FOND01': 2,     // Foundation Sand 30ml
    'FOND02': 2,     // Foundation Light 30ml
    'FOND03': 2,     // Foundation Neutral 30ml
    
    // H
    'HAIRSO02': 4,   // Hair Therapy Shampoo 320ml
    
    // L
    'LOOSE00': 1,    // Loose Powder Light
    'LOOSE01': 1,    // Loose Powder Light Neutral
    'LOOSE02': 1,    // Loose Powder (other variants)
    'LS0001': 1,     // Velvet Creme Lipstick Nude01
    'LS0002': 1,     // Velvet Creme Lipstick Nude02
    'LTINT01': 1,    // Ultralight Liptint Stormy
    'LTINT02': 1,    // Ultralight Liptint Innocent
    'LTINT03': 1,    // Ultralight Liptint Lovely
    'LTINT04': 1,    // Ultralight Liptint All Variant
    
    // P
    'PAL000': 3,     // Palette (various)
    'PRF01': 8,      // Perfume 3-Set Eau de Parfum
    
    // S
    'SRFC01': 4,     // Nourishing Facial Cleanser 30ml
    'SRET01': 4,     // Hydro Boost Essence 33.5ml
    
    // U
    'UNIX003': 8,    // Unisex Perfume Set ONE AQUA BLUE
};
```

**Total SKUs:** 52
**Last updated:** December 2024

---

## 👪 SKU Family Groups

SKUs are grouped by prefix for sorting purposes.

### Family List

| Family | Prefix | Members | Products |
|--------|--------|---------|----------|
| **Accessories** | `ACC`, `ACS` | 3 | Guasha, massagers, brushes |
| **Bundles** | `BD`, `BDF` | 7 | Various product bundles |
| **Cushions** | `CSHN` | 2 | Cushion Light & Neutral |
| **Compact Powder** | `CWD` | 4 | All compact powder shades |
| **Eye Products** | `ECLUME` | 1 | Eye pencils |
| **Face Products** | `FCRP`, `FOND` | 7 | Palettes & foundations |
| **Hair Care** | `HAIR` | 1 | Shampoo, treatments |
| **Lip Products** | `LS`, `LTINT` | 6 | Lipsticks & liptints |
| **Loose Powder** | `LOOSE` | 3 | All loose powder variants |
| **Perfumes** | `AMD`, `PRF`, `UNIX` | 3 | Perfume sets |
| **Skincare** | `ACN`, `SRFC`, `SRET` | 3 | Treatments, cleansers |
| **Tools** | `BBLUME`, `BRM` | 2 | Sponges, brow tools |

### How Families Are Used

**In sorting algorithm:**
```javascript
// Orders sorted by family first
ACCGS01  ← Accessories family
ACSRS01  ← Accessories family
ACSRS02  ← Accessories family
BDYOIL02 ← Body family
CSHN001  ← Cushion family
CSHN002  ← Cushion family
```

**Benefit for pickers:**
- Grab all accessories together
- Then all body products
- Then all cushions
- No backtracking!

---

## ➕ Adding New SKUs

### When to Add New SKU

✅ **Add when:**
- New product launched
- SKU shows as "UNKNOWN" in results
- Product has unique size/volume

❌ **Don't add when:**
- Product is variant of existing (use same score)
- Temporary/seasonal (unless significant volume)

### Step-by-Step Guide

#### Step 1: Gather Information

Before adding, collect:
1. **SKU Code** (e.g., `NEWPROD01`)
2. **Product Name** (e.g., "New Moisturizer 50ml")
3. **Physical Dimensions** (L×W×H in cm)
4. **Comparable Products** (what's similar?)

#### Step 2: Determine Volume Score

**Method A: Compare to Existing**
```
New product: Serum 40ml
Similar to: SRET01 (score 4, 33.5ml)
Decision: Also score 4 (similar size)
```

**Method B: Measure Relative Size**
```
Extra Small (1) ← Lipstick size
Small (2)       ← Foundation bottle
Medium (3-4)    ← Cushion box / Serum bottle
Large (5-6)     ← Bundle / Gift set
Extra Large (8+) ← Perfume set / Large bundle

New product fits → Choose appropriate score
```

**Method C: Actual Calculation**
```
Volume = Length × Width × Height

CWD001 (score 1): 8×8×2 = 128 cm³
CSHN001 (score 3): 10×10×3 = 300 cm³
New product: 9×9×2.5 = 202 cm³

Decision: Between 1 and 3, assign score 2
```

#### Step 3: Update Code

**Edit all 3 tool files:**
1. `packing_tool_tiktok.html`
2. `packing_tool_shopee.html`
3. `packing_tool_hybrid.html`

**Find this section:**
```javascript
const SKU_DB = {
    'PRF01': 8, 'AMD001': 8, 'UNIX003': 8,
    // ... existing SKUs ...
};
```

**Add new SKU in alphabetical order:**
```javascript
const SKU_DB = {
    'PRF01': 8, 'AMD001': 8, 'UNIX003': 8,
    'NEWPROD01': 4,  // ← Add here with determined score
    // ... rest of SKUs ...
};
```

#### Step 4: Test

1. Create test PDF with new SKU
2. Upload to tool
3. Verify:
   - ✅ SKU detected (not "UNKNOWN")
   - ✅ Correct score shown
   - ✅ Correct box assignment
   - ✅ Sorts with correct family

#### Step 5: Document

Update this document:
- Add to SKU list
- Add to family group (if new family)
- Update total count
- Note date added

#### Step 6: Deploy

1. Save all 3 HTML files
2. Test on local computer
3. Deploy to production
4. Notify users of new SKU

---

## ✏️ Modifying Existing SKUs

### When to Modify

✅ **Modify when:**
- Product packaging changed significantly
- Consistently wrong box assignment
- Business rule changed (e.g., bundle redefined)

❌ **Don't modify without:**
- Consulting with warehouse team
- Testing with real data
- Approval from manager

### Modification Process

#### Step 1: Identify Issue

**Example issue:**
```
Current:
CSHN001: score 3 → MEDIUM box

Problem:
New cushion packaging is much smaller
Often fits in SMALL box with other items

Proposed:
CSHN001: score 2 → Better box utilization
```

#### Step 2: Analyze Impact

**Check affected orders:**
```
How many orders have CSHN001?
- Last week: 150 orders
- Average qty: 1.2 per order
- Current box: MEDIUM (95%)
- After change: SMALL (70%), MEDIUM (30%)

Impact: More efficient packing!
```

#### Step 3: Update & Test

**Before:**
```javascript
'CSHN001': 3,  // Old score
```

**After:**
```javascript
'CSHN001': 2,  // New score (smaller packaging)
```

**Test with last week's data:**
- Process same invoices again
- Compare results
- Verify improvement

#### Step 4: Document Change

Add to [CHANGELOG.md](CHANGELOG.md):
```
## [3.1.0] - 2024-12-10

### Changed
- CSHN001 score: 3 → 2 (smaller packaging)
- Impact: +20% SMALL box utilization
```

---

## ✅ Best Practices

### 1. Consistency is Key

**Do:**
- Similar products = similar scores
- All compact powders = score 1
- All cushions = score 3

**Don't:**
- Random scoring
- CWD001 = 1, CWD002 = 3 (inconsistent!)

### 2. Round to Nearest

**Prefer:**
- 1, 2, 3, 4, 5, 6, 8, 10

**Avoid:**
- 1.5, 2.7, 3.2 (no decimals!)

### 3. Test Before Deploy

**Testing checklist:**
- ✅ Process real invoice
- ✅ Check 10 random orders
- ✅ Verify box assignments make sense
- ✅ Compare to manual packing

### 4. Document Everything

**For each change:**
- ✅ Why changed?
- ✅ When changed?
- ✅ Who approved?
- ✅ Impact analysis done?

### 5. Conservative Scoring

**When in doubt:**
- Score slightly **higher** (safer)
- Better: Item in slightly bigger box
- Worse: Item doesn't fit, needs repack

**Example:**
```
Unsure if score 3 or 4?
Choose 4 (safer)

Result:
- Might waste some box space (OK)
- vs. Item doesn't fit (BAD)
```

### 6. Review Quarterly

**Every 3 months:**
1. Review all SKUs
2. Check for:
   - Products no longer sold
   - New products not added
   - Scores that need adjustment
3. Cleanup & optimize

---

## 🔬 Advanced: Volume Score Calculation

### Precise Method (Optional)

For very accurate scoring:

**Step 1: Measure Physical Volume**
```
Product: CSHN001
Length: 10 cm
Width: 10 cm
Height: 3 cm

Volume = 10 × 10 × 3 = 300 cm³
```

**Step 2: Calculate Relative Score**
```
Base reference: CWD001 = 1 (128 cm³)

Relative score = Product volume / Base volume
               = 300 / 128
               = 2.34

Round to: 2 or 3
```

**Step 3: Verify with Real Packing**
```
Test pack:
- 5× CWD001 in SMALL box: ✅ Fits
- 5× CSHN001 in SMALL box: ❌ Too tight
- 3× CSHN001 in SMALL box: ✅ Fits

Decision: CSHN001 takes ~1.67× space of CWD001
Final score: 3 (conservative)
```

---

## 📊 Statistics

### Current Database Stats

```
Total SKUs: 52
Score Distribution:
  Score 1:  22 SKUs (42%)  ← Most common
  Score 2:  3 SKUs  (6%)
  Score 3:  7 SKUs  (13%)
  Score 4:  6 SKUs  (12%)
  Score 5:  3 SKUs  (6%)
  Score 6:  3 SKUs  (6%)
  Score 8:  3 SKUs  (6%)
  Score 10: 1 SKU   (2%)
  Score 20+: 0 SKUs (0%)

Family Groups: 12
Most Common Family: Compact Powder (CWD) - 4 variants
```

---

## 🔗 Related Documents

- [Developer Guide](DEVELOPER_GUIDE.md) - Technical implementation
- [User Manual](USER_MANUAL.md) - How to use the tool
- [Changelog](CHANGELOG.md) - Version history

---

**Last updated:** December 2024  
**Maintained by:** Tech Team  
**Contact:** tech@lumecolors.com