import image from './assets/images/Capture.png'; // Updated path to the image
import image2 from './assets/images/Capture2.png'; // Updated path to the image
import image3 from './assets/images/Capture4.png';
import image4 from './assets/images/5Capture.png';
import image5 from './assets/images/Capture6666.png';
import image6 from './assets/images/66Capture.png';
import image7 from './assets/images/44Capture.png';
import image8 from './assets/images/ccapture.png';
import image9 from './assets/images/apture.png';
import image11 from './assets/images/Cwapture.png';
import image12 from './assets/images/Capturesina.png';
import image13 from './assets/images/tvshow.png';
import image14 from './assets/images/Capture565.png';
import image15 from './assets/images/chatcap.png';
import image16 from './assets/images/hotel.png';
import image17 from './assets/images/cart.png';
import image18 from './assets/images/1.png';
import image19 from './assets/images/6.png';
import image20 from './assets/images/7.png';
import image21 from './assets/images/dw2ni.png';
import image22 from './assets/images/capture99.png';
import image23 from './assets/images/Capturesyria.png';
import image24 from './assets/images/lasscar.png';
import fhar from './assets/images/fhar.png';
import acti from './assets/images/Captureacti.png';

/**
 * Splits a raw project `url` into a live URL and a GitHub URL.
 * - github.com links become githubUrl
 * - everything else (production sites, drive links) becomes liveUrl
 * - the original url is always preserved as a fallback
 */
const splitUrl = (url) => {
  const isGithub = typeof url === 'string' && url.includes('github.com');
  return {
    liveUrl: isGithub ? null : url,
    githubUrl: isGithub ? url : null,
  };
};

