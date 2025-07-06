import React from 'react';

// Memory monitoring utility для Next.js
class MemoryMonitor {
  private static instance: MemoryMonitor;
  private memoryUsage: number[] = [];
  private memoryCheckInterval: NodeJS.Timeout | null = null;

  static getInstance(): MemoryMonitor {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  startMonitoring() {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in window.performance) {
      console.log('🔍 Memory monitoring started');
      
      this.memoryCheckInterval = setInterval(() => {
        const memory = (window.performance as any).memory;
        const usedJSHeapSize = memory.usedJSHeapSize;
        const totalJSHeapSize = memory.totalJSHeapSize;
        
        this.memoryUsage.push(usedJSHeapSize);
        
        // Keep only last 50 measurements
        if (this.memoryUsage.length > 50) {
          this.memoryUsage.shift();
        }
        
        // Warn if memory usage is high
        if (usedJSHeapSize > 100 * 1024 * 1024) { // 100MB
          console.warn('⚠️ High memory usage detected:', {
            used: `${Math.round(usedJSHeapSize / 1024 / 1024)}MB`,
            total: `${Math.round(totalJSHeapSize / 1024 / 1024)}MB`,
            percentage: `${Math.round((usedJSHeapSize / totalJSHeapSize) * 100)}%`
          });
        }
      }, 5000); // Check every 5 seconds
    }
  }

  stopMonitoring() {
    if (this.memoryCheckInterval) {
      clearInterval(this.memoryCheckInterval);
      this.memoryCheckInterval = null;
      console.log('🛑 Memory monitoring stopped');
    }
  }

  getMemoryStats() {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in window.performance) {
      const memory = (window.performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        percentage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
      };
    }
    return null;
  }

  logMemoryStats() {
    const stats = this.getMemoryStats();
    if (stats) {
      console.log('📊 Memory Stats:', {
        used: `${stats.used}MB`,
        total: `${stats.total}MB`,
        limit: `${stats.limit}MB`,
        percentage: `${stats.percentage}%`
      });
    }
  }

  // Detect potential memory leaks
  detectMemoryLeaks() {
    if (this.memoryUsage.length > 10) {
      const recent = this.memoryUsage.slice(-10);
      const average = recent.reduce((sum, val) => sum + val, 0) / recent.length;
      const trend = recent[recent.length - 1] - recent[0];
      
      if (trend > 10 * 1024 * 1024) { // 10MB increase
        console.warn('🚨 Potential memory leak detected:', {
          trend: `+${Math.round(trend / 1024 / 1024)}MB`,
          average: `${Math.round(average / 1024 / 1024)}MB`
        });
      }
    }
  }
}

// Export for use in _app.tsx
export const memoryMonitor = MemoryMonitor.getInstance();

// React Hook for memory monitoring
export const useMemoryMonitor = () => {
  const [memoryStats, setMemoryStats] = React.useState<any>(null);
  
  React.useEffect(() => {
    memoryMonitor.startMonitoring();
    
    const interval = setInterval(() => {
      const stats = memoryMonitor.getMemoryStats();
      setMemoryStats(stats);
      memoryMonitor.detectMemoryLeaks();
    }, 10000); // Update every 10 seconds
    
    return () => {
      clearInterval(interval);
      memoryMonitor.stopMonitoring();
    };
  }, []);
  
  return memoryStats;
};

export default MemoryMonitor;
