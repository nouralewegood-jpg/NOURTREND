'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, Brain, ShoppingBag, TrendingUp, Zap, 
  MessageCircle, Sparkles, Copy, Check, RefreshCw,
  Star, Truck, Shield, Clock, WhatsApp
} from 'lucide-react'

// 🛍️ 20 منتج ترند حقيقي مع بيانات AI كاملة
const PRODUCTS = [
  {
    id: 1,
    name: "عطر أفنان 9PM ريبيل",
    price: 150,
    originalPrice: 220,
    wholesale: 45,
    profit: 70,
    stock: 15,
    category: "عطور",
    image: "https://i5.walmartimages.com/asr/487e7f40-d574-43ab-a982-6528d59d6d5d.13d728918074de702b322a371844c58e.jpeg",
    badge: "الأكثر مبيعاً 🔥",
    trendScore: 98,
    aiDescription: "العطر الأكثر رواجاً في الإمارات 2025! مزيج فريد من الحمضيات والتوابل مع قاعدة خشبية دافئة تدوم 24 ساعة. ✨ يفوق مبيعاته 10,000 زجاجة شهرياً في دبي.",
    supplier: "AliExpress",
    shipping: "2-3 أيام"
  },
  {
    id: 2,
    name: "شوكولاتة دبي الكنافة بالفستق",
    price: 85,
    originalPrice: 120,
    wholesale: 25,
    profit: 70,
    stock: 50,
    category: "مأكولات",
    image: "https://images.squarespace-cdn.com/content/v1/56ca92b82e83f84324967441/7055e619-4265-46f0-85db-672974a316d7/Dubai+pistachio+knafeh+chocolate+bar.jpg",
    badge: "ترند TikTok 🍫",
    trendScore: 99,
    aiDescription: "الشوكولاتة الفيروسية التي اجتاحت TikTok! طبقات مقرمشة من الكنافة مع كريمة الفستق الحلبي الفاخر. شحن مبرد يحافظ على الطازجة. 🌟",
    supplier: "Local UAE",
    shipping: "24 ساعة"
  },
  {
    id: 3,
    name: "ماسك LED العلاجي 7 ألوان",
    price: 199,
    originalPrice: 399,
    wholesale: 35,
    profit: 82,
    stock: 8,
    category: "جمال",
    image: "https://www.cnet.com/a/img/resize/c75bbc0df786743e50f92763410994f6ed0e14ea/hub/2025/05/15/78c37005-a885-4fdf-9944-64adc5513759/shark-cryoglow-led-face-mask.jpg",
    badge: "تكنولوجيا 💆‍♀️",
    trendScore: 92,
    aiDescription: "7 ألوان LED لعلاج حب الشباب والتجاعيد والبقع الداكنة. نتائج مرئية خلال أسبوعين فقط. FDA معتمد وآمن للاستخدام المنزلي. ✨",
    supplier: "CJ Dropshipping",
    shipping: "5-7 أيام"
  },
  {
    id: 4,
    name: "مبخر ذكي Moodo بالبلوتوث",
    price: 199,
    originalPrice: 350,
    wholesale: 40,
    profit: 80,
    stock: 12,
    category: "منزل",
    image: "https://m.media-amazon.com/images/I/717lHbeR1pL._AC_UF1000,1000_QL80_.jpg",
    badge: "ذكي 🏠",
    trendScore: 88,
    aiDescription: "تحكم كامل عبر التطبيق! توزيع عطري في مساحات تصل إلى 260 متر مكعب. 4 كبسولات قابلة للمزج. مؤقت ذكي وتشغيل آلي. 🌸",
    supplier: "AliExpress",
    shipping: "7-10 أيام"
  },
  {
    id: 5,
    name: "سماعات AirPods Pro (درجة أولى)",
    price: 99,
    originalPrice: 199,
    wholesale: 15,
    profit: 85,
    stock: 30,
    category: "تقنية",
    image: "https://media.istockphoto.com/id/1204039347/photo/apple-airpods-on-a-white-background.jpg",
    badge: "خصم 50% 🎧",
    trendScore: 85,
    aiDescription: "جودة صوت سينمائية مع إلغاء ضوضاء نشط. بلوتوث 5.3، بطارية 30 ساعة، مقاومة للماء IPX4. نفس مواصفات الأصلية بسعر أقل! 🔥",
    supplier: "Spocket",
    shipping: "3-5 أيام"
  },
  {
    id: 6,
    name: "دلة قهوة عربية ذهبية فاخرة",
    price: 249,
    originalPrice: 400,
    wholesale: 60,
    profit: 75,
    stock: 20,
    category: "تراثي",
    image: "https://m.media-amazon.com/images/I/3196e94dd8349a4d58a74673db2d178623d5f8ae.jpg",
    badge: "فاخر ☕",
    trendScore: 78,
    aiDescription: "دلة ذهبية تقليدية بتصميم خليجي أصيل منقوش يدوياً. مناسبة للضيافة العربية والهدايا الفاخرة. سعة 1 لتر مع عازل حراري. 👑",
    supplier: "Local UAE",
    shipping: "1-2 أيام"
  },
  {
    id: 7,
    name: "ساعة ذكية متكاملة Health Pro",
    price: 179,
    originalPrice: 350,
    wholesale: 38,
    profit: 78,
    stock: 25,
    category: "تقنية",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    badge: "صحي ⌚",
    trendScore: 82,
    aiDescription: "مراقبة صحية شاملة: ECG، SpO2، ضغط الدم، معدل ضربات القلب، وتحليل النوم. مقاومة للماء IP68، بطارية 7 أيام. 💪",
    supplier: "AliExpress",
    shipping: "5-7 أيام"
  },
  {
    id: 8,
    name: "خلاط محمول USB للسموذي",
    price: 89,
    originalPrice: 160,
    wholesale: 18,
    profit: 80,
    stock: 40,
    category: "مطبخ",
    image: "https://images.unsplash.com/photo-1570222094114-28a9d8896b74?w=500",
    badge: "صحي 🥤",
    trendScore: 75,
    aiDescription: "خذ صحتك معك! خلاط USB قابل للشحن مع 6 شفرات ستانلس. مثالي للسموذي والعصائر في الجيم أو العمل. سعة 500ml. 🏃‍♀️",
    supplier: "CJ Dropshipping",
    shipping: "7-10 أيام"
  },
  {
    id: 9,
    name: "مغناطيس حجاب ذهبي فاخر",
    price: 35,
    originalPrice: 70,
    wholesale: 5,
    profit: 86,
    stock: 100,
    category: "أزياء",
    image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa33?w=500",
    badge: "أكثر مبيعاً 🧕",
    trendScore: 91,
    aiDescription: "وداعاً للدبابيس! مغناطيس نيوديميوم قوي لا يترك ثقوباً في الحجاب. 4 قطع بألوان ذهبية وفضية ووردية. هدية مثالية! ✨",
    supplier: "AliExpress",
    shipping: "5-7 أيام"
  },
  {
    id: 10,
    name: "مجموعة العناية بالبشرة العضوية",
    price: 199,
    originalPrice: 350,
    wholesale: 42,
    profit: 79,
    stock: 18,
    category: "جمال",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
    badge: "طبيعي 🌿",
    trendScore: 80,
    aiDescription: "100% طبيعي وعضوي! مجموعة كاملة: صابون أفغاني، زيت أرغان، سيروم فيتامين C، كريم ليلي. خالية من الكيماويات. 🌸",
    supplier: "Spocket",
    shipping: "3-5 أيام"
  },
  {
    id: 11,
    name: "شموع صويا فاخرة برائحة العود",
    price: 120,
    originalPrice: 220,
    wholesale: 28,
    profit: 77,
    stock: 35,
    category: "منزل",
    image: "https://images.unsplash.com/photo-1602825389660-3f9749873e20?w=500",
    badge: "فاخر 🕯️",
    trendScore: 73,
    aiDescription: "شمع صويا طبيعي 100% بروائح العود والعنبر الفاخرة. 50 ساعة احتراق متواصل. زجاج كريستالي قابل لإعادة الاستخدام. 🏠",
    supplier: "Local UAE",
    shipping: "1-2 أيام"
  },
  {
    id: 12,
    name: "ستاند لابتوب ألمنيوم متعدد الزوايا",
    price: 129,
    originalPrice: 250,
    wholesale: 32,
    profit: 75,
    stock: 22,
    category: "تقنية",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    badge: "مكتب 💻",
    trendScore: 77,
    aiDescription: "حماية لرقبتك! ستاند ألمنيوم قابل للطي بـ6 مستويات. تبريد محسّن، مناسب لجميع الأحجام 11-17 بوصة. خفيف الوزن للتنقل. 👨‍💻",
    supplier: "AliExpress",
    shipping: "7-10 أيام"
  },
  {
    id: 13,
    name: "عصابة نوم ذكية مع سماعات",
    price: 99,
    originalPrice: 180,
    wholesale: 22,
    profit: 78,
    stock: 28,
    category: "تقنية",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    badge: "نوم 😴",
    trendScore: 71,
    aiDescription: "نوم هادئ بدون إزعاج! عصابة ناعمة مع سماعات بلوتوث 5.0 للاستماع للأصوات المهدئة أو البودكاست أثناء النوم. قابلة للغسل. 🌙",
    supplier: "CJ Dropshipping",
    shipping: "7-10 أيام"
  },
  {
    id: 14,
    name: "طقم أدوات مطبخ سيليكون 12 قطعة",
    price: 79,
    originalPrice: 160,
    wholesale: 16,
    profit: 80,
    stock: 45,
    category: "مطبخ",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500",
    badge: "مطبخ 🍳",
    trendScore: 69,
    aiDescription: "طقم كامل FDA معتمد! مقاوم للحرارة حتى 230°م، لا يخدش الأواني، سيليكون غير سام مع حامل خشبي أنيق. 12 قطعة عملية. 👩‍🍳",
    supplier: "AliExpress",
    shipping: "7-10 أيام"
  },
  {
    id: 15,
    name: "مخدة سفر ميموري فوم فاخرة",
    price: 65,
    originalPrice: 130,
    wholesale: 12,
    profit: 81,
    stock: 38,
    category: "سفر",
    image: "https://images.unsplash.com/photo-1522771753035-a0a1f66cd459?w=500",
    badge: "سفر ✈️",
    trendScore: 72,
    aiDescription: "راحة في كل رحلة! دعم مثالي للرقبة والعمود الفقري. ميموري فوم عالي الجودة، غطاء قابل للغسل، حقيبة سفر مرفقة. 🧳",
    supplier: "Spocket",
    shipping: "3-5 أيام"
  },
  {
    id: 16,
    name: "منظم مكياج أكريليك دوار 360°",
    price: 110,
    originalPrice: 220,
    wholesale: 24,
    profit: 78,
    stock: 20,
    category: "جمال",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    badge: "تنظيم 💄",
    trendScore: 84,
    aiDescription: "تنظيم ذكي! دوران سلس 360 درجة، 3 مستويات قابلة للتعديل، تتسع لـ50+ منتج. أكريليك شفاف عالي الجودة. هدية مثالية! 💅",
    supplier: "AliExpress",
    shipping: "7-10 أيام"
  },
  {
    id: 17,
    name: "زجاجة ماء ذكية بتذكير بالشرب",
    price: 55,
    originalPrice: 110,
    wholesale: 10,
    profit: 82,
    stock: 60,
    category: "صحة",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    badge: "صحة 💧",
    trendScore: 68,
    aiDescription: "حافظ على ترطيبك! علامات زمنية لتتبع شرب الماء، إضاءة LED تذكيرية، BPA free، سعة 1 لتر. مثالية للرياضة والعمل. 🏃‍♂️",
    supplier: "CJ Dropshipping",
    shipping: "7-10 أيام"
  },
  {
    id: 18,
    name: "سماعة بلوتوث محمولة مع إضاءة",
    price: 140,
    originalPrice: 280,
    wholesale: 30,
    profit: 79,
    stock: 25,
    category: "تقنية",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    badge: "موسيقى 🎵",
    trendScore: 76,
    aiDescription: "صوت 360° قوي! إضاءة LED متغيرة الألوان، مقاومة للماء IPX7، بطارية 12 ساعة. مثالية للرحلات البرية والشاطئ. 🔊",
    supplier: "AliExpress",
    shipping: "7-10 أيام"
  },
  {
    id: 19,
    name: "مات يوغا TPE مضاد للانزلاق",
    price: 75,
    originalPrice: 150,
    wholesale: 14,
    profit: 81,
    stock: 42,
    category: "رياضة",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    badge: "رياضة 🧘‍♀️",
    trendScore: 74,
    aiDescription: "صديق للبيئة! مات TPE طبيعي، مضاد للانزلاق، خطوط محاذاة لليوغا، سماكة 6mm مريحة للمفاصل. حقيبة حمل مرفقة. 🏋️‍♀️",
    supplier: "Spocket",
    shipping: "3-5 أيام"
  },
  {
    id: 20,
    name: "كوب قهوة حافظ للحرارة ذكي",
    price: 95,
    originalPrice: 180,
    wholesale: 20,
    profit: 78,
    stock: 30,
    category: "مكتب",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
    badge: "ذكي ☕",
    trendScore: 70,
    aiDescription: "تحكم في حرارة قهوتك! تطبيق موبايل للتحكم في الحرارة، شحن لاسلكي، يحافظ على الحرارة 3 ساعات. مثالي للمكتب. 🔥",
    supplier: "AliExpress",
    shipping: "7-10 أيام"
  }
]

