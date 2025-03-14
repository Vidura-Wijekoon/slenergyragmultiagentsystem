
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Sun, Flame, Droplets, Wind, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white py-4 px-4 md:px-8 shadow-md relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[10%] right-[5%] w-24 h-24 rounded-full bg-purple-500/20 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div 
          className="absolute bottom-[10%] left-[5%] w-32 h-32 rounded-full bg-indigo-400/20 blur-xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ repeat: Infinity, duration: 10, delay: 2 }}
        />
        
        <svg className="absolute right-0 top-0 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M0,0 L100,0 L100,100 L0,100 Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
          />
        </svg>
        
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      </div>
      
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="relative">
            <Zap className="w-7 h-7 text-yellow-300" />
            <motion.div
              className="absolute inset-0 rounded-full bg-yellow-400/50 z-[-1]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-purple-300">
                බලශක්තිය අනාගතයයි
              </span>
            </h1>
            <p className="text-xs md:text-sm text-indigo-200">Ministry of Power and Energy</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-1">
            {[
              { icon: <Sun className="w-4 h-4" />, value: '26%', label: 'Solar' },
              { icon: <Flame className="w-4 h-4" />, value: '38%', label: 'Thermal' },
              { icon: <Droplets className="w-4 h-4" />, value: '29%', label: 'Hydro' },
              { icon: <Wind className="w-4 h-4" />, value: '7%', label: 'Wind' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm flex flex-col items-center text-xs border border-white/20"
              >
                <div className="flex items-center space-x-1">
                  {stat.icon}
                  <span className="font-medium">{stat.value}</span>
                </div>
                <span className="text-[10px] text-indigo-200">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="block md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-gradient-to-br from-indigo-900 to-purple-950 text-white border-indigo-700">
              <div className="flex flex-col space-y-4 mt-8">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-white/10"
                  onClick={() => {
                    navigate('/');
                    setIsOpen(false);
                  }}
                >
                  Home
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-white/10"
                  onClick={() => {
                    navigate('/agent-architecture');
                    setIsOpen(false);
                  }}
                >
                  Agent Architecture
                </Button>
                
                <div className="pt-4 border-t border-indigo-700">
                  <p className="text-sm text-indigo-300 mb-2">Current Energy Mix</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: <Sun className="w-4 h-4" />, value: '26%', label: 'Solar' },
                      { icon: <Flame className="w-4 h-4" />, value: '38%', label: 'Thermal' },
                      { icon: <Droplets className="w-4 h-4" />, value: '29%', label: 'Hydro' },
                      { icon: <Wind className="w-4 h-4" />, value: '7%', label: 'Wind' }
                    ].map((stat, index) => (
                      <div 
                        key={index}
                        className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm flex items-center text-xs border border-white/20"
                      >
                        {stat.icon}
                        <div className="ml-2">
                          <div className="font-medium">{stat.value}</div>
                          <div className="text-[10px] text-indigo-200">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
