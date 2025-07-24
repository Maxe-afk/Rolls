import CartCards from "../components/cartCards";
import styles from "./page.module.css"

export default function Panier() {
    return (
        <>
            <h2 className={styles.cartTitle}>Mon panier:</h2>
            <CartCards />
        </>
    )
}