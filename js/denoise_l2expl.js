import {reduceLatentDenoiser,expandLatentDenoiserL3} from "./function.js"

document.addEventListener("keydown", (e) => {
    if (window.latentDenoiserL2Expanded && !window.latentDenoiserL3Expanded && e.key == "Escape") reduceLatentDenoiser();
})

// reduce button
d3.select("#architecture-container")
    .append("div")
    .attr("id", "denoise-latent-l2-expl-container")
        .append("img")
        .attr("id", "denoise-latent-l2-expl-reduce-button")
        .attr("src", "./icons/reduce.svg")
        .attr("alt", "Reduce SVG")
        .attr("height", `20px`)
        .on("click", reduceLatentDenoiser)

// TODO: ADD latent images after loading d3.json data
d3.select("#denoise-latent-l2-expl-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-prev-latent-container")
        .append("img")
            .attr("id", "denoise-latent-l2-expl-prev-latent-img")
d3.select("#denoise-latent-l2-expl-prev-latent-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-prev-latent-timestep")
        .text("30")
d3.select("#denoise-latent-l2-expl-prev-latent-container")
        .append("div")
            .attr("id", "denoise-latent-l2-expl-prev-latent-text")
            .text("Latent from timestep 30")


// latent to UNet arrow
let architectureLineWidth = 2;
let architectureLineColor = "#b0b0b0"
let dy = 42
let dx = 6
let angle = Math.atan(dx/dy);
let r = 10
d3.select("#denoise-latent-l2-expl-container")
    .append("svg")
        .attr("id", "denoise-latent-l2-expl-latent-unet-arrow-svg")
        .append("g")
        .append("path")
            .attr("id", "denoise-latent-l2-expl-latent-unet-arrow")
            .attr("d", `M0 0 l20 0 a ${r} ${r} ${90-angle*180/Math.PI} 0 1 ${r*Math.cos(angle)} ${r-r*Math.sin(angle)} l${dx} ${dy} a ${r} ${r} ${90-angle*180/Math.PI} 0 0 ${r*Math.cos(angle)} ${r-r*Math.sin(angle)} l 3 0`)
            .attr("fill", "none")
            .attr("stroke", architectureLineColor)
            .attr("stroke-width", architectureLineWidth)
            .attr("marker-end", "url(#architecture-arrow-head)")

// UNet
d3.select("#denoise-latent-l2-expl-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-unet-container")
        .append("svg")
            .attr("id", "denoise-latent-l2-expl-unet-svg")
            .append("rect")
                .attr("id", "denoise-latent-l2-expl-unet-rect")
                .attr("class", "architecture-rectangle")
                .attr("width", "60")
                .attr("height", "60")
                .attr("fill", "#f4f4f4")
                .attr("rx", "5")
                .attr("ry", "5")
d3.select("#denoise-latent-l2-expl-unet-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-unet-text")
        .attr("class", "architecture-text")
        .text("UNet")

// ADD arrow and explanations for guidance scale
let x_=12;
let y_=12;
let arrowHeadL=4;
let arrowHeadAngle=Math.PI/6;
let depth = 4;
let lineAngle = Math.atan(x_/y_)
let dx_=depth*Math.sin(lineAngle)
let dy_=-depth*Math.cos(lineAngle)
d3.select("#denoise-latent-l2-expl-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-guidance-scale-expl-container")
        .append("svg")
            .attr("id", "denoise-latent-l2-expl-guidance-scale-arrow-svg")
            .append("g")
                .append("path")
                .attr("d", `M0 0 c ${-dx_} ${-dy_}, ${x_-dx_} ${y_-dy_}, ${x_} ${y_} l ${arrowHeadL*Math.sin(arrowHeadAngle-lineAngle)} ${-arrowHeadL*Math.cos(arrowHeadAngle-lineAngle)} m ${-(arrowHeadL+0.5)*Math.sin(arrowHeadAngle-lineAngle)} ${(arrowHeadL+0.5)*Math.cos(arrowHeadAngle-lineAngle)} l ${-(arrowHeadL+1)*Math.sin(arrowHeadAngle+lineAngle+45*Math.PI/180)} ${-(arrowHeadL+1)*Math.cos(arrowHeadAngle+lineAngle+45*Math.PI/180)}`) 
                .attr("fill", "none")
                .attr("stroke", "#909090")
                .attr("stroke-width", "1px")
d3.select("#denoise-latent-l2-expl-guidance-scale-expl-container")
.append("div")
.text("How much to guide UNet with the text prompt. High guidance scale generates images closer to the text prompt but less creative.")
.attr("id", "denoise-latent-l2-expl-guidance-scale-expl-text")

// ADD noise
dy = 60
dx = 9
angle = Math.atan(dx/dy);
d3.select("#denoise-latent-l2-expl-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-noise-container")
        .append("svg")
            .attr("id", "denoise-latent-l2-expl-noise-svg")
            .append("g")
            .append("path")
                .attr("id", "denoise-latent-l2-expl-noise-arrow")
                .attr("d", `M0 0 l180 0 a ${r} ${r} ${90-angle*180/Math.PI} 0 0 ${r*Math.cos(angle)} ${-r+r*Math.sin(angle)} l${dx} -${dy} a ${r} ${r} ${90-angle*180/Math.PI} 0 1 ${r*Math.cos(angle)} ${-r+r*Math.sin(angle)} l 3 0`)
                .attr("fill", "none")
                .attr("stroke", "url(#denoise-latent-l2-expl-weaken-arrow-gradient)")
                .attr("stroke-width", architectureLineWidth)