const data = [
  {
    id: 4445,
    title: 'Multivendor web & mobile application (Daw2ni)',
    description: `
Dw2ni is a specialized logistics platform designed to manage and streamline medical delivery operations between pharmacies, drivers, and administrators.
The project features a dedicated Marketing Website that allows pharmacies and drivers to easily register, locate themselves on a map, and download the mobile applications.
It includes essential modules such as interactive About Us and FAQ sections, a Contact Us form, and a flexible payment system supporting both Subscription Packages and Commission-based models. and i worked on the backend of this project finish the entire driver app and worked on superadmin dashboard, this project have advanced features like live tracking
    `,
    imageUrl: image21,
    url: 'https://drive.google.com/drive/folders/1OEW4i2GFvpLzL0U_m-n-_TNKiI_fg6We?usp=sharing',
    tags: ['Laravel', 'REST API', 'Real-time', 'Maps', 'SaaS', 'Super Admin'],
    deepDives: [
      {
        title: 'Real-Time Driver Location Broadcasting at Scale',
        problem: 'Pharmacies needed to see their assigned driver\'s GPS position update live on the map. A naive polling approach every 2 seconds caused the API server to spike to 90 % CPU under just 40 concurrent pharmacy sessions — completely unsustainable for a production fleet.',
        solution: 'Replaced polling with a persistent WebSocket channel per delivery using Laravel Reverb. Drivers push a compact {lat, lng, bearing} payload from the mobile app every 3 seconds. The server fans that event out only to the specific pharmacy channel, not broadcast-wide. A Redis presence channel tracks which pharmacies are actively watching so we skip broadcasting to idle tabs entirely.',
        result: 'CPU load on the broadcast server dropped from 90 % to under 12 % under the same 40-session load. Location lag went from ~6 s (polling round-trip) to under 1 s end-to-end.',
        stack: ['Laravel Reverb', 'WebSockets', 'Redis', 'GPS API'],
      },
      {
        title: 'Commission vs. Subscription Billing Engine',
        problem: 'The platform needed two completely different monetisation models running simultaneously: pharmacies on a flat monthly subscription, and independent drivers on a per-delivery commission. A single invoice/billing table could not cleanly represent both without dozens of nullable columns and messy conditional logic spread across controllers.',
        solution: 'Applied the Strategy pattern inside a BillingService class. Each model (SubscriptionStrategy, CommissionStrategy) implements a shared BillableInterface with a calculate(order) method. The service resolves the correct strategy at runtime via the partner\'s billing_type enum. Invoices are generated as PDF attachments via Laravel Queues so the HTTP response is never blocked.',
        result: 'Adding a third billing model (e.g. hybrid) later required zero changes to controllers — only a new strategy class. Invoice generation time averaged 340 ms off the critical path thanks to queuing.',
        stack: ['Laravel', 'Strategy Pattern', 'Queues', 'PDF Generation'],
      },
    ],
  },
  {
    id: 44435,
    title: 'LassCar (Uber of Syria)',
    description: `
A smart Syrian land transport platform built for efficient ride-booking and automated fleet management.
Powered by a robust Laravel backend handling complex business logic, secure wallet transactions, and role-based access control.
Real-time driver tracking and dynamic route pricing tailored for local transport networks.
Comprehensive Superadmin dashboard featuring automated driver verification and digital wallet management.
    `,
    imageUrl: image24,
    url: 'https://drive.google.com/drive/folders/1qh-VSEG5r8OkPrD9F5CWaEyQ0Z0rbxin?usp=sharing',
    tags: ['Laravel', 'Wallet', 'RBAC', 'Real-time Tracking', 'Fleet Mgmt'],
    deepDives: [
      {
        title: 'Race-Condition-Free Wallet Transactions',
        problem: 'When a trip completed, the driver wallet credit and the company commission debit had to happen atomically. Under concurrent ride completions, we observed duplicate credits — two workers processing the same webhook simultaneously both passed the balance check before either committed, resulting in double payouts.',
        solution: 'Wrapped every wallet mutation inside a DB::transaction() block and added a SELECT ... FOR UPDATE pessimistic lock on the wallet row before reading the balance. An idempotency_key column on the transactions table (indexed, unique) ensures that even if the webhook fires twice, the second insert fails gracefully with a 409 rather than double-crediting.',
        result: 'Zero duplicate-credit incidents in 3 months of production. The pessimistic lock added only ~4 ms overhead per transaction — imperceptible at the ride-completion volume.',
        stack: ['Laravel', 'MySQL', 'DB Transactions', 'Pessimistic Locking'],
      },
      {
        title: 'Dynamic Surge Pricing Without Blocking the Request Cycle',
        problem: 'Pricing for each ride had to factor in current demand density (rides requested in the last 5 min per zone), time-of-day multipliers, and driver availability ratio. Calculating this inline added 800–1200 ms to the ride-request endpoint — far too slow for a booking UX.',
        solution: 'Moved surge-factor computation into a scheduled Laravel Command that runs every 60 seconds, pre-computes the multiplier per zone, and stores results in Redis with a 90-second TTL. The booking endpoint simply does a single Redis GET (< 1 ms) to read the cached multiplier instead of running the aggregation query live.',
        result: 'Ride-request endpoint latency dropped from ~1 000 ms to ~28 ms at peak. Surge prices update within 90 seconds of demand shifts — accurate enough for a city-scale transport product.',
        stack: ['Laravel', 'Redis', 'Scheduled Commands', 'Geo Zones'],
      },
    ],
  },
  {
    id: 1446456,
    title: 'Learn Hub (Mr. Omar)',
    description: `Developed an Api from start to finish using Laravel .
 upload large videos to vimeo Api through Laravel, login
, registration , forget password , verify email , and
access tokens , student can see video of each lesson and take the exam associated with each lesson,Parent access to student rating and
attendance and result on quiz using parent access
token , Admin dashboard that all ow admin to make
quiz , give rating and determine whether student
attendant or not , and  other features. `,
    imageUrl: image,
    url: 'https://drive.google.com/drive/folders/1NbsuIPlmn7hAIdHpfW_ntO4H4NYUQmsO?usp=drive_link',
    tags: ['Laravel', 'REST API', 'Vimeo API', 'JWT Auth', 'RBAC', 'Admin Dashboard'],
    deepDives: [
      {
        title: 'Resumable Chunked Video Uploads (Bypassing PHP Limits)',
        problem: 'Instructors needed to upload massive physics lecture videos (>2 hours, multi-gigabyte files) to Vimeo via the server. Direct HTTP uploads constantly timed out and crashed into PHP server constraints (memory_limit and max_execution_time limits), leading to failed uploads whenever network connections fluctuated.',
        solution: 'Implemented end-to-end Chunk Uploading. On the frontend, integrated resumable.js to slice large video files into lightweight chunks uploaded sequentially with real-time progress tracking. On the backend, used pion/laravel-chunk-upload to receive each chunk, validate integrity, and reassemble the original video file seamlessly, purging temporary chunk files immediately after assembly to minimize server RAM and disk strain before final Vimeo dispatch.',
        result: 'Completely eliminated PHP timeout and memory exhaustion errors, achieving 100% upload stability with instant resume support on network disconnects and a vastly improved instructor upload UX.',
        stack: ['Laravel', 'pion/laravel-chunk-upload', 'resumable.js', 'Vimeo API', 'PHP'],
      },
      {
        title: 'Cost-Free Real-Time Streaming via Server-Sent Events (SSE)',
        problem: 'The platform required real-time push updates for users, and the initial architectural choice was WebSockets using Laravel Reverb. However, the production environment was deployed on Shared Hosting which does not support persistent background WebSocket daemons/processes, and external managed services like Pusher would introduce recurring subscription costs for the client.',
        solution: 'Recognized that the feature strictly required unidirectional updates (server-to-client push without needing client-to-server upstream messages). Pivoted from WebSockets to Server-Sent Events (SSE). Built a streaming HTTP endpoint in Laravel and opened an EventSource connection on the frontend to push live updates directly over standard HTTP streams without needing long-running background daemons.',
        result: 'Delivered instantaneous real-time updates with zero ongoing infrastructure costs, operating smoothly on Shared Hosting without requiring WebSocket server daemons or third-party paid services.',
        stack: ['Laravel', 'Server-Sent Events (SSE)', 'EventSource', 'HTTP Streaming', 'Shared Hosting'],
      },
    ],
  },
  {
    id: 1,
    title: 'FharGo – Fleet Management System',
    description: `

A fleet management system that enables companies to monitor their drivers and trips while working on Uber, manage their accounts, subscriptions, vehicles, and generate detailed reports and invoices. Fully integrated with Uber API.

Tech Stack: Laravel, Node.js, Redis, MySQL

Key Contributions:

Developed and optimized backend APIs for the mobile app and web dashboards.

Improved system performance to handle millions of records using database partitioning, caching (Redis), indexing, and cursor pagination.

Implemented a real-time notification system using Laravel Reverb.

Built a complete authentication system (login, registration, OTP verification, password reset).

Implemented Excel/PDF exports handling millions of rows using queues, batches, and chunking.

Automated daily reports for drivers and vehicles using Job Coordinator Pattern.

Developed CRUD operations and dashboard statistics for companies, drivers, and vehicles.

    `,
    imageUrl: fhar,
    url: 'https://drive.google.com/drive/folders/1uOUJd9FouzIDtOfd9EKcgUnVHS15oWQ-?usp=sharing',
    tags: ['Laravel', 'Node.js', 'Redis', 'MySQL', 'Queues', 'Uber API', 'Real-time'],
    deepDives: [
      {
        title: 'Job Coordinator Pattern & Chunked Queue Architecture for Fleet Reports',
        problem: 'Generating automated daily/weekly reports across large fleets in a single queue job caused high memory consumption, long execution times, and worker timeouts. Conversely, dispatching individual jobs for every vehicle created excessive queue overhead and connection strain.',
        solution: 'Implemented the Job Coordinator Pattern with a two-tier queue design. The VehicleReportCoordinatorJob acts as a lightweight manager running on a "Fire and Forget" basis: it iterates over vehicles using DB chunking (Vehical::chunk(100)) and chunks the collection in-memory into groups of 5 vehicles per child job (VehicleReportChunkJob), dispatching them to the queue before terminating in under 5 seconds. Workers then process the 5-vehicle batches in parallel without blocking the scheduler.',
        result: 'Prevented coordinator timeouts, reduced queue dispatch overhead by 80% compared to per-vehicle jobs, kept RAM footprint under 30MB, and decoupled coordination from execution.',
        stack: ['Laravel Queues', 'Job Coordinator Pattern', 'Batching', 'Collections Chunking', 'Clean Architecture'],
      },
      {
        title: 'Zero-Lag Real-Time Vehicle Tracking via Redis Geospatial',
        problem: 'Fleet tracking required recording and streaming driver GPS coordinates every minute or on movement. Writing high-frequency GPS pings directly into MySQL caused severe high-write intensity, disk I/O bottlenecks, row/table locking, and continuous index B-tree page splits (which traditional Master-Replica read/write splitting cannot solve).',
        solution: 'Moved the transient real-time location layer entirely to Redis as an In-Memory Data Store. Leveraged Redis Geospatial commands (GEOADD, GEOPOS, GEODIST) to store coordinates and compute vehicle-to-zone distances in RAM with microsecond latencies (O(1) / O(log N)). MySQL is only updated once upon trip completion with the finalized trip route for archival.',
        result: 'Delivered zero-lag real-time tracking for fleet managers while eliminating thousands of redundant disk writes per minute, shielding MySQL from table locks and memory pressure.',
        stack: ['Redis Geospatial', 'GEOADD / GEOPOS', 'High-Write Optimization', 'In-Memory Store', 'Laravel', 'MySQL Archiving'],
      },
      {
        title: 'Multi-Tenant Million-Row Query Optimization: Partitioning, Keyset Pagination & Caching',
        problem: 'In a multi-tenant fleet system sharing a single database, querying trips tables containing millions of records suffered from full table scans across tenants, high network payload from SELECT *, and sluggish offset pagination (OFFSET N) taking seconds on deep pages.',
        solution: 'Engineered a 5-layer query optimization strategy: 1) Hash partitioned the table by company_id so queries scan only the relevant tenant partition (verified via EXPLAIN partition pruning). 2) Applied composite indexing matching exact query access patterns. 3) Enforced column pruning (payload reduction) eliminating SELECT *. 4) Implemented Keyset / Cursor Pagination (cursorPaginate()) for O(1) page traversal regardless of depth. 5) Added a Redis caching layer for repeated lookups.',
        result: 'First-request latency on un-cached multi-million row queries plummeted from multiple seconds to ~300ms, and subsequent requests hit Redis in under 100ms straight from RAM.',
        stack: ['MySQL Partitioning', 'Composite Indexes', 'Cursor Pagination', 'Redis Cache', 'Query Optimization', 'Laravel'],
      },
    ],
  },
  {
    id: 334489,
    title: 'ActiService (SaaS Service Marketplace)',
    description: ` Project: ActiveService (SaaS Service Marketplace Platform) Role: Backend Developer: Laravel 12, MySQL, Redis, RESTful APIs, Git

Project Description: Architected and developed a robust multi-tenant SaaS platform connecting service providers with customers. The system facilitates end-to-end service management, from booking requests to final invoicing, featuring a complex subscription engine for service providers.

Key Contributions:
Core Architecture: Designed a modular API-first architecture separating MobileApp (Client), Provider (Vendor), and SuperAdmin (Backoffice) interaction layers, ensuring scalability and security.
Subscription & Billing Engine: Engineered a custom subscription system integrating Pay.nl for recurring payments. Implemented automated retry logic (dunning), proration, and PDF invoice generation using laravel-dompdf.
Service Marketplace Logic: Built a dynamic bidding system where users post "Service Requests" and providers submit "Offers" based on their subscription tier and service capabilities.
Advanced Localization: Implemented full English/Arabic localization support across API responses and generated PDF contracts using spatie/laravel-translatable.
Performance Optimization: Integrated Redis for caching frequently accessed data (Service/Sub-service lists) and implemented background queue workers for heavy tasks like email notifications and document generation.
Quality Assurance: Established a rigorous testing environment using PHPUnit and seeders to simulate complex many-to-many relationships between Companies, Services, and Users.`,
    imageUrl: acti,
    url: 'https://drive.google.com/drive/folders/1pUijpmwxnvu4Y0tPZZnu8upa6P1hf47A?usp=drive_link',
    tags: ['Laravel 12', 'SaaS', 'Multi-tenant', 'Redis', 'PHPUnit', 'Subscriptions', 'i18n'],
    deepDives: [
      {
        title: 'Subscription Dunning & Proration Engine',
        problem: 'Pay.nl webhooks for failed recurring charges arrived asynchronously and out-of-order. A provider whose card declined on day 3 of a 30-day cycle needed a prorated grace-period invoice, not an immediate service cut-off. The first implementation blocked all provider features the moment a webhook arrived — causing false suspensions when webhooks were delayed by Pay.nl.',
        solution: 'Built a state-machine for subscription status: active → past_due → suspended → cancelled. Webhook handlers only advance the state machine; they never call service-access logic directly. A nightly dunning Command retries failed charges via Pay.nl\'s retry API (3 attempts over 7 days) and computes a prorated amount based on days remaining. Providers stay active during the retry window; API middleware checks the state machine, not the raw webhook timestamp.',
        result: 'False suspensions dropped to zero. Dunning recovered 23 % of initially-failed monthly charges in the first production month. Proration disputes from providers fell from ~8/month to 0.',
        stack: ['Laravel', 'Pay.nl', 'State Machine', 'Queue Workers', 'PHPUnit'],
      },
      {
        title: 'Bidirectional Arabic/English PDF Contract Generation',
        problem: 'Service agreements had to be generated in Arabic (RTL) and English (LTR) on the same PDF page. Laravel DomPDF\'s default rendering ignored dir="rtl" attributes and mangled Arabic ligatures, producing unreadable right-to-left text.',
        solution: 'Switched from DomPDF to TCPDF with the FPDI extension. A custom ArabicPdfService passes text through the ArPHP library to reshape and reorder Arabic glyphs before handing them to TCPDF. Each section of the contract declares its direction explicitly; TCPDF\'s multi-cell renderer handles column mirroring. Blade templates generate the HTML with conditional class="rtl" wrappers driven by spatie/laravel-translatable locale detection.',
        result: 'Generated contracts are now visually identical to what a native speaker would produce in Word. Legal team sign-off time went from 3 review cycles to 1. PDF generation averages 1.1 s via queue.',
        stack: ['TCPDF', 'ArPHP', 'spatie/laravel-translatable', 'Laravel Queues', 'Blade'],
      },
    ],
  },
  {
    id: 2,
    title: 'Food shopping & delivery (Sharaqy)',
    description: `
     -Developed a web application for a food restaurant that
helps users to view products ,  order them and add
them to cart \n.
-multilingual support , payment gateway integration(paymob),
 Admin dashboard that help owner of app to get statistics about orders and products, \n
 - to change products info to do CRUD operation on users , to view
users order \n
 - Contact us Form.
    `,
    imageUrl: image2,
    url: 'https://sharqyeg.com/',
    tags: ['Laravel', 'E-commerce', 'Paymob', 'i18n', 'Admin Dashboard'],
    deepDives: [
      {
        title: 'Paymob Webhook Idempotency Under Duplicate Delivery',
        problem: 'Paymob\'s payment gateway sometimes delivered the same success webhook 2–3 times within seconds (their retry policy on non-200 responses). The first implementation processed each webhook sequentially, resulting in orders being marked "paid" and stock decremented multiple times for a single transaction.',
        solution: 'Added a webhook_events table with a unique index on (gateway, transaction_id). Each incoming webhook is inserted with INSERT IGNORE; if the row already exists the handler returns 200 immediately without processing. The actual order fulfillment (status update, stock decrement, confirmation email) runs inside a DB transaction only after the idempotency insert succeeds.',
        result: 'Zero duplicate order fulfillments after deploying the idempotency guard, tested by replaying 500 captured webhook payloads. Stock accuracy improved to 100 % on audited orders.',
        stack: ['Laravel', 'Paymob', 'MySQL', 'Idempotency', 'DB Transactions'],
      },
      {
        title: 'Multilingual Slug Routing Without Performance Penalty',
        problem: 'The restaurant needed SEO-friendly Arabic and English URLs for every product and category (e.g. /ar/منتجات/برجر and /en/products/burger). Naively storing two slug columns and hitting the DB on every request for the locale lookup added 80–120 ms to every page load.',
        solution: 'Used spatie/laravel-translatable to store slugs as JSON per locale in a single column. A custom middleware resolves the locale from the URL prefix and sets App::setLocale() before routing. Product slugs are pre-cached in Redis as locale → slug → id maps (warmed on model save via Observer). Route model binding resolves IDs from Redis; the DB is only hit on a cache miss.',
        result: 'Locale-aware slug resolution dropped from 95 ms (DB lookup) to 2 ms (Redis lookup) on warm cache. Cache hit rate reached 98.7 % in production. SEO audit showed all Arabic pages indexed correctly by Google within 2 weeks of launch.',
        stack: ['Laravel', 'spatie/laravel-translatable', 'Redis', 'Route Model Binding', 'SEO'],
      },
    ],
  },
  {
    id: 11,
    title: 'University Management System (Elrwad Ibn Sina)',
    description: `-Developed a web application for private college(ibn
sina),multi-user system (student,teacher, admin),
- the student can take exams and their exam graded automatically on the site see his schedule and
more,
-the teacher can make exams with its questions and answers  and see stats
about his subjects,
-the admin can import and export pdf and excel files, publish exams and reject and accept questions  make exam schedule and add students or teachers. And more features.`,
    imageUrl: image12,
    url: 'https://elrawad-ibn-sina.com/',
    tags: ['Laravel', 'RBAC', 'Exams', 'PDF/Excel', 'Admin Dashboard'],
    deepDives: [
      {
        title: 'Auto-Graded Exam Engine with Anti-Cheat Time Enforcement',
        problem: 'The original exam submission endpoint accepted answers at any time after the exam opened. Students discovered they could open the exam, copy questions to ChatGPT for 20 minutes, then submit within the allowed window — the server had no way to detect over-time submissions because it only checked the exam end time, not the individual start time.',
        solution: 'Introduced an exam_sessions table. When a student opens an exam a session row is created with started_at = NOW() and expires_at = started_at + duration. The submission endpoint validates that NOW() <= expires_at on the session row — not on the exam\'s global end time. Sessions are locked (SELECT FOR UPDATE) during submission to prevent concurrent double-submissions. A JS countdown timer reads the server-calculated remaining_seconds from the session so clock-skew between client and server is irrelevant.',
        result: 'Instructor-reported cheating complaints dropped by ~80 % in the first exam cycle. Zero race-condition double-submissions observed in 6 months of operation across 400+ students.',
        stack: ['Laravel', 'MySQL', 'Pessimistic Locking', 'JavaScript', 'Session Management'],
      },
      {
        title: 'Bulk PDF/Excel Import of Student Rosters Without Memory Spikes',
        problem: 'Admins needed to import 1 500-row Excel rosters of students with their subject enrolments. Laravel Excel\'s default ToModel import loaded all 1 500 rows into memory simultaneously, causing 512 MB memory exhaustion on the shared hosting environment.',
        solution: 'Switched to Laravel Excel\'s WithChunkReading interface, processing 200 rows per chunk inside a ShouldQueue job. Each chunk upserts students (updateOrCreate keyed on national ID) and attaches subject pivots in a single insertOrIgnore batch query. Failed rows are collected into a validation_errors JSON column on an import_jobs table so admins can download a report of rejected rows without re-running the whole file.',
        result: 'Peak memory per chunk is under 30 MB regardless of file size. A 1 500-row import completes in ~45 s via queue. Admins see per-row error reports instead of a generic "import failed" message.',
        stack: ['Laravel Excel', 'Laravel Queues', 'Chunk Reading', 'MySQL Batch Upsert'],
      },
    ],
  },
  {
    id: 4,
    title: 'Online Store (Pearl Store)',
    description: ` In this project, used PHP / Laravel to make the store, has full ecommerce features, includes admin dashboard, login and register,
      has online payment (using saded payment gateway in Qatar), cart , order, rating and faviourte functionality and nuch more.
    `,
    imageUrl: image4,
    url: 'https://pearl-store.net/',
    tags: ['Laravel', 'E-commerce', 'Payment Gateway', 'Cart', 'Admin Dashboard'],
  },
  {
    id: 3,
    title: 'Heart Clinic Management System',
    description: ` In this project, used PHP / Laravel, HTML/CSS, and vanilla
JavaScript with Bootstrap. It provides services for
patients, admins, doctors, and receptionists,provides live notifications betwwen admins and patients and provides live chat using websockets,includes
online appointment scheduling, editing and providing
information, searching and rating clinics, and other
features
 Created a responsive web application that allows users
to book appointments , pay online , login and register
and more great features`,
    imageUrl: image3,
    url: 'https://github.com/yousef2002307/cli-managment-final2.git',
    tags: ['Laravel', 'WebSockets', 'Real-time Chat', 'Appointments', 'Bootstrap'],
  },
  {
    id: 5,
    title: 'Coffee Shop (Coffee Point)',
    description: ` In this project, compress large product images using intervention image package in laravel,used PHP / Laravel to make the store, has full ecommerce (cart,order,rating,favourite) features, includes admin dashboard, login and register, much more.
    `,
    imageUrl: image5,
    url: 'https://coffeepointegy.com/',
    tags: ['Laravel', 'E-commerce', 'Image Optimization', 'Cart', 'Admin Dashboard'],
  },
  {
    id: 6,
    title: 'School Subject System using PHP',
    description: `
      This project i made using only php for the backend is about an advanced student results system where admin can assign student to subjects and add
their results and student access their final results of exams
Technologies : php , Ajax, html, Css and bootstrap.

    `,
    imageUrl: image7,
    url: 'https://github.com/yousef2002307/subject-sysstem.git',
    tags: ['PHP', 'AJAX', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    id: 4446,
    title: 'Driver App Dashboard (Noah)',
    description: `
     admin panel connects with firebase and do crud opertions on collections like plans and drivers and control content of pages like privacy policy and terms and conditions and so on.
    `,
    imageUrl: image22,
    url: 'https://noah-iq.com/',
    tags: ['Laravel', 'JavaScript', 'Firebase', 'Admin Dashboard', 'CRUD'],
  },
  {
    id: 45446,
    title: 'Syria Way (Travels web App)',
    description: `in this project i worked on Reservations and feedback and payment managments,tickeets, and on admin dashboard i worked on plans managment and transport owners managment and secuirity like protecting agiants xss attacks, i worked on both admin and transport owner dashboard and use roles and premmissions package ,connected with firebase,and more other features.`,
    imageUrl: image23,
    url: 'https://test.board.syria-way.com/',
    tags: ['Laravel', 'RBAC', 'Firebase', 'Security', 'Payments', 'Admin Dashboard'],
  },
  {
    id: 20,
    title: 'Not Found Agency (company website)',
    description: `in this project create appointment booking system using Laravel , includes appointment booking and show avaliable times and book in automatic way and send remonders emails when meeting date is close and send email with meeting link, and contact us form with pdf attachment, and admin dashboard to the entire website design,SEO optimization.`,
    imageUrl: image14,
    url: 'https://notfound-agency.com/',
    tags: ['Laravel', 'Bookings', 'Email Automation', 'SEO', 'PDF'],
  },
  {
    id: 30,
    title: 'Chat app (Messenger clone) using PHP',
    description: `in this project   SSE(server side events) to make real time chat app using php, jquery and ajax, includes chat system like messenger,send and recieve messages and seen and un seen messages and delete messages.`,
    imageUrl: image15,
    url: 'https://github.com/yousef2002307/chatapp.git',
    tags: ['PHP', 'SSE', 'Real-time', 'jQuery', 'AJAX'],
  },
  {
    id: 8,
    title: 'Advanced Ecommerce (Rabeemall)',
    description: `integration with fawry pay and paymob and pay in installments with Vulu,Scout search,and polymorphic relation and SEO optimization and classic ecommerce features(cart,orders,etc).`,
    imageUrl: image8,
    url: 'https://rabeamall.com/',
    tags: ['Laravel', 'E-commerce', 'Fawry', 'Paymob', 'Scout Search', 'SEO'],
  },
  {
    id: 7,
    title: 'Chat app (Messenger clone) using Laravel',
    description: `in this project used websockets and SSE(server side events) to make real time chat app using Laravel and jquery, includes chat system like messenger.`,
    imageUrl: image6,
    url: 'https://github.com/yousef2002307/chatApp-Using-Laravel.git',
    tags: ['Laravel', 'WebSockets', 'SSE', 'Real-time', 'jQuery'],
  },
  {
    id: 9,
    title: 'Quiz App',
    description: `I built a quiz app using Laravel. It includes user registration, login functionality, and an admin dashboard
for managing quizzes and users.`,
    imageUrl: image9,
    url: 'https://github.com/yousef2002307/laravel-project-quiz-app.git',
    tags: ['Laravel', 'Auth', 'Admin Dashboard'],
  },
  {
    id: 40,
    title: 'Hotel Booking Admin Dashboard (PHP)',
    description: `i built aan admin dashboard for hotel booking app using php.`,
    imageUrl: image16,
    url: 'https://github.com/yousef2002307/hotel-managment-php_project.git',
    tags: ['PHP', 'Admin Dashboard', 'Bookings'],
  },
  {
    id: 12,
    title: 'Weather App (PHP)',
    description: `I built a weather app using PHP . , dealt with external api using php Guzzle, It allows users to search for current weather conditions and get detailed information about the weather in their area.`,
    imageUrl: image11,
    url: 'https://github.com/yousef2002307/weatherAppWithPhp.git',
    tags: ['PHP', 'Guzzle', 'REST API'],
  },
  {
    id: 60,
    title: 'Shopping Cart (PHP)',
    description: `I built a shopping cart using php. It allows users to add products to their cart and checkout using paypal.`,
    imageUrl: image17,
    url: 'https://github.com/yousef2002307/shopping-cart-.git',
    tags: ['PHP', 'Cart', 'PayPal'],
  },
  {
    id: 61,
    title: 'Personal Website (WordPress)',
    description: `I built a personal website using Wordpress and Elementor and added some custom css and js. and needed plugins for the website.`,
    imageUrl: image18,
    url: 'https://drive.google.com/drive/folders/1z6ln3vr18tRBxTsDLN_yCKaicgWTuhRJ?usp=drive_link',
    tags: ['WordPress', 'Elementor', 'CSS', 'JavaScript'],
  },
  {
    id: 62,
    title: 'Company Website (WordPress)',
    description: `I built a company website using Wordpress and Elementor and added some custom css and js. and needed plugins for the website.`,
    imageUrl: image19,
    url: 'https://drive.google.com/drive/folders/1PawaqpQfqktxZQ-D5HbYMCZkizeZzj8g',
    tags: ['WordPress', 'Elementor', 'CSS', 'JavaScript'],
  },
  {
    id: 63,
    title: 'Blog Website (WordPress)',
    description: `I built a blog website using Wordpress and Gutenberg and Blocksy theme and custom taxonomies and added some custom css and js. and needed plugins for the website.`,
    imageUrl: image20,
    url: 'https://drive.google.com/drive/folders/145A4OWyFzZ0HcbGxjoF9I_ynpw9TWwJw?usp=drive_link',
    tags: ['WordPress', 'Gutenberg', 'Blocksy', 'Custom Taxonomies'],
  },
  {
    id: 133,
    title: 'TV Show Tracker App',
    description: `I built a tv show tracker app using venilla js , css and html. It allows users to search for tv shows and get detailed information about them.`,
    imageUrl: image13,
    url: 'https://helpful-tarsier-91a5be.netlify.app/',
    tags: ['Vanilla JS', 'HTML', 'CSS', 'REST API'],
  },
];

// Derive liveUrl / githubUrl for every project once, at module load.
const projects = data.map((p) => ({
  ...p,
  ...splitUrl(p.url),
}));

export default projects;

/* ------------------------------------------------------------------ */
/*  Professional dummy data — Experience & Education                  */
/* ------------------------------------------------------------------ */

export const experience = [
  {
    id: 'exp-1',
    role: 'Full-Stack Developer',
    company: 'Freelancing',
    period: 'Feb 2024 - Now',
    location: '',
    points: [
      '',
    ],
  },
  {
    id: 'exp-2',
    role: 'Backend Developer',
    company: 'Not Found Digital Agency',
    period: 'sep 2024 - May 2025',
    location: '',
    points: [
      '',
    ],
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Developer',
    company: 'Rar-it Development & Design',
    period: 'May 2025 - July 2026',
    location: 'Remote',
    points: [
      '',
    ],
  },
];

export const education = [
  {
    id: 'edu-1',
    degree: 'B.Sc. in Computer Science',
    institution: 'Faculty of Computers and Artificial Intelligence - Benha University',
    period: '2020 — 2024',
    details:
      'Graduated with GPA = 3.53. Focused on software engineering, databases, algorithms, and web technologies. Foundation for a backend & full-stack career.',
  },
  {
    id: 'edu-2',
    degree: 'Full Stack (PHP | React.js) Certificate',
    institution: 'ITI (Information Technology Institute)',
    period: 'Jul 2024',
    details:
      'Full Stack Web Development certification focusing on PHP, React.js, modern web standards, and full-stack software architecture.',
  },
  {
    id: 'edu-3',
    degree: 'Docker & Kubernetes: Production-Grade Containerization & Orchestration',
    institution: 'Udemy',
    period: 'Nov 2025 — Feb 2026',
    details:
      'Comprehensive training in containerization with Docker and container orchestration using Kubernetes for production environment deployment.',
  },
  {
    id: 'edu-4',
    degree: 'Mastering CI/CD with GitHub Actions: Automate, Test, Deploy',
    institution: 'Udemy',
    period: 'Apr 2026 — Jun 2026',
    details:
      'Specialized course in building automated CI/CD pipelines, automated testing, and deployment workflows with GitHub Actions.',
  },
];

export const certificatesUrl =
  'https://drive.google.com/drive/folders/1i_d6fvEzIgMQ_HnBIi1mD4TsHQ2VvZ0U?usp=drive_link';
