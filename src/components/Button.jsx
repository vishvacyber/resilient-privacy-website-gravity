import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const baseStyles = {
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '1rem',
    letterSpacing: '0.5px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  };

  const variants = {
    primary: {
      background: 'var(--primary)',
      color: '#000000',
      border: '1px solid var(--primary)',
      boxShadow: '0 0 10px var(--primary-dim)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '1px solid var(--primary)',
    },
    glow: {
      background: 'var(--bg-card)',
      color: 'var(--text-main)',
      border: '1px solid var(--border-color)',
      boxShadow: '0 0 15px rgba(0, 240, 255, 0.1)',
    }
  };

  // Merge styles but ensure color from variant is preserved
  const { style: inlineStyle, ...restProps } = props;
  const mergedStyles = {
    ...baseStyles,
    ...inlineStyle,
    ...variants[variant],
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px var(--primary-dim)' }}
      whileTap={{ scale: 0.98 }}
      style={mergedStyles}
      className={className}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </motion.button>
  );
};

export default Button;
