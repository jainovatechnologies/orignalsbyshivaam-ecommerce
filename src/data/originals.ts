// ORIGINALS BY SHIVAAM - Data Store
// All items flagged // CONFIRM WITH OWNER are noted for owner verification.

export const SHOW_SAMPLE_PRICES = process.env.NEXT_PUBLIC_SHOW_SAMPLE_PRICES !== 'false' // default true for PoC
export const SHOW_UNCONFIRMED_BRANDS = process.env.NEXT_PUBLIC_SHOW_UNCONFIRMED_BRANDS === 'true' // default false, hides product-7 PUMA & product-9 wallet

export interface StorePhone {
  retail: string // primary, used for Call and WhatsApp defaults
  google: string // CONFIRM WITH OWNER (alternate)
  banner: string // CONFIRM WITH OWNER (alternate)
}

export interface StoreInfo {
  name: string
  tagline: string
  address: string
  phone: StorePhone
  whatsapp: string
  instagram: string
  instagramFollowers: string
  rating: {
    score: number
    reviewCount: number
    platform: string
  }
  established: number
  owner: string
  hours: string
  mapsEmbedUrl: string
}

export const store: StoreInfo = {
  name: 'ORIGINALS BY SHIVAAM',
  tagline: 'Originals Never Fade.',
  address: 'C-350, Basement, Pradhan Marg, Block C, Malviya Nagar, Jaipur 302017', // CONFIRM WITH OWNER
  phone: {
    retail: '7726948704', // Primary, used for Call and WhatsApp defaults
    google: '075587 71001', // CONFIRM WITH OWNER
    banner: '7558771001', // CONFIRM WITH OWNER
  },
  whatsapp: '7726948704', // Primary WhatsApp defaults to retail
  instagram: 'https://instagram.com/originalsbyshivaam',
  instagramFollowers: '8K+ followers',
  rating: {
    score: 5.0,
    reviewCount: 68,
    platform: 'Google', // Source: Google listing, confirm with owner
  },
  established: 2017,
  owner: '', // CONFIRM WITH OWNER
  hours: 'Open 7 days · 11:00 AM – 9:30 PM', // CONFIRM WITH OWNER
  mapsEmbedUrl: process.env.NEXT_PUBLIC_MAPS_EMBED_URL || '',
}

export const brands = [
  'ASICS',
  'HOKA',
  'Nike',
  'adidas',
  'New Balance',
  'Skechers',
] as const // CONFIRM WITH OWNER for Puma and Mergot.

export interface BrandLogo {
  name: string
  logo: string
  className?: string
}

export const brandLogos: BrandLogo[] = [
  { name: 'Nike', logo: '/images/logos/nike.svg', className: 'h-6 sm:h-7 md:h-8' },
  { name: 'adidas', logo: '/images/logos/adidas.svg', className: 'h-8 sm:h-9 md:h-10' },
  { name: 'ASICS', logo: '/images/logos/asics.svg', className: 'h-6 sm:h-7 md:h-8' },
  { name: 'New Balance', logo: '/images/logos/newbalance.svg', className: 'h-8 sm:h-9 md:h-10' },
  { name: 'HOKA', logo: '/images/logos/hoka.svg', className: 'h-6 sm:h-7 md:h-7.5' },
  { name: 'Skechers', logo: '/images/logos/skechers.svg', className: 'h-6 sm:h-7 md:h-8' },
]

// Categories: Footwear, Apparel, Accessories (Bags removed per user instruction)
export const categories = ['Footwear', 'Apparel', 'Accessories'] as const

export interface Product {
  id: number
  name: string
  brand: string
  category: 'Footwear' | 'Apparel' | 'Accessories'
  image: string
  mrp?: number // Sample price MRP from price tag
  ourPrice?: number // Sample price from price tag
  priceFlag?: string // Note on price tag source
  unconfirmedBrand?: boolean // Flagged if brand confirmation needed
  description?: string
}

