import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';
import fimg1 from '../image/fimg1.jpg';
import fimg2 from '../image/fimg2copy.JPG';
import fimg3 from '../image/fimg3.jpg';
import fimg4 from '../image/fimg4.jpg';
import photomusic from '../audio/photomusic.mp3';
const Carousel = () => {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailBorderRef = useRef(null);
  const runTimeOutRef = useRef(null);
  const runNextAutoRef = useRef(null);
  const audioRef = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 3000;

  useEffect(() => {
    // Add animation on component mount
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, 300 * index);
    });

    // Auto-play background music
    const playMusic = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.6; // Set volume to 60%
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Autoplay prevented by browser:', error);
        // Autoplay was prevented, user will need to interact first
      }
    };

    // Small delay to ensure component is mounted
    setTimeout(playMusic, 500);
  }, []);

  const timelineData = [
    {
      year: "8 AM",
      title: "Entry of the loving duo",
      position: "left"
    },
    {
      year: "9 AM",
      title: "Pool Party & Breakfast",
      position: "right"
    },
    {
      year: "11:30AM",
      title: "Chak Bhaat & Mayra",
      position: "left"
    },
    {
      year: "1 PM",
      title: "Lunch",
      position: "right"
    },
    {
      year: "4 PM",
      title: "Baraat",
      position: "left"
    },
    {
      year: "5 PM",
      title: "Saat Phere",
      position: "right"
    },
    {
      year: "8 PM",
      title: "Reception",
      position: "left"
    }
  ];

  // Sample data - replace with your actual images
  const slides = [
    {
      img: fimg1,
      topic: "Eternal",
      description: "Two hearts, one soul — bound in an eternal dance of love.",
      thumbnailTitle: "Name Slider",
      thumbnailDescription: "Description"
    },
    {
      img: fimg2,
      topic: "Promise",
      description: "More than a vow, it's a promise — To choose you, every day, in every way.",
      thumbnailTitle: "Name Slider",
      thumbnailDescription: "Description"
    },
    {
      img: fimg3,
      topic: "Destiny",
      description: "We crossed paths by chance, but loved by destiny.",
      thumbnailTitle: "Name Slider",
      thumbnailDescription: "Description"
    },
    {
      img: fimg4,
      topic: "Bliss",
      description: "We didn't just find love — we found bliss in each other.",
      thumbnailTitle: "Name Slider",
      thumbnailDescription: "Description"
    }
  ];

  useEffect(() => {
    // Initialize thumbnail order
    if (thumbnailBorderRef.current) {
      const thumbnailItems = thumbnailBorderRef.current.querySelectorAll('.item');
      if (thumbnailItems[0]) {
        thumbnailBorderRef.current.appendChild(thumbnailItems[0]);
      }
    }

    // Set auto next
    runNextAutoRef.current = setTimeout(() => {
      handleNext();
    }, timeAutoNext);

    return () => {
      if (runTimeOutRef.current) {
        clearTimeout(runTimeOutRef.current);
      }
      if (runNextAutoRef.current) {
        clearTimeout(runNextAutoRef.current);
      }
    };
  }, []);

  const showSlider = (type) => {
    const sliderItems = sliderRef.current?.querySelectorAll('.carousel .list .item');
    const thumbnailItems = thumbnailBorderRef.current?.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
      if (sliderItems && sliderItems[0]) {
        sliderRef.current.appendChild(sliderItems[0]);
      }
      if (thumbnailItems && thumbnailItems[0]) {
        thumbnailBorderRef.current.appendChild(thumbnailItems[0]);
      }
      carouselRef.current?.classList.add('next');
    } else {
      if (sliderItems && sliderItems.length > 0) {
        sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      }
      if (thumbnailItems && thumbnailItems.length > 0) {
        thumbnailBorderRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      }
      carouselRef.current?.classList.add('prev');
    }

    if (runTimeOutRef.current) {
      clearTimeout(runTimeOutRef.current);
    }
    runTimeOutRef.current = setTimeout(() => {
      carouselRef.current?.classList.remove('next');
      carouselRef.current?.classList.remove('prev');
    }, timeRunning);

    if (runNextAutoRef.current) {
      clearTimeout(runNextAutoRef.current);
    }
    runNextAutoRef.current = setTimeout(() => {
      handleNext();
    }, timeAutoNext);
  };

  const handleNext = () => {
    showSlider('next');
  };

  const handlePrev = () => {
    showSlider('prev');
  };

  return (
    <div>
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
      >
        {/* Replace with your actual music file path */}
        <source src={photomusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="carousel" ref={carouselRef}>
        <div className="list" ref={sliderRef}>
          {slides.map((slide, index) => (
            <div className="item" key={index}>
              <img src={slide.img} alt={`Slide ${index + 1}`} />

              <div className="content">
                <div className="title">{slide.title}</div>
                <div className="topic">{slide.topic}</div>
                <div className="des des">{slide.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button id="prev"> <i className="ri-arrow-down-line"></i> </button>
        </div>
        <div className="thumbnail" ref={thumbnailBorderRef}>
          {slides.map((slide, index) => (
            <div className="item" key={index}>
              <img src={slide.img} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="time"></div>
      </div>
      <div className="timeline-container">
        <div className="timeline-header">
          <div className='Venue'> <i className="ri-map-pin-line"></i> <span className='venue-span'>LA Fountain Resorts, Chandrapur</span>
            <a
              href="https://www.google.com/maps/place/La+Fountain+Resorts/@21.6989375,83.2135625,17z/data=!3m1!4b1!4m9!3m8!1s0x3a26e033ffffffff:0xc097854300a2265f!5m2!4m1!1i2!8m2!3d21.6989375!4d83.2135625!16s%2Fg%2F11lf6mv_dc?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="maps-button"
            >
              View on Google Maps
            </a>
          </div>
          <h1 className="timeline-title">02 June 2025</h1>
          <h2 className="timeline-subtitle">Sequence of Events</h2>
        </div>

        <div className="timeline">
          <div className="timeline-line"></div>

          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`timeline-item ${item.position}`}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <div className="timeline-label">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='main-copy'>
        <div className="designby">
          Site Created by Siddharth Raj Agrawal
        </div>
      </div>
    </div>
  );
};

export default Carousel;
