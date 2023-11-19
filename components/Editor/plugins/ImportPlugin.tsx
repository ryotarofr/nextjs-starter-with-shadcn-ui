"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FC, useEffect } from "react";

export const ImportPlugin: FC<{
  defaultContentAsHTML?: string;
  defaultContentAsJSON?: string;
}> = ({
  defaultContentAsHTML,
  defaultContentAsJSON
}) => {
    const [editor] = useLexicalComposerContext();

    // 省略

    useEffect(() => {
      if (typeof defaultContentAsJSON === 'undefined') return;
      editor.update(() => {
        const editorState = editor.parseEditorState(defaultContentAsJSON);
        editor.setEditorState(editorState);
      });
    }, [editor, defaultContentAsJSON]);

    return null;
  };
