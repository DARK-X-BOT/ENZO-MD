const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUFoM3JzaWRqVkcxMkpTczhTSVA1dHRxd21Vc1Vxc1BQZE4zRVVjR1cyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzM4eWcrbEI0U2U5c0VTUWxPbjd4cFR6TUZDVVk1RVhtNk9Xb2IxQ1h4UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZUE5wRm9EazYwb0pUZ05ld25jaTIyTlpYVE9JQzRDK0RIcFdHTmQ4TzFVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLaFoveENLSVlFbkpyQzV4dDRkQVhvL2JmWEI3aHh0VzVQY1JTSjdmNlJrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNHZFlhSzNVMEJSQWlkWTUwRjhqazMrQUpDaVJ2d1BxcFBkYnNZSS9BSFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktVam8ranpMalNwU0ZGQmRyZWkvRU9oZDZuc1JrbWg1UTI0bkFYNlJpaUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0VKOTU0c1ZqZnpSWHpiMUFiVGhmRWY0M3hONXBkclY5b0s4VUVrdzJrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVRnRkIrVTVqRExIZlNqQUphckNRTUtRbWVLK1VqNVpFWUlHYVNmZnMyMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR2RWI0WWJIZHcwa2RrUVNTWjRObHVQanJpUlJteHdsN2dzN1h4RUdaV3ZrQjNxQkpYMW5VU1U0Vk5CR3c2SDRtUzVSVzRRR2tHeGQxSlc5dk9JemhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiJGVVFzL0N2L1VvTkQrOHhDL1RpZ3BvMXVodHVZeFhxSkp2dzNHdnJlaVVVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ3Qy1OdnlHdFExR0g4M2FKc0QyZ1RRIiwicGhvbmVJZCI6IjYyMWE3MjY4LTYxMmYtNDZkNy1iY2VlLTUzODNhMGRlOWJlOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJseU00VG9GajBod3k5Mmdwb0xqbzRoOCtHSXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNWM5VTBVRnF5U2pnL1VoWE9NWHVwRGtxNWl3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik00VkZDV1BWIiwibWUiOnsiaWQiOiI5NDc3NDYwOTU2OToyN0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZW+In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLTFlwL01DRU5hVm9Mc0dHQmdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIzbGdEOHRrc3VSUmlXNVE5NjNYYXQwaFQ1bVhTNnNCK3ErWldwaFdSV1M0PSIsImFjY291bnRTaWduYXR1cmUiOiJCV29vRUJoL3VEbGYrbUxBZlNTNFc1YlRRcXFDRk9hK0FySm1vb1JvV3dwMU9xM29KTm50cldXNFhzOTVqc0FlODg4ZHVrVnVlY1FUSERUTEV5U05DZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiV1JXU1BTRmprcmtPK0FOa1RYSGRGVjU3OTFJUEVrZG5KdEVxcjJxeUo3aWQwclFqcUVYQVBmMkZZMmdXSlV5d2dlSFIwRFVVR2U3ajZVWkxOS2pPaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc3NDYwOTU2OToyN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkNVlBL0xaTExrVVlsdVVQZXQxMnJkSVUrWmwwdXJBZnF2bVZxWVZrVmt1In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0ODcxNzc5fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
