import { App } from "spak";
import { ProvidedAppDelegate } from "spak/providers";
import { component } from "spak/decorators";
import { ConsoleLogger } from "spak/providers";
import { renderUI } from "./ui";
import { LaunchApp } from "./actions";

@component("main")
class MainComponent {
    register() {
        return {
            $actions: [new LaunchApp()]
        }
    }
}

App.run(
    new App.Components(new MainComponent()),
    new App.Config(),
    new ProvidedAppDelegate({
        provideLogger() {
            return new ConsoleLogger();
        },

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
            App.events.publish("ui.requestLoginForm");
        }
    })
)
