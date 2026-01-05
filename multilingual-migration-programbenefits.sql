-- Migration: Update programBenefits for all languages
-- This migration updates the programBenefits array with short descriptions and structuredContent for all 6 cards
-- Uses jsonb_set to replace the entire programBenefits array

-- Update Russian (RU)
UPDATE site_content
SET data = jsonb_set(
  data,
  '{programBenefits}',
  $$[
    {
      "title": "Определение уровня группы",
      "description": "Harvard Business School обладает одной из крупнейших в мире библиотек бизнес-кейсов: более 70 000 кейсов и статей о тысячах компаний из разных стран и отраслей, охватывающих все ключевые аспекты управления.",
      "structuredContent": {
        "sections": [
          {
            "title": "Ограничения прямого доступа",
            "content": "Однако прямой доступ к ним ограничен по нескольким причинам:",
            "items": [
              "материалы доступны преимущественно на английском языке",
              "поступление требует сдачи IELTS или аналогичного языкового экзамена",
              "очное обучение проходит в Бостоне (США)",
              "стоимость программ высокая: например, пятидневный курс по 10 кейсам стоит 5 000 долларов"
            ]
          }
        ]
      }
    },
    {
      "title": "Подбор кейсов",
      "description": "В Harvard Business School студенты MBA за два года изучают более 500 кейсов, в среднем по два кейса в день. Если лекция показывает о чём думать, то кейс-метод учит как думать: как анализировать ситуацию, находить причинно-следственные связи, принимать управленческие решения и видеть несколько вариантов развития событий.",
      "structuredContent": {
        "sections": [
          {
            "title": "Создание и преподавание кейсов",
            "content": "Профессора HBS ежегодно создают новые кейсы — в среднем два авторских кейса в год, а также преподают порядка 100 уникальных кейсов, написанных ими или другими преподавателями.",
            "items": [
              "Это формирует широту управленческого мышления",
              "Глубокое понимание разных индустрий",
              "Способность видеть бизнес-процессы с разных углов зрения"
            ]
          }
        ]
      }
    },
    {
      "title": "Подготовка учебных материалов",
      "description": "В лучших бизнес-школах мира существует система Case Learning Path (CLP) — путь развития через систематическое изучение кейсов. Это не просто обучение, а стиль жизни, при котором человек постоянно развивается, накапливает управленческий опыт и расширяет своё мышление.",
      "structuredContent": {
        "sections": [
          {
            "title": "Как работает Case Learning Path",
            "content": "CLP позволяет встроить обучение в собственный жизненный ритм:",
            "items": [
              "Лёгкий темп: около 30 кейсов в год",
              "Средне-высокий темп: от 50 кейсов в год"
            ],
            "subsections": [
              {
                "content": "Следуя такой траектории, за 4–5 лет можно самостоятельно пройти объём управленческих кейсов, сопоставимый с программой MBA Harvard Business School — не выезжая из страны и не прекращая работу.",
                "emphasis": true
              },
              {
                "content": "Это даёт человеку редкое конкурентное преимущество: вы развиваетесь в реальном времени, не выпадая из профессии и постоянно усиливая свою компетентность."
              }
            ]
          }
        ]
      }
    },
    {
      "title": "Работа в классе",
      "description": "Мы предоставляем официальный доступ к платформе Harvard Business Publishing Education — той же самой, которой пользуются студенты ведущих мировых университетов.",
      "structuredContent": {
        "sections": [
          {
            "title": "Официальный статус преподавателя",
            "content": "Наш преподаватель имеет официальный статус, подтверждённый Harvard Business Publishing Education (HBPE) — подразделением Harvard University, ответственным за глобальное распространение кейс-метода.",
            "items": [
              "Преподаватель прошёл специальную профессиональную программу Fundamentals of Case Teaching",
              "Получил статус Registered Harvard Business Publishing Educator",
              "Получил статус Certified Harvard Business Publishing Educator",
              "Имеет официальную лицензию на преподавание и дистрибуцию кейсов",
              "Имеет право проводить обучение в соответствии со стандартами HBS",
              "Имеет право формировать и выдавать сертификаты установленного образца"
            ]
          }
        ]
      }
    },
    {
      "title": "Навигация обсуждения",
      "description": "Кейс-метод — это практический формат обучения, основанный на разборе реальных бизнес-ситуаций. Вместо пассивных лекций студенты активно анализируют проблему, предлагают решения, спорят, защищают позицию и учатся мыслить как руководители.",
      "structuredContent": {
        "sections": [
          {
            "title": "Опыт преподавателя",
            "content": "Наш преподаватель, прошедший обучение и изучивший:",
            "items": [
              "более 140 кейсов Harvard Business School",
              "более 100 кейсов London Business School",
              "а также имеющий 12+ лет опыта государственной службы",
              "и 12+ лет опыта в бизнесе и преподавании"
            ],
            "subsections": [
              {
                "content": "отбирает кейсы, которые действительно применимы к нашим реалиям.",
                "emphasis": true
              }
            ]
          }
        ]
      }
    },
    {
      "title": "Завершение и практическое применение",
      "description": "Право выдачи международных сертификатов. Каждый слушатель, успешно прошедший программу, может получить сертификат с официально разрешённой надписью.",
      "structuredContent": {
        "sections": [
          {
            "title": "Международные сертификаты",
            "content": "Текст сертификата:",
            "highlightedBlocks": [
              "This certifies that [Student Name] has successfully completed an intensive case analysis program featuring Harvard Business School case studies licensed through Harvard Business Publishing. Guided by Oleg Tsoy, a Registered & Certified Harvard Business Publishing Educator."
            ],
            "subsections": [
              {
                "content": "Такой сертификат подтверждает обучение с использованием оригинальных материалов Harvard Business School и имеет высокий международный вес."
              }
            ]
          },
          {
            "title": "Персональный CaseBook",
            "content": "А также сформировать персональный CaseBook с именными кейсами по которым пройдено обучение.",
            "items": [
              "Каждый сертификат и CaseBook регистрируются на платформе INTECA"
            ]
          }
        ]
      }
    }
  ]$$::jsonb
)
WHERE key = 'site_content_ru';

