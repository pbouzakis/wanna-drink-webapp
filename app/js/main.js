import { App } from "spak";
import { ProvidedAppDelegate } from "spak/providers";
import { renderUI } from "./ui";

App.run(
    new App.Components(),
    new App.Config(),
    new ProvidedAppDelegate({
        onReady() {
            renderUI();
        }
    })
)
