# Generative Art 1

## Beginning of Exploration

Original inspiration from the picture of album artwork in this [episode / article](https://www.pointfree.co/episodes/ep49-generative-art-part-1).

Initially took the aesthetic as inspiration and started by looking into how to let lines stop when the bump into each other.

Secondary desiderata was to continue trying out the "no build" approach to JS to see where it's nice or starts to fall apart.

Third order interest was to do some grid stuff again to scrape off some rust without a css build system either.

Along the way started with script imports from d3 on a cdn and then looked at d3 code and made simplified utils that are more purpose fit to avoid the extra cdn calls and really explore what that code even was doing by porting and simplifying.

## Maybe Continuations

I did small multiples across seeds instead of the "knobs like storybook" approach to seeing different versions.

I still think some rudimentary UI elements that would allow live exploration is a good idea, but may stress out the "no build" approach to get working without a large outlay of code / time.

Lots of new work ideas still bouncing around in my head, but one was to let go of the curves for a bit and allow lines to wander in any direction vs. just left to right with jumps up or down.

Maybe adding in something other than lines like dots or circles is another potential avenue. Some of these may go outside the "what's axis drawable or laser cuttable" boundaries but that's likely fine while exploring.

### Build / Deploy / Formatting

Just run a local webserver like `python3 -m http.server 1001` and go to:

http://localhost:1001/

Hit refresh on the page after saving any file.

Available out on github pages at:

https://solenoid.github.io/generative-art-1/

Formatting is just using prettier locally with no config so apparently saying good-bye to semi-colons;
