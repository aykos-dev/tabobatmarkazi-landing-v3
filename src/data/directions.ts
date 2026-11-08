import type { DirectionId } from "@/data/sections";
import type { Localized } from "@/lib/i18n";

/**
 * Static text for the six directions.
 *
 * SAMPLE CONTENT. The centre has not supplied descriptions, activities or
 * documents for its directions yet. Everything here is written as a sample
 * (`sample: true`), shown on the site with a "Namuna ma'lumot" notice, and must
 * be replaced with text the centre approves. Real content (services, tabibs,
 * Fitobar products, courses) stays in its own data files.
 */

export interface Activity {
  title: Localized<string>;
  text: Localized<string>;
}

export interface DirectionDocument {
  title: Localized<string>;
  /** Law, internal document, draft... */
  kind: Localized<string>;
}

export interface DirectionContent {
  /** One sentence under the heading; also the meta description. */
  lede: Localized<string>;
  intro: Localized<string>;
  activities: Activity[];
  documents?: DirectionDocument[];
  /** True while the text is ours, not the centre's (not shown on the site). */
  sample: boolean;
  /** Plate for the direction: one of our concept renders in /public/images/concept. */
  image: string;
  imageAlt: Localized<string>;
}

const DRAFT: Localized<string> = { uz: "Loyiha", ru: "Проект", en: "Draft" };

