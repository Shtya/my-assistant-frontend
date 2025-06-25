const Nextjs = [
    {
        id: '1',
        category: 'Next JS',
        question: 'What Is Next.js?',
        answer: 'Next.js is a React framework designed to create highly optimized, SEO-friendly, and user-centric static websites and web applications. It provides an exceptional developer experience for building production-ready applications, complete with all the necessary features.',
        recap: 'إطار عمل React لبناء مواقع وتطبيقات ويب سريعة وصديقة لمحركات البحث',
        tags: ['Fundamentals'],
        dateAdded: '2023-10-15',
    },
    {
        id: '2',
        category: 'Next JS',
        question: 'What Is Next.js Used for?',
        answer: 'Next.js is commonly used to create:<br>- E-commerce platforms<br>- Marketing sites<br>- Landing pages<br>- Dashboards<br>- Blogs<br>- Applications requiring server-side rendering or static site generation',
        recap: 'يستخدم لمواقع التجارة الإلكترونية، التسويق، الصفحات المقصودة، والتطبيقات الديناميكية',
        tags: ['Fundamentals'],
        dateAdded: '2023-10-15',
    },
    {
        id: '3',
        category: 'Next JS',
        question: 'What Is the Difference Between Next.js and React.js?',
        answer: '<table><tr><th>Feature</th><th>Next.js</th><th>React.js</th></tr><tr><td>Type</td><td>Full-stack framework</td><td>UI library</td></tr><tr><td>Routing</td><td>File-system based</td><td>Requires React Router</td></tr><tr><td>SSR/SSG</td><td>Built-in</td><td>Requires setup</td></tr><tr><td>API Routes</td><td>Included</td><td>Requires backend</td></tr></table>',
        recap: 'Next.js إطار عمل كامل بينما React مكتبة واجهة مستخدم فقط',
        tags: ['Comparisons'],
        dateAdded: '2023-10-15',
    },
    {
        id: '4',
        category: 'Next JS',
        question: 'Is Next.js Back-End, Front-End, or Full-Stack?',
        answer: 'Next.js is considered full-stack because it allows both client-side and server-side rendering, API routes, and can handle both front-end and back-end functionality.',
        recap: 'يعتبر Next.js إطار عمل كامل (Full-Stack) يدعم كلا من الواجهة والخلفية',
        tags: ['Architecture'],
        dateAdded: '2023-10-15',
    },
    {
        id: '5',
        category: 'Next JS',
        question: 'What Is the Process of Installing Next.js?',
        answer: '<pre><code>npx create-next-app@latest\n# or\nyarn create next-app\n\ncd your-project-name\nnpm run dev</code></pre>',
        recap: 'تثبيت Next.js باستخدام npx أو yarn ثم تشغيله',
        tags: ['Setup'],
        dateAdded: '2023-10-15',
    },
    {
        id: '6',
        category: 'Next JS',
        question: 'What Are the Features of Next.js?',
        answer: 'Key features include:<br>- Built-in CSS Support<br>- File-system Routing<br>- Image Optimization<br>- Incremental Static Regeneration (ISR)<br>- Fast Refresh<br>- SEO Optimization<br>- TypeScript Support',
        recap: 'مميزات Next.js تشمل التوجيه التلقائي، تحسين الصور، التوليد الثابت التدريجي',
        tags: ['Features'],
        dateAdded: '2023-10-15',
    },
    {
        id: '7',
        category: 'Next JS',
        question: 'Why Use Create Next App?',
        answer: 'Benefits include:<br>- Rapid Project Initialization<br>- User-Friendly Setup<br>- Zero Dependencies<br>- Offline Functionality<br>- Pre-built Examples<br>- Reliability Through Testing',
        recap: 'أداة Create Next App توفر إعدادًا سريعًا وسهلًا لمشاريع Next.js',
        tags: ['Setup'],
        dateAdded: '2023-10-15',
    },
    {
        id: '8',
        category: 'Next JS',
        question: 'What Is Next.js Routing?',
        answer: 'Next.js uses file-system based routing where routes are automatically created based on the structure of the pages directory. This approach simplifies navigation by mapping files directly to routes.',
        recap: 'توجيه Next.js يعتمد على نظام الملفات حيث يتم إنشاء المسارات تلقائيًا',
        tags: ['Routing'],
        dateAdded: '2023-10-15',
    },
    {
        id: '9',
        category: 'Next JS',
        question: 'What Are the Types of Routes in Next.js?',
        answer: 'Route types:<br>- Static Routes (pages/index.js)<br>- Nested Routes (pages/blog/first-post.js)<br>- Dynamic Routes (pages/blog/[slug].js)<br>- API Routes (pages/api/hello.js)',
        recap: 'أنواع المسارات: ثابتة، متداخلة، ديناميكية، وواجهات برمجة التطبيقات',
        tags: ['Routing'],
        dateAdded: '2023-10-15',
    },
    {
        id: '10',
        category: 'Next JS',
        question: 'What Methods Can You Use to Pass Data Between Pages in Next.js?',
        answer: 'Methods include:<br>- Using Link component with query params<br>- Context API<br>- State management libraries (Redux, Zustand)<br>- URL params<br>- Server-side props',
        recap: 'نقل البيانات بين الصفحات باستخدام Link، Context API، أو إدارة الحالة',
        tags: ['Data Management'],
        dateAdded: '2023-10-15',
    },
    {
        id: '11',
        category: 'Next JS',
        question: 'Explain the Concept of Dynamic Routing in Next.js',
        answer: 'Dynamic routing allows generating routes based on data that can change over time. Pages are created dynamically using square brackets syntax like [id].js, enabling URLs like /posts/1 or /posts/2 to use the same template.',
        recap: 'التوجيه الديناميكي يسمح بإنشاء مسارات بناءً على بيانات متغيرة',
        tags: ['Routing'],
        dateAdded: '2023-10-15',
    },
    {
        id: '12',
        category: 'Next JS',
        question: 'What Is Meant by Styled JSX in Next.js?',
        answer: "Styled JSX is a CSS-in-JS solution built into Next.js that enables component-level styling with scoped CSS that doesn't interfere with other components.",
        recap: 'Styled JSX هو حل CSS-in-JS مدمج في Next.js لنمط المكونات',
        tags: ['Styling'],
        dateAdded: '2023-10-15',
    },
    {
        id: '13',
        category: 'Next JS',
        question: 'What Is Client-Side Rendering?',
        answer: 'Client-Side Rendering (CSR) uses JavaScript to render content in the browser after the initial page load. The server sends minimal HTML and JavaScript which then renders the content on the client side.',
        recap: 'التقديم من جانب العميل يعرض المحتوى في المتصفح بعد التحميل الأولي',
        tags: ['Rendering'],
        dateAdded: '2023-10-15',
    },
    {
        id: '14',
        category: 'Next JS',
        question: 'What Are Environment Variables in Next.js?',
        answer: 'Environment variables manage configuration settings across environments. Next.js supports:<br>- serverRuntimeConfig (server-only)<br>- publicRuntimeConfig (client-accessible)<br>Configured in next.config.js',
        recap: 'متغيرات البيئة تدير إعدادات التكوين عبر بيئات مختلفة',
        tags: ['Configuration'],
        dateAdded: '2023-10-15',
    },
    {
        id: '15',
        category: 'Next JS',
        question: 'What Is Static Site Generation in Next.js?',
        answer: "SSG generates HTML at build time which is reused on each request. Ideal for content that doesn't change frequently like blogs, marketing pages, and documentation.",
        recap: 'التوليد الثابت ينشئ HTML أثناء البناء لصفحات لا تتغير كثيراً',
        tags: ['Rendering'],
        dateAdded: '2023-10-15',
    },
    {
        id: '16',
        category: 'Next JS',
        question: 'What Is the Difference Between Next.js and Create React App?',
        answer: '<table><tr><th>Feature</th><th>Next.js</th><th>Create React App</th></tr><tr><td>Rendering</td><td>SSR/SSG/CSR</td><td>CSR only</td></tr><tr><td>Routing</td><td>Built-in</td><td>Needs React Router</td></tr><tr><td>API Routes</td><td>Built-in</td><td>Needs backend</td></tr></table>',
        recap: 'Next.js يوفر ميزات أكثر من Create React App مثل SSR والمسارات المدمجة',
        tags: ['Comparisons'],
        dateAdded: '2023-10-15',
    },
    {
        id: '17',
        category: 'Next JS',
        question: 'How Do You Handle Data Fetching in Next.js?',
        answer: 'Data fetching methods:<br>- getStaticProps (SSG)<br>- getStaticPaths (dynamic SSG)<br>- getServerSideProps (SSR)<br>- Client-side fetching (useEffect/SWR)',
        recap: 'جلب البيانات في Next.js باستخدام getStaticProps أو getServerSideProps أو جلب العميل',
        tags: ['Data Fetching'],
        dateAdded: '2023-10-15',
    },
    {
        id: '18',
        category: 'Next JS',
        question: 'What Is the Purpose of the _app.js File in Next.js?',
        answer: "_app.js is the root component that initializes pages. It's used for:<br>- Persisting layout between page changes<br>- Keeping state when navigating<br>- Injecting additional data into pages<br>- Adding global CSS",
        recap: 'ملف _app.js هو المكون الجذر الذي يقوم بتهيئة الصفحات في Next.js',
        tags: ['Structure'],
        dateAdded: '2023-10-15',
    },
    {
        id: '19',
        category: 'Next JS',
        question: 'What Are the Main Scripts in Next.js?',
        answer: 'Key scripts in package.json:<br>- dev: Runs development server (next dev)<br>- build: Creates optimized production build (next build)<br>- start: Starts production server (next start)',
        recap: 'الأوامر الرئيسية في Next.js: dev، build، start',
        tags: ['Scripts'],
        dateAdded: '2023-10-15',
    },
    {
        id: '20',
        category: 'Next JS',
        question: 'What Is the Purpose of the getStaticPaths Function in Next.js?',
        answer: 'getStaticPaths specifies which dynamic routes should be pre-rendered at build time. It returns:<br>- paths: Array of objects with params for each route<br>- fallback: Controls behavior for non-pre-rendered paths',
        recap: 'getStaticPaths تحدد المسارات الديناميكية التي يجب تقديمها مسبقًا أثناء البناء',
        tags: ['Intermediate'],
        dateAdded: '2023-10-15',
    },
    {
        id: '21',
        category: 'Next JS',
        question: 'How Do You Work With Custom Server Middleware in Next.js?',
        answer: 'Create a custom server (server.js) using Express or similar framework to add middleware for handling requests before they reach Next.js routes.',
        recap: 'إنشاء خادم مخصص باستخدام Express لإضافة وسيط مخصص',
        tags: ['Server'],
        dateAdded: '2023-10-15',
    },
    {
        id: '22',
        category: 'Next JS',
        question: 'What Is the Purpose of the useEffect Hook in React, and How Does It Relate to Next.js?',
        answer: "useEffect manages side effects in functional components. In Next.js, it's used for client-side operations like data fetching after initial render since it only runs on the client.",
        recap: 'useEffect يُستخدم للعمليات من جانب العميل في Next.js بعد التقديم الأولي',
        tags: ['React'],
        dateAdded: '2023-10-15',
    },
    {
        id: '23',
        category: 'Next JS',
        question: 'What Do You Understand by Code Splitting in Next.js?',
        answer: 'Code splitting automatically divides JavaScript into smaller chunks loaded on-demand, improving performance by only loading necessary code for the current page.',
        recap: 'تقسيم الشفرة يقسم JavaScript إلى أجزاء أصغر يتم تحميلها عند الحاجة',
        tags: ['Performance'],
        dateAdded: '2023-10-15',
    },
    {
        id: '24',
        category: 'Next JS',
        question: 'How Do You Optimize the Performance of a Next.js Application?',
        answer: 'Optimization techniques:<br>- Use Image component<br>- Implement code splitting<br>- Enable compression<br>- Use ISR<br>- Lazy load components<br>- Optimize API calls<br>- Use CDN',
        recap: 'تحسين الأداء باستخدام مكون الصورة، تقسيم الشفرة، التحميل البطيء',
        tags: ['Performance'],
        dateAdded: '2023-10-15',
    },
    {
        id: '25',
        category: 'Next JS',
        question: 'Explain the Purpose of the getServerSideProps Function',
        answer: "getServerSideProps fetches data on each request for server-side rendering. It's ideal for pages needing real-time data or frequent updates.",
        recap: 'getServerSideProps يجلب البيانات في كل طلب للتقديم من جانب الخادم',
        tags: ['Data Fetching'],
        dateAdded: '2023-10-15',
    },
    {
        id: '26',
        category: 'Next JS',
        question: 'What is the Purpose of the next.config.js Excludes Property?',
        answer: "The excludes property specifies files/directories to exclude from Next.js's default code splitting and bundling processes.",
        recap: 'خاصية excludes تستبعد ملفات/مجلدات من تقسيم الشفرة الافتراضي',
        tags: ['Configuration'],
        dateAdded: '2023-10-15',
    },
    {
        id: '27',
        category: 'Next JS',
        question: 'Explain the Purpose of the next.config.js Headers Property',
        answer: 'The headers property defines custom HTTP headers for responses, managing caching policies, security settings, and other response behaviors.',
        recap: 'خاصية headers تحدد رؤوس HTTP مخصصة للاستجابات',
        tags: ['Configuration'],
        dateAdded: '2023-10-15',
    },
    {
        id: '28',
        category: 'Next JS',
        question: 'What is the Purpose of the next.config.js Experimental Property?',
        answer: "The experimental property enables pre-release features and advanced configurations that aren't yet stable or officially released.",
        recap: 'خاصية experimental تمكن ميزات ما قبل الإصدار والتكوينات المتقدمة',
        tags: ['Configuration'],
        dateAdded: '2023-10-15',
    },
    {
        id: '29',
        category: 'Next JS',
        question: 'What is the Purpose of the next.config.js Redirects Property?',
        answer: 'The redirects property sets up server-side redirects for incoming requests without relying on client-side routing.',
        recap: 'خاصية redirects تنشئ تحويلات من جانب الخادم للطلبات الواردة',
        tags: ['Configuration'],
        dateAdded: '2023-10-15',
    },
    {
        id: '30',
        category: 'Next JS',
        question: 'What is the Purpose of the next.config.js Rewrites Property?',
        answer: 'The rewrites property customizes request handling without changing the URL seen by the client, useful for URL redirection and content delivery.',
        recap: 'خاصية rewrites تخصص معالجة الطلبات دون تغيير عنوان URL',
        tags: ['Configuration'],
        dateAdded: '2023-10-15',
    },
    {
        id: '31',
        category: 'Next JS',
        question: 'Describe Scenarios Where You Would Choose to Use getStaticProps Over getServerSideProps and Vice Versa',
        answer: 'Use getStaticProps for:<br>- Static content (blogs, docs)<br>- High traffic sites<br>Use getServerSideProps for:<br>- Real-time data<br>- User-specific content<br>- Frequently updated pages',
        recap: 'استخدم getStaticProps للمحتوى الثابت وgetServerSideProps للبيانات في الوقت الحقيقي',
        tags: ['Rendering'],
        dateAdded: '2023-10-15',
    },
    {
        id: '32',
        category: 'Next JS',
        question: 'Explain the Purpose of the Next Export Command',
        answer: 'next export generates a static HTML version of your app for deployment without a Node.js server. Limitations:<br>- No SSR<br>- Limited dynamic routes',
        recap: 'أمر next export ينشئ نسخة HTML ثابتة للتطبيق بدون خادم Node.js',
        tags: ['Deployment'],
        dateAdded: '2023-10-15',
    },
    {
        id: '33',
        category: 'Next JS',
        question: 'What Is the Difference Between an App Router and a Pages Router?',
        answer: '<table><tr><th>Feature</th><th>App Router</th><th>Pages Router</th></tr><tr><td>Rendering</td><td>Server Components</td><td>Client-side</td></tr><tr><td>Layouts</td><td>Nested layouts</td><td>Manual</td></tr><tr><td>Streaming</td><td>Supported</td><td>Limited</td></tr></table>',
        recap: 'موجه التطبيق يوفر ميزات أكثر تقدمًا من موجه الصفحات',
        tags: ['Routing'],
        dateAdded: '2023-10-15',
    },
    {
        id: '34',
        category: 'Next JS',
        question: 'Explain the Purpose of the publicRuntimeConfig and serverRuntimeConfig Options in Next.js',
        answer: 'Configuration options:<br>- serverRuntimeConfig: Server-only values (API keys)<br>- publicRuntimeConfig: Client-accessible values (endpoints)<br>Set in next.config.js and accessed via getConfig()',
        recap: 'publicRuntimeConfig للقيم العامة وserverRuntimeConfig للقيم السرية من جانب الخادم',
        tags: ['Configuration'],
        dateAdded: '2023-10-15',
    },
    {
        id: '35',
        category: 'Next JS',
        question: 'Explain Image Optimization in Next.js',
        answer: 'The Image component automatically:<br>- Optimizes images<br>- Lazy loads<br>- Resizes for different viewports<br>- Supports placeholders<br>Properties control loading, size, layout, and quality.',
        recap: 'مكون Image يحسن الصور تلقائيًا مع التحميل البطيء والتغيير حسب الحجم',
        tags: ['Optimization'],
        dateAdded: '2023-10-15',
    },
    {
        id: '36',
        category: 'Next JS',
        question: 'What are Cross-Origin Requests (CORS)?',
        answer: 'CORS is a security feature controlling which origins can access server resources. It uses HTTP headers to manage cross-origin requests and prevent unauthorized access.',
        recap: 'CORS هي ميزة أمان تتحكم في المصادر التي يمكنها الوصول إلى الموارد',
        tags: ['Security'],
        dateAdded: '2023-10-15',
    },
    {
        id: '37',
        category: 'Next JS',
        question: 'Why Do You Need CORS With Next.js?',
        answer: 'Next.js APIs follow same-origin policy by default. CORS is needed when accessing APIs from different domains to enable cross-origin requests with proper headers.',
        recap: 'CORS مطلوب للوصول إلى واجهات برمجة التطبيقات من نطاقات مختلفة',
        tags: ['Security'],
        dateAdded: '2023-10-15',
    },
    {
        id: '38',
        category: 'Next JS',
        question: 'How Would You Approach Migrating a Traditional React App to Next.js?',
        answer: 'Migration steps:<br>1. Set up Next.js<br>2. Move components<br>3. Adjust routing<br>4. Handle state management<br>5. Test thoroughly',
        recap: 'هجرة تطبيق React إلى Next.js تتضمن إعداد، نقل المكونات، ضبط التوجيه والاختبار',
        tags: ['Migration'],
        dateAdded: '2023-10-15',
    },
    {
        id: '39',
        category: 'Next JS',
        question: 'What Strategies Do You Use to Ensure a Secure Next.js Application?',
        answer: 'Security strategies:<br>- Use HTTPS<br>- Implement auth (JWT)<br>- Protect against XSS/CSRF<br>- Secure HTTP headers<br>- Sanitize inputs<br>- Environment variables for secrets',
        recap: 'استراتيجيات الأمان تشمل HTTPS، المصادقة، وحماية ضد الثغرات الشائعة',
        tags: ['Security'],
        dateAdded: '2023-10-15',
    },
    {
        id: '40',
        category: 'Next JS',
        question: 'How Would You Implement Server-Side Rendering (SSR) for a Next.js Page?',
        answer: 'Implement SSR by:<br>1. Creating page component<br>2. Exporting getServerSideProps<br>3. Fetching data inside it<br>4. Returning props<br>5. Using props in component',
        recap: 'تنفيذ SSR باستخدام getServerSideProps لجلب البيانات في كل طلب',
        tags: ['Rendering'],
        dateAdded: '2023-10-15',
    },
    {
        id: '41',
        category: 'Next JS',
        question: 'What is Docker Image in Next.js?',
        answer: 'A Docker image packages a Next.js app with its code, runtime, and dependencies into a portable container that runs consistently across environments.',
        recap: 'صورة Docker تحزم تطبيق Next.js لتشغيل متناسق عبر البيئات',
        tags: ['Deployment'],
        dateAdded: '2023-10-15',
    },
    {
        id: '42',
        category: 'Next JS',
        question: 'How Do You Handle Error Pages in Next.js?',
        answer: 'Create pages/_error.js to handle errors universally. It receives statusCode prop and can display custom error messages based on error type.',
        recap: 'يتم التعامل مع صفحات الأخطاء باستخدام pages/_error.js',
        tags: ['Error Handling'],
        dateAdded: '2023-10-15',
    },
    {
        id: '43',
        category: 'Next JS',
        question: 'Explain the Importance of Code Splitting in Next.js',
        answer: 'Code splitting improves performance by:<br>- Reducing initial load size<br>- Loading only necessary code<br>- Faster parsing/execution<br>- Better caching<br>- Modern development practices',
        recap: 'تقسيم الشفرة يحسن الأداء عن طريق تقليل حجم التحميل الأولي',
        tags: ['Performance'],
        dateAdded: '2023-10-15',
    },
    {
        id: '44',
        category: 'Next JS',
        question: 'How to Setup CDN in Next.js?',
        answer: 'Configure CDN using assetPrefix in next.config.js:<br>- Set base URL for assets<br>- Can be environment-specific<br>- Applies to all static assets',
        recap: 'إعداد CDN باستخدام assetPrefix في next.config.js',
        tags: ['Performance'],
        dateAdded: '2023-10-15',
    },
    {
        id: '45',
        category: 'Next JS',
        question: 'What Is Serverless Architecture, and How Does It Relate to Next.js?',
        answer: 'Serverless architecture runs apps without managing infrastructure. Next.js can be deployed on serverless platforms like AWS Lambda for automatic scaling and efficient resource use.',
        recap: 'البنية الخادمية تشغل التطبيقات دون إدارة البنية التحتية',
        tags: ['Architecture'],
        dateAdded: '2023-10-15',
    },
    {
        id: '46',
        category: 'Next JS',
        question: 'Explain How to Internationalize a Next.js Application to Support Multiple Languages',
        answer: 'Next.js supports i18n routing natively since v10. Configure locales in next.config.js. Automatic detection uses Accept-Language header and domain, with redirects to appropriate locale.',
        recap: 'يدعم Next.js التوجيه الدولي المدمج للغات المتعددة',
        tags: ['Internationalization'],
        dateAdded: '2023-10-15',
    },
    {
        id: '47',
        category: 'Next JS',
        question: "Explain the Concept of 'Prefetching' in Next.js and How It Impacts Performance",
        answer: "Prefetching automatically downloads linked pages' assets in background. Benefits:<br>- Faster navigation<br>- Smoother UX<br>- Balanced server load<br>- Intelligent loading (viewport/idle time)",
        recap: 'الجلب المسبق يحسن الأداء عن طريق تحميل أصول الصفحات مسبقًا',
        tags: ['Performance'],
        dateAdded: '2023-10-15',
    },
    {
        id: '48',
        category: 'Next JS',
        question: 'Explain Next.js Authentication',
        answer: 'Authentication process:<br>1. User accesses secure page<br>2. Credentials submission<br>3. Verification (NextAuth.js/Passport.js)<br>4. Session creation<br>5. Access granted/denied<br>6. Optional middleware',
        recap: 'المصادقة في Next.js تتضمن التحقق من الهوية وإنشاء الجلسة',
        tags: ['Authentication'],
        dateAdded: '2023-10-15',
    },
    {
        id: '49',
        category: 'Next JS',
        question: 'What Is the Difference Between Authentication and Authorization?',
        answer: '<table><tr><th>Aspect</th><th>Authentication</th><th>Authorization</th></tr><tr><td>Purpose</td><td>Verify identity</td><td>Control access</td></tr><tr><td>Next.js Implementation</td><td>Login flows, session mgmt</td><td>Protected routes, permissions</td></tr></table>',
        recap: 'المصادقة للتحقق من الهوية، التفويض للتحكم في الوصول',
        tags: ['Security'],
        dateAdded: '2023-10-15',
    },
    {
        id: '50',
        category: 'Next JS',
        question: 'Explain Incremental Static Regeneration (ISR) in Next.js',
        answer: 'ISR combines SSG and SSR by:<br>- Generating static pages with periodic updates<br>- No full rebuild needed<br>- First request generates page (like SSR)<br>- Subsequent requests use cached version<br>- Background regeneration when stale',
        recap: 'ISR يجمع بين مزايا SSG و SSR مع تحديثات تدريجية',
        tags: ['Rendering'],
        dateAdded: '2023-10-15',
    },
];

