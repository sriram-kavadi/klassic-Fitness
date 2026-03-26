import { useState, useEffect } from 'react';

export function CountdownTimer() {
  // Set target to 3 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    // In a real app, this would be a fixed expiration date from a DB
    // For the demo, we create a rolling 3-day timer that counts down
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-4 justify-center">
      {timeBlocks.map((block, idx) => (
        <div key={block.label} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-neutral-900 border border-border w-14 h-16 sm:w-20 sm:h-24 rounded-lg flex items-center justify-center box-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10"></div>
              <span className="font-display text-3xl sm:text-5xl font-bold text-white relative z-10">
                {block.value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground mt-2 font-bold tracking-widest uppercase">
              {block.label}
            </span>
          </div>
          {idx < timeBlocks.length - 1 && (
            <div className="font-display text-2xl sm:text-4xl text-primary pb-6 animate-pulse">:</div>
          )}
        </div>
      ))}
    </div>
  );
}