-- Update English (EN)
UPDATE site_content
SET data = jsonb_set(
  data,
  '{programBenefits}',
  $$[
    {
      "title": "Group Level Assessment",
      "description": "Harvard Business School has one of the world's largest business case libraries: over 70,000 cases and articles about thousands of companies from different countries and industries, covering all key aspects of management.",
      "structuredContent": {
        "sections": [
          {
            "title": "Direct Access Limitations",
            "content": "However, direct access is limited for several reasons:",
            "items": [
              "materials are primarily available in English",
              "admission requires IELTS or similar language exam",
              "on-site training takes place in Boston (USA)",
              "program costs are high: for example, a five-day course with 10 cases costs $5,000"
            ]
          }
        ]
      }
    },
    {
      "title": "Case Selection",
      "description": "At Harvard Business School, MBA students study over 500 cases in two years, averaging two cases per day. If lectures show what to think about, the case method teaches how to think: how to analyze situations, find cause-and-effect relationships, make management decisions, and see multiple scenarios.",
      "structuredContent": {
        "sections": [
          {
            "title": "Case Creation and Teaching",
            "content": "HBS professors create new cases annually — on average two original cases per year, and also teach about 100 unique cases written by them or other instructors.",
            "items": [
              "This forms breadth of management thinking",
              "Deep understanding of different industries",
              "Ability to see business processes from different angles"
            ]
          }
        ]
      }
    },
    {
      "title": "Educational Materials Preparation",
      "description": "The world's best business schools have a Case Learning Path (CLP) system — a development path through systematic case study. This is not just training, but a lifestyle where a person constantly develops, accumulates management experience, and expands their thinking.",
      "structuredContent": {
        "sections": [
          {
            "title": "How Case Learning Path Works",
            "content": "CLP allows you to integrate learning into your own life rhythm:",
            "items": [
              "Light pace: about 30 cases per year",
              "Medium-high pace: from 50 cases per year"
            ],
            "subsections": [
              {
                "content": "Following this trajectory, in 4–5 years you can independently complete a volume of management cases comparable to the Harvard Business School MBA program — without leaving the country and without stopping work.",
                "emphasis": true
              },
              {
                "content": "This gives a person a rare competitive advantage: you develop in real time, without falling out of the profession and constantly strengthening your competence."
              }
            ]
          }
        ]
      }
    },
    {
      "title": "Classroom Work",
      "description": "We provide official access to the Harvard Business Publishing Education platform — the same one used by students at leading world universities.",
      "structuredContent": {
        "sections": [
          {
            "title": "Instructor's Official Status",
            "content": "Our instructor has official status confirmed by Harvard Business Publishing Education (HBPE) — a division of Harvard University responsible for the global distribution of the case method.",
            "items": [
              "The instructor has completed the special professional program Fundamentals of Case Teaching",
              "Received Registered Harvard Business Publishing Educator status",
              "Received Certified Harvard Business Publishing Educator status",
              "Has official license for teaching and case distribution",
              "Has the right to conduct training in accordance with HBS standards",
              "Has the right to form and issue certificates of the established form"
            ]
          }
        ]
      }
    },
    {
      "title": "Discussion Navigation",
      "description": "The case method is a practical learning format based on analyzing real business situations. Instead of passive lectures, students actively analyze problems, propose solutions, debate, defend positions, and learn to think like leaders.",
      "structuredContent": {
        "sections": [
          {
            "title": "Instructor's Experience",
            "content": "Our instructor, who has completed training and studied:",
            "items": [
              "over 140 Harvard Business School cases",
              "over 100 London Business School cases",
              "and also has 12+ years of government service experience",
              "and 12+ years of business and teaching experience"
            ],
            "subsections": [
              {
                "content": "selects cases that are truly applicable to our realities.",
                "emphasis": true
              }
            ]
          }
        ]
      }
    },
    {
      "title": "Completion and Practical Application",
      "description": "Right to issue international certificates. Each participant who successfully completes the program can receive a certificate with an officially authorized inscription.",
      "structuredContent": {
        "sections": [
          {
            "title": "International Certificates",
            "content": "Certificate text:",
            "highlightedBlocks": [
              "This certifies that [Student Name] has successfully completed an intensive case analysis program featuring Harvard Business School case studies licensed through Harvard Business Publishing. Guided by Oleg Tsoy, a Registered & Certified Harvard Business Publishing Educator."
            ],
            "subsections": [
              {
                "content": "Such a certificate confirms training using original Harvard Business School materials and has high international weight."
              }
            ]
          },
          {
            "title": "Personal CaseBook",
            "content": "Also, form a personal CaseBook with named cases that have been studied.",
            "items": [
              "Each certificate and CaseBook is registered on the INTECA platform"
            ]
          }
        ]
      }
    }
  ]$$::jsonb
)
WHERE key = 'site_content_en';

