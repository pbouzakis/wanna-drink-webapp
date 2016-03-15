import { App } from "spak";
import { ProvidedAppDelegate } from "spak/providers";
import { component } from "spak/decorators";
import { renderUI } from "./ui";
import { LaunchApp } from "./actions";

class MainComponent {
    static get metadata() { return { name: "main" }; }
    register() {
        return {
            $actions: [new LaunchApp()]
        }
    }
}
component("main")(MainComponent); // Manually call decorator! Damn you babel!

App.run(
    new App.Components(new MainComponent()),
    new App.Config(),
    new ProvidedAppDelegate({
        onReady() {
            App.dispatchAction("launchApp", { presenter: this })
        },

        showStartingUp() {
            renderUI();
        },

        showHome() {
            console.log("Show Logged In Homepage!");
        },

        showLogin() {
            console.log("Show Login Form!");
        }
    })
)
