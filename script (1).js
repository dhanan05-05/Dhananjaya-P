async function generateMindMap() {
    const topic = document.getElementById("topic").value.trim();

    if (!topic) {
        alert("Please enter a topic");
        return;
    }

    const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic })
    });

    const data = await response.json();
    const outline = data.outline;

    // Start Mermaid mindmap
    let mermaidText = `mindmap\n  root((${topic}))\n`;

    const lines = outline.split("\n");

    lines.forEach(line => {
        let cleanLine = line
            .replace(/^[-•*0-9.]+/g, "") // remove bullets/numbers
            .trim();

        if (cleanLine.length > 0) {
            mermaidText += `    ${cleanLine}\n`;
        }
    });

    const mindmapDiv = document.getElementById("mindmap");
    mindmapDiv.innerHTML = mermaidText;

    try {
        mermaid.init(undefined, mindmapDiv);
    } catch (e) {
        console.error("Mermaid error:", e);
        alert("Error generating mind map. Try another topic.");
    }
}
