import { Component, OnInit, AfterViewInit, DestroyRef, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { 
  LucideAngularModule, ArrowLeft, ExternalLink, Github, CheckCircle, 
  ShieldAlert, ShieldCheck, Store, User, ArrowDown, ArrowRight, Settings, Database, Server,
  ShoppingCart, CreditCard, Receipt, FileText, Search, Package, Zap, CornerDownRight, ListChecks,
  Bot, Scan, Network, Lock, Compass, LayoutDashboard, BrainCircuit, Globe, Building2, Fingerprint, FileSearch, Shield, Milestone,
  Scissors, QrCode, ClipboardCheck, History, Clock, UserCheck
} from 'lucide-angular';
import { PORTFOLIO_DATA } from '../../core/constants/portfolio-data';
import { Project } from '../../core/models/portfolio.models';
import { SeoService } from '../../core/services/seo.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="page-wrapper" *ngIf="project()">
      <div class="container">
        <a routerLink="/" class="back-btn">
          <lucide-icon name="arrow-left" [size]="20"></lucide-icon>
          Back to Portfolio
        </a>

        <div class="project-header">
          <h1 class="project-title text-gradient">{{project()?.title}}</h1>
          <p class="project-desc">{{project()?.shortDescription}}</p>
          
          <div class="tags">
            <span class="p-tag" *ngFor="let tag of project()?.tags">{{tag}}</span>
          </div>

          <div class="action-links">
            <a *ngIf="project()?.liveUrl && project()?.liveUrl !== '#'" [href]="project()?.liveUrl" target="_blank" class="btn-primary">
              <lucide-icon name="external-link" [size]="18"></lucide-icon> Live Project
            </a>
          </div>
        </div>

        <div class="hero-image glass">
          <img [src]="project()?.image" [alt]="project()?.title" (error)="onImageError($event)">
        </div>

        <div class="project-content" #projectContent>
          
          <!-- CUSTOM ORDERAPP VIEW -->
          <ng-container *ngIf="project()?.id === 'orderapp'">
            
            <!-- 1. Overview -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">1. OVERVIEW</span>
              </div>
              <h2 class="gradient-heading">Project Overview</h2>
              <p class="large-text">
                OrderApp is a garment-based product ordering and live event management web application. 
                The platform is designed for managing product-based garment events where vendors can upload and manage their products, 
                clients can browse and place orders, and administrators can manage the overall platform.
              </p>
            </section>

            <!-- 2. Application Flow -->
            <section class="content-section">
              <div class="section-label fade-up">
                <span class="line"></span>
                <span class="text">2. ARCHITECTURE</span>
              </div>
              <h2 class="gradient-heading fade-up">Complete Application Flow</h2>
              
              <div class="flow-container">
                <div class="flow-step">
                  <div class="flow-card glass-card">
                    <lucide-icon name="shield-alert" [size]="32" class="flow-icon super-admin"></lucide-icon>
                    <h3>Super Admin</h3>
                    <p>Creates and manages overall platform.</p>
                  </div>
                </div>
                
                <lucide-icon name="arrow-down" [size]="24" class="flow-arrow"></lucide-icon>
                
                <div class="flow-step">
                  <div class="flow-card glass-card">
                    <lucide-icon name="shield-check" [size]="32" class="flow-icon admin"></lucide-icon>
                    <h3>Admin</h3>
                    <p>Registers vendors and organizes access.</p>
                  </div>
                </div>
                
                <lucide-icon name="arrow-down" [size]="24" class="flow-arrow"></lucide-icon>
                
                <div class="flow-step">
                  <div class="flow-card glass-card">
                    <lucide-icon name="store" [size]="32" class="flow-icon vendor"></lucide-icon>
                    <h3>Vendor</h3>
                    <p>Uploads products and manages availability.</p>
                  </div>
                </div>
                
                <lucide-icon name="arrow-down" [size]="24" class="flow-arrow"></lucide-icon>
                
                <div class="flow-step">
                  <div class="flow-card glass-card">
                    <lucide-icon name="database" [size]="32" class="flow-icon event"></lucide-icon>
                    <h3>Garment Products / Live Event</h3>
                    <p>Products are displayed on the live platform.</p>
                  </div>
                </div>
                
                <lucide-icon name="arrow-down" [size]="24" class="flow-arrow"></lucide-icon>
                
                <div class="flow-step">
                  <div class="flow-card glass-card">
                    <lucide-icon name="user" [size]="32" class="flow-icon client"></lucide-icon>
                    <h3>Client</h3>
                    <p>Browses products, selects, and places orders.</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- 3. Role Based Access -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">3. SECURITY</span>
              </div>
              <h2 class="gradient-heading">Role-Based Access Control</h2>
              
              <blockquote class="custom-quote glass">
                "OrderApp implements a strict role-based access control system to ensure that users can only access the features and operations relevant to their responsibilities."
              </blockquote>
              
              <div class="roles-grid">
                <div class="role-item">
                  <lucide-icon name="shield-alert" [size]="24" class="role-icon super-admin"></lucide-icon>
                  <div>
                    <h4>Super Admin</h4>
                    <p>Manages Admins & Global Platform Config.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="shield-check" [size]="24" class="role-icon admin"></lucide-icon>
                  <div>
                    <h4>Admin</h4>
                    <p>Manages Vendors, Operations & Invoices.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="store" [size]="24" class="role-icon vendor"></lucide-icon>
                  <div>
                    <h4>Vendor</h4>
                    <p>Manages Garment Products & Order Info.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="user" [size]="24" class="role-icon client"></lucide-icon>
                  <div>
                    <h4>Client / User</h4>
                    <p>Browses Products & Places Orders.</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- 4. Key Features -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">4. FEATURES</span>
              </div>
              <h2 class="gradient-heading">Key Features</h2>
              <ul class="feature-list">
                <li *ngFor="let feature of project()?.features">
                  <lucide-icon name="check-circle" [size]="20" class="check-icon"></lucide-icon>
                  <span>{{feature}}</span>
                </li>
              </ul>
            </section>

            <!-- 5. Technology Stack -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">5. TECH STACK</span>
              </div>
              <h2 class="gradient-heading">Technology Stack</h2>
              
              <div class="tech-grid">
                <div class="tech-card glass">
                  <h4>Backend</h4>
                  <p>Java, Spring Boot, Spring Security, Hibernate, REST APIs</p>
                </div>
                <div class="tech-card glass">
                  <h4>Frontend</h4>
                  <p>Angular, TypeScript, HTML, CSS</p>
                </div>
                <div class="tech-card glass">
                  <h4>Database</h4>
                  <p>PostgreSQL</p>
                </div>
                <div class="tech-card glass">
                  <h4>Deployment</h4>
                  <p>Tomcat, Nginx, Git</p>
                </div>
              </div>
            </section>

          </ng-container>

          <!-- CUSTOM BLACKPOS VIEW -->
          <ng-container *ngIf="project()?.id === 'blackpos'">
            
            <!-- 1. Overview -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">1. OVERVIEW</span>
              </div>
              <h2 class="gradient-heading">Project Overview</h2>
              <p class="large-text">
                BlackPOS is a live Point of Sale and billing application designed for garment-based product events. 
                The system works alongside the OrderApp product platform.
              </p>
              <blockquote class="custom-quote glass">
                "BlackPOS bridges the gap between online product selection and physical event checkout by providing a fast live billing system for customers purchasing garment products."
              </blockquote>
            </section>

            <!-- 2. Problem and Solution -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">2. CHALLENGE & FIX</span>
              </div>
              <h2 class="gradient-heading">The Problem & Solution</h2>
              
              <div class="problem-solution-grid">
                <div class="ps-card problem glass-card">
                  <div class="ps-header">
                    <lucide-icon name="shield-alert" [size]="24" class="problem-icon"></lucide-icon>
                    <h3>The Problem</h3>
                  </div>
                  <p>
                    During live garment events, manually handling selected products, customer orders, and billing can become slow and difficult. 
                    Customers select products through the ordering platform and later purchase them at a live event. 
                    The billing team needs a fast way to identify the customer and retrieve their selected products.
                  </p>
                </div>
                
                <div class="ps-card solution glass-card">
                  <div class="ps-header">
                    <lucide-icon name="check-circle" [size]="24" class="solution-icon"></lucide-icon>
                    <h3>The Solution</h3>
                  </div>
                  <p>
                    BlackPOS provides a centralized live checkout process. It connects the customer's purchase journey with the billing process by allowing selected orders to be retrieved, loaded into the billing cart, verified, billed, and completed efficiently.
                  </p>
                </div>
              </div>
            </section>

            <!-- 3. How the Live Purchase Process Works -->
            <section class="content-section">
              <div class="section-label fade-up">
                <span class="line"></span>
                <span class="text">3. WORKFLOW</span>
              </div>
              <h2 class="gradient-heading fade-up">How the Live Purchase Process Works</h2>
              
              <div class="steps-container">
                <div class="step-card glass-card">
                  <div class="step-number">Step 1</div>
                  <h3>Products Available Through OrderApp</h3>
                  <p>Vendors upload and manage garment products within the OrderApp ecosystem. These products become available for customers to browse during the event.</p>
                  <div class="step-mini-flow">
                    <span>Vendor</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>Uploads Products</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Products Available</span>
                  </div>
                </div>

                <div class="step-card glass-card">
                  <div class="step-number">Step 2</div>
                  <h3>Customer Selects Products</h3>
                  <p>The customer views product details, selects items for purchase, and associates them with their purchase order in OrderApp.</p>
                  <div class="step-mini-flow">
                    <span>Customer</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>Select Products</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Purchase Order Created</span>
                  </div>
                </div>

                <div class="step-card glass-card">
                  <div class="step-number">Step 3</div>
                  <h3>Customer Reaches Live POS Counter</h3>
                  <p>When ready to purchase, the billing operator opens BlackPOS, searches for the customer's existing OrderApp purchase order, and reviews the items.</p>
                  <div class="step-mini-flow">
                    <span>Purchase Order</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>BlackPOS</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Billing Operator</span>
                  </div>
                </div>

                <div class="step-card glass-card">
                  <div class="step-number">Step 4</div>
                  <h3>Products Added to the Billing Cart</h3>
                  <p>The selected purchase order is loaded. The operator can add, remove, update quantities, and verify product information before billing.</p>
                  <div class="vertical-flow-mini">
                    <div class="v-node">OrderApp Order</div>
                    <lucide-icon name="arrow-down" [size]="16" class="v-arrow"></lucide-icon>
                    <div class="v-node">Load into BlackPOS</div>
                    <lucide-icon name="arrow-down" [size]="16" class="v-arrow"></lucide-icon>
                    <div class="v-node">Billing Cart</div>
                    <lucide-icon name="arrow-down" [size]="16" class="v-arrow"></lucide-icon>
                    <div class="v-node highlight">Verify Products & Quantity</div>
                  </div>
                </div>

                <div class="step-card glass-card">
                  <div class="step-number">Step 5</div>
                  <h3>Live Billing</h3>
                  <p>The POS system calculates the final billing amount. The operator applies pricing calculations, confirms the bill, and completes the transaction.</p>
                  <div class="step-mini-flow">
                    <span>Billing Cart</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>Calculate Total</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Complete Billing</span>
                  </div>
                </div>
                
                <div class="step-card glass-card">
                  <div class="step-number">Step 6</div>
                  <h3>Payment and Order Completion</h3>
                  <p>Payment information is recorded, the purchase is marked complete, and an invoice is generated for the customer.</p>
                  <div class="step-mini-flow">
                    <span>Payment</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>Invoice</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Order Completion</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- 4. End-to-End Flow -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">4. ECOSYSTEM</span>
              </div>
              <h2 class="gradient-heading">Complete End-to-End Flow</h2>
              
              <div class="timeline-flow glass-card">
                <div class="tl-row"><span class="tl-main">Vendor</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Uploads Products</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main accent">OrderApp</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Customer Browses & Selects Products</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main">Purchase Order Created</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Customer Arrives at Live POS Counter</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main accent">BlackPOS</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Order Loaded</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main">Billing Cart</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Review / Update Items</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main">Live Billing</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Payment Processing</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main">Invoice Generated</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main success">Purchase Completed</span></div>
              </div>
            </section>

            <!-- 5. User Journeys -->
            <section class="content-section">
              <div class="section-label fade-up">
                <span class="line"></span>
                <span class="text">5. JOURNEYS</span>
              </div>
              <h2 class="gradient-heading fade-up">User Journeys</h2>
              
              <div class="journey-box glass-card journey-anim">
                <h3><lucide-icon name="user" [size]="20"></lucide-icon> Customer Journey</h3>
                <p class="journey-path">
                  Browse Products <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Select Products <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Create Purchase Order <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Visit Live POS <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Order Retrieved <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Billing <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Payment <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Invoice
                </p>
                <p class="journey-note">The customer does not need to repeat the entire product selection process at the billing counter.</p>
              </div>

              <div class="journey-box glass-card journey-anim" style="margin-top: 1.5rem;">
                <h3><lucide-icon name="list-checks" [size]="20"></lucide-icon> Billing Operator Journey</h3>
                <p class="journey-path">
                  Login to POS <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Search Customer / Order <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Load Purchase Order <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Verify Items <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Update Cart <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Generate Bill <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Complete Payment <lucide-icon name="arrow-right" [size]="14"></lucide-icon> 
                  Invoice
                </p>
                <p class="journey-note">Designed to make live event billing faster and more organized.</p>
              </div>
            </section>

            <!-- 6. Key Features -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">6. FEATURES</span>
              </div>
              <h2 class="gradient-heading">Key Features</h2>
              
              <div class="roles-grid">
                <div class="role-item">
                  <lucide-icon name="zap" [size]="24" class="role-icon" style="color: #f59e0b;"></lucide-icon>
                  <div>
                    <h4>Order Integration</h4>
                    <p>Retrieve and process purchase orders created through OrderApp.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="credit-card" [size]="24" class="role-icon" style="color: #10b981;"></lucide-icon>
                  <div>
                    <h4>Live Billing</h4>
                    <p>Perform fast billing during live product events.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="shopping-cart" [size]="24" class="role-icon" style="color: #3b82f6;"></lucide-icon>
                  <div>
                    <h4>Smart Cart Management</h4>
                    <p>Add, remove, review, and manage products before purchase.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="search" [size]="24" class="role-icon" style="color: #8b5cf6;"></lucide-icon>
                  <div>
                    <h4>Customer & Order Search</h4>
                    <p>Quickly identify customers and retrieve their orders.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="package" [size]="24" class="role-icon" style="color: #ec4899;"></lucide-icon>
                  <div>
                    <h4>Product Management</h4>
                    <p>Manage product and quantity information during checkout.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="receipt" [size]="24" class="role-icon" style="color: #14b8a6;"></lucide-icon>
                  <div>
                    <h4>Invoice Generation</h4>
                    <p>Generate billing and purchase records after the transaction.</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- 7. Technology Stack -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">7. TECH STACK</span>
              </div>
              <h2 class="gradient-heading">Technology Stack</h2>
              
              <div class="tech-grid">
                <div class="tech-card glass">
                  <h4>Backend</h4>
                  <p>Java, Spring Boot, Hibernate / JPA, REST APIs</p>
                </div>
                <div class="tech-card glass">
                  <h4>Frontend</h4>
                  <p>Angular, TypeScript, HTML, CSS</p>
                </div>
                <div class="tech-card glass">
                  <h4>Database</h4>
                  <p>PostgreSQL</p>
                </div>
                <div class="tech-card glass">
                  <h4>Integration</h4>
                  <p>OrderApp APIs, Order Synchronization</p>
                </div>
              </div>
            </section>

          </ng-container>

          <!-- CUSTOM PAYSMART AI VIEW -->
          <ng-container *ngIf="project()?.id === 'ai-payment-advisor'">
            
            <!-- 1. Overview -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">1. OVERVIEW</span>
              </div>
              <h2 class="gradient-heading">Project Overview</h2>
              <p class="large-text">
                PaySmart AI is an intelligent platform designed to help businesses choose the most suitable payment gateway for their specific business requirements.
                Instead of requiring merchants to manually research multiple payment gateway providers, the platform uses AI to analyze the merchant's website and understand their business.
              </p>
              
              <div class="ai-overview-box glass-card" style="margin-top: 2rem;">
                <lucide-icon name="bot" [size]="40" class="ai-icon-large"></lucide-icon>
                <div class="ai-overview-content">
                  <h3>Website Analysis Engine</h3>
                  <p>The AI examines publicly available website information (business type, products, industry, e-commerce requirements, risks) to build a clear understanding of the merchant, leading to personalized gateway recommendations.</p>
                </div>
              </div>
            </section>

            <!-- 2. Problem and Solution -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">2. CHALLENGE & FIX</span>
              </div>
              <h2 class="gradient-heading">The Problem & Solution</h2>
              
              <div class="problem-solution-grid">
                <div class="ps-card problem glass-card">
                  <div class="ps-header">
                    <lucide-icon name="shield-alert" [size]="24" class="problem-icon"></lucide-icon>
                    <h3>The Problem</h3>
                  </div>
                  <p>
                    Choosing a suitable payment gateway can be complicated for merchants. Businesses must research multiple providers, compare requirements, understand eligibility, evaluate payment methods, and navigate different onboarding processes. A payment solution that works well for one business may not fit another. Manual research is time-consuming and confusing.
                  </p>
                </div>
                
                <div class="ps-card solution glass-card">
                  <div class="ps-header">
                    <lucide-icon name="bot" [size]="24" class="solution-icon"></lucide-icon>
                    <h3>The Solution</h3>
                  </div>
                  <p>
                    PaySmart AI simplifies the discovery and onboarding journey. Instead of starting with generic comparisons, the platform starts by understanding the merchant's business via their Website URL. The AI analyzes public information, creates context, and generates personalized recommendations, allowing the merchant to seamlessly continue through a structured onboarding journey.
                  </p>
                </div>
              </div>
            </section>

            <!-- 3. How PaySmart AI Works -->
            <section class="content-section">
              <div class="section-label fade-up">
                <span class="line"></span>
                <span class="text">3. MERCHANT JOURNEY</span>
              </div>
              <h2 class="gradient-heading fade-up">How PaySmart AI Works</h2>
              
              <div class="steps-container">
                <!-- Step 1 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 1</div>
                  <h3>Merchant Submits Website URL</h3>
                  <p>The journey begins when a merchant visits the platform and provides their business website URL.</p>
                  <div class="step-mini-flow">
                    <span>Merchant</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>Enter URL</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Start AI Analysis</span>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 2</div>
                  <h3>Website Scanning & Data Extraction</h3>
                  <p>The system analyzes publicly available information (content, products, about pages, policies) to build a better understanding of the merchant's business.</p>
                  <div class="step-mini-flow">
                    <span>Website URL</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>Scan</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Business Info</span>
                  </div>
                </div>

                <!-- Step 3 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 3</div>
                  <h3>AI Business Analysis</h3>
                  <p>The extracted information is processed by an AI/LLM layer. It identifies the business model, industry, payment needs, and creates a structured merchant profile.</p>
                  <div class="step-mini-flow">
                    <span>Website Data</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>LLM Analysis</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Merchant Profile</span>
                  </div>
                </div>

                <!-- Step 4 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 4</div>
                  <h3>Intelligent Recommendation</h3>
                  <p>The platform evaluates suitable payment options based on business compatibility, fees, onboarding requirements, and risk considerations.</p>
                  <div class="step-mini-flow">
                    <span>Merchant Profile</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span>AI Engine</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Recommendations</span>
                  </div>
                </div>

                <!-- Step 5 -->
                <div class="step-card glass-card" style="grid-column: 1 / -1;">
                  <div class="step-number">Step 5</div>
                  <h3>Gateway Comparison</h3>
                  <p>The merchant reviews suitable options. The platform clearly compares features, payment methods, and charges. The top recommendation displays a <strong>"Best Match"</strong> badge with a clear explanation of <em>why</em> it was recommended in understandable business language.</p>
                  <div class="recommendation-mockup glass">
                    <div class="rm-header">
                      <span class="rm-badge">★ Best Match</span>
                      <h4>Gateway X Pro</h4>
                    </div>
                    <p class="rm-reason"><strong>Why:</strong> Recommended because your website indicates a SaaS subscription model and international client base. This gateway offers the lowest cross-border MDR and built-in recurring billing.</p>
                  </div>
                </div>
                
                <!-- Step 6 & 7 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 6 & 7</div>
                  <h3>Selection & Document Submission</h3>
                  <p>The merchant selects a gateway and submits required business/compliance information (PAN, GST, Bank details) via a secure workflow.</p>
                  <div class="step-mini-flow">
                    <span>Select Gateway</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Submit Documents</span>
                  </div>
                </div>

                <!-- Step 8 & 9 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 8 & 9</div>
                  <h3>Verification & Onboarding</h3>
                  <p>Information enters a verification workflow. The merchant tracks application status, missing documents, and onboarding progress centrally.</p>
                  <div class="step-mini-flow">
                    <span>Verification</span> <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
                    <span class="highlight">Onboarding Ready</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- 4. End-to-End Flow -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">4. ECOSYSTEM</span>
              </div>
              <h2 class="gradient-heading">Complete End-to-End Flow</h2>
              
              <div class="timeline-flow glass-card" style="margin-top: 2rem;">
                <div class="tl-row"><span class="tl-main">Merchant</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Enters Website URL</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main accent">PaySmart AI</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Scans Public Website Information</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main">AI / LLM Analysis</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Understands Business</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main">Merchant Business Profile</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main accent">Recommendation Engine</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main">Personalized Recommendations</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-sub">Merchant Compares & Selects Options</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main">Document Submission & Verification</span></div>
                <div class="tl-arrow"><lucide-icon name="arrow-down" [size]="20"></lucide-icon></div>
                <div class="tl-row"><span class="tl-main success">Merchant Onboarding Platform</span></div>
              </div>
            </section>

            <!-- 5. AI Architecture -->
            <section class="content-section">
              <div class="section-label fade-up">
                <span class="line"></span>
                <span class="text">5. TECHNICAL</span>
              </div>
              <h2 class="gradient-heading fade-up">AI-Powered Recommendation Architecture</h2>
              <p class="fade-up" style="margin-bottom: 2rem;">
                The AI layer transforms unstructured website information into useful business context. The recommendation layer then combines this AI-driven understanding with structured business and payment gateway criteria.
              </p>
              
              <div class="architecture-diagram glass-card fade-up">
                <div class="arch-node">Website URL</div>
                <lucide-icon name="arrow-right" [size]="20" class="arch-arrow"></lucide-icon>
                <div class="arch-node">Web Analysis & Extraction</div>
                <lucide-icon name="arrow-right" [size]="20" class="arch-arrow"></lucide-icon>
                <div class="arch-node highlight-node"><lucide-icon name="brain-circuit" [size]="16"></lucide-icon> AI / LLM Business Understanding</div>
                <lucide-icon name="arrow-right" [size]="20" class="arch-arrow"></lucide-icon>
                <div class="arch-node">Merchant Profile Generation</div>
                <lucide-icon name="arrow-right" [size]="20" class="arch-arrow"></lucide-icon>
                <div class="arch-node highlight-node"><lucide-icon name="network" [size]="16"></lucide-icon> Knowledge & Eligibility Rules</div>
                <lucide-icon name="arrow-right" [size]="20" class="arch-arrow"></lucide-icon>
                <div class="arch-node">Recommendation Engine</div>
                <lucide-icon name="arrow-right" [size]="20" class="arch-arrow"></lucide-icon>
                <div class="arch-node success-node">Ranked Gateway Results</div>
              </div>
            </section>

            <!-- 6. Dashboard Concept -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">6. INTERFACE</span>
              </div>
              <h2 class="gradient-heading">Merchant Dashboard Experience</h2>
              
              <div class="dashboard-concept glass-card">
                <div class="dash-progress">
                  <div class="progress-step active"><div class="dot"></div><span>Analysis</span></div>
                  <div class="progress-line active"></div>
                  <div class="progress-step active"><div class="dot"></div><span>Recommendation</span></div>
                  <div class="progress-line"></div>
                  <div class="progress-step"><div class="dot"></div><span>Gateway Selected</span></div>
                  <div class="progress-line"></div>
                  <div class="progress-step"><div class="dot"></div><span>Docs Submitted</span></div>
                  <div class="progress-line"></div>
                  <div class="progress-step"><div class="dot"></div><span>Under Review</span></div>
                  <div class="progress-line"></div>
                  <div class="progress-step"><div class="dot"></div><span>Onboarding</span></div>
                </div>
                
                <div class="dash-modules">
                  <div class="d-mod"><lucide-icon name="globe" [size]="20"></lucide-icon> Website Analysis Result</div>
                  <div class="d-mod"><lucide-icon name="building-2" [size]="20"></lucide-icon> Business Profile</div>
                  <div class="d-mod highlight"><lucide-icon name="compass" [size]="20"></lucide-icon> Recommended Gateways</div>
                  <div class="d-mod highlight"><lucide-icon name="file-search" [size]="20"></lucide-icon> Recommendation Explanation</div>
                  <div class="d-mod"><lucide-icon name="check-circle" [size]="20"></lucide-icon> Selected Gateway</div>
                  <div class="d-mod"><lucide-icon name="file-text" [size]="20"></lucide-icon> Document Checklist</div>
                  <div class="d-mod"><lucide-icon name="shield-check" [size]="20"></lucide-icon> Verification Status</div>
                  <div class="d-mod"><lucide-icon name="milestone" [size]="20"></lucide-icon> Onboarding Progress</div>
                </div>
              </div>
            </section>

            <!-- 7. Key Features -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">7. FEATURES</span>
              </div>
              <h2 class="gradient-heading">Key Platform Features</h2>
              
              <div class="roles-grid">
                <div class="role-item">
                  <lucide-icon name="scan" [size]="24" class="role-icon" style="color: #3b82f6;"></lucide-icon>
                  <div>
                    <h4>AI Website Analysis</h4>
                    <p>Analyzes publicly available website content to understand the merchant's business.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="fingerprint" [size]="24" class="role-icon" style="color: #8b5cf6;"></lucide-icon>
                  <div>
                    <h4>Smart Profiling</h4>
                    <p>Transforms website information into a structured business profile.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="compass" [size]="24" class="role-icon" style="color: #10b981;"></lucide-icon>
                  <div>
                    <h4>Intelligent Recommendations</h4>
                    <p>Recommends suitable gateways based on business requirements and platform criteria.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="file-search" [size]="24" class="role-icon" style="color: #f59e0b;"></lucide-icon>
                  <div>
                    <h4>Explainable Recommendations</h4>
                    <p>Shows merchants <em>why</em> a particular payment gateway may be suitable.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="list-checks" [size]="24" class="role-icon" style="color: #ec4899;"></lucide-icon>
                  <div>
                    <h4>Gateway Comparison</h4>
                    <p>Allows merchants to compare relevant payment gateway features and suitability.</p>
                  </div>
                </div>
                <div class="role-item">
                  <lucide-icon name="layout-dashboard" [size]="24" class="role-icon" style="color: #14b8a6;"></lucide-icon>
                  <div>
                    <h4>Merchant Onboarding</h4>
                    <p>Provides a structured onboarding journey and document management after gateway selection.</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- 8. Technology Stack & Security -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">8. TECH & SECURITY</span>
              </div>
              <h2 class="gradient-heading">Technology Stack & Security</h2>
              
              <div class="tech-grid" style="margin-bottom: 2rem;">
                <div class="tech-card glass">
                  <h4>AI Layer</h4>
                  <p>AI / LLM, Business Analysis, Recommendation Logic, Structured Data Processing</p>
                </div>
                <div class="tech-card glass">
                  <h4>Backend</h4>
                  <p>Node.js, Express.js, REST APIs, Authentication, Document Management</p>
                </div>
                <div class="tech-card glass">
                  <h4>Frontend</h4>
                  <p>Angular, TypeScript, HTML, CSS</p>
                </div>
                <div class="tech-card glass">
                  <h4>Database</h4>
                  <p>PostgreSQL</p>
                </div>
              </div>

              <div class="security-box glass-card">
                <h3><lucide-icon name="shield" [size]="20" style="color: #10b981;"></lucide-icon> Security & Privacy Considerations</h3>
                <ul class="security-list">
                  <li>Website analysis focuses strictly on <strong>publicly accessible information</strong>.</li>
                  <li>Merchant information is handled securely with <strong>controlled access</strong> to sensitive documents.</li>
                  <li>Verification does not automatically guarantee approval; eligibility depends on provider compliance requirements.</li>
                  <li>API keys, document credentials, and sensitive information are never exposed or hardcoded.</li>
                </ul>
              </div>
            </section>
            
            <!-- 9. Future Roadmap -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">9. ROADMAP</span>
              </div>
              <h2 class="gradient-heading">Future Enhancements</h2>
              <div class="roadmap-grid glass-card">
                <span class="rm-tag">Advanced AI Profiling</span>
                <span class="rm-tag">Transaction Volume Analysis</span>
                <span class="rm-tag">Dynamic Fee Comparison</span>
                <span class="rm-tag">Multi-provider Onboarding</span>
                <span class="rm-tag">Recommendation Scoring</span>
                <span class="rm-tag">Dashboard Analytics</span>
                <span class="rm-tag">Automated Document Checks</span>
                <span class="rm-tag">Provider API Integrations</span>
              </div>
            </section>

          </ng-container>

          <!-- CUSTOM ALTERMASTER VIEW -->
          <ng-container *ngIf="project()?.id === 'altermaster'">
            
            <!-- 1. Overview -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">1. OVERVIEW</span>
              </div>
              <h2 class="gradient-heading">Project Overview</h2>
              <p class="large-text">
                AlterMaster is a trackable alteration management system built specifically for garment shops and fully integrated with the POS. Every garment can be traced from the initial customer request through Master assignment, scanning, alteration completion, Admin verification, and final delivery to the client.
              </p>
            </section>

            <!-- 2. Core Workflow -->
            <section class="content-section">
              <div class="section-label fade-up">
                <span class="line"></span>
                <span class="text">2. CORE WORKFLOW</span>
              </div>
              <h2 class="gradient-heading fade-up">Alteration Request Lifecycle</h2>
              
              <div class="steps-container">
                <!-- Step 1 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 1</div>
                  <h3><lucide-icon name="store" [size]="20" style="margin-right:0.5rem; color:var(--accent-primary)"></lucide-icon> Customer Alteration Request</h3>
                  <p>The client places an alteration request at the shop. The POS system creates an alteration job linked to the client's order and generates a unique Job ID / QR Code for tracking.</p>
                </div>

                <!-- Step 2 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 2</div>
                  <h3><lucide-icon name="user-check" [size]="20" style="margin-right:0.5rem; color:#8b5cf6"></lucide-icon> Assign Alteration to Master</h3>
                  <p>The Admin reviews the request and assigns the job to an appropriate Master/Tailor. The Master can see customer details, measurements, instructions, and due date.</p>
                </div>

                <!-- Step 3 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 3</div>
                  <h3><lucide-icon name="qr-code" [size]="20" style="margin-right:0.5rem; color:#ec4899"></lucide-icon> Master Scans the Product</h3>
                  <p>Upon receiving the garment, the Master scans the QR Code/Barcode. The system identifies the job and marks it as <strong>Assigned to Master / In Progress</strong>.</p>
                </div>

                <!-- Step 4 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 4</div>
                  <h3><lucide-icon name="scissors" [size]="20" style="margin-right:0.5rem; color:#f59e0b"></lucide-icon> Alteration Process</h3>
                  <p>The Master performs the required alteration and updates the job status dynamically (e.g., Assigned, In Progress, On Hold, Completed).</p>
                </div>

                <!-- Step 5 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 5</div>
                  <h3><lucide-icon name="clipboard-check" [size]="20" style="margin-right:0.5rem; color:#10b981"></lucide-icon> Assign Back to Admin</h3>
                  <p>Once finished, the Master marks the job as <strong>Completed</strong> and assigns it back to the Admin, triggering a dashboard notification.</p>
                </div>
                
                <!-- Step 6 -->
                <div class="step-card glass-card">
                  <div class="step-number">Step 6</div>
                  <h3><lucide-icon name="check-circle" [size]="20" style="margin-right:0.5rem; color:#3b82f6"></lucide-icon> Assign Back to Client</h3>
                  <p>The Admin verifies the work and marks the garment as <strong>Ready for Customer</strong>. The client is notified for pickup/delivery.</p>
                </div>
              </div>
            </section>

            <!-- 3. Status Flow Pipeline -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">3. STATUS PIPELINE</span>
              </div>
              <h2 class="gradient-heading">Complete Status Flow</h2>
              
              <div class="status-pipeline glass-card">
                <div class="sp-node"><div class="sp-dot"></div><span>Client</span></div>
                <div class="sp-line"></div>
                <div class="sp-node"><div class="sp-dot"></div><span>POS Request</span></div>
                <div class="sp-line"></div>
                <div class="sp-node"><div class="sp-dot accent"></div><span class="accent">Admin</span></div>
                <div class="sp-line"></div>
                <div class="sp-node"><div class="sp-dot"></div><span>Master</span></div>
                <div class="sp-line"></div>
                <div class="sp-node"><div class="sp-dot highlight"></div><span class="highlight">Product Scan</span></div>
                <div class="sp-line"></div>
                <div class="sp-node"><div class="sp-dot"></div><span>In Progress</span></div>
                <div class="sp-line"></div>
                <div class="sp-node"><div class="sp-dot success"></div><span class="success">Completed</span></div>
                <div class="sp-line"></div>
                <div class="sp-node"><div class="sp-dot accent"></div><span class="accent">Admin</span></div>
                <div class="sp-line"></div>
                <div class="sp-node"><div class="sp-dot success"></div><span class="success">Client</span></div>
              </div>
            </section>

            <!-- 4. Tracking & Audit -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">4. AUDIT SYSTEM</span>
              </div>
              <h2 class="gradient-heading">Tracking & Audit Logs</h2>
              <p class="large-text" style="margin-bottom: 2rem;">
                Every alteration job maintains a comprehensive, unalterable history to ensure accountability across the entire garment lifecycle.
              </p>

              <div class="audit-log-container glass-card">
                <div class="audit-header">
                  <lucide-icon name="history" [size]="24" class="audit-icon"></lucide-icon>
                  <h3>Comprehensive Job History Tracking</h3>
                </div>
                <ul class="audit-list">
                  <li><lucide-icon name="user" [size]="16"></lucide-icon> <strong>Creation:</strong> Who created the alteration request (POS User)</li>
                  <li><lucide-icon name="user-check" [size]="16"></lucide-icon> <strong>Assignment:</strong> Which Admin assigned the job</li>
                  <li><lucide-icon name="scissors" [size]="16"></lucide-icon> <strong>Reception:</strong> Which Master received it</li>
                  <li><lucide-icon name="qr-code" [size]="16"></lucide-icon> <strong>Scanning:</strong> Exact timestamp when the Master scanned the product</li>
                  <li><lucide-icon name="clock" [size]="16"></lucide-icon> <strong>Duration:</strong> Alteration start time vs completion time</li>
                  <li><lucide-icon name="arrow-left" [size]="16"></lucide-icon> <strong>Return:</strong> When the garment was returned to Admin</li>
                  <li><lucide-icon name="check-circle" [size]="16"></lucide-icon> <strong>Verification:</strong> When Admin marked it ready for the Client</li>
                  <li><lucide-icon name="package" [size]="16"></lucide-icon> <strong>Delivery:</strong> Final pickup/delivery status confirmation</li>
                </ul>
              </div>
            </section>
            
            <!-- 5. Technology Stack -->
            <section class="content-section fade-up">
              <div class="section-label">
                <span class="line"></span>
                <span class="text">5. TECH STACK</span>
              </div>
              <h2 class="gradient-heading">Technology Stack</h2>
              
              <div class="tech-grid">
                <div class="tech-card glass">
                  <h4>Backend Layer</h4>
                  <p>Java, Spring Boot, Hibernate / JPA, REST APIs</p>
                </div>
                <div class="tech-card glass">
                  <h4>Database</h4>
                  <p>PostgreSQL</p>
                </div>
                <div class="tech-card glass">
                  <h4>Integration</h4>
                  <p>OrderApp POS System, QR/Barcode Generation</p>
                </div>
              </div>
            </section>

          </ng-container>

          <!-- GENERIC PROJECT VIEW -->
          <ng-container *ngIf="project()?.id !== 'orderapp' && project()?.id !== 'blackpos' && project()?.id !== 'ai-payment-advisor' && project()?.id !== 'altermaster'">
            <section class="content-section">
              <h2>Overview</h2>
              <p>{{project()?.fullDescription}}</p>
            </section>

            <section class="content-section" *ngIf="project()?.features?.length">
              <h2>Key Features</h2>
              <ul class="feature-list">
                <li *ngFor="let feature of project()?.features">
                  <lucide-icon name="check-circle" [size]="20" class="check-icon"></lucide-icon>
                  <span>{{feature}}</span>
                </li>
              </ul>
            </section>
          </ng-container>
          
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-wrapper { min-height: 100vh; padding: 120px 0 60px; overflow-x: hidden; }
    .container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; }
    
    .back-btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      color: var(--text-secondary); margin-bottom: 3rem;
      transition: color 0.2s; font-weight: 500;
    }
    .back-btn:hover { color: var(--accent-primary); }
    
    .project-header { margin-bottom: 3rem; text-align: center; }
    .project-title { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1rem; }
    .project-desc { font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 2rem; }
    
    .tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 2rem; }
    .p-tag {
      padding: 0.25rem 1rem; border-radius: 9999px;
      background: rgba(59, 130, 246, 0.1); color: var(--accent-primary);
      border: 1px solid var(--accent-primary); font-size: 0.875rem; font-weight: 500;
    }
    
    .action-links { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
    
    .hero-image {
      border-radius: 1.5rem; overflow: hidden; margin-bottom: 5rem;
      aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;
      box-shadow: var(--card-shadow); border: 1px solid var(--border-color);
    }
    .hero-image img { width: 100%; height: 100%; object-fit: cover; }
    
    .content-section { margin-bottom: 5rem; }
    
    /* Custom Headings */
    .section-label {
      display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;
    }
    .section-label .line { width: 40px; height: 1px; background: var(--accent-primary); }
    .section-label .text { color: var(--accent-primary); font-size: 0.85rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; }
    
    .gradient-heading {
      font-size: clamp(2rem, 3vw, 2.5rem); margin-bottom: 1.5rem;
      background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    
    .content-section h2 { font-size: 2rem; margin-bottom: 1.5rem; }
    .content-section p { color: var(--text-secondary); line-height: 1.8; font-size: 1.1rem; }
    .large-text { font-size: 1.15rem !important; line-height: 1.9 !important; }

    /* Problem / Solution */
    .problem-solution-grid {
      display: grid; grid-template-columns: 1fr; gap: 1.5rem;
    }
    @media (min-width: 768px) { .problem-solution-grid { grid-template-columns: 1fr 1fr; } }
    .ps-card { padding: 2rem; border-radius: 1rem; }
    .ps-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .ps-header h3 { margin: 0; font-size: 1.3rem; }
    .problem-icon { color: #ef4444; }
    .solution-icon { color: #10b981; }
    
    /* Steps Container */
    .steps-container {
      display: grid; grid-template-columns: 1fr; gap: 1.5rem; padding-top: 1rem;
    }
    @media (min-width: 768px) { .steps-container { grid-template-columns: 1fr 1fr; } }
    .step-card {
      padding: 2rem; border-radius: 1rem; position: relative; overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .step-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-color: var(--accent-primary); }
    :root.dark .step-card:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
    .step-number {
      font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
      color: var(--accent-primary); margin-bottom: 0.5rem;
    }
    .step-card h3 { font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-primary); }
    .step-card p { font-size: 0.95rem; margin-bottom: 1.5rem; color: var(--text-secondary); line-height: 1.6; }
    
    .step-mini-flow {
      display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
      font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);
      background: rgba(15, 23, 42, 0.05); padding: 0.75rem 1rem; border-radius: 0.5rem;
    }
    :root.dark .step-mini-flow { background: rgba(255, 255, 255, 0.05); }
    .step-mini-flow .highlight { color: var(--accent-primary); }

    .vertical-flow-mini {
      display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
      font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);
      background: rgba(15, 23, 42, 0.05); padding: 1rem; border-radius: 0.5rem; text-align: center;
    }
    :root.dark .vertical-flow-mini { background: rgba(255, 255, 255, 0.05); }
    .vertical-flow-mini .highlight { color: var(--accent-primary); }
    .v-arrow { color: var(--accent-primary); opacity: 0.5; }

    /* Timeline Flow */
    .timeline-flow {
      padding: 3rem 2rem; border-radius: 1.5rem; display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    .tl-row { margin: 0; }
    .tl-main { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); }
    .tl-main.accent { font-size: 1.4rem; color: var(--accent-primary); }
    .tl-main.success { color: #10b981; }
    .tl-sub { font-size: 0.95rem; color: var(--text-secondary); font-weight: 500; }
    .tl-arrow { color: var(--accent-primary); opacity: 0.4; margin: 0.75rem 0; }

    /* Journey Box */
    .journey-box { padding: 1.5rem 2rem; border-radius: 1rem; border-left: 4px solid var(--accent-primary); }
    .journey-box h3 { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; color: var(--text-primary); font-size: 1.2rem; }
    .journey-path { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-size: 0.95rem; font-weight: 600; color: var(--accent-primary); margin-bottom: 1rem; }
    .journey-note { font-size: 0.9rem; color: var(--text-secondary); margin: 0; font-style: italic; }

    /* AI Specific Styles */
    .ai-overview-box {
      display: flex; gap: 1.5rem; padding: 2rem; border-radius: 1rem; align-items: center;
      background: linear-gradient(145deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
      border: 1px solid rgba(59, 130, 246, 0.1);
    }
    .ai-icon-large { color: var(--accent-primary); filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.4)); flex-shrink: 0; }
    .ai-overview-content h3 { margin: 0 0 0.5rem 0; font-size: 1.2rem; }
    .ai-overview-content p { margin: 0; font-size: 0.95rem; line-height: 1.6; }
    @media (max-width: 600px) { .ai-overview-box { flex-direction: column; text-align: center; } }

    .recommendation-mockup {
      margin-top: 1.5rem; padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #f59e0b;
      background: rgba(245, 158, 11, 0.05);
    }
    .rm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem; }
    .rm-badge { background: #f59e0b; color: #fff; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 1rem; text-transform: uppercase;}
    .rm-header h4 { margin: 0; font-size: 1.1rem; color: var(--text-primary); }
    .rm-reason { font-size: 0.9rem !important; margin: 0 !important; color: var(--text-secondary); }

    .architecture-diagram {
      display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.5rem;
      padding: 3rem 2rem; border-radius: 1rem;
    }
    .arch-node {
      background: var(--card-bg); padding: 0.75rem 1rem; border-radius: 0.5rem; font-size: 0.85rem; font-weight: 600;
      border: 1px solid var(--border-color); color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem;
      text-align: center; justify-content: center;
    }
    .arch-node.highlight-node { border-color: var(--accent-primary); color: var(--accent-primary); background: rgba(59, 130, 246, 0.05); }
    .arch-node.success-node { border-color: #10b981; color: #10b981; background: rgba(16, 185, 129, 0.05); }
    .arch-arrow { color: var(--border-color); }
    @media (max-width: 900px) {
      .architecture-diagram { flex-direction: column; }
      .arch-arrow { transform: rotate(90deg); margin: 0.25rem 0; }
    }

    /* Dashboard Concept */
    .dashboard-concept { padding: 2rem; border-radius: 1rem; border-top: 4px solid var(--accent-primary); }
    
    .dash-progress {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 2.5rem;
      overflow-x: auto; padding-bottom: 1rem;
    }
    .progress-step { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center; min-width: 80px; }
    .progress-step span { font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); }
    .progress-step.active span { color: var(--accent-primary); }
    .progress-step .dot { width: 14px; height: 14px; border-radius: 50%; background: var(--border-color); border: 2px solid var(--card-bg); z-index: 2; box-shadow: 0 0 0 2px var(--border-color); }
    .progress-step.active .dot { background: var(--accent-primary); box-shadow: 0 0 0 2px var(--accent-primary); }
    .progress-line { flex-grow: 1; height: 2px; background: var(--border-color); margin: 0 -30px 18px -30px; z-index: 1; min-width: 20px;}
    .progress-line.active { background: var(--accent-primary); }
    
    .dash-modules {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;
    }
    .d-mod {
      background: rgba(15, 23, 42, 0.05); padding: 1rem; border-radius: 0.5rem;
      display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; font-weight: 600; color: var(--text-secondary);
      border: 1px solid transparent;
    }
    :root.dark .d-mod { background: rgba(255, 255, 255, 0.05); }
    .d-mod.highlight { background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.2); color: var(--accent-primary); }

    /* Security & Roadmap */
    .security-box { padding: 1.5rem 2rem; border-radius: 1rem; border-left: 4px solid #10b981; }
    .security-box h3 { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; font-size: 1.2rem; }
    .security-list { margin: 0; padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8; }
    .security-list li { margin-bottom: 0.5rem; }
    
    .roadmap-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; padding: 1.5rem; border-radius: 1rem; }
    .rm-tag { 
      padding: 0.5rem 1rem; background: rgba(139, 92, 246, 0.1); color: #8b5cf6; 
      font-size: 0.85rem; font-weight: 600; border-radius: 2rem; border: 1px solid rgba(139, 92, 246, 0.2); 
    }
    :root.dark .rm-tag { background: rgba(139, 92, 246, 0.15); }

    /* AlterMaster Specific Styles */
    .status-pipeline {
      display: flex; align-items: center; justify-content: space-between; overflow-x: auto;
      padding: 3rem 2rem; border-radius: 1rem; gap: 0.5rem;
    }
    .sp-node { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; min-width: 90px; text-align: center; }
    .sp-node span { font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); }
    .sp-node span.accent { color: var(--accent-primary); }
    .sp-node span.highlight { color: #f59e0b; }
    .sp-node span.success { color: #10b981; }
    .sp-dot { width: 16px; height: 16px; border-radius: 50%; background: var(--border-color); z-index: 2; box-shadow: 0 0 0 4px var(--card-bg); }
    .sp-dot.accent { background: var(--accent-primary); }
    .sp-dot.highlight { background: #f59e0b; }
    .sp-dot.success { background: #10b981; }
    .sp-line { flex-grow: 1; height: 3px; background: var(--border-color); margin: -28px -15px 0 -15px; z-index: 1; min-width: 30px; }

    .audit-log-container { padding: 2rem; border-radius: 1rem; border-top: 4px solid #64748b; }
    .audit-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
    .audit-header h3 { margin: 0; font-size: 1.25rem; }
    .audit-icon { color: #64748b; }
    .audit-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr; gap: 1rem; }
    @media (min-width: 768px) { .audit-list { grid-template-columns: 1fr 1fr; gap: 1.5rem; } }
    .audit-list li { 
      display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; color: var(--text-secondary); 
      background: rgba(15, 23, 42, 0.05); padding: 1rem; border-radius: 0.5rem;
    }
    :root.dark .audit-list li { background: rgba(255, 255, 255, 0.05); }
    .audit-list li strong { color: var(--text-primary); }

    /* Flow Layout for OrderApp */
    .flow-container {
      display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 2rem 0;
    }
    .flow-step {
      width: 100%; max-width: 500px;
    }
    .flow-card {
      padding: 1.5rem 2rem; text-align: center; border-radius: 1rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative; overflow: hidden;
    }
    .flow-card:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
      border-color: var(--accent-primary);
    }
    :root.dark .flow-card:hover { box-shadow: 0 15px 30px rgba(0,0,0,0.4); }
    
    .flow-card h3 { font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-primary); }
    .flow-card p { font-size: 0.95rem; margin: 0; }
    .flow-icon { margin-bottom: 1rem; }
    
    .super-admin { color: #ef4444; }
    .admin { color: #f59e0b; }
    .vendor { color: #10b981; }
    .client { color: #3b82f6; }
    .event { color: #8b5cf6; }
    
    .flow-arrow {
      color: var(--accent-primary); opacity: 0.5;
    }

    /* Role Grid */
    .roles-grid {
      display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 2rem;
    }
    @media (min-width: 768px) { .roles-grid { grid-template-columns: 1fr 1fr; } }
    
    .role-item {
      display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem;
      background: rgba(15, 23, 42, 0.03); border-radius: 1rem; border: 1px solid var(--border-color);
      transition: background 0.3s ease;
    }
    :root.dark .role-item { background: rgba(255, 255, 255, 0.03); }
    .role-item:hover { background: rgba(59, 130, 246, 0.05); }
    
    .role-icon { flex-shrink: 0; margin-top: 0.1rem; }
    .role-item h4 { font-size: 1.1rem; margin-bottom: 0.25rem; color: var(--text-primary); }
    .role-item p { font-size: 0.95rem; margin: 0; line-height: 1.5; }

    /* Custom Quote */
    .custom-quote {
      padding: 2rem; margin: 2rem 0; border-left: 4px solid var(--accent-primary);
      border-radius: 0 1rem 1rem 0; font-style: italic; font-size: 1.1rem; color: var(--text-primary);
      line-height: 1.8;
    }

    /* Tech Grid */
    .tech-grid {
      display: grid; grid-template-columns: 1fr; gap: 1.5rem;
    }
    @media (min-width: 768px) { .tech-grid { grid-template-columns: 1fr 1fr; } }
    .tech-card {
      padding: 1.5rem; border-radius: 1rem;
    }
    .tech-card h4 { font-size: 1.1rem; color: var(--accent-primary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .tech-card p { margin: 0; font-weight: 500; color: var(--text-primary); }

    /* Features */
    .feature-list { list-style: none; padding: 0; display: grid; gap: 1rem; }
    @media (min-width: 768px) { .feature-list { grid-template-columns: 1fr 1fr; } }
    .feature-list li { display: flex; align-items: flex-start; gap: 1rem; color: var(--text-secondary); font-size: 1.1rem; }
    .check-icon { color: #10b981; flex-shrink: 0; margin-top: 0.2rem; }
  `]
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  seo = inject(SeoService);
  destroyRef = inject(DestroyRef);
  
  project = signal<Project | null>(null);
  ctx!: gsap.Context;

  @ViewChild('projectContent') projectContent!: ElementRef;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = PORTFOLIO_DATA.projects.find(p => p.id === id);
      
      if (found) {
        this.project.set(found);
        this.seo.updateMetadata({
          title: `${found.title} | Sibam Sahu`,
          description: found.fullDescription || found.shortDescription
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    });
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    
    // Wait for view to update after setting project
    setTimeout(() => {
      if (typeof window === 'undefined') return;
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (this.project()?.id === 'orderapp' && this.projectContent) {
        this.ctx = gsap.context(() => {
          this.initCommonAnimations();
          this.initFlowArrowsAnimation('.flow-container', '.flow-step', '.flow-arrow');
        }, this.projectContent.nativeElement);
      } else if (this.project()?.id === 'blackpos' && this.projectContent) {
        this.ctx = gsap.context(() => {
          this.initCommonAnimations();
          
          // Animate Steps Grid
          gsap.from('.step-card', {
            scrollTrigger: {
              trigger: '.steps-container',
              start: 'top 85%'
            },
            y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
          });

          // Animate Problem Solution Grid
          gsap.from('.ps-card', {
            scrollTrigger: {
              trigger: '.problem-solution-grid',
              start: 'top 85%'
            },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'back.out(1.2)'
          });

          // Animate Timeline Flow
          gsap.from('.timeline-flow > div', {
            scrollTrigger: {
              trigger: '.timeline-flow',
              start: 'top 80%'
            },
            y: 15, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
          });

          // Animate Journeys
          gsap.from('.journey-anim', {
            scrollTrigger: {
              trigger: '.journey-anim',
              start: 'top 85%'
            },
            x: -20, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out'
          });

        }, this.projectContent.nativeElement);
      } else if (this.project()?.id === 'ai-payment-advisor' && this.projectContent) {
        this.ctx = gsap.context(() => {
          this.initCommonAnimations();
          
          // Animate Steps Grid
          gsap.from('.step-card', {
            scrollTrigger: {
              trigger: '.steps-container',
              start: 'top 85%'
            },
            y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
          });

          // Animate Problem Solution Grid
          gsap.from('.ps-card', {
            scrollTrigger: {
              trigger: '.problem-solution-grid',
              start: 'top 85%'
            },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'back.out(1.2)'
          });

          // Animate Timeline Flow
          gsap.from('.timeline-flow > div', {
            scrollTrigger: {
              trigger: '.timeline-flow',
              start: 'top 80%'
            },
            y: 15, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
          });

          // Animate Architecture Nodes
          gsap.from('.arch-node, .arch-arrow', {
            scrollTrigger: {
              trigger: '.architecture-diagram',
              start: 'top 85%'
            },
            scale: 0.9, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.5)'
          });

          // Animate Dashboard modules
          gsap.from('.d-mod', {
            scrollTrigger: {
              trigger: '.dashboard-concept',
              start: 'top 85%'
            },
            y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
          });
          
          // Animate Roadmap tags
          gsap.from('.rm-tag', {
            scrollTrigger: {
              trigger: '.roadmap-grid',
              start: 'top 90%'
            },
            scale: 0.5, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(2)'
          });

        }, this.projectContent.nativeElement);
      } else if (this.project()?.id === 'altermaster' && this.projectContent) {
        this.ctx = gsap.context(() => {
          this.initCommonAnimations();
          
          // Animate Steps Grid
          gsap.from('.step-card', {
            scrollTrigger: {
              trigger: '.steps-container',
              start: 'top 85%'
            },
            y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
          });

          // Animate Status Pipeline
          gsap.from('.sp-node, .sp-line', {
            scrollTrigger: {
              trigger: '.status-pipeline',
              start: 'top 85%'
            },
            scale: 0.9, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'back.out(1.5)'
          });

          // Animate Audit Logs
          gsap.from('.audit-list li', {
            scrollTrigger: {
              trigger: '.audit-list',
              start: 'top 85%'
            },
            x: -20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
          });

        }, this.projectContent.nativeElement);
      }
    }, 100); // small delay to ensure DOM is updated with ngIf

    this.destroyRef.onDestroy(() => {
      if (this.ctx) this.ctx.revert();
    });
  }

  initCommonAnimations() {
    // Fade up sections
    const sections = document.querySelectorAll('.fade-up');
    sections.forEach((sec) => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Animate Roles/Features Grid
    if(document.querySelector('.roles-grid')) {
      gsap.from('.role-item', {
        scrollTrigger: {
          trigger: '.roles-grid',
          start: 'top 85%'
        },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out'
      });
    }

    // Animate Tech Grid
    if(document.querySelector('.tech-grid')) {
      gsap.from('.tech-card', {
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 85%'
        },
        scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)'
      });
    }
  }

  initFlowArrowsAnimation(containerClass: string, stepClass: string, arrowClass: string) {
    const flowSteps = document.querySelectorAll(stepClass);
    const flowArrows = document.querySelectorAll(arrowClass);
    
    if (flowSteps.length) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerClass,
          start: 'top 80%'
        }
      });

      flowSteps.forEach((step, index) => {
        tl.from(step, {
          y: 30, opacity: 0, duration: 0.6, ease: 'back.out(1.2)'
        }, index === 0 ? 0 : '-=0.2');
        
        if (index < flowArrows.length) {
          tl.from(flowArrows[index], {
            y: -10, opacity: 0, duration: 0.3, ease: 'power2.out'
          }, '-=0.3');
        }
      });
    }
  }

  onImageError(event: any) {
    event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
  }
}
