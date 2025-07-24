import 'dotenv/config';
import mysql from 'mysql2/promise';

async function seed() {
    const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
        process.env;
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_DB_HOST,
      user: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME
    });

    const products = [
      [
        'Patins de Natation Aquaroll™',
        'Palmes à roulettes pour performance aquatique',
        79.99,
        'Conçus pour les nageurs exigeants souhaitant repousser les limites de l’hydroglisse, les Patins de Natation Aquaroll™ allient propulsion aquatique et mobilité terrestre. Grâce à leurs palmes rigides et leurs roues multi-surface, passez du carrelage au bassin sans déchausser. Idéal pour les compétitions de relais entre sol et eau.',
        'patinsNatation.png'
      ],
      [
        'Patins d\'Escalade Altiride™',
        'Montée et descente optimisées',
        129.90,
        'Développés en collaboration avec des grimpeurs urbains, les Patins d’Escalade Altiride™ disposent de crampons latéraux et d’un frein à friction inversée pour sécuriser vos ascensions. Grâce à leur technologie “Grip & Glide™”, passez du mur d’escalade au sentier rocailleux en toute fluidité.',
        'patinsEscalade.png'
      ],
      [
        'Patins de Cyclisme TurboWheel™',
        'Multiroues pour vitesse extrême',
        89.00,
        'Les Patins de Cyclisme TurboWheel™ apportent ce que le vélo n’a jamais osé offrir : **plus de roues**. Avec leur structure aérodynamique et leur répartition de charge en quinconce, ils transforment chaque foulée en propulsion cyclique. À utiliser avec ou sans vélo, pour booster chaque déplacement.',
        'patinsCyclisme.png'
      ],
      [
        'Patins de Judo GripFlex™',
        'Roulettes velcro pour discipline martiale',
        64.50,
        'Les Patins de Judo GripFlex™ révolutionnent l’art du combat au sol. Équipés de roues à bande velcro adhérente, ils garantissent une accroche parfaite sur tatami tout en permettant des transitions fluides entre les prises. Conformes aux normes imaginaires de la Fédération Internationale de Judo à Roulettes.',
        'patinsJudo.png'
      ],
      [
        'Double Patins OverRoll™',
        'Deux fois plus de patins, deux fois plus de contrôle',
        99.99,
        'Les Double Patins OverRoll™ incarnent la redondance maîtrisée. En superposant deux couches de patins, vous gagnez en stabilité verticale et en style affirmé. Recommandés pour les passionnés de roulage intensif et les artistes du bitume. Empilés à la main par des experts en doublage.',
        'doublePatins.png'
      ],
      [
        'Combinaison Patinage Intégral TotalRoll™',
        'Roulettes intégrées de la tête aux pieds',
        299.99,
        'La Combinaison Patinage Intégral TotalRoll™ est une avancée dans la mobilité corporelle totale. Chaque membre, du crâne au talon, est équipé d’un module roulant certifié ISO-roue 9001. Offrant une liberté de mouvement complète sur tous les axes, elle est idéale pour les performances chorégraphiées ou les déplacements globaux rapides.',
        'combiIntégrale.png'
      ]
    ];

    const sql = `
      INSERT INTO products (name, short_description, price, long_description, image_url)
      VALUES (?, ?, ?, ?, ?)
    `;

    for (const product of products) {
      await connection.execute(sql, product);
    }

    console.log('✅ Données insérées avec succès.');
    await connection.end();
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

seed();