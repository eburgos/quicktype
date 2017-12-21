"use strict";

import * as vscode from "vscode";
import { Range } from "vscode";
import { paste } from "copy-paste";
import { quicktype } from "quicktype";

function pasteJSONAsCode(editor: vscode.TextEditor): void {
    paste((err, content) => {
        if (err) return;
        quicktype({
            lang: "types",
            sources: [{name: "TopLevel", samples: [content]}]
        }).then(result => {
            const text = result.lines.join("\n");
            editor.edit(builder => {
                const selection = editor.selection;
                if (selection.isEmpty) {
                    builder.insert(selection.start, text);
                } else {
                    builder.replace(new Range(selection.start, selection.end), text);
                }
            });
        });
    });
}

export function activate(context: vscode.ExtensionContext) {
    const pasteCommandRegistration = vscode.commands.registerTextEditorCommand(
        "extension.pasteJSONAsCode",
        pasteJSONAsCode
    );

    context.subscriptions.push(pasteCommandRegistration);
}

export function deactivate(): void {
    return;
}
