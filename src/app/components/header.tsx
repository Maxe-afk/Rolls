import Link from "next/link"
import styles from "./header.module.css"
import Image from "next/image"

export default function Header() {
    return (
        <>
            <nav className={styles.navbar}>
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={64}
                    height={64}
                    className={styles.logo}
                />
                <Link href="/"><h2 className={styles.headerTitle}>HyperSkate</h2></Link>
                <Link href="/panier"><Image
                    src="/images/panier.svg"
                    alt="cart"
                    width={64}
                    height={64}
                    className={styles.cart}
                />
                </Link>
            </nav>
        </>
    )
}