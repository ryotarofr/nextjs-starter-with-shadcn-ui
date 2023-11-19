"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FC, useEffect } from "react";

export const ExportPluginJson: FC<{
  exportAsHTML?: (contentAsHTML: string) => void;
  exportAsJSON?: (contentAsJSON: string) => void;
}> = ({
  exportAsJSON
}) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      if (exportAsJSON) {
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            const contentAsJSON = JSON.stringify(editorState.toJSON());
            exportAsJSON(contentAsJSON);
          });
        });
      }
    }, [editor, exportAsJSON]);

    return null;
  };

export default ExportPluginJson;