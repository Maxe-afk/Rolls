import styles from "./page.module.css";
import ProductCards from "./components/productCards";

export default function Home() {
  return (
    <>
      <p className={styles.intro}>Bienvenue au royaume des patins !<br />Depuis les années 80 le monde du transport et du sport n&apos;a cessé d&apos;évoluer. Chez HyperSkate nous avons trouvé comment subvenir à tout vos besoins.<br />Nous vous proposons une large gamme de patins à roulettes pour tout les sports que vous pouvez pratiquer.<br />N&apos;hésitez plus, optez pour HyperSkate.</p>
      <ProductCards/>
    </>
  );
}
