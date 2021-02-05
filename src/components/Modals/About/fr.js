import React from 'react'
import Divider from "/src/components/system/Divider";

const FrAbout = ({ gogocarto, apps, openBrowser }) => (
    <>
        <div className="column is-full">
            <h3 className="title is-5">Une carte pour tous les nomades</h3>
            <p>
                Carte collaborative de choses utiles. Partagez et profitez des bons
                plans de chacun.
            </p>
            <br />
            <p>
                La Carto’Nomades est réalisée pour tous : les nomades permanents et
                les temporaires, les propriétaires souhaitant accueillir des
                personnes de passage, les saisonniers qui veulent se poser quelques
                temps, les grands voyageurs et ceux qui cherchent un spot canon pour
                une nuit.
            </p>
            {Meteor.isCordova &&
            <>
                <Divider />
                <h3 className="title is-5">Mises à jour indépendantes</h3>
                <p>
                    Si tu aperçois un rafraichissement au premier lancement, 
                    c'est tout simplement parce que l'application a été mise 
                    à jour par le site. Cela arrivera à chaque mise à jour du site web.
                </p>
            </>}
            <Divider />
            <h3 className="title is-5">En mode collaboratif</h3>
            <p>
                <b>
                La Carto’Nomades est, et restera, un site gratuit, sans pub et
                libre de droits
                </b>
                . Il n'y a aucun traqueur, et aucune donnée n'est transmise à un
                tiers. Même pas d'analyse de trafic, rien.
            </p>
            <br />
            <p>
                Nous comptons sur vous pour contribuer à cette carte, dans un
                respect indispensable des lieux et de chacun!
                <br />
                <br />
                Si tu trouves un terrain privé, assures-toi de l’accord du
                propriétaire et de ses coordonnées avant de l’ajouter.
            </p>
            <p>
                Il t'est possible d'indiquer ta présence sur un lieu en consultant
                sa fiche. Nous avons fait ça pour améliorer l'aspect communautaire
                de la vie nomade. Merci à chacun de respecter les uns et les autres.
            </p>
            <Divider />
            <h3 className="title is-5">Les lieux à compléter</h3>
            <p>
                Tous les lieux avec des données "À préciser" sont des points GPS qui
                ont été extrait depuis un site internet par{" "}
                <b>un moyen parfaitement légal</b>. Nous n'avons collectés que les
                coordonnées GPS qui sont un savoir commun, c'est pour cela que les
                autres infos devront être renseignées par nous tous, ensemble.
            </p>
            <p>
                Nous justifions cette action de manière simple. Nous pensons, en
                tant que nomades, que ces informations doivent être facilement
                accessibles à tous <b>gratuitement</b> et <b>sans publicité</b>.
                Notre but n'est pas de gagner de l'argent mais de partager le
                maximum d'infos de manière à rendre notre vie à tous plus simple.
            </p>
            <p>
                Alors que les abonnements et les publicités ont envahi nos vies,
                nous pensons que l'entraide est la clé d'un monde meilleur.
            </p>
            <Divider />
            <h3 className="title is-5">Et il y a plus !</h3>
            <p>
                Toi qui es nomade et qui cherches des bons plans alternatifs sur ta
                route (circuits courts, bio, équitables ou locaux, éco-artisans,
                lieux de projets de transition écologique et sociale...), tu peux
                aussi utiliser ces sites:
            </p>
            </div>
            {gogocarto.map(({ title, desc, pic, href }) => (
            <a
                href={href}
                onClick={() => openBrowser(href)}
                key={title}
                target="_blank"
                className="column is-half"
            >
                <div className="box">
                <figure className="image">
                    <img src={pic} alt={title} />
                </figure>
                <br />
                <h4 className="subtitle is-6">{desc}</h4>
                </div>
            </a>
            ))}
            {!Meteor.isCordova && (
            <div className="column is-full">
                <Divider />
                <h3 className="title is-5">Les applications mobiles</h3>
                <p>
                Les applications mobiles sont dispo sur le Google Play Store, 
                sur l'AppStore mais également, pour android seulement, sur GitHub où nous 
                hébergeons une version sans passer par Google.
                <br />
                <br />
                Si tu choisis de télécharger l'application depuis GitHub, on 
                enverra un message sur le groupe Telegram pour prévenir des mises à jour.
                </p>
            </div>
            )}
            {!Meteor.isCordova &&
            apps.map(({ pic, name }) => (
                <div key={name} className="column is-one-third">
                <a href={Meteor.settings.public.APPS[name]} target="_blank">
                    <figure className={`${name} image`}>
                    <img src={pic} alt={name} />
                    </figure>
                </a>
                </div>
            ))}
            <div className="column is-full">
            <Divider />
            <h3 className="title is-5">Bonne route à tous!</h3>
            <p>
                La Carto’Nomades a été créée par François et Marie-Aure.
                <br />
                <br />
                Un groupe pour discuter de la Carto’Nomades existe sur Telegram
                <br />
                <br />
                <a
                href="https://t.me/lacartonomades"
                onClick={() => openBrowser("https://t.me/lacartonomades")}
                target="_blank"
                className="button is-info is-fullwidth"
                >
                <span className="icon">
                    <i className="mdi mdi-telegram"></i>
                </span>
                <span>Discutez avec nous</span>
                </a>
            </p>
            </div>
        </>
)

export default FrAbout