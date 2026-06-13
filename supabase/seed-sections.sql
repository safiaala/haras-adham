-- Vider les sections existantes
delete from public.sections;

-- ═══ ACCUEIL ═══
insert into public.sections (page, type, ordre, actif, data) values

('accueil', 'hero', 1, true, '{
  "badge": "L''Excellence du Cheval Barbe",
  "titre": "Passion du cheval,<br/><span style=\"font-style:normal;color:#B8943A\">art de l''élevage.</span>",
  "soustitre": "Au cœur du domaine Adham, nous cultivons l''héritage vivant de la noblesse équine marocaine. Un sanctuaire dédié à la pureté et à la performance.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCz21PkHa_pgRKYUvrZ1YpubpDD5UXf8ptpllZzgu821OgPBHCZrWV8hk4DFo7b2b2adp08bz1cmXT-7WdktTUMSpdFvmT9EIQtYhxmwnSX6OeaUz416RVf2Unvr6WNQ20Htx9w78mrBncLmHqMqVfWt7WauStImKD6cQ7e-_7HokbvkKW1tzyU8T9unDGXRQzMsTNPwQwUp6TcTBhm9VU-YqaKJljAWmqM5NRkh-hc4-T8E8MoChUq1ROuEo1eTI42zRL8vrCxAoo4",
  "boutons": [
    {"texte": "Voir nos chevaux", "href": "/chevaux", "style": "gold"},
    {"texte": "Nos étalons", "href": "/etalons", "style": "ghost"},
    {"texte": "▶ YouTube", "href": "https://www.youtube.com/@harasadham1227", "style": "ghost"}
  ],
  "translations": {
    "en": {
      "badge": "The Excellence of the Barb Horse",
      "titre": "Passion for horses,<br/><span style=\"font-style:normal;color:#B8943A\">the art of breeding.</span>",
      "soustitre": "At the heart of the Adham estate, we cultivate the living heritage of Moroccan equine nobility. A sanctuary dedicated to purity and performance.",
      "boutons": [
        {"texte": "View our horses", "href": "/chevaux", "style": "gold"},
        {"texte": "Our stallions", "href": "/etalons", "style": "ghost"},
        {"texte": "▶ YouTube", "href": "https://www.youtube.com/@harasadham1227", "style": "ghost"}
      ]
    },
    "es": {
      "badge": "La Excelencia del Caballo Barbe",
      "titre": "Pasión por los caballos,<br/><span style=\"font-style:normal;color:#B8943A\">el arte de la cría.</span>",
      "soustitre": "En el corazón del dominio Adham, cultivamos el legado vivo de la nobleza ecuestre marroquí. Un santuario dedicado a la pureza y el rendimiento.",
      "boutons": [
        {"texte": "Ver nuestros caballos", "href": "/chevaux", "style": "gold"},
        {"texte": "Nuestros sementales", "href": "/etalons", "style": "ghost"},
        {"texte": "▶ YouTube", "href": "https://www.youtube.com/@harasadham1227", "style": "ghost"}
      ]
    },
    "ar": {
      "badge": "تميز حصان البربري",
      "titre": "شغف بالخيول،<br/><span style=\"font-style:normal;color:#B8943A\">فن التربية.</span>",
      "soustitre": "في قلب ضيعة أضحام، نحرص على إحياء الإرث النبيل للخيول المغربية. ملاذ مكرس للنقاء والأداء.",
      "boutons": [
        {"texte": "مشاهدة خيولنا", "href": "/chevaux", "style": "gold"},
        {"texte": "فحولنا", "href": "/etalons", "style": "ghost"},
        {"texte": "▶ يوتيوب", "href": "https://www.youtube.com/@harasadham1227", "style": "ghost"}
      ]
    }
  }
}'),

