# -*- coding: utf-8 -*-
"""Génère un document.xml OOXML propre pour la documentation technique Haras Adham."""
import zipfile, os, shutil

NS = ('<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" '
      'xmlns:mo="http://schemas.microsoft.com/office/mac/office/2008/main" '
      'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" '
      'xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:o="urn:schemas-microsoft-com:office:office" '
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
      'xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" '
      'xmlns:v="urn:schemas-microsoft-com:vml" '
      'xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" '
      'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
      'xmlns:w10="urn:schemas-microsoft-com:office:word" '
      'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
      'xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" '
      'xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" '
      'xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" '
      'xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" '
      'xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" '
      'mc:Ignorable="w14 wp14">')

SECTPR = ('<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
          '<w:pgMar w:top="1417" w:right="1417" w:bottom="1134" w:left="1417" '
          'w:header="720" w:footer="720" w:gutter="0"/>'
          '<w:cols w:space="720"/><w:docGrid w:linePitch="360"/></w:sectPr>')

def esc(t):
    return t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def run(text, bold=False, italic=False, color=None, sz=None):
    rpr = ''
    props = ''
    if bold: props += '<w:b/>'
    if italic: props += '<w:i/>'
    if color: props += '<w:color w:val="%s"/>' % color
    if sz: props += '<w:sz w:val="%d"/><w:szCs w:val="%d"/>' % (sz, sz)
    if props: rpr = '<w:rPr>%s</w:rPr>' % props
    return '<w:r>%s<w:t xml:space="preserve">%s</w:t></w:r>' % (rpr, esc(text))

def para(text='', style=None, bold=False, italic=False, color=None, sz=None, align=None):
    ppr = ''
    inner = ''
    if style: inner += '<w:pStyle w:val="%s"/>' % style
    if align: inner += '<w:jc w:val="%s"/>' % align
    if inner: ppr = '<w:pPr>%s</w:pPr>' % inner
    r = run(text, bold, italic, color, sz) if text else ''
    return '<w:p>%s%s</w:p>' % (ppr, r)

def runs_para(runs_list, style=None, align=None):
    ppr = ''
    inner = ''
    if style: inner += '<w:pStyle w:val="%s"/>' % style
    if align: inner += '<w:jc w:val="%s"/>' % align
    if inner: ppr = '<w:pPr>%s</w:pPr>' % inner
    return '<w:p>%s%s</w:p>' % (ppr, ''.join(runs_list))

def h1(t): return para(t, style='Heading1')
def h2(t): return para(t, style='Heading2')
def h3(t): return para(t, style='Heading3')

def bullet(t):
    return ('<w:p><w:pPr><w:pStyle w:val="ListParagraph"/>'
            '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>%s</w:p>'
            % run(t))

def cell(text, header=False, w=None, bg=None):
    tcpr = '<w:tcPr>'
    if w: tcpr += '<w:tcW w:w="%d" w:type="dxa"/>' % w
    if bg: tcpr += '<w:shd w:val="clear" w:color="auto" w:fill="%s"/>' % bg
    tcpr += '<w:vAlign w:val="center"/></w:tcPr>'
    r = run(text, bold=header, color=('FFFFFF' if header else None))
    return '<w:tc>%s<w:p><w:pPr><w:spacing w:before="20" w:after="20"/></w:pPr>%s</w:p></w:tc>' % (tcpr, r)

