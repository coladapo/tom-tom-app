/**
 * ID generation utilities
 */

export const IdUtils = {
  /**
   * Generate a unique ID for entities
   * In a real app, you might use uuid or nanoid
   */
  generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Generate a short ID for display purposes
   */
  generateShortId(): string {
    return Math.random().toString(36).substr(2, 9);
  },
};