// 🤖 مولد أوصاف AI متقدم
const AI_GENERATOR = {
  templates: {
    luxury: (name: string, features: string) => 
      `✨ اكتشف الفخامة مع ${name}! ${features} جودة عالية لا مثيل لها، تصميم أنيق يلفت الأنظار. احصل عليه الآن بسعر حصري مع توصيل مجاني لجميع إمارات الدولة! 🚚💎`,
    
    urgent: (name: string, features: string) => 
      `🔥 لا يفوتك ${name}! ${features} الكمية محدودة والطلبات تتدفق بسرعة. اطلب الآن قبل نفاد المخزن واستمتع بخصم 30%! ⏰⚡`,
    
    social: (name: string, features: string) => 
      `🌟 ${name} يغير قواعد اللعبة! ${features} جربه بنفسك وانضم لآلاف العملاء الراضين. شاركنا رأيك واكسب خصم إضافي! 📸✨`,
    
    professional: (name: string, features: string) => 
      `💼 حل احترافي لاحتياجاتك: ${name}. ${features} أداء موثوق، جودة مضمونة، ضمان استبدال 7 أيام. استثمارك الأمثل! 🎯`
  },

  generate(name: string, features: string, tone: string = 'luxury') {
    return this.templates[tone as keyof typeof this.templates](name, features)
  },

  async generateWithAI(name: string, features: string) {
    // محاكاة API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    return this.generate(name, features, 'luxury')
  }
}

