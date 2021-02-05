import React from 'react'
import Divider from "/src/components/system/Divider";

const EnAbout = ({ gogocarto, apps, openBrowser, firstTime }) => (
    <>
        <div className="column is-full">
            <h3 className="title is-5">A map for all nomadics</h3>
            <p>
                Collaborative map of useful things. Share and enjoy the coupons
                plans of each.
            </p>
            <br />
            <p>
                The Carto'Nomades is made for everyone: permanent nomads and
                temporary workers, owners wishing to host
                passing people, seasonal workers who want to land a few
                weather, frequent travelers and those looking for a hot spot for
                a night.
            </p>
            <Divider />
            {Meteor.isCordova &&
            <>
                <Divider />
                <h3 className="title is-5">Standalone updates</h3>
                <p>
                    If you experience a blink, like a refresh on a the first start, 
                    it is because the apps has been updated by the website. It will happen
                    everytime we update the website.
                </p>
            </>}
            <h3 className="title is-5">In the collaborative way</h3>
            <p>
                <b>
                La Carto’Nomades is, and will remain, a free site, without ads and
                free of rights.
                </b>
                There is no tracker, and no data is transmitted to a
                third party. Not even traffic analysis, nothing.
            </p>
            <br />
            <p>
                We are counting on you to contribute to this map, with a
                respect for places and for people!
                <br />
                <br />
                If you find private land, make sure of the
                owner and contact details before adding it.
            </p>
            <p>
                You can indicate your presence at a location by consulting
                its page. We did this to improve the community aspect
                of nomadic life. Thank you everyone for respecting each other.
            </p>
            <Divider />
            <h3 className="title is-5">Places to complete</h3>
            <p>
                All places with "À préciser" data are GPS points which
                were retrieved from a website by {""}
                <b> a perfectly legal way </b>. We only collected the
                GPS coordinates which are common knowledge, that is why the
                other info will have to be filled in by all of us together.

            </p>
            <p>
                We justify this action in a simple way. We think, in
                as nomads, that this information should be easily
                accessible to everyone <b> free of charge </b> and <b> without advertising </b>.
                Our goal is not to earn money but to share the
                as much information as possible in order to make life easier for all.
            </p>
            <p>
                As subscriptions and advertisements invaded our lives,
                we believe that mutual help is the key to a better world.
            </p>
            <Divider />
            <h3 className="title is-5">There is more !</h3>
            <p>
                You who are nomadic and who are looking for good alternative plans on your
                road (short circuits, organic, fair or local, eco-craftsmen,
                places of ecological and social transition projects ...), you can
                also use these sites:
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
                <h3 className="title is-5">Mobiles Apps</h3>
                <p>
                Mobile Apps are available on the Google Play Store,
                on the AppStore but also, for android only, on GitHub where we
                host a version without going through Google.
                <br />
                <br />
                If you choose to download the app from GitHub, we
                will send message on the Telegram group to warn for updates.
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
            <h3 className="title is-5">Have a good trip everyone!</h3>
            <p>
                La Carto’Nomades was created by François and Marie-Aure.
                <br />
                <br />
                A group to discuss the Carto'Nomades exists on Telegram
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
                <span>Discuss with us</span>
                </a>
            </p>
            </div>
        </>
)

export default EnAbout