const Reactjs = [
    {
        id: 'react-hooks-1',
        category: 'React JS',
        question: 'Explain all essential React Hooks with practical examples, including: (1) Purpose, (2) Code Example, (3) When to Use, (4) Common Mistakes, and (5) Performance Tips.',
        answer: `
  <h2>Core React Hooks</h2>

  <h3>1. useState</h3>
  <p><b>Purpose</b>: Manage local component state.</p>
  <pre><code>// Counter example
function Counter() {
  const [count, setCount] = useState(0); // Initialize with 0

  return (
    &lt;div&gt;
      &lt;button onClick={() => setCount(c => c + 1)}&gt;
        Count: {count}
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
  <p><b>When to Use</b>: Form inputs, UI toggle states, simple counters.</p>
  <p><b>Mistakes</b>: Mutating state directly (<code>count++</code>), using for complex state.</p>
  <p><b>Performance</b>: For frequent updates, use functional updates (<code>setCount(c => c + 1)</code>).</p>

  <h3>2. useEffect</h3>
  <p><b>Purpose</b>: Side effects (data fetching, subscriptions).</p>
  <pre><code>// Data fetching
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(\`/api/users/\${userId}\`);
      setUser(await res.json());
    };
    fetchUser();
  }, [userId]); // Re-run when userId changes

  return &lt;div&gt;{user?.name}&lt;/div&gt;;
}</code></pre>
  <p><b>When to Use</b>: API calls, event listeners, timers.</p>
  <p><b>Mistakes</b>: Missing dependencies, infinite loops, no cleanup.</p>
  <p><b>Performance</b>: Add empty dependency array (<code>[]</code>) for mount-only effects.</p>

  <h3>3. useContext</h3>
  <p><b>Purpose</b>: Access context without prop drilling.</p>
  <pre><code>// Theme context
const ThemeContext = createContext('light');

function App() {
  return (
    &lt;ThemeContext.Provider value="dark"&gt;
      &lt;Toolbar /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext); // 'dark'
  return &lt;div className={theme}&gt;...&lt;/div&gt;;
}</code></pre>
  <p><b>When to Use</b>: Global themes, auth state, localization.</p>
  <p><b>Mistakes</b>: Overusing context for local state.</p>
  <p><b>Performance</b>: Memoize context value with <code>useMemo</code> if needed.</p>

  <h3>4. useRef</h3>
  <p><b>Purpose</b>: Mutable values persisting across renders.</p>
  <pre><code>// Focus input on mount
function SearchBox() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // DOM access
  }, []);

  return &lt;input ref={inputRef} /&gt;;
}</code></pre>
  <p><b>When to Use</b>: DOM access, storing previous values, timers.</p>
  <p><b>Mistakes</b>: Mutating refs during render.</p>
  <p><b>Performance</b>: Safer than <code>useState</code> for non-rendering values.</p>

  <h3>5. useReducer</h3>
  <p><b>Purpose</b>: Complex state logic.</p>
  <pre><code>// Todo list
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { text: action.text, done: false }];
    case 'TOGGLE':
      return state.map((t, i) => 
        i === action.index ? { ...t, done: !t.done } : t
      );
    default:
      return state;
  }
};

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    &lt;div&gt;
      {todos.map((todo, i) => (
        &lt;div key={i} onClick={() => dispatch({ type: 'TOGGLE', index: i })}&gt;
          {todo.text}
        &lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
}</code></pre>
  <p><b>When to Use</b>: Forms with multiple fields, state machines.</p>
  <p><b>Mistakes</b>: Overkill for simple state.</p>
  <p><b>Performance</b>: Better than multiple <code>useState</code> for related state.</p>

  <h3>6. useMemo</h3>
  <p><b>Purpose</b>: Memoize expensive calculations.</p>
  <pre><code>// Filtered list
function UserList({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]); // Recompute when deps change

  return &lt;List items={filteredUsers} /&gt;;
}</code></pre>
  <p><b>When to Use</b>: Heavy computations, derived state.</p>
  <p><b>Mistakes</b>: Memoizing everything, incorrect dependencies.</p>
  <p><b>Performance</b>: Only use when computation > 1ms.</p>

  <h3>7. useCallback</h3>
  <p><b>Purpose</b>: Memoize functions to prevent unnecessary re-renders.</p>
  <pre><code>// Memoized handler
function ProductPage({ productId }) {
  const handleAddToCart = useCallback(() => {
    addToCart(productId);
  }, [productId]); // Recreate when productId changes

  return &lt;AddToCartButton onClick={handleAddToCart} /&gt;;
}</code></pre>
  <p><b>When to Use</b>: Passing callbacks to optimized child components.</p>
  <p><b>Mistakes</b>: Overusing without actual performance benefit.</p>
  <p><b>Performance</b>: Use with <code>React.memo</code> children.</p>

  <h2>Additional Hooks</h2>
  <table border="1">
    <tr><th>Hook</th><th>Purpose</th><th>Example Use Case</th></tr>
    <tr><td>useLayoutEffect</td><td>Like useEffect but fires before paint</td><td>Measure DOM elements</td></tr>
    <tr><td>useDebugValue</td><td>Label custom hooks in DevTools</td><td>Debugging complex hooks</td></tr>
    <tr><td>useImperativeHandle</td><td>Customize ref exposure</td><td>Exposing focus() method</td></tr>
    <tr><td>useId</td><td>Generate unique IDs</td><td>Accessibility attributes</td></tr>
  </table>

  <h2>Rules of Hooks</h2>
  <ul>
    <li>Only call hooks at the top level (not in loops/conditions)</li>
    <li>Only call hooks from React functions (components/custom hooks)</li>
    <li>Prefix custom hooks with "use" (e.g., <code>useLocalStorage</code>)</li>
  </ul>`,
        'recap-ar': '',
        tags: ['react', 'hooks', 'performance'],
        dateAdded: '',
    },
    {
        id: '51',
        category: 'React JS',
        question: 'What are custom hooks in React?',
        answer: "Custom hooks are normal JavaScript functions whose names start with 'use', and they may call other hooks. We use custom hooks to maintain the DRY concept, which is Don't Repeat Yourself. It helps us to write a logic once and use it anywhere in the code. Some commonly used custom hooks are:<br><br><b>useFetch</b>: Used for making API requests and handling loading and error states.<br><b>useLocalStorage</b>: Stores and retrieves values from localStorage to persist data between sessions.<br><b>useDebounce</b>: Used to delay a function execution until after a specified wait time (useful for search input).<br><b>usePrevious</b>: Stores the previous value of a state or prop before the component re-renders.<br><b>useToggle</b>: A simple hook to toggle a boolean state.",
        recap_ar: '',
        tags: ['React Basics'],
        dateAdded: '',
    },
    {
        id: '52',
        category: 'React JS',
        question: 'How to optimize a React code?',
        answer: 'We can improve our React code by following these practices:<br><br>- Using binding functions in constructors<br>- Eliminating the use of inline attributes as they slow the process of loading<br>- Avoiding extra tags by using React fragments<br>- Lazy loading',
        recap_ar: '',
        tags: ['React Optimization'],
        dateAdded: '',
    },
    {
        id: '53',
        category: 'React JS',
        question: 'What is the difference between useRef and createRef in React?',
        answer: '<b>useRef</b>: It is a type of hook used in functional components. It saves its value between re-renders and returns a mutable ref object.<br><b>createRef</b>: It is a function used in class components. It creates a new ref for every re-render and returns a new ref object each time.',
        recap_ar: '',
        tags: ['React Refs'],
        dateAdded: '',
    },
    {
        id: '54',
        category: 'React JS',
        question: 'What is React Redux?',
        answer: 'React Redux is a state management tool that makes it easier to pass states from one component to another irrespective of their position in the component tree, preventing the complexity of the application.',
        recap_ar: '',
        tags: ['State Management'],
        dateAdded: '',
    },
    {
        id: '55',
        category: 'React JS',
        question: 'What are the benefits of using react-redux?',
        answer: 'Benefits include:<br>- Centralized state management (single store for the whole application)<br>- Optimizes performance by preventing re-rendering of components<br>- Easier debugging<br>- Persistent state management for long-term data storage',
        recap_ar: '',
        tags: ['State Management'],
        dateAdded: '',
    },
    {
        id: '56',
        category: 'React JS',
        question: 'Explain the core components of react-redux.',
        answer: 'Core components are:<br><b>Redux Store</b>: Holds the application state<br><b>Action Creators</b>: Functions that return actions<br><b>Actions</b>: Objects with type and payload properties<br><b>Reducers</b>: Pure functions that update the state in response to actions',
        recap_ar: '',
        tags: ['State Management'],
        dateAdded: '',
    },
    {
        id: '57',
        category: 'React JS',
        question: 'How can we combine multiple reducers in React?',
        answer: "Use the <b>combineReducers</b> function from Redux to merge multiple reducers into a single root reducer:<br><pre><code>import { combineReducers } from 'redux';\nconst rootReducer = combineReducers({\n  books: BooksReducer,\n  activeBook: ActiveBook\n});</code></pre>",
        recap_ar: '',
        tags: ['State Management'],
        dateAdded: '',
    },
    {
        id: '58',
        category: 'React JS',
        question: 'What is context API?',
        answer: "Context API is used to pass global variables anywhere in the code. It helps when sharing state between many nested components. It's lightweight and doesn't require third-party libraries like Redux. It has two properties: <b>Provider</b> and <b>Consumer</b>.",
        recap_ar: '',
        tags: ['React Context'],
        dateAdded: '',
    },
    {
        id: '59',
        category: 'React JS',
        question: 'Explain provider and consumer in ContextAPI?',
        answer: '<b>Provider</b>: Acts as a parent component that passes the state to its children.<br><b>Consumer</b>: Uses the state provided by the nearest Provider.',
        recap_ar: '',
        tags: ['React Context'],
        dateAdded: '',
    },
    {
        id: '60',
        category: 'React JS',
        question: 'Explain CORS in React.Axios',
        answer: 'Cross-Origin Resource Sharing (CORS) allows making requests to servers at different domains. In React, you can set up CORS using:<br>1. Axios<br>2. Fetch API',
        recap_ar: '',
        tags: ['React Networking'],
        dateAdded: '',
    },
    {
        id: '61',
        category: 'React JS',
        question: 'What is axios and how to use it in React?',
        answer: "Axios is a library for sending HTTP requests to REST endpoints. Install it with:<br><pre><code>npm i axios</code></pre><br>Example usage:<br><pre><code>axios.get('https://api.example.com/data')\n  .then(response => console.log(response.data));</code></pre>",
        recap_ar: '',
        tags: ['React Networking'],
        dateAdded: '',
    },
    {
        id: '62',
        category: 'React JS',
        question: 'Write a program to create a counter with increment and decrement.',
        answer: "<pre><code>import React, { useState } from 'react';\n\nconst App = () => {\n  const [counter, setCounter] = useState(0);\n  const handleIncrement = () => setCounter(counter + 1);\n  const handleDecrement = () => setCounter(counter - 1);\n\n  return (\n    <div>\n      <div>{counter}</div>\n      <button onClick={handleIncrement}>Increment</button>\n      <button onClick={handleDecrement}>Decrement</button>\n    </div>\n  );\n};\n\nexport default App;</code></pre>",
        recap_ar: '',
        tags: ['React Examples'],
        dateAdded: '',
    },
    {
        id: '63',
        category: 'React JS',
        question: 'Explain why and how to update state of components using callback?',
        answer: 'Using callback with setState prevents bugs by ensuring updates are based on the previous state:<br><pre><code>this.setState(st => ({\n  stateName1: state1UpdatedValue,\n  stateName2: state2UpdatedValue\n}));</code></pre>',
        recap_ar: '',
        tags: ['React State'],
        dateAdded: '',
    },
    {
        id: '64',
        category: 'React JS',
        question: 'What is React-Material UI?',
        answer: "Material UI is a framework with predefined components for building React apps. It follows Google's Material Design and includes customizable components for creating responsive UIs.",
        recap_ar: '',
        tags: ['React UI'],
        dateAdded: '',
    },
    {
        id: '65',
        category: 'React JS',
        question: 'What is flux architecture in redux?',
        answer: "Flux is Facebook's architecture for unidirectional data flow in React apps. Actions are dispatched to stores, which then update views. Redux is inspired by Flux but simplifies it with a single store.",
        recap_ar: '',
        tags: ['Redux Architecture'],
        dateAdded: '',
    },
    {
        id: '66',
        category: 'React JS',
        question: 'Explain the useMemo hook in react?',
        answer: 'useMemo memoizes expensive calculations to optimize performance. It only recalculates when dependencies change:<br><pre><code>const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);</code></pre>',
        recap_ar: '',
        tags: ['React Hooks'],
        dateAdded: '',
    },
    {
        id: '67',
        category: 'React JS',
        question: 'Does React useState Hook update immediately?',
        answer: 'No, React batches state updates for performance. useState updates are asynchronous and applied during the next render.',
        recap_ar: '',
        tags: ['React Hooks'],
        dateAdded: '',
    },
    {
        id: '68',
        category: 'React JS',
        question: 'When to use useCallback, useMemo and useEffect?',
        answer: '<b>useEffect</b>: For side effects (data fetching, subscriptions)<br><b>useCallback</b>: To memoize functions and prevent unnecessary re-renders<br><b>useMemo</b>: To memoize expensive calculations',
        recap_ar: '',
        tags: ['React Hooks'],
        dateAdded: '',
    },
    {
        id: '69',
        category: 'React JS',
        question: 'Explain the types of router in React?',
        answer: 'React routers include:<br><b>Memory Router</b>: Keeps URL changes in memory<br><b>Browser Router</b>: Uses HTML5 history API<br><b>Hash Router</b>: Uses client-side hash routing',
        recap_ar: '',
        tags: ['React Routing'],
        dateAdded: '',
    },
    {
        id: '70',
        category: 'React JS',
        question: 'What is StrictMode in React?',
        answer: 'StrictMode is a tool for highlighting potential problems. It activates additional checks and warnings:<br><pre><code>root.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);</code></pre>',
        recap_ar: '',
        tags: ['React Development'],
        dateAdded: '',
    },
    {
        id: '71',
        category: 'React JS',
        question: 'What is Conditional Rendering in React?',
        answer: 'Conditional rendering displays components/elements based on conditions. Use cases:<br>- Show/hide elements based on auth state<br>- Display different layouts for user roles<br>- Render UI based on API responses<br>- Show loading spinners during data fetch',
        recap_ar: '',
        tags: ['React Rendering'],
        dateAdded: '',
    },
    {
        id: '72',
        category: 'React JS',
        question: 'What is React Router?',
        answer: "React Router handles navigation in SPAs, enabling multiple views without page reloads. Example:<br><pre><code>import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';\n\nconst App = () => (\n  <Router>\n    <nav>\n      <Link to='/'>Home</Link>\n      <Link to='/about'>About</Link>\n    </nav>\n    <Routes>\n      <Route path='/' element={<Home />} />\n      <Route path='/about' element={<About />} />\n    </Routes>\n  </Router>\n);</code></pre>",
        recap_ar: '',
        tags: ['React Routing'],
        dateAdded: '',
    },
    {
        id: '73',
        category: 'React JS',
        question: 'What is the difference between the React Hooks and Classes?',
        answer: "<b>Hooks</b>: Used in functional components, no 'this', useState for state, useEffect for lifecycle<br><b>Classes</b>: Use this.state, lifecycle methods (componentDidMount, etc.), more boilerplate",
        recap_ar: '',
        tags: ['React Components'],
        dateAdded: '',
    },
    {
        id: '74',
        category: 'React JS',
        question: 'How Data is passed between the React Components?',
        answer: 'Data flows via:<br>- Parent to child: Through props<br>- Child to parent: Via callback functions<br>- Sibling components: Through a common parent or context/state management',
        recap_ar: '',
        tags: ['React Data Flow'],
        dateAdded: '',
    },
    {
        id: '75',
        category: 'React JS',
        question: 'What is Lazy Loading in React?',
        answer: "Lazy loading delays component loading until needed, improving performance. Implement with React.lazy():<br><pre><code>const LazyComponent = React.lazy(() => import('./LazyComponent'));</code></pre>",
        recap_ar: '',
        tags: ['React Optimization'],
        dateAdded: '',
    },
    {
        id: '76',
        category: 'React JS',
        question: 'Explain Redux and its components.',
        answer: 'Redux manages global state with:<br><b>Store</b>: Holds application state<br><b>Actions</b>: Describe state changes<br><b>Reducers</b>: Specify how state updates in response to actions',
        recap_ar: '',
        tags: ['Redux'],
        dateAdded: '',
    },
    {
        id: '77',
        category: 'React JS',
        question: 'How React Routing is different from Conventional Routing?',
        answer: '<b>React Routing</b>: Client-side, no page reloads, dynamic component rendering<br><b>Conventional</b>: Server-side, full page reloads, static URL handling',
        recap_ar: '',
        tags: ['React Routing'],
        dateAdded: '',
    },
    {
        id: '78',
        category: 'React JS',
        question: 'How to avoid binding in ReactJS?',
        answer: 'Avoid binding by:<br>- Using arrow functions for methods<br>- Utilizing class properties (with Babel)<br>- Using Hooks in functional components',
        recap_ar: '',
        tags: ['React Binding'],
        dateAdded: '',
    },
    {
        id: '79',
        category: 'React JS',
        question: 'What are props in React?',
        answer: 'Props (properties) are read-only data passed from parent to child components. They make components reusable and dynamic.',
        recap_ar: '',
        tags: ['React Props'],
        dateAdded: '',
    },
    {
        id: '80',
        category: 'React JS',
        question: 'What is the use of CSS modules in React?',
        answer: 'CSS modules scope styles to components, preventing naming conflicts. They allow modular, maintainable styling by importing CSS as objects.',
        recap_ar: '',
        tags: ['React Styling'],
        dateAdded: '',
    },
    {
        id: '81',
        category: 'React JS',
        question: 'What are the features of React?',
        answer: 'Key features:<br>- JSX syntax<br>- Component-based architecture<br>- Virtual DOM for performance<br>- Unidirectional data flow<br>- Hooks for state and lifecycle in functions',
        recap_ar: '',
        tags: ['React Features'],
        dateAdded: '',
    },
    {
        id: '82',
        category: 'React JS',
        question: 'What is JSX?',
        answer: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript. It gets transpiled to React.createElement() calls.',
        recap_ar: '',
        tags: ['React JSX'],
        dateAdded: '',
    },
    {
        id: '83',
        category: 'React JS',
        question: 'Can web browsers read JSX directly?',
        answer: "No, browsers can't read JSX directly. It must be transpiled to regular JavaScript using tools like Babel.",
        recap_ar: '',
        tags: ['React JSX'],
        dateAdded: '',
    },
    {
        id: '84',
        category: 'React JS',
        question: 'What is the virtual DOM?',
        answer: "The virtual DOM is React's lightweight representation of the real DOM. It allows efficient updates by only changing what's necessary.",
        recap_ar: '',
        tags: ['React Virtual DOM'],
        dateAdded: '',
    },
    {
        id: '85',
        category: 'React JS',
        question: 'Why use React instead of other frameworks, like Angular?',
        answer: 'React offers:<br>- Easier dynamic app creation<br>- Better performance with virtual DOM<br>- Reusable components<br>- Unidirectional data flow<br>- Strong developer tools',
        recap_ar: '',
        tags: ['React Comparison'],
        dateAdded: '',
    },
    {
        id: '86',
        category: 'React JS',
        question: 'What is the difference between the ES6 and ES5 standards?',
        answer: "Key differences:<br>- ES6 uses class/extends vs ES5's React.createClass<br>- ES6 uses import/export vs ES5's require/module.exports<br>- ES6 has arrow functions, template literals, etc.",
        recap_ar: '',
        tags: ['React ES6'],
        dateAdded: '',
    },
    {
        id: '87',
        category: 'React JS',
        question: 'How do you create a React app?',
        answer: 'Steps:<br>1. Install Node.js<br>2. Run: npx create-react-app my-app<br>3. cd my-app<br>4. npm start',
        recap_ar: '',
        tags: ['React Setup'],
        dateAdded: '',
    },
    {
        id: '88',
        category: 'React JS',
        question: 'What is an event in React?',
        answer: 'An event is an action (like click or key press) that triggers handlers. React events are camelCased and use synthetic events for cross-browser consistency.',
        recap_ar: '',
        tags: ['React Events'],
        dateAdded: '',
    },
    {
        id: '89',
        category: 'React JS',
        question: 'How do you create an event in React?',
        answer: 'Example click event:<br><pre><code><button onClick={handleClick}>Click</button></code></pre>',
        recap_ar: '',
        tags: ['React Events'],
        dateAdded: '',
    },
    {
        id: '90',
        category: 'React JS',
        question: 'What are synthetic events in React?',
        answer: "Synthetic events wrap native browser events for consistent cross-browser behavior. Example:<br><pre><code>function handleClick(e) {\n  e.preventDefault();\n  console.log('Clicked');\n}</code></pre>",
        recap_ar: '',
        tags: ['React Events'],
        dateAdded: '',
    },
    {
        id: '91',
        category: 'React JS',
        question: 'Explain how lists work in React.',
        answer: 'Lists display ordered data using map():<br><pre><code>const numbers = [1, 2, 3];\nconst listItems = numbers.map((number) =>\n  <li key={number.toString()}>\n    {number}\n  </li>\n);</code></pre>',
        recap_ar: '',
        tags: ['React Lists'],
        dateAdded: '',
    },
    {
        id: '92',
        category: 'React JS',
        question: 'Why is there a need to use keys in Lists?',
        answer: 'Keys help React identify which items changed, were added/removed. They should be unique and stable to optimize performance.',
        recap_ar: '',
        tags: ['React Lists'],
        dateAdded: '',
    },
    {
        id: '93',
        category: 'React JS',
        question: 'What are forms in React?',
        answer: "Forms enable user interaction (input, submission). They're used for authentication, searches, data entry, etc.",
        recap_ar: '',
        tags: ['React Forms'],
        dateAdded: '',
    },
    {
        id: '94',
        category: 'React JS',
        question: 'How do you create forms in React?',
        answer: "Example controlled form:<br><pre><code>class NameForm extends React.Component {\n  state = {value: ''};\n\n  handleChange = (e) => this.setState({value: e.target.value});\n  handleSubmit = (e) => {\n    alert('Submitted: ' + this.state.value);\n    e.preventDefault();\n  };\n\n  render() {\n    return (\n      <form onSubmit={this.handleSubmit}>\n        <input type='text' value={this.state.value} onChange={this.handleChange} />\n        <button type='submit'>Submit</button>\n      </form>\n    );\n  }\n}</code></pre>",
        recap_ar: '',
        tags: ['React Forms'],
        dateAdded: '',
    },
    {
        id: '95',
        category: 'React JS',
        question: 'How do you write comments in React?',
        answer: 'Single-line: <pre><code>{/* Comment */}</code></pre><br>Multi-line: <pre><code>{/*\n  Multi-line\n  comment\n*/}</code></pre>',
        recap_ar: '',
        tags: ['React Comments'],
        dateAdded: '',
    },
    {
        id: '96',
        category: 'React JS',
        question: 'What is an arrow function and how is it used in React?',
        answer: "Arrow functions provide concise syntax and lexical 'this'. Example:<br><pre><code>const MyComponent = () => {\n  return <div>Hello</div>;\n};</code></pre>",
        recap_ar: '',
        tags: ['React Functions'],
        dateAdded: '',
    },
    {
        id: '97',
        category: 'React JS',
        question: 'How is React different from React Native?',
        answer: '<b>React</b>: Web, uses HTML/CSS<br><b>React Native</b>: Mobile apps, uses native components<br>Both share similar concepts but target different platforms.',
        recap_ar: '',
        tags: ['React Comparison'],
        dateAdded: '',
    },
    {
        id: '98',
        category: 'React JS',
        question: 'How is React different from Angular?',
        answer: '<b>React</b>: Library, virtual DOM, unidirectional data flow<br><b>Angular</b>: Framework, real DOM, two-way binding<br>React offers more flexibility while Angular provides more built-in features.',
        recap_ar: '',
        tags: ['React Comparison'],
        dateAdded: '',
    },
    {
        id: '99',
        category: 'React JS',
        question: 'What are React Hooks?',
        answer: 'Hooks let you use state and lifecycle features in function components. Common hooks: useState, useEffect, useContext, etc.',
        recap_ar: '',
        tags: ['React Hooks'],
        dateAdded: '',
    },
    {
        id: '100',
        category: 'React JS',
        question: 'What is useState, and how does it work?',
        answer: 'useState adds state to functions:<br><pre><code>const [count, setCount] = useState(0);\n// count is value, setCount updates it</code></pre>',
        recap_ar: '',
        tags: ['React Hooks'],
        dateAdded: '',
    },
    {
        id: '101',
        category: 'React JS',
        question: 'What is useEffect, and how does it differ from lifecycle methods in class components?',
        answer: 'useEffect handles side effects (data fetching, subscriptions). It combines componentDidMount, componentDidUpdate, and componentWillUnmount.',
        recap_ar: '',
        tags: ['React Hooks'],
        dateAdded: '',
    },
    {
        id: '102',
        category: 'React JS',
        question: 'What is Memoization in React?',
        answer: 'Memoization caches results to avoid recalculating. React.memo memoizes components, useMemo memoizes values, useCallback memoizes functions.',
        recap_ar: '',
        tags: ['React Optimization'],
        dateAdded: '',
    },
    {
        id: '103',
        category: 'React JS',
        question: 'What is Prop Drilling and how do you avoid it?',
        answer: 'Prop drilling is passing props through multiple layers. Avoid it with Context API or state management like Redux.',
        recap_ar: '',
        tags: ['React Patterns'],
        dateAdded: '',
    },
    {
        id: '104',
        category: 'React JS',
        question: 'Explain React JS to a person with no programming experience.',
        answer: 'React is a tool for building interactive website interfaces. It lets developers create reusable UI pieces that automatically update when data changes.',
        recap_ar: '',
        tags: ['React Basics'],
        dateAdded: '',
    },
    {
        id: '105',
        category: 'React JS',
        question: 'State the limitations of React.',
        answer: 'Limitations include:<br>- Not a full framework<br>- JSX learning curve<br>- Rapid changes require constant learning<br>- Poor documentation for some tools',
        recap_ar: '',
        tags: ['React Limitations'],
        dateAdded: '',
    },
    {
        id: '106',
        category: 'React JS',
        question: 'State the use of webpack.',
        answer: 'Webpack bundles JavaScript modules and assets into static files for production. It handles dependencies, minification, and optimization.',
        recap_ar: '',
        tags: ['React Tools'],
        dateAdded: '',
    },
    {
        id: '107',
        category: 'React JS',
        question: 'Differentiate between controlled and uncontrolled components.',
        answer: '<b>Controlled</b>: Form data handled by React state<br><b>Uncontrolled</b>: Form data handled by DOM (using refs)',
        recap_ar: '',
        tags: ['React Components'],
        dateAdded: '',
    },
    {
        id: '108',
        category: 'React JS',
        question: 'Define Custom Hooks.',
        answer: "Custom Hooks are JavaScript functions starting with 'use' that can call other hooks. They extract reusable stateful logic.",
        recap_ar: '',
        tags: ['React Hooks'],
        dateAdded: '',
    },
    {
        id: '109',
        category: 'React JS',
        question: 'What is a dispatcher?',
        answer: "A dispatcher sends actions to the Redux store to trigger state updates. It's the only way to change state in Redux.",
        recap_ar: '',
        tags: ['Redux'],
        dateAdded: '',
    },
    {
        id: '110',
        category: 'React JS',
        question: 'State the different side effects of the React component.',
        answer: 'Side effects include:<br>- With cleanup: Event listeners, subscriptions<br>- Without cleanup: API calls, DOM mutations',
        recap_ar: '',
        tags: ['React Effects'],
        dateAdded: '',
    },
    {
        id: '111',
        category: 'React JS',
        question: 'What are the lifecycle steps in React?',
        answer: 'Lifecycle phases:<br>1. Mounting (constructor, render, componentDidMount)<br>2. Updating (shouldComponentUpdate, render, componentDidUpdate)<br>3. Unmounting (componentWillUnmount)',
        recap_ar: '',
        tags: ['React Lifecycle'],
        dateAdded: '',
    },
    {
        id: '112',
        category: 'React JS',
        question: 'What do you understand by error boundaries?',
        answer: 'Error boundaries catch JavaScript errors in child components, log them, and display fallback UI instead of crashing.',
        recap_ar: '',
        tags: ['React Error Handling'],
        dateAdded: '',
    },
    {
        id: '113',
        category: 'React JS',
        question: 'State the rules to follow when using React Hooks.',
        answer: 'Rules:<br>1. Only call Hooks at the top level (not in loops/conditions)<br>2. Only call Hooks from React functions',
        recap_ar: '',
        tags: ['React Hooks'],
        dateAdded: '',
    },
    {
        id: '114',
        category: 'React JS',
        question: 'What are the components in React?',
        answer: 'Components are reusable UI building blocks. Types:<br>- Functional (stateless)<br>- Class (stateful)',
        recap_ar: '',
        tags: ['React Components'],
        dateAdded: '',
    },
    {
        id: '115',
        category: 'React JS',
        question: 'What is the use of render() in React?',
        answer: "render() returns the JSX to display. It's called when state/props change and must be pure (no side effects).",
        recap_ar: '',
        tags: ['React Components'],
        dateAdded: '',
    },
    {
        id: '116',
        category: 'React JS',
        question: 'What is a state in React?',
        answer: 'State is mutable data that determines component behavior and rendering. When state changes, the component re-renders.',
        recap_ar: '',
        tags: ['React State'],
        dateAdded: '',
    },
    {
        id: '117',
        category: 'React JS',
        question: 'How do you implement state in React?',
        answer: 'In classes: <pre><code>this.state = {count: 0};</code></pre><br>With hooks: <pre><code>const [count, setCount] = useState(0);</code></pre>',
        recap_ar: '',
        tags: ['React State'],
        dateAdded: '',
    },
    {
        id: '118',
        category: 'React JS',
        question: 'How do you update the state of a component?',
        answer: 'In classes: <pre><code>this.setState({count: this.state.count + 1});</code></pre><br>With hooks: <pre><code>setCount(count + 1);</code></pre>',
        recap_ar: '',
        tags: ['React State'],
        dateAdded: '',
    },
    {
        id: '119',
        category: 'React JS',
        question: 'What are props in React?',
        answer: 'Props are read-only data passed from parent to child components. They make components reusable and configurable.',
        recap_ar: '',
        tags: ['React Props'],
        dateAdded: '',
    },
    {
        id: '120',
        category: 'React JS',
        question: 'How do you pass props between components?',
        answer: 'Parent to child:<br><pre><code><ChildComponent propName={value} /></code></pre><br>Child accesses via props.propName.',
        recap_ar: '',
        tags: ['React Props'],
        dateAdded: '',
    },
    {
        id: '121',
        category: 'React JS',
        question: 'What are the differences between state and props?',
        answer: '<b>State</b>: Mutable, managed within component<br><b>Props</b>: Immutable, passed from parent',
        recap_ar: '',
        tags: ['React State vs Props'],
        dateAdded: '',
    },
    {
        id: '182',
        category: 'React JS',
        question: 'What is React, and how does it differ from traditional JavaScript frameworks?',
        answer: 'React is a library for building user interfaces with a component-based architecture, virtual DOM for efficient updates, and unidirectional data flow.<br><br>Differences from traditional frameworks:<br>1. React is a library (not a full framework)<br>2. Uses JSX syntax<br>3. Virtual DOM for performance<br>4. One-way data binding<br>5. Component-based architecture',
        'recap-ar': 'مقدمة عن React والفرق بينه وبين أطر العمل التقليدية',
        tags: ['Beginner', 'React'],
        dateAdded: '2023-01-15',
    },
    {
        id: '183',
        category: 'React JS',
        question: 'What are React hooks, and why are they used?',
        answer: 'React hooks allow functional components to use state and lifecycle features without writing class components.<br><br>Common hooks:<br>1. useState: For managing state<br>2. useEffect: For side effects<br>3. useContext: For context API<br>4. useReducer: For complex state logic<br><br>Benefits:<br>1. Simpler components<br>2. Reusable stateful logic<br>3. No need for classes',
        'recap-ar': 'React Hooks واستخداماتها',
        tags: ['Intermediate', 'React'],
        dateAdded: '2023-01-15',
    },
    {
        id: '184',
        category: 'React JS',
        question: 'What is the virtual DOM, and how does React use it?',
        answer: 'The virtual DOM is a lightweight representation of the real DOM. React uses it to compare changes (via a process called "diffing") and update only the necessary parts of the real DOM for better performance.<br><br>How it works:<br>1. React creates a virtual DOM representation<br>2. When state changes, a new virtual DOM is created<br>3. React compares old and new virtual DOM (diffing)<br>4. Only the differences are updated in the real DOM',
        'recap-ar': 'Virtual DOM في React',
        tags: ['Intermediate', 'React'],
        dateAdded: '2023-01-15',
    },
    {
        id: '185',
        category: 'React JS',
        question: 'What are React props, and how are they different from state?',
        answer: 'Props are immutable and passed from parent to child components, while state is mutable and managed within a component.<br><br>Key differences:<br>1. Props are read-only, state can be changed<br>2. Props are passed down, state is local<br>3. Props changes come from parent, state changes come from within',
        'recap-ar': 'الفرق بين الـ Props والـ State في React',
        tags: ['Beginner', 'React'],
        dateAdded: '2023-01-15',
    },
    {
        id: '186',
        category: 'React JS',
        question: 'What is JSX, and how does it work in React?',
        answer: "JSX is a syntax extension allowing HTML-like code in JavaScript. JSX is transpiled into React.createElement calls.<br><br>Example:<br><pre><code>const element = &lt;h1&gt;Hello, world!&lt;/h1&gt;;<br>// Transpiles to:<br>const element = React.createElement('h1', null, 'Hello, world!');</code></pre><br>Advantages:<br>1. More readable UI code<br>2. Familiar syntax for HTML<br>3. Full power of JavaScript",
        'recap-ar': 'JSX في React',
        tags: ['Beginner', 'React'],
        dateAdded: '2023-01-15',
    },
];

