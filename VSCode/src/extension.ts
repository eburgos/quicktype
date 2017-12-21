"use strict";

import * as vscode from "vscode";
import { Range } from "vscode";
import { paste } from "copy-paste";

function pasteJSONAsCode(editor: vscode.TextEditor): void {
    paste((err, content) => {
        if (err) return;
        editor.edit(builder => {
            const selection = editor.selection;
            if (selection.isEmpty) {
                builder.insert(selection.start, content);
            } else {
                builder.replace(new Range(selection.start, selection.end), content);
            }
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
