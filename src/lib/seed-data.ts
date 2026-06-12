import type { Topic } from "./types";

const make = (t: Omit<Topic, "id" | "updatedAt" | "managerComment">): Topic => ({
  managerComment: "",
  ...t,
  id: crypto.randomUUID(),
  updatedAt: new Date().toISOString(),
});

const rawTopics: Topic[] = [
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `שרת ענן`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. תקלת רשת אינטרנט במשרד ביום שלישי הציפה את הסיכון באי זמינות שרת הקבצים המקומי במהלך מבדק
2. המעבר לענן של שרת הפריוריטי שבוצע בתחילת ינואר צמצם את האירוע ומיקד אותו במטה (מקרה דומה מנובמבר 2024 השבית אותנו גלובלית ליומיים)
3. האירוע חידד את הצורך בניהול שוטף של יכולת חיבור VPN למשתמשי הפריוריטי הרלוונטיים, כך שיוכלו לגשת לשרת הענן דרך hotspot `,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. למקרה של אי זמינות קבצים במהלך מבדק עשויות להיות השלכות משמעותיות עד כדי אי מעבר מבדק
2. אי זמינות יוליה להקמת VPN לכלל משתמשי המטה תדרוש טיפול שלי (משימה עתירת זמן עבודה)`,
    nextWeekPriority: `1. השלמת תמחור מעבר כונן QA לשרת ענן
2. מיפוי משימת VPN, בניית תוכנית עבודה להמשך בהתאם לעדיפויות`,
    supportRequired: `1. אישור החלטה למעבר לשרת הענן, עלות צפויה של כ1000-1200 ₪ בחודש`,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `אתר eIFU`,
    status: "blocked",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. הועבר לאחריות יוליה לפני תחילת המלחמה
2. הפרויקט כרגע בהולד עקב היעדרות יוליה`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. היעדרות יוליה + חוסר התלהבות בולט מהעברת הפרויקט לאחריותה
2. ממשיכים לשלם עלויות IFU מודפס בגובה עשרות אלפי ₪ ברבעון`,
    nextWeekPriority: `1. החלטה אם להעביר לביצוע של גורם פנימי אחר / גורם חוץ / עובד  זמני `,
    supportRequired: `1. דיון בנושא + תקצוב`,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `ארונות RFID ארה"ב`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. סטאטוס קודם: התקבלה הצעת מחיר מספק בגרמניה, המוצר שהוצג עונה על הצרכים שלנו, עלויות אחזקה גבוהות (SaaS)
2. התקיים דיון (אצלי במשרד) בשבוע שעבר, יש צורך בבחינת חלופות בארה"ב לפני התקדמות`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. צורך בהגדרת מנהל פרויקט, אם מדובר בפעילות ארה"ב בתמיכת מטה או להיפך`,
    nextWeekPriority: `1. דיון בנושא`,
    supportRequired: `1. החלטה על מנהל פרויקט`,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `eShop ארה"ב`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. הפעילות אינה נתמכת מהמטה מאז תחילת המלחמה
2. עולות בקשות מדי פעם מצד אור, מטופלות רק במקרים דחופים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. פערים מקצועיים בצוות בארה"ב: הבנה טכנית של המערכת, יכולת ניהול פרויקט, טיפול בצד הפריוריטי
2. פעילויות המשך לאחר העליה לאוויר דורשות ניהול (פערים, פיתוחים נוספים)`,
    nextWeekPriority: `1. החלטה האם המטה תומך בפעילויות האתר או שמבוצע ע"י צוות ארה"ב בלבד`,
    supportRequired: ``,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `אינטגרציה Hubspot/Priority`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. התקיימו שתי פגישות השבוע להתנעת הפרויקט ותחילת איפיון הצרכים
2. פתיחת ערוצי תקשורת בין גורמי החוץ השונים של הפרויקט`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. פרויקט מורכב שדורש תשומת לב וירידה לפרטים
2. ע"מ להשלים את הפרויקט בסד זמנים סביר, נדרש מנהל פרויקט`,
    nextWeekPriority: `1. דיון בנושא`,
    supportRequired: `1. החלטה על מנהל פרויקט`,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `צמצום תיבות ג'ימייל`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. נראה שהתוכנה שאישרנו לרכוש מוכיחה את עצמה, גובו עד כה כ100 תיבות המיועדות לסגירה.
2. בהנחה שהגיבוי נעשה בצורה שמאפשרת שליפת נתונים, נוכל להתחיל לסגור תיבות בטווח של שבוע-שבועיים
3. סיכום עם הספק שתשלומים עבור הפעילויות שלו יידחו לאיזור יוני-יולי`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. לפני סגירת תיבות - נדרשת בדיקה שלנו ליכולת לשלוף נתונים ספציפיים בהינתן הצורך
2. גיבוי על כונן חיצוני פיזי, לא משתלם לקחת שרת ענן בשביל הגיבוי (החלפת עלות רישוי תיבות בעלויות ענן)`,
    nextWeekPriority: `1. פגישה עם הספק (שחר), קבלת הכונן שמגבה את  התיבות, דיון באופן גיבוי הכונן`,
    supportRequired: ``,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `אבטחת מידע`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. החלה התקנת EDR על מחשבי החברה
2. הוגדרה רשימה של תיבות מייל שיש לגבות חיצונית`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. המערכת הפנימית שלנו חשופה, התקנת הEDR תיתן מענה טוב
2. מלבד ההגנה, גיבוי המידע שלנו בשרת חיצוני למקרה הצורך
3. לא ברורה רמת ההגנה על הרשתות הפנימיות בחברות הבת`,
    nextWeekPriority: `1. השלמת התקנת EDR על המחשבים במטה
2. מיפוי המחשבים בחו"ל וקבלת החלטה על אופן ההגנה עליהם`,
    supportRequired: ``,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `ניהול מערכות מידע`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. חידוד איפיון הצורך: מנהל שיודע להתמודד עם מגוון אתגרים טכניים המטופלים ע"י אנשי מקצוע שונים, ולא איש טכני עם התמחות ספציפית
2. פגישה עם מועמדת לתפקיד (ליה), בעלת רקע עשיר בהנדסת ייצור ופיתוחי פריוריטי, הגיעה אלינו בהמלצתו של נדב שעבד איתה בעבר
3. יש למועמדת את הפוטנציאל לבצע במקביל את התפקיד של ניהול מערכות המידע (תהיה עקומת למידה) עם התפקיד של מצוינות תפעולית
4. הרקע של המועמדת מצוין עבורנו בכל הנוגע לטיפול בצד של הפריוריטי והתמיכה בייצור, אין לה את הרקע הרלוונטי להרבה מנושאי המחשוב שיש אצלנו, אך התרשמתי שיש לה את היכולת ללמוד אותם בפרק זמן לא ארוך
5. דרישות השכר שלה גבוהות: במקום העבודה הנוכחי שלה היא מקבלת 26 אש"ח, קרן השתלמות, ו-24 ימי חופש, יש ציפייה מהצד שלה לשדרוג כלשהו בתנאים בשלב ראשון, ולשדרוג משמעותי יותר בשלב שני (בהתאם להצלחה בכניסה לתפקיד)`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. סט היכולות והידע שנדרש ע"מ לתמוך את פעילויות המחשוב אצלנו מגדיר סף גבוה למועמדים שממנו נגזרות דרישות שכר שמתקרבות ל30 אש"ח
2. עקב מורכבות התפקיד והיעדר חלק מהידע הרלוונטי - במידה ונקלוט אותה לעבודה, תהיה עקומת למידה לא קצרה (יותר מכמה שבועות) עד כניסה מלאה לתפקיד`,
    nextWeekPriority: `1. קידום הנושא`,
    supportRequired: `1. החלטה אם לאשר את תנאי השכר המבוקשים / הגדרת תקציב למשרה`,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `SAP B1`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. דננג'יי צפוי לסיים את תפקידו בקרוב, הוחלט שלא לגייס מחליף עד להגעת מנהלת התפעול החדשה (סמיתה)
2. דננג'יי קיבל משימה להשלים פעילויות ולהכין תיקי חפיפה עבור הפעילויות הקיימות`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. האטה בתהליכי עבודה עד להגעת מחליף
2. מעבר מידע חלקי, תיקי חפיפה (טובים ככל שיהיו) לא מחליפים חפיפה פרונטלית`,
    nextWeekPriority: `1. המשך מעקב`,
    supportRequired: ``,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `תמיכה / תשתיות`,
    status: "at_risk",
    priority: "medium",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. נפילת רשת האינטרנט ביום שלישי, קו פרשת מים בהתנהלות מול שלושת הגורמים שמטפלים בנושא
2. תקלה מורכבת ברמת תשתית השרת, השלמת הטיפול ביום עבודה כולל פעולה תקנת למניעת הישנות הבעיה בעתיד
3. יכולת מוגבלת לעבוד עם hotspot, זמינה למחשבים ניידים בלבד, עם מגבלות גישה לפריוריטי ושרת קבצים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. שילוב של שני גורמי סיכון מרכזיים: תשתית רעועה שנבנתה כטלאי על טלאי במשך שנים, פיזור האחריות בין גורמי מקצוע שונים שבזמן אמת זורקים אחריות אחד על השני
2. איציק ואריה נמצאים אצלנו הרבה ופועלים בפרופיל גבוה ובתמחור מוגזם, עם זאת נושא השרת ואבטחת הרשת הוא מה שעומד בליבת הסיכון ודורש טיפול בעדיפות גבוהה יותר
3. הטיפול היסודי שנדרש בהבראת התשתית צפוי להיות יקר (לא יודע להעריך מספר), ודורש מבט קדימה על המיקום הפיזי שלנו בכדי להימנע מהוצאות שיילכו לטמיון`,
    nextWeekPriority: `1.  דיון בנושא
2. רכישת מקלטי WiFi למחשבים נייחים שיאפשרו עבודה עם hotspot במקרה של השבתה עתידית`,
    supportRequired: ``,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `פיתוחי פריוריטי`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1.  איפיון ויישום פיתוח פריוריטי להכנת ניירת COC להודו - משימה שבועית של שעתיים-שלוש שתהפוך ל2-3 דקות 
2. מומלץ  לבחון אפשרות לקב"מ In-house במשרה חלקית לצורך קידום פרויקטי פריוריטי `,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. מורגש החוסר בפונקציה שיודעת לתרגם פערים לאפיון ומימוש התייעלויות בעזרת פרוריטי`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `פרויקטים עתידיים`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. מעבר לאופיס 365
2. העברת שרת קבצים לענן
3.. עברת active directory לענן
4. הטמעת AI לייעול פעילויות`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. היעדר קשב ארגוני ליישום הפרויקטים
2. לא נראה שיש היתכנות בטווח הנראה לעין לתחילת הביצוע של הפרויקטים`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `תשתית מצלמות/גלאים`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. הוחלף הגלאי שנתן קריאות שווא במשך תקופה ארוכה
2. תשתית המצלמות נותנת כיסוי חלקי בלבד
3. קבלת הצעת מחיר להחלפת מערך המצלמות, הצעה נוספת תתקבל בשבוע הבא`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. מערך גילוי ובקרה שאינו עושה את עבודתו`,
    nextWeekPriority: `1. קידום הפעילות מול צוות 3 ו-LUMANA`,
    supportRequired: ``,
  }),
  make({
    group: `מחשוב / תשתיות / פרויקטים`,
    topic: `סוקר חברת ביטוח`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. דרישה מצד חברת הביטוח להשלמת הפערים עד ה30.4
2. איריס מרכזת את הנושא עם תמיכה מהצד שלי
3. הפער המרכזי: כספות עבור מחסן ישראל ומוצרים לפני משלוח
4. התקבלו הצעות מחיר מ3 ספקים כספות, נבחר מועמד מוביל שיכול לספק כספות מותאמות בלו"ז מהיר
5. בוצעה בחינת חלופות למיקום מחסן ישראל, המקום המתאים ביותר הוא חדר ביקורת האיכות בקומה 1, שלא דורש התאמות בינוי לצורך יישום מיידי
6. בוצעה בחינת חלופות עם קטיה למיקום חדר ביקורת איכות, האופציה המועדפת היא המשרד של קלרה, אופציה נוספת היא החלל מול המשרד של בועז (במקרה כזה, תנעל הדלת שמובילה למסדרון המרכזי)`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. בהיעדר עמידה בדרישות, חברת הביטוח תתנער מאחריות
2. השקעה לא מתוכננת בגובה עשרות אלפי ש"ח בכספות ומחולל עשן
3. סרבול התהליך התפעולי כנגזרת ממעבר חדר הביקורת לקומה 2 `,
    nextWeekPriority: `1. דיון בנושא
2. בכפוף לאישור: קידום רכש כספות , קידום רכש מחולל עשן, קידום מעבר פיזי של מחסן ישראל`,
    supportRequired: `1. אישור העברת חדר ביקורת לקומה 2, החלטה על מיקום `,
  }),
  make({
    group: `משאבי אנוש`,
    topic: `סטאטוס גיוסים קודמים`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. נדב: גיוס מוצלח (פלנר גלובלי), נכנס היטב לתפקיד
2. סבטלנה (רכש): גיוס מוצלח, נכנסה היטב לתפקיד
3. אלי (מצוינות תפעולית), גיוס לא טוב, התקיים השבוע שימוע, קיבל מכתב סיום העסקה
4. יונתן (משלוחים): התחיל ביום ראשון, מבצע חפיפה עם נדב, נראה שנמצא בכיוון הנכון, מוקדם להעריך סיכויי הצלחה`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. זמן משמעותי מאוד מושקע בגיוס והכשרה`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `משאבי אנוש`,
    topic: `מבנה ארגוני`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. נדב ממשיך בהתקדמות שלו, מתפתח יפה מאוד לכיוון של מנהל שרשראות אספקה שאליו הוא מיועד
2. מנהל באופן מוחלט את תהליך החפיפה של יונתן
3. מקבל בהדרגה את האחריות לניהול של סבטלנה
4. ניצל היטב את הזמן של השבתת האינטרנט לארגון מחדש של המשרד של יונתן/סבטלנה ויזם מפגשי חפיפה עם קטיה ופאבלינה 
5. מביא לידי ביטוי את הניסיון שלו בעבודה בתפ"י שמתבטא בדיוק הולך ומשתפר של בקרה ויישום של תוכניות משלוחים
6. מוריד ממני היקף משמעותי של עומס עבודה, יכול לנהל בפועל את העבודה השוטפת בהיעדרי`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. נראה שהצלחנו בגיוס: המטרה והאתגר תהיה להמשיך בפיתוח שלו, למצות את הפוטנציאל ולמקסם את התרומה שלו לחברה`,
    nextWeekPriority: ``,
    supportRequired: `אישור למסגרת שיפור תנאים מדורגת עבורו:
1. תוספת השכר לפי המופיעה חוזה בהתאם לשביעות רצון שלנו
2. שינוי טייטל מפלנר למנהל שרשרת אספקה
3. חניה בחניון התת קרקעי לפי אותם תנאים של שגיב`,
  }),
  make({
    group: `משאבי אנוש`,
    topic: `סטטאטוס גיוסים חדשים`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. מועמדת לתפקיד מנהלת מערכות מידע (פירוט בסעיף קודם בדו"ח)`,
    currentWeekUpdate: ``,
    risksAndChallenges: ``,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `משאבי אנוש`,
    topic: `סטאטוס עובדים קיימים`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. גיא הגיש מכתב התפטרות, לפי המאוחר מבין 10/5 וסיום המילואים שלו
2. יוליה לא עובדת מתחילת המלחמה, ההודעה על הארכת החל"ת הגיעה אליי בהפתעה במהלך ישיבה מרובת משתתפים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. מידת המוטיבציה של יוליה לעבודה אצלנו מוטלת בספק רב
2. לא מתנהלת כעובדת בצוות שלי, מדווחת בפועל לעדי
3. אין לה תפקיד מתאים במבנה הצוות שמתגבש אצלי
4. עשויה להתאים לתפקיד של אנליסטית, תלוי מאוד במוטיבציה שלה להצליח וברצון/מוכנות שלנו להשקיע`,
    nextWeekPriority: `1. דיון בנושא`,
    supportRequired: `1. תיקוף המצב הקיים, במסגרתו מדווחת לעדי ולא אליי, כך שאינה חלק מצוות התפעול`,
  }),
  make({
    group: `משאבי אנוש`,
    topic: `עובדי ייצור`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. מועמדים למשרות הייצור שמגיעים מלשכת התעסוקה אינם ברמה המספקת, או דורשים שכר גבוה מזה שאנחנו משלמים
2. תעסוקת נוער נותנת מענה זמני במהלך חופשה הפסח`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. צוות הייצור מתוח לקצה`,
    nextWeekPriority: `1. המשך תהליך סינון קו"ח מלשכת העבודה`,
    supportRequired: ``,
  }),
  make({
    group: `משאבי אנוש`,
    topic: `התקשרות עם חברות השמה`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. החלטה לעצור תהליך עם HR home
2. רמת המועמדים המגיעה מלשכת התעסוקה מפתיעה ברמה הגבוהה שלה (בהשוואה למועמדים שהגיעו דרך חברות השמה)`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. בהיעדר חברת השמה, קושי באיתור מועמדים מתאימים`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `משאבי אנוש`,
    topic: `עדכוני שכר`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. עלייה בשכר המינימום מחודש אפריל
2. תוכנית העלאות שכר: עובדות ייצור, פאבלינה, סלבה 
3. העלאות שכר שתוכננו ולא יבוצעו: נתנאל (עזב), יוליה`,
    currentWeekUpdate: ``,
    risksAndChallenges: ``,
    nextWeekPriority: `1. דיון בנושא`,
    supportRequired: `1. אישור עקרוני לעדכון שכר מינימום לעובד בייצור לאחר השלמת 6 חודשים (מ36 ל37)
2. החלטה על מועד עדכוני שכר`,
  }),
  make({
    group: `סטאטוס מחסנים גלובלי`,
    topic: `ארה"ב`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. רמות מלאי סבירות (2-3 חודשי מלאי)
2. חוסרים במידות קצה
3. משלוח ראשון השבוע מישראל במסגרת תוכנית העלאת המלאים `,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. ביקושים לא צפויים
2. פוקוס על גרמניה/הודו מבוצע עם עין פקוחה על רמות המלאי בארה"ב`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `סטאטוס מחסנים גלובלי`,
    topic: `הודו`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `זמינות מלאי
1. התייצבות מסוימת ברמות המלאי, אבל עדיין רחוק מאוד מהנדרש, צמצום של 50% בהיקפי הbackorder
2. חוסר בשתלי high-runner במידות פופולאריות, המלאים שמגיעים נצרכים במיידי
3. האטה בקצב המשלוחים בשבועיים האחרונים עקב חלוקת משאבי ייצור עם העלאת מלאים בגרמניה/ארה"ב, ואובדן ימי עבודה עקב פסח
4. יעד של 3 חודשי מלאי יושג רק לאחר שמכונת המדבקות תיכנס לפעולה
5. עד להשלמת היעד, התכנון מבוצע אחת לשבוע ונותן מענה לשינויים ברזולציה שבועית

משרד
1. בעקבות ביקור ניבו במשרד בשבוע שעבר הוחלט לסיים את העסקתה של סווארנה, פרינקה תמלא את תפקידה
2. מנהלת המשרד החדשה (סמיתה) תגיע באמצע מאי
3. המועמד לתפקיד הQC הסיר מועמדות, ניבו ירחיב את חיפוש המועמדים עם חברת השמה נוספת
4. אושרה החלפה של תשתית המצלמות לIP, בביקור הקרוב שלי במשרד נתקין את מערכת Lumana שתהפוך אותן לחכמות
5. שיתוף הפעולה עם SHEPHA, נכס משמעותי עבורנו - עם זאת, מדובר בחברת ייעוץ, היעדר פונקצית ניהול מרכזית מורגשת היטב`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. יכולת התפוקה שלנו אינה תואמת לקצב הנדרש
2. זמן תגובה מרגע המודעות לחוסר עד להגעה המלאי למשרד עומד על 2-3 שבועות במקרה הטוב
3. אין למשרד במומבאי יכולת לבצע תכנון הזמנות שלוקח בחשבון את יכולת התפוקה, מבוצע אצלנו`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `סטאטוס מחסנים גלובלי`,
    topic: `גרמניה`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. הגעת משלוח NG של מוצרי high-runner בכמויות גדולות בהתאם לפידבק מאלנה
2. קידום תוכנית עבודה לייצור שתלי NG
3. ממשיכים בתוכנית העבודה להרמת רמות מלאי NG, ייקח עוד כרבעון עד להשלמת הפרויקט
4. הזמנות שוטפות מנוהלות בציר נדב/מירון, פרויקט ramp-up מנוהל אצלי`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. מורכבות תפעולית של שילוב הNM/NG, הוחלט להתמקד בNG בלבד
2. בניית מלאי של קו מוצרים שלם של NG תקח זמן, המיקוד יהיה במוצרי high-runner  (סוכם על מוצרים בעדיפות ראשונה)`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `סטאטוס מחסנים גלובלי`,
    topic: `איטליה`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. התייצבות ברמות המלאי בהתאם לתוכנית עבודה ממוקדת
2. ערוץ התקשורת בין ג'וליה לנדב מוכיח את עצמו, שיפור משמעותי לעומת קצרי התקשורת מהם סבלנו מוקדם יותר השנה
3. נדרשת פעילות של הצוות המקומי "להכשרת: מוצרי NG, כך שיוכלו למשוך מוצרים ממלאי גרמניה`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. בהינתן "שמיכה קצרה" וסדר העדיפויות באספקות, המחסן ברומא עשוי להיקלע לחוסרים`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `סטאטוס מחסנים גלובלי`,
    topic: `אנגליה`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. ערוץ התקשורת בין קרול לנדב עובד היטב
2. המשלוחים למחסן נעשים לפי צורך, לרוב מדובר בהזמנות קטנות`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. תלות בעובדת מחסן יחידה, כשהיא בחופש העבודה פחות מסודרת`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `סטאטוס מחסנים גלובלי`,
    topic: `ספירות מלאי`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. נסיעה למחסן בהודו נדחתה עקב המלחמה, לא בוצעה ספירת מלאי בסוף השנה 
2. הניסיון לנהל מרחוק של ספירת המלאי בגרמניה לא הצליח, קושי משמעותי בטיפול בפערים ללא נוכחות פיזית במקום`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. נדרשת הגעה לשני המחסנים להשלמת הספירות, מומלץ לצרף את נדב לשתי הנסיעות`,
    nextWeekPriority: `1. דיון בנושא והחלטה על מועדים נסיעות`,
    supportRequired: `1. דיון בנושא וקבלת החלטה`,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `בוריס`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: ``,
    currentWeekUpdate: ``,
    risksAndChallenges: ``,
    nextWeekPriority: `1. דיון בנושא לו"ז רגולציה
2. קידום תהליך תמחור מוצרים מול DAND`,
    supportRequired: `1. דיון בנושא וקבלת החלטה`,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `מכונת מדבקות`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. המדפסת הגיעה לספק, ונמצאת בתהליך אינטגרציה
2. משה ודניאל מקדמים הכנות לבדיקת המכונה
3. הספק אישר עקרונית את הרעיון שהוצע לו להגעה להתקנה והדרכה בישראל
4. משה מסתייג ממשלוח המכונה ללא בדיקה לפני המשלוח, אני נוטה להסכים איתו שמדובר בסיכון (מכיוון שמדובר במכונה מותאמת), ושעדיף לשלוח עובד אחד מטעמנו לאישור לפני משלוח
5. בתחילת מאי חל חג הפועלים בסין, כשבוע חופש, ואחריו הספק נוסע לתערוכת Interpack בגרמניה לשבוע נוסף
6. בהתאם לנ"ל, במידה והמכונה לא תאושר לפני סוף החודש, הלו"ז יתעכב בשבועיים נוספים
7. עלות משלוח אווירי לארץ עומדת על כ12,000$, זמן משלוח של כ10 ימים
8. עלות משלוח ימי לארץ עומדת על כ2000$, זמן משלוח של כ3 חודשים 
9. עלויות משלוח אווירי מושפעות מאוד מהיעדר הטיסות של החברות הזרות לישראל`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. לו"ז גבולי עשוי להביא לדחיה נוספת
2. סיכון באישור משלוח המכונה ללא בדיקה 
3. עלויות משלוח גבוהות
4. גם אם המכונה תהיה מוכנה לאישור בעוד שבוע, סימן שאלה בנוגע למי יכול לנסוע לאשר: אני לא זמין (חפיפה עם תאריכי חופשה), דניאל חסר ניסיון, משה הוא משה`,
    nextWeekPriority: `1. החלטה על אופן אישור המכונה
2. תזמון מועד נסיעה
3. החלטה מי נוסע`,
    supportRequired: `1. דיון בנושא וקבלת החלטה`,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `משלוחים ללקוחות`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. היקפי ייצור משמעותיים מאוד מאז החזרה לשגרה
2. הניסיון של נדב בתפ"י עוזר במיקוד הייצור וההיצמדות לתוכניות משלוחים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. תפוקה מופחתת באפריל עקב החגים
2. השלכות המלחמה על נוכחות עובדים
3. הצוות מתוח לקצה, לא עומדים בקצב הנדרש`,
    nextWeekPriority: `1. משלוח להודו ביום ראשון
2. מיקוד באיטליה/גרמניה עבור משלוחים לפני החג
3. משלוחי קטן לקולומביה`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `מערכת אנודייז`,
    status: "at_risk",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1.ההזמנה אושר, התקבלה חשבונית לתשלום מקדמה ע"ס 50%
2. המערכת תהיה מוכנה למשלוח בעוד כ4 חודשים
3. סוכם עם קטיה שאנה תוביל את הטיפול בהיתר הרעלים בליווי שלי ושל ושל קטיה
4. היועץ שלקחנו מעריך שהיתר הרעלים יתקבל ושמדובר בתהליך פרוצדורלי בלבד
5. במקרה שלא נקבל את האישור, נמקם את המערכת בDAND (סוכם ברמת העקרון עם יוסי)`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. סיכון מרכזי: אי קבלת היתר רעלים (תוכנית גיבוי: DAND)
2. חוסר זמינות שלי לטיפול בנושא היתר הרעלים / תיק מפעל`,
    nextWeekPriority: `1. העברת התשלום לספק
2. ישיבת kick-off עם אנה וקטיה, ותחילת עבודה על היתר הרעלים`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `פסיבציה In-house`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. התקיים דיון על מבנה התהליכים ועצי המוצר בפריוריטי לצורך תמיכה במתקן
2. סוכם על תהליך עבודה ביחד עם קטיה, פאבלינה ונדב
3. סוכם על יציאה לפיילוט של שלושה סוגי מוצרים לצורך בחינה בשטח של התהליך שעליו סוכם
4. בניית התהליך בוצעה בהתאם לראייה קדימה על השפעות כניסת מכונת המדבקות על מבנה עץ המוצר וניתוב תהליכי הייצור
5. בוצע עדכון בפריוריטי בהתאם לסיכומים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. העדכונים בפריוריטי בוצעו על ידי, המומחיות בנושא היא של יוליה, ייתכן ויעלו פערים שיעכבו את התהליך
`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `חוסרים/עיכובים במוצרים`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. קופסת תצוגה שחורה (NM-X2010), נדרש עדכון נוסף של קבצי הייצור (חירור, גרפיקה), עיכוב של 1-2 שבועות נוספים בתהליך
2. מקדחי ערכת פרימיום הגיעו, ניתן להרכיב ערכות
3. עיכוב בייצור אחד ממפתחות ערכת האיזיגייד + צריכה מוגברת בערכות עבור הקורס בהודו מביאים לעיכוב של כשבועיים באספקת ערכות
4. חוסר במקדחי יהלום, בתהליך ייצור בשטראוס, צפויים להתקבל במהלך השבועות הקרובים, משפיעים על זמינות ערכות זיגומה
5. נדרשת עליה בקצב אספקות שתלי Tuff בקוטר 4.2 מ"מ, יטופל מול DAND`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. עיכובים וחוסרים באספקות של הפריטים`,
    nextWeekPriority: `1. המשך קידום הטיפול בכלל הנושאים`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ייצור אצל XLH (סין)`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. התקבל משלוח ראשון של הזמנה סדרתית, חסכון משמעותי בעלויות
2. המשלוח נפסל בביקורת הקבלה עקב בעיות בניקיון החלקים
3. הפער תוקשר ליצרן, לקח אחריות והתחייב לשלוח מוצרים חדשים על חשבונו
4. הרחבת הפעילות תתבצע בכפוף לאישור החלקים שיתקבלו, ובזהירות הנדרשת בהתאם למאפייני העבודה עם ספקים סיניים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. פערי איכות/חו"ג יצרנים סיניים`,
    nextWeekPriority: `1. מעקב אחר אספקת מנת מוצרים חדשים
2. בחינת אפשרות להחזרת החלקים הפסולים לצורך ביצוע ניקיון`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ייצור אצל Hongzhun (סין)`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. ביקור אצל הספק בסין, מפעל ברמה גבוהה
2. תחילת תהליך לבדיקת היתכנות לייצור עצמאי של קופסאות קיטים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. פערי איכות/חו"ג יצרנים סיניים`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ייצור אצל פרסיבר`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. הוחלט להוציא הזמנה לברגים, תיושם כחלק מתוכנית הרכש לחודש אפריל שמתוכננת לשבוע הבא
2. קבלת משלוח ראשון של אנלוגים דיגיטליים, רמת איכות גבוהה, הוזלה של מעל 60% בעלות הייצור`,
    currentWeekUpdate: ``,
    risksAndChallenges: ``,
    nextWeekPriority: `1. הוצאת הזמנה לברגים`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ייצור אצל ע.ל.נ`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. צפי לחזרה לשגרה השבוע בהתאם להפסקת האש בצפון
2. מולטי יוניט 30: הזמין חלק נוסף הנדרש לייצור, ייקח עוד מספר ימים עד קבלת דוגמאות`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. מפעל ברמה פחות גבוהה מDAND ומיקרומיל
2. לא ברורה היכולת בייצור חלקים מסובכים, חובת ההוכחה עליו`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `הסמכת DAND כיצרן חדר נקי`,
    status: "at_risk",
    priority: "medium",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. הושלמו מנות הייצור בחדר הנקי הנדרשות לצורך הבדיקות
2. המשך הטיפול מבוצע בצד הרגולציה/איכות (קטיה מובילה)`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. מתן מענה לסיכון משמעותי בהיבט הגיאו פוליטי: במקרה של השבתה של החדר הנקי שלנו עקב פגיעה פיזית במתקן הייצור, יכולת הייצור שלנו תיעצר לחודשים
2. הציר הקריטי בפרויקט הוא ביצוע בדיקות ואישור הרשויות המתאימות על האתר המשני, קבועי זמן של חודשים מתחילת תהליך`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ביצוע אריזה אצל קונפידנט למוצרי נוריס`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. התקיימו שתי פגישות עם חברת הרגולציה (NKG)
2. התקבלה רשימה של הפעולות הנדרשות לקבלת רישיון ייצור מקומי של מוצרי נוריס
3. המשמעות המעשית: אין הצדקה לביצוע מוצרים סטריליים
4. התהליך יתמקד בעדכון הרישיון למוצרים לא סטריליים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. משך הזמן לקבלת הרישיון עשוי להיות ארוך
2. הפעילות תדרוש משאבים משמעותיים של זמן וכסף
3. נדרש להגדיר את מסלול החיוב שייושם בסיום התהליך, כיצד יבוצע חיוב מנוריס ישראל להודו שיאפשר העברת כסף לישראל
4. ייתכן שהפתרון הפיננסי לסעיף 2 יאפשר יישום בטווח קצר יותר של העברת המוצרים במחיר מופחת, עוד לפני בניית התהליך החדש`,
    nextWeekPriority: `1. קידום הנושא ביחד עם קטיה ושקד`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `העברת ייצור מקדחים לFFDM`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. הזמנו דוגמאות של 50+ סוגי מקדחים מFFDM
2. הדוגמאות שמתקבלות ברמה טובה מאוד, מחיר זול בכ20% ממחירי כרמקס (תלוי שער יורו), למעט מקדחי ערכות פרימיום (מוצרי מדף של כרמקס)
3. משלוח נוסף של דוגמאות צפוי להתקבל בתחילת חודש מאי, אחריו נעבור לייצור סדרתי אצל FFDM, הזמנות מסגרת של שנתיים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. מוצרים עם זמן אספקה ארוך, אתגר תפעולי בתזמון ההזמנות באופן שלא יפגע באספקות
2. העברת הזמנות מסגרת לשנתיים מביאה איתה התחייבות של 300-400 אלף יורו
3. עבור ערכות איזיגייד: אפשר להבחין בהבדל בצבע בין מקדחי כרמקס לFFDM, כך שצריך להרכיב ערכות חדשות עם מקדחים שמגיעים מאותה חברה. האילוץ צפוי לייצר מלאי עודף של מקדחי כרמקס שלא ניתן יהיה להשמיש לערכות מכירה (כמה מאות מקדחים)
4. הוצאת היקף עבודה משמעותי מכרמקס צפוי להשפיע על היחסים`,
    nextWeekPriority: `1. המשך קידום תהליך מול FFDM`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `יצרן חדש - קוסטה`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. קוסטה הוא השותף לשעבר של ניקולא חורי, במסגרת השותפות שלהם הוא זה שהביא את הידע הטכני ובעוד ניקולא התמקד בצד המסחרי/שיווקי
2. לאחר הפרידה ביניהם הקים מפעל קטן במעיליא, מייצר עבור תעשיה בטחונית, מעוניין להרחיב פעילות לתחום הדנטלי
3. קטיה ושמעון ביקרו אצלו במפעל והתרשמו לטובה
4. הוא הגיע אלינו השבוע לביקור, התרשמתי שמדובר באדם שאפשר לעבוד איתו (בניגוד לחורי)
5. הוא נתן הערכה ראשונה של עלויות חלקים, ע"ב ההיכרות שלו עם תהליכי ייצור חלקים זוויתיים (בדגש על מולטי יוניט), זול יותר מDAND
6. לאחר הביקור חתם על NDA`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. ספק חדש שמגיע אחרי שנים של שותפות בעייתית עם חורי, ההתנהלות מולו צריכה להיות זהירה.`,
    nextWeekPriority: `1. דיון בנושא, החלטה אם להתקדם`,
    supportRequired: `1. אישור לבחינת ההתקשרות מולו, כולל העברת שרטוטי מולטי יוניט (ללא מודלי תלת מימד)`,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ציוד לקורסים`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. דרישה מוגברת לציוד לקורסים (ערכות, שתלי dummy)
2. חידוש ערכות ארה"ב מתעכב עקב אי זמינות מקדחי יהלום`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. אתגר ברמת שרשרת האספקה  (חיזוי ביקושים, זמינות צוות ייצור)`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ביצוע אריזה בארה"ב`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. התנעה ראשונה של הפעילות
2. הגדרה כללית של דרישות`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. בניתוח לא מעמיק של הנתונים, ספק לכדאיות הכלכלית של המהלך
2. הפעילות תדרוש משאבים משמעותיים של זמן וכסף`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `חדר נקי סלובקיה`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. פגישת זום עם פאבל מהחברה בסלובקיה (Sky Medical)
2. סוכם שסמכות שיפוט לא תהיה בעיה, יחתמו על הNDA שלנו`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. הקמת אתר ייצור בחו"ל, תדרוש משאבי זמן משמעותיים, בעיקר מצוות הרגולציה
2. הקמת הקו לאו דווקא תחסוך בעלויות - הערך שלו הוא בmade in Europe ובגיבוי קו הייצור בישראל`,
    nextWeekPriority: `1. החתמת NDA
2. בניית תוכנית משוערת של היקפי ייצור שנתיים לצורך תמחור הפעילות
3. תיאום ביקור אצל הספק`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `איתור יצרנים מזרח אירופה`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. התשובה מפרסיבר על המולטי יוניט מאיצה את הצורך בקידום חלופות ייצור נוספות בחו"ל`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. השקעה משמעותית של משאבי זמן לצורך קידום התהליך`,
    nextWeekPriority: `1. מציאת תערוכות מתאימות, עדיפות לרבעון ראשון 2026`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ייצור חלקים בתבניות`,
    status: "on_track",
    priority: "medium",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. ייצור התבניות אצל הספק הסיני לא הצליח
2. המתווך הישראלי (IG) מציע להעביר את התבניות לספק אחר על חשבונו או להחזיר לנו את המקדמה ששולמה
3. במקרה של שינוי אריזת השתל, יתייתר הצורך באחת התבניות (עדיין יש ROI, אבל פחות חד משמעי)
4. ישנה אפשרות לייצר אצל יצרן תבניות שאיתו עבדתי בעבר, הפעילות אינה מתקדמת`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. משך הפעילות - הבדל מחיר של 90% בין עלות ייצור CNC לעומת תבנית
2. נדרש פוקוס מצידינו לקידום התהליך, מומלץ להעביר לאחריות מחלקת ההנדסה בתמיכה שלי בצד המסחרי מול הספק`,
    nextWeekPriority: `1. המשך מעקב`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `רוזן דרייבר`,
    status: "at_risk",
    priority: "high",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. תקשורת רציפה מול הספק, מתקדם עם הייצור
2. נדרש ביקור אצל הספק כדי להבין יכולות ובחינת אפשרות להרחבת פעילות`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. פערי איכות, הייצור הראשון אצל הספק הקודם לווה בקשיים משמעותיים`,
    nextWeekPriority: `1. המשך מעקב`,
    supportRequired: `1. דיון בנושא, החלטה אם יש הצדקה לנסיעה`,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `מחסן 3PL ברזיל`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. התקבלה החלטה לקדם הסכם עם המחסן בברזיל לשנה
2. התהליך מול המחסן בברזיל מתנהל לאט, נדרשת יותר זמינות שלי לטיפול בנושא`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. הקמת מחסן ראשון מסוגו עבורנו, פעילות תפעולית שתדרוש מאמץ עד לייצוב`,
    nextWeekPriority: `1. קידום הנושא מול המחסן בברזיל`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `חלקים לבדיקות פיתוח`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. התקבלו שתלי זיגומה צרה לבדיקות
2. הושלם ייצור מולטי יוניט גבוה קוני (יסופק בשבוע הבא)
3. יצאו הזמנות לחלקי CAD/CAM חדשים`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. אספקת מוצרים לבדיקות בלו"ז קצר הם אתגר מובנה ומתמשך`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `בקרת איכות סין`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. ספק ישראלי עבור ביצוע בקרת איכות ליצרנים בסין`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. במידה ונעמיק התקשרות עם יצרנים בסין, נצטרך לקחת בחשבון את העלויות הנלוות של בדיקות איכות של צד שלישי`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ספקים נוספים לייצור CAD/CAM`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: false,
    reviewed: false,
    previousWeekUpdate: `1. החלקים שיותרו בלעדית ע"י מיקרומיל הועברו לע.ל.נ לצורך הוכחת יכולת ייצור`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. צורך בניתוק התלות במיקורמיל, שיודעים לייצר  את החלקים במחיר נמוך למתחרים`,
    nextWeekPriority: `1. המשך מעקב`,
    supportRequired: ``,
  }),
  make({
    group: `שרשרת אספקה / ספקים / ייצור`,
    topic: `ביצוע אריזה אצל קב"מ בארץ`,
    status: "on_track",
    priority: "low",
    changedSincePrevious: true,
    reviewed: false,
    previousWeekUpdate: `1. בוצע פיילוט
2. הוחלט על הקפאת הפעילות עקב אי הצלחת הפיילוט
3. ייבחן מחדש בהמשך השנה כאשר ניתן יהיה להגיע לביקורת שוטפת במפעל`,
    currentWeekUpdate: ``,
    risksAndChallenges: `1. אין לנו כרגע חלופות ייצור מלבד הצוות שלנו`,
    nextWeekPriority: ``,
    supportRequired: ``,
  }),
];

export const SEED_TOPICS: Topic[] = rawTopics;
