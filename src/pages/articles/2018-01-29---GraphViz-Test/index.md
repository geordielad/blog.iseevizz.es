---
title: "Integrating GraphViz into Markdown"
date: "2018-01-29T00:00:00Z"
layout: post
draft: false
path: "/posts/2018-01-29---GraphViz-Test/"
category: "Tools"
description: "Graphviz is open source graph vizualation software. Graph model can be use to represent anything from simple flowcharts, to ERDs. I want to see if I can incorporate graphs into my blog content"
tags:
  - "GraphViz"
  - "Images"
---

[Graphviz](https://www.graphviz.org) graphs can be represented as text using the DOT language. What-if you could take DOT language and transform it into images in a markdown document?

One way might be to generate the images as png/jpg or other format ahead of time then embed the image. Another way might be to embed the code directly in the markdown document as fenced code blocks and do some processing behind the scenes to generate the image or an SVG element in the HTML that gets generated in the pipeline that transforms markdown to HTML. In my case I am using Visual Studio Code and Gatsby to generate a static site on Github Pages. This means there a hooks in many different places to acheive these goals and more. 

There are hooks:

* In Visual Studio Code to add extensions
* In Gatsby to add transform and other plugins
* In React becuase Gatsby is based on React

The image workflow for Graphviz could go something like this:

Add the [GraphViz Preview extension](https://github.com/EFanZh/Graphviz-Preview) to VSC. This alows a DOT file to be rendered as an image in another VSC pane.

* Create a DOT file
* In VSC open the dot file and preview the graph
* Use Snagit to capture the preview
* Paste the Preview link into index.md

This is not perfect but it works:

Here is a graph created using the above workflow:

![](images/graphviz-previerw-capture.png)

The current VSC extension uses the graphviz dot bin to generate svg and emded it in a preview window. I wonder if I can capture the SVG and embed that in my document or save as an image file automatically?

Is there a better workflow? I have tried a gatsby add in that supports mermaid which allows you to create a fenced code code block that uses the merlin syntax but it does not actually work seamlessly with my gatsby installation and startter kit for some reasons that I have not quite figured out.

Here is another possible workflow:

* Install a run shell command like [Shell for VSCode](https://github.com/bbenoist/vscode-shell.git)
* Ensure dot is on the path
* Run a shell command from the Command Palette like ```dot -Tpng -o./images/sample2.png sample.dot```

With our sample.dot 

``` dot
digraph graphname {
    rankdir=LR
    bgcolor="transparent"
    ratio=compress
    size=8
    node 
    [
        margin=0.2 fontcolor=blue width=0.5 shape=box
        style="filled"
        fillcolor="white"
    ]
     "Raw Data" -> "Raw Storage" -> Process -> "Clean Storage" -> "Query" -> Insight;
 }
```

this creates the following png file:

![](images/sample2.png)

That's pretty nice. It needs testing with a wide variety of graphs but it feels like it could be enhance into an extension that can be run easily without leaving VSC or your editing flow.

Here is another sample:

![](images/large-graph.png)

## Gravizo

[Gravizo](https://gravizo.com) is a cloud service that supports DOT, PlantUML, UMLGraph and SVG (in JSON)

Here is an example from their website:

``` html
![Alt text](https://g.gravizo.com/svg?
  digraph G {
    aize ="4,4";
    main [shape=box];
    main -> parse [weight=8];
    parse -> execute;
    main -> init [style=dotted];
    main -> cleanup;
    execute -> { make_string; printf}
    init -> make_string;
    edge [color=red];
    main -> printf [style=bold,label="100 times"];
    make_string [label="make a string"];
    node [shape=box,style=filled,color=".7 .3 1.0"];
    execute -> compare;
  }
)
```

![Alt text](https://g.gravizo.com/svg?
  digraph G {
    aize ="4,4";
    main [shape=box];
    main -> parse [weight=8];
    parse -> execute;
    main -> init [style=dotted];
    main -> cleanup;
    execute -> { make_string; printf}
    init -> make_string;
    edge [color=red];
    main -> printf [style=bold,label="100 times"];
    make_string [label="make a string"];
    node [shape=box,style=filled,color=".7 .3 1.0"];
    execute -> compare;
  }
)

How about our previous sample:

``` dot
digraph graphname {
    rankdir=LR
    bgcolor="transparent"
    ratio=compress
    size=8
    node 
    [
        margin=0.2 fontcolor=blue width=0.5 shape=box
        style="filled"
        fillcolor="white"
    ]
     "Raw Data" -> "Raw Storage" -> Process -> "Clean Storage" -> "Query" -> Insight;
 }
```

![Alt text](https://g.gravizo.com/svg?
digraph graphname {
    rankdir=LR
    bgcolor="transparent"
    ratio=compress
    size=8
    node 
    [
        margin=0.2 fontcolor=blue width=0.5 shape=box
        style="filled"
        fillcolor="white"
    ]
     "Raw Data" -> "Raw Storage" -> Process -> "Clean Storage" -> "Query" -> Insight;
 }
 )

 That that does not work as expected.

 ## PlantUML

```plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```

## LucidChart

![](https://www.lucidchart.com/publicSegments/view/1af13062-7f4b-49a9-860e-180d5cdb46da/image.png)