('accueil', 'stats', 2, true, '{
  "fond": "#f0ece4",
  "stats": [
    {"nombre": "45+", "label": "Chevaux"},
    {"nombre": "5", "label": "Prestations"},
    {"nombre": "12", "label": "Titres"},
    {"nombre": "30", "label": "Boxes"}
  ],
  "translations": {
    "en": {"stats": [{"nombre": "45+", "label": "Horses"}, {"nombre": "5", "label": "Services"}, {"nombre": "12", "label": "Titles"}, {"nombre": "30", "label": "Boxes"}]},
    "es": {"stats": [{"nombre": "45+", "label": "Caballos"}, {"nombre": "5", "label": "Servicios"}, {"nombre": "12", "label": "Títulos"}, {"nombre": "30", "label": "Boxes"}]},
    "ar": {"stats": [{"nombre": "45+", "label": "خيلاً"}, {"nombre": "5", "label": "خدمات"}, {"nombre": "12", "label": "ألقاب"}, {"nombre": "30", "label": "إسطبلاً"}]}
  }
}'),

('accueil', 'texte_image', 3, true, '{
  "badge": "Héritage Marocain",
  "titre": "Le Cheval Barbe : L''essence de la fierté",
  "texte": "Au Haras Adham, nous nous consacrons à la préservation de cette race emblématique. Notre programme de sélection rigoureux honore les caractéristiques ancestrales du Barbe : endurance légendaire, intelligence rare, proximité unique avec l''homme.",
  "texte2": "Chaque naissance au haras est le fruit d''une réflexion profonde, mariant les lignées les plus prestigieuses pour faire perdurer l''art de l''élevage marocain dans toute sa splendeur.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuArzLB5DbPnf4984A-wAIhf3zUJrHeG6bQh5jFHTbtWMmywGU-SQQZYBbV7HWbcgu-BJAAiCqeG4JArDMMzKb7kihCzk4UIk9oIL22lAkzy24DAV5NX7We1XZiXT_jFLMY7tLSoNu51vww3hOfTeQebxXOauUIXkDkEQiiS_1ZalM4h0cAZsrY4lIv8BFnkfTPGBv_Vm12hr7kR4BklxyBoYgqAEzsJl4HtXH1pCFM2NR7rI6FqGvU6DfGNf3I84nBYflQvWQ2p8dlt",
  "position": "gauche",
  "fond": "#fbf9f5",
  "boutons": [
    {"texte": "Histoire du Barbe", "href": "/histoire", "style": "dark"},
    {"texte": "Nos prestations", "href": "/prestations", "style": "outline"}
  ],
  "translations": {
    "en": {
      "badge": "Moroccan Heritage",
      "titre": "The Barb Horse: The essence of pride",
      "texte": "At Haras Adham, we dedicate ourselves to preserving this emblematic breed. Our rigorous selection programme honours the ancestral characteristics of the Barb: legendary endurance, rare intelligence, unique closeness with man.",
      "texte2": "Each birth at the stud is the result of deep reflection, blending the most prestigious bloodlines to perpetuate the art of Moroccan breeding in all its splendour.",
      "boutons": [{"texte": "History of the Barb", "href": "/histoire", "style": "dark"}, {"texte": "Our services", "href": "/prestations", "style": "outline"}]
    },
    "es": {
      "badge": "Herencia Marroquí",
      "titre": "El Caballo Barbe: La esencia del orgullo",
      "texte": "En el Haras Adham, nos dedicamos a preservar esta raza emblemática. Nuestro riguroso programa de selección honra las características ancestrales del Barbe: resistencia legendaria, inteligencia excepcional, proximidad única con el hombre.",
      "texte2": "Cada nacimiento en el haras es el resultado de una profunda reflexión, combinando los linajes más prestigiosos para perpetuar el arte de la cría marroquí.",
      "boutons": [{"texte": "Historia del Barbe", "href": "/histoire", "style": "dark"}, {"texte": "Nuestros servicios", "href": "/prestations", "style": "outline"}]
    },
    "ar": {
      "badge": "التراث المغربي",
      "titre": "حصان البربري: جوهر الفخر",
      "texte": "في هراس أضحام، نكرس جهودنا للحفاظ على هذا السلالة المميزة. يُكرّم برنامج الانتقاء الصارم الخصائص الأصيلة لحصان البربري: قدرة استثنائية على التحمل، وذكاء نادر.",
      "texte2": "كل مولود في الهراس هو ثمرة تأمل عميق، يجمع بين أرقى السلالات للحفاظ على فن التربية المغربية في كامل بهائها.",
      "boutons": [{"texte": "تاريخ البربري", "href": "/histoire", "style": "dark"}, {"texte": "خدماتنا", "href": "/prestations", "style": "outline"}]
    }
  }
}'),

