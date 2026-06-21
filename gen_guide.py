# -*- coding: utf-8 -*-
"""Génère le Guide d'utilisation (documentation fonctionnelle) du Haras Adham."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                ListFlowable, ListItem, PageBreak)

GOLD = colors.HexColor('#B8943A')
DARK = colors.HexColor('#13201A')
ROW = colors.HexColor('#F5F3EF')

ss = getSampleStyleSheet()
styles = {
    'Title':    ParagraphStyle('T', parent=ss['Title'], fontSize=27, textColor=DARK, spaceAfter=4, alignment=TA_CENTER),
    'Subtitle': ParagraphStyle('S', parent=ss['Normal'], fontSize=14, textColor=GOLD, alignment=TA_CENTER, spaceAfter=2),
    'CoverBold':ParagraphStyle('CB', parent=ss['Normal'], fontSize=13, textColor=GOLD, alignment=TA_CENTER, spaceAfter=2, fontName='Helvetica-Bold'),
    'CoverIt':  ParagraphStyle('CI', parent=ss['Normal'], fontSize=10, alignment=TA_CENTER, fontName='Helvetica-Oblique', spaceAfter=2),
    'CoverVer': ParagraphStyle('CV', parent=ss['Normal'], fontSize=11, alignment=TA_CENTER, fontName='Helvetica-Bold', spaceAfter=14),
    'Intro':    ParagraphStyle('I', parent=ss['Normal'], fontSize=10, alignment=TA_CENTER, fontName='Helvetica-Oblique', textColor=colors.HexColor('#555555'), leading=15),
    'H1':       ParagraphStyle('H1', parent=ss['Heading1'], fontSize=16, textColor=DARK, spaceBefore=15, spaceAfter=7),
    'H2':       ParagraphStyle('H2', parent=ss['Heading2'], fontSize=12.5, textColor=GOLD, spaceBefore=9, spaceAfter=4),
    'Body':     ParagraphStyle('B', parent=ss['Normal'], fontSize=10, leading=15, spaceAfter=6),
    'Step':     ParagraphStyle('ST', parent=ss['Normal'], fontSize=10, leading=14),
    'Note':     ParagraphStyle('N', parent=ss['Normal'], fontSize=9.5, leading=14, textColor=colors.HexColor('#7A5C12'), backColor=colors.HexColor('#FBF5E6'), borderPadding=6, spaceBefore=4, spaceAfter=8, leftIndent=4, rightIndent=4),
    'Cell':     ParagraphStyle('C', parent=ss['Normal'], fontSize=9, leading=12),
    'CellH':    ParagraphStyle('CH', parent=ss['Normal'], fontSize=9, leading=12, textColor=colors.white, fontName='Helvetica-Bold'),
    'End':      ParagraphStyle('E', parent=ss['Normal'], fontSize=9, alignment=TA_CENTER, fontName='Helvetica-Oblique', textColor=colors.HexColor('#888888'), spaceBefore=16),
}

def esc(t): return t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

E = []
def P(t, s='Body'): E.append(Paragraph(esc(t), styles[s]))
def H1(t): E.append(Paragraph(esc(t), styles['H1']))
def H2(t): E.append(Paragraph(esc(t), styles['H2']))
def NOTE(t): E.append(Paragraph('💡 ' + esc(t), styles['Note']))
def SP(h=6): E.append(Spacer(1, h))

def steps(items, numbered=True):
    li = [ListItem(Paragraph(esc(t), styles['Step']), leftIndent=10) for t in items]
    if numbered:
        E.append(ListFlowable(li, bulletType='1', bulletColor=GOLD, bulletFormat='%s.', leftIndent=16, spaceAfter=8))
    else:
        E.append(ListFlowable(li, bulletType='bullet', bulletColor=GOLD, start='•', leftIndent=14, spaceAfter=8))

def table(headers, rows, widths):
    data = [[Paragraph(esc(h), styles['CellH']) for h in headers]]
    for r in rows:
        data.append([Paragraph(esc(str(c)), styles['Cell']) for c in r])
    t = Table(data, colWidths=[w*mm for w in widths], repeatRows=1)
    st = [('BACKGROUND',(0,0),(-1,0),GOLD),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
          ('GRID',(0,0),(-1,-1),0.4,colors.HexColor('#D8D2C4')),
          ('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4),
          ('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6)]
    for i in range(1,len(data)):
        if i % 2 == 0: st.append(('BACKGROUND',(0,i),(-1,i),ROW))
    t.setStyle(TableStyle(st)); E.append(t); SP(8)

# ---- COUVERTURE ----
SP(40)
P('HARAS ADHAM', 'Title')
P('Excellence Équestre Marocaine', 'Subtitle')
SP(6)
P("GUIDE D'UTILISATION", 'CoverBold')
P('Documentation fonctionnelle — Espace d\'administration', 'CoverIt')
P('Version 1.0  —  Juin 2026', 'CoverVer')
P("Ce guide explique, étape par étape, comment gérer le contenu du site Haras Adham depuis "
  "l'espace d'administration. Il s'adresse à toute personne en charge du site, sans connaissance "
  "technique requise. Pour les aspects techniques (architecture, base de données, déploiement), "
  "se reporter à la Documentation Technique.", 'Intro')
E.append(PageBreak())

# ---- 1 ----
H1('1. Accéder à l\'administration')
H2('1.1 Se connecter')
steps([
    "Ouvrir l'adresse du site suivie de /admin (ex. haras-adham-nypr.vercel.app/admin).",
    "Saisir le mot de passe administrateur dans le champ prévu.",
    "Cliquer sur « Accéder ». Le tableau de bord s'affiche.",
])
NOTE("La session reste active 7 jours. Sur un ordinateur partagé, pensez à vous déconnecter.")
H2('1.2 Se déconnecter')
P("Cliquer sur le bouton de déconnexion en haut du tableau de bord. Vous serez renvoyé vers "
  "la page de connexion.")
H2('1.3 Changer le mot de passe')
steps([
    "Aller dans Config (rubrique Outils du tableau de bord).",
    "Descendre jusqu'à la section « Mot de passe administrateur ».",
    "Saisir le mot de passe actuel, puis le nouveau (8 caractères minimum) et sa confirmation.",
    "Cliquer sur « Changer le mot de passe ».",
])

# ---- 2 ----
H1('2. Principes généraux')
P("Le tableau de bord regroupe toutes les rubriques en trois groupes : Contenu du site, "
  "Structure du site et Outils. Le fonctionnement est identique partout :")
steps([
    "Cliquer sur une rubrique pour voir la liste des éléments existants.",
    "Cliquer sur « Ajouter » pour créer un nouvel élément, ou « Modifier » sur un élément existant.",
    "Remplir les champs dans le formulaire qui s'ouvre.",
    "Cliquer sur « Sauvegarder ». La modification est immédiatement visible sur le site.",
    "Pour retirer un élément, cliquer sur « Supprimer » (une confirmation est demandée).",
], numbered=False)
H2('2.1 Ajouter une photo')
steps([
    "Dans un formulaire, cliquer sur « Choisir un fichier » à la ligne Photo.",
    "Sélectionner une image (JPG, PNG, WebP ou GIF).",
    "Patienter pendant l'envoi ; un aperçu confirme que la photo est prête.",
])
NOTE("Utilisez des photos de bonne qualité mais pas trop lourdes (idéalement moins de 2 Mo) "
     "pour garder le site rapide.")
H2('2.2 Les champs obligatoires')
P("Les champs marqués d'un astérisque (*) sont obligatoires. La sauvegarde est impossible "
  "tant qu'ils ne sont pas remplis (par exemple le Nom d'un cheval).")

# ---- 3 ----
H1('3. Gérer les chevaux')
P("Rubrique Chevaux (Contenu du site).")
steps([
    "Cliquer sur « Ajouter un cheval ».",
    "Renseigner le Nom (obligatoire), puis les informations connues : année de naissance, "
    "race, taille, noms du père et de la mère, prix, description, lien vidéo.",
    "Choisir le Sexe, la Discipline et le Statut dans les listes déroulantes.",
    "Cocher « En vedette » pour mettre le cheval en avant sur la page d'accueil.",
    "Ajouter une ou plusieurs photos.",
    "Cliquer sur « Sauvegarder ».",
])
P("Le statut (disponible, vendu, pension, reproduction) s'affiche sous forme d'étiquette "
  "colorée sur la fiche du cheval. Les visiteurs peuvent filtrer les chevaux par sexe et "
  "par discipline, et faire une recherche par nom.")

# ---- 4 ----
H1('4. Gérer les étalons')
P("Rubrique Étalons (Contenu du site). Le principe est le même que pour les chevaux, avec "
  "des champs supplémentaires propres aux reproducteurs : robe, éleveur, palmarès, "
  "performance, production, tarif de saillie, méthodes de reproduction.")
P("Chaque étalon possède une page détaillée dédiée. Les champs descriptifs (description, "
  "origine, palmarès, performance, production) peuvent être traduits en anglais, espagnol "
  "et arabe via les champs correspondants.")

# ---- 5 ----
H1('5. Gérer les actualités')
P("Rubrique Actualités (Contenu du site).")
steps([
    "Cliquer sur « Ajouter ».",
    "Saisir le Titre, l'extrait et le contenu en français.",
    "Renseigner si besoin l'auteur/source et l'URL source (lien externe).",
    "Ajouter une photo d'illustration.",
    "Remplir les versions anglaise (_EN), espagnole (_ES) et arabe (_AR) des titre, extrait "
    "et contenu pour un article entièrement multilingue.",
    "Laisser « Publié » coché pour rendre l'article visible (décocher pour le masquer).",
    "Cliquer sur « Sauvegarder ».",
])
NOTE("Si une traduction n'est pas renseignée, le site affiche automatiquement la version "
     "française à la place — l'article reste donc toujours lisible.")

# ---- 6 ----
H1('6. Gérer les événements')
P("Rubrique Événements (Contenu du site). Renseigner le titre, la date de début (et de fin "
  "si l'événement dure plusieurs jours), le lieu, le type, une description, une photo et un "
  "lien d'inscription éventuel.")

# ---- 7 ----
H1("7. Gérer les offres d'emploi")
P("Rubrique Offres (Contenu du site). Renseigner le titre, le type (emploi, stage, "
  "bénévolat), la description, le profil recherché et le contact. Décocher « Active » pour "
  "retirer une offre sans la supprimer.")

# ---- 8 ----
H1('8. Gérer la galerie')
P("Rubrique Galerie (Contenu du site).")
steps([
    "Cliquer sur « Ajouter », puis choisir la photo.",
    "Saisir une légende (facultative).",
    "Indiquer la Catégorie en français (ex. Domaine, Compétition) et, si souhaité, ses "
    "traductions EN / ES / AR.",
    "Définir l'ordre d'affichage (un nombre plus petit apparaît en premier).",
    "Cliquer sur « Sauvegarder ».",
])
NOTE("Les catégories servent de filtres sur la page Galerie du site. Grâce aux traductions, "
     "le nom du filtre s'adapte à la langue choisie par le visiteur.")

# ---- 9 ----
H1('9. Gérer les prestations')
P("Rubrique Prestations (Contenu du site). Permet de gérer les sections et photos décrivant "
  "les services du haras (vente, pension, enseignement, compétition, reproduction).")

# ---- 10 ----
H1("10. Modifier la page d'accueil et les pages")
H2('10.1 Textes et statistiques de l\'accueil')
P("Rubrique Pages (Structure du site). On y modifie les textes de la page d'accueil : "
  "le hero (badge, titre, sous-titre), les 4 statistiques (nombre + libellé), les "
  "paragraphes d'introduction, le bloc YouTube, ainsi que les coordonnées et la localisation.")
steps([
    "Ouvrir la rubrique Pages.",
    "Modifier les champs souhaités dans les différentes sections.",
    "Cliquer sur « Sauvegarder tout » en bas de page.",
])
H2('10.2 Activer / désactiver des pages et ordonner le menu')
P("Rubrique Navigation (Structure du site) : activer ou désactiver chaque page du menu et "
  "définir son ordre d'apparition. Une page désactivée n'apparaît plus dans la navigation "
  "du site.")
H2('10.3 Éditeur de blocs')
P("Rubrique Éditeur (Structure du site) : édition fine des blocs de contenu d'une page.")

# ---- 11 ----
H1('11. Configuration du site')
P("Rubrique Config (Outils). On y renseigne :")
steps([
    "Coordonnées : adresse, téléphone, email de contact, latitude/longitude GPS.",
    "Réseaux sociaux : liens YouTube, Instagram, Facebook, numéro WhatsApp.",
    "Horaires d'ouverture.",
    "Mot de passe administrateur (voir section 1.3).",
], numbered=False)
P("Après modification, cliquer sur « Sauvegarder tout ». La latitude et la longitude "
  "déterminent l'emplacement affiché sur la carte de la page Contact.")

# ---- 12 ----
H1('12. Lire les messages de contact')
P("Rubrique Messages (Outils). Affiche les messages envoyés via le formulaire de contact du "
  "site (nom, email, téléphone avec indicatif pays, sujet, message). Le tableau de bord "
  "indique le nombre de messages non lus.")
NOTE("Ces messages contiennent des données personnelles. À traiter avec confidentialité.")

# ---- 13 ----
H1('13. Le site multilingue')
P("Le site est disponible en quatre langues : français, anglais, espagnol et arabe. Le "
  "visiteur change de langue via les boutons FR / EN / ES / AR en haut du site. En arabe, "
  "la mise en page passe automatiquement de droite à gauche.")
P("Les textes de l'interface sont déjà traduits. Pour le contenu que vous saisissez "
  "(actualités, catégories de galerie, fiches d'étalons), pensez à remplir les champs de "
  "traduction quand ils existent ; sinon le français est affiché par défaut.")

# ---- 14 ----
H1('14. Exporter les données')
P("Rubrique Export CSV (Outils). Permet de télécharger les chevaux, étalons, événements, "
  "actualités et messages au format CSV, lisible dans Excel ou Google Sheets (encodage "
  "compatible avec les accents et l'arabe).")
NOTE("L'export CSV est pratique pour consulter ou partager des données. Pour une véritable "
     "sauvegarde de secours complète du site, voir la section Sauvegarde de la Documentation "
     "Technique (script de sauvegarde à lancer régulièrement).")

# ---- 15 ----
H1('15. Conseils et bonnes pratiques')
steps([
    "Sauvegarder régulièrement les données du site (voir Documentation Technique).",
    "Utiliser des photos nettes et bien cadrées, au format paysage de préférence.",
    "Renseigner les traductions pour offrir une expérience complète aux visiteurs étrangers.",
    "Tenir à jour le statut des chevaux (disponible / vendu) pour éviter les confusions.",
    "Choisir un mot de passe robuste et le changer en cas de doute.",
    "Se déconnecter après usage sur un poste partagé.",
], numbered=False)
P('— Fin du guide d\'utilisation —', 'End')

doc = SimpleDocTemplate('Guide_Utilisation_Haras_Adham.pdf', pagesize=A4,
                        topMargin=18*mm, bottomMargin=16*mm, leftMargin=20*mm, rightMargin=20*mm,
                        title="Guide d'utilisation Haras Adham", author='Haras Adham')
doc.build(E)
print('Guide PDF généré.')
