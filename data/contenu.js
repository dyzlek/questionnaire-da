// =====================================================================
//  CONTENU DU QUESTIONNAIRE
//  Pour ajouter un portfolio : copie une ligne de PORTFOLIOS.
//  Pour ajouter un style : copie un bloc de STYLES (le visuel « demo »
//  est stylé dans css/demos.css avec la classe .d-<id>).
//  ⚠ Ne change pas les « id » une fois le questionnaire envoyé :
//  ils servent à retrouver les réponses.
// =====================================================================

window.SITE = {
  nom: "Ton avis",
  surtitre: "Petit questionnaire",
  accroche: "Qu'est-ce qui te plaît, et qu'est-ce qui ne te plaît pas ?",
  intro: "Je t'ai préparé une sélection de portfolios et une longue liste de styles graphiques. Dis-moi franchement ce que tu en penses : il n'y a pas de bonne ou de mauvaise réponse.",
  envoi: "Une fois téléchargé, envoie-moi le fichier .json (par message ou par mail).",
  piedDePage: "Questionnaire portfolios & DA",

  // Aspects proposés pour chaque portfolio (1 clic = j'aime, 2 clics = j'aime pas)
  aspects: ["Couleurs", "Typographie", "Mise en page", "Animations", "Navigation", "Images", "Originalité", "Ambiance"],
};

window.PORTFOLIOS = [
  { id: "dune",        nom: "Dune Graphic Design", url: "https://www.dunegraphicdesign.com/" },
  { id: "david-milan", nom: "David Milan",         url: "https://www.davidmilan.com/" },
  { id: "june-digann", nom: "June Digann",         url: "https://www.junedigann.com/" },
  { id: "nim-ben-reuven", nom: "Nim Ben-Reuven",   url: "https://www.nimbenreuven.com/" },
  { id: "ryan-haskins", nom: "Ryan Haskins",       url: "https://www.ryanhaskins.com/" },
  { id: "marine-denier", nom: "Marine Denier",     url: "https://www.marinedenier.com/" },
  { id: "readymag",    nom: "Readymag",            url: "https://readymag.com/" },
  { id: "jld2nd",      nom: "jld2nd",              url: "https://jld2nd.dev/" },
  { id: "abhay-rohit", nom: "Abhay Rohit",         url: "https://abhayrohit.com/" },
  { id: "worksruthi",  nom: "Sruthi",              url: "https://www.worksruthi.com/" },
];

