// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
class BitViewProvider {
    constructor(extensionUri,context) {
        this._extensionUri = extensionUri
        this._context = context
    }
    resolveWebviewView(webviewView) {
    this._view = webviewView

    webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [
            vscode.Uri.joinPath(this._extensionUri, 'media')
        ]
    }

    webviewView.webview.html = this.getHtml(webviewView.webview)

    webviewView.webview.onDidReceiveMessage(message => {
        if (message.type === 'setup') {
            // Save the name and gender to globalState
            this._context.globalState.update('bitName', message.name)
            this._context.globalState.update('bitGender', message.gender)

            // Reload the webview to show Bit!
            webviewView.webview.html = this.getHtml(webviewView.webview)
        }
    })
     
}
celebrate() {
        if (this._view) {
            this._view.webview.postMessage({ type: 'celebrate' })
        }
    }

    encourage() { 
        if (this._view) {
            this._view.webview.postMessage({ type: 'encourage' })
        }
    }
   getHtml(webview) {
    
    const savedName = this._context.globalState.get('bitName')
    const savedGender = this._context.globalState.get('bitGender')
    


    // If no name saved, show onboarding screen
    if (!savedName) {
        return this.getOnboardingHtml()
    }

   
    const img = (folder, file) => webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, 'media', folder, file)
    )
    

    const character = {
        idle:    img(savedGender, 'idle.svg'),
        happy:   img(savedGender, 'success.svg'),
        hype:    img(savedGender, 'hype.svg'),
        roast:   img(savedGender, 'roast.svg'),
        cry:     img(savedGender, 'cry.svg'),
        fine:    img(savedGender, 'fine.svg'),
    }

    return `<!DOCTYPE html>
    <html>
    <head>
    <style>
    @keyframes bob {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-8px); }
    }

    @keyframes sip {
        0%, 70%, 100% { transform: translateY(0px); }
        85%           { transform: translateY(-20px); }
    }

    .idle { animation: bob 3s ease-in-out infinite; }
    .reacting { animation: none; }

    #coffee {
        font-size: 30px;
        animation: sip 4s ease-in-out infinite;
        display: inline-block;
    }
</style>
    </head>
    <body style="display:flex; justify-content:center; align-items:center; height:100vh; margin:0; background:transparent;flex-direction:column;">
        <img src="${character.idle}" width="200" height="200" id="bit" />
        <span id="coffee">☕</span>
        <p id="message" style="color:white; font-size:14px; text-align:center; padding:10px; font-family:sans-serif;">
        Hey! I'm ${savedName} Let's write some code!
    </p>

        <script>
            const vscode = acquireVsCodeApi()
            const bit = document.getElementById('bit')
            const message = document.getElementById('message')
            const coffee = document.getElementById('coffee')

const celebratePics = ['${character.happy}', '${character.hype}']
const encouragePics = ['${character.roast}', '${character.cry}', '${character.fine}']
const idleMessages = [
    "Hey! I'm ${savedName}  Let's write some code!",
    "Sipping coffee and waiting for greatness ",
    "Ready when you are boss ",
    "No bugs allowed on my watch ",
    "Watching your every keystroke ",
    "Another day another bug to squash ",
    "I believe in you even when you don't ",
    "Coffee first, code second ",
    "Let's build something amazing today ",
    "I'm not sleeping I'm just resting my eyes ",
    "Still here. Still watching. Always watching ",
    "Type faster I'm bored ",
    "You smell like clean code today ",
    "My coffee is getting cold just like your bugs will ",
    "Waiting for you to do something genius ",
    "I have full faith in you. No pressure though ",
    "Don't mind me just sipping and judging ",
    "Today is a good day to write good code ",
    "I've seen your code before. I believe in you ",
    "Bugs fear you. Or they should ",
    "Legend says if you code long enough bugs fix themselves ",
    "One keystroke at a time champ ",
]

const celebrateMessages = [
    "YESSS LETS GOOO!! ",
    "YOU ARE A GENIUS!! ",
    "CLEAN CODE YEAH!! ",
    "W DEVELOPER IN THE BUILDING!! ",
    "That's my human!! ",
    "SLAY!! No errors detected!! ",
    "You ate that and left no crumbs!! ",
    "I KNEW YOU COULD DO IT!! ",
    "SOMEBODY CALL THE AMBULANCE!! That code was CLEAN!!",
    "Not me crying tears of joy rn ",
    "PERIODT!! Clean run no cap!! ",
    "The ancestors are proud of you today ",
    "I'm framing this run in my wall ",
    "Zero errors?? IN THIS ECONOMY?? ",
    "You just cooked and I ate every bite ",
    "I am UNWELL!! That was too clean!! ",
    "Main character behavior RIGHT THERE!! ",
    "Not a single bug dared show up today ",
    "That was so clean it squeaked ",
    "I'm calling your mom to tell her ",
    "Scientists couldn't explain that level of clean code ",
    "You did that with your CHEST!! ",
]

const encourageMessages = [
    "bro... BRO... what is this ",
    "its ok we all cry sometimes ",
    "This is fine. Everything is fine ",
    "GET UP LETS GO YOU GOT THIS ",
    "The bug is temporary, your greatness is permanent ",
    "Even Einstein had errors trust ",
    "I'm not mad, I'm just disappointed  jk you got this!!",
    "ERROR 404: your confidence not found. Let me find it for you ",
    "One bug closer to the solution!! ",
    "Stack Overflow is your best friend rn ",
    "The audacity of this error... we move ",
    "Sir/Ma'am what is going on in there ",
    "The bug is scared of you it just doesn't know it yet ",
    "I've seen worse. Actually no I haven't. But you got this!! ",
    "Take a deep breath. In. Out. Now DESTROY that bug ",
    "Every pro was once a beginner with errors trust ",
    "The bug picked the wrong developer today ",
    "Error? More like a learning opportunity ",
    "I believe in you more than you believe in yourself rn ",
    "That bug has a family too but we don't care ",
    "Rome wasn't built in a day and neither was clean code ",
    
]

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

setInterval(() => {
    if (bit.classList.contains('idle')) {
        message.textContent = random(idleMessages)
    }
}, 10000)

window.addEventListener('message', event => {
    const { type } = event.data

    if (type === 'celebrate') {
        bit.classList.remove('idle')
        bit.classList.add('reacting')
        coffee.style.display = 'none'
        bit.src = random(celebratePics)
        message.textContent = random(celebrateMessages)
        setTimeout(() => {
            bit.classList.remove('reacting')
            bit.classList.add('idle')
            coffee.style.display = 'inline-block'
            bit.src = '${character.idle}'
            
            message.textContent = random(idleMessages)
        }, 5000)
    }

    if (type === 'encourage') {
        bit.src = random(encouragePics)
        bit.classList.remove('idle')
        bit.classList.add('reacting')
        coffee.style.display = 'none'
        message.textContent = random(encourageMessages)
        setTimeout(() => {

            bit.src = '${character.idle}'
            bit.classList.remove('reacting')
            bit.classList.add('idle')
            coffee.style.display = 'inline-block'
            message.textContent = random(idleMessages)
        }, 5000)
    }
})
        </script>
    </body>
    </html>`
}
getOnboardingHtml() {
    return `<!DOCTYPE html>
    <html>
    <body style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; margin:0; background:transparent; font-family:sans-serif;">
        
        <h2 style="color:white;">👋 Hey! Let's set up your buddy!</h2>
        
        <p style="color:grey;">What's your buddy's name?</p>
        <input id="nameInput" type="text" placeholder="e.g. Bit, Max, Luna..." 
            style="padding:8px; border-radius:6px; border:none; font-size:14px; margin-bottom:20px;" />

        <p style="color:grey;">Pick your buddy's style</p>
        <div style="display:flex; gap:10px; margin-bottom:20px;">
            <button onclick="selectGender('girl')" id="btn-girl"
                style="padding:10px 20px; border-radius:6px; border:none; cursor:pointer; font-size:20px;">
                👧
            </button>
            <button onclick="selectGender('boy')" id="btn-boy"
                style="padding:10px 20px; border-radius:6px; border:none; cursor:pointer; font-size:20px;">
                👦
            </button>
        </div>

        <button onclick="saveSetup()" 
            style="padding:10px 24px; background:#007acc; color:white; border:none; border-radius:6px; cursor:pointer; font-size:14px;">
            Meet my buddy! 🔥
        </button>

        <script>
            const vscode = acquireVsCodeApi()
            let selectedGender = 'girl'

            function selectGender(gender) {
                selectedGender = gender
                document.getElementById('btn-girl').style.opacity = gender === 'girl' ? '1' : '0.4'
                document.getElementById('btn-boy').style.opacity = gender === 'boy' ? '1' : '0.4'
            }

            function saveSetup() {
                const name = document.getElementById('nameInput').value.trim()
                if (!name) {
                    alert('Please give your buddy a name! 😄')
                    return
                }
                vscode.postMessage({ type: 'setup', name, gender: selectedGender })
            }
        </script>
    </body>
    </html>`
}

}
function activate(context) {
    const provider = new BitViewProvider(context.extensionUri,context)

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('motivationalPartner.view', provider)
    )
    const savedName = context.globalState.get('bitName')
    const savedGender = context.globalState.get('bitGender')

    console.log('Saved name:', savedName)
    console.log('Saved gender:', savedGender)

   
