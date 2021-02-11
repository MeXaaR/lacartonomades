import React, { useEffect } from "react";
import { AboutWrapper, ModalFooter } from "./style";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../api/utils/hooks";

export const MESSAGE_VERSION = 1


const LastNewsModal = () => {
  const [,setNewsVersion] = useLocalStorage("news_message_version");
  const { t } = useTranslation();

  useEffect(() => {
      setNewsVersion(MESSAGE_VERSION)
}, [])
  return (
    <>
      <AboutWrapper className="modal-card-body columns is-multiline is-centered">
        <div className="column is-full">
                    Le Jeudi 11 février
                    <br/>
                    <b>Salut à toi,</b>
                    <br/><br/>
                    La carte compte désormais plus de 250 utilisateurs connectés et nous ignorons combien de non connectés.
                    Merci à tous, on a eu de bon retours et des critiques constructives :)
                    <br/><br/>
                    <b>Mais il s'est passé un truc entre temps</b>
                    <br/><br/>
                    La carte a été 2 jours sur les stores Apple et Google et 
                    cela a suffit à Park4Night pour nous appeler. 
                    Il est clair que nous avons modifié et utilisé des données GPS 
                    (uniquement) ouvertement accessibles depuis leur site.
                    <br/><br/>
                    Nous n'avons pas pensé à mal, on s'est juste dit que c'était du travail 
                    collaboratif qui était entouré de pubs avec des fonctionnalités payantes. 
                    Donc, dans l'esprit du libre, nous l'avons réutilisé en pensant agir 
                    en toute légalité.
                    <br/><br/>
                    La personne a évidemment émis des menaces tribunal (et j'en passe).
                    Étant convaincus du bien fondé de notre action, ça ne nous a pas inquiété. Et, si besoin, 
                    on enleverai les points concernés. Cela dit, nous comprenons totalement l'avis professionnel et business de l'entreprise. 
                    <br/><br/>
                    Et, encore une fois, nous sommes persuadés que les <b>2 applications n'ont qu'une chose en commun</b>: les endroits où dormir.
                    Le type d'utilisateur, la communauté, les types de lieux, de ravitaillement et le modèle de fonctionnement n'ont rien à voir.
                    <br/><br/>
                    Mais voilà, ça nous a fait réfléchir, et on s'est dit que les points étant disponibles sur 
                    leur application, libre à nous tous de les rajouter manuellement, petit à petit, chacun 
                    de notre coté, quand on tombe sur un endroit qui nous plaît. Et cela nous rend une certaine 
                    tranquilité d'esprit quant à la légalité ou la morale.
                    <br/><br/>
                    Donc, on appuie sur le gros bouton rouge pour supprimer les points concernés et on redémarre avec le peu de points qu'on a chacun ajouté.
                     Mais la carte est jeune de quelques jours seulement donc nous pensons que La Carto'Nomades se contruira rapidement et de façon autonome.
                     <br/><br/>
                     <b>Nous avons ajouté un petit outil (la cloche) qui permet de voir l'activité de la communauté sur la carte.</b>
                    <br/><br/>
                    <b>Franchement, merci à tous pour vos retours. On passe beaucoup de temps dessus en ce moment et on est contents 
                    de lire vos réactions ;)</b>
                    <br/><br/>
                    À bientôt sur la route
                    <br/><br/>
                    Marie-Aure et François
                    <br/><br/>

        </div>
      </AboutWrapper>

      <ModalFooter className="modal-card-foot">
        <Link to="/menu" className="is-right">
          <button className={`button is-success`}>{t("buttons.close")}</button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default LastNewsModal;
