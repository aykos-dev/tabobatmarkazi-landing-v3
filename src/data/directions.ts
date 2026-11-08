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
  /** True while the text is ours, not the centre's. */
  sample: boolean;
}

const DRAFT: Localized<string> = { uz: "Loyiha", ru: "Проект", en: "Draft" };

export const directionContent: Record<DirectionId, DirectionContent> = {
  standardization: {
    sample: true,
    lede: {
      uz: "Xalq tabobati usullari, dorivor o'simlik xomashyosi va fitomahsulotlar uchun yagona talablar va tasnif.",
      ru: "Единые требования и классификация для методов народной медицины, лекарственного сырья и фитопродукции.",
      en: "Common requirements and classification for folk-medicine methods, medicinal plant materials and herbal products.",
    },
    intro: {
      uz: "Yo'nalish xalq tabobati amaliyotini tartibga solish uchun asos yaratadi: usullar va mahsulotlar tasniflanadi, sifat talablari ishlab chiqiladi, amaliyotchilar uchun yagona atamalar belgilanadi.",
      ru: "Направление создаёт основу для упорядочения практики народной медицины: методы и продукция классифицируются, разрабатываются требования к качеству, для специалистов закрепляется единая терминология.",
      en: "This direction lays the groundwork for regulating folk-medicine practice: methods and products are classified, quality requirements are developed, and practitioners share one set of terms.",
    },
    activities: [
      {
        title: { uz: "Usullar tasnifi", ru: "Классификация методов", en: "Classification of methods" },
        text: {
          uz: "Xalq tabobati usullarini qo'llanilishi va xavfsizligi bo'yicha guruhlash.",
          ru: "Группировка методов народной медицины по применению и безопасности.",
          en: "Grouping folk-medicine methods by their use and safety.",
        },
      },
      {
        title: { uz: "Dorivor xomashyo standartlari", ru: "Стандарты лекарственного сырья", en: "Raw-material standards" },
        text: {
          uz: "Dorivor o'simliklarni yig'ish, quritish va saqlash talablari.",
          ru: "Требования к сбору, сушке и хранению лекарственных растений.",
          en: "Requirements for harvesting, drying and storing medicinal plants.",
        },
      },
      {
        title: { uz: "Fitomahsulotlar sifati", ru: "Качество фитопродукции", en: "Herbal product quality" },
        text: {
          uz: "Choylar, yig'malar va moylar uchun sifat ko'rsatkichlari.",
          ru: "Показатели качества для чаёв, сборов и масел.",
          en: "Quality indicators for teas, blends and oils.",
        },
      },
      {
        title: { uz: "Atamalar lug'ati", ru: "Терминологический словарь", en: "Glossary of terms" },
        text: {
          uz: "Xalq tabobati atamalarining o'zbek, rus va ingliz tillaridagi yagona lug'ati.",
          ru: "Единый словарь терминов народной медицины на узбекском, русском и английском.",
          en: "One glossary of folk-medicine terms in Uzbek, Russian and English.",
        },
      },
    ],
    documents: [
      {
        title: {
          uz: "Xalq tabobati usullari tasnifi",
          ru: "Классификатор методов народной медицины",
          en: "Classifier of folk-medicine methods",
        },
        kind: DRAFT,
      },
      {
        title: {
          uz: "Dorivor o'simlik xomashyosiga umumiy talablar",
          ru: "Общие требования к лекарственному растительному сырью",
          en: "General requirements for medicinal plant materials",
        },
        kind: DRAFT,
      },
      {
        title: {
          uz: "Fitochoylar va yig'malar: sifat ko'rsatkichlari",
          ru: "Фиточаи и сборы: показатели качества",
          en: "Herbal teas and blends: quality indicators",
        },
        kind: DRAFT,
      },
    ],
  },

  research: {
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
          uz: "Shifokorlar va tabiblar uchun qisqa muddatli dasturlar.",
          ru: "Краткосрочные программы для врачей и табибов.",
          en: "Short programmes for doctors and tabibs.",
        },
      },
    ],
  },

  integration: {
    sample: true,
    lede: {
      uz: "Xalq tabobati usullarini zamonaviy sog'liqni saqlash tizimi bilan birlashtirish.",
      ru: "Объединение методов народной медицины с современным здравоохранением.",
      en: "Bringing folk-medicine methods together with modern healthcare.",
    },
    intro: {
      uz: "Bemorlar markazda an'anaviy muolajalarni malakali tabiblar nazoratida oladi. Xizmatlar narxi oldindan ma'lum, qabulga telefon orqali yoziladi.",
      ru: "Пациенты получают в центре традиционные процедуры под наблюдением квалифицированных табибов. Цены известны заранее, запись на приём — по телефону.",
      en: "Patients receive traditional treatments at the centre under the care of qualified tabibs. Prices are known in advance; visits are booked by phone.",
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
          uz: "Tabiblarga qo'yiladigan malaka talablari",
          ru: "Квалификационные требования к табибам",
          en: "Qualification requirements for tabibs",
        },
        kind: DRAFT,
      },
    ],
  },
};
