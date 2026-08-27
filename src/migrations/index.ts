import * as migration_20260825_155544_initial from './20260825_155544_initial';

export const migrations = [
  {
    up: migration_20260825_155544_initial.up,
    down: migration_20260825_155544_initial.down,
    name: '20260825_155544_initial'
  },
];
