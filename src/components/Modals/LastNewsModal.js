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
                    Le vendredi 5 février
                    <br/>
                    <b>Salut à toi,</b>
                    <br/><br/>
                    Nous avons pu voir beaucoup de téléchargement pour ce lancement de l'appli.
                    Les commentaires et retours nous ont fait plaisir également, car nous 
                    avons beaucoup travaillé pour la réaliser.
                    <br/><br/>
                    En revanche, nous avons eu une grosse réflexion après certains retours. Notre
                    application ne va-t-elle pas contribuer à un afflux de gens irrespectueux en 
                    pleine nature? C'est tout à fait possible, il y a même de fortes chances.
                    <br/><br/>
                    <b>Nous avons donc décidé de retirer l'application des stores d'Apple et de Google.</b>
                    <br/><br/>
                    Notre but étant ainsi de pouvoir partager ce savoir et donc cette application avec
                    le "bouche-à-oreille" principalement. Elle sera toujours téléchargeable mais par un biais alternatif
                    et donc pas référencé sur internet. Le site en lui mếme est non référençable. Nous voulons
                    aider la communauté et, comme vos retours nous l'ont appris, nous avons également la 
                    responsabilité de l'impact d'une nouvelle appli. Surtout que si elle est vraiment fonctionnelle, 
                    elle va vite attirer trop de monde (oui, bon, j'me balance des fleurs aussi hein)
                    <br/><br/>
                    <b>Qu'est-ce que ca change pour toi ?</b><br/>
                    En gros, tu l'a téléchargé donc pas grand chose. Les mises à jours se feront toutes seules 
                    quand même grâce à la technologie qu'on utilise.<br/>
                    C'est l'avenir qui est intéressant.
                    <br/><br/>
                    <b>Comment partager cette application alors ?</b><br/>
                    Si tu vois quelqu'un qui vit comme nous ou un réseau de nomades, en tout cas, des gens qui, tu le sais, 
                    sauront respecter les endroits naturellement préservés et que tu aimerai voir dans notre communauté.
                    Dans ce cas, le site existe toujours sur <a href="https://lacartonomades.fr">https://lacartonomades.fr</a>,
                    Et dans la page "a propos", tu trouvera le lien vers <b>l'application Android qu'on héberge ailleurs</b>.
                    <br /><br />
                    Tu peux aussi directement partager ce lien ou même le fichier.
                    L'application en elle-même pèse aussi lourd qu'une bonne photo.
                    Sur Telegram (lien sur la page a propos), nous avertirons toujours quand une version importante sort.
                    <br/><br/>
                    <b>Et pour les gens qui ont un iPhone ?</b><br/>
                    Nous avons fait un choix. Un choix drastique certes, mais nous pensons que c'est la meilleure chose à faire. 
                    En gros, il est impossible pour les iPhone d'installer une application externe à l'AppStore.
                    Le site internet restera fonctionnel completement et je m'efforcerai de l'améliorer au maximum pour
                    qu'il fonctionne parfaitement et que le ressenti soit comme sur une application, je vais améliorer ça dans les prochains jours. 
                    N'étant pas super fort sur les technologies Apple :/ si vous voyez des bugs, je vous invite à nous les transmettre sur Telegram
                    et je corrigerai au plus vite.
                    <br/><br/>
                    Voilà, ca fera plaisir à certains, grincer des dents d'autres, mais nous espérons que vous comprendrez. 
                    N'hésitez pas à nous faire part de ce que vous pensez, nous sommes ouvert.
                    <br/><br/>
                    Nous sommes persuadés que cet outil nous servira, mais il doit être correctement utilisé. 
                    Comme le disait l'oncle de Spider-Man, un grand pouvoir entraîne de grandes responsabilités... Ok, je m'arrête là :)
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
