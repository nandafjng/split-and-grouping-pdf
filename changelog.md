📝 Changelog
All notable changes to the Spliting Tool project will be documented in this file.

Protoype (Thursday, 4 December 2025)
- Demonstrated PDF text extraction
- Validated order pattern detection
- Tested SKU matching algorithm
- Box size logic prototype

Beta (Friday, 5 December 2025)
- Prototype with core functionality
- Basic PDF reading
- Simple order splitting
- Manual box assignment

Known Issues
- No drag & drop support
- Single-item orders only
- No progress indicator
- Basic error handling

Version 1.0
- TikTok/Tokopedia invoice processing tool
- PDF upload via click or drag & drop
- Order detection using "Order ID" pattern
- SKU extraction from invoice text
- Quantity detection
- Volume score calculation
- Box grouping (SMALL/MEDIUM/LARGE/OVERSIZE)
- Per-box PDF download (merged)
- Individual order PDF download
- Download all boxes feature
- Progress indicator

Techincal Stack for V1.0
- PDF.js v2.16.105 for text extraction
- PDF-Lib v1.17.1 for PDF manipulation
- JSZip v3.10.1 for archiving
- Pure HTML/CSS/JavaScript (no frameworks)
- Client-side processing (no server needed)
- Fixeror handling & display

V 1.01 Fixed
Whats fixed?
- Progress bar not updating smoothly
- Memory leak in PDF processing (URL not revoked)
- Wrong filename encoding for some order IDs

Changed

- Improved error messages
- Better browser compatibility
- Faster PDF merging

Technical

- Added URL.revokeObjectURL() after downloads
- Fixed async/await handling in download functions
- Optimized PDF-Lib operations

[1.1.0] - 2024-12-05
Added - Multiple Items Support

MAJOR FEATURE: 
- Detect multiple items per order
- Scan entire page text for all SKUs
- Prevent duplicate SKU detection
- Accurate quantity detection per item
- Total score calculation across all items

Changed - Box Grouping

Box size thresholds adjusted:
SMALL: <= 3 (was: ≤ 3)
MEDIUM: <= 9 (was: ≤ 12)
LARGE: <= 20 (was: ≤ 20)
OVERSIZE: ≥ 20 (unchanged)
(More accurate grouping based on testing)

Fixed

- Issue where only first SKU in multi-item order was detected
- Wrong box assignment for multi-item orders
- Qty detection for items without explicit "Qty:" label

Technical

- Rewrote SKU extraction algorithm
- Added foundSkus array to prevent duplicates
- Enhanced qty detection with lookahead (5 words)
- Item-level score tracking

V 1.20 (2025-12-06)

Added - SKU Family Sorting

MAJOR FEATURE: 
- Orders now sorted by SKU family within each box
- SKU prefix extraction algorithm
- Cross-item sorting (e.g., all CWD together, then all CSHN)
- Visual SKU family badges in UI
  
Added - UI

- SKU family badge display (e.g., [CWD], [CSHN])
- Color-coded family indicators
- Better visual grouping in results

Technical

- New function: getSkuPrefix(sku)
- Enhanced sorting algorithm in groupOrdersByBox()
- Alphabetical family sorting with stable sort

Performance

- Sorting adds negligible processing time (<100ms for 200 orders)
- Memory usage unchanged

V [2.0.0] - 2024-12-06 🛍️
Added - Shopee Tool

NEW TOOL: 
- shopee.html specifically for Shopee invoices
- Shopee order ID pattern recognition (No.Pesanan: XXXXX)
- Shopee-themed UI (orange gradient)
- Support for Shopee-specific invoice format
- Alphanumeric order ID support (e.g., 251204EFJD645Q)

Added - Features

- Platform-specific branding in UI
- Shopee color scheme (#FF6A00 → #EE4D2D)
- Platform badge display

Fixed

- SKU detection for pure-letter SKUs (BDPBPO, BDFBKL, etc.)
- Regex pattern now supports: /^[A-Z]{2,6}(\d{0,5})?$/
- Fixed false positives in SKU extraction

Technical

- Separated platform logic for better maintainability
- Added Shopee-specific text parsing

[3.0.0] - 2024-12-07 🔥
Added - Hybrid Tool

NEW TOOL: 
- for mixed TikTok + Shopee invoices
- Auto-detection of platform per page (TikTok vs Shopee)
- Cross-platform sorting by SKU family
- Platform breakdown statistics (TikTok count vs Shopee count)
- Visual platform badges (🔵 TikTok, 🟠 Shopee)
- Platform-specific color coding in UI
- Mixed platform support in box grouping

Added - UI Enhancements

- Gradient background (TikTok purple + Shopee orange)
- Platform badges in order display
- Per-box platform statistics
- Enhanced visual feedback for platform mixing

Added - Documentation

Complete README.md with quick start guide
This CHANGELOG.md

Changed

- All tools now use consistent UI/UX patterns
- Improved error messages with more context
- Better progress indicators with detailed status

Technical

- Unified platform detection logic across all tools
- Optimized PDF processing for hybrid files
- Enhanced memory management for large files

