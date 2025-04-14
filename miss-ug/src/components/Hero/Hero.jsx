import React from 'react'
import './Hero.css'
import { motion } from "framer-motion";
import black_arrow from '../..//assets/black_arrow.png'

const Hero = () => {
  return (
    <div className='hero'>
      <motion.div
        className='hero-bg'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        >
            <div className='hero-text'>
                <h1>Welcome to Miss University of Ghana</h1>
                <p>Celebrating Beauty, Intelligence & Culture</p>
                <p>Audition Date: 20th June 2025</p>
                <p>Venue: University of Ghana</p>
                <button className='btn'>Register now <img src={black_arrow} alt=''/></button>
            </div>
        </motion.div>
        </div>
  )
}

export default Hero