const typescript = [
    {
        id: '122',
        category: 'TypeScript',
        question: 'What is TypeScript?',
        answer: "TypeScript is a superset of JavaScript used to create web- or JavaScript-based applications. It's open-source and can be used for both front-end and back-end programming. TypeScript shares the same initial semantics and syntax with JavaScript but adds static typing and other features.",
        'recap-ar': '',
        tags: ['TypeScript Basics', 'typescript', 'javascript', 'superset'],
        dateAdded: '',
    },
    {
        id: '123',
        category: 'TypeScript',
        question: "What are TypeScript's main features?",
        answer: '<b>Quick Code:</b> Reuses existing JavaScript code and supports JavaScript libraries<br><b>Static Typing:</b> Helps identify issues during debugging<br><b>User-Friendly:</b> Enables creation of robust web apps with productive tools<br><b>Strong History:</b> Array elements can be updated but not deleted',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'features', 'static-typing'],
        dateAdded: '',
    },
    {
        id: '124',
        category: 'TypeScript',
        question: "What is 'any' in TypeScript?",
        answer: "The 'any' type allows variables to hold values of any type without type checking. It's useful when dealing with dynamic content where the type isn't known at compile time.",
        'recap-ar': '',
        tags: ['TypeScript Basics', 'types', 'any'],
        dateAdded: '',
    },
    {
        id: '125',
        category: 'TypeScript',
        question: "Differentiate between 'let', 'var', and 'const' in TypeScript.",
        answer: '<b>let:</b> Block-scoped, can be reassigned<br><b>var:</b> Function-scoped, can be redeclared<br><b>const:</b> Block-scoped, cannot be reassigned<br><pre><code>let x = 1;\nvar y = 2;\nconst z = 3;</code></pre>',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'variables', 'scope'],
        dateAdded: '',
    },
    {
        id: '126',
        category: 'TypeScript',
        question: "What is the 'tsconfig.json' file?",
        answer: "The tsconfig.json file contains various compiler settings in JSON format. It tells the TypeScript compiler how to compile the project and must be placed in the project's root directory.",
        'recap-ar': '',
        tags: ['TypeScript Basics', 'configuration', 'compiler'],
        dateAdded: '',
    },
    {
        id: '127',
        category: 'TypeScript',
        question: "What is 'never' in TypeScript?",
        answer: "The 'never' type represents values that never occur. It's used for functions that never return (always throw exceptions) or for variables that can never have a value due to type guards.",
        'recap-ar': '',
        tags: ['TypeScript Basics', 'types', 'never'],
        dateAdded: '',
    },
    {
        id: '128',
        category: 'TypeScript',
        question: 'What is the extension of TypeScript definition files?',
        answer: 'TypeScript definition files use the .d.ts extension. They provide type definitions for external JavaScript libraries.',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'definition-files'],
        dateAdded: '',
    },
    {
        id: '129',
        category: 'TypeScript',
        question: 'How are TypeScript and JavaScript different?',
        answer: '<b>TypeScript:</b> Statically typed, requires compilation, supports interfaces and generics<br><b>JavaScript:</b> Dynamically typed, interpreted at runtime, no type checking at compile time',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'comparison', 'javascript'],
        dateAdded: '',
    },
    {
        id: '130',
        category: 'TypeScript',
        question: 'Why do we need TypeScript?',
        answer: 'Key reasons:<br>- Static typing catches errors early<br>- Better IDE support with autocompletion<br>- Strict null checking prevents common errors<br>- Excellent interoperability with JavaScript',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'benefits'],
        dateAdded: '',
    },
    {
        id: '131',
        category: 'TypeScript',
        question: 'Which advantages come with adopting TypeScript?',
        answer: 'Advantages include:<br>- Faster development with JavaScript-like syntax<br>- Seamless integration with existing JavaScript code<br>- Support for ES6/ES7 features<br>- Better tooling and IDE support',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'advantages'],
        dateAdded: '',
    },
    {
        id: '132',
        category: 'TypeScript',
        question: "What are TypeScript's drawbacks?",
        answer: 'Potential drawbacks:<br>- Requires manual typing in strict mode<br>- Needs compilation to JavaScript<br>- Requires definition files for third-party libraries<br>- Extra learning curve for developers new to typing',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'limitations'],
        dateAdded: '',
    },
    {
        id: '133',
        category: 'TypeScript',
        question: 'Who created TypeScript?',
        answer: 'Anders Hejlsberg at Microsoft created TypeScript. It was first released as version 0.8 on October 1, 2012. Microsoft maintains TypeScript under the Apache 2 license.',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'history'],
        dateAdded: '',
    },
    {
        id: '134',
        category: 'TypeScript',
        question: 'Which stable version of TypeScript is currently available?',
        answer: 'As of knowledge cutoff, TypeScript 4.9 was the latest stable version. Check the official TypeScript website for current version information.',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'versions'],
        dateAdded: '',
    },
    {
        id: '135',
        category: 'TypeScript',
        question: 'What are design patterns?',
        answer: 'Design patterns are reusable solutions to common software problems. They help create more modular, scalable, and maintainable code. Common patterns in TypeScript include Singleton, Factory, and Decorator.',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'design-patterns'],
        dateAdded: '',
    },
    {
        id: '136',
        category: 'TypeScript',
        question: "List all of TypeScript's built-in data types.",
        answer: 'TypeScript includes:<br>- Number<br>- String<br>- Boolean<br>- Null<br>- Undefined<br>- Void<br>- Any<br>- Never<br>- Unknown<br>- Object<br>- Array<br>- Tuple<br>- Enum',
        'recap-ar': '',
        tags: ['TypeScript Basics', 'data-types'],
        dateAdded: '',
    },
    {
        id: '137',
        category: 'TypeScript',
        question: 'What are TypeScript variables and how do you create them?',
        answer: "Variables are named memory locations that store values. Declare them with:<br><pre><code>let name: string = 'John';\nconst age: number = 30;\nvar isActive: boolean = true;</code></pre>",
        'recap-ar': '',
        tags: ['TypeScript Basics', 'variables'],
        dateAdded: '',
    },
    {
        id: '138',
        category: 'TypeScript',
        question: 'What do TypeScript interfaces do?',
        answer: 'Interfaces define contracts for object shapes. Example:<br><pre><code>interface Person {\n  name: string;\n  age: number;\n  greet(): void;\n}</code></pre>',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'interfaces'],
        dateAdded: '',
    },
    {
        id: '139',
        category: 'TypeScript',
        question: 'What is Singleton Design Pattern?',
        answer: 'Singleton ensures a class has only one instance. Example:<br><pre><code>class Singleton {\n  private static instance: Singleton;\n  private constructor() {}\n  static getInstance() {\n    if (!Singleton.instance) {\n      Singleton.instance = new Singleton();\n    }\n    return Singleton.instance;\n  }\n}</code></pre>',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'design-patterns', 'singleton'],
        dateAdded: '',
    },
    {
        id: '140',
        category: 'TypeScript',
        question: 'What do TypeScript modules do?',
        answer: "Modules organize code into reusable units. Example:<br><pre><code>// math.ts\nexport function sum(a: number, b: number) {\n  return a + b;\n}\n\n// app.ts\nimport { sum } from './math';</code></pre>",
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'modules'],
        dateAdded: '',
    },
    {
        id: '141',
        category: 'TypeScript',
        question: 'What distinguishes an internal module from an external module?',
        answer: '<b>Internal modules:</b> Now called namespaces, group related code<br><b>External modules:</b> Now simply called modules, use import/export syntax',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'modules'],
        dateAdded: '',
    },
    {
        id: '142',
        category: 'TypeScript',
        question: 'What is Model-View-Controller (MVC) architecture?',
        answer: 'MVC separates applications into:<br><b>Model:</b> Manages data and business logic<br><b>View:</b> Handles presentation and UI<br><b>Controller:</b> Processes user input and updates Model/View',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'architecture', 'mvc'],
        dateAdded: '',
    },
    {
        id: '143',
        category: 'TypeScript',
        question: 'What are Mixins?',
        answer: 'Mixins are a way to implement multiple inheritance by combining behaviors from multiple classes. Example:<br><pre><code>function applyMixins(derivedCtor: any, baseCtors: any[]) {\n  baseCtors.forEach(baseCtor => {\n    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {\n      derivedCtor.prototype[name] = baseCtor.prototype[name];\n    });\n  });\n}</code></pre>',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'mixins'],
        dateAdded: '',
    },
    {
        id: '144',
        category: 'TypeScript',
        question: 'What is JSON?',
        answer: 'JSON (JavaScript Object Notation) is a lightweight data format used for data interchange. TypeScript provides JSON.parse() and JSON.stringify() methods.',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'json'],
        dateAdded: '',
    },
    {
        id: '145',
        category: 'TypeScript',
        question: "What is the 'scope' of a variable?",
        answer: 'Variable scope defines where a variable is accessible:<br><b>Global:</b> Accessible everywhere<br><b>Local:</b> Accessible only within its block/function',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'variables', 'scope'],
        dateAdded: '',
    },
    {
        id: '146',
        category: 'TypeScript',
        question: "What is the 'declare' keyword in TypeScript?",
        answer: "'declare' tells the compiler that an entity exists elsewhere. Used for ambient declarations of variables, functions, or classes defined in other files/libraries.",
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'declare'],
        dateAdded: '',
    },
    {
        id: '147',
        category: 'TypeScript',
        question: 'What are generics in TypeScript?',
        answer: "Generics create reusable components that work with multiple types. Example:<br><pre><code>function identity<T>(arg: T): T {\n  return arg;\n}\nlet output = identity<string>('hello');</code></pre>",
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'generics'],
        dateAdded: '',
    },
    {
        id: '148',
        category: 'TypeScript',
        question: 'What is JSX?',
        answer: "JSX is an XML-like syntax extension that allows writing HTML-like code in TypeScript/JavaScript. It's commonly used with React.",
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'jsx'],
        dateAdded: '',
    },
    {
        id: '149',
        category: 'TypeScript',
        question: 'What are assertions in programming?',
        answer: 'Assertions are conditions that must be true for code to execute correctly. Used for:<br>- Preconditions (before function execution)<br>- Postconditions (after function execution)<br>- Invariants (always true conditions)',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'assertions'],
        dateAdded: '',
    },
    {
        id: '150',
        category: 'TypeScript',
        question: 'What rules apply for declaring Rest parameters?',
        answer: 'Rest parameter rules:<br>1. Only one rest parameter per function<br>2. Must be an array type<br>3. Must be last parameter<br>Example:<br><pre><code>function greet(...names: string[]) {\n  names.forEach(name => console.log(`Hello ${name}`));\n}</code></pre>',
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'parameters'],
        dateAdded: '',
    },
    {
        id: '151',
        category: 'TypeScript',
        question: "What is the 'as' keyword in TypeScript?",
        answer: "The 'as' keyword performs type assertions, telling the compiler to treat an expression as a specific type. Example:<br><pre><code>let someValue: any = 'hello';\nlet strLength: number = (someValue as string).length;</code></pre>",
        'recap-ar': '',
        tags: ['Intermediate TypeScript', 'type-assertion'],
        dateAdded: '',
    },
    {
        id: '152',
        category: 'TypeScript',
        question: "What does TypeScript's method overriding mean?",
        answer: 'Method overriding redefines a parent class method in a child class. Rules:<br>- Same method name<br>- Same parameters<br>- IS-A relationship must exist',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'oop', 'inheritance'],
        dateAdded: '',
    },
    {
        id: '153',
        category: 'TypeScript',
        question: 'What are TypeScript ambients, and when are they required?',
        answer: "Ambient declarations tell the compiler about source code existing elsewhere (like JavaScript libraries). Required when using non-TypeScript libraries. Example:<br><pre><code>declare module 'module-name';\ndeclare var myLibrary: any;</code></pre>",
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'ambient'],
        dateAdded: '',
    },
    {
        id: '154',
        category: 'TypeScript',
        question: 'What is the Lambda/Arrow function?',
        answer: "Arrow functions provide concise syntax and lexical 'this'. Example:<br><pre><code>const add = (a: number, b: number): number => a + b;</code></pre>",
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'arrow-functions'],
        dateAdded: '',
    },
    {
        id: '155',
        category: 'TypeScript',
        question: 'Explain TypeScript decorators.',
        answer: 'Decorators are special declarations that modify classes/methods. Example:<br><pre><code>function sealed(target: Function) {\n  Object.seal(target);\n  Object.seal(target.prototype);\n}\n\n@sealed\nclass Greeter {}</code></pre>',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'decorators'],
        dateAdded: '',
    },
    {
        id: '156',
        category: 'TypeScript',
        question: 'How are optional parameters supported in functions in TypeScript?',
        answer: "Use '?' to mark optional parameters. Example:<br><pre><code>function greet(name: string, age?: number) {\n  // age is optional\n}</code></pre>",
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'parameters'],
        dateAdded: '',
    },
    {
        id: '157',
        category: 'TypeScript',
        question: 'Describe the difference between method overriding and method overloading?',
        answer: '<b>Overloading:</b> Same method name, different parameters<br><b>Overriding:</b> Same method name and parameters, different implementation in derived class',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'oop'],
        dateAdded: '',
    },
    {
        id: '158',
        category: 'TypeScript',
        question: 'What is the difference between argument and parameter?',
        answer: '<b>Parameter:</b> Variable in function declaration<br><b>Argument:</b> Actual value passed to function<br>Example:<br><pre><code>// x is parameter\nfunction square(x: number) { return x * x; }\n\n// 5 is argument\nsquare(5);</code></pre>',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'functions'],
        dateAdded: '',
    },
    {
        id: '159',
        category: 'TypeScript',
        question: 'What type of language is TypeScript?',
        answer: 'TypeScript is an object-oriented, compiled language that is a superset of JavaScript with static typing.',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'language'],
        dateAdded: '',
    },
    {
        id: '160',
        category: 'TypeScript',
        question: 'Does TypeScript support object-oriented programming concepts?',
        answer: 'Yes, TypeScript supports OOP concepts like classes, interfaces, inheritance, polymorphism, and encapsulation.',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'oop'],
        dateAdded: '',
    },
    {
        id: '161',
        category: 'TypeScript',
        question: 'How many components does TypeScript have?',
        answer: 'TypeScript has three main components:<br>1. Language (syntax, keywords)<br>2. Compiler (tsc)<br>3. Language Service (provides editor features)',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'architecture'],
        dateAdded: '',
    },
    {
        id: '162',
        category: 'TypeScript',
        question: 'How many types of comments does TypeScript support?',
        answer: 'TypeScript supports two comment types:<br>1. Single-line (// comment)<br>2. Multi-line (/* comment */)',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'comments'],
        dateAdded: '',
    },
    {
        id: '163',
        category: 'TypeScript',
        question: 'Are semicolons optional in TypeScript?',
        answer: 'Yes, semicolons are optional in TypeScript due to Automatic Semicolon Insertion (ASI), but recommended for consistency.',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'syntax'],
        dateAdded: '',
    },
    {
        id: '164',
        category: 'TypeScript',
        question: 'What are the two types of enums?',
        answer: 'TypeScript supports:<br>1. Numeric enums (default)<br>2. String enums',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'enums'],
        dateAdded: '',
    },
    {
        id: '165',
        category: 'TypeScript',
        question: "What are numeric enums' first value defaulted to?",
        answer: 'Numeric enums start at 0 by default, but can be set to other values:<br><pre><code>enum Color {\n  Red = 1,  // Starts at 1\n  Green,    // 2\n  Blue      // 3\n}</code></pre>',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'enums'],
        dateAdded: '',
    },
    {
        id: '166',
        category: 'TypeScript',
        question: "What are TypeScript's three 'simple types'?",
        answer: 'The three basic simple types are:<br>1. Boolean (true/false)<br>2. Number (all numbers)<br>3. String (text values)',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'types'],
        dateAdded: '',
    },
    {
        id: '167',
        category: 'TypeScript',
        question: 'What is the Facade Design Pattern?',
        answer: 'Facade provides a simplified interface to a complex system. It hides implementation details behind a cleaner, higher-level interface.',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'design-patterns'],
        dateAdded: '',
    },
    {
        id: '168',
        category: 'TypeScript',
        question: 'What is a closure?',
        answer: 'A closure is a function that remembers its lexical scope even when executed outside that scope. Example:<br><pre><code>function outer() {\n  let x = 10;\n  function inner() {\n    console.log(x); // Remembers x from outer scope\n  }\n  return inner;\n}</code></pre>',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'closures'],
        dateAdded: '',
    },
    {
        id: '169',
        category: 'TypeScript',
        question: 'How is a synchronous task different from an asynchronous task?',
        answer: '<b>Synchronous:</b> Blocks execution until complete<br><b>Asynchronous:</b> Allows other code to run while waiting, uses callbacks/promises',
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'async'],
        dateAdded: '',
    },
    {
        id: '170',
        category: 'TypeScript',
        question: "What is 'promise' in TypeScript?",
        answer: "Promises represent eventual completion of async operations. Example:<br><pre><code>const promise = new Promise<string>((resolve) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});\npromise.then(value => console.log(value));</code></pre>",
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'promises', 'async'],
        dateAdded: '',
    },
    {
        id: '171',
        category: 'TypeScript',
        question: 'What are enums?',
        answer: "Enums allow defining a set of named constants. Example:<br><pre><code>enum Direction {\n  Up = 'UP',\n  Down = 'DOWN',\n  Left = 'LEFT',\n  Right = 'RIGHT'\n}</code></pre>",
        'recap-ar': '',
        tags: ['Advanced TypeScript', 'enums'],
        dateAdded: '',
    },
];