// recherche : mots utilisés pour les liens d'exemples (Pinterest / Dribbble)
window.STYLES = [
  { id: "glassmorphisme", nom: "Glassmorphisme", recherche: "glassmorphism web design",
    description: "Des panneaux comme du verre dépoli : transparents, flous, posés sur des fonds colorés.",
    motsCles: ["transparence", "flou", "moderne", "tech"],
    demo: `<i class="b1"></i><i class="b2"></i><div class="c"><b>Aurore</b><span>Transparence et flou</span><em>Découvrir</em></div>` },

  { id: "neumorphisme", nom: "Neumorphisme", recherche: "neumorphism ui",
    description: "Des éléments qui semblent moulés dans le fond, avec des ombres très douces. Monochrome et tactile.",
    motsCles: ["doux", "relief", "monochrome"],
    demo: `<div class="c"><b>Soft UI</b><div class="row"><i class="btn">◀</i><i class="btn in">❚❚</i><i class="btn">▶</i></div></div>` },

  { id: "claymorphisme", nom: "Claymorphisme", recherche: "claymorphism 3d ui",
    description: "Des formes gonflées comme de la pâte à modeler, aux couleurs pastel. Ludique et rond.",
    motsCles: ["3D", "pastel", "ludique", "rond"],
    demo: `<div class="c"><i class="o1"></i><b>Hello !</b><i class="o2"></i></div>` },

  { id: "brutalisme", nom: "Brutalisme", recherche: "brutalist web design",
    description: "Brut et volontairement « pas fini » : polices système, liens bleus, tableaux, aucune décoration.",
    motsCles: ["brut", "radical", "texte", "anti-joli"],
    demo: `<h4>BIENVENUE.</h4><p>Ceci est un site. <u>Projets</u> <u>Contact</u> <u>Info</u></p><table><tr><td>2025</td><td>Affiche — festival</td></tr><tr><td>2024</td><td>Livre — édition</td></tr></table>` },

  { id: "neo-brutalisme", nom: "Néo-brutalisme", recherche: "neubrutalism web design",
    description: "Le brutalisme en version pop : gros contours noirs, ombres dures décalées, couleurs vives.",
    motsCles: ["contours noirs", "pop", "couleurs vives", "fun"],
    demo: `<div class="c"><span class="tag">NOUVEAU</span><b>Fais du bruit.</b><em>Commencer →</em></div>` },

  { id: "minimalisme", nom: "Minimalisme", recherche: "minimalist portfolio website",
    description: "Le moins possible : beaucoup de blanc, peu de couleurs, une typo discrète. Le contenu respire.",
    motsCles: ["épuré", "blanc", "calme", "élégant"],
    demo: `<span class="logo">m.</span><p>Moins, mais mieux.</p><i class="ligne"></i>` },

  { id: "suisse", nom: "Style suisse", recherche: "swiss style graphic design web",
    description: "Le graphisme suisse des années 50 : grille stricte, Helvetica, aplats francs, mise en page asymétrique.",
    motsCles: ["grille", "Helvetica", "rigueur", "rouge"],
    demo: `<i class="rouge"></i><h4>Neue<br>Grafik</h4><p>Zürich<br>1958</p>` },

  { id: "bento", nom: "Grille bento", recherche: "bento grid web design",
    description: "Le contenu rangé dans des cases de tailles différentes, comme une boîte à bento.",
    motsCles: ["cases", "organisé", "moderne", "arrondi"],
    demo: `<div class="g"><i class="a">Projets</i><i class="b">12</i><i class="c">☼</i><i class="d">Me contacter →</i></div>` },

  { id: "skeuomorphisme", nom: "Skeuomorphisme", recherche: "skeuomorphism ui design",
    description: "L'interface imite les objets réels : cuir, bois, papier, boutons brillants. Le style des premiers iPhone.",
    motsCles: ["réaliste", "matières", "brillant", "nostalgie"],
    demo: `<div class="c"><b>Notes</b><div class="papier">Lundi : acheter du café</div><i class="bt">Enregistrer</i></div>` },

  { id: "flat", nom: "Flat design", recherche: "flat design illustration website",
    description: "Des aplats de couleur, des formes simples, aucune ombre ni relief.",
    motsCles: ["aplats", "simple", "coloré", "illustration"],
    demo: `<i class="soleil"></i><i class="m1"></i><i class="m2"></i><b>Flat</b>` },

  { id: "material", nom: "Material design", recherche: "material design website",
    description: "Le langage de Google : cartes surélevées, ombres logiques, bouton rond flottant.",
    motsCles: ["cartes", "ombres", "appli", "Google"],
    demo: `<div class="bar">≡ &nbsp;Galerie</div><div class="cards"><i></i><i></i></div><i class="fab">+</i>` },

  { id: "y2k", nom: "Y2K", recherche: "y2k aesthetic web design",
    description: "L'esthétique de l'an 2000 : chrome, bulles, bleu glacier, étoiles qui brillent, futur naïf.",
    motsCles: ["chrome", "2000", "bulles", "brillant"],
    demo: `<b>Y2K</b><span>✦ cyber ✦ chrome ✦</span><i class="bulle">entrer</i>` },

  { id: "vaporwave", nom: "Vaporwave / Synthwave", recherche: "vaporwave synthwave web design",
    description: "Couchers de soleil rose et violet, grilles fluo en perspective, nostalgie des années 80-90.",
    motsCles: ["rétro 80s", "néon", "rose", "nostalgie"],
    demo: `<i class="soleil"></i><i class="sol"></i><b>ＡＥＳＴＨＥＴＩＣ</b>` },

  { id: "cyberpunk", nom: "Cyberpunk / néon", recherche: "cyberpunk ui design",
    description: "Fond noir, néons rose et cyan, angles coupés, typo technique. Futuriste et nocturne.",
    motsCles: ["néon", "sombre", "futuriste", "tech"],
    demo: `<b>NEO//CITY</b><span>SYS.ONLINE_2077</span><i class="bt">ACCÈS</i>` },

  { id: "luxe", nom: "Luxe sombre", recherche: "luxury dark website design",
    description: "Noir profond, or, serif fine et grands espaces. L'univers des maisons de mode et des parfums.",
    motsCles: ["noir & or", "serif", "chic", "premium"],
    demo: `<span class="m">MAISON</span><b>Élégance</b><span class="s">Collection hiver</span>` },

  { id: "editorial", nom: "Éditorial / magazine", recherche: "editorial magazine web design",
    description: "Mise en page de magazine : grands titres en serif, colonnes, lettrines, filets.",
    motsCles: ["magazine", "serif", "colonnes", "lecture"],
    demo: `<span class="haut">LE JOURNAL — N°12</span><h4>L'art de ralentir</h4><div class="cols"><p><span class="lettrine">D</span>ans un monde pressé, prendre le temps devient un luxe.</p><p>Rencontre avec celles et ceux qui ont choisi la lenteur.</p></div>` },

  { id: "typo-xxl", nom: "Typographie XXL", recherche: "big typography web design",
    description: "Le texte devient l'image : des mots énormes qui remplissent tout l'écran, parfois en mouvement.",
    motsCles: ["typo géante", "impact", "audacieux"],
    demo: `<b>WOW</b><span>Studio de création</span>` },

  { id: "memphis", nom: "Memphis", recherche: "memphis design pattern web",
    description: "Le design italien des années 80 : formes géométriques, motifs, pois, couleurs qui claquent.",
    motsCles: ["80s", "motifs", "géométrique", "joyeux"],
    demo: `<i class="tri"></i><i class="zig"></i><i class="pois"></i><i class="cercle"></i><b>Memphis</b>` },

  { id: "bauhaus", nom: "Bauhaus", recherche: "bauhaus graphic design web",
    description: "Cercle, carré, triangle et couleurs primaires. Géométrie pure et fonctionnelle.",
    motsCles: ["géométrie", "primaires", "moderniste"],
    demo: `<i class="c"></i><i class="s"></i><i class="t"></i><b>bauhaus</b>` },

  { id: "art-deco", nom: "Art déco", recherche: "art deco web design",
    description: "Les années 20 : symétrie, éventails, lignes dorées, typographies hautes et élégantes.",
    motsCles: ["années 20", "doré", "symétrie", "ornement"],
    demo: `<div class="cadre"><i class="eventail"></i><b>GATSBY</b><span>— 1925 —</span></div>` },

  { id: "organique", nom: "Organique / formes fluides", recherche: "organic shapes web design",
    description: "Des formes molles et irrégulières, des couleurs naturelles. Doux et vivant.",
    motsCles: ["courbes", "naturel", "doux", "blob"],
    demo: `<i class="b1"></i><i class="b2"></i><b>Racines</b><span>Céramique & nature</span>` },

  { id: "aurora", nom: "Dégradés aurora", recherche: "aurora gradient website",
    description: "Des taches de couleur floues qui se mélangent, comme une aurore boréale.",
    motsCles: ["dégradés", "lumineux", "flou", "moderne"],
    demo: `<i class="a1"></i><i class="a2"></i><i class="a3"></i><b>Lumière</b>` },

  { id: "grain", nom: "Grain & texture", recherche: "grainy gradient web design",
    description: "Des dégradés recouverts d'un grain de film photo. Plus chaleureux, moins numérique.",
    motsCles: ["grain", "argentique", "chaleureux"],
    demo: `<b>Texture</b><span>grain & douceur</span>` },

  { id: "anti-design", nom: "Anti-design", recherche: "anti design web",
    description: "Les règles sont faites pour être cassées : couleurs qui jurent, éléments de travers, polices mélangées.",
    motsCles: ["chaos", "provoc", "décalé"],
    demo: `<b class="a">ANTI</b><b class="b">design</b><span class="c">cliquez ici ???</span><i class="d">☺</i>` },

  { id: "pixel", nom: "Pixel art / rétro gaming", recherche: "pixel art website design",
    description: "L'univers des jeux vidéo 8 bits : gros pixels, couleurs franches, police de console.",
    motsCles: ["8-bit", "jeu vidéo", "rétro", "fun"],
    demo: `<b>PRESS START</b><i class="nuage"></i><i class="sol"></i><i class="perso"></i>` },

  { id: "web-90", nom: "Web des années 90", recherche: "90s web design aesthetic",
    description: "Fenêtres Windows 95, boutons gris en relief, compteurs de visites, Comic Sans assumé.",
    motsCles: ["nostalgie", "Windows 95", "kitsch"],
    demo: `<div class="fen"><div class="titre">Mon_Site.exe <span>✕</span></div><div class="corps"><b>Bienvenue !!!</b><span>Vous êtes le visiteur n° 000421</span><i class="bt">OK</i></div></div>` },

  { id: "monochrome", nom: "Monochrome", recherche: "monochromatic web design",
    description: "Une seule couleur, déclinée en plusieurs nuances. Cohérent et fort.",
    motsCles: ["une couleur", "nuances", "cohérent"],
    demo: `<i class="r1"></i><i class="r2"></i><i class="r3"></i><b>Bleu</b>` },

  { id: "dessine", nom: "Dessiné à la main", recherche: "hand drawn website design",
    description: "Traits imparfaits, écriture manuscrite, petits gribouillis. Personnel et spontané.",
    motsCles: ["manuscrit", "doodle", "personnel", "chaleureux"],
    demo: `<div class="c"><b>Coucou !</b><span>je dessine des trucs</span><i class="fl">↗</i></div>` },

  { id: "collage", nom: "Collage / scrapbook", recherche: "collage scrapbook web design",
    description: "Papiers découpés, scotch, photos de travers, étiquettes. Comme un carnet de souvenirs.",
    motsCles: ["papier", "superposition", "artisanal"],
    demo: `<i class="p1">ARCHIVES</i><i class="p2"></i><i class="scotch"></i><i class="p3">souvenirs</i>` },

  { id: "pastel", nom: "Pastel doux", recherche: "pastel website design",
    description: "Couleurs pâles et poudrées, formes arrondies, beaucoup de douceur.",
    motsCles: ["pastel", "doux", "arrondi", "calme"],
    demo: `<div class="c"><i></i><i></i><i></i><b>Douceur</b></div>` },

  { id: "terminal", nom: "Terminal / code", recherche: "terminal style website",
    description: "Le site ressemble à une console d'ordinateur : police à chasse fixe, texte vert, curseur qui clignote.",
    motsCles: ["geek", "code", "monospace"],
    demo: `<p>~ $ whoami</p><p class="v">designeuse & curieuse</p><p>~ $ ls projets/</p><p class="v">affiches/  sites/  typo/</p><p>~ $ <i class="cur"></i></p>` },

  { id: "isometrique", nom: "Isométrique / 3D", recherche: "isometric web design",
    description: "Des objets et scènes en 3D vus en biais, comme des maquettes ou des petits mondes.",
    motsCles: ["3D", "maquette", "volume"],
    demo: `<div class="s"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>` },

  { id: "duotone", nom: "Duotone", recherche: "duotone web design",
    description: "Seulement deux couleurs fortes, utilisées partout, y compris sur les photos.",
    motsCles: ["deux couleurs", "contraste", "graphique"],
    demo: `<i class="rond"></i><b>DUO</b><span>TONE</span>` },

  { id: "nature", nom: "Naturel / terre", recherche: "earthy tones website design",
    description: "Tons terre, beige, olive, terracotta. Une ambiance artisanale, slow et chaleureuse.",
    motsCles: ["terracotta", "beige", "artisanal", "slow"],
    demo: `<span class="m">Atelier</span><b>Terre & lin</b><div class="pal"><i></i><i></i><i></i><i></i></div>` },

  { id: "seventies", nom: "Rétro 70s", recherche: "70s retro groovy web design",
    description: "Arcs-en-ciel orange et marron, typos rondes, ambiance groovy.",
    motsCles: ["70s", "groovy", "orange", "vintage"],
    demo: `<i class="arcs"></i><b>Groovy</b>` },

  { id: "dark-academia", nom: "Dark academia", recherche: "dark academia aesthetic web",
    description: "Bibliothèques anciennes, bois sombre, serif classique, ornements. Mystérieux et littéraire.",
    motsCles: ["sombre", "classique", "littéraire", "vintage"],
    demo: `<span>❦</span><b>Bibliotheca</b><em>Sapere aude</em>` },

  { id: "kawaii", nom: "Kawaii / mignon", recherche: "kawaii cute website design",
    description: "Tout est mignon : rose, petits visages, étoiles, formes rondes et contours épais.",
    motsCles: ["mignon", "rose", "ludique", "Japon"],
    demo: `<div class="c"><span class="visage">(◕‿◕)</span><b>mignon !</b><i>✿</i><i>★</i></div>` },

  { id: "glitch", nom: "Glitch", recherche: "glitch effect web design",
    description: "Des effets de bug numérique : décalages de couleurs, image qui saute, signal brouillé.",
    motsCles: ["bug", "numérique", "nerveux"],
    demo: `<b data-t="GLITCH">GLITCH</b><span>erreur_404 // signal perdu</span>` },

  { id: "maximalisme", nom: "Maximalisme", recherche: "maximalist web design",
    description: "Plus c'est mieux : motifs, couleurs, formes et textes qui se superposent dans tous les sens.",
    motsCles: ["exubérant", "motifs", "couleurs", "énergie"],
    demo: `<i class="z1"></i><i class="z2"></i><i class="z3"></i><b>PLUS<br>C'EST<br>MIEUX</b><i class="etoile">✸</i>` },

  { id: "saas", nom: "Startup / SaaS", recherche: "saas landing page design",
    description: "Le style des applis tech : propre, dégradé violet, gros titre centré, cartes alignées.",
    motsCles: ["propre", "pro", "tech", "efficace"],
    demo: `<div class="nav"><b>◆ Flowly</b><i></i></div><h4>Travaillez plus vite.</h4><i class="cta">Essai gratuit</i><div class="cards"><i></i><i></i><i></i></div>` },

  { id: "immersif", nom: "Immersif plein écran", recherche: "immersive fullscreen website",
    description: "Une grande photo ou vidéo qui prend tout l'écran, avec très peu de texte par-dessus.",
    motsCles: ["photo", "plein écran", "cinéma", "émotion"],
    demo: `<i class="nav">MENU</i><span>Islande — 2025</span><b>Au bout du monde</b>` },
];
