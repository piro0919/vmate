"use client";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
} from "mui-tiptap";

export default function App(): JSX.Element {
  const editor = useEditor({
    content: "<p>Hello World! 🌎️</p>",
    extensions: [StarterKit],
    immediatelyRender: false,
  });

  return (
    <RichTextEditorProvider editor={editor}>
      <RichTextField
        controls={
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
          </MenuControlsContainer>
        }
      />
    </RichTextEditorProvider>
  );
}
