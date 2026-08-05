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
4️⃣ Dashboard ke "Live" button se Live Feed check karein aur jo number stable dikhe wahi try karein.
5️⃣ Agar phir bhi issue aaye to dusri number series ya Golden Number try karein.

Agar phir bhi problem solve na ho to apna Order ID, Service Name aur Country bhej dein.`,

    youtube_tutorial: `🎬 Video Tutorials

Hamara official YouTube channel: @Mr.FSmsPortal
https://www.youtube.com/@Mr.FSmsPortal

Yahan Login Not Available Solutions, number use karne ka tarika, aur baaki common issues ke step-by-step video mojood hain.`,

    number_ban: `⚠️ Number/Account Ban

Hum kisi bhi number ki ban na hone ki guarantee nahi dete.

Order lete waqt aap ne Terms & Agreement accept kiya tha jisme saaf likha hai ke ban/logout ki zimmedari MRFSMS ki nahi hoti — ye us platform (WhatsApp/Facebook/etc.) ki apni policy aur number ke istimaal ke tareeqe par depend karta hai.

Number ko 3 dots menu wali guide ke mutabiq use karne se ban hone ke chances kaafi kam ho jate hain.`,

    how_to_use_number: `📖 Number Use Karne Ka Tarika

Number purchase karne ke baad app ke 3 dots (⋮) menu me jayein.

Wahan hamari complete guide di hui hai ke number ko safely kaise use karna hai (warm-up period, daily message limit, shuru me groups/broadcast se parhez waghera).

Guide follow karne se account zyada stable rehta hai.`,

    live_feed_help: `📡 Live Feed

Dashboard par "Live" button click karein — wahan abhi ke stable/active numbers dikhte hain.

Ek number par OTP na aaye to wahi number baar baar try karne ke bajaye Live Feed se koi doosra stable number ya series/tier change kar ke try karein.`,

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

Aap ki payment abhi verification me hai, admin manually check kar ke approve karta hai.

Agar raat ka waqt hai to team abhi offline hai — raat 11 PM ke baad submit ki gayi payments aam tor par subah 7 AM se pehle (kabhi kabhi us se bhi pehle) approve kar di jati hain. Please thoda wait karein.`,

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
