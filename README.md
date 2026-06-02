# Bit: Your Motivational Coding Buddy 🚀

**Bit** is an interactive VS Code sidebar companion designed to ride the emotional roller coaster of software development right alongside you. Whether you are hitting compile on a flawless script or staring down a massive wall of crimson error text, Bit is in your corner—ready to loudly celebrate your victories or brutally roast your bugs.

---

## ✨ Features

* **Real-Time Code Tracking:** Bit watches your active debug sessions natively from the VS Code sidebar.
* **Smart Multi-Session Detection:** Specially optimized to handle complex debugging environments (like Node.js parent/child sessions) without triggering false alarms.
* **Universal Language Support:** Automatically catches runtime crashes, standard error (`stderr`) streams, exceptions, and unhandled promise rejections across Python, JavaScript, C#, C++, and more.
* **Persistent Personality:** Remembers its settings across editor restarts, with a built-in emergency reset when you need a fresh start.

---

## 🛠️ How It Works

Bit monitors your workspace using three powerful layers of defense:
1. **The Exit Code Anchor:** If a program exits with anything other than `0`, Bit knows things went sideways.
2. **The Stream Monitor:** Catches output sent directly to standard error (`stderr`) before the program even has a chance to crash.
3. **The Exception Catch:** Listens specifically for unhandled exceptions and promise rejections.

---

## 💻 Commands

This extension contributes the following commands to your command palette:

* `mp.reset`: Clears Bit's stored configuration (name/gender) and resets the sidebar to its default state.

---

## 📦 Manual Installation

If you are installing this extension from a local `.vsix` release file:

1. Open **Visual Studio Code**.
2. Navigate to the **Extensions** tab (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Click the three dots (`...`) in the top-right corner of the Extensions views container.
4. Select **Install from VSIX...**
5. Choose the compiled `motivational-partner-0.0.1.vsix` file.

---

## 🛠️ Development Setup

If you want to clone this repository and modify Bit's reactions or layout locally:

1. Clone the repository:
```bash
   git clone [https://github.com/Ruecode3108/motivational-partner.git](https://github.com/Ruecode3108/motivational-partner.git)