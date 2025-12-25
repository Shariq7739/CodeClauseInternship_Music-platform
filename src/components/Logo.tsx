import { Music2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Music2 className="h-7 w-7 text-primary" />
      <h1 className="text-2xl font-bold font-headline text-primary tracking-tight">
        Rhythmic
      </h1>
    </div>
  );
}
