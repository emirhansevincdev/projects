/* Footer i18n key genişletmeleri — 6 dil */
(function(){
  var _extend = {
    tr:{ft_col_platform:"Platform",ft_col_company:"Şirket",ft_col_legal:"Yasal",ft_l_hiw:"Nasıl Çalışır",ft_l_enterprise:"Kurumsal Çözümler",ft_brand_desc:"Doğrulanmış B2B ticaret ağı. Aracısız, komisyonsuz, gerçek ihracat ve ithalat bağlantıları."},
    en:{ft_col_platform:"Platform",ft_col_company:"Company",ft_col_legal:"Legal",ft_l_hiw:"How It Works",ft_l_enterprise:"Enterprise Solutions",ft_brand_desc:"Verified B2B trade network. Direct export and import connections without brokers or commissions."},
    es:{ft_col_platform:"Plataforma",ft_col_company:"Empresa",ft_col_legal:"Legal",ft_l_hiw:"Cómo Funciona",ft_l_enterprise:"Soluciones Corporativas",ft_brand_desc:"Red B2B verificada. Conexiones directas de exportación e importación sin intermediarios ni comisiones."},
    fr:{ft_col_platform:"Plateforme",ft_col_company:"Société",ft_col_legal:"Légal",ft_l_hiw:"Comment ça marche",ft_l_enterprise:"Solutions Entreprise",ft_brand_desc:"Réseau B2B vérifié. Connexions directes d'exportation et d'importation sans intermédiaires ni commissions."},
    ar:{ft_col_platform:"المنصة",ft_col_company:"الشركة",ft_col_legal:"قانوني",ft_l_hiw:"كيف يعمل",ft_l_enterprise:"حلول المؤسسات",ft_brand_desc:"شبكة تجارة B2B موثقة. اتصالات تصدير واستيراد مباشرة بدون وسطاء أو عمولات."},
    ru:{ft_col_platform:"Платформа",ft_col_company:"Компания",ft_col_legal:"Правовая информация",ft_l_hiw:"Как это работает",ft_l_enterprise:"Корпоративные решения",ft_brand_desc:"Проверенная B2B торговая сеть. Прямые экспортно-импортные связи без посредников и комиссий."}
  };
  function _apply(){
    if(typeof T === 'undefined' || !T){ setTimeout(_apply, 100); return; }
    Object.keys(_extend).forEach(function(lang){
      if(!T[lang]) T[lang] = {};
      Object.assign(T[lang], _extend[lang]);
    });
    if(typeof apply === 'function'){ try{ apply(); }catch(e){} }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _apply);
  } else { _apply(); }
})();
// =================== i18n DATA ===================
var I18N_DATA = {"countries": ["ad", "ae", "af", "ag", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "bq", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "za", "zm", "zw"], "country_i18n": {"tr": {"ad": "Andorra", "ae": "Birleşik Arap Emirlikleri", "af": "Afganistan", "ag": "Antigua ve Barbuda", "ai": "Anguilla", "al": "Arnavutluk", "am": "Ermenistan", "ao": "Angola", "aq": "Antarktika", "ar": "Arjantin", "as": "Amerikan Samoası", "at": "Avusturya", "au": "Avustralya", "aw": "Aruba", "ax": "Åland Adaları", "az": "Azerbaycan", "ba": "Bosna-Hersek", "bb": "Barbados", "bd": "Bangladeş", "be": "Belçika", "bf": "Burkina Faso", "bg": "Bulgaristan", "bh": "Bahreyn", "bi": "Burundi", "bj": "Benin", "bl": "Saint Barthelemy", "bm": "Bermuda", "bn": "Brunei", "bo": "Bolivya", "bq": "Karayip Hollandası", "br": "Brezilya", "bs": "Bahamalar", "bt": "Butan", "bv": "Bouvet Adası", "bw": "Botsvana", "by": "Belarus", "bz": "Belize", "ca": "Kanada", "cc": "Cocos (Keeling) Adaları", "cd": "Kongo - Kinşasa", "cf": "Orta Afrika Cumhuriyeti", "cg": "Kongo - Brazavil", "ch": "İsviçre", "ci": "Côte d’Ivoire", "ck": "Cook Adaları", "cl": "Şili", "cm": "Kamerun", "cn": "Çin", "co": "Kolombiya", "cr": "Kosta Rika", "cu": "Küba", "cv": "Cabo Verde", "cw": "Curaçao", "cx": "Christmas Adası", "cy": "Kıbrıs", "cz": "Çekya", "de": "Almanya", "dj": "Cibuti", "dk": "Danimarka", "dm": "Dominika", "do": "Dominik Cumhuriyeti", "dz": "Cezayir", "ec": "Ekvador", "ee": "Estonya", "eg": "Mısır", "eh": "Batı Sahra", "er": "Eritre", "es": "İspanya", "et": "Etiyopya", "fi": "Finlandiya", "fj": "Fiji", "fk": "Falkland Adaları", "fm": "Mikronezya", "fo": "Faroe Adaları", "fr": "Fransa", "ga": "Gabon", "gb": "Birleşik Krallık", "gd": "Grenada", "ge": "Gürcistan", "gf": "Fransız Guyanası", "gg": "Guernsey", "gh": "Gana", "gi": "Cebelitarık", "gl": "Grönland", "gm": "Gambiya", "gn": "Gine", "gp": "Guadeloupe", "gq": "Ekvator Ginesi", "gr": "Yunanistan", "gs": "Güney Georgia ve Güney Sandwich Adaları", "gt": "Guatemala", "gu": "Guam", "gw": "Gine-Bissau", "gy": "Guyana", "hk": "Çin Hong Kong ÖİB", "hm": "Heard Adası ve McDonald Adaları", "hn": "Honduras", "hr": "Hırvatistan", "ht": "Haiti", "hu": "Macaristan", "id": "Endonezya", "ie": "İrlanda", "il": "İsrail", "im": "Man Adası", "in": "Hindistan", "io": "Britanya Hint Okyanusu Toprakları", "iq": "Irak", "ir": "İran", "is": "İzlanda", "it": "İtalya", "je": "Jersey", "jm": "Jamaika", "jo": "Ürdün", "jp": "Japonya", "ke": "Kenya", "kg": "Kırgızistan", "kh": "Kamboçya", "ki": "Kiribati", "km": "Komorlar", "kn": "Saint Kitts ve Nevis", "kp": "Kuzey Kore", "kr": "Güney Kore", "kw": "Kuveyt", "ky": "Cayman Adaları", "kz": "Kazakistan", "la": "Laos", "lb": "Lübnan", "lc": "Saint Lucia", "li": "Liechtenstein", "lk": "Sri Lanka", "lr": "Liberya", "ls": "Lesotho", "lt": "Litvanya", "lu": "Lüksemburg", "lv": "Letonya", "ly": "Libya", "ma": "Fas", "mc": "Monako", "md": "Moldova", "me": "Karadağ", "mf": "Saint Martin", "mg": "Madagaskar", "mh": "Marshall Adaları", "mk": "Kuzey Makedonya", "ml": "Mali", "mm": "Myanmar (Burma)", "mn": "Moğolistan", "mo": "Çin Makao ÖİB", "mp": "Kuzey Mariana Adaları", "mq": "Martinik", "mr": "Moritanya", "ms": "Montserrat", "mt": "Malta", "mu": "Mauritius", "mv": "Maldivler", "mw": "Malavi", "mx": "Meksika", "my": "Malezya", "mz": "Mozambik", "na": "Namibya", "nc": "Yeni Kaledonya", "ne": "Nijer", "nf": "Norfolk Adası", "ng": "Nijerya", "ni": "Nikaragua", "nl": "Hollanda", "no": "Norveç", "np": "Nepal", "nr": "Nauru", "nu": "Niue", "nz": "Yeni Zelanda", "om": "Umman", "pa": "Panama", "pe": "Peru", "pf": "Fransız Polinezyası", "pg": "Papua Yeni Gine", "ph": "Filipinler", "pk": "Pakistan", "pl": "Polonya", "pm": "Saint Pierre ve Miquelon", "pn": "Pitcairn Adaları", "pr": "Porto Riko", "ps": "Filistin Bölgeleri", "pt": "Portekiz", "pw": "Palau", "py": "Paraguay", "qa": "Katar", "re": "Reunion", "ro": "Romanya", "rs": "Sırbistan", "ru": "Rusya", "rw": "Ruanda", "sa": "Suudi Arabistan", "sb": "Solomon Adaları", "sc": "Seyşeller", "sd": "Sudan", "se": "İsveç", "sg": "Singapur", "sh": "Saint Helena", "si": "Slovenya", "sj": "Svalbard ve Jan Mayen", "sk": "Slovakya", "sl": "Sierra Leone", "sm": "San Marino", "sn": "Senegal", "so": "Somali", "sr": "Surinam", "ss": "Güney Sudan", "st": "Sao Tome ve Principe", "sv": "El Salvador", "sx": "Sint Maarten", "sy": "Suriye", "sz": "Esvatini", "tc": "Turks ve Caicos Adaları", "td": "Çad", "tf": "Fransız Güney Toprakları", "tg": "Togo", "th": "Tayland", "tj": "Tacikistan", "tk": "Tokelau", "tl": "Timor-Leste", "tm": "Türkmenistan", "tn": "Tunus", "to": "Tonga", "tr": "Türkiye", "tt": "Trinidad ve Tobago", "tv": "Tuvalu", "tw": "Tayvan", "tz": "Tanzanya", "ua": "Ukrayna", "ug": "Uganda", "um": "ABD Küçük Harici Adaları", "us": "Amerika Birleşik Devletleri", "uy": "Uruguay", "uz": "Özbekistan", "va": "Vatikan", "vc": "Saint Vincent ve Grenadinler", "ve": "Venezuela", "vg": "Britanya Virjin Adaları", "vi": "ABD Virjin Adaları", "vn": "Vietnam", "vu": "Vanuatu", "wf": "Wallis ve Futuna", "ws": "Samoa", "ye": "Yemen", "yt": "Mayotte", "za": "Güney Afrika", "zm": "Zambiya", "zw": "Zimbabve"}, "en": {"ad": "Andorra", "ae": "United Arab Emirates", "af": "Afghanistan", "ag": "Antigua & Barbuda", "ai": "Anguilla", "al": "Albania", "am": "Armenia", "ao": "Angola", "aq": "Antarctica", "ar": "Argentina", "as": "American Samoa", "at": "Austria", "au": "Australia", "aw": "Aruba", "ax": "Åland Islands", "az": "Azerbaijan", "ba": "Bosnia & Herzegovina", "bb": "Barbados", "bd": "Bangladesh", "be": "Belgium", "bf": "Burkina Faso", "bg": "Bulgaria", "bh": "Bahrain", "bi": "Burundi", "bj": "Benin", "bl": "St. Barthélemy", "bm": "Bermuda", "bn": "Brunei", "bo": "Bolivia", "bq": "Caribbean Netherlands", "br": "Brazil", "bs": "Bahamas", "bt": "Bhutan", "bv": "Bouvet Island", "bw": "Botswana", "by": "Belarus", "bz": "Belize", "ca": "Canada", "cc": "Cocos (Keeling) Islands", "cd": "Congo - Kinshasa", "cf": "Central African Republic", "cg": "Congo - Brazzaville", "ch": "Switzerland", "ci": "Côte d’Ivoire", "ck": "Cook Islands", "cl": "Chile", "cm": "Cameroon", "cn": "China", "co": "Colombia", "cr": "Costa Rica", "cu": "Cuba", "cv": "Cape Verde", "cw": "Curaçao", "cx": "Christmas Island", "cy": "Cyprus", "cz": "Czechia", "de": "Germany", "dj": "Djibouti", "dk": "Denmark", "dm": "Dominica", "do": "Dominican Republic", "dz": "Algeria", "ec": "Ecuador", "ee": "Estonia", "eg": "Egypt", "eh": "Western Sahara", "er": "Eritrea", "es": "Spain", "et": "Ethiopia", "fi": "Finland", "fj": "Fiji", "fk": "Falkland Islands", "fm": "Micronesia", "fo": "Faroe Islands", "fr": "France", "ga": "Gabon", "gb": "United Kingdom", "gd": "Grenada", "ge": "Georgia", "gf": "French Guiana", "gg": "Guernsey", "gh": "Ghana", "gi": "Gibraltar", "gl": "Greenland", "gm": "Gambia", "gn": "Guinea", "gp": "Guadeloupe", "gq": "Equatorial Guinea", "gr": "Greece", "gs": "South Georgia & South Sandwich Islands", "gt": "Guatemala", "gu": "Guam", "gw": "Guinea-Bissau", "gy": "Guyana", "hk": "Hong Kong SAR China", "hm": "Heard & McDonald Islands", "hn": "Honduras", "hr": "Croatia", "ht": "Haiti", "hu": "Hungary", "id": "Indonesia", "ie": "Ireland", "il": "Israel", "im": "Isle of Man", "in": "India", "io": "British Indian Ocean Territory", "iq": "Iraq", "ir": "Iran", "is": "Iceland", "it": "Italy", "je": "Jersey", "jm": "Jamaica", "jo": "Jordan", "jp": "Japan", "ke": "Kenya", "kg": "Kyrgyzstan", "kh": "Cambodia", "ki": "Kiribati", "km": "Comoros", "kn": "St. Kitts & Nevis", "kp": "North Korea", "kr": "South Korea", "kw": "Kuwait", "ky": "Cayman Islands", "kz": "Kazakhstan", "la": "Laos", "lb": "Lebanon", "lc": "St. Lucia", "li": "Liechtenstein", "lk": "Sri Lanka", "lr": "Liberia", "ls": "Lesotho", "lt": "Lithuania", "lu": "Luxembourg", "lv": "Latvia", "ly": "Libya", "ma": "Morocco", "mc": "Monaco", "md": "Moldova", "me": "Montenegro", "mf": "St. Martin", "mg": "Madagascar", "mh": "Marshall Islands", "mk": "North Macedonia", "ml": "Mali", "mm": "Myanmar (Burma)", "mn": "Mongolia", "mo": "Macao SAR China", "mp": "Northern Mariana Islands", "mq": "Martinique", "mr": "Mauritania", "ms": "Montserrat", "mt": "Malta", "mu": "Mauritius", "mv": "Maldives", "mw": "Malawi", "mx": "Mexico", "my": "Malaysia", "mz": "Mozambique", "na": "Namibia", "nc": "New Caledonia", "ne": "Niger", "nf": "Norfolk Island", "ng": "Nigeria", "ni": "Nicaragua", "nl": "Netherlands", "no": "Norway", "np": "Nepal", "nr": "Nauru", "nu": "Niue", "nz": "New Zealand", "om": "Oman", "pa": "Panama", "pe": "Peru", "pf": "French Polynesia", "pg": "Papua New Guinea", "ph": "Philippines", "pk": "Pakistan", "pl": "Poland", "pm": "St. Pierre & Miquelon", "pn": "Pitcairn Islands", "pr": "Puerto Rico", "ps": "Palestinian Territories", "pt": "Portugal", "pw": "Palau", "py": "Paraguay", "qa": "Qatar", "re": "Réunion", "ro": "Romania", "rs": "Serbia", "ru": "Russia", "rw": "Rwanda", "sa": "Saudi Arabia", "sb": "Solomon Islands", "sc": "Seychelles", "sd": "Sudan", "se": "Sweden", "sg": "Singapore", "sh": "St. Helena", "si": "Slovenia", "sj": "Svalbard & Jan Mayen", "sk": "Slovakia", "sl": "Sierra Leone", "sm": "San Marino", "sn": "Senegal", "so": "Somalia", "sr": "Suriname", "ss": "South Sudan", "st": "São Tomé & Príncipe", "sv": "El Salvador", "sx": "Sint Maarten", "sy": "Syria", "sz": "Eswatini", "tc": "Turks & Caicos Islands", "td": "Chad", "tf": "French Southern Territories", "tg": "Togo", "th": "Thailand", "tj": "Tajikistan", "tk": "Tokelau", "tl": "Timor-Leste", "tm": "Turkmenistan", "tn": "Tunisia", "to": "Tonga", "tr": "Türkiye", "tt": "Trinidad & Tobago", "tv": "Tuvalu", "tw": "Taiwan", "tz": "Tanzania", "ua": "Ukraine", "ug": "Uganda", "um": "U.S. Outlying Islands", "us": "United States", "uy": "Uruguay", "uz": "Uzbekistan", "va": "Vatican City", "vc": "St. Vincent & Grenadines", "ve": "Venezuela", "vg": "British Virgin Islands", "vi": "U.S. Virgin Islands", "vn": "Vietnam", "vu": "Vanuatu", "wf": "Wallis & Futuna", "ws": "Samoa", "ye": "Yemen", "yt": "Mayotte", "za": "South Africa", "zm": "Zambia", "zw": "Zimbabwe"}, "es": {"ad": "Andorra", "ae": "Emiratos Árabes Unidos", "af": "Afganistán", "ag": "Antigua y Barbuda", "ai": "Anguila", "al": "Albania", "am": "Armenia", "ao": "Angola", "aq": "Antártida", "ar": "Argentina", "as": "Samoa Americana", "at": "Austria", "au": "Australia", "aw": "Aruba", "ax": "Islas Aland", "az": "Azerbaiyán", "ba": "Bosnia y Herzegovina", "bb": "Barbados", "bd": "Bangladés", "be": "Bélgica", "bf": "Burkina Faso", "bg": "Bulgaria", "bh": "Baréin", "bi": "Burundi", "bj": "Benín", "bl": "San Bartolomé", "bm": "Bermudas", "bn": "Brunéi", "bo": "Bolivia", "bq": "Caribe neerlandés", "br": "Brasil", "bs": "Bahamas", "bt": "Bután", "bv": "Isla Bouvet", "bw": "Botsuana", "by": "Bielorrusia", "bz": "Belice", "ca": "Canadá", "cc": "Islas Cocos", "cd": "República Democrática del Congo", "cf": "República Centroafricana", "cg": "Congo", "ch": "Suiza", "ci": "Côte d’Ivoire", "ck": "Islas Cook", "cl": "Chile", "cm": "Camerún", "cn": "China", "co": "Colombia", "cr": "Costa Rica", "cu": "Cuba", "cv": "Cabo Verde", "cw": "Curazao", "cx": "Isla de Navidad", "cy": "Chipre", "cz": "Chequia", "de": "Alemania", "dj": "Yibuti", "dk": "Dinamarca", "dm": "Dominica", "do": "República Dominicana", "dz": "Argelia", "ec": "Ecuador", "ee": "Estonia", "eg": "Egipto", "eh": "Sáhara Occidental", "er": "Eritrea", "es": "España", "et": "Etiopía", "fi": "Finlandia", "fj": "Fiyi", "fk": "Islas Malvinas", "fm": "Micronesia", "fo": "Islas Feroe", "fr": "Francia", "ga": "Gabón", "gb": "Reino Unido", "gd": "Granada", "ge": "Georgia", "gf": "Guayana Francesa", "gg": "Guernesey", "gh": "Ghana", "gi": "Gibraltar", "gl": "Groenlandia", "gm": "Gambia", "gn": "Guinea", "gp": "Guadalupe", "gq": "Guinea Ecuatorial", "gr": "Grecia", "gs": "Islas Georgia del Sur y Sandwich del Sur", "gt": "Guatemala", "gu": "Guam", "gw": "Guinea-Bisáu", "gy": "Guyana", "hk": "RAE de Hong Kong (China)", "hm": "Islas Heard y McDonald", "hn": "Honduras", "hr": "Croacia", "ht": "Haití", "hu": "Hungría", "id": "Indonesia", "ie": "Irlanda", "il": "Israel", "im": "Isla de Man", "in": "India", "io": "Territorio Británico del Océano Índico", "iq": "Irak", "ir": "Irán", "is": "Islandia", "it": "Italia", "je": "Jersey", "jm": "Jamaica", "jo": "Jordania", "jp": "Japón", "ke": "Kenia", "kg": "Kirguistán", "kh": "Camboya", "ki": "Kiribati", "km": "Comoras", "kn": "San Cristóbal y Nieves", "kp": "Corea del Norte", "kr": "Corea del Sur", "kw": "Kuwait", "ky": "Islas Caimán", "kz": "Kazajistán", "la": "Laos", "lb": "Líbano", "lc": "Santa Lucía", "li": "Liechtenstein", "lk": "Sri Lanka", "lr": "Liberia", "ls": "Lesoto", "lt": "Lituania", "lu": "Luxemburgo", "lv": "Letonia", "ly": "Libia", "ma": "Marruecos", "mc": "Mónaco", "md": "Moldavia", "me": "Montenegro", "mf": "San Martín", "mg": "Madagascar", "mh": "Islas Marshall", "mk": "Macedonia del Norte", "ml": "Mali", "mm": "Myanmar (Birmania)", "mn": "Mongolia", "mo": "RAE de Macao (China)", "mp": "Islas Marianas del Norte", "mq": "Martinica", "mr": "Mauritania", "ms": "Montserrat", "mt": "Malta", "mu": "Mauricio", "mv": "Maldivas", "mw": "Malaui", "mx": "México", "my": "Malasia", "mz": "Mozambique", "na": "Namibia", "nc": "Nueva Caledonia", "ne": "Níger", "nf": "Isla Norfolk", "ng": "Nigeria", "ni": "Nicaragua", "nl": "Países Bajos", "no": "Noruega", "np": "Nepal", "nr": "Nauru", "nu": "Niue", "nz": "Nueva Zelanda", "om": "Omán", "pa": "Panamá", "pe": "Perú", "pf": "Polinesia Francesa", "pg": "Papúa Nueva Guinea", "ph": "Filipinas", "pk": "Pakistán", "pl": "Polonia", "pm": "San Pedro y Miquelón", "pn": "Islas Pitcairn", "pr": "Puerto Rico", "ps": "Territorios Palestinos", "pt": "Portugal", "pw": "Palaos", "py": "Paraguay", "qa": "Catar", "re": "Reunión", "ro": "Rumanía", "rs": "Serbia", "ru": "Rusia", "rw": "Ruanda", "sa": "Arabia Saudí", "sb": "Islas Salomón", "sc": "Seychelles", "sd": "Sudán", "se": "Suecia", "sg": "Singapur", "sh": "Santa Elena", "si": "Eslovenia", "sj": "Svalbard y Jan Mayen", "sk": "Eslovaquia", "sl": "Sierra Leona", "sm": "San Marino", "sn": "Senegal", "so": "Somalia", "sr": "Surinam", "ss": "Sudán del Sur", "st": "Santo Tomé y Príncipe", "sv": "El Salvador", "sx": "Sint Maarten", "sy": "Siria", "sz": "Esuatini", "tc": "Islas Turcas y Caicos", "td": "Chad", "tf": "Territorios Australes Franceses", "tg": "Togo", "th": "Tailandia", "tj": "Tayikistán", "tk": "Tokelau", "tl": "Timor-Leste", "tm": "Turkmenistán", "tn": "Túnez", "to": "Tonga", "tr": "Turquía", "tt": "Trinidad y Tobago", "tv": "Tuvalu", "tw": "Taiwán", "tz": "Tanzania", "ua": "Ucrania", "ug": "Uganda", "um": "Islas menores alejadas de EE. UU.", "us": "Estados Unidos", "uy": "Uruguay", "uz": "Uzbekistán", "va": "Ciudad del Vaticano", "vc": "San Vicente y las Granadinas", "ve": "Venezuela", "vg": "Islas Vírgenes Británicas", "vi": "Islas Vírgenes de EE. UU.", "vn": "Vietnam", "vu": "Vanuatu", "wf": "Wallis y Futuna", "ws": "Samoa", "ye": "Yemen", "yt": "Mayotte", "za": "Sudáfrica", "zm": "Zambia", "zw": "Zimbabue"}, "fr": {"ad": "Andorre", "ae": "Émirats arabes unis", "af": "Afghanistan", "ag": "Antigua-et-Barbuda", "ai": "Anguilla", "al": "Albanie", "am": "Arménie", "ao": "Angola", "aq": "Antarctique", "ar": "Argentine", "as": "Samoa américaines", "at": "Autriche", "au": "Australie", "aw": "Aruba", "ax": "Îles Åland", "az": "Azerbaïdjan", "ba": "Bosnie-Herzégovine", "bb": "Barbade", "bd": "Bangladesh", "be": "Belgique", "bf": "Burkina Faso", "bg": "Bulgarie", "bh": "Bahreïn", "bi": "Burundi", "bj": "Bénin", "bl": "Saint-Barthélemy", "bm": "Bermudes", "bn": "Brunei", "bo": "Bolivie", "bq": "Pays-Bas caribéens", "br": "Brésil", "bs": "Bahamas", "bt": "Bhoutan", "bv": "Île Bouvet", "bw": "Botswana", "by": "Biélorussie", "bz": "Belize", "ca": "Canada", "cc": "Îles Cocos", "cd": "Congo-Kinshasa", "cf": "République centrafricaine", "cg": "Congo-Brazzaville", "ch": "Suisse", "ci": "Côte d’Ivoire", "ck": "Îles Cook", "cl": "Chili", "cm": "Cameroun", "cn": "Chine", "co": "Colombie", "cr": "Costa Rica", "cu": "Cuba", "cv": "Cap-Vert", "cw": "Curaçao", "cx": "Île Christmas", "cy": "Chypre", "cz": "Tchéquie", "de": "Allemagne", "dj": "Djibouti", "dk": "Danemark", "dm": "Dominique", "do": "République dominicaine", "dz": "Algérie", "ec": "Équateur", "ee": "Estonie", "eg": "Égypte", "eh": "Sahara occidental", "er": "Érythrée", "es": "Espagne", "et": "Éthiopie", "fi": "Finlande", "fj": "Fidji", "fk": "Îles Malouines", "fm": "Micronésie", "fo": "Îles Féroé", "fr": "France", "ga": "Gabon", "gb": "Royaume-Uni", "gd": "Grenade", "ge": "Géorgie", "gf": "Guyane française", "gg": "Guernesey", "gh": "Ghana", "gi": "Gibraltar", "gl": "Groenland", "gm": "Gambie", "gn": "Guinée", "gp": "Guadeloupe", "gq": "Guinée équatoriale", "gr": "Grèce", "gs": "Géorgie du Sud-et-les Îles Sandwich du Sud", "gt": "Guatemala", "gu": "Guam", "gw": "Guinée-Bissau", "gy": "Guyana", "hk": "R.A.S. chinoise de Hong Kong", "hm": "Îles Heard-et-MacDonald", "hn": "Honduras", "hr": "Croatie", "ht": "Haïti", "hu": "Hongrie", "id": "Indonésie", "ie": "Irlande", "il": "Israël", "im": "Île de Man", "in": "Inde", "io": "Territoire britannique de l’océan Indien", "iq": "Irak", "ir": "Iran", "is": "Islande", "it": "Italie", "je": "Jersey", "jm": "Jamaïque", "jo": "Jordanie", "jp": "Japon", "ke": "Kenya", "kg": "Kirghizstan", "kh": "Cambodge", "ki": "Kiribati", "km": "Comores", "kn": "Saint-Christophe-et-Niévès", "kp": "Corée du Nord", "kr": "Corée du Sud", "kw": "Koweït", "ky": "Îles Caïmans", "kz": "Kazakhstan", "la": "Laos", "lb": "Liban", "lc": "Sainte-Lucie", "li": "Liechtenstein", "lk": "Sri Lanka", "lr": "Liberia", "ls": "Lesotho", "lt": "Lituanie", "lu": "Luxembourg", "lv": "Lettonie", "ly": "Libye", "ma": "Maroc", "mc": "Monaco", "md": "Moldavie", "me": "Monténégro", "mf": "Saint-Martin", "mg": "Madagascar", "mh": "Îles Marshall", "mk": "Macédoine du Nord", "ml": "Mali", "mm": "Myanmar (Birmanie)", "mn": "Mongolie", "mo": "R.A.S. chinoise de Macao", "mp": "Îles Mariannes du Nord", "mq": "Martinique", "mr": "Mauritanie", "ms": "Montserrat", "mt": "Malte", "mu": "Maurice", "mv": "Maldives", "mw": "Malawi", "mx": "Mexique", "my": "Malaisie", "mz": "Mozambique", "na": "Namibie", "nc": "Nouvelle-Calédonie", "ne": "Niger", "nf": "Île Norfolk", "ng": "Nigeria", "ni": "Nicaragua", "nl": "Pays-Bas", "no": "Norvège", "np": "Népal", "nr": "Nauru", "nu": "Niue", "nz": "Nouvelle-Zélande", "om": "Oman", "pa": "Panama", "pe": "Pérou", "pf": "Polynésie française", "pg": "Papouasie-Nouvelle-Guinée", "ph": "Philippines", "pk": "Pakistan", "pl": "Pologne", "pm": "Saint-Pierre-et-Miquelon", "pn": "Îles Pitcairn", "pr": "Porto Rico", "ps": "Territoires palestiniens", "pt": "Portugal", "pw": "Palaos", "py": "Paraguay", "qa": "Qatar", "re": "La Réunion", "ro": "Roumanie", "rs": "Serbie", "ru": "Russie", "rw": "Rwanda", "sa": "Arabie saoudite", "sb": "Îles Salomon", "sc": "Seychelles", "sd": "Soudan", "se": "Suède", "sg": "Singapour", "sh": "Sainte-Hélène", "si": "Slovénie", "sj": "Svalbard et Jan Mayen", "sk": "Slovaquie", "sl": "Sierra Leone", "sm": "Saint-Marin", "sn": "Sénégal", "so": "Somalie", "sr": "Suriname", "ss": "Soudan du Sud", "st": "Sao Tomé-et-Principe", "sv": "Salvador", "sx": "Saint-Martin (partie néerlandaise)", "sy": "Syrie", "sz": "Eswatini", "tc": "Îles Turques-et-Caïques", "td": "Tchad", "tf": "Terres australes françaises", "tg": "Togo", "th": "Thaïlande", "tj": "Tadjikistan", "tk": "Tokelau", "tl": "Timor oriental", "tm": "Turkménistan", "tn": "Tunisie", "to": "Tonga", "tr": "Turquie", "tt": "Trinité-et-Tobago", "tv": "Tuvalu", "tw": "Taïwan", "tz": "Tanzanie", "ua": "Ukraine", "ug": "Ouganda", "um": "Îles mineures éloignées des États-Unis", "us": "États-Unis", "uy": "Uruguay", "uz": "Ouzbékistan", "va": "État de la Cité du Vatican", "vc": "Saint-Vincent-et-les Grenadines", "ve": "Venezuela", "vg": "Îles Vierges britanniques", "vi": "Îles Vierges des États-Unis", "vn": "Viêt Nam", "vu": "Vanuatu", "wf": "Wallis-et-Futuna", "ws": "Samoa", "ye": "Yémen", "yt": "Mayotte", "za": "Afrique du Sud", "zm": "Zambie", "zw": "Zimbabwe"}, "ar": {"ad": "أندورا", "ae": "الإمارات العربية المتحدة", "af": "أفغانستان", "ag": "أنتيغوا وبربودا", "ai": "أنغويلا", "al": "ألبانيا", "am": "أرمينيا", "ao": "أنغولا", "aq": "أنتاركتيكا", "ar": "الأرجنتين", "as": "ساموا الأمريكية", "at": "النمسا", "au": "أستراليا", "aw": "أروبا", "ax": "جزر آلاند", "az": "أذربيجان", "ba": "البوسنة والهرسك", "bb": "بربادوس", "bd": "بنغلاديش", "be": "بلجيكا", "bf": "بوركينا فاسو", "bg": "بلغاريا", "bh": "البحرين", "bi": "بوروندي", "bj": "بنين", "bl": "سان بارتليمي", "bm": "برمودا", "bn": "بروناي", "bo": "بوليفيا", "bq": "هولندا الكاريبية", "br": "البرازيل", "bs": "جزر البهاما", "bt": "بوتان", "bv": "جزيرة بوفيه", "bw": "بوتسوانا", "by": "بيلاروس", "bz": "بليز", "ca": "كندا", "cc": "جزر كوكوس (كيلينغ)", "cd": "الكونغو - كينشاسا", "cf": "جمهورية أفريقيا الوسطى", "cg": "الكونغو - برازافيل", "ch": "سويسرا", "ci": "ساحل العاج", "ck": "جزر كوك", "cl": "تشيلي", "cm": "الكاميرون", "cn": "الصين", "co": "كولومبيا", "cr": "كوستاريكا", "cu": "كوبا", "cv": "الرأس الأخضر", "cw": "كوراساو", "cx": "جزيرة كريسماس", "cy": "قبرص", "cz": "التشيك", "de": "ألمانيا", "dj": "جيبوتي", "dk": "الدانمرك", "dm": "دومينيكا", "do": "جمهورية الدومينيكان", "dz": "الجزائر", "ec": "الإكوادور", "ee": "إستونيا", "eg": "مصر", "eh": "الصحراء الغربية", "er": "إريتريا", "es": "إسبانيا", "et": "إثيوبيا", "fi": "فنلندا", "fj": "فيجي", "fk": "جزر فوكلاند", "fm": "ميكرونيزيا", "fo": "جزر فارو", "fr": "فرنسا", "ga": "الغابون", "gb": "المملكة المتحدة", "gd": "غرينادا", "ge": "جورجيا", "gf": "غويانا الفرنسية", "gg": "غيرنزي", "gh": "غانا", "gi": "جبل طارق", "gl": "غرينلاند", "gm": "غامبيا", "gn": "غينيا", "gp": "غوادلوب", "gq": "غينيا الاستوائية", "gr": "اليونان", "gs": "جورجيا الجنوبية وجزر ساندويتش الجنوبية", "gt": "غواتيمالا", "gu": "غوام", "gw": "غينيا بيساو", "gy": "غيانا", "hk": "هونغ كونغ الصينية (منطقة إدارية خاصة)", "hm": "جزيرة هيرد وجزر ماكدونالد", "hn": "هندوراس", "hr": "كرواتيا", "ht": "هايتي", "hu": "هنغاريا", "id": "إندونيسيا", "ie": "أيرلندا", "il": "إسرائيل", "im": "جزيرة مان", "in": "الهند", "io": "الإقليم البريطاني في المحيط الهندي", "iq": "العراق", "ir": "إيران", "is": "آيسلندا", "it": "إيطاليا", "je": "جيرسي", "jm": "جامايكا", "jo": "الأردن", "jp": "اليابان", "ke": "كينيا", "kg": "قيرغيزستان", "kh": "كمبوديا", "ki": "كيريباتي", "km": "جزر القمر", "kn": "سانت كيتس ونيفيس", "kp": "كوريا الشمالية", "kr": "كوريا الجنوبية", "kw": "الكويت", "ky": "جزر كايمان", "kz": "كازاخستان", "la": "لاوس", "lb": "لبنان", "lc": "سانت لوسيا", "li": "ليختنشتاين", "lk": "سريلانكا", "lr": "ليبيريا", "ls": "ليسوتو", "lt": "ليتوانيا", "lu": "لوكسمبورغ", "lv": "لاتفيا", "ly": "ليبيا", "ma": "المغرب", "mc": "موناكو", "md": "مولدوفا", "me": "الجبل الأسود", "mf": "سان مارتن", "mg": "مدغشقر", "mh": "جزر مارشال", "mk": "مقدونيا الشمالية", "ml": "مالي", "mm": "ميانمار (بورما)", "mn": "منغوليا", "mo": "منطقة ماكاو الإدارية الخاصة", "mp": "جزر ماريانا الشمالية", "mq": "جزر المارتينيك", "mr": "موريتانيا", "ms": "مونتسرات", "mt": "مالطا", "mu": "موريشيوس", "mv": "جزر المالديف", "mw": "ملاوي", "mx": "المكسيك", "my": "ماليزيا", "mz": "موزمبيق", "na": "ناميبيا", "nc": "كاليدونيا الجديدة", "ne": "النيجر", "nf": "جزيرة نورفولك", "ng": "نيجيريا", "ni": "نيكاراغوا", "nl": "هولندا", "no": "النرويج", "np": "نيبال", "nr": "ناورو", "nu": "نيوي", "nz": "نيوزيلندا", "om": "عُمان", "pa": "بنما", "pe": "بيرو", "pf": "بولينيزيا الفرنسية", "pg": "بابوا غينيا الجديدة", "ph": "الفلبين", "pk": "باكستان", "pl": "بولندا", "pm": "سان بيير ومكويلون", "pn": "جزر بيتكيرن", "pr": "بورتوريكو", "ps": "الأراضي الفلسطينية", "pt": "البرتغال", "pw": "بالاو", "py": "باراغواي", "qa": "قطر", "re": "روينيون", "ro": "رومانيا", "rs": "صربيا", "ru": "روسيا", "rw": "رواندا", "sa": "المملكة العربية السعودية", "sb": "جزر سليمان", "sc": "سيشل", "sd": "السودان", "se": "السويد", "sg": "سنغافورة", "sh": "سانت هيلينا", "si": "سلوفينيا", "sj": "سفالبارد وجان ماين", "sk": "سلوفاكيا", "sl": "سيراليون", "sm": "سان مارينو", "sn": "السنغال", "so": "الصومال", "sr": "سورينام", "ss": "جنوب السودان", "st": "ساو تومي وبرينسيبي", "sv": "السلفادور", "sx": "سانت مارتن", "sy": "سوريا", "sz": "إسواتيني", "tc": "جزر توركس وكايكوس", "td": "تشاد", "tf": "الأقاليم الجنوبية الفرنسية", "tg": "توغو", "th": "تايلاند", "tj": "طاجيكستان", "tk": "توكيلاو", "tl": "تيمور - ليشتي", "tm": "تركمانستان", "tn": "تونس", "to": "تونغا", "tr": "تركيا", "tt": "ترينيداد وتوباغو", "tv": "توفالو", "tw": "تايوان", "tz": "تنزانيا", "ua": "أوكرانيا", "ug": "أوغندا", "um": "جزر الولايات المتحدة النائية", "us": "الولايات المتحدة", "uy": "أورغواي", "uz": "أوزبكستان", "va": "الفاتيكان", "vc": "سانت فنسنت وجزر غرينادين", "ve": "فنزويلا", "vg": "جزر فيرجن البريطانية", "vi": "جزر فيرجن الأمريكية", "vn": "فيتنام", "vu": "فانواتو", "wf": "جزر والس وفوتونا", "ws": "ساموا", "ye": "اليمن", "yt": "مايوت", "za": "جنوب أفريقيا", "zm": "زامبيا", "zw": "زيمبابوي"}, "ru": {"ad": "Андорра", "ae": "ОАЭ", "af": "Афганистан", "ag": "Антигуа и Барбуда", "ai": "Ангилья", "al": "Албания", "am": "Армения", "ao": "Ангола", "aq": "Антарктида", "ar": "Аргентина", "as": "Американское Самоа", "at": "Австрия", "au": "Австралия", "aw": "Аруба", "ax": "Аландские о-ва", "az": "Азербайджан", "ba": "Босния и Герцеговина", "bb": "Барбадос", "bd": "Бангладеш", "be": "Бельгия", "bf": "Буркина-Фасо", "bg": "Болгария", "bh": "Бахрейн", "bi": "Бурунди", "bj": "Бенин", "bl": "Сен-Бартелеми", "bm": "Бермудские о-ва", "bn": "Бруней", "bo": "Боливия", "bq": "Бонэйр, Синт-Эстатиус и Саба", "br": "Бразилия", "bs": "Багамы", "bt": "Бутан", "bv": "о-в Буве", "bw": "Ботсвана", "by": "Беларусь", "bz": "Белиз", "ca": "Канада", "cc": "Кокосовые о-ва", "cd": "Конго - Киншаса", "cf": "Центрально-Африканская Республика", "cg": "Конго - Браззавиль", "ch": "Швейцария", "ci": "Кот-д’Ивуар", "ck": "о-ва Кука", "cl": "Чили", "cm": "Камерун", "cn": "Китай", "co": "Колумбия", "cr": "Коста-Рика", "cu": "Куба", "cv": "Кабо-Верде", "cw": "Кюрасао", "cx": "о-в Рождества", "cy": "Кипр", "cz": "Чехия", "de": "Германия", "dj": "Джибути", "dk": "Дания", "dm": "Доминика", "do": "Доминиканская Республика", "dz": "Алжир", "ec": "Эквадор", "ee": "Эстония", "eg": "Египет", "eh": "Западная Сахара", "er": "Эритрея", "es": "Испания", "et": "Эфиопия", "fi": "Финляндия", "fj": "Фиджи", "fk": "Фолклендские о-ва", "fm": "Федеративные Штаты Микронезии", "fo": "Фарерские о-ва", "fr": "Франция", "ga": "Габон", "gb": "Великобритания", "gd": "Гренада", "ge": "Грузия", "gf": "Французская Гвиана", "gg": "Гернси", "gh": "Гана", "gi": "Гибралтар", "gl": "Гренландия", "gm": "Гамбия", "gn": "Гвинея", "gp": "Гваделупа", "gq": "Экваториальная Гвинея", "gr": "Греция", "gs": "Южная Георгия и Южные Сандвичевы о-ва", "gt": "Гватемала", "gu": "Гуам", "gw": "Гвинея-Бисау", "gy": "Гайана", "hk": "Гонконг (САР)", "hm": "о-ва Херд и Макдональд", "hn": "Гондурас", "hr": "Хорватия", "ht": "Гаити", "hu": "Венгрия", "id": "Индонезия", "ie": "Ирландия", "il": "Израиль", "im": "о-в Мэн", "in": "Индия", "io": "Британская территория в Индийском океане", "iq": "Ирак", "ir": "Иран", "is": "Исландия", "it": "Италия", "je": "Джерси", "jm": "Ямайка", "jo": "Иордания", "jp": "Япония", "ke": "Кения", "kg": "Киргизия", "kh": "Камбоджа", "ki": "Кирибати", "km": "Коморы", "kn": "Сент-Китс и Невис", "kp": "КНДР", "kr": "Республика Корея", "kw": "Кувейт", "ky": "о-ва Кайман", "kz": "Казахстан", "la": "Лаос", "lb": "Ливан", "lc": "Сент-Люсия", "li": "Лихтенштейн", "lk": "Шри-Ланка", "lr": "Либерия", "ls": "Лесото", "lt": "Литва", "lu": "Люксембург", "lv": "Латвия", "ly": "Ливия", "ma": "Марокко", "mc": "Монако", "md": "Молдова", "me": "Черногория", "mf": "Сен-Мартен", "mg": "Мадагаскар", "mh": "Маршалловы о-ва", "mk": "Северная Македония", "ml": "Мали", "mm": "Мьянма (Бирма)", "mn": "Монголия", "mo": "Макао (САР)", "mp": "Северные Марианские о-ва", "mq": "Мартиника", "mr": "Мавритания", "ms": "Монтсеррат", "mt": "Мальта", "mu": "Маврикий", "mv": "Мальдивы", "mw": "Малави", "mx": "Мексика", "my": "Малайзия", "mz": "Мозамбик", "na": "Намибия", "nc": "Новая Каледония", "ne": "Нигер", "nf": "о-в Норфолк", "ng": "Нигерия", "ni": "Никарагуа", "nl": "Нидерланды", "no": "Норвегия", "np": "Непал", "nr": "Науру", "nu": "Ниуэ", "nz": "Новая Зеландия", "om": "Оман", "pa": "Панама", "pe": "Перу", "pf": "Французская Полинезия", "pg": "Папуа — Новая Гвинея", "ph": "Филиппины", "pk": "Пакистан", "pl": "Польша", "pm": "Сен-Пьер и Микелон", "pn": "о-ва Питкэрн", "pr": "Пуэрто-Рико", "ps": "Палестинские территории", "pt": "Португалия", "pw": "Палау", "py": "Парагвай", "qa": "Катар", "re": "Реюньон", "ro": "Румыния", "rs": "Сербия", "ru": "Россия", "rw": "Руанда", "sa": "Саудовская Аравия", "sb": "Соломоновы о-ва", "sc": "Сейшельские о-ва", "sd": "Судан", "se": "Швеция", "sg": "Сингапур", "sh": "о-в Св. Елены", "si": "Словения", "sj": "Шпицберген и Ян-Майен", "sk": "Словакия", "sl": "Сьерра-Леоне", "sm": "Сан-Марино", "sn": "Сенегал", "so": "Сомали", "sr": "Суринам", "ss": "Южный Судан", "st": "Сан-Томе и Принсипи", "sv": "Сальвадор", "sx": "Синт-Мартен", "sy": "Сирия", "sz": "Эсватини", "tc": "Тёркс и Кайкос", "td": "Чад", "tf": "Французские Южные территории", "tg": "Того", "th": "Таиланд", "tj": "Таджикистан", "tk": "Токелау", "tl": "Восточный Тимор", "tm": "Туркменистан", "tn": "Тунис", "to": "Тонга", "tr": "Турция", "tt": "Тринидад и Тобаго", "tv": "Тувалу", "tw": "Тайвань", "tz": "Танзания", "ua": "Украина", "ug": "Уганда", "um": "Внешние малые о-ва (США)", "us": "Соединенные Штаты", "uy": "Уругвай", "uz": "Узбекистан", "va": "Ватикан", "vc": "Сент-Винсент и Гренадины", "ve": "Венесуэла", "vg": "Виргинские о-ва (Великобритания)", "vi": "Виргинские о-ва (США)", "vn": "Вьетнам", "vu": "Вануату", "wf": "Уоллис и Футуна", "ws": "Самоа", "ye": "Йемен", "yt": "Майотта", "za": "Южно-Африканская Республика", "zm": "Замбия", "zw": "Зимбабве"}}, "sectors": {"tr": ["Hububat, Bakliyat, Yağlı Tohumlar", "Yaş Meyve ve Sebze", "Meyve Sebze Mamulleri", "Kuru Meyve", "Fındık", "Zeytin ve Zeytinyağı", "Tütün", "Süs Bitkileri", "Su Ürünleri ve Hayvansal", "Mobilya, Kağıt ve Orman Ür.", "Tekstil ve Hammaddeleri", "Deri ve Deri Mamulleri", "Halı", "Kimyevi Maddeler ve Mam.", "Hazırgiyim ve Konfeksiyon", "Otomotiv", "Gemi ve Yat", "Elektrik-Elektronik", "Makine ve Aksamları", "Demir ve Demir Dışı Metaller", "Çelik", "Çimento Cam Seramik", "Mücevher", "Savunma ve Havacılık", "İklimlendirme", "Madencilik"], "en": ["Grains, Pulses, Oilseeds", "Fresh Fruit & Vegetables", "Processed Fruit & Vegetables", "Dried Fruit", "Hazelnuts & Nuts", "Olives & Olive Oil", "Tobacco", "Ornamental Plants", "Seafood & Livestock", "Furniture, Paper & Forest Products", "Textiles & Raw Materials", "Leather & Leather Products", "Carpets", "Chemicals & Products", "Apparel & Ready-Wear", "Automotive", "Ships & Yachts", "Electrical-Electronics", "Machinery & Components", "Ferrous & Non-Ferrous Metals", "Steel", "Cement, Glass, Ceramics", "Jewellery", "Defense & Aerospace", "HVAC", "Mining"], "es": ["Cereales, Legumbres, Oleaginosas", "Frutas y Verduras Frescas", "Frutas y Verduras Procesadas", "Fruta Seca", "Avellanas y Frutos Secos", "Aceitunas y Aceite de Oliva", "Tabaco", "Plantas Ornamentales", "Pescado y Ganado", "Muebles, Papel y Productos Forestales", "Textiles y Materias Primas", "Cuero y Productos de Cuero", "Alfombras", "Químicos y Productos", "Confección y Prendas", "Automoción", "Buques y Yates", "Eléctrico-Electrónica", "Maquinaria y Componentes", "Metales Ferrosos y No Ferrosos", "Acero", "Cemento, Vidrio, Cerámica", "Joyería", "Defensa y Aeroespacial", "HVAC / Climatización", "Minería"], "fr": ["Céréales, Légumineuses, Oléagineux", "Fruits & Légumes Frais", "Fruits & Légumes Transformés", "Fruits Secs", "Noisettes & Fruits à Coque", "Olives & Huile d'Olive", "Tabac", "Plantes Ornementales", "Produits de la Mer & Élevage", "Meubles, Papier & Produits Forestiers", "Textiles & Matières Premières", "Cuir & Articles en Cuir", "Tapis", "Produits Chimiques", "Prêt-à-Porter & Confection", "Automobile", "Navires & Yachts", "Électrique-Électronique", "Machines & Composants", "Métaux Ferreux & Non Ferreux", "Acier", "Ciment, Verre, Céramique", "Bijouterie", "Défense & Aérospatiale", "CVC / Climatisation", "Mines & Extraction"], "ar": ["الحبوب والبقوليات والزيوت", "الفواكه والخضروات الطازجة", "المنتجات المصنعة من الفواكه والخضروات", "الفواكه المجففة", "البندق والمكسرات", "الزيتون وزيت الزيتون", "التبغ", "نباتات الزينة", "المأكولات البحرية والماشية", "الأثاث والورق ومنتجات الغابات", "المنسوجات والمواد الخام", "الجلود ومنتجاتها", "السجاد", "المواد الكيميائية والمنتجات", "الملابس الجاهزة", "السيارات", "السفن واليخوت", "الكهرباء والإلكترونيات", "الآلات والمكونات", "المعادن الحديدية وغير الحديدية", "الصلب", "الأسمنت والزجاج والسيراميك", "المجوهرات", "الدفاع والفضاء", "التكييف", "التعدين"], "ru": ["Зерновые, бобовые, масличные", "Свежие фрукты и овощи", "Переработанные фрукты и овощи", "Сухофрукты", "Орехи", "Оливки и оливковое масло", "Табак", "Декоративные растения", "Морепродукты и животноводство", "Мебель, бумага и лесная продукция", "Текстиль и сырьё", "Кожа и изделия из кожи", "Ковры", "Химическая продукция", "Одежда и готовое платье", "Автомобильная", "Суда и яхты", "Электрика и электроника", "Машины и оборудование", "Чёрные и цветные металлы", "Сталь", "Цемент, стекло, керамика", "Ювелирные изделия", "Оборона и авиакосмос", "Отопление и вентиляция", "Горнодобывающая"]}};
var COUNTRIES = I18N_DATA.countries;
var CI = I18N_DATA.country_i18n;
var SI = I18N_DATA.sectors;

// ================== GLOBAL SECTOR VISUAL META ==================
// 26 sectors, each with distinct icon + tonal color, used everywhere for consistency.
var SECTOR_META = [
 // 0 Hububat / Grains
 {c:"#c99a3d", g:"linear-gradient(135deg,#c99a3d,#e6b968)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V4"/><path d="M12 8c-2-2-4-2-6 0 2 2 4 2 6 0zM12 8c2-2 4-2 6 0-2 2-4 2-6 0zM12 13c-2-2-4-2-6 0 2 2 4 2 6 0zM12 13c2-2 4-2 6 0-2 2-4 2-6 0zM12 18c-2-2-4-2-6 0 2 2 4 2 6 0zM12 18c2-2 4-2 6 0-2 2-4 2-6 0z"/></svg>'},
 // 1 Yaş Meyve Sebze
 {c:"#5cb35a", g:"linear-gradient(135deg,#5cb35a,#8fd08d)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-4 0-7 3-7 7 0 5 3 9 7 9s7-4 7-9c0-4-3-7-7-7z"/><path d="M12 4c1-2 3-2 4-2"/><path d="M12 10v6M9 13h6"/></svg>'},
 // 2 İşlenmiş Meyve Sebze
 {c:"#e07a3c", g:"linear-gradient(135deg,#e07a3c,#f0a06b)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V5a3 3 0 016 0v3"/><path d="M9 12v4M15 12v4"/></svg>'},
 // 3 Kuru Meyve
 {c:"#a44a2e", g:"linear-gradient(135deg,#a44a2e,#c46e50)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="10" r="3"/><circle cx="15" cy="8" r="3"/><circle cx="16" cy="15" r="3"/><circle cx="9" cy="16" r="3"/></svg>'},
 // 4 Fındık
 {c:"#8b5a2b", g:"linear-gradient(135deg,#8b5a2b,#b07d4f)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-6 3-6 8s3 10 6 10 6-5 6-10-3-8-6-8z"/><path d="M9 8c1 1 2 1.5 3 1.5s2-.5 3-1.5"/></svg>'},
 // 5 Zeytin/Yağı
 {c:"#7a8a4a", g:"linear-gradient(135deg,#7a8a4a,#a2b070)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3c0 4 3 6 6 6 0 4-3 8-8 8-4 0-6-3-6-6 4-1 8-4 8-8z"/></svg>'},
 // 6 Tütün
 {c:"#8b6f47", g:"linear-gradient(135deg,#8b6f47,#a89070)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="10" width="20" height="6" rx="1"/><path d="M6 10V7M18 10V7"/><path d="M6 3c1 1 2 2 2 4M18 3c-1 1-2 2-2 4"/></svg>'},
 // 7 Süs Bitkileri
 {c:"#4ab069", g:"linear-gradient(135deg,#4ab069,#7fce9b)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"/><path d="M12 12c-3-2-5-4-5-8 3 0 5 3 5 6M12 12c3-2 5-4 5-8-3 0-5 3-5 6"/><path d="M7 22h10l-1-4H8z"/></svg>'},
 // 8 Su Ürünleri
 {c:"#3a8cc9", g:"linear-gradient(135deg,#3a8cc9,#6db0dc)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12c0-3 3-6 8-6s8 3 8 6-3 6-8 6c-3 0-5-1-6-3"/><path d="M2 12l4 3v-6l-4 3z"/><circle cx="15" cy="11" r=".5" fill="currentColor"/></svg>'},
 // 9 Mobilya/Orman
 {c:"#8a5a2e", g:"linear-gradient(135deg,#8a5a2e,#b47a49)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16v3H4zM6 11v9M18 11v9M4 15h16"/></svg>'},
 // 10 Tekstil
 {c:"#a679d1", g:"linear-gradient(135deg,#a679d1,#c69fea)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6l2 3 2-3h6l-2 6 2 4v7H4v-7l2-4-2-6z"/></svg>'},
 // 11 Deri
 {c:"#6b3f2a", g:"linear-gradient(135deg,#6b3f2a,#8f5f47)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8c0-2 2-3 4-3s3 1 4 1 2-1 4-1 4 1 4 3v10c0 2-2 3-4 3H8c-2 0-4-1-4-3V8z"/><path d="M8 12h8"/></svg>'},
 // 12 Halı
 {c:"#b04a5b", g:"linear-gradient(135deg,#b04a5b,#d07484)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 8h18M3 16h18M8 5v14M16 5v14"/></svg>'},
 // 13 Kimya
 {c:"#3ec9c9", g:"linear-gradient(135deg,#3ec9c9,#6bdcdc)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v6l-4 10a3 3 0 003 4h8a3 3 0 003-4l-4-10V2"/><path d="M9 2h6M6 14h12"/></svg>'},
 // 14 Hazırgiyim
 {c:"#d16b8a", g:"linear-gradient(135deg,#d16b8a,#e59aae)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4l-4 3 2 3 2-1v11h8V9l2 1 2-3-4-3-4 2z"/></svg>'},
 // 15 Otomotiv
 {c:"#c94040", g:"linear-gradient(135deg,#c94040,#dc6b6b)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15l1-5 2-3h8l2 3 1 5v3H5v-3z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/></svg>'},
 // 16 Gemi/Yat
 {c:"#2d5f8d", g:"linear-gradient(135deg,#2d5f8d,#5680ae)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v10M8 12h8l-1 5H9l-1-5z"/><path d="M4 17c2 2 4 3 8 3s6-1 8-3"/></svg>'},
 // 17 Elektrik-Elektronik
 {c:"#f5a623", g:"linear-gradient(135deg,#f5a623,#f7c15c)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>'},
 // 18 Makine
 {c:"#5b7c99", g:"linear-gradient(135deg,#5b7c99,#809bb8)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></svg>'},
 // 19 Demir/Metal
 {c:"#7a8a94", g:"linear-gradient(135deg,#7a8a94,#a0b0ba)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V8l8-5 8 5v12H4z"/><path d="M9 20v-6h6v6"/></svg>'},
 // 20 Çelik
 {c:"#4a5a6a", g:"linear-gradient(135deg,#4a5a6a,#758595)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="4"/><path d="M3 10L6 6h12l3 4M3 14l3 4h12l3-4"/></svg>'},
 // 21 Çimento/Cam/Seramik
 {c:"#94a0a8", g:"linear-gradient(135deg,#94a0a8,#b6bfc6)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21h16L18 6H6L4 21z"/><path d="M6 6h12l-1-3H7L6 6z"/><path d="M8 12h8M8 16h8"/></svg>'},
 // 22 Mücevher
 {c:"#d4af37", g:"linear-gradient(135deg,#d4af37,#e6c761)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M6 3l3 6h6l3-6M2 9h20"/></svg>'},
 // 23 Savunma/Havacılık
 {c:"#3d5245", g:"linear-gradient(135deg,#3d5245,#5f7469)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 8 7 2-7 2-3 8-3-8-7-2 7-2 3-8z"/></svg>'},
 // 24 İklimlendirme
 {c:"#4bb0d1", g:"linear-gradient(135deg,#4bb0d1,#77c8e0)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/><circle cx="12" cy="12" r="2"/></svg>'},
 // 25 Madencilik
 {c:"#8a6a3a", g:"linear-gradient(135deg,#8a6a3a,#b08c5c)", i:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2l6 6-2 2-4-4-8 8v6h6l8-8-4-4 2-2"/><path d="M6 20l-4-4"/></svg>'}
];
function getSecMeta(idx){ return SECTOR_META[idx] || SECTOR_META[9]; }
function secIconHTML(idx, size){ var m=getSecMeta(idx); size=size||24; return '<div style="width:'+size+'px;height:'+size+'px;color:'+m.c+';display:inline-flex;align-items:center;justify-content:center">'+m.i+'</div>'; }
function secTileHTML(idx, size, radius){
 var m=getSecMeta(idx); size=size||44; radius=radius||10;
 return '<div style="width:'+size+'px;height:'+size+'px;border-radius:'+radius+'px;background:'+m.g+';display:inline-flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 12px -4px '+m.c+'55;flex-shrink:0"><div style="width:'+(size*.55)+'px;height:'+(size*.55)+'px">'+m.i+'</div></div>';
}

// UI strings
var T = {
 tr:{nav_home:"Ana Sayfa",nav_add:"Firma Ekle",nav_pricing:"Fiyatlar",nav_about:"Hakkımızda",nav_contact:"İletişim",nav_login:"Giriş",nav_panel:"Panel",
     tag_live:"TÜRKİYE ↔ DÜNYA · 6 DİL",h_title:"Modern <em>İpek Yolu</em> ile alıcınızı ve tedarikçinizi bulun.",h_lead:"Vergi levhası ve sicil kaydıyla doğrulanmış firmalar. 6 dilde çeviri, uçtan uca şifreli mesajlaşma.",
     f_match:"Eşleştir",fm_fullpage:"Tam sayfayı aç",fm_fullpage_tt:"Bu firmayı tam sayfada göster",pp_live_prev:"CANLI ÖNİZLEME",pr_dl_pdf:"Prospektüsümü PDF olarak indir",step_prev:"Önceki",step_next:"Sonraki",step_of:"·",step_publish:"Yayınla · Firmayı Kaydet",creds_continue:"Ödemeye Devam",creds_back:"Paketlere dön",creds_onetime:"Tek seferlik ödeme",pay_err_card:"Geçerli kart numarası girin",pay_err_name:"Kart sahibinin adını girin",pay_err_exp:"Son tarihi AA/YY olarak girin",pay_err_cvc:"CVC girin",ppl_pw_h:"Karar vericilere doğrudan erişim Pro üyelere açık",ppl_pw_sub:"2.400+ doğrulanmış CEO, satın alma müdürü ve dış ticaret uzmanının e-posta ve telefonuna bir tıkla ulaşın. Her Pro üyeye ayda 100 kredi hediye.",ppl_pw_stat1:"Karar verici",ppl_pw_stat2:"Aylık kredi",ppl_pw_stat3:"Doğrulanmış",ppl_pw_cta:"Pro'ya Yükselt",ppl_pw_note:"Aylık $29 · İstediğin zaman iptal",creds_h:"Kredi Paketleri",creds_sub:"Her karar vericinin e-posta veya telefonu 1 kredi. Kullanılmayan krediler bir sonraki aya devreder.",creds_current:"mevcut krediniz var",creds_lbl:"Kredi",creds_per_lbl:"kredi",creds_save10:"%10 avantaj",creds_save15:"%15 avantaj",creds_you_get:"Alacağınız",creds_buy_btn:"Satın Al",creds_secure:"Stripe ile güvenli ödeme · 3D Secure",creds_pick_pack:"Bir paket seçin",creds_added:"kredi eklendi",creds_charged:"tahsil edildi",creds_add_btn:"Kredi Ekle",pay_h:"Ödeme — Pro Plan",pay_plan:"Kervea Pro",pay_kdv:"KDV (%20)",pay_disc:"İndirim",pay_total:"Toplam",pay_card:"Kart Numarası",pay_exp:"Son Tarih",pay_btn:"Öde",apply:"Uygula",bill_m:"Aylık",bill_y:"Yıllık",bill_save:"−20%",per_month:"/ay",ct_name:"Ad Soyad",ct_email:"E-posta",ct_subject:"Konu",ct_ph_name:"Adınız",ct_ph_email:"ornek@sirket.com",ct_ph_subject:"Nasıl yardımcı olabiliriz?",ct_center:"Merkez",ct_email_lbl:"E-posta:",ct_phone_lbl:"Telefon:",lg_sso_google:"Google ile devam et",lg_sso_ms:"Microsoft ile devam et",lg_sso_apple:"Apple ile devam et",lg_or_email:"veya e-posta ile",pri_h:"aksiyon bekliyor — dikkatinizi gerektiriyor",pri_sub:"2 yeni yüksek skorlu eşleşme cevap bekliyor · 1 sözleşme yenileme yaklaşıyor · Belge güncelleme gerekli",pri_open_matches:"Eşleşmeleri Aç",pri_all:"Tümü",range_7d:"7g",range_30d:"30g",range_90d:"90g",range_1y:"1y",ac_title:"Aktivite Zaman Çizelgesi",ac_sub:"Son 30 günün tam kaydı.",ac_filter_all:"Tümü",ac_filter_match:"Eşleşmeler",ac_filter_msg:"Mesajlar",ac_filter_prof:"Profil",ac_filter_doc:"Belgeler",all_dir:"Tüm yönler",all_scores:"Tüm skorlar",attention:"dikkat",back_list:"Firma listesine dön",cancel:"İptal",custom:"Özel",contact_sales:"Satış ekibiyle iletişim",export_csv:"CSV",remove:"Kaldır",upload:"Yükle",save_all:"Tümünü Kaydet",results:"sonuç",complete:"Tamamlandı",stable:"Sabit",preview_page:"Sayfa önizle",ch_ctr:"Ülke Dağılımı",ch_trend:"Firma büyüme trendi",ck_logo:"Logo yüklendi",ck_doc:"Belgeler onaylı",ck_social:"Sosyal medya bağlı",ck_gal:"Galeri (5/12 görsel)",cover_h:"Kapak Görseli",cover_lbl:"Kapak Görseli · 1600×400",cover_tt:"Kapak fotoğrafını yükle",cover_st:"Firma sayfanızın üstünde görünecek · 1600×400px önerilen · max 5MB",cover_change:"Kapak fotoğrafı yükle veya değiştir",doc_h:"Belgeler *",doc_txt:"📄 Faaliyet Belgesi, Sicil Gazetesi, İmza Sirküleri, Kalite Sertifikaları",doc_hint:"PDF, JPG, PNG · her dosya max 10MB · en fazla 20 belge",ent_p:"Kervea Enterprise · özel çözüm",ent_1:"Sınırsız firma, iletişim bilgisi, gelişmiş eşleştirme, dışa aktarım",ent_2:"Özel entegrasyon (SAP, Logo, Netsis, Zoho, HubSpot)",ent_3:"Beyaz etiket profil (kendi markanız)",ent_4:"Özel API erişimi + web-hook desteği",ent_5:"SLA + öncelikli destek (4 saat cevap garantisi)",ent_6:"Dedike hesap yöneticisi",ent_7:"Aylık eğitim ve strateji seansları",fl_cname:"Firma Adı *",fl_ctitle:"Ticari Ünvan (EN)",fl_tax:"Vergi No / Tax ID *",fl_mersis:"MERSIS / Sicil No",fl_year:"Kuruluş Yılı *",fl_emp:"Çalışan Sayısı",fl_country:"Ülke *",fl_city:"Şehir",fl_kep:"KEP Adresi",fl_web:"Web Sitesi",fl_email:"E-posta *",fl_phone:"Telefon *",fl_repname:"Yetkili Adı *",fl_reptitle:"Yetkili Ünvanı",fl_address:"Firma Adresi",fl_sec:"Ana Sektör *",fl_dir:"Ticaret Yönü *",fl_hs:"HS Kodu (virgülle)",fl_moq:"MOQ (Minimum Sipariş)",fl_inc:"INCOTERM Tercihi",fl_pay:"Ödeme Şekli",fl_products:"Ana Ürünler / Hizmetler",fl_desc:"Firma Açıklaması *",fl_certs:"Sertifikalar",gal_h:"Ürün / Tesis Fotoğrafları (max 12)",gal_tt:"Görselleri sürükle-bırak veya seç",gal_st:"JPG, PNG, WEBP · her biri max 5MB · toplam 12 görsel",gal_lbl:"Ürün / Tesis Fotoğrafları",gal_add:"Yeni görsel ekle · Sürükle-bırak destekli",gal_max:"JPG/PNG/WEBP · en fazla 12 görsel · her biri max 5MB",hiw_tag:"SÜREÇ",hiw_h:"Aracı yok. Sadece <em style=\"font-style:normal;color:var(--teal)\">gerçek ticaret</em>.",hiw_1a:"01",hiw_1t:"Firma profilinizi oluşturun",hiw_1b:"6 adımda küresel görünürlük",hiw_1c:"Ort. 8 dakika · manuel doğrulama 24 saat",hiw_2a:"02",hiw_2t:"AI eşleştirme sizin için çalışsın",hiw_2b:"Uyum skoruna göre sıralı öneriler",hiw_2c:"Ortalama 3-5 dakikada 20+ eşleşme",hiw_3a:"03",hiw_3t:"Doğrudan iletişim, gerçek zamanlı çeviri",hiw_3b:"Doğrudan bağlantı · komisyon yok",hiw_3c:"Ortalama cevap süresi 4 saat",kpi_match:"Yeni Eşleşme",kpi_msg:"Yeni Mesaj",kpi_offer:"Teklif",kpi_view:"Görüntülenme",logo_h:"Firma Logosu *",logo_hint:"Önerilen: 400×400px, PNG/JPG/SVG, max 2MB",logo_hint2:"PNG · şeffaf zemin · min 200×200",logo_lbl:"Firma Logosu",msg_h:"Mesajlar",msg_sub:"Doğrulanmış firmalarla doğrudan iletişim. Uçtan uca şifreli. 6 dilde otomatik çeviri.",mt_h:"Eşleşmelerim",mt_sub:"AI eşleştirme motoru sizin için sıraladı. Filtrele, dışa aktar, doğrudan mesajlaş.",ov_hello:"Merhaba",ov_sub:"İşte panelinizin son 30 günlük özeti.",ov_recent:"Son Etkinlikler",ov_status:"Profil Sağlığı",ov_ev1:"yeni teklif gönderdi",ov_ev2:"mesaj yazdı",ov_ev3:"profilinizi görüntüledi",ov_ev4:"ISO 9001 sertifikası doğrulandı",ov_ev5:"bağlantı isteği",ov_t1:"2 saat önce",ov_t2:"4 saat önce",ov_t3:"1 gün önce",ov_t4:"2 gün önce",ov_t5:"3 gün önce",p_ana:"Analiz",p_people:"Kişiler",p_docs:"Belgelerim",p_team:"Ekip",p_activity:"Aktivite",plan_starter:"Starter",starter_p:"Ücretsiz · başlangıç için ideal",starter_1:"1 firma profili + doğrulama rozeti",starter_2:"Ayda 50 eşleşme",starter_3:"Temel sektör filtreleme",starter_4:"6 dilde otomatik profil çevirisi",starter_5:"Sınırlı mesajlaşma (5/gün)",starter_6:"Standart destek",start_starter:"Ücretsiz Başla",pro_p:"Kervea Pro · en popüler",pro_1:"Starter'ın tüm özellikleri",pro_2:"Sınırsız eşleşme + gelişmiş AI skoru",pro_3:"Sınırsız firma, iletişim bilgisi, gelişmiş eşleştirme, dışa aktarım",pro_4:"Sınırsız mesajlaşma + öncelikli sıralama",pro_5:"Analitik dashboard (ziyaretçi, dönüşüm, rakip)",pro_6:"Profil vitrini · üst sıralarda görünüm",pro_7:"Öncelikli müşteri desteği (24 saat)",start_pro:"Pro'ya Yükselt",prof_h:"Firma Profilim",prof_sub:"Firma bilgilerinizi, görsellerinizi ve iletişim kanallarınızı güncelleyin.",promo_h:"Promosyon Kodun mu var?",promo_s:"İlk 3 ay Pro plana %30 indirim.",promo_h2:"Kod Girin",promo_s2:"Erken kullanıcılar ve oda üyelerine özel indirim kodları.",pub_h:"Başvurunuz alındı",pub_p:"Manuel doğrulama 24-48 saat içinde tamamlanır. Yayın hazır olduğunda e-posta ve SMS ile bilgilendirileceksiniz.",ppl_title:"Kişiler",ppl_sub:"Karar vericilerin doğrudan iletişim bilgileri. Her kişi 1 kredi.",ppl_credits:"Krediler",ppl_renew:"Kredi yenile",ppl_export:"Dışa aktar",ppl_all:"Tümü",ppl_ceo:"CEO / Genel Müdür",ppl_purchasing:"Satın Alma",ppl_sales:"Satış",ppl_ops:"Operasyon",ppl_col_person:"Kişi",ppl_col_title:"Ünvan",ppl_col_firm:"Firma",ppl_col_email:"E-posta",ppl_col_phone:"Telefon",ppl_col_act:"İşlem",ppl_kvkk:"Bu bilgiler KVKK'ya uygun şekilde ve firma yetkilisinin açık rızasıyla paylaşılmaktadır.",ppl_kvkk_link:"KVKK Aydınlatma Metni",pr_title:"Prospektüs",pr_desc:"Firmanızın tam bir profesyonel özeti — alıcı görüşmelerine hazır PDF.",pr_dl:"PDF olarak indir",pr_pdf:"PDF Prospektüs",pr_langs:"6 dilde",pr_mine:"Prospektüsümü indir",pr_incl:"İçindekiler",pr_i1:"Firma özeti + ana ürünler",pr_i2:"Sektör, HS kodu, MOQ",pr_i3:"Doğrulama rozetleri (vergi, sicil, KEP)",pr_i4:"Sertifikalar (ISO, GOTS, HACCP)",pr_i5:"İletişim bilgileri + QR kod",pr_who:"Kimler için?",pr_l1:"Alıcı görüşmeleri öncesi bilgi paylaşımı",pr_l2:"Fuar ve etkinliklerde dijital kartvizit",pr_l3:"Sosyal medya ve web sitesinde referans",s3_media:"Logo",s4_social:"Sosyal",s5_doc:"Belge",s6_pub:"Yayın",sec_biz:"İş Bilgileri",sec_visual:"Görsel Kimlik",sec_social:"Sosyal Medya & Web",sec_legal:"Yasal Bilgi",social_intro:"Sosyal medya ve iletişim kanallarınız — alıcılar buradan size ulaşacak.",ss_h:"Kervea'ya güvenen firmalar",ss_p:"Doğrulanmış üreticiler ve ihracatçılar, 6 kıtada aktif ağın parçası.",ss_5t:"Antep Baharat",ss_5s:"Gaziantep · Kırmızı biber",tm_title:"Ekip Yönetimi",tm_sub:"Firmanızın kullanıcılarını, rollerini ve erişim izinlerini yönetin.",tm_seats:"Koltuk kullanımı",tm_invite:"+ Kullanıcı Davet Et",tm_col_user:"Kullanıcı",tm_role:"Rol",tm_perms:"İzinler",tm_status:"Durum",tm_last:"Son Giriş",tm_active:"Aktif",tm_pending:"Beklemede",tm_owner:"Sahibi",tm_admin:"Yönetici",tm_sales:"Satış",tm_ops:"Operasyon",tm_p_all:"Tüm izinler",tm_p_msg:"Mesaj + Kişiler",tm_p_prof:"Profil + Belgeler",vs_prev:"Önizle",why_h:"Neden Kervea?",why_p:"Doğrulanmış firmalarla doğrudan iletişim. Komisyon yok, güvenilmez tedarikçi yok, sadece gerçek ticaret.",why_1t:"Ülke koridoru",why_2t:"Doğrulanmış firma",why_3t:"6 dilde çeviri",chat_online:"Çevrimiçi",chat_verified_firm:"Doğrulanmış firma",chat_typing:"yazıyor…",chat_btn_firm:"Firma profili",chat_btn_video:"Görüntülü ara",chat_btn_archive:"Arşivle",empty_firms:"Filtrenize uyan firma bulunamadı.",empty_records:"Filtrenize uyan kayıt yok.",toast_name_required:"Ad Soyad zorunlu",toast_valid_email:"Geçerli e-posta girin",toast_invalid_promo:"Geçersiz promosyon kodu",toast_search_applied:"Arama uygulandı",toast_csv_downloaded:"CSV indirildi",toast_pdf_downloaded:"Prospektüs indirildi",toast_photo_removed:"Fotoğraf kaldırıldı",toast_photo_uploaded:"Fotoğraf yüklendi",toast_logo_uploaded:"Logo yüklendi",toast_login_ok:"Giriş başarılı",toast_login_full:"Giriş yapıldı — tam erişim aktif",toast_logout:"Çıkış yapıldı",toast_credit_out:"Kredi bitti — planınızı yükseltin",toast_docs_opening:"Belge yükleme aracı açılıyor",toast_firm_opening:"Firma profili açılıyor",toast_firm_notfound:"Firma bulunamadı",toast_firm_error:"Firma açılırken hata",toast_visual_saved:"Görsel kimlik kaydedildi",toast_video_call:"Görüntülü arama başlatılıyor",toast_cover_updated:"Kapak güncellendi",toast_chat_archived:"Konuşma arşivlendi",toast_profile_updated:"Profil güncellendi",toast_delete_requested:"Silme talebi alındı — 7 gün içinde tamamlanacak",toast_social_saved:"Sosyal medya bilgileri kaydedildi",toast_form_opened:"Talep formu açıldı",toast_print_pdf:"Tarayıcının yazdır menüsünden PDF olarak kaydedin",toast_trade_saved:"Ticari bilgiler kaydedildi",toast_all_tasks:"Tüm görevler görüntüleniyor",toast_data_export:"Verilerin hazırlanıyor, e-postaya link gönderilecek",toast_legal_saved:"Yasal bilgiler kaydedildi",toast_cancelled:"İptal edildi",toast_copied:"Panoya kopyalandı",confirm_delete_account:"Hesabınız ve tüm verileriniz kalıcı olarak silinecek. Emin misiniz?",tm_inv_h:"Yeni Kullanıcı Davet Et",tm_inv_sub:"Firmanıza yeni bir ekip üyesi ekleyin. Davet e-postayla gönderilir; kullanıcı kabul ettiğinde aktif olur.",tm_fld_name:"Ad Soyad *",tm_fld_email:"E-posta *",tm_fld_role:"Rol *",tm_role_admin:"Yönetici",tm_role_admin_desc:"Tüm modüller · davet edebilir",tm_role_sales:"Satış",tm_role_sales_desc:"Mesajlaşma + Kişiler",tm_role_ops:"Operasyon",tm_role_ops_desc:"Profil + Belgeler",tm_role_view:"Sadece Görüntüleme",tm_role_view_desc:"Yalnızca okuma erişimi",tm_inv_info:"Rolü sonradan değiştirebilirsin. Bu kullanıcı <b>4/10 koltuk</b> kullanımınızın 5.'si olacak.",tm_btn_invite:"Davet Gönder",btn_cancel:"İptal",tm_perm_h:"Rol ve İzinleri Düzenle",tm_perm_sub:"Bu kullanıcının erişebileceği modülleri belirleyin.",tm_lbl_role:"Rol",tm_lbl_perms:"İzinler",tm_role_admin_short:"Tüm modüller",tm_role_sales_short:"Mesaj + Kişiler",tm_role_view_short:"Okuma",tm_perm_msg:"Mesajlaşma",tm_perm_msg_desc:"Tüm konuşmalara erişim, mesaj gönderme ve dosya paylaşımı.",tm_perm_match:"Eşleşmeler & Kişiler",tm_perm_match_desc:"AI eşleşme önerilerini görüntüle, kişi kredilerini kullan.",tm_perm_prof:"Firma Profili",tm_perm_prof_desc:"Firma bilgilerini, galeriyi, sosyal medya bağlantılarını düzenle.",tm_perm_docs:"Belgeler",tm_perm_docs_desc:"Sertifika, vergi levhası, KEP evraklarını yükle ve onayla.",tm_perm_ana:"Analitik",tm_perm_ana_desc:"Ağ erişimi, dönüşüm oranı, rakip karşılaştırması ve raporlar.",tm_perm_team:"Ekip Yönetimi",tm_perm_team_desc:"Yeni kullanıcı davet et, rol ata, hesapları devre dışı bırak.",tm_btn_save:"Değişiklikleri Kaydet",toast_saved:"Kaydedildi",ph_tm_name:"Örn. Ahmet Kaya",ph_tm_email:"ahmet@firma.com",pay_card_holder:"KART SAHİBİ",pay_card_holder_ph:"AD SOYAD",pay_card_exp_short:"SON TARİH",pay_per_month:"/ay",pay_method_card:"Kart",pay_method_mc:"MC",pay_method_bank:"iBank Transfer",pay_card_holder_lbl:"Kart Sahibi",ph_card_holder:"AD SOYAD",ph_promo:"Promo kodu (opsiyonel)",toast_pay_success:"Ödeme başarılı — Pro aktif",pay_disclaimer:"Ödemeyi tamamlayarak <a onclick=\"openM('sozl')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">Üyelik Sözleşmesi</a> ve <a onclick=\"openM('kvkk')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">KVKK Aydınlatma Metni</a>'ni kabul etmiş olursunuz.",modal_kvkk_h:"KVKK Aydınlatma Metni",modal_sozl_h:"Üyelik Sözleşmesi",modal_cookie_h:"Gizlilik ve Çerez Politikası",legal_disclaimer:"<b>ⓘ</b> Bu doküman Türkçe yasal orijinaldir. Türk hukuku kapsamında bağlayıcıdır.",viewers_h:"Profilini Görüntüleyenler",viewers_sub:"IP adresine göre ülke tespit edildi · Son 30 gün",add_draft_btn:"Sonra Devam Et",add_draft_saved:"Taslak kaydedildi — devam etmek için giriş yapın",dir_both:"Her ikisi",pay_tt_cash:"TT Peşin",pay_tt_30:"TT 30 gün",pay_tt_60:"TT 60 gün",toast_logo_removed:"Logo kaldırıldı",toast_cover_uploaded:"Kapak yüklendi",consent_kvkk:"<b>KVKK Aydınlatma Metni</b>'ni okudum ve kabul ediyorum.",consent_terms:"<b>Kullanıcı Sözleşmesi</b>'ni kabul ediyorum.",consent_verify:"Verilerimin doğrulama amacıyla kontrol edilmesine izin veriyorum.",consent_marketing:"Ticari elektronik ileti almayı kabul ediyorum (opsiyonel).",consent_read:"Oku",consent_read2:"Oku",ph_cname:"Örn. XYZ Ticaret A.Ş.",ph_address:"Cadde, No, Semt / İlçe / Şehir / Ülke",ph_fullname:"Ad Soyad",ph_gm:"Genel Müdür",ph_products:"Örn. Pamuk ipliği, Dokuma kumaş, Örme kumaş",ph_desc:"Firmanızı, üretim kapasitenizi, ihracat pazarlarınızı bir paragrafta anlatın...",an_ip_based:"● IP tabanlı",an_visitors_sub:"Ziyaretçilerinin geldiği ülkeler (son 30 gün)",an_pulse_h:"Pazar Nabzı — HS Kodu Trendleri",an_pulse_sub:"Sektörünüzdeki 8 haftalık talep-arz değişimi · Trademap kaynaklı",an_p1_nm:"Pamuklu dokuma kumaş",an_p1_sub:"Almanya, Hollanda, Fransa · alıcı sinyali güçlü",an_p2_nm:"Mobilya (metal iskeletli)",an_p2_sub:"Finlandiya, Norveç · sipariş hacmi rekor seviyede",an_p3_nm:"Ahşap paletler, sandık",an_p3_sub:"Nijerya, Cezayir · yeni tarife nedeniyle dalgalı",an_p4_nm:"Pamuk ipliği (tarak)",an_p4_sub:"Kazakistan, Özbekistan · hammadde fiyatı geriliyor",an_p5_nm:"Demir/çelik eşya",an_p5_sub:"Mısır, Fas · liman kongesyonu düşüyor",an_data_freq:"Verilerin güncellenme sıklığı: 24 saat",an_full_report:"Tam rapor →",an_opening_report:"Detaylı analiz açılıyor",an_ai_alerts_h:"AI Uyarı Merkezi",an_ai_alerts_sub:"Firmanız için tespit edilen fırsatlar ve riskler",an_priority_high:"Yüksek öncelik",an_priority_med:"Orta öncelik",an_priority_opp:"Fırsat",an_priority_tip:"İpucu",an_alert1_nm:"cevap süresi kritik",an_alert1_desc:"3 gündür beklemede. Ortalama cevap süreniz 4 saatten uzun olursa eşleşme kalitesi düşer.",an_alert2_nm:"Vergi levhanız 8 gün içinde yenilenmeli",an_alert2_desc:"Yenilenmeyen belgeler firma sıralamasında düşüşe neden olur. Belgelerim → Yükle.",an_alert3_nm:"Yeni fırsat: HS 6006 Almanya alıcıları",an_alert3_desc:"Sizinle uyumlu 6 yeni alıcı tespit edildi. Örme kumaş sektöründe hızlı büyüyen bir koridor.",an_alert4_nm:"Profil tamamlanma önerisi",an_alert4_desc:"Galeri bölümüne 7 görsel daha eklerseniz profil skoru %94'ten %100'e çıkar.",an_security_h:"Güvenlik & Doğrulama Durumu",an_sec1_nm:"2FA Aktif",an_sec2_nm:"Vergi Levhası",an_status_approved:"Onaylı",an_sec3_nm:"Ticaret Sicil",an_status_verified:"Doğrulandı",an_sec4_nm:"KEP Adresi",an_status_active:"Aktif",an_sec5_sub:"Yenileme 15g içinde",an_sec6_sub:"Tüm iletişim şifreli",an_sec7_nm:"KVKK Uyumlu",an_sec7_sub:"Aydınlatma v1.2",an_sec8_sub:"IP + rate limiting aktif",an_deep_h:"Derin Analiz",fl_yourmsg:"Mesajınız",btn_send:"Gönder",toast_msg_sent:"Mesajınız iletildi",fl_password:"Şifre",btn_login:"Giriş Yap",stat_today:"bugün",stat_this_week:"bu hafta",stat_soon:"yakında",ft_kvkk:"KVKK Aydınlatma",ft_terms:"Üyelik Sözleşmesi",ft_cookie:"Gizlilik/Çerez",ft_tagline:"Modern İpek Yolu",fp_decisionmakers:"Karar Vericiler",fp_detail:"Detay",fp_gotoallppl:"Tüm Kişiler paneline git →",fp_gal1:"Ürün Vitrini",fp_gal2:"Üretim Tesisi",fp_gal3:"Depo",fp_gal4:"Ekip",fp_gal5:"Kalite Kontrol",fp_gal6:"Sertifikalar",lock_title:"İletişim bilgileri Pro üyelere açık",lock_sub:"WhatsApp, telefon, e-posta ve web sitesi Pro üyelik başladığında anında görünür olur.",lock_cta:"Pro'a Yükselt",sec_social_short:"Sosyal Medya",dene_lbl:"DENE",qt1:"Finlandiya'da mobilya aksesuarı alıcısı",qt2:"Fildişi Sahili'nde kakao tedarikçisi",qt3:"Kazakistan'da tekstil alıcısı",qf_lbl:"HIZLI FİLTRE",f_exp:"İhracat",f_imp:"İthalat",
     s_pos:"Aktif firma",s_ctr:"Ülke ve bölge",s_sec:"Sektör",s_lng:"Dil",
     firms_h:"Firmalar",firms_cnt:"eşleşme · uyum skoruna göre sıralı",sort_lbl:"Sırala:",sort_match:"Uyum",sort_year:"Kuruluş",sort_name:"İsim",
     add_h:"Firmanı Ekle",add_p:"6 adımda küresel görünürlük.",s1:"Firma",s2:"Sektör",s3:"Belge",s4:"Onay",s5:"Yayın",prev:"← Önceki",next:"Sonraki →",
     pr_h:"Planlar",pr_p:"Küresel görünürlük seviyeniz.",ct_h:"İletişim",ct_p:"Sorularınız için buradayız.",
     lg_h:"Giriş",lg_p:"Kervea hesabınıza erişin",pn_h:"Firma Paneli",pn_p:"Profil, eşleşme ve mesajlarınızı yönetin.",
     p_over:"Genel Bakış",p_matches:"Eşleşmeler",p_profile:"Firma Profilim",p_msgs:"Mesajlar",p_com:"Taahhütlerim",p_pros:"Prospektüs",p_set:"Ayarlar",p_out:"Çıkış",
     all_sec:"— Tüm sektörler",sel_ctr:"Ülke seç",dd_search:"Ülke ara...",
     dir_exp:"İHRACATÇI",dir_imp:"İTHALATÇI",match_score:"UYUM",verified:"Doğrulanmış",
     detail:"Detay",message:"Mesaj Gönder",match_col:"Firma",prod_col:"Ürün",sec_col:"Sektör",ctr_col:"Ülke",score_col:"Uyum",action_col:"İşlem"},
 en:{nav_home:"Home",nav_add:"Add Company",nav_pricing:"Pricing",nav_about:"About",nav_contact:"Contact",nav_login:"Login",nav_panel:"Panel",
     tag_live:"TURKEY ↔ WORLD · 6 LANGUAGES",h_title:"Find your buyer or supplier on the modern <em>Silk Road</em>.",h_lead:"Companies verified by tax certificate and trade registry. Messaging in 6 languages, end-to-end encrypted.",
     f_match:"Match",fm_fullpage:"Open full page",fm_fullpage_tt:"Show this company in full page",pp_live_prev:"LIVE PREVIEW",pr_dl_pdf:"Download my prospectus as PDF",step_prev:"Previous",step_next:"Next",step_of:"·",step_publish:"Publish · Save Company",creds_continue:"Continue to Payment",creds_back:"Back to packs",creds_onetime:"One-time payment",pay_err_card:"Enter a valid card number",pay_err_name:"Enter the cardholder name",pay_err_exp:"Enter expiry as MM/YY",pay_err_cvc:"Enter CVC",ppl_pw_h:"Direct access to decision-makers is available to Pro members",ppl_pw_sub:"Reach 2,400+ verified CEOs, purchasing managers and foreign trade specialists with one click. 100 monthly credits included with Pro.",ppl_pw_stat1:"Decision-makers",ppl_pw_stat2:"Monthly credits",ppl_pw_stat3:"Verified",ppl_pw_cta:"Upgrade to Pro",ppl_pw_note:"$29/month · Cancel anytime",creds_h:"Credit Packs",creds_sub:"Each decision-maker's email or phone is 1 credit. Unused credits roll over to next month.",creds_current:"credits currently available",creds_lbl:"Credits",creds_per_lbl:"credit",creds_save10:"10% savings",creds_save15:"15% savings",creds_you_get:"You get",creds_buy_btn:"Buy Now",creds_secure:"Secure payment with Stripe · 3D Secure",creds_pick_pack:"Please pick a pack",creds_added:"credits added",creds_charged:"charged",creds_add_btn:"Add Credits",pay_h:"Payment — Pro Plan",pay_plan:"Kervea Pro",pay_kdv:"VAT (20%)",pay_disc:"Discount",pay_total:"Total",pay_card:"Card Number",pay_exp:"Expires",pay_btn:"Pay",apply:"Apply",bill_m:"Monthly",bill_y:"Yearly",bill_save:"−20%",per_month:"/mo",ct_name:"Full Name",ct_email:"Email",ct_subject:"Subject",ct_ph_name:"Your name",ct_ph_email:"you@company.com",ct_ph_subject:"How can we help?",ct_center:"Headquarters",ct_email_lbl:"Email:",ct_phone_lbl:"Phone:",lg_sso_google:"Continue with Google",lg_sso_ms:"Continue with Microsoft",lg_sso_apple:"Continue with Apple",lg_or_email:"or with email",pri_h:"action pending — needs your attention",pri_sub:"2 new high-score matches awaiting reply · 1 contract renewal approaching · Document update required",pri_open_matches:"Open Matches",pri_all:"All",range_7d:"7d",range_30d:"30d",range_90d:"90d",range_1y:"1y",ac_title:"Activity Timeline",ac_sub:"Full record of the last 30 days.",ac_filter_all:"All",ac_filter_match:"Matches",ac_filter_msg:"Messages",ac_filter_prof:"Profile",ac_filter_doc:"Documents",all_dir:"All directions",all_scores:"All scores",attention:"attention",back_list:"Back to company list",cancel:"Cancel",custom:"Custom",contact_sales:"Contact sales team",export_csv:"CSV",remove:"Remove",upload:"Upload",save_all:"Save All",results:"results",complete:"Complete",stable:"Stable",preview_page:"Preview page",ch_ctr:"Country Distribution",ch_trend:"Company growth trend",ck_logo:"Logo uploaded",ck_doc:"Documents approved",ck_social:"Social media connected",ck_gal:"Gallery (5/12 images)",cover_h:"Cover Image",cover_lbl:"Cover Image · 1600×400",cover_tt:"Upload cover photo",cover_st:"Displayed at the top of your company page · 1600×400px recommended · max 5MB",cover_change:"Upload or change cover photo",doc_h:"Documents *",doc_txt:"📄 Business Certificate, Registry Gazette, Signature Circular, Quality Certificates",doc_hint:"PDF, JPG, PNG · max 10MB per file · up to 20 documents",ent_p:"Kervea Enterprise · custom solution",ent_1:"Unlimited companies, contacts, advanced matching, export",ent_2:"Custom integration (SAP, Logo, Netsis, Zoho, HubSpot)",ent_3:"White-label profile (your own brand)",ent_4:"Dedicated API access + web-hook support",ent_5:"SLA + priority support (4-hour response guarantee)",ent_6:"Dedicated account manager",ent_7:"Monthly training and strategy sessions",fl_cname:"Company Name *",fl_ctitle:"Commercial Title (EN)",fl_tax:"Tax ID *",fl_mersis:"MERSIS / Registry No",fl_year:"Founded Year *",fl_emp:"Employee Count",fl_country:"Country *",fl_city:"City",fl_kep:"Registered E-mail",fl_web:"Website",fl_email:"Email *",fl_phone:"Phone *",fl_repname:"Contact Name *",fl_reptitle:"Contact Title",fl_address:"Company Address",fl_sec:"Main Sector *",fl_dir:"Trade Direction *",fl_hs:"HS Code (comma-separated)",fl_moq:"MOQ (Minimum Order)",fl_inc:"INCOTERM Preference",fl_pay:"Payment Method",fl_products:"Main Products / Services",fl_desc:"Company Description *",fl_certs:"Certifications",gal_h:"Product / Facility Photos (max 12)",gal_tt:"Drag & drop images or select",gal_st:"JPG, PNG, WEBP · max 5MB each · up to 12 images",gal_lbl:"Product / Facility Photos",gal_add:"Add new image · Drag & drop supported",gal_max:"JPG/PNG/WEBP · up to 12 images · max 5MB each",hiw_tag:"PROCESS",hiw_h:"Direct trade. <em style=\"font-style:normal;color:var(--teal)\">Real connections</em>.",hiw_1a:"01",hiw_1t:"Create your company profile",hiw_1b:"Global visibility in 6 steps",hiw_1c:"Avg 8 minutes · manual verification 24 hours",hiw_2a:"02",hiw_2t:"Let AI matching work for you",hiw_2b:"Recommendations sorted by match score",hiw_2c:"20+ matches in 3-5 minutes on average",hiw_3a:"03",hiw_3t:"Direct contact, real-time translation",hiw_3b:"Direct connection · no commission",hiw_3c:"Average response time 4 hours",kpi_match:"New Matches",kpi_msg:"New Messages",kpi_offer:"Offers",kpi_view:"Views",logo_h:"Company Logo *",logo_hint:"Recommended: 400×400px, PNG/JPG/SVG, max 2MB",logo_hint2:"PNG · transparent background · min 200×200",logo_lbl:"Company Logo",msg_h:"Messages",msg_sub:"Direct communication with verified companies. End-to-end encrypted. Auto-translated in 6 languages.",mt_h:"My Matches",mt_sub:"AI matching engine sorted for you. Filter, export, message directly.",ov_hello:"Hello",ov_sub:"Here's your panel's last 30 days summary.",ov_recent:"Recent Activity",ov_status:"Profile Health",ov_ev1:"sent a new offer",ov_ev2:"sent a message",ov_ev3:"viewed your profile",ov_ev4:"ISO 9001 certificate verified",ov_ev5:"connection request",ov_t1:"2 hours ago",ov_t2:"4 hours ago",ov_t3:"1 day ago",ov_t4:"2 days ago",ov_t5:"3 days ago",p_ana:"Analytics",p_people:"Contacts",p_docs:"My Documents",p_team:"Team",p_activity:"Activity",plan_starter:"Starter",starter_p:"Free · ideal for getting started",starter_1:"1 company profile + verification badge",starter_2:"50 matches per month",starter_3:"Basic sector filtering",starter_4:"Auto profile translation in 6 languages",starter_5:"Limited messaging (5/day)",starter_6:"Standard support",start_starter:"Start Free",pro_p:"Kervea Pro · most popular",pro_1:"Everything in Starter",pro_2:"Unlimited matches + advanced AI score",pro_3:"Unlimited companies, contacts, advanced matching, export",pro_4:"Unlimited messaging + priority ranking",pro_5:"Analytics dashboard (visitors, conversion, competitors)",pro_6:"Profile showcase · top ranking visibility",pro_7:"Priority customer support (24 hours)",start_pro:"Upgrade to Pro",prof_h:"My Company Profile",prof_sub:"Update your company info, images, and communication channels.",promo_h:"Have a Promo Code?",promo_s:"30% off Pro plan for the first 3 months.",promo_h2:"Enter Code",promo_s2:"Special discount codes for early users and chamber members.",pub_h:"Application received",pub_p:"Manual verification completes in 24-48 hours. You'll be notified by email and SMS when live.",ppl_title:"Contacts",ppl_sub:"Direct contact details of decision-makers. 1 credit per contact.",ppl_credits:"Credits",ppl_renew:"Renew credits",ppl_export:"Export",ppl_all:"All",ppl_ceo:"CEO / General Manager",ppl_purchasing:"Purchasing",ppl_sales:"Sales",ppl_ops:"Operations",ppl_col_person:"Person",ppl_col_title:"Title",ppl_col_firm:"Company",ppl_col_email:"Email",ppl_col_phone:"Phone",ppl_col_act:"Action",ppl_kvkk:"This info is shared in compliance with data protection law and with the explicit consent of the company representative.",ppl_kvkk_link:"Privacy Notice",pr_title:"Prospectus",pr_desc:"A complete professional summary of your company — a PDF ready for buyer meetings.",pr_dl:"Download as PDF",pr_pdf:"PDF Prospectus",pr_langs:"In 6 languages",pr_mine:"Download my prospectus",pr_incl:"Contents",pr_i1:"Company summary + main products",pr_i2:"Sector, HS code, MOQ",pr_i3:"Verification badges (tax, registry, e-mail)",pr_i4:"Certifications (ISO, GOTS, HACCP)",pr_i5:"Contact details + QR code",pr_who:"Who is it for?",pr_l1:"Info sharing before buyer meetings",pr_l2:"Digital business card at fairs and events",pr_l3:"Reference on social media and websites",s3_media:"Logo",s4_social:"Social",s5_doc:"Documents",s6_pub:"Publish",sec_biz:"Business Info",sec_visual:"Visual Identity",sec_social:"Social Media & Web",sec_legal:"Legal Info",social_intro:"Your social media and communication channels — buyers will reach you here.",ss_h:"Companies that trust Kervea",ss_p:"Verified manufacturers and exporters, part of the active network in 6 continents.",ss_5t:"Antep Spices",ss_5s:"Gaziantep · Red pepper",tm_title:"Team Management",tm_sub:"Manage your company's users, roles, and access permissions.",tm_seats:"Seat usage",tm_invite:"+ Invite User",tm_col_user:"User",tm_role:"Role",tm_perms:"Permissions",tm_status:"Status",tm_last:"Last Login",tm_active:"Active",tm_pending:"Pending",tm_owner:"Owner",tm_admin:"Admin",tm_sales:"Sales",tm_ops:"Operations",tm_p_all:"All permissions",tm_p_msg:"Msg + Contacts",tm_p_prof:"Profile + Docs",vs_prev:"Preview",why_h:"Why Kervea?",why_p:"Direct contact with verified companies. No commissions, no unreliable suppliers, just real trade.",why_1t:"Country corridor",why_2t:"Verified company",why_3t:"6-language translation",chat_online:"Online",chat_verified_firm:"Verified company",chat_typing:"is typing…",chat_btn_firm:"Company profile",chat_btn_video:"Video call",chat_btn_archive:"Archive",empty_firms:"No companies match your filter.",empty_records:"No records match your filter.",toast_name_required:"Full name is required",toast_valid_email:"Enter a valid email",toast_invalid_promo:"Invalid promo code",toast_search_applied:"Search applied",toast_csv_downloaded:"CSV downloaded",toast_pdf_downloaded:"Prospectus downloaded",toast_photo_removed:"Photo removed",toast_photo_uploaded:"Photo uploaded",toast_logo_uploaded:"Logo uploaded",toast_login_ok:"Sign-in successful",toast_login_full:"Signed in — full access active",toast_logout:"Signed out",toast_credit_out:"Out of credits — upgrade your plan",toast_docs_opening:"Opening document uploader",toast_firm_opening:"Opening company profile",toast_firm_notfound:"Company not found",toast_firm_error:"Error opening company",toast_visual_saved:"Visual identity saved",toast_video_call:"Starting video call",toast_cover_updated:"Cover updated",toast_chat_archived:"Conversation archived",toast_profile_updated:"Profile updated",toast_delete_requested:"Deletion request received — will be completed in 7 days",toast_social_saved:"Social media info saved",toast_form_opened:"Request form opened",toast_print_pdf:"Save as PDF from your browser's print menu",toast_trade_saved:"Trade info saved",toast_all_tasks:"Showing all tasks",toast_data_export:"Preparing your data, link will be sent by email",toast_legal_saved:"Legal info saved",toast_cancelled:"Cancelled",toast_copied:"Copied to clipboard",confirm_delete_account:"Your account and all your data will be permanently deleted. Are you sure?",tm_inv_h:"Invite New User",tm_inv_sub:"Add a new team member to your company. The invitation is sent by email; the user becomes active when they accept.",tm_fld_name:"Full Name *",tm_fld_email:"Email *",tm_fld_role:"Role *",tm_role_admin:"Administrator",tm_role_admin_desc:"All modules · can invite",tm_role_sales:"Sales",tm_role_sales_desc:"Messaging + Contacts",tm_role_ops:"Operations",tm_role_ops_desc:"Profile + Documents",tm_role_view:"View Only",tm_role_view_desc:"Read-only access",tm_inv_info:"You can change the role later. This user will be the 5th of your <b>4/10 seats</b>.",tm_btn_invite:"Send Invitation",btn_cancel:"Cancel",tm_perm_h:"Edit Role & Permissions",tm_perm_sub:"Specify which modules this user can access.",tm_lbl_role:"Role",tm_lbl_perms:"Permissions",tm_role_admin_short:"All modules",tm_role_sales_short:"Msg + Contacts",tm_role_view_short:"Read",tm_perm_msg:"Messaging",tm_perm_msg_desc:"Access to all conversations, sending messages, and file sharing.",tm_perm_match:"Matches & Contacts",tm_perm_match_desc:"View AI match suggestions, use contact credits.",tm_perm_prof:"Company Profile",tm_perm_prof_desc:"Edit company info, gallery, and social media links.",tm_perm_docs:"Documents",tm_perm_docs_desc:"Upload and approve certificates, tax certificates, and registered mail documents.",tm_perm_ana:"Analytics",tm_perm_ana_desc:"Network access, conversion rate, competitor comparison, and reports.",tm_perm_team:"Team Management",tm_perm_team_desc:"Invite new users, assign roles, deactivate accounts.",tm_btn_save:"Save Changes",toast_saved:"Saved",ph_tm_name:"E.g. John Smith",ph_tm_email:"john@company.com",pay_card_holder:"CARDHOLDER",pay_card_holder_ph:"FULL NAME",pay_card_exp_short:"EXPIRES",pay_per_month:"/mo",pay_method_card:"Card",pay_method_mc:"MC",pay_method_bank:"Bank Transfer",pay_card_holder_lbl:"Cardholder",ph_card_holder:"FULL NAME",ph_promo:"Promo code (optional)",toast_pay_success:"Payment successful — Pro active",pay_disclaimer:"By completing payment, you accept the <a onclick=\"openM('sozl')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">User Agreement</a> and <a onclick=\"openM('kvkk')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">Privacy Notice</a>.",modal_kvkk_h:"Privacy Notice (Turkish KVKK)",modal_sozl_h:"User Agreement",modal_cookie_h:"Privacy and Cookie Policy",legal_disclaimer:"<b>ⓘ</b> This document is the Turkish legal original. It is binding under Turkish law. Translations in other languages are for informational purposes only.",viewers_h:"Profile Viewers",viewers_sub:"Country detected by IP address · Last 30 days",add_draft_btn:"Continue Later",add_draft_saved:"Draft saved — sign in to continue",dir_both:"Both",pay_tt_cash:"TT Cash",pay_tt_30:"TT 30 days",pay_tt_60:"TT 60 days",toast_logo_removed:"Logo removed",toast_cover_uploaded:"Cover uploaded",consent_kvkk:"I have read and accept the <b>Privacy Notice</b>.",consent_terms:"I accept the <b>User Agreement</b>.",consent_verify:"I authorize verification checks on my data.",consent_marketing:"I agree to receive marketing communications (optional).",consent_read:"Read",consent_read2:"Read",ph_cname:"E.g. XYZ Trade Co. Ltd.",ph_address:"Street, No, District / City / Country",ph_fullname:"Full Name",ph_gm:"General Manager",ph_products:"E.g. Cotton yarn, Woven fabric, Knitted fabric",ph_desc:"Describe your company, production capacity, and export markets in one paragraph...",an_ip_based:"● IP-based",an_visitors_sub:"Countries your visitors come from (last 30 days)",an_pulse_h:"Market Pulse — HS Code Trends",an_pulse_sub:"8-week demand-supply shift in your sector · Sourced from Trademap",an_p1_nm:"Cotton woven fabric",an_p1_sub:"Germany, Netherlands, France · strong buyer signal",an_p2_nm:"Furniture (metal frame)",an_p2_sub:"Finland, Norway · order volume at record high",an_p3_nm:"Wooden pallets, crates",an_p3_sub:"Nigeria, Algeria · volatile due to new tariff",an_p4_nm:"Cotton yarn (carded)",an_p4_sub:"Kazakhstan, Uzbekistan · raw material price receding",an_p5_nm:"Iron/steel goods",an_p5_sub:"Egypt, Morocco · port congestion easing",an_data_freq:"Data refresh frequency: 24 hours",an_full_report:"Full report →",an_opening_report:"Opening detailed analysis",an_ai_alerts_h:"AI Alert Center",an_ai_alerts_sub:"Opportunities and risks detected for your company",an_priority_high:"High priority",an_priority_med:"Medium priority",an_priority_opp:"Opportunity",an_priority_tip:"Tip",an_alert1_nm:"response time critical",an_alert1_desc:"Waiting 3 days. If your average response time exceeds 4 hours, match quality drops.",an_alert2_nm:"Your tax certificate must be renewed within 8 days",an_alert2_desc:"Unrenewed documents cause a drop in company ranking. Go to My Documents → Upload.",an_alert3_nm:"New opportunity: HS 6006 German buyers",an_alert3_desc:"6 new buyers matching your profile detected. A fast-growing corridor in the knitted fabric sector.",an_alert4_nm:"Profile completion suggestion",an_alert4_desc:"Adding 7 more images to the gallery will raise your profile score from 94% to 100%.",an_security_h:"Security & Verification Status",an_sec1_nm:"2FA Active",an_sec2_nm:"Tax Certificate",an_status_approved:"Approved",an_sec3_nm:"Trade Registry",an_status_verified:"Verified",an_sec4_nm:"Registered E-mail",an_status_active:"Active",an_sec5_sub:"Renewal in 15 days",an_sec6_sub:"All communication encrypted",an_sec7_nm:"GDPR Compliant",an_sec7_sub:"Privacy Notice v1.2",an_sec8_sub:"IP + rate limiting active",an_deep_h:"Deep Analysis",fl_yourmsg:"Your message",btn_send:"Send",toast_msg_sent:"Message sent",fl_password:"Password",btn_login:"Log in",stat_today:"today",stat_this_week:"this week",stat_soon:"soon",ft_kvkk:"Privacy Notice",ft_terms:"Terms of Service",ft_cookie:"Privacy/Cookies",ft_tagline:"Modern Silk Road",fp_decisionmakers:"Decision Makers",fp_detail:"Details",fp_gotoallppl:"Go to all contacts →",fp_gal1:"Showroom",fp_gal2:"Production Facility",fp_gal3:"Warehouse",fp_gal4:"Team",fp_gal5:"Quality Control",fp_gal6:"Certificates",lock_title:"Contact details are available for Pro members",lock_sub:"WhatsApp, phone, email and website become instantly visible when your Pro membership starts.",lock_cta:"Upgrade to Pro",sec_social_short:"Social Media",dene_lbl:"TRY",qt1:"Furniture accessory buyer in Finland",qt2:"Cocoa supplier in Ivory Coast",qt3:"Textile buyer in Kazakhstan",qf_lbl:"QUICK FILTER",f_exp:"Export",f_imp:"Import",
     s_pos:"Active firms",s_ctr:"Countries and territories",s_sec:"Sectors",s_lng:"Languages",
     firms_h:"Companies",firms_cnt:"matches · sorted by score",sort_lbl:"Sort:",sort_match:"Match",sort_year:"Year",sort_name:"Name",
     add_h:"Add Your Company",add_p:"Global visibility in 6 steps.",s1:"Company",s2:"Sector",s3:"Docs",s4:"Consent",s5:"Publish",prev:"← Prev",next:"Next →",
     pr_h:"Plans",pr_p:"Your global visibility tier.",ct_h:"Contact",ct_p:"We're here to help.",
     lg_h:"Sign In",lg_p:"Access your Kervea account",pn_h:"Company Panel",pn_p:"Manage your profile, matches and messages.",
     p_over:"Overview",p_matches:"Matches",p_profile:"My Profile",p_msgs:"Messages",p_com:"Commitments",p_pros:"Prospectus",p_set:"Settings",p_out:"Sign Out",
     all_sec:"— All sectors",sel_ctr:"Select country",dd_search:"Search country...",
     dir_exp:"EXPORTING",dir_imp:"IMPORTING",match_score:"MATCH",verified:"Verified",
     detail:"Details",message:"Send Message",match_col:"Company",prod_col:"Product",sec_col:"Sector",ctr_col:"Country",score_col:"Match",action_col:"Action"},
 es:{nav_home:"Inicio",nav_add:"Añadir",nav_pricing:"Precios",nav_about:"Nosotros",nav_contact:"Contacto",nav_login:"Ingresar",nav_panel:"Panel",
     tag_live:"TURQUÍA ↔ MUNDO · 6 IDIOMAS",h_title:"Encuentra tu comprador o proveedor en la <em>Ruta de la Seda</em> moderna.",h_lead:"Empresas verificadas mediante certificado fiscal y registro mercantil. Mensajería en 6 idiomas, cifrada de extremo a extremo.",
     f_match:"Emparejar",fm_fullpage:"Abrir página completa",fm_fullpage_tt:"Mostrar esta empresa en página completa",pp_live_prev:"VISTA EN VIVO",pr_dl_pdf:"Descargar mi folleto en PDF",step_prev:"Anterior",step_next:"Siguiente",step_of:"·",step_publish:"Publicar · Guardar Empresa",creds_continue:"Continuar al Pago",creds_back:"Volver a paquetes",creds_onetime:"Pago único",pay_err_card:"Ingrese un número de tarjeta válido",pay_err_name:"Ingrese el nombre del titular",pay_err_exp:"Ingrese vencimiento como MM/AA",pay_err_cvc:"Ingrese CVC",ppl_pw_h:"Acceso directo a tomadores de decisiones para miembros Pro",ppl_pw_sub:"Alcance 2.400+ CEOs, gerentes de compras y especialistas verificados con un clic. 100 créditos mensuales incluidos con Pro.",ppl_pw_stat1:"Tomadores de decisión",ppl_pw_stat2:"Créditos mensuales",ppl_pw_stat3:"Verificado",ppl_pw_cta:"Actualizar a Pro",ppl_pw_note:"$29/mes · Cancele cuando quiera",creds_h:"Paquetes de Créditos",creds_sub:"Cada correo o teléfono es 1 crédito. Los créditos no usados se transfieren al mes siguiente.",creds_current:"créditos actualmente disponibles",creds_lbl:"Créditos",creds_per_lbl:"crédito",creds_save10:"10% ahorro",creds_save15:"15% ahorro",creds_you_get:"Obtiene",creds_buy_btn:"Comprar",creds_secure:"Pago seguro con Stripe · 3D Secure",creds_pick_pack:"Seleccione un paquete",creds_added:"créditos añadidos",creds_charged:"cobrado",creds_add_btn:"Añadir Créditos",pay_h:"Pago — Plan Pro",pay_plan:"Kervea Pro",pay_kdv:"IVA (20%)",pay_disc:"Descuento",pay_total:"Total",pay_card:"Número de Tarjeta",pay_exp:"Vencimiento",pay_btn:"Pagar",apply:"Aplicar",bill_m:"Mensual",bill_y:"Anual",bill_save:"−20%",per_month:"/mes",ct_name:"Nombre Completo",ct_email:"Correo Electrónico",ct_subject:"Asunto",ct_ph_name:"Su nombre",ct_ph_email:"usted@empresa.com",ct_ph_subject:"¿En qué podemos ayudarle?",ct_center:"Sede Central",ct_email_lbl:"Correo:",ct_phone_lbl:"Teléfono:",lg_sso_google:"Continuar con Google",lg_sso_ms:"Continuar con Microsoft",lg_sso_apple:"Continuar con Apple",lg_or_email:"o con correo electrónico",pri_h:"acciones pendientes — requieren su atención",pri_sub:"2 nuevas coincidencias de alto puntaje esperando respuesta · 1 renovación de contrato próxima · Actualización de documento requerida",pri_open_matches:"Abrir Coincidencias",pri_all:"Todos",range_7d:"7d",range_30d:"30d",range_90d:"90d",range_1y:"1a",ac_title:"Cronología de Actividad",ac_sub:"Registro completo de los últimos 30 días.",ac_filter_all:"Todos",ac_filter_match:"Coincidencias",ac_filter_msg:"Mensajes",ac_filter_prof:"Perfil",ac_filter_doc:"Documentos",all_dir:"Todas direcciones",all_scores:"Todas puntuaciones",attention:"atención",back_list:"Volver a lista de empresas",cancel:"Cancelar",custom:"Personalizado",contact_sales:"Contactar ventas",export_csv:"CSV",remove:"Quitar",upload:"Cargar",save_all:"Guardar Todo",results:"resultados",complete:"Completado",stable:"Estable",preview_page:"Vista previa",ch_ctr:"Distribución por País",ch_trend:"Tendencia de crecimiento",ck_logo:"Logo cargado",ck_doc:"Documentos aprobados",ck_social:"Redes sociales conectadas",ck_gal:"Galería (5/12 imágenes)",cover_h:"Imagen de Portada",cover_lbl:"Imagen de Portada · 1600×400",cover_tt:"Cargar foto de portada",cover_st:"Se muestra arriba de su página · 1600×400px recomendado · máx 5MB",cover_change:"Cargar o cambiar foto de portada",doc_h:"Documentos *",doc_txt:"📄 Certificado de Actividad, Gaceta del Registro, Circular de Firma, Certificados de Calidad",doc_hint:"PDF, JPG, PNG · máx 10MB por archivo · hasta 20 documentos",ent_p:"Kervea Enterprise · solución personalizada",ent_1:"Empresas ilimitadas, contactos, matching avanzado, exportación",ent_2:"Integración personalizada (SAP, Logo, Netsis, Zoho, HubSpot)",ent_3:"Perfil de marca blanca (su propia marca)",ent_4:"Acceso API dedicado + soporte web-hook",ent_5:"SLA + soporte prioritario (garantía de respuesta de 4 horas)",ent_6:"Gerente de cuenta dedicado",ent_7:"Sesiones mensuales de formación y estrategia",fl_cname:"Nombre de Empresa *",fl_ctitle:"Razón Social (EN)",fl_tax:"NIF / Tax ID *",fl_mersis:"MERSIS / Nº Registro",fl_year:"Año de Fundación *",fl_emp:"Nº de Empleados",fl_country:"País *",fl_city:"Ciudad",fl_kep:"Email Registrado",fl_web:"Sitio Web",fl_email:"Correo *",fl_phone:"Teléfono *",fl_repname:"Nombre del Contacto *",fl_reptitle:"Cargo del Contacto",fl_address:"Dirección de Empresa",fl_sec:"Sector Principal *",fl_dir:"Dirección de Comercio *",fl_hs:"Código HS (separados por coma)",fl_moq:"MOQ (Pedido Mínimo)",fl_inc:"Preferencia INCOTERM",fl_pay:"Método de Pago",fl_products:"Productos / Servicios Principales",fl_desc:"Descripción de Empresa *",fl_certs:"Certificaciones",gal_h:"Fotos de Producto / Instalación (máx 12)",gal_tt:"Arrastre imágenes o seleccione",gal_st:"JPG, PNG, WEBP · máx 5MB cada uno · hasta 12 imágenes",gal_lbl:"Fotos de Producto / Instalación",gal_add:"Añadir imagen · Arrastrar y soltar",gal_max:"JPG/PNG/WEBP · hasta 12 imágenes · máx 5MB cada uno",hiw_tag:"PROCESO",hiw_h:"Contacto directo. <em style=\"font-style:normal;color:var(--teal)\">Solo comercio real</em>.",hiw_1a:"01",hiw_1t:"Cree su perfil de empresa",hiw_1b:"Visibilidad global en 6 pasos",hiw_1c:"Prom 8 minutos · verificación manual 24 horas",hiw_2a:"02",hiw_2t:"Deje que el matching de IA trabaje",hiw_2b:"Recomendaciones ordenadas por puntaje",hiw_2c:"20+ coincidencias en 3-5 minutos",hiw_3a:"03",hiw_3t:"Contacto directo, traducción en tiempo real",hiw_3b:"Contacto directo · sin comisión",hiw_3c:"Tiempo de respuesta promedio 4 horas",kpi_match:"Nuevas Coincidencias",kpi_msg:"Nuevos Mensajes",kpi_offer:"Ofertas",kpi_view:"Vistas",logo_h:"Logo de Empresa *",logo_hint:"Recomendado: 400×400px, PNG/JPG/SVG, máx 2MB",logo_hint2:"PNG · fondo transparente · mín 200×200",logo_lbl:"Logo de Empresa",msg_h:"Mensajes",msg_sub:"Comunicación directa con empresas verificadas. Cifrado E2E. Traducción automática en 6 idiomas.",mt_h:"Mis Coincidencias",mt_sub:"El motor de IA los ordenó. Filtre, exporte, mensaje directo.",ov_hello:"Hola",ov_sub:"Aquí está el resumen de los últimos 30 días.",ov_recent:"Actividad Reciente",ov_status:"Salud del Perfil",ov_ev1:"envió una nueva oferta",ov_ev2:"envió un mensaje",ov_ev3:"vio su perfil",ov_ev4:"Certificado ISO 9001 verificado",ov_ev5:"solicitud de conexión",ov_t1:"hace 2 horas",ov_t2:"hace 4 horas",ov_t3:"hace 1 día",ov_t4:"hace 2 días",ov_t5:"hace 3 días",p_ana:"Analítica",p_people:"Contactos",p_docs:"Mis Documentos",p_team:"Equipo",p_activity:"Actividad",plan_starter:"Starter",starter_p:"Gratis · ideal para empezar",starter_1:"1 perfil de empresa + insignia de verificación",starter_2:"50 coincidencias por mes",starter_3:"Filtrado básico por sector",starter_4:"Traducción automática en 6 idiomas",starter_5:"Mensajería limitada (5/día)",starter_6:"Soporte estándar",start_starter:"Empezar Gratis",pro_p:"Kervea Pro · más popular",pro_1:"Todo en Starter",pro_2:"Coincidencias ilimitadas + IA avanzada",pro_3:"Empresas ilimitadas, contactos, matching avanzado, exportación",pro_4:"Mensajería ilimitada + posición prioritaria",pro_5:"Panel de analítica (visitantes, conversión, competidores)",pro_6:"Perfil destacado · visibilidad prioritaria",pro_7:"Soporte prioritario (24 horas)",start_pro:"Actualizar a Pro",prof_h:"Mi Perfil de Empresa",prof_sub:"Actualice información, imágenes y canales de contacto.",promo_h:"¿Tiene Código Promocional?",promo_s:"30% descuento en Pro los primeros 3 meses.",promo_h2:"Ingrese Código",promo_s2:"Códigos especiales para primeros usuarios y miembros de cámara.",pub_h:"Solicitud recibida",pub_p:"La verificación manual se completa en 24-48 horas. Se le notificará por email y SMS al publicar.",ppl_title:"Contactos",ppl_sub:"Contactos directos de tomadores de decisiones. 1 crédito por contacto.",ppl_credits:"Créditos",ppl_renew:"Renovar créditos",ppl_export:"Exportar",ppl_all:"Todos",ppl_ceo:"CEO / Director General",ppl_purchasing:"Compras",ppl_sales:"Ventas",ppl_ops:"Operaciones",ppl_col_person:"Persona",ppl_col_title:"Cargo",ppl_col_firm:"Empresa",ppl_col_email:"Correo",ppl_col_phone:"Teléfono",ppl_col_act:"Acción",ppl_kvkk:"Esta información se comparte cumpliendo la ley de protección de datos y con consentimiento del representante.",ppl_kvkk_link:"Aviso de Privacidad",pr_title:"Folleto",pr_desc:"Un resumen profesional completo — PDF listo para reuniones.",pr_dl:"Descargar como PDF",pr_pdf:"Folleto PDF",pr_langs:"En 6 idiomas",pr_mine:"Descargar mi folleto",pr_incl:"Contenido",pr_i1:"Resumen + productos principales",pr_i2:"Sector, HS, MOQ",pr_i3:"Insignias (fiscal, registro, e-mail)",pr_i4:"Certificaciones (ISO, GOTS, HACCP)",pr_i5:"Contacto + código QR",pr_who:"¿Para quién?",pr_l1:"Compartir info antes de reuniones",pr_l2:"Tarjeta digital en ferias",pr_l3:"Referencia en redes y web",s3_media:"Logo",s4_social:"Social",s5_doc:"Docs",s6_pub:"Publicar",sec_biz:"Info Comercial",sec_visual:"Identidad Visual",sec_social:"Redes Sociales y Web",sec_legal:"Info Legal",social_intro:"Sus redes sociales y canales — los compradores le contactarán aquí.",ss_h:"Empresas que confían en Kervea",ss_p:"Fabricantes y exportadores verificados en 6 continentes.",ss_5t:"Antep Especias",ss_5s:"Gaziantep · Pimiento rojo",tm_title:"Gestión de Equipo",tm_sub:"Gestione usuarios, roles y permisos.",tm_seats:"Uso de asientos",tm_invite:"+ Invitar Usuario",tm_col_user:"Usuario",tm_role:"Rol",tm_perms:"Permisos",tm_status:"Estado",tm_last:"Último Acceso",tm_active:"Activo",tm_pending:"Pendiente",tm_owner:"Propietario",tm_admin:"Admin",tm_sales:"Ventas",tm_ops:"Operaciones",tm_p_all:"Todos los permisos",tm_p_msg:"Msj + Contactos",tm_p_prof:"Perfil + Docs",vs_prev:"Vista previa",why_h:"¿Por qué Kervea?",why_p:"Diga adiós a intermediarios, comisiones y proveedores no confiables. Contacto directo, empresas verificadas, comercio real.",why_1t:"Corredor de país",why_2t:"Empresa verificada",why_3t:"Traducción en 6 idiomas",chat_online:"En línea",chat_verified_firm:"Empresa verificada",chat_typing:"está escribiendo…",chat_btn_firm:"Perfil de empresa",chat_btn_video:"Videollamada",chat_btn_archive:"Archivar",empty_firms:"Ninguna empresa coincide con su filtro.",empty_records:"No hay registros que coincidan.",toast_name_required:"Nombre completo es obligatorio",toast_valid_email:"Ingrese un correo válido",toast_invalid_promo:"Código promo inválido",toast_search_applied:"Búsqueda aplicada",toast_csv_downloaded:"CSV descargado",toast_pdf_downloaded:"Folleto descargado",toast_photo_removed:"Foto eliminada",toast_photo_uploaded:"Foto cargada",toast_logo_uploaded:"Logo cargado",toast_login_ok:"Inicio de sesión exitoso",toast_login_full:"Sesión iniciada — acceso completo activo",toast_logout:"Sesión cerrada",toast_credit_out:"Sin créditos — actualice su plan",toast_docs_opening:"Abriendo cargador de documentos",toast_firm_opening:"Abriendo perfil de empresa",toast_firm_notfound:"Empresa no encontrada",toast_firm_error:"Error al abrir la empresa",toast_visual_saved:"Identidad visual guardada",toast_video_call:"Iniciando videollamada",toast_cover_updated:"Portada actualizada",toast_chat_archived:"Conversación archivada",toast_profile_updated:"Perfil actualizado",toast_delete_requested:"Solicitud de eliminación recibida — se completará en 7 días",toast_social_saved:"Información de redes sociales guardada",toast_form_opened:"Formulario de solicitud abierto",toast_print_pdf:"Guarde como PDF desde el menú imprimir",toast_trade_saved:"Info comercial guardada",toast_all_tasks:"Mostrando todas las tareas",toast_data_export:"Preparando datos, se enviará enlace por correo",toast_legal_saved:"Información legal guardada",toast_cancelled:"Cancelado",toast_copied:"Copiado al portapapeles",confirm_delete_account:"Su cuenta y todos sus datos serán eliminados permanentemente. ¿Está seguro?",tm_inv_h:"Invitar Nuevo Usuario",tm_inv_sub:"Agregue un nuevo miembro del equipo a su empresa. La invitación se envía por correo; se activa cuando el usuario acepta.",tm_fld_name:"Nombre Completo *",tm_fld_email:"Correo *",tm_fld_role:"Rol *",tm_role_admin:"Administrador",tm_role_admin_desc:"Todos los módulos · puede invitar",tm_role_sales:"Ventas",tm_role_sales_desc:"Mensajería + Contactos",tm_role_ops:"Operaciones",tm_role_ops_desc:"Perfil + Documentos",tm_role_view:"Solo Lectura",tm_role_view_desc:"Solo acceso de lectura",tm_inv_info:"Puede cambiar el rol más tarde. Este usuario será el 5º de sus <b>4/10 asientos</b>.",tm_btn_invite:"Enviar Invitación",btn_cancel:"Cancelar",tm_perm_h:"Editar Rol y Permisos",tm_perm_sub:"Especifique a qué módulos puede acceder este usuario.",tm_lbl_role:"Rol",tm_lbl_perms:"Permisos",tm_role_admin_short:"Todos los módulos",tm_role_sales_short:"Msj + Contactos",tm_role_view_short:"Lectura",tm_perm_msg:"Mensajería",tm_perm_msg_desc:"Acceso a todas las conversaciones, envío de mensajes y compartición de archivos.",tm_perm_match:"Coincidencias y Contactos",tm_perm_match_desc:"Ver sugerencias de coincidencias de IA, usar créditos de contacto.",tm_perm_prof:"Perfil de Empresa",tm_perm_prof_desc:"Editar información de empresa, galería y enlaces de redes sociales.",tm_perm_docs:"Documentos",tm_perm_docs_desc:"Cargar y aprobar certificados, certificado fiscal y documentos oficiales.",tm_perm_ana:"Analítica",tm_perm_ana_desc:"Acceso a la red, tasa de conversión, comparación con competidores e informes.",tm_perm_team:"Gestión de Equipo",tm_perm_team_desc:"Invitar nuevos usuarios, asignar roles, desactivar cuentas.",tm_btn_save:"Guardar Cambios",toast_saved:"Guardado",ph_tm_name:"Ej. Juan Pérez",ph_tm_email:"juan@empresa.com",pay_card_holder:"TITULAR",pay_card_holder_ph:"NOMBRE COMPLETO",pay_card_exp_short:"VENCE",pay_per_month:"/mes",pay_method_card:"Tarjeta",pay_method_mc:"MC",pay_method_bank:"Transferencia",pay_card_holder_lbl:"Titular",ph_card_holder:"NOMBRE COMPLETO",ph_promo:"Código promo (opcional)",toast_pay_success:"Pago exitoso — Pro activo",pay_disclaimer:"Al completar el pago, acepta el <a onclick=\"openM('sozl')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">Acuerdo de Usuario</a> y el <a onclick=\"openM('kvkk')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">Aviso de Privacidad</a>.",modal_kvkk_h:"Aviso de Privacidad (KVKK Turco)",modal_sozl_h:"Acuerdo de Usuario",modal_cookie_h:"Política de Privacidad y Cookies",legal_disclaimer:"<b>ⓘ</b> Este documento es el original legal turco. Es vinculante bajo la ley turca. Las traducciones a otros idiomas son solo para fines informativos.",viewers_h:"Visitantes del Perfil",viewers_sub:"País detectado por dirección IP · Últimos 30 días",add_draft_btn:"Continuar Después",add_draft_saved:"Borrador guardado — inicie sesión para continuar",dir_both:"Ambos",pay_tt_cash:"TT al contado",pay_tt_30:"TT 30 días",pay_tt_60:"TT 60 días",toast_logo_removed:"Logo eliminado",toast_cover_uploaded:"Portada cargada",consent_kvkk:"He leído y acepto el <b>Aviso de Privacidad</b>.",consent_terms:"Acepto el <b>Acuerdo de Usuario</b>.",consent_verify:"Autorizo la verificación de mis datos.",consent_marketing:"Acepto recibir comunicaciones comerciales (opcional).",consent_read:"Leer",consent_read2:"Leer",ph_cname:"Ej. Kervea Textil S.L.",ph_address:"Calle, Nº, Distrito / Ciudad / País",ph_fullname:"Nombre completo",ph_gm:"Director General",ph_products:"Ej. Hilo de algodón, Tela tejida, Tela de punto",ph_desc:"Describa su empresa, capacidad de producción y mercados de exportación en un párrafo...",an_ip_based:"● Basado en IP",an_visitors_sub:"Países de origen de tus visitantes (últimos 30 días)",an_pulse_h:"Pulso del Mercado — Tendencias del Código HS",an_pulse_sub:"Cambio de oferta-demanda de 8 semanas en su sector · Fuente Trademap",an_p1_nm:"Tela de algodón tejido",an_p1_sub:"Alemania, Países Bajos, Francia · señal de comprador fuerte",an_p2_nm:"Muebles (estructura metálica)",an_p2_sub:"Finlandia, Noruega · volumen de pedidos en récord",an_p3_nm:"Paletas de madera, cajones",an_p3_sub:"Nigeria, Argelia · volátil por nueva tarifa",an_p4_nm:"Hilo de algodón (cardado)",an_p4_sub:"Kazajistán, Uzbekistán · precio de materia prima cediendo",an_p5_nm:"Artículos de hierro/acero",an_p5_sub:"Egipto, Marruecos · congestión portuaria disminuyendo",an_data_freq:"Frecuencia de actualización de datos: 24 horas",an_full_report:"Informe completo →",an_opening_report:"Abriendo análisis detallado",an_ai_alerts_h:"Centro de Alertas de IA",an_ai_alerts_sub:"Oportunidades y riesgos detectados para su empresa",an_priority_high:"Prioridad alta",an_priority_med:"Prioridad media",an_priority_opp:"Oportunidad",an_priority_tip:"Consejo",an_alert1_nm:"tiempo de respuesta crítico",an_alert1_desc:"3 días de espera. Si el tiempo medio de respuesta supera 4 horas, la calidad de coincidencia baja.",an_alert2_nm:"Su certificado fiscal debe renovarse en 8 días",an_alert2_desc:"Los documentos no renovados causan una caída en el ranking. Vaya a Mis Documentos → Cargar.",an_alert3_nm:"Nueva oportunidad: HS 6006 compradores alemanes",an_alert3_desc:"Se detectaron 6 nuevos compradores compatibles. Un corredor de rápido crecimiento en el sector de tejidos de punto.",an_alert4_nm:"Sugerencia de finalización de perfil",an_alert4_desc:"Añadir 7 imágenes más a la galería subirá su puntuación de perfil del 94% al 100%.",an_security_h:"Estado de Seguridad y Verificación",an_sec1_nm:"2FA Activo",an_sec2_nm:"Certificado Fiscal",an_status_approved:"Aprobado",an_sec3_nm:"Registro Mercantil",an_status_verified:"Verificado",an_sec4_nm:"Email Registrado",an_status_active:"Activo",an_sec5_sub:"Renovación en 15 días",an_sec6_sub:"Toda la comunicación cifrada",an_sec7_nm:"Compatible GDPR",an_sec7_sub:"Aviso de Privacidad v1.2",an_sec8_sub:"IP + limitación de tasa activa",an_deep_h:"Análisis Profundo",fl_yourmsg:"Su mensaje",btn_send:"Enviar",toast_msg_sent:"Mensaje enviado",fl_password:"Contraseña",btn_login:"Iniciar sesión",stat_today:"hoy",stat_this_week:"esta semana",stat_soon:"pronto",ft_kvkk:"Aviso de privacidad",ft_terms:"Términos del servicio",ft_cookie:"Privacidad/Cookies",ft_tagline:"Ruta de la Seda Moderna",fp_decisionmakers:"Responsables de Decisión",fp_detail:"Detalles",fp_gotoallppl:"Ver todos los contactos →",fp_gal1:"Sala de Exposición",fp_gal2:"Planta de Producción",fp_gal3:"Almacén",fp_gal4:"Equipo",fp_gal5:"Control de Calidad",fp_gal6:"Certificados",lock_title:"Los datos de contacto están disponibles para miembros Pro",lock_sub:"WhatsApp, teléfono, email y sitio web se muestran al instante al iniciar tu membresía Pro.",lock_cta:"Actualizar a Pro",sec_social_short:"Redes Sociales",dene_lbl:"PROBAR",qt1:"Comprador de accesorios de muebles en Finlandia",qt2:"Proveedor de cacao en Costa de Marfil",qt3:"Comprador textil en Kazajistán",qf_lbl:"FILTRO RÁPIDO",f_exp:"Exportación",f_imp:"Importación",
     s_pos:"Empresas activas",s_ctr:"Países y territorios",s_sec:"Sectores",s_lng:"Idiomas",
     firms_h:"Empresas",firms_cnt:"coincidencias · ordenadas por puntuación",sort_lbl:"Ordenar:",sort_match:"Coincidencia",sort_year:"Año",sort_name:"Nombre",
     add_h:"Añade tu Empresa",add_p:"Visibilidad global en 6 pasos.",s1:"Empresa",s2:"Sector",s3:"Docs",s4:"Consentim.",s5:"Publicar",prev:"← Anterior",next:"Siguiente →",
     pr_h:"Planes",pr_p:"Tu nivel de visibilidad global.",ct_h:"Contacto",ct_p:"Estamos aquí para ayudar.",
     lg_h:"Iniciar Sesión",lg_p:"Accede a tu cuenta Kervea",pn_h:"Panel de Empresa",pn_p:"Gestiona tu perfil, coincidencias y mensajes.",
     p_over:"Resumen",p_matches:"Coincidencias",p_profile:"Mi Perfil",p_msgs:"Mensajes",p_com:"Compromisos",p_pros:"Prospecto",p_set:"Ajustes",p_out:"Salir",
     all_sec:"— Todos los sectores",sel_ctr:"Selecciona país",dd_search:"Buscar país...",
     dir_exp:"EXPORTA",dir_imp:"IMPORTA",match_score:"COINCIDENCIA",verified:"Verificado",
     detail:"Detalles",message:"Enviar Mensaje",match_col:"Empresa",prod_col:"Producto",sec_col:"Sector",ctr_col:"País",score_col:"Match",action_col:"Acción"},
 fr:{nav_home:"Accueil",nav_add:"Ajouter",nav_pricing:"Tarifs",nav_about:"À propos",nav_contact:"Contact",nav_login:"Connexion",nav_panel:"Panneau",
     tag_live:"TURQUIE ↔ MONDE · 6 LANGUES",h_title:"Trouvez votre acheteur ou fournisseur sur la <em>Route de la Soie</em> moderne.",h_lead:"Entreprises vérifiées par certificat fiscal et registre du commerce. Messagerie en 6 langues, chiffrement de bout en bout.",
     f_match:"Correspondre",fm_fullpage:"Ouvrir en pleine page",fm_fullpage_tt:"Afficher cette entreprise en pleine page",pp_live_prev:"APERÇU EN DIRECT",pr_dl_pdf:"Télécharger mon prospectus en PDF",step_prev:"Précédent",step_next:"Suivant",step_of:"·",step_publish:"Publier · Enregistrer",creds_continue:"Continuer au Paiement",creds_back:"Retour aux packs",creds_onetime:"Paiement unique",pay_err_card:"Entrez un numéro de carte valide",pay_err_name:"Entrez le nom du titulaire",pay_err_exp:"Entrez l'expiration en MM/AA",pay_err_cvc:"Entrez le CVC",ppl_pw_h:"Accès direct aux décideurs pour les membres Pro",ppl_pw_sub:"Accédez à 2 400+ PDG, responsables achats et spécialistes vérifiés en un clic. 100 crédits mensuels inclus avec Pro.",ppl_pw_stat1:"Décideurs",ppl_pw_stat2:"Crédits mensuels",ppl_pw_stat3:"Vérifié",ppl_pw_cta:"Passer à Pro",ppl_pw_note:"$29/mois · Annulez à tout moment",creds_h:"Packs de Crédits",creds_sub:"Chaque e-mail ou téléphone est 1 crédit. Les crédits inutilisés reportés au mois suivant.",creds_current:"crédits actuellement disponibles",creds_lbl:"Crédits",creds_per_lbl:"crédit",creds_save10:"10% économie",creds_save15:"15% économie",creds_you_get:"Vous obtenez",creds_buy_btn:"Acheter",creds_secure:"Paiement sécurisé Stripe · 3D Secure",creds_pick_pack:"Sélectionnez un pack",creds_added:"crédits ajoutés",creds_charged:"prélevé",creds_add_btn:"Ajouter Crédits",pay_h:"Paiement — Plan Pro",pay_plan:"Kervea Pro",pay_kdv:"TVA (20%)",pay_disc:"Remise",pay_total:"Total",pay_card:"Numéro de Carte",pay_exp:"Expiration",pay_btn:"Payer",apply:"Appliquer",bill_m:"Mensuel",bill_y:"Annuel",bill_save:"−20%",per_month:"/mois",ct_name:"Nom Complet",ct_email:"E-mail",ct_subject:"Sujet",ct_ph_name:"Votre nom",ct_ph_email:"vous@entreprise.com",ct_ph_subject:"Comment pouvons-nous aider ?",ct_center:"Siège Social",ct_email_lbl:"E-mail :",ct_phone_lbl:"Téléphone :",lg_sso_google:"Continuer avec Google",lg_sso_ms:"Continuer avec Microsoft",lg_sso_apple:"Continuer avec Apple",lg_or_email:"ou par e-mail",pri_h:"action en attente — nécessite votre attention",pri_sub:"2 nouvelles correspondances à haut score en attente de réponse · 1 renouvellement de contrat approchant · Mise à jour de document requise",pri_open_matches:"Ouvrir les Correspondances",pri_all:"Tous",range_7d:"7j",range_30d:"30j",range_90d:"90j",range_1y:"1a",ac_title:"Chronologie d'Activité",ac_sub:"Enregistrement complet des 30 derniers jours.",ac_filter_all:"Tous",ac_filter_match:"Correspondances",ac_filter_msg:"Messages",ac_filter_prof:"Profil",ac_filter_doc:"Documents",all_dir:"Toutes directions",all_scores:"Tous scores",attention:"attention",back_list:"Retour à la liste",cancel:"Annuler",custom:"Personnalisé",contact_sales:"Contacter les ventes",export_csv:"CSV",remove:"Retirer",upload:"Charger",save_all:"Tout Enregistrer",results:"résultats",complete:"Terminé",stable:"Stable",preview_page:"Aperçu de la page",ch_ctr:"Répartition par Pays",ch_trend:"Tendance de croissance",ck_logo:"Logo téléversé",ck_doc:"Documents approuvés",ck_social:"Réseaux sociaux connectés",ck_gal:"Galerie (5/12 images)",cover_h:"Image de Couverture",cover_lbl:"Image de Couverture · 1600×400",cover_tt:"Charger la photo de couverture",cover_st:"S'affiche en haut de votre page · 1600×400px recommandé · max 5MB",cover_change:"Charger ou changer la photo de couverture",doc_h:"Documents *",doc_txt:"📄 Certificat d'Activité, Gazette du Registre, Circulaire de Signature, Certificats de Qualité",doc_hint:"PDF, JPG, PNG · max 10MB par fichier · jusqu'à 20 documents",ent_p:"Kervea Enterprise · solution sur mesure",ent_1:"Entreprises illimitées, contacts, matching avancé, export",ent_2:"Intégration sur mesure (SAP, Logo, Netsis, Zoho, HubSpot)",ent_3:"Profil marque blanche (votre propre marque)",ent_4:"Accès API dédié + support web-hook",ent_5:"SLA + support prioritaire (garantie de réponse en 4 heures)",ent_6:"Gestionnaire de compte dédié",ent_7:"Sessions mensuelles de formation et stratégie",fl_cname:"Nom de l'Entreprise *",fl_ctitle:"Raison Sociale (EN)",fl_tax:"Numéro Fiscal *",fl_mersis:"MERSIS / N° Registre",fl_year:"Année de Fondation *",fl_emp:"Nombre d'Employés",fl_country:"Pays *",fl_city:"Ville",fl_kep:"E-mail Enregistré",fl_web:"Site Web",fl_email:"E-mail *",fl_phone:"Téléphone *",fl_repname:"Nom du Contact *",fl_reptitle:"Titre du Contact",fl_address:"Adresse de l'Entreprise",fl_sec:"Secteur Principal *",fl_dir:"Direction du Commerce *",fl_hs:"Code HS (séparés par virgule)",fl_moq:"MOQ (Commande Minimum)",fl_inc:"Préférence INCOTERM",fl_pay:"Méthode de Paiement",fl_products:"Produits / Services Principaux",fl_desc:"Description de l'Entreprise *",fl_certs:"Certifications",gal_h:"Photos Produit / Installation (max 12)",gal_tt:"Glisser-déposer ou sélectionner",gal_st:"JPG, PNG, WEBP · max 5MB chacun · jusqu'à 12 images",gal_lbl:"Photos Produit / Installation",gal_add:"Ajouter une image · Glisser-déposer supporté",gal_max:"JPG/PNG/WEBP · jusqu'à 12 images · max 5MB chacune",hiw_tag:"PROCESSUS",hiw_h:"Pas d'intermédiaires. Juste <em style=\"font-style:normal;color:var(--teal)\">le vrai commerce</em>.",hiw_1a:"01",hiw_1t:"Créez votre profil d'entreprise",hiw_1b:"Visibilité mondiale en 6 étapes",hiw_1c:"Env. 8 minutes · vérification manuelle 24 heures",hiw_2a:"02",hiw_2t:"Laissez l'IA travailler pour vous",hiw_2b:"Recommandations triées par score",hiw_2c:"20+ correspondances en 3-5 minutes",hiw_3a:"03",hiw_3t:"Contact direct, traduction en temps réel",hiw_3b:"Sans intermédiaire · sans commission",hiw_3c:"Temps de réponse moyen 4 heures",kpi_match:"Nouvelles Correspondances",kpi_msg:"Nouveaux Messages",kpi_offer:"Offres",kpi_view:"Vues",logo_h:"Logo d'Entreprise *",logo_hint:"Recommandé : 400×400px, PNG/JPG/SVG, max 2MB",logo_hint2:"PNG · fond transparent · min 200×200",logo_lbl:"Logo d'Entreprise",msg_h:"Messages",msg_sub:"Communication directe avec entreprises vérifiées. Chiffré E2E. Traduction auto en 6 langues.",mt_h:"Mes Correspondances",mt_sub:"Le moteur IA a trié pour vous. Filtrer, exporter, messager directement.",ov_hello:"Bonjour",ov_sub:"Voici le résumé des 30 derniers jours.",ov_recent:"Activité Récente",ov_status:"Santé du Profil",ov_ev1:"a envoyé une nouvelle offre",ov_ev2:"a écrit un message",ov_ev3:"a consulté votre profil",ov_ev4:"Certificat ISO 9001 vérifié",ov_ev5:"demande de connexion",ov_t1:"il y a 2 heures",ov_t2:"il y a 4 heures",ov_t3:"il y a 1 jour",ov_t4:"il y a 2 jours",ov_t5:"il y a 3 jours",p_ana:"Analytique",p_people:"Contacts",p_docs:"Mes Documents",p_team:"Équipe",p_activity:"Activité",plan_starter:"Starter",starter_p:"Gratuit · idéal pour commencer",starter_1:"1 profil d'entreprise + badge de vérification",starter_2:"50 correspondances par mois",starter_3:"Filtrage sectoriel de base",starter_4:"Traduction auto en 6 langues",starter_5:"Messagerie limitée (5/jour)",starter_6:"Support standard",start_starter:"Commencer Gratuitement",pro_p:"Kervea Pro · le plus populaire",pro_1:"Tout du Starter",pro_2:"Correspondances illimitées + IA avancée",pro_3:"Entreprises illimitées, contacts, matching avancé, export",pro_4:"Messagerie illimitée + classement prioritaire",pro_5:"Tableau analytique (visiteurs, conversion, concurrents)",pro_6:"Vitrine profil · visibilité prioritaire",pro_7:"Support prioritaire (24 heures)",start_pro:"Passer à Pro",prof_h:"Mon Profil d'Entreprise",prof_sub:"Mettez à jour infos, images et canaux de contact.",promo_h:"Avez-vous un Code Promo ?",promo_s:"30% de réduction sur Pro les 3 premiers mois.",promo_h2:"Entrez le Code",promo_s2:"Codes spéciaux pour utilisateurs précoces et membres de chambre.",pub_h:"Demande reçue",pub_p:"La vérification manuelle se termine sous 24-48 heures. Vous serez notifié par e-mail et SMS.",ppl_title:"Contacts",ppl_sub:"Contacts directs des décideurs. 1 crédit par contact.",ppl_credits:"Crédits",ppl_renew:"Renouveler crédits",ppl_export:"Exporter",ppl_all:"Tous",ppl_ceo:"CEO / Directeur Général",ppl_purchasing:"Achats",ppl_sales:"Ventes",ppl_ops:"Opérations",ppl_col_person:"Personne",ppl_col_title:"Titre",ppl_col_firm:"Entreprise",ppl_col_email:"E-mail",ppl_col_phone:"Téléphone",ppl_col_act:"Action",ppl_kvkk:"Ces infos sont partagées conformément à la loi de protection des données et avec le consentement du représentant.",ppl_kvkk_link:"Avis de Confidentialité",pr_title:"Prospectus",pr_desc:"Un résumé professionnel complet — PDF prêt pour les rendez-vous.",pr_dl:"Télécharger en PDF",pr_pdf:"Prospectus PDF",pr_langs:"En 6 langues",pr_mine:"Télécharger mon prospectus",pr_incl:"Contenu",pr_i1:"Résumé + produits principaux",pr_i2:"Secteur, HS, MOQ",pr_i3:"Badges (fiscal, registre, e-mail)",pr_i4:"Certifications (ISO, GOTS, HACCP)",pr_i5:"Coordonnées + QR code",pr_who:"Pour qui ?",pr_l1:"Partage d'infos avant réunions",pr_l2:"Carte de visite numérique en salons",pr_l3:"Référence sur réseaux et web",s3_media:"Logo",s4_social:"Social",s5_doc:"Docs",s6_pub:"Publier",sec_biz:"Infos Commerciales",sec_visual:"Identité Visuelle",sec_social:"Réseaux Sociaux et Web",sec_legal:"Infos Juridiques",social_intro:"Vos réseaux sociaux et canaux — les acheteurs vous contacteront ici.",ss_h:"Entreprises qui font confiance à Kervea",ss_p:"Fabricants et exportateurs vérifiés sur 6 continents.",ss_5t:"Antep Épices",ss_5s:"Gaziantep · Piment rouge",tm_title:"Gestion d'Équipe",tm_sub:"Gérez utilisateurs, rôles et permissions.",tm_seats:"Utilisation des sièges",tm_invite:"+ Inviter Utilisateur",tm_col_user:"Utilisateur",tm_role:"Rôle",tm_perms:"Permissions",tm_status:"Statut",tm_last:"Dernière Connexion",tm_active:"Actif",tm_pending:"En attente",tm_owner:"Propriétaire",tm_admin:"Admin",tm_sales:"Ventes",tm_ops:"Opérations",tm_p_all:"Toutes permissions",tm_p_msg:"Msg + Contacts",tm_p_prof:"Profil + Docs",vs_prev:"Aperçu",why_h:"Pourquoi Kervea ?",why_p:"Dites adieu aux intermédiaires, commissions et fournisseurs peu fiables. Contact direct, entreprises vérifiées, vrai commerce.",why_1t:"Corridor de pays",why_2t:"Entreprise vérifiée",why_3t:"Traduction en 6 langues",chat_online:"En ligne",chat_verified_firm:"Entreprise vérifiée",chat_typing:"est en train d'écrire…",chat_btn_firm:"Profil d'entreprise",chat_btn_video:"Appel vidéo",chat_btn_archive:"Archiver",empty_firms:"Aucune entreprise ne correspond à votre filtre.",empty_records:"Aucun enregistrement ne correspond.",toast_name_required:"Le nom complet est obligatoire",toast_valid_email:"Entrez un e-mail valide",toast_invalid_promo:"Code promo invalide",toast_search_applied:"Recherche appliquée",toast_csv_downloaded:"CSV téléchargé",toast_pdf_downloaded:"Prospectus téléchargé",toast_photo_removed:"Photo supprimée",toast_photo_uploaded:"Photo téléversée",toast_logo_uploaded:"Logo téléversé",toast_login_ok:"Connexion réussie",toast_login_full:"Connecté — accès complet actif",toast_logout:"Déconnecté",toast_credit_out:"Crédits épuisés — mettez à niveau",toast_docs_opening:"Ouverture du gestionnaire de documents",toast_firm_opening:"Ouverture du profil d'entreprise",toast_firm_notfound:"Entreprise introuvable",toast_firm_error:"Erreur d'ouverture de l'entreprise",toast_visual_saved:"Identité visuelle enregistrée",toast_video_call:"Démarrage de l'appel vidéo",toast_cover_updated:"Couverture mise à jour",toast_chat_archived:"Conversation archivée",toast_profile_updated:"Profil mis à jour",toast_delete_requested:"Demande de suppression reçue — sera complétée en 7 jours",toast_social_saved:"Infos réseaux sociaux enregistrées",toast_form_opened:"Formulaire de demande ouvert",toast_print_pdf:"Enregistrez en PDF depuis le menu impression",toast_trade_saved:"Infos commerciales enregistrées",toast_all_tasks:"Affichage de toutes les tâches",toast_data_export:"Préparation de vos données, un lien sera envoyé par e-mail",toast_legal_saved:"Infos juridiques enregistrées",toast_cancelled:"Annulé",toast_copied:"Copié dans le presse-papiers",confirm_delete_account:"Votre compte et toutes vos données seront supprimés définitivement. Êtes-vous sûr ?",tm_inv_h:"Inviter un Nouvel Utilisateur",tm_inv_sub:"Ajoutez un nouveau membre à votre entreprise. L'invitation est envoyée par e-mail ; l'utilisateur devient actif après acceptation.",tm_fld_name:"Nom Complet *",tm_fld_email:"E-mail *",tm_fld_role:"Rôle *",tm_role_admin:"Administrateur",tm_role_admin_desc:"Tous les modules · peut inviter",tm_role_sales:"Commerce",tm_role_sales_desc:"Messagerie + Contacts",tm_role_ops:"Opérations",tm_role_ops_desc:"Profil + Documents",tm_role_view:"Lecture Seule",tm_role_view_desc:"Accès en lecture seule",tm_inv_info:"Vous pouvez changer le rôle plus tard. Cet utilisateur sera le 5e de vos <b>4/10 sièges</b>.",tm_btn_invite:"Envoyer l'Invitation",btn_cancel:"Annuler",tm_perm_h:"Modifier Rôle et Permissions",tm_perm_sub:"Spécifiez les modules auxquels cet utilisateur peut accéder.",tm_lbl_role:"Rôle",tm_lbl_perms:"Permissions",tm_role_admin_short:"Tous les modules",tm_role_sales_short:"Msg + Contacts",tm_role_view_short:"Lecture",tm_perm_msg:"Messagerie",tm_perm_msg_desc:"Accès à toutes les conversations, envoi de messages et partage de fichiers.",tm_perm_match:"Correspondances et Contacts",tm_perm_match_desc:"Consulter les suggestions IA, utiliser les crédits contact.",tm_perm_prof:"Profil d'Entreprise",tm_perm_prof_desc:"Modifier les infos de l'entreprise, la galerie et les liens sociaux.",tm_perm_docs:"Documents",tm_perm_docs_desc:"Charger et approuver certificats, attestation fiscale et documents officiels.",tm_perm_ana:"Analytique",tm_perm_ana_desc:"Accès au réseau, taux de conversion, comparaison concurrentielle et rapports.",tm_perm_team:"Gestion d'Équipe",tm_perm_team_desc:"Inviter de nouveaux utilisateurs, attribuer des rôles, désactiver des comptes.",tm_btn_save:"Enregistrer les Modifications",toast_saved:"Enregistré",ph_tm_name:"Ex. Jean Dupont",ph_tm_email:"jean@entreprise.com",pay_card_holder:"TITULAIRE",pay_card_holder_ph:"NOM COMPLET",pay_card_exp_short:"EXPIRE",pay_per_month:"/mois",pay_method_card:"Carte",pay_method_mc:"MC",pay_method_bank:"Virement",pay_card_holder_lbl:"Titulaire",ph_card_holder:"NOM COMPLET",ph_promo:"Code promo (facultatif)",toast_pay_success:"Paiement réussi — Pro actif",pay_disclaimer:"En finalisant le paiement, vous acceptez l'<a onclick=\"openM('sozl')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">Accord d'utilisation</a> et l'<a onclick=\"openM('kvkk')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">Avis de confidentialité</a>.",modal_kvkk_h:"Avis de Confidentialité (KVKK Turque)",modal_sozl_h:"Accord d'Utilisation",modal_cookie_h:"Politique de Confidentialité et Cookies",legal_disclaimer:"<b>ⓘ</b> Ce document est l'original juridique turc. Il est contraignant en vertu du droit turc. Les traductions dans d'autres langues sont fournies à titre informatif uniquement.",viewers_h:"Visiteurs du Profil",viewers_sub:"Pays détecté par adresse IP · 30 derniers jours",add_draft_btn:"Continuer Plus Tard",add_draft_saved:"Brouillon enregistré — connectez-vous pour continuer",dir_both:"Les deux",pay_tt_cash:"TT au comptant",pay_tt_30:"TT 30 jours",pay_tt_60:"TT 60 jours",toast_logo_removed:"Logo supprimé",toast_cover_uploaded:"Couverture téléversée",consent_kvkk:"J'ai lu et accepte l'<b>Avis de confidentialité</b>.",consent_terms:"J'accepte l'<b>Accord d'utilisation</b>.",consent_verify:"J'autorise les vérifications de mes données.",consent_marketing:"J'accepte de recevoir des communications marketing (optionnel).",consent_read:"Lire",consent_read2:"Lire",ph_cname:"Ex. XYZ Trade Co. SAS",ph_address:"Rue, N°, Quartier / Ville / Pays",ph_fullname:"Nom complet",ph_gm:"Directeur Général",ph_products:"Ex. Fil de coton, Tissu, Tricot",ph_desc:"Décrivez votre entreprise, capacité de production et marchés d'exportation en un paragraphe...",an_ip_based:"● Basé sur IP",an_visitors_sub:"Pays d'origine de vos visiteurs (30 derniers jours)",an_pulse_h:"Pouls du Marché — Tendances des Codes HS",an_pulse_sub:"Variation offre-demande sur 8 semaines dans votre secteur · Source Trademap",an_p1_nm:"Tissu de coton",an_p1_sub:"Allemagne, Pays-Bas, France · signal acheteur fort",an_p2_nm:"Meubles (structure métallique)",an_p2_sub:"Finlande, Norvège · volume de commandes record",an_p3_nm:"Palettes en bois, caisses",an_p3_sub:"Nigéria, Algérie · volatile en raison du nouveau tarif",an_p4_nm:"Fil de coton (peigné)",an_p4_sub:"Kazakhstan, Ouzbékistan · le prix des matières premières recule",an_p5_nm:"Articles en fer/acier",an_p5_sub:"Égypte, Maroc · la congestion portuaire diminue",an_data_freq:"Fréquence de mise à jour des données : 24 heures",an_full_report:"Rapport complet →",an_opening_report:"Ouverture de l'analyse détaillée",an_ai_alerts_h:"Centre d'Alertes IA",an_ai_alerts_sub:"Opportunités et risques détectés pour votre entreprise",an_priority_high:"Priorité haute",an_priority_med:"Priorité moyenne",an_priority_opp:"Opportunité",an_priority_tip:"Astuce",an_alert1_nm:"temps de réponse critique",an_alert1_desc:"En attente depuis 3 jours. Si votre temps de réponse moyen dépasse 4 heures, la qualité des correspondances baisse.",an_alert2_nm:"Votre certificat fiscal doit être renouvelé sous 8 jours",an_alert2_desc:"Les documents non renouvelés entraînent une baisse du classement. Allez dans Mes Documents → Charger.",an_alert3_nm:"Nouvelle opportunité : acheteurs allemands HS 6006",an_alert3_desc:"6 nouveaux acheteurs compatibles détectés. Un corridor à croissance rapide dans le secteur du tissu tricoté.",an_alert4_nm:"Suggestion de complétion du profil",an_alert4_desc:"Ajouter 7 images de plus à la galerie fera passer votre score de profil de 94% à 100%.",an_security_h:"État de Sécurité et de Vérification",an_sec1_nm:"2FA Actif",an_sec2_nm:"Certificat Fiscal",an_status_approved:"Approuvé",an_sec3_nm:"Registre du Commerce",an_status_verified:"Vérifié",an_sec4_nm:"E-mail Enregistré",an_status_active:"Actif",an_sec5_sub:"Renouvellement dans 15 jours",an_sec6_sub:"Toutes communications chiffrées",an_sec7_nm:"Conforme RGPD",an_sec7_sub:"Avis de confidentialité v1.2",an_sec8_sub:"IP + limitation de débit active",an_deep_h:"Analyse Approfondie",fl_yourmsg:"Votre message",btn_send:"Envoyer",toast_msg_sent:"Message envoyé",fl_password:"Mot de passe",btn_login:"Se connecter",stat_today:"aujourd'hui",stat_this_week:"cette semaine",stat_soon:"bientôt",ft_kvkk:"Avis de confidentialité",ft_terms:"Conditions d'utilisation",ft_cookie:"Confidentialité/Cookies",ft_tagline:"Route de la Soie Moderne",fp_decisionmakers:"Décideurs",fp_detail:"Détails",fp_gotoallppl:"Voir tous les contacts →",fp_gal1:"Showroom",fp_gal2:"Site de Production",fp_gal3:"Entrepôt",fp_gal4:"Équipe",fp_gal5:"Contrôle Qualité",fp_gal6:"Certificats",lock_title:"Les coordonnées sont réservées aux membres Pro",lock_sub:"WhatsApp, téléphone, e-mail et site web deviennent visibles dès l'activation de votre abonnement Pro.",lock_cta:"Passer à Pro",sec_social_short:"Réseaux Sociaux",dene_lbl:"ESSAYER",qt1:"Acheteur d'accessoires de meubles en Finlande",qt2:"Fournisseur de cacao en Côte d'Ivoire",qt3:"Acheteur textile au Kazakhstan",qf_lbl:"FILTRE RAPIDE",f_exp:"Exportation",f_imp:"Importation",
     s_pos:"Entreprises actives",s_ctr:"Pays et territoires",s_sec:"Secteurs",s_lng:"Langues",
     firms_h:"Entreprises",firms_cnt:"correspondances · triées par score",sort_lbl:"Trier:",sort_match:"Match",sort_year:"Année",sort_name:"Nom",
     add_h:"Ajoutez votre Entreprise",add_p:"Visibilité mondiale en 6 étapes.",s1:"Société",s2:"Secteur",s3:"Docs",s4:"Consent.",s5:"Publier",prev:"← Précéd.",next:"Suivant →",
     pr_h:"Plans",pr_p:"Votre niveau de visibilité mondiale.",ct_h:"Contact",ct_p:"Nous sommes là pour vous aider.",
     lg_h:"Connexion",lg_p:"Accédez à votre compte Kervea",pn_h:"Panneau Entreprise",pn_p:"Gérez profil, correspondances et messages.",
     p_over:"Vue d'ensemble",p_matches:"Correspondances",p_profile:"Mon Profil",p_msgs:"Messages",p_com:"Engagements",p_pros:"Prospectus",p_set:"Paramètres",p_out:"Déconnexion",
     all_sec:"— Tous les secteurs",sel_ctr:"Sélectionner pays",dd_search:"Rechercher pays...",
     dir_exp:"EXPORTE",dir_imp:"IMPORTE",match_score:"MATCH",verified:"Vérifié",
     detail:"Détails",message:"Envoyer Message",match_col:"Entreprise",prod_col:"Produit",sec_col:"Secteur",ctr_col:"Pays",score_col:"Match",action_col:"Action"},
 ar:{nav_home:"الرئيسية",nav_add:"إضافة",nav_pricing:"الأسعار",nav_about:"من نحن",nav_contact:"اتصل",nav_login:"دخول",nav_panel:"اللوحة",
     tag_live:"تركيا ↔ العالم · 6 لغات",h_title:"اعثر على المشتري أو المورد على <em>طريق الحرير</em> الحديث.",h_lead:"شركات موثقة بشهادة ضريبية وسجل تجاري. مراسلة بـ 6 لغات مع تشفير من طرف إلى طرف.",
     f_match:"مطابقة",fm_fullpage:"افتح الصفحة كاملة",fm_fullpage_tt:"عرض هذه الشركة في صفحة كاملة",pp_live_prev:"معاينة مباشرة",pr_dl_pdf:"تنزيل نشرتي كملف PDF",step_prev:"السابق",step_next:"التالي",step_of:"·",step_publish:"نشر · حفظ الشركة",creds_continue:"المتابعة للدفع",creds_back:"العودة للحزم",creds_onetime:"دفعة واحدة",pay_err_card:"أدخل رقم بطاقة صالح",pay_err_name:"أدخل اسم حامل البطاقة",pay_err_exp:"أدخل تاريخ الانتهاء بصيغة MM/YY",pay_err_cvc:"أدخل CVC",ppl_pw_h:"الوصول المباشر لصانعي القرار متاح لأعضاء Pro",ppl_pw_sub:"تواصل مع أكثر من 2400 مدير تنفيذي ومدير مشتريات وخبير موثق بنقرة واحدة. 100 رصيد شهري مع Pro.",ppl_pw_stat1:"صانعو القرار",ppl_pw_stat2:"أرصدة شهرية",ppl_pw_stat3:"موثق",ppl_pw_cta:"الترقية إلى Pro",ppl_pw_note:"$29 شهريًا · إلغاء في أي وقت",creds_h:"حزم الأرصدة",creds_sub:"كل بريد أو هاتف رصيد واحد. الأرصدة غير المستخدمة تُنقل للشهر التالي.",creds_current:"أرصدة متاحة حاليًا",creds_lbl:"رصيد",creds_per_lbl:"رصيد",creds_save10:"توفير 10%",creds_save15:"توفير 15%",creds_you_get:"ستحصل على",creds_buy_btn:"شراء",creds_secure:"دفع آمن عبر Stripe · 3D Secure",creds_pick_pack:"اختر حزمة",creds_added:"أرصدة أضيفت",creds_charged:"تم الخصم",creds_add_btn:"إضافة أرصدة",pay_h:"الدفع — الخطة الاحترافية",pay_plan:"Kervea Pro",pay_kdv:"ضريبة (20%)",pay_disc:"خصم",pay_total:"المجموع",pay_card:"رقم البطاقة",pay_exp:"تاريخ الانتهاء",pay_btn:"ادفع",apply:"تطبيق",bill_m:"شهري",bill_y:"سنوي",bill_save:"−20%",per_month:"/شهر",ct_name:"الاسم الكامل",ct_email:"البريد الإلكتروني",ct_subject:"الموضوع",ct_ph_name:"اسمك",ct_ph_email:"you@company.com",ct_ph_subject:"كيف يمكننا المساعدة؟",ct_center:"المقر الرئيسي",ct_email_lbl:"البريد الإلكتروني:",ct_phone_lbl:"الهاتف:",lg_sso_google:"المتابعة باستخدام Google",lg_sso_ms:"المتابعة باستخدام Microsoft",lg_sso_apple:"المتابعة باستخدام Apple",lg_or_email:"أو عبر البريد الإلكتروني",pri_h:"إجراء معلّق — يتطلب انتباهك",pri_sub:"مطابقتان جديدتان بدرجات عالية بانتظار الرد · تجديد عقد واحد يقترب · مطلوب تحديث المستندات",pri_open_matches:"فتح المطابقات",pri_all:"الكل",range_7d:"7ي",range_30d:"30ي",range_90d:"90ي",range_1y:"1س",ac_title:"الجدول الزمني للنشاط",ac_sub:"سجل كامل لآخر 30 يومًا.",ac_filter_all:"الكل",ac_filter_match:"المطابقات",ac_filter_msg:"الرسائل",ac_filter_prof:"الملف الشخصي",ac_filter_doc:"المستندات",all_dir:"كل الاتجاهات",all_scores:"كل النقاط",attention:"انتباه",back_list:"العودة لقائمة الشركات",cancel:"إلغاء",custom:"مخصص",contact_sales:"تواصل مع المبيعات",export_csv:"CSV",remove:"إزالة",upload:"رفع",save_all:"حفظ الكل",results:"نتائج",complete:"مكتمل",stable:"مستقر",preview_page:"معاينة الصفحة",ch_ctr:"التوزيع حسب الدولة",ch_trend:"اتجاه النمو",ck_logo:"تم رفع الشعار",ck_doc:"المستندات معتمدة",ck_social:"وسائل التواصل متصلة",ck_gal:"المعرض (5/12 صور)",cover_h:"صورة الغلاف",cover_lbl:"صورة الغلاف · 1600×400",cover_tt:"رفع صورة الغلاف",cover_st:"يظهر أعلى صفحة الشركة · 1600×400px موصى به · حد أقصى 5MB",cover_change:"رفع أو تغيير صورة الغلاف",doc_h:"المستندات *",doc_txt:"📄 شهادة النشاط، جريدة السجل، دائرية التوقيع، شهادات الجودة",doc_hint:"PDF, JPG, PNG · حد أقصى 10MB لكل ملف · حتى 20 مستندًا",ent_p:"Kervea Enterprise · حل مخصص",ent_1:"شركات ولا محدودة، جهات اتصال، مطابقة متقدمة، تصدير",ent_2:"تكامل مخصص (SAP, Logo, Netsis, Zoho, HubSpot)",ent_3:"ملف بعلامة بيضاء (علامتك التجارية)",ent_4:"وصول API مخصص + دعم web-hook",ent_5:"SLA + دعم أولوية (ضمان الرد خلال 4 ساعات)",ent_6:"مدير حساب مخصص",ent_7:"جلسات تدريب واستراتيجية شهرية",fl_cname:"اسم الشركة *",fl_ctitle:"الاسم التجاري (EN)",fl_tax:"الرقم الضريبي *",fl_mersis:"MERSIS / رقم السجل",fl_year:"سنة التأسيس *",fl_emp:"عدد الموظفين",fl_country:"الدولة *",fl_city:"المدينة",fl_kep:"البريد الإلكتروني المسجل",fl_web:"الموقع الإلكتروني",fl_email:"البريد الإلكتروني *",fl_phone:"الهاتف *",fl_repname:"اسم المسؤول *",fl_reptitle:"منصب المسؤول",fl_address:"عنوان الشركة",fl_sec:"القطاع الرئيسي *",fl_dir:"اتجاه التجارة *",fl_hs:"رمز HS (مفصول بفاصلة)",fl_moq:"MOQ (الحد الأدنى للطلب)",fl_inc:"تفضيل INCOTERM",fl_pay:"طريقة الدفع",fl_products:"المنتجات / الخدمات الرئيسية",fl_desc:"وصف الشركة *",fl_certs:"الشهادات",gal_h:"صور المنتج / المنشأة (حد أقصى 12)",gal_tt:"اسحب وأفلت الصور أو حدد",gal_st:"JPG, PNG, WEBP · حد أقصى 5MB لكل صورة · حتى 12 صورة",gal_lbl:"صور المنتج / المنشأة",gal_add:"أضف صورة جديدة · يدعم السحب والإفلات",gal_max:"JPG/PNG/WEBP · حتى 12 صورة · حد أقصى 5MB",hiw_tag:"العملية",hiw_h:"لا وسطاء. تجارة <em style=\"font-style:normal;color:var(--teal)\">حقيقية</em> فقط.",hiw_1a:"01",hiw_1t:"أنشئ ملف شركتك",hiw_1b:"الرؤية العالمية في 6 خطوات",hiw_1c:"متوسط 8 دقائق · التحقق اليدوي 24 ساعة",hiw_2a:"02",hiw_2t:"دع الذكاء الاصطناعي يعمل لك",hiw_2b:"توصيات مرتبة حسب درجة المطابقة",hiw_2c:"20+ مطابقة خلال 3-5 دقائق",hiw_3a:"03",hiw_3t:"تواصل مباشر، ترجمة فورية",hiw_3b:"بدون وسطاء · بدون عمولة",hiw_3c:"متوسط وقت الرد 4 ساعات",kpi_match:"مطابقات جديدة",kpi_msg:"رسائل جديدة",kpi_offer:"عروض",kpi_view:"المشاهدات",logo_h:"شعار الشركة *",logo_hint:"موصى: 400×400 بكسل، PNG/JPG/SVG، حد أقصى 2MB",logo_hint2:"PNG · خلفية شفافة · بحد أدنى 200×200",logo_lbl:"شعار الشركة",msg_h:"الرسائل",msg_sub:"تواصل مباشر مع شركات موثقة. تشفير من طرف إلى طرف. ترجمة تلقائية بـ 6 لغات.",mt_h:"مطابقاتي",mt_sub:"محرك المطابقة بالذكاء الاصطناعي رتبها لك. صفّي، صدّر، راسل مباشرة.",ov_hello:"مرحبا",ov_sub:"إليك ملخص آخر 30 يومًا للوحتك.",ov_recent:"النشاط الأخير",ov_status:"صحة الملف الشخصي",ov_ev1:"أرسل عرضًا جديدًا",ov_ev2:"أرسل رسالة",ov_ev3:"شاهد ملفك الشخصي",ov_ev4:"تم التحقق من شهادة ISO 9001",ov_ev5:"طلب اتصال",ov_t1:"قبل ساعتين",ov_t2:"قبل 4 ساعات",ov_t3:"قبل يوم",ov_t4:"قبل يومين",ov_t5:"قبل 3 أيام",p_ana:"التحليلات",p_people:"جهات الاتصال",p_docs:"مستنداتي",p_team:"الفريق",p_activity:"النشاط",plan_starter:"المبتدئ",starter_p:"مجاني · مثالي للبدء",starter_1:"ملف شركة واحد + شارة التحقق",starter_2:"50 مطابقة شهريًا",starter_3:"تصفية القطاعات الأساسية",starter_4:"ترجمة تلقائية بـ 6 لغات",starter_5:"مراسلة محدودة (5/يوم)",starter_6:"دعم قياسي",start_starter:"ابدأ مجانًا",pro_p:"Kervea Pro · الأكثر شعبية",pro_1:"كل ميزات Starter",pro_2:"مطابقات لا محدودة + درجة ذكاء اصطناعي متقدمة",pro_3:"شركات لا محدودة، جهات اتصال، مطابقة متقدمة، تصدير",pro_4:"مراسلة لا محدودة + ترتيب أولوية",pro_5:"لوحة تحليلات (الزوار، التحويل، المنافسون)",pro_6:"معرض الملف الشخصي · ظهور في المقدمة",pro_7:"دعم عملاء أولوية (24 ساعة)",start_pro:"الترقية إلى Pro",prof_h:"ملف شركتي",prof_sub:"قم بتحديث معلومات الشركة والصور وقنوات الاتصال.",promo_h:"لديك رمز ترويجي؟",promo_s:"خصم 30% على Pro لأول 3 أشهر.",promo_h2:"أدخل الرمز",promo_s2:"رموز خصم خاصة للمستخدمين الأوائل وأعضاء الغرفة.",pub_h:"تم استلام طلبك",pub_p:"يكتمل التحقق اليدوي خلال 24-48 ساعة. سيتم إعلامك بالبريد والرسائل النصية.",ppl_title:"جهات الاتصال",ppl_sub:"معلومات اتصال مباشرة لصانعي القرار. رصيد واحد لكل جهة اتصال.",ppl_credits:"الأرصدة",ppl_renew:"تجديد الأرصدة",ppl_export:"تصدير",ppl_all:"الكل",ppl_ceo:"الرئيس التنفيذي / المدير العام",ppl_purchasing:"المشتريات",ppl_sales:"المبيعات",ppl_ops:"العمليات",ppl_col_person:"الشخص",ppl_col_title:"المنصب",ppl_col_firm:"الشركة",ppl_col_email:"البريد الإلكتروني",ppl_col_phone:"الهاتف",ppl_col_act:"الإجراء",ppl_kvkk:"تتم مشاركة هذه المعلومات وفقًا لقانون حماية البيانات وبموافقة صريحة من ممثل الشركة.",ppl_kvkk_link:"إشعار الخصوصية",pr_title:"النشرة",pr_desc:"ملخص مهني كامل — PDF جاهز للاجتماعات.",pr_dl:"تنزيل PDF",pr_pdf:"نشرة PDF",pr_langs:"بـ 6 لغات",pr_mine:"تنزيل نشرتي",pr_incl:"المحتويات",pr_i1:"ملخص الشركة + المنتجات الرئيسية",pr_i2:"القطاع، رمز HS، MOQ",pr_i3:"شارات (ضريبي، سجل، بريد)",pr_i4:"الشهادات (ISO, GOTS, HACCP)",pr_i5:"معلومات الاتصال + رمز QR",pr_who:"لمن؟",pr_l1:"مشاركة المعلومات قبل الاجتماعات",pr_l2:"بطاقة أعمال رقمية في المعارض",pr_l3:"مرجع على وسائل التواصل والمواقع",s3_media:"الشعار",s4_social:"التواصل",s5_doc:"المستندات",s6_pub:"نشر",sec_biz:"معلومات العمل",sec_visual:"الهوية البصرية",sec_social:"وسائل التواصل والويب",sec_legal:"معلومات قانونية",social_intro:"قنوات التواصل الاجتماعي — سيتواصل معك المشترون هنا.",ss_h:"شركات تثق بـ Kervea",ss_p:"مصنّعون ومصدّرون موثقون، جزء من شبكة نشطة في 6 قارات.",ss_5t:"أنتيب للتوابل",ss_5s:"غازي أنتيب · فلفل أحمر",tm_title:"إدارة الفريق",tm_sub:"أدر مستخدمي شركتك وأدوارهم وأذوناتهم.",tm_seats:"استخدام المقاعد",tm_invite:"+ دعوة مستخدم",tm_col_user:"المستخدم",tm_role:"الدور",tm_perms:"الأذونات",tm_status:"الحالة",tm_last:"آخر تسجيل دخول",tm_active:"نشط",tm_pending:"معلق",tm_owner:"المالك",tm_admin:"مدير",tm_sales:"المبيعات",tm_ops:"العمليات",tm_p_all:"جميع الأذونات",tm_p_msg:"الرسائل + جهات الاتصال",tm_p_prof:"الملف + المستندات",vs_prev:"معاينة",why_h:"لماذا Kervea؟",why_p:"قل وداعًا للوسطاء والعمولات. تواصل مباشر، شركات موثقة، تجارة حقيقية.",why_1t:"ممر الدول",why_2t:"شركة موثقة",why_3t:"ترجمة بـ 6 لغات",chat_online:"متصل",chat_verified_firm:"شركة موثقة",chat_typing:"يكتب…",chat_btn_firm:"ملف الشركة",chat_btn_video:"مكالمة فيديو",chat_btn_archive:"أرشفة",empty_firms:"لا توجد شركات تطابق التصفية.",empty_records:"لا توجد سجلات مطابقة.",toast_name_required:"الاسم الكامل مطلوب",toast_valid_email:"أدخل بريدًا إلكترونيًا صالحًا",toast_invalid_promo:"رمز الترويج غير صالح",toast_search_applied:"تم تطبيق البحث",toast_csv_downloaded:"تم تنزيل CSV",toast_pdf_downloaded:"تم تنزيل النشرة",toast_photo_removed:"تمت إزالة الصورة",toast_photo_uploaded:"تم رفع الصورة",toast_logo_uploaded:"تم رفع الشعار",toast_login_ok:"تم تسجيل الدخول بنجاح",toast_login_full:"تم تسجيل الدخول — الوصول الكامل مفعّل",toast_logout:"تم تسجيل الخروج",toast_credit_out:"نفدت الأرصدة — قم بترقية خطتك",toast_docs_opening:"جارٍ فتح أداة رفع المستندات",toast_firm_opening:"جارٍ فتح ملف الشركة",toast_firm_notfound:"الشركة غير موجودة",toast_firm_error:"خطأ في فتح الشركة",toast_visual_saved:"تم حفظ الهوية البصرية",toast_video_call:"جارٍ بدء مكالمة الفيديو",toast_cover_updated:"تم تحديث الغلاف",toast_chat_archived:"تمت أرشفة المحادثة",toast_profile_updated:"تم تحديث الملف الشخصي",toast_delete_requested:"تم استلام طلب الحذف — سيكتمل خلال 7 أيام",toast_social_saved:"تم حفظ معلومات وسائل التواصل الاجتماعي",toast_form_opened:"تم فتح نموذج الطلب",toast_print_pdf:"احفظ كملف PDF من قائمة الطباعة",toast_trade_saved:"تم حفظ المعلومات التجارية",toast_all_tasks:"عرض جميع المهام",toast_data_export:"جارٍ تحضير بياناتك، سيتم إرسال الرابط بالبريد",toast_legal_saved:"تم حفظ المعلومات القانونية",toast_cancelled:"تم الإلغاء",toast_copied:"تم النسخ إلى الحافظة",confirm_delete_account:"سيتم حذف حسابك وجميع بياناتك بشكل دائم. هل أنت متأكد؟",tm_inv_h:"دعوة مستخدم جديد",tm_inv_sub:"أضف عضوًا جديدًا إلى فريق شركتك. تُرسل الدعوة بالبريد الإلكتروني ويصبح المستخدم نشطًا عند قبولها.",tm_fld_name:"الاسم الكامل *",tm_fld_email:"البريد الإلكتروني *",tm_fld_role:"الدور *",tm_role_admin:"مدير",tm_role_admin_desc:"جميع الوحدات · يمكنه الدعوة",tm_role_sales:"مبيعات",tm_role_sales_desc:"المراسلة + جهات الاتصال",tm_role_ops:"العمليات",tm_role_ops_desc:"الملف الشخصي + المستندات",tm_role_view:"عرض فقط",tm_role_view_desc:"وصول للقراءة فقط",tm_inv_info:"يمكنك تغيير الدور لاحقًا. سيكون هذا المستخدم الخامس من <b>4/10 مقاعد</b>.",tm_btn_invite:"إرسال الدعوة",btn_cancel:"إلغاء",tm_perm_h:"تعديل الدور والأذونات",tm_perm_sub:"حدد الوحدات التي يمكن لهذا المستخدم الوصول إليها.",tm_lbl_role:"الدور",tm_lbl_perms:"الأذونات",tm_role_admin_short:"جميع الوحدات",tm_role_sales_short:"رسائل + جهات اتصال",tm_role_view_short:"قراءة",tm_perm_msg:"المراسلة",tm_perm_msg_desc:"الوصول إلى جميع المحادثات وإرسال الرسائل ومشاركة الملفات.",tm_perm_match:"المطابقات وجهات الاتصال",tm_perm_match_desc:"عرض اقتراحات المطابقة بالذكاء الاصطناعي واستخدام أرصدة الاتصال.",tm_perm_prof:"ملف الشركة",tm_perm_prof_desc:"تعديل معلومات الشركة والمعرض وروابط التواصل الاجتماعي.",tm_perm_docs:"المستندات",tm_perm_docs_desc:"تحميل واعتماد الشهادات والشهادة الضريبية والمستندات الرسمية.",tm_perm_ana:"التحليلات",tm_perm_ana_desc:"الوصول للشبكة ومعدل التحويل ومقارنة المنافسين والتقارير.",tm_perm_team:"إدارة الفريق",tm_perm_team_desc:"دعوة مستخدمين جدد وتعيين الأدوار وتعطيل الحسابات.",tm_btn_save:"حفظ التغييرات",toast_saved:"تم الحفظ",ph_tm_name:"مثال: أحمد كايا",ph_tm_email:"ahmed@company.com",pay_card_holder:"حامل البطاقة",pay_card_holder_ph:"الاسم الكامل",pay_card_exp_short:"تاريخ الانتهاء",pay_per_month:"/شهر",pay_method_card:"بطاقة",pay_method_mc:"MC",pay_method_bank:"تحويل بنكي",pay_card_holder_lbl:"حامل البطاقة",ph_card_holder:"الاسم الكامل",ph_promo:"رمز ترويجي (اختياري)",toast_pay_success:"تم الدفع بنجاح — Pro مفعّل",pay_disclaimer:"بإتمام الدفع، توافق على <a onclick=\"openM('sozl')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">اتفاقية المستخدم</a> و<a onclick=\"openM('kvkk')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">إشعار الخصوصية</a>.",modal_kvkk_h:"إشعار الخصوصية (KVKK التركي)",modal_sozl_h:"اتفاقية المستخدم",modal_cookie_h:"سياسة الخصوصية وملفات تعريف الارتباط",legal_disclaimer:"<b>ⓘ</b> هذا المستند هو الأصل القانوني التركي وهو ملزم بموجب القانون التركي. الترجمات إلى لغات أخرى لأغراض إعلامية فقط.",viewers_h:"من زاروا ملفك",viewers_sub:"تم اكتشاف البلد عبر عنوان IP · آخر 30 يومًا",add_draft_btn:"المتابعة لاحقًا",add_draft_saved:"تم حفظ المسودة — سجل الدخول للمتابعة",dir_both:"كلاهما",pay_tt_cash:"تحويل بنكي نقدي",pay_tt_30:"تحويل بنكي 30 يومًا",pay_tt_60:"تحويل بنكي 60 يومًا",toast_logo_removed:"تم إزالة الشعار",toast_cover_uploaded:"تم رفع الغلاف",consent_kvkk:"لقد قرأت وأوافق على <b>إشعار الخصوصية</b>.",consent_terms:"أوافق على <b>اتفاقية المستخدم</b>.",consent_verify:"أسمح بالتحقق من بياناتي.",consent_marketing:"أوافق على استلام الرسائل التسويقية (اختياري).",consent_read:"اقرأ",consent_read2:"اقرأ",ph_cname:"مثال: كيرفيا نسيج ذ.م.م",ph_address:"الشارع، رقم، الحي / المدينة / البلد",ph_fullname:"الاسم الكامل",ph_gm:"المدير العام",ph_products:"مثال: خيوط قطن، قماش منسوج، قماش محبوك",ph_desc:"صف شركتك وطاقتك الإنتاجية وأسواق التصدير في فقرة واحدة...",an_ip_based:"● حسب عنوان IP",an_visitors_sub:"البلدان التي يأتي منها الزوار (آخر 30 يوم)",an_pulse_h:"نبض السوق — اتجاهات رموز HS",an_pulse_sub:"تغير العرض والطلب خلال 8 أسابيع في قطاعك · المصدر Trademap",an_p1_nm:"قماش قطن منسوج",an_p1_sub:"ألمانيا وهولندا وفرنسا · إشارة مشتري قوية",an_p2_nm:"أثاث (هيكل معدني)",an_p2_sub:"فنلندا والنرويج · حجم الطلبات في مستوى قياسي",an_p3_nm:"منصات نقالة خشبية، صناديق",an_p3_sub:"نيجيريا والجزائر · متقلب بسبب التعرفة الجديدة",an_p4_nm:"خيوط قطن (ممشط)",an_p4_sub:"كازاخستان وأوزبكستان · تراجع أسعار المواد الخام",an_p5_nm:"سلع من الحديد/الصلب",an_p5_sub:"مصر والمغرب · انخفاض ازدحام الموانئ",an_data_freq:"تحديث البيانات كل 24 ساعة",an_full_report:"التقرير الكامل ←",an_opening_report:"جارٍ فتح التحليل التفصيلي",an_ai_alerts_h:"مركز تنبيهات الذكاء الاصطناعي",an_ai_alerts_sub:"الفرص والمخاطر المكتشفة لشركتك",an_priority_high:"أولوية عالية",an_priority_med:"أولوية متوسطة",an_priority_opp:"فرصة",an_priority_tip:"نصيحة",an_alert1_nm:"وقت الاستجابة حرج",an_alert1_desc:"في الانتظار منذ 3 أيام. إذا تجاوز متوسط وقت الاستجابة 4 ساعات، ستنخفض جودة المطابقة.",an_alert2_nm:"يجب تجديد شهادتك الضريبية خلال 8 أيام",an_alert2_desc:"المستندات غير المجددة تسبب انخفاضاً في تصنيف الشركة. انتقل إلى مستنداتي → رفع.",an_alert3_nm:"فرصة جديدة: مشترون ألمان لرمز HS 6006",an_alert3_desc:"تم اكتشاف 6 مشترين جدد متوافقين معك. ممر سريع النمو في قطاع الأقمشة المحبوكة.",an_alert4_nm:"اقتراح إكمال الملف الشخصي",an_alert4_desc:"إضافة 7 صور أخرى إلى المعرض سترفع نقاط ملفك من 94٪ إلى 100٪.",an_security_h:"حالة الأمان والتحقق",an_sec1_nm:"المصادقة الثنائية نشطة",an_sec2_nm:"شهادة ضريبية",an_status_approved:"معتمد",an_sec3_nm:"السجل التجاري",an_status_verified:"تم التحقق",an_sec4_nm:"البريد الإلكتروني المسجل",an_status_active:"نشط",an_sec5_sub:"التجديد خلال 15 يومًا",an_sec6_sub:"جميع الاتصالات مشفرة",an_sec7_nm:"متوافق مع GDPR",an_sec7_sub:"إشعار الخصوصية v1.2",an_sec8_sub:"IP + تحديد المعدل نشط",an_deep_h:"تحليل عميق",fl_yourmsg:"رسالتك",btn_send:"إرسال",toast_msg_sent:"تم إرسال الرسالة",fl_password:"كلمة المرور",btn_login:"تسجيل الدخول",stat_today:"اليوم",stat_this_week:"هذا الأسبوع",stat_soon:"قريباً",ft_kvkk:"إشعار الخصوصية",ft_terms:"شروط الخدمة",ft_cookie:"الخصوصية/الكوكيز",ft_tagline:"طريق الحرير الحديث",fp_decisionmakers:"صنّاع القرار",fp_detail:"تفاصيل",fp_gotoallppl:"عرض جميع جهات الاتصال ←",fp_gal1:"صالة العرض",fp_gal2:"منشأة الإنتاج",fp_gal3:"المستودع",fp_gal4:"الفريق",fp_gal5:"مراقبة الجودة",fp_gal6:"الشهادات",lock_title:"معلومات الاتصال متاحة لأعضاء Pro",lock_sub:"يظهر واتساب والهاتف والبريد الإلكتروني والموقع الإلكتروني فور تفعيل عضوية Pro.",lock_cta:"الترقية إلى Pro",sec_social_short:"وسائل التواصل",dene_lbl:"جرب",qt1:"مشتري إكسسوارات أثاث في فنلندا",qt2:"مورد كاكاو في ساحل العاج",qt3:"مشتري منسوجات في كازاخستان",qf_lbl:"مرشح سريع",f_exp:"تصدير",f_imp:"استيراد",
     s_pos:"شركات نشطة",s_ctr:"دولة وإقليم",s_sec:"قطاع",s_lng:"لغة",
     firms_h:"الشركات",firms_cnt:"مطابقة · مرتبة حسب النتيجة",sort_lbl:"ترتيب:",sort_match:"مطابقة",sort_year:"سنة",sort_name:"اسم",
     add_h:"أضف شركتك",add_p:"رؤية عالمية في 6 خطوات.",s1:"الشركة",s2:"القطاع",s3:"وثائق",s4:"موافقة",s5:"نشر",prev:"← السابق",next:"التالي →",
     pr_h:"الخطط",pr_p:"مستوى رؤيتك العالمية.",ct_h:"اتصل",ct_p:"نحن هنا للمساعدة.",
     lg_h:"تسجيل الدخول",lg_p:"ادخل حسابك في Kervea",pn_h:"لوحة الشركة",pn_p:"إدارة الملف والمطابقات والرسائل.",
     p_over:"نظرة عامة",p_matches:"مطابقات",p_profile:"ملفي",p_msgs:"الرسائل",p_com:"التزاماتي",p_pros:"نشرة",p_set:"إعدادات",p_out:"خروج",
     all_sec:"— جميع القطاعات",sel_ctr:"اختر البلد",dd_search:"ابحث عن بلد...",
     dir_exp:"مصدّر",dir_imp:"مستورد",match_score:"مطابقة",verified:"موثق",
     detail:"تفاصيل",message:"أرسل رسالة",match_col:"الشركة",prod_col:"المنتج",sec_col:"القطاع",ctr_col:"البلد",score_col:"مطابقة",action_col:"إجراء"},
 ru:{nav_home:"Главная",nav_add:"Добавить",nav_pricing:"Тарифы",nav_about:"О нас",nav_contact:"Контакты",nav_login:"Вход",nav_panel:"Панель",
     tag_live:"ТУРЦИЯ ↔ МИР · 6 ЯЗЫКОВ",h_title:"Найдите покупателя или поставщика на современном <em>Шёлковом пути</em>.",h_lead:"Компании, проверенные налоговым свидетельством и торговым реестром. Обмен сообщениями на 6 языках со сквозным шифрованием.",
     f_match:"Найти",fm_fullpage:"Открыть страницу полностью",fm_fullpage_tt:"Показать компанию на полной странице",pp_live_prev:"ЖИВОЙ ПРОСМОТР",pr_dl_pdf:"Скачать проспект в PDF",step_prev:"Назад",step_next:"Далее",step_of:"·",step_publish:"Опубликовать · Сохранить",creds_continue:"Продолжить к оплате",creds_back:"Назад к пакетам",creds_onetime:"Разовый платёж",pay_err_card:"Введите корректный номер карты",pay_err_name:"Введите имя держателя карты",pay_err_exp:"Введите срок в формате MM/ГГ",pay_err_cvc:"Введите CVC",ppl_pw_h:"Прямой доступ к лицам, принимающим решения — для Pro",ppl_pw_sub:"Свяжитесь с 2400+ проверенными CEO и менеджерами по закупкам одним кликом. 100 кредитов в месяц с Pro.",ppl_pw_stat1:"Лица, принимающие решения",ppl_pw_stat2:"Кредитов в месяц",ppl_pw_stat3:"Проверено",ppl_pw_cta:"Улучшить до Pro",ppl_pw_note:"$29/мес · Отмена в любое время",creds_h:"Пакеты кредитов",creds_sub:"Каждый e-mail или телефон — 1 кредит. Неиспользованные переносятся.",creds_current:"кредитов доступно сейчас",creds_lbl:"Кредитов",creds_per_lbl:"кредит",creds_save10:"экономия 10%",creds_save15:"экономия 15%",creds_you_get:"Вы получаете",creds_buy_btn:"Купить",creds_secure:"Безопасно через Stripe · 3D Secure",creds_pick_pack:"Выберите пакет",creds_added:"кредитов добавлено",creds_charged:"списано",creds_add_btn:"Добавить кредиты",pay_h:"Оплата — план Pro",pay_plan:"Kervea Pro",pay_kdv:"НДС (20%)",pay_disc:"Скидка",pay_total:"Итого",pay_card:"Номер карты",pay_exp:"Срок",pay_btn:"Оплатить",apply:"Применить",bill_m:"Ежемесячно",bill_y:"Ежегодно",bill_save:"−20%",per_month:"/мес",ct_name:"ФИО",ct_email:"E-mail",ct_subject:"Тема",ct_ph_name:"Ваше имя",ct_ph_email:"you@company.com",ct_ph_subject:"Чем можем помочь?",ct_center:"Головной офис",ct_email_lbl:"E-mail:",ct_phone_lbl:"Телефон:",lg_sso_google:"Продолжить с Google",lg_sso_ms:"Продолжить с Microsoft",lg_sso_apple:"Продолжить с Apple",lg_or_email:"или по e-mail",pri_h:"действия ожидают — требуется ваше внимание",pri_sub:"2 новых совпадения с высоким рейтингом ждут ответа · Приближается 1 продление контракта · Требуется обновление документа",pri_open_matches:"Открыть совпадения",pri_all:"Все",range_7d:"7д",range_30d:"30д",range_90d:"90д",range_1y:"1г",ac_title:"Хронология активности",ac_sub:"Полная запись за последние 30 дней.",ac_filter_all:"Все",ac_filter_match:"Совпадения",ac_filter_msg:"Сообщения",ac_filter_prof:"Профиль",ac_filter_doc:"Документы",all_dir:"Все направления",all_scores:"Все баллы",attention:"внимание",back_list:"Назад к списку компаний",cancel:"Отмена",custom:"Персонально",contact_sales:"Связаться с отделом продаж",export_csv:"CSV",remove:"Удалить",upload:"Загрузить",save_all:"Сохранить всё",results:"результатов",complete:"Завершено",stable:"Стабильно",preview_page:"Предпросмотр",ch_ctr:"Распределение по странам",ch_trend:"Тренд роста",ck_logo:"Логотип загружен",ck_doc:"Документы одобрены",ck_social:"Соцсети подключены",ck_gal:"Галерея (5/12 изображений)",cover_h:"Обложка",cover_lbl:"Обложка · 1600×400",cover_tt:"Загрузить обложку",cover_st:"Отображается вверху страницы · 1600×400px рекомендуется · макс 5MB",cover_change:"Загрузить или изменить обложку",doc_h:"Документы *",doc_txt:"📄 Свидетельство о деятельности, Реестровая газета, Циркуляр подписи, Сертификаты качества",doc_hint:"PDF, JPG, PNG · макс 10MB на файл · до 20 документов",ent_p:"Kervea Enterprise · индивидуальное решение",ent_1:"Безлимитные компании, контакты, продвинутый матчинг, экспорт",ent_2:"Индивидуальная интеграция (SAP, Logo, Netsis, Zoho, HubSpot)",ent_3:"White-label профиль (ваш бренд)",ent_4:"Выделенный API-доступ + web-hook поддержка",ent_5:"SLA + приоритетная поддержка (гарантия ответа за 4 часа)",ent_6:"Персональный менеджер",ent_7:"Ежемесячные тренинги и стратегические сессии",fl_cname:"Название компании *",fl_ctitle:"Коммерческое название (EN)",fl_tax:"ИНН *",fl_mersis:"MERSIS / Регистр. №",fl_year:"Год основания *",fl_emp:"Число сотрудников",fl_country:"Страна *",fl_city:"Город",fl_kep:"Зарегистрированный e-mail",fl_web:"Веб-сайт",fl_email:"E-mail *",fl_phone:"Телефон *",fl_repname:"Имя контакта *",fl_reptitle:"Должность",fl_address:"Адрес компании",fl_sec:"Основной сектор *",fl_dir:"Направление торговли *",fl_hs:"Код ТН ВЭД (через запятую)",fl_moq:"MOQ (мин. заказ)",fl_inc:"Предпочтение INCOTERM",fl_pay:"Способ оплаты",fl_products:"Основные продукты / услуги",fl_desc:"Описание компании *",fl_certs:"Сертификаты",gal_h:"Фото продукта / объекта (макс 12)",gal_tt:"Перетащите изображения или выберите",gal_st:"JPG, PNG, WEBP · макс 5MB каждый · до 12 изображений",gal_lbl:"Фото продукта / объекта",gal_add:"Добавить изображение · Поддержка drag & drop",gal_max:"JPG/PNG/WEBP · до 12 изображений · макс 5MB",hiw_tag:"ПРОЦЕСС",hiw_h:"Никаких посредников. Только <em style=\"font-style:normal;color:var(--teal)\">настоящая торговля</em>.",hiw_1a:"01",hiw_1t:"Создайте профиль компании",hiw_1b:"Глобальная видимость за 6 шагов",hiw_1c:"В среднем 8 минут · проверка 24 часа",hiw_2a:"02",hiw_2t:"AI-подбор работает за вас",hiw_2b:"Рекомендации по совпадению",hiw_2c:"20+ совпадений за 3-5 минут",hiw_3a:"03",hiw_3t:"Прямой контакт, переводы в реальном времени",hiw_3b:"Без посредников · без комиссий",hiw_3c:"Среднее время ответа 4 часа",kpi_match:"Новые совпадения",kpi_msg:"Новые сообщения",kpi_offer:"Предложения",kpi_view:"Просмотры",logo_h:"Логотип компании *",logo_hint:"Рекомендуется: 400×400px, PNG/JPG/SVG, макс 2MB",logo_hint2:"PNG · прозрачный фон · мин 200×200",logo_lbl:"Логотип компании",msg_h:"Сообщения",msg_sub:"Прямое общение с проверенными компаниями. E2E-шифрование. Автоперевод на 6 языках.",mt_h:"Мои совпадения",mt_sub:"AI подобрал совпадения. Фильтруйте, экспортируйте, пишите.",ov_hello:"Здравствуйте",ov_sub:"Сводка за последние 30 дней.",ov_recent:"Недавняя активность",ov_status:"Здоровье профиля",ov_ev1:"отправил новое предложение",ov_ev2:"написал сообщение",ov_ev3:"просмотрел ваш профиль",ov_ev4:"Сертификат ISO 9001 подтверждён",ov_ev5:"запрос на подключение",ov_t1:"2 часа назад",ov_t2:"4 часа назад",ov_t3:"1 день назад",ov_t4:"2 дня назад",ov_t5:"3 дня назад",p_ana:"Аналитика",p_people:"Контакты",p_docs:"Мои документы",p_team:"Команда",p_activity:"Активность",plan_starter:"Starter",starter_p:"Бесплатно · для старта",starter_1:"1 профиль + значок верификации",starter_2:"50 совпадений в месяц",starter_3:"Базовая фильтрация по секторам",starter_4:"Автоперевод на 6 языках",starter_5:"Ограниченные сообщения (5/день)",starter_6:"Стандартная поддержка",start_starter:"Начать бесплатно",pro_p:"Kervea Pro · самый популярный",pro_1:"Всё из Starter",pro_2:"Безлимитные совпадения + AI-скоринг",pro_3:"Безлимит: компании, контакты, продвинутый матчинг, экспорт",pro_4:"Безлимитные сообщения + приоритетное ранжирование",pro_5:"Аналитика (посетители, конверсия, конкуренты)",pro_6:"Витрина профиля · показ в топе",pro_7:"Приоритетная поддержка (24 часа)",start_pro:"Улучшить до Pro",prof_h:"Профиль моей компании",prof_sub:"Обновите инфо, изображения и каналы связи.",promo_h:"Есть промокод?",promo_s:"Скидка 30% на Pro на первые 3 месяца.",promo_h2:"Введите код",promo_s2:"Особые коды для ранних пользователей и членов палат.",pub_h:"Заявка получена",pub_p:"Ручная проверка занимает 24-48 часов. Уведомление по e-mail и SMS.",ppl_title:"Контакты",ppl_sub:"Прямые контакты лиц, принимающих решения. 1 кредит за контакт.",ppl_credits:"Кредиты",ppl_renew:"Обновить кредиты",ppl_export:"Экспорт",ppl_all:"Все",ppl_ceo:"CEO / Гендиректор",ppl_purchasing:"Закупки",ppl_sales:"Продажи",ppl_ops:"Операции",ppl_col_person:"Человек",ppl_col_title:"Должность",ppl_col_firm:"Компания",ppl_col_email:"E-mail",ppl_col_phone:"Телефон",ppl_col_act:"Действие",ppl_kvkk:"Информация передаётся в соответствии с законом о защите данных и с согласия представителя компании.",ppl_kvkk_link:"Уведомление о конфиденциальности",pr_title:"Проспект",pr_desc:"Полное профессиональное резюме — PDF для встреч.",pr_dl:"Скачать PDF",pr_pdf:"PDF-проспект",pr_langs:"На 6 языках",pr_mine:"Скачать мой проспект",pr_incl:"Содержание",pr_i1:"Резюме компании + основные продукты",pr_i2:"Сектор, код ТН ВЭД, MOQ",pr_i3:"Значки (налог, регистр, e-mail)",pr_i4:"Сертификаты (ISO, GOTS, HACCP)",pr_i5:"Контакты + QR-код",pr_who:"Для кого?",pr_l1:"Обмен информацией до встреч",pr_l2:"Цифровая визитка на выставках",pr_l3:"Ссылка в соцсетях и на сайте",s3_media:"Логотип",s4_social:"Соцсети",s5_doc:"Документы",s6_pub:"Публикация",sec_biz:"Бизнес-информация",sec_visual:"Визуальная айдентика",sec_social:"Соцсети и Веб",sec_legal:"Юридическая информация",social_intro:"Ваши соцсети и каналы — покупатели свяжутся с вами здесь.",ss_h:"Компании, доверяющие Kervea",ss_p:"Проверенные производители и экспортёры на 6 континентах.",ss_5t:"Антеп Специи",ss_5s:"Газиантеп · Красный перец",tm_title:"Управление командой",tm_sub:"Управляйте пользователями, ролями и правами.",tm_seats:"Использование мест",tm_invite:"+ Пригласить",tm_col_user:"Пользователь",tm_role:"Роль",tm_perms:"Права",tm_status:"Статус",tm_last:"Последний вход",tm_active:"Активный",tm_pending:"Ожидает",tm_owner:"Владелец",tm_admin:"Админ",tm_sales:"Продажи",tm_ops:"Операции",tm_p_all:"Все права",tm_p_msg:"Сообщ + Контакты",tm_p_prof:"Профиль + Документы",vs_prev:"Предпросмотр",why_h:"Почему Kervea?",why_p:"Прощайте, посредники, комиссии и ненадёжные поставщики. Прямой контакт, проверенные компании, реальная торговля.",why_1t:"Страновой коридор",why_2t:"Проверенная компания",why_3t:"Перевод на 6 языках",chat_online:"В сети",chat_verified_firm:"Проверенная компания",chat_typing:"печатает…",chat_btn_firm:"Профиль компании",chat_btn_video:"Видеозвонок",chat_btn_archive:"Архивировать",empty_firms:"Нет компаний, соответствующих фильтру.",empty_records:"Нет записей, соответствующих фильтру.",toast_name_required:"ФИО обязательно",toast_valid_email:"Введите корректный e-mail",toast_invalid_promo:"Недействительный промокод",toast_search_applied:"Поиск применён",toast_csv_downloaded:"CSV загружен",toast_pdf_downloaded:"Проспект загружен",toast_photo_removed:"Фото удалено",toast_photo_uploaded:"Фото загружено",toast_logo_uploaded:"Логотип загружен",toast_login_ok:"Вход выполнен",toast_login_full:"Вход выполнен — полный доступ активен",toast_logout:"Выход выполнен",toast_credit_out:"Кредиты закончились — обновите план",toast_docs_opening:"Открытие загрузчика документов",toast_firm_opening:"Открытие профиля компании",toast_firm_notfound:"Компания не найдена",toast_firm_error:"Ошибка открытия компании",toast_visual_saved:"Визуальная идентичность сохранена",toast_video_call:"Начинается видеозвонок",toast_cover_updated:"Обложка обновлена",toast_chat_archived:"Беседа архивирована",toast_profile_updated:"Профиль обновлён",toast_delete_requested:"Запрос на удаление получен — будет выполнен в течение 7 дней",toast_social_saved:"Данные соцсетей сохранены",toast_form_opened:"Форма запроса открыта",toast_print_pdf:"Сохраните как PDF через меню печати",toast_trade_saved:"Коммерческие данные сохранены",toast_all_tasks:"Показаны все задачи",toast_data_export:"Готовим ваши данные, ссылка будет отправлена на e-mail",toast_legal_saved:"Юридические данные сохранены",toast_cancelled:"Отменено",toast_copied:"Скопировано в буфер обмена",confirm_delete_account:"Ваш аккаунт и все данные будут удалены навсегда. Вы уверены?",tm_inv_h:"Пригласить пользователя",tm_inv_sub:"Добавьте нового участника в команду. Приглашение отправляется по email; пользователь активируется после принятия.",tm_fld_name:"ФИО *",tm_fld_email:"E-mail *",tm_fld_role:"Роль *",tm_role_admin:"Администратор",tm_role_admin_desc:"Все модули · может приглашать",tm_role_sales:"Продажи",tm_role_sales_desc:"Сообщения + Контакты",tm_role_ops:"Операции",tm_role_ops_desc:"Профиль + Документы",tm_role_view:"Только просмотр",tm_role_view_desc:"Доступ только для чтения",tm_inv_info:"Вы можете изменить роль позже. Это будет 5-й пользователь из <b>4/10 мест</b>.",tm_btn_invite:"Отправить приглашение",btn_cancel:"Отмена",tm_perm_h:"Изменить роль и права",tm_perm_sub:"Укажите, к каким модулям может обращаться этот пользователь.",tm_lbl_role:"Роль",tm_lbl_perms:"Права",tm_role_admin_short:"Все модули",tm_role_sales_short:"Сообщ + Контакты",tm_role_view_short:"Чтение",tm_perm_msg:"Сообщения",tm_perm_msg_desc:"Доступ ко всем беседам, отправка сообщений и обмен файлами.",tm_perm_match:"Совпадения и контакты",tm_perm_match_desc:"Просмотр AI-совпадений, использование кредитов контактов.",tm_perm_prof:"Профиль компании",tm_perm_prof_desc:"Редактирование информации компании, галереи и соцсетей.",tm_perm_docs:"Документы",tm_perm_docs_desc:"Загрузка и утверждение сертификатов, налоговых свидетельств и официальных документов.",tm_perm_ana:"Аналитика",tm_perm_ana_desc:"Доступ к сети, конверсия, сравнение с конкурентами и отчёты.",tm_perm_team:"Управление командой",tm_perm_team_desc:"Приглашение новых пользователей, назначение ролей, отключение аккаунтов.",tm_btn_save:"Сохранить изменения",toast_saved:"Сохранено",ph_tm_name:"Напр. Иван Иванов",ph_tm_email:"ivan@company.com",pay_card_holder:"ВЛАДЕЛЕЦ КАРТЫ",pay_card_holder_ph:"ФИО",pay_card_exp_short:"СРОК",pay_per_month:"/мес",pay_method_card:"Карта",pay_method_mc:"MC",pay_method_bank:"Банковский перевод",pay_card_holder_lbl:"Владелец карты",ph_card_holder:"ФИО",ph_promo:"Промокод (необязательно)",toast_pay_success:"Оплата успешна — Pro активирован",pay_disclaimer:"Завершая оплату, вы принимаете <a onclick=\"openM('sozl')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">Пользовательское соглашение</a> и <a onclick=\"openM('kvkk')\" style=\"color:var(--teal);text-decoration:underline;cursor:pointer\">Уведомление о конфиденциальности</a>.",modal_kvkk_h:"Уведомление о конфиденциальности (KVKK Турции)",modal_sozl_h:"Пользовательское соглашение",modal_cookie_h:"Политика конфиденциальности и cookies",legal_disclaimer:"<b>ⓘ</b> Этот документ является турецким юридическим оригиналом. Он обязателен к исполнению в соответствии с турецким законодательством. Переводы на другие языки предоставлены только в информационных целях.",viewers_h:"Кто смотрел ваш профиль",viewers_sub:"Страна определена по IP-адресу · Последние 30 дней",add_draft_btn:"Продолжить позже",add_draft_saved:"Черновик сохранён — войдите, чтобы продолжить",dir_both:"Оба",pay_tt_cash:"TT предоплата",pay_tt_30:"TT 30 дней",pay_tt_60:"TT 60 дней",toast_logo_removed:"Логотип удалён",toast_cover_uploaded:"Обложка загружена",consent_kvkk:"Я прочитал(а) и принимаю <b>Уведомление о конфиденциальности</b>.",consent_terms:"Я принимаю <b>Пользовательское соглашение</b>.",consent_verify:"Разрешаю проверку моих данных.",consent_marketing:"Согласен(на) получать маркетинговые сообщения (необязательно).",consent_read:"Читать",consent_read2:"Читать",ph_cname:"Напр. XYZ Trade Co. ООО",ph_address:"Улица, №, район / город / страна",ph_fullname:"ФИО",ph_gm:"Генеральный директор",ph_products:"Напр. Хлопковая пряжа, ткань, трикотаж",ph_desc:"Опишите вашу компанию, производственные мощности и экспортные рынки в одном абзаце...",an_ip_based:"● По IP",an_visitors_sub:"Страны, откуда приходят посетители (последние 30 дней)",an_pulse_h:"Пульс рынка — Тренды кодов ТН ВЭД",an_pulse_sub:"Изменение спроса-предложения за 8 недель · Источник Trademap",an_p1_nm:"Хлопковая ткань",an_p1_sub:"Германия, Нидерланды, Франция · сильный сигнал покупателя",an_p2_nm:"Мебель (металлический каркас)",an_p2_sub:"Финляндия, Норвегия · рекордный объём заказов",an_p3_nm:"Деревянные поддоны, ящики",an_p3_sub:"Нигерия, Алжир · волатильно из-за нового тарифа",an_p4_nm:"Хлопковая пряжа (кардочёсанная)",an_p4_sub:"Казахстан, Узбекистан · цена сырья снижается",an_p5_nm:"Изделия из железа/стали",an_p5_sub:"Египет, Марокко · снижение перегруженности портов",an_data_freq:"Частота обновления данных: 24 часа",an_full_report:"Полный отчёт →",an_opening_report:"Открытие детального анализа",an_ai_alerts_h:"Центр AI-оповещений",an_ai_alerts_sub:"Возможности и риски, выявленные для вашей компании",an_priority_high:"Высокий приоритет",an_priority_med:"Средний приоритет",an_priority_opp:"Возможность",an_priority_tip:"Подсказка",an_alert1_nm:"критическое время ответа",an_alert1_desc:"Ожидание 3 дня. Если среднее время ответа превысит 4 часа, качество подбора снизится.",an_alert2_nm:"Ваше налоговое свидетельство должно быть продлено в течение 8 дней",an_alert2_desc:"Непродлённые документы снижают рейтинг компании. Перейдите в Мои документы → Загрузить.",an_alert3_nm:"Новая возможность: покупатели из Германии по коду ТН ВЭД 6006",an_alert3_desc:"Обнаружено 6 новых покупателей, подходящих вам. Быстрорастущий коридор в секторе трикотажных тканей.",an_alert4_nm:"Рекомендация по заполнению профиля",an_alert4_desc:"Добавление ещё 7 изображений в галерею повысит ваш рейтинг с 94% до 100%.",an_security_h:"Статус безопасности и проверки",an_sec1_nm:"2FA включена",an_sec2_nm:"Налоговое свидетельство",an_status_approved:"Одобрено",an_sec3_nm:"Торговый реестр",an_status_verified:"Проверено",an_sec4_nm:"Зарегистрированный e-mail",an_status_active:"Активно",an_sec5_sub:"Продление через 15 дней",an_sec6_sub:"Все коммуникации зашифрованы",an_sec7_nm:"Соответствует GDPR",an_sec7_sub:"Уведомление о конфиденциальности v1.2",an_sec8_sub:"IP + ограничение частоты активно",an_deep_h:"Глубокий анализ",fl_yourmsg:"Ваше сообщение",btn_send:"Отправить",toast_msg_sent:"Сообщение отправлено",fl_password:"Пароль",btn_login:"Войти",stat_today:"сегодня",stat_this_week:"на этой неделе",stat_soon:"скоро",ft_kvkk:"Уведомление о конфиденциальности",ft_terms:"Условия использования",ft_cookie:"Конфиденциальность/Cookies",ft_tagline:"Современный Шёлковый путь",fp_decisionmakers:"Лица, принимающие решения",fp_detail:"Подробности",fp_gotoallppl:"Все контакты →",fp_gal1:"Шоу-рум",fp_gal2:"Производство",fp_gal3:"Склад",fp_gal4:"Команда",fp_gal5:"Контроль качества",fp_gal6:"Сертификаты",lock_title:"Контактные данные доступны для участников Pro",lock_sub:"WhatsApp, телефон, email и веб-сайт становятся видны сразу после активации Pro.",lock_cta:"Перейти на Pro",sec_social_short:"Соцсети",dene_lbl:"ПОПРОБУЙ",qt1:"Покупатель мебельной фурнитуры в Финляндии",qt2:"Поставщик какао в Кот-д'Ивуаре",qt3:"Покупатель текстиля в Казахстане",qf_lbl:"БЫСТРЫЙ ФИЛЬТР",f_exp:"Экспорт",f_imp:"Импорт",
     s_pos:"Активных компаний",s_ctr:"Стран и территорий",s_sec:"Секторов",s_lng:"Языков",
     firms_h:"Компании",firms_cnt:"совпадений · по оценке",sort_lbl:"Сорт:",sort_match:"Совпадение",sort_year:"Год",sort_name:"Название",
     add_h:"Добавьте компанию",add_p:"Глобальная видимость за 6 шагов.",s1:"Компания",s2:"Сектор",s3:"Доки",s4:"Согласие",s5:"Публикация",prev:"← Назад",next:"Далее →",
     pr_h:"Тарифы",pr_p:"Ваш уровень глобальной видимости.",ct_h:"Контакты",ct_p:"Мы здесь, чтобы помочь.",
     lg_h:"Войти",lg_p:"Доступ к вашему аккаунту Kervea",pn_h:"Панель компании",pn_p:"Управляйте профилем, совпадениями и сообщениями.",
     p_over:"Обзор",p_matches:"Совпадения",p_profile:"Мой профиль",p_msgs:"Сообщения",p_com:"Обязательства",p_pros:"Проспект",p_set:"Настройки",p_out:"Выход",
     all_sec:"— Все секторы",sel_ctr:"Выберите страну",dd_search:"Поиск страны...",
     dir_exp:"ЭКСПОРТЁР",dir_imp:"ИМПОРТЁР",match_score:"СОВПАД.",verified:"Проверено",
     detail:"Детали",message:"Отправить",match_col:"Компания",prod_col:"Продукт",sec_col:"Сектор",ctr_col:"Страна",score_col:"Совпадение",action_col:"Действие"}
};

// =================== EXTENDED i18n (v5 additions) ===================
var T_EXT = {
 tr:{s3_media:"Logo & Görsel",s4_social:"Sosyal Medya",s5_doc:"Belge & Onay",s6_pub:"Yayın",
  fl_cname:"Firma Adı *",fl_ctitle:"Ticari Ünvan (EN)",fl_tax:"Vergi No / Tax ID *",fl_mersis:"MERSIS / Sicil No",fl_year:"Kuruluş Yılı",fl_emp:"Çalışan Sayısı",fl_country:"Ülke *",fl_city:"Şehir",fl_kep:"KEP Adresi",fl_web:"Web Sitesi",fl_email:"E-posta *",fl_phone:"Telefon *",fl_repname:"Yetkili Adı *",fl_reptitle:"Yetkili Ünvanı",fl_address:"Firma Adresi",fl_sec:"Ana Sektör *",fl_dir:"Ticaret Yönü *",fl_hs:"HS Kodu",fl_moq:"MOQ (Minimum Sipariş)",fl_inc:"INCOTERM Tercihi",fl_pay:"Ödeme Şekli",fl_products:"Ana Ürünler / Hizmetler",fl_desc:"Firma Açıklaması *",fl_certs:"Sertifikalar",
  logo_h:"Firma Logosu *",logo_hint:"400×400px · PNG/JPG/SVG · max 2MB",logo_lbl:"Logo *",logo_hint2:"400×400 · PNG / JPG / SVG · max 2MB",
  cover_h:"Kapak Görseli",cover_tt:"Kapak fotoğrafını yükle",cover_st:"Firma sayfanızın üstünde görünecek · 1600×400px önerilen",cover_lbl:"Kapak Görseli · 1600×400",cover_change:"Kapak fotoğrafı yükle veya değiştir",
  gal_h:"Ürün / Tesis Fotoğrafları (max 12)",gal_tt:"Görselleri sürükle-bırak veya seç",gal_st:"JPG/PNG/WEBP · her biri max 5MB",gal_lbl:"Ürün / Tesis Fotoğrafları",gal_add:"Yeni görsel ekle · Sürükle-bırak destekli",gal_max:"JPG/PNG/WEBP · en fazla 12 görsel · her biri max 5MB",
  upload:"Yükle",remove:"Kaldır",
  social_intro:"Sosyal medya ve iletişim kanallarınız — alıcılar buradan size ulaşacak.",
  doc_h:"Belgeler *",doc_txt:"📄 Faaliyet Belgesi, Sicil Gazetesi, İmza Sirküleri, Kalite Sertifikaları",doc_hint:"PDF/JPG/PNG · her dosya max 10MB · en fazla 20 belge",
  pub_h:"Başvurunuz alındı",pub_p:"Manuel doğrulama 24-48 saat içinde tamamlanır. Yayın hazır olduğunda e-posta ve SMS ile bilgilendirileceksiniz.",
  promo_h:"Promosyon Kodun mu var?",promo_s:"İlk 3 ay Pro plana %30 indirim.",promo_h2:"Promosyon Kodu",promo_s2:"Erken kullanıcılar ve oda üyelerine özel indirim kodları.",apply:"Uygula",
  bill_m:"Aylık",bill_y:"Yıllık",bill_save:"−20%",per_month:"/ay",plan_starter:"Starter",
  starter_p:"Tek firma profili, küresel görünürlük.",starter_1:"1 firma profili + doğrulama rozeti",starter_2:"Ayda 50 eşleşme",starter_3:"6 dilde otomatik profil çevirisi",starter_4:"Firmalarla doğrudan mesajlaşma",starter_5:"10 GB depolama / mesaj dosyaları",starter_6:"E-posta destek (48 saat)",
  pro_p:"Ciddi ihracatçılar ve alıcılar için.",pro_1:"<b>Sınırsız</b> eşleşme + gelişmiş AI skoru",pro_2:"Mesajlarda gerçek zamanlı çeviri (RU/AR/EN...)",pro_3:"40 MB'a kadar dosya paylaşımı",pro_4:"Öne çıkan profil (aramada üstte)",pro_5:"Prospektüs PDF üretici",pro_6:"CRM entegrasyonu (HubSpot, Salesforce)",pro_7:"Öncelikli destek (12 saat) + WhatsApp",
  ent_p:"Holding, dış ticaret şirketi, oda ve birlikler.",ent_1:"Pro'daki her şey +",ent_2:"Çoklu firma & alt kullanıcı yönetimi",ent_3:"REST API + Webhook erişimi",ent_4:"SSO (SAML, Azure AD, Google Workspace)",ent_5:"Sınırsız depolama",ent_6:"SLA %99.9 uptime garantisi",ent_7:"Adanmış hesap yöneticisi",
  start_starter:"Starter'a Başla",start_pro:"Pro'ya Geç",contact_sales:"Satış ile İletişim",custom:"Özel Teklif",
  ov_hello:"Hoş geldin",ov_sub:"Firmanızın performans özeti — son 30 gün",vs_prev:"önceki dönem",stable:"stabil",attention:"dikkat",
  kpi_match:"Yeni Eşleşme",kpi_msg:"Aktif Konuşma",kpi_view:"Profil Görüntülenme",kpi_offer:"Bekleyen Teklif",
  ch_trend:"Eşleşme Trendi (12 hafta)",ch_ctr:"Ülke Dağılımı",
  ctr_de:"Almanya",ctr_fr:"Fransa",ctr_ci:"Fildişi Sahili",ctr_kz:"Kazakistan",ctr_ae:"BAE",
  ov_recent:"Son Etkinlikler",ov_ev1:"yeni teklif gönderdi",ov_ev2:"mesaj yazdı",ov_ev3:"profilinizi görüntüledi",ov_ev4:"ISO 9001 sertifikası doğrulandı",ov_ev5:"bağlantı isteği",ov_t1:"2 saat önce",ov_t2:"4 saat önce",ov_t3:"1 gün önce",ov_t4:"2 gün önce",ov_t5:"3 gün önce",
  ov_status:"Profil Sağlığı",complete:"Tamamlandı",ck_logo:"Logo yüklendi",ck_doc:"Belgeler onaylı",ck_social:"Sosyal medya bağlı",ck_gal:"Galeri (5/12 görsel)",
  mt_h:"Eşleşmelerim",mt_sub:"AI eşleştirme motoru sizin için sıraladı. Filtrele, dışa aktar, doğrudan mesajlaş.",all_dir:"Tüm yönler",all_scores:"Tüm skorlar",results:"sonuç",export_csv:"CSV",
  msg_h:"Mesajlarım",msg_sub:"Uçtan uca şifreli · Otomatik çeviri · 40 MB'a kadar dosya paylaşımı",msg_empty:"Bir konuşma seçin",
  prof_h:"Firma Profilim",prof_sub:"Kayıt sırasındaki tüm veriler. Değiştir, kaydet — anında yayına girer.",preview_page:"Herkese Görünen Sayfayı Aç",
  sec_visual:"Görsel Kimlik",sec_legal:"Yasal & Firma Bilgileri",sec_biz:"Ticari Bilgiler",sec_social:"Sosyal Medya & İletişim Kanalları",save_all:"Tüm Değişiklikleri Kaydet",cancel:"İptal",
  back_list:"Firma listesine dön",fp_about:"Hakkında",fp_defaultdesc:"{name}, {year} yılından bu yana {ctr} merkezli faaliyet gösteren bir firmadır.",fp_defaultdesc2:"Sektöründe uzun yıllara dayanan tecrübesi ve doğrulanmış ticari kayıtlarıyla küresel B2B ağının bir parçasıdır.",fp_gallery:"Ürün & Tesis Galerisi",fp_trade:"Ticaret Bilgileri",fp_sector:"Sektör",fp_hs:"HS Kodu",fp_moq:"MOQ",fp_pay:"Ödeme",fp_dir:"Ticaret Yönü",fp_cert:"Sertifikalar",fp_contact:"İletişim",fp_rep:"Temsilci",fp_email:"E-posta",fp_phone:"Telefon",fp_lock:"İletişim bilgileri giriş yaptıktan sonra görünür.",fp_visit:"Web Sitesi",fp_stats:"İstatistikler",fp_years:"Yıllık deneyim",fp_ctr:"Ülkeye ihracat",since:"Kuruluş",
  online:"Çevrimiçi",autotranslate:"Otomatik Çeviri",e2e:"Uçtan uca şifreli",attach:"Dosya ekle",type_msg:"Mesajınızı yazın...",send:"Gönder",translated_from:"Çevrildi:",original:"Orijinal",dl_started:"İndirme başladı",download:"İndir",new_msg:"Yeni mesaj",file_sent:"Dosya gönderildi",file_toolarge:"Dosya 40 MB sınırını aşıyor"
 },
 en:{s3_media:"Logo & Visuals",s4_social:"Social Media",s5_doc:"Documents & Consent",s6_pub:"Publish",
  fl_cname:"Company Name *",fl_ctitle:"Trade Name (EN)",fl_tax:"Tax ID *",fl_mersis:"Registry / MERSIS No",fl_year:"Founded",fl_emp:"Employees",fl_country:"Country *",fl_city:"City",fl_kep:"Registered e-Mail",fl_web:"Website",fl_email:"Email *",fl_phone:"Phone *",fl_repname:"Contact Person *",fl_reptitle:"Position",fl_address:"Company Address",fl_sec:"Main Sector *",fl_dir:"Trade Direction *",fl_hs:"HS Code",fl_moq:"MOQ (Min. Order)",fl_inc:"INCOTERM Preference",fl_pay:"Payment Terms",fl_products:"Main Products / Services",fl_desc:"Company Description *",fl_certs:"Certificates",
  logo_h:"Company Logo *",logo_hint:"400×400px · PNG/JPG/SVG · max 2MB",logo_lbl:"Logo *",logo_hint2:"400×400 · PNG / JPG / SVG · max 2MB",
  cover_h:"Cover Image",cover_tt:"Upload cover photo",cover_st:"Shown at the top of your company page · 1600×400px recommended",cover_lbl:"Cover Image · 1600×400",cover_change:"Upload or change cover image",
  gal_h:"Product / Facility Photos (up to 12)",gal_tt:"Drag & drop or select images",gal_st:"JPG/PNG/WEBP · max 5MB each",gal_lbl:"Product / Facility Photos",gal_add:"Add new image · drag & drop supported",gal_max:"JPG/PNG/WEBP · up to 12 images · max 5MB each",
  upload:"Upload",remove:"Remove",social_intro:"Your social channels — buyers reach you from here.",
  doc_h:"Documents *",doc_txt:"📄 Activity Certificate, Trade Registry, Signature Circular, Quality Certificates",doc_hint:"PDF/JPG/PNG · max 10MB per file · up to 20 files",
  pub_h:"Application received",pub_p:"Manual verification completes within 24-48 hours. You'll be notified by email and SMS when live.",
  promo_h:"Got a promo code?",promo_s:"30% off Pro plan for first 3 months.",promo_h2:"Promo Code",promo_s2:"Special discount codes for early users and chamber members.",apply:"Apply",
  bill_m:"Monthly",bill_y:"Yearly",bill_save:"−20%",per_month:"/mo",plan_starter:"Starter",
  starter_p:"Single company profile, global visibility.",starter_1:"1 company profile + verified badge",starter_2:"50 matches per month",starter_3:"Auto profile translation in 6 languages",starter_4:"Direct messaging with companies",starter_5:"10 GB storage / message files",starter_6:"Email support (48h)",
  pro_p:"For serious exporters and importers.",pro_1:"<b>Unlimited</b> matches + advanced AI score",pro_2:"Real-time message translation (RU/AR/EN...)",pro_3:"Up to 40 MB file sharing",pro_4:"Featured profile (top of search)",pro_5:"Prospectus PDF generator",pro_6:"CRM integration (HubSpot, Salesforce)",pro_7:"Priority support (12h) + WhatsApp",
  ent_p:"Holdings, trading houses, chambers and unions.",ent_1:"Everything in Pro +",ent_2:"Multi-company & sub-user management",ent_3:"REST API + Webhook access",ent_4:"SSO (SAML, Azure AD, Google Workspace)",ent_5:"Unlimited storage",ent_6:"99.9% SLA uptime guarantee",ent_7:"Dedicated account manager",
  start_starter:"Start with Starter",start_pro:"Upgrade to Pro",contact_sales:"Contact Sales",custom:"Custom Quote",
  ov_hello:"Welcome",ov_sub:"Company performance summary — last 30 days",vs_prev:"vs. previous",stable:"stable",attention:"attention",
  kpi_match:"New Matches",kpi_msg:"Active Chats",kpi_view:"Profile Views",kpi_offer:"Pending Offers",
  ch_trend:"Match Trend (12 weeks)",ch_ctr:"Country Distribution",
  ctr_de:"Germany",ctr_fr:"France",ctr_ci:"Côte d'Ivoire",ctr_kz:"Kazakhstan",ctr_ae:"UAE",
  ov_recent:"Recent Activity",ov_ev1:"sent a new offer",ov_ev2:"wrote a message",ov_ev3:"viewed your profile",ov_ev4:"ISO 9001 certificate verified",ov_ev5:"connection request",ov_t1:"2 hours ago",ov_t2:"4 hours ago",ov_t3:"1 day ago",ov_t4:"2 days ago",ov_t5:"3 days ago",
  ov_status:"Profile Health",complete:"Complete",ck_logo:"Logo uploaded",ck_doc:"Documents verified",ck_social:"Social media linked",ck_gal:"Gallery (5/12 images)",
  mt_h:"My Matches",mt_sub:"The AI matching engine ranked these for you. Filter, export, message directly.",all_dir:"All directions",all_scores:"All scores",results:"results",export_csv:"CSV",
  msg_h:"My Messages",msg_sub:"E2E encrypted · Auto-translate · Up to 40 MB file sharing",msg_empty:"Select a conversation",
  prof_h:"My Company Profile",prof_sub:"All data from registration. Edit and save — goes live instantly.",preview_page:"Open Public Page",
  sec_visual:"Visual Identity",sec_legal:"Legal & Company Info",sec_biz:"Trade Info",sec_social:"Social Media & Contact Channels",save_all:"Save All Changes",cancel:"Cancel",
  back_list:"Back to company list",fp_about:"About",fp_defaultdesc:"{name} has been operating from {ctr} since {year}.",fp_defaultdesc2:"With years of sector experience and verified trade records, it is part of the global verified B2B network.",fp_gallery:"Product & Facility Gallery",fp_trade:"Trade Information",fp_sector:"Sector",fp_hs:"HS Code",fp_moq:"MOQ",fp_pay:"Payment",fp_dir:"Trade Direction",fp_cert:"Certificates",fp_contact:"Contact",fp_rep:"Contact",fp_email:"Email",fp_phone:"Phone",fp_lock:"Contact details visible after sign-in.",fp_visit:"Website",fp_stats:"Stats",fp_years:"Years of experience",fp_ctr:"Countries exported to",since:"Since",
  online:"Online",autotranslate:"Auto Translate",e2e:"End-to-end encrypted",attach:"Attach file",type_msg:"Type your message...",send:"Send",translated_from:"Translated from",original:"Original",dl_started:"Download started",download:"Download",new_msg:"New message",file_sent:"File sent",file_toolarge:"File exceeds 40 MB limit"
 },
 es:{s3_media:"Logo e Imágenes",s4_social:"Redes Sociales",s5_doc:"Documentos y Consent.",s6_pub:"Publicar",
  fl_cname:"Nombre de Empresa *",fl_ctitle:"Nombre Comercial (EN)",fl_tax:"NIF / Tax ID *",fl_mersis:"Registro Mercantil",fl_year:"Año de Fundación",fl_emp:"Empleados",fl_country:"País *",fl_city:"Ciudad",fl_kep:"Email Registrado",fl_web:"Sitio Web",fl_email:"Email *",fl_phone:"Teléfono *",fl_repname:"Persona de Contacto *",fl_reptitle:"Cargo",fl_address:"Dirección",fl_sec:"Sector Principal *",fl_dir:"Dirección Comercial *",fl_hs:"Código HS",fl_moq:"MOQ",fl_inc:"INCOTERM",fl_pay:"Forma de Pago",fl_products:"Productos / Servicios",fl_desc:"Descripción *",fl_certs:"Certificaciones",
  logo_h:"Logo *",logo_hint:"400×400 · PNG/JPG · max 2MB",logo_lbl:"Logo *",logo_hint2:"400×400 · PNG/JPG · max 2MB",cover_h:"Imagen de Portada",cover_tt:"Subir portada",cover_st:"1600×400px recomendado",cover_lbl:"Portada · 1600×400",cover_change:"Cambiar imagen",gal_h:"Fotos de Producto/Instalación",gal_tt:"Arrastra y suelta",gal_st:"JPG/PNG · max 5MB c/u",gal_lbl:"Fotos",gal_add:"Añadir imagen",gal_max:"Hasta 12 imágenes",upload:"Subir",remove:"Quitar",social_intro:"Sus canales sociales.",doc_h:"Documentos *",doc_txt:"📄 Suba documentos oficiales",doc_hint:"PDF/JPG · max 10MB",pub_h:"Solicitud recibida",pub_p:"Verificación manual en 24-48 horas.",promo_h:"¿Código promocional?",promo_s:"30% off Pro por 3 meses.",promo_h2:"Código Promocional",promo_s2:"Descuentos para usuarios tempranos.",apply:"Aplicar",bill_m:"Mensual",bill_y:"Anual",bill_save:"−20%",per_month:"/mes",plan_starter:"Starter",
  starter_p:"Un perfil, visibilidad global.",starter_1:"1 perfil + verificación",starter_2:"50 coincidencias/mes",starter_3:"Traducción de perfil en 6 idiomas",starter_4:"Mensajería directa",starter_5:"10 GB",starter_6:"Soporte email (48h)",
  pro_p:"Para exportadores serios.",pro_1:"<b>Ilimitado</b> + AI score",pro_2:"Traducción en tiempo real",pro_3:"Archivos hasta 40 MB",pro_4:"Perfil destacado",pro_5:"Prospecto PDF",pro_6:"Integración CRM",pro_7:"Soporte prioritario",
  ent_p:"Holdings y cámaras.",ent_1:"Todo Pro +",ent_2:"Multi-empresa",ent_3:"API + Webhook",ent_4:"SSO",ent_5:"Ilimitado",ent_6:"SLA 99.9%",ent_7:"Ejecutivo dedicado",
  start_starter:"Comenzar",start_pro:"Cambiar a Pro",contact_sales:"Contactar Ventas",custom:"Cotización",
  ov_hello:"Bienvenido",ov_sub:"Resumen de rendimiento — últimos 30 días",vs_prev:"vs. anterior",stable:"estable",attention:"atención",kpi_match:"Nuevas Coincidencias",kpi_msg:"Chats Activos",kpi_view:"Vistas de Perfil",kpi_offer:"Ofertas Pendientes",ch_trend:"Tendencia (12 semanas)",ch_ctr:"Distribución por País",ctr_de:"Alemania",ctr_fr:"Francia",ctr_ci:"Costa de Marfil",ctr_kz:"Kazajistán",ctr_ae:"EAU",ov_recent:"Actividad Reciente",ov_ev1:"envió una nueva oferta",ov_ev2:"escribió un mensaje",ov_ev3:"vio su perfil",ov_ev4:"certificado ISO 9001 verificado",ov_ev5:"solicitud de conexión",ov_t1:"hace 2 horas",ov_t2:"hace 4 horas",ov_t3:"hace 1 día",ov_t4:"hace 2 días",ov_t5:"hace 3 días",ov_status:"Salud del Perfil",complete:"Completado",ck_logo:"Logo subido",ck_doc:"Documentos verificados",ck_social:"Redes vinculadas",ck_gal:"Galería (5/12)",
  mt_h:"Mis Coincidencias",mt_sub:"El motor AI las ha ordenado.",all_dir:"Todas",all_scores:"Todas",results:"resultados",export_csv:"CSV",msg_h:"Mis Mensajes",msg_sub:"E2E · Auto-traducción · 40 MB",msg_empty:"Selecciona una conversación",prof_h:"Mi Perfil",prof_sub:"Todos los datos de registro.",preview_page:"Abrir Página Pública",sec_visual:"Identidad Visual",sec_legal:"Datos Legales",sec_biz:"Datos Comerciales",sec_social:"Redes y Contacto",save_all:"Guardar Todo",cancel:"Cancelar",
  back_list:"Volver a la lista",fp_about:"Acerca de",fp_defaultdesc:"{name} opera desde {ctr} desde {year}.",fp_defaultdesc2:"Parte de la red B2B verificada global.",fp_gallery:"Galería",fp_trade:"Información Comercial",fp_sector:"Sector",fp_hs:"HS",fp_moq:"MOQ",fp_pay:"Pago",fp_dir:"Dirección",fp_cert:"Certificados",fp_contact:"Contacto",fp_rep:"Contacto",fp_email:"Email",fp_phone:"Teléfono",fp_lock:"Detalles visibles tras iniciar sesión.",fp_visit:"Sitio Web",fp_stats:"Stats",fp_years:"Años de experiencia",fp_ctr:"Países a los que exporta",since:"Desde",
  online:"En línea",autotranslate:"Traducción Automática",e2e:"Cifrado E2E",attach:"Adjuntar",type_msg:"Escribe tu mensaje...",send:"Enviar",translated_from:"Traducido de",original:"Original",dl_started:"Descarga iniciada",download:"Descargar",new_msg:"Nuevo mensaje",file_sent:"Archivo enviado",file_toolarge:"Archivo excede 40 MB"
 },
 fr:{s3_media:"Logo & Visuels",s4_social:"Réseaux Sociaux",s5_doc:"Docs & Consent.",s6_pub:"Publication",
  fl_cname:"Nom de l'Entreprise *",fl_ctitle:"Raison Sociale (EN)",fl_tax:"N° Fiscal *",fl_mersis:"Registre",fl_year:"Année de Création",fl_emp:"Effectif",fl_country:"Pays *",fl_city:"Ville",fl_kep:"Email Officiel",fl_web:"Site Web",fl_email:"Email *",fl_phone:"Téléphone *",fl_repname:"Contact *",fl_reptitle:"Poste",fl_address:"Adresse",fl_sec:"Secteur Principal *",fl_dir:"Direction Commerciale *",fl_hs:"Code HS",fl_moq:"MOQ",fl_inc:"INCOTERM",fl_pay:"Paiement",fl_products:"Produits / Services",fl_desc:"Description *",fl_certs:"Certifications",
  logo_h:"Logo *",logo_hint:"400×400 · PNG/JPG · max 2Mo",logo_lbl:"Logo *",logo_hint2:"400×400 · PNG/JPG · max 2Mo",cover_h:"Image de Couverture",cover_tt:"Charger la couverture",cover_st:"1600×400 recommandé",cover_lbl:"Couverture · 1600×400",cover_change:"Changer l'image",gal_h:"Photos Produits/Site",gal_tt:"Glisser-déposer",gal_st:"JPG/PNG · max 5Mo",gal_lbl:"Photos",gal_add:"Ajouter une image",gal_max:"Jusqu'à 12 images",upload:"Charger",remove:"Retirer",social_intro:"Vos canaux sociaux.",doc_h:"Documents *",doc_txt:"📄 Chargez les documents",doc_hint:"PDF/JPG · max 10Mo",pub_h:"Demande reçue",pub_p:"Vérification manuelle en 24-48h.",promo_h:"Code promo ?",promo_s:"30% sur Pro les 3 premiers mois.",promo_h2:"Code Promo",promo_s2:"Codes spéciaux pour utilisateurs précoces.",apply:"Appliquer",bill_m:"Mensuel",bill_y:"Annuel",bill_save:"−20%",per_month:"/mois",plan_starter:"Starter",
  starter_p:"Un profil, visibilité mondiale.",starter_1:"1 profil + vérifié",starter_2:"50 correspondances/mois",starter_3:"Traduction 6 langues",starter_4:"Messagerie directe",starter_5:"10 Go",starter_6:"Support email (48h)",
  pro_p:"Pour exportateurs sérieux.",pro_1:"<b>Illimité</b> + score AI",pro_2:"Traduction temps réel",pro_3:"Fichiers jusqu'à 40 Mo",pro_4:"Profil mis en avant",pro_5:"Prospectus PDF",pro_6:"Intégration CRM",pro_7:"Support prioritaire",
  ent_p:"Holdings & chambres.",ent_1:"Tout Pro +",ent_2:"Multi-entreprise",ent_3:"API + Webhook",ent_4:"SSO",ent_5:"Illimité",ent_6:"SLA 99.9%",ent_7:"Compte dédié",
  start_starter:"Commencer",start_pro:"Passer à Pro",contact_sales:"Contact Commercial",custom:"Devis",
  ov_hello:"Bienvenue",ov_sub:"Résumé de performance — 30 derniers jours",vs_prev:"vs. précédent",stable:"stable",attention:"attention",kpi_match:"Nouvelles Correspondances",kpi_msg:"Conversations Actives",kpi_view:"Vues de Profil",kpi_offer:"Offres en Attente",ch_trend:"Tendance (12 sem.)",ch_ctr:"Répartition par Pays",ctr_de:"Allemagne",ctr_fr:"France",ctr_ci:"Côte d'Ivoire",ctr_kz:"Kazakhstan",ctr_ae:"EAU",ov_recent:"Activité Récente",ov_ev1:"a envoyé une nouvelle offre",ov_ev2:"a écrit un message",ov_ev3:"a vu votre profil",ov_ev4:"certificat ISO 9001 vérifié",ov_ev5:"demande de connexion",ov_t1:"il y a 2h",ov_t2:"il y a 4h",ov_t3:"il y a 1j",ov_t4:"il y a 2j",ov_t5:"il y a 3j",ov_status:"Santé du Profil",complete:"Complété",ck_logo:"Logo chargé",ck_doc:"Documents vérifiés",ck_social:"Réseaux liés",ck_gal:"Galerie (5/12)",
  mt_h:"Mes Correspondances",mt_sub:"Le moteur IA les a classées.",all_dir:"Toutes",all_scores:"Tous",results:"résultats",export_csv:"CSV",msg_h:"Mes Messages",msg_sub:"E2E · Traduction auto · 40 Mo max",msg_empty:"Choisissez une conversation",prof_h:"Mon Profil",prof_sub:"Toutes les données d'inscription.",preview_page:"Ouvrir Page Publique",sec_visual:"Identité Visuelle",sec_legal:"Informations Légales",sec_biz:"Informations Commerciales",sec_social:"Réseaux Sociaux & Contact",save_all:"Enregistrer Tout",cancel:"Annuler",
  back_list:"Retour à la liste",fp_about:"À Propos",fp_defaultdesc:"{name} opère depuis {ctr} depuis {year}.",fp_defaultdesc2:"Membre du réseau B2B vérifié global.",fp_gallery:"Galerie",fp_trade:"Informations Commerciales",fp_sector:"Secteur",fp_hs:"HS",fp_moq:"MOQ",fp_pay:"Paiement",fp_dir:"Direction",fp_cert:"Certificats",fp_contact:"Contact",fp_rep:"Contact",fp_email:"Email",fp_phone:"Téléphone",fp_lock:"Coordonnées visibles après connexion.",fp_visit:"Site Web",fp_stats:"Stats",fp_years:"Années d'expérience",fp_ctr:"Pays d'exportation",since:"Depuis",
  online:"En ligne",autotranslate:"Traduction Auto",e2e:"Chiffré de bout en bout",attach:"Joindre",type_msg:"Écrivez votre message...",send:"Envoyer",translated_from:"Traduit du",original:"Original",dl_started:"Téléchargement lancé",download:"Télécharger",new_msg:"Nouveau message",file_sent:"Fichier envoyé",file_toolarge:"Fichier dépasse 40 Mo"
 },
 ar:{s3_media:"الشعار والصور",s4_social:"وسائل التواصل",s5_doc:"الوثائق والموافقة",s6_pub:"النشر",
  fl_cname:"اسم الشركة *",fl_ctitle:"الاسم التجاري (EN)",fl_tax:"الرقم الضريبي *",fl_mersis:"السجل التجاري",fl_year:"سنة التأسيس",fl_emp:"عدد الموظفين",fl_country:"الدولة *",fl_city:"المدينة",fl_kep:"البريد الرسمي",fl_web:"الموقع",fl_email:"البريد *",fl_phone:"الهاتف *",fl_repname:"جهة الاتصال *",fl_reptitle:"المنصب",fl_address:"العنوان",fl_sec:"القطاع *",fl_dir:"اتجاه التجارة *",fl_hs:"رمز HS",fl_moq:"MOQ",fl_inc:"INCOTERM",fl_pay:"الدفع",fl_products:"المنتجات",fl_desc:"الوصف *",fl_certs:"الشهادات",
  logo_h:"الشعار *",logo_hint:"400×400",logo_lbl:"الشعار *",logo_hint2:"400×400 · PNG/JPG · حد أقصى 2MB",cover_h:"صورة الغلاف",cover_tt:"رفع الغلاف",cover_st:"1600×400 موصى به",cover_lbl:"الغلاف · 1600×400",cover_change:"تغيير الغلاف",gal_h:"صور المنتج/المنشأة",gal_tt:"اسحب وأفلت",gal_st:"JPG/PNG · 5MB لكل صورة",gal_lbl:"الصور",gal_add:"إضافة صورة",gal_max:"حتى 12 صورة",upload:"رفع",remove:"إزالة",social_intro:"قنوات التواصل الخاصة بك.",doc_h:"الوثائق *",doc_txt:"📄 وثائق رسمية",doc_hint:"PDF/JPG · 10MB",pub_h:"تم استلام الطلب",pub_p:"تحقق يدوي خلال 24-48 ساعة.",promo_h:"لديك رمز ترويجي؟",promo_s:"خصم 30% على Pro لأول 3 أشهر.",promo_h2:"رمز ترويجي",promo_s2:"خصومات للمستخدمين الأوائل.",apply:"تطبيق",bill_m:"شهري",bill_y:"سنوي",bill_save:"−20%",per_month:"/شهر",plan_starter:"Starter",
  starter_p:"ملف واحد، رؤية عالمية.",starter_1:"ملف واحد + موثق",starter_2:"50 مطابقة/شهر",starter_3:"ترجمة تلقائية بـ 6 لغات",starter_4:"مراسلة مباشرة",starter_5:"10 GB",starter_6:"دعم بريد (48 ساعة)",
  pro_p:"للمصدرين الجادين.",pro_1:"<b>غير محدود</b> + AI",pro_2:"ترجمة فورية",pro_3:"ملفات حتى 40 MB",pro_4:"ملف مميز",pro_5:"PDF نشرة",pro_6:"CRM",pro_7:"دعم أولوية",
  ent_p:"للشركات والغرف.",ent_1:"كل Pro +",ent_2:"إدارة متعددة",ent_3:"API + Webhook",ent_4:"SSO",ent_5:"غير محدود",ent_6:"SLA 99.9%",ent_7:"مدير مخصص",
  start_starter:"ابدأ",start_pro:"الترقية",contact_sales:"اتصل بالمبيعات",custom:"عرض خاص",
  ov_hello:"مرحبًا",ov_sub:"ملخص الأداء — آخر 30 يومًا",vs_prev:"مقابل السابق",stable:"مستقر",attention:"انتباه",kpi_match:"مطابقات جديدة",kpi_msg:"محادثات نشطة",kpi_view:"مشاهدات الملف",kpi_offer:"عروض معلقة",ch_trend:"الاتجاه (12 أسبوعًا)",ch_ctr:"التوزيع حسب الدولة",ctr_de:"ألمانيا",ctr_fr:"فرنسا",ctr_ci:"ساحل العاج",ctr_kz:"كازاخستان",ctr_ae:"الإمارات",ov_recent:"النشاط الأخير",ov_ev1:"أرسل عرضًا جديدًا",ov_ev2:"كتب رسالة",ov_ev3:"شاهد ملفك",ov_ev4:"تم التحقق من ISO 9001",ov_ev5:"طلب اتصال",ov_t1:"قبل ساعتين",ov_t2:"قبل 4 ساعات",ov_t3:"قبل يوم",ov_t4:"قبل يومين",ov_t5:"قبل 3 أيام",ov_status:"صحة الملف",complete:"مكتمل",ck_logo:"تم رفع الشعار",ck_doc:"وثائق موثقة",ck_social:"وسائل التواصل مرتبطة",ck_gal:"المعرض (5/12)",
  mt_h:"مطابقاتي",mt_sub:"محرك الذكاء الاصطناعي رتّبها.",all_dir:"الكل",all_scores:"الكل",results:"نتائج",export_csv:"CSV",msg_h:"رسائلي",msg_sub:"تشفير E2E · ترجمة تلقائية · 40 MB",msg_empty:"اختر محادثة",prof_h:"ملف شركتي",prof_sub:"جميع بيانات التسجيل.",preview_page:"افتح الصفحة العامة",sec_visual:"الهوية البصرية",sec_legal:"معلومات قانونية",sec_biz:"معلومات تجارية",sec_social:"وسائل التواصل والاتصال",save_all:"حفظ الكل",cancel:"إلغاء",
  back_list:"العودة للقائمة",fp_about:"نبذة",fp_defaultdesc:"تعمل {name} من {ctr} منذ {year}.",fp_defaultdesc2:"جزء من شبكة B2B الموثقة.",fp_gallery:"المعرض",fp_trade:"معلومات تجارية",fp_sector:"القطاع",fp_hs:"HS",fp_moq:"MOQ",fp_pay:"الدفع",fp_dir:"الاتجاه",fp_cert:"شهادات",fp_contact:"اتصال",fp_rep:"جهة الاتصال",fp_email:"البريد",fp_phone:"الهاتف",fp_lock:"التفاصيل مرئية بعد تسجيل الدخول.",fp_visit:"الموقع",fp_stats:"إحصائيات",fp_years:"سنوات الخبرة",fp_ctr:"دول التصدير",since:"منذ",
  online:"متصل",autotranslate:"ترجمة تلقائية",e2e:"مشفر E2E",attach:"إرفاق",type_msg:"اكتب رسالتك...",send:"إرسال",translated_from:"مترجم من",original:"الأصل",dl_started:"بدأ التحميل",download:"تحميل",new_msg:"رسالة جديدة",file_sent:"تم إرسال الملف",file_toolarge:"الملف يتجاوز 40 MB"
 },
 ru:{s3_media:"Лого и Медиа",s4_social:"Соцсети",s5_doc:"Документы",s6_pub:"Публикация",
  fl_cname:"Название Компании *",fl_ctitle:"Торговое Имя (EN)",fl_tax:"ИНН / Tax ID *",fl_mersis:"Регистрационный №",fl_year:"Год Основания",fl_emp:"Сотрудники",fl_country:"Страна *",fl_city:"Город",fl_kep:"Официальный Email",fl_web:"Сайт",fl_email:"Email *",fl_phone:"Телефон *",fl_repname:"Контактное лицо *",fl_reptitle:"Должность",fl_address:"Адрес",fl_sec:"Основной Сектор *",fl_dir:"Направление *",fl_hs:"Код HS",fl_moq:"MOQ",fl_inc:"INCOTERM",fl_pay:"Оплата",fl_products:"Продукты",fl_desc:"Описание *",fl_certs:"Сертификаты",
  logo_h:"Логотип *",logo_hint:"400×400 · PNG/JPG · до 2МБ",logo_lbl:"Логотип *",logo_hint2:"400×400 · PNG/JPG · до 2МБ",cover_h:"Обложка",cover_tt:"Загрузить обложку",cover_st:"1600×400 рекомендуется",cover_lbl:"Обложка · 1600×400",cover_change:"Изменить обложку",gal_h:"Фото Продукции/Производства",gal_tt:"Перетащите или выберите",gal_st:"JPG/PNG · до 5МБ",gal_lbl:"Фото",gal_add:"Добавить фото",gal_max:"До 12 фото",upload:"Загрузить",remove:"Удалить",social_intro:"Ваши каналы связи.",doc_h:"Документы *",doc_txt:"📄 Официальные документы",doc_hint:"PDF/JPG · до 10МБ",pub_h:"Заявка получена",pub_p:"Проверка вручную за 24-48 ч.",promo_h:"Есть промокод?",promo_s:"30% скидка на Pro первые 3 месяца.",promo_h2:"Промокод",promo_s2:"Специальные скидки для ранних пользователей.",apply:"Применить",bill_m:"Ежемесячно",bill_y:"Ежегодно",bill_save:"−20%",per_month:"/мес",plan_starter:"Starter",
  starter_p:"Один профиль, глобально.",starter_1:"1 профиль + верификация",starter_2:"50 совпадений/мес",starter_3:"Перевод на 6 языков",starter_4:"Прямая переписка",starter_5:"10 ГБ",starter_6:"Email поддержка (48 ч)",
  pro_p:"Для серьёзных экспортеров.",pro_1:"<b>Безлимит</b> + AI",pro_2:"Перевод в реальном времени",pro_3:"Файлы до 40 МБ",pro_4:"Продвижение в поиске",pro_5:"PDF-проспект",pro_6:"CRM интеграция",pro_7:"Приоритетная поддержка",
  ent_p:"Холдинги и палаты.",ent_1:"Всё из Pro +",ent_2:"Мульти-компания",ent_3:"API + Webhook",ent_4:"SSO",ent_5:"Безлимит",ent_6:"SLA 99.9%",ent_7:"Персональный менеджер",
  start_starter:"Начать",start_pro:"Перейти на Pro",contact_sales:"Связаться с продажами",custom:"Спец. предложение",
  ov_hello:"Добро пожаловать",ov_sub:"Сводка производительности — 30 дней",vs_prev:"vs. предыдущее",stable:"стабильно",attention:"внимание",kpi_match:"Новые Совпадения",kpi_msg:"Активные Чаты",kpi_view:"Просмотры",kpi_offer:"Ожидают",ch_trend:"Тренд (12 недель)",ch_ctr:"Распределение по Странам",ctr_de:"Германия",ctr_fr:"Франция",ctr_ci:"Кот-д'Ивуар",ctr_kz:"Казахстан",ctr_ae:"ОАЭ",ov_recent:"Недавняя Активность",ov_ev1:"отправил новое предложение",ov_ev2:"написал сообщение",ov_ev3:"посмотрел ваш профиль",ov_ev4:"сертификат ISO 9001 проверен",ov_ev5:"запрос на связь",ov_t1:"2 часа назад",ov_t2:"4 часа назад",ov_t3:"1 день назад",ov_t4:"2 дня назад",ov_t5:"3 дня назад",ov_status:"Здоровье Профиля",complete:"Завершено",ck_logo:"Лого загружено",ck_doc:"Документы проверены",ck_social:"Соцсети привязаны",ck_gal:"Галерея (5/12)",
  mt_h:"Мои Совпадения",mt_sub:"AI-движок отсортировал их.",all_dir:"Все",all_scores:"Все",results:"результатов",export_csv:"CSV",msg_h:"Мои Сообщения",msg_sub:"E2E шифрование · Автоперевод · до 40 МБ",msg_empty:"Выберите беседу",prof_h:"Мой Профиль",prof_sub:"Все данные регистрации.",preview_page:"Открыть Публичную Страницу",sec_visual:"Визуальная Идентичность",sec_legal:"Юр. Информация",sec_biz:"Ком. Информация",sec_social:"Соцсети и Контакт",save_all:"Сохранить Всё",cancel:"Отмена",
  back_list:"Назад к списку",fp_about:"О компании",fp_defaultdesc:"{name} работает из {ctr} с {year}.",fp_defaultdesc2:"Часть глобальной верифицированной B2B-сети.",fp_gallery:"Галерея",fp_trade:"Торговая Информация",fp_sector:"Сектор",fp_hs:"HS",fp_moq:"MOQ",fp_pay:"Оплата",fp_dir:"Направление",fp_cert:"Сертификаты",fp_contact:"Контакт",fp_rep:"Контакт",fp_email:"Email",fp_phone:"Телефон",fp_lock:"Контакты видны после входа.",fp_visit:"Сайт",fp_stats:"Стат.",fp_years:"Лет опыта",fp_ctr:"Стран экспорта",since:"с",
  online:"Онлайн",autotranslate:"Автоперевод",e2e:"E2E шифрование",attach:"Прикрепить",type_msg:"Напишите сообщение...",send:"Отправить",translated_from:"Переведено с",original:"Оригинал",dl_started:"Загрузка начата",download:"Скачать",new_msg:"Новое сообщение",file_sent:"Файл отправлен",file_toolarge:"Файл превышает 40 МБ"
 }
};
// Merge extension into T
Object.keys(T_EXT).forEach(function(lng){
 Object.keys(T_EXT[lng]).forEach(function(k){ T[lng][k] = T_EXT[lng][k]; });
});

// ============= EXTENDED i18n for new content (people, analytics, docs, messages, drawer, stepper, team, activity, gate) =============
var I18N_EXT = {
 tr:{
  p_msgs:"Mesajlar",p_people:"Kişiler",p_ana:"Analiz",p_docs:"Belgelerim",p_team:"Ekip",p_activity:"Aktivite",
  ppl_title:"Kişiler",ppl_sub:"Doğrulanmış firmalardaki karar vericilere doğrudan erişim. E-posta ve telefon bilgilerini tek tıkla açın.",
  ppl_credits:"Kredi kaldı",ppl_renew:"Aylık yenilenir",
  ppl_search:"Kişi adı, firma veya ünvan ara...",ppl_all:"Tümü",ppl_ceo:"CEO/Kurucu",ppl_purchasing:"Satın Alma",ppl_sales:"Satış",ppl_export:"İhracat/İthalat",ppl_ops:"Operasyon",
  ppl_col_person:"KİŞİ",ppl_col_firm:"FİRMA",ppl_col_title:"ÜNVAN",ppl_col_email:"E-POSTA",ppl_col_phone:"TELEFON",ppl_col_act:"İŞLEM",
  ppl_show_email:"E-posta göster",ppl_show_phone:"Telefon göster",ppl_verified:"Kervea doğrulaması",ppl_empty:"Filtrenize uyan kişi bulunamadı.",
  ppl_kvkk:"Kişi bilgileri kamuya açık kaynaklardan (LinkedIn, firma web siteleri, ticaret sicili, gümrük beyannameleri) derlenmiştir. KVKK m.28/1-d kapsamında işlenir. Kaldırma başvurusu",ppl_kvkk_link:"buradan yapılabilir",
  pd_contact:"İletişim",pd_firm:"Firma",pd_social:"Sosyal & Web",pd_history:"Etkileşim Geçmişi",pd_verified:"E-posta + firma alanı eşleşiyor",pd_open_credit:"Aç · 1 kredi",pd_save:"Kaydet",pd_msg:"Mesaj At",pd_joined:"Ağa katılma",pd_lastseen:"Son giriş",pd_response:"Cevap süresi",pd_sector_lbl:"Sektör",pd_verify_lbl:"Doğrulama",pd_country_lbl:"Ülke",pd_firmname_lbl:"Firma Adı",pd_response_val:"Ort. 4 saat",pd_joined_val:"Ocak 2024",pd_lastseen_val:"3 gün önce",
  role_purchasing:"Satın Alma",role_sales:"Satış",role_export:"İhracat/İthalat",fp_decisionmakers:"Karar Vericiler",fp_detail:"Detay",fp_gotoallppl:"Tüm Kişiler paneline git →",
  an_title:"Derin Analiz",an_sub:"Firmanızın ağdaki konumu, ticaret akışı ve rakip karşılaştırması",
  an_reach:"Ağ Erişimi",an_score:"Ort. Eşleşme Skoru",an_time:"Ort. Cevap Süresi",an_conv:"Dönüşüm Oranı",
  hs_title:"En Çok Talep Gören HS Kodlarınız",hs_last30:"Son 30 gün",
  comp_title:"Rakip Karşılaştırması",comp_sub:"Aynı sektör · aynı ülke · benzer büyüklük",comp_you:"Sizin firmanız",comp_avg:"Sektör Ortalaması",comp_top:"En iyi %10 (P90)",comp_metrics:"Skor · Eşleşme · Dönüşüm",comp_metrics_lbl:"Metrikler:",
  doc_title:"Belgelerim",doc_sub:"Doğrulanmış belgeler firma sıralamanızı yükseltir. Belgeler AES-256 ile şifreli saklanır.",doc_upload:"Yeni Belge Yükle",doc_verified:"Doğrulandı",doc_add:"Yeni belge ekle",doc_add_hint:"PDF, PNG, JPG · max 20 MB",doc_renew:"15g içinde yenile",
  msg_search:"Konuşmalarda ara...",msg_online:"Çevrimiçi",msg_verified_firm:"Doğrulanmış firma",msg_today:"Bugün",msg_auto_tr:"Otomatik çeviri",msg_read:"Okundu",msg_typing:"yazıyor…",msg_type:"Yanıt yazın… (Enter göndermek, Shift+Enter yeni satır)",msg_send:"Gönder",msg_lang_note:"Türkçe yazın · Karşı tarafa Fince olarak iletilecek · Otomatik çeviri aktif",msg_open:"Konuşma yüklendi",msg_sent:"Mesaj gönderildi · çevrildi",
  gate_title:"Firma bilgileri Pro üyelere açık",gate_sub:"Firma unvanı, ülke, HS kodu ve iletişim bilgileri Pro üyelikle anında görünür olur.",gate_cta:"Pro'ya Yükselt →",
  st_pos:"Aktif firma",st_ctr:"Ülke",st_sec:"Sektör",st_lng:"Dil",st_live:"Canlı",st_today:"bugün",st_week:"bu hafta",st_stable:"Sabit",st_full:"tam kapsam",st_soon:"yakında JP",
  sector_lbl:"Sektör",all_sec_pick:"— Tümü —",sec_search:"Sektör ara...",
  add_intro:"6 adımda küresel görünürlük. Her adım kaydedilir; istediğin an dönebilirsin.",add_save:"Sonra Devam Et",add_draft:"Taslak kaydedildi — devam etmek için giriş yapın",
  tm_title:"Ekip Yönetimi",tm_sub:"Firmanızda birden fazla kullanıcı hesabı yönetin. Roller ve izinler.",tm_invite:"Kullanıcı Davet Et",tm_role:"Rol",tm_perms:"İzinler",tm_status:"Durum",tm_email:"E-posta",tm_last:"Son etkinlik",tm_owner:"Sahip",tm_admin:"Yönetici",tm_sales:"Satış",tm_ops:"Operasyon",tm_view:"Sadece görüntüleme",tm_active:"Aktif",tm_pending:"Beklemede",tm_seats:"Koltuk",tm_col_user:"KULLANICI",tm_p_all:"Tüm modüller",tm_p_msg:"Sadece mesajlaşma",tm_p_prof:"Profil + Doküman",tm_p_view:"Görüntüleme",
  ac_title:"Aktivite Zaman Çizelgesi",ac_sub:"Son 30 günün tam kaydı. Firma etkileşimleriniz, gelen mesajlar, eşleşmeler ve belgeler.",ac_filter_all:"Tümü",ac_filter_msg:"Mesajlar",ac_filter_match:"Eşleşmeler",ac_filter_doc:"Belgeler",ac_filter_prof:"Profil",ac_today:"Bugün",ac_yesterday:"Dün",
  fp_paywall:"Bu firmayı görmek için giriş yapın",fp_paywall_sub:"Ücretsiz üyelikle günde 3 firma incelenebilir. Sınırsız erişim için Pro üye olun."
 },
 en:{
  p_msgs:"Messages",p_people:"People",p_ana:"Analytics",p_docs:"My Documents",p_team:"Team",p_activity:"Activity",
  ppl_title:"People",ppl_sub:"Direct access to decision-makers at verified companies. Reveal email and phone with one click.",
  ppl_credits:"credits left",ppl_renew:"Renews monthly",
  ppl_search:"Search name, company or title...",ppl_all:"All",ppl_ceo:"CEO/Founder",ppl_purchasing:"Purchasing",ppl_sales:"Sales",ppl_export:"Export/Import",ppl_ops:"Operations",
  ppl_col_person:"PERSON",ppl_col_firm:"COMPANY",ppl_col_title:"TITLE",ppl_col_email:"EMAIL",ppl_col_phone:"PHONE",ppl_col_act:"ACTIONS",
  ppl_show_email:"Show email",ppl_show_phone:"Show phone",ppl_verified:"Kervea verified",ppl_empty:"No matching contacts found.",
  ppl_kvkk:"Contact info is compiled from public sources (LinkedIn, company websites, trade registries, customs declarations). Processed under GDPR legitimate interest. Removal request",ppl_kvkk_link:"via this form",
  pd_contact:"Contact",pd_firm:"Company",pd_social:"Social & Web",pd_history:"Engagement History",pd_verified:"Email + firm domain match verified",pd_open_credit:"Reveal · 1 credit",pd_save:"Save",pd_msg:"Send Message",pd_joined:"Joined",pd_lastseen:"Last seen",pd_response:"Response time",pd_sector_lbl:"Sector",pd_verify_lbl:"Verification",pd_country_lbl:"Country",pd_firmname_lbl:"Company Name",pd_response_val:"Avg. 4 hours",pd_joined_val:"January 2024",pd_lastseen_val:"3 days ago",
  role_purchasing:"Purchasing",role_sales:"Sales",role_export:"Export/Import",fp_decisionmakers:"Decision Makers",fp_detail:"Details",fp_gotoallppl:"Go to full People panel →",
  an_title:"Deep Analytics",an_sub:"Your position in the network, trade flow and competitor benchmarks",
  an_reach:"Network Reach",an_score:"Avg. Match Score",an_time:"Avg. Response Time",an_conv:"Conversion Rate",
  hs_title:"Your Most-Requested HS Codes",hs_last30:"Last 30 days",
  comp_title:"Competitor Benchmark",comp_sub:"Same sector · same country · similar size",comp_you:"Your firm",comp_avg:"Sector Average",comp_top:"Top 10% (P90)",comp_metrics:"Score · Matches · Conversion",comp_metrics_lbl:"Metrics:",
  doc_title:"My Documents",doc_sub:"Verified documents raise your firm ranking. Files are encrypted at rest with AES-256.",doc_upload:"Upload New Document",doc_verified:"Verified",doc_add:"Add new document",doc_add_hint:"PDF, PNG, JPG · max 20 MB",doc_renew:"Renew within 15d",
  msg_search:"Search conversations...",msg_online:"Online",msg_verified_firm:"Verified company",msg_today:"Today",msg_auto_tr:"Auto-translate",msg_read:"Read",msg_typing:"typing…",msg_type:"Type a reply… (Enter to send, Shift+Enter for new line)",msg_send:"Send",msg_lang_note:"Type in English · Recipient sees Finnish · Auto-translate on",msg_open:"Conversation loaded",msg_sent:"Message sent · translated",
  gate_title:"Company info is Pro-members only",gate_sub:"Company name, country, HS code and contacts become visible instantly with a Pro plan.",gate_cta:"Upgrade to Pro →",
  st_pos:"Active firms",st_ctr:"Countries",st_sec:"Sectors",st_lng:"Languages",st_live:"Live",st_today:"today",st_week:"this week",st_stable:"Stable",st_full:"full coverage",st_soon:"JP soon",
  sector_lbl:"Sector",all_sec_pick:"— All —",sec_search:"Search sector...",
  add_intro:"Global visibility in 6 steps. Every step is saved; come back anytime.",add_save:"Continue Later",add_draft:"Draft saved — sign in to continue",
  tm_title:"Team Management",tm_sub:"Manage multiple user accounts for your company. Roles and permissions.",tm_invite:"Invite User",tm_role:"Role",tm_perms:"Permissions",tm_status:"Status",tm_email:"Email",tm_last:"Last activity",tm_owner:"Owner",tm_admin:"Admin",tm_sales:"Sales",tm_ops:"Operations",tm_view:"View-only",tm_active:"Active",tm_pending:"Pending",tm_seats:"seats",tm_col_user:"USER",tm_p_all:"All modules",tm_p_msg:"Messaging only",tm_p_prof:"Profile + Docs",tm_p_view:"Read-only",
  ac_title:"Activity Timeline",ac_sub:"Full log of the last 30 days. Company interactions, incoming messages, matches and documents.",ac_filter_all:"All",ac_filter_msg:"Messages",ac_filter_match:"Matches",ac_filter_doc:"Documents",ac_filter_prof:"Profile",ac_today:"Today",ac_yesterday:"Yesterday",
  fp_paywall:"Sign in to view this company",fp_paywall_sub:"Free members can inspect 3 firms per day. Get a Pro plan for unlimited access."
 },
 es:{
  p_msgs:"Mensajes",p_people:"Personas",p_ana:"Análisis",p_docs:"Mis Documentos",p_team:"Equipo",p_activity:"Actividad",
  ppl_title:"Personas",ppl_sub:"Acceso directo a los tomadores de decisiones. Revele email y teléfono con un clic.",
  ppl_credits:"créditos",ppl_renew:"Renueva mensual",
  ppl_search:"Buscar nombre, empresa o cargo...",ppl_all:"Todos",ppl_ceo:"CEO/Fundador",ppl_purchasing:"Compras",ppl_sales:"Ventas",ppl_export:"Exp./Imp.",ppl_ops:"Operaciones",
  ppl_col_person:"PERSONA",ppl_col_firm:"EMPRESA",ppl_col_title:"CARGO",ppl_col_email:"EMAIL",ppl_col_phone:"TELÉFONO",ppl_col_act:"ACCIONES",
  ppl_show_email:"Ver email",ppl_show_phone:"Ver teléfono",ppl_verified:"Verificado por Kervea",ppl_empty:"No hay resultados.",
  ppl_kvkk:"Datos de contacto de fuentes públicas. Solicitud de eliminación",ppl_kvkk_link:"aquí",
  pd_contact:"Contacto",pd_firm:"Empresa",pd_social:"Social & Web",pd_history:"Historial",pd_verified:"Email + dominio verificados",pd_open_credit:"Ver · 1 crédito",pd_save:"Guardar",pd_msg:"Mensaje",pd_joined:"Registro",pd_lastseen:"Última visita",pd_response:"Tiempo respuesta",pd_sector_lbl:"Sector",pd_verify_lbl:"Verificación",pd_country_lbl:"País",pd_firmname_lbl:"Nombre de Empresa",pd_response_val:"Media 4 horas",pd_joined_val:"Enero 2024",pd_lastseen_val:"Hace 3 días",
  role_purchasing:"Compras",role_sales:"Ventas",role_export:"Exp./Imp.",fp_decisionmakers:"Tomadores de Decisión",fp_detail:"Detalles",fp_gotoallppl:"Ir al panel de Personas →",
  an_title:"Análisis Profundo",an_sub:"Su posición en la red, flujo comercial y comparativa competitiva",
  an_reach:"Alcance en Red",an_score:"Puntuación Media",an_time:"Tiempo Respuesta",an_conv:"Tasa Conversión",
  hs_title:"Códigos HS más solicitados",hs_last30:"Últimos 30 días",
  comp_title:"Comparativa",comp_sub:"Mismo sector · mismo país · tamaño similar",comp_you:"Su empresa",comp_avg:"Media del sector",comp_top:"Top 10% (P90)",comp_metrics:"Puntuación · Coincidencias · Conversión",comp_metrics_lbl:"Métricas:",
  doc_title:"Mis Documentos",doc_sub:"Los documentos verificados suben su ranking. Cifrado AES-256.",doc_upload:"Subir Documento",doc_verified:"Verificado",doc_add:"Añadir documento",doc_add_hint:"PDF, PNG, JPG · máx 20 MB",doc_renew:"Renovar en 15d",
  msg_search:"Buscar conversaciones...",msg_online:"En línea",msg_verified_firm:"Empresa verificada",msg_today:"Hoy",msg_auto_tr:"Traducción auto",msg_read:"Leído",msg_typing:"escribiendo…",msg_type:"Escriba una respuesta… (Enter para enviar)",msg_send:"Enviar",msg_lang_note:"Escriba en español · El destinatario ve finés · Traducción activa",msg_open:"Conversación cargada",msg_sent:"Mensaje enviado · traducido",
  gate_title:"Info empresa solo para Pro",gate_sub:"Nombre, país, código HS y contactos visibles al instante con Pro.",gate_cta:"Subir a Pro →",
  st_pos:"Empresas",st_ctr:"Países",st_sec:"Sectores",st_lng:"Idiomas",st_live:"En vivo",st_today:"hoy",st_week:"esta semana",st_stable:"Estable",st_full:"cobertura total",st_soon:"JP pronto",
  sector_lbl:"Sector",all_sec_pick:"— Todos —",sec_search:"Buscar sector...",
  add_intro:"Visibilidad global en 6 pasos. Cada paso se guarda automáticamente.",add_save:"Continuar Después",add_draft:"Borrador guardado — inicie sesión para continuar",
  tm_title:"Gestión de Equipo",tm_sub:"Gestione múltiples cuentas para su empresa. Roles y permisos.",tm_invite:"Invitar Usuario",tm_role:"Rol",tm_perms:"Permisos",tm_status:"Estado",tm_email:"Email",tm_last:"Última actividad",tm_owner:"Propietario",tm_admin:"Admin",tm_sales:"Ventas",tm_ops:"Operaciones",tm_view:"Solo ver",tm_active:"Activo",tm_pending:"Pendiente",tm_seats:"asientos",tm_col_user:"USUARIO",tm_p_all:"Todos los módulos",tm_p_msg:"Solo mensajería",tm_p_prof:"Perfil + Docs",tm_p_view:"Solo lectura",
  ac_title:"Cronología de Actividad",ac_sub:"Registro completo de los últimos 30 días.",ac_filter_all:"Todos",ac_filter_msg:"Mensajes",ac_filter_match:"Coincidencias",ac_filter_doc:"Documentos",ac_filter_prof:"Perfil",ac_today:"Hoy",ac_yesterday:"Ayer",
  fp_paywall:"Inicie sesión para ver esta empresa",fp_paywall_sub:"Los miembros gratuitos pueden ver 3 empresas al día. Pro para acceso ilimitado."
 },
 fr:{
  p_msgs:"Messages",p_people:"Contacts",p_ana:"Analyse",p_docs:"Mes Documents",p_team:"Équipe",p_activity:"Activité",
  ppl_title:"Contacts",ppl_sub:"Accès direct aux décideurs. Révélez email et téléphone en un clic.",
  ppl_credits:"crédits restants",ppl_renew:"Renouvellement mensuel",
  ppl_search:"Rechercher nom, entreprise ou poste...",ppl_all:"Tous",ppl_ceo:"PDG/Fondateur",ppl_purchasing:"Achats",ppl_sales:"Ventes",ppl_export:"Exp./Imp.",ppl_ops:"Opérations",
  ppl_col_person:"CONTACT",ppl_col_firm:"ENTREPRISE",ppl_col_title:"POSTE",ppl_col_email:"EMAIL",ppl_col_phone:"TÉLÉPHONE",ppl_col_act:"ACTIONS",
  ppl_show_email:"Voir email",ppl_show_phone:"Voir téléphone",ppl_verified:"Vérifié Kervea",ppl_empty:"Aucun résultat.",
  ppl_kvkk:"Données publiques (LinkedIn, sites web, registres commerciaux). Demande de suppression",ppl_kvkk_link:"ici",
  pd_contact:"Contact",pd_firm:"Entreprise",pd_social:"Social & Web",pd_history:"Historique",pd_verified:"Email + domaine vérifiés",pd_open_credit:"Voir · 1 crédit",pd_save:"Enregistrer",pd_msg:"Message",pd_joined:"Inscription",pd_lastseen:"Dernière visite",pd_response:"Temps réponse",pd_sector_lbl:"Secteur",pd_verify_lbl:"Vérification",pd_country_lbl:"Pays",pd_firmname_lbl:"Nom Entreprise",pd_response_val:"Moy. 4 heures",pd_joined_val:"Janvier 2024",pd_lastseen_val:"Il y a 3 jours",
  role_purchasing:"Achats",role_sales:"Ventes",role_export:"Exp./Imp.",fp_decisionmakers:"Décideurs",fp_detail:"Détails",fp_gotoallppl:"Aller au panel Contacts →",
  an_title:"Analyse Approfondie",an_sub:"Votre position dans le réseau, flux commercial et benchmark concurrentiel",
  an_reach:"Portée Réseau",an_score:"Score Moyen",an_time:"Temps Réponse",an_conv:"Taux Conversion",
  hs_title:"Vos codes HS les plus demandés",hs_last30:"30 derniers jours",
  comp_title:"Benchmark Concurrentiel",comp_sub:"Même secteur · même pays · taille similaire",comp_you:"Votre entreprise",comp_avg:"Moyenne du secteur",comp_top:"Top 10% (P90)",comp_metrics:"Score · Correspondances · Conversion",comp_metrics_lbl:"Métriques:",
  doc_title:"Mes Documents",doc_sub:"Les documents vérifiés augmentent votre classement. Chiffrement AES-256.",doc_upload:"Télécharger Document",doc_verified:"Vérifié",doc_add:"Ajouter document",doc_add_hint:"PDF, PNG, JPG · max 20 Mo",doc_renew:"Renouveler sous 15j",
  msg_search:"Rechercher conversations...",msg_online:"En ligne",msg_verified_firm:"Entreprise vérifiée",msg_today:"Aujourd'hui",msg_auto_tr:"Traduction auto",msg_read:"Lu",msg_typing:"écrit…",msg_type:"Écrivez une réponse… (Entrée pour envoyer)",msg_send:"Envoyer",msg_lang_note:"Écrivez en français · Le destinataire voit finnois · Traduction active",msg_open:"Conversation chargée",msg_sent:"Message envoyé · traduit",
  gate_title:"Info entreprise réservée aux Pro",gate_sub:"Nom, pays, code HS et contacts visibles immédiatement avec Pro.",gate_cta:"Passer Pro →",
  st_pos:"Entreprises",st_ctr:"Pays",st_sec:"Secteurs",st_lng:"Langues",st_live:"En direct",st_today:"aujourd'hui",st_week:"cette semaine",st_stable:"Stable",st_full:"couverture totale",st_soon:"JP bientôt",
  sector_lbl:"Secteur",all_sec_pick:"— Tous —",sec_search:"Rechercher un secteur...",
  add_intro:"Visibilité mondiale en 6 étapes. Chaque étape sauvegardée automatiquement.",add_save:"Continuer Plus Tard",add_draft:"Brouillon sauvegardé — connectez-vous pour continuer",
  tm_title:"Gestion d'Équipe",tm_sub:"Gérez plusieurs comptes pour votre entreprise. Rôles et permissions.",tm_invite:"Inviter Utilisateur",tm_role:"Rôle",tm_perms:"Permissions",tm_status:"Statut",tm_email:"Email",tm_last:"Dernière activité",tm_owner:"Propriétaire",tm_admin:"Admin",tm_sales:"Ventes",tm_ops:"Opérations",tm_view:"Lecture seule",tm_active:"Actif",tm_pending:"En attente",tm_seats:"sièges",tm_col_user:"UTILISATEUR",tm_p_all:"Tous les modules",tm_p_msg:"Messagerie uniq.",tm_p_prof:"Profil + Docs",tm_p_view:"Lecture",
  ac_title:"Chronologie d'Activité",ac_sub:"Journal complet des 30 derniers jours.",ac_filter_all:"Tous",ac_filter_msg:"Messages",ac_filter_match:"Correspondances",ac_filter_doc:"Documents",ac_filter_prof:"Profil",ac_today:"Aujourd'hui",ac_yesterday:"Hier",
  fp_paywall:"Connectez-vous pour voir cette entreprise",fp_paywall_sub:"Les membres gratuits peuvent voir 3 entreprises/jour. Pro pour accès illimité."
 },
 ar:{
  p_msgs:"الرسائل",p_people:"جهات الاتصال",p_ana:"التحليلات",p_docs:"مستنداتي",p_team:"الفريق",p_activity:"النشاط",
  ppl_title:"جهات الاتصال",ppl_sub:"وصول مباشر إلى صانعي القرار. اكشف البريد والهاتف بنقرة واحدة.",
  ppl_credits:"الرصيد المتبقي",ppl_renew:"يتجدد شهرياً",
  ppl_search:"ابحث بالاسم أو الشركة أو المسمى...",ppl_all:"الكل",ppl_ceo:"الرئيس التنفيذي",ppl_purchasing:"المشتريات",ppl_sales:"المبيعات",ppl_export:"صادرات/واردات",ppl_ops:"العمليات",
  ppl_col_person:"الشخص",ppl_col_firm:"الشركة",ppl_col_title:"المسمى",ppl_col_email:"البريد",ppl_col_phone:"الهاتف",ppl_col_act:"إجراءات",
  ppl_show_email:"إظهار البريد",ppl_show_phone:"إظهار الهاتف",ppl_verified:"موثق بواسطة Kervea",ppl_empty:"لا توجد نتائج.",
  ppl_kvkk:"بيانات من مصادر عامة. طلب الإزالة",ppl_kvkk_link:"من هنا",
  pd_contact:"الاتصال",pd_firm:"الشركة",pd_social:"وسائل التواصل والويب",pd_history:"سجل التفاعل",pd_verified:"البريد ونطاق الشركة متطابقان",pd_open_credit:"اكشف · 1 رصيد",pd_save:"حفظ",pd_msg:"إرسال رسالة",pd_joined:"انضم",pd_lastseen:"آخر ظهور",pd_response:"زمن الرد",pd_sector_lbl:"القطاع",pd_verify_lbl:"التحقق",pd_country_lbl:"البلد",pd_firmname_lbl:"اسم الشركة",pd_response_val:"متوسط 4 ساعات",pd_joined_val:"يناير 2024",pd_lastseen_val:"قبل 3 أيام",
  role_purchasing:"المشتريات",role_sales:"المبيعات",role_export:"صادرات/واردات",fp_decisionmakers:"صانعو القرار",fp_detail:"تفاصيل",fp_gotoallppl:"انتقل إلى لوحة جهات الاتصال ←",
  an_title:"تحليلات متقدمة",an_sub:"موقعك في الشبكة، تدفق التجارة ومقارنة المنافسين",
  an_reach:"الوصول",an_score:"متوسط النقاط",an_time:"زمن الرد",an_conv:"معدل التحويل",
  hs_title:"أكثر رموز HS طلباً",hs_last30:"آخر 30 يوم",
  comp_title:"مقارنة المنافسين",comp_sub:"نفس القطاع · نفس البلد · حجم مماثل",comp_you:"شركتك",comp_avg:"متوسط القطاع",comp_top:"أعلى 10% (P90)",comp_metrics:"النقاط · المطابقات · التحويل",comp_metrics_lbl:"المقاييس:",
  doc_title:"مستنداتي",doc_sub:"المستندات الموثقة ترفع تصنيف شركتك. تشفير AES-256.",doc_upload:"تحميل مستند",doc_verified:"موثق",doc_add:"إضافة مستند",doc_add_hint:"PDF, PNG, JPG · حد 20 MB",doc_renew:"جدد خلال 15 يوم",
  msg_search:"ابحث في المحادثات...",msg_online:"متصل",msg_verified_firm:"شركة موثقة",msg_today:"اليوم",msg_auto_tr:"ترجمة تلقائية",msg_read:"مقروء",msg_typing:"يكتب…",msg_type:"اكتب رداً… (Enter للإرسال)",msg_send:"إرسال",msg_lang_note:"اكتب بالعربية · سيرى المستقبل بالفنلندية · الترجمة مفعلة",msg_open:"تم تحميل المحادثة",msg_sent:"تم الإرسال · مترجم",
  gate_title:"معلومات الشركة للأعضاء Pro",gate_sub:"اسم الشركة والبلد ورمز HS والاتصال تظهر فوراً مع خطة Pro.",gate_cta:"ترقية إلى Pro ←",
  st_pos:"الشركات",st_ctr:"البلدان",st_sec:"القطاعات",st_lng:"اللغات",st_live:"مباشر",st_today:"اليوم",st_week:"هذا الأسبوع",st_stable:"مستقر",st_full:"تغطية كاملة",st_soon:"JP قريباً",
  sector_lbl:"القطاع",all_sec_pick:"— الكل —",sec_search:"ابحث عن قطاع...",
  add_intro:"الوصول العالمي في 6 خطوات. كل خطوة تحفظ تلقائياً.",add_save:"متابعة لاحقاً",add_draft:"تم حفظ المسودة — سجل الدخول للمتابعة",
  tm_title:"إدارة الفريق",tm_sub:"إدارة عدة حسابات لشركتك. الأدوار والصلاحيات.",tm_invite:"دعوة مستخدم",tm_role:"الدور",tm_perms:"الصلاحيات",tm_status:"الحالة",tm_email:"البريد",tm_last:"آخر نشاط",tm_owner:"المالك",tm_admin:"مدير",tm_sales:"المبيعات",tm_ops:"العمليات",tm_view:"عرض فقط",tm_active:"نشط",tm_pending:"قيد الانتظار",tm_seats:"مقاعد",tm_col_user:"المستخدم",tm_p_all:"جميع الوحدات",tm_p_msg:"المراسلة فقط",tm_p_prof:"الملف + الوثائق",tm_p_view:"قراءة فقط",
  ac_title:"الجدول الزمني للنشاط",ac_sub:"السجل الكامل لآخر 30 يوم.",ac_filter_all:"الكل",ac_filter_msg:"الرسائل",ac_filter_match:"المطابقات",ac_filter_doc:"المستندات",ac_filter_prof:"الملف",ac_today:"اليوم",ac_yesterday:"أمس",
  fp_paywall:"سجل الدخول لعرض هذه الشركة",fp_paywall_sub:"يمكن للأعضاء المجانيين عرض 3 شركات يومياً. Pro للوصول غير المحدود."
 },
 ru:{
  p_msgs:"Сообщения",p_people:"Контакты",p_ana:"Аналитика",p_docs:"Мои документы",p_team:"Команда",p_activity:"Активность",
  ppl_title:"Контакты",ppl_sub:"Прямой доступ к лицам, принимающим решения. Откройте email и телефон одним кликом.",
  ppl_credits:"осталось кредитов",ppl_renew:"Обновляется ежемесячно",
  ppl_search:"Поиск по имени, компании или должности...",ppl_all:"Все",ppl_ceo:"CEO/Основатель",ppl_purchasing:"Закупки",ppl_sales:"Продажи",ppl_export:"Экспорт/Импорт",ppl_ops:"Операции",
  ppl_col_person:"КОНТАКТ",ppl_col_firm:"КОМПАНИЯ",ppl_col_title:"ДОЛЖНОСТЬ",ppl_col_email:"EMAIL",ppl_col_phone:"ТЕЛЕФОН",ppl_col_act:"ДЕЙСТВИЯ",
  ppl_show_email:"Показать email",ppl_show_phone:"Показать телефон",ppl_verified:"Проверено Kervea",ppl_empty:"Нет результатов.",
  ppl_kvkk:"Данные из публичных источников. Запрос на удаление",ppl_kvkk_link:"здесь",
  pd_contact:"Контакт",pd_firm:"Компания",pd_social:"Соцсети и Веб",pd_history:"История",pd_verified:"Email и домен фирмы совпадают",pd_open_credit:"Открыть · 1 кредит",pd_save:"Сохранить",pd_msg:"Сообщение",pd_joined:"Регистрация",pd_lastseen:"Последний визит",pd_response:"Время ответа",pd_sector_lbl:"Сектор",pd_verify_lbl:"Верификация",pd_country_lbl:"Страна",pd_firmname_lbl:"Название компании",pd_response_val:"Ср. 4 часа",pd_joined_val:"Январь 2024",pd_lastseen_val:"3 дня назад",
  role_purchasing:"Закупки",role_sales:"Продажи",role_export:"Экспорт/Импорт",fp_decisionmakers:"Лица, принимающие решения",fp_detail:"Детали",fp_gotoallppl:"Перейти к панели Контакты →",
  an_title:"Углубленная аналитика",an_sub:"Ваше место в сети, торговый поток и сравнение с конкурентами",
  an_reach:"Охват сети",an_score:"Средняя оценка",an_time:"Время ответа",an_conv:"Конверсия",
  hs_title:"Ваши самые запрашиваемые HS коды",hs_last30:"Последние 30 дней",
  comp_title:"Сравнение с конкурентами",comp_sub:"Тот же сектор · та же страна · похожий размер",comp_you:"Ваша фирма",comp_avg:"Среднее по сектору",comp_top:"Топ 10% (P90)",comp_metrics:"Оценка · Совпадения · Конверсия",comp_metrics_lbl:"Метрики:",
  doc_title:"Мои документы",doc_sub:"Верифицированные документы повышают ваш рейтинг. Шифрование AES-256.",doc_upload:"Загрузить документ",doc_verified:"Верифицирован",doc_add:"Добавить документ",doc_add_hint:"PDF, PNG, JPG · макс 20 МБ",doc_renew:"Обновить в 15д",
  msg_search:"Поиск разговоров...",msg_online:"В сети",msg_verified_firm:"Проверенная компания",msg_today:"Сегодня",msg_auto_tr:"Автоперевод",msg_read:"Прочитано",msg_typing:"печатает…",msg_type:"Напишите ответ… (Enter для отправки)",msg_send:"Отправить",msg_lang_note:"Пишите по-русски · Получатель видит финский · Автоперевод активен",msg_open:"Разговор загружен",msg_sent:"Отправлено · переведено",
  gate_title:"Инфо о компании только для Pro",gate_sub:"Название, страна, код HS и контакты моментально видны с планом Pro.",gate_cta:"Перейти на Pro →",
  st_pos:"Активные фирмы",st_ctr:"Страны",st_sec:"Секторы",st_lng:"Языки",st_live:"В эфире",st_today:"сегодня",st_week:"на неделе",st_stable:"Стабильно",st_full:"полный охват",st_soon:"скоро JP",
  sector_lbl:"Сектор",all_sec_pick:"— Все —",sec_search:"Поиск сектора...",
  add_intro:"Глобальная видимость за 6 шагов. Каждый шаг сохраняется автоматически.",add_save:"Продолжить позже",add_draft:"Черновик сохранён — войдите для продолжения",
  tm_title:"Управление командой",tm_sub:"Управляйте несколькими аккаунтами для вашей компании. Роли и разрешения.",tm_invite:"Пригласить",tm_role:"Роль",tm_perms:"Разрешения",tm_status:"Статус",tm_email:"Email",tm_last:"Последняя активность",tm_owner:"Владелец",tm_admin:"Админ",tm_sales:"Продажи",tm_ops:"Операции",tm_view:"Только просмотр",tm_active:"Активен",tm_pending:"Ожидание",tm_seats:"мест",tm_col_user:"ПОЛЬЗОВАТЕЛЬ",tm_p_all:"Все модули",tm_p_msg:"Только сообщения",tm_p_prof:"Профиль + Док.",tm_p_view:"Чтение",
  ac_title:"Хронология активности",ac_sub:"Полный журнал за последние 30 дней.",ac_filter_all:"Все",ac_filter_msg:"Сообщения",ac_filter_match:"Совпадения",ac_filter_doc:"Документы",ac_filter_prof:"Профиль",ac_today:"Сегодня",ac_yesterday:"Вчера",
  fp_paywall:"Войдите, чтобы посмотреть эту компанию",fp_paywall_sub:"Бесплатные пользователи могут просмотреть 3 компании в день. Pro для неограниченного доступа."
 }
};
// Merge extended keys into main T dict
Object.keys(I18N_EXT).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_EXT[lg]).forEach(function(k){ T[lg][k] = I18N_EXT[lg][k]; });
});

// ============= EXTENDED i18n · FAZ 2 + FAZ 3 (Kürsüsü + GEO) =============
// Kervea Kürsüsü (kd_*) ve GEO/AI'ya Sor (geo_*) bileşenleri için 5 dil çevirisi
var I18N_FAZ234 = {
 tr:{
  nav_kursusu:"Kürsüsü",nav_sss:"SSS",
  // Kervea Kürsüsü (Wall of Love · Faz 2)
  kd_eyebrow:"KERVEA KÜRSÜSÜ",
  kd_title:"Referanslarımızı satın alamazsınız.",
  kd_lead:"Kervea 2026 pilot dönemindedir. Bu bölümde sadece <strong>doğrulanmış üyelerin gerçek yorumları</strong> yayınlanır — LinkedIn hesabı, şirket sicili ve gerçek ticaret hacmi eşleşen üyeler.",
  kd_badge:"Referans Standardımız",
  kd_m_title:"Neden burada henüz yorum yok?",
  kd_m1t:"Kervea 2026 pilot dönemindedir",
  kd_m1d:"İlk 10 doğrulanmış üye şu anda entegrasyon aşamasında. Referansları yayına alındıkça buraya, tarih ve doğrulama rozetiyle eklenir.",
  kd_m2t:"Ödeme karşılığı yorum kabul etmiyoruz",
  kd_m2d:"Hiçbir üye, yorum veya öne çıkma karşılığında ücretlendirilmez. Yorumlar üyenin kendi profilinden, düzenlenmemiş olarak alınır.",
  kd_m3t:"Her yorumun arkasında doğrulanabilir bir üye vardır",
  kd_m3d:"Yorum yazan her üyenin LinkedIn profili, şirket ticari sicili ve son 12 aydaki ticaret hacmi kontrol edilir. Bu üç kontrol tamamlanmadan yorum yayınlanmaz.",
  kd_m4t:"Olumsuz yorumlar da yayınlanır",
  kd_m4d:"Kervea'yı değerlendiren üyeler bunu 1–5 yıldız aralığında yapar. Filtreleme yoktur; olumsuz geri bildirim, cevabımızla birlikte yayınlanır.",
  kd_slot_open:"SLOT AÇIK",
  kd_slot1:"İlk doğrulanmış üye referansı için ayrıldı.",
  kd_slot2:"İkinci doğrulanmış üye referansı için ayrıldı.",
  kd_slot3:"Üçüncü doğrulanmış üye referansı için ayrıldı.",
  kd_slot_when:"Üye entegrasyonu tamamlandığında yayına alınır.",
  kd_cta_t:"İlk 10 pilot üyeden biri olun.",
  kd_cta_d:"Kervea'nın pilot döneminde yer alan üyeler, referansları platform ana sayfasında ve arama sonuçlarında öne çıkar. Listeleme ücretsizdir; Premium yıllık 280 USD'dir.",
  kd_cta_btn:"Firmamı Ekle",
  // GEO · AI'ya Sor + FAQ (Faz 3)
  geo_eyebrow:"AI ARAMA MOTORLARINDA KERVEA",
  geo_title:"Kervea'yı AI'a sorun.",
  geo_lead:"Kervea hakkında bağımsız bir görüş almak için doğrudan AI arama motorlarına sorun. Aşağıdaki bağlantılar hazır sorguyla ilgili motoru açar — Kervea'nın kamuya açık bilgilerine dair yanıt alırsınız.",
  geo_ask:"Sor",
  geo_faq_title:"Sıkça Sorulan Sorular",
  geo_faq_sub:"Kervea hakkında en çok sorulan sorular ve doğrudan cevapları. Bu bölüm AI arama motorları tarafından da okunur.",
  geo_q1_q:"Kervea nedir?",
  geo_q1_a:"Kervea, satıcı ile alıcıyı Trademap ve resmi gümrük verileriyle doğrudan buluşturan bir B2B ticaret eşleştirme ağıdır. Aracı değildir, komisyon almaz. Listeleme ücretsizdir, Premium üyelik yıllık 280 USD'dir. İlk odak koridoru Türkiye ile Batı Afrika arasındadır.",
  geo_q2_q:"Kervea Alibaba veya benzeri platformlardan nasıl farklıdır?",
  geo_q2_a:"Üç temel farkımız vardır. Birincisi, Kervea aracı değildir — satıcı ile alıcı doğrudan iletişim kurar, komisyon alınmaz. İkincisi, sıralama satın alınamaz — üyeler yalnızca uyum skorlarına göre sıralanır, öne çıkma ücreti yoktur. Üçüncüsü, ücretlendirme tamamen şeffaftır — yıllık 280 USD sabit Premium ücret, listeleme ücretsiz.",
  geo_q3_q:"Kervea üyelerini nasıl doğrular?",
  geo_q3_a:"Kervea 4 kademeli bir doğrulama sistemi uygular: (1) e-posta doğrulaması, (2) resmi ticaret sicili kontrolü, (3) banka hesabı ve IBAN eşleştirmesi, (4) opsiyonel saha doğrulaması. Bu kademelerin hiçbiri ödeme karşılığında atlanamaz.",
  geo_q4_q:"Kervea üyelik ücretlendirmesi nasıldır?",
  geo_q4_a:"Temel listeleme ücretsizdir — hiçbir sınırlama olmadan profil oluşturabilir, ürünlerinizi listeleyebilir, gelen talepleri alabilirsiniz. Premium üyelik yıllık 280 USD sabit bedeldir ve gelişmiş arama, öncelikli müşteri desteği, ticaret veri erişimi gibi ek özellikler sunar. Komisyon veya işlem bedeli yoktur.",
  geo_q5_q:"Kervea hangi ülkeleri kapsıyor?",
  geo_q5_a:"Kervea 2026 pilot döneminde Türkiye ile Batı Afrika koridoruna (özellikle Senegal, Fildişi Sahili, Nijerya, Fas, Gana) odaklanır. Sonraki dönemlerde Kuzey Afrika, Körfez ülkeleri ve BDT koridorları eklenecektir.",
  geo_q6_q:"Kervea hangi ödeme ve lojistik altyapısını sunar?",
  geo_q6_a:"Kervea LC (akreditif) ve TT (havale) gibi standart uluslararası ödeme yöntemlerini destekler. INCOTERMS standartlarına göre çalışan doğrulanmış lojistik ortaklarıyla entegrasyonu vardır. Ödeme ve teslimat işlemleri üyeler arasında doğrudan yürütülür — Kervea sürece taraf olmaz."
 },
 en:{
  nav_kursusu:"Podium",nav_sss:"FAQ",
  kd_eyebrow:"KERVEA PODIUM",
  kd_title:"Our references cannot be bought.",
  kd_lead:"Kervea is in its 2026 pilot phase. This section only publishes <strong>verified members' real reviews</strong> — members whose LinkedIn profile, corporate registry and actual trade volume all match.",
  kd_badge:"Our Reference Standard",
  kd_m_title:"Why are there no reviews here yet?",
  kd_m1t:"Kervea is in its 2026 pilot phase",
  kd_m1d:"The first 10 verified members are currently in the integration stage. Their references will be added here with date and verification badge as they go live.",
  kd_m2t:"We do not accept paid reviews",
  kd_m2d:"No member is charged in exchange for a review or featured placement. Reviews are pulled from the member's own profile, unedited.",
  kd_m3t:"Every review is backed by a verifiable member",
  kd_m3d:"Every reviewing member's LinkedIn profile, corporate trade registry, and trade volume over the last 12 months is checked. Reviews are not published until these three checks are complete.",
  kd_m4t:"Negative reviews are also published",
  kd_m4d:"Members who rate Kervea do so on a 1–5 star scale. There is no filtering; negative feedback is published together with our response.",
  kd_slot_open:"SLOT OPEN",
  kd_slot1:"Reserved for the first verified member reference.",
  kd_slot2:"Reserved for the second verified member reference.",
  kd_slot3:"Reserved for the third verified member reference.",
  kd_slot_when:"Published once member integration is complete.",
  kd_cta_t:"Be one of the first 10 pilot members.",
  kd_cta_d:"Members who join during Kervea's pilot period are featured on the platform's homepage and search results. Listing is free; Premium is 280 USD per year.",
  kd_cta_btn:"Add My Company",
  geo_eyebrow:"KERVEA ON AI SEARCH ENGINES",
  geo_title:"Ask AI about Kervea.",
  geo_lead:"For an independent opinion about Kervea, ask AI search engines directly. The links below open the corresponding engine with a ready-made query — you will get an answer based on Kervea's publicly available information.",
  geo_ask:"Ask",
  geo_faq_title:"Frequently Asked Questions",
  geo_faq_sub:"The most common questions about Kervea and their direct answers. This section is also read by AI search engines.",
  geo_q1_q:"What is Kervea?",
  geo_q1_a:"Kervea is a B2B trade matchmaking network that connects sellers and buyers directly using Trademap and official customs data. It is not an intermediary and does not take commission. Listing is free, and Premium membership is 280 USD per year. The initial focus corridor is between Turkey and West Africa.",
  geo_q2_q:"How is Kervea different from Alibaba or similar platforms?",
  geo_q2_a:"We have three core differences. First, Kervea is not an intermediary — sellers and buyers communicate directly, no commission is taken. Second, ranking cannot be bought — members are ranked solely by compatibility score, with no featured placement fees. Third, pricing is fully transparent — a flat 280 USD annual Premium fee, with free listing.",
  geo_q3_q:"How does Kervea verify its members?",
  geo_q3_a:"Kervea applies a 4-tier verification system: (1) email verification, (2) official trade registry check, (3) bank account and IBAN matching, (4) optional on-site verification. None of these tiers can be skipped in exchange for payment.",
  geo_q4_q:"How is Kervea membership priced?",
  geo_q4_a:"Basic listing is free — you can create a profile, list your products and receive inbound inquiries with no limitations. Premium membership is a flat 280 USD per year and offers additional features such as advanced search, priority customer support and trade data access. There are no commissions or transaction fees.",
  geo_q5_q:"Which countries does Kervea cover?",
  geo_q5_a:"During its 2026 pilot phase, Kervea focuses on the Turkey–West Africa corridor (specifically Senegal, Ivory Coast, Nigeria, Morocco, and Ghana). North Africa, Gulf countries and CIS corridors will be added in later phases.",
  geo_q6_q:"What payment and logistics infrastructure does Kervea provide?",
  geo_q6_a:"Kervea supports standard international payment methods such as LC (letter of credit) and TT (wire transfer). It integrates with verified logistics partners operating under INCOTERMS standards. Payment and delivery are conducted directly between members — Kervea is not a party to the transaction."
 },
 fr:{
  nav_kursusu:"Tribune",nav_sss:"FAQ",
  kd_eyebrow:"TRIBUNE KERVEA",
  kd_title:"Nos références ne s'achètent pas.",
  kd_lead:"Kervea est en phase pilote 2026. Cette section ne publie que <strong>les avis réels de membres vérifiés</strong> — des membres dont le profil LinkedIn, le registre commercial et le volume d'échanges correspondent.",
  kd_badge:"Notre standard de référence",
  kd_m_title:"Pourquoi n'y a-t-il pas encore d'avis ici ?",
  kd_m1t:"Kervea est en phase pilote 2026",
  kd_m1d:"Les 10 premiers membres vérifiés sont actuellement en phase d'intégration. Leurs références seront ajoutées ici avec date et badge de vérification au fur et à mesure de leur mise en ligne.",
  kd_m2t:"Nous n'acceptons pas d'avis rémunérés",
  kd_m2d:"Aucun membre n'est facturé en échange d'un avis ou d'une mise en avant. Les avis sont extraits du profil du membre, sans modification.",
  kd_m3t:"Chaque avis repose sur un membre vérifiable",
  kd_m3d:"Pour chaque membre qui laisse un avis, le profil LinkedIn, le registre commercial de l'entreprise et le volume d'échanges des 12 derniers mois sont contrôlés. Aucun avis n'est publié avant que ces trois vérifications ne soient terminées.",
  kd_m4t:"Les avis négatifs sont également publiés",
  kd_m4d:"Les membres évaluent Kervea sur une échelle de 1 à 5 étoiles. Il n'y a pas de filtrage ; les retours négatifs sont publiés avec notre réponse.",
  kd_slot_open:"EMPLACEMENT LIBRE",
  kd_slot1:"Réservé pour la première référence vérifiée.",
  kd_slot2:"Réservé pour la deuxième référence vérifiée.",
  kd_slot3:"Réservé pour la troisième référence vérifiée.",
  kd_slot_when:"Publié une fois l'intégration du membre terminée.",
  kd_cta_t:"Faites partie des 10 premiers membres pilotes.",
  kd_cta_d:"Les membres qui rejoignent Kervea pendant la phase pilote sont mis en avant sur la page d'accueil de la plateforme et dans les résultats de recherche. L'inscription est gratuite ; Premium est à 1 000 USD par an.",
  kd_cta_btn:"Ajouter mon entreprise",
  geo_eyebrow:"KERVEA SUR LES MOTEURS DE RECHERCHE IA",
  geo_title:"Demandez à l'IA à propos de Kervea.",
  geo_lead:"Pour un avis indépendant sur Kervea, interrogez directement les moteurs de recherche IA. Les liens ci-dessous ouvrent le moteur concerné avec une requête préparée — vous obtiendrez une réponse basée sur les informations publiques de Kervea.",
  geo_ask:"Demander",
  geo_faq_title:"Questions fréquentes",
  geo_faq_sub:"Les questions les plus fréquentes sur Kervea et leurs réponses directes. Cette section est également lue par les moteurs de recherche IA.",
  geo_q1_q:"Qu'est-ce que Kervea ?",
  geo_q1_a:"Kervea est un réseau de mise en relation commerciale B2B qui connecte directement vendeurs et acheteurs à partir des données Trademap et douanières officielles. Kervea n'est pas un intermédiaire et ne prélève aucune commission. L'inscription est gratuite, l'adhésion Premium coûte 1 000 USD par an. Le couloir initial couvre la Turquie et l'Afrique de l'Ouest.",
  geo_q2_q:"En quoi Kervea diffère-t-il d'Alibaba ou de plateformes similaires ?",
  geo_q2_a:"Nous avons trois différences fondamentales. Premièrement, Kervea n'est pas un intermédiaire — vendeurs et acheteurs communiquent directement, sans commission. Deuxièmement, le classement ne peut pas être acheté — les membres sont classés uniquement en fonction de leur score de compatibilité, sans frais de mise en avant. Troisièmement, la tarification est totalement transparente — 1 000 USD par an de Premium, inscription gratuite.",
  geo_q3_q:"Comment Kervea vérifie-t-il ses membres ?",
  geo_q3_a:"Kervea applique un système de vérification en 4 niveaux : (1) vérification e-mail, (2) contrôle du registre commercial officiel, (3) correspondance du compte bancaire et de l'IBAN, (4) vérification sur site optionnelle. Aucun de ces niveaux ne peut être contourné contre paiement.",
  geo_q4_q:"Quelle est la tarification de l'adhésion Kervea ?",
  geo_q4_a:"L'inscription de base est gratuite — vous pouvez créer un profil, lister vos produits et recevoir des demandes entrantes sans limitation. L'adhésion Premium est à 1 000 USD par an et offre des fonctionnalités supplémentaires telles que la recherche avancée, le support client prioritaire et l'accès aux données commerciales. Il n'y a aucune commission ni frais de transaction.",
  geo_q5_q:"Quels pays Kervea couvre-t-il ?",
  geo_q5_a:"Pendant sa phase pilote 2026, Kervea se concentre sur le couloir Turquie–Afrique de l'Ouest (notamment Sénégal, Côte d'Ivoire, Nigeria, Maroc et Ghana). Les couloirs Afrique du Nord, Golfe et CEI seront ajoutés lors des phases suivantes.",
  geo_q6_q:"Quelle infrastructure de paiement et de logistique Kervea propose-t-il ?",
  geo_q6_a:"Kervea prend en charge les méthodes de paiement internationales standard telles que la LC (lettre de crédit) et le TT (virement bancaire). Il s'intègre à des partenaires logistiques vérifiés opérant selon les normes INCOTERMS. Les paiements et livraisons se font directement entre membres — Kervea n'est pas partie à la transaction."
 },
 es:{
  nav_kursusu:"Tribuna",nav_sss:"FAQ",
  kd_eyebrow:"TRIBUNA KERVEA",
  kd_title:"Nuestras referencias no se compran.",
  kd_lead:"Kervea está en fase piloto 2026. En esta sección solo se publican <strong>opiniones reales de miembros verificados</strong> — miembros cuyo perfil de LinkedIn, registro mercantil y volumen real de comercio coinciden.",
  kd_badge:"Nuestro estándar de referencia",
  kd_m_title:"¿Por qué aún no hay opiniones aquí?",
  kd_m1t:"Kervea está en fase piloto 2026",
  kd_m1d:"Los 10 primeros miembros verificados están actualmente en fase de integración. Sus referencias se añadirán aquí con fecha e insignia de verificación a medida que se publiquen.",
  kd_m2t:"No aceptamos opiniones pagadas",
  kd_m2d:"Ningún miembro paga a cambio de una opinión o de aparecer destacado. Las opiniones se toman del propio perfil del miembro, sin editar.",
  kd_m3t:"Detrás de cada opinión hay un miembro verificable",
  kd_m3d:"Se comprueba el perfil de LinkedIn, el registro mercantil y el volumen de comercio de los últimos 12 meses de cada miembro que deja una opinión. Las opiniones no se publican hasta completar estas tres verificaciones.",
  kd_m4t:"Las opiniones negativas también se publican",
  kd_m4d:"Los miembros que valoran a Kervea lo hacen en una escala de 1 a 5 estrellas. No hay filtrado; los comentarios negativos se publican junto con nuestra respuesta.",
  kd_slot_open:"HUECO ABIERTO",
  kd_slot1:"Reservado para la primera referencia verificada.",
  kd_slot2:"Reservado para la segunda referencia verificada.",
  kd_slot3:"Reservado para la tercera referencia verificada.",
  kd_slot_when:"Se publica una vez completada la integración del miembro.",
  kd_cta_t:"Sé uno de los 10 primeros miembros piloto.",
  kd_cta_d:"Los miembros que se unen durante la fase piloto de Kervea aparecen destacados en la página de inicio y en los resultados de búsqueda. El registro es gratuito; Premium cuesta 280 USD al año.",
  kd_cta_btn:"Añadir mi empresa",
  geo_eyebrow:"KERVEA EN BUSCADORES DE IA",
  geo_title:"Pregúntale a la IA sobre Kervea.",
  geo_lead:"Para obtener una opinión independiente sobre Kervea, pregúntale directamente a los buscadores de IA. Los enlaces siguientes abren el buscador correspondiente con una consulta preparada — recibirás una respuesta basada en la información pública de Kervea.",
  geo_ask:"Preguntar",
  geo_faq_title:"Preguntas Frecuentes",
  geo_faq_sub:"Las preguntas más frecuentes sobre Kervea y sus respuestas directas. Esta sección también es leída por los buscadores de IA.",
  geo_q1_q:"¿Qué es Kervea?",
  geo_q1_a:"Kervea es una red B2B de emparejamiento comercial que conecta directamente a vendedores y compradores utilizando datos de Trademap y aduanas oficiales. No es un intermediario y no cobra comisión. El registro es gratuito y la membresía Premium cuesta 280 USD al año. El corredor inicial es entre Turquía y África Occidental.",
  geo_q2_q:"¿En qué se diferencia Kervea de Alibaba o plataformas similares?",
  geo_q2_a:"Tenemos tres diferencias clave. Primero, Kervea no es intermediario — vendedores y compradores se comunican directamente, sin comisión. Segundo, el ranking no se compra — los miembros se clasifican solo por puntuación de compatibilidad, sin tarifas de destacado. Tercero, el precio es totalmente transparente — 280 USD al año de Premium, registro gratuito.",
  geo_q3_q:"¿Cómo verifica Kervea a sus miembros?",
  geo_q3_a:"Kervea aplica un sistema de verificación de 4 niveles: (1) verificación de correo electrónico, (2) comprobación del registro mercantil oficial, (3) coincidencia de cuenta bancaria e IBAN, (4) verificación in situ opcional. Ninguno de estos niveles puede omitirse a cambio de pago.",
  geo_q4_q:"¿Cómo se cobra la membresía de Kervea?",
  geo_q4_a:"El registro básico es gratuito — puedes crear un perfil, listar tus productos y recibir consultas entrantes sin limitaciones. La membresía Premium cuesta 280 USD al año e incluye búsqueda avanzada, soporte prioritario y acceso a datos comerciales. No hay comisiones ni tarifas por transacción.",
  geo_q5_q:"¿Qué países cubre Kervea?",
  geo_q5_a:"Durante su fase piloto 2026, Kervea se centra en el corredor Turquía–África Occidental (especialmente Senegal, Costa de Marfil, Nigeria, Marruecos y Ghana). En fases posteriores se añadirán los corredores de África del Norte, países del Golfo y CEI.",
  geo_q6_q:"¿Qué infraestructura de pago y logística ofrece Kervea?",
  geo_q6_a:"Kervea admite métodos de pago internacionales estándar como LC (carta de crédito) y TT (transferencia bancaria). Se integra con socios logísticos verificados que operan bajo estándares INCOTERMS. El pago y la entrega se realizan directamente entre los miembros — Kervea no es parte de la transacción."
 },
 ar:{
  nav_kursusu:"المنصة",nav_sss:"الأسئلة",
  kd_eyebrow:"منصة كيرفيا",
  kd_title:"مراجعاتنا لا تُشترى.",
  kd_lead:"كيرفيا في مرحلتها التجريبية لعام 2026. يُنشر في هذا القسم فقط <strong>مراجعات حقيقية لأعضاء موثقين</strong> — أعضاء تتطابق ملفاتهم على لينكدإن وسجلاتهم التجارية وأحجام تجارتهم الفعلية.",
  kd_badge:"معيار المراجعات لدينا",
  kd_m_title:"لماذا لا توجد مراجعات هنا حتى الآن؟",
  kd_m1t:"كيرفيا في مرحلتها التجريبية لعام 2026",
  kd_m1d:"أول 10 أعضاء موثقين في مرحلة الاندماج حاليًا. ستُضاف مراجعاتهم هنا مع التاريخ وشارة التوثيق فور بدء نشرها.",
  kd_m2t:"لا نقبل مراجعات مدفوعة",
  kd_m2d:"لا يُطلب من أي عضو مقابل مالي مقابل مراجعة أو ظهور مميز. تُؤخذ المراجعات من ملف العضو نفسه دون تعديل.",
  kd_m3t:"وراء كل مراجعة عضو يمكن التحقق منه",
  kd_m3d:"يُتحقق من الملف الشخصي على لينكدإن والسجل التجاري للشركة وحجم التجارة خلال الاثني عشر شهرًا الأخيرة لكل عضو يكتب مراجعة. لا تُنشر المراجعات قبل إتمام هذه الفحوصات الثلاثة.",
  kd_m4t:"المراجعات السلبية تُنشر أيضًا",
  kd_m4d:"يقيّم الأعضاء كيرفيا على مقياس من 1 إلى 5 نجوم. لا يوجد فلترة؛ تُنشر التعليقات السلبية مع ردنا عليها.",
  kd_slot_open:"مقعد شاغر",
  kd_slot1:"محجوز لأول مراجعة من عضو موثق.",
  kd_slot2:"محجوز لثاني مراجعة من عضو موثق.",
  kd_slot3:"محجوز لثالث مراجعة من عضو موثق.",
  kd_slot_when:"يُنشر عند اكتمال اندماج العضو.",
  kd_cta_t:"كن من أول 10 أعضاء تجريبيين.",
  kd_cta_d:"يظهر الأعضاء المنضمون خلال المرحلة التجريبية لكيرفيا في مقدمة الصفحة الرئيسية للمنصة ونتائج البحث. الإدراج مجاني؛ Premium بمبلغ 1000 دولار أمريكي سنويًا.",
  kd_cta_btn:"أضف شركتي",
  geo_eyebrow:"كيرفيا في محركات البحث بالذكاء الاصطناعي",
  geo_title:"اسأل الذكاء الاصطناعي عن كيرفيا.",
  geo_lead:"للحصول على رأي مستقل حول كيرفيا، اسأل محركات البحث بالذكاء الاصطناعي مباشرة. تفتح الروابط أدناه المحرك المعني باستعلام جاهز — ستحصل على إجابة مبنية على المعلومات المتاحة للجمهور عن كيرفيا.",
  geo_ask:"اسأل",
  geo_faq_title:"الأسئلة الشائعة",
  geo_faq_sub:"الأسئلة الأكثر شيوعًا حول كيرفيا وإجاباتها المباشرة. يُقرأ هذا القسم أيضًا من قبل محركات البحث بالذكاء الاصطناعي.",
  geo_q1_q:"ما هي كيرفيا؟",
  geo_q1_a:"كيرفيا شبكة مطابقة تجارية بين الشركات (B2B) تربط البائع بالمشتري مباشرة باستخدام بيانات Trademap والجمارك الرسمية. ليست وسيطًا ولا تأخذ عمولة. الإدراج مجاني، والعضوية Premium بمبلغ 1000 دولار أمريكي سنويًا. ممر التركيز الأولي بين تركيا وغرب أفريقيا.",
  geo_q2_q:"كيف تختلف كيرفيا عن Alibaba أو المنصات المماثلة؟",
  geo_q2_a:"لدينا ثلاثة فروق جوهرية. أولًا، كيرفيا ليست وسيطًا — يتواصل البائع والمشتري مباشرة، دون عمولة. ثانيًا، الترتيب لا يُشترى — يُرتَّب الأعضاء وفق درجة التوافق فقط، دون رسوم إبراز. ثالثًا، التسعير شفاف تمامًا — 1000 دولار سنويًا كرسم ثابت لـ Premium، والإدراج مجاني.",
  geo_q3_q:"كيف توثق كيرفيا أعضاءها؟",
  geo_q3_a:"تطبق كيرفيا نظام توثيق من 4 مراحل: (1) توثيق البريد الإلكتروني، (2) التحقق من السجل التجاري الرسمي، (3) مطابقة الحساب البنكي وIBAN، (4) توثيق ميداني اختياري. لا يمكن تخطي أي من هذه المراحل مقابل مبلغ مالي.",
  geo_q4_q:"كيف يتم تسعير عضوية كيرفيا؟",
  geo_q4_a:"الإدراج الأساسي مجاني — يمكنك إنشاء ملف تعريفي وإدراج منتجاتك واستقبال الطلبات الواردة دون قيود. العضوية Premium بمبلغ ثابت 1000 دولار سنويًا وتوفر ميزات إضافية كالبحث المتقدم، دعم العملاء ذي الأولوية، والوصول إلى بيانات التجارة. لا توجد عمولات أو رسوم على المعاملات.",
  geo_q5_q:"ما البلدان التي تغطيها كيرفيا؟",
  geo_q5_a:"خلال مرحلتها التجريبية لعام 2026، تركز كيرفيا على ممر تركيا–غرب أفريقيا (خصوصًا السنغال، ساحل العاج، نيجيريا، المغرب، وغانا). ستُضاف ممرات شمال أفريقيا ودول الخليج ورابطة الدول المستقلة في المراحل التالية.",
  geo_q6_q:"ما البنية التحتية للدفع واللوجستيات التي توفرها كيرفيا؟",
  geo_q6_a:"تدعم كيرفيا وسائل الدفع الدولية القياسية مثل الاعتماد المستندي (LC) والحوالة البنكية (TT). لديها تكامل مع شركاء لوجستيين موثقين يعملون وفق معايير INCOTERMS. تجري عمليات الدفع والتسليم مباشرة بين الأعضاء — كيرفيا ليست طرفًا في المعاملة."
 },
 ru:{
  nav_kursusu:"Трибуна",nav_sss:"FAQ",
  kd_eyebrow:"ТРИБУНА KERVEA",
  kd_title:"Наши отзывы нельзя купить.",
  kd_lead:"Kervea находится в пилотной фазе 2026 года. В этом разделе публикуются только <strong>реальные отзывы проверенных участников</strong> — участников, чей профиль LinkedIn, торговый реестр и реальный торговый оборот совпадают.",
  kd_badge:"Наш стандарт отзывов",
  kd_m_title:"Почему здесь пока нет отзывов?",
  kd_m1t:"Kervea в пилотной фазе 2026 года",
  kd_m1d:"Первые 10 проверенных участников сейчас находятся на этапе интеграции. Их отзывы будут добавлены сюда с датой и значком верификации по мере публикации.",
  kd_m2t:"Мы не принимаем платные отзывы",
  kd_m2d:"Ни один участник не платит за отзыв или продвижение. Отзывы берутся с профиля самого участника без редактирования.",
  kd_m3t:"За каждым отзывом стоит проверяемый участник",
  kd_m3d:"У каждого участника, оставившего отзыв, проверяются профиль LinkedIn, торговый реестр компании и объём торговли за последние 12 месяцев. Отзывы не публикуются до завершения всех трёх проверок.",
  kd_m4t:"Отрицательные отзывы также публикуются",
  kd_m4d:"Участники оценивают Kervea по шкале от 1 до 5 звёзд. Фильтрации нет; отрицательные отзывы публикуются вместе с нашим ответом.",
  kd_slot_open:"МЕСТО СВОБОДНО",
  kd_slot1:"Зарезервировано для первого отзыва проверенного участника.",
  kd_slot2:"Зарезервировано для второго отзыва проверенного участника.",
  kd_slot3:"Зарезервировано для третьего отзыва проверенного участника.",
  kd_slot_when:"Публикуется после завершения интеграции участника.",
  kd_cta_t:"Станьте одним из первых 10 пилотных участников.",
  kd_cta_d:"Участники, присоединившиеся во время пилотной фазы Kervea, выделяются на главной странице платформы и в результатах поиска. Регистрация бесплатная; Premium — 1 000 USD в год.",
  kd_cta_btn:"Добавить мою компанию",
  geo_eyebrow:"KERVEA В ПОИСКОВЫХ СИСТЕМАХ С ИИ",
  geo_title:"Спросите ИИ о Kervea.",
  geo_lead:"Чтобы получить независимое мнение о Kervea, спросите напрямую поисковые системы с ИИ. Ссылки ниже открывают соответствующий движок с готовым запросом — вы получите ответ на основе публичной информации о Kervea.",
  geo_ask:"Спросить",
  geo_faq_title:"Часто задаваемые вопросы",
  geo_faq_sub:"Наиболее частые вопросы о Kervea и прямые ответы на них. Этот раздел также читают поисковые системы с ИИ.",
  geo_q1_q:"Что такое Kervea?",
  geo_q1_a:"Kervea — это B2B-сеть подбора торговых партнёров, соединяющая продавцов и покупателей напрямую с помощью данных Trademap и официальной таможенной статистики. Не является посредником и не берёт комиссию. Размещение бесплатное, Premium-членство стоит 1 000 USD в год. Первый коридор — Турция и Западная Африка.",
  geo_q2_q:"Чем Kervea отличается от Alibaba и подобных платформ?",
  geo_q2_a:"У нас три ключевых отличия. Во-первых, Kervea не посредник — продавцы и покупатели общаются напрямую, без комиссии. Во-вторых, ранжирование нельзя купить — участники ранжируются только по показателю совместимости, без платы за продвижение. В-третьих, тарификация полностью прозрачна — фиксированные 1 000 USD в год за Premium, размещение бесплатно.",
  geo_q3_q:"Как Kervea проверяет своих участников?",
  geo_q3_a:"Kervea применяет 4-уровневую систему верификации: (1) подтверждение email, (2) проверка официального торгового реестра, (3) сопоставление банковского счёта и IBAN, (4) опциональная выездная проверка. Ни один из этих уровней нельзя пропустить за оплату.",
  geo_q4_q:"Как тарифицируется членство в Kervea?",
  geo_q4_a:"Базовое размещение бесплатно — вы можете создать профиль, разместить продукты и получать входящие запросы без ограничений. Premium-членство стоит фиксированно 1 000 USD в год и предоставляет дополнительные функции, такие как расширенный поиск, приоритетная поддержка и доступ к торговым данным. Нет комиссий и транзакционных сборов.",
  geo_q5_q:"Какие страны охватывает Kervea?",
  geo_q5_a:"В пилотной фазе 2026 года Kervea фокусируется на коридоре Турция–Западная Африка (в частности Сенегал, Кот-д'Ивуар, Нигерия, Марокко и Гана). Коридоры Северной Африки, стран Персидского залива и СНГ будут добавлены на следующих этапах.",
  geo_q6_q:"Какую инфраструктуру платежей и логистики предоставляет Kervea?",
  geo_q6_a:"Kervea поддерживает стандартные международные способы оплаты, такие как LC (аккредитив) и TT (банковский перевод). Интегрирована с проверенными логистическими партнёрами, работающими по стандартам INCOTERMS. Платежи и доставка выполняются напрямую между участниками — Kervea не является стороной сделки."
 }
};
// Merge Faz 2+3 keys into main T dict
Object.keys(I18N_FAZ234).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_FAZ234[lg]).forEach(function(k){ T[lg][k] = I18N_FAZ234[lg][k]; });
});

// ============= I18N: ABOUT SECTION (Faz 6 · 6 dil) =============
var I18N_ABOUT = {
 tr:{
  abo_eyebrow:"HAKKIMIZDA",
  abo_h1:"Aracıların kestiği bir <em>ipek yolu</em>nu<br/>alıcı ve satıcıya geri veriyoruz.",
  abo_lead:"Kervea, Türkiye ile Batı Afrika arasındaki B2B ticareti — komisyoncular, sahte tedarikçiler ve fuar bekleme salonları arada olmadan — doğrudan buluşturan bir <strong>doğrulanmış ticaret ağıdır</strong>.",
  abo_toc_story:"Hikaye",abo_toc_how:"Nasıl Çalışıyoruz",abo_toc_way:"Yol Haritası",abo_toc_num:"Rakamlar",abo_toc_team:"Ekip",abo_toc_val:"Değerler",
  abo_story_h:"Kervea neden var?",
  abo_story_p1:"Küresel ticaretteki değerin <strong>%8–15'i aracılara, çevirmenlere, fuar organizatörlerine ve sahte tedarikçileri elemek için harcanan zamana</strong> gidiyor. Küçük ve orta ölçekli üreticiler için bu maliyet, yeni bir pazara girmenin önündeki en büyük engel.",
  abo_story_p2:"Türkiye ile Batı Afrika arasındaki koridor, bu sorunun en belirgin şekilde hissedildiği rotalardan biri: iki tarafta da güçlü üreticiler ve büyüyen tüketici pazarları var, ama arada dört-beş aracı katmanı, dört-altı hafta boşa geçen zaman, ve doğrulanmamış tedarikçi riski.",
  abo_quote:"Aracıya, çevirmene, komisyoncuya ödediğiniz her ücret, aslında güvensizliğe ödediğiniz bir vergidir. Doğrulama sistemli olduğunda, o vergi ortadan kalkar.",
  abo_quote_by:"— Kervea Kurucu Prensibi",
  abo_how_h:"Nasıl çalışıyoruz",
  abo_flow_1t:"Satıcı",abo_flow_2t:"Kervea Doğrulaması",abo_flow_3t:"Alıcı",abo_way_h:"Yol haritamız",
  abo_tl_now:"ŞU AN",abo_tl_plan:"HEDEF",
  abo_tl1t:"Pilot Dönem",abo_tl2t:"Koridor Genişlemesi",abo_tl3t:"Enterprise API",
  abo_num_h:"Bugün nerdeyiz",
  abo_num1_l:"Ülke ve bölge",abo_num2_l:"Arayüz ve çeviri dili",abo_num3_l:"Ana sektör",abo_num4_l:"Doğrulama kademesi",abo_num5_l:"Komisyon oranı",abo_num6_l:"Yıllık Premium ücret",
  abo_team_h:"Ekibimiz",
  abo_team_t:"Ekip profilleri yakında yayınlanacak",
  abo_team_r1:"Kurucu Ortak · CEO",abo_team_r2:"Kurucu Ortak · CTO",abo_team_r3:"Operasyon Direktörü",abo_team_r4:"Ticaret Danışmanı · Batı Afrika",
  abo_team_soon:"Profil yakında",
  abo_val_h:"Değerlerimiz",
  abo_v1t:"Şeffaflık",
  abo_v2t:"Doğrulama",
  abo_v3t:"Yerellik",
  abo_v4t:"Bağımsızlık",
  abo_cta_t:"Kervea'nın pilot döneminde yer alın.",
  abo_cta_d:"İlk 10 doğrulanmış üye bu koridorun tarihini yazacak. Listeleme ücretsiz, komisyon yok.",
  abo_cta_p:"Firmamı Ekle",abo_cta_s:"Önce Sorularımı Sor"
 },
 en:{
  abo_eyebrow:"ABOUT US",
  abo_h1:"We're giving back to buyers and sellers the <em>silk road</em><br/>that intermediaries have taken.",
  abo_lead:"Kervea is a <strong>verified trade network</strong> that connects B2B trade between Turkey and West Africa directly — without brokers, fake suppliers or trade fair waiting rooms.",
  abo_toc_story:"Story",abo_toc_how:"How We Work",abo_toc_way:"Roadmap",abo_toc_num:"Numbers",abo_toc_team:"Team",abo_toc_val:"Values",
  abo_story_h:"Why Kervea exists",
  abo_story_p1:"<strong>8–15% of the value in global trade</strong> goes to intermediaries, translators, trade fair organizers, and the time spent filtering out fake suppliers. For small and medium producers, this cost is the biggest barrier to entering a new market.",
  abo_story_p2:"The Turkey–West Africa corridor is one of the routes where this problem is most acutely felt: strong producers and growing consumer markets on both sides, but four to five layers of intermediaries in between, four to six wasted weeks, and unverified supplier risk.",
  abo_quote:"Every fee you pay to a broker, translator or commission agent is actually a tax you pay on distrust. When verification is systematic, that tax disappears.",
  abo_quote_by:"— Kervea Founding Principle",
  abo_how_h:"How we work",
  abo_flow_1t:"Seller",abo_flow_2t:"Kervea Verification",abo_flow_3t:"Buyer",abo_way_h:"Our roadmap",
  abo_tl_now:"NOW",abo_tl_plan:"TARGET",
  abo_tl1t:"Pilot Phase",abo_tl2t:"Corridor Expansion",abo_tl3t:"Enterprise API",
  abo_num_h:"Where we are today",
  abo_num1_l:"Countries and territories",abo_num2_l:"Interface and translation languages",abo_num3_l:"Main sectors",abo_num4_l:"Verification tiers",abo_num5_l:"Commission rate",abo_num6_l:"Annual Premium fee",
  abo_team_h:"Our team",
  abo_team_t:"Team profiles will be published soon",
  abo_team_r1:"Co-founder · CEO",abo_team_r2:"Co-founder · CTO",abo_team_r3:"Operations Director",abo_team_r4:"Trade Advisor · West Africa",
  abo_team_soon:"Profile coming",
  abo_val_h:"Our values",
  abo_v1t:"Transparency",
  abo_v2t:"Verification",
  abo_v3t:"Localization",
  abo_v4t:"Independence",
  abo_cta_t:"Join Kervea's pilot phase.",
  abo_cta_d:"The first 10 verified members will write the history of this corridor. Listing is free, no commission.",
  abo_cta_p:"Add My Company",abo_cta_s:"Ask My Questions First"
 },
 fr:{
  abo_eyebrow:"À PROPOS",
  abo_h1:"Nous rendons aux acheteurs et vendeurs la <em>route de la soie</em><br/>que les intermédiaires ont coupée.",
  abo_lead:"Kervea est un <strong>réseau commercial vérifié</strong> qui connecte directement le commerce B2B entre la Turquie et l'Afrique de l'Ouest — sans courtiers, sans faux fournisseurs et sans salles d'attente de foires commerciales.",
  abo_toc_story:"Histoire",abo_toc_how:"Comment nous travaillons",abo_toc_way:"Feuille de route",abo_toc_num:"Chiffres",abo_toc_team:"Équipe",abo_toc_val:"Valeurs",
  abo_story_h:"Pourquoi Kervea existe",
  abo_story_p1:"<strong>8 à 15 % de la valeur du commerce mondial</strong> vont aux intermédiaires, aux traducteurs, aux organisateurs de foires commerciales, et au temps passé à écarter les faux fournisseurs. Pour les petits et moyens producteurs, ce coût est le plus grand obstacle pour entrer sur un nouveau marché.",
  abo_story_p2:"Le couloir Turquie–Afrique de l'Ouest est l'une des routes où ce problème se ressent le plus fortement : des producteurs solides et des marchés en croissance des deux côtés, mais quatre à cinq couches d'intermédiaires entre les deux, quatre à six semaines perdues, et le risque de fournisseurs non vérifiés.",
  abo_quote:"Chaque frais que vous payez à un courtier, un traducteur ou un commissionnaire est en réalité un impôt payé sur la méfiance. Lorsque la vérification est systématique, cet impôt disparaît.",
  abo_quote_by:"— Principe fondateur de Kervea",
  abo_how_h:"Comment nous travaillons",
  abo_flow_1t:"Vendeur",abo_flow_2t:"Vérification Kervea",abo_flow_3t:"Acheteur",abo_way_h:"Notre feuille de route",
  abo_tl_now:"MAINTENANT",abo_tl_plan:"OBJECTIF",
  abo_tl1t:"Phase pilote",abo_tl2t:"Expansion du couloir",abo_tl3t:"API Enterprise",
  abo_num_h:"Où nous en sommes aujourd'hui",
  abo_num1_l:"Pays et territoires",abo_num2_l:"Langues d'interface et de traduction",abo_num3_l:"Secteurs principaux",abo_num4_l:"Niveaux de vérification",abo_num5_l:"Taux de commission",abo_num6_l:"Frais Premium annuels",
  abo_team_h:"Notre équipe",
  abo_team_t:"Les profils de l'équipe seront publiés bientôt",
  abo_team_r1:"Cofondateur · CEO",abo_team_r2:"Cofondateur · CTO",abo_team_r3:"Directeur des opérations",abo_team_r4:"Conseiller commerce · Afrique de l'Ouest",
  abo_team_soon:"Profil à venir",
  abo_val_h:"Nos valeurs",
  abo_v1t:"Transparence",
  abo_v2t:"Vérification",
  abo_v3t:"Localisation",
  abo_v4t:"Indépendance",
  abo_cta_t:"Participez à la phase pilote de Kervea.",
  abo_cta_d:"Les 10 premiers membres vérifiés écriront l'histoire de ce couloir. L'inscription est gratuite, sans commission.",
  abo_cta_p:"Ajouter mon entreprise",abo_cta_s:"D'abord poser mes questions"
 },
 es:{
  abo_eyebrow:"SOBRE NOSOTROS",
  abo_h1:"Devolvemos a compradores y vendedores la <em>ruta de la seda</em><br/>que los intermediarios han cortado.",
  abo_lead:"Kervea es una <strong>red comercial verificada</strong> que conecta directamente el comercio B2B entre Turquía y África Occidental, sin corredores, sin proveedores falsos y sin salas de espera de ferias comerciales.",
  abo_toc_story:"Historia",abo_toc_how:"Cómo trabajamos",abo_toc_way:"Hoja de ruta",abo_toc_num:"Cifras",abo_toc_team:"Equipo",abo_toc_val:"Valores",
  abo_story_h:"Por qué existe Kervea",
  abo_story_p1:"<strong>El 8–15 % del valor del comercio mundial</strong> va a intermediarios, traductores, organizadores de ferias comerciales y al tiempo empleado en filtrar proveedores falsos. Para los pequeños y medianos productores, este coste es la mayor barrera para entrar en un nuevo mercado.",
  abo_story_p2:"El corredor Turquía–África Occidental es una de las rutas donde este problema se siente con más claridad: productores sólidos y mercados de consumo en crecimiento en ambos lados, pero cuatro o cinco capas de intermediarios entre medio, cuatro a seis semanas perdidas y riesgo de proveedores no verificados.",
  abo_quote:"Cada tarifa que pagas a un corredor, traductor o comisionista es en realidad un impuesto que pagas sobre la desconfianza. Cuando la verificación es sistemática, ese impuesto desaparece.",
  abo_quote_by:"— Principio fundacional de Kervea",
  abo_how_h:"Cómo trabajamos",
  abo_flow_1t:"Vendedor",abo_flow_2t:"Verificación Kervea",abo_flow_3t:"Comprador",abo_way_h:"Nuestra hoja de ruta",
  abo_tl_now:"AHORA",abo_tl_plan:"OBJETIVO",
  abo_tl1t:"Fase piloto",abo_tl2t:"Expansión del corredor",abo_tl3t:"API Enterprise",
  abo_num_h:"Dónde estamos hoy",
  abo_num1_l:"Países y territorios",abo_num2_l:"Idiomas de interfaz y traducción",abo_num3_l:"Sectores principales",abo_num4_l:"Niveles de verificación",abo_num5_l:"Tasa de comisión",abo_num6_l:"Tarifa Premium anual",
  abo_team_h:"Nuestro equipo",
  abo_team_t:"Los perfiles del equipo se publicarán próximamente",
  abo_team_r1:"Cofundador · CEO",abo_team_r2:"Cofundador · CTO",abo_team_r3:"Director de operaciones",abo_team_r4:"Asesor de comercio · África Occidental",
  abo_team_soon:"Perfil próximamente",
  abo_val_h:"Nuestros valores",
  abo_v1t:"Transparencia",
  abo_v2t:"Verificación",
  abo_v3t:"Localización",
  abo_v4t:"Independencia",
  abo_cta_t:"Únete a la fase piloto de Kervea.",
  abo_cta_d:"Los primeros 10 miembros verificados escribirán la historia de este corredor. Registro gratuito, sin comisión.",
  abo_cta_p:"Añadir mi empresa",abo_cta_s:"Antes hacer mis preguntas"
 },
 ar:{
  abo_eyebrow:"من نحن",
  abo_h1:"نُعيد للمشترين والبائعين <em>طريق الحرير</em><br/>الذي قطعه الوسطاء.",
  abo_lead:"كيرفيا <strong>شبكة تجارية موثقة</strong> تربط التجارة B2B بين تركيا وغرب أفريقيا مباشرة — دون سماسرة، أو موردين وهميين، أو صالات انتظار في المعارض.",
  abo_toc_story:"القصة",abo_toc_how:"كيف نعمل",abo_toc_way:"خارطة الطريق",abo_toc_num:"الأرقام",abo_toc_team:"الفريق",abo_toc_val:"القيم",
  abo_story_h:"لماذا وُجدت كيرفيا",
  abo_story_p1:"<strong>يذهب 8–15٪ من قيمة التجارة العالمية</strong> إلى الوسطاء والمترجمين ومنظمي المعارض والوقت المستنزف في تصفية الموردين المزيفين. بالنسبة للمنتجين الصغار والمتوسطين، هذه التكلفة هي أكبر عائق أمام دخول سوق جديدة.",
  abo_story_p2:"ممر تركيا–غرب أفريقيا من أكثر الممرات التي تُلمَس فيها هذه المشكلة بوضوح: منتجون أقوياء وأسواق مستهلكة متنامية على الجانبين، لكن بين الطرفين أربع إلى خمس طبقات من الوسطاء، وأربعة إلى ستة أسابيع مهدرة، ومخاطر المورد غير الموثق.",
  abo_quote:"كل رسم تدفعه لسمسار أو مترجم أو وكيل عمولة هو في الواقع ضريبة تدفعها على انعدام الثقة. عندما يصبح التوثيق منهجيًا، تختفي تلك الضريبة.",
  abo_quote_by:"— المبدأ التأسيسي لكيرفيا",
  abo_how_h:"كيف نعمل",
  abo_flow_1t:"البائع",abo_flow_2t:"توثيق كيرفيا",abo_flow_3t:"المشتري",abo_way_h:"خارطة طريقنا",
  abo_tl_now:"الآن",abo_tl_plan:"الهدف",
  abo_tl1t:"المرحلة التجريبية",abo_tl2t:"توسيع الممر",abo_tl3t:"واجهة Enterprise API",
  abo_num_h:"أين نحن اليوم",
  abo_num1_l:"دولة وإقليم",abo_num2_l:"لغة واجهة وترجمة",abo_num3_l:"قطاع رئيسي",abo_num4_l:"مرحلة توثيق",abo_num5_l:"نسبة العمولة",abo_num6_l:"الرسم السنوي Premium",
  abo_team_h:"فريقنا",
  abo_team_t:"سيتم نشر ملفات الفريق قريبًا",
  abo_team_r1:"شريك مؤسس · الرئيس التنفيذي",abo_team_r2:"شريك مؤسس · المدير التقني",abo_team_r3:"مدير العمليات",abo_team_r4:"مستشار تجاري · غرب أفريقيا",
  abo_team_soon:"الملف قريبًا",
  abo_val_h:"قيمنا",
  abo_v1t:"الشفافية",
  abo_v2t:"التوثيق",
  abo_v3t:"المحلية",
  abo_v4t:"الاستقلالية",
  abo_cta_t:"انضم إلى المرحلة التجريبية لكيرفيا.",
  abo_cta_d:"أول 10 أعضاء موثقين سيكتبون تاريخ هذا الممر. الإدراج مجاني، لا عمولة.",
  abo_cta_p:"أضف شركتي",abo_cta_s:"أطرح أسئلتي أولًا"
 },
 ru:{
  abo_eyebrow:"О НАС",
  abo_h1:"Мы возвращаем покупателям и продавцам <em>шёлковый путь</em>,<br/>перерезанный посредниками.",
  abo_lead:"Kervea — это <strong>проверенная торговая сеть</strong>, напрямую связывающая B2B-торговлю между Турцией и Западной Африкой, без брокеров, поддельных поставщиков и залов ожидания торговых выставок.",
  abo_toc_story:"История",abo_toc_how:"Как мы работаем",abo_toc_way:"Дорожная карта",abo_toc_num:"Цифры",abo_toc_team:"Команда",abo_toc_val:"Ценности",
  abo_story_h:"Почему существует Kervea",
  abo_story_p1:"<strong>8–15% стоимости в мировой торговле</strong> уходит посредникам, переводчикам, организаторам выставок и на время, потраченное на отсев поддельных поставщиков. Для малых и средних производителей эта стоимость — главный барьер при выходе на новый рынок.",
  abo_story_p2:"Коридор Турция–Западная Африка — один из маршрутов, где эта проблема ощущается наиболее остро: сильные производители и растущие потребительские рынки с обеих сторон, но между ними четыре-пять слоёв посредников, четыре-шесть впустую потраченных недель и риск непроверенных поставщиков.",
  abo_quote:"Каждый сбор, который вы платите брокеру, переводчику или комиссионеру, — это на самом деле налог, который вы платите за недоверие. Когда проверка становится системной, этот налог исчезает.",
  abo_quote_by:"— Основополагающий принцип Kervea",
  abo_how_h:"Как мы работаем",
  abo_flow_1t:"Продавец",abo_flow_2t:"Верификация Kervea",abo_flow_3t:"Покупатель",abo_way_h:"Наша дорожная карта",
  abo_tl_now:"СЕЙЧАС",abo_tl_plan:"ЦЕЛЬ",
  abo_tl1t:"Пилотный этап",abo_tl2t:"Расширение коридора",abo_tl3t:"Enterprise API",
  abo_num_h:"Где мы сегодня",
  abo_num1_l:"Страны и территории",abo_num2_l:"Языки интерфейса и перевода",abo_num3_l:"Основные отрасли",abo_num4_l:"Уровни верификации",abo_num5_l:"Комиссия",abo_num6_l:"Годовая плата Premium",
  abo_team_h:"Наша команда",
  abo_team_t:"Профили команды будут опубликованы вскоре",
  abo_team_r1:"Соучредитель · CEO",abo_team_r2:"Соучредитель · CTO",abo_team_r3:"Директор по операциям",abo_team_r4:"Торговый советник · Западная Африка",
  abo_team_soon:"Профиль скоро",
  abo_val_h:"Наши ценности",
  abo_v1t:"Прозрачность",
  abo_v2t:"Верификация",
  abo_v3t:"Локализация",
  abo_v4t:"Независимость",
  abo_cta_t:"Присоединяйтесь к пилотному этапу Kervea.",
  abo_cta_d:"Первые 10 проверенных участников напишут историю этого коридора. Регистрация бесплатная, без комиссии.",
  abo_cta_p:"Добавить мою компанию",abo_cta_s:"Сначала задать вопросы"
 }
};
// Merge About i18n into main T
Object.keys(I18N_ABOUT).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_ABOUT[lg]).forEach(function(k){ T[lg][k] = I18N_ABOUT[lg][k]; });
});

// Single Plan i18n (Faz 7 · 6 dilde)
var I18N_SP = {
 tr:{
  pr_h:"Fiyatlandırma",
  pr_p:"Tek plan. Şeffaf ücret. Komisyon yok.",
  sp_badge:"KERVEA PREMIUM",
  sp_per:"/yıl",
  sp_sub:"Tek plan · Tüm özellikler · Komisyon yok · Sıralama satın alınamaz",
  sp_f1:"Sınırsız doğrulanmış firma eşleşmesi",
  sp_f2:"6 dilde otomatik profil ve mesaj çevirisi",
  sp_f3:"Firmalarla doğrudan uçtan uca şifreli iletişim",
  sp_f4:"Trademap gümrük veri erişimi",
  sp_f5:"Prospektüs PDF üretici + dosya paylaşımı",
  sp_f6:"Öncelikli müşteri desteği (12 saat)",
  sp_f7:"Kervea Kürsüsü'nde öne çıkma hakkı",
  sp_cta:"Kervea Premium'a Başla",
 },
 en:{
  pr_h:"Pricing",
  pr_p:"One plan. Transparent fee. No commission.",
  sp_badge:"KERVEA PREMIUM",
  sp_per:"/year",
  sp_sub:"One plan · All features · No commission · Ranking cannot be bought",
  sp_f1:"Unlimited verified company matches",
  sp_f2:"Auto profile and message translation in 6 languages",
  sp_f3:"Direct end-to-end encrypted communication with companies",
  sp_f4:"Trademap customs data access",
  sp_f5:"Prospectus PDF generator + file sharing",
  sp_f6:"Priority customer support (12h)",
  sp_f7:"Featured placement on Kervea Podium",
  sp_cta:"Start Kervea Premium",
 },
 fr:{
  pr_h:"Tarification",
  pr_p:"Un seul plan. Tarif transparent. Aucune commission.",
  sp_badge:"KERVEA PREMIUM",
  sp_per:"/an",
  sp_sub:"Un plan · Toutes les fonctionnalités · Aucune commission · Le classement ne s'achète pas",
  sp_f1:"Correspondances illimitées d'entreprises vérifiées",
  sp_f2:"Traduction automatique de profil et de messages en 6 langues",
  sp_f3:"Communication directe et chiffrée de bout en bout avec les entreprises",
  sp_f4:"Accès aux données douanières Trademap",
  sp_f5:"Générateur de prospectus PDF + partage de fichiers",
  sp_f6:"Support client prioritaire (12 h)",
  sp_f7:"Mise en avant sur la Tribune Kervea",
  sp_cta:"Démarrer Kervea Premium",
 },
 es:{
  pr_h:"Precios",
  pr_p:"Un solo plan. Tarifa transparente. Sin comisión.",
  sp_badge:"KERVEA PREMIUM",
  sp_per:"/año",
  sp_sub:"Un plan · Todas las funciones · Sin comisión · El posicionamiento no se compra",
  sp_f1:"Coincidencias ilimitadas de empresas verificadas",
  sp_f2:"Traducción automática de perfil y mensajes en 6 idiomas",
  sp_f3:"Comunicación directa cifrada de extremo a extremo con empresas",
  sp_f4:"Acceso a datos aduaneros de Trademap",
  sp_f5:"Generador de PDF de prospecto + intercambio de archivos",
  sp_f6:"Soporte prioritario al cliente (12 h)",
  sp_f7:"Destacado en la Tribuna Kervea",
  sp_cta:"Comenzar Kervea Premium",
 },
 ar:{
  pr_h:"التسعير",
  pr_p:"خطة واحدة. رسم شفاف. لا عمولة.",
  sp_badge:"KERVEA PREMIUM",
  sp_per:"/سنة",
  sp_sub:"خطة واحدة · جميع الميزات · لا عمولة · الترتيب لا يُشترى",
  sp_f1:"مطابقات غير محدودة للشركات الموثقة",
  sp_f2:"ترجمة تلقائية للملف والرسائل بست لغات",
  sp_f3:"اتصال مباشر مشفر من الطرف إلى الطرف مع الشركات",
  sp_f4:"الوصول إلى بيانات Trademap الجمركية",
  sp_f5:"مولّد PDF للنشرة + مشاركة الملفات",
  sp_f6:"دعم عملاء بأولوية (12 ساعة)",
  sp_f7:"الظهور المميز على منصة كيرفيا",
  sp_cta:"ابدأ Kervea Premium",
 },
 ru:{
  pr_h:"Цены",
  pr_p:"Один план. Прозрачная плата. Без комиссии.",
  sp_badge:"KERVEA PREMIUM",
  sp_per:"/год",
  sp_sub:"Один план · Все функции · Без комиссии · Ранжирование нельзя купить",
  sp_f1:"Неограниченные совпадения с проверенными компаниями",
  sp_f2:"Автоматический перевод профиля и сообщений на 6 языков",
  sp_f3:"Прямое сквозное шифрованное общение с компаниями",
  sp_f4:"Доступ к таможенным данным Trademap",
  sp_f5:"Генератор PDF-проспектов + обмен файлами",
  sp_f6:"Приоритетная поддержка клиентов (12 ч)",
  sp_f7:"Выделенное размещение на Трибуне Kervea",
  sp_cta:"Начать Kervea Premium",
 }
};
Object.keys(I18N_SP).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_SP[lg]).forEach(function(k){ T[lg][k] = I18N_SP[lg][k]; });
});

// Küçük eksikler (s1, s2) 
var I18N_MISC = {
 tr:{s1:"Firma", s2:"Sektör"},
 en:{s1:"Company", s2:"Sector"},
 fr:{s1:"Entreprise", s2:"Secteur"},
 es:{s1:"Empresa", s2:"Sector"},
 ar:{s1:"الشركة", s2:"القطاع"},
 ru:{s1:"Компания", s2:"Сектор"}
};
Object.keys(I18N_MISC).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_MISC[lg]).forEach(function(k){ T[lg][k] = I18N_MISC[lg][k]; });
});

// About Mini Map legend i18n (Faz 8)
var I18N_ABOMM = {
 tr:{abo_mm_active:"TÜRKİYE MERKEZLİ", abo_mm_hub:"AKTİF HUB", abo_mm_future:"HEDEF KORİDOR"},
 en:{abo_mm_active:"TURKEY-ANCHORED", abo_mm_hub:"ACTIVE HUB", abo_mm_future:"TARGET CORRIDOR"},
 fr:{abo_mm_active:"CENTRÉ TURQUIE", abo_mm_hub:"HUB ACTIF", abo_mm_future:"COULOIR CIBLE"},
 es:{abo_mm_active:"CENTRADO EN TURQUÍA", abo_mm_hub:"HUB ACTIVO", abo_mm_future:"CORREDOR OBJETIVO"},
 ar:{abo_mm_active:"مركزه تركيا", abo_mm_hub:"مركز نشط", abo_mm_future:"ممر هدف"},
 ru:{abo_mm_active:"ЦЕНТР — ТУРЦИЯ", abo_mm_hub:"АКТИВНЫЙ ХАБ", abo_mm_future:"ЦЕЛЕВОЙ КОРИДОР"}
};
Object.keys(I18N_ABOMM).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_ABOMM[lg]).forEach(function(k){ T[lg][k] = I18N_ABOMM[lg][k]; });
});

// Trust Badges i18n (Faz 8)
var I18N_TRUST = {
 tr:{
  abo_toc_trust:"Güven ve Uyum",
  abo_trust_h:"Güven ve uyum",
  abo_trust_lead:"Kervea, ticari veri güvenliğini pilot dönemden itibaren birinci öncelik olarak alır. Aşağıdaki sertifikasyon ve uyum standartları hedeflerimizin ve mevcut uyumluluk seviyemizin şeffaf haritasıdır.",
  abo_trust_active:"Uyumlu",
  abo_trust_target1:"Hedef 2027",
  abo_trust_target2:"Hedef 2028",
  abo_trust_e2e:"E2E Şifreleme",
  abo_trust_verify:"4 Kademe Doğrulama",
  abo_trust_foot:"Uyumluluk durumumuz her çeyrek kamu raporunda güncellenir. Denetim raporlarına erişim için iletişime geçiniz."
 },
 en:{
  abo_toc_trust:"Trust and Compliance",
  abo_trust_h:"Trust and compliance",
  abo_trust_lead:"Kervea has treated commercial data security as a top priority since the pilot phase. The certifications and compliance standards below are a transparent map of our current compliance level and our targets.",
  abo_trust_active:"Compliant",
  abo_trust_target1:"Target 2027",
  abo_trust_target2:"Target 2028",
  abo_trust_e2e:"E2E Encryption",
  abo_trust_verify:"4-Tier Verification",
  abo_trust_foot:"Our compliance status is updated in a quarterly public report. Contact us for audit report access."
 },
 fr:{
  abo_toc_trust:"Confiance et conformité",
  abo_trust_h:"Confiance et conformité",
  abo_trust_lead:"Kervea traite la sécurité des données commerciales comme une priorité absolue depuis la phase pilote. Les certifications et normes de conformité ci-dessous constituent une carte transparente de notre niveau de conformité actuel et de nos objectifs.",
  abo_trust_active:"Conforme",
  abo_trust_target1:"Objectif 2027",
  abo_trust_target2:"Objectif 2028",
  abo_trust_e2e:"Chiffrement E2E",
  abo_trust_verify:"Vérification 4 niveaux",
  abo_trust_foot:"Notre statut de conformité est mis à jour dans un rapport public trimestriel. Contactez-nous pour accéder aux rapports d'audit."
 },
 es:{
  abo_toc_trust:"Confianza y cumplimiento",
  abo_trust_h:"Confianza y cumplimiento",
  abo_trust_lead:"Kervea ha tratado la seguridad de los datos comerciales como una prioridad principal desde la fase piloto. Las certificaciones y estándares de cumplimiento a continuación son un mapa transparente de nuestro nivel de cumplimiento actual y nuestros objetivos.",
  abo_trust_active:"Cumple",
  abo_trust_target1:"Objetivo 2027",
  abo_trust_target2:"Objetivo 2028",
  abo_trust_e2e:"Cifrado E2E",
  abo_trust_verify:"Verificación de 4 niveles",
  abo_trust_foot:"Nuestro estado de cumplimiento se actualiza en un informe público trimestral. Contáctenos para acceder a los informes de auditoría."
 },
 ar:{
  abo_toc_trust:"الثقة والامتثال",
  abo_trust_h:"الثقة والامتثال",
  abo_trust_lead:"تعامل كيرفيا مع أمن البيانات التجارية كأولوية قصوى منذ المرحلة التجريبية. الشهادات ومعايير الامتثال أدناه هي خارطة شفافة لمستوى امتثالنا الحالي وأهدافنا.",
  abo_trust_active:"متوافق",
  abo_trust_target1:"الهدف 2027",
  abo_trust_target2:"الهدف 2028",
  abo_trust_e2e:"تشفير E2E",
  abo_trust_verify:"توثيق 4 مراحل",
  abo_trust_foot:"يتم تحديث حالة امتثالنا في تقرير عام ربع سنوي. اتصل بنا للوصول إلى تقارير التدقيق."
 },
 ru:{
  abo_toc_trust:"Доверие и соответствие",
  abo_trust_h:"Доверие и соответствие",
  abo_trust_lead:"Kervea рассматривает безопасность коммерческих данных как главный приоритет с пилотного этапа. Приведённые ниже сертификаты и стандарты соответствия — прозрачная карта нашего текущего уровня соответствия и наших целей.",
  abo_trust_active:"Соответствует",
  abo_trust_target1:"Цель 2027",
  abo_trust_target2:"Цель 2028",
  abo_trust_e2e:"E2E шифрование",
  abo_trust_verify:"4-уровневая верификация",
  abo_trust_foot:"Наш статус соответствия обновляется в ежеквартальном публичном отчёте. Свяжитесь с нами для доступа к отчётам аудита."
 }
};
Object.keys(I18N_TRUST).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_TRUST[lg]).forEach(function(k){ T[lg][k] = I18N_TRUST[lg][k]; });
});

// Pay Modal + Alert i18n (Faz 10)
var I18N_PAYV2 = {
 tr:{
  pay_badge:"KERVEA PREMIUM",
  pay_h:"Ödemeyi tamamla",
  pay_plan_name:"Kervea Premium · Yıllık",
  pay_plan_sub:"Tek plan · Tüm özellikler · Komisyon yok",
  pay_subtotal:"Ara toplam",
  pay_payment_method:"Ödeme yöntemi",
  pay_new_card:"Yeni kart",
  pay_new_card_sub:"Visa, Mastercard, Amex",
  pay_promo_ph:"Promosyon kodu (isteğe bağlı)",
  pay_card_holder_name:"Kart sahibi adı",
  pay_card_holder_ph2:"Ad Soyad",
  pay_card_number:"Kart numarası",
  pay_card_exp:"Son kullanma",
  pay_card_cvc:"CVC",
  pay_disc_secure:"Kart bilgileriniz Kervea sunucularında saklanmaz. Ödemeler Stripe (PCI-DSS L1) altyapısı üzerinden işlenir.",
  pay_disc_cancel:"İstediğiniz zaman iptal edebilir, 14 gün içinde koşulsuz iade talep edebilirsiniz.",
  pay_confirm:"Ödemeyi Onayla — ",
  pay_processing:"İşleniyor…"
 },
 en:{
  pay_badge:"KERVEA PREMIUM",
  pay_h:"Complete payment",
  pay_plan_name:"Kervea Premium · Annual",
  pay_plan_sub:"One plan · All features · No commission",
  pay_subtotal:"Subtotal",
  pay_payment_method:"Payment method",
  pay_new_card:"New card",
  pay_new_card_sub:"Visa, Mastercard, Amex",
  pay_promo_ph:"Promo code (optional)",
  pay_card_holder_name:"Cardholder name",
  pay_card_holder_ph2:"Full name",
  pay_card_number:"Card number",
  pay_card_exp:"Expires",
  pay_card_cvc:"CVC",
  pay_disc_secure:"Your card details are not stored on Kervea servers. Payments are processed via Stripe (PCI-DSS L1) infrastructure.",
  pay_disc_cancel:"Cancel anytime, request an unconditional refund within 14 days.",
  pay_confirm:"Confirm Payment — ",
  pay_processing:"Processing…"
 },
 fr:{
  pay_badge:"KERVEA PREMIUM",
  pay_h:"Terminer le paiement",
  pay_plan_name:"Kervea Premium · Annuel",
  pay_plan_sub:"Un plan · Toutes les fonctionnalités · Aucune commission",
  pay_subtotal:"Sous-total",
  pay_payment_method:"Mode de paiement",
  pay_new_card:"Nouvelle carte",
  pay_new_card_sub:"Visa, Mastercard, Amex",
  pay_promo_ph:"Code promo (facultatif)",
  pay_card_holder_name:"Nom du titulaire",
  pay_card_holder_ph2:"Nom complet",
  pay_card_number:"Numéro de carte",
  pay_card_exp:"Expire",
  pay_card_cvc:"CVC",
  pay_disc_secure:"Vos données de carte ne sont pas stockées sur les serveurs Kervea. Les paiements sont traités via l'infrastructure Stripe (PCI-DSS L1).",
  pay_disc_cancel:"Annulez à tout moment, demandez un remboursement inconditionnel sous 14 jours.",
  pay_confirm:"Confirmer le paiement — ",
  pay_processing:"Traitement…"
 },
 es:{
  pay_badge:"KERVEA PREMIUM",
  pay_h:"Completar pago",
  pay_plan_name:"Kervea Premium · Anual",
  pay_plan_sub:"Un plan · Todas las funciones · Sin comisión",
  pay_subtotal:"Subtotal",
  pay_payment_method:"Método de pago",
  pay_new_card:"Nueva tarjeta",
  pay_new_card_sub:"Visa, Mastercard, Amex",
  pay_promo_ph:"Código promocional (opcional)",
  pay_card_holder_name:"Nombre del titular",
  pay_card_holder_ph2:"Nombre completo",
  pay_card_number:"Número de tarjeta",
  pay_card_exp:"Vence",
  pay_card_cvc:"CVC",
  pay_disc_secure:"Los datos de tu tarjeta no se almacenan en los servidores de Kervea. Los pagos se procesan a través de la infraestructura Stripe (PCI-DSS L1).",
  pay_disc_cancel:"Cancela cuando quieras, solicita un reembolso incondicional en 14 días.",
  pay_confirm:"Confirmar Pago — ",
  pay_processing:"Procesando…"
 },
 ar:{
  pay_badge:"KERVEA PREMIUM",
  pay_h:"إتمام الدفع",
  pay_plan_name:"Kervea Premium · سنوي",
  pay_plan_sub:"خطة واحدة · جميع الميزات · لا عمولة",
  pay_subtotal:"المجموع الفرعي",
  pay_payment_method:"طريقة الدفع",
  pay_new_card:"بطاقة جديدة",
  pay_new_card_sub:"Visa, Mastercard, Amex",
  pay_promo_ph:"رمز ترويجي (اختياري)",
  pay_card_holder_name:"اسم حامل البطاقة",
  pay_card_holder_ph2:"الاسم الكامل",
  pay_card_number:"رقم البطاقة",
  pay_card_exp:"ينتهي في",
  pay_card_cvc:"CVC",
  pay_disc_secure:"لا يتم تخزين بيانات بطاقتك على خوادم كيرفيا. تتم معالجة المدفوعات عبر بنية Stripe (PCI-DSS L1).",
  pay_disc_cancel:"إلغاء في أي وقت، طلب استرداد غير مشروط خلال 14 يومًا.",
  pay_confirm:"تأكيد الدفع — ",
  pay_processing:"جارٍ المعالجة…"
 },
 ru:{
  pay_badge:"KERVEA PREMIUM",
  pay_h:"Завершить оплату",
  pay_plan_name:"Kervea Premium · Годовой",
  pay_plan_sub:"Один план · Все функции · Без комиссии",
  pay_subtotal:"Промежуточный итог",
  pay_payment_method:"Способ оплаты",
  pay_new_card:"Новая карта",
  pay_new_card_sub:"Visa, Mastercard, Amex",
  pay_promo_ph:"Промокод (необязательно)",
  pay_card_holder_name:"Имя владельца карты",
  pay_card_holder_ph2:"Полное имя",
  pay_card_number:"Номер карты",
  pay_card_exp:"Истекает",
  pay_card_cvc:"CVC",
  pay_disc_secure:"Данные вашей карты не хранятся на серверах Kervea. Платежи обрабатываются через инфраструктуру Stripe (PCI-DSS L1).",
  pay_disc_cancel:"Отмена в любое время, безусловный возврат в течение 14 дней.",
  pay_confirm:"Подтвердить оплату — ",
  pay_processing:"Обработка…"
 }
};
Object.keys(I18N_PAYV2).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_PAYV2[lg]).forEach(function(k){ T[lg][k] = I18N_PAYV2[lg][k]; });
});

// User Menu + Consent i18n (Faz 11)
var I18N_UM_CONSENT = {
 tr:{
  um_title:"Panel", um_sub:"Hesabınızı ve tercihlerinizi yönetin",
  um_dashboard:"Panel", um_account:"Hesabım", um_notif:"Bildirimler",
  um_privacy:"Gizlilik", um_prefs:"Tercihler", um_logout:"Çıkış",
  consent_hd:"Yasal onaylar ve tercihler",
  consent_hd_sub:"Firma kaydınızı tamamlamak için aşağıdaki zorunlu maddeleri onaylayın.",
  consent_kvkk_t:"KVKK Aydınlatma Metni",
  consent_kvkk_d:"Kişisel verilerimin işlenmesine ilişkin aydınlatma metnini okudum ve anladım.",
  consent_terms_t:"Kullanıcı Sözleşmesi",
  consent_terms_d:"Kervea kullanıcı sözleşmesinin ve platform kullanım koşullarının tamamını okudum.",
  consent_verify_t:"Doğrulama izni",
  consent_verify_d:"Verilerimin sicil ve doğrulama amacıyla resmi kaynaklardan kontrol edilmesine izin veriyorum.",
  consent_marketing_t:"E-posta bildirimleri",
  consent_marketing_d:"Kervea platform güncellemeleri, sektör raporları ve fırsat bültenleri hakkında e-posta bildirimi almak istiyorum.",
  consent_req:"Zorunlu", consent_opt:"İsteğe bağlı",
  consent_read:"Metni oku", consent_reset:"Sıfırla", consent_continue:"Kaydı tamamla"
 },
 en:{
  um_title:"Dashboard", um_sub:"Manage your account and preferences",
  um_dashboard:"Dashboard", um_account:"Account", um_notif:"Notifications",
  um_privacy:"Privacy", um_prefs:"Preferences", um_logout:"Logout",
  consent_hd:"Legal consents and preferences",
  consent_hd_sub:"Approve the required items below to complete your company registration.",
  consent_kvkk_t:"KVKK Privacy Notice",
  consent_kvkk_d:"I have read and understood the notice regarding the processing of my personal data.",
  consent_terms_t:"Terms of Service",
  consent_terms_d:"I have read the full Kervea Terms of Service and platform usage policy.",
  consent_verify_t:"Verification consent",
  consent_verify_d:"I authorize verification of my data through official sources for registry and validation purposes.",
  consent_marketing_t:"Email notifications",
  consent_marketing_d:"I want to receive email notifications about Kervea platform updates, sector reports, and opportunity newsletters.",
  consent_req:"Required", consent_opt:"Optional",
  consent_read:"Read text", consent_reset:"Reset", consent_continue:"Complete registration"
 },
 fr:{
  um_title:"Tableau de bord", um_sub:"Gérez votre compte et vos préférences",
  um_dashboard:"Tableau de bord", um_account:"Compte", um_notif:"Notifications",
  um_privacy:"Confidentialité", um_prefs:"Préférences", um_logout:"Déconnexion",
  consent_hd:"Consentements légaux et préférences",
  consent_hd_sub:"Approuvez les éléments obligatoires ci-dessous pour finaliser votre inscription.",
  consent_kvkk_t:"Notice de confidentialité KVKK",
  consent_kvkk_d:"J'ai lu et compris la notice concernant le traitement de mes données personnelles.",
  consent_terms_t:"Conditions d'utilisation",
  consent_terms_d:"J'ai lu l'intégralité des conditions d'utilisation de Kervea.",
  consent_verify_t:"Consentement de vérification",
  consent_verify_d:"J'autorise la vérification de mes données via des sources officielles à des fins de registre et de validation.",
  consent_marketing_t:"Notifications par e-mail",
  consent_marketing_d:"Je souhaite recevoir des notifications par e-mail sur les mises à jour de Kervea, les rapports sectoriels et les newsletters.",
  consent_req:"Obligatoire", consent_opt:"Facultatif",
  consent_read:"Lire le texte", consent_reset:"Réinitialiser", consent_continue:"Terminer l'inscription"
 },
 es:{
  um_title:"Panel", um_sub:"Gestiona tu cuenta y preferencias",
  um_dashboard:"Panel", um_account:"Cuenta", um_notif:"Notificaciones",
  um_privacy:"Privacidad", um_prefs:"Preferencias", um_logout:"Cerrar sesión",
  consent_hd:"Consentimientos legales y preferencias",
  consent_hd_sub:"Aprueba los elementos obligatorios a continuación para completar el registro.",
  consent_kvkk_t:"Aviso de privacidad KVKK",
  consent_kvkk_d:"He leído y comprendido el aviso sobre el tratamiento de mis datos personales.",
  consent_terms_t:"Términos de servicio",
  consent_terms_d:"He leído los Términos de servicio completos de Kervea y la política de uso.",
  consent_verify_t:"Consentimiento de verificación",
  consent_verify_d:"Autorizo la verificación de mis datos a través de fuentes oficiales.",
  consent_marketing_t:"Notificaciones por correo electrónico",
  consent_marketing_d:"Deseo recibir notificaciones sobre actualizaciones, informes sectoriales y boletines.",
  consent_req:"Obligatorio", consent_opt:"Opcional",
  consent_read:"Leer texto", consent_reset:"Reiniciar", consent_continue:"Completar registro"
 },
 ar:{
  um_title:"لوحة التحكم", um_sub:"إدارة حسابك وتفضيلاتك",
  um_dashboard:"لوحة التحكم", um_account:"الحساب", um_notif:"الإشعارات",
  um_privacy:"الخصوصية", um_prefs:"التفضيلات", um_logout:"تسجيل الخروج",
  consent_hd:"الموافقات القانونية والتفضيلات",
  consent_hd_sub:"وافق على العناصر المطلوبة أدناه لإكمال تسجيل شركتك.",
  consent_kvkk_t:"إشعار خصوصية KVKK",
  consent_kvkk_d:"لقد قرأت وفهمت الإشعار المتعلق بمعالجة بياناتي الشخصية.",
  consent_terms_t:"شروط الخدمة",
  consent_terms_d:"لقد قرأت شروط خدمة كيرفيا الكاملة وسياسة استخدام المنصة.",
  consent_verify_t:"موافقة التحقق",
  consent_verify_d:"أسمح بالتحقق من بياناتي عبر مصادر رسمية لأغراض السجل والتحقق.",
  consent_marketing_t:"إشعارات البريد الإلكتروني",
  consent_marketing_d:"أرغب في تلقي إشعارات بريد إلكتروني حول تحديثات كيرفيا والتقارير القطاعية والنشرات.",
  consent_req:"مطلوب", consent_opt:"اختياري",
  consent_read:"اقرأ النص", consent_reset:"إعادة تعيين", consent_continue:"إكمال التسجيل"
 },
 ru:{
  um_title:"Панель", um_sub:"Управляйте аккаунтом и настройками",
  um_dashboard:"Панель", um_account:"Аккаунт", um_notif:"Уведомления",
  um_privacy:"Конфиденциальность", um_prefs:"Настройки", um_logout:"Выход",
  consent_hd:"Юридические согласия и настройки",
  consent_hd_sub:"Одобрите обязательные пункты ниже, чтобы завершить регистрацию компании.",
  consent_kvkk_t:"Уведомление о конфиденциальности KVKK",
  consent_kvkk_d:"Я прочитал(а) и понял(а) уведомление о обработке моих персональных данных.",
  consent_terms_t:"Условия использования",
  consent_terms_d:"Я прочитал(а) полные условия использования Kervea и политику платформы.",
  consent_verify_t:"Согласие на верификацию",
  consent_verify_d:"Я разрешаю проверку моих данных через официальные источники для целей реестра и валидации.",
  consent_marketing_t:"Уведомления по e-mail",
  consent_marketing_d:"Я хочу получать уведомления об обновлениях Kervea, отраслевых отчётах и информационных бюллетенях.",
  consent_req:"Обязательно", consent_opt:"Необязательно",
  consent_read:"Читать текст", consent_reset:"Сбросить", consent_continue:"Завершить регистрацию"
 }
};
Object.keys(I18N_UM_CONSENT).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_UM_CONSENT[lg]).forEach(function(k){ T[lg][k] = I18N_UM_CONSENT[lg][k]; });
});

// Faz 12 · Hero loop + Pagination i18n
var I18N_F12 = {
 tr:{
  hero_loop_prefix:"Doğrulanmış tedarikçiler:",
  pg_prev:"Önceki", pg_next:"Sonraki"
 },
 en:{
  hero_loop_prefix:"Verified suppliers for:",
  pg_prev:"Previous", pg_next:"Next"
 },
 fr:{
  hero_loop_prefix:"Fournisseurs vérifiés pour:",
  pg_prev:"Précédent", pg_next:"Suivant"
 },
 es:{
  hero_loop_prefix:"Proveedores verificados para:",
  pg_prev:"Anterior", pg_next:"Siguiente"
 },
 ar:{
  hero_loop_prefix:"موردون موثقون لـ:",
  pg_prev:"السابق", pg_next:"التالي"
 },
 ru:{
  hero_loop_prefix:"Проверенные поставщики для:",
  pg_prev:"Предыдущая", pg_next:"Следующая"
 }
};
Object.keys(I18N_F12).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_F12[lg]).forEach(function(k){ T[lg][k] = I18N_F12[lg][k]; });
});

// Faz 13 · Login + Newsletter + NotifLevel i18n
var I18N_F13 = {
 tr:{
  login_h:"Kervea'ya giriş yap", login_p:"Doğrulanmış B2B ticaret ağınıza erişin",
  login_email:"E-posta adresi", login_pass:"Parola",
  login_remember:"Beni hatırla", login_forgot:"Parolamı unuttum",
  login_submit:"Giriş yap", login_or:"veya",
  login_no_account:"Hesabın yok mu?", login_signup:"Firmanı ekle",
  nl_tag:"PİLOT GÜNCELLEMELERİ",
  nl_h:"İlk 10 üye ilan edildiğinde haberdar olun",
  nl_ph:"E-posta adresiniz", nl_submit:"Abone ol",
  nl_trust1:"Spam yok", nl_trust2:"KVKK uyumlu", nl_trust3:"Tek tık iptal",
  nl_lvl_all:"Tümü", nl_lvl_all_d:"Tüm bildirimleri al",
  nl_lvl_imp:"Önemli", nl_lvl_imp_d:"Sadece yüksek öncelikli",
  nl_lvl_mnt:"Mesajlar", nl_lvl_mnt_d:"Sadece direkt mesajlar",
  nl_lvl_sln:"Sessiz", nl_lvl_sln_d:"Görsel gösterge, ses yok",
  nl_lvl_off:"Kapalı", nl_lvl_off_d:"Bildirim gelmesin"
 },
 en:{
  login_h:"Sign in to Kervea", login_p:"Access your verified B2B trade network",
  login_email:"Email address", login_pass:"Password",
  login_remember:"Remember me", login_forgot:"Forgot password",
  login_submit:"Sign in", login_or:"or",
  login_no_account:"No account yet?", login_signup:"Add your company",
  nl_tag:"PILOT UPDATES",
  nl_h:"Be the first to know when the first 10 members are announced",
  nl_ph:"Your email address", nl_submit:"Subscribe",
  nl_trust1:"No spam", nl_trust2:"GDPR compliant", nl_trust3:"One-click unsubscribe",
  nl_lvl_all:"All", nl_lvl_all_d:"Receive all notifications",
  nl_lvl_imp:"Important", nl_lvl_imp_d:"High priority only",
  nl_lvl_mnt:"Messages", nl_lvl_mnt_d:"Direct messages only",
  nl_lvl_sln:"Silent", nl_lvl_sln_d:"Visual indicator, no sound",
  nl_lvl_off:"Off", nl_lvl_off_d:"No notifications"
 },
 fr:{
  login_h:"Connectez-vous à Kervea", login_p:"Accédez à votre réseau commercial B2B vérifié",
  login_email:"Adresse e-mail", login_pass:"Mot de passe",
  login_remember:"Se souvenir de moi", login_forgot:"Mot de passe oublié",
  login_submit:"Se connecter", login_or:"ou",
  login_no_account:"Pas encore de compte ?", login_signup:"Ajouter votre entreprise",
  nl_tag:"MISES À JOUR PILOTE",
  nl_h:"Soyez informé lorsque les 10 premiers membres seront annoncés",
  nl_ph:"Votre adresse e-mail", nl_submit:"S'abonner",
  nl_trust1:"Pas de spam", nl_trust2:"Conforme RGPD", nl_trust3:"Désabonnement en 1 clic",
  nl_lvl_all:"Tous", nl_lvl_all_d:"Recevoir toutes les notifications",
  nl_lvl_imp:"Important", nl_lvl_imp_d:"Priorité élevée uniquement",
  nl_lvl_mnt:"Messages", nl_lvl_mnt_d:"Messages directs uniquement",
  nl_lvl_sln:"Silencieux", nl_lvl_sln_d:"Indicateur visuel, pas de son",
  nl_lvl_off:"Désactivé", nl_lvl_off_d:"Aucune notification"
 },
 es:{
  login_h:"Iniciar sesión en Kervea", login_p:"Accede a tu red comercial B2B verificada",
  login_email:"Correo electrónico", login_pass:"Contraseña",
  login_remember:"Recuérdame", login_forgot:"Olvidé mi contraseña",
  login_submit:"Iniciar sesión", login_or:"o",
  login_no_account:"¿Aún no tienes cuenta?", login_signup:"Añadir empresa",
  nl_tag:"ACTUALIZACIONES PILOTO",
  nl_h:"Sé el primero en saber cuándo se anunciarán los primeros 10 miembros",
  nl_ph:"Tu correo electrónico", nl_submit:"Suscribirse",
  nl_trust1:"Sin spam", nl_trust2:"Cumple RGPD", nl_trust3:"Baja en 1 clic",
  nl_lvl_all:"Todas", nl_lvl_all_d:"Recibir todas las notificaciones",
  nl_lvl_imp:"Importantes", nl_lvl_imp_d:"Sólo alta prioridad",
  nl_lvl_mnt:"Mensajes", nl_lvl_mnt_d:"Sólo mensajes directos",
  nl_lvl_sln:"Silencio", nl_lvl_sln_d:"Indicador visual, sin sonido",
  nl_lvl_off:"Desactivado", nl_lvl_off_d:"Sin notificaciones"
 },
 ar:{
  login_h:"تسجيل الدخول إلى كيرفيا", login_p:"الوصول إلى شبكتك التجارية B2B الموثقة",
  login_email:"عنوان البريد الإلكتروني", login_pass:"كلمة المرور",
  login_remember:"تذكرني", login_forgot:"نسيت كلمة المرور",
  login_submit:"تسجيل الدخول", login_or:"أو",
  login_no_account:"ليس لديك حساب؟", login_signup:"أضف شركتك",
  nl_tag:"تحديثات المرحلة التجريبية",
  nl_h:"كن أول من يعلم عند الإعلان عن الأعضاء العشرة الأوائل",
  nl_ph:"عنوان بريدك الإلكتروني", nl_submit:"اشترك",
  nl_trust1:"لا رسائل مزعجة", nl_trust2:"متوافق مع GDPR", nl_trust3:"إلغاء بنقرة واحدة",
  nl_lvl_all:"الكل", nl_lvl_all_d:"استقبال جميع الإشعارات",
  nl_lvl_imp:"مهم", nl_lvl_imp_d:"عالي الأولوية فقط",
  nl_lvl_mnt:"رسائل", nl_lvl_mnt_d:"الرسائل المباشرة فقط",
  nl_lvl_sln:"صامت", nl_lvl_sln_d:"مؤشر بصري بدون صوت",
  nl_lvl_off:"إيقاف", nl_lvl_off_d:"لا إشعارات"
 },
 ru:{
  login_h:"Войти в Kervea", login_p:"Доступ к вашей проверенной B2B сети",
  login_email:"Электронная почта", login_pass:"Пароль",
  login_remember:"Запомнить меня", login_forgot:"Забыли пароль",
  login_submit:"Войти", login_or:"или",
  login_no_account:"Ещё нет аккаунта?", login_signup:"Добавить компанию",
  nl_tag:"ПИЛОТНЫЕ ОБНОВЛЕНИЯ",
  nl_h:"Узнайте первым, когда будут объявлены первые 10 участников",
  nl_ph:"Ваш email", nl_submit:"Подписаться",
  nl_trust1:"Без спама", nl_trust2:"Соответствие GDPR", nl_trust3:"Отписка в 1 клик",
  nl_lvl_all:"Все", nl_lvl_all_d:"Получать все уведомления",
  nl_lvl_imp:"Важные", nl_lvl_imp_d:"Только высокий приоритет",
  nl_lvl_mnt:"Сообщения", nl_lvl_mnt_d:"Только прямые сообщения",
  nl_lvl_sln:"Беззвучно", nl_lvl_sln_d:"Визуальный индикатор без звука",
  nl_lvl_off:"Отключено", nl_lvl_off_d:"Без уведомлений"
 }
};
Object.keys(I18N_F13).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_F13[lg]).forEach(function(k){ T[lg][k] = I18N_F13[lg][k]; });
});

// Faz 14 · Overview Dashboard i18n
var I18N_F14 = {
 tr:{
  ov_greeting:"Merhaba",
  ov_pilot_status:"Pilot dönem · Aralık 2026'da tam başlangıç",
  ov_verify_pending:"Firma doğrulama bekliyor — Kervea ekibi 24 saat içinde iletişime geçecek",
  ov_cta_new:"Yeni Firma", ov_cta_export:"Verileri İndir", ov_cta_filter:"Filtrele",
  ov_filter_h:"Panel Filtreleri",
  ov_filter_active:"Aktif profil", ov_filter_pending:"Doğrulama bekliyor",
  ov_filter_hi_score:"Yüksek eşleşme skoru", ov_filter_unread:"Okunmamış mesajlar",
  ov_filter_clear:"Filtreleri temizle", ov_filter_cleared:"Filtreler temizlendi",
  ov_stat_matches:"Eşleşme", ov_stat_msgs:"Mesaj",
  ov_stat_views:"Profil Görüntülenme", ov_stat_verif:"Doğrulama Seviyesi",
  ov_stat_pilot:"Pilot dönem — veri toplanıyor",
  ov_stat_level_pending:"Beklemede", ov_stat_verify_next:"4 kademeden 0 tamamlandı",
  ov_port_h:"Firma Portföyünüz", ov_port_all:"Tümünü Gör",
  ov_port_empty_h:"Henüz aktif firma eşleşmesi yok",
  ov_port_empty_p:"Firmanız doğrulandığında, sektör ve HS kodunuza göre eşleşen firmalar burada listelenecek. Pilot döneminde ilk 10 doğrulanmış firmaya öncelik verilir.",
  ov_port_empty_cta:"Firma Profili Oluştur",
  ov_ai_h:"AI Öneriler", ov_ai_soon:"YAKINDA",
  ov_ai_p1:"Yeterli veri toplandığında Kervea AI, sizin sektörünüzdeki fırsatları ve risk sinyallerini burada özetleyecek. Örnek: \"Nijerya'daki 3 doğrulanmış tekstil alıcısı size 48 saat içinde cevap vermedi — takip için otomatik hatırlatma önerilir.\"",
  ov_ai_dismiss:"Reddet", ov_ai_open:"Raporu Aç",
  ov_activity_h:"Son Aktiviteler",
  ov_activity_empty:"Firma profil hareketleri, mesajlar ve doğrulama adımları burada listelenecek.",
  ov_upcoming_h:"Yaklaşan Tarihler",
  ov_upcoming_empty:"Kervea Premium yenileme tarihi, planlanan görüşmeler ve son teslim tarihleri burada görünecek.",
  ov_risk_h:"Risk Uyarıları",
  ov_risk_empty:"Doğrulanmamış karşı taraflar, geç yanıt süreleri ve güvenlik uyarıları burada görünecek.",
  ov_export_h:"Veri dışa aktarımı",
  ov_export_p:"JSON formatında dışa aktarma linki e-posta adresinize gönderilecek. Pilot dönemde bu özellik manuel talep üzerine hazırlanır."
 },
 en:{
  ov_greeting:"Hello",
  ov_pilot_status:"Pilot phase · Full launch in December 2026",
  ov_verify_pending:"Company verification pending — Kervea team will reach out within 24 hours",
  ov_cta_new:"New Company", ov_cta_export:"Export Data", ov_cta_filter:"Filter",
  ov_filter_h:"Dashboard Filters",
  ov_filter_active:"Active profile", ov_filter_pending:"Verification pending",
  ov_filter_hi_score:"High match score", ov_filter_unread:"Unread messages",
  ov_filter_clear:"Clear filters", ov_filter_cleared:"Filters cleared",
  ov_stat_matches:"Matches", ov_stat_msgs:"Messages",
  ov_stat_views:"Profile Views", ov_stat_verif:"Verification Level",
  ov_stat_pilot:"Pilot phase — data collecting",
  ov_stat_level_pending:"Pending", ov_stat_verify_next:"0 of 4 tiers complete",
  ov_port_h:"Your Company Portfolio", ov_port_all:"View All",
  ov_port_empty_h:"No active company matches yet",
  ov_port_empty_p:"Once your company is verified, matches based on your sector and HS code will be listed here. First 10 verified companies get priority during the pilot phase.",
  ov_port_empty_cta:"Create Company Profile",
  ov_ai_h:"AI Insights", ov_ai_soon:"COMING SOON",
  ov_ai_p1:"Once enough data is collected, Kervea AI will summarize opportunities and risk signals in your sector here. Example: \"3 verified textile buyers in Nigeria have not responded in 48 hours — automatic follow-up reminder recommended.\"",
  ov_ai_dismiss:"Dismiss", ov_ai_open:"Open Report",
  ov_activity_h:"Recent Activity",
  ov_activity_empty:"Company profile actions, messages and verification steps will be listed here.",
  ov_upcoming_h:"Upcoming Dates",
  ov_upcoming_empty:"Kervea Premium renewal, scheduled meetings and deadlines will appear here.",
  ov_risk_h:"Risk Alerts",
  ov_risk_empty:"Unverified counterparties, late response times and security warnings will appear here.",
  ov_export_h:"Data export",
  ov_export_p:"A JSON export link will be sent to your email. During the pilot phase, this feature is prepared upon manual request."
 },
 fr:{
  ov_greeting:"Bonjour",
  ov_pilot_status:"Phase pilote · Lancement complet en décembre 2026",
  ov_verify_pending:"Vérification de l'entreprise en attente — l'équipe Kervea vous contactera sous 24 h",
  ov_cta_new:"Nouvelle Entreprise", ov_cta_export:"Exporter les données", ov_cta_filter:"Filtrer",
  ov_filter_h:"Filtres du tableau de bord",
  ov_filter_active:"Profil actif", ov_filter_pending:"Vérification en attente",
  ov_filter_hi_score:"Score de correspondance élevé", ov_filter_unread:"Messages non lus",
  ov_filter_clear:"Effacer les filtres", ov_filter_cleared:"Filtres effacés",
  ov_stat_matches:"Correspondances", ov_stat_msgs:"Messages",
  ov_stat_views:"Vues du profil", ov_stat_verif:"Niveau de vérification",
  ov_stat_pilot:"Phase pilote — données en collecte",
  ov_stat_level_pending:"En attente", ov_stat_verify_next:"0 sur 4 niveaux terminés",
  ov_port_h:"Portefeuille d'entreprises", ov_port_all:"Tout voir",
  ov_port_empty_h:"Aucune correspondance active pour le moment",
  ov_port_empty_p:"Une fois votre entreprise vérifiée, les correspondances selon votre secteur et code SH s'afficheront ici. Les 10 premières entreprises vérifiées sont prioritaires en phase pilote.",
  ov_port_empty_cta:"Créer un profil d'entreprise",
  ov_ai_h:"Insights IA", ov_ai_soon:"BIENTÔT",
  ov_ai_p1:"Une fois suffisamment de données collectées, Kervea AI résumera ici les opportunités et signaux de risque de votre secteur. Exemple : \"3 acheteurs textile vérifiés au Nigeria n'ont pas répondu en 48 h — rappel automatique recommandé.\"",
  ov_ai_dismiss:"Ignorer", ov_ai_open:"Ouvrir le rapport",
  ov_activity_h:"Activité récente",
  ov_activity_empty:"Les actions sur le profil, les messages et les étapes de vérification apparaîtront ici.",
  ov_upcoming_h:"Dates à venir",
  ov_upcoming_empty:"Renouvellement Kervea Premium, réunions et échéances apparaîtront ici.",
  ov_risk_h:"Alertes de risque",
  ov_risk_empty:"Contreparties non vérifiées, retards de réponse et avertissements apparaîtront ici.",
  ov_export_h:"Exportation des données",
  ov_export_p:"Un lien d'exportation JSON sera envoyé à votre e-mail. En phase pilote, cette fonctionnalité est préparée sur demande."
 },
 es:{
  ov_greeting:"Hola",
  ov_pilot_status:"Fase piloto · Lanzamiento completo en diciembre de 2026",
  ov_verify_pending:"Verificación de empresa pendiente — el equipo Kervea se pondrá en contacto en 24 h",
  ov_cta_new:"Nueva Empresa", ov_cta_export:"Exportar datos", ov_cta_filter:"Filtrar",
  ov_filter_h:"Filtros del panel",
  ov_filter_active:"Perfil activo", ov_filter_pending:"Verificación pendiente",
  ov_filter_hi_score:"Alta coincidencia", ov_filter_unread:"Mensajes no leídos",
  ov_filter_clear:"Borrar filtros", ov_filter_cleared:"Filtros borrados",
  ov_stat_matches:"Coincidencias", ov_stat_msgs:"Mensajes",
  ov_stat_views:"Vistas del perfil", ov_stat_verif:"Nivel de verificación",
  ov_stat_pilot:"Fase piloto — recopilando datos",
  ov_stat_level_pending:"Pendiente", ov_stat_verify_next:"0 de 4 niveles completos",
  ov_port_h:"Cartera de empresas", ov_port_all:"Ver todo",
  ov_port_empty_h:"Aún no hay coincidencias activas",
  ov_port_empty_p:"Una vez verificada su empresa, las coincidencias por sector y código HS aparecerán aquí. Las primeras 10 empresas verificadas tienen prioridad en la fase piloto.",
  ov_port_empty_cta:"Crear perfil de empresa",
  ov_ai_h:"Insights de IA", ov_ai_soon:"PRÓXIMAMENTE",
  ov_ai_p1:"Cuando se recopilen suficientes datos, Kervea AI resumirá aquí las oportunidades y señales de riesgo en su sector. Ejemplo: \"3 compradores textiles verificados en Nigeria no han respondido en 48 horas — se recomienda recordatorio automático.\"",
  ov_ai_dismiss:"Descartar", ov_ai_open:"Abrir informe",
  ov_activity_h:"Actividad reciente",
  ov_activity_empty:"Las acciones del perfil, mensajes y pasos de verificación se listarán aquí.",
  ov_upcoming_h:"Fechas próximas",
  ov_upcoming_empty:"Renovación Kervea Premium, reuniones y plazos aparecerán aquí.",
  ov_risk_h:"Alertas de riesgo",
  ov_risk_empty:"Contrapartes no verificadas, tiempos de respuesta lentos y advertencias aparecerán aquí.",
  ov_export_h:"Exportación de datos",
  ov_export_p:"Se enviará un enlace de exportación JSON a su correo. En fase piloto, esta función se prepara bajo solicitud."
 },
 ar:{
  ov_greeting:"مرحبا",
  ov_pilot_status:"المرحلة التجريبية · الإطلاق الكامل في ديسمبر 2026",
  ov_verify_pending:"التحقق من الشركة قيد الانتظار — سيتواصل معك فريق كيرفيا خلال 24 ساعة",
  ov_cta_new:"شركة جديدة", ov_cta_export:"تصدير البيانات", ov_cta_filter:"تصفية",
  ov_filter_h:"مرشحات اللوحة",
  ov_filter_active:"ملف نشط", ov_filter_pending:"التحقق معلق",
  ov_filter_hi_score:"درجة تطابق عالية", ov_filter_unread:"رسائل غير مقروءة",
  ov_filter_clear:"مسح المرشحات", ov_filter_cleared:"تم مسح المرشحات",
  ov_stat_matches:"تطابقات", ov_stat_msgs:"رسائل",
  ov_stat_views:"مشاهدات الملف", ov_stat_verif:"مستوى التحقق",
  ov_stat_pilot:"مرحلة تجريبية — جمع البيانات",
  ov_stat_level_pending:"معلق", ov_stat_verify_next:"0 من 4 مراحل مكتملة",
  ov_port_h:"محفظة الشركات", ov_port_all:"عرض الكل",
  ov_port_empty_h:"لا توجد تطابقات نشطة بعد",
  ov_port_empty_p:"عند التحقق من شركتك، ستُدرج التطابقات حسب قطاعك ورمز HS هنا. تحظى أول 10 شركات موثقة بالأولوية في المرحلة التجريبية.",
  ov_port_empty_cta:"إنشاء ملف الشركة",
  ov_ai_h:"رؤى الذكاء الاصطناعي", ov_ai_soon:"قريباً",
  ov_ai_p1:"عند جمع بيانات كافية، ستلخص كيرفيا AI الفرص وإشارات المخاطر في قطاعك هنا. مثال: \"3 مشترين موثقين للنسيج في نيجيريا لم يردوا خلال 48 ساعة — يوصى بتذكير تلقائي للمتابعة.\"",
  ov_ai_dismiss:"رفض", ov_ai_open:"فتح التقرير",
  ov_activity_h:"النشاط الأخير",
  ov_activity_empty:"إجراءات ملف الشركة والرسائل وخطوات التحقق ستُدرج هنا.",
  ov_upcoming_h:"التواريخ القادمة",
  ov_upcoming_empty:"تجديد كيرفيا Premium والاجتماعات المجدولة والمواعيد النهائية ستظهر هنا.",
  ov_risk_h:"تنبيهات المخاطر",
  ov_risk_empty:"الأطراف غير الموثقة وأوقات الاستجابة المتأخرة وتحذيرات الأمان ستظهر هنا.",
  ov_export_h:"تصدير البيانات",
  ov_export_p:"سيتم إرسال رابط تصدير JSON إلى بريدك الإلكتروني. في المرحلة التجريبية، تُعد هذه الميزة عند الطلب اليدوي."
 },
 ru:{
  ov_greeting:"Привет",
  ov_pilot_status:"Пилотный этап · Полный запуск в декабре 2026",
  ov_verify_pending:"Верификация компании ожидается — команда Kervea свяжется в течение 24 часов",
  ov_cta_new:"Новая компания", ov_cta_export:"Экспорт данных", ov_cta_filter:"Фильтр",
  ov_filter_h:"Фильтры панели",
  ov_filter_active:"Активный профиль", ov_filter_pending:"Верификация ожидается",
  ov_filter_hi_score:"Высокий скор", ov_filter_unread:"Непрочитанные сообщения",
  ov_filter_clear:"Очистить фильтры", ov_filter_cleared:"Фильтры очищены",
  ov_stat_matches:"Совпадения", ov_stat_msgs:"Сообщения",
  ov_stat_views:"Просмотры профиля", ov_stat_verif:"Уровень верификации",
  ov_stat_pilot:"Пилотный этап — сбор данных",
  ov_stat_level_pending:"Ожидание", ov_stat_verify_next:"0 из 4 уровней завершено",
  ov_port_h:"Портфель компаний", ov_port_all:"Все",
  ov_port_empty_h:"Пока нет активных совпадений",
  ov_port_empty_p:"После верификации вашей компании совпадения по сектору и коду ТН ВЭД будут показаны здесь. Первые 10 верифицированных компаний имеют приоритет в пилотном этапе.",
  ov_port_empty_cta:"Создать профиль компании",
  ov_ai_h:"AI Инсайты", ov_ai_soon:"СКОРО",
  ov_ai_p1:"Когда будет собрано достаточно данных, Kervea AI будет здесь резюмировать возможности и сигналы риска в вашем секторе. Пример: \"3 верифицированных текстильных покупателя в Нигерии не ответили за 48 часов — рекомендуется автоматическое напоминание.\"",
  ov_ai_dismiss:"Отклонить", ov_ai_open:"Открыть отчёт",
  ov_activity_h:"Последняя активность",
  ov_activity_empty:"Действия профиля, сообщения и шаги верификации будут перечислены здесь.",
  ov_upcoming_h:"Предстоящие даты",
  ov_upcoming_empty:"Продление Kervea Premium, запланированные встречи и сроки появятся здесь.",
  ov_risk_h:"Оповещения о рисках",
  ov_risk_empty:"Неверифицированные контрагенты, задержки ответа и предупреждения безопасности появятся здесь.",
  ov_export_h:"Экспорт данных",
  ov_export_p:"Ссылка на экспорт JSON будет отправлена на ваш email. В пилотный этап эта функция готовится по ручному запросу."
 }
};
Object.keys(I18N_F14).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_F14[lg]).forEach(function(k){ T[lg][k] = I18N_F14[lg][k]; });

// Faz 15 · AI Insights i18n
var I18N_F15_AI = {
 tr:{
  ov_ai_msg1:"Kervea AI motoru, ilk 10 doğrulanmış firma katıldığında sizin sektör, ürün ve hedef pazarınıza en uygun 3 firmayı burada listeleyecek. Şu an eşleşme algoritması pilot fazında sabitleniyor.",
  ov_ai_msg2:"Trademap gümrük veri entegrasyonu Kasım 2026'da tamamlanacak. Sonrasında koridor hacim fırsatları, HS bazlı ithalat/ihracat açıkları ve rakip yoğunluk uyarıları burada anlık gösterilecek.",
  ov_ai_dismiss:"Kapat", ov_ai_open:"Kürsüsü'ne katıl"
 },
 en:{
  ov_ai_msg1:"Kervea AI engine will list here the 3 companies best matching your sector, product, and target market once the first 10 verified companies join. The matching algorithm is currently being finalized in pilot phase.",
  ov_ai_msg2:"Trademap customs data integration will be completed in November 2026. Corridor volume opportunities, HS-based import/export gaps, and competitor density alerts will then be shown here in real-time.",
  ov_ai_dismiss:"Dismiss", ov_ai_open:"Join Podium"
 },
 fr:{
  ov_ai_msg1:"Le moteur IA de Kervea listera ici les 3 entreprises correspondant le mieux à votre secteur, produit et marché cible lorsque les 10 premières entreprises vérifiées auront rejoint. L'algorithme de correspondance est en cours de finalisation en phase pilote.",
  ov_ai_msg2:"L'intégration des données douanières Trademap sera finalisée en novembre 2026. Les opportunités de volume de couloir, écarts d'importation/exportation par HS et alertes de densité concurrentielle seront alors affichés ici en temps réel.",
  ov_ai_dismiss:"Fermer", ov_ai_open:"Rejoindre la Tribune"
 },
 es:{
  ov_ai_msg1:"El motor de IA de Kervea listará aquí las 3 empresas que mejor coincidan con tu sector, producto y mercado objetivo cuando se unan las primeras 10 empresas verificadas. El algoritmo de coincidencia se está finalizando en fase piloto.",
  ov_ai_msg2:"La integración de datos aduaneros Trademap se completará en noviembre de 2026. Las oportunidades de volumen de corredor, brechas de importación/exportación basadas en HS y alertas de densidad de competidores se mostrarán aquí en tiempo real.",
  ov_ai_dismiss:"Cerrar", ov_ai_open:"Unirse a la Tribuna"
 },
 ar:{
  ov_ai_msg1:"سيدرج محرك كيرفيا الذكي هنا الشركات الثلاث الأكثر ملاءمة لقطاعك ومنتجك وسوقك المستهدف عند انضمام أول 10 شركات موثقة. يتم حاليًا الانتهاء من خوارزمية المطابقة في المرحلة التجريبية.",
  ov_ai_msg2:"سيكتمل تكامل بيانات Trademap الجمركية في نوفمبر 2026. ستُعرض هنا آنيًا فرص حجم الممرات وفجوات الاستيراد/التصدير حسب HS وتنبيهات كثافة المنافسين.",
  ov_ai_dismiss:"إغلاق", ov_ai_open:"الانضمام إلى المنصة"
 },
 ru:{
  ov_ai_msg1:"Движок ИИ Kervea будет отображать здесь 3 компании, лучше всего соответствующие вашему сектору, продукту и целевому рынку, после присоединения первых 10 проверенных компаний. Алгоритм сопоставления сейчас финализируется в пилотной фазе.",
  ov_ai_msg2:"Интеграция таможенных данных Trademap будет завершена в ноябре 2026 года. Возможности объема коридоров, пробелы в импорте/экспорте на основе HS и оповещения о плотности конкурентов будут отображаться здесь в реальном времени.",
  ov_ai_dismiss:"Закрыть", ov_ai_open:"Вступить в Трибуну"
 }
};
Object.keys(I18N_F15_AI).forEach(function(lg){
 if(!T[lg]) T[lg] = {};
 Object.keys(I18N_F15_AI[lg]).forEach(function(k){ T[lg][k] = I18N_F15_AI[lg][k]; });
});

});











// Marketing sections i18n
(function(){var ADD={
 tr:{
  why_h:"Neden Kervea?",
  why_p:"Doğrulanmış firmalarla doğrudan iletişim. Komisyon yok, güvenilmez tedarikçi yok, sadece gerçek ticaret.",
  why_1t:"Ülke koridoru",
  why_2t:"Doğrulama başarısı",
  why_3t:"Dilde canlı çeviri",
  hiw_tag:"NASIL ÇALIŞIR",
  hiw_h:"Aracı yok. Sadece <em style=\"font-style:normal;color:var(--teal)\">gerçek ticaret</em>.",
  hiw_1t:"Doğrulanmış partneri bulun",
  hiw_1a:"AI eşleştirme",
  hiw_1b:"3 aşamalı doğrulama",
  hiw_1c:"Kervea rozeti",
  hiw_2t:"Doğrudan üreticiyle konuşun",
  hiw_2a:"Otomatik çeviri",
  hiw_2b:"E2E şifreli",
  hiw_2c:"Karar vericiye erişim",
  hiw_3t:"Anlaşın, sevk edin",
  hiw_3a:"INCOTERM standardı",
  hiw_3b:"LC/TT desteği",
  hiw_3c:"Lojistik ağı",
  ss_h:"Gerçek üreticiler, gerçek fabrikalar, gerçek konteynerler",
  ss_p:"Kervea firmaları katalog değil, denetlenmiş sahada üretim yapan ve ihracat kaydı olan işletmelerdir.",
  ss_5t:"Multimodal",
  ss_5s:"Kara, deniz, hava lojistik"},
 en:{
  why_h:"Why Kervea?",
  why_p:"Direct communication with verified companies. No commissions, no unreliable suppliers, just real trade.",
  why_1t:"Country corridors",
  why_2t:"Verification success",
  why_3t:"Live translation",
  hiw_tag:"HOW IT WORKS",
  hiw_h:"Direct trade. Just <em style=\"font-style:normal;color:var(--teal)\">real connections</em>.",
  hiw_1t:"Find a verified partner",
  hiw_1a:"AI matching",
  hiw_1b:"3-stage verification",
  hiw_1c:"Kervea badge",
  hiw_2t:"Talk to the manufacturer directly",
  hiw_2a:"Auto-translate",
  hiw_2b:"E2E encrypted",
  hiw_2c:"Decision-maker access",
  hiw_3t:"Agree and ship",
  hiw_3a:"INCOTERM standard",
  hiw_3b:"LC/TT support",
  hiw_3c:"Logistics network",
  ss_h:"Real manufacturers, real factories, real containers",
  ss_p:"Kervea firms aren't a catalog — they are audited, on-the-ground producers with real export records.",
  ss_5t:"Multimodal",
  ss_5s:"Road, sea, air logistics"},
 es:{
  why_h:"¿Por qué Kervea?",
  why_p:"Adiós intermediarios, comisiones y proveedores poco fiables. Comunicación directa, empresas verificadas, comercio real.",
  why_1t:"Corredores país",
  why_2t:"Éxito de verificación",
  why_3t:"Traducción en vivo",
  hiw_tag:"CÓMO FUNCIONA",
  hiw_h:"Contacto directo. <em style=\"font-style:normal;color:var(--teal)\">Solo comercio real</em>.",
  hiw_1t:"Encuentre un socio verificado",
  hiw_1a:"Matching IA",
  hiw_1b:"Verificación en 3 etapas",
  hiw_1c:"Insignia Kervea",
  hiw_2t:"Hable directamente con el fabricante",
  hiw_2a:"Traducción auto",
  hiw_2b:"Cifrado E2E",
  hiw_2c:"Acceso decisor",
  hiw_3t:"Acuerde y envíe",
  hiw_3a:"Estándar INCOTERM",
  hiw_3b:"Soporte LC/TT",
  hiw_3c:"Red logística",
  ss_h:"Fabricantes reales, fábricas reales, contenedores reales",
  ss_p:"Las empresas Kervea son productores auditados con registros reales de exportación, no un catálogo.",
  ss_5t:"Multimodal",
  ss_5s:"Terrestre, marítimo, aéreo"},
 fr:{
  why_h:"Pourquoi Kervea ?",
  why_p:"Adieu intermédiaires, commissions et fournisseurs peu fiables. Communication directe, entreprises vérifiées, commerce réel.",
  why_1t:"Corridors pays",
  why_2t:"Succès de vérification",
  why_3t:"Traduction en direct",
  hiw_tag:"COMMENT ÇA MARCHE",
  hiw_h:"Pas d'intermédiaires. Juste du <em style=\"font-style:normal;color:var(--teal)\">commerce réel</em>.",
  hiw_1t:"Trouvez un partenaire vérifié",
  hiw_1a:"Matching IA",
  hiw_1b:"Vérification en 3 étapes",
  hiw_1c:"Badge Kervea",
  hiw_2t:"Parlez directement au fabricant",
  hiw_2a:"Traduction auto",
  hiw_2b:"Chiffrement E2E",
  hiw_2c:"Accès décideur",
  hiw_3t:"Convenir et expédier",
  hiw_3a:"Norme INCOTERM",
  hiw_3b:"Support LC/TT",
  hiw_3c:"Réseau logistique",
  ss_h:"Vrais fabricants, vraies usines, vrais conteneurs",
  ss_p:"Les entreprises Kervea sont des producteurs audités avec registres d'export réels, pas un catalogue.",
  ss_5t:"Multimodal",
  ss_5s:"Route, mer, air"},
 ar:{
  why_h:"لماذا Kervea؟",
  why_p:"وداعاً للوسطاء والعمولات والموردين غير الموثوقين. تواصل مباشر، شركات موثقة، تجارة حقيقية.",
  why_1t:"ممرات دولية",
  why_2t:"نجاح التحقق",
  why_3t:"ترجمة مباشرة",
  hiw_tag:"كيف يعمل",
  hiw_h:"باتصال مباشر. <em style=\"font-style:normal;color:var(--teal)\">تجارة حقيقية فقط</em>.",
  hiw_1t:"اعثر على شريك موثق",
  hiw_1a:"مطابقة بالذكاء الاصطناعي",
  hiw_1b:"تحقق من 3 مراحل",
  hiw_1c:"شارة Kervea",
  hiw_2t:"تحدث مباشرة مع الشركة المصنعة",
  hiw_2a:"ترجمة تلقائية",
  hiw_2b:"تشفير E2E",
  hiw_2c:"وصول لصانع القرار",
  hiw_3t:"اتفق وشحن",
  hiw_3a:"معيار INCOTERM",
  hiw_3b:"دعم LC/TT",
  hiw_3c:"شبكة لوجستية",
  ss_h:"مصنعون حقيقيون، مصانع حقيقية، حاويات حقيقية",
  ss_p:"شركات Kervea ليست دليلاً بل منتجون مدققون لديهم سجلات تصدير حقيقية.",
  ss_5t:"متعدد الوسائط",
  ss_5s:"بري وبحري وجوي"},
 ru:{
  why_h:"Почему Kervea?",
  why_p:"Прощайте, посредники, комиссии и ненадежные поставщики. Прямое общение, проверенные компании, реальная торговля.",
  why_1t:"Страновые коридоры",
  why_2t:"Успех верификации",
  why_3t:"Живой перевод",
  hiw_tag:"КАК ЭТО РАБОТАЕТ",
  hiw_h:"Без посредников. Только <em style=\"font-style:normal;color:var(--teal)\">реальная торговля</em>.",
  hiw_1t:"Найдите проверенного партнера",
  hiw_1a:"AI-подбор",
  hiw_1b:"3-этапная верификация",
  hiw_1c:"Значок Kervea",
  hiw_2t:"Говорите напрямую с производителем",
  hiw_2a:"Автоперевод",
  hiw_2b:"E2E-шифрование",
  hiw_2c:"Доступ к ЛПР",
  hiw_3t:"Договоритесь и отправьте",
  hiw_3a:"Стандарт INCOTERM",
  hiw_3b:"Поддержка LC/TT",
  hiw_3c:"Логистическая сеть",
  ss_h:"Реальные производители, реальные заводы, реальные контейнеры",
  ss_p:"Компании Kervea — это проверенные производители с реальными записями экспорта, а не каталог.",
  ss_5t:"Мультимодальные",
  ss_5s:"Автомобильные, морские, воздушные"}};
Object.keys(ADD).forEach(function(lg){if(!T[lg]) T[lg]={}; Object.keys(ADD[lg]).forEach(function(k){T[lg][k]=ADD[lg][k];});});
})();


// =================== POSITIONS (firms) ===================
var POS = []; // filled from /kv/firms (server decides what each viewer may see)


// =================== STATE ===================
var LANG = "tr", THEME = "light", DIR = "EXP", CUR_CC = "tr", CUR_SEC = "";
var USER = null, CUR_MSG = null;
// USER.plan: "free" | "pro" | "enterprise". Free tier'da iletişim bilgileri kilitli.
function isPro(){ return USER && (USER.plan==="pro" || USER.plan==="enterprise"); }
function ls(k,v){try{if(v===undefined)return localStorage.getItem("kervea_"+k);localStorage.setItem("kervea_"+k,v);}catch(e){}}
function lsR(k){try{localStorage.removeItem("kervea_"+k);}catch(e){}}

// =================== ROUTER ===================
function go(v){
 // AUTH GUARD — giriş gerektiren view'ler
 var PROTECTED = ['panel'];
 if(PROTECTED.indexOf(v) !== -1 && !(typeof kvIsLoggedIn==='function' && kvIsLoggedIn())){
   v = 'login';
   if(typeof toast === 'function') toast('Devam etmek için giriş yapın');
 }
 document.querySelectorAll(".view").forEach(function(s){s.classList.remove("on");});
 document.querySelectorAll(".tab").forEach(function(t){t.classList.remove("on");});
 var el=document.getElementById(v); if(el){
   el.classList.add("on");
   if(window.gsap){
    gsap.fromTo(el, {autoAlpha:0, y:12}, {autoAlpha:1, y:0, duration:.5, ease:"expo.out", clearProps:"transform"});
   }
 }
 var t=document.querySelector('.tab[data-v="'+v+'"]'); if(t) t.classList.add("on");
 window.scrollTo(0,0);
 // Scroll-based reveals for this view — always safe patterns
 if(window.gsap && window.ScrollTrigger){
  setTimeout(function(){
   if(v==="home"){
    gsap.utils.toArray("#home .pc").forEach(function(c,i){
     gsap.set(c,{opacity:0,y:24});
     ScrollTrigger.create({trigger:c,start:"top 92%",once:true,onEnter:function(){
       gsap.to(c,{opacity:1,y:0,duration:.6,delay:Math.min(i%3*0.06,.18),ease:"expo.out",clearProps:"transform,opacity"});
     }});
    });
   }
   if(v==="pricing"){
    var plans = gsap.utils.toArray("#pricing .plan");
    gsap.set(plans,{opacity:0,y:24});
    gsap.to(plans,{opacity:1,y:0,duration:.6,stagger:.12,ease:"expo.out",clearProps:"transform,opacity"});
   }
   if(v==="about"){
    gsap.utils.toArray("#about .tli").forEach(function(t){
     gsap.set(t,{opacity:0,x:-20});
     ScrollTrigger.create({trigger:t,start:"top 85%",once:true,onEnter:function(){
       gsap.to(t,{opacity:1,x:0,duration:.55,ease:"expo.out",clearProps:"transform,opacity"});
     }});
    });
    gsap.utils.toArray("#about .team-c").forEach(function(t,i){
     gsap.set(t,{opacity:0,y:20});
     ScrollTrigger.create({trigger:t,start:"top 88%",once:true,onEnter:function(){
       gsap.to(t,{opacity:1,y:0,duration:.5,delay:i*0.06,ease:"expo.out",clearProps:"transform,opacity"});
     }});
    });
   }
   if(v==="panel"){
    var kpis = gsap.utils.toArray("#panel .kpi .c");
    gsap.set(kpis,{opacity:0,y:16});
    gsap.to(kpis,{opacity:1,y:0,duration:.5,stagger:.08,ease:"expo.out",clearProps:"transform,opacity"});
   }
   if(window.ScrollTrigger) ScrollTrigger.refresh();
  }, 80);
 }
}

// =================== THEME ===================
function toggleTheme(){
  var cur = document.documentElement.getAttribute("data-theme") || "light";
  var next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("kervea_theme", next); } catch(e){}
  // Update kv-theme-switch aria-checked
  var sw = document.getElementById("kvThemeSwitch");
  if(sw) sw.setAttribute("aria-checked", next === "dark");
  // Backwards compat: eski thicon varsa güncelle
  var thicon = document.getElementById("thicon");
  if(thicon){
    thicon.innerHTML = next === "dark" 
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
      : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  }
}

// =================== LANGUAGE ===================
// i18n helper — toast/confirm mesajlarını çevirmek için (v16+)
// Kullanım: toast(tt('key_x','Türkçe default'))
function tt(k, fb){
  try { return (T && T[LANG] && T[LANG][k]) || fb || ""; }
  catch(e){ return fb || ""; }
}


// Faz 4 · Anchor scroll for nav links pointing to home sub-sections
function goAnchor(anchorId){
  // Önce home view'a git
  go('home');
  // Sonra smooth scroll — DOM update için minik gecikme
  setTimeout(function(){
    var el = document.getElementById(anchorId);
    if(el){
      el.scrollIntoView({behavior:'smooth', block:'start'});
      // URL'ye hash ekle (geri gelmek için)
      if(history.pushState){
        history.pushState(null, '', '#' + anchorId);
      }
    }
  }, 100);
}

function setLang(l){
 LANG = l;
 document.getElementById("lm").classList.remove("open");
 document.documentElement.setAttribute("lang",l);
 document.documentElement.setAttribute("dir", l==="ar"?"rtl":"ltr");
 var flags={tr:["🇹🇷","TR"],en:["🇬🇧","EN"],es:["🇪🇸","ES"],fr:["🇫🇷","FR"],ar:["🇸🇦","AR"],ru:["🇷🇺","RU"]};
 document.getElementById("cf").textContent = flags[l][0];
 document.getElementById("cn").textContent = flags[l][1];
 // Update all i18n strings
 document.querySelectorAll("[data-i18n]").forEach(function(el){
   var k = el.getAttribute("data-i18n");
   if(T[l][k]) el.innerHTML = T[l][k];
 });
 // Placeholder çevirileri (data-i18n-ph="key" input/textarea/select için)
 document.querySelectorAll("[data-i18n-ph]").forEach(function(el){
   var k = el.getAttribute("data-i18n-ph");
   if(T[l][k]) el.setAttribute("placeholder", T[l][k]);
 });
 // Title attribute çevirileri (data-i18n-title="key" button/link/element için)
 document.querySelectorAll("[data-i18n-title]").forEach(function(el){
   var k = el.getAttribute("data-i18n-title");
   if(T[l][k]) el.setAttribute("title", T[l][k]);
 });
 // amCharts globe hub isimlerini dile göre güncelle
 try {
   if(typeof AM_GLOBE !== "undefined" && AM_GLOBE.ready && AM_GLOBE.chart){
     var _cn = (typeof CI !== "undefined") ? (CI[l] || CI.tr || {}) : {};
     AM_GLOBE.chart.series.each(function(s){
       if(s.className === "MapPointSeries"){
         s.dataItems.forEach(function(di){
           var dc = di.dataContext;
           if(dc && dc.cc){
             var newNm = (_cn[dc.cc] || dc.cc.toUpperCase()).toUpperCase();
             di.set("name", newNm);
             dc.name = newNm;
             // Bullet içindeki label'ı güncelle
             var b = di.bullets && di.bullets[0];
             if(b && b.get("sprite")){
               var container = b.get("sprite");
               container.children.each(function(child){
                 if(child.className === "Label"){ child.set("text", newNm); }
               });
             }
           }
         });
       }
     });
   }
 } catch(e){ /* globe henüz hazır değil, sessizce geç */ }
 // Input placeholder support
 document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el){
   var k = el.getAttribute("data-i18n-placeholder");
   if(T[l][k]) el.setAttribute("placeholder", T[l][k]);
 });
 // Update input placeholder for main search
 var qi=document.getElementById("qinput");
 if(qi){var placeholders={tr:"Buraya aramak istediğinizi yazın — ürün, firma veya HS kodu",en:"Type what you're looking for — product, company or HS code",es:"Escribe lo que buscas — producto, empresa o código HS",fr:"Tapez ce que vous cherchez — produit, entreprise ou code HS",ar:"اكتب ما تبحث عنه — منتج أو شركة أو رمز HS",ru:"Введите то, что ищете — товар, компания или код ТН ВЭД"}; qi.placeholder = placeholders[l];}
 // Rebuild dropdowns with translated country names & sectors
 buildCountryDD("ddCountry", CUR_CC);
 buildCountryDD("ddProfCountry", "tr");
 buildCountryDD("ddAddCountry", "tr");
 // Firma ekleme formu — şehir dropdown'ı, varsayılan ülke TR ile birlikte gelsin
 var _addCity = document.getElementById("ddAddCity");
 if(_addCity){ _addCity.setAttribute("data-cc","tr"); buildCityDD("ddAddCity", "tr", null); }
 // Harita hub etiketleri — bayrak+isim güncellemesi + tıklanabilirlik
 updateHubLabels();
 initHubClicks();
 buildSectorSelect("secSel", true);
 buildSectorSelect("addSecSel", false);
 buildSectorSelect("profSec", false);
 renderSecStrip();
 renderProfSecChip();
 renderAddSecChip();
 renderPositions();
 // Re-render dynamic panels that use T[LANG] internally
 if(document.getElementById("dp-people") && document.getElementById("dp-people").classList.contains("on")) renderPeople();
 if(document.getElementById("pdDrawer") && document.getElementById("pdDrawer").classList.contains("open")){
   // Re-open current person drawer with new language
   var openId = document.querySelector("#pdHd .pd-nm");
   if(openId){
     var nm = openId.textContent;
     var found = PEOPLE.find(function(x){return x.nm===nm;});
     if(found) openPersonDrawer(found.id);
   }
 }
 // Re-render firm page if currently viewing one
 if(CUR_FIRM){
   if(CUR_FIRM === "me") openMyProfile();
   else { var pp = POS.find(function(x){return x.id===CUR_FIRM;}); if(pp) renderFirmPage(pp); }
 }
 renderMatchTable();
 updateMapLabels();
 renderCountryDistribution();
 ls("lang",l);

 // v28: Marquee dil senkronu
 if(typeof renderMarquee === "function") renderMarquee();
 if(typeof renderAboMap === "function") renderAboMap();
}

// Update SVG map country labels when language changes
function updateMapLabels(){
 var dict = CI[LANG] || CI.tr;
 document.querySelectorAll(".hubLbl[data-cc]").forEach(function(el){
   var cc = el.getAttribute("data-cc");
   var name = dict[cc];
   if(!name) return;
   // Some Turkish/German-style names have length nuances; use locale-aware uppercase
   try { el.textContent = name.toLocaleUpperCase(LANG==="tr"?"tr-TR":LANG); }
   catch(_) { el.textContent = name.toUpperCase(); }
 });
}

// =================== COUNTRY DROPDOWN (with search + scroll) ===================
// =================== CITIES (Top ticaret ortakları — ~35 ülke için gerçek şehir listesi) ===================
// Diğer ülkeler için serbest yazım (input fallback) devreye girer.
var CITIES = {
 tr:["İstanbul","Ankara","İzmir","Bursa","Antalya","Adana","Gaziantep","Konya","Kayseri","Mersin","Kocaeli","Denizli","Eskişehir","Samsun","Diyarbakır","Şanlıurfa","Trabzon","Malatya","Erzurum","Van","Manisa","Balıkesir","Sakarya","Aydın","Muğla","Tekirdağ","Hatay","Ordu","Elazığ","Sivas","Batman","Uşak","Zonguldak","Kütahya","Isparta","Çorum","Afyonkarahisar","Kahramanmaraş","Adıyaman","Osmaniye","Kırıkkale","Aksaray","Karaman","Nevşehir","Niğde","Yozgat","Tokat","Amasya","Rize","Giresun"],
 de:["Berlin","Hamburg","München","Köln","Frankfurt am Main","Stuttgart","Düsseldorf","Leipzig","Dortmund","Essen","Bremen","Dresden","Hannover","Nürnberg","Duisburg","Bochum","Wuppertal","Bielefeld","Bonn","Münster","Karlsruhe","Mannheim","Augsburg","Wiesbaden","Mönchengladbach","Gelsenkirchen","Braunschweig","Kiel","Chemnitz","Aachen","Halle","Magdeburg","Freiburg","Krefeld","Lübeck","Oberhausen","Erfurt","Mainz","Rostock","Kassel","Hagen","Potsdam","Saarbrücken","Regensburg","Ingolstadt"],
 cn:["Beijing / 北京","Shanghai / 上海","Guangzhou / 广州","Shenzhen / 深圳","Chengdu / 成都","Tianjin / 天津","Chongqing / 重庆","Wuhan / 武汉","Xi'an / 西安","Hangzhou / 杭州","Nanjing / 南京","Suzhou / 苏州","Qingdao / 青岛","Dalian / 大连","Ningbo / 宁波","Xiamen / 厦门","Foshan / 佛山","Dongguan / 东莞","Yiwu / 义乌","Wenzhou / 温州","Kunming / 昆明","Zhengzhou / 郑州","Jinan / 济南","Changsha / 长沙","Hefei / 合肥","Fuzhou / 福州","Shijiazhuang / 石家庄","Harbin / 哈尔滨","Shenyang / 沈阳","Changchun / 长春","Wuxi / 无锡","Nantong / 南通","Nanchang / 南昌","Guiyang / 贵阳","Lanzhou / 兰州","Ürümqi / 乌鲁木齐","Hohhot / 呼和浩特","Yinchuan / 银川","Xining / 西宁","Lhasa / 拉萨","Haikou / 海口","Sanya / 三亚"],
 us:["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","Austin","San Jose","Fort Worth","Jacksonville","Columbus","Charlotte","Indianapolis","San Francisco","Seattle","Denver","Washington","Boston","Nashville","El Paso","Detroit","Oklahoma City","Portland","Las Vegas","Memphis","Louisville","Baltimore","Milwaukee","Albuquerque","Tucson","Fresno","Sacramento","Kansas City","Mesa","Atlanta","Miami","Raleigh","Omaha","Long Beach","Virginia Beach","Oakland","Minneapolis","Tampa","Tulsa","Arlington","New Orleans","Wichita"],
 gb:["London","Birmingham","Manchester","Glasgow","Liverpool","Leeds","Sheffield","Edinburgh","Bristol","Cardiff","Belfast","Leicester","Coventry","Bradford","Nottingham","Newcastle upon Tyne","Southampton","Portsmouth","Aberdeen","Brighton","Plymouth","Reading","Kingston upon Hull","Preston","Derby","Wolverhampton","Stoke-on-Trent","Sunderland","Swansea","Dundee","Milton Keynes","Cambridge","Oxford","York","Bath","Norwich","Exeter","Inverness"],
 nl:["Amsterdam","Rotterdam","Den Haag","Utrecht","Eindhoven","Groningen","Tilburg","Almere","Breda","Nijmegen","Enschede","Haarlem","Arnhem","Zaanstad","Amersfoort","'s-Hertogenbosch","Apeldoorn","Hoofddorp","Maastricht","Leiden","Dordrecht","Zoetermeer","Zwolle","Deventer","Delft","Alkmaar","Leeuwarden","Venlo","Emmen","Helmond"],
 fr:["Paris","Marseille","Lyon","Toulouse","Nice","Nantes","Montpellier","Strasbourg","Bordeaux","Lille","Rennes","Reims","Le Havre","Saint-Étienne","Toulon","Grenoble","Dijon","Angers","Nîmes","Villeurbanne","Le Mans","Aix-en-Provence","Brest","Tours","Amiens","Limoges","Clermont-Ferrand","Perpignan","Metz","Besançon","Orléans","Rouen","Mulhouse","Caen","Nancy","Argenteuil","Montreuil","Roubaix","Tourcoing","Avignon","Poitiers","Fort-de-France","Nanterre","Créteil","Versailles"],
 it:["Roma","Milano","Napoli","Torino","Palermo","Genova","Bologna","Firenze","Bari","Catania","Venezia","Verona","Messina","Padova","Trieste","Brescia","Prato","Taranto","Parma","Modena","Reggio Calabria","Reggio Emilia","Perugia","Livorno","Ravenna","Cagliari","Foggia","Rimini","Salerno","Ferrara","Sassari","Latina","Giugliano in Campania","Monza","Siracusa","Bergamo","Pescara","Trento","Vicenza","Terni","Forlì","Bolzano","Novara","Piacenza","Ancona"],
 es:["Madrid","Barcelona","Valencia","Sevilla","Zaragoza","Málaga","Murcia","Palma de Mallorca","Las Palmas","Bilbao","Alicante","Córdoba","Valladolid","Vigo","Gijón","L'Hospitalet","A Coruña","Vitoria-Gasteiz","Granada","Elche","Oviedo","Badalona","Cartagena","Terrassa","Jerez de la Frontera","Sabadell","Móstoles","Alcalá de Henares","Pamplona","Fuenlabrada","Almería","Leganés","San Sebastián","Getafe","Burgos","Albacete","Santander","Castellón de la Plana","Alcorcón","Logroño","Badajoz","Salamanca","Huelva","Marbella","Lleida","Tarragona"],
 ru:["Moskva / Москва","Saint Petersburg / Санкт-Петербург","Novosibirsk / Новосибирск","Yekaterinburg / Екатеринбург","Kazan / Казань","Nizhny Novgorod / Нижний Новгород","Chelyabinsk / Челябинск","Samara / Самара","Omsk / Омск","Rostov-on-Don / Ростов-на-Дону","Ufa / Уфа","Krasnoyarsk / Красноярск","Voronezh / Воронеж","Perm / Пермь","Volgograd / Волгоград","Krasnodar / Краснодар","Saratov / Саратов","Tyumen / Тюмень","Tolyatti / Тольятти","Izhevsk / Ижевск","Barnaul / Барнаул","Ulyanovsk / Ульяновск","Irkutsk / Иркутск","Khabarovsk / Хабаровск","Yaroslavl / Ярославль","Vladivostok / Владивосток","Makhachkala / Махачкала","Tomsk / Томск","Orenburg / Оренбург","Kemerovo / Кемерово","Novokuznetsk / Новокузнецк","Ryazan / Рязань","Astrakhan / Астрахань","Naberezhnye Chelny / Набережные Челны","Penza / Пенза","Lipetsk / Липецк","Kirov / Киров","Cheboksary / Чебоксары","Tula / Тула","Kaliningrad / Калининград","Bryansk / Брянск","Kursk / Курск","Ivanovo / Иваново","Magnitogorsk / Магнитогорск","Tver / Тверь","Stavropol / Ставрополь","Ulan-Ude / Улан-Удэ","Belgorod / Белгород","Arkhangelsk / Архангельск","Vladimir / Владимир"],
 ae:["Dubai","Abu Dhabi","Sharjah","Ajman","Al Ain","Ras Al Khaimah","Fujairah","Umm Al Quwain","Khor Fakkan","Kalba","Dibba Al-Fujairah","Madinat Zayed","Ruwais","Ghayathi","Liwa Oasis","Hatta"],
 sa:["Riyadh / الرياض","Jeddah / جدة","Mecca / مكة","Medina / المدينة","Dammam / الدمام","Ta'if / الطائف","Tabuk / تبوك","Khobar / الخبر","Buraidah / بريدة","Khamis Mushait / خميس مشيط","Abha / أبها","Al-Ahsa / الأحساء","Ha'il / حائل","Najran / نجران","Yanbu / ينبع","Al Jubail / الجبيل","Jizan / جازان","Al-Kharj / الخرج","Arar / عرعر","Sakaka / سكاكا","Qatif / القطيف","Ha'fr Al-Batin / حفر الباطن"],
 in:["Mumbai / मुंबई","Delhi / दिल्ली","Bangalore / बेंगलुरु","Hyderabad / हैदराबाद","Ahmedabad / अहमदाबाद","Chennai / चेन्नई","Kolkata / कोलकाता","Surat / सूरत","Pune / पुणे","Jaipur / जयपुर","Lucknow / लखनऊ","Kanpur / कानपुर","Nagpur / नागपुर","Indore / इंदौर","Thane / ठाणे","Bhopal / भोपाल","Visakhapatnam / विशाखापत्तनम","Patna / पटना","Vadodara / वडोदरा","Ghaziabad / गाजियाबाद","Ludhiana / लुधियाना","Agra / आगरा","Nashik / नाशिक","Faridabad / फरीदाबाद","Meerut / मेरठ","Rajkot / राजकोट","Kalyan-Dombivali","Vasai-Virar","Varanasi / वाराणसी","Srinagar / श्रीनगर","Aurangabad / औरंगाबाद","Dhanbad / धनबाद","Amritsar / अमृतसर","Navi Mumbai","Allahabad / प्रयागराज","Ranchi / रांची","Howrah / हावड़ा","Coimbatore / कोयंबटूर","Jabalpur / जबलपुर","Gwalior / ग्वालियर","Vijayawada / विजयवाड़ा","Jodhpur / जोधपुर","Madurai / मदुरै","Raipur / रायपुर","Kochi / कोच्चि","Chandigarh / चंडीगढ़","Guwahati / गुवाहाटी","Mysore / मैसूर","Bhubaneswar / भुवनेश्वर","Thiruvananthapuram / तिरुवनंतपुरम"],
 pk:["Karachi / کراچی","Lahore / لاہور","Faisalabad / فیصل آباد","Rawalpindi / راولپنڈی","Gujranwala / گوجرانوالہ","Peshawar / پشاور","Multan / ملتان","Islamabad / اسلام آباد","Hyderabad / حیدرآباد","Quetta / کوئٹہ","Sialkot / سیالکوٹ","Bahawalpur / بہاولپور","Sargodha / سرگودھا","Sukkur / سکھر","Larkana / لاڑکانہ","Mardan / مردان","Kasur / قصور","Rahim Yar Khan / رحیم یار خان","Mirpur Khas / میرپور خاص","Nawabshah / نواب شاہ","Sheikhupura / شیخوپورہ","Jhang / جھنگ"],
 bd:["Dhaka / ঢাকা","Chittagong / চট্টগ্রাম","Khulna / খুলনা","Rajshahi / রাজশাহী","Sylhet / সিলেট","Barisal / বরিশাল","Rangpur / রংপুর","Mymensingh / ময়মনসিংহ","Comilla / কুমিল্লা","Narayanganj / নারায়ণগঞ্জ","Gazipur / গাজীপুর","Jessore / যশোর","Bogra / বগুড়া","Cox's Bazar / কক্সবাজার","Tangail / টাঙ্গাইল","Dinajpur / দিনাজপুর","Pabna / পাবনা","Feni / ফেনী"],
 jp:["Tokyo / 東京","Yokohama / 横浜","Osaka / 大阪","Nagoya / 名古屋","Sapporo / 札幌","Fukuoka / 福岡","Kobe / 神戸","Kyoto / 京都","Kawasaki / 川崎","Saitama / さいたま","Hiroshima / 広島","Sendai / 仙台","Chiba / 千葉","Kitakyushu / 北九州","Sakai / 堺","Niigata / 新潟","Hamamatsu / 浜松","Shizuoka / 静岡","Sagamihara / 相模原","Okayama / 岡山","Kumamoto / 熊本","Kagoshima / 鹿児島","Funabashi / 船橋","Hachioji / 八王子","Kawaguchi / 川口","Himeji / 姫路","Suginami / 杉並","Matsuyama / 松山","Utsunomiya / 宇都宮","Higashiosaka / 東大阪","Nishinomiya / 西宮","Kurashiki / 倉敷","Ichikawa / 市川","Fukuyama / 福山","Amagasaki / 尼崎","Kanazawa / 金沢","Nagasaki / 長崎","Toyota / 豊田","Gifu / 岐阜","Toyonaka / 豊中","Nara / 奈良"],
 kr:["Seoul / 서울","Busan / 부산","Incheon / 인천","Daegu / 대구","Daejeon / 대전","Gwangju / 광주","Suwon / 수원","Ulsan / 울산","Changwon / 창원","Goyang / 고양","Yongin / 용인","Seongnam / 성남","Cheongju / 청주","Bucheon / 부천","Ansan / 안산","Cheonan / 천안","Hwaseong / 화성","Namyangju / 남양주","Jeonju / 전주","Anyang / 안양","Pohang / 포항","Uijeongbu / 의정부","Gimhae / 김해","Pyeongtaek / 평택","Gimpo / 김포","Iksan / 익산","Yangsan / 양산","Wonju / 원주","Chuncheon / 춘천","Gyeongju / 경주","Jinju / 진주","Mokpo / 목포","Jeju / 제주"],
 vn:["Ho Chi Minh City / Thành phố Hồ Chí Minh","Hanoi / Hà Nội","Haiphong / Hải Phòng","Da Nang / Đà Nẵng","Bien Hoa / Biên Hòa","Hue / Huế","Nha Trang","Buon Ma Thuot / Buôn Ma Thuột","Vung Tau / Vũng Tàu","Nam Dinh / Nam Định","Can Tho / Cần Thơ","Rach Gia / Rạch Giá","Qui Nhon / Quy Nhơn","My Tho / Mỹ Tho","Long Xuyen / Long Xuyên","Thai Nguyen / Thái Nguyên","Thanh Hoa / Thanh Hóa","Vinh","Pleiku","Bac Lieu / Bạc Liêu"],
 id:["Jakarta","Surabaya","Bandung","Medan","Bekasi","Tangerang","Depok","Semarang","Palembang","Makassar","South Tangerang","Batam","Bogor","Pekanbaru","Bandar Lampung","Padang","Malang","Denpasar","Samarinda","Tasikmalaya","Serang","Balikpapan","Pontianak","Banjarmasin","Cimahi","Yogyakarta","Mataram","Manado","Kupang","Jambi","Sukabumi","Cilegon","Ambon","Palu","Kendari"],
 my:["Kuala Lumpur","Kota Bharu","Klang","Kajang","Subang Jaya","Petaling Jaya","Shah Alam","Johor Bahru","Ipoh","Kuching","George Town / Penang","Kota Kinabalu","Seremban","Ampang Jaya","Sungai Petani","Iskandar Puteri","Taiping","Kuantan","Alor Setar","Kuala Terengganu","Kluang","Sandakan","Miri","Sibu","Melaka","Tawau","Muar"],
 th:["Bangkok / กรุงเทพ","Nonthaburi / นนทบุรี","Nakhon Ratchasima / นครราชสีมา","Chiang Mai / เชียงใหม่","Hat Yai / หาดใหญ่","Udon Thani / อุดรธานี","Pak Kret / ปากเกร็ด","Khon Kaen / ขอนแก่น","Chaophraya Surasak","Ubon Ratchathani / อุบลราชธานี","Nakhon Si Thammarat / นครศรีธรรมราช","Rayong / ระยอง","Chonburi / ชลบุรี","Phuket / ภูเก็ต","Nakhon Sawan / นครสวรรค์","Songkhla / สงขลา","Surat Thani / สุราษฎร์ธานี","Pattaya / พัทยา","Chiang Rai / เชียงราย","Lampang / ลำปาง","Trang / ตรัง","Pattani / ปัตตานี","Ayutthaya / อยุธยา"],
 br:["São Paulo","Rio de Janeiro","Brasília","Salvador","Fortaleza","Belo Horizonte","Manaus","Curitiba","Recife","Goiânia","Belém","Porto Alegre","Guarulhos","Campinas","São Luís","São Gonçalo","Maceió","Duque de Caxias","Natal","Teresina","Campo Grande","Nova Iguaçu","São Bernardo do Campo","João Pessoa","Santo André","Osasco","Jaboatão dos Guararapes","Ribeirão Preto","Uberlândia","Contagem","Sorocaba","Aracaju","Feira de Santana","Cuiabá","Joinville","Aparecida de Goiânia","Londrina","Juiz de Fora","Ananindeua","Porto Velho","Serra","Niterói","Caxias do Sul","Florianópolis","Macapá","Campos dos Goytacazes","Vila Velha","São João de Meriti","Mauá","São José dos Campos"],
 mx:["Mexico City / Ciudad de México","Guadalajara","Monterrey","Puebla","Tijuana","León","Ciudad Juárez","Zapopan","Nezahualcóyotl","Ecatepec","Guadalupe","Mérida","Chihuahua","San Luis Potosí","Aguascalientes","Hermosillo","Saltillo","Mexicali","Culiacán","Naucalpan","Morelia","Querétaro","Cancún","Torreón","Xalapa","Reynosa","Toluca","Chimalhuacán","Acapulco","Tuxtla Gutiérrez","Durango","Ojo de Agua","Veracruz","Tampico","Nuevo Laredo","Matamoros","Ensenada","Xico","Villahermosa","Irapuato","Mazatlán","Nogales","Oaxaca","Pachuca","Los Mochis"],
 ar:["Buenos Aires","Córdoba","Rosario","Mendoza","La Plata","San Miguel de Tucumán","Mar del Plata","Salta","Santa Fe","San Juan","Resistencia","Neuquén","Santiago del Estero","Corrientes","Bahía Blanca","Posadas","San Salvador de Jujuy","Paraná","Formosa","San Luis","La Rioja","Río Cuarto","Comodoro Rivadavia","San Fernando del Valle de Catamarca","Concordia","Río Gallegos","Ushuaia","San Rafael","Trelew","Rawson","Viedma","Villa Carlos Paz"],
 ca:["Toronto","Montreal","Calgary","Ottawa","Edmonton","Winnipeg","Mississauga","Vancouver","Brampton","Hamilton","Quebec City","Surrey","Laval","Halifax","London","Markham","Vaughan","Gatineau","Longueuil","Burnaby","Saskatoon","Kitchener","Windsor","Regina","Richmond","Richmond Hill","Oakville","Burlington","Greater Sudbury","Sherbrooke","Oshawa","Saguenay","Lévis","Barrie","Abbotsford","Coquitlam","Trois-Rivières","St. Catharines","Guelph","Cambridge","Whitby","Kelowna","Kingston","Ajax","Langley","Saanich","Terrebonne","Milton","St. John's"],
 au:["Sydney","Melbourne","Brisbane","Perth","Adelaide","Gold Coast","Canberra","Newcastle","Central Coast","Wollongong","Sunshine Coast","Hobart","Geelong","Townsville","Cairns","Toowoomba","Darwin","Ballarat","Bendigo","Launceston","Mackay","Rockhampton","Albury","Wodonga","Bunbury","Mandurah","Coffs Harbour","Bundaberg","Wagga Wagga","Hervey Bay","Shepparton","Port Macquarie","Gladstone","Tamworth","Traralgon","Orange","Dubbo","Geraldton","Bathurst","Nowra","Warrnambool","Kalgoorlie","Devonport","Mount Gambier","Whyalla","Alice Springs"],
 nz:["Auckland","Wellington","Christchurch","Hamilton","Tauranga","Napier-Hastings","Dunedin","Palmerston North","Nelson","Rotorua","New Plymouth","Whangarei","Invercargill","Whanganui","Gisborne","Timaru","Blenheim","Pukekohe","Taupo","Masterton","Levin","Tokoroa","Feilding","Cambridge","Ashburton","Rangiora","Queenstown"],
 za:["Johannesburg","Cape Town","Durban","Pretoria","Port Elizabeth / Gqeberha","Bloemfontein","Nelspruit / Mbombela","Kimberley","Polokwane","Rustenburg","East London","Pietermaritzburg","Vereeniging","Vanderbijlpark","Witbank / eMalahleni","Klerksdorp","Middelburg","Uitenhage","George","Newcastle","Krugersdorp","Randburg","Sandton","Soweto","Roodepoort","Boksburg","Benoni","Germiston","Springs","Alberton","Centurion","Midrand","Kempton Park"],
 eg:["Cairo / القاهرة","Alexandria / الإسكندرية","Giza / الجيزة","Shubra El Kheima / شبرا الخيمة","Port Said / بورسعيد","Suez / السويس","Luxor / الأقصر","Mansoura / المنصورة","El-Mahalla El-Kubra / المحلة الكبرى","Tanta / طنطا","Asyut / أسيوط","Ismailia / الإسماعيلية","Fayyum / الفيوم","Zagazig / الزقازيق","Aswan / أسوان","Damietta / دمياط","Damanhur / دمنهور","Al-Minya / المنيا","Beni Suef / بني سويف","Qena / قنا","Sohag / سوهاج","Hurghada / الغردقة","Sharm El Sheikh / شرم الشيخ","6th of October City / السادس من أكتوبر"],
 ma:["Casablanca / الدار البيضاء","Rabat / الرباط","Fez / فاس","Marrakech / مراكش","Agadir / أكادير","Tangier / طنجة","Meknes / مكناس","Oujda / وجدة","Kenitra / القنيطرة","Tetouan / تطوان","Salé / سلا","Nador / الناظور","Mohammedia / المحمدية","Khouribga / خريبكة","El Jadida / الجديدة","Beni Mellal / بني ملال","Taza / تازة","Settat / سطات","Berrechid / برشيد","Larache / العرائش","Ksar El Kebir / القصر الكبير","Ouarzazate / ورزازات","Essaouira / الصويرة","Chefchaouen / شفشاون","Ifrane / إفران"],
 ng:["Lagos","Kano","Ibadan","Abuja","Port Harcourt","Benin City","Kaduna","Enugu","Aba","Zaria","Ilorin","Onitsha","Warri","Maiduguri","Sokoto","Owerri","Abeokuta","Bauchi","Akure","Osogbo","Calabar","Uyo","Ado-Ekiti","Katsina","Jos","Yola","Minna","Umuahia","Awka","Lokoja","Asaba","Makurdi","Lafia","Damaturu","Gombe","Yenagoa","Jalingo","Birnin Kebbi","Dutse","Gusau"],
 ke:["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Ruiru","Kikuyu","Kangundo-Tala","Malindi","Kitui","Machakos","Thika","Naivasha","Kericho","Kakamega","Kilifi","Nyeri","Meru","Embu","Kisii","Bungoma","Garissa","Wote","Lamu","Voi","Nanyuki","Wajir","Marsabit","Isiolo","Kitale","Homa Bay","Migori","Busia","Kapenguria"],
 et:["Addis Ababa / አዲስ አበባ","Dire Dawa / ድሬ ዳዋ","Mek'ele / መቀሌ","Adama / አዳማ","Hawassa / ሐዋሳ","Bahir Dar / ባሕር ዳር","Gondar / ጎንደር","Dessie / ደሴ","Jimma / ጅማ","Jijiga / ጅጅጋ","Shashamane / ሻሸመኔ","Nekemte / ነቀምት","Bishoftu / ቢሾፍቱ","Sodo / ሶዶ","Arba Minch / አርባ ምንጭ","Hosaena / ሆሳዕና","Harar / ሐረር","Debre Berhan / ደብረ ብርሃን","Asella / አሰላ"],
 pl:["Warsaw / Warszawa","Kraków","Łódź","Wrocław","Poznań","Gdańsk","Szczecin","Bydgoszcz","Lublin","Katowice","Białystok","Gdynia","Częstochowa","Radom","Sosnowiec","Toruń","Kielce","Rzeszów","Gliwice","Zabrze","Olsztyn","Bielsko-Biała","Bytom","Zielona Góra","Rybnik","Ruda Śląska","Opole","Tychy","Gorzów Wielkopolski","Dąbrowa Górnicza","Elbląg","Płock","Wałbrzych","Włocławek","Tarnów","Chorzów","Koszalin","Kalisz","Legnica","Grudziądz","Słupsk","Jaworzno","Jastrzębie-Zdrój"],
 ua:["Kyiv / Київ","Kharkiv / Харків","Odesa / Одеса","Dnipro / Дніпро","Donetsk / Донецьк","Zaporizhzhia / Запоріжжя","Lviv / Львів","Kryvyi Rih / Кривий Ріг","Mykolaiv / Миколаїв","Mariupol / Маріуполь","Luhansk / Луганськ","Vinnytsia / Вінниця","Sevastopol / Севастополь","Simferopol / Сімферополь","Kherson / Херсон","Poltava / Полтава","Chernihiv / Чернігів","Cherkasy / Черкаси","Zhytomyr / Житомир","Sumy / Суми","Rivne / Рівне","Ivano-Frankivsk / Івано-Франківськ","Ternopil / Тернопіль","Lutsk / Луцьк","Kremenchuk / Кременчук","Bila Tserkva / Біла Церква","Melitopol / Мелітополь","Nikopol / Нікополь","Uzhhorod / Ужгород","Chernivtsi / Чернівці"],
 ir:["Tehran / تهران","Mashhad / مشهد","Isfahan / اصفهان","Karaj / کرج","Shiraz / شیراز","Tabriz / تبریز","Qom / قم","Ahvaz / اهواز","Kermanshah / کرمانشاه","Urmia / ارومیه","Rasht / رشت","Zahedan / زاهدان","Hamedan / همدان","Kerman / کرمان","Yazd / یزد","Ardabil / اردبیل","Bandar Abbas / بندرعباس","Arak / اراک","Zanjan / زنجان","Sanandaj / سنندج","Qazvin / قزوین","Khorramabad / خرم‌آباد","Gorgan / گرگان","Sari / ساری","Bushehr / بوشهر","Semnan / سمنان","Yasuj / یاسوج","Ilam / ایلام","Birjand / بیرجند","Shahrekord / شهرکرد","Bojnord / بجنورد"],
 iq:["Baghdad / بغداد","Basra / البصرة","Mosul / الموصل","Erbil / أربيل","Kirkuk / كركوك","Sulaymaniyah / السليمانية","Najaf / النجف","Karbala / كربلاء","Nasiriyah / الناصرية","Amarah / العمارة","Kut / الكوت","Hillah / الحلة","Ramadi / الرمادي","Fallujah / الفلوجة","Baqubah / بعقوبة","Duhok / دهوك","Samawah / السماوة","Diwaniyah / الديوانية","Tikrit / تكريت","Zakho / زاخو"],
 sy:["Damascus / دمشق","Aleppo / حلب","Homs / حمص","Latakia / اللاذقية","Hama / حماة","Deir ez-Zor / دير الزور","Raqqa / الرقة","Al-Hasakah / الحسكة","Qamishli / القامشلي","Tartus / طرطوس","Idlib / إدلب","As-Suwayda / السويداء","Daraa / درعا","Manbij / منبج","Palmyra / تدمر","Jableh / جبلة","Douma / دوما","Al-Bab / الباب","Salamiyah / سلمية"],
 lb:["Beirut / بيروت","Tripoli / طرابلس","Sidon / صيدا","Tyre / صور","Nabatieh / النبطية","Byblos / جبيل","Zahlé / زحلة","Baalbek / بعلبك","Jounieh / جونية","Batroun / البترون","Aley / عاليه","Bcharre / بشري","Baabda / بعبدا","Zgharta / زغرتا","Rashaya / راشيا"],
 jo:["Amman / عمّان","Zarqa / الزرقاء","Irbid / إربد","Russeifa / الرصيفة","Aqaba / العقبة","Sahab / سحاب","Salt / السلط","Madaba / مادبا","Jerash / جرش","Ma'an / معان","Karak / الكرك","Mafraq / المفرق","Tafilah / الطفيلة","Ajloun / عجلون"],
 ci:["Abidjan","Yamoussoukro","Bouaké","Daloa","San-Pédro","Korhogo","Man","Divo","Gagnoa","Anyama","Abengourou","Agboville","Soubré","Grand-Bassam","Dabou","Séguéla","Bouna","Boundiali","Odienné","Bondoukou"],
 ad:["Andorra la Vella", "Escaldes-Engordany", "Encamp", "Sant Julià de Lòria", "La Massana", "Ordino", "Canillo"],
 af:["Kabul / کابل", "Kandahar / قندهار", "Herat / هرات", "Mazar-i-Sharif / مزار شریف", "Kunduz / کندز", "Jalalabad / جلال آباد", "Ghazni / غزنی", "Balkh / بلخ", "Baghlan / بغلان", "Gardez / گردېز", "Khost / خوست", "Farah / فراه", "Bamyan / بامیان", "Zaranj / زرنج", "Puli Khumri / پلخمری"],
 ag:["St. John's", "All Saints", "Liberta", "Potters Village", "Bolans", "English Harbour Town", "Falmouth", "Codrington"],
 ai:["The Valley", "Blowing Point", "Sandy Ground", "Island Harbour", "North Side", "South Hill"],
 al:["Tirana", "Durrës", "Vlorë", "Elbasan", "Shkodër", "Fier", "Korçë", "Berat", "Lushnjë", "Kavajë", "Pogradec", "Gjirokastër", "Sarandë", "Kukës", "Lezhë"],
 am:["Yerevan / Երևան", "Gyumri / Գյումրի", "Vanadzor / Վանաձոր", "Vagharshapat / Վաղարշապատ", "Hrazdan / Հրազդան", "Abovyan / Աբովյան", "Kapan / Կապան", "Ijevan / Իջևան", "Armavir / Արմավիր", "Ashtarak / Աշտարակ", "Artashat / Արտաշատ", "Sevan / Սևան"],
 ao:["Luanda", "N'dalatando", "Huambo", "Lobito", "Benguela", "Kuito", "Lubango", "Malanje", "Namibe", "Soyo", "Uíge", "Cabinda", "Menongue", "Sumbe", "Saurimo", "Ondjiva"],
 aq:["McMurdo Station", "Amundsen–Scott South Pole", "Palmer Station", "Rothera", "Vostok", "Concordia", "Halley"],
 as:["Pago Pago", "Tafuna", "Nu'uuli", "Leone", "Faleniu", "Aua", "Fagatogo"],
 at:["Vienna / Wien", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "Sankt Pölten", "Dornbirn", "Steyr", "Wiener Neustadt", "Feldkirch", "Bregenz", "Leonding", "Klosterneuburg", "Baden", "Wolfsberg"],
 aw:["Oranjestad", "San Nicolas", "Noord", "Santa Cruz", "Paradera", "Savaneta"],
 ax:["Mariehamn", "Jomala", "Finström", "Lemland", "Saltvik", "Sund", "Hammarland"],
 az:["Baku / Bakı", "Ganja / Gəncə", "Sumqayit / Sumqayıt", "Mingachevir / Mingəçevir", "Şirvan", "Nakhchivan / Naxçıvan", "Sheki / Şəki", "Yevlakh / Yevlax", "Lankaran / Lənkəran", "Şəmkir", "Xankəndi", "Naftalan", "Quba", "Zaqatala", "Sabirabad"],
 ba:["Sarajevo", "Banja Luka", "Tuzla", "Zenica", "Mostar", "Bijeljina", "Prijedor", "Brčko", "Doboj", "Cazin", "Bihać", "Živinice", "Zvornik", "Trebinje", "Sanski Most", "Konjic"],
 bb:["Bridgetown", "Speightstown", "Oistins", "Bathsheba", "Holetown", "Hastings", "Crane", "Warrens"],
 be:["Brussels / Bruxelles", "Antwerp / Antwerpen", "Ghent / Gent", "Charleroi", "Liège", "Bruges / Brugge", "Namur", "Leuven", "Mons", "Aalst", "Mechelen", "La Louvière", "Kortrijk", "Hasselt", "Sint-Niklaas", "Ostend / Oostende", "Genk", "Roeselare", "Tournai", "Verviers", "Mouscron", "Dendermonde"],
 bf:["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya", "Banfora", "Dédougou", "Kaya", "Fada N'gourma", "Tenkodogo", "Dori", "Manga", "Réo"],
 bg:["Sofia / София", "Plovdiv / Пловдив", "Varna / Варна", "Burgas / Бургас", "Ruse / Русе", "Stara Zagora / Стара Загора", "Pleven / Плевен", "Sliven / Сливен", "Dobrich / Добрич", "Shumen / Шумен", "Pernik / Перник", "Haskovo / Хасково", "Yambol / Ямбол", "Pazardzhik / Пазарджик", "Blagoevgrad / Благоевград", "Veliko Tarnovo / Велико Търново", "Vratsa / Враца", "Gabrovo / Габрово", "Asenovgrad / Асеновград"],
 bh:["Manama / المنامة", "Riffa / الرفاع", "Muharraq / المحرق", "Hamad Town / مدينة حمد", "A'ali / عالي", "Isa Town / مدينة عيسى", "Sitra / سترة", "Budaiya / البديع", "Jidhafs / جدحفص", "Al Malikiyah / المالكية"],
 bi:["Gitega", "Bujumbura", "Muyinga", "Ngozi", "Ruyigi", "Kayanza", "Rutana", "Bururi", "Makamba", "Cibitoke", "Karuzi", "Muramvya"],
 bj:["Cotonou", "Porto-Novo", "Parakou", "Djougou", "Bohicon", "Kandi", "Ouidah", "Abomey", "Natitingou", "Lokossa", "Malanville", "Pobè"],
 bl:["Gustavia", "Lorient", "Saint-Jean", "Anse des Cayes", "Colombier", "Corossol"],
 bm:["Hamilton", "Saint George's", "Somerset Village", "Flatts Village", "Tucker's Town", "Warwick"],
 bn:["Bandar Seri Begawan", "Kuala Belait", "Seria", "Tutong", "Bangar", "Muara", "Panaga"],
 bo:["La Paz", "Santa Cruz de la Sierra", "Cochabamba", "Sucre", "Oruro", "Tarija", "Potosí", "El Alto", "Sacaba", "Trinidad", "Quillacollo", "Riberalta", "Yacuiba", "Montero", "Warnes"],
 bq:["Kralendijk", "Rincon", "The Bottom", "Oranjestad (Statia)", "Nikiboko", "Antriol"],
 bs:["Nassau", "Freeport", "West End", "Coopers Town", "Marsh Harbour", "Andros Town", "High Rock", "Alice Town", "Arthur's Town"],
 bt:["Thimphu", "Phuntsholing", "Punakha", "Samdrup Jongkhar", "Wangdue Phodrang", "Jakar", "Paro", "Trongsa", "Trashigang", "Mongar", "Gelephu", "Damphu"],
 bv:["Uninhabited (Bouvet Island)"],
 bw:["Gaborone", "Francistown", "Molepolole", "Selebi-Phikwe", "Serowe", "Maun", "Mahalapye", "Kanye", "Mochudi", "Palapye", "Ramotswa", "Tlokweng", "Lobatse", "Jwaneng"],
 by:["Minsk / Мінск", "Gomel / Гомель", "Mogilev / Магілёў", "Vitebsk / Віцебск", "Grodno / Гродна", "Brest / Брэст", "Babruysk / Бабруйск", "Baranavichy / Баранавічы", "Barysaw / Барысаў", "Pinsk / Пінск", "Orsha / Орша", "Mazyr / Мазыр", "Salihorsk / Салігорск", "Maladzyechna / Маладзечна", "Zhlobin / Жлобін", "Lida / Ліда", "Polotsk / Полацк"],
 bz:["Belize City", "San Ignacio", "Belmopan", "Orange Walk", "San Pedro", "Corozal", "Dangriga", "Punta Gorda", "Benque Viejo del Carmen"],
 cc:["West Island", "Bantam Village", "Home Island"],
 cd:["Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kananga", "Kisangani", "Bukavu", "Tshikapa", "Kolwezi", "Likasi", "Goma", "Bunia", "Uvira", "Boma", "Butembo", "Mbandaka", "Matadi", "Beni", "Kikwit", "Kalemie", "Mwene-Ditu"],
 cf:["Bangui", "Bimbo", "Berbérati", "Carnot", "Bambari", "Bouar", "Bossangoa", "Bria", "Bangassou", "Nola", "Kaga-Bandoro", "Sibut"],
 cg:["Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi", "Ouésso", "Impfondo", "Owando", "Sibiti", "Madingou", "Mossendjo", "Loandjili", "Kinkala"],
 ch:["Zürich", "Geneva / Genève", "Basel", "Bern", "Lausanne", "Winterthur", "Lucerne / Luzern", "St. Gallen", "Lugano", "Biel/Bienne", "Thun", "Köniz", "La Chaux-de-Fonds", "Fribourg", "Schaffhausen", "Chur", "Vernier", "Neuchâtel", "Uster", "Sion", "Emmen", "Zug", "Yverdon-les-Bains", "Kriens", "Rapperswil-Jona", "Dübendorf", "Wetzikon", "Baar", "Aarau"],
 ck:["Avarua", "Arorangi", "Matavera", "Titikaveka", "Amuri", "Omoka"],
 cl:["Santiago", "Puente Alto", "Antofagasta", "Viña del Mar", "Valparaíso", "Talcahuano", "San Bernardo", "Temuco", "Concepción", "Rancagua", "La Serena", "Iquique", "Chillán", "Coquimbo", "Osorno", "Calama", "Copiapó", "Punta Arenas", "Valdivia", "Los Ángeles", "Curicó", "Quilpué", "Villa Alemana", "Talca", "Arica"],
 cm:["Douala", "Yaoundé", "Bamenda", "Bafoussam", "Garoua", "Maroua", "Ngaoundéré", "Bertoua", "Loum", "Kumba", "Nkongsamba", "Buea", "Ebolowa", "Kribi", "Edéa", "Foumban", "Dschang", "Limbe", "Guider", "Meiganga"],
 co:["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga", "Pereira", "Santa Marta", "Ibagué", "Pasto", "Manizales", "Neiva", "Villavicencio", "Armenia", "Sincelejo", "Popayán", "Valledupar", "Montería", "Tuluá", "Buenaventura", "Palmira", "Soledad", "Bello", "Soacha", "Envigado", "Itagüí", "Floridablanca"],
 cr:["San José", "Alajuela", "Cartago", "Heredia", "Liberia", "Puntarenas", "Limón", "Escazú", "Curridabat", "San Vicente", "San Isidro", "Desamparados", "Grecia", "Turrialba", "Pérez Zeledón", "Guápiles", "Ciudad Quesada"],
 cu:["Havana / La Habana", "Santiago de Cuba", "Camagüey", "Holguín", "Guantánamo", "Santa Clara", "Bayamo", "Las Tunas", "Cienfuegos", "Pinar del Río", "Matanzas", "Ciego de Ávila", "Sancti Spíritus", "Manzanillo", "Cárdenas", "Palma Soriano", "Moa", "Puerto Padre"],
 cv:["Praia", "Mindelo", "Santa Maria", "Assomada", "Espargos", "Porto Novo", "São Filipe", "Cova Figueira", "Tarrafal", "Ribeira Grande", "Pedra Badejo", "Vila do Maio", "Ponta do Sol"],
 cw:["Willemstad", "Barber", "Sint Willibrordus", "Soto", "Westpunt", "Sint Michiel"],
 cx:["Flying Fish Cove", "Silver City", "Poon Saan", "Drumsite"],
 cy:["Nicosia / Λευκωσία", "Limassol / Λεμεσός", "Larnaca / Λάρνακα", "Famagusta / Αμμόχωστος", "Paphos / Πάφος", "Kyrenia / Κερύνεια", "Morphou / Μόρφου", "Aradippou / Αραδίππου", "Paralimni / Παραλίμνι", "Livadia / Λιβάδια", "Deryneia / Δερύνεια", "Ayia Napa / Αγία Νάπα", "Latsia / Λατσιά"],
 cz:["Prague / Praha", "Brno", "Ostrava", "Plzeň", "Liberec", "Olomouc", "České Budějovice", "Hradec Králové", "Ústí nad Labem", "Pardubice", "Zlín", "Havířov", "Kladno", "Most", "Opava", "Frýdek-Místek", "Karviná", "Jihlava", "Teplice", "Děčín", "Chomutov", "Přerov", "Prostějov", "Jablonec nad Nisou", "Mladá Boleslav", "Česká Lípa", "Třebíč", "Třinec"],
 dj:["Djibouti / جيبوتي", "Ali Sabieh / علي صبيح", "Tadjoura / تاجورة", "Obock / أوبوك", "Dikhil / دخيل", "Arta / أرتا", "Yoboki / يوبوكي", "Holhol / هولهول"],
 dk:["Copenhagen / København", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Roskilde", "Herning", "Hørsholm", "Silkeborg", "Næstved", "Fredericia", "Viborg", "Køge", "Holstebro", "Taastrup", "Slagelse", "Hillerød", "Sønderborg", "Svendborg", "Hjørring", "Holbæk", "Frederikshavn", "Nørresundby", "Ringsted"],
 dm:["Roseau", "Portsmouth", "Marigot", "Berekua", "Mahaut", "Salisbury", "Wesley", "La Plaine", "Castle Bruce"],
 do:["Santo Domingo", "Santiago de los Caballeros", "La Vega", "San Cristóbal", "Puerto Plata", "San Pedro de Macorís", "Higüey", "Baní", "La Romana", "Barahona", "San Francisco de Macorís", "Bonao", "Moca", "Punta Cana", "Villa Altagracia", "Nagua", "Cotuí", "Neiba"],
 dz:["Algiers / الجزائر", "Oran / وهران", "Constantine / قسنطينة", "Annaba / عنابة", "Blida / البليدة", "Batna / باتنة", "Djelfa / الجلفة", "Sétif / سطيف", "Sidi Bel Abbès / سيدي بلعباس", "Biskra / بسكرة", "Tébessa / تبسة", "El Oued / الوادي", "Skikda / سكيكدة", "Tiaret / تيارت", "Béjaïa / بجاية", "Tlemcen / تلمسان", "Ouargla / ورقلة", "Béchar / بشار", "Mostaganem / مستغانم", "Chlef / الشلف", "Souk Ahras / سوق أهراس", "Ghardaïa / غرداية"],
 ec:["Quito", "Guayaquil", "Cuenca", "Santo Domingo", "Machala", "Durán", "Manta", "Portoviejo", "Loja", "Ambato", "Riobamba", "Milagro", "Ibarra", "Latacunga", "Esmeraldas", "Quevedo", "Babahoyo", "Sangolquí", "Daule", "Tulcán"],
 ee:["Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve", "Viljandi", "Rakvere", "Sillamäe", "Maardu", "Kuressaare", "Võru", "Valga", "Haapsalu", "Jõhvi", "Paide", "Keila", "Kiviõli"],
 eh:["Laayoune / العيون", "Dakhla / الداخلة", "Smara / السمارة", "Boujdour / بوجدور", "Tifariti / تيفاريتي", "Bir Lahlou / بير لحلو"],
 er:["Asmara / አስመራ", "Keren / ከረን", "Massawa / ምጽዋ", "Assab / ዓሳብ", "Mendefera / መንደፈራ", "Barentu / ባረንቱ", "Adi Keyh / ዓዲ ቀይሕ", "Dekemhare / ደቀምሓረ", "Ak'ordat / ኣቆርዳት", "Nakfa / ናቕፋ"],
 fi:["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä", "Lahti", "Kuopio", "Pori", "Joensuu", "Lappeenranta", "Hämeenlinna", "Vaasa", "Seinäjoki", "Rovaniemi", "Mikkeli", "Kotka", "Salo", "Porvoo", "Kouvola", "Kokkola", "Hyvinkää", "Lohja", "Järvenpää", "Rauma", "Kajaani", "Nurmijärvi", "Tuusula", "Kirkkonummi"],
 fj:["Suva", "Lautoka", "Nadi", "Labasa", "Nausori", "Ba", "Sigatoka", "Rakiraki", "Levuka", "Savusavu", "Tavua"],
 fk:["Stanley", "Mount Pleasant", "Goose Green", "Fox Bay", "Port Howard", "San Carlos"],
 fm:["Palikir", "Weno", "Tofol", "Colonia", "Kolonia", "Nett", "Sokehs"],
 fo:["Tórshavn", "Klaksvík", "Runavík", "Hoyvík", "Argir", "Fuglafjørður", "Tvøroyri", "Vestmanna", "Sørvágur"],
 ga:["Libreville", "Port-Gentil", "Franceville", "Oyem", "Moanda", "Lambaréné", "Mouila", "Tchibanga", "Koulamoutou", "Makokou", "Bitam", "Gamba"],
 gd:["St. George's", "Grenville", "Gouyave", "Sauteurs", "Victoria", "Hillsborough", "Sadlers", "Grand Roy"],
 ge:["Tbilisi / თბილისი", "Kutaisi / ქუთაისი", "Batumi / ბათუმი", "Rustavi / რუსთავი", "Sukhumi / სოხუმი", "Zugdidi / ზუგდიდი", "Gori / გორი", "Poti / ფოთი", "Samtredia / სამტრედია", "Khashuri / ხაშური", "Senaki / სენაკი", "Zestafoni / ზესტაფონი", "Marneuli / მარნეული", "Telavi / თელავი", "Akhaltsikhe / ახალციხე"],
 gf:["Cayenne", "Saint-Laurent-du-Maroni", "Kourou", "Matoury", "Rémire-Montjoly", "Macouria", "Mana", "Sinnamary", "Iracoubo"],
 gg:["St. Peter Port", "St. Sampson", "Vale", "Castel", "St. Martin", "St. Andrew", "St. Saviour", "Forest", "Torteval"],
 gh:["Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Sunyani", "Cape Coast", "Obuasi", "Teshie", "Tema", "Madina", "Koforidua", "Ho", "Wa", "Bolgatanga", "Techiman", "Nkawkaw", "Berekum", "Nsawam", "Prestea"],
 gi:["Gibraltar", "Westside", "Catalan Bay"],
 gl:["Nuuk", "Sisimiut", "Ilulissat", "Qaqortoq", "Aasiaat", "Maniitsoq", "Tasiilaq", "Uummannaq", "Narsaq", "Paamiut", "Nanortalik", "Upernavik"],
 gm:["Banjul", "Serekunda", "Brikama", "Bakau", "Farafenni", "Basse Santa Su", "Sukuta", "Lamin", "Gunjur", "Soma", "Barra", "Kanifing"],
 gn:["Conakry", "Nzérékoré", "Kankan", "Kindia", "Labé", "Guéckédou", "Boké", "Kissidougou", "Faranah", "Mamou", "Siguiri", "Macenta", "Coyah", "Dubréka", "Télimélé"],
 gp:["Basse-Terre", "Pointe-à-Pitre", "Les Abymes", "Baie-Mahault", "Le Gosier", "Petit-Bourg", "Sainte-Anne", "Le Moule", "Sainte-Rose", "Capesterre-Belle-Eau", "Lamentin"],
 gq:["Malabo", "Bata", "Ebebiyín", "Aconibe", "Añisoc", "Luba", "Evinayong", "Mongomo", "Mikomeseng", "Rebola", "Riaba", "Cogo"],
 gr:["Athens / Αθήνα", "Thessaloniki / Θεσσαλονίκη", "Patras / Πάτρα", "Piraeus / Πειραιάς", "Larissa / Λάρισα", "Heraklion / Ηράκλειο", "Peristeri / Περιστέρι", "Kallithea / Καλλιθέα", "Acharnes / Αχαρναί", "Kalamaria / Καλαμαριά", "Nikaia / Νίκαια", "Glyfada / Γλυφάδα", "Volos / Βόλος", "Ioannina / Ιωάννινα", "Chania / Χανιά", "Chalcis / Χαλκίδα", "Corfu / Κέρκυρα", "Katerini / Κατερίνη", "Serres / Σέρρες", "Kavala / Καβάλα", "Rhodes / Ρόδος", "Agrinio / Αγρίνιο", "Sparta / Σπάρτη", "Tripoli / Τρίπολη"],
 gs:["King Edward Point", "Grytviken (abandoned)"],
 gt:["Guatemala City / Ciudad de Guatemala", "Villa Nueva", "Mixco", "Quetzaltenango", "Villa Canales", "Petapa", "San Juan Sacatepéquez", "Escuintla", "Chinautla", "Chimaltenango", "Amatitlán", "Cobán", "Puerto Barrios", "Huehuetenango", "Antigua Guatemala", "Retalhuleu", "Mazatenango", "Jalapa"],
 gu:["Hagåtña", "Dededo", "Yigo", "Tamuning", "Mangilao", "Yona", "Barrigada", "Chalan Pago-Ordot", "Sinajana", "Agat", "Piti", "Santa Rita"],
 gw:["Bissau", "Bafatá", "Gabú", "Bissorã", "Bolama", "Cacheu", "Bubaque", "Catió", "Mansôa", "Buba", "Farim", "Quinhámel"],
 gy:["Georgetown", "Linden", "New Amsterdam", "Anna Regina", "Bartica", "Skeldon", "Rosignol", "Mabaruma", "Corriverton", "Lethem", "Parika", "Ituni"],
 hk:["Central / 中環", "Kowloon / 九龍", "Tsim Sha Tsui / 尖沙咀", "Mong Kok / 旺角", "Causeway Bay / 銅鑼灣", "Wan Chai / 灣仔", "North Point / 北角", "Sha Tin / 沙田", "Tsuen Wan / 荃灣", "Tuen Mun / 屯門", "Yuen Long / 元朗", "Tai Po / 大埔", "Kwun Tong / 觀塘", "Sai Kung / 西貢", "Aberdeen / 香港仔", "Stanley / 赤柱", "Discovery Bay / 愉景灣"],
 hm:["Uninhabited (Heard & McDonald Islands)"],
 hn:["Tegucigalpa", "San Pedro Sula", "Choloma", "La Ceiba", "El Progreso", "Choluteca", "Comayagua", "Puerto Cortés", "La Lima", "Danlí", "Siguatepeque", "Juticalpa", "Villanueva", "Tocoa", "Olanchito", "Catacamas", "Tela", "Santa Rosa de Copán"],
 hr:["Zagreb", "Split", "Rijeka", "Osijek", "Zadar", "Slavonski Brod", "Pula", "Karlovac", "Sisak", "Varaždin", "Šibenik", "Dubrovnik", "Bjelovar", "Kaštela", "Samobor", "Vinkovci", "Velika Gorica", "Vukovar", "Đakovo", "Koprivnica"],
 ht:["Port-au-Prince", "Carrefour", "Delmas", "Pétionville", "Cap-Haïtien", "Gonaïves", "Croix-des-Bouquets", "Saint-Marc", "Les Cayes", "Verrettes", "Cité Soleil", "Port-de-Paix", "Léogâne", "Jacmel", "Hinche", "Jérémie"],
 hu:["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza", "Kecskemét", "Székesfehérvár", "Szombathely", "Szolnok", "Tatabánya", "Kaposvár", "Érd", "Veszprém", "Békéscsaba", "Zalaegerszeg", "Eger", "Sopron", "Nagykanizsa", "Dunaújváros", "Hódmezővásárhely", "Salgótarján", "Cegléd", "Baja"],
 ie:["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Swords", "Dundalk", "Bray", "Navan", "Ennis", "Kilkenny", "Carlow", "Tralee", "Newbridge", "Portlaoise", "Balbriggan", "Naas", "Sligo", "Athlone", "Mullingar", "Wexford", "Letterkenny", "Celbridge"],
 il:["Jerusalem / ירושלים", "Tel Aviv / תל אביב", "Haifa / חיפה", "Rishon LeZion / ראשון לציון", "Petah Tikva / פתח תקווה", "Ashdod / אשדוד", "Netanya / נתניה", "Beer Sheva / באר שבע", "Bnei Brak / בני ברק", "Holon / חולון", "Ramat Gan / רמת גן", "Ashkelon / אשקלון", "Rehovot / רחובות", "Bat Yam / בת ים", "Herzliya / הרצליה", "Kfar Saba / כפר סבא", "Modi'in / מודיעין", "Nazareth / נצרת", "Eilat / אילת", "Ramla / רמלה", "Lod / לוד", "Raanana / רעננה"],
 im:["Douglas", "Onchan", "Ramsey", "Peel", "Port Erin", "Castletown", "Port St Mary", "Laxey"],
 io:["Diego Garcia (military base only)"],
 is:["Reykjavík", "Kópavogur", "Hafnarfjörður", "Akureyri", "Reykjanesbær", "Garðabær", "Mosfellsbær", "Árborg", "Akranes", "Fjarðabyggð", "Ísafjörður", "Vestmannaeyjar", "Egilsstaðir", "Selfoss", "Húsavík"],
 je:["St. Helier", "St. Saviour", "St. Brelade", "St. Clement", "St. Lawrence", "Grouville", "St. Peter", "St. Martin", "St. Ouen", "Trinity"],
 jm:["Kingston", "Spanish Town", "Portmore", "Montego Bay", "May Pen", "Mandeville", "Old Harbour", "Ocho Rios", "Savanna-la-Mar", "Port Antonio", "Linstead", "Half Way Tree", "Negril", "Falmouth"],
 kg:["Bishkek / Бишкек", "Osh / Ош", "Jalal-Abad / Жалал-Абад", "Karakol / Каракол", "Tokmok / Токмок", "Kara-Balta / Кара-Балта", "Naryn / Нарын", "Talas / Талас", "Uzgen / Өзгөн", "Balykchy / Балыкчы", "Kyzyl-Kiya / Кызыл-Кыя", "Kant / Кант", "Sulyukta / Сүлүктү"],
 kh:["Phnom Penh / ភ្នំពេញ", "Siem Reap / សៀមរាប", "Battambang / បាត់ដំបង", "Sihanoukville / ព្រះសីហនុ", "Poipet / ប៉ោយប៉ែត", "Kampong Cham / កំពង់ចាម", "Ta Khmau / តាខ្មៅ", "Kampong Chhnang / កំពង់ឆ្នាំង", "Pursat / ពោធិ៍សាត់", "Kampot / កំពត", "Kampong Speu / កំពង់ស្ពឺ", "Kratié / ក្រចេះ", "Stung Treng / ស្ទឹងត្រែង"],
 ki:["Tarawa", "Betio", "Bikenibeu", "Bairiki", "Bonriki", "Teaoraereke", "Butaritari", "Abaiang", "Marakei"],
 km:["Moroni / موروني", "Mutsamudu / موتسامودو", "Fomboni / فومبوني", "Domoni / دوموني", "Sima / سيما", "Ouani / واني", "Mitsamiouli / متساميولي", "Mirontsy / ميرونتسي"],
 kn:["Basseterre", "Charlestown", "Newcastle", "Sandy Point Town", "Cayon", "Dieppe Bay Town", "Old Road Town"],
 kp:["Pyongyang / 평양", "Hamhung / 함흥", "Chongjin / 청진", "Nampo / 남포", "Wonsan / 원산", "Sinuiju / 신의주", "Tanchon / 단천", "Kaechon / 개천", "Kaesong / 개성", "Sariwon / 사리원", "Songnim / 송림", "Sinpo / 신포", "Haeju / 해주", "Kanggye / 강계", "Hyesan / 혜산"],
 kw:["Kuwait City / مدينة الكويت", "Al Ahmadi / الأحمدي", "Hawalli / حولي", "As Salimiyah / السالمية", "Sabah as Salim / صباح السالم", "Al Farwaniyah / الفروانية", "Al Fahaheel / الفحيحيل", "Ar Riqqah / الرقة", "Al Jahra / الجهراء", "Al Manqaf / المنقف", "Al Wafrah / الوفرة", "Bayan / بيان"],
 ky:["George Town", "West Bay", "Bodden Town", "East End", "North Side", "Newlands", "Savannah", "Little Cayman"],
 kz:["Almaty / Алматы", "Astana / Астана", "Shymkent / Шымкент", "Karaganda / Қарағанды", "Aktobe / Ақтөбе", "Taraz / Тараз", "Pavlodar / Павлодар", "Ust-Kamenogorsk / Өскемен", "Semey / Семей", "Atyrau / Атырау", "Kyzylorda / Қызылорда", "Kostanay / Қостанай", "Petropavl / Петропавл", "Aktau / Ақтау", "Uralsk / Орал", "Temirtau / Теміртау", "Kokshetau / Көкшетау", "Turkistan / Түркістан", "Ekibastuz / Екібастұз", "Rudny / Рудный"],
 la:["Vientiane / ວຽງຈັນ", "Pakse / ປາກເຊ", "Savannakhet / ສະຫວັນນະເຂດ", "Luang Prabang / ຫຼວງພະບາງ", "Xam Neua / ຊຳເໜືອ", "Thakhek / ທ່າແຂກ", "Muang Xay / ເມືອງໄຊ", "Ban Houayxay / ບ້ານຫ້ວຍຊາຍ", "Phôngsali / ຜົ້ງສາລີ", "Attapeu / ອັດຕະປື", "Salavan / ສາລະວັນ"],
 lc:["Castries", "Vieux Fort", "Micoud", "Soufrière", "Gros Islet", "Dennery", "Laborie", "Choiseul", "Anse la Raye", "Canaries"],
 li:["Vaduz", "Schaan", "Triesen", "Balzers", "Eschen", "Mauren", "Triesenberg", "Ruggell", "Gamprin", "Schellenberg", "Planken"],
 lk:["Colombo / කොළඹ", "Dehiwala-Mount Lavinia / දෙහිවල", "Moratuwa / මොරටුව", "Sri Jayawardenepura Kotte / ශ්‍රී ජයවර්ධනපුර කෝට්ටේ", "Negombo / මීගමුව", "Kandy / මහනුවර", "Kalmunai / கல்முனை", "Vavuniya / வவுனியா", "Galle / ගාල්ල", "Trincomalee / திருகோணமலை", "Batticaloa / மட்டக்களப்பு", "Jaffna / யாழ்ப்பாணம்", "Katunayake / කටුනායක", "Dambulla / දඹුල්ල", "Ratnapura / රත්නපුර", "Anuradhapura / අනුරාධපුරය", "Kurunegala / කුරුණෑගල", "Matara / මාතර", "Nuwara Eliya / නුවර එළිය"],
 lr:["Monrovia", "Gbarnga", "Kakata", "Buchanan", "Ganta", "Zwedru", "Voinjama", "Robertsport", "Harper", "Sanniquellie", "Bensonville", "Tubmanburg", "Greenville", "Fish Town"],
 ls:["Maseru", "Teyateyaneng", "Mafeteng", "Hlotse", "Mohale's Hoek", "Maputsoe", "Qacha's Nek", "Quthing", "Butha-Buthe", "Mokhotlong", "Thaba-Tseka", "Roma", "Semonkong"],
 lt:["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys", "Alytus", "Marijampolė", "Mažeikiai", "Jonava", "Utena", "Kėdainiai", "Telšiai", "Visaginas", "Tauragė", "Ukmergė", "Radviliškis", "Plungė", "Kretinga", "Šilutė", "Palanga"],
 lu:["Luxembourg / Luxembourg", "Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck", "Diekirch", "Wiltz", "Echternach", "Rumelange", "Grevenmacher", "Remich", "Bettembourg", "Strassen", "Hesperange", "Sanem"],
 lv:["Riga / Rīga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala", "Ventspils", "Rēzekne", "Ogre", "Valmiera", "Jēkabpils", "Tukums", "Cēsis", "Salaspils", "Kuldīga", "Olaine", "Saldus", "Talsi", "Sigulda"],
 ly:["Tripoli / طرابلس", "Benghazi / بنغازي", "Misrata / مصراتة", "Bayda / البيضاء", "Zawiya / الزاوية", "Zliten / زليتن", "Ajdabiya / أجدابيا", "Tobruk / طبرق", "Sabha / سبها", "Khoms / الخمس", "Sirte / سرت", "Derna / درنة", "Sabratha / صبراتة", "Zuwara / زوارة", "Ghadames / غدامس", "Ghat / غات", "Marj / المرج"],
 mc:["Monaco", "Monte Carlo", "La Condamine", "Fontvieille", "Moneghetti", "Larvotto", "Saint Roman"],
 md:["Chișinău / Кишинэу", "Tiraspol", "Bălți", "Tighina / Bender", "Rîbnița", "Cahul", "Ungheni", "Soroca", "Orhei", "Comrat", "Dubăsari", "Ceadîr-Lunga", "Strășeni", "Edineț", "Călărași", "Slobozia"],
 me:["Podgorica / Подгорица", "Nikšić / Никшић", "Pljevlja / Пљевља", "Bijelo Polje / Бијело Поље", "Cetinje / Цетиње", "Bar / Бар", "Herceg Novi / Херцег Нови", "Berane / Беране", "Budva / Будва", "Ulcinj / Улцињ", "Kotor / Котор", "Tivat / Тиват", "Rožaje / Рожаје", "Kolašin / Колашин"],
 mf:["Marigot", "Grand-Case", "Baie Orientale", "Quartier d'Orléans", "French Cul-de-Sac", "Cul-de-Sac"],
 mg:["Antananarivo", "Toamasina", "Antsirabe", "Fianarantsoa", "Mahajanga", "Toliara", "Antsiranana", "Ambovombe", "Antalaha", "Ambatondrazaka", "Sambava", "Farafangana", "Tôlanaro", "Manakara", "Morondava", "Ihosy", "Maroantsetra", "Antsohihy"],
 mh:["Majuro", "Ebeye", "Arno", "Jaluit", "Wotje", "Mili", "Namu", "Kili", "Ailinglaplap"],
 mk:["Skopje / Скопје", "Bitola / Битола", "Kumanovo / Куманово", "Prilep / Прилеп", "Tetovo / Тетово", "Veles / Велес", "Ohrid / Охрид", "Gostivar / Гостивар", "Štip / Штип", "Strumica / Струмица", "Kavadarci / Кавадарци", "Kočani / Кочани", "Kičevo / Кичево", "Struga / Струга", "Radoviš / Радовиш", "Gevgelija / Гевгелија"],
 ml:["Bamako", "Sikasso", "Mopti", "Koutiala", "Ségou", "Kayes", "Gao", "Kati", "San", "Timbuktu / Tombouctou", "Bougouni", "Kolokani", "Kolondiéba", "Nioro", "Diré", "Kidal"],
 mm:["Yangon / ရန်ကုန်", "Mandalay / မန္တလေး", "Naypyidaw / နေပြည်တော်", "Bago / ပဲခူး", "Mawlamyine / မော်လမြိုင်", "Taunggyi / တောင်ကြီး", "Meiktila / မိတ္ထီလာ", "Sittwe / စစ်တွေ", "Monywa / မုံရွာ", "Pathein / ပုသိမ်", "Myeik / မြိတ်", "Magway / မကွေး", "Pyay / ပြည်", "Mergui / မြိတ်", "Lashio / လားရှိုး", "Hpa-An / ဘားအံ", "Myitkyina / မြစ်ကြီးနား"],
 mn:["Ulaanbaatar / Улаанбаатар", "Erdenet / Эрдэнэт", "Darkhan / Дархан", "Choibalsan / Чойбалсан", "Mörön / Мөрөн", "Nalaikh / Налайх", "Ölgii / Өлгий", "Khovd / Ховд", "Bayanhongor / Баянхонгор", "Arvaikheer / Арвайхээр", "Sükhbaatar / Сүхбаатар", "Zuunmod / Зуунмод", "Uliastai / Улиастай", "Altai / Алтай"],
 mo:["Macao / 澳門", "Taipa / 氹仔", "Coloane / 路環", "Cotai / 路氹", "Sé", "São Lourenço", "Nossa Senhora de Fátima", "Santo António"],
 mp:["Saipan", "Tinian", "Rota", "San Jose", "Kagman", "Tanapag", "Chalan Kanoa"],
 mq:["Fort-de-France", "Le Lamentin", "Le Robert", "Schoelcher", "Sainte-Marie", "Rivière-Pilote", "Le François", "Le Marin", "Saint-Joseph", "Ducos", "Saint-Esprit"],
 mr:["Nouakchott / نواكشوط", "Nouadhibou / نواذيبو", "Kiffa / كيفة", "Kaédi / كيهيدي", "Zouérat / ازويرات", "Rosso / روصو", "Néma / النعمة", "Aleg / ألاك", "Atar / أطار", "Tidjikja / تجكجة", "Selibaby / سيليبابي", "Akjoujt / أكجوجت"],
 ms:["Little Bay", "Brades", "Cudjoe Head", "Salem", "Plymouth (abandoned)", "Saint Peter's", "Saint John's"],
 mt:["Birkirkara", "Qormi", "Mosta", "Żabbar", "Fgura", "San Pawl il-Baħar", "Sliema", "Naxxar", "San Ġwann", "Żejtun", "Rabat", "Attard", "Valletta", "Marsaskala", "Marsaxlokk", "Mellieħa", "Paola", "Siġġiewi", "Tarxien", "Victoria (Gozo)"],
 mu:["Port Louis", "Beau Bassin-Rose Hill", "Vacoas-Phoenix", "Curepipe", "Quatre Bornes", "Triolet", "Goodlands", "Centre de Flacq", "Bel Air-Rivière Sèche", "Mahébourg", "Saint Pierre", "Rose Belle", "Rivière du Rempart", "Chemin Grenier"],
 mv:["Malé", "Addu City", "Fuvahmulah", "Kulhudhuffushi", "Thinadhoo", "Naifaru", "Hinnavaru", "Eydhafushi", "Dhidhdhoo", "Manadhoo", "Ungoofaaru", "Muli", "Funadhoo", "Kudahuvadhoo"],
 mw:["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Kasungu", "Mangochi", "Karonga", "Salima", "Nkhotakota", "Balaka", "Liwonde", "Dedza", "Rumphi", "Nkhata Bay", "Machinga"],
 mz:["Maputo", "Matola", "Beira", "Nampula", "Chimoio", "Nacala", "Quelimane", "Tete", "Xai-Xai", "Lichinga", "Pemba", "Inhambane", "Angoche", "Cuamba", "Maxixe", "Chibuto", "Chókwé", "Dondo"],
 na:["Windhoek", "Rundu", "Walvis Bay", "Oshakati", "Swakopmund", "Katima Mulilo", "Grootfontein", "Rehoboth", "Otjiwarongo", "Okahandja", "Keetmanshoop", "Tsumeb", "Ondangwa", "Ongwediva", "Mariental", "Gobabis", "Outapi", "Lüderitz"],
 nc:["Nouméa", "Mont-Dore", "Dumbéa", "Païta", "Wé", "Koné", "Bourail", "Poindimié", "La Foa", "Koumac", "Houaïlou", "Canala", "Thio"],
 ne:["Niamey", "Zinder", "Maradi", "Agadez", "Tahoua", "Dosso", "Arlit", "Diffa", "Tessaoua", "Birni-N'Konni", "Gaya", "Téra", "Tillabéri"],
 nf:["Kingston", "Burnt Pine", "Cascade", "Anson Bay", "Middlegate", "Longridge", "Steele's Point"],
 ni:["Managua", "León", "Masaya", "Matagalpa", "Chinandega", "Estelí", "Granada", "Tipitapa", "Ciudad Sandino", "Juigalpa", "Bluefields", "Jinotepe", "Rivas", "Boaco", "Ocotal", "Chichigalpa", "Corn Island"],
 no:["Oslo", "Bergen", "Trondheim", "Stavanger", "Kristiansand", "Fredrikstad", "Sandnes", "Tromsø", "Sarpsborg", "Skien", "Ålesund", "Sandefjord", "Haugesund", "Tønsberg", "Moss", "Porsgrunn", "Bodø", "Arendal", "Hamar", "Ytrebygda", "Larvik", "Halden", "Askøy", "Kongsberg", "Harstad", "Molde", "Lillehammer", "Elverum", "Drammen", "Lørenskog"],
 np:["Kathmandu / काठमाडौँ", "Pokhara / पोखरा", "Lalitpur / ललितपुर", "Bharatpur / भरतपुर", "Biratnagar / विराटनगर", "Birgunj / वीरगञ्ज", "Dharan / धरान", "Butwal / बुटवल", "Nepalgunj / नेपालगञ्ज", "Hetauda / हेटौँडा", "Janakpur / जनकपुर", "Dhangadhi / धनगढी", "Itahari / इटहरी", "Mahendranagar / महेन्द्रनगर", "Tulsipur / तुलसीपुर", "Rajbiraj / राजविराज", "Ghorahi / घोराही", "Baglung / बागलुङ", "Damak / दमक"],
 nr:["Yaren", "Denigomodu", "Meneng", "Ewa", "Aiwo", "Ijuw", "Uaboe", "Anibare", "Boe", "Baiti"],
 nu:["Alofi", "Avatele", "Hakupu", "Liku", "Makefu", "Mutalau", "Tamakautoga", "Tuapa"],
 om:["Muscat / مسقط", "Seeb / السيب", "Bawshar / بوشر", "Salalah / صلالة", "Sohar / صحار", "Sur / صور", "Nizwa / نزوى", "Rustaq / الرستاق", "Al Buraimi / البريمي", "Ibri / عبري", "Barka / بركاء", "Ibra / إبراء", "Al Suwayq / السويق", "Bahla / بهلاء", "Khasab / خصب", "Sinaw / سناو"],
 pa:["Panama City / Ciudad de Panamá", "San Miguelito", "Tocumen", "David", "Arraiján", "La Chorrera", "Pacora", "Colón", "Las Cumbres", "Santiago", "Chitré", "Penonomé", "Chorrera", "Aguadulce", "Bocas del Toro", "Changuinola"],
 pe:["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Iquitos", "Cusco", "Chimbote", "Huancayo", "Tacna", "Juliaca", "Ica", "Pucallpa", "Sullana", "Ayacucho", "Chincha Alta", "Huánuco", "Cajamarca", "Puno", "Tarapoto", "Tumbes", "Talara", "Huaraz", "Cerro de Pasco", "Ilo", "Moquegua", "Puerto Maldonado"],
 pf:["Papeete", "Faaa", "Punaauia", "Pirae", "Mahina", "Paea", "Arue", "Uturoa", "Taravao", "Bora Bora", "Moorea"],
 pg:["Port Moresby", "Lae", "Arawa", "Mount Hagen", "Popondetta", "Madang", "Kokopo", "Mendi", "Kimbe", "Goroka", "Wewak", "Bulolo", "Vanimo", "Alotau", "Kavieng", "Rabaul", "Kundiawa", "Wabag"],
 ph:["Manila", "Quezon City", "Davao", "Caloocan", "Cebu City", "Zamboanga", "Antipolo", "Pasig", "Taguig", "Valenzuela", "Dasmariñas", "Cagayan de Oro", "Parañaque", "Las Piñas", "General Santos", "Makati", "Bacoor", "Muntinlupa", "Bacolod", "Iloilo", "Pasay", "Marikina", "Mandaluyong", "San Pedro", "Baguio", "Angeles", "Iligan", "Butuan", "Tacloban", "Puerto Princesa", "Legazpi"],
 pm:["Saint-Pierre", "Miquelon-Langlade", "L'Île-aux-Marins"],
 pn:["Adamstown"],
 pr:["San Juan", "Bayamón", "Carolina", "Ponce", "Caguas", "Guaynabo", "Arecibo", "Toa Baja", "Mayagüez", "Trujillo Alto", "Aguadilla", "Fajardo", "Vega Baja", "Humacao", "Manatí", "Yauco", "Cayey", "Cidra", "Coamo", "Barceloneta"],
 ps:["Jerusalem / القدس", "Gaza / غزة", "Ramallah / رام الله", "Hebron / الخليل", "Nablus / نابلس", "Bethlehem / بيت لحم", "Jenin / جنين", "Rafah / رفح", "Khan Yunis / خان يونس", "Tulkarm / طولكرم", "Qalqilya / قلقيلية", "Jericho / أريحا", "Salfit / سلفيت", "Tubas / طوباس", "Beit Jala / بيت جالا", "Beit Sahour / بيت ساحور"],
 pt:["Lisbon / Lisboa", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Almada", "Coimbra", "Funchal", "Setúbal", "Agualva-Cacém", "Queluz", "Rio Tinto", "Aveiro", "Barreiro", "Odivelas", "Guimarães", "Évora", "Faro", "Amora", "Rio de Mouro", "Ermesinde", "Loures", "Ponta Delgada", "Portimão", "Viseu", "Leiria", "Matosinhos", "Vila Franca de Xira", "Águeda", "Viana do Castelo"],
 pw:["Ngerulmud", "Koror", "Meyungs", "Airai", "Melekeok", "Kloulklubed", "Angaur", "Sonsorol"],
 py:["Asunción", "Ciudad del Este", "San Lorenzo", "Luque", "Capiatá", "Lambaré", "Fernando de la Mora", "Nemby", "Encarnación", "Mariano Roque Alonso", "Pedro Juan Caballero", "Villa Elisa", "Concepción", "Villarrica", "Coronel Oviedo", "Pilar"],
 qa:["Doha / الدوحة", "Al Rayyan / الريان", "Al Wakrah / الوكرة", "Al Khor / الخور", "Umm Salal / أم صلال", "Al-Shahaniya / الشحانية", "Dukhan / دخان", "Mesaieed / مسيعيد", "Al Wukair / الوكير", "Al Daayen / الضعاين", "Madinat ash Shamal / مدينة الشمال", "Ar Ru'ays / الرويس"],
 re:["Saint-Denis", "Saint-Paul", "Saint-Pierre", "Le Tampon", "Saint-André", "Saint-Louis", "Saint-Benoît", "Le Port", "Saint-Joseph", "Sainte-Marie", "Sainte-Suzanne", "Petite-Île", "Étang-Salé"],
 ro:["Bucharest / București", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Craiova", "Brașov", "Galați", "Ploiești", "Oradea", "Brăila", "Arad", "Pitești", "Sibiu", "Bacău", "Târgu Mureș", "Baia Mare", "Buzău", "Botoșani", "Satu Mare", "Râmnicu Vâlcea", "Suceava", "Piatra Neamț", "Drobeta-Turnu Severin", "Târgu Jiu", "Târgoviște", "Focșani", "Bistrița", "Reșița"],
 rs:["Belgrade / Београд", "Novi Sad / Нови Сад", "Niš / Ниш", "Kragujevac / Крагујевац", "Subotica / Суботица", "Zrenjanin / Зрењанин", "Pančevo / Панчево", "Čačak / Чачак", "Novi Pazar / Нови Пазар", "Kraljevo / Краљево", "Smederevo / Смедерево", "Leskovac / Лесковац", "Užice / Ужице", "Kruševac / Крушевац", "Vranje / Врање", "Šabac / Шабац", "Sombor / Сомбор", "Požarevac / Пожаревац", "Valjevo / Ваљево", "Zaječar / Зајечар"],
 rw:["Kigali", "Butare", "Gitarama", "Ruhengeri", "Gisenyi", "Cyangugu", "Kibuye", "Nyanza", "Byumba", "Kibungo", "Musanze", "Rwamagana", "Nyagatare", "Muhanga", "Huye"],
 sb:["Honiara", "Auki", "Gizo", "Kirakira", "Buala", "Tulagi", "Lata", "Taro", "Tigoa", "Munda"],
 sc:["Victoria", "Anse Boileau", "Beau Vallon", "Bel Ombre", "Cascade", "Takamaka", "Anse Royale", "La Digue", "Praslin", "Anse Etoile"],
 sd:["Khartoum / الخرطوم", "Omdurman / أم درمان", "Khartoum North / بحري", "Nyala / نيالا", "Port Sudan / بورتسودان", "Kassala / كسلا", "El-Obeid / الأبيض", "Kosti / كوستي", "Wad Madani / ود مدني", "Al-Qadarif / القضارف", "El Fasher / الفاشر", "Sennar / سنار", "Rabak / ربك", "Ed Damer / الدامر", "Geneina / الجنينة", "Dongola / دنقلا", "Atbara / عطبرة"],
 se:["Stockholm", "Gothenburg / Göteborg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå", "Gävle", "Borås", "Södertälje", "Eskilstuna", "Halmstad", "Växjö", "Karlstad", "Sundsvall", "Trollhättan", "Östersund", "Luleå", "Kalmar", "Kristianstad", "Falun", "Skellefteå", "Karlskrona", "Skövde", "Uddevalla", "Motala", "Landskrona", "Nyköping", "Varberg"],
 sg:["Singapore / 新加坡 / சிங்கப்பூர்", "Woodlands", "Tampines", "Jurong East", "Bedok", "Ang Mo Kio", "Bishan", "Bukit Batok", "Choa Chu Kang", "Clementi", "Hougang", "Pasir Ris", "Punggol", "Sengkang", "Serangoon", "Toa Payoh", "Yishun", "Sentosa"],
 sh:["Jamestown", "Georgetown (Ascension)", "Edinburgh of the Seven Seas (Tristan)", "Half Tree Hollow", "Longwood", "Alarm Forest"],
 si:["Ljubljana", "Maribor", "Celje", "Kranj", "Velenje", "Koper", "Novo Mesto", "Ptuj", "Trbovlje", "Kamnik", "Nova Gorica", "Domžale", "Škofja Loka", "Murska Sobota", "Jesenice", "Izola", "Postojna", "Slovenj Gradec", "Piran", "Krško"],
 sj:["Longyearbyen", "Barentsburg", "Ny-Ålesund", "Sveagruva", "Olonkinbyen (Jan Mayen)"],
 sk:["Bratislava", "Košice", "Prešov", "Žilina", "Nitra", "Banská Bystrica", "Trnava", "Trenčín", "Martin", "Poprad", "Prievidza", "Zvolen", "Považská Bystrica", "Michalovce", "Nové Zámky", "Spišská Nová Ves", "Komárno", "Levice", "Humenné", "Bardejov", "Liptovský Mikuláš", "Ružomberok", "Piešťany"],
 sl:["Freetown", "Bo", "Kenema", "Makeni", "Koidu", "Lunsar", "Port Loko", "Kambia", "Segbwema", "Waterloo", "Kabala", "Magburaka", "Moyamba", "Pujehun"],
 sm:["San Marino", "Serravalle", "Borgo Maggiore", "Domagnano", "Fiorentino", "Acquaviva", "Faetano", "Chiesanuova", "Montegiardino"],
 sn:["Dakar", "Touba", "Thiès", "Kaolack", "Saint-Louis", "Mbour", "Rufisque", "Ziguinchor", "Diourbel", "Louga", "Tambacounda", "Tivaouane", "Richard Toll", "Kolda", "Joal-Fadiouth", "Matam", "Bignona", "Podor"],
 so:["Mogadishu / Muqdisho", "Hargeisa / Hargeysa", "Bosaso / Boosaaso", "Berbera", "Kismayo / Kismaayo", "Merca / Marka", "Baidoa / Baydhabo", "Burao / Burco", "Galkayo / Gaalkacyo", "Jamaame", "Beledweyne / Beledweyn", "Garoowe", "Jowhar", "Afgooye", "Erigavo / Ceerigaabo", "Las Anod / Laascaanood"],
 sr:["Paramaribo", "Lelydorp", "Nieuw Nickerie", "Moengo", "Meerzorg", "Nieuw Amsterdam", "Marienburg", "Wageningen", "Albina", "Groningen", "Onverwacht", "Brownsweg", "Totness"],
 ss:["Juba", "Wau", "Malakal", "Yei", "Bor", "Aweil", "Rumbek", "Torit", "Bentiu", "Yambio", "Kuajok", "Kapoeta", "Kajo Keji", "Nasir", "Renk"],
 st:["São Tomé", "Neves", "Santo António", "Trindade", "Santana", "Guadalupe", "Santa Cruz", "Porto Alegre", "São João dos Angolares"],
 sv:["San Salvador", "Soyapango", "Santa Ana", "San Miguel", "Mejicanos", "Nueva San Salvador", "Apopa", "Ilopango", "Delgado", "Sonsonate", "San Marcos", "Ahuachapán", "Zacatecoluca", "Cojutepeque", "Usulután", "Chalchuapa", "Cuscatancingo"],
 sx:["Philipsburg", "Lower Prince's Quarter", "Cul de Sac", "Simpson Bay", "Cole Bay", "Maho", "Little Bay", "Dutch Quarter"],
 sz:["Mbabane", "Manzini", "Lobamba", "Big Bend", "Malkerns", "Nhlangano", "Piggs Peak", "Siteki", "Hluti", "Kwaluseni", "Ezulwini", "Mhlume", "Mankayane"],
 tc:["Cockburn Town", "Providenciales", "Blue Hills", "Kew", "Whitby", "Balfour Town", "Bottle Creek", "Sandy Point"],
 td:["N'Djamena", "Moundou", "Sarh", "Abéché", "Kelo", "Koumra", "Pala", "Am Timan", "Bongor", "Mongo", "Doba", "Ati", "Faya-Largeau", "Mao", "Biltine", "Oum Hadjer", "Bol"],
 tf:["Port-aux-Français", "Alfred Faure", "Martin-de-Viviès"],
 tg:["Lomé", "Sokodé", "Kara", "Kpalimé", "Atakpamé", "Bassar", "Tsévié", "Aného", "Sansanné-Mango", "Dapaong", "Tabligbo", "Notsé", "Vogan", "Bafilo"],
 tj:["Dushanbe / Душанбе", "Khujand / Хуҷанд", "Kulob / Кӯлоб", "Bokhtar / Бохтар", "Istaravshan / Истаравшан", "Konibodom / Конибодом", "Tursunzoda / Турсунзода", "Vahdat / Ваҳдат", "Panjakent / Панҷакент", "Khorugh / Хоруғ", "Isfara / Исфара", "Kanibadam", "Norak / Норак", "Rogun / Роғун"],
 tk:["Nukunonu", "Fakaofo", "Atafu"],
 tl:["Dili", "Baucau", "Maliana", "Suai", "Liquiçá", "Same", "Ainaro", "Manatuto", "Gleno", "Viqueque", "Lospalos", "Ermera", "Aileu", "Pante Macassar", "Oecusse"],
 tm:["Ashgabat / Aşgabat", "Türkmenabat", "Daşoguz", "Mary", "Balkanabat", "Türkmenbaşy", "Bayramaly", "Tejen", "Serdar", "Baharly", "Kaka", "Dashoguz"],
 tn:["Tunis / تونس", "Sfax / صفاقس", "Sousse / سوسة", "Ettadhamen / التضامن", "Kairouan / القيروان", "Bizerte / بنزرت", "Gabès / قابس", "Ariana / أريانة", "Gafsa / قفصة", "La Marsa / المرسى", "Kasserine / القصرين", "Monastir / المنستير", "Ben Arous / بن عروس", "Nabeul / نابل", "Medenine / مدنين", "Béja / باجة", "Zarzis / جرجيس", "Jendouba / جندوبة", "Mahdia / المهدية", "Tozeur / توزر"],
 to:["Nuku'alofa", "Neiafu", "Haveluloto", "Vaini", "Pangai", "'Ohonua", "Hihifo", "Kolonga"],
 tt:["Port of Spain", "San Fernando", "Chaguanas", "Arima", "Point Fortin", "Sangre Grande", "Scarborough", "Tunapuna", "Diego Martin", "Marabella", "Princes Town", "Couva", "Rio Claro", "Siparia"],
 tv:["Funafuti", "Vaiaku", "Asau", "Toga", "Kulia", "Tanrake", "Savave"],
 tw:["Taipei / 台北", "Kaohsiung / 高雄", "Taichung / 台中", "Tainan / 台南", "Taoyuan / 桃園", "Hsinchu / 新竹", "Chiayi / 嘉義", "Keelung / 基隆", "Zhongli / 中壢", "Banqiao / 板橋", "Pingtung / 屏東", "Yilan / 宜蘭", "Hualien / 花蓮", "Yuanlin / 員林", "Douliu / 斗六", "Puli / 埔里", "Taitung / 台東", "Miaoli / 苗栗", "Nantou / 南投", "Changhua / 彰化"],
 tz:["Dodoma", "Dar es Salaam", "Mwanza", "Arusha", "Mbeya", "Morogoro", "Tanga", "Kahama", "Tabora", "Kigoma", "Sumbawanga", "Kasulu", "Songea", "Iringa", "Musoma", "Shinyanga", "Bukoba", "Mtwara", "Singida", "Zanzibar City", "Moshi", "Njombe", "Lindi", "Manyoni", "Bagamoyo"],
 ug:["Kampala", "Nansana", "Kira", "Ssabagabo", "Mbarara", "Mukono", "Njeru", "Gulu", "Lugazi", "Masaka", "Kasese", "Hoima", "Lira", "Mityana", "Mubende", "Jinja", "Entebbe", "Soroti", "Mbale", "Iganga", "Fort Portal", "Arua", "Tororo", "Kabale", "Bushenyi"],
 um:["Uninhabited (US Minor Outlying Islands)"],
 uy:["Montevideo", "Salto", "Ciudad de la Costa", "Paysandú", "Las Piedras", "Rivera", "Maldonado", "Tacuarembó", "Melo", "Mercedes", "Artigas", "Minas", "San José de Mayo", "Durazno", "Florida", "Barros Blancos", "Colonia del Sacramento", "Punta del Este", "Fray Bentos", "Rocha"],
 uz:["Tashkent / Toshkent", "Namangan", "Samarkand / Samarqand", "Andijan / Andijon", "Nukus / Nukus", "Bukhara / Buxoro", "Qarshi", "Kokand / Qoʻqon", "Fergana / Farg'ona", "Margilan / Marg'ilon", "Angren", "Chirchiq", "Jizzakh", "Urgench / Urganch", "Termez / Termiz", "Navoiy", "Zarafshon", "Almalyk / Olmaliq", "Karshi", "Guliston"],
 va:["Vatican City / Città del Vaticano"],
 vc:["Kingstown", "Georgetown", "Byera Village", "Barrouallie", "Layou", "Chateaubelair", "Port Elizabeth (Bequia)", "Calliaqua"],
 ve:["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay", "Ciudad Guayana", "Barcelona", "Maturín", "San Cristóbal", "Ciudad Bolívar", "Cumaná", "Mérida", "Puerto La Cruz", "Petare", "Los Teques", "Cabimas", "Guarenas", "Punto Fijo", "Puerto Cabello", "Coro", "Ocumare del Tuy", "Guanare", "Turmero", "Acarigua", "Guacara"],
 vg:["Road Town", "Spanish Town", "The Valley", "East End", "West End", "Anegada"],
 vi:["Charlotte Amalie", "Christiansted", "Frederiksted", "Cruz Bay", "Coral Bay", "East End"],
 vu:["Port Vila", "Luganville", "Norsup", "Isangel", "Sola", "Lakatoro", "Longana", "Saratamata", "Lenakel"],
 wf:["Mata-Utu", "Leava", "Alo", "Sigave", "Utufua", "Vaitupu"],
 ws:["Apia", "Salelologa", "Faleula", "Vaitele", "Siusega", "Malie", "Vailoa", "Solosolo", "Lufilufi"],
 ye:["Sana'a / صنعاء", "Aden / عدن", "Taiz / تعز", "Hodeidah / الحديدة", "Ibb / إب", "Mukalla / المكلا", "Dhamar / ذمار", "Amran / عمران", "Bajil / باجل", "Bayhan al-Qisab / بيحان القصاب", "Zabid / زبيد", "Sayyan / سيان", "Sa'dah / صعدة", "Marib / مأرب", "Say'un / سيئون", "Ataq / عتق", "Hajjah / حجة"],
 yt:["Mamoudzou", "Koungou", "Dzaoudzi", "Dembeni", "Sada", "Tsingoni", "Bandraboua", "Bouéni", "Chirongui", "Mtsamboro"],
 zm:["Lusaka", "Kitwe", "Ndola", "Kabwe", "Chingola", "Mufulira", "Livingstone", "Luanshya", "Kasama", "Chipata", "Solwezi", "Mongu", "Choma", "Mansa", "Kalulushi", "Kafue", "Chililabombwe", "Chinsali", "Nakonde"],
 zw:["Harare", "Bulawayo", "Chitungwiza", "Mutare", "Gweru", "Kwekwe", "Kadoma", "Masvingo", "Chinhoyi", "Marondera", "Norton", "Zvishavane", "Bindura", "Beitbridge", "Redcliff", "Victoria Falls", "Hwange", "Rusape", "Chiredzi", "Gokwe", "Karoi"]
};
// Fallback: eğer ülke için şehir listesi yoksa serbest yazım kullanıcı input'u devreye girer.

// =================== CITY DROPDOWN (cascading) ===================
function buildCityDD(id, countryCC, selectedCity){
 var el=document.getElementById(id); if(!el) return;
 var cities = CITIES[countryCC] || [];
 // Ülke için şehir listesi yoksa: serbest text input olarak render et
 if(cities.length===0){
   el.className = "dd-freeinput";
   var ph = {tr:"Şehir adını yazın",en:"Type city name",es:"Escribe la ciudad",fr:"Tapez la ville",ar:"اكتب اسم المدينة",ru:"Введите город"};
   el.innerHTML = '<input type="text" class="cityinput" placeholder="'+(ph[LANG]||ph.tr)+'" value="'+(selectedCity||"")+'" style="width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);font-family:var(--sans);font-size:14px;outline:none"/ maxlength="200">';
   return;
 }
 // Şehir listesi var: dropdown olarak render et (buildCountryDD ile aynı stil)
 var sel = selectedCity || cities[0];
 el.className = "dd";
 el.innerHTML =
   '<button class="ddbtn" onclick="event.stopPropagation();toggleDD(\''+escapeJs(id)+'\')" type="button">' +
     '<span class="cc" style="min-width:auto;padding:0 4px">📍</span>' +
     '<span class="lbl2">'+sel+'</span>' +
     '<span class="ar2">▾</span>' +
   '</button>' +
   '<div class="ddlist" id="'+escapeHtml(id)+'-list">' +
     '<div class="ddsearch"><input placeholder="'+(T[LANG].dd_search||"Ara...")+'" oninput="filterCityDD(\''+escapeJs(id)+'\',\''+escapeJs(countryCC)+'\', this.value)"/></div>' +
     '<div id="'+escapeHtml(id)+'-items"></div>' +
   '</div>';
 renderCityItems(id, countryCC, "");
}
function renderCityItems(id, cc, q){
 var cities = (CITIES[cc] || []).slice();
 if(q){var ql=q.toLowerCase(); cities = cities.filter(function(c){return c.toLowerCase().indexOf(ql)!==-1;});}
 cities.sort(function(a,b){return a.localeCompare(b, LANG);});
 var host=document.getElementById(id+"-items"); if(!host) return;
 host.innerHTML = cities.map(function(c){
   var safe = c.replace(/'/g,"\\'");
   return '<a onclick="selectCity(\''+escapeJs(id)+'\',\''+safe+'\')"><span class="ccode">📍</span><span>'+c+'</span></a>';
 }).join("") || '<div style="padding:12px;color:var(--faint);font-size:13px;text-align:center">—</div>';
}
function filterCityDD(id, cc, q){ renderCityItems(id, cc, q); }
function selectCity(id, city){
 // Ülke bilgisini korumak için data-attribute'a bakıyoruz
 var container = document.getElementById(id);
 var cc = container.getAttribute("data-cc") || "tr";
 buildCityDD(id, cc, city);
 container.setAttribute("data-cc", cc);
 container.setAttribute("data-city", city);
 var list = document.getElementById(id+"-list"); if(list) list.classList.remove("open");
}

// =================== HUB LABELS (harita bayrak+isim+tıklanabilir+i18n) ===================
// SVG'deki her hub'a data-cc atanmış. Bunu i18n hook'a bağlıyoruz.
function updateHubLabels(){
 var d = CI[LANG] || CI.tr;
 document.querySelectorAll(".hhero .hubLbl[data-cc]").forEach(function(el){
   var cc = el.getAttribute("data-cc");
   var name = d[cc] || cc.toUpperCase();
   // Kısaltma tercih: 12 karakter üstü ise ülkenin 2-3 harfli kısaltmasına düşür
   var display = name.length > 12 ? cc.toUpperCase() : name.toUpperCase();
   el.textContent = display;
 });
}
// Hub'a tıklanınca ülke filtresini aktive et (o ülkedeki firmalar listelensin)
function initHubClicks(){
 if(window._hubClicksInited) return;
 window._hubClicksInited = true;
 document.querySelectorAll(".hhero .hubLbl[data-cc]").forEach(function(el){
   el.style.cursor = "pointer";
   el.setAttribute("role","button");
   el.setAttribute("tabindex","0");
   var cc = el.getAttribute("data-cc");
   el.addEventListener("click", function(){ hubClick(cc); });
   el.addEventListener("keydown", function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); hubClick(cc); }});
 });
}
function hubClick(cc){
 // Ana firma listesi ülke filtresini bu ülkeye çevir + firma sekmesine kaydır
 try{
   if(typeof CUR_CC !== "undefined"){ CUR_CC = cc; }
   var ddC = document.getElementById("ddCountry"); if(ddC && typeof buildCountryDD === "function"){ buildCountryDD("ddCountry", cc); }
   if(typeof applyFilters === "function"){ applyFilters(); }
   var target = document.querySelector("#firms, #results, .firms-grid, .companies");
   if(target){ target.scrollIntoView({behavior:"smooth", block:"start"}); }
 }catch(err){/* sessiz geç */}
}

function buildCountryDD(id, selected){
 var el=document.getElementById(id); if(!el) return;
 var d=CI[LANG]||CI.tr;
 var selName = d[selected] || d.tr || "Türkiye";
 el.className = "dd";
 el.innerHTML =
   '<button class="ddbtn" onclick="event.stopPropagation();toggleDD(\''+escapeJs(id)+'\')">' +
     '<img src="/flags/'+selected+'.svg" onerror="this.style.visibility=\'hidden\'"/>' +
     '<span class="cc">'+selected.toUpperCase()+'</span>' +
     '<span class="lbl2">'+selName+'</span>' +
     '<span class="ar2">▾</span>' +
   '</button>' +
   '<div class="ddlist" id="'+escapeHtml(id)+'-list">' +
     '<div class="ddsearch"><input placeholder="'+T[LANG].dd_search+'" oninput="filterDD(\''+escapeJs(id)+'\', this.value)"/></div>' +
     '<div id="'+escapeHtml(id)+'-items"></div>' +
   '</div>';
 renderDDItems(id, "");
}
function renderDDItems(id, q){
 var d=CI[LANG]||CI.tr;
 var items = COUNTRIES.map(function(cc){return {cc:cc,nm:d[cc]||cc};});
 items.sort(function(a,b){return a.nm.localeCompare(b.nm,LANG);});
 if(q){var ql=q.toLowerCase(); items=items.filter(function(x){return x.nm.toLowerCase().indexOf(ql)!==-1 || x.cc.indexOf(ql)!==-1;});}
 var host=document.getElementById(id+"-items");
 host.innerHTML = items.map(function(x){
   return '<a onclick="selectCountry(\''+escapeJs(id)+'\',\''+escapeJs(x.cc)+'\')">' +
     '<img src="/flags/'+escapeHtml(x.cc)+'.svg" onerror="this.style.visibility=\'hidden\'"/>' +
     '<span class="ccode">'+escapeHtml(x.cc.toUpperCase())+'</span>' +
     '<span>'+escapeHtml(x.nm)+'</span></a>';
 }).join("");
}
function filterDD(id, q){ renderDDItems(id, q); }
function toggleDD(id){
 document.querySelectorAll(".ddlist").forEach(function(l){if(l.id!==id+"-list")l.classList.remove("open");});
 document.getElementById(id+"-list").classList.toggle("open");
}
function selectCountry(id, cc){
 if(id==="ddCountry"){ CUR_CC = cc; buildCountryDD(id, cc); applyFilters(); }
 else{ buildCountryDD(id, cc); }
 // Firma ekleme formunda ülke değişirse şehri o ülkenin listesine sıfırla
 if(id==="ddAddCountry"){
   var cityEl = document.getElementById("ddAddCity");
   if(cityEl){ cityEl.setAttribute("data-cc", cc); cityEl.removeAttribute("data-city"); buildCityDD("ddAddCity", cc, null); }
 }
 document.getElementById(id+"-list").classList.remove("open");
}
document.addEventListener("click",function(e){
 if(!e.target.closest(".dd")) document.querySelectorAll(".ddlist").forEach(function(l){l.classList.remove("open");});
 if(!e.target.closest(".langwrap")) document.getElementById("lm").classList.remove("open");
});

// =================== SECTOR SELECT ===================
function buildSectorSelect(id, includeAll){
 var el=document.getElementById(id); if(!el) return;
 var secs = SI[LANG] || SI.tr;
 var opts = includeAll ? ['<option value="">'+T[LANG].all_sec+'</option>'] : [];
 secs.forEach(function(s,i){ opts.push('<option value="'+i+'">'+s+'</option>'); });
 el.innerHTML = opts.join("");
}

// =================== LIVE STATS (dynamic + animated counters) ===================
function computeStats(){
 var firms = POS.length;
 var seenC = {}, seenS = {};
 POS.forEach(function(p){ seenC[p.cn_key]=1; seenS[p.sec]=1; });
 return {
   firms: firms,
   countries: (typeof COUNTRIES !== "undefined" && COUNTRIES && COUNTRIES.length) || 249,  // platformun ülke/bölge listesi (ISO 3166)
   sectors: 26,  // full sector coverage
   langs: 6      // TR EN ES FR AR RU
 };
}
function animateCounter(el, target, duration){
 duration = duration || 1400;
 var start = parseInt(el.getAttribute("data-current")||"0",10);
 var startTime = performance.now();
 function frame(now){
   var t = Math.min(1, (now - startTime) / duration);
   // ease-out cubic
   var eased = 1 - Math.pow(1-t, 3);
   var val = Math.round(start + (target - start) * eased);
   el.textContent = val.toLocaleString("tr-TR");
   if(t < 1) requestAnimationFrame(frame);
   else el.setAttribute("data-current", target);
 }
 requestAnimationFrame(frame);
}
function updateStats(animate){
 var s = computeStats();
 var els = document.querySelectorAll("#statsBar [data-stat]");
 els.forEach(function(el){
   var k = el.getAttribute("data-stat");
   var v = s[k] || 0;
   el.setAttribute("data-target", String(v));
   if(animate) animateCounter(el, v);
   else el.textContent = v.toLocaleString("tr-TR");
 });
}
var STATS_ANIMATED = false;
// A rich dropdown showing all 26 sectors. Trigger shows selected sector; panel opens on click.
function toggleSecPick(){
 var el = document.getElementById("secPick");
 if(!el) return;
 el.classList.toggle("open");
 if(el.classList.contains("open")){
   var s = document.getElementById("secSearch"); if(s){ s.value=""; filterSecGrid(""); setTimeout(function(){s.focus();},100); }
 }
}
document.addEventListener("click", function(e){
 var pick = document.getElementById("secPick");
 if(pick && pick.classList.contains("open") && !pick.contains(e.target)){ pick.classList.remove("open"); }
});
function filterSecGrid(q){
 q = (q||"").toLowerCase().trim();
 var chips = document.querySelectorAll("#secStripHero .schip");
 chips.forEach(function(ch){
   var name = (ch.getAttribute("data-name")||"").toLowerCase();
   ch.classList.toggle("hidden", q && name.indexOf(q) < 0 && !ch.classList.contains("all"));
 });
}
function updateSecTrigger(){
 var host = document.getElementById("secPickTrigger");
 if(!host) return;
 var secs = SI[LANG] || SI.tr;
 var t = T[LANG] || T.tr;
 var sInp = document.getElementById("secSearch");
 if(sInp) sInp.placeholder = t.sec_search || "Sektör ara...";
 if(CUR_SEC === "" || CUR_SEC === null){
   host.innerHTML = '<span class="sp-lbl">'+(t.sector_lbl||"Sektör")+'</span>';
 } else {
   var idx = parseInt(CUR_SEC,10);
   var m = getSecMeta(idx);
   host.innerHTML = '<span class="sp-lbl">'+(t.sector_lbl||"Sektör")+'</span><span class="sp-val"><span class="picktile" style="background:'+m.g+'"><div>'+m.i+'</div></span>'+secs[idx]+'</span>';
 }
}
// Render the grid inside the dropdown panel (was: renderSecStrip in horizontal mode)
function renderSecStrip(){
 var el = document.getElementById("secStripHero"); if(!el) return;
 var secs = SI[LANG] || SI.tr;
 var t = T[LANG] || T.tr;
 var html = ['<div class="schip all'+(CUR_SEC===""?" active":"")+'" data-i="-1" data-name="tümü tumu all todos tous جميع все" onclick="filterBySec(\'\')">' +
   '<div class="st"><div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></div></div>' +
   '<div class="sn">'+(t.all_sec_pick||"Tüm sektörler")+'</div></div>'];
 secs.forEach(function(name, idx){
   var m = getSecMeta(idx);
   html.push('<div class="schip'+(String(CUR_SEC)===String(idx)?" active":"")+'" data-i="'+idx+'" data-name="'+name.toLowerCase().replace(/"/g,'')+'" onclick="filterBySec('+idx+')" title="'+name.replace(/"/g,'&quot;')+'">' +
     '<div class="st" style="background:'+m.g+'"><div>'+m.i+'</div></div>' +
     '<div class="sn">'+name+'</div></div>');
 });
 el.innerHTML = html.join("");
 updateSecTrigger();
}
function filterBySec(idx){
 CUR_SEC = String(idx);
 var s = document.getElementById("secSel"); if(s) s.value = CUR_SEC;
 var p = document.getElementById("secPick"); if(p) p.classList.remove("open");
 renderSecStrip();
 renderPositions();
}
// Live preview of selected sector in profile edit form
function renderProfSecChip(){ renderSecChipInto("profSec","profSecChip"); }
function renderAddSecChip(){ renderSecChipInto("addSecSel","addSecChip"); }
function renderSecChipInto(selId, chipId){
 var sel = document.getElementById(selId); var host = document.getElementById(chipId);
 if(!sel || !host) return;
 var idx = parseInt(sel.value, 10);
 if(isNaN(idx)) { host.innerHTML = ""; return; }
 var m = getSecMeta(idx);
 var secs = SI[LANG] || SI.tr;
 host.innerHTML = '<div style="display:inline-flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;background:'+m.c+'12;border:1px solid '+m.c+'40;border-radius:100px">' +
   '<div style="width:32px;height:32px;border-radius:9px;background:'+m.g+';color:#fff;display:flex;align-items:center;justify-content:center"><div style="width:18px;height:18px">'+m.i+'</div></div>' +
   '<span style="font-size:13px;font-weight:600;color:'+m.c+'">'+secs[idx]+'</span>' +
   '</div>';
}

// ================== KİŞİLER (Prospeo-style contact discovery) ==================
var PEOPLE = []; // no demo people: person directory is not backed by real data yet

var REVEALED = { em: {}, ph: {} };
var PPL_FILTER = "all", PPL_QUERY = "";

function initials(nm){ var p=nm.split(" ");return (p[0][0]+(p[p.length-1][0]||"")).toUpperCase(); }
function avatarColor(idx){ var pals=[["#0D8A80","#0A5F56"],["#8b5cf6","#6366f1"],["#c78a2a","#e6a54a"],["#3b82f6","#60a5fa"],["#c94040","#dc6b6b"],["#8a5a2e","#b47a49"],["#7c3aed","#a78bfa"],["#5b7c99","#809bb8"]];return pals[idx%pals.length];}

function renderPeople(){
 var host = document.getElementById("pplBody"); if(!host) return;
 var t = T[LANG] || T.tr;
 var list = PEOPLE.filter(function(p){
   if(PPL_FILTER !== "all" && p.role !== PPL_FILTER) return false;
   if(PPL_QUERY){
     var q = PPL_QUERY.toLowerCase();
     if((p.nm+" "+p.cmp+" "+p.ttl+" "+p.cn).toLowerCase().indexOf(q) < 0) return false;
   }
   return true;
 });
 if(!list.length){ host.innerHTML = '<div style="padding:40px;text-align:center;color:var(--faint);font-size:13px">'+t.ppl_empty+'</div>'; return; }
 host.innerHTML = list.map(function(p, i){
   var col = avatarColor(i);
   // v27: Pro-guard — renderPeople tablosu satırında da katı kilit
   var _isProNow = (typeof isPro === "function") ? isPro() : false;
   var emR = _isProNow && REVEALED.em[p.id];
   var phR = _isProNow && REVEALED.ph[p.id];
   return '<div class="ppl-row">' +
     '<div class="ppl-nm" style="cursor:pointer" onclick="openPersonDrawer(\''+escapeJs(p.id)+'\')"><div class="av" style="background:linear-gradient(135deg,'+col[0]+','+col[1]+')">'+escapeHtml(initials(p.nm))+'</div><div style="min-width:0"><b>'+escapeHtml(p.nm)+'</b><span>'+escapeHtml(p.cn)+'</span></div></div>' +
     '<div class="ppl-cmp col-cmp"><div style="min-width:0"><b><img src="/flags/'+escapeHtml(p.cc)+'.svg" onerror="this.style.display=\'none\'"/>'+escapeHtml(p.cmp)+'</b><span>'+t.ppl_verified+'</span></div></div>' +
     '<div class="ppl-ttl col-ttl">'+escapeHtml(p.ttl)+'</div>' +
     '<div>'+(emR ? '<span class="reveal-btn revealed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'+escapeHtml(p.em)+'</span>' : '<button class="reveal-btn" onclick="event.stopPropagation();revealField(\''+escapeJs(p.id)+'\',\'em\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>'+t.ppl_show_email+'</button>')+'</div>' +
     '<div class="col-phn">'+(phR ? '<span class="reveal-btn revealed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'+escapeHtml(p.ph)+'</span>' : '<button class="reveal-btn" onclick="event.stopPropagation();revealField(\''+escapeJs(p.id)+'\',\'ph\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>'+t.ppl_show_phone+'</button>')+'</div>' +
     '<div class="ppl-act col-act"><button title="'+t.fp_detail+'" onclick="openPersonDrawer(\''+escapeJs(p.id)+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button><button title="'+t.pd_msg+'" onclick="event.stopPropagation();toast(\''+t.pd_msg+'…\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></button></div>' +
   '</div>';
 }).join("");

 // v20: Pro değilse büyük paywall overlay
 if(!isPro()){
   host.classList.add("locked");
   var t2 = T[LANG] || T.tr;
   // Remove old overlay if any
   var oldO = document.getElementById("pplPwOverlay");
   if(oldO) oldO.remove();
   var overlay = document.createElement("div");
   overlay.id = "pplPwOverlay";
   overlay.className = "ppl-paywall-overlay";
   overlay.innerHTML =
     '<div class="ppl-pw-card">' +
       '<div class="ppl-pw-ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>' +
       '<div class="ppl-pw-title">'+(t2.ppl_pw_h||"Karar vericilere doğrudan erişim Pro üyelere açık")+'</div>' +
       '<div class="ppl-pw-sub">'+(t2.ppl_pw_sub||"2.400+ doğrulanmış CEO, satın alma müdürü ve dış ticaret uzmanının e-posta ve telefonuna bir tıkla ulaşın. Her Pro üyeye ayda 100 kredi hediye.")+'</div>' +
       '<div class="ppl-pw-stats">' +
         '<div class="ppl-pw-stat"><div class="n">2.4K</div><div class="l">'+(t2.ppl_pw_stat1||"Karar verici")+'</div></div>' +
         '<div class="ppl-pw-stat"><div class="n">100</div><div class="l">'+(t2.ppl_pw_stat2||"Aylık kredi")+'</div></div>' +
         '<div class="ppl-pw-stat"><div class="n">✓</div><div class="l">'+(t2.ppl_pw_stat3||"Doğrulanmış")+'</div></div>' +
       '</div>' +
       '<button class="ppl-pw-cta" onclick="if(typeof openM===\'function\')openM(\'pay\')">' +
         '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 8 7 2-7 2-3 8-3-8-7-2 7-2 3-8z"/></svg>' +
         (t2.ppl_pw_cta||"Pro'ya Yükselt") +
       '</button>' +
       '<div class="ppl-pw-note">'+(t2.ppl_pw_note||"Aylık $29 · İstediğin zaman iptal")+'</div>' +
     '</div>';
   host.appendChild(overlay);
 } else {
   host.classList.remove("locked");
   var oldO2 = document.getElementById("pplPwOverlay");
   if(oldO2) oldO2.remove();
 }
}

// =================== PERSON DRAWER (Prospeo side sheet) ===================
function openPersonDrawer(id){
 var p = PEOPLE.find(function(x){return x.id===id;}); if(!p) return;
 var i = PEOPLE.indexOf(p);
 var col = avatarColor(i);
 // v27: KATI GARANTI — Pro değilse email/telefon HER KOŞULDA kilitli
 // (REVEALED'a inject edilmiş olsa bile Pro değilse gösterilmez)
 var _isProNow = (typeof isPro === "function") ? isPro() : false;
 var emR = _isProNow && REVEALED.em[p.id];
 var phR = _isProNow && REVEALED.ph[p.id];
 var handle = p.nm.toLowerCase().replace(/[^a-z]+/g,'').substring(0,15);
 var t = T[LANG] || T.tr;
 var roleName = t["role_"+p.role] || p.role;
 document.getElementById("pdHd").innerHTML =
  '<div class="pd-av" style="background:linear-gradient(135deg,'+col[0]+','+col[1]+')">'+escapeHtml(initials(p.nm))+'</div>' +
  '<div class="pd-nm">'+escapeHtml(p.nm)+'</div>' +
  '<div class="pd-ttl">'+escapeHtml(p.ttl)+'</div>' +
  '<div class="pd-cmp"><img src="/flags/'+escapeHtml(p.cc)+'.svg" onerror="this.style.display=\'none\'"/>'+escapeHtml(p.cmp)+' · '+escapeHtml(p.cn)+'</div>' +
  '<div class="pd-tags"><span class="pt">'+escapeHtml(roleName)+'</span><span class="pt">'+t.ppl_verified+'</span><span class="pt">'+t.tm_active+' · '+t.pd_lastseen+' '+t.pd_lastseen_val+'</span></div>';

 // İLETİŞİM BÖLÜMÜ — Pro değilse tek büyük wall; Pro ise gerçek email+telefon (kredi mekaniği).
 var contactSection;
 if(!isPro()){
   contactSection =
     '<div class="pd-sec pd-sec-lock"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>'+t.pd_contact+'</h4>' +
     '<div class="pd-fld pd-fld-mask"><span class="k">'+t.fp_email+'</span><span class="v"><span class="v-blur">'+escapeHtml(maskEmail(p.em))+'</span></span></div>' +
     '<div class="pd-fld pd-fld-mask"><span class="k">'+t.fp_phone+'</span><span class="v"><span class="v-blur">'+escapeHtml(maskPhone(p.ph))+'</span></span></div>' +
     '<div class="pd-fld"><span class="k">'+t.pd_verify_lbl+'</span><span class="v" style="color:var(--verify)">✓ '+t.pd_verified+'</span></div>' +
     '<div class="pd-premium-wall">' +
       '<div class="pd-pw-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>' +
       '<div class="pd-pw-title">'+(t.lock_title||"İletişim bilgileri Pro üyelere açık")+'</div>' +
       '<div class="pd-pw-sub">'+(t.lock_sub||"WhatsApp, telefon, e-posta ve web sitesi Pro üyelik başladığında anında görünür olur.")+'</div>' +
       '<button class="pd-pw-cta" onclick="if(typeof openM===\'function\')openM(\'pay\');else if(typeof upgradeToPro===\'function\')upgradeToPro();">'+(t.lock_cta||"Pro'a Yükselt")+' →</button>' +
     '</div>' +
    '</div>';
 } else {
   contactSection =
    '<div class="pd-sec"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>'+t.pd_contact+'</h4>' +
     '<div class="pd-fld"><span class="k">'+t.fp_email+'</span><span class="v">'+(emR? p.em+'<button class="cp" onclick="copyTxt(\''+escapeJs(p.em)+'\')" title="Copy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>' : '<span class="pd-lock" role="button" tabindex="0" onclick="revealField(\''+escapeJs(p.id)+'\',\'em\');openPersonDrawer(\''+escapeJs(p.id)+'\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();revealField(\''+escapeJs(p.id)+'\',\'em\');openPersonDrawer(\''+escapeJs(p.id)+'\');}" title="'+(t.pd_open_credit||"Aç")+'"><span class="lk-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span><span class="lk-blur">'+escapeHtml(maskEmail(p.em))+'</span><span class="lk-cta">'+(t.pd_open_credit||"Aç · 1 kredi")+'</span></span>')+'</span></div>' +
     '<div class="pd-fld"><span class="k">'+t.fp_phone+'</span><span class="v">'+(phR? p.ph+'<button class="cp" onclick="copyTxt(\''+escapeJs(p.ph)+'\')" title="Copy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>' : '<span class="pd-lock" role="button" tabindex="0" onclick="revealField(\''+escapeJs(p.id)+'\',\'ph\');openPersonDrawer(\''+escapeJs(p.id)+'\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();revealField(\''+escapeJs(p.id)+'\',\'ph\');openPersonDrawer(\''+escapeJs(p.id)+'\');}" title="'+(t.pd_open_credit||"Aç")+'"><span class="lk-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span><span class="lk-blur">'+escapeHtml(maskPhone(p.ph))+'</span><span class="lk-cta">'+(t.pd_open_credit||"Aç · 1 kredi")+'</span></span>')+'</span></div>' +
     '<div class="pd-fld"><span class="k">'+t.pd_verify_lbl+'</span><span class="v" style="color:var(--verify)">✓ '+t.pd_verified+'</span></div>' +
    '</div>';
 }

 document.getElementById("pdBody").innerHTML =
  contactSection +
  '<div class="pd-sec"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'+t.pd_firm+'</h4>' +
   '<div class="pd-fld"><span class="k">'+t.pd_firmname_lbl+'</span><span class="v">'+escapeHtml(p.cmp)+'</span></div>' +
   '<div class="pd-fld"><span class="k">'+t.pd_country_lbl+'</span><span class="v"><img src="/flags/'+escapeHtml(p.cc)+'.svg" onerror="this.style.display=\'none\'" style="width:16px"/>'+escapeHtml(p.cn)+'</span></div>' +
   '<div class="pd-fld"><span class="k">'+t.pd_sector_lbl+'</span><span class="v">'+((SI[LANG]||SI.tr)[p.sec]||"—")+'</span></div>' +
  '</div>' +
  '<div class="pd-sec"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'+t.pd_social+'</h4>' +
   '<div class="pd-social">' +
     '<a onclick="toast(\'LinkedIn: /'+escapeHtml(handle)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>LinkedIn</a>' +
     '<a onclick="toast(\'X: @'+escapeHtml(handle)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>X (Twitter)</a>' +
     '<a onclick="toast(\''+t.fp_visit+'\')"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'+t.fp_visit+'</a>' +
   '</div>' +
  '</div>' +
  '<div class="pd-sec"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'+t.pd_history+'</h4>' +
   '<div class="pd-fld"><span class="k">'+t.pd_joined+'</span><span class="v">'+t.pd_joined_val+'</span></div>' +
   '<div class="pd-fld"><span class="k">'+t.pd_lastseen+'</span><span class="v">'+t.pd_lastseen_val+'</span></div>' +
   '<div class="pd-fld"><span class="k">'+t.pd_response+'</span><span class="v" style="color:var(--verify)">'+t.pd_response_val+'</span></div>' +
  '</div>';

 document.getElementById("pdActs").innerHTML =
  '<button class="btn sec" onclick="toast(\''+t.pd_save+'\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>'+t.pd_save+'</button>' +
  '<button class="btn" onclick="showPanel(\'messages\');closePersonDrawer();toast(\''+t.pd_msg+'…\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'+t.pd_msg+'</button>';

 document.getElementById("pdDrawer").classList.add("open");
 document.getElementById("pdBack").classList.add("open");
 document.body.style.overflow = "hidden";
}
function closePersonDrawer(){
 document.getElementById("pdDrawer").classList.remove("open");
 document.getElementById("pdBack").classList.remove("open");
 document.body.style.overflow = "";
}
function copyTxt(t){
 if(navigator.clipboard){ navigator.clipboard.writeText(t).then(function(){toast(tt("toast_copied","Panoya kopyalandı")+": "+t);}); }
 else toast(tt("toast_copied","Panoya kopyalandı")+": "+t);
}
// Build synthetic people list for a firm profile — reuses PEOPLE if match, else fabricates
function buildFirmPeopleHTML(p){
 var t = T[LANG] || T.tr;
 // First look for matching real people in PEOPLE for this firm
 var pk = (p.nm||"").toLowerCase();
 var real = PEOPLE.filter(function(x){ return x.cmp.toLowerCase().indexOf(pk.split(" ")[0]) >= 0; }).slice(0,3);
 var list = real.length ? real : synthPeopleForFirm(p);
 return list.map(function(person, i){
   var col = avatarColor(i + (p.id ? p.id.charCodeAt(0) : 0));
   return '<div class="fp-p" onclick="openPersonDrawer(\''+escapeJs(person.id)+'\')">' +
     '<div class="av" style="background:linear-gradient(135deg,'+col[0]+','+col[1]+')">'+escapeHtml(initials(person.nm))+'</div>' +
     '<div class="info"><b>'+escapeHtml(person.nm)+'</b><span>'+escapeHtml(person.ttl)+'</span></div>' +
     '<button class="cta">'+(t.fp_detail||"Detay")+' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="9 6 15 12 9 18"/></svg></button>' +
   '</div>';
 }).join("");
}
// Fabricate 2-3 people for firms without real data (still linked to Prospeo drawer via PEOPLE)
function synthPeopleForFirm(p){
 // Add to PEOPLE if not exists so drawer works
 var pkPrefix = "syn-"+(p.id||"x");
 if(!PEOPLE.find(function(x){return x.id===pkPrefix+"-1";})){
   var namePool = {
     tr:[["Emre Kaya","Genel Müdür"],["Zeynep Aydın","Satın Alma Müdürü"],["Ahmet Şahin","İhracat Direktörü"]],
     fi:[["Mikko Virtanen","Toimitusjohtaja"],["Anna Nieminen","Ostopäällikkö"]],
     de:[["Hans Müller","Geschäftsführer"],["Eva Schmidt","Einkaufsleiterin"]],
     fr:[["Pierre Dubois","Directeur Général"],["Marie Laurent","Responsable Achats"]],
     nl:[["Jan de Vries","Directeur"],["Emma Bakker","Inkoop Manager"]],
     it:[["Marco Rossi","Amministratore Delegato"],["Giulia Ferrari","Responsabile Acquisti"]],
     kz:[["Aidos Bekmuratov","Бас директор"],["Elena Nurtay","Сатып алу директоры"]],
     in:[["Rajesh Sharma","Managing Director"],["Priya Nair","Procurement Head"]],
     cn:[["Wei Zhang","总经理"],["Li Chen","采购总监"]],
     ae:[["Ahmed Al-Rashid","Managing Director"],["Fatima Al-Zaabi","Procurement Manager"]],
     ng:[["Adebayo Okonkwo","Managing Director"],["Chioma Eze","Operations Head"]],
     eg:[["Karim Hassan","المدير العام"],["Nour El-Sayed","مدير المشتريات"]],
     za:[["Thabo Molefe","Managing Director"],["Naledi Khumalo","Procurement Head"]],
     us:[["Michael Johnson","CEO"],["Sarah Davis","Head of Procurement"]],
     ca:[["David Wilson","Managing Director"],["Emily Brown","Purchasing Manager"]],
     mx:[["Carlos García","Director General"],["Ana Rodríguez","Jefa de Compras"]],
     br:[["Rafael Silva","Diretor Geral"],["Camila Costa","Gerente de Compras"]]
   };
   var pool = namePool[p.cn_key] || namePool.tr;
   pool.forEach(function(pair, i){
     PEOPLE.push({
       id: pkPrefix+"-"+(i+1),
       nm: pair[0],
       role: i===0?"ceo":"purchasing",
       ttl: pair[1],
       cmp: p.nm,
       cc: p.cn_key,
       cn: (CI[LANG]||CI.tr)[p.cn_key] || p.cn_key,
       sec: p.sec,
       em: pair[0].toLowerCase().replace(/[^a-z]/g,".").replace(/\.+/g,".").replace(/^\.|\.$/g,"")+"@"+(p.nm.toLowerCase().replace(/[^a-z]/g,"").substring(0,15)||"firma")+".com",
       ph: "+"+(Math.floor(Math.random()*90)+10)+" "+(Math.floor(Math.random()*900)+100)+" "+(Math.floor(Math.random()*900)+100)+" "+(Math.floor(Math.random()*90)+10)+" "+(Math.floor(Math.random()*90)+10)
     });
   });
 }
 return PEOPLE.filter(function(x){return x.id.indexOf(pkPrefix)===0;});
}

// =================== EMAIL/PHONE MASKING (blur wrapper içine sahte-benzeri görsel koyar; gerçek değeri HTML kaynağına asla göndermez) ===================
function maskEmail(em){
 if(!em) return "••••••@••••••.•••";
 var at = em.indexOf("@"); if(at<0) return "••••••••••";
 var local = em.substring(0,at), domain = em.substring(at+1);
 // Uzunluk korunur ama karakterler ● ile değiştirilir; blur zaten okunmaz yapıyor, ekstra güvenlik.
 return local.replace(/./g,"●")+"@"+domain.replace(/[^.]/g,"●");
}
function maskPhone(ph){
 if(!ph) return "+•• ••• ••• •• ••";
 return ph.replace(/\d/g,"●");
}

function revealField(id, field){
 // ÜCRETLİ ÜYELİK KAPISI: Pro değilse iletişim asla açılmaz — direkt upgrade modal.
 if(!isPro()){
   var tt = T[LANG] || T.tr;
   toast(tt.lock_title||"İletişim bilgileri Pro üyelere açıktır");
   if(typeof openM==="function") openM("pay"); else if(typeof upgradeToPro==="function") upgradeToPro();
   return;
 }
 var n = parseInt(document.getElementById("creditN").textContent, 10) || 0;
 if(n <= 0){ openM("pay"); toast(tt("toast_credit_out","Kredi bitti — planınızı yükseltin")); return; }
 REVEALED[field][id] = true;
 document.getElementById("creditN").textContent = (n-1);
 var toastMsg = field === "em" ? "E-posta açıldı · 1 kredi kullanıldı" : "Telefon açıldı · 1 kredi kullanıldı";
 toast(toastMsg);
 renderPeople();
}
function pplFilter(el, role){
 document.querySelectorAll(".ppl-fil .fx").forEach(function(f){f.classList.remove("active");});
 el.classList.add("active");
 PPL_FILTER = role;
 renderPeople();
}
function filterPeople(q){ PPL_QUERY = q; renderPeople(); }

function filterMsgList(q){
 q = (q||"").toLowerCase();
 document.querySelectorAll("#msglist .msg-conv").forEach(function(c){
   c.style.display = (c.textContent.toLowerCase().indexOf(q) < 0) ? "none" : "";
 });
}
// =================== MESSAGES (fully functional conversation panel) ===================
var CONVOS = {};

var CUR_CONV = "nordic";

function openConv(id){
 if(!CONVOS[id]) return;
 CUR_CONV = id;
 // Toggle active class on list
 document.querySelectorAll("#msglist .msg-conv, .msg-conv").forEach(function(c){c.classList.remove("on");});
 var clicked = event && event.currentTarget; if(clicked && clicked.classList) clicked.classList.add("on");
 // Update header
 var conv = CONVOS[id];
 var mph = document.querySelector("#msgpane .mp-h");
 if(mph){
   mph.innerHTML =
     '<div class="av" style="background:linear-gradient(135deg,'+escapeHtml(conv.avc[0])+','+escapeHtml(conv.avc[1])+')">'+escapeHtml(conv.av)+'</div>' +
     '<div class="mp-info"><b>'+escapeHtml(conv.nm)+'</b><span>'+tt("chat_online","Çevrimiçi")+' · '+escapeHtml(conv.cn)+' · '+tt("chat_verified_firm","Doğrulanmış firma")+'</span></div>' +
     '<div class="mp-actions">' +
      '<button title="'+tt("chat_btn_firm","Firma profili")+'" onclick="toast(tt(\'toast_firm_opening\',\'Firma profili açılıyor\'))"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></button>' +
      '<button title="'+tt("chat_btn_video","Görüntülü ara")+'" onclick="toast(tt(\'toast_video_call\',\'Görüntülü arama başlatılıyor\'))"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></button>' +
      '<button title="'+tt("chat_btn_archive","Arşivle")+'" onclick="toast(tt(\'toast_chat_archived\',\'Konuşma arşivlendi\'))"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg></button>' +
     '</div>';
 }
 // Update body — render all messages
 var body = document.getElementById("mpBody");
 if(body){
   var t = T[LANG] || T.tr;
   var todayLbl = t.msg_today + " · " + (new Date()).toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"});
   var html = '<div class="mb-day">'+todayLbl+'</div>';
   conv.msgs.forEach(function(m){
     if(m.f === "them"){
       html += '<div class="mb-msg them">';
       if(m.orig) html += '<div class="tr-flag"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>'+escapeHtml(conv.lg)+' → TR · '+t.msg_auto_tr+'</div>';
       html += escapeHtml(m.tr);
       if(m.orig) html += '<div class="mb-orig">"'+escapeHtml(m.orig)+'"</div>';
       html += '<div class="mb-t">'+escapeHtml(m.tm)+' · '+escapeHtml(m.who||"")+'</div>';
       html += '</div>';
     } else {
       html += '<div class="mb-msg me">';
       html += escapeHtml(m.tr);
       if(m.attach){
         html += '<div class="mb-attach"><div class="mb-ai"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div><b>'+escapeHtml(m.attach.name)+'</b><br><span style="font-size:10.5px;opacity:.7">'+escapeHtml(m.attach.size)+'</span></div></div>';
       }
       html += '<div class="mb-t">'+escapeHtml(m.tm)+' · ✓✓ '+t.msg_read+'</div>';
       html += '</div>';
     }
   });
   if(conv.typing){
     html += '<div class="mb-typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span> '+escapeHtml((String(conv.nm).split("·")[1]||conv.nm).trim())+' '+t.msg_typing+'</div>';
   }
   body.innerHTML = html;
   body.scrollTop = body.scrollHeight;
 }
 // Update language bar
 var lgBar = document.querySelector("#msgpane .mp-lang");
 if(lgBar){
   var tl = T[LANG] || T.tr; // not: eski adı 'tt' idi; hoisting ile global tt() fonksiyonunu gölgeleyip openConv'u kırıyordu
   lgBar.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>' +
     (tl.msg_lang_note || "").replace("{lang}","<b>"+escapeHtml(conv.lg_full)+"</b>").replace("Fince","<b>"+escapeHtml(conv.lg_full)+"</b>");
 }
}

function sendMsg(){
 var ta = document.querySelector("#msgpane .mp-input textarea");
 if(!ta || !ta.value.trim() || !CUR_CONV) return;
 if(typeof rateLimit === 'function' && !rateLimit('msg', 20)){ toast('Çok hızlı mesaj gönderiyorsunuz. Lütfen biraz bekleyin.'); return; }
 if(ta.value.length > 4000){ toast('Mesaj en fazla 4000 karakter olabilir.'); return; }
 var txt = ta.value.trim();
 var tm = (new Date()).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
 // Push to data model
 CONVOS[CUR_CONV].msgs.push({f:"me", tr:txt, tm:tm});
 // Also update the conversation list preview
 var convItem = document.querySelector('.msg-conv[onclick*="'+CUR_CONV+'"] .cn-p');
 if(convItem) convItem.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/><polyline points="20 6 9 17 4 12" transform="translate(4)"/></svg> '+escapeHtml(txt.substring(0,40))+(txt.length>40?"…":"");
 ta.value = "";
 // Re-render body
 openConv.currentEvent = null;
 var conv = CONVOS[CUR_CONV];
 var body = document.getElementById("mpBody");
 if(body){
   var t = T[LANG] || T.tr;
   var msg = document.createElement("div");
   msg.className = "mb-msg me";
   msg.innerHTML = escapeHtml(txt) + '<div class="mb-t">'+tm+' · ✓ '+t.msg_sent+'</div>';
   var typing = body.querySelector(".mb-typing");
   if(typing) body.insertBefore(msg, typing); else body.appendChild(msg);
   body.scrollTop = body.scrollHeight;
 }
 toast((T[LANG]||T.tr).msg_sent + " · " + conv.lg_full);
}
// PAYWALL GATE: unauthenticated visitors see first 3 firms clearly, rest are blurred with premium lock.
// Search count is also limited per IP (simulated via localStorage).
var FREE_FIRM_LIMIT = 3;
var FREE_SEARCH_LIMIT = 2;
// Tek doğruluk kaynağı: süreli oturum (kvIsLoggedIn). Eski kv_auth bayrağı tek başına yetki vermez.
function isLoggedIn(){ return (typeof kvIsLoggedIn === "function") && kvIsLoggedIn(); }
function renderPositions(){
 var d=CI[LANG]||CI.tr;
 var secs = SI[LANG] || SI.tr;
 var list = POS.filter(function(p){
   if(DIR && p.dir!==DIR) return false;
   if(CUR_CC && CUR_CC!=="tr" && p.cn_key!==CUR_CC) return false;
   if(CUR_SEC!=="" && String(p.sec)!==String(CUR_SEC)) return false;
   return true;
 });
 var grid=document.getElementById("posgrid");
 document.getElementById("firmCnt").textContent = list.length;
 if(!list.length){ grid.innerHTML='<div class="empty" style="grid-column:1/-1;padding:60px;text-align:center;color:var(--faint)">'+tt("empty_firms","Filtrenize uyan firma bulunamadı.")+'</div>'; return; }
 var authed = isLoggedIn();
 var cardsHTML = list.map(function(p, idx){
   var cn = d[p.cn_key] || p.cn_key;
   var sec = secs[p.sec] || "";
   var sm = getSecMeta(p.sec);
   var dirLbl = p.dir==="EXP" ? T[LANG].dir_exp : T[LANG].dir_imp;
   var locked = !isPro() && idx >= FREE_FIRM_LIMIT;
   // v27: authed yerine isPro() — giriş yapmış free kullanıcı da ilk 3'ten sonrası blur görür.
   var lockBadge = locked ? '<div class="lockbadge" title="Pro üyeler için"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg><span style="font-size:9px;font-weight:700;letter-spacing:.06em;margin-left:4px">PRO</span></div>' : '';
   var lockOverlay = locked ? (
     '<div class="lock-overlay" onclick="upgradeToPro()">' +
       '<div class="lo-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>' +
       '<h4>'+T[LANG].gate_title+'</h4>' +
       '<p>'+T[LANG].gate_sub+'</p>' +
       '<button class="lo-cta" onclick="event.stopPropagation();upgradeToPro()">'+T[LANG].gate_cta+'</button>' +
     '</div>'
   ) : '';
   var clickHandler = locked ? "" : "onclick=\"openFirm('"+escapeJs(p.id)+"')\"";
   // For locked cards, mask company name and country to prevent scraping
   var displayNm = locked ? p.nm.charAt(0) + '•••••••••• '+p.nm.charAt(p.nm.length-1) : p.nm;
   var displayCn = locked ? '•••••••' : cn;
   return '<div class="pc'+(locked?' locked':'')+'" '+clickHandler+' style="cursor:'+(locked?'default':'pointer')+'">' + lockBadge + lockOverlay +
     '<div class="pcbar"><span>'+(locked?'••••':escapeHtml(p.code))+'</span><span class="mid"><span class="uyum">'+escapeHtml(p.uyum)+' '+T[LANG].match_score+'</span></span><span>'+(locked?'••••':escapeHtml(p.dst))+'</span></div>' +
     '<div class="pchead">'+secTileHTML(p.sec, 46, 11)+'<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span class="nm">'+escapeHtml(displayNm)+'</span><span class="side">'+dirLbl+'</span></div>' +
     '<div class="meta"><img src="/flags/'+escapeHtml(p.fc)+'.svg" onerror="this.style.visibility=\'hidden\'"/>'+escapeHtml(displayCn)+' · '+escapeHtml(p.yr)+' · <span style="color:var(--verify)">● '+T[LANG].verified+'</span></div></div></div>' +
     '<div class="tmrow"><span class="sec-chip" style="background:'+sm.c+'18;color:'+sm.c+';padding:3px 9px;border-radius:100px;font-size:11.5px;font-weight:600;display:inline-flex;align-items:center;gap:5px"><span style="width:12px;height:12px;display:inline-flex">'+sm.i+'</span>'+sec+'</span> · <b>'+tt('fl_year','Kuruluş Yılı')+':</b> '+escapeHtml(p.yr)+'</div>' +
     (p.tags?'<div class="pc-tags">'+p.tags.map(function(t){return '<span class="pc-tag">'+(locked?'••••':escapeHtml(t))+'</span>';}).join('')+'</div>':'') +
     '<div class="hsrow"><div><div class="k">HS</div><b>'+(locked?'••••':escapeHtml(p.hs))+'</b></div><div><div class="k">MOQ</div><b>'+(locked?'••••':escapeHtml(p.moq))+'</b></div><div><div class="k">INCOTERM</div><b>'+(locked?'••••':escapeHtml(p.inc))+'</b></div><div><div class="k">'+tt('fp_pay','Ödeme')+'</div><b>'+(locked?'••••':escapeHtml(p.pay))+'</b></div></div>' +
   '</div>';
 }).join("");
 grid.innerHTML = cardsHTML;
}

// =================== FIRM DETAIL MODAL ===================
// ===== NEW: Firm profile as full page (not modal) =====
var CUR_FIRM = null;
function openFirm(pid){
 try{
   var p = POS.find(function(x){return x.id===pid;});
   if(!p){ console.error("openFirm: firma bulunamadı pid="+pid); toast(tt("toast_firm_notfound","Firma bulunamadı")+" ("+pid+")"); return; }
   // Enforce gate for unauthenticated visitors
   if(!isLoggedIn()){
     var views = parseInt(ls("views")||"0",10);
     if(views >= FREE_FIRM_LIMIT){
       openGate("firm_limit");
       return;
     }
     ls("views", String(views+1));
   }
   CUR_FIRM = pid;
   renderFirmPage(p);
   // v25: Sayfa geçişi yerine overlay modal aç
   openFirmModal(pid);
 }catch(err){
   console.error("openFirm HATASI:", err, "pid:", pid);
   toast(tt("toast_firm_error","Firma açılırken hata")+": "+(err.message||err));
 }
}
function openMyProfile(){
 // Preview: build a synthetic "my company" record and render
 var me = {id:"me",nm:"Kervea Ticaret A.Ş.",lg:"KT",fc:"tr",cn_key:"tr",yr:2015,dir:"EXP",sec:10,hs:"5205, 5208, 9403, 4415",moq:"10 ton / 1000 adet",inc:"DAP",pay:"LC",web:"https://kervea.io",tem:"Ahmet Yılmaz",code:"TR",dst:"—",uyum:100,tags:["Pamuk ipliği","Dokuma kumaş","Mobilya","Orman ürünleri"],addr:"Büyükdere Cad. No:123 Levent 34394 Şişli / İstanbul",eml:"info@kervea.io",tel:"+90 212 555 44 33",desc:"2015 yılından bu yana Türkiye ve Batı Afrika koridorunda tekstil, gıda ve orman ürünleri ticareti gerçekleştiriyoruz. 30+ ülkeye ihracat yapıyoruz.",certs:"ISO 9001, ISO 14001, GOTS",socials:{wa:"+90 532 123 45 67",li:"linkedin.com/company/kervea",ig:"@kervea_official",fb:"facebook.com/kervea",tw:"@kervea",yt:"youtube.com/@kervea"},mine:true};
 CUR_FIRM = "me";
 renderFirmPage(me);
 go("firm");
}
function renderFirmPage(p){
 var d=CI[LANG]||CI.tr;
 var secs = SI[LANG] || SI.tr;
 var cn = d[p.cn_key] || p.cn_key;
 var sec = secs[p.sec] || "";
 var dirLbl = p.dir==="EXP" ? T[LANG].dir_exp : T[LANG].dir_imp;
 var t = T[LANG];
 // Sector-based cover class + pattern + icon palette — from global SECTOR_META
 var sm = getSecMeta(p.sec);
 var secColor = sm.c;
 var secIcon = sm.i;
 // Cover class mapping for background gradients (kept for backwards CSS compatibility)
 var s = p.sec;
 var secClass = "";
 if(s>=0 && s<=8){ secClass="s-food"; }
 else if(s===9){ secClass="s-wood"; }
 else if(s>=10 && s<=14){ secClass="s-textile"; }
 else if(s===15){ secClass="s-auto"; }
 else if(s===17 || s===18){ secClass="s-machine"; }
 else if(s===13){ secClass="s-chem"; }
 else if(s===25){ secClass="s-mine"; }
 // SVG cover pattern (dots + diagonal lines) — decorative, deterministic
 var coverPattern = '<svg class="cpat" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
   '<defs>' +
     '<pattern id="dots-'+escapeHtml(p.id)+'" width="24" height="24" patternUnits="userSpaceOnUse">' +
       '<circle cx="12" cy="12" r="1.2" fill="#fff"/>' +
     '</pattern>' +
     '<pattern id="lines-'+escapeHtml(p.id)+'" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">' +
       '<line x1="0" y1="0" x2="0" y2="60" stroke="#fff" stroke-width=".6" opacity=".5"/>' +
     '</pattern>' +
   '</defs>' +
   '<rect width="400" height="220" fill="url(#dots-'+escapeHtml(p.id)+')"/>' +
   '<rect width="400" height="220" fill="url(#lines-'+escapeHtml(p.id)+')"/>' +
   '<g opacity=".35" fill="#fff">' +
     '<circle cx="60" cy="180" r="90" opacity=".08"/>' +
     '<circle cx="340" cy="40" r="60" opacity=".12"/>' +
   '</g></svg>';
 // Social defaults for demo firms without socials — generate plausible handles from firm name
 var soc = p.socials;
 if(!soc){
   var handle = (p.nm||"firma").toLowerCase().replace(/[^a-z0-9]+/g,'').substring(0,20) || "firma";
   var slugFromWeb = p.web?(p.web.replace(/https?:\/\/(www\.)?/,'').split('.')[0]):handle;
   soc = {
     wa: "+"+(Math.floor(Math.random()*90)+10)+" "+(Math.floor(Math.random()*900)+100)+" "+(Math.floor(Math.random()*900)+100)+" "+(Math.floor(Math.random()*90)+10),
     li: "linkedin.com/company/"+slugFromWeb,
     ig: "@"+handle,
     fb: "facebook.com/"+slugFromWeb,
     yt: "youtube.com/@"+handle,
     tw: "@"+handle,
     web: p.web
   };
 }
 // Rich gallery: sector icon in colored gradient tiles with labels
 var galItems = [];
 var galLabels = p.tags || [t.fp_gal1||"Ürün Vitrini",t.fp_gal2||"Üretim Tesisi",t.fp_gal3||"Depo",t.fp_gal4||"Ekip",t.fp_gal5||"Kalite Kontrol",t.fp_gal6||"Sertifikalar"];
 var galBgs = [
   'linear-gradient(135deg,'+secColor+'22,'+secColor+'55)',
   'linear-gradient(135deg,'+secColor+'44,'+secColor+'77)',
   'linear-gradient(45deg,'+secColor+'33,'+secColor+'66)',
   'linear-gradient(135deg,'+secColor+'55,'+secColor+'88)',
   'linear-gradient(180deg,'+secColor+'22,'+secColor+'66)',
   'linear-gradient(90deg,'+secColor+'44,'+secColor+'77)'
 ];
 for(var i=0;i<6;i++){
   galItems.push('<div class="g"><div class="ph3" style="background:'+galBgs[i]+';color:'+secColor+'"><div style="width:38px;height:38px;margin:0 auto 8px;color:'+secColor+';opacity:.85">'+secIcon+'</div>'+escapeHtml(galLabels[i%galLabels.length])+'</div></div>');
 }
 var host = document.getElementById("fpgContent");
 host.innerHTML =
  '<div class="fpcover '+secClass+'">'+coverPattern+'</div>' +
  '<div class="fphead">' +
    '<div class="lgbig" style="background:'+sm.g+';color:#fff;border-color:var(--card);position:relative;padding:0"><div style="width:60%;height:60%;color:#fff">'+secIcon+'</div><span style="position:absolute;bottom:6px;right:8px;font-size:11px;font-family:var(--sans);font-weight:700;background:rgba(0,0,0,.35);padding:2px 6px;border-radius:6px;letter-spacing:.05em">'+escapeHtml(p.lg)+'</span></div>' +
    '<div class="toprow">' +
      '<span class="pill vf">● '+t.verified+'</span>' +
      '<span class="pill '+(p.dir==="EXP"?"exp":"imp")+'">'+dirLbl+'</span>' +
      '<span class="pill" style="background:'+sm.c+'22;color:'+sm.c+';display:inline-flex;align-items:center;gap:5px"><span style="width:12px;height:12px;display:inline-flex">'+sm.i+'</span>'+sec+'</span>' +
      (p.uyum<100?'<span class="pill" style="background:var(--emer);color:#fff">'+escapeHtml(p.uyum)+' '+t.match_score+'</span>':'') +
    '</div>' +
    '<div class="fpname">' +
     '<div>' +
      '<h1>'+escapeHtml(p.nm)+'</h1>' +
      '<div class="taxln">' +
        '<img src="/flags/'+escapeHtml(p.fc)+'.svg" alt="'+escapeHtml(p.fc.toUpperCase())+'"/>' +
        '<span>'+cn+'</span>· '+
        '<span>'+t.since+' '+escapeHtml(p.yr)+'</span>· '+
        '<span class="v">'+t.verified+'</span>' +
      '</div>' +
      '<div class="fpactions">' +
        (soc.web?'<a class="ic web" href="'+escapeHtml(sanitizeUrl(soc.web))+'" target="_blank" rel="noopener noreferrer" title="Web"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></a>':'') +
        (soc.wa?'<a class="ic wa" href="https://wa.me/'+String(soc.wa).replace(/[^\d]/g,'')+'" target="_blank" rel="noopener noreferrer" title="WhatsApp"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Z"/></svg></a>':'') +
        (soc.li?'<a class="ic li" href="https://'+String(soc.li).replace(/https?:\/\//,'')+'" target="_blank" rel="noopener noreferrer" title="LinkedIn"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg></a>':'') +
        (soc.ig?'<a class="ic ig" title="Instagram" onclick="toast(\'Instagram: '+escapeHtml(soc.ig)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>':'') +
        (soc.fb?'<a class="ic fb" title="Facebook" onclick="toast(\'Facebook: '+escapeHtml(soc.fb)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>':'') +
        (soc.tw?'<a class="ic tw" title="X" onclick="toast(\'X: '+escapeHtml(soc.tw)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>':'') +
        (soc.yt?'<a class="ic yt" title="YouTube" onclick="toast(\'YouTube: '+escapeHtml(soc.yt)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>':'') +
      '</div>' +
     '</div>' +
    '</div>' +
  '</div>' +
  '<div class="fpgridmain">' +
   '<div>' +
    '<div class="fpblock">' +
     '<h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'+t.fp_about+'</h3>' +
     '<p>'+escapeHtml(p.desc||t.fp_defaultdesc.replace("{name}",p.nm).replace("{year}",p.yr).replace("{ctr}",cn)+' '+t.fp_defaultdesc2)+'</p>' +
     (p.tags?'<div class="fptags">'+p.tags.map(function(x){return '<span class="tg">'+escapeHtml(x)+'</span>';}).join('')+'</div>':'') +
    '</div>' +

    // People at this firm (link to Kişiler / Prospeo panel)
    '<div class="fpblock">' +
     '<h3 style="display:flex;align-items:center;justify-content:space-between"><span style="display:flex;align-items:center;gap:6px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>'+(t.fp_decisionmakers||"Karar Vericiler")+'</span><span style="background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff;font-size:10px;padding:2px 8px;border-radius:100px;font-weight:700;letter-spacing:.05em">PRO</span></h3>' +
     '<div class="fp-people">'+ buildFirmPeopleHTML(p) +'</div>' +
     '<div style="text-align:center;margin-top:10px"><a onclick="showPanel(\'people\');go(\'panel\')" style="color:var(--teal);cursor:pointer;font-size:12.5px;font-weight:600">'+(t.fp_gotoallppl||"Tüm Kişiler paneline git →")+'</a></div>' +
    '</div>' +

    '<div class="fpblock">' +
     '<h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>'+t.fp_gallery+'</h3>' +
     '<div class="fpgal">'+galItems.join('')+'</div>' +
    '</div>' +

    '<div class="fpblock">' +
     '<h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'+t.fp_trade+'</h3>' +
     '<table class="fptable">' +
      '<tr><td>'+t.fp_sector+'</td><td>'+sec+'</td></tr>' +
      '<tr><td>'+t.fp_hs+'</td><td>'+escapeHtml(p.hs)+'</td></tr>' +
      '<tr><td>'+t.fp_moq+'</td><td>'+escapeHtml(p.moq)+'</td></tr>' +
      '<tr><td>INCOTERM</td><td>'+escapeHtml(p.inc)+'</td></tr>' +
      '<tr><td>'+t.fp_pay+'</td><td>'+escapeHtml(p.pay)+'</td></tr>' +
      '<tr><td>'+t.fp_dir+'</td><td>'+dirLbl+'</td></tr>' +
      (p.certs?'<tr><td>'+t.fp_cert+'</td><td>'+escapeHtml(p.certs)+'</td></tr>':'') +
     '</table>' +
    '</div>' +
   '</div>' +

   '<aside class="fpaside">' +
    '<div class="fpblock">' +
     '<h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'+t.fp_contact+'</h3>' +
     // Free tier: only in-platform Message stays visible
     (!p.mine?'<div class="fpcta"><button class="btn" onclick="startMsg(\''+escapeJs(p.id)+'\')" style="width:100%"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'+t.message+'</button></div>':'') +
     // Own profile: show full CTA row unlocked
     (p.mine?'<div class="fpcta">' +
      (soc.wa?'<a class="btn fpwa" href="https://wa.me/'+String(soc.wa).replace(/[^\d]/g,'')+'" target="_blank" rel="noopener noreferrer"><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Z"/></svg>WhatsApp</a>':'') +
      (soc.web?'<a class="btn sec" href="'+escapeHtml(sanitizeUrl(soc.web))+'" target="_blank" rel="noopener noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'+t.fp_visit+'</a>':'') +
     '</div>' +
     '<table class="fptable">' +
      '<tr><td>'+t.fp_rep+'</td><td>'+escapeHtml(p.tem||"—")+'</td></tr>' +
      '<tr><td>'+t.fp_email+'</td><td>'+escapeHtml(p.eml||"—")+'</td></tr>' +
      '<tr><td>'+t.fp_phone+'</td><td>'+escapeHtml(p.tel||"—")+'</td></tr>' +
      '<tr><td>'+t.fl_address.toUpperCase()+'</td><td>'+escapeHtml(p.addr||"—")+'</td></tr>' +
     '</table>' :
     // Non-mine: locked frosted contact panel
     '<div class="contact-lock">' +
       '<div class="locked-inner">' +
        '<div class="fpcta" style="margin-top:10px">' +
         (soc.wa?'<a class="btn fpwa"><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Z"/></svg>WhatsApp</a>':'') +
         (soc.web?'<a class="btn sec"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'+t.fp_visit+'</a>':'') +
        '</div>' +
        '<table class="fptable">' +
         '<tr><td>'+t.fp_rep+'</td><td>'+escapeHtml(p.tem||"—")+'</td></tr>' +
         '<tr><td>'+t.fp_email+'</td><td>••••••@'+escapeHtml(p.web?p.web.replace(/https?:\/\//,'').split('/')[0]:'domain.com')+'</td></tr>' +
         '<tr><td>'+t.fp_phone+'</td><td>+xx ••• ••• ••</td></tr>' +
        '</table>' +
       '</div>' +
       '<div class="lock-veil" onclick="upgradeToPro()" role="button" tabindex="0">' +
        '<div class="lock-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>' +
        '<div class="lock-title">'+(t.lock_title||"İletişim bilgileri Pro üyelere açık")+'</div>' +
        '<div class="lock-sub">'+(t.lock_sub||"WhatsApp, telefon, e-posta ve web sitesi ödeme yapıldığında anında görünür olur.")+'</div>' +
        '<button class="lock-cta" onclick="event.stopPropagation();upgradeToPro()">'+(t.lock_cta||"Pro'a Yükselt")+' →</button>' +
       '</div>' +
      '</div>') +
    '</div>' +

    // ===== Social Media block (visible without payment — links to public profiles) =====
    '<div class="fpblock">' +
     '<h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'+(t.sec_social_short||"Sosyal Medya")+'</h3>' +
     '<div class="fpsocials">' +
      (soc.li?'<a class="sbtn li" href="https://'+String(soc.li).replace(/^https?:\/\//,'')+'" target="_blank" rel="noopener noreferrer" title="LinkedIn"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>LinkedIn</a>':'') +
      (soc.ig?'<a class="sbtn ig" title="Instagram" onclick="toast(\'Instagram: '+escapeHtml(soc.ig)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>Instagram</a>':'') +
      (soc.fb?'<a class="sbtn fb" title="Facebook" onclick="toast(\'Facebook: '+escapeHtml(soc.fb)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Facebook</a>':'') +
      (soc.yt?'<a class="sbtn yt" title="YouTube" onclick="toast(\'YouTube: '+escapeHtml(soc.yt)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>YouTube</a>':'') +
      (soc.tw?'<a class="sbtn tw" title="X" onclick="toast(\'X: '+escapeHtml(soc.tw)+'\')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>X</a>':'') +
      (soc.web?'<a class="sbtn web" href="'+escapeHtml(sanitizeUrl(soc.web))+'" target="_blank" rel="noopener noreferrer" title="Web"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>Web</a>':'') +
     '</div>' +
    '</div>' +

    '<div class="fpblock">' +
     '<h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'+t.fp_stats+'</h3>' +
     '<div class="fpstat">' +
      '<div class="s"><div class="n">'+(new Date().getFullYear()-p.yr)+'</div><div class="l">'+t.fp_years+'</div></div>' +
      '<div class="s"><div class="n">'+(30+Math.floor(Math.random()*70))+'</div><div class="l">'+t.fp_ctr+'</div></div>' +
     '</div>' +
    '</div>' +
   '</aside>' +
  '</div>';

 // GSAP reveal for firm page — bulletproof
 if(window.gsap){
  var cover = document.querySelector("#firm .fpcover");
  var head = document.querySelector("#firm .fphead");
  var blocks = gsap.utils.toArray("#firm .fpblock");
  if(cover) gsap.fromTo(cover,{autoAlpha:0},{autoAlpha:1,duration:.5,ease:"expo.out"});
  if(head) gsap.fromTo(head,{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.6,delay:.1,ease:"expo.out",clearProps:"transform"});
  blocks.forEach(function(b,i){
   gsap.fromTo(b,{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.5,delay:.2+i*0.08,ease:"expo.out",clearProps:"transform,opacity"});
  });
 }
}

// =================== FILTERS ===================
function setDir(dir, btn){
 DIR = dir;
 document.querySelectorAll(".qf .seg button").forEach(function(b){b.classList.remove("on");});
 btn.classList.add("on");
 renderPositions();
}
function applyFilters(){
 var s=document.getElementById("secSel");
 CUR_SEC = s ? s.value : "";
 renderSecStrip();
 renderPositions();
}
function sortBy(k){
 POS.sort(function(a,b){
   if(k==="uyum") return b.uyum-a.uyum;
   if(k==="yr") return b.yr-a.yr;
   return a.nm.localeCompare(b.nm,LANG);
 });
 renderPositions();
}

// =================== SEARCH / DENE ===================
function runSearch(){
 // Anti-scraping: check search count for anonymous visitors
 if(!bumpSearchCount()) return;
 var q = document.getElementById("qinput").value.toLowerCase();
 if(!q){ renderPositions(); return; }
 // Auto-detect country from keywords in Turkish
 var kw = {finland:"fi",fildişi:"ci",ivory:"ci",kazak:"kz",türk:"tr",alman:"de",fransa:"fr",italya:"it",japon:"jp",çin:"cn",hind:"in",ukr:"ua",dubai:"ae","bae":"ae",brazil:"br",mısır:"eg",mex:"mx",vietnam:"vn",polon:"pl",arjant:"ar",holl:"nl",suudi:"sa",şili:"cl"};
 var dir="EXP";
 for(var k in kw){ if(q.indexOf(k)>-1){ CUR_CC=kw[k]; break; } }
 if(q.indexOf("alıcı")>-1||q.indexOf("almac")>-1||q.indexOf("buyer")>-1) dir="IMP";
 if(q.indexOf("tedarik")>-1||q.indexOf("satıcı")>-1||q.indexOf("supplier")>-1) dir="EXP";
 DIR=dir;
 // Refresh UI
 buildCountryDD("ddCountry", CUR_CC);
 document.querySelectorAll(".qf .seg button").forEach(function(b,i){b.classList.toggle("on", (i===0&&dir==="EXP")||(i===1&&dir==="IMP"));});
 renderPositions();
 toast(tt("toast_search_applied","Arama uygulandı"));
}
function quickTry(q){ document.getElementById("qinput").value = q; runSearch(); }

// =================== STEPPER ===================
var CS=1;
function stp(n){
 var MAX=6;
 if(n===-1) CS=Math.max(1,CS-1);
 else if(n===0) CS=Math.min(MAX,CS+1);
 else CS=n;
 // Update new premium stepper nodes
 // v23: Alt nav progress göstergesi + labelin sync
 try {
   var stepLabels = {1:"s1",2:"s2",3:"s3_media",4:"s4_social",5:"s5_doc",6:"s6_pub"};
   var _tt = (typeof T !== "undefined" && T[LANG]) ? T[LANG] : {};
   var elCur = document.getElementById("snpNumCur"); if(elCur) elCur.textContent = String(CS);
   var elLbl = document.getElementById("snpNumLbl");
   if(elLbl){
     var lblKey = stepLabels[CS] || "s1";
     elLbl.textContent = _tt[lblKey] || lblKey;
     elLbl.setAttribute("data-i18n", lblKey);
   }
   var elBar = document.getElementById("snpBarFill");
   if(elBar) elBar.style.width = ((CS / 6) * 100).toFixed(2) + "%";
   // Önceki butonu: 1. adımda disabled
   var elPrev = document.getElementById("snpPrevBtn");
   if(elPrev){ elPrev.disabled = (CS <= 1); }
   // Son adımda "Sonraki" → "Yayınla" + altın buton
   var elNext = document.getElementById("snpNextBtn");
   var elNextTxt = document.getElementById("snpNextTxt");
   if(elNext && elNextTxt){
     if(CS >= 6){
       elNext.classList.add("is-final");
       elNextTxt.textContent = _tt.step_publish || "Yayınla";
       elNextTxt.setAttribute("data-i18n","step_publish");
     } else {
       elNext.classList.remove("is-final");
       elNextTxt.textContent = _tt.step_next || "Sonraki";
       elNextTxt.setAttribute("data-i18n","step_next");
     }
   }
 } catch(e){ /* silent */ }
 var nodes = document.querySelectorAll(".stp-progress .stp-node");
 nodes.forEach(function(node, i){
   node.classList.remove("active","done");
   if(i < CS-1) node.classList.add("done");
   if(i === CS-1) node.classList.add("active");
   var cir = node.querySelector(".st-cir");
   if(cir){
     if(i < CS-1) cir.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
     else cir.textContent = (i+1);
   }
 });
 // Update progress fill (5 segments between 6 nodes)
 var fill = document.getElementById("stpFill");
 if(fill && nodes.length){
   var pctSegments = (CS - 1) / (nodes.length - 1);
   fill.style.width = "calc(("+pctSegments+") * (100% - 44px))";
 }
 var prog = document.getElementById("stpProg"); if(prog) prog.setAttribute("data-step", String(CS));
 // Legacy compatibility (in case some old .stp elements exist)
 document.querySelectorAll(".stepper .stp").forEach(function(s,i){s.classList.toggle("on",i<CS);});
 document.querySelectorAll(".panelstep").forEach(function(s,i){s.classList.toggle("on",i===CS-1);});
 var form=document.querySelector(".form"); if(form) form.scrollIntoView({behavior:"smooth",block:"start"});
}

// =================== NEW HELPERS ===================
function applyPromo(id){
 var el=document.getElementById(id); if(!el) return;
 var code = el.value.trim().toUpperCase();
 var valid = {"LAUNCH25":"%25","KERVEA2026":"%30","EARLY50":"%50"};
 if(valid[code]){ toast(code+" · "+valid[code]+" indirim uygulandı ✓"); el.style.borderColor="var(--verify)"; }
 else if(code){ toast(tt("toast_invalid_promo","Geçersiz promosyon kodu")); el.style.borderColor="#d97757"; }
}
function setBill(mode, btn){
 document.querySelectorAll("#billTog button").forEach(function(b){b.classList.remove("on");});
 btn.classList.add("on");
 document.querySelectorAll(".prv").forEach(function(el){
   el.textContent = "$"+el.getAttribute("data-"+mode);
 });
}
// Payment modal state
var PAY_MODE = "m", PAY_DISCOUNT = 0, PAY_DISCOUNT_CODE = "";
// Credit card live preview helpers
function ccFormat(input){
 var v = input.value.replace(/\s+/g,'').replace(/[^0-9]/gi,'');
 var parts = [];
 for(var i=0;i<v.length;i+=4) parts.push(v.substr(i,4));
 input.value = parts.join(' ');
 var prev = document.getElementById('ccNum');
 if(prev){
  var display = v.padEnd(16,'•').substr(0,16);
  var groups = [];
  for(var j=0;j<16;j+=4) groups.push(display.substr(j,4));
  prev.textContent = groups.join(' ').replace(/•/g,'•');
 }
}
function ccNamePrev(input){
 input.value = input.value.toUpperCase();
 var prev = document.getElementById('ccName');
 if(prev) prev.textContent = input.value || 'AD SOYAD';
}
function ccExpFormat(input){
 var v = input.value.replace(/\s+/g,'').replace(/[^0-9]/gi,'');
 if(v.length > 2) v = v.substr(0,2) + '/' + v.substr(2,2);
 input.value = v;
 var prev = document.getElementById('ccExp');
 if(prev) prev.textContent = v || '••/••';
}
function setPayBill(mode, btn){
 PAY_MODE = mode;
 document.querySelectorAll("#payBill button").forEach(function(b){b.classList.remove("on");});
 btn.classList.add("on");
 var per = document.getElementById("payPer");
 if(per) per.textContent = mode==="m" ? "/ay" : "/ay (yıllık faturalı)";
 recalcPay();
}
function applyPayPromo(){
 var el = document.getElementById("payPromo"); if(!el) return;
 var code = el.value.trim().toUpperCase();
 var valid = {"LAUNCH25":25,"KERVEA2026":30,"EARLY50":50};
 if(valid[code]){
   PAY_DISCOUNT = valid[code]; PAY_DISCOUNT_CODE = code;
   el.style.borderColor = "var(--verify)";
   toast(code+" · %"+valid[code]+" indirim uygulandı ✓");
 } else if(code){
   PAY_DISCOUNT = 0; PAY_DISCOUNT_CODE = "";
   el.style.borderColor = "#d97757";
   toast(tt("toast_invalid_promo","Geçersiz promosyon kodu"));
 } else {
   PAY_DISCOUNT = 0; PAY_DISCOUNT_CODE = "";
 }
 recalcPay();
}
function recalcPay(){
 // Pro plan base: $349/mo, $279/mo when yearly (billed annually)
 var base = PAY_MODE==="m" ? 349 : 279;
 var disc = base * (PAY_DISCOUNT/100);
 var afterDisc = base - disc;
 var kdv = afterDisc * 0.20;
 var total = afterDisc + kdv;
 var fmt = function(n){ return "$"+n.toFixed(2); };
 var sub = document.getElementById("paySub"); if(sub) sub.textContent = fmt(base);
 var kdvEl = document.getElementById("payKdv"); if(kdvEl) kdvEl.textContent = fmt(kdv);
 var discRow = document.getElementById("payDiscRow"), discEl = document.getElementById("payDisc");
 if(discRow && discEl){
   if(PAY_DISCOUNT>0){ discRow.style.display = "flex"; discEl.textContent = "−"+fmt(disc)+" ("+PAY_DISCOUNT_CODE+")"; }
   else { discRow.style.display = "none"; }
 }
 var totEl = document.getElementById("payTotal"); if(totEl) totEl.textContent = fmt(total);
 var btnEl = document.getElementById("payBtnTotal"); if(btnEl) btnEl.textContent = fmt(total);
}
function ovRange(el, days){
 document.querySelectorAll(".ovhead .rr span").forEach(function(s){s.classList.remove("on");});
 el.classList.add("on");
 toast(days+" günlük görünüm uygulandı");
}
function previewGallery(ev, targetId){
 var files = ev.target.files; if(!files.length) return;
 var host = document.getElementById(targetId||"addGalPrev"); if(!host) return;
 for(var i=0; i<Math.min(files.length,12); i++){
   (function(f){
     var r = new FileReader();
     r.onload = function(){
       var div = document.createElement("div");
       div.className = "thumb";
       div.innerHTML = '<img src="'+r.result+'"/><span class="del" onclick="this.parentNode.remove()">×</span>';
       host.appendChild(div);
     };
     r.readAsDataURL(f);
   })(files[i]);
 }
 ev.target.value = "";
 toast(files.length+" görsel eklendi");
}
function uploadAddLogo(ev){
 var f = ev.target.files[0]; if(!f) return;
 var r = new FileReader();
 r.onload = function(){document.getElementById("addLogoBox").innerHTML='<img src="'+r.result+'" style="width:100%;height:100%;object-fit:cover"/>'; toast(tt("toast_logo_uploaded","Logo yüklendi"));};
 r.readAsDataURL(f);
}

// =================== MODALS ===================
function openM(k){
 var m=document.getElementById("m"+k.charAt(0).toUpperCase()+k.slice(1));
 if(m) m.classList.add("open");
 if(k==="pay" && typeof recalcPay==="function") recalcPay();
}
function closeM(k){var m=document.getElementById("m"+k.charAt(0).toUpperCase()+k.slice(1)); if(m)m.classList.remove("open"); if(k==="pay" && typeof kvWipeCardFields==="function") kvWipeCardFields();}

// =================== TOAST ===================
function toast(t){var el=document.getElementById("tst");el.textContent=t;el.classList.add("on");setTimeout(function(){el.classList.remove("on");},2200);}

// ================ PAYWALL / PRO UPGRADE ================
function upgradeToPro(){ closeM("gate"); go("pricing"); openM("pay"); }
// Önceden tek tıkla, hiçbir kimlik kontrolü olmadan "tam erişim" veriyordu. Artık giriş ekranına götürür.
function loginNow(){ closeM("gate"); go("login"); }
function getSearchCount(){ return parseInt(ls("kv_scnt")||"0", 10); }
function bumpSearchCount(){
 var n = getSearchCount() + 1;
 ls("kv_scnt", String(n));
 if(!isLoggedIn() && n > FREE_SEARCH_LIMIT){
   openGate("search");
   return false;
 }
 return true;
}
function openGate(reason){
 var m = document.getElementById("mGate");
 var body = document.getElementById("gateBody");
 if(!m || !body) return;
 var msg = reason === "search"
   ? {h:"Ücretsiz arama limiti doldu", p:"Kayıtsız ziyaretçiler günde <b>2 arama</b> yapabilir. Ücretsiz üye olarak arama limitini kaldırın; Pro üyelikle sınırsız kullanın."}
   : {h:"Devamını görmek için üye olun", p:"Kayıtsız ziyaretçiler ilk <b>3 firma</b>yı görüntüleyebilir. Ücretsiz üyelikle 25+ firmaya, Pro ile tüm ağa erişin."};
 body.innerHTML =
   '<div class="gm-hero"><div class="ic"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div><h3>'+msg.h+'</h3><p>'+msg.p+'</p></div>' +
   '<div style="padding:18px 24px 24px">' +
     '<button class="btn lg" style="width:100%;margin-bottom:10px" onclick="loginNow()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" style="display:inline;vertical-align:middle;margin-right:6px"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>Ücretsiz Üye Ol / Giriş Yap</button>' +
     '<button class="btn lg sec" style="width:100%" onclick="upgradeToPro()"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display:inline;vertical-align:middle;margin-right:6px"><path d="M12 2l3 8 7 2-7 2-3 8-3-8-7-2 7-2 3-8z"/></svg>Pro\'ya Yükselt — Sınırsız Erişim</button>' +
     '<div style="text-align:center;margin-top:16px;font-size:12px;color:var(--faint);line-height:1.6">' +
       '<div style="margin-bottom:4px"><b style="color:var(--verify)">Ücretsiz üyelik:</b> 25 firma, günde 10 arama, temel eşleştirme</div>' +
       '<div><b style="color:var(--teal)">Pro:</b> Sınırsız firma, iletişim bilgisi, gelişmiş eşleştirme, dışa aktarım</div>' +
     '</div>' +
   '</div>';
 m.classList.add("open");
}

// ================ VISITS / PROFILE VIEWERS (simulated real data) ================
// In production these come from server-side IP geolocation + auth session logs.
// Here we build a plausible pool of profile visits to demo the UX.
var VISITS = []; // profile-view analytics are not collected yet
// Localize "X gün/saat önce" for the current lang
function relTime(mins){
 var Ls={tr:{h:"saat önce",d:"gün önce",w:"hafta önce"},en:{h:"h ago",d:"d ago",w:"w ago"},es:{h:"hace h",d:"hace d",w:"hace sem"},fr:{h:"il y a h",d:"il y a j",w:"il y a sem"},ar:{h:"قبل ساعة",d:"قبل يوم",w:"قبل أسبوع"},ru:{h:"ч назад",d:"д назад",w:"нед назад"}};
 var L=Ls[LANG]||Ls.tr;
 if(mins<60) return mins+" min";
 if(mins<1440) return Math.round(mins/60)+" "+L.h;
 if(mins<10080) return Math.round(mins/1440)+" "+L.d;
 return Math.round(mins/10080)+" "+L.w;
}

function openProfileViewers(){
 var d=CI[LANG]||CI.tr;
 var modal=document.getElementById("viewersModal");
 if(!modal){
   modal=document.createElement("div");
   modal.id="viewersModal";
   modal.className="modal-backdrop";
   var tt = T[LANG] || T.tr;
   modal.innerHTML='<div class="modal-card"><button class="modal-x" onclick="closeViewers()">✕</button><h2 style="font-family:var(--serif);font-size:22px;margin-bottom:4px;color:var(--ink)">'+(tt.viewers_h||"Profilini Görüntüleyenler")+'</h2><p style="color:var(--faint);font-size:13px;margin-bottom:14px">'+(tt.viewers_sub||"IP adresine göre ülke tespit edildi · Son 30 gün")+'</p><div id="viewersList"></div></div>';
   document.body.appendChild(modal);
   modal.addEventListener("click",function(e){if(e.target===modal) closeViewers();});
 }
 var host=modal.querySelector("#viewersList");
 host.innerHTML = VISITS.map(function(v){
   return '<div class="viewer-row" onclick="toast(\''+escapeJs(v.nm)+' — '+escapeJs(v.ip)+' ('+escapeJs(d[v.cc]||v.cc)+')\')">' +
    '<div class="v-flag"><img src="/flags/'+escapeHtml(v.cc)+'.svg"/></div>' +
    '<div class="v-info"><div class="v-nm">'+escapeHtml(v.nm)+'</div><div class="v-ln">'+(d[v.cc]||v.cc)+' · '+escapeHtml(v.city)+' · IP '+escapeHtml(v.ip)+'</div></div>' +
    '<div class="v-tm">'+relTime(v.tsMin)+'</div>' +
   '</div>';
 }).join("");
 modal.classList.add("open");
}
function closeViewers(){var m=document.getElementById("viewersModal"); if(m) m.classList.remove("open");}
// Country distribution derived from VISITS (real IP-based)
function computeCountryDistribution(){
 var counts={};
 VISITS.forEach(function(v){counts[v.cc]=(counts[v.cc]||0)+1;});
 var total = VISITS.length;
 var arr = Object.keys(counts).map(function(cc){return {cc:cc, n:counts[cc], pct:Math.round(counts[cc]/total*100)};});
 arr.sort(function(a,b){return b.n-a.n;});
 return arr.slice(0,6);
}
function renderCountryDistribution(){
 var host=document.getElementById("ctrDist"); if(!host) return;
 var d=CI[LANG]||CI.tr;
 var arr=computeCountryDistribution();
 var palette=["var(--teal)","var(--emer)","#3E8570","#8FE9C4","#c78a2a","#5A8FD8"];
 host.innerHTML = arr.map(function(r,i){
   return '<div><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px"><span><img src="/flags/'+escapeHtml(r.cc)+'.svg" style="width:14px;height:10px;vertical-align:middle;border-radius:1px"/> '+(d[r.cc]||r.cc)+'</span><b style="color:var(--ink)">'+r.pct+'%</b></div><div style="height:6px;background:var(--paper);border-radius:100px;overflow:hidden"><div style="width:'+r.pct+'%;height:100%;background:'+palette[i%palette.length]+'"></div></div></div>';
 }).join("");
}

// =================== SSO / LOGIN ===================
// (ssoLogin ve doLogin kaldırıldı: parola sormadan oturum açan, hiçbir yerden çağrılmayan eski fonksiyonlardı.)
function doLogout(){lsR("user");lsR("provider");lsR("kv_auth");lsR("kv_scnt");USER=null;toast(tt("toast_logout","Çıkış yapıldı"));setTimeout(function(){go("home");renderPositions();},400);}

// v20: Credit purchase functions
function selectCredPack(el){
  var packs = document.querySelectorAll(".creds-pack");
  packs.forEach(function(p){ p.classList.remove("selected"); });
  el.classList.add("selected");
  var pack = el.getAttribute("data-pack");
  var price = el.getAttribute("data-price");
  var elP = document.getElementById("credSelPack"); if(elP) elP.textContent = pack;
  var elPr = document.getElementById("credSelPrice"); if(elPr) elPr.textContent = price;
  var elBp = document.getElementById("credBuyPrice"); if(elBp) elBp.textContent = price;
}
function getCredits(){
  var v = ls("credits");
  if(v === null || v === undefined || v === "") return 47; // default demo
  var n = parseInt(v, 10);
  return isNaN(n) ? 47 : n;
}
function setCredits(n){
  ls("credits", String(Math.max(0, n)));
  var elN = document.getElementById("creditN"); if(elN) elN.textContent = String(n);
  var elBal = document.getElementById("credCurrentBal"); if(elBal) elBal.textContent = String(n);
}
function proceedToCredsCheckout(){
  var sel = document.querySelector(".creds-pack.selected");
  if(!sel){ toast(tt("creds_pick_pack","Bir paket seçin")); return; }
  var pack = sel.getAttribute("data-pack");
  var price = sel.getAttribute("data-price");
  var s1 = document.getElementById("credsStep1"); if(s1) s1.style.display = "none";
  var s2 = document.getElementById("credsStep2"); if(s2) s2.style.display = "block";
  var elP = document.getElementById("credCoPack"); if(elP) elP.textContent = pack;
  var elPr = document.getElementById("credCoPrice"); if(elPr) elPr.textContent = price;
  var elBp = document.getElementById("credCoBtnPrice"); if(elBp) elBp.textContent = price;
}
function backToCredsPack(){
  var s1 = document.getElementById("credsStep1"); if(s1) s1.style.display = "block";
  var s2 = document.getElementById("credsStep2"); if(s2) s2.style.display = "none";
}
function formatCardNo(input){
  var v = input.value.replace(/[^0-9]/g,'').substr(0,16);
  var groups = [];
  for(var j=0;j<v.length;j+=4) groups.push(v.substr(j,4));
  input.value = groups.join(' ');
}
function formatExp(input){
  var v = input.value.replace(/[^0-9]/g,'');
  if(v.length > 2) v = v.substr(0,2) + '/' + v.substr(2,2);
  input.value = v;
}
function validateCardInputs(cardNo, name, exp, cvc){
  var digits = (cardNo||"").replace(/\s+/g,'');
  if(digits.length < 13){ toast(tt("pay_err_card","Geçerli kart numarası girin")); return false; }
  if(!name || name.trim().length < 3){ toast(tt("pay_err_name","Kart sahibinin adını girin")); return false; }
  if(!/^\d{2}\/\d{2}$/.test(exp||"")){ toast(tt("pay_err_exp","Son tarihi AA/YY olarak girin")); return false; }
  if((cvc||"").length < 3){ toast(tt("pay_err_cvc","CVC girin")); return false; }
  return true;
}
function completeCreditsPurchase(){
  var cardNo = document.getElementById("credCoCardNo").value;
  var name   = document.getElementById("credCoName").value;
  var exp    = document.getElementById("credCoExp").value;
  var cvc    = document.getElementById("credCoCvc").value;
  if(!validateCardInputs(cardNo, name, exp, cvc)) return;
  var pack = parseInt(document.getElementById("credCoPack").textContent, 10);
  var price = parseInt(document.getElementById("credCoPrice").textContent, 10);
  // Simülasyon: gerçek Stripe entegrasyonu backend gerektirir
  var cur = getCredits();
  setCredits(cur + pack);
  closeM("credits");
  // Reset for next open
  backToCredsPack();
  document.getElementById("credCoCardNo").value = "";
  document.getElementById("credCoName").value = "";
  document.getElementById("credCoExp").value = "";
  document.getElementById("credCoCvc").value = "";
  toast("✓ "+pack+" "+tt("creds_added","kredi eklendi")+" · $"+price+" "+tt("creds_charged","tahsil edildi"));
}
// v21: PRO AKTİVASYON — pay modal 'Öde' butonunun çağırdığı ana fonksiyon
function activatePro(){
  // v22 FIX: Doğru DOM ID'leri (ccInput, ccExpInput, ccCvcInput, ccNameInput)
  var cardNoEl = document.getElementById("ccInput");
  var expEl    = document.getElementById("ccExpInput");
  var cvcEl    = document.getElementById("ccCvcInput");
  var nameEl   = document.getElementById("ccNameInput");
  // Kart validasyonu ZORUNLU — ödeme yapılmadan geçilmez
  if(!cardNoEl || !expEl || !cvcEl || !nameEl){
    toast("Ödeme formu yüklenemedi. Sayfayı yenileyin.");
    return;
  }
  var cardNo = cardNoEl.value || "";
  var exp    = expEl.value || "";
  var cvc    = cvcEl.value || "";
  var name   = nameEl.value || "";
  if(!validateCardInputs(cardNo, name, exp, cvc)) return;
  // Simüle işlem — küçük gecikme (gerçek Stripe hissi için)
  var payBtn = document.querySelector("#mPay button.btn.lg");
  if(payBtn){ payBtn.disabled = true; payBtn.style.opacity = "0.7"; payBtn.innerHTML = "<span>İşleniyor…</span>"; }
  setTimeout(function(){
    if(payBtn){ payBtn.disabled = false; payBtn.style.opacity = "1"; }
    _finishActivatePro();
  }, 700);
}
function _finishActivatePro(){
  // USER objesini oluştur ya da güncelle
  if(!USER){ USER = { name:"Kervea Ticaret", email:"info@kervea.io", provider:"card" }; }
  USER.plan = "pro";
  // Persist
  ls("user", JSON.stringify(USER));
  ls("plan", "pro");
  ls("kv_auth", "1");
  // Pro hediye: +100 kredi
  var cur = getCredits();
  setCredits(cur + 100);
  // Modal kapat + toast
  closeM("pay");
  closeM("gate");
  toast("✓ " + tt("toast_pay_success","Ödeme başarılı — Pro aktif") + " · +100 " + tt("creds_lbl","Kredi"));
  // Refresh tüm paywall-etkilenen görünümleri
  try {
    if(typeof renderPeople === "function") renderPeople();
    if(typeof renderPositions === "function") renderPositions();
    if(typeof renderSecStrip === "function") renderSecStrip();
    // Person drawer açıksa yenile
    var pd = document.querySelector(".pd-overlay.open");
    if(pd) pd.classList.remove("open");
  } catch(e){ console.warn("[v21] Refresh error:", e); }
}
// v21: Page load'da plan'ı localStorage'dan oku
document.addEventListener("DOMContentLoaded", function(){
  try {
    var savedUser = ls("user");
    var savedPlan = ls("plan");
    if(savedUser){
      try { USER = JSON.parse(savedUser); } catch(e){ USER = null; }
    }
    if(savedPlan === "pro" || savedPlan === "enterprise"){
      USER = USER || { name:"Kervea Ticaret", email:"info@kervea.io" };
      USER.plan = savedPlan;
    }
  } catch(e){ /* silent */ }
});

// Overview credit badge'i başlangıçta güncelle
document.addEventListener("DOMContentLoaded", function(){
  var cur = getCredits();
  var elN = document.getElementById("creditN"); if(elN) elN.textContent = String(cur);
});



// v32: Prospectus use-case seçimi
function selectProspTarget(el, target){
  window._prospTarget = target;
  var siblings = el.parentElement.querySelectorAll('.prosp-uc-tile');
  siblings.forEach(function(s){ s.setAttribute('data-selected','false'); });
  el.setAttribute('data-selected','true');
}
window._prospTarget = 'meetings'; // default

// v28: Modal'dan tam firma sayfasına geçiş
// fpgContent'i orijinal #firm .wrap içine geri taşı, sonra go('firm') ile normal sayfa aç
function openFirmFullPage(pid){
  // 1) fpgContent'i geri taşı (kapanış manevrası)
  var fpg = document.getElementById("fpgContent");
  var firmSection = document.getElementById("firm");
  if(fpg && firmSection){
    var wrap = firmSection.querySelector(".wrap");
    if(wrap && fpg.parentElement !== wrap){
      wrap.appendChild(fpg);
    }
  }
  // 2) Modal'ı kapat (hash da temizlensin)
  var modal = document.getElementById("firmModal");
  if(modal){
    modal.classList.remove("open");
    document.body.classList.remove("fm-open");
  }
  try {
    if(location.hash.indexOf("#firm-") === 0){
      history.replaceState({}, "", location.pathname + location.search);
    }
  } catch(e){}
  // 3) Tam sayfaya geç
  if(typeof go === "function") go("firm");
  // 4) Sayfayı tepeye kaydır
  window.scrollTo({top:0, behavior:"smooth"});
}


// v28: Marquee dünya şehirleri — 6 dilde yerelleştirilir
var MARQUEE_CITIES = {
  tr: ["İSTANBUL","BARSELONA","LONDRA","FRANKFURT","DUBAİ","ŞANGAY","TOKYO","NEW YORK","SAN FRANCISCO","SÃO PAULO","LAGOS","MOSKOVA"],
  en: ["ISTANBUL","BARCELONA","LONDON","FRANKFURT","DUBAI","SHANGHAI","TOKYO","NEW YORK","SAN FRANCISCO","SÃO PAULO","LAGOS","MOSCOW"],
  es: ["ESTAMBUL","BARCELONA","LONDRES","FRÁNCFORT","DUBÁI","SHANGHÁI","TOKIO","NUEVA YORK","SAN FRANCISCO","SÃO PAULO","LAGOS","MOSCÚ"],
  fr: ["ISTANBUL","BARCELONE","LONDRES","FRANCFORT","DUBAÏ","SHANGHAI","TOKYO","NEW YORK","SAN FRANCISCO","SÃO PAULO","LAGOS","MOSCOU"],
  ar: ["إسطنبول","برشلونة","لندن","فرانكفورت","دبي","شنغهاي","طوكيو","نيويورك","سان فرانسيسكو","ساو باولو","لاغوس","موسكو"],
  ru: ["СТАМБУЛ","БАРСЕЛОНА","ЛОНДОН","ФРАНКФУРТ","ДУБАЙ","ШАНХАЙ","ТОКИО","НЬЮ-ЙОРК","САН-ФРАНЦИСКО","САН-ПАУЛУ","ЛАГОС","МОСКВА"]
};
function renderMarquee(){
  var track = document.getElementById("nmTrack");
  if(!track) return;
  var cities = MARQUEE_CITIES[LANG] || MARQUEE_CITIES.tr;
  var parts = [];
  // 2x tekrar — seamless loop için (translateX -50% ile eşleşir)
  for(var k=0; k<2; k++){
    for(var i=0; i<cities.length; i++){
      parts.push('<span class="nm-item"><span class="nm-l">' + cities[i] + '</span><span class="nm-p">+</span></span>');
    }
  }
  track.innerHTML = parts.join("");
}
// İlk yüklemede + her setLang() çağrısında renderMarquee tetiklensin
document.addEventListener("DOMContentLoaded", function(){
  renderMarquee();
});

// v26: Firma Detay Overlay Modal — MOVE yaklaşımı (id çakışması yok)
// Mimari: renderFirmPage #fpgContent'e yazar. Biz bu dolu node'u modal'a TAŞIRIZ (clone değil).
// Modal kapanınca orijinal #firm section içine geri taşırız. Böylece id tekildir.
function openFirmModal(pid){
  var body = document.getElementById("firmModalBody");
  var modal = document.getElementById("firmModal");
  if(!body || !modal){
    if(typeof go === "function") go("firm");
    return;
  }
  var t = (typeof T !== "undefined" && T[LANG]) ? T[LANG] : {};

  // Modal body'yi hazırla — üstte back button, altta fpgContent placeholder
  body.innerHTML =
    '<div class="fm-topbar">' +
      '<a class="fm-back" onclick="closeFirmModal()">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
        '<span data-i18n="back_list">'+(t.back_list||"Firma listesine dön")+'</span>' +
      '</a>' +
      '<a class="fm-fullpage" onclick="openFirmFullPage(\''+escapeJs(pid)+'\')" title="'+(t.fm_fullpage_tt||"Tam sayfada aç")+'">' +
        '<span>'+(t.fm_fullpage||"Tam sayfayı aç")+'</span>' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/></svg>' +
      '</a>' +
    '</div>' +
    '<div class="fm-content-wrap" id="firmModalContentTarget"></div>';

  // Şu an dolu olan #fpgContent'i modal'a TAŞI (appendChild aynı node'u başka yere taşır)
  var fpg = document.getElementById("fpgContent");
  var target = document.getElementById("firmModalContentTarget");
  if(fpg && target){
    // fpg node zaten renderFirmPage'ten dolu — direkt taşı
    target.appendChild(fpg);
  } else {
    console.warn("[openFirmModal] fpgContent bulunamadı — modal boş açılacak");
  }

  // Modal göster
  modal.classList.add("open");
  document.body.classList.add("fm-open");
  modal.scrollTop = 0;

  // URL hash — bookmark ve browser-back için
  try {
    var newHash = "#firm-"+pid;
    if(location.hash !== newHash){
      history.pushState({firmModal:pid}, "", newHash);
    }
  } catch(e){ /* silent */ }

  // Focus close button (a11y)
  setTimeout(function(){
    var closeBtn = modal.querySelector(".fm-close");
    if(closeBtn) closeBtn.focus();
  }, 100);
}
function closeFirmModal(){
  var modal = document.getElementById("firmModal");
  if(!modal || !modal.classList.contains("open")) return;

  // fpgContent'i orijinal #firm > .wrap içine geri taşı
  var fpg = document.getElementById("fpgContent");
  var firmSection = document.getElementById("firm");
  if(fpg && firmSection){
    var wrap = firmSection.querySelector(".wrap");
    if(wrap && fpg.parentElement !== wrap){
      wrap.appendChild(fpg);
    }
  }

  modal.classList.remove("open");
  document.body.classList.remove("fm-open");

  // URL hash temizle
  try {
    if(location.hash.indexOf("#firm-") === 0){
      history.replaceState({}, "", location.pathname + location.search);
    }
  } catch(e){ /* silent */ }
  CUR_FIRM = null;
}
// ESC ile kapat
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    var modal = document.getElementById("firmModal");
    if(modal && modal.classList.contains("open")){
      e.preventDefault();
      closeFirmModal();
    }
  }
});
// Browser geri butonu ile kapat
window.addEventListener("popstate", function(e){
  var modal = document.getElementById("firmModal");
  if(modal && modal.classList.contains("open")){
    if(!location.hash.startsWith("#firm-")){
      closeFirmModal();
    }
  }
});
// İlk yüklemede hash'de #firm-XXX varsa otomatik aç (deep-link)
document.addEventListener("DOMContentLoaded", function(){
  try {
    var m = location.hash.match(/^#firm-(.+)$/);
    if(m && m[1]){
      setTimeout(function(){ openFirm(m[1]); }, 400); // POS load'unu bekle
    }
  } catch(e){}
});



// v24: About sayfası — smooth scroll + scrollspy nav
(function(){
  function initAboutNav(){
    var navLinks = document.querySelectorAll(".about-nav a[data-jump]");
    if(!navLinks.length) return;
    // Smooth scroll on click
    navLinks.forEach(function(a){
      a.addEventListener("click", function(e){
        e.preventDefault();
        var id = a.getAttribute("data-jump");
        var el = document.getElementById(id);
        if(el){
          var y = el.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({top:y, behavior:"smooth"});
          // Manuel active class
          navLinks.forEach(function(x){x.classList.remove("active");});
          a.classList.add("active");
        }
      });
    });
    // ScrollSpy — hangi başlık view'da ise active yap
    var ids = ["ab-prob","ab-how","ab-way","ab-num","ab-team","ab-val"];
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var id = entry.target.id;
          navLinks.forEach(function(a){
            if(a.getAttribute("data-jump") === id) a.classList.add("active");
            else a.classList.remove("active");
          });
        }
      });
    }, { rootMargin:"-40% 0px -50% 0px", threshold:0 });
    ids.forEach(function(id){
      var el = document.getElementById(id);
      if(el) observer.observe(el);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initAboutNav);
  } else {
    initAboutNav();
  }
})();




// =================== PANEL ===================
function showPanel(sec, btn){
 document.querySelectorAll(".dpanel").forEach(function(p){p.classList.remove("on");});
 document.querySelectorAll(".dmenu a").forEach(function(a){a.classList.remove("on");});
 var el=document.getElementById("dp-"+sec); if(el) el.classList.add("on");
 if(btn) btn.classList.add("on");
 else{ var b=document.querySelector('.dmenu a[onclick*="'+sec+'"]'); if(b) b.classList.add("on"); }
 if(sec==="matches") renderMatchTable();
 if(sec==="messages"){ /* new panel is hardcoded rich UI — no dynamic render needed */ }
 if(sec==="people") renderPeople();
 if(sec==="activity") renderActivity();
 if(sec==="prospect"){
   var og = document.getElementById("prospOptGroup");
   if(og){
    var d=CI[LANG]||CI.tr;
    og.innerHTML = POS.slice(0,15).map(function(p){
      return '<option value="'+escapeHtml(p.id)+'">'+escapeHtml(p.nm)+' — '+(d[p.cn_key]||"")+'</option>';
    }).join("");
   }
 }
}

// =================== PROFILE ANCHOR NAVIGATION ===================
function scrollAnchor(id, ev){
 if(ev) ev.preventDefault();
 var el = document.getElementById(id);
 if(!el) return;
 // Highlight active anchor
 document.querySelectorAll(".prof-anchors a").forEach(function(a){a.classList.remove("on");});
 var link = document.querySelector('.prof-anchors a[href="#'+escapeHtml(id)+'"]');
 if(link) link.classList.add("on");
 // Smooth scroll
 var top = el.getBoundingClientRect().top + window.pageYOffset - 140;
 window.scrollTo({top:top, behavior:"smooth"});
 // Brief highlight pulse
 el.style.transition = "box-shadow .4s";
 el.style.boxShadow = "0 0 0 3px rgba(13,138,128,.35)";
 setTimeout(function(){ el.style.boxShadow = ""; }, 1200);
}

// =================== TEAM MANAGEMENT (menu, invite, permissions) ===================
var TEAM_USERS = {};
var TM_CUR_USER = null;
var TM_INV_ROLE = "sales";

// Close any open team menu when clicking outside
document.addEventListener("click", function(e){
 if(!e.target.closest || (!e.target.closest(".tm-dot") && !e.target.closest(".tm-menu"))){
   document.querySelectorAll(".tm-menu.open").forEach(function(m){m.classList.remove("open");});
 }
});

function toggleTmMenu(userId, btn){
 event.stopPropagation();
 // Close all other menus first
 document.querySelectorAll(".tm-menu.open").forEach(function(m){m.classList.remove("open");});
 // Find or create the menu for this row
 var parent = btn.parentElement;
 var menu = parent.querySelector(".tm-menu");
 var user = TEAM_USERS[userId];
 if(!user) return;
 var isOwner = user.role === "owner";
 if(!menu){
   menu = document.createElement("div");
   menu.className = "tm-menu";
   menu.innerHTML =
    (isOwner ?
      '<button disabled style="opacity:.5;cursor:not-allowed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>Sahip hesabı düzenlenemez</button>'
      :
      '<button onclick="openPermModal(\''+escapeJs(userId)+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51"/></svg>Rol & İzinleri düzenle</button>' +
      '<button onclick="tmResend(\''+escapeJs(userId)+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4zM4 4l8 8 8-8"/></svg>Davet linkini yeniden gönder</button>' +
      '<button onclick="tmResetPass(\''+escapeJs(userId)+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>Şifre sıfırlama gönder</button>' +
      '<div class="div"></div>' +
      '<button onclick="tmSuspend(\''+escapeJs(userId)+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Kullanıcıyı duraklat</button>' +
      '<button class="danger" onclick="tmRemove(\''+escapeJs(userId)+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14"/></svg>Ekipten çıkar</button>'
    );
   parent.appendChild(menu);
 }
 // Open with animation
 setTimeout(function(){menu.classList.add("open");},10);
}

function openInviteModal(){
 document.getElementById("tmBack").classList.add("open");
 document.getElementById("tmInviteModal").classList.add("open");
 setTimeout(function(){document.getElementById("tmInvName").focus();},250);
}
function closeTmModal(){
 document.getElementById("tmBack").classList.remove("open");
 document.getElementById("tmInviteModal").classList.remove("open");
 document.getElementById("tmPermModal").classList.remove("open");
}
function pickInvRole(el, role){
 document.querySelectorAll("#tmRoleChoice .rc").forEach(function(r){r.classList.remove("on");});
 el.classList.add("on");
 TM_INV_ROLE = role;
}
function submitInvite(){
 var nm = document.getElementById("tmInvName").value.trim();
 var em = document.getElementById("tmInvEmail").value.trim();
 if(!nm){ toast(tt("toast_name_required","Ad Soyad zorunlu")); document.getElementById("tmInvName").focus(); return; }
 if(!em || em.indexOf("@")<0){ toast(tt("toast_valid_email","Geçerli e-posta girin")); document.getElementById("tmInvEmail").focus(); return; }
 closeTmModal();
 toast(nm+" için davet e-postası gönderildi");
 // Clear inputs
 document.getElementById("tmInvName").value = "";
 document.getElementById("tmInvEmail").value = "";
}
function openPermModal(userId){
 var user = TEAM_USERS[userId]; if(!user) return;
 TM_CUR_USER = userId;
 // Close menus
 document.querySelectorAll(".tm-menu.open").forEach(function(m){m.classList.remove("open");});
 // Fill user preview
 document.getElementById("tmPermUser").innerHTML =
   '<div class="av" style="background:linear-gradient(135deg,'+user.avc[0]+','+user.avc[1]+')">'+user.av+'</div>' +
   '<div style="flex:1"><b>'+user.nm+'</b><span>'+user.em+'</span></div>';
 // Set current role selection
 document.querySelectorAll("#tmPermRoleChoice .rc").forEach(function(r){
   r.classList.toggle("on", r.getAttribute("data-role") === user.role);
 });
 // Set current permission checkboxes
 document.querySelectorAll("#tmPermGrid .tm-perm-item").forEach(function(it){
   var p = it.getAttribute("data-p");
   it.classList.toggle("checked", user.perms.indexOf(p) >= 0);
 });
 document.getElementById("tmPermSub").textContent = user.nm + " için erişim izinlerini ayarlayın.";
 document.getElementById("tmBack").classList.add("open");
 document.getElementById("tmPermModal").classList.add("open");
}
function pickPermRole(el, role){
 document.querySelectorAll("#tmPermRoleChoice .rc").forEach(function(r){r.classList.remove("on");});
 el.classList.add("on");
 // Auto-apply role preset permissions
 var preset = {
   admin:["messages","matches","profile","docs","analytics","team"],
   sales:["messages","matches"],
   ops:["profile","docs"],
   view:[]
 };
 var perms = preset[role] || [];
 document.querySelectorAll("#tmPermGrid .tm-perm-item").forEach(function(it){
   var p = it.getAttribute("data-p");
   it.classList.toggle("checked", perms.indexOf(p) >= 0);
 });
}
function tmTogglePerm(el){
 el.classList.toggle("checked");
}
function savePermissions(){
 if(!TM_CUR_USER) return;
 var user = TEAM_USERS[TM_CUR_USER];
 var newRole = document.querySelector("#tmPermRoleChoice .rc.on");
 if(newRole) user.role = newRole.getAttribute("data-role");
 var newPerms = [];
 document.querySelectorAll("#tmPermGrid .tm-perm-item.checked").forEach(function(it){
   newPerms.push(it.getAttribute("data-p"));
 });
 user.perms = newPerms;
 // Update row visually — role badge
 var row = document.getElementById("tm-"+TM_CUR_USER);
 if(row){
   var roleBadge = row.querySelector(".tm-role-badge");
   if(roleBadge){
     var roleNames = {admin:"Yönetici", sales:"Satış", ops:"Operasyon", view:"Görüntüleme"};
     roleBadge.className = "tm-role-badge " + user.role;
     roleBadge.textContent = roleNames[user.role] || user.role;
   }
   // Update permissions text
   var permsCell = row.querySelector(".col-perms");
   if(permsCell){
     var permsLabel = newPerms.length===0 ? "Yok" : (newPerms.length===6 ? "Tüm modüller" : newPerms.length+" modül");
     permsCell.textContent = permsLabel;
   }
 }
 closeTmModal();
 toast(user.nm + " için izinler güncellendi");
}
function tmResend(userId){
 document.querySelectorAll(".tm-menu.open").forEach(function(m){m.classList.remove("open");});
 var u = TEAM_USERS[userId];
 toast((u?u.nm:"Kullanıcı")+" için davet linki yeniden gönderildi");
}
function tmResetPass(userId){
 document.querySelectorAll(".tm-menu.open").forEach(function(m){m.classList.remove("open");});
 var u = TEAM_USERS[userId];
 toast((u?u.nm:"Kullanıcı")+" için şifre sıfırlama e-postası gönderildi");
}
function tmSuspend(userId){
 document.querySelectorAll(".tm-menu.open").forEach(function(m){m.classList.remove("open");});
 var u = TEAM_USERS[userId]; if(!u) return;
 if(!confirm(u.nm+" adlı kullanıcı duraklatılacak. Hesap erişimi askıya alınır ama silinmez. Devam edilsin mi?")) return;
 // Update UI
 var row = document.getElementById("tm-"+userId);
 if(row){
   var status = row.querySelector(".tm-status");
   if(status){
     status.className = "tm-status wn";
     status.innerHTML = '<span class="dot"></span>Duraklatıldı';
   }
 }
 toast(u.nm+" duraklatıldı");
}
function tmRemove(userId){
 document.querySelectorAll(".tm-menu.open").forEach(function(m){m.classList.remove("open");});
 var u = TEAM_USERS[userId]; if(!u) return;
 if(!confirm(u.nm+" ekipten kalıcı olarak çıkarılacak. Bu işlem geri alınamaz. Devam edilsin mi?")) return;
 var row = document.getElementById("tm-"+userId);
 if(row) row.style.display = "none";
 delete TEAM_USERS[userId];
 toast(u.nm+" ekipten çıkarıldı");
}
var AC_FILTER = "all";
function acFilter(el, k){
 document.querySelectorAll("#dp-activity .ac-fx").forEach(function(f){f.classList.remove("active");});
 el.classList.add("active");
 AC_FILTER = k;
 renderActivity();
}
function renderActivity(){
 var host = document.getElementById("acList"); if(!host) return;
 var t = T[LANG] || T.tr;
 // Simulated activity feed — realistic mix
 var events = [
   {day:0, type:"msg", title:"Nordic Kaluste Oy · Erik Nordström", desc:"HS 8302 mobilya menteşesi için MOQ ve fiyat teklifi rica ederiz.", tm:"09:42", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'},
   {day:0, type:"match", title:"Yeni eşleşme · %94 uyum", desc:"Abidjan Cacao Export SA — Fildişi Sahili'nden kakao çekirdeği tedarikçisi bulundu.", tm:"08:15", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>'},
   {day:1, type:"doc", title:"ISO 14001 sertifikanız doğrulandı", desc:"KıvırcıkÇelik A.Ş. hesabında ISO 14001 Çevre Yönetim sertifikası onaylandı.", tm:"18:34", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'},
   {day:1, type:"msg", title:"Kyiv Grain Trading · Olena Kovalenko", desc:"Добрый день, интересует пшеница 3000 тонн FOB Odessa.", tm:"14:22", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'},
   {day:2, type:"prof", title:"Firma profili güncellendi", desc:"Ürün galerisine 3 yeni görsel eklendi. Profil tamamlanma oranı %89 → %94.", tm:"11:08", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'},
   {day:2, type:"match", title:"3 yeni eşleşme önerisi", desc:"Almaty Tekstil, Astana Textile Group, Aşgabat Tekstil Kompleksi — pamuklu kumaş talebi.", tm:"09:00", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>'},
   {day:5, type:"msg", title:"Berlin Autoparts GmbH · Hans Müller", desc:"Guten Tag, wir suchen Zulieferer für Bremsbeläge HS 8708 mit ECE R90.", tm:"16:45", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'},
   {day:7, type:"doc", title:"Vergi levhası yenilendi", desc:"2026 yılı vergi levhası KEP üzerinden otomatik doğrulandı.", tm:"10:12", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'},
   {day:9, type:"match", title:"Dubai Petrochem FZ — %89 uyum", desc:"Ahmed Al-Rashid tarafından PP granül talebi. FOB Jebel Ali, 20 ton.", tm:"13:30", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>'},
   {day:12, type:"prof", title:"Yeni pazar hedefi eklendi", desc:"Japonya (JP) tercih edilen ihracat ülkeleri listesine eklendi.", tm:"15:20", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'},
   {day:15, type:"msg", title:"Shanghai Electronics · Li Wei", desc:"您好，我们需要 5000 件 GSM 模组 HS 8517。请提供 FOB Shanghai 报价。", tm:"11:03", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'},
   {day:18, type:"doc", title:"KEP adresi aktifleştirildi", desc:"hs01.kep.tr KEP adresi doğrulandı — resmi tebliğler artık dijital.", tm:"09:47", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'},
   {day:22, type:"match", title:"Warsaw Furniture Sp. z.o.o. — %85", desc:"Piotr Kowalski · MDF panel talebi, DAP Warsaw, TT ödeme.", tm:"14:12", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>'},
   {day:26, type:"prof", title:"2FA aktif edildi", desc:"SMS + Authenticator app ile iki faktörlü kimlik doğrulama açıldı.", tm:"20:15", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>'},
   {day:29, type:"prof", title:"Kervea hesabınız oluşturuldu", desc:"Hoş geldiniz! 6 dilde küresel B2B ağına bağlısınız.", tm:"09:00", ic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/><circle cx="12" cy="12" r="10"/></svg>'}
 ];
 var filtered = AC_FILTER === "all" ? events : events.filter(function(e){return e.type===AC_FILTER;});
 // Group by day
 var groups = {};
 filtered.forEach(function(e){
   var key = e.day===0 ? t.ac_today : (e.day===1 ? t.ac_yesterday : (e.day+" "+((LANG==="tr")?"gün önce":(LANG==="en")?"days ago":(LANG==="es")?"días":(LANG==="fr")?"jours":(LANG==="ar")?"أيام":"дней назад")));
   if(!groups[key]) groups[key] = [];
   groups[key].push(e);
 });
 host.innerHTML = Object.keys(groups).map(function(k){
   return '<div class="ac-day">' +
     '<div class="ac-day-hd">'+k+'</div>' +
     groups[k].map(function(e){
       return '<div class="ac-i '+e.type+'">' +
         '<div class="ac-ic">'+e.ic+'</div>' +
         '<div class="ac-body"><b>'+escapeHtml(e.title)+'</b><p>'+escapeHtml(e.desc)+'</p></div>' +
         '<span class="ac-tm">'+escapeHtml(e.tm)+'</span>' +
       '</div>';
     }).join("") +
   '</div>';
 }).join("");
 if(!filtered.length) host.innerHTML = '<div style="padding:40px;text-align:center;color:var(--faint);font-size:13px">'+tt("empty_records","Filtrenize uyan kayıt yok.")+'</div>';
}

// Matches table (with filter bar)
function renderMatchTable(){
 var d=CI[LANG]||CI.tr;
 var secs = SI[LANG] || SI.tr;
 var wrap = document.getElementById("mtable-wrap"); if(!wrap) return;
 var q = (document.getElementById("mfSearch")||{value:""}).value.toLowerCase().trim();
 var dirf = (document.getElementById("mfDir")||{value:""}).value;
 var scoref = parseInt((document.getElementById("mfScore")||{value:"0"}).value)||0;
 var list = POS.filter(function(p){
   if(dirf && p.dir!==dirf) return false;
   if(scoref && p.uyum<scoref) return false;
   if(q){
     var hay = (p.nm+" "+p.hs+" "+(secs[p.sec]||"")+" "+(d[p.cn_key]||"")+" "+(p.tem||"")).toLowerCase();
     if(hay.indexOf(q)===-1) return false;
   }
   return true;
 });
 var cntEl = document.getElementById("mfCount"); if(cntEl) cntEl.textContent = list.length;
 var emptyMsg = {tr:"Filtrelere uyan eşleşme yok",en:"No matches for these filters",es:"Sin coincidencias",fr:"Aucune correspondance",ar:"لا توجد نتائج",ru:"Совпадений нет"}[LANG]||"No matches";
 if(!list.length){ wrap.innerHTML = '<div class="empty" style="padding:40px 20px;text-align:center;color:var(--faint)">'+emptyMsg+'</div>'; return; }

 // ===== Why-match reason chips (localized) =====
 var RZ = {tr:{sec:"Aynı sektör",dir_c:"Karşılıklı yön",hs:"HS kodu ortak",vf:"Doğrulanmış",veteran:"Deneyimli firma"},
           en:{sec:"Same sector",dir_c:"Complementary dir.",hs:"Shared HS code",vf:"Verified",veteran:"Established"},
           es:{sec:"Mismo sector",dir_c:"Dir. complementaria",hs:"HS compartido",vf:"Verificada",veteran:"Con trayectoria"},
           fr:{sec:"Même secteur",dir_c:"Direction complémentaire",hs:"Code HS partagé",vf:"Vérifié",veteran:"Établi"},
           ar:{sec:"نفس القطاع",dir_c:"اتجاه متكامل",hs:"رمز HS مشترك",vf:"موثّق",veteran:"شركة راسخة"},
           ru:{sec:"Тот же сектор",dir_c:"Встречное направление",hs:"Общий HS",vf:"Верифицирован",veteran:"Опытный"}}[LANG] || {sec:"Same sector",dir_c:"Complementary",hs:"Shared HS",vf:"Verified",veteran:"Established"};
 var BL = {tr:{prod:"Ürün Uyumu",geo:"Coğrafi Uyum",dir:"Yön Uyumu"},
           en:{prod:"Product Fit",geo:"Geographic Fit",dir:"Direction Fit"},
           es:{prod:"Ajuste Producto",geo:"Ajuste Geo",dir:"Ajuste Dirección"},
           fr:{prod:"Adéquation produit",geo:"Adéquation géo",dir:"Adéquation direction"},
           ar:{prod:"توافق المنتج",geo:"توافق جغرافي",dir:"توافق الاتجاه"},
           ru:{prod:"Продукт",geo:"География",dir:"Направление"}}[LANG] || {prod:"Product",geo:"Geo",dir:"Direction"};

 // Radius for progress ring circumference
 var CIRC = 2 * Math.PI * 32; // r=32

 var cards = list.map(function(p){
   var scoreCls = p.uyum>=90 ? "hi" : p.uyum>=80 ? "md" : "lo";
   var offset = CIRC - (p.uyum/100)*CIRC;
   var dirLbl = p.dir==="EXP" ? T[LANG].dir_exp : T[LANG].dir_imp;
   var dirCls = p.dir==="EXP" ? "exp" : "imp";
   // Derive compat scores (plausible variations of overall uyum)
   var prodFit = Math.min(100, p.uyum + Math.round((Math.random()-.5)*8));
   var geoFit  = Math.max(40, Math.min(100, p.uyum + Math.round((Math.random()-.5)*20)));
   var dirFit  = p.dir === (window.me?me.dir:"EXP") ? 55 : 96; // opposite dir = perfect complement
   // Reasons
   var reasons = [];
   if(p.dir !== (window.me?me.dir:"EXP")) reasons.push('<span class="rz hot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 3l4 4-4 4M21 7H9M7 21l-4-4 4-4M3 17h12"/></svg>'+RZ.dir_c+'</span>');
   if(window.me && p.sec === me.sec) reasons.push('<span class="rz"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>'+RZ.sec+'</span>');
   if(window.me && me.hs && String(me.hs).indexOf(String(p.hs).substring(0,2))>-1) reasons.push('<span class="rz"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'+RZ.hs+'</span>');
   reasons.push('<span class="rz"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'+RZ.vf+'</span>');
   if((new Date().getFullYear() - p.yr) > 15) reasons.push('<span class="rz"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>'+RZ.veteran+'</span>');

   return '<div class="mcard">' +
     '<div class="mring '+scoreCls+'">' +
       '<svg viewBox="0 0 76 76">' +
         '<circle class="rbg" cx="38" cy="38" r="32"/>' +
         '<circle class="rfg" cx="38" cy="38" r="32" stroke-dasharray="'+CIRC.toFixed(1)+'" stroke-dashoffset="'+offset.toFixed(1)+'"/>' +
       '</svg>' +
       '<div class="rtxt"><div class="n">'+escapeHtml(p.uyum)+'</div><div class="s">Match</div></div>' +
     '</div>' +
     '<div class="mmid">' +
       '<div class="mhead">' +
       '<div style="flex:1;min-width:0;display:flex;align-items:center;gap:10px">' +
         secTileHTML(p.sec, 44, 10) +
         '<div style="flex:1;min-width:0">' +
           '<div class="mnm">'+escapeHtml(p.nm)+'</div>' +
           '<div class="msub"><img src="/flags/'+escapeHtml(p.fc)+'.svg" alt=""/> '+(d[p.cn_key]||"")+' · '+escapeHtml(p.yr)+' · '+(secs[p.sec]||"")+' · <b style="color:var(--body)">HS '+escapeHtml(p.hs)+'</b></div>' +
         '</div>' +
       '</div>' +
         '<span class="mdirpill '+dirCls+'">'+dirLbl+'</span>' +
       '</div>' +
       '<div class="mreasons">'+reasons.join('')+'</div>' +
       '<div class="mbars">' +
         '<div class="mbar"><div class="bl"><span>'+BL.prod+'</span><b>'+prodFit+'</b></div><div class="bt"><div style="width:'+prodFit+'%"></div></div></div>' +
         '<div class="mbar"><div class="bl"><span>'+BL.geo+'</span><b>'+geoFit+'</b></div><div class="bt"><div style="width:'+geoFit+'%"></div></div></div>' +
         '<div class="mbar"><div class="bl"><span>'+BL.dir+'</span><b>'+dirFit+'</b></div><div class="bt"><div style="width:'+dirFit+'%"></div></div></div>' +
       '</div>' +
     '</div>' +
     '<div class="mact">' +
       '<button class="btn" onclick="startMsg(\''+escapeJs(p.id)+'\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'+T[LANG].message+'</button>' +
       '<button class="btn sec" onclick="openFirm(\''+escapeJs(p.id)+'\')">'+T[LANG].detail+' →</button>' +
     '</div>' +
   '</div>';
 }).join("");
 wrap.innerHTML = '<div class="mgrid">'+cards+'</div>';
}
// CSV hücresi: tırnakları kaçır; = + - @ (ve sekme/CR) ile başlayan değeri Excel/Sheets formül
// olarak çalıştırmasın diye başına tek tırnak koy (CSV / formül enjeksiyonu koruması).
function csvCell(v){
 var x = (v === null || v === undefined) ? "" : String(v);
 if(/^[=+\-@\t\r]/.test(x)) x = "'" + x;
 return '"' + x.replace(/"/g,'""') + '"';
}
function exportMatchesCSV(){
 var d=CI[LANG]||CI.tr; var secs = SI[LANG] || SI.tr;
 var csv = "\uFEFFFirma,HS,Sektor,Ulke,Uyum,Temsilci,Web\n";
 POS.forEach(function(p){
   csv += [p.nm, p.hs, (secs[p.sec]||""), (d[p.cn_key]||""), p.uyum, (p.tem||""), (p.web||"")].map(csvCell).join(",") + "\n";
 });
 var blob = new Blob([csv],{type:"text/csv;charset=utf-8"});
 var url = URL.createObjectURL(blob);
 var a = document.createElement("a"); a.href=url; a.download="kervea-eslesmeler.csv"; a.click();
 URL.revokeObjectURL(url); toast(tt("toast_csv_downloaded","CSV indirildi"));
}

// Photo upload
function uploadPhoto(e){
 var f = e.target.files[0]; if(!f) return;
 var r = new FileReader();
 r.onload = function(){
   document.getElementById("phbox").innerHTML = '<img src="'+r.result+'"/>';
   toast(tt("toast_photo_uploaded","Fotoğraf yüklendi"));
 };
 r.readAsDataURL(f);
}
function removePhoto(){document.getElementById("phbox").innerHTML="KT"; toast(tt("toast_photo_removed","Fotoğraf kaldırıldı"));}

function startMsg(pid){
 CUR_MSG = pid;
 go("panel"); showPanel("messages", null);
}

// Prospectus
// Read the current user's profile from the edit-profile form.
// Falls back to sensible defaults if the panel hasn't been touched.
function readMyProfile(){
 var inps = document.querySelectorAll("#dp-profile input, #dp-profile textarea, #dp-profile select");
 var vals = [];
 inps.forEach(function(el){ vals.push(el.value); });
 // Order matches the profile edit form (Legal & Company + Trade blocks)
 // Legal: cname, ctitle, tax, mersis, year, emp, [country dd sep], city, kep, web, email, phone, repname, reptitle, addr
 // Trade: sec, dir, inc, pay, desc, hs, moq, certs
 return {
   nm: vals[0] || "Kervea Ticaret A.Ş.",
   ctitle: vals[1] || "Kervea Trading Ltd.",
   tax: vals[2] || "TR-1234567890",
   mersis: vals[3] || "",
   yr: vals[4] || "2015",
   emp: vals[5] || "11-50",
   city: vals[6] || "İstanbul",
   kep: vals[7] || "",
   web: vals[8] || "https://kervea.io",
   eml: vals[9] || "info@kervea.io",
   tel: vals[10] || "+90 212 555 44 33",
   tem: vals[11] || "Ahmet Yılmaz",
   temtitle: vals[12] || "Genel Müdür",
   addr: vals[13] || "İstanbul, Türkiye",
   // trade block starts after 14 (indices depend on selects — pull last-known robust)
   desc: (document.querySelector("#dp-profile textarea:nth-of-type(2)")||{value:""}).value || "2015'ten bu yana küresel B2B ticareti.",
   hs: findByLabel("fl_hs") || "5205, 5208, 9403, 4415",
   moq: findByLabel("fl_moq") || "10 ton / 1000 adet",
   certs: findByLabel("fl_certs") || "ISO 9001, ISO 14001, GOTS"
 };
}
function findByLabel(key){
 var lb = document.querySelector('#dp-profile [data-i18n="'+key+'"]');
 if(!lb) return null;
 var next = lb.nextElementSibling;
 return next && (next.tagName==="INPUT"||next.tagName==="TEXTAREA") ? next.value : null;
}
function downloadProspectus(firmArg){
 var d=CI[LANG]||CI.tr;
 var secs = SI[LANG] || SI.tr;
 var t = T[LANG] || T.tr;
 var isMine = !firmArg || firmArg === "me";
 var p = isMine ? readMyProfile() : POS.find(function(x){return x.id===firmArg;});
 if(!p){ toast(tt("toast_firm_notfound","Firma bulunamadı")); return; }
 var cn = d[p.cn_key] || (isMine ? "Türkiye" : "") ;
 var sec = isMine ? "" : (secs[p.sec] || "");
 var lang = LANG;
 var lbl = {
  tr:{sub:"Modern İpek Yolu koridorunda güvenilir B2B ticaret ortağınız",summary:"Firma Özeti",basic:"Temel Bilgiler",trade:"Ticari Bilgiler",prod:"Ana Ürünler",cert:"Sertifikalar",footer:"Bu belge Kervea platformu tarafından otomatik üretilmiştir.",ctitle:"Ticari Ünvan",tax:"Vergi No",found:"Kuruluş",addr:"Merkez",emp:"Çalışan",web:"Web",eml:"E-posta",tem:"Yetkili",hs:"HS Kodları",moq:"MOQ",dir:"Ticaret Yönü",sect:"Sektör",city:"Şehir",phone:"Telefon"},
  en:{sub:"Your trusted B2B trade partner on the modern Silk Road",summary:"Company Summary",basic:"Key Info",trade:"Trade Info",prod:"Main Products",cert:"Certificates",footer:"Auto-generated by Kervea platform.",ctitle:"Trade Name",tax:"Tax ID",found:"Founded",addr:"HQ",emp:"Employees",web:"Web",eml:"Email",tem:"Contact",hs:"HS Codes",moq:"MOQ",dir:"Direction",sect:"Sector",city:"City",phone:"Phone"},
  es:{sub:"Su socio B2B de confianza en la Ruta de la Seda moderna",summary:"Resumen",basic:"Datos Clave",trade:"Datos Comerciales",prod:"Productos",cert:"Certificados",footer:"Generado automáticamente por Kervea.",ctitle:"Nombre Comercial",tax:"NIF",found:"Fundación",addr:"Sede",emp:"Empleados",web:"Web",eml:"Email",tem:"Contacto",hs:"Códigos HS",moq:"MOQ",dir:"Dirección",sect:"Sector",city:"Ciudad",phone:"Teléfono"},
  fr:{sub:"Votre partenaire B2B de confiance sur la Route de la Soie moderne",summary:"Résumé",basic:"Infos Clés",trade:"Infos Commerciales",prod:"Produits",cert:"Certifications",footer:"Généré automatiquement par Kervea.",ctitle:"Raison Sociale",tax:"N° Fiscal",found:"Fondation",addr:"Siège",emp:"Effectif",web:"Web",eml:"Email",tem:"Contact",hs:"Codes HS",moq:"MOQ",dir:"Direction",sect:"Secteur",city:"Ville",phone:"Téléphone"},
  ar:{sub:"شريككم B2B الموثوق على طريق الحرير الحديث",summary:"ملخص الشركة",basic:"معلومات أساسية",trade:"معلومات تجارية",prod:"المنتجات",cert:"الشهادات",footer:"تم إنشاء هذا المستند تلقائيًا بواسطة Kervea.",ctitle:"الاسم التجاري",tax:"الرقم الضريبي",found:"سنة التأسيس",addr:"المقر",emp:"عدد الموظفين",web:"الموقع",eml:"البريد",tem:"جهة الاتصال",hs:"رموز HS",moq:"MOQ",dir:"الاتجاه",sect:"القطاع",city:"المدينة",phone:"الهاتف"},
  ru:{sub:"Ваш надёжный B2B партнёр на современном Шёлковом пути",summary:"О компании",basic:"Основная информация",trade:"Торговая информация",prod:"Продукция",cert:"Сертификаты",footer:"Документ создан платформой Kervea автоматически.",ctitle:"Торговое имя",tax:"ИНН",found:"Год основания",addr:"Штаб",emp:"Сотрудники",web:"Сайт",eml:"Email",tem:"Контакт",hs:"Коды HS",moq:"MOQ",dir:"Направление",sect:"Сектор",city:"Город",phone:"Телефон"}
 }[lang] || {sub:"",summary:"Summary",basic:"Info",trade:"Trade",prod:"Products",cert:"Certificates",footer:"",ctitle:"Trade Name",tax:"Tax ID",found:"Founded",addr:"HQ",emp:"Employees",web:"Web",eml:"Email",tem:"Contact",hs:"HS",moq:"MOQ",dir:"Direction",sect:"Sector",city:"City",phone:"Phone"};

 var rows = "";
 rows += '<tr><td class="k">'+lbl.ctitle+'</td><td class="v">'+escapeHtml(p.ctitle||p.nm)+'</td></tr>';
 if(p.tax) rows += '<tr><td class="k">'+lbl.tax+'</td><td class="v">'+escapeHtml(p.tax)+'</td></tr>';
 rows += '<tr><td class="k">'+lbl.found+'</td><td class="v">'+escapeHtml(p.yr)+'</td></tr>';
 if(p.city||cn) rows += '<tr><td class="k">'+lbl.addr+'</td><td class="v">'+escapeHtml([p.city,cn].filter(Boolean).join(", "))+'</td></tr>';
 if(p.emp) rows += '<tr><td class="k">'+lbl.emp+'</td><td class="v">'+escapeHtml(p.emp)+'</td></tr>';
 if(p.web) rows += '<tr><td class="k">'+lbl.web+'</td><td class="v">'+escapeHtml(p.web)+'</td></tr>';
 if(p.eml) rows += '<tr><td class="k">'+lbl.eml+'</td><td class="v">'+escapeHtml(p.eml)+'</td></tr>';
 if(p.tel) rows += '<tr><td class="k">'+lbl.phone+'</td><td class="v">'+escapeHtml(p.tel)+'</td></tr>';
 if(p.tem) rows += '<tr><td class="k">'+lbl.tem+'</td><td class="v">'+escapeHtml(p.tem+(p.temtitle?" — "+p.temtitle:""))+'</td></tr>';

 var tradeRows = "";
 if(sec) tradeRows += '<tr><td class="k">'+lbl.sect+'</td><td class="v">'+sec+'</td></tr>';
 if(p.dir) tradeRows += '<tr><td class="k">'+lbl.dir+'</td><td class="v">'+(p.dir==="EXP"?t.dir_exp:p.dir==="IMP"?t.dir_imp:p.dir)+'</td></tr>';
 if(p.hs) tradeRows += '<tr><td class="k">'+lbl.hs+'</td><td class="v">'+escapeHtml(p.hs)+'</td></tr>';
 if(p.moq) tradeRows += '<tr><td class="k">'+lbl.moq+'</td><td class="v">'+escapeHtml(p.moq)+'</td></tr>';
 if(p.inc) tradeRows += '<tr><td class="k">INCOTERM</td><td class="v">'+escapeHtml(p.inc)+'</td></tr>';
 if(p.pay) tradeRows += '<tr><td class="k">'+t.fp_pay+'</td><td class="v">'+escapeHtml(p.pay)+'</td></tr>';

 var html = '<!DOCTYPE html><html lang="'+lang+'" dir="'+(lang==="ar"?"rtl":"ltr")+'"><head><meta charset="utf-8"><title>'+escapeHtml(p.nm)+' — Kervea</title>' +
  '<style>' +
  '@page{size:A4;margin:20mm}' +
  'body{font-family:Georgia,"Noto Sans Arabic",serif;max-width:780px;margin:40px auto;padding:0 30px;color:#0A211F;line-height:1.6}' +
  '.hdr{display:flex;align-items:center;gap:16px;border-bottom:3px solid #0D8A80;padding-bottom:14px;margin-bottom:8px}' +
  '.lg{width:64px;height:64px;border-radius:14px;background:linear-gradient(135deg,#0C2E28,#0D8A80);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:22px;font-family:Georgia,serif}' +
  'h1{color:#0A5F56;margin:0;font-size:26px}' +
  '.sub{color:#5A6C6D;font-size:13px;margin-top:4px}' +
  'h2{color:#0D8A80;margin-top:24px;font-size:17px;border-left:3px solid #0D8A80;padding-left:10px}' +
  '.k{color:#7A8C8D;font-size:11px;text-transform:uppercase;letter-spacing:.05em;width:30%}.v{font-weight:600;color:#0A211F}' +
  'table{width:100%;border-collapse:collapse;margin:10px 0}td{padding:8px 12px;border-bottom:1px solid #DCE9E6;font-size:13.5px;vertical-align:top}' +
  '.tag{display:inline-block;background:#E6F0EC;color:#0A5F56;font-size:11px;padding:3px 9px;border-radius:100px;margin:2px 4px 2px 0;font-weight:600}' +
  '.desc{background:#F5FAF8;border-left:3px solid #0D8A80;padding:14px 18px;font-size:14px;color:#0A211F;border-radius:0 8px 8px 0;margin:12px 0}' +
  '.foot{text-align:center;color:#7A8C8D;font-size:11px;margin-top:40px;border-top:1px solid #DCE9E6;padding-top:15px}' +
  '.qr{width:90px;height:90px;background:repeating-linear-gradient(45deg,#0A211F,#0A211F 3px,#fff 3px,#fff 6px);margin:14px 0;border-radius:6px;opacity:.7}' +
  '</style></head><body>' +
  '<div class="hdr"><div class="lg">'+escapeHtml(p.lg||p.nm.substring(0,2).toUpperCase())+'</div><div><h1>'+escapeHtml(p.nm)+'</h1><div class="sub"><i>'+lbl.sub+'</i></div></div></div>' +
  '<h2>'+lbl.summary+'</h2>' +
  (p.desc?'<div class="desc">'+escapeHtml(p.desc)+'</div>':'') +
  '<h2>'+lbl.basic+'</h2><table>'+rows+'</table>' +
  (tradeRows?'<h2>'+lbl.trade+'</h2><table>'+tradeRows+'</table>':'') +
  (p.certs?'<h2>'+lbl.cert+'</h2><p>'+p.certs.split(",").map(function(x){return '<span class="tag">'+escapeHtml(x.trim())+'</span>';}).join(' ')+'</p>':'') +
  '<div class="foot">Kervea · '+new Date().toLocaleDateString(lang)+' · '+lbl.footer+'<br/>kervea.io/'+ escapeHtml(p.id||"me") +'</div>' +
  '</body></html>';
 var blob = new Blob([html],{type:"text/html;charset=utf-8"});
 var url = URL.createObjectURL(blob);
 var a = document.createElement("a"); a.href=url;
 a.download = "kervea-"+ (p.nm.toLowerCase().replace(/[^a-z0-9]+/g,"-").substring(0,40)) +".html";
 a.click();
 URL.revokeObjectURL(url); toast(tt("toast_pdf_downloaded","Prospektüs indirildi"));
}

// =================== 3D DÖNEN DÜNYA KÜRESİ (amCharts 5 orthographic) ===================
// Marka: Kervea. Kütüphane: amCharts 5 (proprietary, watermark commercial license altında kaldırılabilir).
// Hero'daki dünya küresi — gerçek country polygonları, otomatik dönüş, 12 hub, Türkiye koridorları.
var AM_GLOBE = { root: null, chart: null, spin: null, ready: false };

// Kervea hub'ları — SVG'deki data-cc listesinden türetildi (lat/lon değerleri gerçek)
// Kervea küresel ticaret koridoru — 32 hub (başkent koordinatları)
// Her hub'ın name'i çalışma zamanında CI[LANG][cc] ile çevrilir (dil değişince güncellenir)
var KERVEA_HUBS = [
  // Merkez
  { cc: "tr", lat: 39.925, lon: 32.866, main: true }, // Ankara
  // Avrupa
  { cc: "de", lat: 52.520, lon: 13.405, featured: true },  // Berlin (Avrupa)
  { cc: "fr", lat: 48.857, lon: 2.353 },   // Paris
  { cc: "it", lat: 41.902, lon: 12.496 },  // Roma
  { cc: "es", lat: 40.417, lon: -3.704 },  // Madrid
  { cc: "gb", lat: 51.507, lon: -0.127 },  // Londra
  { cc: "nl", lat: 52.370, lon: 4.895 },   // Amsterdam
  { cc: "pl", lat: 52.230, lon: 21.012 },  // Varşova
  { cc: "ru", lat: 55.755, lon: 37.617, featured: true },  // Moskova (Kuzey Avrasya temsili)
  // Ortadoğu & Kafkasya
  { cc: "ae", lat: 24.467, lon: 54.367, featured: true },  // Abu Dabi (Ortadoğu)
  { cc: "sa", lat: 24.774, lon: 46.738 },  // Riyad
  { cc: "qa", lat: 25.286, lon: 51.531 },  // Doha
  { cc: "il", lat: 31.783, lon: 35.217 },  // Kudüs
  { cc: "az", lat: 40.409, lon: 49.867 },  // Bakü
  // Orta Asya & Güney Asya
  { cc: "kz", lat: 51.169, lon: 71.449 },  // Astana
  { cc: "uz", lat: 41.311, lon: 69.279 },  // Taşkent
  { cc: "pk", lat: 33.684, lon: 73.048 },  // İslamabad
  { cc: "in", lat: 28.614, lon: 77.209 },  // Yeni Delhi
  // Doğu Asya
  { cc: "cn", lat: 39.904, lon: 116.407, featured: true }, // Pekin (Doğu Asya)
  { cc: "jp", lat: 35.676, lon: 139.650 }, // Tokyo
  { cc: "kr", lat: 37.567, lon: 126.978 }, // Seul
  // Güneydoğu Asya
  { cc: "vn", lat: 21.028, lon: 105.834 }, // Hanoi
  { cc: "sg", lat: 1.352,  lon: 103.820 }, // Singapur
  { cc: "id", lat: -6.208, lon: 106.846 }, // Cakarta
  // Afrika (kuzey → güney)
  { cc: "eg", lat: 30.044, lon: 31.236 },  // Kahire
  { cc: "ma", lat: 34.020, lon: -6.841 },  // Rabat
  { cc: "ng", lat: 9.077,  lon: 7.398, featured: true },   // Abuja (Afrika temsili)
  { cc: "ke", lat: -1.286, lon: 36.817 },  // Nairobi
  { cc: "za", lat: -25.746, lon: 28.188 }, // Pretorya
  // Amerika (kuzey → güney)
  { cc: "us", lat: 38.907, lon: -77.037, featured: true }, // Washington (Kuzey Amerika)
  { cc: "ca", lat: 45.421, lon: -75.697 }, // Ottawa
  { cc: "mx", lat: 19.433, lon: -99.133 }, // Meksiko
  { cc: "br", lat: -15.826, lon: -47.922 },// Brasilia
  { cc: "ar", lat: -34.603, lon: -58.381 } // Buenos Aires
];

function initAmChartsGlobe(){
  if(typeof am5 === "undefined" || typeof am5map === "undefined"){
    console.warn("[Globe] amCharts henüz yüklenmedi, 200ms sonra tekrar denenecek");
    setTimeout(initAmChartsGlobe, 200);
    return;
  }
  var el = document.getElementById("globeMap");
  if(!el){ console.warn("[Globe] #globeMap bulunamadı"); return; }
  if(AM_GLOBE.ready){ return; } // idempotent

  try {
    am5.ready(function(){
      var root = am5.Root.new("globeMap");
      AM_GLOBE.root = root;

      // Watermark küçültme (ücretsiz kullanım — kaldırmak için ticari lisans gerekir)
      try { root._logo && root._logo.dispose && root._logo.dispose(); } catch(e){}

      root.setThemes([ am5themes_Animated.new(root) ]);

      // Ana harita — orthographic projection (3D küre görünümü)
      var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
        homeGeoPoint: { longitude: 30, latitude: 25 }, // Türkiye merkezli başlar
        homeZoomLevel: 1
      }));
      AM_GLOBE.chart = chart;

      // Kervea marka renkleri
      var COLOR_LAND      = am5.color(0x0d8a80); // teal (kervea ana)
      var COLOR_LAND_HOV  = am5.color(0x8fe9c4); // emerald (hover)
      var COLOR_SEA       = am5.color(0x02100e); // çok koyu — okyanus
      var COLOR_GRID      = am5.color(0x8fe9c4);
      var COLOR_HUB       = am5.color(0xFFF3A0); // altın — Türkiye vurgu
      var COLOR_HUB_ALT   = am5.color(0x8fe9c4); // yeşil — diğer hub
      var COLOR_ROUTE     = am5.color(0xFFF3A0); // altın koridor

      // Arka plan (deniz) — koyu, marka ile uyumlu
      var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
      backgroundSeries.mapPolygons.template.setAll({
        fill: COLOR_SEA,
        fillOpacity: 1,
        strokeOpacity: 0
      });
      backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180)
      });

      // Enlem/boylam grid (küre hissi için hafif)
      var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, { step: 15 }));
      graticuleSeries.mapLines.template.setAll({
        strokeOpacity: 0.09,
        stroke: COLOR_GRID
      });

      // Ülke polygonları — hover ile marka rengi
      var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"] // Antarktika hariç
      }));
      polygonSeries.mapPolygons.template.setAll({
        fill: COLOR_LAND,
        fillOpacity: 0.55,
        stroke: am5.color(0x000000),
        strokeOpacity: 0.35,
        strokeWidth: 0.5,
        tooltipText: "{name}",
        interactive: true
      });
      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: COLOR_LAND_HOV,
        fillOpacity: 0.95
      });

      // Türkiye vurgu — özel renk (altın)
      polygonSeries.mapPolygons.template.adapters.add("fill", function(fill, target){
        var dc = target.dataItem && target.dataItem.dataContext;
        if(dc && dc.id === "TR") return COLOR_HUB;
        return fill;
      });
      polygonSeries.mapPolygons.template.adapters.add("fillOpacity", function(op, target){
        var dc = target.dataItem && target.dataItem.dataContext;
        if(dc && dc.id === "TR") return 0.85;
        return op;
      });

      // Ülke tıklanınca Kervea firmalarını o ülkeye filtrele
      polygonSeries.mapPolygons.template.events.on("click", function(ev){
        var dc = ev.target.dataItem && ev.target.dataItem.dataContext;
        if(!dc || !dc.id) return;
        var cc = dc.id.toLowerCase();
        if(typeof CUR_CC !== "undefined" && typeof renderPositions === "function"){
          try {
            CUR_CC = cc;
            if(typeof buildCountryDD === "function") buildCountryDD("ddCountry", CUR_CC);
            renderPositions();
            var firmsSec = document.getElementById("firmsSec");
            if(firmsSec) firmsSec.scrollIntoView({behavior:"smooth", block:"start"});
          } catch(err){ console.error("[Globe] Ülke tıklama hatası:", err); }
        }
      });

      // Hub noktaları — parlayan daireler + etiket
      var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

      pointSeries.bullets.push(function(root, series, dataItem){
        var dc = dataItem.dataContext;
        var isMain = dc.main === true;
        var showLbl = dc.featured === true || isMain;  // v22: Türkiye (main) + 6 kıta temsilcisi featured hub sürekli görünür
        var container = am5.Container.new(root, {
          cursorOverStyle: "pointer",
          tooltipText: dc.name
        });
        // Pulse halka
        var pulseCircle = container.children.push(am5.Circle.new(root, {
          radius: isMain ? 10 : 7,
          fill: isMain ? COLOR_HUB : COLOR_HUB_ALT,
          fillOpacity: 0.28
        }));
        pulseCircle.animate({
          key: "scale", from: 0.6, to: 2.4, duration: 1800, loops: Infinity, easingFunction: am5.ease.out(am5.ease.cubic)
        });
        pulseCircle.animate({
          key: "opacity", from: 0.55, to: 0, duration: 1800, loops: Infinity
        });
        // Ana daire
        container.children.push(am5.Circle.new(root, {
          radius: isMain ? 6 : 4,
          fill: isMain ? COLOR_HUB : COLOR_HUB_ALT,
          stroke: am5.color(0xffffff),
          strokeWidth: isMain ? 2 : 1.2,
          strokeOpacity: 0.9
        }));
        // v20: Etiket — SADECE main (Türkiye) sürekli, diğerleri hover'da
        // Görsel kirlilik önlemek için diğer 33 hub'ın etiketi hover tooltip'e devredildi
        var hubLabel = am5.Label.new(root, {
          text: dc.name,
          fill: isMain ? COLOR_HUB : COLOR_HUB_ALT,
          fontSize: isMain ? 13 : 10.5,
          fontWeight: isMain ? "700" : "600",
          fontFamily: "Georgia, serif",
          centerX: am5.p50,
          centerY: am5.p100,
          y: isMain ? -12 : -9,
          background: am5.Rectangle.new(root, {
            fill: am5.color(0x000000),
            fillOpacity: 0.55
          }),
          paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2,
          opacity: showLbl ? 1 : 0  // ← main VE showLabel sürekli, diğerleri hover'da
        });
        container.children.push(hubLabel);
        // Hover'da label'ı göster/gizle (main + showLabel hariç)
        if(!showLbl){
          container.events.on("pointerover", function(){
            hubLabel.animate({ key: "opacity", to: 1, duration: 180 });
          });
          container.events.on("pointerout", function(){
            hubLabel.animate({ key: "opacity", to: 0, duration: 180 });
          });
        }
        // Tıklama → ülkeyi filtrele
        container.events.on("click", function(){
          if(!dc.cc) return;
          if(typeof CUR_CC !== "undefined" && typeof renderPositions === "function"){
            try {
              CUR_CC = dc.cc;
              if(typeof buildCountryDD === "function") buildCountryDD("ddCountry", CUR_CC);
              renderPositions();
              var firmsSec = document.getElementById("firmsSec");
              if(firmsSec) firmsSec.scrollIntoView({behavior:"smooth", block:"start"});
            } catch(err){ console.error("[Globe] Hub tıklama hatası:", err); }
          }
        });
        return am5.Bullet.new(root, { sprite: container });
      });

      // Hub verilerini besle
      // Ülke isimleri CI[LANG]'dan çekiliyor — dil değişikliği ile senkron
      var _cnames = (typeof CI !== "undefined") ? (CI[LANG] || CI.tr || {}) : {};
      KERVEA_HUBS.forEach(function(h){
        var displayName = (_cnames[h.cc] || h.cc.toUpperCase());
        // ALL CAPS for visual consistency in the map
        pointSeries.data.push({
          geometry: { type: "Point", coordinates: [h.lon, h.lat] },
          name: displayName.toUpperCase(), cc: h.cc, main: !!h.main, featured: !!h.featured
        });
      });

      // Türkiye'den → diğer hub'lara koridor yayları (great-circle)
      var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
      lineSeries.mapLines.template.setAll({
        stroke: COLOR_ROUTE,
        strokeOpacity: 0.45,
        strokeWidth: 1.5
      });
      var trHub = KERVEA_HUBS[0]; // TR
      // Türkiye'den 15 stratejik koridor (Avrupa + Orta Asya + Afrika + ABD + Uzakdoğu)
      var corridorTargets = ["cn","de","nl","fr","gb","it","es","us","ae","sa","kz","in","ng","eg","jp","kr","ru","br","ma","za"];
      corridorTargets.forEach(function(cc){
        var t = KERVEA_HUBS.find(function(h){ return h.cc === cc; });
        if(!t) return;
        lineSeries.data.push({
          geometry: {
            type: "LineString",
            coordinates: [[trHub.lon, trHub.lat], [t.lon, t.lat]]
          }
        });
      });

      // Otomatik yavaş dönüş — 45 saniyede bir tam tur
      var reducedMotion = false;
      try { reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}

      if(!reducedMotion){
        AM_GLOBE.spin = chart.animate({
          key: "rotationX",
          from: 30, to: -330,
          duration: 45000,
          loops: Infinity
        });
      }

      // Kullanıcı sürüklerse otomatik dönüş dursun
      chart.events.on("panstarted", function(){
        if(AM_GLOBE.spin){ AM_GLOBE.spin.stop(); AM_GLOBE.spin = null; }
      });

      // Yumuşak açılış
      chart.appear(900, 100);

      AM_GLOBE.ready = true;
      console.info("[Globe] amCharts 5 orthographic hazır ✓");
    });
  } catch(err){
    console.error("[Globe] Init hatası:", err);
  }
}



(function init(){
 // ?reset=1 URL parametresi: kayıtlı tüm oturumu ve tercihleri temizle, guest deneyimini aç.
 // Kullanım: kervea.html?reset=1
 try{
   var params = new URLSearchParams(window.location.search);
   if(params.get("reset")==="1"){
     var keys = ["kv_auth","kv_scnt","views","user","provider","theme","lang"];
     keys.forEach(function(k){ try{ localStorage.removeItem("kervea_"+k); }catch(e){} });
     // Kervea localStorage prefix'i tümüyle temizle
     for(var i=localStorage.length-1;i>=0;i--){
       var k = localStorage.key(i); if(k && k.indexOf("kervea_")===0) localStorage.removeItem(k);
     }
     // Query'yi kaldır (yenilenmelerde tekrar sıfırlamasın)
     if(window.history && window.history.replaceState){
       window.history.replaceState({}, "", window.location.pathname);
     }
     console.info("[Kervea] Oturum ve tercihler sıfırlandı — guest deneyim aktif.");
   }
 }catch(e){}
 // Restore theme
 var st = ls("theme"); if(st){THEME=st; document.documentElement.setAttribute("data-theme",st);}
 // Restore language
 var sl = ls("lang") || "tr";
 // Restore user
 var su = ls("user"); if(su){try{USER=JSON.parse(su);}catch(e){}}
 // Build UI FIRST (before GSAP animations)
 setLang(sl);
 sortBy("uyum");
 // 3D dönen dünya küresi (amCharts 5 orthographic) — DOM ve amCharts hazır olduktan sonra başlar
 /* v35: defer heavy globe init to browser idle time */if("requestIdleCallback" in window){requestIdleCallback(initAmChartsGlobe,{timeout:1500});}else{setTimeout(initAmChartsGlobe,800);}
 // Animate stat counters when the hero comes into view — ONLY first time
 updateStats(false);
 if(!STATS_ANIMATED){
   STATS_ANIMATED = true;
   setTimeout(function(){ updateStats(true); }, 600);
 }
 // Register GSAP ScrollTrigger AFTER content is built
 if(window.gsap){
   if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
   // Hero animation (only home is visible on load) — use autoAlpha so elements always end visible
   var tl = gsap.timeline({defaults:{ease:"expo.out",duration:.9}});
   tl.from(".hhero .htag", {autoAlpha:0, y:14, duration:.6})
     .from(".hhero h1", {autoAlpha:0, y:24}, "-=.35")
     .from(".hhero .lead", {autoAlpha:0, y:18}, "-=.55")
     .from(".hhero .sbar", {autoAlpha:0, y:18}, "-=.5")
     .from(".hhero .dene", {autoAlpha:0, y:14, duration:.5}, "-=.45")
     .from(".hhero .qf", {autoAlpha:0, y:14, duration:.5}, "-=.4")
     .from(".hhero .statc", {autoAlpha:0, y:14, duration:.5, stagger:.06}, "-=.4");

   // Firm cards reveal — DEFER so grid is populated first
   if(window.ScrollTrigger){
    setTimeout(function(){
      var cards = gsap.utils.toArray("#home .pc");
      cards.forEach(function(c,i){
        gsap.set(c, {opacity:0, y:30}); // set start state
        ScrollTrigger.create({
          trigger:c, start:"top 92%", once:true,
          onEnter:function(){
            gsap.to(c, {opacity:1, y:0, duration:.7, delay:Math.min(i%3*0.08,.2), ease:"expo.out",
              clearProps:"transform,opacity"});
          }
        });
      });
      ScrollTrigger.refresh();
    }, 100);

    // 3D tilt effect on firm cards
    setupCardTilt();
    // Magnetic buttons
    setupMagneticButtons();
   }

   // Watch for language / sort re-renders to re-apply reveals
   var _obs = new MutationObserver(function(muts){
     if(window.ScrollTrigger){ ScrollTrigger.refresh(); }
   });
   var pg = document.getElementById("posgrid");
   if(pg) _obs.observe(pg, {childList:true});
 }
})();

// ===== 3D tilt on firm cards (mouse-follow perspective + glow) =====
function setupCardTilt(){
 document.addEventListener("mousemove", function(e){
   var card = e.target.closest(".pc");
   if(!card) return;
   var r = card.getBoundingClientRect();
   var cx = (e.clientX - r.left) / r.width;
   var cy = (e.clientY - r.top) / r.height;
   var rx = (cy - .5) * -6; // tilt X
   var ry = (cx - .5) * 6;  // tilt Y
   card.style.transform = "perspective(1000px) rotateX("+rx+"deg) rotateY("+ry+"deg) translateY(-4px) scale(1.01)";
   card.style.transition = "transform .1s ease-out, box-shadow .3s";
   // Mouse-follow glow via CSS custom prop
   card.style.setProperty("--mx", (cx*100)+"%");
   card.style.setProperty("--my", (cy*100)+"%");
 }, true);
 // Reset on card leave via delegation on grid
 var grid = document.getElementById("posgrid");
 if(grid){
   grid.addEventListener("mouseleave", function(){
     grid.querySelectorAll(".pc").forEach(function(c){
       c.style.transform = "";
       c.style.transition = "transform .5s cubic-bezier(.2,.9,.3,1.2)";
     });
   });
   // Also reset when hovering non-card area
   grid.addEventListener("mousemove", function(e){
     if(!e.target.closest(".pc")){
       grid.querySelectorAll(".pc").forEach(function(c){
         if(c.style.transform){ c.style.transform = ""; }
       });
     }
   });
 }
}

// ===== Magnetic pull on primary buttons =====
function setupMagneticButtons(){
 document.addEventListener("mousemove", function(e){
   var btn = e.target.closest(".btn:not(.sec)");
   if(!btn || btn.closest(".msginput")) return; // skip send button (too small, too frequent)
   var r = btn.getBoundingClientRect();
   var mx = e.clientX - (r.left + r.width/2);
   var my = e.clientY - (r.top + r.height/2);
   var strength = .25;
   btn.style.transform = "translate("+(mx*strength)+"px,"+(my*strength)+"px)";
   btn.style.transition = "transform .15s ease-out";
 });
 document.addEventListener("mouseleave", function(e){
   var btn = e.target.closest && e.target.closest(".btn:not(.sec)");
   if(!btn) return;
   btn.style.transform = "";
   btn.style.transition = "transform .35s cubic-bezier(.2,.9,.3,1.2)";
 }, true);
}



// ═══════════════════════════════════════════════════════════════════
// KERVEA · HAKKIMIZDA HARİTASI (Faz 17)
// Bağımsız SVG: harici kütüphane gerektirmez, marka paletiyle çizilir,
// ülke adları seçili dile göre (CI[LANG]) yazılır.
// ═══════════════════════════════════════════════════════════════════
function renderAboMap(){
  // Veri fonksiyonun içinde: setLang sayfa açılışında bu satırlara gelinmeden çağırabiliyor.
  var KV_AMAP = {
  hub:    { cc:"tr", lng:35,  lat:39 },
  active: [ { cc:"sn", lng:-14, lat:15 }, { cc:"ci", lng:-5, lat:7 }, { cc:"ng", lng:3, lat:7 } ],
  future: [ { cc:"de", lng:10, lat:51 }, { cc:"gb", lng:-3, lat:54 }, { cc:"es", lng:-4, lat:40 }, { cc:"it", lng:12, lat:43 },
            { cc:"ma", lng:-7, lat:32 }, { cc:"eg", lng:30, lat:27 }, { cc:"sa", lng:45, lat:24 }, { cc:"ae", lng:54, lat:24 },
            { cc:"ru", lng:55, lat:60 }, { cc:"kz", lng:67, lat:48 }, { cc:"cn", lng:105, lat:35 }, { cc:"in", lng:78, lat:22 },
            { cc:"jp", lng:138, lat:36 }, { cc:"us", lng:-95, lat:38 }, { cc:"br", lng:-50, lat:-10 }, { cc:"za", lng:24, lat:-29 },
            { cc:"au", lng:133, lat:-25 } ]
};
  var host = document.getElementById("kvAboMap"); if(!host) return;
  var names = (typeof CI !== "undefined" && (CI[LANG] || CI.tr)) || {};
  function nm(cc){ return escapeHtml(names[cc] || cc.toUpperCase()); }
  function X(lng){ return ((lng + 180) / 360 * 2000); }
  function Y(lat){ return ((90 - lat) / 180 * 1000); }
  function f(n){ return n.toFixed(1); }
  var H = KV_AMAP.hub, hx = X(H.lng), hy = Y(H.lat), out = [];
  // enlem-boylam ızgarası (çok silik)
  var g = "";
  for(var lo = -150; lo <= 150; lo += 30) g += '<line x1="'+f(X(lo))+'" y1="0" x2="'+f(X(lo))+'" y2="1000"/>';
  for(var la = 60; la >= -60; la -= 30) g += '<line x1="0" y1="'+f(Y(la))+'" x2="2000" y2="'+f(Y(la))+'"/>';
  out.push('<g class="kv-amap-grid">'+g+'</g>');
  out.push('<use class="kv-amap-land" href="#kvWorldLand"/>');
  // aktif koridor yayları
  KV_AMAP.active.forEach(function(d, i){
    var x = X(d.lng), y = Y(d.lat), mx = (hx + x) / 2, my = (hy + y) / 2;
    var dx = x - hx, dy = y - hy, len = Math.sqrt(dx*dx + dy*dy) || 1, k = 0.20 * len;
    var cx = mx + (dy / len) * k, cy = my - (dx / len) * k;
    out.push('<path class="kv-amap-route" style="animation-delay:'+(0.25 + i*0.18).toFixed(2)+'s" pathLength="1" d="M'+f(hx)+','+f(hy)+' Q'+f(cx)+','+f(cy)+' '+f(x)+','+f(y)+'"/>');
  });
  // hedef koridorlar
  KV_AMAP.future.forEach(function(d){
    out.push('<circle class="kv-amap-fut" cx="'+f(X(d.lng))+'" cy="'+f(Y(d.lat))+'" r="9"><title>'+nm(d.cc)+'</title></circle>');
  });
  // aktif hublar + etiket
  var lab = [ {dx:-24, dy:-10, a:"end"}, {dx:-24, dy:44, a:"end"}, {dx:26, dy:46, a:"start"} ];
  KV_AMAP.active.forEach(function(d, i){
    var x = X(d.lng), y = Y(d.lat), L = lab[i] || lab[0];
    out.push('<circle class="kv-amap-hub" cx="'+f(x)+'" cy="'+f(y)+'" r="14"><title>'+nm(d.cc)+'</title></circle>');
    out.push('<text class="kv-amap-t" x="'+f(x + L.dx)+'" y="'+f(y + L.dy)+'" text-anchor="'+L.a+'">'+nm(d.cc)+'</text>');
  });
  // Türkiye
  out.push('<circle class="kv-amap-pulse" cx="'+f(hx)+'" cy="'+f(hy)+'" r="19"/>');
  out.push('<circle class="kv-amap-tr" cx="'+f(hx)+'" cy="'+f(hy)+'" r="18"><title>'+nm(H.cc)+'</title></circle>');
  out.push('<text class="kv-amap-t kv-amap-t-tr" x="'+f(hx + 32)+'" y="'+f(hy - 18)+'" text-anchor="start">'+nm(H.cc)+'</text>');
  var label = nm(H.cc) + ' — ' + KV_AMAP.active.map(function(d){ return nm(d.cc); }).join(', ');
  host.innerHTML = '<svg class="kv-amap-svg" viewBox="389 55 1472 767" role="img" aria-label="'+label+'" preserveAspectRatio="xMidYMid meet">'+out.join('')+'</svg>';
}
if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", renderAboMap); } else { renderAboMap(); }




// ═══════════════════════════════════════════════════════════════
// KERVEA PAY (Faz 10 · AddCashDisclosure benzeri)
// ═══════════════════════════════════════════════════════════════

function kvFormatCardNumber(input){
  var v = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  var chunks = v.match(/.{1,4}/g);
  input.value = chunks ? chunks.join(' ') : '';
}
function kvFormatExp(input){
  var v = input.value.replace(/\D/g, '');
  if(v.length >= 2){ v = v.slice(0,2) + '/' + v.slice(2,4); }
  input.value = v;
}
function kvUpdateCardPreview(){
  var num = document.getElementById('kvCcNumber');
  var holder = document.getElementById('kvCcHolder');
  var exp = document.getElementById('kvCcExp');
  if(num){
    var v = num.value.replace(/\s+/g,'');
    var padded = v.padEnd(16, '•').match(/.{1,4}/g).join(' ');
    var el = document.getElementById('ccNum');
    if(el) el.textContent = padded;
  }
  if(holder){
    var el = document.getElementById('ccName');
    if(el) el.textContent = holder.value.toUpperCase() || (T[LANG] && T[LANG].pay_card_holder_ph) || 'AD SOYAD';
  }
  if(exp){
    var el = document.getElementById('ccExp');
    if(el) el.textContent = exp.value || '••/••';
  }
}

function applyKvPromo(){
  var code = (document.getElementById('kvPayPromo').value || '').trim().toUpperCase();
  var validCodes = { 'KERVEA': 0.20, 'LAUNCH25': 0.25, 'PILOT10': 0.10 };
  var discRow = document.getElementById('kvPayDiscRow');
  var discEl = document.getElementById('kvPayDisc');
  var totalEl = document.getElementById('kvPayTotal');
  var ctaText = document.querySelector('.kv-pay-cta-txt');
  var base = 280, kdv = base * 0.20;
  if(validCodes[code]){
    var disc = base * validCodes[code];
    var newTotal = (base - disc + (base - disc) * 0.20).toFixed(2);
    discRow.style.display = 'flex';
    discEl.textContent = '−$' + disc.toFixed(2);
    totalEl.textContent = '$' + newTotal;
    if(ctaText) ctaText.innerHTML = ((T[LANG] && T[LANG].pay_confirm) || 'Ödemeyi Onayla — ') + '<b>$' + newTotal + '</b>';
    if(typeof toast === 'function') toast('%' + (validCodes[code]*100).toFixed(0) + ' indirim uygulandı');
  } else if(code){
    if(typeof toast === 'function') toast('Geçersiz promosyon kodu');
    kvShowAlert('destructive', 'Geçersiz promosyon kodu', code + ' kodu tanınmıyor. Kontrol edip tekrar deneyin.');
  }
}

// Kart alanlarını temizle: değerler form kapandıktan sonra DOM'da/bellekte beklemesin.
function kvWipeCardFields(){
  ['kvCcNumber','kvCcHolder','kvCcExp','kvCcCvc'].forEach(function(id){ var el = document.getElementById(id); if(el) el.value = ''; });
}
function kvConfirmPayment(){
  // Client-side validation
  var num = document.getElementById('kvCcNumber').value.replace(/\s+/g, '');
  var holder = document.getElementById('kvCcHolder').value.trim();
  var exp = document.getElementById('kvCcExp').value;
  var cvc = document.getElementById('kvCcCvc').value;
  
  if(num.length < 13 || num.length > 19 || !/^\d+$/.test(num)){
    kvShowAlert('destructive', 'Kart numarası hatalı', 'Lütfen geçerli bir kart numarası girin (13-19 hane).');
    return;
  }
  if(holder.length < 3){
    kvShowAlert('destructive', 'Kart sahibi adı hatalı', 'Kart üzerindeki adı girin (min 3 karakter).');
    return;
  }
  if(!/^\d{2}\/\d{2}$/.test(exp)){
    kvShowAlert('destructive', 'Son kullanma tarihi hatalı', 'AA/YY formatında girin (örnek: 12/28).');
    return;
  }
  if(!/^\d{3,4}$/.test(cvc)){
    kvShowAlert('destructive', 'CVC hatalı', 'Kartın arkasındaki 3-4 haneli kodu girin.');
    return;
  }
  
  // Rate limit
  if(typeof rateLimit === 'function' && !rateLimit('payment', 5)){
    kvShowAlert('destructive', 'Çok fazla deneme', '1 dakika içinde çok fazla ödeme denemesi yapıldı. Lütfen bekleyin.');
    return;
  }
  
  // Loading state
  var btn = document.getElementById('kvPayConfirmBtn');
  btn.disabled = true;
  btn.querySelector('.kv-pay-cta-txt').style.display = 'none';
  btn.querySelector('.kv-pay-cta-loading').style.display = 'inline-flex';
  
  // Simulated payment (real flow → backend + Stripe.js)
  setTimeout(function(){
    btn.disabled = false;
    btn.querySelector('.kv-pay-cta-txt').style.display = 'inline';
    btn.querySelector('.kv-pay-cta-loading').style.display = 'none';
    kvWipeCardFields();
    closeM('pay');
    if(typeof toast === 'function') toast('Ödemeniz alındı · Kervea Premium aktif');
    kvShowAlert('success', 'Ödeme başarılı', 'Kervea Premium üyeliğiniz aktifleşti. E-postanıza fatura gönderildi.');
  }, 2000);
}

// ═══════════════════════════════════════════════════════════════
// KERVEA ALERT (Faz 10 · Alert15 benzeri)
// destructive / warning / success / info variantları
// ═══════════════════════════════════════════════════════════════
function kvShowAlert(variant, title, description, duration){
  var wrap = document.getElementById('kvAlertWrap');
  if(!wrap){
    wrap = document.createElement('div');
    wrap.id = 'kvAlertWrap';
    wrap.className = 'kv-alert-wrap';
    document.body.appendChild(wrap);
  }
  var icons = {
    destructive: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2l10 20H2L12 2zm0 5.5L5.5 20h13L12 7.5zm-1 4h2v5h-2zm0 6h2v2h-2z"/></svg>',
    warning: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2l10 20H2L12 2zm0 5.5L5.5 20h13L12 7.5z"/><circle cx="12" cy="17" r="1"/><path d="M11 10h2v5h-2z"/></svg>',
    success: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',
    info: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
  };
  var el = document.createElement('div');
  el.className = 'kv-alert kv-alert--' + (variant || 'info');
  el.setAttribute('role', 'alert');
  el.innerHTML = 
    '<div class="kv-alert-icon">' + (icons[variant] || icons.info) + '</div>' +
    '<div class="kv-alert-body">' +
      '<div class="kv-alert-title">' + escapeHtml(title || '') + '</div>' +
      (description ? '<div class="kv-alert-desc">' + escapeHtml(description) + '</div>' : '') +
    '</div>' +
    '<button class="kv-alert-close" aria-label="Kapat">×</button>';
  el.querySelector('.kv-alert-close').addEventListener('click', function(){
    el.classList.add('kv-alert-out');
    setTimeout(function(){ el.remove(); }, 250);
  });
  wrap.appendChild(el);
  requestAnimationFrame(function(){ el.classList.add('kv-alert-in'); });
  var dur = duration || (variant === 'destructive' ? 6000 : 4000);
  if(dur > 0){
    setTimeout(function(){
      el.classList.add('kv-alert-out');
      setTimeout(function(){ el.remove(); }, 250);
    }, dur);
  }
}





// ═══════════════════════════════════════════════════════════════
// KERVEA USER MENU (Faz 11 · DropdownMenu1 benzeri)
// ═══════════════════════════════════════════════════════════════
function toggleUserMenu(e){
  if(e) e.stopPropagation();
  var menu = document.getElementById('kvUserMenu');
  if(!menu) return;
  var wasOpen = menu.classList.contains('open');
  menu.classList.toggle('open');
  var trigger = menu.querySelector('.kv-usermenu-trigger');
  if(trigger) trigger.setAttribute('aria-expanded', !wasOpen);
}
function closeUserMenu(){
  var menu = document.getElementById('kvUserMenu');
  if(menu){
    menu.classList.remove('open');
    var trigger = menu.querySelector('.kv-usermenu-trigger');
    if(trigger) trigger.setAttribute('aria-expanded', 'false');
  }
}
// Click outside to close
document.addEventListener('click', function(e){
  var menu = document.getElementById('kvUserMenu');
  if(menu && menu.classList.contains('open') && !menu.contains(e.target)){
    closeUserMenu();
  }
});
// Escape to close
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeUserMenu();
});

function kvLogout(){
  // Client-side: safeStorage temizle
  try {
    if(window.safeStorage) safeStorage.remove('session');
    if(typeof toast === 'function') toast('Çıkış yapıldı');
    if(typeof kvShowAlert === 'function') kvShowAlert('info','Çıkış yapıldı','Kervea hesabınızdan güvenle çıkış yaptınız.');
    if(typeof go === 'function') go('home');
  } catch(e){}
}

// ═══════════════════════════════════════════════════════════════
// KERVEA CONSENT (Faz 11 · Checkbox16 benzeri Reset/Continue)
// Zorunlu 3 checkbox (cx1, cx2, cx3) işaretlenmedikçe Continue disabled
// ═══════════════════════════════════════════════════════════════
function kvUpdateConsentState(){
  var required = ['cx1','cx2','cx3','cx6'];
  var allChecked = required.every(function(id){
    var el = document.getElementById(id);
    return el && el.checked;
  });
  var btn = document.getElementById('kvConsentContinue');
  if(btn) btn.disabled = !allChecked;
}
function kvResetConsents(){
  ['cx1','cx2','cx3','cx4','cx5','cx6'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.checked = false;
  });
  kvUpdateConsentState();
  if(typeof toast === 'function') toast('Onaylar sıfırlandı');
}
function kvContinueConsents(){
  // Sim validation
  var required = ['cx1','cx2','cx3','cx6'];
  var allChecked = required.every(function(id){ return document.getElementById(id) && document.getElementById(id).checked; });
  if(!allChecked){
    if(typeof kvShowAlert === 'function') kvShowAlert('destructive','Zorunlu onaylar eksik','Firma kaydı için zorunlu maddeleri onaylayın.');
    return;
  }
  // Call existing submit logic if any
  if(typeof submitAddCompany === 'function'){
    submitAddCompany();
  } else if(typeof submitAdd === 'function'){
    submitAdd();
  } else {
    if(typeof toast === 'function') toast('Firma kaydınız alındı');
    if(typeof kvShowAlert === 'function') kvShowAlert('success','Firma kaydı alındı','Kervea ekibi 24 saat içinde doğrulama süreci için sizinle iletişime geçecek.');
  }
}
// Sayfa yüklendiğinde initial state
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', kvUpdateConsentState);
} else {
  setTimeout(kvUpdateConsentState, 200);
}





// ═══════════════════════════════════════════════════════════════
// KERVEA HERO TEXT LOOP (Faz 12 · TextLoop adaptasyonu)
// ═══════════════════════════════════════════════════════════════
(function initHeroLoop(){
  var _loopIdx = 0, _loopItems = [];
  function tick(){
    var container = document.getElementById('kvHeroLoopContainer');
    if(!container) return;
    _loopItems = container.querySelectorAll('.kv-hero-loop-item');
    if(_loopItems.length === 0) return;
    // Remove active
    _loopItems.forEach(function(el){
      el.classList.remove('kv-hero-loop-active','kv-hero-loop-exit');
    });
    // Current exits
    if(_loopItems[_loopIdx]) _loopItems[_loopIdx].classList.add('kv-hero-loop-exit');
    // Next
    _loopIdx = (_loopIdx + 1) % _loopItems.length;
    setTimeout(function(){
      _loopItems.forEach(function(el){ el.classList.remove('kv-hero-loop-exit'); });
      if(_loopItems[_loopIdx]) _loopItems[_loopIdx].classList.add('kv-hero-loop-active');
    }, 50);
  }
  function start(){
    var c = document.getElementById('kvHeroLoopContainer');
    if(!c) { setTimeout(start, 500); return; }
    // İlk item zaten aktif (HTML'de)
    setInterval(tick, 2200);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else { start(); }
})();

// ═══════════════════════════════════════════════════════════════
// KERVEA ANIMATED TABS HOVER (Faz 12 · AnimatedTabsHover)
// About TOC ve benzeri tab container'lara sliding background
// ═══════════════════════════════════════════════════════════════
function kvInitAnimatedTabs(){
  document.querySelectorAll('.abo-toc').forEach(function(container){
    if(container.dataset.kvAnimTabs === 'ok') return;
    container.dataset.kvAnimTabs = 'ok';
    var items = container.querySelectorAll('a');
    items.forEach(function(item){
      item.addEventListener('mouseenter', function(){
        var rect = item.getBoundingClientRect();
        var cRect = container.getBoundingClientRect();
        container.style.setProperty('--kv-tab-x', (rect.left - cRect.left) + 'px');
        container.style.setProperty('--kv-tab-w', rect.width + 'px');
        container.classList.add('kv-tab-hover-active');
      });
    });
    container.addEventListener('mouseleave', function(){
      container.classList.remove('kv-tab-hover-active');
    });
  });
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', kvInitAnimatedTabs);
} else { setTimeout(kvInitAnimatedTabs, 100); }

// ═══════════════════════════════════════════════════════════════
// KERVEA VERIFIED AVATAR (Faz 12 · Avatar8 helper)
// Programmatic avatar oluşturma
// ═══════════════════════════════════════════════════════════════
window.kvVerifiedAvatar = function(opts){
  opts = opts || {};
  var wrap = document.createElement('div');
  wrap.className = 'kv-avatar' + (opts.verified !== false ? ' kv-avatar-verified' : '');
  wrap.style.width = (opts.size || 44) + 'px';
  wrap.style.height = (opts.size || 44) + 'px';
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '100%';
  inner.style.background = opts.bg || 'linear-gradient(135deg,#0A5F56,#0D8A80)';
  inner.style.color = '#F5FAF8';
  inner.style.display = 'inline-flex';
  inner.style.alignItems = 'center';
  inner.style.justifyContent = 'center';
  inner.style.fontWeight = '700';
  inner.style.fontSize = ((opts.size || 44) * 0.4) + 'px';
  if(opts.img){
    inner.innerHTML = '<img src="' + escapeAttr(opts.img) + '" alt="' + escapeAttr(opts.name || '') + '" style="width:100%;height:100%;object-fit:cover"/>';
  } else {
    inner.textContent = (opts.name || '?').split(/\s+/).map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
  }
  wrap.appendChild(inner);
  if(opts.verified !== false){
    var badge = document.createElement('span');
    badge.className = 'kv-avatar-badge';
    badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    badge.setAttribute('aria-label', 'Doğrulanmış');
    wrap.appendChild(badge);
  }
  return wrap;
};

// ═══════════════════════════════════════════════════════════════
// KERVEA PAGINATION (Faz 12 · Pagination3 adaptasyonu)
// Kullanım: renderKvPagination(containerId, currentPage, totalPages, onPageChange)
// ═══════════════════════════════════════════════════════════════
window.renderKvPagination = function(containerId, current, total, onChange){
  var container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = '';
  container.className = 'kv-pagination';
  if(total <= 1) return;
  
  var prevLbl = (T[LANG] && T[LANG].pg_prev) || 'Önceki';
  var nextLbl = (T[LANG] && T[LANG].pg_next) || 'Sonraki';
  
  function mkItem(pageNum, label, isActive, isDisabled, isNav){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kv-pg-item' + (isActive ? ' kv-pg-active' : '') + (isNav ? ' kv-pg-nav' : '');
    if(isDisabled) btn.disabled = true;
    btn.textContent = label != null ? label : pageNum;
    if(!isDisabled && !isActive){
      btn.addEventListener('click', function(){
        if(typeof onChange === 'function') onChange(pageNum);
      });
    }
    return btn;
  }
  function mkDots(){
    var d = document.createElement('span');
    d.className = 'kv-pg-dots';
    d.textContent = '…';
    return d;
  }
  
  // Prev
  container.appendChild(mkItem(current - 1, '← ' + prevLbl, false, current === 1, true));
  
  // Pages (max 7 visible: 1 … cur-1 cur cur+1 … last)
  var pages = [];
  if(total <= 7){
    for(var i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if(current > 3) pages.push('...');
    for(var j = Math.max(2, current-1); j <= Math.min(total-1, current+1); j++) pages.push(j);
    if(current < total-2) pages.push('...');
    pages.push(total);
  }
  pages.forEach(function(p){
    if(p === '...') container.appendChild(mkDots());
    else container.appendChild(mkItem(p, null, p === current, false, false));
  });
  
  // Next
  container.appendChild(mkItem(current + 1, nextLbl + ' →', false, current === total, true));
};





// ═══════════════════════════════════════════════════════════════
// KERVEA AUTH STATE (Faz 13)
// Login yapılmadan user dropdown menu gösterilmesin
// ═══════════════════════════════════════════════════════════════
// OTURUM SÜRESİ (Faz 17) — 45 dk sonra oturum düşer
var KV_SESSION_MINUTES = 45;
var KV_SESSION_SLIDING = true; // true: son hareketten itibaren 45 dk · false: girişten itibaren sabit 45 dk
var _kvWasIn = false;
function _kvSessionExpired(s){
  var ref = KV_SESSION_SLIDING ? (s.last || s.ts) : s.ts;
  if(typeof ref !== 'number') return true; // zaman damgası olmayan eski/süresiz kayıt geçersiz
  return (Date.now() - ref) > KV_SESSION_MINUTES * 60000;
}
function _kvClearSession(){
  try {
    if(window.safeStorage) safeStorage.remove('session');
    ['kv_auth','user','provider'].forEach(function(k){ try{ localStorage.removeItem('kervea_' + k); }catch(e){} });
  } catch(e){}
}
window.kvIsLoggedIn = function(){
  try {
    if(!window.safeStorage) return false;
    var s = safeStorage.get('session');
    if(!s) return false;
    if(typeof s !== 'object' || _kvSessionExpired(s)){ _kvClearSession(); return false; }
    return true;
  } catch(e){ return false; }
};

window.kvSetLoggedIn = function(userInfo){
  try {
    if(window.safeStorage){
      var _info = (userInfo && typeof userInfo === 'object') ? userInfo : { logged: true };
      _info.ts = Date.now();
      _info.last = _info.ts;
      safeStorage.set('session', _info);
      _kvWasIn = true;
    }
    kvUpdateAuthUI();
    try { if(typeof renderPositions === 'function') renderPositions(); } catch(e){}
  } catch(e){}
};

window.kvUpdateAuthUI = function(){
  var loggedIn = kvIsLoggedIn();
  var loginBtn = document.querySelector('.ghostbtn[onclick*="login"]');
  var userMenu = document.getElementById('kvUserMenu');
  if(loginBtn) loginBtn.style.display = loggedIn ? 'none' : '';
  if(userMenu) userMenu.style.display = loggedIn ? '' : 'none';
  // Update avatar initial from user info if available
  if(loggedIn){
    try {
      var info = window.safeStorage ? safeStorage.get('session') : null;
      var avatar = document.getElementById('kvUserAvatar');
      if(avatar && info && info.name){
        avatar.textContent = String(info.name).split(/\s+/).map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
      }
    } catch(e){}
  }
};

// Logout güncellemesi
var _oldKvLogout = window.kvLogout;
window.kvLogout = function(){
  try {
    if(window.safeStorage) safeStorage.remove('session');
    kvUpdateAuthUI();
    if(typeof toast === 'function') toast('Çıkış yapıldı');
    if(typeof kvShowAlert === 'function') kvShowAlert('info','Çıkış yapıldı','Kervea hesabınızdan güvenle çıkış yaptınız.');
    if(typeof go === 'function') go('home');
  } catch(e){}
};

// Panel içindeki "Çıkış" (doLogout) oturum kaydını da silsin
var _oldDoLogout = window.doLogout;
window.doLogout = function(){
  _kvClearSession(); _kvWasIn = false;
  try { kvUpdateAuthUI(); } catch(e){}
  if(typeof _oldDoLogout === 'function') return _oldDoLogout.apply(this, arguments);
};

// Hareket takibi — süresi dolmuş oturumu ASLA canlandırmaz
var _kvLastTouch = 0;
function _kvTouch(){
  var n = Date.now();
  if(n - _kvLastTouch < 30000) return;
  _kvLastTouch = n;
  try {
    var s = window.safeStorage ? safeStorage.get('session') : null;
    if(s && typeof s === 'object' && !_kvSessionExpired(s)){ s.last = n; safeStorage.set('session', s); }
  } catch(e){}
}
['click','keydown','touchstart','scroll'].forEach(function(ev){
  window.addEventListener(ev, _kvTouch, { passive: true, capture: true });
});

// Süre bekçisi — oturum düşünce arayüzü güncelle, paneldeyse login'e al
function _kvSessionWatch(){
  var was = _kvWasIn, now = kvIsLoggedIn();
  _kvWasIn = now;
  if(was && !now){
    try { kvUpdateAuthUI(); } catch(e){}
    if(typeof toast === 'function') toast('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
    var p = document.getElementById('panel');
    if(p && p.classList.contains('on') && typeof go === 'function') go('login');
  }
}
_kvWasIn = kvIsLoggedIn();
setInterval(_kvSessionWatch, 15000);
document.addEventListener('visibilitychange', function(){ if(!document.hidden) _kvSessionWatch(); });

// Sayfa yüklenirken initial state
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(kvUpdateAuthUI, 100); });
} else { setTimeout(kvUpdateAuthUI, 100); }

// HASH GUARD — giriş yapılmadan #panel açılmasın
(function(){
  function _guardHash(){
    if(location.hash === '#panel' && !(typeof kvIsLoggedIn==='function' && kvIsLoggedIn())){
      try { history.replaceState(null,'',location.pathname + location.search); } catch(e){ location.hash = ''; }
      setTimeout(function(){ if(typeof go==='function') go('login'); }, 50);
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _guardHash);
  } else { _guardHash(); }
  window.addEventListener('hashchange', _guardHash);
})();



// ═══════════════════════════════════════════════════════════════
// KERVEA LOGIN SUBMIT (Faz 13)
// ═══════════════════════════════════════════════════════════════
window.kvTogglePw = function(btn){
  var input = btn.parentElement.querySelector('input[type="password"], input[type="text"]');
  if(!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.setAttribute('aria-label', input.type === 'password' ? 'Parolayı göster' : 'Parolayı gizle');
};

window.kvSubmitLogin = function(){
  var email = document.getElementById('kvLoginEmail').value.trim();
  var pass = document.getElementById('kvLoginPass').value;
  var remember = document.getElementById('kvRememberMe').checked;
  
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    kvShowAlert('destructive', 'E-posta hatalı', 'Lütfen geçerli bir e-posta adresi girin.');
    return;
  }
  if(pass.length < 8){
    kvShowAlert('destructive', 'Parola çok kısa', 'Parola en az 8 karakter olmalı.');
    return;
  }
  
  // Kaba kuvvet freni (kalıcı kilit)
  if(window.kvLoginGuard){
    var _w = kvLoginGuard.waitMs();
    if(_w > 0){
      kvShowAlert('destructive', 'Giriş geçici olarak kilitlendi', 'Çok fazla hatalı deneme. ' + Math.ceil(_w/60000) + ' dakika sonra tekrar deneyin.');
      return;
    }
  }
  // Rate limit
  if(typeof rateLimit === 'function' && !rateLimit('login', 5)){
    kvShowAlert('destructive', 'Çok fazla deneme', '1 dakika içinde çok fazla giriş denemesi. Lütfen bekleyin.');
    return;
  }
  
  // Simulated login (prod'da backend'e post)
  var btn = document.querySelector('.kv-login-btn');
  var oldTxt = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span>Giriş yapılıyor…</span>';
  
  setTimeout(function(){
    btn.disabled = false;
    btn.innerHTML = oldTxt;
    // Success — set logged in
    if(window.kvLoginGuard) kvLoginGuard.ok();
    kvSetLoggedIn({ email: email, name: email.split('@')[0], remember: remember, ts: Date.now() });
    kvShowAlert('success', 'Hoş geldiniz', 'Kervea paneline yönlendiriliyorsunuz.');
    setTimeout(function(){ if(typeof go === 'function') go('panel'); }, 800);
  }, 1500);
};

window.kvSocialLogin = function(provider){
  // Prod'da OAuth flow → provider.com'a redirect
  kvShowAlert('info', provider.charAt(0).toUpperCase() + provider.slice(1) + ' ile giriş', 
    'OAuth entegrasyonu pilot dönemin sonunda aktif olacak. Şu an sadece e-posta ile giriş yapabilirsiniz.');
};

// ═══════════════════════════════════════════════════════════════
// KERVEA NEWSLETTER SUBSCRIBE (Faz 13)
// ═══════════════════════════════════════════════════════════════
window.kvSubscribeNewsletter = function(e){
  e.preventDefault();
  var email = document.getElementById('kvNlEmail').value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    kvShowAlert('destructive', 'E-posta hatalı', 'Lütfen geçerli bir e-posta adresi girin.');
    return false;
  }
  if(typeof rateLimit === 'function' && !rateLimit('newsletter', 3)){
    kvShowAlert('warning', 'Sık talep', 'Kısa süre içinde çok abonelik denemesi. Lütfen bekleyin.');
    return false;
  }
  // Prod'da backend'e post
  document.getElementById('kvNlEmail').value = '';
  kvShowAlert('success', 'Abonelik alındı', 'Kervea pilot güncellemeleri ' + escapeHtml(email) + ' adresine gönderilecek.');
  return false;
};

// ═══════════════════════════════════════════════════════════════
// KERVEA NOTIFICATION LEVEL DROPDOWN (Faz 13 · DropdownMenu11)
// Panel/Settings için kullanılabilir dropdown factory
// ═══════════════════════════════════════════════════════════════
window.kvRenderNotifLevel = function(containerId, currentValue, onChange){
  var container = document.getElementById(containerId);
  if(!container) return;
  var levels = [
    { v:'all', nm:(T[LANG]&&T[LANG].nl_lvl_all)||'Tümü', d:(T[LANG]&&T[LANG].nl_lvl_all_d)||'Tüm bildirimleri al', ico:'<circle cx="12" cy="12" r="10"/>' },
    { v:'important', nm:(T[LANG]&&T[LANG].nl_lvl_imp)||'Önemli', d:(T[LANG]&&T[LANG].nl_lvl_imp_d)||'Sadece yüksek öncelikli', ico:'<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>' },
    { v:'mentions', nm:(T[LANG]&&T[LANG].nl_lvl_mnt)||'Mesajlar', d:(T[LANG]&&T[LANG].nl_lvl_mnt_d)||'Sadece direkt mesajlar', ico:'<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>' },
    { v:'silent', nm:(T[LANG]&&T[LANG].nl_lvl_sln)||'Sessiz', d:(T[LANG]&&T[LANG].nl_lvl_sln_d)||'Görsel gösterge, ses yok', ico:'<path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>' },
    { v:'off', nm:(T[LANG]&&T[LANG].nl_lvl_off)||'Kapalı', d:(T[LANG]&&T[LANG].nl_lvl_off_d)||'Bildirim gelmesin', ico:'<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>' }
  ];
  var cur = levels.find(function(l){return l.v === currentValue;}) || levels[0];
  container.className = 'kv-notif-level';
  container.innerHTML = '<button type="button" class="kv-notif-level-trigger" onclick="this.parentElement.classList.toggle(\'open\')">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>' +
    '<span>' + escapeHtml(cur.nm) + '</span>' +
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
    '</button>' +
    '<div class="kv-notif-level-content" role="menu">' +
    levels.map(function(l){
      return '<div class="kv-notif-level-item" role="menuitemradio" data-active="' + (l.v===currentValue) + '" data-value="' + l.v + '">' +
        '<span class="kv-nli-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + l.ico + '</svg></span>' +
        '<span class="kv-nli-txt"><span class="kv-nli-nm">' + escapeHtml(l.nm) + '</span><span class="kv-nli-desc">' + escapeHtml(l.d) + '</span></span>' +
        '<svg class="kv-nli-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
      '</div>';
    }).join('') +
    '</div>';
  container.querySelectorAll('.kv-notif-level-item').forEach(function(el){
    el.addEventListener('click', function(){
      var v = el.dataset.value;
      container.classList.remove('open');
      kvRenderNotifLevel(containerId, v, onChange);
      if(typeof onChange === 'function') onChange(v);
    });
  });
  // Click outside
  document.addEventListener('click', function(e){
    if(!container.contains(e.target)) container.classList.remove('open');
  }, { once: true });
};

// ═══════════════════════════════════════════════════════════════
// KERVEA TEXT EFFECT PER WORD (Faz 13 · TextEffectPerWord)
// Hero h1 word-by-word entry animation
// ═══════════════════════════════════════════════════════════════
window.kvTextEffectPerWord = function(el, delayPerWord){
  if(!el || el.dataset.kvWordAnim === 'on') return;
  el.dataset.kvWordAnim = 'on';
  delayPerWord = delayPerWord || 100;
  
  // Get innerHTML, split by spaces preserving nested tags like <em>
  // Simple approach: split text nodes only
  function walk(node){
    if(node.nodeType === Node.TEXT_NODE){
      var text = node.textContent;
      if(!text.trim()) return;
      var frag = document.createDocumentFragment();
      var words = text.split(/(\s+)/);
      words.forEach(function(w){
        if(!w.trim()){
          frag.appendChild(document.createTextNode(w));
        } else {
          var span = document.createElement('span');
          span.className = 'kv-text-word';
          span.textContent = w;
          frag.appendChild(span);
        }
      });
      node.parentNode.replaceChild(frag, node);
    } else if(node.nodeType === Node.ELEMENT_NODE){
      // For inline elements like <em>, wrap the whole element as a word
      if(['EM','STRONG','B','I','SPAN'].indexOf(node.tagName) !== -1){
        var wrap = document.createElement('span');
        wrap.className = 'kv-text-word';
        node.parentNode.insertBefore(wrap, node);
        wrap.appendChild(node);
      } else {
        Array.from(node.childNodes).forEach(walk);
      }
    }
  }
  walk(el);
  
  // Apply staggered delay
  el.querySelectorAll('.kv-text-word').forEach(function(w, i){
    w.style.animationDelay = (i * delayPerWord) + 'ms';
  });
};

// Auto-apply to hero h1 on load (with small delay to let other animations settle)
function _initHeroWordAnim(){
  var homeH1 = document.querySelector('#home h1');
  if(homeH1 && !homeH1.dataset.kvWordAnim){
    setTimeout(function(){ kvTextEffectPerWord(homeH1, 90); }, 300);
  }
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', _initHeroWordAnim);
} else { setTimeout(_initHeroWordAnim, 300); }





// ═══════════════════════════════════════════════════════════════
// KERVEA OVERVIEW DASHBOARD (Faz 14)
// ═══════════════════════════════════════════════════════════════
window.kvExportData = function(){
  if(typeof kvShowAlert === 'function'){
    kvShowAlert('info', 
      (T[LANG] && T[LANG].ov_export_h) || 'Veri dışa aktarımı', 
      (T[LANG] && T[LANG].ov_export_p) || 'JSON formatında dışa aktarma linki e-posta adresinize gönderilecek. Pilot dönemde bu özellik manuel talep üzerine hazırlanır.'
    );
  }
};

window.kvClearFilters = function(){
  document.querySelectorAll('.ov-filter-item input').forEach(function(i){ i.checked = false; });
  document.querySelector('.ov-filter-wrap').classList.remove('open');
  if(typeof toast === 'function') toast((T[LANG] && T[LANG].ov_filter_cleared) || 'Filtreler temizlendi');
};

// Overview welcome name update
function kvUpdateOverviewGreeting(){
  var nameEl = document.getElementById('ovUserName');
  if(!nameEl) return;
  try {
    if(window.safeStorage){
      var s = safeStorage.get('session');
      if(s){
        var n = s.name || (s.email ? s.email.split('@')[0] : null);
        if(n) nameEl.textContent = n.charAt(0).toUpperCase() + n.slice(1);
      }
    }
  } catch(e){}
}
// Time-of-day greeting
function kvTimeGreeting(){
  var h = new Date().getHours();
  var el = document.querySelector('.ov-welcome-h [data-i18n="ov_greeting"]');
  if(!el) return;
  var greetings = { tr: 'Merhaba', en: 'Hello', fr: 'Bonjour', es: 'Hola', ar: 'مرحبا', ru: 'Привет' };
  var morningGreetings = { tr: 'Günaydın', en: 'Good Morning', fr: 'Bonjour', es: 'Buenos días', ar: 'صباح الخير', ru: 'Доброе утро' };
  var eveningGreetings = { tr: 'İyi akşamlar', en: 'Good Evening', fr: 'Bonsoir', es: 'Buenas tardes', ar: 'مساء الخير', ru: 'Добрый вечер' };
  var g;
  if(h < 12) g = morningGreetings[LANG] || morningGreetings.en;
  else if(h > 18) g = eveningGreetings[LANG] || eveningGreetings.en;
  else g = greetings[LANG] || greetings.en;
  el.textContent = g;
}

// Panel switch olduğunda greeting güncelle
var _origShowPanel = window.showPanel;
if(typeof _origShowPanel === 'function'){
  window.showPanel = function(name, el){
    _origShowPanel(name, el);
    if(name === 'overview'){
      setTimeout(function(){
        kvUpdateOverviewGreeting();
        kvTimeGreeting();
      }, 50);
    }
  };
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){ kvUpdateOverviewGreeting(); kvTimeGreeting(); }, 200);
  });
} else {
  setTimeout(function(){ kvUpdateOverviewGreeting(); kvTimeGreeting(); }, 200);
}