('accueil', 'cards', 4, true, '{
  "badge": "Services de Prestige",
  "titre": "Nos Prestations",
  "fond": "#f0ece4",
  "cards": [
    {"titre": "Vente & Conseil", "texte": "Accompagnement personnalisé dans l''acquisition de vos futurs partenaires équins. Expertise génétique.", "icone": "handshake", "fond": "white"},
    {"titre": "Pension de Luxe", "texte": "Boxes 4×4m, alimentation premium, sorties paddock. Rapport hebdomadaire photo inclus.", "icone": "home_storage", "fond": "dark"},
    {"titre": "Enseignement", "texte": "Cours individuels et stages avec cavaliers professionnels. Tous niveaux, enfants et adultes.", "icone": "school", "fond": "white"},
    {"titre": "Compétition", "texte": "Préparation sportive, coaching et engagements en concours nationaux. Transport luxe inclus.", "icone": "military_tech", "fond": "white"},
    {"titre": "Reproduction", "texte": "Saillie naturelle, IAF et IAC. Suivi poulinières, poulinage 24h/24. Export semence congelée.", "icone": "psychiatry", "fond": "white"}
  ],
  "translations": {
    "en": {
      "badge": "Prestige Services",
      "titre": "Our Services",
      "cards": [
        {"titre": "Sale & Advice", "texte": "Personalised assistance in acquiring your future equine partners. Genetic expertise.", "icone": "handshake", "fond": "white"},
        {"titre": "Luxury Livery", "texte": "4×4m boxes, premium feed, paddock turnout. Weekly photo report included.", "icone": "home_storage", "fond": "dark"},
        {"titre": "Teaching", "texte": "Individual lessons and training camps with professional riders. All levels, children and adults.", "icone": "school", "fond": "white"},
        {"titre": "Competition", "texte": "Sports preparation, coaching and entries in national competitions. Luxury transport included.", "icone": "military_tech", "fond": "white"},
        {"titre": "Reproduction", "texte": "Natural covering, AI and frozen semen. Broodmare monitoring, 24/7 foaling supervision.", "icone": "psychiatry", "fond": "white"}
      ]
    },
    "es": {
      "badge": "Servicios de Prestigio",
      "titre": "Nuestros Servicios",
      "cards": [
        {"titre": "Venta & Asesoramiento", "texte": "Acompañamiento personalizado en la adquisición de sus futuros socios ecuestres.", "icone": "handshake", "fond": "white"},
        {"titre": "Pensión de Lujo", "texte": "Boxes 4×4m, alimentación premium, salidas al paddock. Informe fotográfico semanal incluido.", "icone": "home_storage", "fond": "dark"},
        {"titre": "Enseñanza", "texte": "Clases individuales y estancias con jinetes profesionales. Todos los niveles.", "icone": "school", "fond": "white"},
        {"titre": "Competición", "texte": "Preparación deportiva, coaching y participación en concursos nacionales.", "icone": "military_tech", "fond": "white"},
        {"titre": "Reproducción", "texte": "Monta natural, IA y exportación de semen congelado. Seguimiento 24h/24.", "icone": "psychiatry", "fond": "white"}
      ]
    },
    "ar": {
      "badge": "خدمات فاخرة",
      "titre": "خدماتنا",
      "cards": [
        {"titre": "بيع واستشارة", "texte": "مرافقة شخصية في اقتناء شركاء الخيل المستقبليين. خبرة جينية.", "icone": "handshake", "fond": "white"},
        {"titre": "إيواء فاخر", "texte": "إسطبلات 4×4م، تغذية ممتازة، خروج يومي. تقرير صور أسبوعي مشمول.", "icone": "home_storage", "fond": "dark"},
        {"titre": "تعليم الفروسية", "texte": "دروس فردية وتدريبات مع فرسان محترفين. جميع المستويات.", "icone": "school", "fond": "white"},
        {"titre": "المنافسة", "texte": "تحضير رياضي وتدريب للمشاركة في المسابقات الوطنية.", "icone": "military_tech", "fond": "white"},
        {"titre": "التكاثر", "texte": "تلقيح طبيعي وصناعي. متابعة الأمهات، مراقبة المواليد 24/24.", "icone": "psychiatry", "fond": "white"}
      ]
    }
  }
}'),

