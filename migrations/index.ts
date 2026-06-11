import * as migration_20260604_050059_initial from './20260604_050059_initial';

export const migrations = [
  {
    up: migration_20260604_050059_initial.up,
    down: migration_20260604_050059_initial.down,
    name: '20260604_050059_initial'
  },
];