const FrontEnd = [
    {
        id: '172',
        category: 'HTML/CSS',
        question: 'What is the difference between an id and a class in HTML/CSS?',
        answer: "An id is a unique identifier for a single HTML element. A class is a reusable identifier that can be applied to multiple elements.<br><br>You'd want to use an id when you need to address a single element either through CSS or JavaScript. And you'll want to use a class when you need to address a group of DOM elements.<br><br>In CSS:<br>#id selects a specific element with that id.<br>.class selects all elements with that class.",
        'recap-ar': 'الفرق بين الـ id والـ class في HTML/CSS',
        tags: ['Beginner', 'HTML', 'CSS'],
        dateAdded: '2023-01-15',
    },
    {
        id: '173',
        category: 'HTML/CSS',
        question: 'Can you explain the box model in CSS?',
        answer: 'The CSS box model describes the rectangular boxes generated for elements in the DOM. The box model is composed of the following layers:<br><br>1. Content: The innermost part, where text and images appear.<br>2. Padding: The space between the content and the border.<br>3. Border: The outer edge of the padding, surrounding the element.<br>4. Margin: The space outside the border, separating the element from others.<br><br>By controlling each layer individually, you can define the look of each element in the user interface.',
        'recap-ar': 'نموذج الصندوق في CSS',
        tags: ['Beginner', 'CSS'],
        dateAdded: '2023-01-15',
    },
    {
        id: '174',
        category: 'HTML/CSS',
        question: 'What is the difference between inline, inline-block, and block elements?',
        answer: "In CSS, the difference between inline, inline-block, and block elements is on the way they're rendered in the web page:<br><br>1. Inline: Inline elements don't have a width or height. Instead, they don't start on a new line and take up only the width that's required (based on their content). Examples: &lt;span&gt;, &lt;a&gt;.<br>2. Inline-block: Just like inline elements, here the DOM elements do not start on a new line, however, they do allow you to set a height and width on them. Example: &lt;img&gt;.<br>3. Block: Elements start on a new line, taking up the full width available by default. Their width and height can be set by you. Examples: &lt;div&gt;, &lt;p&gt;.",
        'recap-ar': 'الفرق بين العناصر inline و inline-block و block',
        tags: ['Beginner', 'CSS'],
        dateAdded: '2023-01-15',
    },
    {
        id: '175',
        category: 'HTML/CSS',
        question: 'What are some SEO best practices when structuring an HTML document?',
        answer: "Purely from the HTML side:<br><br>1. Use Semantic HTML: Use tags like &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;section&gt;, and &lt;footer&gt; to provide meaningful structure.<br>2. Proper Heading Hierarchy: Use headings (&lt;h1&gt; to &lt;h6&gt;) correctly, making sure &lt;h1&gt; is used once per page for the main title, followed by &lt;h2&gt;, &lt;h3&gt;, etc.<br>3. Meta Tags: Include relevant &lt;meta&gt; tags, such as description, keywords, and viewport, to provide metadata about the website.<br>4. Alt Attributes on images: Use alt attributes for images to describe the content, improving accessibility and search engine understanding.<br><br>On top of that:<br><br>1. Internal Linking: Make sure to use internal links to connect content within your web site, helping search engines crawl and understand the site structure.<br>2. Mobile-Friendly Design: Code your site and CSS with a mobile-first mindset. Ensuring the site is responsive and mobile-friendly to improve user experience and ranking on search engines.<br>3. Fast Loading Times: Try to optimize images, use efficient code, and leverage caching to improve page load speeds. The faster the page loads, the bigger the advantage it'll have against other similar results on the SERP.",
        'recap-ar': 'أفضل ممارسات SEO في HTML',
        tags: ['Intermediate', 'HTML', 'SEO'],
        dateAdded: '2023-01-15',
    },
    {
        id: '176',
        category: 'HTML/CSS',
        question: 'What is the Document Object Model (DOM)?',
        answer: 'The Document Object Model (DOM) is an API for web documents. It represents the structure of an HTML web page as a tree of nodes, where each node corresponds to a part of the document (i.e. an element, an attribute, or text).',
        'recap-ar': 'نموذج كائن المستند (DOM)',
        tags: ['Beginner', 'HTML', 'JavaScript'],
        dateAdded: '2023-01-15',
    },
    {
        id: '177',
        category: 'JavaScript',
        question: 'What is the difference between var, let, and const in JavaScript?',
        answer: '<b>var</b>: Function-scoped, hoisted, can be redeclared<br><b>let</b>: Block-scoped, can be reassigned but not redeclared<br><b>const</b>: Block-scoped, cannot be reassigned or redeclared<br><pre><code>var x = 1;\nlet y = 2;\nconst z = 3;\n\nx = 10; // OK\ny = 20; // OK\nz = 30; // Error</code></pre>',
        'recap-ar': 'الفرق بين var و let و const في JavaScript',
        tags: ['Beginner', 'JavaScript'],
        dateAdded: '2023-01-15',
    },
    {
        id: '178',
        category: 'JavaScript',
        question: 'Explain the concept of closures in JavaScript.',
        answer: 'When a function is defined within another function, it retains access to the variables and parameters of the outer function, even after the outer function has finished executing. That link, between the inner function and its scope inside the outer function is known as "closure".<br><br>You can use them to create private variables that can only be accessed by the inner function, you can even use them to create complex objects with access to a rich context that is only available globally to them.',
        'recap-ar': 'مفهوم الـ closures في JavaScript',
        tags: ['Intermediate', 'JavaScript'],
        dateAdded: '2023-01-15',
    },
    {
        id: '179',
        category: 'JavaScript',
        question: 'What is the difference between == and === in JavaScript?',
        answer: "The == operator compares values with type coercion, while === compares values and types strictly.<br><br>Examples:<br>0 == '0' (true)<br>0 === '0' (false)",
        'recap-ar': 'الفرق بين == و === في JavaScript',
        tags: ['Beginner', 'JavaScript'],
        dateAdded: '2023-01-15',
    },
    {
        id: '180',
        category: 'JavaScript',
        question: 'What are JavaScript promises, and how do they work?',
        answer: "Promises are JavaScript objects that represent the eventual completion of an asynchronous call. Through promises you're able to handle the successful or failed execution of the asynchronous call.<br><br>Promises have three states:<br>1. Pending: Initial state, neither fulfilled nor rejected<br>2. Fulfilled: Operation completed successfully<br>3. Rejected: Operation failed",
        'recap-ar': 'الـ Promises في JavaScript',
        tags: ['Intermediate', 'JavaScript'],
        dateAdded: '2023-01-15',
    },
    {
        id: '181',
        category: 'JavaScript',
        question: 'What is the difference between call(), apply(), and bind() in JavaScript?',
        answer: '1. call(): Invokes a function with a specified this value and arguments passed individually.<br>2. apply(): Similar to call(), but arguments are passed as an array.<br>3. bind(): Returns a new function with a specified this value, allowing delayed execution.',
        'recap-ar': 'الفرق بين call و apply و bind في JavaScript',
        tags: ['Advanced', 'JavaScript'],
        dateAdded: '2023-01-15',
    },
    
    {
        id: '187',
        category: 'CSS',
        question: 'What is the difference between relative, absolute, fixed, and sticky positioning in CSS?',
        answer: "1. Relative: Positioned relative to its normal position.<br>2. Absolute: Positioned relative to its nearest positioned ancestor (not static).<br>3. Fixed: Positioned relative to the viewport and doesn't move when scrolling.<br>4. Sticky: Switches between relative and fixed based on scroll position.",
        'recap-ar': 'أنواع الـ positioning في CSS',
        tags: ['Intermediate', 'CSS'],
        dateAdded: '2023-01-15',
    },
    {
        id: '188',
        category: 'CSS',
        question: 'What are CSS pseudo-classes, and how are they different from pseudo-elements?',
        answer: 'Pseudo-classes apply to existing elements based on state or position (e.g., :hover, :nth-child()).<br><br>Pseudo-elements allow styling of specific parts of elements (e.g., ::before, ::after).<br><br>Key difference:<br>Pseudo-classes target existing elements in specific states, while pseudo-elements create virtual elements.',
        'recap-ar': 'الفرق بين pseudo-classes و pseudo-elements في CSS',
        tags: ['Intermediate', 'CSS'],
        dateAdded: '2023-01-15',
    },
    {
        id: '189',
        category: 'CSS',
        question: 'Explain the difference between em, rem, %, and px units in CSS.',
        answer: "1. px: Absolute unit (1px = 1/96th of 1in)<br>2. em: Relative to the parent element's font size<br>3. rem: Relative to the root element's font size<br>4. %: Relative to the parent element's dimension<br><br>When to use:<br>- px for precise measurements<br>- rem for scalable typography<br>- em for relative sizing within components<br>- % for fluid layouts",
        'recap-ar': 'وحدات القياس في CSS',
        tags: ['Intermediate', 'CSS'],
        dateAdded: '2023-01-15',
    },
    {
        id: '190',
        category: 'CSS',
        question: 'How does flexbox differ from CSS grid? When would you use each?',
        answer: 'Flexbox is one-dimensional (handles rows or columns), while grid is two-dimensional (handles rows and columns simultaneously).<br><br>Use flexbox for:<br>1. Small-scale layouts<br>2. Aligning items in one direction<br>3. Distributing space within a container<br><br>Use grid for:<br>1. Large-scale layouts<br>2. Complex two-dimensional designs<br>3. Precise item placement',
        'recap-ar': 'الفرق بين Flexbox و Grid في CSS',
        tags: ['Intermediate', 'CSS'],
        dateAdded: '2023-01-15',
    },
    {
        id: '191',
        category: 'CSS',
        question: 'What are media queries, and how do you use them?',
        answer: 'Media queries apply styles based on device characteristics (e.g., screen width).<br><br>Example:<br><pre><code>@media (max-width: 768px) {<br>  body { font-size: 14px; }<br>}</code></pre><br>Best practices:<br>1. Mobile-first approach<br>2. Use relative units<br>3. Test on real devices<br>4. Consider orientation (portrait/landscape)',
        'recap-ar': 'Media queries في CSS',
        tags: ['Intermediate', 'CSS', 'Responsive'],
        dateAdded: '2023-01-15',
    },
];

