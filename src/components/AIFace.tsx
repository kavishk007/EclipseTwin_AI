import React, { useEffect, useState } from 'react';

interface AIFaceProps {
  expression: 'neutral' | 'happy' | 'thinking';
}

const AIFace: React.FC<AIFaceProps> = ({ expression }) => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([]);

  useEffect(() => {
    // Create initial particles
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y / 10) * 0.5,
        speed: particle.y <= 0 ? Math.random() * 2 + 0.5 : particle.speed,
        y: particle.y <= 0 ? 100 : particle.y,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20 rounded-full" />
      <div className="absolute inset-0 backdrop-blur-sm rounded-full" />
      
      {/* Particle Effects */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute bg-blue-400/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transition: 'all 0.05s linear',
          }}
        />
      ))}

      {/* Main Face Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-4/5 h-4/5">
          {/* Core Energy */}
          <div className={`
            absolute inset-0 rounded-full 
            bg-gradient-to-br from-blue-500 to-purple-600
            ${expression === 'thinking' ? 'animate-pulse' : ''}
          `}>
            <div className="absolute inset-0 bg-black/20 rounded-full" />
          </div>

          {/* Energy Rings */}
          <div className={`
            absolute inset-[-10%] rounded-full border-4 border-blue-400/30
            animate-[spin_10s_linear_infinite]
          `} />
          <div className={`
            absolute inset-[-5%] rounded-full border-2 border-purple-400/20
            animate-[spin_8s_linear_infinite_reverse]
          `} />

          {/* Neural Network Pattern */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-[-50%] opacity-30">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  style={{
                    top: `${i * 20}%`,
                    left: '0',
                    right: '0',
                    transform: `rotate(${i * 18}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Face Features */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Eyes */}
            <div className="flex justify-between w-1/2 mb-8">
              <div className={`
                w-8 h-8 rounded-full bg-blue-300
                ${expression === 'thinking' ? 'animate-pulse' : ''}
                ${expression === 'happy' ? 'h-6 animate-bounce' : ''}
              `}>
                <div className="w-full h-full rounded-full bg-blue-400/50 animate-[ping_2s_infinite]" />
              </div>
              <div className={`
                w-8 h-8 rounded-full bg-blue-300
                ${expression === 'thinking' ? 'animate-pulse' : ''}
                ${expression === 'happy' ? 'h-6 animate-bounce' : ''}
              `}>
                <div className="w-full h-full rounded-full bg-blue-400/50 animate-[ping_2s_infinite]" />
              </div>
            </div>

            {/* Mouth/Expression */}
            <div className={`
              w-16 h-1 bg-blue-300 rounded-full
              ${expression === 'happy' ? 'h-2 w-24 transform translate-y-2' : ''}
              ${expression === 'thinking' ? 'animate-pulse w-8' : ''}
              transition-all duration-300
            `} />
          </div>

          {/* Reactive Halo */}
          <div className={`
            absolute inset-[-15%] rounded-full
            bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0
            animate-[spin_20s_linear_infinite]
            ${expression === 'thinking' ? 'scale-110' : ''}
            ${expression === 'happy' ? 'scale-105' : ''}
            transition-transform duration-500
          `} />
        </div>
      </div>
    </div>
  );
};

export default AIFace;