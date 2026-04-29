
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Storimini | Kişiselleştirilmiş Masal Platformu</title>
  <meta name="description" content="Storimini ile çocuğunuzun adı, ilgileri ve hayal gücüyle kişiselleştirilmiş masallar oluşturun." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    :root {
      --ink: #231C1E;
      --paper: #F3F5ED;
      --blue: #516ED6;
      --yellow: #F8BF40;
      --pink: #EB315C;
      --white: #fffdf7;
      --soft-blue: #dce4ff;
      --soft-pink: #ffe0e9;
      --shadow: 0 16px 38px rgba(35, 28, 30, .11);
      --radius: 8px;
      --max: 1120px;
      --body-font: "Poppins", Arial, sans-serif;
      --display-font: "Fraunces", Georgia, serif;
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      font-family: var(--body-font);
      color: var(--ink);
      background: var(--paper);
      overflow-x: hidden;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button,
    a {
      -webkit-tap-highlight-color: transparent;
    }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(243, 245, 237, .86);
      border-bottom: 1px solid rgba(35, 28, 30, .09);
      backdrop-filter: blur(18px);
    }

    .nav {
      width: min(var(--max), calc(100% - 32px));
      min-height: 64px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .logo {
      position: relative;
      display: inline-flex;
      align-items: center;
      font-size: clamp(1.12rem, 1.8vw, 1.45rem);
      font-family: var(--display-font);
      font-weight: 700;
      letter-spacing: 0;
      line-height: 1;
      color: #000;
      transform-origin: left center;
    }

    .logo-mini {
      color: var(--pink);
    }

    .logo-i-wrap {
      position: relative;
      display: inline-block;
    }

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 26px;
      font-size: .84rem;
      font-weight: 700;
    }

    .nav-links a {
      position: relative;
      padding: 10px 0;
    }

    .nav-links a::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 4px;
      height: 3px;
      background: var(--yellow);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .25s ease;
    }

    .nav-links a:hover::after {
      transform: scaleX(1);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    .btn {
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 9px 14px;
      border: 2px solid var(--ink);
      border-radius: var(--radius);
      background: var(--white);
      color: var(--ink);
      font-weight: 800;
      font-size: .84rem;
      box-shadow: 4px 4px 0 var(--ink);
      transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
    }

    .btn:hover {
      transform: translate(3px, 3px);
      box-shadow: 2px 2px 0 var(--ink);
    }

    .btn.primary {
      background: var(--pink);
      color: #fff;
    }

    .btn.blue {
      background: var(--blue);
      color: #fff;
    }

    .hero {
      position: relative;
      min-height: auto;
      display: grid;
      align-items: center;
      overflow: hidden;
      background:
        radial-gradient(circle at 12% 16%, rgba(248, 191, 64, .46) 0 9%, transparent 10%),
        radial-gradient(circle at 90% 17%, rgba(235, 49, 92, .2) 0 10%, transparent 11%),
        linear-gradient(135deg, #fffdf7 0%, var(--paper) 44%, #edf2ff 100%);
    }

    .hero::before,
    .hero::after {
      content: "";
      position: absolute;
      border: 3px solid rgba(35, 28, 30, .16);
      pointer-events: none;
      animation: lazySpin 22s linear infinite;
    }

    .hero::before {
      width: 180px;
      height: 180px;
      left: -46px;
      bottom: 14%;
      background: rgba(81, 110, 214, .12);
    }

    .hero::after {
      width: 118px;
      height: 118px;
      right: 8%;
      top: 18%;
      border-radius: 50%;
      background: rgba(248, 191, 64, .24);
      animation-direction: reverse;
    }

    .floating-shape {
      position: absolute;
      pointer-events: none;
      will-change: transform;
    }

    .shape-star {
      width: 34px;
      height: 34px;
      background: var(--pink);
      clip-path: polygon(50% 0, 63% 35%, 100% 50%, 63% 65%, 50% 100%, 37% 65%, 0 50%, 37% 35%);
      animation: bob 4s ease-in-out infinite;
    }

    .shape-pill {
      width: 150px;
      height: 52px;
      border: 3px solid var(--ink);
      border-radius: 999px;
      background: var(--yellow);
      box-shadow: 8px 8px 0 rgba(35, 28, 30, .18);
      animation: wiggle 5.8s ease-in-out infinite;
    }

    .shape-dot {
      width: 86px;
      height: 86px;
      border-radius: 50%;
      background: var(--blue);
      opacity: .18;
      animation: bob 5.2s ease-in-out infinite reverse;
    }

    .hero-inner {
      position: relative;
      width: min(var(--max), calc(100% - 32px));
      margin: 0 auto;
      padding: 70px 0 82px;
      display: grid;
      grid-template-columns: minmax(0, .95fr) minmax(320px, .72fr);
      align-items: center;
      gap: clamp(42px, 6vw, 76px);
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      margin: 0 0 16px;
      padding: 7px 10px;
      border: 2px solid rgba(35, 28, 30, .15);
      border-radius: 999px;
      background: rgba(255, 255, 255, .72);
      font-size: .76rem;
      font-weight: 800;
    }

    .eyebrow::before {
      content: "";
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--pink);
      box-shadow: 18px 0 0 var(--yellow), 36px 0 0 var(--blue);
      animation: colorHop 1.6s ease-in-out infinite;
    }

    h1 {
      max-width: 650px;
      margin: 0;
      font-family: var(--display-font);
      font-size: clamp(2.25rem, 4.9vw, 4.25rem);
      line-height: 1.06;
      letter-spacing: 0;
      font-weight: 800;
    }

    .hero h1 span {
      position: relative;
      display: inline-block;
    }

    .hero h1 span::after {
      content: "";
      position: absolute;
      left: .02em;
      right: .02em;
      bottom: .04em;
      height: .16em;
      z-index: -1;
      background: var(--yellow);
      transform: rotate(-1.2deg);
      animation: underlinePulse 2.8s ease-in-out infinite;
    }

    .lead {
      max-width: 560px;
      margin: 22px 0 0;
      color: rgba(35, 28, 30, .82);
      font-size: clamp(.94rem, 1.15vw, 1.02rem);
      line-height: 1.76;
      font-weight: 500;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 28px;
    }

    .storybook-wrap {
      position: relative;
      min-height: 340px;
      display: grid;
      place-items: center;
    }

    .storybook {
      position: relative;
      width: min(300px, 100%);
      min-height: 240px;
      padding: 26px;
      border: 2px solid rgba(35, 28, 30, .16);
      border-radius: 8px;
      background: rgba(255, 253, 247, .78);
      box-shadow: var(--shadow);
      overflow: hidden;
      animation: softFloat 5.6s ease-in-out infinite;
    }

    .storybook::before {
      content: "";
      position: absolute;
      width: 86px;
      height: 86px;
      right: -28px;
      top: -28px;
      border-radius: 50%;
      background: var(--pink);
      opacity: .12;
    }

    .story-card-title {
      position: relative;
      margin: 0 0 20px;
      font-family: var(--display-font);
      font-size: 1.45rem;
      line-height: 1.14;
      color: var(--ink);
    }

    .story-lines {
      display: grid;
      gap: 12px;
    }

    .story-line {
      display: block;
      height: 10px;
      border-radius: 999px;
      background: rgba(35, 28, 30, .12);
      transform-origin: left center;
      animation: lineRead 4.2s ease-in-out infinite;
    }

    .story-line:nth-child(1) {
      width: 92%;
    }

    .story-line:nth-child(2) {
      width: 76%;
      animation-delay: .3s;
    }

    .story-line:nth-child(3) {
      width: 84%;
      animation-delay: .6s;
    }

    .story-line:nth-child(4) {
      width: 58%;
      background: rgba(81, 110, 214, .24);
      animation-delay: .9s;
    }

    .story-dot {
      position: absolute;
      width: 18px;
      height: 18px;
      right: 30px;
      bottom: 28px;
      border-radius: 50%;
      background: var(--yellow);
      box-shadow: -26px -12px 0 rgba(235, 49, 92, .28);
      animation: dotDrift 4.8s ease-in-out infinite;
    }

    .section {
      position: relative;
      overflow: hidden;
      padding: clamp(62px, 7vw, 88px) 0;
    }

    .section.light {
      background: var(--paper);
    }

    .section.color-blue {
      background: var(--blue);
      color: #fff;
    }

    .section.color-yellow {
      background: var(--yellow);
    }

    .section.color-pink {
      background: var(--pink);
      color: #fff;
    }

    .container {
      position: relative;
      width: min(var(--max), calc(100% - 32px));
      margin: 0 auto;
      z-index: 2;
    }

    .section-head {
      max-width: 650px;
      margin-bottom: 34px;
    }

    .section-kicker {
      margin: 0 0 12px;
      font-size: .74rem;
      font-weight: 900;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: currentColor;
      opacity: .78;
    }

    .section-title {
      margin: 0;
      font-family: var(--display-font);
      font-size: clamp(1.7rem, 3.25vw, 3rem);
      line-height: 1.12;
      letter-spacing: 0;
      font-weight: 800;
    }

    .section-copy {
      max-width: 590px;
      margin: 16px 0 0;
      font-size: .94rem;
      line-height: 1.72;
      font-weight: 500;
      opacity: .83;
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .step-card,
    .feature-card,
    .price-card,
    .quote-card {
      position: relative;
      border: 3px solid var(--ink);
      border-radius: var(--radius);
      background: var(--white);
      color: var(--ink);
      box-shadow: 6px 6px 0 rgba(35, 28, 30, .18);
    }

    .step-card {
      min-height: 248px;
      padding: 22px;
      overflow: hidden;
      transition: transform .25s ease, box-shadow .25s ease;
    }

    .step-card:hover {
      transform: translateY(-5px) rotate(-.6deg);
      box-shadow: 8px 10px 0 rgba(35, 28, 30, .15);
    }

    .step-number {
      display: inline-flex;
      width: 50px;
      height: 50px;
      align-items: center;
      justify-content: center;
      border: 3px solid var(--ink);
      border-radius: 50%;
      background: var(--yellow);
      font-size: 1rem;
      font-weight: 900;
      animation: numberHop 3s ease-in-out infinite;
    }

    .step-card:nth-child(2) .step-number {
      background: var(--pink);
      color: #fff;
      animation-delay: .4s;
    }

    .step-card:nth-child(3) .step-number {
      background: var(--blue);
      color: #fff;
      animation-delay: .8s;
    }

    .step-card h3,
    .feature-card h3,
    .price-card h3 {
      margin: 26px 0 14px;
      font-family: var(--display-font);
      font-size: 1.12rem;
      line-height: 1.22;
      font-weight: 800;
    }

    .step-card p,
    .feature-card p,
    .price-card p,
    .quote-card p {
      margin: 0;
      font-size: .86rem;
      line-height: 1.62;
      font-weight: 500;
      color: rgba(35, 28, 30, .78);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    .feature-card {
      min-height: 206px;
      padding: 22px;
      transition: transform .22s ease, box-shadow .22s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 6px 10px 0 rgba(35, 28, 30, .15);
    }

    .feature-icon {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border: 3px solid var(--ink);
      border-radius: 50%;
      background: var(--yellow);
      color: var(--ink);
      animation: iconPulse 3.4s ease-in-out infinite;
    }

    .feature-card:nth-child(3n + 2) .feature-icon {
      background: var(--blue);
      color: #fff;
    }

    .feature-card:nth-child(3n) .feature-icon {
      background: var(--pink);
      color: #fff;
    }

    .feature-icon svg,
    .social a svg,
    .carousel-btn svg,
    .btn svg {
      width: 19px;
      height: 19px;
      stroke: currentColor;
      stroke-width: 2.4;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      align-items: stretch;
    }

    .price-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .price-card.featured {
      background: var(--ink);
      color: #fff;
      transform: translateY(-7px);
    }

    .price-card.featured p,
    .price-card.featured li {
      color: rgba(255, 255, 255, .78);
    }

    .badge {
      align-self: flex-start;
      padding: 7px 10px;
      border: 2px solid currentColor;
      border-radius: 999px;
      font-size: .75rem;
      font-weight: 900;
      text-transform: uppercase;
    }

    .price {
      margin: 24px 0 10px;
      font-family: var(--display-font);
      font-size: clamp(1.9rem, 3vw, 2.55rem);
      line-height: 1;
      font-weight: 900;
    }

    .price small {
      font-size: .82rem;
      font-weight: 700;
      opacity: .72;
    }

    .price-list {
      margin: 18px 0 22px;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 10px;
      font-size: .85rem;
      font-weight: 600;
    }

    .price-list li {
      display: grid;
      grid-template-columns: 22px 1fr;
      gap: 10px;
      color: rgba(35, 28, 30, .78);
    }

    .price-list li::before {
      content: "";
      width: 14px;
      height: 14px;
      margin-top: 3px;
      border: 2px solid currentColor;
      border-radius: 50%;
      background: var(--yellow);
    }

    .price-card .btn {
      margin-top: auto;
      width: 100%;
    }

    .testimonials-top {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 22px;
    }

    .carousel-actions {
      display: flex;
      gap: 10px;
    }

    .carousel-btn {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border: 3px solid var(--ink);
      border-radius: 50%;
      background: var(--white);
      color: var(--ink);
      box-shadow: 5px 5px 0 rgba(35, 28, 30, .24);
      transition: transform .2s ease, box-shadow .2s ease;
    }

    .carousel-btn:hover {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0 rgba(35, 28, 30, .24);
    }

    .quote-track {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(280px, 30%);
      gap: 18px;
      overflow-x: auto;
      padding: 4px 10px 18px 4px;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      cursor: grab;
    }

    .quote-track::-webkit-scrollbar {
      display: none;
    }

    .quote-track.dragging {
      cursor: grabbing;
      scroll-snap-type: none;
    }

    .quote-card {
      min-height: 204px;
      padding: 22px;
      scroll-snap-align: start;
      user-select: none;
    }

    .quote-card p {
      font-size: .88rem;
      color: rgba(35, 28, 30, .83);
    }

    .quote-author {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 18px;
      font-size: .86rem;
      font-weight: 900;
    }

    .avatar {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border: 2px solid var(--ink);
      border-radius: 50%;
      background: var(--yellow);
      font-weight: 900;
    }

    .quote-card:nth-child(2n) .avatar {
      background: var(--blue);
      color: #fff;
    }

    .quote-card:nth-child(3n) .avatar {
      background: var(--pink);
      color: #fff;
    }

    .free-section {
      text-align: left;
      background:
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, .38) 0 8%, transparent 9%),
        radial-gradient(circle at 84% 68%, rgba(35, 28, 30, .16) 0 9%, transparent 10%),
        var(--pink);
    }

    .free-section .section-title {
      max-width: 760px;
      margin: 0;
    }

    .free-section .section-copy {
      margin-left: 0;
      margin-right: 0;
      color: rgba(255, 255, 255, .88);
    }

    .free-section .btn {
      margin-top: 28px;
      background: var(--yellow);
      color: var(--ink);
    }

    .site-footer {
      position: relative;
      overflow: hidden;
      padding: 56px 0 26px;
      background: var(--ink);
      color: #fff;
    }

    .site-footer::before {
      content: "";
      position: absolute;
      width: 250px;
      height: 250px;
      right: -60px;
      top: -80px;
      border-radius: 50%;
      background: var(--blue);
      opacity: .55;
      animation: bob 6s ease-in-out infinite;
    }

    .footer-grid {
      position: relative;
      display: grid;
      grid-template-columns: 1.25fr repeat(3, 1fr);
      gap: 38px;
      z-index: 2;
    }

    .footer-logo {
      display: inline-flex;
      margin-bottom: 20px;
      font-size: clamp(1.35rem, 2vw, 1.7rem);
      color: #fff;
    }

    .footer-logo .logo-mini {
      color: var(--pink);
    }

    .footer-copy {
      max-width: 380px;
      margin: 0;
      line-height: 1.7;
      color: rgba(255, 255, 255, .72);
      font-weight: 500;
    }

    .footer-col h3 {
      margin: 0 0 16px;
      font-size: 1rem;
    }

    .footer-col a {
      display: block;
      width: fit-content;
      margin: 0 0 11px;
      color: rgba(255, 255, 255, .74);
      font-weight: 600;
      transition: color .2s ease, transform .2s ease;
    }

    .footer-col a:hover {
      color: #fff;
      transform: translateX(4px);
    }

    .social {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .social a {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border: 2px solid rgba(255, 255, 255, .32);
      border-radius: 50%;
      color: #fff;
      background: rgba(255, 255, 255, .08);
      transition: transform .2s ease, background .2s ease;
    }

    .social a:hover {
      transform: translateY(-4px) rotate(-4deg);
      background: var(--pink);
    }

    .footer-bottom {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-top: 56px;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, .16);
      color: rgba(255, 255, 255, .58);
      font-size: .88rem;
    }

    .reveal {
      opacity: 0;
      transform: translateY(26px);
      transition: opacity .7s ease, transform .7s ease;
    }

    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @keyframes starTwinkle {
      0%, 100% { transform: translateX(-50%) scale(.82) rotate(0deg); opacity: .78; }
      45% { transform: translateX(-50%) scale(1.22) rotate(18deg); opacity: 1; }
      70% { transform: translateX(-50%) scale(.94) rotate(-10deg); opacity: .88; }
    }

    @keyframes tinyStar {
      0%, 100% { transform: scale(.75) rotate(0); opacity: .6; }
      50% { transform: scale(1.35) rotate(28deg); opacity: 1; }
    }

    @keyframes logoFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    @keyframes lazySpin {
      to { transform: rotate(360deg); }
    }

    @keyframes bob {
      0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
      50% { transform: translate3d(0, -18px, 0) rotate(7deg); }
    }

    @keyframes wiggle {
      0%, 100% { transform: rotate(-7deg) translateY(0); }
      50% { transform: rotate(4deg) translateY(-18px); }
    }

    @keyframes colorHop {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    @keyframes underlinePulse {
      0%, 100% { transform: scaleX(.94) rotate(-1.2deg); }
      50% { transform: scaleX(1.02) rotate(1deg); }
    }

    @keyframes softFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @keyframes lineRead {
      0%, 100% { transform: scaleX(.82); opacity: .56; }
      50% { transform: scaleX(1); opacity: 1; }
    }

    @keyframes dotDrift {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-8px, -6px); }
    }

    @keyframes bookFloat {
      0%, 100% { transform: translateY(0) rotateZ(-1deg); }
      50% { transform: translateY(-18px) rotateZ(1.8deg); }
    }

    @keyframes dashDance {
      to { stroke-dashoffset: 100; transform: rotate(1turn); }
    }

    @keyframes hairBounce {
      0%, 100% { transform: translateY(0) rotate(-2deg); }
      50% { transform: translateY(-4px) rotate(2deg); }
    }

    @keyframes blink {
      0%, 92%, 100% { transform: scaleY(1); }
      95% { transform: scaleY(.12); }
    }

    @keyframes magicPop {
      0%, 100% { opacity: .68; scale: .92; }
      50% { opacity: 1; scale: 1.08; }
    }

    @keyframes numberHop {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(-8px) rotate(-6deg); }
    }

    @keyframes iconPulse {
      0%, 100% { transform: rotate(0) scale(1); }
      50% { transform: rotate(8deg) scale(1.05); }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: .001ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: .001ms !important;
      }
    }

    @media (max-width: 980px) {
      .nav {
        min-height: 68px;
      }

      .nav-links {
        display: none;
      }

      .hero-inner {
        grid-template-columns: 1fr;
        padding-top: 70px;
        padding-bottom: 94px;
      }

      .storybook-wrap {
        min-height: 300px;
        order: -1;
      }

      .storybook {
        width: min(300px, 82vw);
      }

      .steps,
      .features-grid,
      .pricing-grid,
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }

      .price-card.featured {
        transform: none;
      }
    }

    @media (max-width: 680px) {
      .nav {
        width: min(100% - 22px, var(--max));
        gap: 12px;
      }

      .logo {
        font-size: clamp(1rem, 5vw, 1.2rem);
      }

      .nav-actions .btn {
        min-height: 38px;
        padding: 9px 10px;
        font-size: .78rem;
        box-shadow: 3px 3px 0 var(--ink);
      }

      .hero-inner,
      .container {
        width: min(100% - 24px, var(--max));
      }

      .hero-inner {
        padding-top: 46px;
        padding-bottom: 78px;
      }

      h1 {
        font-size: clamp(1.95rem, 9.4vw, 2.75rem);
        line-height: 1.08;
      }

      .lead {
        font-size: .92rem;
        line-height: 1.7;
      }

      .hero-actions .btn {
        width: 100%;
      }

      .section {
        padding: 56px 0;
      }

      .section-head {
        margin-bottom: 26px;
      }

      .section-title {
        font-size: clamp(1.55rem, 8vw, 2.25rem);
      }

      .step-card,
      .feature-card,
      .price-card,
      .quote-card {
        padding: 18px;
      }

      .steps,
      .features-grid,
      .pricing-grid,
      .footer-grid {
        grid-template-columns: 1fr;
      }

      .step-card,
      .feature-card,
      .price-card {
        min-height: auto;
      }

      .testimonials-top {
        align-items: flex-start;
        flex-direction: column;
      }

      .quote-track {
        grid-auto-columns: minmax(276px, 88%);
      }

      .footer-bottom {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <nav class="nav" aria-label="Ana navigasyon">
      <a class="logo" href="#" aria-label="Storimini ana sayfa">
        stori<span class="logo-mini">mini</span>
      </a>
      <div class="nav-links" aria-label="Sayfa bağlantıları">
        <a href="#nasil-calisir">Nasıl Çalışır</a>
        <a href="#ozellikler">Özellikler</a>
        <a href="#fiyatlandirma">Fiyatlandırma</a>
        <a href="#yorumlar">Yorumlar</a>
      </div>
      <div class="nav-actions">
        <a class="btn" href="login.html">Giriş Yap</a>
        <a class="btn primary" href="signup.html">Üye Ol</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero" id="hero">
      <span class="floating-shape shape-star parallax" style="left: 8%; top: 24%;" data-speed=".22"></span>
      <span class="floating-shape shape-pill parallax" style="right: 14%; bottom: 14%;" data-speed=".16"></span>
      <span class="floating-shape shape-dot parallax" style="left: 45%; top: 12%;" data-speed=".1"></span>
      <div class="hero-inner">
        <div class="hero-copy reveal">
          <h1>Çocuğun masalın <span>baş kahramanı</span> olsun!</h1>
          <p class="lead">Storimini, çocuğunuzun ismini, ilgilerini ve öğrenmesini istediğiniz değerleri masalın içine taşıyan yapay zeka destekli kişiselleştirilmiş hikaye platformudur.</p>
          <div class="hero-actions">
            <a class="btn primary" href="signup.html">
              İlk Masalı Oluştur
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
            </a>
            <a class="btn" href="#nasil-calisir">Nasıl Çalışır?</a>
          </div>
        </div>
        <div class="storybook-wrap reveal" aria-hidden="true">
          <div class="storybook parallax" data-speed=".08">
            <h2 class="story-card-title">Mina'nın Ay Bahçesi</h2>
            <div class="story-lines">
              <span class="story-line"></span>
              <span class="story-line"></span>
              <span class="story-line"></span>
              <span class="story-line"></span>
            </div>
            <span class="story-dot"></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section color-blue" id="nasil-calisir">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-kicker">Nasıl çalışır?</p>
          <h2 class="section-title">Üç adımda masalın kahramanı ol!</h2>
        </div>
        <div class="steps">
          <article class="step-card reveal">
            <span class="step-number">01</span>
            <h3>Çocuğunu Tanıt!</h3>
            <p>Adı, yaşı, tutkuları, korkuları ve öğrenmesini istediğin bir öğreti. Sihirbaz çalışmaya başlasın.</p>
          </article>
          <article class="step-card reveal">
            <span class="step-number">02</span>
            <h3>Masal Saniyeler İçinde Hazır!</h3>
            <p>Sadece çocuğuna özel bir masal, ister kendin oku istersen sesini tanımla yapay zeka okusun.</p>
          </article>
          <article class="step-card reveal">
            <span class="step-number">03</span>
            <h3>Kitabın Adresine Gelsin!</h3>
            <p>Seçeceğin pakete göre ayda 1 ya da 3 kitap adresine ücretsiz olarak gelsin, üstelik çocuğuna özel illustrasyonlarla!</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section light" id="ozellikler">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-kicker">Düşündüğün her şey</p>
          <h2 class="section-title">Masal, gelişim ve aile bağını aynı yerde toplar.</h2>
          <p class="section-copy">Her hikaye çocuğunuzun dünyasına göre şekillenir; metin, görsel, ses ve güvenlik katmanları birlikte çalışır.</p>
        </div>
        <div class="features-grid">
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M4 19.5V5a2 2 0 0 1 2-2h11"/><path d="M8 7h8"/><path d="M8 11h6"/><path d="M6 21h13a1 1 0 0 0 1-1V6"/></svg></div>
            <h3>Montessori Temelli</h3>
            <p>Çocuk gelişimini destekleyen, yaşa ve öğrenme evresine uygun hikaye kurguları.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2 15 9l7 .5-5.5 4.6 1.8 7-6.3-3.8-6.3 3.8 1.8-7L2 9.5 9 9z"/></svg></div>
            <h3>Uzman Onaylı</h3>
            <p>Pedagoglar ve deneyimli masal yazarları tarafından denetlenmiş içerikler.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg></div>
            <h3>Kişisel Hikayeler</h3>
            <p>Çocuğun adı, ilgi alanları ve karakter özelliklerine göre dinamik olarak oluşturulan masallar.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="m14 4 6 6-9 9H5v-6z"/><path d="M14 4 5 13"/><path d="m5 19-2 2"/></svg></div>
            <h3>Özel İllüstrasyon</h3>
            <p>Her hikaye için çocuğa özel üretilen, stilize ve özgün görsellerle dolu masal kitapları.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg></div>
            <h3>Sesli Anlatım</h3>
            <p>Ebeveynin sesiyle hikayeyi seslendirme ve duygusal bağ kurma.</p>
          </article>
          <article class="feature-card reveal">
            <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-5"/></svg></div>
            <h3>Güvenli Veri</h3>
            <p>Tam gizlilik odaklı altyapı, çocuk verilerinin korunması ve dışarıya kapalı sistem.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section color-yellow" id="fiyatlandirma">
      <div class="container">
        <div class="section-head reveal">
          <p class="section-kicker">Fiyatlandırma</p>
          <h2 class="section-title">Her aileye uygun bir paket.</h2>
          <p class="section-copy">Dijital masaldan kişiye özel basılı kitaba kadar, Storimini paketleri çocuğunuzun hikaye alışkanlığına göre ölçeklenir.</p>
        </div>
        <div class="pricing-grid">
          <article class="price-card reveal">
            <span class="badge">Başlangıç</span>
            <h3>Mini Masal</h3>
            <p>İlk keşifler ve gece rutini için.</p>
            <div class="price">₺149<small>/ay</small></div>
            <ul class="price-list">
              <li>Ayda 10 kişisel dijital masal</li>
              <li>3 yapay zeka illüstrasyonlu hikaye</li>
              <li>Standart sesli anlatım</li>
              <li>Ebeveyn kontrol paneli</li>
            </ul>
            <a class="btn" href="signup.html">Paketi Seç</a>
          </article>
          <article class="price-card featured reveal">
            <span class="badge">En Sevilen</span>
            <h3>Ev Kitaplığı</h3>
            <p>Her ay eve gelen özel kitap deneyimi.</p>
            <div class="price">₺399<small>/ay</small></div>
            <ul class="price-list">
              <li>Sınırsız dijital masal üretimi</li>
              <li>Ayda 1 kişisel basılı kitap</li>
              <li>Ebeveyn sesiyle anlatım</li>
              <li>Uzman onaylı tema seçimi</li>
            </ul>
            <a class="btn primary" href="signup.html">Paketi Seç</a>
          </article>
          <article class="price-card reveal">
            <span class="badge">Premium</span>
            <h3>Masal Kulübü</h3>
            <p>Kardeşler ve sık okuyan aileler için.</p>
            <div class="price">₺799<small>/ay</small></div>
            <ul class="price-list">
              <li>3 çocuk profili ve sınırsız masal</li>
              <li>Ayda 3 kişisel basılı kitap</li>
              <li>Özel illüstrasyon stil seçimi</li>
              <li>Öncelikli destek ve güvenli arşiv</li>
            </ul>
            <a class="btn blue" href="signup.html">Paketi Seç</a>
          </article>
        </div>
      </div>
    </section>

    <section class="section light" id="yorumlar">
      <div class="container">
        <div class="testimonials-top">
          <div class="section-head reveal" style="margin-bottom: 0;">
            <p class="section-kicker">Aileler ne diyor?</p>
            <h2 class="section-title">Uyku öncesi artık aynı masal değil.</h2>
          </div>
          <div class="carousel-actions reveal" aria-label="Yorumları gez">
            <button class="carousel-btn" type="button" data-dir="-1" aria-label="Önceki yorum">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button class="carousel-btn" type="button" data-dir="1" aria-label="Sonraki yorum">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        <div class="quote-track reveal" id="quoteTrack">
          <article class="quote-card">
            <p>"Kızım kendi adını duyunca masalın içine gerçekten girdi. Her gece yeni bir macera istemesi bizim için çok tatlı bir rutine dönüştü."</p>
            <div class="quote-author"><span class="avatar">E</span><span>Elif, 5 yaş annesi</span></div>
          </article>
          <article class="quote-card">
            <p>"Paylaşma temasını seçtik, masal bunu hiç ders verir gibi anlatmadan işledi. Ertesi gün kardeşiyle oyuncaklarını paylaşırken yakaladım."</p>
            <div class="quote-author"><span class="avatar">M</span><span>Mert, 2 çocuk babası</span></div>
          </article>
          <article class="quote-card">
            <p>"Sesimi tanımlayıp yapay zekaya okuttuğumda şehir dışında bile uyku öncesinde yanındaymışım gibi hissettirdi."</p>
            <div class="quote-author"><span class="avatar">D</span><span>Deniz, 4 yaş babası</span></div>
          </article>
          <article class="quote-card">
            <p>"Basılı kitabın içindeki karakterin oğluma benzemesi inanılmaz heyecan yarattı. Kitabı arkadaşlarına gösterip duruyor."</p>
            <div class="quote-author"><span class="avatar">A</span><span>Ayşe, 6 yaş annesi</span></div>
          </article>
          <article class="quote-card">
            <p>"Korkular kısmına karanlığı yazdık. Hikaye o kadar yumuşak ilerledi ki gece lambasını ilk kez kendi kapatmak istedi."</p>
            <div class="quote-author"><span class="avatar">S</span><span>Selin, 5 yaş annesi</span></div>
          </article>
          <article class="quote-card">
            <p>"Hızlı üretim kısmı hayat kurtarıyor. O gün okulda yaşadığı şeye göre aynı akşam ona özel bir masal hazırladık."</p>
            <div class="quote-author"><span class="avatar">K</span><span>Kerem, 7 yaş babası</span></div>
          </article>
        </div>
      </div>
    </section>

    <section class="section color-pink free-section">
      <div class="container reveal">
        <p class="section-kicker">İlk 3 Masal ücretsiz.</p>
        <h2 class="section-title">Bu gece ilk masalı birlikte okuyun, hikayenin kahramanı çocuğunuz olsun!</h2>
        <p class="section-copy">Birkaç bilgi girin, Storimini çocuğunuzun dünyasına ait ilk macerayı saniyeler içinde hazırlasın.</p>
        <a class="btn" href="signup.html">
          Ücretsiz Başla
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
        </a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="logo footer-logo" href="#" aria-label="Storimini ana sayfa">
            stori<span class="logo-mini">mini</span>
          </a>
          <p class="footer-copy">Teknolojiyi klasik masal anlatıcılığıyla birleştiren, çocuklara özel modern dijital kütüphane.</p>
          <div class="social" aria-label="Sosyal medya">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><path d="M2 9h4v12H2z"/><path d="M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12s0-4-1-5-5-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 5 1 9 1 8 0 9-1 1-5 1-5z"/><path d="m10 9 5 3-5 3z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h3>Site Haritası</h3>
          <a href="#nasil-calisir">Nasıl Çalışır</a>
          <a href="#ozellikler">Özellikler</a>
          <a href="#fiyatlandirma">Fiyatlandırma</a>
          <a href="#yorumlar">Aile Yorumları</a>
          <a href="#">Blog</a>
        </div>
        <div class="footer-col">
          <h3>Yasal</h3>
          <a href="#">Gizlilik Politikası</a>
          <a href="#">Kullanım Şartları</a>
          <a href="#">KVKK</a>
          <a href="#">Çerez Politikası</a>
        </div>
        <div class="footer-col">
          <h3>Güven</h3>
          <a href="#">Güvenlik</a>
          <a href="#">Ebeveyn Rehberi</a>
          <a href="login.html">Giriş Yap</a>
          <a href="signup.html">Üye Ol</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Storimini. Tüm hakları saklıdır.</span>
        <span>Çocuk verileri gizlilik odaklı altyapıda korunur.</span>
      </div>
    </div>
  </footer>

  <script>
    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => revealObserver.observe(item));

    const parallaxItems = document.querySelectorAll(".parallax");
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.speed || 0.1);
        item.style.translate = `0 ${y * speed * -0.25}px`;
      });
    }, { passive: true });

    const track = document.getElementById("quoteTrack");
    const controls = document.querySelectorAll(".carousel-btn");

    controls.forEach((button) => {
      button.addEventListener("click", () => {
        const dir = Number(button.dataset.dir);
        track.scrollBy({ left: dir * Math.min(420, track.clientWidth * .86), behavior: "smooth" });
      });
    });

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    track.addEventListener("pointerdown", (event) => {
      isDown = true;
      startX = event.clientX;
      scrollStart = track.scrollLeft;
      track.classList.add("dragging");
      track.setPointerCapture(event.pointerId);
    });

    track.addEventListener("pointermove", (event) => {
      if (!isDown) return;
      const delta = event.clientX - startX;
      track.scrollLeft = scrollStart - delta;
    });

    const stopDragging = () => {
      isDown = false;
      track.classList.remove("dragging");
    };

    track.addEventListener("pointerup", stopDragging);
    track.addEventListener("pointercancel", stopDragging);
    track.addEventListener("pointerleave", stopDragging);
  </script>
</body>
</html>
