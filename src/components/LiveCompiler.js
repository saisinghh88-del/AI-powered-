// Live Code Compiler component logic for JavaScript, Python, HTML, C++
export class LiveCompiler {
  constructor(editorId, consoleId) {
    this.editorEl = document.getElementById(editorId);
    this.consoleEl = document.getElementById(consoleId);
    this.currentLanguage = "javascript";
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
  }

  execute(code) {
    if (!this.consoleEl) return;
    this.consoleEl.innerHTML = "";

    if (this.currentLanguage === "javascript") {
      let logs = [];
      const originalLog = console.log;
      console.log = function(...args) {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
        originalLog.apply(console, args);
      };

      try {
        const result = eval(code);
        console.log = originalLog;
        let out = `<span style="color: #10B981; font-weight: 700;">[Executed Successfully]</span>\n\n`;
        if (logs.length > 0) out += `Standard Output:\n` + logs.map(l => `> ${l}`).join('\n') + `\n\n`;
        if (result !== undefined) out += `Return: ${result}`;
        this.consoleEl.innerHTML = out;
      } catch (err) {
        console.log = originalLog;
        this.consoleEl.innerHTML = `<span style="color: #EF4444; font-weight: 700;">[Runtime Error]</span>\n${err.message}`;
      }
    }
  }
}