def table(headers, rows, widths=None):
    n = len(headers)
    if not widths:
        total = 9300
        widths = [total // n] * n
    grid = '<w:tblGrid>' + ''.join('<w:gridCol w:w="%d"/>' % w for w in widths) + '</w:tblGrid>'
    tblpr = ('<w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="0" w:type="auto"/>'
             '<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" '
             'w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>')
    hrow = '<w:tr>' + ''.join(cell(h, header=True, w=widths[i], bg='B8943A') for i,h in enumerate(headers)) + '</w:tr>'
    body = ''
    for ri, rowdata in enumerate(rows):
        bg = 'F5F3EF' if ri % 2 else None
        body += '<w:tr>' + ''.join(cell(str(c), w=widths[i], bg=bg) for i,c in enumerate(rowdata)) + '</w:tr>'
    return '<w:tbl>%s%s%s%s</w:tbl>%s' % (tblpr, grid, hrow, body, para(''))

P = []

# ---- COUVERTURE ----
P.append(para('HARAS ADHAM', style='Title', align='center'))
P.append(para('Excellence Équestre Marocaine', style='Subtitle', align='center'))
P.append(para('DOCUMENTATION TECHNIQUE COMPLÈTE', align='center', bold=True, sz=28, color='B8943A'))
P.append(para('Site web — haras-adham-nypr.vercel.app', align='center', italic=True))
P.append(para('Version 3.0  —  Juin 2026', align='center', bold=True))
P.append(para(''))
P.append(para('Cette version documente la refonte complète du site : application Next.js (App Router) '
              'avec base de données Supabase, espace d\'administration sécurisé, gestion de contenu '
              'multilingue et déploiement continu sur Vercel. Elle remplace intégralement la version 2.0 '
              'qui décrivait l\'ancien site mono-fichier HTML.', italic=True, align='center'))

# ---- 1. VUE D'ENSEMBLE ----
P.append(h1("1. Vue d'ensemble du projet"))
P.append(h2('1.1 Présentation générale'))
P.append(para("Haras Adham est le site officiel d'un haras marocain spécialisé dans l'élevage, la "
              "compétition et la préservation du Cheval Barbe. Le site est une application web moderne "
              "Next.js, rendue côté serveur, adossée à une base de données Supabase. Le contenu "
              "(chevaux, étalons, actualités, galerie, etc.) est entièrement géré depuis un espace "
              "d'administration protégé par mot de passe."))
P.append(table(['Propriété', 'Valeur'], [
    ['URL de production', 'https://haras-adham-nypr.vercel.app/'],
    ['Dépôt Git', 'github.com/safiaala/haras-adham'],
    ['Type', 'Application Next.js 16 (App Router), rendu serveur + composants client'],
    ['Base de données', 'Supabase (PostgreSQL managé) + stockage de fichiers'],
    ['Hébergement', 'Vercel (déploiement continu depuis Git, CDN mondial, HTTPS auto)'],
    ['Langue principale', 'Français (FR)'],
    ['Langues disponibles', 'FR / EN / ES / AR (avec support RTL pour l\'arabe)'],
    ['Email de contact', 'contact@harasadham.ma (configurable)'],
    ['Horaires', 'Configurables depuis l\'admin'],
], widths=[2800, 6500]))

P.append(h2('1.2 Objectifs fonctionnels'))
for b in [
    "Présenter le haras et la race Barbe (histoire, classement UNESCO, Tbourida)",
    "Gérer un catalogue de chevaux avec filtres (sexe, discipline), recherche et fiche détaillée",
    "Gérer un catalogue d'étalons avec fiche dédiée et page par étalon",
    "Détailler les prestations du haras (sections et photos configurables)",
    "Publier actualités, événements et offres d'emploi",
    "Galerie photos avec filtrage par catégorie (catégories traduisibles) et lightbox",
    "Formulaire de contact avec sélection d'indicatif pays et anti-spam",
    "Édition complète du contenu et des photos via l'espace d'administration",
    "Site multilingue FR / EN / ES / AR commutable en temps réel",
    "Export des données du site au format CSV / Excel",
]:
    P.append(bullet(b))

# ---- 2. ARCHITECTURE ----
P.append(h1('2. Architecture technique'))
P.append(h2('2.1 Stack technologique'))
P.append(table(['Technologie', 'Rôle'], [
    ['Next.js 16 (App Router)', 'Framework React — routage, rendu serveur, routes API'],
    ['React 19', 'Composants d\'interface (client et serveur)'],
    ['TypeScript', 'Typage statique de tout le code'],
    ['Supabase (PostgreSQL)', 'Base de données, sécurité par lignes (RLS), stockage de fichiers'],
    ['Cloudinary', 'Hébergement et optimisation des images (upload signé côté serveur)'],
    ['Upstash Redis', 'Limitation de débit (rate limiting) sur l\'authentification et le contact'],
    ['Resend', 'Envoi des emails du formulaire de contact'],
    ['Vercel', 'Hébergement, déploiement continu, CDN, Analytics'],
    ['Vercel Analytics', 'Statistiques de fréquentation (sans cookies)'],
    ['Google Fonts', 'Noto Serif, Plus Jakarta Sans, Noto Sans Arabic, Material Symbols'],
    ['OpenStreetMap', 'Carte de localisation du domaine (embed gratuit, sans clé API)'],
], widths=[3200, 6100]))

P.append(h2('2.2 Structure des dossiers'))
P.append(para("Le code source est organisé selon les conventions du App Router de Next.js :"))
P.append(table(['Chemin', 'Contenu'], [
    ['src/app/', 'Pages publiques et espace admin (un dossier = une route)'],
    ['src/app/api/', 'Routes API serveur (authentification, données admin, contact…)'],
    ['src/app/admin/', 'Pages de l\'espace d\'administration'],
    ['src/components/', 'Composants réutilisables (Nav, Footer, listes, etc.)'],
    ['src/lib/', 'Logique partagée : Supabase, traductions, authentification, types'],
    ['supabase/', 'Scripts SQL (schéma, RLS, migrations)'],
    ['middleware.ts', 'Protection des routes /admin (vérification du cookie de session)'],
    ['next.config.ts', 'Configuration Next.js + en-têtes de sécurité (CSP, etc.)'],
], widths=[2800, 6500]))

P.append(h2('2.3 Rendu et navigation'))
P.append(para("Contrairement à l'ancienne version (un seul fichier HTML), chaque page est désormais "
              "une route distincte servie par Next.js. La navigation utilise le routeur intégré "
              "(composant Link), avec préchargement automatique. Les données sont chargées depuis "
              "Supabase soit côté serveur, soit côté client selon les besoins de la page."))

# ---- 3. BASE DE DONNÉES ----
P.append(h1('3. Base de données (Supabase)'))
P.append(h2('3.1 Tables principales'))
P.append(table(['Table', 'Contenu'], [
    ['chevaux', 'Catalogue des chevaux (nom, race, sexe, discipline, photos, prix…)'],
    ['etalons', 'Catalogue des étalons reproducteurs'],
    ['evenements', 'Agenda des événements'],
    ['actualites', 'Articles d\'actualité (avec champs traduits EN/ES/AR)'],
    ['offres', 'Offres d\'emploi'],
    ['galerie', 'Photos du domaine (catégorie traduisible FR/EN/ES/AR)'],
    ['config', 'Paires clé/valeur : coordonnées, réseaux sociaux, statistiques, hash du mot de passe admin'],
    ['pages', 'Activation/désactivation et ordre des pages dans la navigation'],
    ['sections', 'Blocs de contenu éditables (prestations, etc.)'],
], widths=[2200, 7100]))

P.append(h2('3.2 Sécurité au niveau des lignes (RLS)'))
P.append(para("La sécurité RLS (Row Level Security) est activée sur toutes les tables. Les règles "
              "appliquées :"))
P.append(bullet("Lecture publique (anon) autorisée sur les tables de contenu affichées sur le site."))
P.append(bullet("Aucune écriture autorisée pour le rôle anonyme : toute création, modification ou "
                "suppression passe obligatoirement par les routes API serveur."))
P.append(bullet("Les écritures utilisent la clé service_role (secrète, côté serveur uniquement), "
                "après vérification de l'authentification administrateur."))
P.append(bullet("La table des messages de contact n'est lisible que côté serveur (service_role)."))

P.append(h2('3.3 Stockage des images'))
P.append(para("Les images sont hébergées sur Cloudinary. L'upload se fait via une signature générée "
              "côté serveur (route /api/admin/cloudinary-sign) : le préréglage d'upload est en mode "
              "« Signed », ce qui empêche tout envoi non autorisé. Le bucket de stockage Supabase reste "
              "disponible en repli."))

# ---- 4. PAGES PUBLIQUES ----
P.append(h1('4. Pages publiques'))
P.append(table(['Route', 'Fichier', 'Description'], [
    ['/', 'app/page.tsx', 'Accueil — hero, statistiques, aperçu chevaux, galerie, etc.'],
    ['/chevaux', 'app/chevaux/page.tsx', 'Catalogue des chevaux avec filtres et recherche'],
    ['/etalons', 'app/etalons/page.tsx', 'Liste des étalons'],
    ['/etalons/[id]', 'app/etalons/[id]/page.tsx', 'Fiche détaillée d\'un étalon'],
    ['/prestations', 'app/prestations/page.tsx', 'Présentation des prestations'],
    ['/galerie', 'app/galerie/page.tsx', 'Galerie photos filtrable par catégorie'],
    ['/actualites', 'app/actualites/page.tsx', 'Articles d\'actualité'],
    ['/evenements', 'app/evenements/page.tsx', 'Agenda des événements'],
    ['/histoire', 'app/histoire/page.tsx', 'Histoire du haras et de la race Barbe'],
    ['/jobs', 'app/jobs/page.tsx', 'Offres d\'emploi'],
    ['/contact', 'app/contact/page.tsx', 'Formulaire de contact + carte du domaine'],
], widths=[1800, 2900, 4600]))

# ---- 5. ADMIN ----
P.append(h1("5. Espace d'administration"))
P.append(h2('5.1 Authentification'))
P.append(para("L'accès à /admin est protégé par mot de passe. Le mécanisme :"))
P.append(bullet("La connexion se fait sur /admin/login via la route API /api/admin/auth."))
P.append(bullet("Le mot de passe n'est jamais stocké en clair : un jeton dérivé (SHA-256) est calculé "
                "et déposé dans un cookie sécurisé (httpOnly, secure, sameSite=strict, 7 jours)."))
P.append(bullet("Le middleware protège toutes les pages /admin ; les routes API vérifient le cookie "
                "via la fonction requireAdmin."))
P.append(bullet("Une limitation de débit (Upstash) bloque les tentatives répétées : 5 essais par "
                "tranche de 10 minutes et par adresse IP."))

P.append(h2('5.2 Sections du tableau de bord'))
P.append(table(['Section', 'Route', 'Rôle'], [
    ['Chevaux', '/admin/chevaux', 'Gérer le catalogue des chevaux'],
    ['Étalons', '/admin/etalons', 'Gérer les étalons'],
    ['Événements', '/admin/evenements', 'Gérer l\'agenda'],
    ['Actualités', '/admin/actualites', 'Gérer les articles (+ traductions)'],
    ['Offres', '/admin/offres', 'Gérer les offres d\'emploi'],
    ['Galerie', '/admin/galerie', 'Gérer les photos et leurs catégories'],
    ['Prestations', '/admin/prestations', 'Gérer les sections de prestations'],
    ['Pages', '/admin/pages', 'Activer/désactiver pages + textes de la page d\'accueil'],
    ['Navigation', '/admin/navigation', 'Ordonner le menu principal'],
    ['Éditeur', '/admin/editeur', 'Édition des blocs de contenu'],
    ['Messages', '/admin/messages', 'Consulter les messages du formulaire de contact'],
    ['Config', '/admin/config', 'Coordonnées, réseaux sociaux, GPS, mot de passe admin'],
    ['Export CSV', '/admin/export', 'Exporter les données en Excel / CSV'],
], widths=[2000, 2900, 4400]))

P.append(h2('5.3 Changement de mot de passe'))
P.append(para("Le mot de passe administrateur peut être changé directement depuis l'interface, dans "
              "la page Config (section « Mot de passe administrateur »). Le nouveau mot de passe "
              "(8 caractères minimum) est dérivé en SHA-256 puis stocké dans la table config "
              "(clé admin_password_hash). Lors de la connexion, ce hash stocké est vérifié en "
              "priorité ; à défaut, la variable d'environnement ADMIN_PASSWORD sert de valeur initiale."))

# ---- 6. ROUTES API ----
P.append(h1('6. Routes API'))
P.append(table(['Route', 'Méthodes', 'Rôle'], [
    ['/api/admin/auth', 'POST', 'Connexion admin (vérif. mot de passe + dépôt cookie)'],
    ['/api/admin/logout', 'POST', 'Déconnexion (suppression du cookie)'],
    ['/api/admin/change-password', 'POST', 'Changer le mot de passe administrateur'],
    ['/api/admin/data', 'POST/PATCH/PUT/DELETE', 'CRUD générique sécurisé sur les tables autorisées'],
    ['/api/admin/messages', 'GET/PATCH/DELETE', 'Lecture et gestion des messages de contact'],
    ['/api/admin/cloudinary-sign', 'POST', 'Signature serveur pour l\'upload Cloudinary'],
    ['/api/contact', 'POST', 'Réception du formulaire de contact (+ envoi email, anti-spam)'],
], widths=[2900, 2400, 4000]))
P.append(para("Toutes les routes /api/admin sont protégées par la vérification requireAdmin. La route "
              "/api/admin/data n'autorise les opérations que sur une liste blanche de tables.", italic=True))

# ---- 7. I18N ----
P.append(h1('7. Internationalisation (FR / EN / ES / AR)'))
P.append(para("Le site est disponible en quatre langues. Les textes d'interface sont centralisés dans "
              "src/lib/translations.ts (fonction t(locale, clé)). La langue est commutable en temps "
              "réel depuis la barre de navigation. L'arabe active la mise en page de droite à gauche (RTL)."))
P.append(bullet("Textes d'interface : clés de traduction dans translations.ts (4 langues)."))
P.append(bullet("Contenu de base de données traduisible : certains champs disposent de variantes "
                "_en / _es / _ar (ex. actualités, catégories de galerie)."))
P.append(bullet("Noms de pays du formulaire de contact : traduits automatiquement via l'API "
                "navigateur Intl.DisplayNames."))

# ---- 8. SÉCURITÉ ----
P.append(h1('8. Sécurité'))
for b in [
    "RLS activée sur toutes les tables ; aucune écriture anonyme possible.",
    "Mutations de données réservées au rôle service_role, côté serveur, après authentification.",
    "Cookie de session httpOnly + secure + sameSite=strict (protection CSRF).",
    "Déconnexion en POST uniquement (protection CSRF).",
    "Limitation de débit (Upstash) : 5 connexions / 10 min et 5 messages / heure par IP.",
    "Upload Cloudinary signé côté serveur (préréglage « Signed »).",
    "En-têtes de sécurité dans next.config.ts : CSP, X-Frame-Options, X-Content-Type-Options, "
    "Referrer-Policy, Permissions-Policy, HSTS.",
    "Clés secrètes (service_role, Cloudinary, Resend, Upstash) stockées en variables "
    "d'environnement, jamais exposées au client.",
]:
    P.append(bullet(b))

# ---- 9. VARIABLES D'ENV ----
P.append(h1("9. Variables d'environnement"))
P.append(table(['Variable', 'Usage'], [
    ['NEXT_PUBLIC_SUPABASE_URL', 'URL du projet Supabase (publique)'],
    ['NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Clé anonyme Supabase (lecture publique)'],
    ['SUPABASE_SERVICE_ROLE_KEY', 'Clé service_role Supabase (secrète, écritures serveur)'],
    ['ADMIN_PASSWORD', 'Mot de passe admin initial (repli si non changé via l\'UI)'],
    ['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'Nom du cloud Cloudinary (public)'],
    ['NEXT_PUBLIC_CLOUDINARY_API_KEY', 'Clé API Cloudinary (publique)'],
    ['CLOUDINARY_API_SECRET', 'Secret Cloudinary (signature serveur)'],
    ['UPSTASH_REDIS_REST_URL', 'URL Redis Upstash (rate limiting)'],
    ['UPSTASH_REDIS_REST_TOKEN', 'Jeton Redis Upstash (secret)'],
    ['RESEND_API_KEY', 'Clé API Resend (envoi des emails de contact)'],
], widths=[4000, 5300]))

# ---- 10. DÉPLOIEMENT ----
P.append(h1('10. Déploiement'))
P.append(para("Le site est déployé sur Vercel avec déploiement continu : chaque push sur la branche "
              "main du dépôt Git déclenche automatiquement un build et une mise en production."))
P.append(bullet("Commande de build : next build --webpack (le bundler webpack est forcé pour éviter "
                "un bug de Turbopack lié au fichier middleware lors du build de production)."))
P.append(bullet("Les variables d'environnement sont configurées dans Vercel → Settings → "
                "Environment Variables."))
P.append(bullet("Après modification d'une variable d'environnement, un redéploiement est nécessaire."))
P.append(bullet("Les migrations SQL (dossier supabase/) doivent être exécutées manuellement dans "
                "Supabase → SQL Editor lors d'évolutions du schéma."))

# ---- 11. MAINTENANCE ----
P.append(h1('11. Maintenance courante'))
P.append(h2('11.1 Modifier le contenu'))
P.append(para("Se connecter sur /admin, puis utiliser la section correspondante du tableau de bord. "
              "Aucune intervention sur le code n'est nécessaire pour le contenu courant."))
P.append(h2('11.2 Changer le mot de passe'))
P.append(para("Admin → Config → section « Mot de passe administrateur »."))
P.append(h2('11.3 Ajouter une migration de base de données'))
P.append(para("Créer un script .sql dans le dossier supabase/, puis l'exécuter dans l'éditeur SQL "
              "de Supabase. Exemple récent : add-galerie-categorie-traductions.sql (ajout des "
              "colonnes de traduction des catégories de galerie)."))
P.append(para(''))
P.append(para('— Fin de la documentation —', italic=True, align='center', color='888888'))

body = '<w:body>' + ''.join(P) + SECTPR + '</w:body>'
xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' + NS + body + '</w:document>'

with open('unpacked_doc/word/document.xml', 'w', encoding='utf-8') as f:
    f.write(xml)
print('document.xml écrit :', len(xml), 'octets')

# ---- Re-zip en .docx ----
out = 'Documentation_Technique_Haras_Adham_v2.docx'
if os.path.exists(out):
    os.remove(out)
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    # [Content_Types].xml en premier
    base = 'unpacked_doc'
    ct = os.path.join(base, '[Content_Types].xml')
    z.write(ct, '[Content_Types].xml')
    for root, _, files in os.walk(base):
        for fn in files:
            full = os.path.join(root, fn)
            arc = os.path.relpath(full, base)
            if arc == '[Content_Types].xml':
                continue
            z.write(full, arc)
print('docx régénéré :', out, os.path.getsize(out), 'octets')
