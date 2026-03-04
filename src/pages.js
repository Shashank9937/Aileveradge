export const pages = {
    home: {
        title: "AI Founder OS",
        render: () => `
      <div class="page-enter space-y-10">
        <header class="space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand font-medium tracking-wide font-outfit uppercase">
             System Status: Online
          </div>
          <h1 class="text-4xl md:text-5xl font-outfit font-bold tracking-tight text-white leading-tight">
             Build a Billion Dollar Company <br/><span class="text-gray-500">Using AI.</span>
          </h1>
          <p class="text-lg text-gray-400 max-w-2xl leading-relaxed">
             A founder operating system to help you learn AI, build AI agents, discover startup opportunities, and execute with extreme focus.
          </p>
        </header>

        <section class="space-y-6">
           <h2 class="text-xl font-medium text-white font-outfit">What This Platform Helps You Do</h2>
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="saas-card group">
                 <i data-lucide="brain" class="text-white mb-4 w-6 h-6 group-hover:text-blue-400 transition-colors"></i>
                 <h3 class="text-base font-medium text-white mb-1">Learn AI rapidly</h3>
                 <p class="text-sm text-gray-400">Master fundamental models and tools.</p>
              </div>
              <div class="saas-card group">
                 <i data-lucide="blocks" class="text-white mb-4 w-6 h-6 group-hover:text-purple-400 transition-colors"></i>
                 <h3 class="text-base font-medium text-white mb-1">Build AI agents</h3>
                 <p class="text-sm text-gray-400">Automate complex human workflows.</p>
              </div>
              <div class="saas-card group">
                 <i data-lucide="lightbulb" class="text-white mb-4 w-6 h-6 group-hover:text-yellow-400 transition-colors"></i>
                 <h3 class="text-base font-medium text-white mb-1">Generate startup ideas</h3>
                 <p class="text-sm text-gray-400">Discover billion-dollar opportunities.</p>
              </div>
              <div class="saas-card group">
                 <i data-lucide="target" class="text-white mb-4 w-6 h-6 group-hover:text-red-400 transition-colors"></i>
                 <h3 class="text-base font-medium text-white mb-1">Validate business opportunities</h3>
                 <p class="text-sm text-gray-400">Score ideas by scale and pain intensity.</p>
              </div>
              <div class="saas-card group">
                 <i data-lucide="activity" class="text-white mb-4 w-6 h-6 group-hover:text-green-400 transition-colors"></i>
                 <h3 class="text-base font-medium text-white mb-1">Track execution progress</h3>
                 <p class="text-sm text-gray-400">Measure output and focus consistently.</p>
              </div>
              <div class="saas-card group">
                 <i data-lucide="zap" class="text-white mb-4 w-6 h-6 group-hover:text-amber-400 transition-colors"></i>
                 <h3 class="text-base font-medium text-white mb-1">Develop founder habits</h3>
                 <p class="text-sm text-gray-400">Cultivate disciplines of elite operators.</p>
              </div>
           </div>
        </section>

        <section class="saas-card bg-[#111] border-[#333] mt-10">
           <div class="flex items-center gap-3 mb-4">
             <i data-lucide="quote" class="text-gray-500 w-5 h-5"></i>
             <h2 class="text-lg font-medium text-white font-outfit">Why AI Changes Entrepreneurship</h2>
           </div>
           <div class="space-y-4 text-gray-400 text-sm leading-relaxed max-w-3xl">
              <p>Historically, building large companies required large teams.</p>
              <p class="text-white font-medium">Today, AI provides massive leverage.</p>
              <p>According to Sam Altman, small teams using AI can now build companies that previously required hundreds of employees. AI allows founders to:</p>
              <ul class="list-disc pl-5 space-y-2 mt-2">
                 <li>Automate operations</li>
                 <li>Analyze data faster</li>
                 <li>Build products faster</li>
                 <li>Scale with smaller teams</li>
              </ul>
           </div>
        </section>
      </div>
    `
    },
    learningRoadmap: {
        title: "AI Learning Roadmap",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">AI Learning Roadmap for Founders</h1>
          <p class="text-sm text-gray-400 max-w-2xl">This roadmap focuses on practical AI skills that help entrepreneurs build products and companies. The goal is not academic AI research but applied AI entrepreneurship.</p>
        </header>

        <div class="relative border-l border-white/10 ml-3 pl-8 space-y-12">
           <!-- Stage 1 -->
           <div class="relative">
              <div class="absolute w-3 h-3 bg-white rounded-full -left-[38px] top-1.5 ring-4 ring-black"></div>
              <h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-1">Stage 1</h3>
              <h2 class="text-xl font-medium text-white mb-4">AI Foundations</h2>
              <div class="grid md:grid-cols-2 gap-6">
                 <div class="saas-card">
                    <h4 class="text-sm text-white font-medium mb-3">Key Concepts</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                      <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-gray-600"></i>Large Language Models (LLMs)</li>
                      <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-gray-600"></i>Transformers</li>
                      <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-gray-600"></i>Tokens and context windows</li>
                      <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-gray-600"></i>Training vs inference</li>
                      <li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 text-gray-600"></i>APIs</li>
                    </ul>
                 </div>
                 <div class="space-y-4">
                    <div>
                      <h4 class="text-sm text-white font-medium mb-1">What You Should Learn</h4>
                      <p class="text-sm text-gray-400 leading-relaxed">How AI models generate responses, how prompts influence outputs, and how AI can automate tasks.</p>
                    </div>
                    <div class="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                      <h4 class="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">Practical Goal</h4>
                      <p class="text-sm text-blue-100">Use AI tools to automate research, writing, and coding.</p>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Stage 2 -->
           <div class="relative">
              <div class="absolute w-3 h-3 bg-white rounded-full -left-[38px] top-1.5 ring-4 ring-black"></div>
              <h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-1">Stage 2</h3>
              <h2 class="text-xl font-medium text-white mb-4">AI Tools</h2>
              <div class="grid md:grid-cols-3 gap-4">
                 <div class="saas-card">
                    <h4 class="text-sm text-white font-medium mb-2">Important Companies</h4>
                    <div class="flex gap-2 flex-wrap">
                       <span class="saas-tag">OpenAI</span>
                       <span class="saas-tag">Anthropic</span>
                    </div>
                 </div>
                 <div class="saas-card">
                    <h4 class="text-sm text-white font-medium mb-2">Key Skills</h4>
                    <ul class="space-y-1 text-sm text-gray-400">
                       <li>Prompt engineering</li>
                       <li>AI-assisted coding</li>
                       <li>Research automation</li>
                    </ul>
                 </div>
                 <div class="saas-card">
                    <h4 class="text-sm text-white font-medium mb-2">Automation Examples</h4>
                    <ul class="space-y-1 text-sm text-gray-400">
                       <li>Market research</li>
                       <li>Business plan drafting</li>
                       <li>Customer analysis</li>
                    </ul>
                 </div>
              </div>
           </div>

           <!-- Stage 3 -->
           <div class="relative">
              <div class="absolute w-3 h-3 bg-white rounded-full -left-[38px] top-1.5 ring-4 ring-black"></div>
              <h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-1">Stage 3</h3>
              <h2 class="text-xl font-medium text-white mb-2">AI Automation</h2>
              <p class="text-sm text-gray-400 mb-4 max-w-2xl">AI automation connects AI models with business workflows. This allows companies to scale operations with fewer employees.</p>
              <div class="saas-card bg-[#111] border-dashed border-gray-700">
                 <h4 class="text-xs text-white uppercase tracking-wider mb-4">Example Workflow</h4>
                 <div class="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-300">
                    <div class="px-4 py-2 bg-black border border-gray-800 rounded-md">Customer email received</div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-gray-500 hidden md:block"></i>
                    <i data-lucide="arrow-down" class="w-4 h-4 text-gray-500 md:hidden"></i>
                    <div class="px-4 py-2 bg-black border border-gray-800 rounded-md">AI analyzes intent</div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-gray-500 hidden md:block"></i>
                    <i data-lucide="arrow-down" class="w-4 h-4 text-gray-500 md:hidden"></i>
                    <div class="px-4 py-2 bg-black border border-gray-800 rounded-md">AI generates response</div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-gray-500 hidden md:block"></i>
                    <i data-lucide="arrow-down" class="w-4 h-4 text-gray-500 md:hidden"></i>
                    <div class="px-4 py-2 bg-black border border-gray-800 rounded-md">System sends reply</div>
                 </div>
              </div>
           </div>

           <!-- Stage 4 -->
           <div class="relative">
              <div class="absolute w-3 h-3 bg-white rounded-full -left-[38px] top-1.5 ring-4 ring-black"></div>
              <h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-1">Stage 4</h3>
              <h2 class="text-xl font-medium text-white mb-2">AI Agents</h2>
              <p class="text-sm text-gray-400 mb-4 max-w-2xl">AI agents are autonomous systems that can perform tasks continuously. They can search information, analyze data, make decisions, and perform actions.</p>
              <div class="flex gap-2 flex-wrap">
                 <span class="saas-tag"><i data-lucide="search" class="w-3 h-3 mr-1 inline"></i> Research agents</span>
                 <span class="saas-tag"><i data-lucide="dollar-sign" class="w-3 h-3 mr-1 inline"></i> Sales agents</span>
                 <span class="saas-tag"><i data-lucide="megaphone" class="w-3 h-3 mr-1 inline"></i> Marketing agents</span>
                 <span class="saas-tag"><i data-lucide="headphones" class="w-3 h-3 mr-1 inline"></i> Customer support agents</span>
              </div>
           </div>

        </div>
      </div>
    `
    },
    agentLab: {
        title: "AI Agent Builder Lab",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">AI Agent Builder Lab</h1>
          <p class="text-sm text-gray-400">Track and build AI agents that automate workflows.</p>
        </header>

        <section class="grid md:grid-cols-2 gap-6">
           <div class="saas-card">
              <h2 class="text-lg font-medium text-white mb-3">What is an AI Agent?</h2>
              <p class="text-sm text-gray-400 leading-relaxed">An AI agent is a system that can perform tasks autonomously using artificial intelligence.</p>
              <div class="mt-6">
                 <h4 class="text-xs text-white uppercase tracking-wider mb-3">Core Components</h4>
                 <div class="space-y-2">
                    <div class="flex items-center gap-3 text-sm text-gray-300 bg-black p-3 border border-white/5 rounded-md">
                       <i data-lucide="arrow-right-to-line" class="w-4 h-4 text-blue-400"></i> Input
                    </div>
                    <div class="flex items-center gap-3 text-sm text-gray-300 bg-black p-3 border border-white/5 rounded-md">
                       <i data-lucide="brain-circuit" class="w-4 h-4 text-purple-400"></i> Reasoning
                    </div>
                    <div class="flex items-center gap-3 text-sm text-gray-300 bg-black p-3 border border-white/5 rounded-md">
                       <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i> Actions
                    </div>
                    <div class="flex items-center gap-3 text-sm text-gray-300 bg-black p-3 border border-white/5 rounded-md">
                       <i data-lucide="arrow-right-from-line" class="w-4 h-4 text-green-400"></i> Output
                    </div>
                 </div>
              </div>
           </div>

           <div class="space-y-6">
              <div class="saas-card bg-[#111] border-blue-500/20">
                 <h2 class="text-sm font-medium text-blue-400 mb-3 flex items-center gap-2"><i data-lucide="flask-conical" class="w-4 h-4"></i> Example: Market Research Agent</h2>
                 <ul class="space-y-2 text-sm text-gray-300">
                    <li class="flex items-start gap-2"><i data-lucide="chevron-right" class="w-4 h-4 mt-0.5 text-gray-600"></i> Collect data from websites</li>
                    <li class="flex items-start gap-2"><i data-lucide="chevron-right" class="w-4 h-4 mt-0.5 text-gray-600"></i> Analyze trends</li>
                    <li class="flex items-start gap-2"><i data-lucide="chevron-right" class="w-4 h-4 mt-0.5 text-gray-600"></i> Generate reports</li>
                 </ul>
              </div>

              <div class="saas-card">
                 <h2 class="text-sm font-medium text-white mb-3">Types of AI Agents</h2>
                 <div class="flex flex-wrap gap-2">
                    <span class="saas-tag">Research Agents</span>
                    <span class="saas-tag">Sales Agents</span>
                    <span class="saas-tag">Marketing Agents</span>
                    <span class="saas-tag">Customer Support Agents</span>
                    <span class="saas-tag">Data Analysis Agents</span>
                 </div>
              </div>
           </div>
        </section>

        <section class="mt-8">
           <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-white">Active Deployments</h2>
              <button class="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors">Deploy New Agent</button>
           </div>
           
           <div class="border border-white/10 rounded-xl overflow-hidden bg-[#0A0A0A]">
              <table class="w-full text-sm text-left">
                 <thead class="text-xs text-gray-500 bg-black/50 border-b border-white/10 uppercase font-outfit">
                    <tr>
                       <th class="px-6 py-3 font-medium">Agent Name</th>
                       <th class="px-6 py-3 font-medium">Type</th>
                       <th class="px-6 py-3 font-medium">Status</th>
                       <th class="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody class="divide-y divide-white/5">
                    <tr class="hover:bg-white/5 transition-colors">
                       <td class="px-6 py-4 font-medium text-white flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-green-500"></div>Market Scanner v2</td>
                       <td class="px-6 py-4 text-gray-400">Research</td>
                       <td class="px-6 py-4"><span class="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-md">Running</span></td>
                       <td class="px-6 py-4 text-right"><button class="text-gray-500 hover:text-white"><i data-lucide="more-horizontal" class="w-4 h-4"></i></button></td>
                    </tr>
                    <tr class="hover:bg-white/5 transition-colors">
                       <td class="px-6 py-4 font-medium text-white flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-gray-500"></div>Outreach Bot_01</td>
                       <td class="px-6 py-4 text-gray-400">Sales</td>
                       <td class="px-6 py-4"><span class="px-2 py-1 bg-gray-500/10 text-gray-400 text-xs rounded-md">Idle</span></td>
                       <td class="px-6 py-4 text-right"><button class="text-gray-500 hover:text-white"><i data-lucide="more-horizontal" class="w-4 h-4"></i></button></td>
                    </tr>
                 </tbody>
              </table>
              <div class="px-6 py-4 text-center text-sm text-gray-500 bg-black/20">
                 Connect API Keys in Admin to spawn more agents.
              </div>
           </div>
        </section>
      </div>
    `
    },
    agentIdeas: {
        title: "50 AI Agents You Can Build",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">50 AI Agents You Can Build</h1>
          <p class="text-sm text-gray-400">Practical AI agents that can automate real-world workflows.</p>
        </header>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           <!-- Cat 1 -->
           <div class="saas-card p-0 overflow-hidden">
              <div class="bg-blue-500/10 px-4 py-3 border-b border-white/5 flex items-center gap-2">
                 <i data-lucide="search" class="w-4 h-4 text-blue-400"></i>
                 <h3 class="text-sm font-medium text-blue-100 uppercase tracking-wider">Research Agents</h3>
              </div>
              <ul class="p-4 space-y-2 text-sm text-gray-400">
                 <li>Market Research Agent</li>
                 <li>Competitor Monitoring Agent</li>
                 <li>Startup Opportunity Scanner</li>
                 <li>Patent Research Agent</li>
                 <li>Government Policy Monitor</li>
                 <li>Trend Analysis Agent</li>
                 <li>Investment Intelligence Agent</li>
                 <li>Academic Research Agent</li>
                 <li>Industry Problem Finder</li>
                 <li>Supply Chain Intelligence Agent</li>
              </ul>
           </div>

           <!-- Cat 2 -->
           <div class="saas-card p-0 overflow-hidden">
              <div class="bg-green-500/10 px-4 py-3 border-b border-white/5 flex items-center gap-2">
                 <i data-lucide="dollar-sign" class="w-4 h-4 text-green-400"></i>
                 <h3 class="text-sm font-medium text-green-100 uppercase tracking-wider">Sales Agents</h3>
              </div>
              <ul class="p-4 space-y-2 text-sm text-gray-400">
                 <li>Lead Finder Agent</li>
                 <li>Cold Email Outreach Agent</li>
                 <li>LinkedIn Prospecting Agent</li>
                 <li>Sales Qualification Agent</li>
                 <li>Meeting Scheduling Agent</li>
                 <li>CRM Update Agent</li>
                 <li>Customer Profile Builder</li>
                 <li>Pricing Recommendation Agent</li>
                 <li>Sales Analytics Agent</li>
                 <li>Follow-up Automation Agent</li>
              </ul>
           </div>

           <!-- Cat 3 -->
           <div class="saas-card p-0 overflow-hidden">
              <div class="bg-purple-500/10 px-4 py-3 border-b border-white/5 flex items-center gap-2">
                 <i data-lucide="megaphone" class="w-4 h-4 text-purple-400"></i>
                 <h3 class="text-sm font-medium text-purple-100 uppercase tracking-wider">Marketing Agents</h3>
              </div>
              <ul class="p-4 space-y-2 text-sm text-gray-400">
                 <li>Blog Writing Agent</li>
                 <li>Social Media Automation Agent</li>
                 <li>SEO Optimization Agent</li>
                 <li>Ad Campaign Manager</li>
                 <li>Content Repurposing Agent</li>
                 <li>Video Script Generator</li>
                 <li>Customer Sentiment Analyzer</li>
                 <li>Brand Messaging Agent</li>
                 <li>Competitor Marketing Tracker</li>
                 <li>Content Trend Analyzer</li>
              </ul>
           </div>

           <!-- Cat 4 -->
           <div class="saas-card p-0 overflow-hidden">
              <div class="bg-amber-500/10 px-4 py-3 border-b border-white/5 flex items-center gap-2">
                 <i data-lucide="settings" class="w-4 h-4 text-amber-400"></i>
                 <h3 class="text-sm font-medium text-amber-100 uppercase tracking-wider">Business Ops Agents</h3>
              </div>
              <ul class="p-4 space-y-2 text-sm text-gray-400">
                 <li>Meeting Summary Agent</li>
                 <li>Project Management Agent</li>
                 <li>Customer Support Agent</li>
                 <li>Invoice Processing Agent</li>
                 <li>Resume Screening Agent</li>
                 <li>Document Drafting Agent</li>
                 <li>Internal Knowledge Assistant</li>
                 <li>Data Entry Automation Agent</li>
                 <li>Financial Analysis Agent</li>
                 <li>Task Management Agent</li>
              </ul>
           </div>

           <!-- Cat 5 -->
           <div class="saas-card p-0 overflow-hidden">
              <div class="bg-red-500/10 px-4 py-3 border-b border-white/5 flex items-center gap-2">
                 <i data-lucide="factory" class="w-4 h-4 text-red-400"></i>
                 <h3 class="text-sm font-medium text-red-100 uppercase tracking-wider">Industry Specific Agents</h3>
              </div>
              <ul class="p-4 space-y-2 text-sm text-gray-400">
                 <li>Healthcare Diagnosis Assistant</li>
                 <li>Agriculture Crop Monitoring Agent</li>
                 <li>Logistics Optimization Agent</li>
                 <li>Energy Consumption Analyzer</li>
                 <li>Carbon Credit Tracking Agent</li>
                 <li>Biomass Supply Chain Agent</li>
                 <li>Real Estate Market Analyzer</li>
                 <li>Manufacturing Quality Control Agent</li>
                 <li>Legal Contract Review Agent</li>
                 <li>Education Tutor Agent</li>
              </ul>
           </div>
        </div>
      </div>
    `
    },
    startupEngine: {
        title: "Startup Idea Engine",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">Startup Idea Generation System</h1>
          <p class="text-sm text-gray-400">Great companies start with great problems. This system helps founders discover startup opportunities.</p>
        </header>

        <section class="max-w-4xl">
           <h2 class="text-lg font-medium text-white font-outfit mb-4">Idea Evaluation Framework</h2>
           <p class="text-sm text-gray-400 mb-6">Each idea should be evaluated using the following criteria. Ideas scoring high on these metrics have greater potential.</p>
           
           <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="saas-card text-center">
                 <div class="w-12 h-12 mx-auto bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-3 text-lg font-outfit">1</div>
                 <h3 class="text-sm font-semibold text-white mb-1">Market Size</h3>
                 <p class="text-xs text-gray-500">TAM & SAM analysis</p>
              </div>
              <div class="saas-card text-center">
                 <div class="w-12 h-12 mx-auto bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-3 text-lg font-outfit">2</div>
                 <h3 class="text-sm font-semibold text-white mb-1">Pain Intensity</h3>
                 <p class="text-xs text-gray-500">Vitamin vs Painkiller</p>
              </div>
              <div class="saas-card text-center">
                 <div class="w-12 h-12 mx-auto bg-orange-500/10 text-orange-400 rounded-full flex items-center justify-center mb-3 text-lg font-outfit">3</div>
                 <h3 class="text-sm font-semibold text-white mb-1">Competition</h3>
                 <p class="text-xs text-gray-500">Blue vs Red Ocean</p>
              </div>
              <div class="saas-card text-center">
                 <div class="w-12 h-12 mx-auto bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-3 text-lg font-outfit">4</div>
                 <h3 class="text-sm font-semibold text-white mb-1">Scalability</h3>
                 <p class="text-xs text-gray-500">Operating leverage</p>
              </div>
              <div class="saas-card text-center">
                 <div class="w-12 h-12 mx-auto bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mb-3 text-lg font-outfit">5</div>
                 <h3 class="text-sm font-semibold text-white mb-1">Revenue Potential</h3>
                 <p class="text-xs text-gray-500">Ability to capture value</p>
              </div>
              <div class="saas-card text-center">
                 <div class="w-12 h-12 mx-auto bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mb-3 text-lg font-outfit">6</div>
                 <h3 class="text-sm font-semibold text-white mb-1">AI Advantage</h3>
                 <p class="text-xs text-gray-500">AI native moats</p>
              </div>
           </div>
        </section>
        
        <section class="mt-8 saas-card bg-black border-dashed">
            <h2 class="text-sm font-medium text-white mb-4">Interactive Radar Chart Demo</h2>
            <div class="h-64 relative flex items-center justify-center">
                <canvas id="ideaChart"></canvas>
            </div>
        </section>
      </div>
    `,
        onMount: () => {
            // Initialize interactive chart
            const ctx = document.getElementById('ideaChart');
            if (ctx && window.Chart) {
                new window.Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['Market Size', 'Pain Intensity', 'Competition (Lack thereof)', 'Scalability', 'Revenue Potential', 'AI Advantage'],
                        datasets: [{
                            label: 'Sample B2B SaaS Idea',
                            data: [8, 9, 4, 9, 8, 10],
                            backgroundColor: 'rgba(59, 130, 246, 0.2)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 2,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                                pointLabels: { color: '#A1A1AA', font: { family: 'Inter', size: 10 } },
                                ticks: { display: false, min: 0, max: 10 }
                            }
                        },
                        plugins: { legend: { display: false } }
                    }
                });
            }
        }
    },
    unicornModels: {
        title: "Unicorn Startup Models",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">Startup Models That Create Unicorns</h1>
          <p class="text-sm text-gray-400">Certain business models repeatedly produce billion-dollar companies.</p>
        </header>

        <div class="grid md:grid-cols-2 gap-6">
           <div class="saas-card relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent transition-opacity group-hover:opacity-100 opacity-0"></div>
              <h2 class="text-xl font-medium text-white font-outfit mb-2">Vertical SaaS</h2>
              <p class="text-sm text-gray-400 mb-4 h-10">Software built for a specific industry.</p>
              
              <div class="space-y-4">
                 <div>
                    <h4 class="text-xs uppercase text-gray-500 tracking-wider mb-1">Examples</h4>
                    <span class="saas-tag">Construction software</span>
                    <span class="saas-tag">Healthcare software</span>
                    <span class="saas-tag">Logistics software</span>
                 </div>
                 <div>
                    <h4 class="text-xs uppercase text-gray-500 tracking-wider mb-1">Benefits</h4>
                    <ul class="text-sm text-gray-300">
                       <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-3 h-3 text-green-500"></i> High recurring revenue</li>
                       <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-3 h-3 text-green-500"></i> High switching costs</li>
                    </ul>
                 </div>
              </div>
           </div>

           <div class="saas-card relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent transition-opacity group-hover:opacity-100 opacity-0"></div>
              <h2 class="text-xl font-medium text-white font-outfit mb-2">Marketplaces</h2>
              <p class="text-sm text-gray-400 mb-4 h-10">Platforms connecting buyers and sellers.</p>
              
              <div class="space-y-4">
                 <div>
                    <h4 class="text-xs uppercase text-gray-500 tracking-wider mb-1">Examples</h4>
                    <span class="saas-tag">Airbnb</span>
                 </div>
                 <div>
                    <h4 class="text-xs uppercase text-gray-500 tracking-wider mb-1">Benefits</h4>
                    <ul class="text-sm text-gray-300">
                       <li class="flex items-center gap-2"><i data-lucide="zap" class="w-3 h-3 text-amber-500"></i> Benefit from network effects</li>
                    </ul>
                 </div>
              </div>
           </div>

           <div class="saas-card relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent transition-opacity group-hover:opacity-100 opacity-0"></div>
              <h2 class="text-xl font-medium text-white font-outfit mb-2">Fintech Infrastructure</h2>
              <p class="text-sm text-gray-400 mb-4 h-10">Companies providing financial infrastructure.</p>
              
              <div class="space-y-4">
                 <div>
                    <h4 class="text-xs uppercase text-gray-500 tracking-wider mb-1">Examples</h4>
                    <span class="saas-tag bg-white text-black font-semibold border-none">Stripe</span>
                 </div>
                 <div>
                    <h4 class="text-xs uppercase text-gray-500 tracking-wider mb-1">Benefits</h4>
                    <ul class="text-sm text-gray-300">
                       <li class="flex items-center gap-2"><i data-lucide="activity" class="w-3 h-3 text-blue-500"></i> Powers digital transactions</li>
                    </ul>
                 </div>
              </div>
           </div>

           <div class="saas-card relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent transition-opacity group-hover:opacity-100 opacity-0"></div>
              <h2 class="text-xl font-medium text-white font-outfit mb-2">Platform Ecosystems</h2>
              <p class="text-sm text-gray-400 mb-4 h-10">Platforms where developers build products.</p>
              
              <div class="space-y-4">
                 <div>
                    <h4 class="text-xs uppercase text-gray-500 tracking-wider mb-1">Examples</h4>
                    <span class="saas-tag">Amazon Ecosystem</span>
                    <span class="saas-tag">Salesforce</span>
                 </div>
                 <div>
                    <h4 class="text-xs uppercase text-gray-500 tracking-wider mb-1">Benefits</h4>
                    <ul class="text-sm text-gray-300">
                       <li class="flex items-center gap-2"><i data-lucide="lock" class="w-3 h-3 text-red-500"></i> High ecosystem lock-in</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </div>
    `
    },
    founderHabits: {
        title: "Founder Habits",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">Habits of Billion Dollar Founders</h1>
          <p class="text-sm text-gray-400">The execution cultures seen in companies like Stripe, Amazon, and Tesla.</p>
        </header>

        <section>
           <h2 class="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">Influential Models</h2>
           <div class="flex gap-4 mb-8">
              <div class="flex items-center gap-3 px-4 py-2 bg-[#111] border border-white/5 rounded-full">
                 <div class="w-2 h-2 rounded-full bg-blue-500"></div><span class="text-sm text-white font-medium">Jeff Bezos</span>
              </div>
              <div class="flex items-center gap-3 px-4 py-2 bg-[#111] border border-white/5 rounded-full">
                 <div class="w-2 h-2 rounded-full bg-red-500"></div><span class="text-sm text-white font-medium">Elon Musk</span>
              </div>
              <div class="flex items-center gap-3 px-4 py-2 bg-[#111] border border-white/5 rounded-full">
                 <div class="w-2 h-2 rounded-full bg-pink-500"></div><span class="text-sm text-white font-medium">Brian Chesky</span>
              </div>
           </div>
        </section>

        <section class="max-w-4xl">
           <h2 class="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">Key Habits Matrix</h2>
           <div class="space-y-3">
              <div class="saas-card flex items-start gap-4 p-4">
                 <div class="w-10 h-10 shrink-0 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center">
                    <i data-lucide="heart" class="w-5 h-5"></i>
                 </div>
                 <div>
                    <h3 class="text-base font-medium text-white mb-1">Customer obsession</h3>
                    <p class="text-sm text-gray-400">Start with the customer and work backwards. Competition focus is reactive; customer focus is proactive.</p>
                 </div>
              </div>
              <div class="saas-card flex items-start gap-4 p-4">
                 <div class="w-10 h-10 shrink-0 bg-green-500/10 text-green-400 rounded-lg flex items-center justify-center">
                    <i data-lucide="eye" class="w-5 h-5"></i>
                 </div>
                 <div>
                    <h3 class="text-base font-medium text-white mb-1">Long-term thinking</h3>
                    <p class="text-sm text-gray-400">Make decisions that impact decades. Will to endure short term misunderstandings for long term compounding.</p>
                 </div>
              </div>
              <div class="saas-card flex items-start gap-4 p-4">
                 <div class="w-10 h-10 shrink-0 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center">
                    <i data-lucide="flask-conical" class="w-5 h-5"></i>
                 </div>
                 <div>
                    <h3 class="text-base font-medium text-white mb-1">Rapid experimentation</h3>
                    <p class="text-sm text-gray-400">Maximize the number of experiments executed per iteration cycle. Lower cost of failure.</p>
                 </div>
              </div>
              <div class="saas-card flex items-start gap-4 p-4">
                 <div class="w-10 h-10 shrink-0 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center">
                    <i data-lucide="crosshairs" class="w-5 h-5"></i>
                 </div>
                 <div>
                    <h3 class="text-base font-medium text-white mb-1">Extreme focus</h3>
                    <p class="text-sm text-gray-400">Saying no to 1000 good ideas to focus relentlessly on the one great idea.</p>
                 </div>
              </div>
              <div class="saas-card flex items-start gap-4 p-4">
                 <div class="w-10 h-10 shrink-0 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center">
                    <i data-lucide="book-open" class="w-5 h-5"></i>
                 </div>
                 <div>
                    <h3 class="text-base font-medium text-white mb-1">Continuous learning</h3>
                    <p class="text-sm text-gray-400">Voracious consumption of knowledge, mapping new paradigms (like AI) faster than the rest of the market.</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    `
    },
    executionSystem: {
        title: "Daily Execution System",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">Daily Founder Execution System</h1>
          <p class="text-sm text-gray-400">Structure your day around high-leverage activities and deep work blocks.</p>
        </header>

        <div class="relative max-w-2xl border-l border-[#333] ml-4 pl-8 pb-4 space-y-12">
            
            <div class="relative">
                <div class="absolute w-4 h-4 bg-orange-500 rounded-full -left-[39.5px] top-1 ring-4 ring-black"></div>
                <h2 class="text-xl font-medium text-white mb-4">Morning Block</h2>
                <div class="saas-card p-4 space-y-3">
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="activity" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">Exercise</span>
                   </div>
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="book" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">Reading</span>
                   </div>
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="brain" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">Strategic thinking</span>
                   </div>
                </div>
            </div>

            <div class="relative">
                <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-[39.5px] top-1 ring-4 ring-black"></div>
                <h2 class="text-xl font-medium text-white mb-4">Midday Block</h2>
                <div class="saas-card p-4 space-y-3">
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="focus" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">Deep work</span>
                   </div>
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="hammer" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">Product building</span>
                   </div>
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="cpu" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">AI experimentation</span>
                   </div>
                </div>
            </div>

            <div class="relative">
                <div class="absolute w-4 h-4 bg-purple-500 rounded-full -left-[39.5px] top-1 ring-4 ring-black"></div>
                <h2 class="text-xl font-medium text-white mb-4">Evening Block</h2>
                <div class="saas-card p-4 space-y-3">
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="users" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">Customer conversations</span>
                   </div>
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="graduation-cap" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">Learning</span>
                   </div>
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center"><i data-lucide="moon" class="w-4 h-4 text-gray-300"></i></div>
                      <span class="text-sm text-white font-medium">Reflection</span>
                   </div>
                </div>
            </div>
        </div>
      </div>
    `
    },
    weeklyReview: {
        title: "Weekly Founder Review",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">Weekly Founder Review</h1>
          <p class="text-sm text-gray-400">End your week with clarity. Answer these questions every Sunday to calibrate.</p>
        </header>

        <section class="max-w-2xl space-y-4">
           
           <div class="saas-card group group-hover:bg-[#111]">
              <label class="block text-sm font-medium text-white mb-2 font-outfit">1. What did I build this week?</label>
              <textarea class="w-full bg-black border border-[#333] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" rows="3" placeholder="List tangible outputs..."></textarea>
           </div>
           
           <div class="saas-card group group-hover:bg-[#111]">
              <label class="block text-sm font-medium text-white mb-2 font-outfit">2. What did I learn?</label>
              <textarea class="w-full bg-black border border-[#333] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" rows="3" placeholder="Key insights, paradigm shifts..."></textarea>
           </div>

           <div class="saas-card group group-hover:bg-[#111]">
              <label class="block text-sm font-medium text-white mb-2 font-outfit">3. What customer insights did I discover?</label>
              <textarea class="w-full bg-black border border-[#333] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" rows="3" placeholder="Direct feedback, observed behaviors..."></textarea>
           </div>

           <div class="saas-card group group-hover:bg-[#111]">
              <label class="block text-sm font-medium text-white mb-2 font-outfit">4. What experiments succeeded/failed?</label>
              <textarea class="w-full bg-black border border-[#333] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" rows="3" placeholder="Data tracked against hypothesis..."></textarea>
           </div>

           <div class="saas-card group group-hover:bg-[#111]">
              <label class="block text-sm font-medium text-white mb-2 font-outfit">5. What should I improve next week?</label>
              <textarea class="w-full bg-black border border-[#333] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" rows="3" placeholder="Bottlenecks to remove, habits to change..."></textarea>
           </div>

           <div class="flex justify-end pt-4">
              <button class="bg-white text-black text-sm font-medium px-6 py-2 rounded-md hover:bg-gray-200 transition-colors">Save Review</button>
           </div>
        </section>
      </div>
    `
    },
    library: {
        title: "Founder Library",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">Founder Library</h1>
          <p class="text-sm text-gray-400">Curated knowledge repository. Books include summaries and actionable lessons.</p>
        </header>

        <section>
          <div class="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
             <button class="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-full shrink-0">All</button>
             <button class="px-4 py-1.5 bg-[#111] border border-[#333] text-gray-400 text-sm rounded-full shrink-0 hover:text-white">Startup</button>
             <button class="px-4 py-1.5 bg-[#111] border border-[#333] text-gray-400 text-sm rounded-full shrink-0 hover:text-white">Business strategy</button>
             <button class="px-4 py-1.5 bg-[#111] border border-[#333] text-gray-400 text-sm rounded-full shrink-0 hover:text-white">Marketing</button>
             <button class="px-4 py-1.5 bg-[#111] border border-[#333] text-gray-400 text-sm rounded-full shrink-0 hover:text-white">Technology</button>
             <button class="px-4 py-1.5 bg-[#111] border border-[#333] text-gray-400 text-sm rounded-full shrink-0 hover:text-white">Psychology</button>
             <button class="px-4 py-1.5 bg-[#111] border border-[#333] text-gray-400 text-sm rounded-full shrink-0 hover:text-white">Artificial Intelligence</button>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mt-4">
             
             <!-- Pseudo Book Entry -->
             <div class="saas-card flex gap-4">
                 <div class="w-16 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded shrink-0 border border-white/10 flex items-center justify-center shadow-lg">
                    <i data-lucide="book" class="w-6 h-6 text-gray-500"></i>
                 </div>
                 <div>
                    <h3 class="text-base font-medium text-white mb-1">Zero to One</h3>
                    <p class="text-xs text-gray-500 mb-2">Peter Thiel</p>
                    <div class="saas-tag mb-3">Startup</div>
                    <p class="text-xs text-gray-400 line-clamp-2">How to build companies that create new things, focusing on monopolies instead of competition.</p>
                 </div>
             </div>

             <!-- Pseudo Book Entry -->
             <div class="saas-card flex gap-4">
                 <div class="w-16 h-24 bg-gradient-to-br from-blue-900 to-black rounded shrink-0 border border-white/10 flex items-center justify-center shadow-lg">
                    <i data-lucide="book" class="w-6 h-6 text-blue-500/50"></i>
                 </div>
                 <div>
                    <h3 class="text-base font-medium text-white mb-1">Superintelligence</h3>
                    <p class="text-xs text-gray-500 mb-2">Nick Bostrom</p>
                    <div class="saas-tag mb-3">Artificial Intelligence</div>
                    <p class="text-xs text-gray-400 line-clamp-2">Paths, dangers, strategies in the era of machine intelligence.</p>
                 </div>
             </div>

             <div class="saas-card border-dashed flex flex-col items-center justify-center p-8 cursor-pointer hover:border-blue-500/50 text-gray-500 hover:text-blue-400 transition-colors">
                <i data-lucide="plus" class="w-6 h-6 mb-2"></i>
                <span class="text-sm font-medium">Add to Library</span>
             </div>

          </div>
        </section>
      </div>
    `
    },
    admin: {
        title: "Admin Panel",
        render: () => `
      <div class="page-enter space-y-8">
        <header class="border-b border-white/5 pb-6">
          <h1 class="text-3xl font-outfit font-semibold tracking-tight text-white mb-2">Admin Dashboard</h1>
          <p class="text-sm text-gray-400">Manage platform content and agents. Visitors cannot access this view.</p>
        </header>

        <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
           <button class="saas-card flex flex-col items-center justify-center py-8 hover:border-white/30 text-gray-400 hover:text-white transition-all">
              <i data-lucide="bot" class="w-6 h-6 mb-3"></i>
              <span class="text-sm font-medium">Add AI Agent</span>
           </button>
           <button class="saas-card flex flex-col items-center justify-center py-8 hover:border-white/30 text-gray-400 hover:text-white transition-all">
              <i data-lucide="lightbulb" class="w-6 h-6 mb-3"></i>
              <span class="text-sm font-medium">Add Startup Idea</span>
           </button>
           <button class="saas-card flex flex-col items-center justify-center py-8 hover:border-white/30 text-gray-400 hover:text-white transition-all">
              <i data-lucide="notebook-pen" class="w-6 h-6 mb-3"></i>
              <span class="text-sm font-medium">Add Learning Note</span>
           </button>
           <button class="saas-card flex flex-col items-center justify-center py-8 hover:border-white/30 text-gray-400 hover:text-white transition-all">
              <i data-lucide="upload-cloud" class="w-6 h-6 mb-3"></i>
              <span class="text-sm font-medium">Upload Resources</span>
           </button>
        </section>

        <section class="saas-card">
           <div class="flex items-center justify-between border-b border-[#222] pb-4 mb-4">
              <h2 class="text-base font-medium text-white">Content Management Overview</h2>
              <button class="text-xs bg-[#222] text-white px-3 py-1 rounded hover:bg-[#333]">Edit Pages</button>
           </div>
           
           <div class="space-y-4">
              <div class="flex items-center justify-between text-sm">
                 <span class="text-gray-400">Total Agents Registered</span>
                 <span class="text-white font-mono">12</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                 <span class="text-gray-400">Startup Ideas Evaluated</span>
                 <span class="text-white font-mono">34</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                 <span class="text-gray-400">Library Books</span>
                 <span class="text-white font-mono">8</span>
              </div>
           </div>
        </section>
      </div>
    `
    }
};
