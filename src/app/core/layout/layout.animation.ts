import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const TOOGLE_SIDEBAR = [
  trigger('toogleSidebar', [
    state(
      'open',
      style({
        left: 0,
        width: '16rem',
      })
    ),
    state(
      'closed',
      style({
        width: '4rem',
      })
    ),
    transition('open <=> closed', animate('250ms ease-in-out')),
  ]),

  trigger('toogleContent', [
    state(
      'open',
      style({
        marginLeft: '16rem',
      })
    ),
    state(
      'closed',
      style({
        marginLeft: '4rem',
      })
    ),
    transition('open <=> closed', animate('250ms ease-in-out')),
  ]),

  trigger('toogleLabels', [
    state(
      'open',
      style({
        opacity: 1,
        visibility: 'visible',
      })
    ),
    state(
      'closed',
      style({
        opacity: 0,
        visibility: 'hidden',
      })
    ),
    transition('open <=> closed', animate('200ms ease-in-out')),
  ]),

  trigger('toogleMenuItems', [
    state(
      'open',
      style({
        paddingTop: '1.25rem',
        paddingBottom: '1.25rem',
        paddingRight: '1rem',
        paddingLeft: '1.5rem',
      })
    ),
    state(
      'closed',
      style({
        width: '3.5rem',
        paddingTop: '1.25rem',
        paddingBottom: '1.25rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
      })
    ),
    transition('open <=> closed', animate('250ms ease-in-out')),
  ]),
];