let activeSessions = 0
    let runHadError = false

    // 1. Keep track of how many debug sessions are running
    context.subscriptions.push(
        vscode.debug.onDidStartDebugSession(() => {
            activeSessions++
        })
    )

    // 2. Track errors across ANY of those sessions
    context.subscriptions.push(
        vscode.debug.registerDebugAdapterTrackerFactory('*', {
            createDebugAdapterTracker(session) {
                return {
                    onDidSendMessage(message) {
                        if (message.type === 'event' && message.event === 'exited') {
                            if (message.body.exitCode !== 0) {
                                runHadError = true
                            }
                        }
                        
                        if (message.type === 'event' && message.event === 'output') {
                            if (message.body.category === 'stderr') {
                                runHadError = true
                            }
                        }

                        if (message.type === 'event' && message.event === 'stopped') {
                            if (message.body.reason === 'exception' || message.body.reason === 'promiseRejection') {
                                runHadError = true
                            }
                        }
                    }
                }
            }
        })
    )

    // 3. Only react when ALL sessions have finished closing
    context.subscriptions.push(
        vscode.debug.onDidTerminateDebugSession(() => {
            activeSessions--
            
            if (activeSessions <= 0) {
                activeSessions = 0 // Safety check
                
                if (runHadError) {
                    provider.encourage()
                } else {
                    provider.celebrate()
                }
                
                // Reset for the next time you press F5!
                runHadError = false 
            }
        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand('mp.reset', () => {
            context.globalState.update('bitName', undefined)
            context.globalState.update('bitGender', undefined)
            provider._view.webview.html = provider.getHtml(provider._view.webview)
            vscode.window.showInformationMessage('Bit has been reset! Reload the sidebar 😄')
        })
    )
}





// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