export const directionContent: Record<DirectionId, DirectionContent> = {
  standardization: {
    image: "/images/concept/floor-plan.jpg",
    imageAlt: { uz: "Fitobar zonalari tasniflangan reja", ru: "План зонирования фитобара по категориям", en: "A floor plan with the herbal bar divided into zones" },
    // Topics adapted (not translated) from a teaching clinic's public page on
    // treatment methods, intake, hygiene and supervision; still sample text.
    sample: true,
    lede: {
      uz: "Har bir muolaja bir xil xavfsiz tartibda o'tkazilishi uchun usullar tasnifi, qabul va gigiyena standartlari.",
      ru: "Классификация методов, стандарты приёма и гигиены, чтобы каждая процедура проходила по единому безопасному порядку.",
      en: "Classification of methods and standards for intake and hygiene, so every treatment follows the same safe procedure.",
    },
    intro: {
      uz: "Yo'nalish markazdagi har bir muolajaning tartibini belgilaydi: usullar turlarga ajratiladi, bemorni qabul qilish va davolash kursi yagona sxema bo'yicha olib boriladi, gigiyena qoidalari va mutaxassislar darajalari aniq yozib qo'yiladi.",
      ru: "Направление задаёт порядок каждой процедуры в центре: методы делятся на виды, приём пациента и курс лечения ведутся по единой схеме, правила гигиены и уровни специалистов закреплены письменно.",
      en: "This direction sets how every treatment at the centre is carried out: methods are grouped by type, intake and treatment courses follow one scheme, and hygiene rules and practitioner levels are written down.",
    },
    activities: [
      {
        title: { uz: "Muolaja usullari tasnifi", ru: "Классификация методов", en: "Classification of methods" },
        text: {
          uz: "Igna bilan davolash, elektroakupunktura, hijoma, moksa (isitish), quloq nuqtalari terapiyasi va fitoterapiya turlarga ajratiladi; har biri uchun ko'rsatma va qarshi ko'rsatmalar belgilanadi.",
          ru: "Иглотерапия, электроакупунктура, хиджама, мокса (прогревание), аурикулотерапия и фитотерапия разделены по видам; для каждого метода определены показания и противопоказания.",
          en: "Needle therapy, electro-acupuncture, cupping, moxa (warming), ear-point therapy and herbal medicine are grouped by type, each with its indications and contraindications.",
        },
      },
      {
        title: { uz: "Fitoterapiya retseptlari", ru: "Фитотерапевтические рецепты", en: "Herbal prescriptions" },
        text: {
          uz: "Yig'malar o'tkir holatlar uchun qisqa muddatli va surunkali holatlar uchun uzoq muddatli turlarga bo'linadi. Retsept odatda 1–2 haftaga yoziladi, so'ng natija qayta baholanadi.",
          ru: "Сборы делятся на краткосрочные — для острых состояний и длительные — для хронических. Рецепт обычно выписывается на 1–2 недели, затем результат оценивается заново.",
          en: "Blends are split into short-term ones for acute conditions and long-term ones for chronic conditions. A prescription usually covers 1–2 weeks, then the result is reassessed.",
        },
      },
      {
        title: { uz: "Bemorni qabul qilish standarti", ru: "Стандарт приёма пациента", en: "Patient intake standard" },
        text: {
          uz: "Birinchi qabulda umumiy salomatlik tarixi so'raladi: ovqat hazm qilish, uyqu, ayollarda hayz sikli va boshqa tizimlar. Shu asosda shaxsiy davolash rejasi tuziladi.",
          ru: "На первом приёме собирается полная история здоровья: пищеварение, сон, у женщин — менструальный цикл и другие системы. На этой основе составляется индивидуальный план лечения.",
          en: "The first visit records a full health history, including digestion, sleep, the menstrual cycle for women and other body systems. A personal treatment plan is built from it.",
        },
      },
      {
        title: { uz: "Davolash kursi tartibi", ru: "Порядок курса лечения", en: "Treatment course" },
        text: {
          uz: "Odatiy kurs: 4–8 hafta davomida haftada bir muolaja, keyin oraliqlar uzaytiriladi. Natija bir necha muolajadan so'ng baholanadi va reja kerak bo'lsa o'zgartiriladi.",
          ru: "Обычный курс: одна процедура в неделю в течение 4–8 недель, затем интервалы увеличиваются. Результат оценивается после нескольких процедур, при необходимости план меняется.",
          en: "A typical course is one session a week for 4–8 weeks, then sessions are spaced out. Progress is reviewed after a few sessions and the plan is adjusted if needed.",
        },
      },
      {
        title: { uz: "Gigiyena va sterilizatsiya", ru: "Гигиена и стерилизация", en: "Hygiene and sterilisation" },
        text: {
          uz: "Faqat steril, bir martalik ignalar ishlatiladi. Bemor qabul qilishdan oldin har bir mutaxassis igna bilan xavfsiz ishlash kursidan o'tadi.",
          ru: "Используются только стерильные одноразовые иглы. До приёма пациентов каждый специалист проходит курс безопасной работы с иглами.",
          en: "Only sterile, single-use needles are used. Before treating patients, every practitioner completes a course in safe needle handling.",
        },
      },
      {
        title: { uz: "Mutaxassislar darajalari", ru: "Уровни специалистов", en: "Practitioner levels" },
        text: {
          uz: "Uch daraja: rahbar mutaxassis, mustaqil ishlovchi malakali mutaxassis va tajribali mutaxassis nazoratida ishlovchi tinglovchi.",
          ru: "Три уровня: ведущий специалист-наставник, квалифицированный специалист, работающий самостоятельно, и слушатель, работающий под контролем опытного специалиста.",
          en: "Three levels: a supervising senior practitioner, a qualified specialist who treats independently, and a trainee who treats under an experienced practitioner's supervision.",
        },
      },
      {
        title: { uz: "Tibbiy yozuvlar maxfiyligi", ru: "Конфиденциальность записей", en: "Confidential records" },
        text: {
          uz: "Bemor ma'lumotlari himoyalangan elektron kartada saqlanadi va uchinchi shaxslarga faqat bemorning yozma roziligi bilan beriladi.",
          ru: "Данные пациента хранятся в защищённой электронной карте и передаются третьим лицам только с письменного согласия пациента.",
          en: "Patient information is kept in a protected electronic record and shared with third parties only with the patient's written consent.",
        },
      },
    ],
    documents: [
      {
        title: {
          uz: "Xalq tabobati muolaja usullari tasnifi",
          ru: "Классификатор методов народной медицины",
          en: "Classifier of folk-medicine treatment methods",
        },
        kind: DRAFT,
      },
      {
        title: {
          uz: "Bemorni qabul qilish va davolash rejasini tuzish tartibi",
          ru: "Порядок приёма пациента и составления плана лечения",
          en: "Procedure for patient intake and treatment planning",
        },
        kind: DRAFT,
      },
      {
        title: {
          uz: "Igna bilan ishlashda xavfsizlik va sterilizatsiya qoidalari",
          ru: "Правила безопасности и стерилизации при работе с иглами",
          en: "Safety and sterilisation rules for needle work",
        },
        kind: DRAFT,
      },
      {
        title: {
          uz: "Fitoterapiya retseptlarini tuzish va berish tartibi",
          ru: "Порядок составления и выдачи фитотерапевтических рецептов",
          en: "Procedure for writing and dispensing herbal prescriptions",
        },
        kind: DRAFT,
      },
      {
        title: {
          uz: "Bemor ma'lumotlari maxfiyligi to'g'risidagi nizom",
          ru: "Положение о конфиденциальности данных пациентов",
          en: "Regulation on patient data confidentiality",
        },
        kind: DRAFT,
      },
    ],
  },

  research: {
    image: "/images/concept/zone5-manuscripts.jpg",
    imageAlt: { uz: "Sharq tabobati qo'lyozmalari", ru: "Рукописи восточной медицины", en: "Manuscripts of Eastern medicine" },
    sample: true,
    lede: {
      uz: "Xalq tabobatini o'qitish va uning usullarini ilmiy asosda o'rganish.",
      ru: "Обучение народной медицине и научное изучение её методов.",
      en: "Teaching folk medicine and studying its methods scientifically.",
    },
    intro: {
      uz: "Markaz amaliy kurslar orqali mutaxassislar tayyorlaydi va an'anaviy usullarning samaradorligi hamda xavfsizligini o'rganadi. Kurslar narxi va muddati ochiq ko'rsatilgan.",
      ru: "Центр готовит специалистов на практических курсах и изучает эффективность и безопасность традиционных методов. Стоимость и сроки курсов указаны открыто.",
      en: "The centre trains practitioners through hands-on courses and studies how effective and safe traditional methods are. Course prices and durations are listed openly.",
    },
    activities: [
      {
        title: { uz: "Dorivor o'simliklar", ru: "Лекарственные растения", en: "Medicinal plants" },
        text: {
          uz: "Mahalliy dorivor o'simliklarning tarkibi va ta'sirini o'rganish.",
          ru: "Изучение состава и действия местных лекарственных растений.",
          en: "Studying the composition and effects of local medicinal plants.",
        },
      },
      {
        title: { uz: "Usullar samaradorligi", ru: "Эффективность методов", en: "Effectiveness of methods" },
        text: {
          uz: "Hijoma, fitoterapiya va massaj natijalarini kuzatish.",
          ru: "Наблюдение за результатами хиджамы, фитотерапии и массажа.",
          en: "Following the outcomes of hijama, phytotherapy and massage.",
        },
      },
      {
        title: { uz: "Tarixiy meros", ru: "Историческое наследие", en: "Historical heritage" },
        text: {
          uz: "Ibn Sino va Sharq tabobati qo'lyozmalarini o'rganish.",
          ru: "Изучение рукописей Ибн Сины и восточной медицины.",
          en: "Studying the manuscripts of Ibn Sina and Eastern medicine.",
        },
      },
      {
        title: { uz: "Malaka oshirish", ru: "Повышение квалификации", en: "Professional development" },
        text: {
          uz: "Shifokorlar va mutaxassislar uchun qisqa muddatli dasturlar.",
          ru: "Краткосрочные программы для врачей и специалистов.",
          en: "Short programmes for doctors and specialists.",
        },
      },
    ],
  },

  integration: {
    image: "/images/concept/zone1-house.jpg",
    imageAlt: { uz: "Markazning qabul zali", ru: "Приёмный зал центра", en: "The centre's reception hall" },
    sample: true,
    lede: {
      uz: "Xalq tabobati usullarini zamonaviy sog'liqni saqlash tizimi bilan birlashtirish.",
      ru: "Объединение методов народной медицины с современным здравоохранением.",
      en: "Bringing folk-medicine methods together with modern healthcare.",
    },
    intro: {
      uz: "Bemorlar markazda an'anaviy muolajalarni malakali mutaxassislar nazoratida oladi. Xizmatlar narxi oldindan ma'lum, qabulga telefon orqali yoziladi.",
      ru: "Пациенты получают в центре традиционные процедуры под наблюдением квалифицированных специалистов. Цены известны заранее, запись на приём — по телефону.",
      en: "Patients receive traditional treatments at the centre under the care of qualified specialists. Prices are known in advance; visits are booked by phone.",
    },
    activities: [
      {
        title: { uz: "Klinik amaliyot", ru: "Клиническая практика", en: "Clinical practice" },
        text: {
          uz: "An'anaviy muolajalarni tibbiy ko'rik bilan birga o'tkazish.",
          ru: "Традиционные процедуры вместе с медицинским осмотром.",
          en: "Traditional treatments delivered alongside a medical check-up.",
        },
      },
      {
        title: { uz: "Shifokorlar bilan hamkorlik", ru: "Работа с врачами", en: "Working with doctors" },
        text: {
          uz: "Bemorlarni poliklinika va shifoxonalar bilan birgalikda kuzatish.",
          ru: "Совместное ведение пациентов с поликлиниками и больницами.",
          en: "Following patients jointly with clinics and hospitals.",
        },
      },
      {
        title: { uz: "Xavfsizlik nazorati", ru: "Контроль безопасности", en: "Safety oversight" },
        text: {
          uz: "Har bir muolaja uchun ko'rsatma va qarshi ko'rsatmalarni aniqlash.",
          ru: "Показания и противопоказания для каждой процедуры.",
          en: "Indications and contraindications set for every treatment.",
        },
      },
    ],
  },

  biolab: {
    image: "/images/concept/zone2-guest-room.jpg",
    imageAlt: { uz: "Dorivor o'simliklar laboratoriyasi", ru: "Лаборатория лекарственных растений", en: "A laboratory for medicinal plants" },
    sample: true,
    lede: {
      uz: "Dorivor o'simliklar va fitomahsulotlarni laboratoriyada tekshirish va tayyorlash.",
      ru: "Лабораторная проверка и приготовление лекарственных растений и фитопродукции.",
      en: "Testing and preparing medicinal plants and herbal products in the laboratory.",
    },
    intro: {
      uz: "Laboratoriya xomashyo sifatini tekshiradi va Fitobar mahsulotlarini tayyorlashda qatnashadi. Fitobardagi har bir mahsulotning narxi ochiq ko'rsatilgan.",
      ru: "Лаборатория проверяет качество сырья и участвует в приготовлении продукции Фитобара. Цена каждого продукта Фитобара указана открыто.",
      en: "The laboratory checks the quality of raw materials and helps prepare Fitobar's products. Every Fitobar product is listed with its price.",
    },
    activities: [
      {
        title: { uz: "Xomashyo tahlili", ru: "Анализ сырья", en: "Raw-material analysis" },
        text: {
          uz: "Dorivor o'simliklarning tozaligi va namligini tekshirish.",
          ru: "Проверка чистоты и влажности лекарственных растений.",
          en: "Checking medicinal plants for purity and moisture.",
        },
      },
      {
        title: { uz: "Mikrobiologik nazorat", ru: "Микробиологический контроль", en: "Microbiological control" },
        text: {
          uz: "Choylar va yig'malarda mikroblar miqdorini aniqlash.",
          ru: "Определение микробной нагрузки в чаях и сборах.",
          en: "Measuring microbial load in teas and blends.",
        },
      },
      {
        title: { uz: "Ekstraktlar tayyorlash", ru: "Приготовление экстрактов", en: "Preparing extracts" },
        text: {
          uz: "Moylar va damlamalarni nazorat ostida tayyorlash.",
          ru: "Приготовление масел и настоев под контролем.",
          en: "Preparing oils and infusions under controlled conditions.",
        },
      },
      {
        title: { uz: "Mahsulot sinovi", ru: "Испытание продукции", en: "Product testing" },
        text: {
          uz: "Fitobar mahsulotlarini sotuvga chiqarishdan oldin tekshirish.",
          ru: "Проверка продукции Фитобара перед продажей.",
          en: "Checking Fitobar products before they go on sale.",
        },
      },
    ],
  },

  international: {
    image: "/images/concept/pharmacy-interior.jpg",
    imageAlt: { uz: "Mehmonlar uchun ekspozitsiya zali", ru: "Экспозиционный зал для гостей", en: "An exhibition hall for visitors" },
    sample: true,
    lede: {
      uz: "Xalq tabobati bo'yicha xorijiy markazlar bilan hamkorlik va tajriba almashinuvi.",
      ru: "Сотрудничество и обмен опытом с зарубежными центрами народной медицины.",
      en: "Cooperation and exchange of experience with folk-medicine centres abroad.",
    },
    intro: {
      uz: "Yo'nalish markazning xalqaro aloqalarini rivojlantiradi: qo'shma tadqiqotlar, malaka oshirish va xalqaro anjumanlarda ishtirok etish.",
      ru: "Направление развивает международные связи центра: совместные исследования, повышение квалификации и участие в международных конференциях.",
      en: "This direction builds the centre's international ties: joint research, professional development and taking part in international conferences.",
    },
    activities: [
      {
        title: { uz: "Tajriba almashinuvi", ru: "Обмен опытом", en: "Exchange of experience" },
        text: {
          uz: "Xorijiy an'anaviy tibbiyot markazlari mutaxassislari bilan o'zaro tashriflar.",
          ru: "Взаимные визиты специалистов зарубежных центров традиционной медицины.",
          en: "Exchange visits with specialists from traditional-medicine centres abroad.",
        },
      },
      {
        title: { uz: "Qo'shma tadqiqotlar", ru: "Совместные исследования", en: "Joint research" },
        text: {
          uz: "Dorivor o'simliklar bo'yicha hamkorlikdagi ilmiy loyihalar.",
          ru: "Совместные научные проекты по лекарственным растениям.",
          en: "Collaborative research projects on medicinal plants.",
        },
      },
      {
        title: { uz: "Xalqaro anjumanlar", ru: "Международные конференции", en: "International conferences" },
        text: {
          uz: "Xalqaro anjumanlarda ishtirok etish va ularni o'tkazish.",
          ru: "Участие в международных конференциях и их проведение.",
          en: "Taking part in and hosting international conferences.",
        },
      },
      {
        title: { uz: "Xorijlik tinglovchilar", ru: "Иностранные слушатели", en: "International students" },
        text: {
          uz: "Xorijlik tinglovchilar uchun kurslar.",
          ru: "Курсы для иностранных слушателей.",
          en: "Courses for students from abroad.",
        },
      },
    ],
  },

  legal: {
    image: "/images/concept/zone3-office.jpg",
    imageAlt: { uz: "Hujjatlar va o'ramlar qo'yilgan ish stoli", ru: "Рабочий стол с документами и свитками", en: "A desk with documents and scrolls" },
    sample: true,
    lede: {
      uz: "Markaz faoliyatini tartibga soluvchi hujjatlar va ularni ishlab chiqish.",
      ru: "Документы, регулирующие работу центра, и их разработка.",
      en: "The documents that govern the centre's work, and drafting them.",
    },
    intro: {
      uz: "Yo'nalish xalq tabobati sohasidagi qonunchilikni kuzatadi, markazning ichki hujjatlarini tayyorlaydi va yangi me'yoriy hujjatlar loyihalarini ishlab chiqishda qatnashadi.",
      ru: "Направление отслеживает законодательство в сфере народной медицины, готовит внутренние документы центра и участвует в разработке проектов новых нормативных актов.",
      en: "This direction follows legislation on folk medicine, prepares the centre's internal documents and takes part in drafting new regulations.",
    },
    activities: [
      {
        title: { uz: "Qonunchilik monitoringi", ru: "Мониторинг законодательства", en: "Monitoring legislation" },
        text: {
          uz: "Sog'liqni saqlash va xalq tabobati sohasidagi hujjatlarni kuzatish.",
          ru: "Отслеживание документов в сфере здравоохранения и народной медицины.",
          en: "Following documents on healthcare and folk medicine.",
        },
      },
      {
        title: { uz: "Hujjat loyihalari", ru: "Проекты документов", en: "Draft regulations" },
        text: {
          uz: "Yangi me'yoriy hujjatlar loyihalarini tayyorlashda qatnashish.",
          ru: "Участие в подготовке проектов новых нормативных актов.",
          en: "Taking part in preparing new draft regulations.",
        },
      },
      {
        title: { uz: "Huquqiy tushuntirishlar", ru: "Правовые разъяснения", en: "Legal guidance" },
        text: {
          uz: "Amaliyotchilar uchun litsenziyalash va faoliyat tartibi bo'yicha tushuntirishlar.",
          ru: "Разъяснения для специалистов о лицензировании и порядке работы.",
          en: "Guidance for practitioners on licensing and working procedures.",
        },
      },
    ],
    documents: [
      {
        title: {
          uz: "O'zbekiston Respublikasining \"Fuqarolar sog'lig'ini saqlash to'g'risida\"gi Qonuni",
          ru: "Закон Республики Узбекистан «Об охране здоровья граждан»",
          en: "Law of the Republic of Uzbekistan \"On Protection of Citizens' Health\"",
        },
        kind: { uz: "Qonun", ru: "Закон", en: "Law" },
      },
      {
        title: { uz: "Markaz Nizomi", ru: "Устав центра", en: "Charter of the centre" },
        kind: { uz: "Ichki hujjat", ru: "Внутренний документ", en: "Internal document" },
      },
      {
        title: {
          uz: "Xalq tabobati xizmatlarini ko'rsatish tartibi",
          ru: "Порядок оказания услуг народной медицины",
          en: "Procedure for providing folk-medicine services",
        },
        kind: DRAFT,
      },
      {
        title: {
          uz: "Mutaxassislarga qo'yiladigan malaka talablari",
          ru: "Квалификационные требования к специалистам",
          en: "Qualification requirements for specialists",
        },
        kind: DRAFT,
      },
    ],
  },
};
