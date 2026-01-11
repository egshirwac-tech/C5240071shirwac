// =======================
// CHAPTERS DATA
// =======================
const chaptersData = {
  chapter7: {
    title: "Chapter 7: JavaScript Objects",
    examples: [
      { title: "Object Literal", code: "const user={name:'Shirwac',age:22}; return user.name;" },
      { title: "Dot Access", code: "const car={make:'Toyota'}; return car.make;" },
      { title: "Bracket Access", code: "const st={id:'C624'}; return st['id'];" },
      { title: "Add Property", code: "const o={}; o.color='Red'; return o.color;" },
      { title: "Delete Property", code: "const o={a:1,b:2}; delete o.a; return JSON.stringify(o);" },
      { title: "Method Call", code: "const o={greet(){return 'Hi Shirwac!'}}; return o.greet();" },
      { title: "Nested Object", code: "const o={a:{b:5}}; return o.a.b;" },
      { title: "Object.keys", code: "return Object.keys({x:1,y:2});" },
      { title: "Object.values", code: "return Object.values({x:1,y:2});" },
      { title: "JSON.stringify", code: "return JSON.stringify({id:101});" },
      { title: "JSON.parse", code: "return JSON.parse('{\"status\":\"OK\"}').status;" },
      { title: "In Operator", code: "return 'age' in {age:20};" },
      { title: "Object.assign", code: "return JSON.stringify(Object.assign({a:1},{b:2}));" },
      { title: "Spread Operator", code: "const a={x:1}; return JSON.stringify({...a,y:2});" },
      { title: "Freeze Object", code: "const o={n:1}; Object.freeze(o); o.n=2; return o.n;" },
      { title: "Shorthand", code: "const name='Shirwac'; return JSON.stringify({name});" },
      { title: "Looping", code: "let r=''; for(let k in {a:1,b:2}) r+=k; return r;" },
      { title: "Destructuring", code: "const {id}= {id:77,n:'A'}; return id;" },
      { title: "hasOwnProperty", code: "return ({a:1}).hasOwnProperty('a');" }
    ]
  },

  chapter8: {
    title: "Chapter 8: DOM Manipulation",
    examples: [
      {
        title: "Change Text",
        html: "<div id='b1'>Old</div>",
        code: "document.getElementById('b1').innerText='Updated by Shirwac'; return 'Done';"
      },
      {
        title: "Text Color",
        html: "<p id='b2'>Color Text</p>",
        code: "document.getElementById('b2').style.color='blue'; return 'Success';"
      },
      {
        title: "Hide Element",
        html: "<div id='b3'>Hide Me</div>",
        code: "document.getElementById('b3').style.display='none'; return 'Hidden';"
      },
      {
        title: "Create Element",
        html: "<div id='b4'></div>",
        code: "const p=document.createElement('p'); p.innerText='New Child'; document.getElementById('b4').appendChild(p); return 'Created';"
      }
    ]
  },

  chapter9: {
    title: "Chapter 9: Events",
    examples: [
      {
        title: "Click Event",
        html: "<button id='e1'>Click Me</button>",
        init: (boxId) => {
          document.querySelector(`#${boxId} #e1`).onclick =
            () => alert("Hello Shirwac!");
        }
      },
      {
        title: "Mouse Over",
        html: "<div id='e2' style='width:40px;height:40px;background:red'></div>",
        init: (boxId) => {
          document.querySelector(`#${boxId} #e2`).onmouseover =
            function () { this.style.background = "blue"; };
        }
      }
    ]
  }
};

// =======================
// NAVIGATION
// =======================
function showPage(pageId) {
  document.querySelectorAll(".page-section").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".sidebar li").forEach(l => l.classList.remove("active-link"));

  document.getElementById(pageId).classList.add("active");
  document.getElementById("li-" + pageId).classList.add("active-link");
}

// =======================
// BUILD UI
// =======================
function buildUI() {
  const container = document.getElementById("chapters-container");
  if (!container) return;

  for (let key in chaptersData) {
    const chapter = chaptersData[key];
    const card = document.createElement("div");
    card.className = "chapter-card";
    card.innerHTML = `<h2>${chapter.title}</h2>`;

    chapter.examples.forEach((ex, i) => {
      const exId = `${key}-${i}`;
      const boxId = `box-${exId}`;

      const item = document.createElement("div");
      item.className = "example-item";
      item.id = boxId;

      item.innerHTML = `
        <strong>${ex.title}</strong>
        ${ex.html ? `<div class="dom-preview">${ex.html}</div>` : ""}
        <pre><code>${ex.code || "// Event based example"}</code></pre>
        <button class="run-btn" onclick="executeExample('${key}', ${i})">Run Example</button>
        <div class="output-box" id="out-${exId}">Output waiting...</div>
      `;

      card.appendChild(item);

      if (ex.init) {
        setTimeout(() => ex.init(boxId), 100);
      }
    });

    container.appendChild(card);
  }
}

// =======================
// RUN CODE
// =======================
function executeExample(chKey, index) {
  const ex = chaptersData[chKey].examples[index];
  const out = document.getElementById(`out-${chKey}-${index}`);

  try {
    if (ex.code) {
      const result = new Function(ex.code)();
      out.innerText = "Output: " + (result ?? "Success");
    } else {
      out.innerText = "Output: Event activated.";
    }
  } catch (e) {
    out.innerText = "Error: " + e.message;
  }
}

// =======================
document.addEventListener("DOMContentLoaded", buildUI);
