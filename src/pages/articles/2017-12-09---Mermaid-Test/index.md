---
title: Mermaid Test
date: "2017-12-27"
layout: post
draft: false
path: "/posts/mermaid-test/"
category: "Tools"
tags:
  - "Mermaid"
  - "Typography"
  - "Web Development"
description: "Test of Markdown graph plugin"
---
[gatsby-remark-graph](https://github.com/konsumer/gatsby-remark-graph) is a plugin to allow [MermaidJS](https://mermaidjs.github.io/) diagrams in Markdown code blocks.

````
```mermaid
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```
````

generates this diagram:

``` mermaid
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```

and 

````
``` mermaid
graph LR
     RD[Raw Data] --> RS[Raw Storage]
     RS[Raw Storage] --> P[Process]
     P[Process] --> CS[Clean Storage]
     CS[Clean Storage] --> Q[Query]
     Q[Query] --> I[Insight]
```
````

will give you this:

```mermaid
graph LR
     RD[fa:fa-spinner Raw Data] --> RS[Raw Storage]
     RS[Raw Storage] --> P[Process]
     P[Process] --> CS[Clean Storage]
     CS[Clean Storage] --> Q[Query]
     Q[Query] --> I[Insight]
```