('accueil', 'temoignages', 5, true, '{
  "badge": "L''avis de nos clients",
  "titre": "Témoignages",
  "fond": "#13201A",
  "temoignages": [
    {"texte": "\"Une structure d''une qualité rare. Le Haras Adham ne se contente pas de loger les chevaux, il les comprend et les sublime.\"", "nom": "Marie-Laure V.", "role": "Propriétaire & Cavalière"},
    {"texte": "\"Le suivi de la reproduction est exceptionnel. Ma poulinière a été entourée de soins constants, résultat magnifique.\"", "nom": "Jean-Baptiste R.", "role": "Éleveur Sport"},
    {"texte": "\"Transparence totale lors de l''achat. L''expertise génétique fournie était irréprochable. Accompagnement post-vente excellent.\"", "nom": "Alexander S.", "role": "Cavalier CSO"}
  ],
  "translations": {
    "en": {
      "badge": "Our clients say",
      "titre": "Testimonials",
      "temoignages": [
        {"texte": "\"A structure of rare quality. Haras Adham does not just house horses, it understands and enhances them.\"", "nom": "Marie-Laure V.", "role": "Owner & Rider"},
        {"texte": "\"The reproduction monitoring is exceptional. My broodmare received constant care, with magnificent results.\"", "nom": "Jean-Baptiste R.", "role": "Sport Breeder"},
        {"texte": "\"Total transparency during the purchase. The genetic expertise provided was impeccable. Excellent after-sales support.\"", "nom": "Alexander S.", "role": "Show Jumper"}
      ]
    },
    "es": {
      "badge": "La opinión de nuestros clientes",
      "titre": "Testimonios",
      "temoignages": [
        {"texte": "\"Una estructura de calidad excepcional. Haras Adham no se limita a alojar caballos, los comprende y los realza.\"", "nom": "Marie-Laure V.", "role": "Propietaria & Amazona"},
        {"texte": "\"El seguimiento de la reproducción es excepcional. Mi yegua recibió cuidados constantes, con resultados magníficos.\"", "nom": "Jean-Baptiste R.", "role": "Criador Deportivo"},
        {"texte": "\"Transparencia total durante la compra. La experiencia genética proporcionada fue impecable.\"", "nom": "Alexander S.", "role": "Jinete CSO"}
      ]
    },
    "ar": {
      "badge": "آراء عملائنا",
      "titre": "شهادات",
      "temoignages": [
        {"texte": "\"هيكل بجودة نادرة. هراس أضحام لا يكتفي بإيواء الخيول، بل يفهمها ويُعلي من شأنها.\"", "nom": "ماري لور ف.", "role": "مالكة وفارسة"},
        {"texte": "\"متابعة التكاثر استثنائية. حصلت فرسي على رعاية مستمرة بنتائج رائعة.\"", "nom": "جان باتيست ر.", "role": "مربي رياضي"},
        {"texte": "\"شفافية تامة أثناء الشراء. الخبرة الجينية المقدمة كانت لا تشوبها شائبة.\"", "nom": "ألكسندر س.", "role": "فارس CSO"}
      ]
    }
  }
}'),