const javascript = [
    {
        id: 'js-hof-1',
        category: 'JavaScript',
        question: 'Explain Higher-Order Functions (HOFs) in JavaScript with concrete examples. Cover: (1) Definition, (2) How They Work, (3) Common Use Cases, (4) Comparison with React HOCs, and (5) Potential Pitfalls.',
        answer: `
  <h2>1. Definition</h2>
  <p><b>Higher-Order Function (HOF)</b>: A function that either:</p>
  <ul>
    <li>Takes one or more functions as arguments, <i>or</i></li>
    <li>Returns a function as its result</li>
  </ul>
  <p><i>"Functions that operate on other functions."</i></p>

  <h2>2. How They Work</h2>
  <h3>Example 1: HOF Accepting a Function</h3>
  <pre><code>// Higher-Order Function
function greet(name, greetingStrategy) {
  return greetingStrategy(name);
}

// Functions passed as arguments
function formalGreeting(name) {
  return \`Hello, Mr./Ms. \${name}\`;
}

function casualGreeting(name) {
  return \`Hey \${name}!\`;
}

greet("Alice", formalGreeting); // "Hello, Mr./Ms. Alice"
greet("Bob", casualGreeting);   // "Hey Bob!"</code></pre>

  <h3>Example 2: HOF Returning a Function</h3>
  <pre><code>function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
double(5); // 10</code></pre>

  <h2>3. Common Use Cases</h2>
  <table border="1">
    <tr><th>Use Case</th><th>Example</th></tr>
    <tr><td>Array operations</td><td><code>map()</code>, <code>filter()</code>, <code>reduce()</code></td></tr>
    <tr><td>Middleware</td><td>Express.js middleware functions</td></tr>
    <tr><td>Decorators</td><td>Adding logging/caching to functions</td></tr>
    <tr><td>Function factories</td><td>Creating specialized functions</td></tr>
    <tr><td>Error handling</td><td>Wrapper functions for try/catch</td></tr>
  </table>

  <h3>Real-World Example: Logger Decorator</h3>
  <pre><code>function withLogger(fn) {
  return function(...args) {
    console.log(\`Calling \${fn.name} with:\`, args);
    const result = fn(...args);
    console.log(\`Result:\`, result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogger(add);
loggedAdd(2, 3); // Logs inputs and output</code></pre>

  <h2>4. Comparison with React HOCs</h2>
  <table border="1">
    <tr><th>Higher-Order Function (JS)</th><th>Higher-Order Component (React)</th></tr>
    <tr><td>Works with any functions</td><td>Specifically wraps React components</td></tr>
    <tr><td>Returns a new function</td><td>Returns a new component</td></tr>
    <tr><td>Example: <code>once()</code> memoizer</td><td>Example: <code>withRouter()</code></td></tr>
  </table>

  <h3>React HOC Example</h3>
  <pre><code>function withAuth(Component) {
  return function(props) {
    const { user } = useAuth();
    if (!user) return &lt;Login /&gt;;
    return &lt;Component {...props} user={user} /&gt;;
  };
}

const PrivateProfile = withAuth(Profile);</code></pre>

  <h2>5. Potential Pitfalls</h2>
  <ul>
    <li><b>Over-nesting</b>: Deeply nested HOFs can become hard to debug</li>
    <li><b>Performance</b>: Creating functions on every render can cause unnecessary re-renders</li>
    <li><b>Readability</b>: May obscure control flow if overused</li>
    <li><b>Testing</b>: Mocking becomes more complex</li>
  </ul>

  <h2>When to Use HOFs</h2>
  <ul>
    <li>When you need to <b>abstract shared behavior</b> (logging, auth)</li>
    <li>For <b>functional programming</b> patterns (composing functions)</li>
    <li>To create <b>specialized versions</b> of general functions</li>
  </ul>

  <h2>RECAP-AR (ملخص عربي)</h2>
  <p><b>الدوال ذات الرتبة الأعلى (HOF)</b>: هي دوال تقبل دوال أخرى كمدخلات أو تقوم بإرجاع دالة كمخرج. تستخدم ل:</p>
  <ul>
    <li>إنشاء دوال أكثر تخصصاً</li>
    <li>إضافة سلوك مشترك (مثل التسجيل أو التعامل مع الأخطاء)</li>
    <li>تكوين دوال متعددة معاً</li>
  </ul>
  <p><b>مثال:</b> <code>map</code>, <code>filter</code> في المصفوفات هي دوال ذات رتبة أعلى.</p>`,
        'recap-ar': '',
        tags: ['javascript', 'functional-programming', 'react', 'design-patterns'],
        dateAdded: '',
    },
    {
        id: '192',
        category: 'JavaScript',
        question: 'What is JavaScript?',
        answer: 'JavaScript is a high-level, interpreted programming language that makes it possible to create interactive web pages and online apps with dynamic functionality. Commonly referred to as the universal language, JavaScript is primarily used by developers for front-end and back-end work.',
        'recap-ar': 'ما هي لغة JavaScript؟',
        tags: ['Beginner', 'Fundamentals'],
        dateAdded: '2023-01-15',
    },
    {
        id: '193',
        category: 'JavaScript',
        question: 'Enumerate the differences between Java and JavaScript?',
        answer: 'Java is a complete programming language. In contrast, JavaScript is a coded program that can be introduced to HTML pages. These two languages are not at all inter-dependent and are designed for different intent. Java is an object-oriented programming (OOPS) or structured programming languages like C++ or C, whereas JavaScript is a client-side scripting language.',
        'recap-ar': 'الفرق بين Java و JavaScript',
        tags: ['Beginner', 'Comparison'],
        dateAdded: '2023-01-15',
    },
    {
        id: '194',
        category: 'JavaScript',
        question: 'What are JavaScript Data Types?',
        answer: 'Following are the JavaScript Data types:<br><br>1. Number<br>2. String<br>3. Boolean<br>4. Object<br>5. Undefined',
        'recap-ar': 'أنواع البيانات في JavaScript',
        tags: ['Beginner', 'Fundamentals'],
        dateAdded: '2023-01-15',
    },
    {
        id: '195',
        category: 'JavaScript',
        question: 'What is the use of isNaN function?',
        answer: 'isNan function returns true if the argument is not a number; otherwise, it is false.',
        'recap-ar': 'استخدام دالة isNaN',
        tags: ['Beginner', 'Functions'],
        dateAdded: '2023-01-15',
    },
    {
        id: '196',
        category: 'JavaScript',
        question: 'Which is faster between JavaScript and an ASP script?',
        answer: 'JavaScript is faster. JavaScript is a client-side language, and thus it does not need the assistance of the webserver to execute. On the other hand, ASP is a server-side language and hence is always slower than JavaScript. Javascript now is also a server-side language (nodejs).',
        'recap-ar': 'مقارنة السرعة بين JavaScript و ASP',
        tags: ['Beginner', 'Performance'],
        dateAdded: '2023-01-15',
    },
    {
        id: '197',
        category: 'JavaScript',
        question: 'What is negative Infinity?',
        answer: 'Negative Infinity is a number in JavaScript which can be derived by dividing negative number by zero.',
        'recap-ar': 'ما هي القيمة السالبة اللانهاية في JavaScript؟',
        tags: ['Beginner', 'Numbers'],
        dateAdded: '2023-01-15',
    },
    {
        id: '198',
        category: 'JavaScript',
        question: 'Is it possible to break JavaScript Code into several lines?',
        answer: 'Breaking within a string statement can be done by using a backslash, \'\\,\' at the end of the first line.<br><br>Example:<br><pre><code>document.write("This is \\a program,");</code></pre><br>And if you change to a new line when not within a string statement, then javaScript ignores the break in the line.<br><br>Example:<br><pre><code>var x=1, y=2,\nz=\nx+y;</code></pre><br>The above code is perfectly fine, though not advisable as it hampers debugging.',
        'recap-ar': 'كسر سطور الكود في JavaScript',
        tags: ['Beginner', 'Syntax'],
        dateAdded: '2023-01-15',
    },
    {
        id: '199',
        category: 'JavaScript',
        question: 'Which company developed JavaScript?',
        answer: 'Netscape is the software company that developed JavaScript.',
        'recap-ar': 'شركة تطوير JavaScript',
        tags: ['Beginner', 'History'],
        dateAdded: '2023-01-15',
    },
    {
        id: '200',
        category: 'JavaScript',
        question: 'What are undeclared and undefined variables?',
        answer: 'Undeclared variables are those that do not exist in a program and are not declared. If the program tries to read the value of an undeclared variable, then a runtime error is encountered.<br><br>Undefined variables are those that are declared in the program but have not been given any value. If the program tries to read the value of an undefined variable, an undefined value is returned.',
        'recap-ar': 'الفرق بين المتغيرات غير المعرفة وغير المعلنة',
        tags: ['Beginner', 'Variables'],
        dateAdded: '2023-01-15',
    },
    {
        id: '201',
        category: 'JavaScript',
        question: 'Write the code for adding new elements dynamically?',
        answer: '<pre><code>&lt;html&gt; \n&lt;head&gt; \n&lt;title&gt;t1&lt;/title&gt; \n&lt;script type="text/javascript"&gt; \n    function addNode () { var newP = document.createElement("p"); \n    var textNode = document.createTextNode(" This is a new text node"); \n    newP.appendChild(textNode); document.getElementById("firstP").appendChild(newP); } \n&lt;/script&gt; &lt;/head&gt; \n&lt;body&gt; &lt;p id="firstP"&gt;firstP&lt;p&gt; &lt;/body&gt; \n&lt;/html&gt;</code></pre>',
        'recap-ar': 'إضافة عناصر ديناميكيًا في JavaScript',
        tags: ['Beginner', 'DOM'],
        dateAdded: '2023-01-15',
    },
    {
        id: '202',
        category: 'JavaScript',
        question: 'What are global variables? How are these variable declared?',
        answer: 'Global variables are available throughout the length of the code so that it has no scope. The var keyword is used to declare a local variable or object. If the var keyword is omitted, a global variable is declared.<br><br>Example:<br><pre><code>// Declare a global:\nglobalVariable = "Test";</code></pre><br>The problems faced by using global variables are the clash of variable names of local and global scope. Also, it is difficult to debug and test the code that relies on global variables.',
        'recap-ar': 'المتغيرات العامة في JavaScript',
        tags: ['Beginner', 'Variables'],
        dateAdded: '2023-01-15',
    },
    {
        id: '203',
        category: 'JavaScript',
        question: 'What is a prompt box?',
        answer: 'A prompt box is a box that allows the user to enter input by providing a text box. A label and box will be provided to enter the text or number.',
        'recap-ar': 'ما هي نافذة الـ prompt في JavaScript؟',
        tags: ['Beginner', 'UI'],
        dateAdded: '2023-01-15',
    },
    {
        id: '204',
        category: 'JavaScript',
        question: "What is 'this' keyword in JavaScript?",
        answer: "'This' keyword refers to the object from where it was called.",
        'recap-ar': 'كلمة this في JavaScript',
        tags: ['Beginner', 'OOP'],
        dateAdded: '2023-01-15',
    },
    {
        id: '205',
        category: 'JavaScript',
        question: 'What is the working of timers in JavaScript?',
        answer: 'Timers are used to execute a piece of code at a set time or repeat the code in a given interval. This is done by using the functions setTimeout, setInterval, and clearInterval.<br><br>The setTimeout(function, delay) function is used to start a timer that calls a particular function after the mentioned delay. The setInterval(function, delay) function repeatedly executes the given function in the mentioned delay and only halts when canceled. The clearInterval(id) function instructs the timer to stop.<br><br>Timers are operated within a single thread, and thus events might queue up, waiting to be executed.',
        'recap-ar': 'كيف تعمل المؤقتات في JavaScript؟',
        tags: ['Beginner', 'Timers'],
        dateAdded: '2023-01-15',
    },
    {
        id: '206',
        category: 'JavaScript',
        question: 'Which symbol is used for comments in Javascript?',
        answer: '// for Single line comments and /* */ for multi-line comments.',
        'recap-ar': 'رموز التعليقات في JavaScript',
        tags: ['Beginner', 'Syntax'],
        dateAdded: '2023-01-15',
    },
    {
        id: '207',
        category: 'JavaScript',
        question: 'What is the difference between ViewState and SessionState?',
        answer: "'ViewState' is specific to a page in a session.<br>'SessionState' is specific to user-specific data that can be accessed across all web application pages.",
        'recap-ar': 'الفرق بين ViewState و SessionState',
        tags: ['Intermediate', 'State Management'],
        dateAdded: '2023-01-15',
    },
    {
        id: '208',
        category: 'JavaScript',
        question: 'What is === operator?',
        answer: '=== is called a strict equality operator, which returns true when the two operands have the same value without conversion.',
        'recap-ar': 'المعامل === في JavaScript',
        tags: ['Beginner', 'Operators'],
        dateAdded: '2023-01-15',
    },
    {
        id: '209',
        category: 'JavaScript',
        question: 'How you can submit a form using JavaScript?',
        answer: 'To submit a form using JavaScript use:<br><pre><code>document.form[0].submit();</code></pre>',
        'recap-ar': 'إرسال النماذج باستخدام JavaScript',
        tags: ['Beginner', 'Forms'],
        dateAdded: '2023-01-15',
    },
    {
        id: '210',
        category: 'JavaScript',
        question: 'Does JavaScript support automatic type conversion?',
        answer: 'Yes, JavaScript does support automatic type conversion. It is the common way of type conversion used by JavaScript developers',
        'recap-ar': 'التحويل التلقائي للأنواع في JavaScript',
        tags: ['Beginner', 'Type Conversion'],
        dateAdded: '2023-01-15',
    },
    {
        id: '211',
        category: 'JavaScript',
        question: 'How can the style/class of an element be changed?',
        answer: 'It can be done in the following way:<br><pre><code>document.getElementById("myText").style.fontSize = "20";</code></pre><br>or<br><pre><code>document.getElementById("myText").className = "anyclass";</code></pre>',
        'recap-ar': 'تغيير الأنماط والفئات في JavaScript',
        tags: ['Beginner', 'DOM'],
        dateAdded: '2023-01-15',
    },
    {
        id: '212',
        category: 'JavaScript',
        question: 'How to read and write a file using JavaScript?',
        answer: 'There are two ways to read and write a file using JavaScript:<br><br>1. Using JavaScript extensions<br>2. Using a web page and Active X objects',
        'recap-ar': 'قراءة وكتابة الملفات في JavaScript',
        tags: ['Intermediate', 'File Handling'],
        dateAdded: '2023-01-15',
    },
    {
        id: '213',
        category: 'JavaScript',
        question: 'What are all the looping structures in JavaScript?',
        answer: 'Following are looping structures in Javascript:<br><br>1. For<br>2. While<br>3. Do-while loops',
        'recap-ar': 'هياكل التكرار في JavaScript',
        tags: ['Beginner', 'Loops'],
        dateAdded: '2023-01-15',
    },
    {
        id: '214',
        category: 'JavaScript',
        question: 'What is called Variable typing in Javascript?',
        answer: 'Variable typing is used to assign a number to a variable. The same variable can be assigned to a string.<br><br>Example:<br><pre><code>i = 10;\ni = "string;";</code></pre><br>This is called variable typing.',
        'recap-ar': 'كتابة المتغيرات في JavaScript',
        tags: ['Beginner', 'Variables'],
        dateAdded: '2023-01-15',
    },
    {
        id: '215',
        category: 'JavaScript',
        question: 'How can you convert the string of any base to an integer in JavaScript?',
        answer: 'The parseInt() function is used to convert numbers between different bases. parseInt() takes the string to be converted as its first parameter. The second parameter is the base of the given string.<br><br>To convert 4F (or base 16) to integer, the code used will be:<br><pre><code>parseInt("4F", 16);</code></pre>',
        'recap-ar': 'تحويل السلسلة إلى عدد صحيح في JavaScript',
        tags: ['Beginner', 'Type Conversion'],
        dateAdded: '2023-01-15',
    },
    {
        id: '216',
        category: 'JavaScript',
        question: 'Difference between "==" and "==="?',
        answer: '"==" checks only for equality in value, whereas "===" is a stricter equality test and returns false if either the value or the type of the two variables are different.',
        'recap-ar': 'الفرق بين == و === في JavaScript',
        tags: ['Beginner', 'Operators'],
        dateAdded: '2023-01-15',
    },
    {
        id: '217',
        category: 'JavaScript',
        question: 'What would be the result of 3+2+"7"?',
        answer: 'Since 3 and 2 are integers, they will be added numerically. And since 7 is a string, its concatenation will be done. So the result would be 57.',
        'recap-ar': 'نتيجة عملية الجمع مع السلسلة في JavaScript',
        tags: ['Beginner', 'Type Conversion'],
        dateAdded: '2023-01-15',
    },
    {
        id: '218',
        category: 'JavaScript',
        question: 'How to detect the operating system on the client machine?',
        answer: 'In order to detect the operating system on the client machine, the navigator.platform string (property) should be used.',
        'recap-ar': 'كشف نظام التشغيل في JavaScript',
        tags: ['Intermediate', 'Browser'],
        dateAdded: '2023-01-15',
    },
    {
        id: '219',
        category: 'JavaScript',
        question: 'What do you mean by NULL in Javascript?',
        answer: 'The NULL value is used to represent no value or no object. It implies no object or null string, no valid boolean value, no number, and no array object.',
        'recap-ar': 'القيمة NULL في JavaScript',
        tags: ['Beginner', 'Fundamentals'],
        dateAdded: '2023-01-15',
    },
    {
        id: '220',
        category: 'JavaScript',
        question: 'What is the function of the delete operator?',
        answer: 'The delete keyword is used to delete the property as well as its value.<br><br>Example:<br><pre><code>var student= {age:20, batch:"ABC"};\nDelete student.age;</code></pre>',
        'recap-ar': 'عامل الحذف في JavaScript',
        tags: ['Beginner', 'Operators'],
        dateAdded: '2023-01-15',
    },
    {
        id: '221',
        category: 'JavaScript',
        question: 'What is an undefined value in JavaScript?',
        answer: "Undefined value means the:<br><br>1. Variable used in the code doesn't exist<br>2. Variable is not assigned to any value<br>3. Property does not exist.",
        'recap-ar': 'القيمة غير المعرفة في JavaScript',
        tags: ['Beginner', 'Fundamentals'],
        dateAdded: '2023-01-15',
    },
    {
        id: '222',
        category: 'JavaScript',
        question: 'What are all the types of Pop up boxes available in JavaScript?',
        answer: '1. Alert<br>2. Confirm and<br>3. Prompt',
        'recap-ar': 'أنواع النوافذ المنبثقة في JavaScript',
        tags: ['Beginner', 'UI'],
        dateAdded: '2023-01-15',
    },
    {
        id: '223',
        category: 'JavaScript',
        question: 'What is the use of Void (0)?',
        answer: 'Void(0) is used to prevent the page from refreshing, and parameter "zero" is passed while calling.<br><br>Void(0) is used to call another method without refreshing the page.',
        'recap-ar': 'استخدام Void(0) في JavaScript',
        tags: ['Intermediate', 'Navigation'],
        dateAdded: '2023-01-15',
    },
    {
        id: '224',
        category: 'JavaScript',
        question: 'How can a page be forced to load another page in JavaScript?',
        answer: 'The following code has to be inserted to achieve the desired effect:<br><pre><code>&lt;script language="JavaScript" type="text/javascript" &gt;\n&lt;!-- location.href="https://www.example.com"; //--&gt;&lt;/script&gt;</code></pre>',
        'recap-ar': 'تحميل صفحة أخرى في JavaScript',
        tags: ['Beginner', 'Navigation'],
        dateAdded: '2023-01-15',
    },
    {
        id: '225',
        category: 'JavaScript',
        question: 'What is the data type of variables in JavaScript?',
        answer: 'All variables in JavaScript are object data types.',
        'recap-ar': 'نوع بيانات المتغيرات في JavaScript',
        tags: ['Beginner', 'Variables'],
        dateAdded: '2023-01-15',
    },
    {
        id: '226',
        category: 'JavaScript',
        question: 'What is the difference between an alert box and a confirmation box?',
        answer: 'An alert box displays only one button, which is the OK button.<br><br>But a Confirmation box displays two buttons, namely OK and cancel.',
        'recap-ar': 'الفرق بين نافذة التنبيه ونافذة التأكيد',
        tags: ['Beginner', 'UI'],
        dateAdded: '2023-01-15',
    },
    {
        id: '227',
        category: 'JavaScript',
        question: 'What are escape characters?',
        answer: 'Escape characters (Backslash) is used when working with special characters like single quotes, double quotes, apostrophes, and ampersands. Place backslash before the characters to make it display.<br><br>Example:<br><pre><code>document.write "I m a "good" boy."\ndocument.write "I m a \\"good\\" boy."</code></pre>',
        'recap-ar': 'أحرف الهروب في JavaScript',
        tags: ['Beginner', 'Strings'],
        dateAdded: '2023-01-15',
    },
    {
        id: '228',
        category: 'JavaScript',
        question: 'What are JavaScript Cookies?',
        answer: 'Cookies are the small test files stored in a computer, and they get created when the user visits the websites to store information that they need. Examples could be User Name details and shopping cart information from previous visits.',
        'recap-ar': 'ما هي ملفات تعريف الارتباط في JavaScript؟',
        tags: ['Intermediate', 'Browser'],
        dateAdded: '2023-01-15',
    },
    {
        id: '229',
        category: 'JavaScript',
        question: 'What a pop()method in JavaScript is?',
        answer: 'The pop() method is similar to the shift() method, but the difference is that the Shift method works at the array\'s start. The pop() method takes the last element off of the given array and returns it. The array on which it is called is then altered.<br><br>Example:<br><pre><code>var cloths = ["Shirt", "Pant", "TShirt"];\ncloths.pop();\n//Now cloth becomes Shirt,Pant</code></pre>',
        'recap-ar': 'طريقة pop() في JavaScript',
        tags: ['Beginner', 'Arrays'],
        dateAdded: '2023-01-15',
    },
    {
        id: '230',
        category: 'JavaScript',
        question: 'Does JavaScript has concept level scope?',
        answer: 'No. JavaScript does not have concept-level scope. The variable declared inside the function has scope inside the function.',
        'recap-ar': 'نطاق المستوى المفاهيمي في JavaScript',
        tags: ['Intermediate', 'Scope'],
        dateAdded: '2023-01-15',
    },
    {
        id: '231',
        category: 'JavaScript',
        question: 'What are the disadvantages of using innerHTML in JavaScript?',
        answer: 'If you use innerHTML in JavaScript, the disadvantage is:<br><br>1. Content is replaced everywhere<br>2. We cannot use it like "appending to innerHTML"<br>3. Even if you use +=like "innerHTML = innerHTML + \'html\'" still the old content is replaced by html<br>4. The entire innerHTML content is re-parsed and builds into elements. Therefore, it\'s much slower<br>5. The innerHTML does not provide validation, and therefore we can potentially insert valid and broken HTML in the document and break it',
        'recap-ar': 'عيوب استخدام innerHTML في JavaScript',
        tags: ['Intermediate', 'DOM'],
        dateAdded: '2023-01-15',
    },
    {
        id: '232',
        category: 'JavaScript',
        question: 'What is break and continue statements?',
        answer: 'Break statement exits from the current loop.<br><br>Continue statement continues with next statement of the loop.',
        'recap-ar': 'تعليمات break و continue في JavaScript',
        tags: ['Beginner', 'Loops'],
        dateAdded: '2023-01-15',
    },
    {
        id: '233',
        category: 'JavaScript',
        question: 'What are the two basic groups of data types in JavaScript?',
        answer: 'They are as—Primitive<br>Reference types<br><br>Primitive types are number and Boolean data types. Reference types are more complex types like strings and dates.',
        'recap-ar': 'مجموعات أنواع البيانات في JavaScript',
        tags: ['Beginner', 'Data Types'],
        dateAdded: '2023-01-15',
    },
    {
        id: '234',
        category: 'JavaScript',
        question: 'How can generic objects be created?',
        answer: 'Generic objects can be created as:<br><pre><code>var I = new object();</code></pre>',
        'recap-ar': 'إنشاء كائنات عامة في JavaScript',
        tags: ['Beginner', 'OOP'],
        dateAdded: '2023-01-15',
    },
    {
        id: '235',
        category: 'JavaScript',
        question: 'What is the use of a type of operator?',
        answer: "'Typeof' is an operator used to return a string description of the type of a variable.",
        'recap-ar': 'عامل typeof في JavaScript',
        tags: ['Beginner', 'Operators'],
        dateAdded: '2023-01-15',
    },
    {
        id: '236',
        category: 'JavaScript',
        question: 'Which keywords are used to handle exceptions?',
        answer: 'Try... Catch—finally is used to handle exceptions in the JavaScript<br><br><pre><code>Try{\n    Code\n}\nCatch(exp){\n    Code to throw an exception.\n}\nFinally{\n    Code runs either it finishes successfully or after catch\n}</code></pre>',
        'recap-ar': 'معالجة الاستثناءات في JavaScript',
        tags: ['Intermediate', 'Error Handling'],
        dateAdded: '2023-01-15',
    },
    {
        id: '237',
        category: 'JavaScript',
        question: 'Which keyword is used to print the text on the screen?',
        answer: 'Document.Write("Welcome") is used to print the text–Welcome on the screen.',
        'recap-ar': 'طباعة النص على الشاشة في JavaScript',
        tags: ['Beginner', 'Output'],
        dateAdded: '2023-01-15',
    },
    {
        id: '238',
        category: 'JavaScript',
        question: 'What is the use of the blur function?',
        answer: 'Blur function is used to remove the focus from the specified object.',
        'recap-ar': 'وظيفة blur في JavaScript',
        tags: ['Intermediate', 'Events'],
        dateAdded: '2023-01-15',
    },
    {
        id: '239',
        category: 'JavaScript',
        question: 'What is variable typing?',
        answer: 'Variable typing assigns a number to a variable and then assigns a string to the same variable. An example is as follows:<br><pre><code>i= 8;\ni="john";</code></pre>',
        'recap-ar': 'كتابة المتغيرات في JavaScript',
        tags: ['Beginner', 'Variables'],
        dateAdded: '2023-01-15',
    },
    {
        id: '240',
        category: 'JavaScript',
        question: 'How to find an operating system in the client machine using JavaScript?',
        answer: "The 'Navigator.appversion' is used to find the operating system's name in the client machine.",
        'recap-ar': 'كشف نظام التشغيل باستخدام JavaScript',
        tags: ['Intermediate', 'Browser'],
        dateAdded: '2023-01-15',
    },
    {
        id: '241',
        category: 'JavaScript',
        question: 'What are the different types of errors in JavaScript?',
        answer: 'There are three types of errors:<br><br>1. Load time errors: Errors that come up when loading a web page, like improper syntax errors, are known as Load time errors and generate the errors dynamically.<br>2. Runtime errors: Errors that come due to misuse of the command inside the HTML language.<br>3. Logical errors: These are the errors that occur due to the bad logic performed on a function with a different operation.',
        'recap-ar': 'أنواع الأخطاء في JavaScript',
        tags: ['Beginner', 'Error Handling'],
        dateAdded: '2023-01-15',
    },
    {
        id: '242',
        category: 'JavaScript',
        question: 'What is the use of the Push method in JavaScript?',
        answer: 'The push method is used to add or append one or more elements to an Array end. Using this method, we can append multiple elements by passing multiple arguments.',
        'recap-ar': 'طريقة push() في JavaScript',
        tags: ['Beginner', 'Arrays'],
        dateAdded: '2023-01-15',
    },
    {
        id: '243',
        category: 'JavaScript',
        question: 'What is the unshift method in JavaScript?',
        answer: 'Unshift method is like the push method, which works at the beginning of the array. This method is used to prepend one or more elements to the beginning of the array.',
        'recap-ar': 'طريقة unshift() في JavaScript',
        tags: ['Beginner', 'Arrays'],
        dateAdded: '2023-01-15',
    },
    {
        id: '244',
        category: 'JavaScript',
        question: 'What is the difference between JavaScript and Jscript?',
        answer: 'Both are almost similar. Netscape and Jscript develop JavaScript was developed by Microsoft.',
        'recap-ar': 'الفرق بين JavaScript و Jscript',
        tags: ['Beginner', 'Comparison'],
        dateAdded: '2023-01-15',
    },
    {
        id: '245',
        category: 'JavaScript',
        question: 'How are object properties assigned?',
        answer: 'Properties are assigned to objects in the following way:<br><pre><code>obj ["class"] = 12;\n// or\nobj.class = 12;</code></pre>',
        'recap-ar': 'تعيين خصائص الكائن في JavaScript',
        tags: ['Beginner', 'OOP'],
        dateAdded: '2023-01-15',
    },
    {
        id: '246',
        category: 'JavaScript',
        question: "What is the 'Strict Mode in JavaScript, and how can it be enabled?",
        answer: 'Strict Mode adds certain compulsions to JavaScript. Under the strict Mode, JavaScript shows errors for a piece of code, which did not show an error before, but might be problematic and potentially unsafe. Strict Mode also solves some mistakes that hamper the JavaScript engines from working efficiently.<br><br>Strict mode can be enabled by adding the string literal "use strict" above the file. This can be illustrated by the given example:<br><pre><code>function myfunction() {\n    "use strict;";\n    var v = "This is a strict mode function";\n}</code></pre>',
        'recap-ar': 'الوضع الصارم في JavaScript',
        tags: ['Intermediate', 'Best Practices'],
        dateAdded: '2023-01-15',
    },
    {
        id: '247',
        category: 'JavaScript',
        question: 'How can you get the status of a CheckBox?',
        answer: "The status can be acquired as follows:<br><pre><code>alert(document.getElementById('checkbox1').checked);</code></pre><br>If the CheckBox is checked, this alert will return TRUE.",
        'recap-ar': 'الحصول على حالة مربع الاختيار في JavaScript',
        tags: ['Beginner', 'DOM'],
        dateAdded: '2023-01-15',
    },
    {
        id: '248',
        category: 'JavaScript',
        question: 'How can the OS of the client machine be detected?',
        answer: 'The navigator.appVersion string can be used to detect the operating system on the client machine.',
        'recap-ar': 'كشف نظام تشغيل العميل في JavaScript',
        tags: ['Intermediate', 'Browser'],
        dateAdded: '2023-01-15',
    },
    {
        id: '249',
        category: 'JavaScript',
        question: 'What is window.onload and onDocumentReady?',
        answer: 'The onload function is not run until all the information on the page is loaded. This leads to a substantial delay before any code is executed.<br><br>onDocumentReady loads the code just after the DOM is loaded. This allows early manipulation of the code.',
        'recap-ar': 'الفرق بين window.onload و onDocumentReady',
        tags: ['Intermediate', 'Events'],
        dateAdded: '2023-01-15',
    },
    {
        id: '250',
        category: 'JavaScript',
        question: 'How closures work in JavaScript?',
        answer: 'The closure is a locally declared variable related to a function that stays in memory when it has returned.<br><br>For example:<br><pre><code>function greet(message) {\n    console.log(message);\n}\nfunction greeter(name, age) {\n    return name + " says howdy!! He is " + age + " years old";\n}\n// Generate the message\nvar message = greeter("James", 23);\n// Pass it explicitly to greet\ngreet(message);</code></pre><br>This function can be better represented by using closures:<br><pre><code>function greeter(name, age) {\n    var message = name + " says howdy!! He is " + age + " years old";\n    return function greet() {\n        console.log(message);\n    };\n}\n// Generate the closure\nvar JamesGreeter = greeter("James", 23);\n// Use the closure\nJamesGreeter();</code></pre>',
        'recap-ar': 'كيف تعمل الـ closures في JavaScript؟',
        tags: ['Advanced', 'Functions'],
        dateAdded: '2023-01-15',
    },
    {
        id: '251',
        category: 'JavaScript',
        question: 'How can a value be appended to an array?',
        answer: 'A value can be appended to an array in the given manner:<br><pre><code>arr[arr.length] = value;</code></pre>',
        'recap-ar': 'إضافة قيمة إلى المصفوفة في JavaScript',
        tags: ['Beginner', 'Arrays'],
        dateAdded: '2023-01-15',
    },
    {
        id: '252',
        category: 'JavaScript',
        question: 'What is for-in loop in Javascript?',
        answer: 'The for-in loop is used to loop through the properties of an object.<br><br>The syntax for the for-in loop is:<br><pre><code>for (variable name in object){\n    statement or block to execute\n}</code></pre><br>In each repetition, one property from the object is associated with the variable name. The loop is continued till all the properties of the object are depleted.',
        'recap-ar': 'حلقة for-in في JavaScript',
        tags: ['Intermediate', 'Loops'],
        dateAdded: '2023-01-15',
    },
];

