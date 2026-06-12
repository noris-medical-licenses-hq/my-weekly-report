import type { Topic } from "./types";

const make = (t: Omit<Topic, "id" | "updatedAt">): Topic => ({
  ...t,
  id: crypto.randomUUID(),
  updatedAt: new Date().toISOString(),
});

export const SEED_TOPICS: Topic[] = [
  make({
    group: "מחשוב / תשתיות / פרויקטים",
    topic: "שרת ענן",
    status: "at_risk",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate:
      "1. המעבר של שרת הפריוריטי לענן בינואר צמצם את ההשפעה של תקלות רשת מקומיות.",
    currentWeekUpdate:
      "1. תקלת רשת במשרד הציפה סיכון של אי-זמינות שרת הקבצים המקומי.\n2. חידוד הצורך בניהול חיבור VPN למשתמשי פריוריטי דרך hotspot.",
    risksAndChallenges:
      "1. אי זמינות קבצים בזמן תקלה משבית עבודה במטה.\n2. הקמת VPN לכלל המשתמשים אורכת זמן.",
    nextWeekPriority: "1. השלמת תמחור מעבר QA לשרת ענן ובניית תוכנית עבודה.",
    supportRequired: "1. אישור החלטה למעבר לענן, עלות צפויה 1,000-1,200 ₪ לחודש.",
  }),
  make({
    group: "מחשוב / תשתיות / פרויקטים",
    topic: "תמיכה / תשתיות",
    status: "blocked",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. תשתית רעועה, טיפול נקודתי בתקלות נקודתיות.",
    currentWeekUpdate:
      "1. נפילת רשת אינטרנט ביום שלישי.\n2. תקלה מורכבת ברמת תשתית השרת, טיפול ביום עבודה שלם.\n3. יכולת מוגבלת לעבוד עם hotspot, רק במחשבים ניידים.",
    risksAndChallenges:
      "1. שילוב סיכונים: תשתית טלאי על טלאי, פיזור אחריות בין גורמי מקצוע.\n2. נושא השרת והאבטחה בעדיפות הגבוהה ביותר.\n3. הבראת תשתית יסודית - יקרה ומחייבת מבט קדימה על מיקום פיזי.",
    nextWeekPriority:
      "1. דיון בנושא.\n2. רכישת מקלטי WiFi למחשבים ניידים לעבודה עם hotspot.",
    supportRequired: "",
  }),
  make({
    group: "מחשוב / תשתיות / פרויקטים",
    topic: "פיתוחי פריוריטי",
    status: "on_track",
    changedSincePrevious: false,
    reviewed: true,
    previousWeekUpdate: "1. חוסר בפונקציית קב\"מ פנימית לתרגום אפיון למימוש.",
    currentWeekUpdate:
      "1. אפיון ויישום פיתוח להכנת נייר COC להודו - מ-3 שעות שבועיות ל-2-3 דקות.\n2. מומלץ לבחון קב\"מ in-house במשרה חלקית.",
    risksAndChallenges: "1. חוסר בפונקציה שיודעת לתרגם אפיון להתייעלות בפריוריטי.",
    nextWeekPriority: "",
    supportRequired: "",
  }),
  make({
    group: "מחשוב / תשתיות / פרויקטים",
    topic: "פרויקטים עתידיים",
    status: "at_risk",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: "1. רשימת פרויקטים שמחכים לפתיחה.",
    currentWeekUpdate:
      "1. מעבר ל-Office 365.\n2. העברת שרת קבצים לענן.\n3. העברת Active Directory לענן.\n4. הטמעת AI לייעול פעילות.",
    risksAndChallenges:
      "1. היעדר קשב ארגוני ליישום הפרויקטים.\n2. אין היתכנות נראית לעין להתחלת ביצוע.",
    nextWeekPriority: "",
    supportRequired: "",
  }),
  make({
    group: "מחשוב / תשתיות / פרויקטים",
    topic: "תשתית מצלמות / גלאים",
    status: "on_track",
    changedSincePrevious: true,
    reviewed: true,
    previousWeekUpdate: "1. גלאי נתן קריאות שווא לאורך תקופה ארוכה.",
    currentWeekUpdate:
      "1. הוחלף הגלאי הבעייתי.\n2. תשתית המצלמות נותנת כיסוי חלקי בלבד - מתוכננת החלפה למערכת Lumana.",
    risksAndChallenges: "1. כיסוי חלקי עד להתקנת המערכת החדשה.",
    nextWeekPriority: "1. תיאום מועד התקנה.",
    supportRequired: "",
  }),
  make({
    group: "משאבי אנוש",
    topic: "גיוס לייצור",
    status: "at_risk",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. תהליך סינון מועמדים מלשכת התעסוקה.",
    currentWeekUpdate:
      "1. תעסוקת נוער נותנת מענה זמני בחופשת הפסח.\n2. סינון קו\"ח ממשיך.",
    risksAndChallenges: "1. צוות הייצור מתוח לקצה.",
    nextWeekPriority: "1. המשך תהליך סינון קו\"ח מלשכת העבודה.",
    supportRequired: "",
  }),
  make({
    group: "משאבי אנוש",
    topic: "התקשרות עם חברות השמה",
    status: "on_track",
    changedSincePrevious: false,
    reviewed: true,
    previousWeekUpdate: "1. בחינת חברות השמה למול לשכת תעסוקה.",
    currentWeekUpdate:
      "1. החלטה לעצור תהליך עם HRhome.\n2. רמת המועמדים מלשכת התעסוקה גבוהה יחסית לחברות ההשמה.",
    risksAndChallenges: "1. בהיעדר חברת השמה, קושי באיתור מועמדים מתאימים.",
    nextWeekPriority: "",
    supportRequired: "",
  }),
  make({
    group: "משאבי אנוש",
    topic: "עדכוני שכר",
    status: "at_risk",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. תכנון עדכוני שכר לרבעון.",
    currentWeekUpdate:
      "1. עלייה בשכר המינימום מאפריל.\n2. תוכנית העלאות: עובדות ייצור, אנאבלה, סלבה.\n3. העלאות שתוכננו ולא בוצעו: נתנאל (עזב), יוליה.",
    risksAndChallenges: "",
    nextWeekPriority: "1. דיון בנושא.",
    supportRequired:
      "1. אישור עקרוני לעדכון שכר מינימום לעובד בייצור לאחר 6 חודשים (מ-36 ל-37).\n2. החלטה על מועד עדכוני שכר.",
  }),
  make({
    group: "סטאטוס מחסנים גלובלי",
    topic: "סקירה גלובלית",
    status: "on_track",
    changedSincePrevious: true,
    reviewed: true,
    previousWeekUpdate: "1. ביצוע משלוחים לפי תוכנית מתואמת בין השווקים.",
    currentWeekUpdate:
      "1. רמות מלאי סבירות (2-3 חודשים).\n2. חוסרים במידות קצה.\n3. משלוח ראשון השבוע מישראל במסגרת תוכנית העלאת המלאים.",
    risksAndChallenges:
      "1. ביקושים לא צפויים.\n2. פוקוס על גרמניה/הודו תוך מעקב על רמות בארה\"ב.",
    nextWeekPriority: "",
    supportRequired: "",
  }),
  make({
    group: "סטאטוס מחסנים גלובלי",
    topic: "הודו",
    status: "at_risk",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. רמות backorder גבוהות, ניהול שבועי של תוכנית הייצור.",
    currentWeekUpdate:
      "1. התייצבות מסוימת ברמות המלאי, צמצום של 50% ב-backorder.\n2. חוסר בשלד high-runner במידות פופולריות.\n3. הטיה בקצב המשלוחים עקב חלוקת משאבים בין גרמניה/ארה\"ב ואובדן ימי עבודה בפסח.\n4. יעד 3 חודשי מלאי יושג רק לאחר הפעלת תוכנת הדבקות.",
    risksAndChallenges:
      "1. תכנון שבועי בלבד עד הפעלת תוכנת הדבקות.\n2. הסתמכות על משלוחים שמגיעים ונצרכים מיידית.",
    nextWeekPriority: "1. המשך מעקב שבועי וחיזוק תוכנית הייצור.",
    supportRequired: "",
  }),
  make({
    group: "סטאטוס מחסנים גלובלי",
    topic: "משרד הודו - כוח אדם",
    status: "at_risk",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. בחינת המבנה הארגוני של המשרד.",
    currentWeekUpdate:
      "1. הוחלט על סיום העסקת סווארנה, פריקה תמלא את תפקידה.\n2. מנהלת המשרד החדשה (סמינה) תגיע באמצע מאי.\n3. המועמד ל-QC הוסר מועמדות, חיפוש מורחב עם חברת השמה נוספת.\n4. אושרה החלפת תשתית המצלמות ל-IP, התקנת Lumana בביקור הקרוב.",
    risksAndChallenges: "1. מעבר מידע חלקי - תיקי חפיפה לא מחליפים חפיפה פרונטלית.",
    nextWeekPriority: "1. המשך מעקב על תהליך החפיפה.",
    supportRequired: "",
  }),
  make({
    group: "שרשרת אספקה / ספקים / ייצור",
    topic: "מכונת סימון לייזר - LZQ",
    status: "blocked",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. תיאום מועד נסיעה לאישור המכונה.",
    currentWeekUpdate:
      "1. עלות משלוח אווירי כ-12,000$, זמן 10 ימים.\n2. עלות משלוח ימי כ-2,000$, זמן 3 חודשים.\n3. עלויות אווירי מושפעות מהיעדר טיסות זרות לישראל.",
    risksAndChallenges:
      "1. לוז גבולי עלול להביא לדחייה נוספת.\n2. סיכון באישור משלוח ללא בדיקה.\n3. עלויות משלוח גבוהות.\n4. סימן שאלה מי נוסע לאשר.",
    nextWeekPriority:
      "1. החלטה על אופן אישור המכונה.\n2. תזמון מועד נסיעה.\n3. החלטה מי נוסע.",
    supportRequired: "1. דיון בנושא וקבלת החלטה.",
  }),
  make({
    group: "שרשרת אספקה / ספקים / ייצור",
    topic: "משלוחים ללקוחות",
    status: "on_track",
    changedSincePrevious: false,
    reviewed: true,
    previousWeekUpdate: "1. חזרה לקצב ייצור שגרתי לאחר תקופת עומסים.",
    currentWeekUpdate:
      "1. היקפי ייצור משמעותיים חזרו לשגרה.\n2. ניסיונו של נדב בתפ\"י עוזר במיקוד הייצור ובהצמדות לתוכניות.",
    risksAndChallenges:
      "1. תפוקה מופחתת באפריל עקב החגים.\n2. השפעת המלחמה על נוכחות עובדים.\n3. הצוות מתוח לקצה.",
    nextWeekPriority:
      "1. משלוח להודו ביום ראשון.\n2. מיקוד באיטליה/גרמניה לפני החג.\n3. משלוח קטן לקולומביה.",
    supportRequired: "",
  }),
  make({
    group: "שרשרת אספקה / ספקים / ייצור",
    topic: "מערכת אנדוייז",
    status: "at_risk",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. הגדרת ספק וקבלת הצעה.",
    currentWeekUpdate:
      "1. הוגדרו תוכנית גיבוי (DAND) במידה ולא יתקבל היתר רעלים.\n2. תכנון העברת תשלום לספק.",
    risksAndChallenges:
      "1. סיכון מרכזי: אי קבלת היתר רעלים.\n2. חוסר זמינות לטיפול בנושא היתר רעלים / תיק מפעל.",
    nextWeekPriority: "1. העברת התשלום לספק.\n2. kick-off עם קטיה ותחילת עבודה על היתר.",
    supportRequired: "",
  }),
  make({
    group: "שרשרת אספקה / ספקים / ייצור",
    topic: "פסיבציה In-house",
    status: "on_track",
    changedSincePrevious: true,
    reviewed: true,
    previousWeekUpdate: "1. תכנון הקמת תהליך פסיבציה פנימי.",
    currentWeekUpdate:
      "1. סוכם תהליך עבודה ביחד עם קטיה, פאבלינה ונדב.\n2. יציאה לפיילוט של שלושה סוגי מוצרים.\n3. בניית התהליך בראייה קדימה על השפעת מכונת המדבקות.\n4. בוצע עדכון בפריוריטי בהתאם לסיכומים.",
    risksAndChallenges:
      "1. המומחיות בנושא היא של יוליה, ייתכן ויעלו פערים שיעכבו את התהליך.",
    nextWeekPriority: "1. תחילת הפיילוט.",
    supportRequired: "",
  }),
  make({
    group: "שרשרת אספקה / ספקים / ייצור",
    topic: "העברת ייצור מקדחים ל-FFDM",
    status: "at_risk",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. בחינת מעבר ייצור מקדחים מכרמקס ל-FFDM.",
    currentWeekUpdate:
      "1. המשך תהליך מול FFDM.\n2. בחינת הבדלי צבע בין מקדחי כרמקס ל-FFDM הדורשת הרכבת ערכות חדשות.",
    risksAndChallenges:
      "1. מוצרים בזמן אספקה ארוך - אתגר בתזמון הזמנות.\n2. הצמדות למסגרת לשנתיים = התחייבות 300-400 אלף יורו.\n3. מלאי עודף של מקדחי כרמקס שלא ניתן להמיר לעלות מכירה.\n4. הוצאת היקף משמעותי מכרמקס תשפיע על היחסים.",
    nextWeekPriority: "1. המשך קידום תהליך מול FFDM.",
    supportRequired: "",
  }),
  make({
    group: "שרשרת אספקה / ספקים / ייצור",
    topic: "יצרן חדש - קוסטה",
    status: "on_track",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: "1. ספק חדש בתהליך הכרות.",
    currentWeekUpdate:
      "1. קוסטה - שותף לשעבר של ניקולא חור, הצד הטכני של השותפות.\n2. מפעל קטן במעיליא, מייצר לתעשייה ביטחונית, רוצה להיכנס לדנטלי.\n3. הגיע השבוע לביקור - התרשמות חיובית.\n4. הערכה ראשונית של עלויות זולה יותר מ-DAND.\n5. חתם NDA.",
    risksAndChallenges:
      "1. ספק חדש לאחר שנים של שותפות בעייתית עם חור - התנהלות זהירה.",
    nextWeekPriority: "1. דיון בנושא, החלטה אם להתקדם.",
    supportRequired:
      "1. אישור לבחינת התקשרות, כולל העברת שרטוטי מולטי יוניט (ללא תלת מימד).",
  }),
];