export default function NourtrendStore() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [aiProduct, setAiProduct] = useState('')
  const [aiFeatures, setAiFeatures] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [cart, setCart] = useState<typeof PRODUCTS>([])

  const categories = ['all', 'عطور', 'مأكولات', 'جمال', 'تقنية', 'منزل', 'أزياء', 'تراثي', 'مطبخ', 'سفر', 'رياضة', 'صحة']

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory)

  const generateAI = async () => {
    if (!aiProduct) return
    setIsGenerating(true)
    const result = await AI_GENERATOR.generateWithAI(aiProduct, aiFeatures)
    setAiResult(result)
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart([...cart, product])
  }

  const getWhatsAppLink = (product: typeof PRODUCTS[0]) => {
    return `https://wa.me/971508423094?text=أرغب%20في%20طلب%20${encodeURIComponent(product.name)}%20بسعر%20${product.price}%20درهم`
  }

  const getBulkOrderLink = () => {
    if (cart.length === 0) return '#'
    const items = cart.map(p => `${p.name} (${p.price} درهم)`).join('%0A')
    return `https://wa.me/971508423094?text=طلب%20مجموع:%0A${encodeURIComponent(items)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                <Sparkles size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nourtrend
                </h1>
                <p className="text-xs text-gray-500 font-medium">AI-Powered Store UAE</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {cart.length > 0 && (
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-gray-700" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                </div>
              )}
              <a 
                href="https://wa.me/971508423094"
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition shadow-lg shadow-green-500/30"
              >
                <WhatsApp size={18} />
                <span>0508423094</span>
              </a>
              <Link 
                href="/admin"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium"
              >
                لوحة التحكم
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-8 shadow-sm">
              <Zap size={16} className="text-purple-600" />
              <span>مدعوم بأحدث تقنيات الذكاء الاصطناعي 2025</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              اكتشف <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">الترند</span><br />
              قبل الجميع
            </h2>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              متجر Nourtrend يستخدم AI لتحليل TikTok وAliExpress ويقدم لك 
              <span className="font-semibold text-purple-600"> 20 منتج ترند </span>
              حقيقي مع تسعير ذكي وربحية عالية
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#products"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:shadow-xl hover:shadow-purple-500/30 transition flex items-center justify-center gap-2"
              >
                استكشف المنتجات
                <ArrowRight size={20} />
              </a>
              <a 
                href="#ai-generator"
                className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-bold hover:border-purple-300 hover:bg-purple-50 transition flex items-center justify-center gap-2"
              >
                <Brain size={20} className="text-purple-600" />
                جرب مولد AI
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-green-500" />
                <span>توصيل سريع</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-blue-500" />
                <span>دفع عند الاستلام</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-purple-500" />
                <span>توصيل 24 ساعة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">20+</div>
              <div className="text-sm text-gray-500">منتج ترند</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">75%</div>
              <div className="text-sm text-gray-500">متوسط الربح</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">24h</div>
              <div className="text-sm text-gray-500">توصيل سريع</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">AI</div>
              <div className="text-sm text-gray-500">تسعير ذكي</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Generator Section */}
      <section id="ai-generator" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-4">
              <Sparkles size={16} />
              <span>جديد 2025</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">مولد المحتوى الذكي</h3>
            <p className="text-gray-400 text-lg">أدخل اسم منتج وسيقوم AI بإنشاء وصف احترافي كامل جاهز للنشر</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <input 
                type="text" 
                value={aiProduct}
                onChange={(e) => setAiProduct(e.target.value)}
                placeholder="اسم المنتج (مثال: ساعة ذكية فاخرة)"
                className="px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
              />
              <input 
                type="text" 
                value={aiFeatures}
                onChange={(e) => setAiFeatures(e.target.value)}
                placeholder="المميزات (مثال: مقاومة للماء، بطارية 7 أيام)"
                className="px-6 py-4 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            
            <button 
              onClick={generateAI}
              disabled={isGenerating || !aiProduct}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-xl hover:shadow-purple-500/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  إنشاء وصف احترافي
                </>
              )}
            </button>

            {aiResult && (
              <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-purple-300 text-sm font-medium">النتيجة:</span>
                  <button 
                    onClick={() => copyToClipboard(aiResult)}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition"
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    {copied ? 'تم النسخ!' : 'نسخ'}
                  </button>
                </div>
                <p className="text-gray-200 leading-relaxed text-lg">{aiResult}</p>
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">#ترند</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">#الإمارات</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">#تسوق</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">منتجات ترند 2025</h3>
            <p className="text-gray-600 mb-8">20 منتج مختار بعناية من أعلى المبيعات في الإمارات</p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'الكل' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      product.badge.includes('🔥') ? 'bg-red-500 text-white' :
                      product.badge.includes('🍫') ? 'bg-pink-500 text-white' :
                      product.badge.includes('💆') ? 'bg-purple-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        -{Math.round((1 - product.price/product.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                  {/* Trend Score */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white px-2 py-1 rounded-lg text-xs">
                    <TrendingUp size={12} className="inline ml-1" />
                    {product.trendScore}%
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">ربح {product.profit}%</span>
                  </div>
                  
                  <h4 className="font-bold text-lg mb-2 text-gray-900 line-clamp-1">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.aiDescription}</p>
                  
                  {/* Supplier & Shipping */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span>من: {product.supplier}</span>
                    <span>توصيل: {product.shipping}</span>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{product.price} درهم</div>
                      {product.originalPrice > product.price && (
                        <div className="text-sm text-gray-400 line-through">{product.originalPrice} درهم</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => addToCart(product)}
                        className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                        title="أضف للسلة"
                      >
                        <ShoppingBag size={20} />
                      </button>
                      <a 
                        href={getWhatsAppLink(product)}
                        target="_blank"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                      >
                        اطلب
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Brain size={32} />, title: "وصف AI", desc: "أوصاف تلقائية احترافية" },
              { icon: <TrendingUp size={32} />, title: "تحليل الترند", desc: "رصد فوري للمنتجات الرائجة" },
              { icon: <Zap size={32} />, title: "تسعير ذكي", desc: "أسعار مثلى تلقائياً" },
              { icon: <Shield size={32} />, title: "دفع عند الاستلام", desc: "COD متاح لجميع الإمارات" }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold flex items-center gap-2">
              <ShoppingBag className="text-purple-600" size={20} />
              السلة ({cart.length})
            </h4>
            <button onClick={() => setCart([])} className="text-sm text-gray-400 hover:text-red-500">تفريغ</button>
          </div>
          <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="truncate">{item.name}</span>
                <span className="text-purple-600 font-bold">{item.price} درهم</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between font-bold text-lg">
              <span>الإجمالي:</span>
              <span className="text-green-600">{cart.reduce((a, b) => a + b.price, 0)} درهم</span>
            </div>
          </div>
          <a 
            href={getBulkOrderLink()}
            target="_blank"
            className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <WhatsApp size={20} />
            إتمام الطلب عبر واتساب
          </a>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <h4 className="text-xl font-bold">Nourtrend</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                أول متجر إماراتي يستخدم الذكاء الاصطناعي لتحليل الترندات العالمية وتقديمها لك فوراً مع أعلى هامش ربح.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">روابط سريعة</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">الرئيسية</Link></li>
                <li><a href="#products" className="hover:text-white transition">المنتجات</a></li>
                <li><a href="#ai-generator" className="hover:text-white transition">مولد AI</a></li>
                <li><Link href="/admin" className="hover:text-white transition">لوحة التحكم</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">تواصل معنا</h5>
              <a href="https://wa.me/971508423094" className="flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-2">
                <WhatsApp size={18} />
                0508423094
              </a>
              <p className="text-sm text-gray-400">دبي، الإمارات العربية المتحدة</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">طرق الدفع</h5>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield size={18} className="text-green-500" />
                <span>الدفع عند الاستلام (COD)</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">متاح لجميع إمارات الدولة</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 Nourtrend. جميع الحقوق محفوظة. | Powered by AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
