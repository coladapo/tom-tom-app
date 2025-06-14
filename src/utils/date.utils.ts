/**
 * Date utility functions
 */

export const DateUtils = {
  /**
   * Format a date for display
   */
  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  },

  /**
   * Format time for display
   */
  formatTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  /**
   * Get relative time (e.g., "2 hours ago")
   */
  getRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return this.formatDate(d);
  },

  /**
   * Check if two dates are on the same day
   */
  isSameDay(date1: Date | string, date2: Date | string): boolean {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  },

  /**
   * Check if a date is today
   */
  isToday(date: Date | string): boolean {
    return this.isSameDay(date, new Date());
  },

  /**
   * Get the start of the day
   */
  startOfDay(date: Date | string): Date {
    const d = typeof date === 'string' ? new Date(date) : new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  /**
   * Get the end of the day
   */
  endOfDay(date: Date | string): Date {
    const d = typeof date === 'string' ? new Date(date) : new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  },
};
