'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useThemeStore } from '@/stores/useThemeStore';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    setMounted(true);
    // 초기 테마 적용
    applyTheme(theme);
  }, [theme]);

  const handleToggle = () => {
    toggleTheme();
  };

  // 테마 적용 함수
  function applyTheme(newTheme: string) {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (newTheme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4" />
      <Switch checked={theme === 'dark'} onCheckedChange={handleToggle} />
      <Moon className="h-4 w-4" />
    </div>
  );
}
