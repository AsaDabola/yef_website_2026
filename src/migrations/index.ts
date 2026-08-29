import * as migration_20260825_155544_initial from './20260825_155544_initial';
import * as migration_20260828_020919 from './20260828_020919';
import * as migration_20260828_022529 from './20260828_022529';
import * as migration_20260828_044527 from './20260828_044527';
import * as migration_20260828_051447 from './20260828_051447';
import * as migration_20260828_051555 from './20260828_051555';
import * as migration_20260828_055144_members_resources from './20260828_055144_members_resources';
import * as migration_20260828_184254_pages_builtin_route_expansion from './20260828_184254_pages_builtin_route_expansion';
import * as migration_20260828_185937_hero_button_proof_number_optional from './20260828_185937_hero_button_proof_number_optional';
import * as migration_20260828_194213_page_header_override from './20260828_194213_page_header_override';
import * as migration_20260829_015231_generic_page_blocks from './20260829_015231_generic_page_blocks';

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
    name: '20260828_022529',
  },
  {
    up: migration_20260828_044527.up,
    down: migration_20260828_044527.down,
    name: '20260828_044527',
  },
  {
    up: migration_20260828_051447.up,
    down: migration_20260828_051447.down,
    name: '20260828_051447',
  },
  {
    up: migration_20260828_051555.up,
    down: migration_20260828_051555.down,
    name: '20260828_051555',
  },
  {
    up: migration_20260828_055144_members_resources.up,
    down: migration_20260828_055144_members_resources.down,
    name: '20260828_055144_members_resources',
  },
  {
    up: migration_20260828_184254_pages_builtin_route_expansion.up,
    down: migration_20260828_184254_pages_builtin_route_expansion.down,
    name: '20260828_184254_pages_builtin_route_expansion',
  },
  {
    up: migration_20260828_185937_hero_button_proof_number_optional.up,
    down: migration_20260828_185937_hero_button_proof_number_optional.down,
    name: '20260828_185937_hero_button_proof_number_optional',
  },
  {
    up: migration_20260828_194213_page_header_override.up,
    down: migration_20260828_194213_page_header_override.down,
    name: '20260828_194213_page_header_override',
  },
  {
    up: migration_20260829_015231_generic_page_blocks.up,
    down: migration_20260829_015231_generic_page_blocks.down,
    name: '20260829_015231_generic_page_blocks'
  },
];
