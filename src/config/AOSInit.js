// components/AOSInit.js
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration
      easing: 'ease-out-quart', // Easing type
      once: false, // Whether animation should happen only once
      mirror: true, // Whether elements should animate out while scrolling past them
      offset: 0, // Offset (in px) from the original trigger point
    });
  }, []);

  return null;
}