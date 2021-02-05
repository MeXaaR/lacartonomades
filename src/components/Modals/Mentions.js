import React from "react";
import { AboutWrapper, ModalFooter } from "./style";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Mentions = () => {
  const { t } = useTranslation();

  return (
    <>
      <AboutWrapper className="modal-card-body columns is-multiline is-centered">
        <div className="column is-full">
          <h2 className="title is-5">Définitions</h2>
          <p>
            <strong>Client :</strong> tout professionnel ou personne physique
            capable au sens des articles 1123 et suivants du Code civil, ou
            personne morale, qui visite le Site objet des présentes conditions
            générales.
          </p>
          <p>
            <strong>Prestations et Services :</strong>{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> met à
            disposition des Clients :
          </p>
          <p>
            <strong>Contenu :</strong> Ensemble des éléments constituants
            l’information présente sur le Site, notamment textes – images –
            vidéos.
          </p>
          <p>
            <strong>Informations clients :</strong> Ci après dénommé «
            Information (s) » qui correspondent à l’ensemble des données
            personnelles susceptibles d’être détenues par{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> pour la
            gestion de votre compte, de la gestion de la relation client et à
            des fins d’analyses et de statistiques.
          </p>
          <p>
            <strong>Utilisateur :</strong> Internaute se connectant, utilisant
            le site susnommé.
          </p>
          <p>
            <strong>Informations personnelles :</strong> « Les informations qui
            permettent, sous quelque forme que ce soit, directement ou non,
            l'identification des personnes physiques auxquelles elles
            s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).
          </p>
          <p>
            Les termes « données à caractère personnel », « personne concernée
            », « sous traitant » et « données sensibles » ont le sens défini par
            le Règlement Général sur la Protection des Données (RGPD : n°
            2016-679)
          </p>
          <h2 className="title is-5 margin-top">
            1. Présentation du site internet.
          </h2>
          <p>
            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour
            la confiance dans l'économie numérique, il est précisé aux
            utilisateurs du site internet{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> l'identité
            des différents intervenants dans le cadre de sa réalisation et de
            son suivi:
          </p>
          <p>
            <strong>Propriétaire</strong> : Francois AUBEUT – 4 rue du Bulloz Centre UBIDOCA, 17141, 74940 ANNECY
          </p>
          <p>
            <strong>Responsable publication</strong> : François AUBEUT –
            contact@mexar.fr
            <br />
            <strong>Responsable publication</strong> : Marie-Aure COTTA –
            contact@marie-aure.com
          </p>
          <p>
            Le responsable publication est une personne physique ou une personne
            morale.
            <br />
            <strong>Webmaster</strong> : François AUBEUT – contact@mexar.fr
            <br />
            <strong>Graphisme</strong> : Marie-Aure COTTA –
            contact@marie-aure.com
          </p>
          <p>
            <strong>Hébergeur</strong> : ovh – 2 rue Kellermann 59100 Roubaix
            1007
          </p>
          <p>
            <strong>Délégué à la protection des données</strong> : François
            AUBEUT – contact@mexar.fr
          </p>
          <div ng-bind-html="linkHTML">
            <p>
              Ce modèle de mentions légales est proposé par le{" "}
              <a
                href="https://fr.orson.io/1371/generateur-mentions-legales"
                title="générateur gratuit de mentions légales pour un site internet"
              >
                générateur gratuit de mentions légales pour un site internet
              </a>
            </p>
          </div>
          <h2 className="title is-5 margin-top">
            2. Conditions générales d’utilisation du site et des services
            proposés.
          </h2>
          <p>
            Le Site constitue une œuvre de l’esprit protégée par les
            dispositions du Code de la Propriété Intellectuelle et des
            Réglementations Internationales applicables. Le Client peut, de
            toutes les manières, réutiliser les informations du Site dotn le
            code est open source et hébergé sur Github.
          </p>
          <p>
            L’utilisation du site{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> implique
            l’acceptation pleine et entière des conditions générales
            d’utilisation ci-après décrites. Ces conditions d’utilisation sont
            susceptibles d’être modifiées ou complétées à tout moment, les
            utilisateurs du site{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> sont donc
            invités à les consulter de manière régulière.
          </p>
          <p>
            Ce site internet est normalement accessible à tout moment aux
            utilisateurs. Une interruption pour raison de maintenance technique
            peut être toutefois décidée par{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a>, qui
            s’efforcera alors de communiquer préalablement aux utilisateurs les
            dates et heures de l’intervention. Le site web{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> est mis à
            jour régulièrement par le responsable. De la même façon, les
            mentions légales peuvent être modifiées à tout moment : elles
            s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le
            plus souvent possible afin d’en prendre connaissance.
          </p>
          <h2 className="title is-5 margin-top">
            3. Description des services fournis.
          </h2>
          <p>
            Le site internet{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> a pour
            objet de fournir une carte communautaire permettant aux utilisateurs
            de partager des lieux facilitant les différents aspects de la vie
            nomade.
          </p>
          <p>
            L'ajout de lieux appartenant à des personnes privées ne doit en
            aucun cas être effectué sans leur accord.
          </p>
          <p>
            La fonctionnalité afin que l'utilisateur signale sa présence sur un
            lieu a été créé afin de consolider la communauté. Toutefois{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> ne saurait
            être responsable de toutes les conséquences qui en découlent.
          </p>
          <h2 className="title is-5 margin-top">
            4. Limitations contractuelles sur les données techniques.
          </h2>
          <p>
            Le site utilise la technologie JavaScript. Le site Internet ne
            pourra être tenu responsable de dommages matériels liés à
            l’utilisation du site. De plus, l’utilisateur du site s’engage à
            accéder au site en utilisant un matériel récent, ne contenant pas de
            virus et avec un navigateur de dernière génération mis-à-jour Le
            site <a href="https://lacartonomades.fr">lacartonomades.fr</a> est
            hébergé chez un prestataire sur le territoire de l’Union Européenne
            conformément aux dispositions du Règlement Général sur la Protection
            des Données (RGPD : n° 2016-679)
          </p>
          <p>
            L’objectif est d’apporter une prestation qui assure le meilleur taux
            d’accessibilité. L’hébergeur assure la continuité de son service 24
            Heures sur 24, tous les jours de l’année. Il se réserve néanmoins la
            possibilité d’interrompre le service d’hébergement pour les durées
            les plus courtes possibles notamment à des fins de maintenance,
            d’amélioration de ses infrastructures, de défaillance de ses
            infrastructures ou si les Prestations et Services génèrent un trafic
            réputé anormal.
          </p>
          <p>
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> et
            l’hébergeur ne pourront être tenus responsables en cas de
            dysfonctionnement du réseau Internet, des lignes téléphoniques ou du
            matériel informatique et de téléphonie lié notamment à
            l’encombrement du réseau empêchant l’accès au serveur.
          </p>
          <h2 className="title is-5 margin-top">
            5. Propriété intellectuelle et contrefaçons.
          </h2>
          <p>
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> est
            propriétaire des droits de propriété intellectuelle et détient les
            droits d’usage sur tous les éléments accessibles sur le site
            internet, notamment les textes, images, graphismes, logos, vidéos,
            icônes et sons. Toutefois, ce Site étant licencié DWTFYW, toute
            reproduction, représentation, modification, publication, adaptation
            de tout ou partie des éléments du site, quel que soit le moyen ou le
            procédé utilisé, est autorisée, et les contributions à
            l'amélioration du Site sont vivement encouragées sur Github.
          </p>
          <h2 className="title is-5 margin-top">
            6. Limitations de responsabilité.
          </h2>
          <p>
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> ne pourra
            être tenu responsable des dommages directs et indirects causés au
            matériel de l’utilisateur, lors de l’accès au site internet{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a>, et
            résultant soit de l’utilisation d’un matériel ne répondant pas aux
            spécifications indiquées au point 4, soit de l’apparition d’un bug
            ou d’une incompatibilité.
          </p>
          <p>
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> ne pourra
            également être tenu responsable des dommages indirects (tels par
            exemple qu’une perte de marché ou perte d’une chance) consécutifs à
            l’utilisation du site{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> étant un
            site communautaire, il ne pourra être tenu responsable des oublis,
            des inexactitudes et des carences dans la mise à jour des lieux,
            qu’elles soient de son fait ou du fait des utilisateurs qui
            fournissent ces informations. Il ne saurait être responsable en cas
            d'échange d’information illégale.
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> se réserve
            le droit de supprimer, sans mise en demeure préalable, tout contenu
            déposé dans cet espace qui contreviendrait à la législation
            applicable en France, en particulier aux dispositions relatives à la
            protection des données. Le cas échéant,{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> se réserve
            également la possibilité de mettre en cause la responsabilité civile
            et/ou pénale de l’utilisateur, notamment en cas de message à
            caractère raciste, injurieux, diffamant, ou pornographique, quel que
            soit le support utilisé (texte, photographie …).
          </p>
          <h2 className="title is-5 margin-top">
            7. Gestion des données personnelles.
          </h2>
          <p>
            Le Client est informé des réglementations concernant la
            communication marketing, la loi du 21 Juin 2014 pour la confiance
            dans l’Economie Numérique, la Loi Informatique et Liberté du 06 Août
            2004 ainsi que du Règlement Général sur la Protection des Données
            (RGPD : n° 2016-679).{" "}
          </p>
          <h3 className="subtitle is-5">
            7.1 Responsables de la collecte des données personnelles
          </h3>
          <p>
            Pour les Données Personnelles collectées dans le cadre de la
            création du compte personnel de l’Utilisateur et de sa navigation
            sur le Site, le responsable du traitement des Données Personnelles
            est : Francois AUBEUT.{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a>est
            représenté par François AUBEUT, son représentant légal
          </p>
          <p>
            En tant que responsable du traitement des données qu’il collecte,{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> s’engage à
            respecter le cadre des dispositions légales en vigueur. Il lui
            appartient notamment au Client d’établir les finalités de ses
            traitements de données, de fournir à ses prospects et clients, à
            partir de la collecte de leurs consentements, une information
            complète sur le traitement de leurs données personnelles et de
            maintenir un registre des traitements conforme à la réalité. Chaque
            fois que <a href="https://lacartonomades.fr">lacartonomades.fr</a>{" "}
            traite des Données Personnelles,{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> prend
            toutes les mesures raisonnables pour s’assurer de l’exactitude et de
            la pertinence des Données Personnelles au regard des finalités pour
            lesquelles <a href="https://lacartonomades.fr">lacartonomades.fr</a>{" "}
            les traite.
          </p>
          <h3 className="subtitle is-5">7.2 Finalité des données collectées</h3>
          <p>
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> est
            susceptible de traiter tout ou partie des données :{" "}
          </p>
          <ul>
            <li>
              pour permettre la navigation sur le Site et la gestion et la
              traçabilité des prestations et services commandés par
              l’utilisateur : données de connexion et d’utilisation du Site,
              facturation, historique des commandes, etc.{" "}
            </li>

            <li>
              pour prévenir et lutter contre la fraude informatique (spamming,
              hacking…) : matériel informatique utilisé pour la navigation,
              l’adresse IP, le mot de passe (hashé){" "}
            </li>

            <li>
              pour améliorer la navigation sur le Site : données de connexion et
              d’utilisation{" "}
            </li>
          </ul>
          <p>
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> ne
            commercialise pas vos données personnelles qui sont donc uniquement
            utilisées par nécessité.
          </p>
          <h3 className="subtitle is-5">
            7.3 Droit d’accès, de rectification et d’opposition
          </h3>
          <p>
            Conformément à la réglementation européenne en vigueur, les
            Utilisateurs de{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> disposent
            des droits suivants :{" "}
          </p>
          <ul>
            <li>
              droit d'accès (article 15 RGPD) et de rectification (article 16
              RGPD), de mise à jour, de complétude des données des Utilisateurs
              droit de verrouillage ou d’effacement des données des Utilisateurs
              à caractère personnel (article 17 du RGPD), lorsqu’elles sont
              inexactes, incomplètes, équivoques, périmées, ou dont la collecte,
              l'utilisation, la communication ou la conservation est interdite{" "}
            </li>

            <li>
              droit de retirer à tout moment un consentement (article 13-2c
              RGPD){" "}
            </li>

            <li>
              droit à la limitation du traitement des données des Utilisateurs
              (article 18 RGPD){" "}
            </li>

            <li>
              droit d’opposition au traitement des données des Utilisateurs
              (article 21 RGPD){" "}
            </li>

            <li>
              droit à la portabilité des données que les Utilisateurs auront
              fournies, lorsque ces données font l’objet de traitements
              automatisés fondés sur leur consentement ou sur un contrat
              (article 20 RGPD){" "}
            </li>

            <li>
              droit de définir le sort des données des Utilisateurs après leur
              mort et de choisir à qui{" "}
              <a href="https://lacartonomades.fr">lacartonomades.fr</a> devra
              communiquer (ou non) ses données à un tiers qu’ils aura
              préalablement désigné
            </li>
          </ul>
          <p>
            Dès que <a href="https://lacartonomades.fr">lacartonomades.fr</a> a
            connaissance du décès d’un Utilisateur et à défaut d’instructions de
            sa part, <a href="https://lacartonomades.fr">lacartonomades.fr</a>{" "}
            s’engage à détruire ses données, sauf si leur conservation s’avère
            nécessaire à des fins probatoires ou pour répondre à une obligation
            légale.
          </p>
          <p>
            Si l’Utilisateur souhaite supprimer ses données, il suffit de
            supprimer le compte correspodnant à son adresse email. Alors, tout
            son historique de connexion ainsi que ses lieux privés seront
            supprimés de la base de données et rien ne sera conservé.
          </p>
          <h3 className="subtitle is-5">
            7.4 Non-communication des données personnelles
          </h3>
          <p>
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> s’interdit
            de traiter, héberger ou transférer les Informations collectées sur
            ses Clients en dehors de l'utilisation de la{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a>
          </p>
          <p>
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> s’engage à
            prendre toutes les précautions nécessaires afin de préserver la
            sécurité des Informations et notamment qu’elles ne soient pas
            communiquées à des personnes non autorisées. Cependant, si un
            incident impactant l’intégrité ou la confidentialité des
            Informations du Client est portée à la connaissance de{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a>, celle-ci
            devra dans les meilleurs délais informer le Client et lui
            communiquer les mesures de corrections prises. Par ailleurs{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> ne
            collecte aucune « données sensibles ».
          </p>
          <div ng-bind-html="rgpdHTML">
            <h3 className="subtitle is-5">7.5 Types de données collectées</h3>
            <p>
              <a href="https://lacartonomades.fr">lacartonomades.fr</a> collecte
              en outre des informations qui permettent d’améliorer l’expérience
              utilisateur et de proposer des conseils contextualisés&nbsp;:
              <br />
              Email
            </p>
            <p>
              {" "}
              Ces &nbsp;données ne sont pas conservées après la fin de la
              relation contractuelle
            </p>
          </div>
          <h2 className="title is-5 margin-top">8. Notification d’incident</h2>
          <p>
            Quels que soient les efforts fournis, aucune méthode de transmission
            sur Internet et aucune méthode de stockage électronique n'est
            complètement sûre. Nous ne pouvons en conséquence pas garantir une
            sécurité absolue. Si nous prenions connaissance d'une brèche de la
            sécurité, nous avertirions les utilisateurs concernés afin qu'ils
            puissent prendre les mesures appropriées. Nos procédures de
            notification d’incident tiennent compte de nos obligations légales,
            qu'elles se situent au niveau national ou européen. Nous nous
            engageons à informer pleinement nos clients de toutes les questions
            relevant de la sécurité de leur compte et à leur fournir toutes les
            informations nécessaires pour les aider à respecter leurs propres
            obligations réglementaires en matière de reporting.
          </p>
          <p>
            Aucune information personnelle de l'utilisateur du site{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> n'est
            publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou
            vendue sur un support quelconque à des tiers. Seule l'hypothèse du
            rachat de <a href="https://lacartonomades.fr">lacartonomades.fr</a>{" "}
            et de ses droits permettrait la transmission des dites informations
            à l'éventuel acquéreur qui serait à son tour tenu de la même
            obligation de conservation et de modification des données vis à vis
            de l'utilisateur du site{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a>.
          </p>
          <h3 className="subtitle is-5">Sécurité</h3>
          <p>
            Pour assurer la sécurité et la confidentialité des Données
            Personnelles et des Données Personnelles de Santé,{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> utilise
            des réseaux protégés par des dispositifs standards tels que par
            pare-feu, la pseudonymisation, l’encryption et mot de passe.{" "}
          </p>
          <h2 className="title is-5 margin-top">
            9. Liens hypertextes « cookies » et balises (“tags”) internet
          </h2>
          <p>
            Le site <a href="https://lacartonomades.fr">lacartonomades.fr</a>{" "}
            contient un certain nombre de liens hypertextes vers d’autres sites,
            mis en place avec l’autorisation de{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a>.
            Cependant, <a href="https://lacartonomades.fr">lacartonomades.fr</a>{" "}
            n’a pas la possibilité de vérifier le contenu des sites ainsi
            visités, et n’assumera en conséquence aucune responsabilité de ce
            fait.
          </p>
          <p>
            Le Site n'utilise pas de cookies mais la technologie de Stockage
            Local permettant d'enregistrer votre clé de connexion dans votre
            navigateur ainsi que des informations relatives aux lieux visités
            afin d'y avoir accès sans connexion internet.
          </p>
          <h2 className="title is-5 margin-top">
            10. Droit applicable et attribution de juridiction.
          </h2>
          <p>
            Tout litige en relation avec l’utilisation du site{" "}
            <a href="https://lacartonomades.fr">lacartonomades.fr</a> est soumis
            au droit français. En dehors des cas où la loi ne le permet pas, il
            est fait attribution exclusive de juridiction aux tribunaux
            compétents de Toulouse
          </p>
        </div>
      </AboutWrapper>

      <ModalFooter className="modal-card-foot">
        <Link to="/menu" className="is-right">
          <button className={`button is-success`}>{t("buttons.back")}</button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default Mentions;