('accueil', 'cta', 6, true, '{
  "badge": "Nous rencontrer",
  "titre": "Vivez l''expérience Adham",
  "texte": "Cavalier, investisseur ou passionné — nous vous accueillons pour une visite privée du domaine sur rendez-vous.",
  "fond": "#f0ece4",
  "lien": {"texte": "Prendre rendez-vous", "href": "/contact", "style": "dark"},
  "translations": {
    "en": {
      "badge": "Meet us",
      "titre": "Live the Adham experience",
      "texte": "Rider, investor or enthusiast — we welcome you for a private visit of the estate by appointment.",
      "lien": {"texte": "Book an appointment", "href": "/contact", "style": "dark"}
    },
    "es": {
      "badge": "Encuéntrenos",
      "titre": "Viva la experiencia Adham",
      "texte": "Jinete, inversor o apasionado — le recibimos para una visita privada del dominio con cita previa.",
      "lien": {"texte": "Reservar una cita", "href": "/contact", "style": "dark"}
    },
    "ar": {
      "badge": "قابلونا",
      "titre": "عيشوا تجربة أضحام",
      "texte": "فارس، مستثمر أو عاشق للخيول — نرحب بكم لزيارة خاصة للضيعة بموعد مسبق.",
      "lien": {"texte": "حجز موعد", "href": "/contact", "style": "dark"}
    }
  }
}'),

-- ═══ CHEVAUX ═══
('chevaux', 'hero', 1, true, '{
  "badge": "Notre Collection",
  "titre": "La Collection d''Exception",
  "soustitre": "Découvrez notre sélection de chevaux Barbe marocains, élevés avec passion et rigueur au Haras Adham.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Bdzs6F3bireBl9NK48-APTvsUSWDuW1jdLn20Q7OAXeBkInIL0OiGLinwz5TnUrIaXaacVhWGMPLvCcqQeQqrRfMesTPk6p0kFASk9lykPv22BKnptw_N9R_TsI3ffITXxh4ineBtF6vJwesVGrrNVtlfDbWNR6G-Q1SQ3Ay8LCPcA6KbPm142CWSsAR_EA1iuzIT3lzMqUN6R0_-qkJD3lRWVI-tJqIQoSGJ04XeKiikM_uisYN4AJf2BiYwuHVLaZ2GTtykaze",
  "translations": {
    "en": {"badge": "Our Collection", "titre": "The Collection of Excellence", "soustitre": "Discover our selection of Moroccan Barb horses, raised with passion and rigour at Haras Adham."},
    "es": {"badge": "Nuestra Colección", "titre": "La Colección de Excepción", "soustitre": "Descubra nuestra selección de caballos Barbe marroquíes, criados con pasión y rigor en el Haras Adham."},
    "ar": {"badge": "مجموعتنا", "titre": "مجموعة الاستثناء", "soustitre": "اكتشفوا تشكيلتنا من خيول البربري المغربية، المربّاة بشغف وصرامة في هراس أضحام."}
  }
}'),

-- ═══ ÉTALONS ═══
('etalons', 'hero', 1, true, '{
  "badge": "Les piliers du Haras",
  "titre": "Étalons d''Exception",
  "soustitre": "Des reproducteurs d''élite sélectionnés pour leurs qualités génétiques, leur palmarès et leur transmission.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Bdzs6F3bireBl9NK48-APTvsUSWDuW1jdLn20Q7OAXeBkInIL0OiGLinwz5TnUrIaXaacVhWGMPLvCcqQeQqrRfMesTPk6p0kFASk9lykPv22BKnptw_N9R_TsI3ffITXxh4ineBtF6vJwesVGrrNVtlfDbWNR6G-Q1SQ3Ay8LCPcA6KbPm142CWSsAR_EA1iuzIT3lzMqUN6R0_-qkJD3lRWVI-tJqIQoSGJ04XeKiikM_uisYN4AJf2BiYwuHVLaZ2GTtykaze",
  "translations": {
    "en": {"badge": "The pillars of the Stud", "titre": "Exceptional Stallions", "soustitre": "Elite sires selected for their genetic qualities, track record and transmission."},
    "es": {"badge": "Los pilares del Haras", "titre": "Sementales de Excepción", "soustitre": "Reproductores de élite seleccionados por sus cualidades genéticas, palmarés y transmisión."},
    "ar": {"badge": "ركائز الهراس", "titre": "فحول استثنائية", "soustitre": "فحول نخبة منتقاة لجودتها الجينية ومسيرتها وقدرتها على النقل."}
  }
}'),