// Products (Bags removed)
export const allProducts: Product[] = [
  {
    id: 1,
    name: 'ASICS Skyhand',
    brand: 'ASICS',
    category: 'Footwear',
    image: '/images/product-1.jpg',
    mrp: 9999,
    ourPrice: 5999,
    priceFlag: 'CONFIRM, tag is hard to read',
    description: 'Cream colorway with classic gum sole.',
  },
  {
    id: 2,
    name: 'ASICS Magic Speed',
    brand: 'ASICS',
    category: 'Footwear',
    image: '/images/product-2.jpg',
    mrp: 10999,
    ourPrice: 5499,
    priceFlag: 'Sample price from tag',
    description: 'Teal edition built for race-day energy and daily tempo.',
  },
  {
    id: 3,
    name: 'HOKA Hopara',
    brand: 'HOKA',
    category: 'Footwear',
    image: '/images/product-3.jpg',
    mrp: 15999,
    ourPrice: 4500,
    priceFlag: 'Sample price from tag',
    description: 'White mountain-to-street sandal hybrid.',
  },
  {
    id: 4,
    name: 'ASICS Nimbus',
    brand: 'ASICS',
    category: 'Footwear',
    image: '/images/product-4.jpg',
    mrp: 16999,
    ourPrice: 8499,
    priceFlag: 'Sample price from tag',
    description: 'Deep blue colorway engineered for plush distance comfort.',
  },
  {
    id: 5,
    name: 'ASICS Gel-Kayano',
    brand: 'ASICS',
    category: 'Footwear',
    image: '/images/product-5.jpg',
    mrp: 15999,
    ourPrice: 7999,
    priceFlag: 'Sample price from tag',
    description: 'All-black stability icon for everyday lifestyle and miles.',
  },
  {
    id: 6,
    name: 'ASICS Skyhand Gum Sole',
    brand: 'ASICS',
    category: 'Footwear',
    image: '/images/product-6.jpg',
    mrp: 9999,
    ourPrice: 5999,
    priceFlag: 'Tag not visible. CONFIRM with owner.',
    description: 'Black court heritage silhouette with gum sole.',
  },
  {
    id: 7,
    name: 'PUMA Court Icon',
    brand: 'PUMA',
    category: 'Footwear',
    image: '/images/product-7.jpg',
    mrp: 8999,
    ourPrice: 4499,
    priceFlag: 'NOT IN BRAND LIST. CONFIRM brand and price.',
    unconfirmedBrand: true,
    description: 'Grey and white retro court silhouette with lilac sole.',
  },
  {
    id: 8,
    name: 'HOKA Ora Slide',
    brand: 'HOKA',
    category: 'Footwear',
    image: '/images/product-8.jpg',
    mrp: 10999,
    ourPrice: 2499,
    priceFlag: 'Sample price from tag',
    description: 'Vibrant yellow post-run recovery slide.',
  },
  {
    id: 9,
    name: 'MERGOT Leather Wallet',
    brand: 'MERGOT',
    category: 'Accessories',
    image: '/images/product-9.jpg',
    mrp: 2999,
    ourPrice: 1499,
    priceFlag: 'Unknown brand, CONFIRM. Accessories. Not a shoe.',
    unconfirmedBrand: true,
    description: 'Handcrafted tan leather folding wallet.',
  },
  {
    id: 10,
    name: 'Store Wall Collection',
    brand: 'ASICS',
    category: 'Footwear',
    image: '/images/product-10.jpg',
    priceFlag: 'Store shot, not a single product. Shelf display.',
    description: 'Green Skyhand, black ASICS, and white editions on wooden shelves.',
  },
]

// Filter products based on unconfirmed brand flag
export const products = SHOW_UNCONFIRMED_BRANDS
  ? allProducts
  : allProducts.filter((p) => !p.unconfirmedBrand)

export const arrivals = [
  {
    id: 1,
    date: 'JUST IN',
    title: 'Fresh pairs for the wall',
    subtitle: 'ASICS Skyhand & Magic Speed restocked',
    image: '/images/product-2.jpg',
  },
  {
    id: 2,
    date: 'JUST IN',
    title: 'Everyday runners, in stock',
    subtitle: 'HOKA Hopara & ASICS Gel-Kayano comfort',
    image: '/images/product-5.jpg',
  },
  {
    id: 3,
    date: 'JUST IN',
    title: 'Distance icons restocked',
    subtitle: 'ASICS Nimbus comfort rotation ready',
    image: '/images/product-4.jpg',
  },
]

export const faqs = [
  [
    'Are all pairs 100% genuine?',
    'Yes, absolutely. We pride ourselves on sourcing verified authentic sneakers and lifestyle apparel. Every pair can be inspected in person at our Malviya Nagar store before purchase.',
  ],
  [
    'Can I try shoes on before buying?',
    'Yes! Walk into our Malviya Nagar basement showroom anytime during open hours. You can try on any pair from our shoe wall to ensure the perfect fit and comfort.',
  ],
  [
    'How do I order if I am outside Jaipur?',
    'Simply choose your favorite pair, select your UK size, and click "Add to Bag" to checkout online. We dispatch orders within 24 hours with live insured courier tracking across India.',
  ],
  [
    'What is your wholesale minimum order quantity?',
    'Our wholesale desk caters to bulk retailers and boutique resellers with flexible tier-based quantities. Call our B2B desk directly to review our wholesale price sheets and batch availability.',
  ],
  [
    'What payment modes do you accept?',
    'We support all major payment modes including UPI (GPay, PhonePe, Paytm), Credit/Debit cards, Net Banking, and Cash on Delivery.',
  ],
  [
    'What is your exchange policy?',
    'Unworn pairs with original tags intact can be exchanged for another size or style within 7 days of delivery. Reach out to our customer support team for an instant exchange pickup.',
  ],
]

// 6 customer reviews
export const reviews = [
  {
    id: 1,
    quote: 'I bought 12 pairs and the team was super helpful throughout.',
    author: 'Shubham T.',
    role: 'Bulk Buyer',
    verified: true,
  },
  {
    id: 2,
    quote: 'Great service, very friendly and easy to deal with.',
    author: 'Shubham S.',
    role: 'Store Visitor',
    verified: true,
  },
  {
    id: 3,
    quote: 'The team suggested options, shared live pictures and followed up until the order was done.',
    author: 'Online customer',
    role: 'Online Order',
    verified: true,
  },
  {
    id: 4,
    quote: 'Staff is very friendly and the collection is fresh.',
    author: 'Nadeem C.',
    role: 'Sneakerhead',
    verified: true,
  },
  {
    id: 5,
    quote: 'Best store for shoes at great deal prices.',
    author: 'Tanishkka S.',
    role: 'Retail Shopper',
    verified: true,
  },
  {
    id: 6,
    quote: 'Excellent ambience and service. Must visit for footwear in Jaipur.',
    author: 'Hg8711',
    role: 'Local Guide',
    verified: true,
  },
]

// Static editorial quotes for the Voices section
export const quotes = [
  {
    quote: 'Real pairs, honest deals, and a vibe that feels like home.',
    name: 'Shubham T.',
  },
  {
    quote: 'Staff is very friendly and the collection is fresh.',
    name: 'Nadeem C.',
  },
  {
    quote: 'Excellent ambience and service. Must visit for footwear in Jaipur.',
    name: 'Hg8711',
  },
]
