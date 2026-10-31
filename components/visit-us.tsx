'use client'

import React from 'react'
import { Compass, MapPin, Phone } from 'lucide-react'
import { store } from '@/src/data/originals'
import { ActionButton } from './action-button'
import { ScrollReveal } from './scroll-reveal'

export function VisitUs() {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Originals By Shivaam C-350 Basement Pradhan Marg Block C Malviya Nagar Jaipur 302017'
  )}`

  // Interactive embedded map location
  const mapEmbedUrl =
    'https://maps.google.com/maps?q=C-350+Basement+Pradhan+Marg+Block+C+Malviya+Nagar+Jaipur+302017&t=&z=15&ie=UTF8&iwloc=&output=embed'

  return (
    <section id="visit" className="py-20 md:py-28 bg-[#F4EFE6] border-t border-[#E7E1D6]">
      <div className="mx-auto max-w-[1780px] px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Column: Details & Contacts */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-6">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#D9480F] uppercase mb-2">
                FLAGSHIP STORE
              </p>

              <h2 className="text-[38px] sm:text-[52px] md:text-[66px] font-extrabold tracking-[-0.06em] font-[family-name:var(--font-display)] text-[#14110F] leading-[0.93]">
                Your next pair<br />
                is in <em className="font-normal text-[#F15A22]">Jaipur.</em>
              </h2>

              <div className="mt-8 flex items-start gap-3">
                <MapPin size={22} className="text-[#D9480F] shrink-0 mt-1" />
                <div>
                  <strong className="text-sm font-bold uppercase tracking-wider text-[#14110F]">
                    Showroom Location
                  </strong>
                  <address className="not-italic text-base sm:text-lg text-[#14110F]/85 leading-relaxed mt-1 max-w-md">
                    {store.address}
                  </address>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 pl-8 border-l-2 border-[#E7E1D6]">
                <a
                  href={`tel:${store.phone.retail}`}
                  className="inline-flex items-center gap-2 text-base font-bold text-[#14110F] hover:text-[#D9480F] transition-colors cursor-pointer"
                >
                  <Phone size={17} className="text-[#D9480F]" />
                  <span>Call Store: {store.phone.retail}</span>
                </a>
                <span className="text-xs text-[#81796F]">
                  Open 7 days (11:00 AM – 9:30 PM) · Walk-ins welcome for trials
                </span>
              </div>

              {/* Action Buttons Row - Equal Width 1 Row on Mobile */}
              <div className="mt-8 grid grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-3.5">
                <ActionButton
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  magnetic={true}
                  containerClassName="w-full sm:w-auto"
                  className="w-full px-2.5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-center justify-center shadow-sm"
                >
                  <Compass size={16} className="shrink-0" />
                  <span className="truncate sm:overflow-visible">
                    <span className="sm:hidden">Directions</span>
                    <span className="hidden sm:inline">Get Directions on Google Maps</span>
                  </span>
                </ActionButton>
                <ActionButton
                  href={`tel:${store.phone.retail}`}
                  variant="secondary"
                  magnetic={true}
                  containerClassName="w-full sm:w-auto"
                  className="w-full px-2.5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-center justify-center"
                >
                  <Phone size={15} className="shrink-0" />
                  <span className="truncate sm:overflow-visible">Call Showroom</span>
                </ActionButton>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Embedded Interactive Google Map */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-6">
            <div className="relative h-[340px] sm:h-[400px] w-full rounded-[24px] overflow-hidden border border-[#E7E1D6] shadow-xl bg-[#EDE8DF]">
              <iframe
                src={mapEmbedUrl}
                title="Originals By Shivaam Map Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              {/* Corner badge indicating Jaipur flagship */}
              <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-[#14110F] border border-[#E7E1D6] shadow-xs flex items-center gap-1.5 pointer-events-none">
                <MapPin size={13} className="text-[#D9480F]" />
                <span>Malviya Nagar, Jaipur</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