-- ═══ HISTOIRE ═══
('histoire', 'hero', 1, true, '{
  "badge": "Héritage Curator Collection",
  "titre": "Le Cheval Barbe :<br/><span style=\"color:#B8943A\">L''âme du Maghreb.</span>",
  "soustitre": "Plus qu''une race, une épopée millénaire qui a façonné les plus grandes lignées équines mondiales.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBQqBUZoidIebpLPOVoeXB0tVJEcagvu_s_kX__L18LE6t0O4GtcoRmJEjPOFOeNSbwRdIGhGd19znOvWHhmCX5KD3UQm2S5CqDugAqq5zsxpAIPvu6TI9vAu7iP6R13owGJWIDF8r_WOSLb0q2NFtfRlj8SU43rMD620W3ua4JATAa3fXaQ3xfeikFSTnEdxrAIZ73EmlWIZAQLC9Vw62MWyV82qc88zcrr7oPQS37aI1M71zGL0_zauEpM0ppZWHb4uYs7XLT_GkR",
  "translations": {
    "en": {
      "badge": "Heritage Curator Collection",
      "titre": "The Barb Horse:<br/><span style=\"color:#B8943A\">The soul of the Maghreb.</span>",
      "soustitre": "More than a breed, a thousand-year epic that shaped the greatest equine bloodlines in the world."
    },
    "es": {
      "badge": "Colección Herencia",
      "titre": "El Caballo Barbe:<br/><span style=\"color:#B8943A\">El alma del Magreb.</span>",
      "soustitre": "Más que una raza, una epopeya milenaria que dio forma a los más grandes linajes ecuestres del mundo."
    },
    "ar": {
      "badge": "مجموعة التراث",
      "titre": "حصان البربري:<br/><span style=\"color:#B8943A\">روح المغرب العربي.</span>",
      "soustitre": "أكثر من سلالة، ملحمة ألفية شكّلت أعظم سلالات الخيول في العالم."
    }
  }
}'),

('histoire', 'texte', 2, true, '{
  "titre": "Origines & Histoire",
  "texte": "Le cheval Barbe est originaire du Maghreb et du Sahara septentrional. Ses ancêtres se sont forgés dans les conditions extrêmes du désert. Les peintures rupestres du Tassili n''Ajjer (~3000 av. J.-C.) témoignent de sa présence millénaire.\n\nEn 711 apr. J.-C., Tariq ibn Ziyad traverse Gibraltar avec ses Barbes et conquiert la péninsule ibérique — donnant naissance aux chevaux andalous. Au XVIe siècle, transportés vers les Amériques, leurs descendants forgent la robustesse des Mustangs.\n\nInscrit au patrimoine immatériel de l''UNESCO en 2021 avec la Tbourida, le cheval Barbe est aujourd''hui reconnu comme trésor mondial.",
  "fond": "#fbf9f5",
  "translations": {
    "en": {
      "titre": "Origins & History",
      "texte": "The Barb horse originates from the Maghreb and northern Sahara. Its ancestors were forged in the extreme conditions of the desert. The rock paintings of Tassili n''Ajjer (~3000 BC) testify to its millennial presence.\n\nIn 711 AD, Tariq ibn Ziyad crossed Gibraltar with his Barbs and conquered the Iberian Peninsula — giving birth to Andalusian horses. In the 16th century, transported to the Americas, their descendants forged the robustness of the Mustangs.\n\nInscribed on the UNESCO intangible heritage list in 2021 with Tbourida, the Barb horse is today recognised as a world treasure."
    },
    "es": {
      "titre": "Orígenes e Historia",
      "texte": "El caballo Barbe es originario del Magreb y del Sahara septentrional. Sus antepasados se forjaron en las condiciones extremas del desierto. Las pinturas rupestres del Tassili n''Ajjer (~3000 a.C.) atestiguan su presencia milenaria.\n\nEn el año 711 d.C., Tariq ibn Ziyad cruzó Gibraltar con sus Barbes y conquistó la Península Ibérica, dando origen a los caballos andaluces. En el siglo XVI, transportados a América, sus descendientes forjaron la robustez de los Mustangs."
    },
    "ar": {
      "titre": "الأصول والتاريخ",
      "texte": "ينحدر حصان البربري من المغرب العربي وشمال الصحراء. تشكّلت أصوله في الظروف القاسية للصحراء. تشهد الرسوم الصخرية في تاسيلي ناجر (~3000 ق.م.) على حضوره العريق.\n\nفي عام 711 م، عبر طارق بن زياد جبل طارق بخيوله البربرية وفتح شبه الجزيرة الإيبيرية، مما أفرز الخيول الأندلسية. في القرن السادس عشر، نُقلت ذريتها إلى أمريكا لتُشكّل متانة خيول الموستانغ."
    }
  }
}'),

