import React, { useRef, useState } from "react";
import { Carousel } from "antd";
import "./Banner.scss";

export default function Banner() {
  const slider = useRef();
  const [banners, setBanners] = useState([
    {
      id: 1,
      url: "../image/banner/banner1.jpg",
      title: "Boutique florist | Weddings & events"
    },
    {
      id: 2,
      url: "../image/banner/banner2.jpg",
      title : "For Your Loved Ones"
    },
    {
      id: 3,
      url: "../image/banner/banner4.jpg",
      title : "Celebrate birthdays and special occasions when you buy premium luxury flowers"
    },
  ]);

  return (
    <>
      <Carousel
        ref={slider}
        autoplay
        autoplaySpeed={1000}
        effect={"fade"}
        dots={true}
        dotPosition={"bottom"}
        waitForAnimate={"true"}
      >
        {banners.map((banner, index) => (
          <div className="items" key={banner.id + index}>
            <img style={{width:"100%",height: "550px"}} className="items-img" src={banner.url} />
            <div className="title">{banner.title}</div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
