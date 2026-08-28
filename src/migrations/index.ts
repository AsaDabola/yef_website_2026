import * as migration_20260825_155544_initial from './20260825_155544_initial';
import * as migration_20260828_020919 from './20260828_020919';
import * as migration_20260828_022529 from './20260828_022529';

export const migrations = [
  {
    up: migration_20260825_155544_initial.up,
    down: migration_20260825_155544_initial.down,
    name: '20260825_155544_initial',
  },
  {
    up: migration_20260828_020919.up,
    down: migration_20260828_020919.down,
    name: '20260828_020919',
  },
  {
    up: migration_20260828_022529.up,
    down: migration_20260828_022529.down,
    name: '20260828_022529'
  },
];
