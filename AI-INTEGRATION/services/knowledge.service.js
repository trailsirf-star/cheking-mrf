/**
 * services/knowledge.service.js
 * MRFSMS Knowledge Engine
 */

const knowledge = {

    greeting: `👋 Assalam-o-Alaikum!

MRFSMS Support me khush aamdeed.

Main aap ki kis cheez me madad kar sakta hoon?`,

    otp_not_received: `❌ OTP receive nahi hui?

Please ye steps follow karein:

1️⃣ TunnelBear VPN install karein.
2️⃣ VPN connect karein.
3️⃣ Parallel Space use karein.
4️⃣ Golden Number select karein.
5️⃣ Agar phir bhi issue aaye to dusri number series try karein.

Agar phir bhi problem solve na ho to hame dobara message karein.`,

    vpn_help: `🌍 VPN Guide

Recommended VPN:

✅ TunnelBear VPN

VPN connect karne ke baad dobara OTP receive karne ki koshish karein.`,

    parallel_space: `📱 Parallel Space Guide

Play Store se Parallel Space install karein.

Uske andar application run karein aur phir OTP receive karne ki koshish karein.`,

    golden_number: `⭐ Golden Number

Golden Number ki success rate normal numbers se zyada hoti hai.

Agar OTP repeatedly fail ho rahi hai to Golden Number try karein.`,

    permanent_number: `🔐 Permanent Number

Permanent access ke liye:

✅ Passkey enable karein.

Ya

✅ 2-Step Verification enable karein.

Iske baad account zyada secure aur stable rahega.`,

    login_not_available: `⚠ Login Not Available

Application me 3 dots menu open karein.

Wahan:

Login Not Available Solution 1

ya

Login Not Available Solution 2

ki video follow karein.`,

    payment_pending: `💰 Payment Pending

Agar payment abhi approve nahi hui to thoda wait karein.

Raat 11 PM ke baad submit ki gayi payments aam tor par subah 7 AM se pehle approve kar di jati hain.`,

    payment_approved: `✅ Payment Successfully Approved.

Wallet automatically update ho jayega.

Agar balance update na ho to page refresh karein.`,

    wallet_balance: `💳 Wallet Balance

Dashboard open karein.

Wallet section me current balance show ho jayega.

Agar balance update na ho to page refresh karein.`,

    refund_request: `❌ Refund Policy

Order purchase karne se pehle Terms & Conditions accept kiye jate hain.

Successful purchase ka refund available nahi hota.

Agar technical issue ho to support team aap ki madad karegi.`,

    order_status: `📦 Order Status

Apna Order ID bhej dein.

Main order ki detail check karne me madad karunga.`,

    transaction_issue: `💳 Transaction Issue

Apna:

• Transaction ID

Ya

• Payment Screenshot

bhej dein taake verification ki ja sake.`

};

function getReply(intent) {

    return knowledge[intent] || null;

}

module.exports = {

    getReply

};