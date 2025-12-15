-- Migration: add new Methodology & Cases item "Case-Based English Development"
-- Adds to arrays without removing existing data

-- RU ----------------------------------------------------------------
INSERT INTO site_content (key, data)
VALUES (
  'site_content_ru',
  jsonb_build_object(
    'methodologyPage',
    jsonb_build_object(
      'cases',
      jsonb_build_array(
        jsonb_build_object(
          'title', 'Case-Based English Development',
          'description', 'Естественное развитие английского через кейсы HBPE и English-friendly подход. На каждом занятии — бизнес-лексика из оригинальных кейсов, глоссарий и опциональная практика в Duolingo.',
          'linkText', 'Подробнее',
          'detailedDescription', 'Помимо изучения кейсов и прокачки бизнес-навыков, занятия включают мягкий English-friendly подход для слушателей с разным уровнем. Словарь расширяется через оригинальные кейсы Harvard Business Publishing Education и применяется в обсуждениях в комфортной атмосфере.',
          'keyFacts', jsonb_build_array(
            'Бизнес-лексика из оригинальных кейсов Harvard на каждом занятии',
            'Глоссарий к каждому кейсу для естественного закрепления терминов',
            'Опциональная групповая практика в Duolingo: лёгкая состязательность, поддержка, общий прогресс',
            'Это не курс английского, но снимает языковой барьер и даёт уверенность'
          ),
          'callToAction', 'Кейс-обучение естественно мотивирует улучшать английский, параллельно развивая навыки реального бизнеса.'
        )
      )
    )
  )
)
ON CONFLICT (key) DO UPDATE SET
  data = jsonb_set(
    coalesce(site_content.data, '{}'::jsonb),
    '{methodologyPage,cases}',
    coalesce(site_content.data->'methodologyPage'->'cases', '[]'::jsonb)
      || (excluded.data->'methodologyPage'->'cases'),
    true
  );

-- EN ----------------------------------------------------------------
INSERT INTO site_content (key, data)
VALUES (
  'site_content_en',
  jsonb_build_object(
    'methodologyPage',
    jsonb_build_object(
      'cases',
      jsonb_build_array(
        jsonb_build_object(
          'title', 'Case-Based English Development',
          'description', 'Natural English development through HBPE cases with an English-friendly approach for mixed proficiency groups. Each session adds business vocabulary from original cases, glossary support, and optional Duolingo team practice.',
          'linkText', 'More Info',
          'detailedDescription', 'Beyond case learning and practical business skills, our sessions include a soft, English-friendly approach designed for listeners with different proficiency levels. Students expand vocabulary through original Harvard Business Publishing Education cases, use it in discussions when they wish, and practice in a supportive environment.',
          'keyFacts', jsonb_build_array(
            'Business vocabulary from real Harvard cases in every session',
            'Dedicated glossary for each case to reinforce new terms naturally',
            'Optional group practice on Duolingo with light competition and peer support',
            'Not a formal English course, but delivers real confidence and removes the language barrier'
          ),
          'callToAction', 'Case-based learning gives a natural stimulus to improve English while mastering real business decisions.'
        )
      )
    )
  )
)
ON CONFLICT (key) DO UPDATE SET
  data = jsonb_set(
    coalesce(site_content.data, '{}'::jsonb),
    '{methodologyPage,cases}',
    coalesce(site_content.data->'methodologyPage'->'cases', '[]'::jsonb)
      || (excluded.data->'methodologyPage'->'cases'),
    true
  );

-- KZ ----------------------------------------------------------------
INSERT INTO site_content (key, data)
VALUES (
  'site_content_kz',
  jsonb_build_object(
    'methodologyPage',
    jsonb_build_object(
      'cases',
      jsonb_build_array(
        jsonb_build_object(
          'title', 'Case-Based English Development',
          'description', 'HBPE кейстері арқылы ағылшын тілін табиғи дамыту және түрлі деңгейге ыңғайлы English-friendly тәсіл. Әр сабақта — түпнұсқа кейстерден бизнес лексика, глоссарий және қалауы бойынша Duolingo-практика.',
          'linkText', 'Толығырақ',
          'detailedDescription', 'Кейс‑оқыту мен бизнес дағдыларынан бөлек, сабақтарда әртүрлі деңгейдегі тыңдаушыларға арналған жұмсақ English-friendly тәсіл қолданылады. Студенттер Harvard Business Publishing Education түпнұсқа кейстері арқылы сөздік қорын кеңейтеді және оны талқылауларда еркін қолданады.',
          'keyFacts', jsonb_build_array(
            'Әр сабақта Harvard түпнұсқа кейстерінен бизнес лексика',
            'Әр кейске арналған глоссарий – терминдерді табиғи бекіту үшін',
            'Қалауы бойынша Duolingo-топ: жеңіл жарыс, қолдау, ортақ прогресс',
            'Бұл ресми ағылшын курсы емес, бірақ тілдік кедергіні азайтып, сенімділік береді'
          ),
          'callToAction', 'Кейс‑оқыту ағылшынды табиғи түрде жақсартуға және нақты бизнес шешімдерін меңгеруге ынталандырады.'
        )
      )
    )
  )
)
ON CONFLICT (key) DO UPDATE SET
  data = jsonb_set(
    coalesce(site_content.data, '{}'::jsonb),
    '{methodologyPage,cases}',
    coalesce(site_content.data->'methodologyPage'->'cases', '[]'::jsonb)
      || (excluded.data->'methodologyPage'->'cases'),
    true
  );


