/**
 * Catálogo centralizado de productos de LE CANELE
 * Cada producto utiliza una de las fotografías reales de la pastelería.
 */
export const productsData = [
  {
    id: "macarons-1",
    name: "Colección de Macarons",
    category: "macarons",
    image: "images/macarons_pastel_pink.webp",
    description: "Ligeros bocados celestiales de merengue italiano y almendra molida en piedra, rellenos de ganache aterciopelada de frambuesa fresca y maracuyá de origen.",
    alt: "Macarons artesanales Le Canele en tonos rosa pastel",
    price: "18,00 €",
    spec: "12 Uds.",
    ingredients: "Harina de almendra molida en piedra, azúcar glass, claras de huevos camperos, chocolate blanco de origen y pulpa natural de frambuesas y fruta de la pasión.",
    allergens: ["huevos", "frutos-de-cascara", "lacteos"],
    bakerNote: "Elaborados siguiendo el método de merengue italiano para conseguir una concha lisa, brillante y con el clásico 'pie' francés."
  },
  {
    id: "pastel-1",
    name: "Pastel Contemporáneo",
    category: "pasteles-individuales",
    image: "images/pastel_individual_dark.webp",
    description: "Una sinfonía de texturas con mousse sedosa de chocolate negro belga 70%, praliné crujiente de avellanas del Piamonte, dacquoise tierna de cacao y glaseado espejo brillante de autor.",
    alt: "Pastel individual premium Le Canele sobre fondo oscuro",
    price: "4,80 €",
    spec: "1 Ud.",
    ingredients: "Mousse de chocolate negro Belga 70%, praliné crujiente de avellanas del Piamonte, bizcocho dacquoise de cacao y glaseado espejo brillante.",
    allergens: ["gluten", "frutos-de-cascara", "lacteos", "soja"],
    bakerNote: "La dacquoise se hornea a alta temperatura para retener la humedad y contrastar con la textura sedosa de la mousse."
  },
  {
    id: "tarta-1",
    name: "Tarta de Celebración",
    category: "tartas",
    image: "images/tarta_celebracion_dark.webp",
    description: "Creación exclusiva con bizcocho súper húmedo de vainilla Bourbon de Madagascar perfumada en almíbar cítrico, crema ligera de mascarpone y confitura artesanal de frutos del bosque recién recolectados.",
    alt: "Tarta de celebración artesanal decorada con flores y frutas",
    price: "Desde 35,00 €",
    spec: "8-10 porc.",
    ingredients: "Bizcocho húmedo de vainilla de Madagascar, crema ligera de queso mascarpone, confitura artesanal de frutos del bosque y flores orgánicas del huerto local.",
    allergens: ["gluten", "huevos", "lacteos"],
    bakerNote: "Decorada individualmente con pétalos naturales comestibles y frutas frescas de temporada recogidas el mismo día del evento."
  },
  {
    id: "pastel-2",
    name: "Mini Tartaletas",
    category: "pasteles-individuales",
    image: "images/tartas_individuales_land.webp",
    description: "Bocados crujientes de pasta sablé elaborada con mantequilla de Normandía DOP, rellenas de crema sedosa de limón confitado y coronadas con picos de merengue suizo dorado a soplete.",
    alt: "Bandeja de mini tartaletas de obrador Le Canele",
    price: "15,00 €",
    spec: "6 Uds.",
    ingredients: "Pasta sablé de mantequilla DOP, crema de limón confitado y merengue suizo tostado a soplete.",
    allergens: ["gluten", "huevos", "lacteos"],
    bakerNote: "La pasta sablé se hornea 'a ciegas' para mantener la base crujiente frente al relleno húmedo de limón."
  },
  {
    id: "postre-1",
    name: "Creación de Chocolate",
    category: "postres",
    image: "images/producto_destacado_white.webp",
    description: "Postre de autor con ganache montada de cacao de Madagascar, corazón fluido de caramelo salado a la flor de sal de Guérande y bizcocho genovés bañado en licor suave.",
    alt: "Postre artesanal Le Canele de chocolate sobre fondo minimalista blanco",
    price: "5,20 €",
    spec: "1 Ud.",
    ingredients: "Ganache montada de chocolate con leche de origen único, centro líquido de caramelo salado a la flor de sal y bizcocho genovés de cacao.",
    allergens: ["gluten", "huevos", "lacteos", "soja"],
    bakerNote: "La ganache se infusiona en frío durante 24 horas antes de montarla para lograr una textura aireada única."
  },
  {
    id: "elaboracion-1",
    name: "Detalles Dulces",
    category: "postres",
    image: "images/elaboracion_detalle_dark.webp",
    description: "Delicadas galletas de mantequilla fina aromatizadas con ralladura de naranja ecológica y cardamomo verde, glaseadas a mano con precisión milimétrica en nuestro atelier.",
    alt: "Primer plano del proceso artesanal en Le Canele",
    price: "6,00 €",
    spec: "6 Uds.",
    ingredients: "Galletas de mantequilla fina aromatizadas con ralladura de naranja, cardamomo y cubiertas con un glaseado real satinado.",
    allergens: ["gluten", "huevos", "lacteos"],
    bakerNote: "Cada detalle decorativo se realiza a pulso con boquillas extrafinas de precisión."
  }
];

export const categoriesData = [
  { id: "all", name: "Todos" },
  { id: "macarons", name: "Macarons" },
  { id: "pasteles-individuales", name: "Pasteles Individuales" },
  { id: "tartas", name: "Tartas" },
  { id: "postres", name: "Postres" }
];
