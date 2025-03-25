import { useRef, useState } from "react"
// import Swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

 import './BannerCard.css';

// import required modules
import { EffectCards } from 'swiper/modules'
const BannerCard = () => {
  return (
    <div className="banner">
        <Swiper 
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        >
            <SwiperSlide><img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1689843639l/123211531._SY475_.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1738170651l/199347538._SY475_.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1705935887l/201751300._SY475_.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1695915526l/125045190._SY475_.jpg" alt="" /></SwiperSlide>
        </Swiper>
    </div>
  )
}

export default BannerCard

