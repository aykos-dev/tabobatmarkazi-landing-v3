import type { Localized } from "@/lib/i18n";

export interface NewsArticle {
  slug: string;
  image: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: Localized<string>;
  description: Localized<string>;
  /** Full article body as an array of paragraphs. */
  body: Localized<string[]>;
}

export const news: NewsArticle[] = [
  {
    slug: "tabobat-markazi-ochilishi",
    image: "/images/concept/cover-bg.jpg",
    date: "2026-06-15",
    title: {
      uz: "Tabobat markazi Toshkentda o'z eshiklarini ochdi",
      ru: "Центр табабата открыл свои двери в Ташкенте",
      en: "The Tabobat centre opens its doors in Tashkent",
    },
    description: {
      uz: "Sharq tibbiyoti an'analarini zamonaviy makon bilan uyg'unlashtirgan yangi markaz tashrif buyuruvchilar uchun ochildi. Bu yerda muzey, dorixona va tabiblar konsultatsiyasi bir joyda jamlangan.",
      ru: "Новый центр, объединивший традиции восточной медицины с современным пространством, открылся для посетителей. Здесь под одной крышей музей, аптека и консультации табибов.",
      en: "A new centre uniting the traditions of Eastern medicine with a modern space has opened to visitors, bringing a museum, pharmacy and healer consultations under one roof.",
    },
    body: {
      uz: [
        "Toshkent markazida Sharq tibbiyoti an'analarini zamonaviy xizmatlar bilan uyg'unlashtirgan yangi tabobat markazi ochildi.",
        "Markaz tashrif buyuruvchilarga muzey ekspozitsiyasi, tabiiy mahsulotlar dorixonasi hamda malakali tabiblar konsultatsiyasini taklif etadi.",
        "Ochilish marosimida mintaqaning yetakchi mutaxassislari ishtirok etdi va markazning kelgusidagi rejalari taqdim etildi.",
      ],
      ru: [
        "В центре Ташкента открылся новый центр табабата, объединивший традиции восточной медицины с современными услугами.",
        "Центр предлагает посетителям музейную экспозицию, аптеку натуральных продуктов и консультации квалифицированных табибов.",
        "На церемонии открытия приняли участие ведущие специалисты региона и были представлены планы развития центра.",
      ],
      en: [
        "A new Tabobat centre uniting the traditions of Eastern medicine with modern services has opened in the heart of Tashkent.",
        "The centre offers visitors a museum exhibition, a pharmacy of natural products and consultations with qualified healers.",
        "The opening ceremony was attended by leading regional specialists, and the centre's future plans were presented.",
      ],
    },
  },
  {
    slug: "yangi-fitobar",
    image: "/images/concept/section3-teas.jpg",
    date: "2026-06-28",
    title: {
      uz: "Fitobar: dorivor choylar va sog'lomlashtiruvchi ichimliklar",
      ru: "Фитобар: лечебные чаи и оздоровительные напитки",
      en: "The Phytobar: medicinal teas and wellness drinks",
    },
    description: {
      uz: "Markazda yangi fitobar ish boshladi. Bu yerda O'zbekiston dorivor o'tlaridan tayyorlangan original choy to'plamlari va sog'lomlashtiruvchi ichimliklardan bahramand bo'lishingiz mumkin.",
      ru: "В центре начал работу новый фитобар. Здесь вы можете насладиться авторскими чайными сборами из узбекских трав и оздоровительными напитками.",
      en: "A new phytobar has opened at the centre, where you can enjoy signature tea blends made from Uzbek herbs and wellness drinks.",
    },
    body: {
      uz: [
        "Markazning birinchi qavatida yangi fitobar tashrif buyuruvchilar uchun ochildi.",
        "Menyuda O'zbekiston dorivor o'tlaridan tayyorlangan choy to'plamlari, asal va tabiiy qo'shimchalarga ega ichimliklar mavjud.",
        "Har bir ichimlik retsepti an'anaviy tabobat qoidalari asosida ishlab chiqilgan.",
      ],
      ru: [
        "На первом этаже центра открылся новый фитобар для посетителей.",
        "В меню — чайные сборы из узбекских лекарственных трав, напитки с мёдом и натуральными добавками.",
        "Рецепт каждого напитка разработан на основе традиционных принципов табабата.",
      ],
      en: [
        "A new phytobar has opened for visitors on the ground floor of the centre.",
        "The menu features tea blends from Uzbek medicinal herbs and drinks with honey and natural supplements.",
        "Each drink recipe is developed on the basis of traditional Tabobat principles.",
      ],
    },
  },
  {
    slug: "talim-dasturlari",
    image: "/images/concept/zone5-manuscripts.jpg",
    date: "2026-07-10",
    title: {
      uz: "Sharq tabobati bo'yicha ta'lim dasturlari boshlanadi",
      ru: "Стартуют образовательные программы по восточной медицине",
      en: "Educational programmes in Eastern medicine begin",
    },
    description: {
      uz: "Markaz Sharq tabobati asoslari bo'yicha kurslar va ustaxona mashg'ulotlarini e'lon qiladi. Dasturlar boshlang'ich va malakali ishtirokchilar uchun mo'ljallangan.",
      ru: "Центр объявляет о курсах и мастер-классах по основам восточной медицины. Программы рассчитаны на начинающих и продвинутых участников.",
      en: "The centre announces courses and workshops on the fundamentals of Eastern medicine, designed for both beginners and advanced participants.",
    },
    body: {
      uz: [
        "Markaz Sharq tabobati asoslari bo'yicha yangi ta'lim dasturlarini ishga tushirmoqda.",
        "Kurslar fitoterapiya, hijoma va dorivor o'simliklar bilan ishlash asoslarini qamrab oladi.",
        "Mashg'ulotlarni sohaning tajribali tabiblari va mutaxassislari olib boradi.",
      ],
      ru: [
        "Центр запускает новые образовательные программы по основам восточной медицины.",
        "Курсы охватывают основы фитотерапии, хиджамы и работы с лекарственными растениями.",
        "Занятия проводят опытные табибы и специалисты отрасли.",
      ],
      en: [
        "The centre is launching new educational programmes on the fundamentals of Eastern medicine.",
        "The courses cover the basics of phytotherapy, cupping and working with medicinal plants.",
        "Classes are led by experienced healers and specialists in the field.",
      ],
    },
  },
];

/** Newest first. */
export function latestNews(): NewsArticle[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): NewsArticle | undefined {
  return news.find((item) => item.slug === slug);
}
