import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  onClick?: () => void;
  color?: string;
  className?: string;
}

const Chip = ({ label, onClick, color, className }: ChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-sm font-medium text-primary-foreground bg-primary mr-2 transition-opacity hover:opacity-80',
        className
      )}
      style={color ? { backgroundColor: color } : undefined}
    >
      {label}
    </button>
  );
};

export default Chip;
