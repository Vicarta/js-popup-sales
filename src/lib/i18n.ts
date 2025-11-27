export type Language = "en" | "uk";

export const translations = {
  en: {
    nav: {
      howItWorks: "How it works",
      pricing: "Pricing",
      aboutUs: "About Us",
      support: "Support",
      login: "Login",
      findLeads: "Find Missed Leads",
    },
    hero: {
      headline: "Leads in spam, unanswered inquiries — lost sales. Let's fix all.",
      subheadline: "AI that rescues leads you missed in your Spam and Inbox.",
      cta: "Start Free Audit",
    },
    auditSection: {
      title: "Find Missed Leads Now (Step by Step)",
    },
    wizard: {
      step1Title: "What's your average deal value?",
      step1Placeholder: "Enter approximate amount in USD",
      step2Title: "Connect Your Inbox",
      step2Warning: "Never enter your original email password! Always create an application password!",
      step2EmailLabel: "Your email",
      step2EmailPlaceholder: "your.email@example.com",
      step2PasswordLabel: "Application password",
      step2PasswordPlaceholder: "Enter application password",
      step2Gmail: "How to create",
      step2Outlook: "How to create",
      step2Yahoo: "How to create",
      step2Hotmail: "How to create",
      step2AOL: "How to create",
      step2Other: "Other provider",
      step3Title: "Scanning Your Email",
      step3Scanning: "Scanning your spam and inbox for missed leads...",
      step3SeeResults: "See the results",
      step4Title: "Audit Results",
      step4Scanned: "Scanned 1543 emails",
      step4Found: "Potential leads found",
      step4Loss: "Estimated missed revenue",
      step4EmailPreview: "Email Preview",
      step4EmailFrom: "From",
      step4EmailSubject: "Subject",
      step4EmailDate: "Date",
      step4ViewFull: "View full email",
      step4BottomText:
        "Imagine never missing an opportunity again, with every lead handled on time. To monitor unprocessed emails from potential clients - simply set the time period within which a response should be sent - in 15, 30 minutes, or 1 hour. If this doesn't happen - receive a notification via messenger, SMS, or even a call for the most expensive deals.",
      step5Title: "Choose Your Next Step",
      step5Report: "Get Detailed Report",
      step5Protection: "Get Full Protection",
      nextStep: "Continue",
      previousStep: "Back",
    },
    whyImportant: {
      title: "Why it is important?",
      content: [
        "Every day, leads slip through the cracks. A single missed email could be the client you've been waiting for — one with a $50,000 deal on the table. But it ended up in spam. Or buried under ten newsletters. Or simply ignored because your inbox is a chaotic mess.",
        "You work hard to generate leads. You invest in ads, SEO, networking. Yet the moment a lead reaches out, your system lets you down. The irony? Your inbox — the very tool meant to capture opportunities — becomes the bottleneck that chokes your growth.",
        "Think about it: How many potential clients gave up on you because you didn't respond fast enough? How many deals evaporated while you were drowning in email noise? Every lost lead isn't just a missed sale — it's a crack in your reputation, a dent in your cash flow, and a gift to your competitors.",
        "We built AIbizMate because we've been there. We know the gut-wrenching feeling of discovering a hot lead... three weeks too late. We understand that for SMBs, every client matters. Every response counts. And every delay hurts.",
      ],
      cta: "Ready to know about tariffs?",
    },
    pricing: {
      title: "Pricing Plans",
      subtitle: "Choose the plan that fits your business",
      monthly: "/month",
      custom: "Custom",
      tier1: {
        name: "Out of Spam",
        price: "$19",
        description: "Monitor spam folder for missed opportunities",
        features: ["Spam folder monitoring", "Telegram alerts", "Basic lead detection", "Daily reports"],
      },
      tier2: {
        name: "Out of Spam + Inbox",
        price: "$49",
        description: "Full inbox and spam monitoring with smart alerts",
        features: [
          "Everything in Out of Spam",
          "Full inbox monitoring",
          "Founder/CEO alert logic",
          "Priority notifications",
          "Advanced lead scoring",
        ],
      },
      tier3: {
        name: "All Leads Captured",
        price: "Custom",
        description: "Enterprise solution with AI-powered responses",
        features: [
          "Everything in previous plans",
          "Custom business integration",
          "AI-powered draft responses",
          "Knowledge base integration",
          "Send responses 10x faster",
          "Dedicated support",
        ],
      },
      addons: {
        title: "Add-ons",
        subtitle: "Enhance your plan with additional features",
        viber: {
          name: "Viber Notifications",
          price: "+$5/mo",
          description: "Get instant alerts on your favorite messenger. Never miss a ping.",
        },
        sms: {
          name: "SMS Alerts",
          price: "+$9/mo",
          description: "No internet? No problem. Critical alerts delivered via GSM network.",
        },
        voice: {
          name: "Voice Call Alert",
          price: "+$15/mo",
          description:
            'The "Wake Me Up" feature. For high-value leads (> $10k), our AI calls your phone until you answer.',
        },
      },
      selectPlan: "Select Plan",
      contactSales: "Contact Sales",
    },
    about: {
      title: "About the team",
      founder: "Alec Savytskyi, founder, CEO",
      story: [
        "The idea behind All Leads Responded is straightforward: to locate the leads hidden in your email inbox. Those forgotten gems are sitting in your inbox, buried under newsletters or quietly suffocating in spam. We pull them out, sort them, and highlight the urgent ones. We ensure that you never lose a potential customer because your inbox is cluttered.",
        "Behind the scenes, we rely on proven AI pipelines. Thanks to this technology, you have a tireless assistant who works 24/7, never skips a day, never complains, and constantly monitors your email. It flags missed opportunities, extracts requests, and keeps your team sane.",
        'A quick setup with no complicated onboarding or "enterprise-grade mystery" means your mailbox will start behaving like a disciplined CRM input channel in just a couple of hours.',
        "Our Ukrainian roots? They're not just a slogan. They're the reason we refresh dashboards before coffee. We know how SMBs operate: every client matters, every lead can impact a quarter, and every missed reply leaves a bitter aftertaste.",
        "We help you deal with the chaos in your email inbox. There are so many messages that sometimes it feels like your inbox is plotting against you, but we're here to tame it. Each important lead will reach your team, and you'll be notified in time.",
        "Are we perfect? No, honestly, things can slip. But damn it, we work our hearts out for you! Not because it's required. It's simply the only way we know how to work.",
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      securityTitle: "Security & Privacy (The Important Stuff)",
      security: {
        appPassword: {
          question: 'Why do I need to create an "App Password"? Can\'t I just use my normal one?',
          answer:
            "Using your normal password would be unsafe, and we don't want that. An App Password is a special, random code generated by your email provider (Google, Microsoft, etc.) specifically for third-party tools like ours.",
          safer: {
            title: "It's safer:",
            text: "It bypasses 2FA securely without compromising your main account.",
          },
          limited: {
            title: "It's limited:",
            text: "It doesn't give us access to change your settings or delete your account.",
          },
          revocable: {
            title: "It's revocable:",
            text: "You can delete this specific App Password in your Google/Outlook settings at any time, instantly cutting off our access.",
          },
        },
        readEmails: {
          question: "Do you read my emails?",
          answer:
            "Humans do not read your emails. Our AI algorithms process the text to understand the context (is it a sale inquiry or just a newsletter?), but no human eyes see your correspondence unless you specifically ask our support team to investigate a bug. We treat your data the way we want our own data to be treated.",
        },
        storeEmails: {
          question: "Do you store my emails?",
          answer:
            "We do not store the body of your emails. We only store the metadata (Sender, Subject, Date) of the potential leads we find so we can display them in your dashboard. Once you disconnect your inbox, we wipe this data.",
        },
      },
      howItWorksTitle: "How It Works",
      howItWorks: {
        differentSpam: {
          question: "How is this different from my spam folder?",
          answer1:
            'Your spam folder is a "black hole" — it catches real trash, but it also accidentally catches new clients because they used a "trigger word" or sent an attachment. You probably hate checking spam because it\'s full of junk.',
          answer2:
            "AIbizMate is a filter for your filter. We dig through the junk so you don't have to, and we only alert you when we find something that looks like money.",
        },
        twoFA: {
          question: "Does it work with 2FA enabled?",
          answer:
            "Yes! That is exactly why we use App Passwords. You keep your 2-Factor Authentication on (which keeps your account safe), and the App Password allows our AI to scan the background without interrupting you.",
        },
        accuracy: {
          question: "How accurate is the AI?",
          answer:
            'It\'s very good at distinguishing between a "Cold Email / Spam" and a "Warm Lead". For example, it knows that "Buy our SEO services" is spam, but "Hi, can you send me a price for your SEO services?" is a lead. However, no AI is perfect. That\'s why you can train it by marking items as "Not a Lead" in your dashboard.',
        },
      },
      billingTitle: "Billing & Setup",
      billing: {
        cancel: {
          question: "What happens if I cancel?",
          answer:
            "You can cancel at any time. The service will continue working until the end of your billing period. We don't believe in holding you hostage — if it doesn't bring you value, you shouldn't pay for it.",
        },
        multipleAccounts: {
          question: "Can I connect multiple email accounts?",
          answer:
            'Yes. Our "Out of Spam" plan covers one mailbox, but you can add as many as you need. If you are an agency managing 10+ mailboxes, contact us for a custom "Zero Miss" setup.',
        },
        technicalHelp: {
          question: "I'm not technical. Can you help me set it up?",
          answer:
            "Absolutely. The setup usually takes about 3 minutes, but if you get stuck generating an App Password, our support team (real humans!) will guide you through it.",
        },
      },
    },
    footer: {
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      support: "Support",
    },
    terms: {
      title: "Terms of Use",
      lastUpdated: "Last Updated: January 2025",
      sections: {
        acceptance: {
          title: "1. Acceptance of Terms",
          content:
            "By accessing and using AIbizMate, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.",
        },
        description: {
          title: "2. Description of Service",
          content:
            "AIbizMate provides AI-powered email monitoring and lead detection services. We scan your inbox and spam folder to identify potential business leads that may have been missed.",
        },
        userResponsibilities: {
          title: "3. User Responsibilities",
          content:
            "You are responsible for maintaining the confidentiality of your account credentials, including your App Password. You agree to use the service in compliance with all applicable laws and regulations. You must not use the service for any illegal or unauthorized purpose.",
        },
        dataUsage: {
          title: "4. Data Usage",
          content:
            "We process your email metadata (sender, subject, date) to identify potential leads. We do not store the full content of your emails. All data processing is done in accordance with our Privacy Policy.",
        },
        limitation: {
          title: "5. Limitation of Liability",
          content:
            "AIbizMate is provided 'as is' without warranties of any kind. We are not liable for any missed leads, lost revenue, or business opportunities. Our AI system aims for high accuracy but cannot guarantee 100% detection of all potential leads.",
        },
        termination: {
          title: "6. Termination",
          content:
            "You may cancel your subscription at any time. We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.",
        },
        changes: {
          title: "7. Changes to Terms",
          content:
            "We reserve the right to modify these terms at any time. We will notify users of any significant changes via email or through our service.",
        },
      },
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: January 2025",
      sections: {
        intro: {
          title: "Introduction",
          content:
            "At AIbizMate, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.",
        },
        infoCollected: {
          title: "Information We Collect",
          content:
            "We collect email metadata including sender information, subject lines, dates, and email addresses. We do NOT store the full body content of your emails. We also collect account information such as your email address, App Password (encrypted), and subscription details.",
        },
        howWeUse: {
          title: "How We Use Your Information",
          content:
            "We use your information to: scan and analyze your emails for potential leads, provide you with notifications about missed opportunities, improve our AI algorithms and service quality, and process your subscription and billing.",
        },
        dataStorage: {
          title: "Data Storage and Security",
          content:
            "We use industry-standard encryption to protect your data. Your App Password is encrypted and never stored in plain text. Email metadata is stored securely on encrypted servers. We retain your data only as long as you maintain an active subscription.",
        },
        dataSharing: {
          title: "Data Sharing",
          content:
            "We DO NOT sell your data to third parties. We DO NOT share your email content with anyone. We may share anonymized, aggregated data for research and service improvement. We may disclose information if required by law or to protect our rights.",
        },
        yourRights: {
          title: "Your Rights",
          content:
            "You have the right to: access your personal data, request deletion of your data, opt-out of certain data processing, and cancel your subscription at any time. Upon cancellation, we will delete all your stored data within 30 days.",
        },
        cookies: {
          title: "Cookies and Tracking",
          content:
            "We use essential cookies for authentication and service functionality. We do not use advertising or tracking cookies. You can disable cookies in your browser, but some features may not work properly.",
        },
        contact: {
          title: "Contact Us",
          content: "If you have questions about this Privacy Policy, please contact us at privacy@aibizmate.com",
        },
      },
    },
    support: {
      title: "Support",
      subtitle: "We're here to help you get the most out of AIbizMate",
      sections: {
        contact: {
          title: "Contact Us",
          email: "Email: support@aibizmate.com",
          response: "Response time: Within 24 hours",
          description:
            "For general inquiries, technical issues, or billing questions, please reach out to our support team. We're real humans who genuinely care about helping you succeed.",
        },
        setup: {
          title: "Setup Assistance",
          description:
            "Having trouble creating an App Password or connecting your inbox? Don't worry - it happens! Our team will guide you through the process step-by-step. Most setups take less than 3 minutes once you're on a call with us.",
        },
        technical: {
          title: "Technical Support",
          description:
            "Experiencing issues with lead detection, notifications, or the dashboard? We're here to help troubleshoot and resolve any problems quickly. Our support team has direct access to our engineering team for faster resolutions.",
        },
        billing: {
          title: "Billing & Subscriptions",
          description:
            "Questions about your plan, upgrades, or cancellations? We make it simple. No hidden fees, no retention tricks. If you want to cancel, we'll process it immediately - no questions asked.",
        },
        feedback: {
          title: "Feedback & Feature Requests",
          description:
            "Have ideas for improving AIbizMate? We're all ears! Many of our best features came from user suggestions. Share your thoughts and help us build a better product for everyone.",
        },
        hours: {
          title: "Support Hours",
          description: "Monday - Friday: 9:00 AM - 6:00 PM (EET - Eastern European Time)",
          weekend: "Weekend: Limited support for critical issues",
        },
      },
    },
  },
  uk: {
    nav: {
      howItWorks: "Як це працює",
      pricing: "Тарифи",
      aboutUs: "Про нас",
      support: "Підтримка",
      login: "Увійти",
      findLeads: "Знайти пропущені ліди",
    },
    hero: {
      headline: "Ліди в спамі, неопрацьовані запити — втрачені продажі.\nДавайте це виправимо!",
      subheadline: "AI, який рятує ліди, що ви пропустили в спамі та вхідних.",
      cta: "Почати безкоштовний аудит",
    },
    auditSection: {
      title: "Знайдіть пропущені ліди зараз (покроково)",
    },
    wizard: {
      step1Title: "Яка середня вартість вашої угоди?",
      step1Placeholder: "Введіть приблизну суму в USD",
      step2Title: "Підключіть вашу пошту",
      step2Warning: "Ніколи не вводьте оригінальний пароль від вашої пошти! Обов'язково створіть application password!",
      step2EmailLabel: "Ваш email",
      step2EmailPlaceholder: "your.email@example.com",
      step2PasswordLabel: "Application password",
      step2PasswordPlaceholder: "Введіть application password",
      step2Gmail: "Як створити",
      step2Outlook: "Як створити",
      step2Yahoo: "Як створити",
      step2Hotmail: "Як створити",
      step2AOL: "Як створити",
      step2Other: "Інший провайдер",
      step3Title: "Сканування вашої пошти",
      step3Scanning: "Сканування спаму та вхідних на пропущені ліди...",
      step3SeeResults: "Переглянути результати",
      step4Title: "Результати аудиту",
      step4Scanned: "Проскановано 1543 листи",
      step4Found: "Знайдено потенційних лідів",
      step4Loss: "Оціночна втрачена виручка",
      step4EmailPreview: "Попередній перегляд листів",
      step4EmailFrom: "Від",
      step4EmailSubject: "Тема",
      step4EmailDate: "Дата",
      step4ViewFull: "Переглянути повністю",
      step4BottomText:
        "Уявіть, що ви більше не втрачаєте жодної можливості, і кожен лід обробляється вчасно. Для того щоб контролювати необроблені імейли від потенційних клієнтів — просто задайте у який період часу відповідь має бути відправлена — за 15, 30 хв. або 1 годину. Якщо цього не відбулось - отримайте повідомлення в мессенджер, СМС або навіть дзвінок для найдорожчих deals.",
      step5Title: "Виберіть наступний крок",
      step5Report: "Отримати детальний звіт",
      step5Protection: "Отримати повний захист",
      nextStep: "Продовжити",
      previousStep: "Назад",
    },
    whyImportant: {
      title: "Чому це важливо?",
      content: [
        "Кожен день ліди проскочують крізь тріщини. Один пропущений лист може бути клієнтом, якого ви чекали — з угодою на $50,000. Але він потрапив у спам. Або закопаний під десятьма розсилками. Або просто проігнорований, бо ваша скринька — хаотичний безлад.",
        "Ви важко працюєте, щоб генерувати ліди. Ви інвестуєте в рекламу, SEO, нетворкінг. Проте в момент, коли лід виходить на зв'язок, ваша система підводить вас. Іронія? Ваша скринька — інструмент, призначений для захоплення можливостей — стає пляшковим горлечком, що душить ваше зростання.",
        "Подумайте про це: скільки потенційних клієнтів відмовилися від вас, бо ви не відповіли достатньо швидко? Скільки угод випарувалися, поки ви тонули в поштовому шумі? Кожен втрачений лід — це не просто пропущений продаж. Це тріщина у вашій репутації, вм'ятина у вашому грошовому потоці та подарунок для ваших конкурентів.",
        "Ми створили AIbizMate, бо самі через це проходили. Ми знаємо це нутряне відчуття, коли виявляєш гарячий лід... через три тижні. Ми розуміємо, що для МСП кожен клієнт важливий. Кожна відповідь має значення. І кожна затримка болить.",
      ],
      cta: "Готові дізнатись про тарифи?",
    },
    pricing: {
      title: "Тарифні плани",
      subtitle: "Оберіть план, що підходить вашому бізнесу",
      monthly: "/місяць",
      custom: "Індивідуально",
      tier1: {
        name: "Зі спаму",
        price: "$19",
        description: "Моніторинг спаму для пропущених можливостей",
        features: ["Моніторинг папки спам", "Сповіщення в Telegram", "Базове виявлення лідів", "Щоденні звіти"],
      },
      tier2: {
        name: "Зі спаму + Вхідні",
        price: "$49",
        description: "Повний моніторинг вхідних та спаму з розумними сповіщеннями",
        features: [
          'Все із плану "Зі спаму"',
          "Повний моніторинг вхідних",
          "Логіка сповіщень для засновника/CEO",
          "Пріоритетні сповіщення",
          "Розширена оцінка лідів",
        ],
      },
      tier3: {
        name: "Всі ліди захоплені",
        price: "Індивідуально",
        description: "Корпоративне рішення з AI-відповідями",
        features: [
          "Все з попередніх планів",
          "Кастомна інтеграція з бізнесом",
          "AI-чернетки відповідей",
          "Інтеграція бази знань",
          "Відповіді в 10 разів швидше",
          "Виділена підтримка",
        ],
      },
      addons: {
        title: "Додатки",
        subtitle: "Покращте свій план додатковими функціями",
        viber: {
          name: "Сповіщення Viber",
          price: "+$5/міс",
          description: "Миттєві сповіщення у вашому улюбленому месенджері. Не пропустіть жодного повідомлення.",
        },
        sms: {
          name: "SMS сповіщення",
          price: "+$9/міс",
          description: "Немає інтернету? Не проблема. Критичні сповіщення через GSM мережу.",
        },
        voice: {
          name: "Голосовий дзвінок",
          price: "+$15/міс",
          description:
            'Функція "Розбуди мене". Для високовартісних лідів (> $10k) наш AI телефонує вам, поки ви не відповісте.',
        },
      },
      selectPlan: "Обрати план",
      contactSales: "Зв'язатися з продажами",
    },
    about: {
      title: "Про команду",
      founder: "Алек Савицький, засновник, CEO",
      story: [
        "Ідея All Leads Responded проста: знайти ліди, приховані у вашій поштовій скриньці. Ті забуті перлини сидять у вашій скриньці, заховані під розсилками або тихо задихаються в спамі. Ми витягуємо їх, сортуємо та підсвічуємо найтерміновіші. Ми гарантуємо, що ви ніколи не втратите потенційного клієнта через захаращену скриньку.",
        "За лаштунками ми покладаємося на перевірені AI-пайплайни. Завдяки цій технології у вас є невтомний асистент, який працює 24/7, ніколи не пропускає день, не скаржиться і постійно моніторить вашу пошту. Він позначає пропущені можливості, витягує запити і підтримує розсудливість вашої команди.",
        'Швидке налаштування без складного онбордингу чи "корпоративних таємниць" означає, що ваша поштова скринька почне поводитися як дисциплінований вхідний канал CRM всього за кілька годин.',
        "Наше українське коріння? Це не просто гасло. Саме тому ми оновлюємо дашборди раніше кави. Ми знаємо, як працюють МСП: кожен клієнт важливий, кожен лід може вплинути на квартал, і кожна пропущена відповідь залишає гіркий присмак.",
        "Ми допомагаємо вам впоратися з хаосом у вашій поштовій скриньці. Повідомлень так багато, що іноді здається, що ваша скринька змовилася проти вас, але ми тут, щоб її приборкати. Кожен важливий лід дістанеться вашої команди, і вас сповістять вчасно.",
        "Ми ідеальні? Ні, чесно, щось може прослизнути. Але, чорт візьми, ми працюємо для вас від усього серця! Не тому, що так треба. Це просто єдиний спосіб роботи, який ми знаємо.",
      ],
    },
    faq: {
      title: "Питання, що часто задаються",
      securityTitle: "Безпека та конфіденційність (Важливі речі)",
      security: {
        appPassword: {
          question: 'Чому мені потрібно створити "App Password"? Я не можу просто використовувати свій звичайний?',
          answer:
            "Використання звичайного пароля було б небезпечним, і ми цього не хочемо. App Password — це спеціальний, випадковий код, згенерований вашим поштовим провайдером (Google, Microsoft тощо) спеціально для сторонніх інструментів, таких як наш.",
          safer: {
            title: "Це безпечніше:",
            text: "Він безпечно обходить 2FA без компрометації вашого основного облікового запису.",
          },
          limited: {
            title: "Це обмежено:",
            text: "Він не дає нам доступу до зміни ваших налаштувань або видалення вашого облікового запису.",
          },
          revocable: {
            title: "Його можна відкликати:",
            text: "Ви можете видалити цей конкретний App Password у своїх налаштуваннях Google/Outlook у будь-який час, миттєво припинивши наш доступ.",
          },
        },
        readEmails: {
          question: "Ви читаєте мої листи?",
          answer:
            "Люди не читають ваші листи. Наші AI-алгоритми обробляють текст, щоб зрозуміти контекст (чи це запит про продаж чи просто розсилка?), але жодні людські очі не бачать вашої кореспонденції, якщо ви спеціально не попросите нашу службу підтримки розслідувати помилку. Ми ставимося до ваших даних так, як хочемо, щоб ставилися до наших.",
        },
        storeEmails: {
          question: "Ви зберігаєте мої листи?",
          answer:
            "Ми не зберігаємо тіло ваших листів. Ми зберігаємо лише метадані (Відправник, Тема, Дата) потенційних лідів, які ми знаходимо, щоб відобразити їх у вашому дашборді. Після того, як ви відключите свою поштову скриньку, ми видаляємо ці дані.",
        },
      },
      howItWorksTitle: "Як це працює",
      howItWorks: {
        differentSpam: {
          question: "Чим це відрізняється від моєї папки спам?",
          answer1:
            'Ваша папка спам — це "чорна діра" — вона ловить справжнє сміття, але також випадково ловить нових клієнтів, тому що вони використали "тригерне слово" або відправили вкладення. Ви, ймовірно, ненавидите перевіряти спам, бо він повний сміття.',
          answer2:
            "AIbizMate — це фільтр для вашого фільтра. Ми риємося в смітті, щоб вам не доводилося це робити, і ми сповіщаємо вас лише тоді, коли знаходимо щось, що виглядає як гроші.",
        },
        twoFA: {
          question: "Чи працює це з увімкненою 2FA?",
          answer:
            "Так! Саме тому ми використовуємо App Passwords. Ви залишаєте увімкненою двофакторну автентифікацію (яка захищає ваш обліковий запис), а App Password дозволяє нашому AI сканувати фон, не перериваючи вас.",
        },
        accuracy: {
          question: "Наскільки точний AI?",
          answer:
            'Він дуже добре розрізняє "Холодний Email / Спам" і "Теплий лід". Наприклад, він знає, що "Купуйте наші SEO-послуги" — це спам, але "Привіт, чи можете ви надіслати мені ціну на ваші SEO-послуги?" — це лід. Однак жоден AI не є ідеальним. Ось чому ви можете навчити його, позначаючи елементи як "Не лід" у своєму дашборді.',
        },
      },
      billingTitle: "Оплата та налаштування",
      billing: {
        cancel: {
          question: "Що станеться, якщо я скасую?",
          answer:
            "Ви можете скасувати в будь-який час. Сервіс продовжить працювати до кінця вашого платіжного періоду. Ми не віримо в утримання вас у заручниках — якщо він не приносить вам цінності, ви не повинні за це платити.",
        },
        multipleAccounts: {
          question: "Чи можу я підключити кілька облікових записів електронної пошти?",
          answer:
            'Так. Наш план "Зі спаму" охоплює одну поштову скриньку, але ви можете додати стільки, скільки вам потрібно. Якщо ви агентство, яке керує 10+ поштовими скриньками, зв\'яжіться з нами для налаштування кастомного "Zero Miss".',
        },
        technicalHelp: {
          question: "Я не технічний. Ви можете допомогти мені налаштувати це?",
          answer:
            "Звичайно. Налаштування зазвичай займає близько 3 хвилин, але якщо ви застрягнете при генерації App Password, наша команда підтримки (справжні люди!) допоможе вам.",
        },
      },
    },
    footer: {
      terms: "Умови використання",
      privacy: "Політика конфіденційності",
      support: "Підтримка",
    },
    terms: {
      title: "Умови використання",
      lastUpdated: "Останнє оновлення: Січень 2025",
      sections: {
        acceptance: {
          title: "1. Прийняття умов",
          content:
            "Отримуючи доступ до AIbizMate та використовуючи його, ви приймаєте та погоджуєтеся бути зв'язаними умовами цієї угоди. Якщо ви не погоджуєтеся з цими умовами, будь ласка, не використовуйте наш сервіс.",
        },
        description: {
          title: "2. Опис сервісу",
          content:
            "AIbizMate надає послуги моніторингу електронної пошти та виявлення лідів на базі AI. Ми скануємо вашу вхідну скриньку та папку спам, щоб визначити потенційні бізнес-ліди, які могли бути пропущені.",
        },
        userResponsibilities: {
          title: "3. Обов'язки користувача",
          content:
            "Ви несете відповідальність за збереження конфіденційності облікових даних вашого облікового запису, включаючи ваш App Password. Ви погоджуєтеся використовувати сервіс відповідно до всіх застосовних законів та правил. Ви не повинні використовувати сервіс для будь-яких незаконних або несанкціонованих цілей.",
        },
        dataUsage: {
          title: "4. Використання даних",
          content:
            "Ми обробляємо метадані вашої електронної пошти (відправник, тема, дата) для визначення потенційних лідів. Ми не зберігаємо повний вміст ваших листів. Вся обробка даних здійснюється відповідно до нашої Політики конфіденційності.",
        },
        limitation: {
          title: "5. Обмеження відповідальності",
          content:
            "AIbizMate надається 'як є' без будь-яких гарантій. Ми не несемо відповідальності за будь-які пропущені ліди, втрачений дохід або бізнес-можливості. Наша система AI прагне високої точності, але не може гарантувати 100% виявлення всіх потенційних лідів.",
        },
        termination: {
          title: "6. Припинення",
          content:
            "Ви можете скасувати свою підписку в будь-який час. Ми залишаємо за собою право припинити або призупинити доступ до нашого сервісу негайно, без попереднього повідомлення, у разі будь-якого порушення цих Умов.",
        },
        changes: {
          title: "7. Зміни умов",
          content:
            "Ми залишаємо за собою право змінювати ці умови в будь-який час. Ми повідомимо користувачів про будь-які значні зміни електронною поштою або через наш сервіс.",
        },
      },
    },
    privacy: {
      title: "Політика конфіденційності",
      lastUpdated: "Останнє оновлення: Січень 2025",
      sections: {
        intro: {
          title: "Вступ",
          content:
            "В AIbizMate ми серйозно ставимося до вашої конфіденційності. Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо, розкриваємо та захищаємо вашу інформацію, коли ви користуєтеся нашим сервісом.",
        },
        infoCollected: {
          title: "Інформація, яку ми збираємо",
          content:
            "Ми збираємо метадані електронної пошти, включаючи інформацію про відправника, теми листів, дати та адреси електронної пошти. Ми НЕ зберігаємо повний вміст ваших листів. Ми також збираємо інформацію про обліковий запис, таку як ваша адреса електронної пошти, App Password (зашифрований) та деталі підписки.",
        },
        howWeUse: {
          title: "Як ми використовуємо вашу інформацію",
          content:
            "Ми використовуємо вашу інформацію для: сканування та аналізу ваших листів на предмет потенційних лідів, надання вам повідомлень про пропущені можливості, покращення наших AI-алгоритмів та якості сервісу, обробки вашої підписки та виставлення рахунків.",
        },
        dataStorage: {
          title: "Зберігання та безпека даних",
          content:
            "Ми використовуємо стандартне шифрування для захисту ваших даних. Ваш App Password зашифрований і ніколи не зберігається у відкритому вигляді. Метадані електронної пошти зберігаються безпечно на зашифрованих серверах. Ми зберігаємо ваші дані лише до тих пір, поки ви підтримуєте активну підписку.",
        },
        dataSharing: {
          title: "Обмін даними",
          content:
            "Ми НЕ продаємо ваші дані третім особам. Ми НЕ ділимося вмістом вашої електронної пошти з ким-небудь. Ми можемо ділитися анонімними, агрегованими даними для досліджень та покращення сервісу. Ми можемо розкривати інформацію, якщо це вимагається законом або для захисту наших прав.",
        },
        yourRights: {
          title: "Ваші права",
          content:
            "Ви маєте право: отримати доступ до своїх персональних даних, запитати видалення ваших даних, відмовитися від певної обробки даних та скасувати підписку в будь-який час. Після скасування ми видалимо всі ваші збережені дані протягом 30 днів.",
        },
        cookies: {
          title: "Cookies та відстеження",
          content:
            "Ми використовуємо основні cookies для автентифікації та функціональності сервісу. Ми не використовуємо рекламні або відстежувальні cookies. Ви можете вимкнути cookies у своєму браузері, але деякі функції можуть не працювати належним чином.",
        },
        contact: {
          title: "Зв'яжіться з нами",
          content:
            "Якщо у вас є питання щодо цієї Політики конфіденційності, будь ласка, зв'яжіться з нами за адресою privacy@aibizmate.com",
        },
      },
    },
    support: {
      title: "Підтримка",
      subtitle: "Ми тут, щоб допомогти вам отримати максимум від AIbizMate",
      sections: {
        contact: {
          title: "Зв'яжіться з нами",
          email: "Email: support@aibizmate.com",
          response: "Час відповіді: Протягом 24 годин",
          description:
            "Для загальних запитів, технічних проблем або питань щодо оплати, будь ласка, зв'яжіться з нашою командою підтримки. Ми справжні люди, яким дійсно важливо допомогти вам досягти успіху.",
        },
        setup: {
          title: "Допомога з налаштуванням",
          description:
            "Виникли проблеми зі створенням App Password або підключенням вашої скриньки? Не хвилюйтеся - це буває! Наша команда проведе вас через процес крок за кроком. Більшість налаштувань займає менше 3 хвилин, коли ви на зв'язку з нами.",
        },
        technical: {
          title: "Технічна підтримка",
          description:
            "Виникли проблеми з виявленням лідів, сповіщеннями або дашбордом? Ми тут, щоб допомогти швидко діагностувати та вирішити будь-які проблеми. Наша команда підтримки має прямий доступ до нашої інженерної команди для швидшого вирішення.",
        },
        billing: {
          title: "Оплата та підписки",
          description:
            "Питання щодо вашого плану, оновлень або скасувань? Ми робимо це просто. Ніяких прихованих платежів, ніяких трюків з утриманням. Якщо ви хочете скасувати, ми обробимо це негайно - без зайвих питань.",
        },
        feedback: {
          title: "Відгуки та запити функцій",
          description:
            "Є ідеї щодо покращення AIbizMate? Ми всі вуха! Багато наших найкращих функцій прийшли з пропозицій користувачів. Поділіться своїми думками та допоможіть нам створити кращий продукт для всіх.",
        },
        hours: {
          title: "Години підтримки",
          description: "Понеділок - П'ятниця: 9:00 - 18:00 (EET - Східноєвропейський час)",
          weekend: "Вихідні: Обмежена підтримка для критичних питань",
        },
      },
    },
  },
};

export const useTranslation = (lang: Language) => {
  return translations[lang];
};