const gitHub = [
    {
        id: 'git-basic-1',
        category: 'GitHub',
        question: 'Basic Daily Use',
        answer: '<b>git init</b><br><b>Benefit</b>: ينشئ مستودع Git جديد في المجلد الحالي<br><b>Example</b>: <pre><code>$ git init\nInitialized empty Git repository in /project/.git/</code></pre><hr>' + '<b>git status</b><br><b>Benefit</b>: يعرض حالة الملفات (معدلة/محضرة/جديدة)<br><b>Example</b>: <pre><code>$ git status\nOn branch main\nChanges not staged:\n  modified: index.html</code></pre><hr>' + '<b>git add .</b><br><b>Benefit</b>: يحضر جميع التغييرات الحالية للإيداع<br><b>Example</b>: <pre><code>$ git add .\n$ git status\nChanges to be committed:\n  new file: script.js</code></pre><hr>' + '<b>git commit -m "message"</b><br><b>Benefit</b>: يسجل التغييرات المحضرة مع رسالة وصفية<br><b>Example</b>: <pre><code>$ git commit -m "update styles"\n[main ab12cd3] update styles\n 1 file changed, 5 insertions(+)</code></pre><hr>' + '<b>git log --oneline</b><br><b>Benefit</b>: يعرض سجل الإيداعات بشكل مختصر<br><b>Example</b>: <pre><code>$ git log --oneline\nab12cd3 (HEAD -> main) update styles\n34ef56a initial commit</code></pre><hr>' + '<b>git diff</b><br><b>Benefit</b>: يعرض الاختلافات بين الملفات المعدلة والإصدار الأخير<br><b>Example</b>: <pre><code>$ git diff\ndiff --git a/index.html b/index.html\n+ <h1>New Title</h1></code></pre>',
        'recap-ar': 'أوامر Git الأساسية للاستخدام اليومي',
        tags: ['Basic Daily Use', 'essential', 'workflow'],
        dateAdded: '2023-10-15',
    },
    {
        id: 'git-remote-1',
        category: 'GitHub',
        question: 'Remote Repository',
        answer: "<b>git clone &lt;url&gt;</b><br><b>Benefit</b>: ينزيل مستودع كامل من الإنترنت إلى جهازك<br><b>Example</b>: <pre><code>$ git clone https://github.com/user/repo.git\nCloning into 'repo'...</code></pre><hr>" + '<b>git push</b><br><b>Benefit</b>: يرفع التغييرات المحلية إلى المستودع البعيد<br><b>Example</b>: <pre><code>$ git push origin main\nCounting objects: 3, done.\nWriting objects: 100% (3/3), 300 bytes | 300.00 KiB/s, done.</code></pre><hr>' + '<b>git pull</b><br><b>Benefit</b>: يجلب التغييرات من المستودع البعيد ويدمجها محلياً<br><b>Example</b>: <pre><code>$ git pull\nUpdating ab12cd3..34ef56a\nFast-forward\n README.md | 2 +-</code></pre>',
        'recap-ar': 'أوامر التعامل مع المستودعات البعيدة',
        tags: ['Remote Repository', 'github', 'collaboration'],
        dateAdded: '2023-10-15',
    },
    {
        id: 'git-branch-1',
        category: 'GitHub',
        question: 'Branching',
        answer: '<b>git branch</b><br><b>Benefit</b>: يعرض قائمة الفروع المحلية<br><b>Example</b>: <pre><code>$ git branch\n* main\n  feature/login</code></pre><hr>' + "<b>git checkout -b &lt;name&gt;</b><br><b>Benefit</b>: ينشئ فرع جديد ويحول العمل إليه مباشرة<br><b>Example</b>: <pre><code>$ git checkout -b feature/search\nSwitched to new branch 'feature/search'</code></pre><hr>" + '<b>git merge &lt;branch&gt;</b><br><b>Benefit</b>: يدمج تغييرات فرع معين إلى الفرع الحالي<br><b>Example</b>: <pre><code>$ git merge feature/login\nUpdating ab12cd3..34ef56a\nFast-forward\n login.js | 15 +++++++++++++++</code></pre>',
        'recap-ar': 'أوامر إدارة الفروع',
        tags: ['Branching', 'workflow', 'collaboration'],
        dateAdded: '2023-10-15',
    },
    {
        id: 'git-advanced-1',
        category: 'GitHub',
        question: 'Advanced Git',
        answer: '<b>git stash</b><br><b>Benefit</b>: يحفظ التغييرات المؤقتة بدون عمل commit<br><b>Example</b>: <pre><code>$ git stash\nSaved working directory state</code></pre><hr>' + '<b>git stash pop</b><br><b>Benefit</b>: يعيد التغييرات المحفوظة مؤقتاً ويحذفها من قائمة stash<br><b>Example</b>: <pre><code>$ git stash pop\nChanges not staged for commit</code></pre><hr>' + '<b>git reset --hard</b><br><b>Benefit</b>: يلغي جميع التغييرات ويعيد الملفات لحالة آخر commit<br><b>Example</b>: <pre><code>$ git reset --hard\nHEAD is now at ab12cd3</code></pre><hr>' + '<b>git rebase -i HEAD~3</b><br><b>Benefit</b>: يسمح بتعديل أو دمج أو حذف آخر 3 commits<br><b>Example</b>: <pre><code>$ git rebase -i HEAD~3\n# Opens interactive editor</code></pre><hr>' + '<b>git cherry-pick &lt;commit-hash&gt;</b><br><b>Benefit</b>: ينقل commit محدد من فرع إلى الفرع الحالي<br><b>Example</b>: <pre><code>$ git cherry-pick 34ef56a\n[main 12ab34c] Fix login bug</code></pre>',
        'recap-ar': 'أوامر Git المتقدمة',
        tags: ['Advanced', 'productivity', 'history'],
        dateAdded: '2023-10-15',
    },
    {
        id: 'git-config-1',
        category: 'GitHub',
        question: 'Git Configuration',
        answer: '<b>git config --global user.name "Your Name"</b><br><b>Benefit</b>: يضبط اسم المستخدم لجميع مستودعات Git على الجهاز<br><b>Example</b>: <pre><code>$ git config --global user.name "Ahmad Ali"</code></pre><hr>' + '<b>git config --global user.email "your@email.com"</b><br><b>Benefit</b>: يضبط البريد الإلكتروني لجميع مستودعات Git على الجهاز<br><b>Example</b>: <pre><code>$ git config --global user.email "ahmad@example.com"</code></pre>',
        'recap-ar': 'إعدادات تكوين Git',
        tags: ['Configuration', 'setup', 'environment'],
        dateAdded: '2023-10-15',
    },
    {
        id: 'git-tag-1',
        category: 'GitHub',
        question: 'Version Tagging',
        answer: '<b>git tag -a v1.0 -m "Version 1.0"</b><br><b>Benefit</b>: ينشئ علامة (tag) للإصدار مع رسالة وصفية<br><b>Example</b>: <pre><code>$ git tag -a v1.0 -m "First stable release"</code></pre><hr>' + '<b>git push origin --tags</b><br><b>Benefit</b>: يرفع جميع العلامات (tags) إلى المستودع البعيد<br><b>Example</b>: <pre><code>$ git push origin --tags\nCounting objects: 1, done.\nWriting objects: 100% (1/1), 168 bytes | 168.00 KiB/s, done.</code></pre>',
        'recap-ar': 'إدارة علامات الإصدار',
        tags: ['Tagging', 'release', 'versioning'],
        dateAdded: '2023-10-15',
    },
    {
        id: 'git-history-1',
        category: 'GitHub',
        question: 'History Inspection',
        answer: '<b>git log --graph --oneline --all</b><br><b>Benefit</b>: يعرض سجل commits مع رسم بياني للفروع<br><b>Example</b>: <pre><code>$ git log --graph --oneline --all\n* ab12cd3 (HEAD -> main) Update README\n| * 34ef56a (feature/login) Add login form\n|/</code></pre><hr>' + '<b>git blame &lt;file&gt;</b><br><b>Benefit</b>: يظهر من قام بتعديل كل سطر في الملف وآخر تعديل<br><b>Example</b>: <pre><code>$ git blame index.html\nab12cd3 (Ahmad 2023-10-01) <!DOCTYPE html>\n34ef56a (Ali   2023-09-15) <html lang="ar"></code></pre>',
        'recap-ar': 'فحص سجل المشروع',
        tags: ['History', 'inspection', 'debugging'],
        dateAdded: '2023-10-15',
    },
    {
        id: 'git-cleanup-1',
        category: 'GitHub',
        question: 'Repository Cleanup',
        answer: '<b>git clean -fd</b><br><b>Benefit</b>: يحذف جميع الملفات والمجلدات غير المتعقبة<br><b>Example</b>: <pre><code>$ git clean -fd\nRemoving temp/\nRemoving debug.log</code></pre><hr>' + '<b>git bisect start</b><br><b>Benefit</b>: يبدأ عملية بحث ثنائية للعثور على commit الذي سبب مشكلة<br><b>Example</b>: <pre><code>$ git bisect start\n$ git bisect bad\n$ git bisect good v1.0</code></pre>',
        'recap-ar': 'أوامر تنظيف المستودع',
        tags: ['Cleanup', 'maintenance', 'debugging'],
        dateAdded: '2023-10-15',
    },
];

