import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { ShopByCategory } from '@/components/shop-by-category'
import { BrandStrip } from '@/components/brand-strip'
import { RetailWholesaleSplit } from '@/components/retail-wholesale-split'
import { ShoeWall } from '@/components/shoe-wall'
import { SizeGuide } from '@/components/size-guide'
import { NewIn } from '@/components/new-in'
import { InsideStore } from '@/components/inside-store'
import { Wholesale } from '@/components/wholesale'
import { OurStory } from '@/components/our-story'
import { CustomerReviews } from '@/components/customer-reviews'
import { VisitUs } from '@/components/visit-us'
import { FAQ } from '@/components/faq'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { MotionProvider } from '@/components/motion-provider'
import { CartDrawer } from '@/components/cart-drawer'

export default function Page() {
  return (
    <MotionProvider>
      <SmoothScroll />
      <div id="top" className="min-h-screen bg-[#FAF8F4] text-[#14110F] overflow-x-hidden">
        <Nav />
        <CartDrawer />
          <main id="main-content" className="overflow-x-hidden">
            {/* Hero */}
            <Hero />

            {/* Shop by category (after the hero) */}
            <ShopByCategory />

            {/* Brand strip */}
            <BrandStrip />

            {/* Retail or wholesale split */}
            <RetailWholesaleSplit />

            {/* Shoe wall */}
            <ShoeWall />

            {/* Size guide */}
            <SizeGuide />

            {/* New in */}
            <NewIn />

            {/* Inside the store */}
            <InsideStore />

            {/* Wholesale */}
            <Wholesale />

            {/* Our story */}
            <OurStory />

            {/* What customers say (after the story) */}
            <CustomerReviews />

            {/* Visit us */}
            <VisitUs />

            {/* FAQ */}
            <FAQ />

            {/* Final CTA */}
            <FinalCTA />
          </main>
          <Footer />
        </div>
      </MotionProvider>
    )
}
