'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/hero1.png',
    tag: 'Urban Living',
    title: 'Find Your Dream Home in Colombo',
    subtitle: 'Premium apartments in the heart of Sri Lanka\'s vibrant capital city',
    cta: 'Explore Apartments',
    href: '/listings?category=Apartment',
  },
  {
    id: 2,
    image: '/images/hero2.png',
    tag: 'Luxury Escapes',
    title: 'Exclusive Villas Across the Island',
    subtitle: 'Oceanfront estates, hilltop retreats and heritage properties in paradise',
    cta: 'View Villas',
    href: '/listings?category=Villa',
  },
  {
    id: 3,
    image: '/images/hero3.png',
    tag: 'Business Ready',
    title: 'World-Class Executive Spaces',
    subtitle: 'Premium offices designed for Sri Lanka\'s growing professional community',
    cta: 'Browse Offices',
    href: '/listings?category=Office',
  },
];

export default function HeroCarousel() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swiperInstance: unknown = null;

    const initSwiper = async () => {
      const { Swiper }          = await import('swiper');
      const { Pagination, Autoplay, EffectFade } = await import('swiper/modules');

      swiperInstance = new Swiper(swiperRef.current as HTMLElement, {
        modules: [Pagination, Autoplay, EffectFade],
        effect: 'fade',
        loop: true,
        speed: 800,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
      });
    };

    initSwiper();

    return () => {
      if (swiperInstance && typeof (swiperInstance as { destroy?: () => void }).destroy === 'function') {
        (swiperInstance as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return (
    <div className="relative">
      <div ref={swiperRef} className="swiper" style={{ height: 'min(90vh, 780px)' }}>
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <div key={slide.id} className="swiper-slide relative overflow-hidden">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />
              {/* Overlays */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(5,13,36,0.85) 0%,rgba(5,13,36,0.5) 60%,rgba(5,13,36,0.2) 100%)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,rgba(5,13,36,0.9) 0%,transparent 40%)' }} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto left-0 right-0">
                <div className="max-w-2xl">
                  {/* Tag pill */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-outfit font-semibold tracking-wider uppercase"
                    style={{ background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)', color: '#F5A623' }}>
                    <i className="uil uil-star" />
                    {slide.tag}
                  </div>

                  <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-white/70 text-lg font-inter mb-8 leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link href={slide.href} className="btn-gold text-sm">
                      <i className="uil uil-arrow-right text-base" />
                      {slide.cta}
                    </Link>
                    <Link href="/listings" className="btn-outline text-sm">
                      <i className="uil uil-th-large text-base" />
                      All Properties
                    </Link>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-8 mt-12">
                    {[
                      { num: '200+', label: 'Verified Listings' },
                      { num: '6',    label: 'Districts Covered' },
                      { num: '98%',  label: 'Happy Tenants' },
                    ].map(({ num, label }) => (
                      <div key={label}>
                        <div className="font-outfit font-extrabold text-2xl text-gold-500">{num}</div>
                        <div className="text-white/50 text-xs font-inter mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination" style={{ bottom: '28px' }} />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs font-inter text-white tracking-widest" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
        <div className="w-px h-12 bg-white/30" style={{ animation: 'scaleY 1.5s ease-in-out infinite' }} />
      </div>
    </div>
  );
}
