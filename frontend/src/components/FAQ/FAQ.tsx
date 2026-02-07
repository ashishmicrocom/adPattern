"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import "./FAQ.css";

const items = [
  {
    id: "01",
    title: "What is AdPatterns?",
    content: (
      <div className="faq-content-grid" key="01">
        <div className="faq-main-text">
          <p>
            AdPatterns is an AI-powered advertising platform designed to help business owners create effective ad campaigns without the complexity. We combine cutting-edge artificial intelligence with intuitive design to generate compelling ad copy, visuals, and targeting strategies tailored to your product and audience. Whether you're launching your first campaign or scaling your marketing efforts, AdPatterns simplifies the process while giving you full creative control over every decision.
          </p>
        </div>
        <div className="faq-services">
          <h4>RELATED SERVICES</h4>
          <p>
            AI Ad Generation, Campaign Strategy, Ad Copy Writing, Visual Design, Audience Targeting, Platform Integration, Performance Analytics, A/B Testing, Budget Optimization, Campaign Management
          </p>
        </div>
        <div className="faq-cta-wrapper">
          <Button className="faq-cta-button">
            Get Started → contact@adpatterns.com
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "02",
    title: "How does AI ad generation work?",
    content: (
      <div className="faq-content-grid" key="02">
        <div className="faq-main-text">
          <p>
            Our AI analyzes your product details, target audience, and business goals to generate customized ad campaigns. Using advanced natural language processing and design algorithms, we create multiple variations of ad copy, headlines, and visual concepts. The AI learns from millions of successful campaigns to suggest proven strategies, but you maintain complete control—every suggestion is clearly labeled, and nothing goes live without your approval. The result is professional-quality ads created in minutes instead of hours.
          </p>
        </div>
        <div className="faq-services">
          <h4>RELATED SERVICES</h4>
          <p>
            Natural Language Processing, Machine Learning Models, Ad Copy Generation, Visual Asset Creation, Competitor Analysis, Trend Detection, Performance Prediction, Creative Variations, Smart Suggestions, Campaign Optimization
          </p>
        </div>
        <div className="faq-cta-wrapper">
          <Button className="faq-cta-button">
            Get Started → contact@adpatterns.com
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "03",
    title: "Which advertising platforms do you support?",
    content: (
      <div className="faq-content-grid" key="03">
        <div className="faq-main-text">
          <p>
            Currently, we support Meta Ads (Facebook and Instagram) with full campaign creation and management capabilities. We're actively developing integrations for Google Ads, TikTok Ads, and LinkedIn Ads, which will be available soon. Our platform is designed to work seamlessly across multiple channels, allowing you to manage all your advertising from one unified dashboard. Each integration maintains the platform's best practices while leveraging our AI to optimize your campaigns for maximum performance.
          </p>
        </div>
        <div className="faq-services">
          <h4>RELATED SERVICES</h4>
          <p>
            Meta Ads Integration, Facebook Advertising, Instagram Ads, Google Ads (Coming Soon), TikTok Ads (Coming Soon), LinkedIn Ads (Coming Soon), Multi-Platform Management, Cross-Channel Analytics, Platform Optimization, API Integrations
          </p>
        </div>
        <div className="faq-cta-wrapper">
          <Button className="faq-cta-button">
            Get Started → contact@adpatterns.com
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "04",
    title: "Do I need advertising experience?",
    content: (
      <div className="faq-content-grid" key="04">
        <div className="faq-main-text">
          <p>
            Absolutely not! AdPatterns is built specifically for business owners and entrepreneurs who want professional results without the steep learning curve. Our AI guides you through every step, explaining advertising concepts in plain language and making intelligent recommendations based on your goals. We handle the technical complexity while you focus on what matters—your business. Even if you've never run an ad before, you can create campaigns that compete with those from experienced marketers within minutes.
          </p>
        </div>
        <div className="faq-services">
          <h4>RELATED SERVICES</h4>
          <p>
            Beginner-Friendly Interface, Guided Workflow, Educational Resources, Best Practices, Smart Recommendations, Template Library, Industry Examples, Step-by-Step Tutorials, Expert Tips, Marketing Guidance
          </p>
        </div>
        <div className="faq-cta-wrapper">
          <Button className="faq-cta-button">
            Get Started → contact@adpatterns.com
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "05",
    title: "How much control do I have over my campaigns?",
    content: (
      <div className="faq-content-grid" key="05">
        <div className="faq-main-text">
          <p>
            You have complete control. Every AI suggestion is clearly labeled, and you can edit, customize, or override any recommendation. We believe AI should assist, not replace, your creative vision. Before any campaign goes live, you review and approve every element—from ad copy to targeting to budget. You can fine-tune messaging, adjust images, modify audience parameters, and set spending limits. AdPatterns accelerates your workflow while ensuring your brand voice and strategy remain authentically yours.
          </p>
        </div>
        <div className="faq-services">
          <h4>RELATED SERVICES</h4>
          <p>
            Full Creative Control, Manual Editing, Custom Targeting, Budget Management, Approval Workflow, Brand Voice Control, Image Customization, Audience Refinement, Campaign Scheduling, Real-Time Adjustments
          </p>
        </div>
        <div className="faq-cta-wrapper">
          <Button className="faq-cta-button">
            Get Started → contact@adpatterns.com
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "06",
    title: "What makes AdPatterns different?",
    content: (
      <div className="faq-content-grid" key="06">
        <div className="faq-main-text">
          <p>
            Unlike generic AI tools or complex agency dashboards, AdPatterns combines simplicity with power. We're transparent about what's AI-generated, we never auto-publish without approval, and we prioritize your data privacy. Our interface is designed for business owners, not marketing specialists. We focus on results that matter—conversions, not vanity metrics. Plus, we provide educational context for every decision, so you learn while you create. It's professional advertising made accessible, without sacrificing control or quality.
          </p>
        </div>
        <div className="faq-services">
          <h4>RELATED SERVICES</h4>
          <p>
            Transparent AI, Privacy-First Approach, User-Centric Design, Educational Platform, Results-Focused Analytics, No Auto-Publishing, Data Security, Conversion Optimization, Business Intelligence, Customer Success Support
          </p>
        </div>
        <div className="faq-cta-wrapper">
          <Button className="faq-cta-button">
            Get Started → contact@adpatterns.com
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "07",
    title: "How much does it cost?",
    content: (
      <div className="faq-content-grid" key="07">
        <div className="faq-main-text">
          <p>
            We offer flexible pricing designed for businesses of all sizes. Start with our free trial to create your first campaign and see results before committing. Our subscription plans include unlimited AI-generated campaigns, full platform access, and priority support. You only pay for the ad spend you choose to allocate on platforms like Facebook or Google—we never take a percentage of your budget. Transparent pricing means no hidden fees, no surprises, just straightforward value that scales with your business needs.
          </p>
        </div>
        <div className="faq-services">
          <h4>RELATED SERVICES</h4>
          <p>
            Free Trial, Flexible Pricing, No Hidden Fees, Subscription Plans, Unlimited Campaigns, Priority Support, Budget Control, Transparent Costs, Scalable Solutions, Value-Based Pricing
          </p>
        </div>
        <div className="faq-cta-wrapper">
          <Button className="faq-cta-button">
            Get Started → contact@adpatterns.com
          </Button>
        </div>
      </div>
    ),
  },
  {
    id: "08",
    title: "How do I get started?",
    content: (
      <div className="faq-content-grid" key="08">
        <div className="faq-main-text">
          <p>
            Getting started is simple. Sign up for a free account, tell us about your product or service, and our AI will generate your first campaign in minutes. Connect your Meta Ads account (or any supported platform), review the AI suggestions, make any customizations you want, and launch when ready. Our onboarding process guides you through each step with helpful tips and examples. Need help? Our support team is available via email at contact@adpatterns.com or through live chat. Start creating your first campaign today and see results within days.
          </p>
        </div>
        <div className="faq-services">
          <h4>RELATED SERVICES</h4>
          <p>
            Quick Onboarding, Account Setup, Platform Connection, Campaign Creation, Guided Setup, Live Support, Email Support, Tutorial Videos, Knowledge Base, Customer Success Team
          </p>
        </div>
        <div className="faq-cta-wrapper">
          <Button className="faq-cta-button">
            Get Started → contact@adpatterns.com
          </Button>
        </div>
      </div>
    ),
  },
];

export function FAQ() {
  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about creating effective ad campaigns with AdPatterns
          </p>
        </div>
        
        <div className="faq-accordion-wrapper">
          <Accordion type="single" defaultValue="04" collapsible className="faq-accordion">
            {items.map((item) => (
              <AccordionItem value={item.id} key={item.id} className="faq-accordion-item">
                <AccordionTrigger className="faq-accordion-trigger">
                  <div className="faq-trigger-content">
                    <div className="faq-icon-wrapper">
                      <Plus
                        className={cn(
                          "faq-icon faq-plus-icon",
                          "transition-all duration-500"
                        )}
                      />
                      <Minus
                        className={cn(
                          "faq-icon faq-minus-icon",
                          "transition-all duration-500"
                        )}
                      />
                    </div>
                    <h3 className="faq-question">{item.title}</h3>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="faq-accordion-content">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