-- ═══ ÉVÉNEMENTS ═══
('evenements', 'hero', 1, true, '{
  "badge": "Agenda du Haras",
  "titre": "Événements",
  "soustitre": "Moments forts de la vie du Haras : Tbourida, concours, stages et ventes aux enchères.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBb1hzn-o_4v3Ro08WfX2EOeyug5yTROqBfwrkPLN2NshRz9UZ5u9Hxs9Da5d-BGanxmwvYz5r_7X6BkVLu8_7FmXmQR_bTrpuQT7_xYaMCz8XGNjNmSD3hFv-xPClbBxj7xv2YzTcCXRggy9OUnrj44wwqYmb9QqORQZvtJk3DOf1bPpFi1fWMmiDyKvJ0Gxm78x7ljgsrXI-V8Yh_rAvpHvMdDwsdALJ-OCNhkDF7-076X6SMpB3P-jWKkl-f9jDG4_IZPKekel1K",
  "translations": {
    "en": {"badge": "Stud Agenda", "titre": "Events", "soustitre": "Key moments at the Stud: Tbourida, competitions, training camps and auctions."},
    "es": {"badge": "Agenda del Haras", "titre": "Eventos", "soustitre": "Momentos clave del Haras: Tbourida, concursos, stages y subastas."},
    "ar": {"badge": "أجندة الهراس", "titre": "الفعاليات", "soustitre": "أبرز لحظات الهراس: التبوريدة، المسابقات، الدورات التدريبية والمزادات."}
  }
}'),

-- ═══ ACTUALITÉS ═══
('actualites', 'hero', 1, true, '{
  "badge": "Du Haras",
  "titre": "Actualités",
  "soustitre": "Les dernières nouvelles, naissances, résultats de concours et événements du Haras Adham.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBQqBUZoidIebpLPOVoeXB0tVJEcagvu_s_kX__L18LE6t0O4GtcoRmJEjPOFOeNSbwRdIGhGd19znOvWHhmCX5KD3UQm2S5CqDugAqq5zsxpAIPvu6TI9vAu7iP6R13owGJWIDF8r_WOSLb0q2NFtfRlj8SU43rMD620W3ua4JATAa3fXaQ3xfeikFSTnEdxrAIZ73EmlWIZAQLC9Vw62MWyV82qc88zcrr7oPQS37aI1M71zGL0_zauEpM0ppZWHb4uYs7XLT_GkR",
  "translations": {
    "en": {"badge": "From the Stud", "titre": "News", "soustitre": "The latest news, births, competition results and events from Haras Adham."},
    "es": {"badge": "Del Haras", "titre": "Noticias", "soustitre": "Las últimas noticias, nacimientos, resultados de concursos y eventos del Haras Adham."},
    "ar": {"badge": "من الهراس", "titre": "الأخبار", "soustitre": "آخر الأخبار والمواليد ونتائج المسابقات وفعاليات هراس أضحام."}
  }
}'),