-- Update Kazakh (KZ)
UPDATE site_content
SET data = jsonb_set(
  data,
  '{programBenefits}',
  $$[
    {
      "title": "Топ деңгейін анықтау",
      "description": "Harvard Business School әлемдегі ең ірі бизнес-кейстер кітапханасының біріне ие: 70 000-нан астам кейс және әртүрлі елдер мен салалардан мыңдаған компаниялар туралы мақалалар, басқарудың барлық негізгі аспектілерін қамтиды.",
      "structuredContent": {
        "sections": [
          {
            "title": "Тікелей қол жеткізудің шектеулері",
            "content": "Алайда, тікелей қол жеткізу бірнеше себептермен шектеледі:",
            "items": [
              "материалдар негізінен ағылшын тілінде қолжетімді",
              "түсу IELTS немесе ұқсас тілдік емтихан тапсыруды талап етеді",
              "жүзбелі оқыту Бостонда (АҚШ) өтеді",
              "бағдарламалардың құны жоғары: мысалы, 10 кейспен бес күндік курс 5 000 доллар тұрады"
            ]
          }
        ]
      }
    },
    {
      "title": "Кейстерді таңдау",
      "description": "Harvard Business School-да MBA студенттері екі жылда 500-ден астам кейсті зерттейді, күніне орташа екі кейс. Егер дәріс не туралы ойлану керектігін көрсетсе, кейс-әдіс қалай ойлауды үйретеді: жағдайды талдау, себеп-салдар байланыстарын табу, басқару шешімдерін қабылдау және оқиғалардың бірнеше нұсқасын көру.",
      "structuredContent": {
        "sections": [
          {
            "title": "Кейстерді жасау және оқыту",
            "content": "HBS профессорлары жыл сайын жаңа кейстер жасайды — жылына орташа екі авторлық кейс, сонымен қатар олар немесе басқа оқытушылар жазылған шамамен 100 бірегей кейсті оқытады.",
            "items": [
              "Бұл басқару ойлауының кеңдігін қалыптастырады",
              "Әртүрлі индустрияларды терең түсіну",
              "Бизнес-процестерді әртүрлі бұрыштардан көру қабілеті"
            ]
          }
        ]
      }
    },
    {
      "title": "Оқу материалдарын дайындау",
      "description": "Әлемнің ең жақсы бизнес-мектептерінде Case Learning Path (CLP) жүйесі бар — кейстерді жүйелі зерттеу арқылы даму жолы. Бұл жай оқыту емес, адам үнемі дамитын, басқару тәжірибесін жинайтын және ойлауын кеңейтетін өмір салты.",
      "structuredContent": {
        "sections": [
          {
            "title": "Case Learning Path қалай жұмыс істейді",
            "content": "CLP оқуды өз өмірлік ритміңізге енгізуге мүмкіндік береді:",
            "items": [
              "Жеңіл темп: жылына шамамен 30 кейс",
              "Орташа-жоғары темп: жылына 50 кейстен бастап"
            ],
            "subsections": [
              {
                "content": "Осы траекторияны ұстанып, 4–5 жылда еліңізден шықпай және жұмысыңызды тоқтатпай, Harvard Business School MBA бағдарламасымен салыстырмалы басқару кейстерінің көлемін дербес өтуге болады.",
                "emphasis": true
              },
              {
                "content": "Бұл адамға сирек бәсекелестік артықшылық береді: сіз нақты уақытта дамисыз, кәсіптен шықпай және үнемі өз құзыреттілігіңізді күшейтесіз."
              }
            ]
          }
        ]
      }
    },
    {
      "title": "Сыныптағы жұмыс",
      "description": "Біз Harvard Business Publishing Education платформасына ресми қол жеткізуді қамтамасыз етеміз — әлемнің жетекші университеттерінің студенттері пайдаланатын дәл сол платформа.",
      "structuredContent": {
        "sections": [
          {
            "title": "Оқытушының ресми мәртебесі",
            "content": "Біздің оқытушымыз Harvard Business Publishing Education (HBPE) — кейс-әдісті жаһандық таратуға жауапты Harvard University бөлімімен расталған ресми мәртебеге ие.",
            "items": [
              "Оқытушы Fundamentals of Case Teaching арнайы кәсіби бағдарламасын аяқтады",
              "Registered Harvard Business Publishing Educator мәртебесін алды",
              "Certified Harvard Business Publishing Educator мәртебесін алды",
              "Оқыту және кейстерді таратуға ресми лицензияға ие",
              "HBS стандарттарына сәйкес оқыту жүргізу құқығына ие",
              "Белгіленген нысандағы сертификаттарды құру және беру құқығына ие"
            ]
          }
        ]
      }
    },
    {
      "title": "Талқылауды басқару",
      "description": "Кейс-әдіс — нақты бизнес-жағдайларды талдауға негізделген практикалық оқыту форматы. Пассивті дәрістердің орнына студенттер мәселені белсенді талдайды, шешімдер ұсынады, пікірлеседі, позицияны қорғайды және басшылар сияқты ойлауды үйренеді.",
      "structuredContent": {
        "sections": [
          {
            "title": "Оқытушының тәжірибесі",
            "content": "Біздің оқытушымыз оқытуды аяқтап, зерттеген:",
            "items": [
              "140-тан астам Harvard Business School кейстерін",
              "100-ден астам London Business School кейстерін",
              "сонымен қатар 12+ жыл мемлекеттік қызмет тәжірибесі бар",
              "және 12+ жыл бизнес және оқыту тәжірибесі бар"
            ],
            "subsections": [
              {
                "content": "біздің нақтылыққа шынайы қолданылатын кейстерді таңдайды.",
                "emphasis": true
              }
            ]
          }
        ]
      }
    },
    {
      "title": "Аяқтау және практикалық қолдану",
      "description": "Халықаралық сертификаттар беру құқығы. Бағдарламаны сәтті аяқтаған әрбір тыңдаушы ресми рұқсат етілген жазуы бар сертификат ала алады.",
      "structuredContent": {
        "sections": [
          {
            "title": "Халықаралық сертификаттар",
            "content": "Сертификат мәтіні:",
            "highlightedBlocks": [
              "This certifies that [Student Name] has successfully completed an intensive case analysis program featuring Harvard Business School case studies licensed through Harvard Business Publishing. Guided by Oleg Tsoy, a Registered & Certified Harvard Business Publishing Educator."
            ],
            "subsections": [
              {
                "content": "Мұндай сертификат түпнұсқа Harvard Business School материалдарын пайдалана отырып оқытуды растайды және жоғары халықаралық салмаққа ие."
              }
            ]
          },
          {
            "title": "Жеке CaseBook",
            "content": "Сондай-ақ, оқыту өткен атаулы кейстерімен жеке CaseBook құруға болады.",
            "items": [
              "Әрбір сертификат және CaseBook INTECA платформасында тіркеледі"
            ]
          }
        ]
      }
    }
  ]$$::jsonb
)
WHERE key = 'site_content_kz';
