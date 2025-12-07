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