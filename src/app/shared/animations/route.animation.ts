import {animate, query, style, transition, trigger} from '@angular/animations'

export const routeAnimation = trigger('routeAnimation', [
    transition('* => *', [
        // Set a default  style for enter and leave
        query(':enter, :leave', [
            style({
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0
            }),
        ], {
            optional: true
        }),
        // Animate the new page in
        query(':enter', [
            animate('600ms ease', style({
                opacity: 1
            })),
        ], {
            optional: true
        })
    ]),
])
