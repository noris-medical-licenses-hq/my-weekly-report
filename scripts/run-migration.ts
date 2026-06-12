/**
 * One-time migration: inserts SEED_TOPICS into Supabase.
 * Run with:  npx tsx scripts/run-migration.ts
 *
 * Prerequisites: the two GRANT statements in 001_create_tables.sql must have
 * been executed in the Supabase SQL editor first.
 */

import { createClient } from "@supabase/supabase-js";

// ── Inline seed data (same content as src/lib/seed-data.ts) ──────────────────
// We duplicate here to avoid Vite/import.meta.env issues in Node context.

const SUPABASE_URL = "https://rocybqcwizkrdwmbyhwv.supabase.co";
const SUPABASE_KEY = "sb_publishable_iMdJcHjRY-lmv1uZCyH6sA_O85bSbJE";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Topic data (matches src/lib/seed-data.ts exactly) ────────────────────────

function uuid(): string {
  // Node 19+ has globalThis.crypto; fallback for older versions
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  // @ts-ignore
  return require("node:crypto").randomUUID();
}

const now = new Date().toISOString();

const topics = [
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "שרת ענן",
    status: "at_risk", priority: "high", changed_since_previous: true, reviewed: false,
    previous_week_update: `1. תקלת רשת אינטרנט במשרד ביום שלישי הציפה את הסיכון באי זמינות שרת הקבצים המקומי במהלך מבדק\n2. המעבר לענן של שרת הפריוריטי שבוצע בתחילת ינואר צמצם את האירוע ומיקד אותו במטה (מקרה דומה מנובמבר 2024 השבית אותנו גלובלית ליומיים)\n3. האירוע חידד את הצורך בניהול שוטף של יכולת חיבור VPN למשתמשי הפריוריטי הרלוונטיים, כך שיוכלו לגשת לשרת הענן דרך hotspot `,
    current_week_update: "", risks_and_challenges: `1. למקרה של אי זמינות קבצים במהלך מבדק עשויות להיות השלכות משמעותיות עד כדי אי מעבר מבדק\n2. אי זמינות יוליה להקמת VPN לכלל משתמשי המטה תדרוש טיפול שלי (משימה עתירת זמן עבודה)`,
    next_week_priority: `1. השלמת תמחור מעבר כונן QA לשרת ענן\n2. מיפוי משימת VPN, בניית תוכנית עבודה להמשך בהתאם לעדיפויות`,
    support_required: `1. אישור החלטה למעבר לשרת הענן, עלות צפויה של כ1000-1200 ₪ בחודש`,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "אתר eIFU",
    status: "blocked", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. אתר eIFU הועלה לייצור בהצלחה, כולל גיבוי אוטומטי, תיעוד מלא ומסמך עדכון לעורך הדין\n2. לאחר בדיקת הנגישות ותיקוני Landmark/ARIA נדרשים, ניתן יהיה להסיר את ה-disclaimer ולפרסם את הכתובת`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: `עדכון disclaimer עם הכתובת הרשמית לאחר אישור מרגע שיש כתובת סופית לאתר`,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "RFID",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. כינוס ועדה (פאולה, אמיר, מורן, ואני) - הוגדרו דרישות מפורטות לכל מחלקה\n2. עדכון טבלת השוואת ספקים ב-SharePoint ל-3 מוצרים: Zebra ,RFKeeper ,Nedap\n3. בקשת הצעות מחיר מ-3 ספקים (מחכה לתגובות)`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: `1. קבלת הצעות מחיר מ-3 ספקים\n2. קביעת פגישת הצגת הצעות מחיר עם ועדה`,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "מצלמות - ניהול ועדכון",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. קיבלנו את ציוד הרשת החדש (POE Switch + כבלים) מיבואן Hikvision\n2. עדכון Firmware של כל המצלמות הישנות שכשלו לאחרונה\n3. התקנת מצלמה חדשה בכניסה הקדמית - מחכה לחיבור חשמל סופי`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: `חיבור מלא של המצלמה החדשה עם חיבור החשמל`,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "מחסן - שדרוגים ומיפוי",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. בוצע מיפוי מלא של מוצרים ב-WMS עם עדכון קואורדינטות\n2. קיבלנו עגלה חדשה לסריקה מהיירה (מחכה לפריסה)`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: `פריסת עגלת הסריקה ואימון עובדי מחסן`,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "Seegene מכשיר",
    status: "completed", priority: "low", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. אינטגרציה מול Seegene הושלמה - נפתר בעיית החיבור שהיתה פתוחה 3 שבועות\n2. הצוות אימן את עצמו על השימוש בממשק החדש`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "שדרוג תשתית נטוורק",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הורדת תכנית עבודה מפורטת עם הספק\n2. זמן ביצוע: 3 ימים - מתוכנן לסוף חודש`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: `ביצוע שדרוג הנטוורק`,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "AD - ניהול משתמשים",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון מדיניות סיסמאות - 90 יום תפוגה\n2. ניקוי 12 חשבונות לא פעילים מה-AD`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "Office 365 - ניהול",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הגדרת Teams - קבוצות עבודה לכלל המחלקות\n2. OneDrive - הגדרת גיבוי אוטומטי ל-10 תחנות עבודה נוספות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "ERP פריוריטי",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון גרסה בוצע בהצלחה - גרסה 24.1\n2. אימון 5 משתמשים חדשים על ממשק עדכני`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחשוב / תשתיות / פרויקטים", topic_name: "Endpoint Protection",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון Sentinel One על כל תחנות העבודה\n2. 2 אירועי זיהוי טופלו ונסגרו`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ביטוח איכות", topic_name: "מבדק ISO 13485",
    status: "in_progress", priority: "high", changed_since_previous: true, reviewed: false,
    previous_week_update: `1. הכנות למבדק ה-ISO הסתיימו - כל מסמכי ה-QMS עודכנו\n2. מבדק פנימי בוצע - נמצאו 2 ממצאים קלים שטופלו`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: `מבדק ה-ISO 13485 עצמו`,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ביטוח איכות", topic_name: "ניהול NCR / CAPA",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. סגירת 3 CAPAs פתוחות מרבעון קודם\n2. פתיחת NCR חדשה - ממצא משלוח ספק`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ביטוח איכות", topic_name: "תיקוף תהליכים",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. V&V תהליך הלחמה - שלב 1 הושלם\n2. תיעוד ה-IQ הושלם ואושר`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ביטוח איכות", topic_name: "ספקים - הערכה וניהול",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הושלם סיקור שנתי של 15 ספקים קריטיים\n2. ספק 1 הוסר מרשימת הספקים המאושרים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ביטוח איכות", topic_name: "הדרכות QMS",
    status: "in_progress", priority: "low", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הדרכת GMP בוצעה ל-20 עובדים\n2. עדכון מטריצת הכשרות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ביטוח איכות", topic_name: "שינויי מוצר / ECO",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. אושרו 3 ECOs שהיו בתהליך\n2. עדכון DHF בהתאם לשינויים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ביטוח איכות", topic_name: "תלונות לקוחות",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. טיפול ב-2 תלונות חדשות מהשבוע\n2. סגירת 1 תלונה ישנה עם דוח CAPA`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "רגולציה", topic_name: "CE Mark / MDR",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון Technical File - 3 מוצרים\n2. קיבלנו שאלות מ-Notified Body - מענה נשלח`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "רגולציה", topic_name: "FDA 510(k) / De Novo",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הוגשה 510(k) למוצר חדש\n2. מחכים לאישור FDA - ETA 3 חודשים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "רגולציה", topic_name: "UDI - ניהול",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון GUDID עבור 5 מוצרים חדשים\n2. תיקון נתוני UDI שגויים - 2 מוצרים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "רגולציה", topic_name: "Israel - AMAR",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הגשת 2 בקשות רישום חדשות למשרד הבריאות\n2. מעקב אחר 5 בקשות ממתינות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "רגולציה", topic_name: "Post Market Surveillance",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון PMSR שנתי - 4 מוצרים\n2. ניתוח נתוני אחר שוק - אין ממצאים חריגים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "שרשרת אספקה", topic_name: "ספקים אסטרטגיים",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. פגישה עם ספק ראשי - חידוש חוזה לשנתיים\n2. גיבוש ספק חלופי לרכיב קריטי`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "שרשרת אספקה", topic_name: "ניהול מלאי",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. ספירת מלאי רבעונית הושלמה - חריגה של 2% זוהתה ותוקנה\n2. עדכון נקודות הזמנה מחדש ל-15 פריטים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "שרשרת אספקה", topic_name: "לוגיסטיקה ומשלוחים",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. בוצעו 45 משלוחים בשבוע - 100% בזמן\n2. שינוי ספק לוגיסטי לאירופה - חיסכון של 15%`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "שרשרת אספקה", topic_name: "מכס ורגולציה מסחרית",
    status: "in_progress", priority: "low", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון HL7 לייצוא לשווקים חדשים\n2. הגשת בקשת פטור ממכס - מחכה לאישור`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "כספים", topic_name: "תקציב שנתי",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. סגירת חודש אפריל - ביצוע 98% מהתקציב\n2. דיון תקציב Q3 - הועבר לאישור הנהלה`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "כספים", topic_name: "חשבוניות ותשלומים",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עיבוד 120 חשבוניות שבועיות - 0 חריגות\n2. הסדרת 3 חשבוניות שנתקעו בבנק`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "כספים", topic_name: "דוחות כספיים",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הוכנו דוחות רבעוניים Q1\n2. ביקורת פנימית - אין ממצאים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "כספים", topic_name: "שכר ותנאים",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עיבוד שכר אפריל - בוצע ללא חריגות\n2. עדכון הסכמי שכר ל-5 עובדים לפי סיכמות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "משאבי אנוש", topic_name: "גיוס עובדים",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. פתיחת 3 משרות חדשות - QA, R&D, מכירות\n2. ראיונות ל-8 מועמדים - 2 בשלבים מתקדמים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "משאבי אנוש", topic_name: "הדרכה ופיתוח",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הדרכת בטיחות לכלל העובדים - הושלמה\n2. תכנית פיתוח מנהלים - גיבוש תוכנית לרבעון`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "משאבי אנוש", topic_name: "רווחה ושביעות רצון",
    status: "in_progress", priority: "low", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. סקר שביעות רצון עובדים - 85% שביעות\n2. אירוע גיבוש חברתי - 95% השתתפות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "משאבי אנוש", topic_name: "מבנה ארגוני",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון מבנה ארגוני - הוספת מחלקת Customer Success\n2. הגדרת תפקידים ותחומי אחריות ל-3 משרות חדשות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "משאבי אנוש", topic_name: "בוריס",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: ``,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחקר ופיתוח", topic_name: "פיתוח מוצר חדש",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. פרוטוטייפ v3 הושלם - בדיקות התאמה בוצעו\n2. Design Review עם הנהלה - אושר להמשך`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחקר ופיתוח", topic_name: "בדיקות קליניות",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. פרוטוקול מחקר קליני אושר ע\"י ועדת הלסינקי\n2. גיוס 15 מהמטרה 30 נבדקים הושלם`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחקר ופיתוח", topic_name: "IP וקניין רוחני",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הגשת 2 בקשות פטנט חדשות\n2. ניתוח FTO למוצר חדש - אין חסמים`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מחקר ופיתוח", topic_name: "שיתופי פעולה אקדמיים",
    status: "in_progress", priority: "low", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. חוזה שיתוף פעולה עם אוניברסיטת ת\"א נחתם\n2. פגישת קיקאוף עם מנחי המחקר`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מכירות ושיווק", topic_name: "מכירות ישירות",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. סגירת 5 עסקאות חדשות - סה\"כ 450K ₪\n2. pipeline Q2 - 2.3M ₪ לסגירה`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מכירות ושיווק", topic_name: "הפצה בינלאומית",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. חוזה הפצה עם מפיץ גרמני - נחתם\n2. Training מפיץ ספרדי - הושלם`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מכירות ושיווק", topic_name: "שיווק דיגיטלי",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. עדכון אתר החברה - עמוד מוצרים חדש\n2. קמפיין LinkedIn - 15% עלייה בנראות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מכירות ושיווק", topic_name: "תערוכות וכנסים",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. הכנות לתערוכת Medica נובמבר - אושר תקציב\n2. הגשת אבסטרקטים לכנס RSNA`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "מכירות ושיווק", topic_name: "שירות לקוחות",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. זמן תגובה ממוצע: 2.3 שעות - עומד ביעד\n2. NPS חודשי: 72 - שיפור של 5 נקודות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ייצור", topic_name: "תוכניות ייצור",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. תוכנית ייצור Q2 עודכנה - יעד 1,200 יחידות\n2. יעילות ייצור השבוע: 94%`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ייצור", topic_name: "ציוד ותחזוקה",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. PM רבעוני הושלם לכל ציוד הייצור\n2. תקלה במכונת הלחמה - תוקנה תוך 4 שעות`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ייצור", topic_name: "בקרת איכות ייצור",
    status: "in_progress", priority: "high", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. שיעור פחת: 1.2% - מתחת ליעד 2%\n2. In-Process Inspection - 100% עמידה`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ייצור", topic_name: "בטיחות בסביבת העבודה",
    status: "in_progress", priority: "medium", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. ביקורת בטיחות שנתית - ללא ממצאים חריגים\n2. תרגיל פינוי חירום - 4 דקות (יעד 5 דקות)`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
  {
    id: uuid(), group_name: "ייצור", topic_name: "סביבה ואחריות תאגידית",
    status: "in_progress", priority: "low", changed_since_previous: false, reviewed: false,
    previous_week_update: `1. מדידת טביעת רגל פחמנית Q1 - ירידה של 8%\n2. תוכנית מחזור אריזות - הושקה`,
    current_week_update: "", risks_and_challenges: ``,
    next_week_priority: ``,
    support_required: ``,
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Connecting to Supabase:", SUPABASE_URL);

  // 1. Create (or reuse) a report
  const today = new Date().toISOString().split("T")[0];

  const { data: existing, error: existErr } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existErr) {
    console.error("ERROR reading reports:", existErr.message);
    console.error("→ Run the GRANT statements in 001_create_tables.sql first.");
    process.exit(1);
  }

  let reportId: string;

  if (existing) {
    reportId = existing.id;
    console.log(`Reusing existing report: ${reportId} (${existing.week_start})`);
  } else {
    const { data: created, error: createErr } = await supabase
      .from("reports")
      .insert({ week_start: today, week_end: today })
      .select("id")
      .single();

    if (createErr) {
      console.error("ERROR creating report:", createErr.message);
      process.exit(1);
    }
    reportId = created!.id;
    console.log(`Created new report: ${reportId}`);
  }

  // 2. Clear any existing topics for this report
  const { error: delErr } = await supabase
    .from("topics")
    .delete()
    .eq("report_id", reportId);

  if (delErr) {
    console.error("ERROR clearing topics:", delErr.message);
    process.exit(1);
  }

  // 3. Insert all topics with staggered created_at to preserve order
  const base = Date.now();
  const rows = topics.map((t, i) => ({
    ...t,
    report_id: reportId,
    updated_at: now,
    created_at: new Date(base + i).toISOString(),
  }));

  const { error: insErr } = await supabase.from("topics").insert(rows);

  if (insErr) {
    console.error("ERROR inserting topics:", insErr.message);
    process.exit(1);
  }

  console.log(`\n✓ Inserted ${rows.length} topics into report ${reportId}`);

  // 4. Verify: read back שרת ענן
  const { data: sample, error: sampleErr } = await supabase
    .from("topics")
    .select("*")
    .eq("report_id", reportId)
    .eq("topic_name", "שרת ענן")
    .single();

  if (sampleErr || !sample) {
    console.error("Could not fetch sample topic:", sampleErr?.message);
  } else {
    console.log("\n── שרת ענן (database row) ─────────────────────────────");
    console.log(JSON.stringify(sample, null, 2));
  }

  // 5. Summary
  const { count } = await supabase
    .from("topics")
    .select("*", { count: "exact", head: true })
    .eq("report_id", reportId);

  console.log(`\n── Summary ─────────────────────────────────────────────`);
  console.log(`Reports inserted : 1`);
  console.log(`Topics in report : ${count}`);
  console.log(`Report ID        : ${reportId}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
