import React from 'react';
import { X, Calendar, User } from 'lucide-react';
import { ArticleDetailOverlay } from './ArticleDetailOverlay';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}

interface ArticlesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArticlesOverlay: React.FC<ArticlesOverlayProps> = ({ isOpen, onClose }) => {
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);
  const [isArticleDetailOpen, setIsArticleDetailOpen] = React.useState(false);

  const articles: Article[] = [
    {
      id: 1,
      title: "The Future of AI in European Business: Trends and Opportunities",
      excerpt: "Explore how artificial intelligence is reshaping the European business landscape and discover the key opportunities for growth and innovation in 2024.",
      author: "Dr. Sarah Mitchell",
      date: "March 15, 2024",
      readTime: "8 min read",
      content: "Artificial Intelligence is no longer a futuristic concept—it's a present reality transforming how European businesses operate, compete, and grow. From the bustling tech hubs of Berlin and Stockholm to the financial centers of London and Frankfurt, AI adoption is accelerating at an unprecedented pace.\n\nThe European AI market is projected to reach €85 billion by 2025, driven by increasing digitalization, regulatory support, and growing awareness of AI's potential to solve complex business challenges. This growth represents not just technological advancement, but a fundamental shift in how we approach problem-solving, decision-making, and customer engagement.\n\nKey trends shaping the European AI landscape include the rise of explainable AI, increased focus on ethical AI development, and the integration of AI with existing business processes. Companies are moving beyond pilot projects to full-scale implementations, with particular emphasis on areas like predictive analytics, process automation, and personalized customer experiences.\n\nThe opportunities are vast: from optimizing supply chains and reducing operational costs to enhancing customer service and driving innovation. However, success requires more than just technology adoption—it demands strategic thinking, cultural change, and a commitment to continuous learning and adaptation."
    },
    {
      id: 2,
      title: "Quantum Computing: From Theory to Practical Business Applications",
      excerpt: "Understanding how quantum computing is moving from research labs to real-world business solutions, and what this means for your organization.",
      author: "Prof. Marcus Weber",
      date: "March 8, 2024",
      readTime: "12 min read",
      content: "Quantum computing represents one of the most significant technological leaps of our time, promising to solve problems that are currently intractable for classical computers. While still in its early stages, quantum computing is rapidly moving from theoretical research to practical applications that could revolutionize industries.\n\nThe fundamental advantage of quantum computing lies in its ability to process information in ways that classical computers cannot. Where traditional computers use bits that exist in either 0 or 1 states, quantum computers use quantum bits (qubits) that can exist in multiple states simultaneously through a phenomenon called superposition.\n\nCurrent applications showing promise include optimization problems in logistics and supply chain management, financial modeling and risk analysis, drug discovery and molecular simulation, and cryptography and security. Major technology companies and research institutions across Europe are investing heavily in quantum research, with significant developments emerging from centers in the Netherlands, Germany, and the UK.\n\nFor businesses, the key is not to wait for quantum computing to mature fully, but to begin understanding its potential impact and preparing for its eventual integration into business operations. This includes identifying use cases where quantum advantages could provide competitive benefits and building partnerships with quantum research institutions and technology providers."
    },
    {
      id: 3,
      title: "AI Strategy Implementation: A Step-by-Step Guide for SMEs",
      excerpt: "A comprehensive guide for small and medium enterprises looking to implement AI solutions effectively without overwhelming their existing operations.",
      author: "Elena Rodriguez",
      date: "February 28, 2024",
      readTime: "6 min read",
      content: "Small and medium enterprises (SMEs) often face unique challenges when implementing AI solutions. Unlike large corporations with dedicated IT departments and substantial budgets, SMEs must be strategic and efficient in their approach to AI adoption.\n\nThe first step is assessment and goal setting. SMEs should begin by identifying specific business challenges that AI could address, such as customer service automation, inventory management, or sales forecasting. It's crucial to start with clear, measurable objectives rather than pursuing AI for its own sake.\n\nNext comes the selection of appropriate tools and platforms. Many AI solutions today are designed with SMEs in mind, offering user-friendly interfaces and affordable pricing models. Cloud-based AI services, in particular, allow SMEs to access sophisticated capabilities without significant upfront investment in infrastructure.\n\nImplementation should be gradual and iterative. Rather than attempting to transform the entire business at once, successful SMEs typically start with pilot projects that demonstrate value and build confidence. This approach allows for learning, adjustment, and gradual scaling of AI initiatives.\n\nFinally, success requires ongoing commitment to learning and adaptation. AI technology evolves rapidly, and SMEs that stay informed about new developments and continuously refine their approach are most likely to achieve lasting benefits from their AI investments."
    },
    {
      id: 4,
      title: "Reskilling Your Workforce for the AI Era",
      excerpt: "How to prepare your team for AI integration through strategic reskilling programs that enhance productivity while maintaining human value.",
      author: "James Thompson",
      date: "February 20, 2024",
      readTime: "10 min read",
      content: "The integration of AI into business operations inevitably raises questions about the future of work and the skills employees will need to remain valuable in an AI-enhanced workplace. Rather than viewing AI as a threat to employment, forward-thinking organizations are using this transition as an opportunity to upskill their workforce and create more engaging, high-value roles.\n\nSuccessful reskilling programs begin with a comprehensive assessment of current capabilities and future needs. This involves mapping existing skills, identifying gaps that AI integration will create, and determining which new competencies will be most valuable. The goal is not to replace human workers with AI, but to augment human capabilities and create new opportunities for growth and contribution.\n\nKey areas for reskilling include data literacy, AI tool proficiency, critical thinking and problem-solving, emotional intelligence and interpersonal skills, and adaptability and continuous learning mindset. These skills complement AI capabilities rather than competing with them, ensuring that human workers remain essential to business success.\n\nImplementation strategies should be tailored to different roles and learning styles. Some employees may benefit from formal training programs, while others learn better through hands-on experience and mentoring. The most effective programs combine multiple approaches and provide ongoing support as employees adapt to new ways of working.\n\nThe investment in reskilling pays dividends not only in improved productivity and innovation but also in employee satisfaction and retention. Workers who feel supported in their professional development are more likely to embrace change and contribute to the organization's AI transformation journey."
    },
    {
      id: 5,
      title: "Data Privacy and AI: Navigating GDPR in the Age of Machine Learning",
      excerpt: "Essential considerations for European businesses implementing AI solutions while maintaining compliance with data protection regulations.",
      author: "Dr. Anna Kowalski",
      date: "February 12, 2024",
      readTime: "9 min read",
      content: "The intersection of artificial intelligence and data privacy represents one of the most complex challenges facing European businesses today. The General Data Protection Regulation (GDPR) establishes strict requirements for data processing, while AI systems often require large amounts of data to function effectively. Navigating this landscape requires careful planning and a deep understanding of both technological capabilities and regulatory requirements.\n\nGDPR principles that particularly impact AI implementation include lawfulness, fairness, and transparency in data processing, purpose limitation and data minimization, accuracy and data quality requirements, and individual rights including the right to explanation. These principles can seem at odds with AI systems that often work as 'black boxes' and require extensive data for training and operation.\n\nHowever, compliance is not only possible but can actually improve AI system quality and business outcomes. Privacy-by-design approaches encourage the development of more efficient algorithms that work with less data, while transparency requirements drive the creation of more explainable AI systems that build trust with users and stakeholders.\n\nPractical strategies for GDPR-compliant AI include implementing robust data governance frameworks, using privacy-preserving techniques like differential privacy and federated learning, ensuring clear consent mechanisms and data subject rights, and conducting regular privacy impact assessments. Organizations should also establish clear policies for AI decision-making and provide mechanisms for human oversight and intervention.\n\nThe key is to view privacy compliance not as a constraint on AI development, but as a framework for building more trustworthy, sustainable, and ultimately more successful AI systems that respect individual rights while delivering business value."
    }
  ];

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleDetailOpen(true);
  };

  const handleCloseArticleDetail = () => {
    setIsArticleDetailOpen(false);
    setSelectedArticle(null);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ backgroundColor: '#f2ebe2' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4" style={{ backgroundColor: '#f2ebe2' }}>
            <h2 className="text-xl font-bold" style={{ color: '#0D5EAF' }}>Our Articles</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" style={{ color: '#0D5EAF' }} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {articles.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => handleArticleClick(article)}
                  className="p-4 rounded-lg border-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  style={{ 
                    backgroundColor: '#f2ebe2', 
                    borderColor: '#0D5EAF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0A4A8A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#0D5EAF';
                  }}
                >
                  <h3 className="font-semibold mb-2 text-lg leading-tight" style={{ color: '#0D5EAF' }}>
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#0D5EAF' }}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs" style={{ color: '#0D5EAF' }}>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <span className="font-medium">{article.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ArticleDetailOverlay
        isOpen={isArticleDetailOpen}
        onClose={handleCloseArticleDetail}
        article={selectedArticle}
      />
    </>
  );
};