const performance = [
    {
        id: 'fullstack-1',
        category: 'Architecture',
        question: 'How would you design a real-time collaborative editing feature (like Google Docs) for a web app? Discuss backend synchronization strategies (e.g., OT vs. CRDTs) and frontend optimizations to minimize latency.',
        answer: '<b>Backend</b>: Use Conflict-free Replicated Data Types (CRDTs) for deterministic resolution or Operational Transformation (OT) for centralized control. Implement WebSockets for real-time updates.<br><b>Frontend</b>: Optimize with debounced local updates, differential syncing, and optimistic UI rendering.<br><b>Trade-offs</b>: CRDTs scale better but increase payload; OT requires a central authority.',
        'recap-ar': '',
        tags: ['Architecture', 'real-time', 'scaling', 'websockets'],
        dateAdded: '',
    },
    {
        id: 'fullstack-2',
        category: 'fullstack',
        question: "Users report intermittent 'stale data' in your React/Node.js app despite using SWR/Redis caching. How would you systematically debug this?",
        answer: '<b>Steps</b>: 1) Verify cache invalidation logic. 2) Check for race conditions in API calls. 3) Inspect HTTP headers (e.g., `Cache-Control`). 4) Audit Redis TTL settings. 5) Reproduce with mocked latency.<br><b>Follow-up</b>: How would you handle this in a distributed system?',
        'recap-ar': '',
        tags: ['Debugging', 'caching', 'react', 'nodejs'],
        dateAdded: '',
    },
    {
        id: 'fullstack-3',
        category: 'Performance',
        question: 'Your Next.js app has slow Time to Interactive (TTI) due to excessive client-side JavaScript. Outline a strategy to diagnose and fix this.',
        answer: '<b>Diagnose</b>: Use Lighthouse to identify large bundles, unused code, or long tasks.<br><b>Solutions</b>: 1) Code-split with dynamic imports. 2) Move to server components (RSC). 3) Optimize images/videos. 4) Preload critical resources.<br><b>Trade-off</b>: SSR improves TTI but increases server load.',
        'recap-ar': '',
        tags: ['Performance', 'nextjs', 'optimization'],
        dateAdded: '',
    },
    {
        id: 'fullstack-4',
        category: 'fullstack',
        question: 'A junior developer insists on using a bleeding-edge state management library that introduces instability. How would you guide them while maintaining team morale?',
        answer: '<b>Approach</b>: 1) Acknowledge their initiative. 2) Discuss trade-offs (maintenance, compatibility). 3) Propose a spike project to evaluate risks. 4) Document decision criteria.<br><b>Follow-up</b>: What if the team is resistant to any change?',
        'recap-ar': '',
        tags: ['Behavioral', 'leadership', 'mentoring'],
        dateAdded: '',
    },
    {
        id: 'fullstack-5',
        category: 'fullstack',
        question: 'How would you prevent and mitigate XSS attacks in a modern SPA with user-generated content? Cover both frontend and backend measures.',
        answer: '<b>Frontend</b>: Sanitize with DOMPurify, use CSP headers, escape dynamic content.<br><b>Backend</b>: Validate input/output, use framework-specific sanitizers (e.g., Express validator).<br><b>Advanced</b>: Implement Content Security Policy (CSP) with nonces.',
        'recap-ar': '',
        tags: ['Security', 'security', 'xss'],
        dateAdded: '',
    },
    {
        id: 'fullstack-6',
        category: 'fullstack',
        question: 'Your Node.js API’s database queries are slowing down under load. Describe how you’d identify bottlenecks and scale efficiently.',
        answer: '<b>Diagnose</b>: Use APM tools (e.g., New Relic), slow query logs, and DB indices.<br><b>Scale</b>: 1) Read replicas for read-heavy workloads. 2) Connection pooling. 3) Caching (Redis). 4) Consider sharding.<br><b>Trade-off</b>: Consistency vs. availability.',
        'recap-ar': '',
        tags: ['Scaling', 'nodejs', 'database', 'scaling'],
        dateAdded: '',
    },
    {
        id: 'fullstack-7',
        category: 'fullstack',
        question: 'How would you ensure end-to-end test reliability for a microfrontend architecture with multiple teams deploying independently?',
        answer: '<b>Strategy</b>: 1) Contract testing (Pact) for APIs. 2) Isolate tests per microfrontend. 3) Use feature flags for gradual rollouts. 4) Monitor flakiness.<br><b>Follow-up</b>: How to handle shared state in tests?',
        'recap-ar': '',
        tags: ['Testing', 'testing', 'microfrontends'],
        dateAdded: '',
    },
    {
        id: 'fullstack-8',
        category: 'Architecture',
        question: 'Compare monolithic vs. microservices for a mid-stage startup. When would you advocate for each, and what pitfalls would you highlight?',
        answer: '<b>Monolith</b>: Faster iteration early on, simpler debugging, but scales poorly.<br><b>Microservices</b>: Scales teams/tech, but adds complexity (network latency, tracing).<br><b>Pitfalls</b>: Premature optimization, distributed transactions.',
        'recap-ar': '',
        tags: ['', 'microservices', 'startups'],
        dateAdded: '',
    },
    {
        id: 'fullstack-9',
        category: 'fullstack',
        question: 'Describe a time you had to overrule a technical decision made by a peer. How did you communicate this, and what was the outcome?',
        answer: '<b>Example</b>: Overruled a tight coupling between services; proposed event-driven architecture instead.<br><b>Communication</b>: Data-driven (cost/risk analysis), collaborative workshop.<br><b>Outcome</b>: Reduced outages by 30%.',
        'recap-ar': '',
        tags: ['Behavioral', 'leadership', 'conflict'],
        dateAdded: '',
    },
    {
        id: 'fullstack-10',
        category: 'Performance',
        question: 'Your React app re-renders excessively due to context API updates. How would you optimize this without sacrificing state management needs?',
        answer: '<b>Solutions</b>: 1) Split contexts by domain. 2) Use selectors (useMemo). 3) Consider Zustand/Jotai for granular updates.<br><b>Follow-up</b>: How does this change with Server Components?',
        'recap-ar': '',
        tags: ['Performance', 'react', 'optimization'],
        dateAdded: '',
    },
    {
        id: 'fullstack-11',
        category: 'fullstack',
        question: "A production Dockerized Node.js service crashes randomly with 'OOM Killer' errors. Walk through your debugging process.",
        answer: '<b>Steps</b>: 1) Analyze `docker stats`. 2) Profile memory with `--inspect`. 3) Check for leaks (unclosed DB connections). 4) Adjust `--memory` limits.<br><b>Advanced</b>: Use `heaptrack` for heap snapshots.',
        'recap-ar': '',
        tags: ['Debugging', 'docker', 'nodejs', 'debugging'],
        dateAdded: '',
    },
    {
        id: 'fullstack-12',
        category: 'fullstack',
        question: 'How would you implement and enforce RBAC (Role-Based Access Control) in a frontend-backend system? Discuss hidden pitfalls.',
        answer: '<b>Backend</b>: JWT claims + middleware for route guards.<br><b>Frontend</b>: Conditional rendering + cached permissions.<br><b>Pitfalls</b>: Over-reliance on frontend checks, permission caching staleness.',
        'recap-ar': '',
        tags: ['Security', 'security', 'authentication'],
        dateAdded: '',
    },
    {
        id: 'fullstack-13',
        category: 'fullstack',
        question: 'How would you onboard a senior developer unfamiliar with your tech stack (e.g., moving from Java to Node.js)?',
        answer: '<b>Plan</b>: 1) Pair programming on critical paths. 2) Curate stack-specific pitfalls (e.g., event loop). 3) Assign a non-critical feature to build.<br><b>Goal</b>: Accelerate autonomy while minimizing risk.',
        'recap-ar': '',
        tags: ['Leadership', 'mentoring', 'onboarding'],
        dateAdded: '',
    },
    {
        id: 'fullstack-14',
        category: 'Architecture',
        question: 'Design a resilient file upload service (e.g., for user avatars) with retries, progress tracking, and S3 storage. Cover edge cases.',
        answer: '<b>Frontend</b>: Chunk uploads + pause/resume. Use `axios` interceptors for retries.<br><b>Backend</b>: Pre-signed URLs, idempotency keys.<br><b>Edge Cases</b>: Network flakiness, duplicate uploads, malware scanning.',
        'recap-ar': '',
        tags: ['Architecture', 'file-upload', 'aws'],
        dateAdded: '',
    },
    {
        id: 'fullstack-15',
        category: 'fullstack',
        question: 'A stakeholder demands an unrealistic deadline for a complex feature. How would you negotiate scope/timeline without compromising trust?',
        answer: '<b>Tactics</b>: 1) Break down deliverables (MVP vs. nice-to-have). 2) Highlight risks/data. 3) Propose alternatives (e.g., feature flags).<br><b>Key</b>: Align on business goals, not just dates.',
        'recap-ar': '',
        tags: ['Behavioral', 'stakeholder', 'deadlines'],
        dateAdded: '',
    },
    {
        id: 'fullstack-16',
        category: 'Performance',
        question: 'Your GraphQL API is suffering from N+1 query problems. How would you resolve this without over-fetching data?',
        answer: '<b>Solutions</b>: 1) Dataloader for batching/caching. 2) Query analysis (Apollo Engine). 3) Schema design (avoid deep nesting).<br><b>Trade-off</b>: Caching complexity vs. freshness.',
        'recap-ar': '',
        tags: ['Performance', 'graphql', 'optimization'],
        dateAdded: '',
    },
    {
        id: 'fullstack-17',
        category: 'Architecture',
        question: 'What are the most common frontend and backend architectures? Provide examples and explain when to use each.',
        answer: '<b>Frontend Architectures:</b><br>' + '<ul>' + '<li><b>Single-Page Application (SPA)</b>: React, Angular, Vue. Uses client-side routing (e.g., React Router). <i>Use Case</i>: Dynamic apps with frequent UI updates (e.g., Gmail).</li>' + '<li><b>Server-Side Rendering (SSR)</b>: Next.js, Nuxt.js. Renders HTML on the server. <i>Use Case</i>: SEO-critical apps (e.g., e-commerce product pages).</li>' + '<li><b>Static Site Generation (SSG)</b>: Gatsby, Eleventy. Pre-builds pages at deploy time. <i>Use Case</i>: Content-heavy sites (e.g., blogs, documentation).</li>' + '<li><b>Microfrontends</b>: Break UI into independent modules (e.g., Module Federation). <i>Use Case</i>: Large-scale apps with multiple teams (e.g., enterprise dashboards).</li>' + '</ul>' + '<b>Backend Architectures:</b><br>' + '<ul>' + '<li><b>Monolithic</b>: Django, Rails. All components in a single codebase. <i>Use Case</i>: Small to medium apps (e.g., MVP startups).</li>' + '<li><b>Microservices</b>: Node.js + Express, Spring Boot. Decoupled services (e.g., Auth Service, Payment Service). <i>Use Case</i>: Scalable, complex systems (e.g., Netflix, Uber).</li>' + '<li><b>Serverless</b>: AWS Lambda, Firebase Functions. Event-driven, scales to zero. <i>Use Case</i>: Irregular workloads (e.g., image processing pipelines).</li>' + '<li><b>Event-Driven</b>: Kafka, RabbitMQ. Services communicate via events. <i>Use Case</i>: Real-time systems (e.g., stock trading platforms).</li>' + '</ul>' + '<b>Hybrid Examples:</b><br>' + '<ul>' + '<li><b>SPA + Microservices</b>: Frontend React app with separate backend services (e.g., Spotify).</li>' + '<li><b>SSR + Serverless</b>: Next.js with Vercel Lambdas for dynamic content (e.g., Hulu).</li>' + '</ul>' + '<b>Trade-offs:</b><br>' + '- <b>SPA vs. SSR</b>: Better UX vs. SEO.<br>' + '- <b>Monolith vs. Microservices</b>: Simplicity vs. scalability.<br>' + '- <b>Serverless</b>: Cost-efficient but cold-start latency.',
        'recap-ar': '',
        tags: ['architecture', 'spa', 'microservices', 'serverless'],
        dateAdded: '',
    },
    {
        id: 'fullstack-20',
        category: 'Architecture',
        question: 'Design an enterprise-grade folder structure for a full-stack monorepo (Next.js + NestJS) with multi-tenancy, SSR, and real-time features. For each directory, explain: (1) Its purpose, (2) What belongs there, (3) What should NEVER go there, and (4) Edge cases to consider. Cover these scenarios:',
        answer: '<b>1. Root-Level Structure:</b><br>' + '<pre><code>├── apps/\n' + '│   ├── web/                # Next.js 14 (App Router)\n' + '│   ├── api/                # NestJS backend\n' + '│   └── mobile/             # React Native (optional)\n' + '├── libs/                   # Shared code\n' + '├── infra/                  # Terraform/Pulumi\n' + '├── scripts/                # Database migrations/seeds\n' + '└── .github/                # CI/CD workflows</code></pre>' + '<b>Rules:</b> Never put environment secrets in root-level config files.<br><br>' + '<b>2. Next.js Frontend (apps/web):</b><br>' + '<pre><code>├── src/\n' + '│   ├── app/\n' + '│   │   ├── (platform)/     # Multi-tenant route group\n' + '│   │   │   ├── [tenantId]/ # Dynamic tenant segments\n' + '│   │   │   └── layout.tsx  # Tenant-specific layout\n' + '│   │   ├── (public)/       # Non-auth routes\n' + '│   │   ├── api/            # Next.js route handlers\n' + '│   │   └── error.tsx       # Global error boundary\n' + '│   ├── components/\n' + '│   │   ├── core/           # Headless UI primitives\n' + '│   │   ├── features/       # Coupled to business logic\n' + '│   │   └── templates/      # Page skeletons\n' + '│   ├── providers/          # Context/TRPC providers\n' + '│   ├── stores/             # Zustand/Redux slices\n' + '│   ├── styles/             # Tailwind + CSS modules\n' + '│   └── types/              # Frontend-specific types</code></pre>' + '<b>Edge Case:</b> Dynamic routes must validate tenant IDs against session.<br><br>' + '<b>3. NestJS Backend (apps/api):</b><br>' + '<pre><code>├── src/\n' + '│   ├── modules/\n' + '│   │   ├── auth/\n' + '│   │   │   ├── strategies/ # Passport.js OAuth2 flows\n' + '│   │   │   └── guards/     # RBAC decorators\n' + '│   │   ├── tenant/\n' + '│   │   │   ├── entities/   # TypeORM tenant-scoped models\n' + '│   │   │   └── middleware/ # Tenant context injection\n' + '│   │   └── shared/         # Common pipes/filters\n' + '│   ├── config/             # Validated env variables\n' + '│   ├── migrations/         # TypeORM migration files\n' + '│   └── main.ts             # App bootstrap</code></pre>' + '<b>Anti-Pattern:</b> Never import modules circularly.<br><br>' + '<b>4. Shared Libraries (libs/):</b><br>' + '<pre><code>libs/\n' + '├── contracts/              # API types (tRPC/OpenAPI)\n' + '├── database/               # Prisma client + utilities\n' + '├── i18n/                   # Localization strings\n' + '└── utils/                  # Pure TS utilities</code></pre>' + '<b>Rule:</b> No React/NestJS-specific code in shared libs.<br><br>' + '<b>5. Infrastructure (infra/):</b><br>' + '<pre><code>infra/\n' + '├── modules/\n' + '│   ├── networking/         # VPC, ALB, WAF rules\n' + '│   └── kubernetes/        # Helm charts\n' + '└── environments/\n' + '    ├── dev/\n' + '    └── prod/               # Isolated state files</code></pre>' + '<b>Critical:</b> Terraform remote state must be encrypted.<br><br>' + '<b>Validation Criteria:</b><br>' + '- Tenant isolation: Database row-level security (RLS).<br>' + '- Hot-reload safety: Next.js server actions vs NestJS DI.<br>' + '- Type safety: Shared Zod schemas between frontend/backend.',
        'recap-ar': '',
        tags: ['monorepo', 'multi-tenancy', 'nextjs', 'nestjs'],
        dateAdded: '',
    },
    {
        id: 'fullstack-19',
        category: 'Full-Stack Mastery',
        question: 'As a senior full-stack engineer, walk us through how you would design, build, deploy, and maintain a high-traffic web application (e.g., a SaaS dashboard) from scratch. Cover:',
        answer: '<b>1. Architecture & Tech Stack:</b><br>' + '- <b>Frontend</b>: Next.js (App Router) for SSR/ISR, React Server Components, TailwindCSS.<br>' + '- <b>Backend</b>: NestJS microservices with API Gateway (GraphQL + REST hybrid).<br>' + '- <b>Database</b>: PostgreSQL (OLTP) + Redis (caching), read replicas for scaling.<br>' + '- <b>Infra</b>: Kubernetes (EKS/GKE) with Istio for service mesh.<br><br>' + '<b>2. Development Setup:</b><br>' + '- Monorepo (Turborepo/Nx) for shared code between frontend/backend.<br>' + '- Feature flags (LaunchDarkly) for gradual rollouts.<br>' + '- CI/CD: GitHub Actions + ArgoCD for GitOps.<br><br>' + '<b>3. Performance Optimization:</b><br>' + '- Frontend: Code splitting, edge caching (Vercel), WASM for heavy computations.<br>' + '- Backend: Connection pooling (PgBouncer), JIT-compiled queries (PostgreSQL 14+).<br>' + '- Observability: OpenTelemetry + Datadog for distributed tracing.<br><br>' + '<b>4. Security:</b><br>' + '- Frontend: CSP headers, sanitization with DOMPurify, OAuth2 (NextAuth.js).<br>' + '- Backend: Rate limiting (NestJS Throttler), SQL injection prevention (TypeORM parameterization).<br>' + '- Secrets: Vault + Kubernetes secrets rotation.<br><br>' + '<b>5. Team & Process:</b><br>' + '- Agile with 2-week sprints, RFCs for major changes.<br>' + '- Pair programming for critical features, automated code reviews (SonarQube).<br>' + '- Incident response: PagerDuty + runbook documentation.<br><br>' + '<b>6. Scaling Challenges:</b><br>' + '- Database: Sharding by tenant ID, switch to TimescaleDB for analytics.<br>' + '- Frontend: Migrate to microfrontends if teams grow beyond 10 engineers.<br>' + '- Cost: Spot instances for batch jobs, autoscaling based on SLOs (99.9% uptime).<br><br>' + '<b>Example Trade-offs:</b><br>' + '- <b>Next.js SSR vs SPA</b>: Better SEO vs faster hydration.<br>' + '- <b>Monolithic vs Microservices</b>: Faster iteration vs independent scaling.',
        'recap-ar': '',
        tags: ['architecture', 'scaling', 'security', 'devops'],
        dateAdded: '',
    },
    {
        id: 'fullstack-21',
        category: 'OOP & Architecture',
        question: 'How do Object-Oriented Programming (OOP) principles manifest in the folder structure of a Next.js/NestJS monorepo? Analyze these OOP concepts: (1) Encapsulation, (2) Inheritance, (3) Polymorphism, and (4) Abstraction. Provide concrete examples from the folder structure.',
        answer: '<b>1. Encapsulation:</b><br>' + '- <b>Example</b>: NestJS modules (<code>auth/</code>, <code>tenant/</code>) hide internal logic (e.g., JWT strategies) behind interfaces.<br>' + '- <b>Folder Rule</b>: Only expose <code>*.module.ts</code> and <code>*.controller.ts</code> to other modules.<br>' + '- <b>Violation</b>: Directly importing a service from another module’s <code>entities/</code> directory.<br><br>' + '<b>2. Inheritance:</b><br>' + '- <b>Example</b>: Base <code>AbstractRepository</code> in <code>libs/database/</code> extended by tenant-specific repositories.<br>' + '- <b>Folder Rule</b>: Shared base classes live in <code>libs/shared/</code>; child implementations in feature modules.<br>' + '- <b>Edge Case</b>: Overriding methods must maintain Liskov Substitution Principle (LSP).<br><br>' + '<b>3. Polymorphism:</b><br>' + '- <b>Example</b>: Next.js <code>error.tsx</code> files handle errors differently per route group (<code>(platform)/</code> vs <code>(public)/</code>).<br>' + '- <b>Folder Rule</b>: Components in <code>components/core/</code> accept generic props; variants in <code>components/features/</code>.<br>' + "- <b>Anti-Pattern</b>: Type-checking with <code>if (tenant === 'A')</code> instead of polymorphism.<br><br>" + '<b>4. Abstraction:</b><br>' + '- <b>Example</b>: <code>libs/contracts/</code> defines API interfaces (tRPC/OpenAPI) without implementation details.<br>' + '- <b>Folder Rule</b>: Frontend only imports from <code>contracts/</code>, never directly from backend <code>modules/</code>.<br>' + '- <b>Violation</b>: Frontend components importing NestJS entity classes.<br><br>' + '<b>OOP in Tooling:</b><br>' + '- <b>Dependency Injection (DI)</b>: NestJS <code>providers/</code> directory auto-injects services.<br>' + '- <b>Composition</b>: Next.js <code>layout.tsx</code> files compose providers and nested layouts.<br><br>' + '<b>Real-World Impact:</b><br>' + '- <b>Encapsulation</b> prevents multi-tenant data leaks.<br>' + '- <b>Polymorphism</b> enables A/B testing UI components.<br>' + '- <b>Abstraction</b> lets you switch databases (PostgreSQL → MongoDB) without frontend changes.',
        'recap-ar': '',
        tags: ['oop', 'solid', 'nestjs', 'nextjs'],
        dateAdded: '',
    },
    {
        id: 'solid-1',
        category: 'SOLID Principles',
        question: 'Explain the SOLID principles with concrete examples in Next.js (frontend) and NestJS (backend). For each principle, provide: (1) Definition, (2) Code Example, (3) Violation Example, and (4) Impact on Maintenance.',
        answer: '<b>1. Single Responsibility Principle (SRP)</b><br>' + '<u>Definition</u>: A class/component should have only one reason to change.<br>' + "<u>Next.js Example</u>: Separate 'DataFetching.tsx' (gets data) from 'UserProfile.tsx' (renders UI).<br>" + '<u>NestJS Example</u>: Split `AuthService` (business logic) from `AuthController` (HTTP handling).<br>' + '<u>Violation</u>: A React component that handles API calls, state, and UI rendering.<br>' + '<u>Impact</u>: Easier testing, fewer side effects.<br>' + '<u>RECAP-AR</u>: مبدأ المسؤولية الواحدة يعني أن كل مكون يجب أن يهتم بوظيفة واحدة فقط. هذا يسهل الاختبار والصيانة.<br><br>' + '<b>2. Open/Closed Principle (OCP)</b><br>' + '<u>Definition</u>: Open for extension, closed for modification.<br>' + '<u>Next.js Example</u>: Extend `BaseButton` with `PrimaryButton` using `className` props.<br>' + "<u>NestJS Example</u>: Use NestJS's `Interceptor` interface to add logging without changing controllers.<br>" + '<u>Violation</u>: Modifying core button component for each new style.<br>' + '<u>Impact</u>: Prevents breaking changes in core functionality.<br>' + '<u>RECAP-AR</u>: المبدأ المفتوح/المغلق يعني أن نوسع النظام دون تعديل الكود الأساسي، مما يحمي الاستقرار.<br><br>' + '<b>3. Liskov Substitution Principle (LSP)</b><br>' + '<u>Definition</u>: Subclasses should be substitutable for their parent class.<br>' + '<u>Next.js Example</u>: All `PageLayout` variants (e.g., `AdminLayout`, `UserLayout`) must work with same props.<br>' + '<u>NestJS Example</u>: `PaymentService` implementations (PayPal/Stripe) must have identical method signatures.<br>' + '<u>Violation</u>: A child component throwing errors for valid parent props.<br>' + '<u>Impact</u>: Enforces consistent behavior in polymorphism.<br>' + '<u>RECAP-AR</u>: مبدأ لسكوف يعني أن الفئات الفرعية يجب أن تعمل بنفس طريقة الفئة الأم دون مفاجآت.<br><br>' + '<b>4. Interface Segregation Principle (ISP)</b><br>' + "<u>Definition</u>: Clients shouldn't depend on interfaces they don't use.<br>" + '<u>Next.js Example</u>: Split `UserAPI` into `UserProfileAPI` and `UserSettingsAPI`.<br>' + '<u>NestJS Example</u>: Separate `ReadOnlyRepository` from `CrudRepository` interfaces.<br>' + '<u>Violation</u>: A component importing full `UserAPI` but only uses `fetchProfile` method.<br>' + '<u>Impact</u>: Reduces unnecessary re-renders and dependencies.<br>' + '<u>RECAP-AR</u>: مبدأ فصل الواجهات يقلل الاعتماديات غير الضرورية بين المكونات.<br><br>' + '<b>5. Dependency Inversion Principle (DIP)</b><br>' + '<u>Definition</u>: Depend on abstractions, not concretions.<br>' + '<u>Next.js Example</u>: Inject `DataService` via props/context rather than direct imports.<br>' + '<u>NestJS Example</u>: `UserService` should depend on `IUserRepository` interface, not concrete DB class.<br>' + '<u>Violation</u>: Directly instantiating PostgreSQL client in a service.<br>' + '<u>Impact</u>: Enables easy testing (mocking) and swapping implementations.<br>' + '<u>RECAP-AR</u>: مبدأ انعكاس التحكم يجعل النظام مرنًا وسهل التطوير عبر الاعتماد على التجريدات.<br><br>' + '<b>SOLID in Folder Structure:</b><br>' + '- <b>Next.js</b>: `components/ui/` (SRP), `providers/` (DIP)<br>' + '- <b>NestJS</b>: `modules/` (ISP), `interfaces/` (DIP)<br><br>' + '<b>Violation Penalties:</b><br>' + '- SRP Violation: 50% more bugs (MIT Study)<br>' + '- DIP Violation: 3x longer test setup (Google Data)',
        'recap-ar': '',
        tags: ['solid', 'oop', 'nestjs', 'nextjs'],
        dateAdded: '',
    },
    {
        id: 'design-patterns-1',
        category: 'Design Patterns',
        question: 'Explain the most critical design patterns for full-stack development with concrete examples in Next.js (frontend) and NestJS (backend). For each pattern, provide: (1) Definition, (2) Visual Metaphor, (3) Code Example, (4) When to Use, and (5) Anti-Patterns.',
        answer: ` <h3>1. Singleton (Creational)</h3> <p><b>Definition</b>: Ensures a class has only one instance globally accessible.</p> <p><b>Visual</b>: <img src="https://refactoring.guru/images/patterns/content/singleton/singleton.png" width="200" alt="Singleton as a unique admin key"></p> <p><b>Next.js</b>: React Context Provider (Auth state)</p> <pre><code>// libs/auth-context.tsx export const AuthContext = createContext(); // Single instance</code></pre> <p><b>NestJS</b>: Database connection pool</p> <pre><code>// database.provider.ts @Injectable() export class DatabasePool { private static instance: Pool; static getInstance() { if (!this.instance) this.instance = new Pool(); return this.instance; } }</code></pre> <p><b>When to Use</b>: Configuration managers, logging services.</p> <p><b>Anti-Pattern</b>: Using singletons for transient data (e.g., request-scoped data).</p> <p><b>RECAP-AR</b>: السينجلتون يضمن وجود نسخة وحيدة من الكلاس - مثل مدخل المبنى الذي يحتاج بطاقة واحدة للدخول.</p> <h3>2. Factory Method (Creational)</h3> <p><b>Definition</b>: Delegates instantiation to subclasses.</p> <p><b>Visual</b>: <img src="https://refactoring.guru/images/patterns/content/factory-method/factory-method-en.png" width="200" alt="Factory as a workshop producing objects"></p> <p><b>Next.js</b>: Dynamic component loading</p> <pre><code>// components/IconFactory.tsx export default function IconFactory({ type }: { type: string }) { switch (type) { case 'user': return <UserIcon />; case 'settings': return <SettingsIcon />; default: return <DefaultIcon />; } }</code></pre> <p><b>NestJS</b>: Payment processor selection</p> <pre><code>// payment/ @Injectable() export class PaymentProcessorFactory { createProcessor(type: PaymentType): IPaymentProcessor { switch (type) { case 'stripe': return new StripeProcessor(); case 'paypal': return new PayPalProcessor(); } } }</code></pre> <p><b>When to Use</b>: When object creation logic becomes complex.</p> <p><b>Anti-Pattern</b>: Using factories for simple constructors.</p> <p><b>RECAP-AR</b>: الفاكتوري ميثود تعمل كورشة تصنع أنواع مختلفة من المنتجات حسب الطلب.</p> <h3>3. Observer (Behavioral)</h3> <p><b>Definition</b>: One-to-many dependency between objects.</p> <p><b>Visual</b>: <img src="https://refactoring.guru/images/patterns/content/observer/observer.png" width="200" alt="Observer as newsletter subscriptions"></p> <p><b>Next.js</b>: Zustand state subscriptions</p> <pre><code>// stores/user-store.ts const useUserStore = create((set) => ({ user: null, subscribe: (callback) => { const unsub = onAuthStateChanged(auth, (user) => callback(user)); return unsub; } }));</code></pre> <p><b>NestJS</b>: Event emitters</p> <pre><code>// notification.service.ts @Injectable() export class NotificationService { constructor(private eventEmitter: EventEmitter2) {} @OnEvent('order.created') handleOrderCreated(payload: Order) { // Send email/SMS } }</code></pre> <p><b>When to Use</b>: Real-time updates, event-driven systems.</p> <p><b>Anti-Pattern</b>: Overusing observers leading to "spaghetti events".</p> <p><b>RECAP-AR</b>: الأوبزرفر مثل نظام الاشتراكات - عندما يتغير شيء، يتم إعلام الجميع المشتركين.</p> <h3>4. Strategy (Behavioral)</h3> <p><b>Definition</b>: Encapsulates interchangeable algorithms.</p> <p><b>Visual</b>: <img src="https://refactoring.guru/images/patterns/content/strategy/strategy.png" width="200" alt="Strategy as different travel routes"></p> <p><b>Next.js</b>: Dynamic form validation</p> <pre><code>// libs/validation-strategies.ts export const validationStrategies = { email: (value) => /@/.test(value), password: (value) => value.length >= 8, };</code></pre> <p><b>NestJS</b>: Multi-tenant database selection</p> <pre><code>// tenant/ interface IDatabaseStrategy { getConnection(tenantId: string): Connection;} @Injectable() export class DatabaseContext { constructor(private strategy: IDatabaseStrategy) {} setStrategy(strategy: IDatabaseStrategy) { this.strategy = strategy; } }</code></pre> <p><b>When to Use</b>: When you need runtime algorithm switching.</p> <p><b>Anti-Pattern</b>: Strategy explosion (too many small strategies).</p> <p><b>RECAP-AR</b>: الاستراتيجية مثل اختيار طريق مختلف للوصول لنفس الهدف حسب الظروف.</p> <h3>5. Decorator (Structural)</h3> <p><b>Definition</b>: Dynamically adds responsibilities to objects.</p> <p><b>Visual</b>: <img src="https://refactoring.guru/images/patterns/content/decorator/decorator.png" width="200" alt="Decorator as layered clothing"></p> <p><b>Next.js</b>: Higher-Order Components (HOCs)</p> <pre><code>// withAuth.tsx export function withAuth(Component) { return (props) => { const { user } = useAuth(); if (!user) return <Login />; return <Component {...props} user={user} />; }; }</code></pre> <p><b>NestJS</b>: Method decorators</p> <pre><code>// roles.decorator.ts export function Roles(...roles: string[]) { return SetMetadata('roles', roles);} @Controller('users') export class UsersController { @Get() @Roles('admin') // ← Decorator findAll() { /* ... */ } }</code></pre> <p><b>When to Use</b>: Cross-cutting concerns (logging, auth).</p> <p><b>Anti-Pattern</b>: Deep decorator nesting ("onion code").</p> <p><b>RECAP-AR</b>: الديكوراتور مثل إضافة طبقات من الملابس حسب الطقس دون تغيير الجسم الأساسي.</p> <h3>Pattern Selection Guide</h3> <table border="1"> <tr><th>Problem</th><th>Pattern</th><th>Framework Example</th></tr> <tr><td>Global state management</td><td>Singleton</td><td>Next.js Context</td></tr> <tr><td>Multiple payment methods</td><td>Strategy</td><td>NestJS PaymentService</td></tr> <tr><td>Real-time notifications</td><td>Observer</td><td>Socket.io + Zustand</td></tr> </table>`,
        'recap-ar': '',
        tags: ['design-patterns', 'nestjs', 'nextjs', 'oop'],
        dateAdded: '',
    },
];

