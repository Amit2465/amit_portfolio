export type AppType = 'tictactoe' | 'calculator' | 'todo' | 'weather' | 'music';

export interface AppInfo {
  id: AppType;
  name: string;
  icon: string;
  color: string;
  description: string;
}