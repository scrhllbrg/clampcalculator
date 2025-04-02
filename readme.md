# CSS Clamp() Calculator

A focused, dependency-free tool to generate responsive CSS `clamp()` values — no media queries, no guesswork.

![Screenshot of the Clamp Calculator](img/clamp_calculator.webp)

## Public Version

A fully featured, fast, and completely free version is available at:
https://clamp.hpns.dev/

No signups, no bloat, no data scraped — just a tool that does one thing.

## What It Does

This tool helps you generate fluid, viewport-based `clamp()` values for properties like font-size, padding, margin, or any other responsive unit.

It's designed for modern workflows where you already know your min and max values and just want the dynamic middle part calculated quickly. It intentionally uses plain `vw` values, valuing simplicity over subpixel-perfect breakpoint precision.

Unlike other generators, this one assumes you prefer working directly in your IDE — quick, editable, and keyboard-first.

## Key Concepts

### Breakpoint

The viewport width where your max value should be applied.

### Max Value of Clamp

The largest value the property should reach at or above the breakpoint. This is used to determine the dynamic `vw` value.

Please select the appropriate unit.

### Min Value of Clamp

This tool does not calculate a minimum value. You provide it separately when using the `clamp()` function.

### New Max Value

Remove the previously entered max value and immediately start typing or pasting your new max value. The result will update automatically. You can also press the "Calculate" button if needed.

### Result

The calculated `vw`-based middle value. Your CSS will look something like this:

```css
padding: clamp(MINVALUE, RESULT, MAXVALUE);
```

## Features
### Copy Button
Click once to copy just the vw value, ready to paste into your CSS.

### Rem Units
The calculator assumes 1rem = 10px by setting the HTML font size to 62.5%.

```css
html {
  font-size: 62.5%;
  position: relative;
}

body {
  font-size: 1.6rem;
}
```

### Local Storage and Presets
The calculator uses local storage to remember your most recent settings, including breakpoint, unit, and presets. Presets can be stored, loaded, or removed as needed.

## About This Tool
Many modern designs are delivered with only desktop and mobile variants. That’s perfectly fine. Use clamp() to scale components fluidly between these sizes, replacing countless @media queries.

This generator is as simplified as possible. Ease of use and a fast workflow are the priority. It assumes you already have your min and max values and just need the dynamic value for scaling.

The idea is to build clamps in your IDE rather than generating full CSS lines repeatedly. In many cases, it’s faster to use your keyboard to enter the known values and paste in just the vw portion.

### Tech Stack
The tool is built with 100% vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies. It’s a fully static site and easy to modify or extend using any preprocessor or frontend stack of your choice.

### CSS Clamp Demo
A simple demo of how clamp() works is available here:
https://codepen.io/Oscar-Hallberg/pen/qEBoawz

### Source
The source code for this project is available at:
https://github.com/scrhllbrg/clampcalculator
