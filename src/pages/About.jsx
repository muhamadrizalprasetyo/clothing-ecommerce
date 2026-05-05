import { Heart, Sparkles, Users, Leaf } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Sparkles,
      title: 'Minimalist Aesthetic',
      description: 'Clean lines, simple designs that make a statement without shouting.'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every piece is crafted with attention to detail and quality.'
    },
    {
      icon: Users,
      title: 'Gen Z Focused',
      description: 'Designed for the generation that values authenticity and self-expression.'
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'We\'re committed to reducing our environmental footprint.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <img src="/logo2.jpg" alt="cozzy.co" className="h-24 w-auto mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            wanna style cozzy with me?
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            cozzy.co is a Gen Z streetwear brand built on the foundation of minimalist design, 
            premium quality, and authentic self-expression. We believe that looking good should feel effortless.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-navy-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/IMG_1965.jpg" 
                alt="cozzy story" 
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Born from a love for street culture and minimalist design, cozzy.co started as a small 
                passion project among friends who wanted to create clothing that represented their generation.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Today, we&apos;ve grown into a community of style enthusiasts who believe that fashion 
                should be accessible, comfortable, and true to who you are.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every piece in our collection is designed with care, manufactured responsibly, and 
                priced fairly because we believe everyone deserves to feel cozzy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