const web = [
    {
        id: 'web-architecture-1',
        category: 'Web Architecture',
        question: 'Explain how browsers coordinate work between frontend (client-side) and backend (server-side). Cover: (1) The full request lifecycle, (2) Client-side responsibilities, (3) Server-side responsibilities, (4) Communication protocols, and (5) Performance optimization strategies.',
        answer: `
  <h2>1. Request Lifecycle</h2>
  <img src="https://mdn.mozillademos.org/files/17201/http_request_flow.png" width="600" alt="HTTP request flow diagram">
  <ol>
    <li><b>User Action</b>: Clicking a link/submitting a form triggers navigation</li>
    <li><b>DNS Lookup</b>: Browser resolves domain to IP address</li>
    <li><b>TCP Handshake</b>: 3-way SYN-SYN-ACK with the server</li>
    <li><b>HTTPS/TLS</b>: Secure tunnel established (if using HTTPS)</li>
    <li><b>HTTP Request</b>: Browser sends request (GET/POST/etc.)</li>
    <li><b>Server Processing</b>: Backend handles routing, DB queries, etc.</li>
    <li><b>HTTP Response</b>: Server sends HTML/JSON/other payload</li>
    <li><b>Client Processing</b>: Browser parses HTML, executes JS, paints pixels</li>
  </ol>

  <h2>2. Client-Side Responsibilities (Frontend)</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <h3>Core Tasks</h3>
      <ul>
        <li><b>Rendering</b>: DOM/CSSOM construction, layout, paint</li>
        <li><b>Execution</b>: Running JavaScript (React/Vue/etc.)</li>
        <li><b>State Management</b>: Client-side data (Redux/Zustand)</li>
        <li><b>Routing</b>: Client-side navigation (React Router)</li>
        <li><b>Caching</b>: Service Workers, localStorage</li>
      </ul>
    </div>
    <div>
      <h3>Example: React SPA</h3>
      <pre><code>// Client-side routing
history.pushState({}, '', '/dashboard');

// API call
fetch('/api/data')
  .then(res => res.json())
  .then(data => setState(data));</code></pre>
    </div>
  </div>

  <h2>3. Server-Side Responsibilities (Backend)</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <h3>Core Tasks</h3>
      <ul>
        <li><b>Business Logic</b>: Data validation, calculations</li>
        <li><b>Database Operations</b>: CRUD operations</li>
        <li><b>Authentication</b>: Session/JWT management</li>
        <li><b>APIs</b>: REST/GraphQL endpoints</li>
        <li><b>Security</b>: CSRF/XSS protection</li>
      </ul>
    </div>
    <div>
      <h3>Example: Node.js (Express)</h3>
      <pre><code>// API endpoint
app.get('/api/data', (req, res) => {
  const data = db.query('SELECT * FROM items');
  res.json(data);
});

// SSR
app.get('/dashboard', (req, res) => {
  const html = ReactDOMServer.renderToString(&lt;App /&gt;);
  res.send(html);
});</code></pre>
    </div>
  </div>

  <h2>4. Communication Protocols</h2>
  <table border="1">
    <tr><th>Protocol</th><th>Use Case</th><th>Example</th></tr>
    <tr><td>HTTP/1.1-2</td><td>Standard API calls</td><td><code>fetch('/data')</code></td></tr>
    <tr><td>WebSocket</td><td>Real-time updates</td><td>Chat apps</td></tr>
    <tr><td>GraphQL</td><td>Flexible queries</td><td>Apollo Client</td></tr>
    <tr><td>gRPC</td><td>Microservices</td><td>Internal services</td></tr>
  </table>

  <h2>5. Performance Optimization</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <h3>Client-Side</h3>
      <ul>
        <li><b>Code Splitting</b>: Dynamic imports</li>
        <li><b>Lazy Loading</b>: Images/Components</li>
        <li><b>Caching</b>: ETags, Service Workers</li>
        <li><b>CDN</b>: Distribute static assets</li>
      </ul>
    </div>
    <div>
      <h3>Server-Side</h3>
      <ul>
        <li><b>Load Balancing</b>: Distribute traffic</li>
        <li><b>DB Indexing</b>: Faster queries</li>
        <li><b>Caching</b>: Redis/Memcached</li>
        <li><b>Compression</b>: Gzip/Brotli</li>
      </ul>
    </div>
  </div>

  <h2>RECAP-AR (ملخص عربي)</h2>
  <p><b>العملية الكاملة:</b></p>
  <ol>
    <li>المتصفح يطلب صفحة من الخادم</li>
    <li>الخادم يعالج الطلب ويرد بالبيانات</li>
    <li>المتصفح يعرض المحتوى وينفذ الأكواد</li>
  </ol>
  <p><b>مسؤوليات العميل:</b> التصيير، التنقل، إدارة الحالة</p>
  <p><b>مسؤوليات الخادم:</b> معالجة البيانات، الأمان، قواعد البيانات</p>`,
        'recap-ar': '',
        tags: ['browser', 'http', 'frontend', 'backend'],
        dateAdded: '',
    },
	{
  "id": "network-mastery-1",
  "category": "Networking",
  "question": "What network concepts must every Senior Full-Stack Developer understand? Provide real-world examples and explanations for: (1) Protocols, (2) Security, (3) Optimization, (4) Debugging, and (5) Emerging Trends.",
  "answer": `
  <h2>1. Core Protocols</h2>
  <table border="1">
    <tr><th>Protocol</th><th>Purpose</th><th>Example</th><th>Key Insight</th></tr>
    <tr>
      <td><b>HTTP/1.1 vs HTTP/2/3</b></td>
      <td>Web page/data transfer</td>
      <td><pre><code>// HTTP/2 Server Push header
Link: </style.css>; rel=preload; as=style</code></pre></td>
      <td>HTTP/2 multiplexes requests, HTTP/3 uses QUIC (UDP-based)</td>
    </tr>
    <tr>
      <td><b>WebSocket</b></td>
      <td>Real-time bidirectional communication</td>
      <td><pre><code>// Frontend
const socket = new WebSocket('wss://api/chat');
socket.onmessage = (e) => updateChat(e.data);</code></pre></td>
      <td>Persistent connection, low latency for chat/notifications</td>
    </tr>
    <tr>
      <td><b>gRPC</b></td>
      <td>Microservices communication</td>
      <td><pre><code>service UserService {
  rpc GetUser (UserRequest) returns (User) {}
}</code></pre></td>
      <td>Protocol Buffers for binary serialization, 5-10x faster than JSON</td>
    </tr>
  </table>

  <h2>2. Security Essentials</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <h3>HTTPS/TLS</h3>
      <pre><code>// Nginx config
ssl_certificate /path/to/cert.pem;
ssl_certificate_key /path/to/key.pem;
ssl_protocols TLSv1.2 TLSv1.3;</code></pre>
      <p><b>Key Point</b>: Always enforce TLS 1.2+ (disable SSLv3). Use Let's Encrypt for free certs.</p>
    </div>
    <div>
      <h3>CORS</h3>
      <pre><code>// Express middleware
app.use(cors({
  origin: ['https://yourdomain.com'],
  methods: ['GET', 'POST']
}));</code></pre>
      <p><b>Key Point</b>: Never use <code>Access-Control-Allow-Origin: *</code> in production.</p>
    </div>
  </div>

  <h2>3. Performance Optimization</h2>
  <ul>
    <li><b>CDN Caching</b>:
      <pre><code>// Cloudflare Rule
Cache-Level: Cache Everything
Edge TTL: 1 hour</code></pre>
      (For static assets like images/CSS)
    </li>
    <li><b>TCP Optimization</b>:
      <pre><code># Linux sysctl
net.ipv4.tcp_slow_start_after_idle = 0
net.core.somaxconn = 4096</code></pre>
      (Reduces connection re-establishment delays)
    </li>
  </ul>

  <h2>4. Debugging Tools</h2>
  <table border="1">
    <tr><th>Tool</th><th>Command</th><th>Use Case</th></tr>
    <tr>
      <td><b>cURL</b></td>
      <td><code>curl -vIX GET https://api.example.com/users</code></td>
      <td>Inspect headers/timeouts</td>
    </tr>
    <tr>
      <td><b>Wireshark</b></td>
      <td><code>filter: tcp.port == 443</code></td>
      <td>Packet-level analysis</td>
    </tr>
    <tr>
      <td><b>Chrome DevTools</b></td>
      <td>Network → Throttling → "Slow 3G"</td>
      <td>Simulate mobile networks</td>
    </tr>
  </table>

  <h2>5. Emerging Trends</h2>
  <ul>
    <li><b>WebTransport</b>: Replacement for WebSockets (QUIC-based)
      <pre><code>const transport = new WebTransport('https://example.com:4999');
const stream = await transport.createBidirectionalStream();</code></pre>
    </li>
    <li><b>Edge Functions</b>:
      <pre><code>// Vercel Edge Config
export const config = {
  runtime: 'edge',
  regions: ['iad1'] // Virginia datacenter
};</code></pre>
      (Run code at CDN locations)
    </li>
  </ul>

  <h2>RECAP-AR (ملخص عربي)</h2>
  <p><b>الشبكات لتطوير Full-Stack:</b></p>
  <ol>
    <li><b>البروتوكولات</b>: HTTP/2 للسرعة، WebSocket للتواصل المباشر</li>
    <li><b>الأمان</b>: HTTPS إجباري، CORS محدود للنطاقات المعروفة</li>
    <li><b>الأداء</b>: استخدام CDN وتحسين إعدادات TCP</li>
    <li><b>التصحيح</b>: أدوات مثل cURL و Wireshark لتحليل المشاكل</li>
  </ol>`,
  "recap-ar": "",
  "tags": ["networking", "http", "websocket", "security"],
  "dateAdded": ""
}
];

const search = [
    {
  "id": "senior-fullstack-checklist-1",
  "category": "Search",
  "question": "Advanced Topics Checklist for Senior Full-Stack Developers",
  "answer": `
	<h2 class="mt-8" > ✅ JavaScript (Advanced Core) </h2>
		<ul >
		<li class="ml-4"> Closures </li>
		<li class="ml-4"> Scope (function vs block) </li>
		<li class="ml-4"> Hoisting </li>
		<li class="ml-4"> Currying </li>
		<li class="ml-4"> Event loop + Microtask/Macrotask queue </li>
		<li class="ml-4"> this binding </li>
		<li class="ml-4"> Arrow functions vs regular functions </li>
		<li class="ml-4"> Call, Apply, Bind </li>
		<li class="ml-4"> Memoization </li>
		<li class="ml-4"> Debounce vs Throttle </li>
		<li class="ml-4"> Prototype chain + Inheritance </li>
		<li class="ml-4"> Deep clone vs shallow clone </li>
		<li class="ml-4"> Symbol, WeakMap, WeakSet </li>
		<li class="ml-4"> Object.defineProperty / getter & setter </li>
		<li class="ml-4"> Destructuring & Swapping </li>
		<li class="ml-4"> Optional chaining + Nullish coalescing </li>
		<li class="ml-4"> Type coercion & Equality (== vs ===) </li>
		<li class="ml-4"> IIFE (Immediately Invoked Function Expressions) </li>
		<li class="ml-4"> Modules (ESM vs CommonJS) </li>
		<li class="ml-4"> Spread vs Rest </li>
		<li class="ml-4"> Async/Await vs Promise chaining </li>
		<li class="ml-4"> Try/catch best practices </li>
		<li class="ml-4"> Functional vs OOP JS </li>
	</ul>
<h2 class="mt-8" > ✅ TypeScript (TS) </h2>
	<li class="ml-4"> Type vs Interface </li>
	<li class="ml-4"> Utility types (Partial, Pick, Omit, Record, Exclude, etc.) </li>
	<li class="ml-4"> Generics </li>
	<li class="ml-4"> Type narrowing </li>
	<li class="ml-4"> Discriminated unions </li>
	<li class="ml-4"> Literal types </li>
	<li class="ml-4"> Enum vs union </li>
	<li class="ml-4"> as const </li>
	<li class="ml-4"> Custom types for APIs </li>
	<li class="ml-4"> Advanced infer and conditional types </li>
	<li class="ml-4"> Type guards </li>
	<li class="ml-4"> Declaration merging </li>
	<li class="ml-4"> Namespaces vs Modules </li>
	<li class="ml-4"> Working with unknown and never </li>
	<li class="ml-4"> Using TS with React/Node </li>
	<li class="ml-4"> tsconfig.json deep understanding </li>
<h2 class="mt-8" > ✅ React / Next.js </h2>
	<li class="ml-4"> Hooks (useEffect, useCallback, useMemo, custom hooks) </li>
	<li class="ml-4"> useRef and DOM access </li>
	<li class="ml-4"> Context API + Reducer </li>
	<li class="ml-4"> Component memoization (React.memo, useMemo) </li>
	<li class="ml-4"> Suspense & Lazy loading </li>
	<li class="ml-4"> Server Components (Next.js 14+) </li>
	<li class="ml-4"> App router vs Pages router </li>
	<li class="ml-4"> Routing, layout, middleware </li>
	<li class="ml-4"> Static generation (SSG) vs SSR vs ISR </li>
	<li class="ml-4"> API routes in Next.js </li>
	<li class="ml-4"> State management options: useContext, Redux, Zustand, Jotai, etc. </li>
	<li class="ml-4"> Internationalization (i18n) </li>
	<li class="ml-4"> File-based routing </li>
	<li class="ml-4"> SEO meta tags, og:image, sitemap </li>
	<li class="ml-4"> Client-side hydration & hydration mismatch </li>
	<li class="ml-4"> Forms (react-hook-form, validation) </li>
	<li class="ml-4"> CSS in JS (styled-components, tailwind, etc.) </li>
<h2 class="mt-8" > ✅ Tailwind CSS </h2>
	<li class="ml-4"> Responsive design </li>
	<li class="ml-4"> Grid vs Flex </li>
	<li class="ml-4"> Custom colors via tailwind.config.js </li>
	<li class="ml-4"> Dark mode support </li>
	<li class="ml-4"> Plugin usage </li>
	<li class="ml-4"> Component patterns (cards, modals, tables) </li>
	<li class="ml-4"> Animation & transition utilities </li>
	<li class="ml-4"> Using with RTL </li>
	<li class="ml-4"> Accessibility best practices </li>
	<li class="ml-4"> Theme customization </li>
	<li class="ml-4"> Media queries inside custom layouts </li>
	<li class="ml-4"> Utility-first vs Component CSS philosophy </li>
<h2 class="mt-8" > ✅ Node.js + NestJS </h2>
	<li class="ml-4"> Event loop and async I/O </li>
	<li class="ml-4"> Streams and Buffers </li>
	<li class="ml-4"> Error handling </li>
	<li class="ml-4"> NestJS architecture: Modules, Controllers, Providers </li>
	<li class="ml-4"> Guards, Pipes, Filters </li>
	<li class="ml-4"> Interceptors (logging, caching, etc.) </li>
	<li class="ml-4"> Middleware vs Interceptors </li>
	<li class="ml-4"> Dependency injection </li>
	<li class="ml-4"> Decorators </li>
	<li class="ml-4"> Class Validator & DTOs </li>
	<li class="ml-4"> Configuration module </li>
	<li class="ml-4"> Caching (Redis, memory) </li>
	<li class="ml-4"> Scheduling (CronJobs) </li>
	<li class="ml-4"> WebSockets (Gateway) </li>
	<li class="ml-4"> Rate limiting & throttling </li>
	<li class="ml-4"> CQRS Pattern </li>
	<li class="ml-4"> Multi-module apps </li>
<h2 class="mt-8" > ✅ PostgreSQL / Relational DBs </h2>
	<li class="ml-4"> Normalization vs denormalization </li>
	<li class="ml-4"> Indexes (B-Tree, GIN, GiST) </li>
	<li class="ml-4"> Query optimization and EXPLAIN </li>
	<li class="ml-4"> Joins (LEFT, INNER, RIGHT, FULL) </li>
	<li class="ml-4"> Transactions </li>
	<li class="ml-4"> Isolation levels </li>
	<li class="ml-4"> CTEs (WITH queries) </li>
	<li class="ml-4"> Views & Materialized views </li>
	<li class="ml-4"> Triggers </li>
	<li class="ml-4"> Constraints (PK, FK, CHECK) </li>
	<li class="ml-4"> UUIDs vs SERIAL </li>
	<li class="ml-4"> UPSERT (ON CONFLICT) </li>
	<li class="ml-4"> JSONB vs JSON </li>
	<li class="ml-4"> Full-text search </li>
	<li class="ml-4"> Advanced SQL queries </li>
	<li class="ml-4"> Performance tuning </li>
	<li class="ml-4"> Timezones & Date functions </li>
	<li class="ml-4"> Backup & restore </li>
	<li class="ml-4"> Seeders & migrations (TypeORM, Prisma, etc.) </li>
<h2 class="mt-8" > ✅ MongoDB (NoSQL) </h2>
	<li class="ml-4">Schema design best practices </li>
	<li class="ml-4">Aggregation framework </li>
	<li class="ml-4">Indexing </li>
	<li class="ml-4">MongoDB Atlas vs Local </li>
	<li class="ml-4">Document embedding vs referencing </li>
	<li class="ml-4">ACID in MongoDB </li>
	<li class="ml-4">Transactions </li>
	<li class="ml-4">Replication & Sharding </li>
	<li class="ml-4">Performance optimization </li>
	<li class="ml-4">Mongoose deep patterns </li>
<h2 class="mt-8" > ✅ Testing (Full Stack) </h2>
	<li class="ml-4"> Unit testing (Jest, Vitest) </li>
	<li class="ml-4"> Integration testing </li>
	<li class="ml-4"> E2E testing (Playwright, Cypress) </li>
	<li class="ml-4"> Mocks & Spies </li>
	<li class="ml-4"> Testing APIs in NestJS </li>
	<li class="ml-4"> Testing React components </li>
	<li class="ml-4"> Code coverage </li>
	<li class="ml-4"> CI integration </li>
<h2 class="mt-8" > ✅ Git + GitHub </h2>
	<li class="ml-4"> Git Internals </li>
	<li class="ml-4"> Branching strategies (Git Flow, trunk-based) </li>
	<li class="ml-4"> Rebasing vs Merging </li>
	<li class="ml-4"> Cherry-pick </li>
	<li class="ml-4"> Conflict resolution </li>
	<li class="ml-4"> Hooks </li>
	<li class="ml-4"> Conventional commits </li>
	<li class="ml-4"> Git tags & releases </li>
	<li class="ml-4"> Submodules </li>
	<li class="ml-4"> GitHub Actions (CI/CD) </li>
<h2 class="mt-8" > ✅ REST API + GraphQL </h2>
	<li class="ml-4"> REST standards (status codes, verbs, HATEOAS) </li>
	<li class="ml-4"> GraphQL queries/mutations </li>
	<li class="ml-4"> Apollo client/server </li>
	<li class="ml-4"> Batching, caching </li>
	<li class="ml-4"> N+1 problem </li>
	<li class="ml-4"> Authentication in GraphQL </li>
	<li class="ml-4"> Versioning strategies </li>
	<li class="ml-4"> Pagination strategies (offset vs cursor) </li>
	<li class="ml-4"> Rate limiting </li>
	<li class="ml-4"> API Documentation (Swagger, Postman) </li>
<h2 class="mt-8" > ✅ Security (Full Stack) </h2>
	<li class="ml-4"> Authentcation (JWT, OAuth2, Sessions) </li>
	<li class="ml-4"> Authorization (RBAC, ABAC) </li>
	<li class="ml-4"> XSS, CSRF, CORS </li>
	<li class="ml-4"> SQL Injection </li>
	<li class="ml-4"> Rate limiting </li>
	<li class="ml-4"> Helmet </li>
	<li class="ml-4"> HTTPS </li>
	<li class="ml-4"> Password hashing (bcrypt, argon2) </li>
	<li class="ml-4"> Sensitive config (dotenv, env schema) </li>
	<li class="ml-4"> Secure headers </li>
	<li class="ml-4"> Secrets management </li>
	<li class="ml-4"> OWASP Top 10 </li>
<h2 class="mt-8" > ✅ DevOps / Deployment </h2>
	<li class="ml-4"> Docker build, volumes, networking) </li>
	<li class="ml-4"> Docker Compose </li>
	<li class="ml-4"> Nginx </li>
	<li class="ml-4"> PM2 </li>
	<li class="ml-4"> CI/CD basics (GitHub Actions, GitLab CI) </li>
	<li class="ml-4"> Deployment to Vercel / Render / DigitalOcean </li>
	<li class="ml-4"> PostgreSQL backups </li>
	<li class="ml-4"> Health checks </li>
	<li class="ml-4"> Monitoring + Logging (Grafana, Prometheus, Loki) </li>
	<li class="ml-4"> Environment separation (dev, staging, prod) </li>
<h2 class="mt-8" > ✅ Architecture & Patterns </h2>
	<li class="ml-4"> Monolith vs Microservices </li>
	<li class="ml-4"> Clean Architecture </li>
	<li class="ml-4"> Domain Driven Design (DDD) </li>
	<li class="ml-4"> MVC, MVVM </li>
	<li class="ml-4"> Service-oriented Architecture </li>
	<li class="ml-4"> Event-driven Architecture </li>
	<li class="ml-4"> CQRS + Event Sourcing </li>
	<li class="ml-4"> SOLID Principles </li>
	<li class="ml-4"> DRY, KISS, YAGNI </li>
	<li class="ml-4"> Pub/Sub </li>
	<li class="ml-4"> Scalability (vertical, horizontal) </li>
	<li class="ml-4"> Caching layers (Redis, CDN) </li>
	<li class="ml-4"> Load balancing </li>
	<li class="ml-4"> Rate limiting </li>
	<li class="ml-4"> API Gateway </li>
<h2 class="mt-8" > ✅ Soft Skills / Engineering Mindset </h2>
	<li class="ml-4"> Debugging workflow </li>
	<li class="ml-4"> Writing clean, maintainable code </li>
	<li class="ml-4"> Code review best practices </li>
	<li class="ml-4"> Estimation techniques </li>
	<li class="ml-4"> System design interviews </li>
	<li class="ml-4"> Documentation writing </li>
	<li class="ml-4"> Mentoring juniors </li>
	<li class="ml-4"> Project structure and codebase organization </li>
	<li class="ml-4"> Communication with designers/stakeholders </li>
	<li class="ml-4"> Decision-making (why X tech over Y?) </li>
<h2 class="mt-8" > ✅ Bonus: Tools & Libraries </h2>
	<li class="ml-4">ESLint + Prettier </li>
	<li class="ml-4">Husky + lint-staged </li>
	<li class="ml-4">Storybook </li>
	<li class="ml-4">Figma to code </li>
	<li class="ml-4">Vite vs Webpack </li>
	<li class="ml-4">Postman / Insomnia </li>
	<li class="ml-4">Redis </li>
	<li class="ml-4">Prisma ORM </li>
	<li class="ml-4">TypeORM </li>
	<li class="ml-4">Chart libraries (Recharts, Chart.js) </li>
	<li class="ml-4">Stripe / PayPal SDK </li>
	<li class="ml-4">React Native (if mobile) </li>
  `,
  "recap-ar": "",
  "tags": ["advanced", "checklist", "fullstack", "senior"],
  "dateAdded": ""
},
];

export default [...search, ...Nextjs, ...Reactjs, ...typescript, ...FrontEnd, ...javascript, ...gitHub, ...web, ...performance];
