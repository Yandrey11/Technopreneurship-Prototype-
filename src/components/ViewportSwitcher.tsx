import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Smartphone, Tablet, Monitor, ArrowLeft } from 'lucide-react';

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

interface ViewportSwitcherProps {
  currentSize: ViewportSize;
  onSizeChange: (size: ViewportSize) => void;
  onBack: () => void;
}

export default function ViewportSwitcher({ currentSize, onSizeChange, onBack }: ViewportSwitcherProps) {
  const sizes = [
    { id: 'mobile' as ViewportSize, label: 'Mobile', width: '375px', icon: Smartphone },
    { id: 'tablet' as ViewportSize, label: 'Tablet', width: '768px', icon: Tablet },
    { id: 'desktop' as ViewportSize, label: 'Desktop', width: '1440px', icon: Monitor },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 mr-2">Viewport:</span>
            {sizes.map((size) => {
              const Icon = size.icon;
              const isActive = currentSize === size.id;
              
              return (
                <Button
                  key={size.id}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onSizeChange(size.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{size.label}</span>
                  <Badge variant={isActive ? 'secondary' : 'outline'} className="ml-1">
                    {size.width}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
