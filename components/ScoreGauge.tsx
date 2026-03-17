"use client";

interface ScoreGaugeProps {
  score: number;
  isAnimating?: boolean;
}

function getScoreColor(score: number): { ring: string; text: string; bg: string; label: string } {
  if (score >= 90) return { ring: 'stroke-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500/10', label: '¡Excelente!' };
  if (score >= 75) return { ring: 'stroke-blue-500', text: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Muy Bueno' };
  if (score >= 60) return { ring: 'stroke-amber-500', text: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Bueno' };
  if (score >= 40) return { ring: 'stroke-orange-500', text: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Regular' };
  return { ring: 'stroke-red-500', text: 'text-red-500', bg: 'bg-red-500/10', label: 'Necesita Mejora' };
}

export function ScoreGauge({ score, isAnimating = false }: ScoreGaugeProps) {
  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 54; // radio = 54
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-6 rounded-2xl ${colors.bg} transition-all duration-500`}>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Track */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="currentColor"
            className="text-slate-200 dark:text-zinc-700"
            strokeWidth="8"
          />
          {/* Progress */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            className={`${colors.ring} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isAnimating ? circumference : offset}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black ${colors.text} tabular-nums`}>
            {score}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/100</span>
        </div>
      </div>
      <span className={`text-sm font-bold ${colors.text} tracking-wide`}>
        {colors.label}
      </span>
    </div>
  );
}
