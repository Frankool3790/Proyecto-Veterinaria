import "./Button.css";
import { motion } from "framer-motion";

export default function Button({ children, onClick, type = "button", variant = "primary", className = "", style = {}, disabled = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      className={`btn-custom btn-${variant} ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
