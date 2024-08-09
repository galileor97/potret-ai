import React from 'react';

const MySvgComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 4000">
    <defs>
      <style>
        {`
          .cls-1, .cls-2 { fill: none; }
          .cls-3 { fill: url(#linear-gradient); }
          .cls-4 { clip-path: url(#clippath); }
          .cls-5 { mask: url(#mask); }
          .cls-6 { letter-spacing: -.03em; }
          .cls-7 { letter-spacing: -.02em; }
          .cls-2 { clip-rule: evenodd; }
          .cls-8 { clip-path: url(#clippath-1); }
          .cls-9 { clip-path: url(#clippath-3); }
          .cls-10 { clip-path: url(#clippath-2); }
          .cls-11 { fill: #870000; opacity: .3; }
          .cls-12 { fill: #01052d; }
          .cls-13 { fill: #300c50; }
          .cls-14 { fill: #fff; }
          .cls-15 { fill: url(#linear-gradient-8); }
          .cls-16 { fill: url(#linear-gradient-9); }
          .cls-17 { fill: url(#linear-gradient-3); }
          .cls-18 { fill: url(#linear-gradient-4); }
          .cls-19 { fill: url(#linear-gradient-2); }
          .cls-20 { fill: url(#linear-gradient-6); }
          .cls-21 { fill: url(#linear-gradient-7); }
          .cls-22 { fill: url(#linear-gradient-5); }
          .cls-23 { fill: url(#linear-gradient-12); }
          .cls-24 { fill: url(#linear-gradient-10); }
          .cls-25 { fill: url(#linear-gradient-11); }
          .cls-26 { font-family: AvenirNext-Heavy, 'Avenir Next'; font-size: 620px; }
          .cls-27 { mask: url(#mask-3); }
          .cls-28 { mask: url(#mask-2); }
          .cls-29 { mask: url(#mask-5); }
          .cls-30 { mask: url(#mask-4); }
          .cls-31 { mask: url(#mask-1); }
          .cls-32 { mask: url(#mask-7); }
          .cls-33 { mask: url(#mask-6); }
        `}
      </style>
      {/* Define gradients and clip paths here */}
    </defs>
    <g className="cls-4">
      <rect className="cls-3" x="982.5" y="739.48" width="1604.79" height="1714.03" />
    </g>
    {/* Other SVG elements go here */}
  </svg>
);

export default MySvgComponent;