d3.select("#denoise-latent-l2-expl-noise-container")
    .append("img")
        .attr("id", "denoise-latent-l2-expl-noise-img")
        .attr("class", "denoise-latent-l2-expl-noise")
        .attr("src", `./assets/noises/noise_pred_final.jpg`)
d3.select("#denoise-latent-l2-expl-noise-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-noise-text")
        .text("Noise")
// TEMP
d3.select("#denoise-latent-l2-expl-noise-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-question-mark")
        .text("?")
        .on("click", function () {
            if (!window.latentDenoiserL3Expanded) expandLatentDenoiserL3()
        })

// ADD Weaken and Arrow and explanations
x_=-4;
y_=-16;
arrowHeadL=4;
arrowHeadAngle=Math.PI/4;
depth = 4;
lineAngle = Math.atan(x_/y_)
dx_=depth*Math.sin(lineAngle)
dy_=-depth*Math.cos(lineAngle)
d3.select("#denoise-latent-l2-expl-noise-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-weaken-text")
        .text("weaken")
d3.select("#denoise-latent-l2-expl-noise-container")
    .append("svg")
        .attr("id", "denoise-latent-l2-expl-weaken-arrow-svg")
        .append("g")
        .append("path")
        .attr("d", `M0 0 c ${dx_} ${dy_}, ${x_+dx_} ${y_+dy_}, ${x_} ${y_} l ${-arrowHeadL*Math.sin(arrowHeadAngle-lineAngle)} ${arrowHeadL*Math.cos(arrowHeadAngle-lineAngle)} m ${(arrowHeadL+1)*Math.sin(arrowHeadAngle-lineAngle)} ${-(arrowHeadL+1)*Math.cos(arrowHeadAngle-lineAngle)} l ${(arrowHeadL+1)*Math.sin(arrowHeadAngle+lineAngle+15*Math.PI/180)} ${(arrowHeadL+1)*Math.cos(arrowHeadAngle+lineAngle+15*Math.PI/180)}`)
        .attr("fill", "none")
        .attr("stroke", "#909090")
        .attr("stroke-width", "1px")
d3.select("#denoise-latent-l2-expl-noise-container")
    .select("svg")
        .append("defs")
            .append("linearGradient")
                .attr("id", "denoise-latent-l2-expl-weaken-arrow-gradient")
                .attr("x1", "0%")
                .attr("x2", "100%")
                .attr("y1", "0%")
                .attr("y2", "0%")
                .selectAll("stop")
                .data([["0%", "#b0b0b0"], ["30%", "#b0b0b0"], ["100%", "#f9f9f9"]])
                .enter()
                .append("stop")
                .attr("offset", d => d[0])
                .attr("stop-color", d => d[1])
d3.select("#denoise-latent-l2-expl-noise-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-weaken-expl")
        .text("Multiply by small number decided by scheduler to gradually denoise over multiple steps")

// central branch
let centralLineWidth = 5;
let centralLineColor = "#51B3D2";
d3.select("#denoise-latent-l2-expl-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-central-line-container")
        .append("svg")
            .attr("id", "denoise-latent-l2-expl-central-line-svg")
            .append("line")
                .attr("x1", "0")
                .attr("y1", "10")
                .attr("x2", "522")
                .attr("y2", "10")
                .attr("stroke-width", `${centralLineWidth}px`)
                .attr("stroke", `${centralLineColor}`)
                .attr("marker-end", "url(#denoise-latent-l2-expl-central-line-arrow-head)")
d3.select("#denoise-latent-l2-expl-central-line-svg")
    .append("circle")
        .attr("r", "10")
        .attr("cx", "498")
        .attr("cy", "10")
        .attr("fill", "white")
        .attr("stroke-width", `${centralLineWidth}px`)
        // .attr("stroke", `${centralLineColor}`)
        .attr("stroke", `#dadada`)
d3.select("#denoise-latent-l2-expl-central-line-svg")
    .append("text")
    .attr("id", "denoise-latent-l2-expl-central-line-minus-text")
    .text("-")
    .attr("x", "494")
    .attr("y", "16.3")
d3.select("#denoise-latent-l2-expl-central-line-svg")
    .append("defs")
        .append("marker")
            .attr("id", "denoise-latent-l2-expl-central-line-arrow-head")
            .attr("markerWidth", "8.75")
            .attr("markerHeight", "3.5")
            .attr("refX", "0")
            .attr("refY", "1.75")
            .attr("orient", "auto")
            .append("polygon")
                .attr("points", "0 0, 3.5 1.75, 0 3.5")
                .attr("fill", centralLineColor)
d3.select("#denoise-latent-l2-expl-central-line-container")
    .append("div")
        .attr("id", "denoise-latent-l2-expl-central-line-timestep-expl-text")
        .text("Timestep is also input to UNet to indicate how noisy latent is")

d3.select("#denoise-latent-l2-expl-container")
    .append("svg")
        .attr("id", "denoise-latent-l2-expl-text-vectors-arrow-svg")
    .append("use")
        .attr("href", "#generate-text-vector-denoise-latent-arrow")
        .attr("id", "denoise-latent-l2-expl-text-vectors-arrow-use")

d3.select("#architecture-container")
    .append("div")
    .attr("id", "denoise-latent-l2-right-cover")
d3.select("#architecture-container")
    .append("div")
    .attr("id", "denoise-latent-l2-left-cover")