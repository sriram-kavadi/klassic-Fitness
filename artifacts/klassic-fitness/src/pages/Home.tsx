import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitLead, LeadInputGoal } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CountdownTimer } from "@/components/CountdownTimer";
import { 
  Dumbbell, 
  Flame, 
  Users, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Phone, 
  MessageCircle,
  Menu,
  X,
  MapPin,
  Clock
} from "lucide-react";

// --- VALIDATION SCHEMA ---
const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(7, "Enter a valid phone number").max(20),
  goal: z.nativeEnum(LeadInputGoal, { required_error: "Please select a fitness goal" })
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const { mutate: submitLead, isPending } = useSubmitLead({
    mutation: {
      onSuccess: () => {
        toast({
          title: "TRIAL SECURED! 🚀",
          description: "Our team will contact you within 10 minutes to confirm your spot.",
          variant: "default",
          className: "bg-green-600 text-white border-none",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    }
  });

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      goal: undefined
    }
  });

  function onSubmit(data: LeadFormValues) {
    submitLead({ data });
  }

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Parallax for hero
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      
      {/* NAVBAR */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Klassic Fitness Logo" className="w-10 h-10 object-contain" />
              <span className="font-display text-2xl tracking-wider font-bold text-white">KLASSIC <span className="text-primary">FITNESS</span></span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {['Programs', 'Results', 'Trainers', 'Gallery'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-semibold text-neutral-300 hover:text-primary transition-colors tracking-wide uppercase"
                >
                  {item}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('lead-form')}
                className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider rounded-none px-6 box-glow"
              >
                START FREE TRIAL
              </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-950 border-b border-border px-4 py-6 flex flex-col gap-4"
          >
             {['Programs', 'Results', 'Trainers', 'Gallery'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-lg font-display text-white hover:text-primary py-2 border-b border-white/5"
                >
                  {item}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('lead-form')}
                className="bg-primary w-full mt-4 text-white font-bold"
              >
                START FREE TRIAL NOW
              </Button>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image - realistic gym training */}
        {/* gym hero dark moody atmosphere */}
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary mb-6">
                <Flame size={16} />
                <span className="text-sm font-bold tracking-wider">VOTED #1 GYM IN THE CITY</span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display leading-[0.85] text-white mb-6">
                TRANSFORM YOUR <br/>
                <span className="text-primary text-glow">BODY IN 90 DAYS</span><br/>
                GUARANTEED.
              </h1>
              
              <p className="text-lg sm:text-xl text-neutral-300 mb-8 max-w-2xl font-medium leading-relaxed">
                Lose fat, build lean muscle, and get in the best shape of your life with our expert coaching and state-of-the-art facility. Stop guessing, start achieving.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  onClick={() => scrollToSection('lead-form')}
                  size="lg" 
                  className="bg-primary hover:bg-white hover:text-primary text-white font-bold text-lg h-14 px-8 rounded-none transition-all duration-300 box-glow"
                >
                  CLAIM FREE 3-DAY PASS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold text-lg h-14 px-8 rounded-none transition-all duration-300 bg-green-500/10"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WHATSAPP NOW
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="flex items-center gap-6 sm:gap-10 text-neutral-400">
                <div className="flex items-center gap-2">
                  <Users className="text-primary" size={24} />
                  <div>
                    <div className="font-bold text-white font-display text-xl">500+</div>
                    <div className="text-xs uppercase tracking-wider">Active Members</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="text-primary" size={24} />
                  <div>
                    <div className="font-bold text-white font-display text-xl">100%</div>
                    <div className="text-xs uppercase tracking-wider">Proven Results</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* URGENCY OFFER BANNER */}
      <section className="bg-primary relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-display text-white mb-2">LIMITED TIME OFFER</h2>
              <p className="text-white/90 text-lg font-medium">70% OFF Joining Fee + 3 Days Free Trial. <strong className="text-black bg-white px-2 py-0.5 ml-1">ONLY 20 SPOTS LEFT</strong></p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <CountdownTimer />
            </div>
            
            <Button 
              onClick={() => scrollToSection('lead-form')}
              size="lg" 
              className="bg-white text-primary hover:bg-neutral-200 font-black text-xl h-16 px-10 rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all"
            >
              LOCK IN MY SPOT
            </Button>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / RESULTS */}
      <section id="results" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display text-white"
            >
              REAL PEOPLE. <span className="text-primary">REAL RESULTS.</span>
            </motion.h2>
            <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">Don't just take our word for it. See the transformations our members have achieved through dedication and our proven systems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: "James D.", 
                result: "Lost 18kg in 12 Weeks", 
                quote: "The personalized coaching changed everything. I never thought I could look like this at 40.",
                // fitness transformation man
                img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" 
              },
              { 
                name: "Sarah M.", 
                result: "Gained Lean Muscle", 
                quote: "I used to be intimidated by the weights area. Now it's my second home.",
                // fitness transformation woman
                img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop" 
              },
              { 
                name: "Marcus T.", 
                result: "Dropped 12% Body Fat", 
                quote: "The nutrition plan was the missing piece. The trainers here actually care.",
                // athletic man gym
                img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
              },
              { 
                name: "Elena R.", 
                result: "First Pull-up to 10 Reps", 
                quote: "The strength I've built here translates to every part of my life.",
                // strong woman pullups gym
                img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop" 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-card rounded-none overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img src={item.img} alt={item.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}
                    </div>
                    <h3 className="text-2xl font-display text-white mb-1">{item.name}</h3>
                    <p className="text-primary font-bold text-sm uppercase tracking-wider mb-3">{item.result}</p>
                    <p className="text-neutral-300 text-sm italic">"{item.quote}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 py-6 text-lg font-bold">
              VIEW MORE TRANSFORMATIONS
            </Button>
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-24 bg-neutral-950 border-t border-border relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-display text-white">CHOOSE YOUR <span className="text-primary text-glow">PROGRAM</span></h2>
              <p className="text-neutral-400 mt-4 max-w-xl text-lg">Designed for maximum results, tailored to your specific goals and fitness level.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "WEIGHT LOSS", 
                desc: "High-intensity fat burning circuits mixed with nutrition guidance.",
                duration: "4-8 Weeks",
                icon: <Flame size={32} />,
                // intense cardio workout
                img: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1925&auto=format&fit=crop"
              },
              { 
                title: "MUSCLE GAIN", 
                desc: "Hypertrophy focused lifting protocols to pack on dense muscle.",
                duration: "8-12 Weeks",
                icon: <Dumbbell size={32} />,
                // heavy weight lifting gym
                img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop"
              },
              { 
                title: "1-ON-1 COACHING", 
                desc: "Complete personalization. Your dedicated trainer and custom plan.",
                duration: "Ongoing",
                icon: <Trophy size={32} />,
                // personal trainer assisting client
                img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
              },
              { 
                title: "YOGA & MOBILITY", 
                desc: "Enhance flexibility, core strength and mental focus.",
                duration: "Flexible",
                icon: <Users size={32} />,
                // yoga class dark studio
                img: "https://images.unsplash.com/photo-1599901860904-17e08c2d4212?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((prog, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-card border border-border p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {prog.icon}
                </div>
                
                <h3 className="text-3xl font-display text-white mb-3">{prog.title}</h3>
                <p className="text-neutral-400 mb-6 flex-grow">{prog.desc}</p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                  <span className="text-sm font-bold text-white uppercase tracking-wider">{prog.duration}</span>
                  <button onClick={() => scrollToSection('lead-form')} className="text-primary hover:text-white transition-colors">
                    <ArrowRight size={24} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS SECTION */}
      <section id="trainers" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-display text-white">MEET THE <span className="text-primary">EXPERTS</span></h2>
            <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">Our elite team of certified professionals is dedicated to pushing you past your limits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "ALEX RODRIGUEZ",
                role: "Strength & Conditioning",
                exp: "8 Years Exp.",
                // male fitness trainer portrait
                img: "https://images.unsplash.com/photo-1567598508481-65985588e295?q=80&w=2070&auto=format&fit=crop"
              },
              {
                name: "PRIYA SHARMA",
                role: "Yoga & Flexibility",
                exp: "12 Years Exp.",
                // female yoga instructor portrait
                img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
              },
              {
                name: "MARCUS CHEN",
                role: "Boxing & HIIT",
                exp: "6 Years Exp.",
                // male boxing trainer portrait
                img: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1887&auto=format&fit=crop"
              }
            ].map((trainer, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group overflow-hidden border border-border bg-card"
              >
                <div className="aspect-[3/4] relative">
                  <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold tracking-wider mb-3">
                      {trainer.exp}
                    </div>
                    <h3 className="text-3xl font-display text-white m-0 leading-none">{trainer.name}</h3>
                    <p className="text-neutral-300 font-medium mt-2">{trainer.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-neutral-950 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl md:text-7xl font-display text-white">INSIDE <span className="text-primary">KLASSIC</span></h2>
            <p className="hidden md:block text-neutral-400 max-w-sm text-right">State of the art equipment. Immaculate spaces. The perfect environment to build your best self.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Using 8 unplash images of gyms */}
            {[
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1887&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1593079831268-3381b0c131d2?q=80&w=2069&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1637666062717-1c6ba20846b6?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1973&auto=format&fit=crop"
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`overflow-hidden rounded-md relative group ${i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={`w-full ${i === 0 || i === 3 ? 'h-64 md:h-full' : 'h-40 md:h-64'}`}>
                  <img src={img} alt="Gym Facility" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD FORM SECTION */}
      <section id="lead-form" className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-6xl md:text-8xl font-display text-white leading-none mb-6">
                CLAIM YOUR <br/><span className="text-primary text-glow">FREE PASS</span>
              </h2>
              <p className="text-xl text-neutral-300 mb-8 max-w-md">
                Experience Klassic Fitness risk-free. Fill out the form below and our team will contact you within 10 minutes to activate your 3-day pass.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Full access to all premium gym equipment",
                  "One complimentary personal training assessment",
                  "Access to group classes (Yoga, HIIT, etc.)",
                  "No credit card required to start"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                    <span className="text-neutral-200">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FORM */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-8 md:p-10 rounded-xl box-glow"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-display text-white">GET STARTED NOW</h3>
                <p className="text-neutral-400 text-sm mt-1">Only a few spots remaining for this month's cohort.</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300 uppercase tracking-wider text-xs">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background border-border h-14 text-lg focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage className="text-primary" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300 uppercase tracking-wider text-xs">Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-background border-border h-14 text-lg focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage className="text-primary" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300 uppercase tracking-wider text-xs">Primary Goal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-border h-14 text-lg focus:ring-primary">
                              <SelectValue placeholder="Select your main goal..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value={LeadInputGoal.weight_loss}>Weight Loss & Toning</SelectItem>
                            <SelectItem value={LeadInputGoal.muscle_gain}>Build Muscle Mass</SelectItem>
                            <SelectItem value={LeadInputGoal.general_fitness}>General Fitness & Health</SelectItem>
                            <SelectItem value={LeadInputGoal.personal_coaching}>1-on-1 Personal Coaching</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-primary" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-black text-xl h-16 rounded-none mt-4 transition-transform active:scale-[0.98]"
                  >
                    {isPending ? "PROCESSING..." : "SEND ME FREE TRIAL"}
                  </Button>
                  <p className="text-center text-xs text-neutral-500 mt-4 flex items-center justify-center gap-1">
                    <CheckCircle2 size={12} /> Your information is 100% secure.
                  </p>
                </form>
              </Form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-black relative border-t border-border">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-display text-white mb-8">NO MORE EXCUSES.<br/> YOUR TRANSFORMATION STARTS <span className="text-primary">TODAY.</span></h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => scrollToSection('lead-form')} className="bg-primary text-white h-14 px-8 text-lg font-bold rounded-none box-glow">START FREE TRIAL</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black h-14 px-8 text-lg font-bold rounded-none">
              <Phone className="mr-2 h-5 w-5" /> CALL NOW
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="w-8 h-8 object-contain filter grayscale brightness-200" />
              <span className="font-display text-2xl tracking-wider font-bold text-white">KLASSIC FITNESS</span>
            </div>
            <p className="text-neutral-500 max-w-sm mb-6">The ultimate training facility designed for those who are serious about results. No gimmicks, just hard work and expert guidance.</p>
          </div>
          
          <div>
            <h4 className="text-white font-display text-xl mb-4">LOCATIONS</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                123 Iron Avenue, Downtown<br/>Metropolis, NY 10001
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-primary shrink-0 mt-0.5" />
                Mon-Fri: 5AM - 11PM<br/>Sat-Sun: 6AM - 9PM
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display text-xl mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li><button onClick={() => scrollToSection('programs')} className="hover:text-primary transition-colors">Programs</button></li>
              <li><button onClick={() => scrollToSection('trainers')} className="hover:text-primary transition-colors">Trainers</button></li>
              <li><button onClick={() => scrollToSection('results')} className="hover:text-primary transition-colors">Success Stories</button></li>
              <li><button onClick={() => window.scrollTo(0,0)} className="hover:text-primary transition-colors">Member Login</button></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-neutral-600 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Klassic Fitness Studio. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); alert('In a real app, this opens WhatsApp: wa.me/1234567890'); }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          Chat with us!
        </span>
      </a>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-background/95 backdrop-blur border-t border-border p-3">
         <Button 
            onClick={() => scrollToSection('lead-form')}
            className="w-full bg-primary hover:bg-primary/90 text-white font-black text-lg h-12 rounded-none box-glow animate-pulse"
          >
            CLAIM 3 DAYS FREE
          </Button>
      </div>
      
      {/* Spacer for mobile sticky CTA */}
      <div className="h-20 md:hidden bg-background"></div>
    </div>
  );
}
