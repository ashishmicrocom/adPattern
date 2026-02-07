"use client";

import { useMotionValue, motion, useSpring, useTransform, AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import "./interactive-hover-links.css";

interface InteractiveHoverLinksProps {
  links?: LinkItem[];
}

interface LinkItem {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
  details?: {
    description: string;
    features: string[];
    additionalImages?: string[];
  };
}

export function InteractiveHoverLinks({ 
  links = INTERACTIVE_LINKS 
}: InteractiveHoverLinksProps) {
  const [selectedLink, setSelectedLink] = useState<LinkItem | null>(null);

  return (
    <>
      <section className="interactive-links-section">
        <div className="interactive-links-container">
          {links.map((link) => (
            <Link 
              key={link.heading} 
              {...link} 
              onDetailsClick={() => setSelectedLink(link)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedLink && (
          <DetailModal 
            link={selectedLink} 
            onClose={() => setSelectedLink(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
  onDetailsClick: () => void;
}

function Link({ heading, imgSrc, subheading, href, onDetailsClick }: LinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial="initial"
      whileHover="whileHover"
      className="interactive-link-item"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="interactive-link-heading"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="interactive-link-letter"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="interactive-link-subheading">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-10%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="interactive-link-image"
        alt={`Image representing ${heading}`}
      />
      
      <div className="interactive-link-arrow-wrapper">
        <motion.div
          variants={{
            initial: {
              x: "100%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{ type: "spring" }}
          className="interactive-link-arrow-inner"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDetailsClick();
          }}
        >
          <ArrowRight className="interactive-link-arrow-icon" />
        </motion.div>
      </div>
    </motion.a>
  );
}

// Detail Modal Component
interface DetailModalProps {
  link: LinkItem;
  onClose: () => void;
}

function DetailModal({ link, onClose }: DetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="detail-modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ 
          type: "spring",
          damping: 30,
          stiffness: 300
        }}
        className="detail-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="detail-modal-close" onClick={onClose}>
          <X />
        </button>

        <div className="detail-modal-header">
          <motion.div 
            className="detail-modal-image-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src={link.imgSrc} 
              alt={link.heading}
              className="detail-modal-image"
            />
          </motion.div>
          
          <div className="detail-modal-header-text">
            <motion.h2 
              className="detail-modal-title"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {link.heading}
            </motion.h2>
            <motion.p 
              className="detail-modal-subheading"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {link.subheading}
            </motion.p>
          </div>
        </div>

        <motion.div 
          className="detail-modal-body"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="detail-modal-section">
            <h3 className="detail-modal-section-title">Overview</h3>
            <p className="detail-modal-description">
              {link.details?.description || `Discover everything about ${link.heading}. Our comprehensive solution provides cutting-edge features and exceptional performance to meet all your needs.`}
            </p>
          </div>

          <div className="detail-modal-section">
            <h3 className="detail-modal-section-title">Key Features</h3>
            <ul className="detail-modal-features">
              {(link.details?.features || [
                "Advanced functionality and performance",
                "Seamless integration with existing systems",
                "24/7 dedicated support and assistance",
                "Regular updates and improvements"
              ]).map((feature, index) => (
                <motion.li 
                  key={index}
                  className="detail-modal-feature-item"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="detail-modal-feature-icon">✓</span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {link.details?.additionalImages && link.details.additionalImages.length > 0 && (
            <div className="detail-modal-section">
              <h3 className="detail-modal-section-title">Gallery</h3>
              <div className="detail-modal-gallery">
                {link.details.additionalImages.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`${link.heading} ${index + 1}`}
                    className="detail-modal-gallery-image"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  />
                ))}
              </div>
            </div>
          )}

          <motion.div 
            className="detail-modal-actions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <a href={link.href} className="detail-modal-btn detail-modal-btn-primary">
              Learn More
            </a>
            <button className="detail-modal-btn detail-modal-btn-secondary" onClick={onClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export const INTERACTIVE_LINKS: LinkItem[] = [
  {
    heading: "Services",
    subheading: "Discover what we offer",
    imgSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    href: "#",
    details: {
      description: "We provide comprehensive services tailored to your business needs. From digital transformation to strategic consulting, our expert team delivers exceptional results that drive growth and innovation.",
      features: [
        "Custom web and mobile application development",
        "Cloud infrastructure and DevOps solutions",
        "AI and machine learning integration",
        "24/7 technical support and maintenance"
      ],
      additionalImages: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80"
      ]
    }
  },
  {
    heading: "Team",
    subheading: "Meet the amazing people behind it",
    imgSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    href: "#",
    details: {
      description: "Our diverse team of experts brings together decades of experience in technology, design, and business strategy. We're passionate about creating innovative solutions that make a real difference.",
      features: [
        "Industry-leading professionals with proven track records",
        "Collaborative and agile work environment",
        "Continuous learning and skill development",
        "Global perspective with local expertise"
      ],
      additionalImages: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80"
      ]
    }
  },
  {
    heading: "Projects",
    subheading: "Explore our recent work",
    imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    href: "#",
    details: {
      description: "Browse through our portfolio of successful projects spanning multiple industries. Each project showcases our commitment to excellence, innovation, and delivering measurable business value.",
      features: [
        "Award-winning designs and implementations",
        "Proven ROI and business impact",
        "Scalable and future-proof solutions",
        "Cross-platform compatibility"
      ],
      additionalImages: [
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80"
      ]
    }
  },
  {
    heading: "Careers",
    subheading: "Join our growing team",
    imgSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    href: "#",
    details: {
      description: "Be part of something extraordinary. We're looking for talented individuals who are passionate about technology and want to make an impact. Join us in shaping the future of digital innovation.",
      features: [
        "Competitive compensation and benefits package",
        "Flexible work arrangements and remote options",
        "Career growth and advancement opportunities",
        "Inclusive and diverse workplace culture"
      ],
      additionalImages: [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
        "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=400&q=80"
      ]
    }
  },
  {
    heading: "Playground",
    subheading: "Fun experiments and side projects",
    imgSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    href: "#",
    details: {
      description: "Explore our experimental projects and innovative prototypes. This is where creativity meets technology, and where we test new ideas and push the boundaries of what's possible.",
      features: [
        "Cutting-edge technology demonstrations",
        "Interactive experiences and demos",
        "Open-source contributions and tools",
        "Innovation lab and R&D initiatives"
      ],
      additionalImages: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80",
        "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=400&q=80"
      ]
    }
  },
];

export default InteractiveHoverLinks;