-- ═══ JOBS ═══
('jobs', 'hero', 1, true, '{
  "badge": "Rejoindre l''équipe",
  "titre": "Offres & Métiers",
  "soustitre": "Rejoignez une équipe passionnée au cœur de l''excellence équestre marocaine.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBQqBUZoidIebpLPOVoeXB0tVJEcagvu_s_kX__L18LE6t0O4GtcoRmJEjPOFOeNSbwRdIGhGd19znOvWHhmCX5KD3UQm2S5CqDugAqq5zsxpAIPvu6TI9vAu7iP6R13owGJWIDF8r_WOSLb0q2NFtfRlj8SU43rMD620W3ua4JATAa3fXaQ3xfeikFSTnEdxrAIZ73EmlWIZAQLC9Vw62MWyV82qc88zcrr7oPQS37aI1M71zGL0_zauEpM0ppZWHb4uYs7XLT_GkR",
  "translations": {
    "en": {"badge": "Join the team", "titre": "Jobs & Careers", "soustitre": "Join a passionate team at the heart of Moroccan equestrian excellence."},
    "es": {"badge": "Únase al equipo", "titre": "Ofertas & Profesiones", "soustitre": "Únase a un equipo apasionado en el corazón de la excelencia ecuestre marroquí."},
    "ar": {"badge": "انضم إلى الفريق", "titre": "عروض العمل والمهن", "soustitre": "انضم إلى فريق متحمس في قلب التميز الفروسي المغربي."}
  }
}'),

-- ═══ PRESTATIONS ═══
('prestations', 'hero', 1, true, '{
  "badge": "Excellence Équestre",
  "titre": "L''Accompagnement de Prestige",
  "soustitre": "Expertise héritée du passé, tournée vers l''avenir. Gamme complète de services pour l''épanouissement de l''athlète et le plaisir du cavalier.",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBQqBUZoidIebpLPOVoeXB0tVJEcagvu_s_kX__L18LE6t0O4GtcoRmJEjPOFOeNSbwRdIGhGd19znOvWHhmCX5KD3UQm2S5CqDugAqq5zsxpAIPvu6TI9vAu7iP6R13owGJWIDF8r_WOSLb0q2NFtfRlj8SU43rMD620W3ua4JATAa3fXaQ3xfeikFSTnEdxrAIZ73EmlWIZAQLC9Vw62MWyV82qc88zcrr7oPQS37aI1M71zGL0_zauEpM0ppZWHb4uYs7XLT_GkR",
  "translations": {
    "en": {"badge": "Equestrian Excellence", "titre": "Prestige Accompaniment", "soustitre": "Expertise inherited from the past, looking to the future. Full range of services for the athlete and rider."},
    "es": {"badge": "Excelencia Ecuestre", "titre": "Acompañamiento de Prestigio", "soustitre": "Experiencia heredada del pasado, orientada hacia el futuro. Gama completa de servicios para el atleta y el jinete."},
    "ar": {"badge": "التميز الفروسي", "titre": "المرافقة الراقية", "soustitre": "خبرة موروثة من الماضي، متجهة نحو المستقبل. مجموعة كاملة من الخدمات للرياضي والفارس."}
  }
}'),

-- ═══ CONTACT ═══
('contact', 'hero', 1, true, '{
  "badge": "Nous rejoindre",
  "titre": "Contactez-nous",
  "soustitre": "Cavalier, éleveur ou passionné — notre équipe se tient à votre disposition du lundi au samedi.",
  "image": "",
  "translations": {
    "en": {"badge": "Get in touch", "titre": "Contact Us", "soustitre": "Rider, breeder or enthusiast — our team is available Monday to Saturday."},
    "es": {"badge": "Póngase en contacto", "titre": "Contáctenos", "soustitre": "Jinete, criador o apasionado — nuestro equipo está disponible de lunes a sábado."},
    "ar": {"badge": "تواصل معنا", "titre": "اتصل بنا", "soustitre": "فارس، مربٍّ أو عاشق للخيول — فريقنا متاح من الإثنين إلى السبت."}
  }
}');
