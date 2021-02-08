import React from 'react'
import Divider from "/src/components/system/Divider";

const EnAbout = ({ gogocarto, apps, openBrowser, firstTime, share }) => (
    <>
        <div className="column is-full">
            <h3 className="title is-5">A map for all nomads</h3>            
            <p>
                La Carto’Nomades is made for everyone: permanent and temporary nomadics,
                seasonals who wants to land somewhere, those who live in a caravan
                in a land, sunny days vanlifers or those who customize their small car
                and share it with three dogs, owners of eco-places and others living places 
                who want to host traveling people...
                And those who don't fit these descriptions.</p>
            <p>

                We are counting on you to contribute to this card, in a respect
                 essential for everyone's places and space! 
            </p>
            <p>
            In all circumstances, respect the place and its inhabitants. <br />
                 Leave the place clean, even if it wasn't when you arrived ...
            </p>
            {Meteor.isCordova &&
            <>
                <Divider />
                <h3 className="title is-5">Independent updates</h3>
                <p>
                If you see a refreshment at the first launch,
                     it is simply because the application has been put
                     updated by the site. This will happen with every update of the website. 
                </p>
            </>}
            <Divider />
            <h3 className="title is-5">Collaborative mode</h3>
            <p>
                 La Carto’Nomades is not just a list of places,
                 it is above all a collaborative card.
                 Without you, without your knowledge, there is no map.
             </p>
             <p>
                 It is up to everyone to register the places they deem appropriate
                 (if a registered place needs to be protected from human presence,
                 point it out, we can remove it from the map. If you discover a
                 magical place that needs to remain unknown, do not register it ...)
                 Our presence on the scene has consequences and we are there
                 more and more numerous.
             </p>
             <p>
                 If you know of private land, suggest to the owner of
                 add it with a description and contact details.
             </p> 
             <p>
             La Carto'Nomades is also a way of meeting nomads. <br />
             You can indicate your presence at a location by consulting its file.
             We believe that this tool can improve the community aspect of nomadic life.
             Thank you, once again, to everyone for respecting each other.
             </p> 
            <Divider />
            <h3 className="title is-5"> Places to complete </h3>
            <p>
                All places with "To be specified" data are GPS points which
                were retrieved from a website by {""}
                <b> a perfectly legal way </b>. We only collected the
                GPS coordinates which are common knowledge, that is why the
                other information will have to be filled in by all of us together.
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
                we believe that mutual aid is the key to a better world.
            </p> 
            <Divider />
            <h3 className="title is-5">And there is more! </h3>
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
            <div className="column is-full">
                <Divider />
                <h3 className="title is-5">A mobile App</h3>
                <p>
                    <b>
                    La Carto’Nomades is, and will remain, a free site, without ads and
                    Royalty-free
                    </b>
                    . There is no tracker, and no data is transmitted to a
                    third. Not even traffic analysis, nothing.
                </p>
                <p>
                    We have chosen to remove the app from the Apple and Google stores.
                    We hope to be able to share this application with "word of mouth"
                    mainly. It will still be downloadable, but through an alternative medium
                    and not referenced on the internet. The website itself is not referenceable.
                </p>
                <p>
                The mobile application is therefore available for Android only on GitHub where we
                let's host a version without going through Google.
                <br /> 
                <br />
                We will send messages to the Telegram group to prevent updates. 
                </p>
                {Meteor.isCordova && (
                <p>You can share the link to your friends with this button</p>
                )}
            </div>
            
            {!Meteor.isCordova ?
            apps.map(({ pic, name }) => (
                <div key={name} className="column is-one-third">
                <a href={Meteor.settings.public.APPS[name]} target="_blank">
                    <figure className={`${name} image`}>
                    <img src={pic} alt={name} />
                    </figure>
                </a>
                </div>
            ))
            :
            apps.map(({ pic, name }) => (
                <div key={name} className="column is-one-third">
                <a onClick={() => share(Meteor.settings.public.APPS[name], "en")}>
                    <figure className={`${name} image`}>
                    <img src={pic} alt={name} />
                    </figure>
                </a>
                </div>
            ))
            }
            <div className="column is-full">
            <Divider />
            <h3 className="title is-5">Have a good trip everyone! </h3>
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